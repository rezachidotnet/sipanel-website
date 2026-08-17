import {spawn} from 'node:child_process';
import process from 'node:process';

const port = process.env.PORT || '3108';
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const shouldStartServer = !process.env.BASE_URL;

const locales = ['fa', 'en', 'ar', 'ru'];

function localized(locale, path) {
  if (locale === 'fa') return path;
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

// The generic "supply-only vs engineering/execution" question that was
// duplicated across the hub and 3 of the 4 detail pages. Not present on
// daylighting-transparent-roofing (it never had this exact question) or on
// sandwich-panel-systems' ar/ru variants (they use a different, shorter,
// generic FAQ structure that never included this question either).
const duplicateFaqMarkers = {
  fa: ['فقط متریال تأمین می‌کند یا مهندسی و اجرا', 'فقط تأمین‌کننده است یا نصب', 'فقط تأمین‌کننده نما است یا نصب'],
  en: ['only supply material or also handle engineering and execution', 'a supplier only or does it also handle installation'],
  ar: ['المواد فقط أم تشمل الهندسة والتنفيذ', 'مورد فقط أم تتولى التركيب'],
  ru: ['только поставляет материалы или также выполняет инженеринг', 'только поставщик или также выполняет монтаж']
};

// The retained central answer to this question, on /faq.
const centralFaqMarkers = {
  fa: 'آیا SIPANEL فقط تامین‌کننده پنل ساندویچی است؟',
  en: 'Is SIPANEL only a sandwich panel supplier?',
  ar: 'هل SIPANEL مجرد مورّد لألواح الساندويش؟',
  ru: 'SIPANEL — это только поставщик сэндвич-панелей?'
};

const systemPagePaths = [
  '/systems',
  '/systems/sandwich-panel-systems',
  '/systems/standing-seam-zip-tech-roofing',
  '/systems/aluminium-cladding-covering',
  '/systems/daylighting-transparent-roofing'
];

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

function extractFaqSchemaQuestions(html) {
  const scripts = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);

  for (const raw of scripts) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed['@type'] === 'FAQPage') {
        return (parsed.mainEntity ?? []).map((item) => item.name);
      }
    } catch {
      // ignore non-JSON or unrelated schema blocks
    }
  }

  return null;
}

function extractVisibleFaqQuestions(html) {
  return [...html.matchAll(/<summary[^>]*>([^<]*)<\/summary>/g)].map((m) => m[1]);
}

// 1. The duplicate generic FAQ must not appear on any of the 5 system pages, any locale.
async function assertNoDuplicateFaqOnSystemPages(locale) {
  for (const path of systemPagePaths) {
    const html = await fetchHtml(localized(locale, path));
    for (const marker of duplicateFaqMarkers[locale]) {
      if (html.includes(marker)) {
        fail(`[${locale}] ${path} still contains the duplicate supply/engineering FAQ ("${marker}")`);
      }
    }
  }
}

// 2. The central version must still exist on /faq.
async function assertCentralFaqExists(locale) {
  const html = await fetchHtml(localized(locale, '/faq'));
  if (!html.includes(centralFaqMarkers[locale])) {
    fail(`[${locale}] /faq is missing the central supply/engineering FAQ ("${centralFaqMarkers[locale]}")`);
  }
}

// 3. Visible FAQ and FAQPage JSON-LD must match, for every page that has FAQ schema.
async function assertFaqVisibleMatchesSchema(locale, path) {
  const html = await fetchHtml(localized(locale, path));
  const schemaQuestions = extractFaqSchemaQuestions(html);
  const visibleQuestions = extractVisibleFaqQuestions(html);

  if (!schemaQuestions || schemaQuestions.length === 0) {
    fail(`[${locale}] ${path} is missing FAQPage schema questions`);
  }

  if (visibleQuestions.length !== schemaQuestions.length) {
    fail(`[${locale}] ${path}: visible FAQ count (${visibleQuestions.length}) != FAQPage schema count (${schemaQuestions.length})`);
  }

  for (const question of schemaQuestions) {
    if (!visibleQuestions.includes(question)) {
      fail(`[${locale}] ${path}: FAQPage schema question not found in visible FAQ: "${question}"`);
    }
  }
}

// 4. The "engineering chain" proof-strip framework must not render on the hub at all
// (engineeringItems is the sole remaining statement of that framework).
async function assertNoProofStripOnHub(locale) {
  const html = await fetchHtml(localized(locale, '/systems'));

  if (html.includes('systems-proof-strip') || html.includes('systems-proof-grid') || html.includes('systems-proof-item')) {
    fail(`[${locale}] /systems still renders the removed proof-strip section`);
  }

  if (!html.includes('systems-engineering__grid')) {
    fail(`[${locale}] /systems is missing the retained engineering section`);
  }
}

