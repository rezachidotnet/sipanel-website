import {spawn} from 'node:child_process';
import process from 'node:process';

const port = process.env.PORT || '3106';
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const shouldStartServer = !process.env.BASE_URL;

const locales = ['fa', 'en', 'ar', 'ru'];

function hubPath(locale) {
  return locale === 'fa' ? '/systems' : `/${locale}/systems`;
}

function homePath(locale) {
  return locale === 'fa' ? '/' : `/${locale}`;
}

function solutionPath(locale) {
  const slug = 'industrial-roof-leakage-prevention';
  return locale === 'fa' ? `/solutions/${slug}` : `/${locale}/solutions/${slug}`;
}

const detailHrefs = [
  '/systems/sandwich-panel-systems',
  '/systems/standing-seam-zip-tech-roofing',
  '/systems/aluminium-cladding-covering',
  '/systems/daylighting-transparent-roofing'
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

  fail('Timed out waiting for the dev server to start.');
}

async function fetchHtml(path) {
  const response = await fetch(`${baseUrl}${path}`, {redirect: 'manual'});

  if (response.status !== 200) {
    fail(`${path}: expected 200, got ${response.status}`);
  }

  return response.text();
}

function assertNoLegacyFaPrefix(html, path) {
  if (html.includes('href="/fa/systems"') || html.includes('href="/fa"')) {
    fail(`${path}: found a legacy /fa-prefixed systems link, which must never be generated`);
  }
}

function assertNoTrailingSlashSystemsLink(html, path) {
  const trailingSlashMatch = html.match(/href="\/(?:en\/|ar\/|ru\/)?systems\/"/);
  if (trailingSlashMatch) {
    fail(`${path}: found a trailing-slash systems link (${trailingSlashMatch[0]})`);
  }
}

async function assertHomepageContextualHubLink(locale) {
  const path = homePath(locale);
  const html = await fetchHtml(path);
  const hub = hubPath(locale);

  assertNoLegacyFaPrefix(html, path);
  assertNoTrailingSlashSystemsLink(html, path);

  if (!html.includes('systems-showcase__intro-link')) {
    fail(`${path}: homepage is missing the systems-showcase contextual intro link block`);
  }

  const introBlockMatch = html.match(/systems-showcase__intro-link">([\s\S]*?)<\/p>/);
  if (!introBlockMatch) {
    fail(`${path}: could not locate systems-showcase__intro-link paragraph content`);
  }

  const introBlock = introBlockMatch[1];
  const linkMatch = introBlock.match(/<a href="([^"]+)">/);

  if (!linkMatch) {
    fail(`${path}: systems-showcase intro paragraph has no <a> link`);
  }

  if (linkMatch[1] !== hub) {
    fail(`${path}: expected homepage contextual link to be "${hub}", found "${linkMatch[1]}"`);
  }

  for (const href of detailHrefs) {
    const localizedHref = locale === 'fa' ? href : `/${locale}${href}`;
    if (!html.includes(`class="systems-showcase__card" href="${localizedHref}"`)) {
      fail(`${path}: missing intact system-detail card link ${localizedHref}`);
    }
  }
}

async function assertFooterHubLink(locale) {
  const path = homePath(locale);
  const html = await fetchHtml(path);
  const hub = hubPath(locale);

  const footerColumnMatch = html.match(/<h2>[^<]*<\/h2>((?:<a class="site-footer__link"[^>]*>[^<]*<\/a>){5})/);

  if (!footerColumnMatch) {
    fail(`${path}: could not locate the footer "systems" column with 5 links (hub + 4 details)`);
  }

  const firstLinkMatch = footerColumnMatch[1].match(/^<a class="site-footer__link" href="([^"]+)">/);

  if (!firstLinkMatch || firstLinkMatch[1] !== hub) {
    fail(`${path}: expected the first footer systems-column link to be the hub "${hub}", found "${firstLinkMatch?.[1]}"`);
  }

  for (const href of detailHrefs) {
    const localizedHref = locale === 'fa' ? href : `/${locale}${href}`;
    if (!html.includes(`class="site-footer__link" href="${localizedHref}"`)) {
      fail(`${path}: footer is missing an intact system-detail link ${localizedHref}`);
    }
  }
}

async function assertSolutionPageContextualHubLink(locale) {
  const path = solutionPath(locale);
  const html = await fetchHtml(path);
  const hub = hubPath(locale);

  assertNoLegacyFaPrefix(html, path);
  assertNoTrailingSlashSystemsLink(html, path);

  if (!html.includes('seo-inline-links')) {
    fail(`${path}: missing the related-services inline-links block`);
  }

  const relatedLinksMatch = html.match(/seo-inline-links"[^>]*>([\s\S]*?)<\/div>/);

  if (!relatedLinksMatch || !relatedLinksMatch[1].includes(`href="${hub}"`)) {
    fail(`${path}: related-services block does not contain a contextual link to the systems hub "${hub}"`);
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

  for (const locale of locales) {
    await assertHomepageContextualHubLink(locale);
    await assertFooterHubLink(locale);
    await assertSolutionPageContextualHubLink(locale);
  }

  process.stdout.write(`Systems hub internal-link tests passed for ${locales.length} locales.\n`);
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (server) server.kill('SIGTERM');
  });
