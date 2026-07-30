import {spawn} from 'node:child_process';
import process from 'node:process';
import {chromium} from 'playwright';

const port = process.env.PORT || '3104';
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const shouldStartServer = !process.env.BASE_URL;
const locales = [
  {locale: 'fa', home: '/', other: '/projects', processHref: '/#process'},
  {locale: 'en', home: '/en', other: '/en/projects', processHref: '/en/#process'},
  {locale: 'ar', home: '/ar', other: '/ar/projects', processHref: '/ar/#process'},
  {locale: 'ru', home: '/ru', other: '/ru/projects', processHref: '/ru/#process'}
];
const viewports = [
  {name: 'desktop', width: 1280, height: 800},
  {name: 'mobile', width: 390, height: 844}
];

let server;

function fail(message) {
  throw new Error(message);
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  const deadline = Date.now() + 90_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/`, {redirect: 'manual'});
      if (response.status > 0) return;
    } catch {
      // Wait for Next.js startup.
    }

    await sleep(1000);
  }

  fail(`Timed out waiting for ${baseUrl}`);
}

function linkLocator(page, href) {
  return page.locator(`footer a.site-footer__link[href="${href}"]`).first();
}

async function gotoRoute(page, path, processHref) {
  await page.goto(`${baseUrl}${path}`, {waitUntil: 'domcontentloaded'});
  await linkLocator(page, processHref).waitFor({state: 'attached', timeout: 10_000});
}

function normalizePathname(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

async function processPosition(page) {
  return page.evaluate(() => {
    const section = document.getElementById('process');
    const header = document.querySelector('.site-header');
    return {
      hash: window.location.hash,
      pathname: window.location.pathname,
      scrollY: window.scrollY,
      top: section?.getBoundingClientRect().top ?? null,
      headerBottom: header?.getBoundingClientRect().bottom ?? 0
    };
  });
}

async function expectProcessVisible(page, label) {
  await page.waitForFunction(() => {
    const section = document.getElementById('process');
    const header = document.querySelector('.site-header');
    if (!section) return false;
    return section.getBoundingClientRect().top >= (header?.getBoundingClientRect().bottom ?? 0) - 1;
  }, {timeout: 5000});

  const position = await processPosition(page);
  if (position.hash !== '#process') {
    fail(`${label}: expected #process hash, received ${position.hash}`);
  }

  if (position.top === null || position.top < position.headerBottom - 1) {
    fail(`${label}: process section is covered by header (${JSON.stringify(position)})`);
  }

  return position;
}

async function clickFooterProcess(page, href) {
  const link = linkLocator(page, href);
  if ((await link.count()) !== 1) {
    fail(`Expected one footer Process link for ${href}`);
  }

  const tagName = await link.evaluate((element) => element.tagName);
  if (tagName !== 'A') fail(`Footer Process link must render as an anchor, received ${tagName}`);

  const renderedHref = await link.getAttribute('href');
  if (renderedHref?.includes('/fa')) fail(`Footer Process link generated legacy /fa URL: ${renderedHref}`);

  await link.scrollIntoViewIfNeeded();
  await link.click();
}

async function pressFooterProcess(page, href) {
  const link = linkLocator(page, href);
  await link.scrollIntoViewIfNeeded();
  await link.focus();
  await page.keyboard.press('Enter');
}

async function runAnchorTests() {
  const browser = await chromium.launch({headless: true});

  try {
    for (const viewport of viewports) {
      for (const {locale, home, other, processHref} of locales) {
        const page = await browser.newPage({viewport: {width: viewport.width, height: viewport.height}});

        await gotoRoute(page, home, processHref);
        const initialHref = await linkLocator(page, processHref).getAttribute('href');
        if (initialHref !== processHref) {
          fail(`${viewport.name} ${locale}: footer Process href mismatch, expected ${processHref}, received ${initialHref}`);
        }

        await clickFooterProcess(page, processHref);
        await expectProcessVisible(page, `${viewport.name} ${locale} first homepage footer click`);

        await linkLocator(page, processHref).scrollIntoViewIfNeeded();
        const beforeRepeat = await processPosition(page);
        await clickFooterProcess(page, processHref);
        const afterRepeat = await expectProcessVisible(page, `${viewport.name} ${locale} repeated homepage footer click`);
        if (afterRepeat.scrollY === beforeRepeat.scrollY) {
          fail(`${viewport.name} ${locale}: repeated Process click did not change scroll position after scrolling away`);
        }

        await linkLocator(page, processHref).scrollIntoViewIfNeeded();
        await pressFooterProcess(page, processHref);
        await expectProcessVisible(page, `${viewport.name} ${locale} keyboard footer click`);

        await gotoRoute(page, other, processHref);
        await clickFooterProcess(page, processHref);
        await expectProcessVisible(page, `${viewport.name} ${locale} navigation from another page`);
      const expectedPathname = processHref.replace(/\/?#process$/, '') || '/';
      const position = await processPosition(page);
      if (normalizePathname(position.pathname) !== normalizePathname(expectedPathname)) {
        fail(`${viewport.name} ${locale}: expected pathname ${expectedPathname}, received ${position.pathname}`);
      }

      await page.goBack({waitUntil: 'networkidle'});
      const backPathname = new URL(page.url()).pathname;
      if (normalizePathname(backPathname) !== normalizePathname(other)) {
        fail(`${viewport.name} ${locale}: browser back did not return to ${other}, received ${backPathname}`);
      }

        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  process.stdout.write('Anchor navigation tests passed.\n');
}

async function run() {
  if (shouldStartServer) {
    server = spawn('npm', ['run', 'dev', '--', '-p', port], {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: {...process.env, PORT: port}
    });

    server.stdout.on('data', (chunk) => process.stdout.write(chunk));
    server.stderr.on('data', (chunk) => process.stderr.write(chunk));

    await waitForServer();
  }

  await runAnchorTests();
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (server) server.kill('SIGTERM');
  });