// 5. Hub still has its 4 system cards linking to the 4 detail pages.
async function assertHubHasFourSystemCards(locale) {
  const html = await fetchHtml(localized(locale, '/systems'));

  for (const href of detailHrefs) {
    const localizedHref = localized(locale, href);
    if (!html.includes(`href="${localizedHref}"`)) {
      fail(`[${locale}] /systems is missing a system card link to ${localizedHref}`);
    }
  }
}

// 6. Step 1's internal links to the hub are preserved.
async function assertStep1LinksPreserved(locale) {
  const homeHtml = await fetchHtml(localized(locale, '/'));
  const hub = localized(locale, '/systems');

  if (!homeHtml.includes('systems-showcase__intro-link')) {
    fail(`[${locale}] homepage is missing the Step 1 contextual intro link to the hub`);
  }

  const footerLinkPattern = new RegExp(`class="site-footer__link" href="${hub.replace(/\//g, '\\/')}"`);
  if (!footerLinkPattern.test(homeHtml)) {
    fail(`[${locale}] footer is missing the Step 1 hub link`);
  }
}

// 7. Step 2's industrial-envelope-systems content is preserved (fa only was rewritten).
const step2Baseline = {
  fa: {title: 'هماهنگی مهندسی رابط‌های پوسته ساختمان صنعتی | SIPANEL', h1: 'هماهنگی چند سیستم در پوسته ساختمان صنعتی'},
  en: {title: 'Industrial Envelope Systems | SIPANEL', h1: 'Industrial Envelope Systems Coordinated as One Execution Package.'},
  ar: {title: 'أنظمة أغلفة المباني الصناعية | SIPANEL', h1: 'أنظمة أغلفة المباني الصناعية'},
  ru: {title: 'Промышленные ограждающие системы | SIPANEL', h1: 'Промышленные ограждающие системы'}
};

async function assertStep2ContentPreserved(locale) {
  const html = await fetchHtml(localized(locale, '/solutions/industrial-envelope-systems'));
  const baseline = step2Baseline[locale];
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);

  if (!titleMatch || titleMatch[1] !== baseline.title) {
    fail(`[${locale}] industrial-envelope-systems title changed. Expected "${baseline.title}", got "${titleMatch?.[1]}"`);
  }

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : null;

  if (h1Text !== baseline.h1) {
    fail(`[${locale}] industrial-envelope-systems H1 changed. Expected "${baseline.h1}", got "${h1Text}"`);
  }
}

// 8/9. Canonical, hreflang, and no /fa route, for the hub.
async function assertCanonicalHreflangNoFaRoute(locale) {
  const html = await fetchHtml(localized(locale, '/systems'));
  const path = localized(locale, '/systems');
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const expectedCanonical = `https://www.sipanelco.ir${path}`;

  if (canonical !== expectedCanonical) {
    fail(`[${locale}] /systems canonical mismatch. Expected "${expectedCanonical}", got "${canonical}"`);
  }

  const expectedLangs = ['fa-IR', 'en', 'ar', 'ru', 'x-default'];
  for (const lang of expectedLangs) {
    if (!html.includes(`hrefLang="${lang}"`)) {
      fail(`[${locale}] /systems is missing hreflang "${lang}"`);
    }
  }

  if (html.includes('href="/fa/systems"') || html.includes('href="/fa"')) {
    fail(`[${locale}] /systems generated a legacy /fa-prefixed link`);
  }
}

// 10. Sitemap unchanged: /systems appears exactly once, no /fa/ entries.
async function assertSitemapUnchanged() {
  const response = await fetch(`${baseUrl}/sitemap.xml`);
  if (response.status !== 200) {
    fail(`sitemap.xml: expected 200, got ${response.status}`);
  }
  const xml = await response.text();

  const hubMatches = xml.match(/<loc>https:\/\/www\.sipanelco\.ir\/systems<\/loc>/g) ?? [];
  if (hubMatches.length !== 1) {
    fail(`sitemap.xml: expected exactly 1 entry for /systems, found ${hubMatches.length}`);
  }

  if (xml.includes('/fa/')) {
    fail('sitemap.xml: found a /fa/-prefixed URL');
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
    await assertNoDuplicateFaqOnSystemPages(locale);
    await assertCentralFaqExists(locale);
    await assertFaqVisibleMatchesSchema(locale, '/systems');
    await assertFaqVisibleMatchesSchema(locale, '/systems/sandwich-panel-systems');
    await assertFaqVisibleMatchesSchema(locale, '/systems/standing-seam-zip-tech-roofing');
    await assertFaqVisibleMatchesSchema(locale, '/systems/aluminium-cladding-covering');
    await assertFaqVisibleMatchesSchema(locale, '/systems/daylighting-transparent-roofing');
    await assertNoProofStripOnHub(locale);
    await assertHubHasFourSystemCards(locale);
    await assertStep1LinksPreserved(locale);
    await assertStep2ContentPreserved(locale);
    await assertCanonicalHreflangNoFaRoute(locale);
  }

  await assertSitemapUnchanged();

  process.stdout.write(`Systems FAQ/framework duplication tests passed for ${locales.length} locales.\n`);
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (server) server.kill('SIGTERM');
  });
