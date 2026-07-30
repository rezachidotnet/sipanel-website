import {spawn} from 'node:child_process';
import process from 'node:process';
import {chromium} from 'playwright';

const port = process.env.PORT || '3105';
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const shouldStartServer = !process.env.BASE_URL;

const locales = [
  {locale: 'fa', home: '/', projects: '/projects'},
  {locale: 'en', home: '/en', projects: '/en/projects'},
  {locale: 'ar', home: '/ar', projects: '/ar/projects'},
  {locale: 'ru', home: '/ru', projects: '/ru/projects'}
];

const filters = [
  {key: 'sandwich', expectedVisible: 22},
  {key: 'standing', expectedVisible: 4},
  {key: 'transparent-roofing', expectedVisible: 8},
  {key: 'cladding', expectedVisible: 5}
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

async function gotoRoute(page, path) {
  await page.goto(`${baseUrl}${path}`, {waitUntil: 'domcontentloaded'});
  await page.locator('footer a.site-footer__link').first().waitFor({state: 'attached', timeout: 10_000});

  if (new URL(path, baseUrl).pathname.endsWith('/projects')) {
    await page.locator('input[name="projects-filter"]').first().waitFor({state: 'attached', timeout: 10_000});
    await page.waitForFunction(() => document.documentElement.dataset.projectsFilterActivator === 'ready');
    await page.waitForTimeout(100);
  }
}

function radio(page, filter) {
  return page.locator(`#projects-filter-${filter}`);
}

async function checkedFilter(page) {
  return page.evaluate(() => {
    const checked = document.querySelector('input[name="projects-filter"]:checked');
    return checked?.id.replace('projects-filter-', '') ?? null;
  });
}

async function visibleProjectCount(page) {
  return page.locator('.projects-index-card').evaluateAll((cards) =>
    cards.filter((card) => {
      const style = window.getComputedStyle(card);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }).length
  );
}

async function expectFilter(page, filter, label) {
  await page.waitForFunction((expected) => {
    const checked = document.querySelector('input[name="projects-filter"]:checked');
    return checked?.id === `projects-filter-${expected}`;
  }, filter);

  const actual = await checkedFilter(page);
  if (actual !== filter) fail(`${label}: expected ${filter}, received ${actual}`);
}

async function expectVisibleCount(page, expected, label) {
  await page.waitForFunction((count) => {
    const cards = [...document.querySelectorAll('.projects-index-card')];
    return cards.filter((card) => getComputedStyle(card).display !== 'none').length === count;
  }, expected);

  const actual = await visibleProjectCount(page);
  if (actual !== expected) fail(`${label}: expected ${expected} visible cards, received ${actual}`);
}

async function expectCleanSeoSignals(page, canonical) {
  const signals = await page.evaluate(() => ({
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? '',
    hreflang: [...document.querySelectorAll('link[rel="alternate"]')].map((link) => link.href),
    jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => script.textContent ?? '').join('\n'),
    footerHrefs: [...document.querySelectorAll('footer a[href]')].map((link) => link.getAttribute('href') ?? ''),
    allHrefs: [...document.querySelectorAll('a[href]')].map((link) => link.getAttribute('href') ?? '')
  }));

  if (signals.canonical !== canonical) fail(`Canonical mismatch: expected ${canonical}, received ${signals.canonical}`);

  for (const value of [...signals.hreflang, signals.jsonLd]) {
    if (value.includes('#filter=') || value.includes('?filter=')) {
      fail(`SEO signal contains filtered project URL: ${value}`);
    }
  }

  for (const href of signals.allHrefs) {
    if (href.includes('/fa')) fail(`Rendered href contains /fa: ${href}`);
    if (href.includes('?filter=')) fail(`Rendered href contains project filter query: ${href}`);
  }
}

async function testFooterHrefs(page, localeConfig) {
  await gotoRoute(page, localeConfig.home);
  const footerHrefs = await page.locator('footer a.site-footer__link').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href') ?? '')
  );
  const expected = filters.map((filter) => `${localeConfig.projects}#filter=${filter.key}`);

  for (const href of expected) {
    if (!footerHrefs.includes(href)) fail(`${localeConfig.locale}: missing footer project filter href ${href}`);
  }

  if (!footerHrefs.includes(localeConfig.projects)) {
    fail(`${localeConfig.locale}: missing clean All Projects footer href ${localeConfig.projects}`);
  }

  for (const href of footerHrefs) {
    if (href.includes('/fa')) fail(`${localeConfig.locale}: footer generated /fa href ${href}`);
    if (href.includes('?filter=')) fail(`${localeConfig.locale}: footer generated query filter href ${href}`);
  }
}

