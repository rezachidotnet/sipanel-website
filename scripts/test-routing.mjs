import {spawn} from 'node:child_process';
import process from 'node:process';

const port = process.env.PORT || '3100';
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const shouldStartServer = !process.env.BASE_URL;

let server;

function log(message) {
  process.stdout.write(`${message}\n`);
}

function fail(message) {
  throw new Error(message);
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  const deadline = Date.now() + 60_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/`, {redirect: 'manual'});
      if (response.status > 0) {
        return;
      }
    } catch {
      // Keep polling until Next.js is ready.
    }

    await sleep(1000);
  }

  fail(`Timed out waiting for ${baseUrl}`);
}

async function request(path, headers) {
  return fetch(`${baseUrl}${path}`, {headers, redirect: 'manual'});
}

function locationPath(response) {
  const location = response.headers.get('location');

  if (!location) {
    return null;
  }

  return new URL(location, baseUrl).pathname + new URL(location, baseUrl).search;
}

async function expectStatus(path, status) {
  const response = await request(path);

  if (response.status !== status) {
    fail(`${path} expected ${status}, received ${response.status}`);
  }

  return response;
}

async function expectRedirect(path, target) {
  const response = await expectStatus(path, 308);
  const location = locationPath(response);

  if (location !== target) {
    fail(`${path} expected Location ${target}, received ${location}`);
  }

  const follow = await request(location);
  if (follow.status !== 200) {
    fail(`${path} should redirect in one step to a 200 page; ${location} returned ${follow.status}`);
  }
}

async function expectNoRedirect(path) {
  const response = await request(path);

  if (response.status >= 300 && response.status < 400) {
    fail(`${path} must not redirect; received ${response.status} Location ${locationPath(response) ?? 'missing'}`);
  }

  return response;
}

function expectIncludes(text, needle, label) {
  if (!text.includes(needle)) {
    fail(`Missing ${label}: ${needle}`);
  }
}

async function expectHomepageMetadata() {
  const response = await expectStatus('/', 200);
  const html = await response.text();

  expectIncludes(html, '<link rel="canonical" href="https://www.sipanelco.ir"/>', 'homepage canonical');
  expectIncludes(html, '<link rel="alternate" hrefLang="fa-IR" href="https://www.sipanelco.ir"/>', 'fa alternate');
  expectIncludes(html, '<link rel="alternate" hrefLang="en" href="https://www.sipanelco.ir/en"/>', 'en alternate');
  expectIncludes(html, '<link rel="alternate" hrefLang="ar" href="https://www.sipanelco.ir/ar"/>', 'ar alternate');
  expectIncludes(html, '<link rel="alternate" hrefLang="ru" href="https://www.sipanelco.ir/ru"/>', 'ru alternate');
  expectIncludes(html, '<link rel="alternate" hrefLang="x-default" href="https://www.sipanelco.ir"/>', 'x-default alternate');
}

async function expectSitemap() {
  const response = await expectStatus('/sitemap.xml', 200);
  const xml = await response.text();

  if (/https:\/\/www\.sipanelco\.ir\/fa(?=[/?#"<\s]|$)/.test(xml)) {
    fail('Sitemap contains redirected /fa URL');
  }

  for (const url of [
    'https://www.sipanelco.ir/',
    'https://www.sipanelco.ir/systems',
    'https://www.sipanelco.ir/en',
    'https://www.sipanelco.ir/ar',
    'https://www.sipanelco.ir/ru'
  ]) {
    expectIncludes(xml, url, `sitemap URL ${url}`);
  }
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

  await expectHomepageMetadata();
  await expectRedirect('/fa', '/');
  await expectRedirect('/fa/', '/');
  await expectRedirect('/fa/systems', '/systems');
  await expectRedirect('/fa/systems?utm=1', '/systems?utm=1');
  await expectRedirect('/fa/projects', '/projects');
  await expectRedirect('/fa/projects/', '/projects');
  await expectRedirect('/fa/sitemap.xml', '/sitemap.xml');
  await expectRedirect('/en/sitemap.xml', '/sitemap.xml');
  await expectRedirect('/ar/sitemap.xml', '/sitemap.xml');
  await expectRedirect('/ru/sitemap.xml', '/sitemap.xml');
  await expectRedirect('/en/', '/en');
  await expectRedirect('/ar/', '/ar');
  await expectRedirect('/ru/', '/ru');
  await expectRedirect('/projects/', '/projects');
  await expectRedirect('/en/projects/', '/en/projects');
  await expectRedirect('/ar/projects/', '/ar/projects');
  await expectRedirect('/ru/projects/', '/ru/projects');
  await expectRedirect('/en/projects/?filter=sandwich', '/en/projects?filter=sandwich');

  for (const path of ['/projects', '/en/projects', '/ar/projects', '/ru/projects', '/systems', '/en', '/ar', '/ru']) {
    await expectStatus(path, 200);
  }

  for (const path of ['/favicon.ico', '/robots.txt', '/sitemap.xml', '/_next/static/not-found.txt']) {
    await expectNoRedirect(path);
  }

  for (const [path, headers] of [
    ['/projects', {'Accept-Language': 'en-US,en;q=0.9'}],
    ['/en/projects', {'Accept-Language': 'fa-IR,fa;q=0.9'}]
  ]) {
    const response = await request(path, headers);
    if (response.status !== 200) {
      fail(`${path} expected 200 regardless of Accept-Language, received ${response.status}`);
    }
  }

  await expectSitemap();
  log('Routing smoke tests passed.');
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (server) {
      server.kill('SIGTERM');
    }
  });