async function testFilterActivation(page, localeConfig) {
  const canonical = `https://www.sipanelco.ir${localeConfig.projects}`;

  for (const filter of filters) {
    await gotoRoute(page, `${localeConfig.projects}#filter=${filter.key}`);
    await expectFilter(page, filter.key, `${localeConfig.locale} initial hash ${filter.key}`);
    await expectVisibleCount(page, filter.expectedVisible, `${localeConfig.locale} initial hash ${filter.key}`);
    await expectCleanSeoSignals(page, canonical);
  }

  await gotoRoute(page, localeConfig.projects);
  await expectFilter(page, 'all', `${localeConfig.locale} missing filter`);
  await expectVisibleCount(page, 35, `${localeConfig.locale} all projects`);

  await gotoRoute(page, `${localeConfig.projects}#filter=unsupported`);
  await expectFilter(page, 'all', `${localeConfig.locale} invalid hash`);
  const invalidUrl = new URL(page.url());
  if (invalidUrl.hash) fail(`${localeConfig.locale}: invalid project-filter hash was not removed`);

  await gotoRoute(page, `${localeConfig.projects}?filter=sandwich`);
  await expectFilter(page, 'sandwich', `${localeConfig.locale} legacy query`);
  if (new URL(page.url()).hash) fail(`${localeConfig.locale}: legacy query activation should not add a hash on load`);

  await gotoRoute(page, `${localeConfig.projects}?filter=standing#filter=cladding`);
  await expectFilter(page, 'cladding', `${localeConfig.locale} hash precedence over query`);
}

async function testManualAndHistory(page, localeConfig) {
  await gotoRoute(page, localeConfig.projects);

  await page.locator('label[for="projects-filter-sandwich"]').click();
  await expectFilter(page, 'sandwich', `${localeConfig.locale} manual sandwich`);
  if (new URL(page.url()).hash !== '#filter=sandwich') fail(`${localeConfig.locale}: manual sandwich did not update hash`);
  await expectVisibleCount(page, 22, `${localeConfig.locale} manual sandwich`);

  await page.locator('label[for="projects-filter-all"]').click();
  await expectFilter(page, 'all', `${localeConfig.locale} manual all`);
  if (new URL(page.url()).hash) fail(`${localeConfig.locale}: All did not remove project-filter hash`);
  await expectVisibleCount(page, 35, `${localeConfig.locale} manual all`);

  await gotoRoute(page, `${localeConfig.projects}?filter=standing&utm=source`);
  await page.locator('label[for="projects-filter-cladding"]').click();
  const syncedUrl = new URL(page.url());
  if (syncedUrl.searchParams.has('filter')) fail(`${localeConfig.locale}: manual selection preserved legacy filter query`);
  if (syncedUrl.searchParams.get('utm') !== 'source') fail(`${localeConfig.locale}: manual selection did not preserve unrelated query parameter`);
  if (syncedUrl.hash !== '#filter=cladding') fail(`${localeConfig.locale}: manual selection did not write the selected hash`);
  await expectFilter(page, 'cladding', `${localeConfig.locale} manual selection from legacy query`);

  await page.keyboard.press('Tab');
  await radio(page, 'standing').focus();
  await page.keyboard.press('ArrowRight');
  const selected = await checkedFilter(page);
  if (!selected || selected === 'all') fail(`${localeConfig.locale}: native radio keyboard navigation did not change selection`);

  await page.goto(`${baseUrl}${localeConfig.projects}#filter=sandwich`, {waitUntil: 'domcontentloaded'});
  await expectFilter(page, 'sandwich', `${localeConfig.locale} history setup sandwich`);
  await page.evaluate(() => {
    window.location.hash = 'filter=standing';
  });
  await expectFilter(page, 'standing', `${localeConfig.locale} hashchange standing`);
  await page.goBack({waitUntil: 'domcontentloaded'});
  await expectFilter(page, 'sandwich', `${localeConfig.locale} browser back sandwich`);
  await page.goForward({waitUntil: 'domcontentloaded'});
  await expectFilter(page, 'standing', `${localeConfig.locale} browser forward standing`);
}

async function testFooterNavigation(page, localeConfig) {
  await gotoRoute(page, localeConfig.home);

  for (const filter of filters) {
    const href = `${localeConfig.projects}#filter=${filter.key}`;
    await page.locator(`footer a.site-footer__link[href="${href}"]`).first().click();
    await expectFilter(page, filter.key, `${localeConfig.locale} footer ${filter.key}`);
    await expectVisibleCount(page, filter.expectedVisible, `${localeConfig.locale} footer ${filter.key}`);
  }

  await page.locator(`footer a.site-footer__link[href="${localeConfig.projects}"]`).first().click();
  await expectFilter(page, 'all', `${localeConfig.locale} footer all`);
  await expectVisibleCount(page, 35, `${localeConfig.locale} footer all`);
}

async function runProjectFilterTests() {
  const browser = await chromium.launch({headless: true});

  try {
    for (const localeConfig of locales) {
      const footerHrefPage = await browser.newPage({viewport: {width: 1280, height: 800}});
      await testFooterHrefs(footerHrefPage, localeConfig);
      await footerHrefPage.close();

      const activationPage = await browser.newPage({viewport: {width: 1280, height: 800}});
      await testFilterActivation(activationPage, localeConfig);
      await activationPage.close();

      const manualPage = await browser.newPage({viewport: {width: 1280, height: 800}});
      await testManualAndHistory(manualPage, localeConfig);
      await manualPage.close();

      const mobile = await browser.newPage({viewport: {width: 390, height: 844}});
      await testFooterNavigation(mobile, localeConfig);
      await mobile.close();
    }
  } finally {
    await browser.close();
  }

  process.stdout.write('Project filter navigation tests passed.\n');
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

  await runProjectFilterTests();
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (server) server.kill('SIGTERM');
  });
