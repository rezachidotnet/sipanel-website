import {spawn} from 'node:child_process';
import process from 'node:process';

const port = process.env.PORT || '3107';
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const shouldStartServer = !process.env.BASE_URL;

const locales = ['fa', 'en', 'ar', 'ru'];

function hubPath(locale) {
  return locale === 'fa' ? '/systems' : `/${locale}/systems`;
}

function envelopePath(locale) {
  const slug = 'industrial-envelope-systems';
  return locale === 'fa' ? `/solutions/${slug}` : `/${locale}/solutions/${slug}`;
}

// The fa hub's own unique H1/keyword signal — must remain the selection/comparison angle.
const hubIntentMarkers = ['مقایسه', 'انتخاب'];

// Words that only make sense for the new interface-coordination intent.
const envelopeIntentMarkers = ['هماهنگی', 'رابط'];

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

function extractTag(html, tag) {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : null;
}

function extractMetaDescription(html) {
  const match = html.match(/<meta name="description" content="([^"]*)"/);
  return match ? match[1] : null;
}

function extractCanonical(html) {
  const match = html.match(/<link rel="canonical" href="([^"]*)"/);
  return match ? match[1] : null;
}

function extractHreflangs(html) {
  return [...html.matchAll(/<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"/g)].map((m) => ({lang: m[1], href: m[2]}));
}

function visibleBodyText(html) {
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/g, ' ');
  const withoutStyles = withoutScripts.replace(/<style[\s\S]*?<\/style>/g, ' ');
  return withoutStyles;
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

// Scoped to fa only: this step deliberately rewrote only the fa content of
// industrial-envelope-systems. en/ar/ru cannibalization (if any) is a
// pre-existing, out-of-scope condition tracked separately — asserting
// distinctness there would fail on a problem this step was told not to fix.
async function assertFaHubAndEnvelopeAreDistinct() {
  const hubHtml = await fetchHtml(hubPath('fa'));
  const envelopeHtml = await fetchHtml(envelopePath('fa'));

  const hubTitle = extractTag(hubHtml, 'title');
  const envelopeTitle = extractTag(envelopeHtml, 'title');
  const hubH1 = extractTag(hubHtml, 'h1');
  const envelopeH1 = extractTag(envelopeHtml, 'h1');
  const hubDescription = extractMetaDescription(hubHtml);
  const envelopeDescription = extractMetaDescription(envelopeHtml);

  if (!hubTitle || !envelopeTitle || hubTitle === envelopeTitle) {
    fail(`[fa] hub and envelope-coordination titles must differ, got identical: "${hubTitle}"`);
  }

  if (!hubH1 || !envelopeH1 || hubH1 === envelopeH1) {
    fail(`[fa] hub and envelope-coordination H1s must differ, got identical: "${hubH1}"`);
  }

  if (!hubDescription || !envelopeDescription || hubDescription === envelopeDescription) {
    fail('[fa] hub and envelope-coordination meta descriptions must differ, got identical');
  }

  const hubHasSelectionIntent = hubIntentMarkers.some((word) => hubH1.includes(word) || hubTitle.includes(word) || hubDescription.includes(word));
  if (!hubHasSelectionIntent) {
    fail(`[fa] /systems no longer reads as a selection/comparison hub (missing any of: ${hubIntentMarkers.join(', ')})`);
  }

  const envelopeHasCoordinationIntent = envelopeIntentMarkers.every(
    (word) => envelopeH1.includes(word) || envelopeTitle.includes(word) || envelopeDescription.includes(word)
  );
  if (!envelopeHasCoordinationIntent) {
    fail(`[fa] industrial-envelope-systems does not read as an interface-coordination page (missing one of: ${envelopeIntentMarkers.join(', ')})`);
  }

  if (envelopeTitle.includes('سیستم‌های پوشش صنعتی سقف و نما')) {
    fail('[fa] industrial-envelope-systems title must not reuse the hub\'s primary keyword phrase');
  }
}

async function assertEnvelopeLinksToHub(locale) {
  const envelopeHtml = await fetchHtml(envelopePath(locale));
  const hub = hubPath(locale);

  if (!envelopeHtml.includes('seo-inline-links')) {
    fail(`[${locale}] industrial-envelope-systems is missing the related-services inline-links block`);
  }

  const relatedBlockMatch = envelopeHtml.match(/seo-inline-links"[^>]*>([\s\S]*?)<\/div>/);

  if (!relatedBlockMatch || !relatedBlockMatch[1].includes(`href="${hub}"`)) {
    fail(`[${locale}] industrial-envelope-systems related-services block is missing a contextual link to the hub "${hub}"`);
  }

  if (envelopeHtml.includes('href="/fa/systems"') || envelopeHtml.includes('href="/fa"')) {
    fail(`[${locale}] industrial-envelope-systems must never generate a legacy /fa-prefixed link`);
  }

  const trailingSlashMatch = envelopeHtml.match(/href="\/(?:en\/|ar\/|ru\/)?systems\/"/);
  if (trailingSlashMatch) {
    fail(`[${locale}] found a trailing-slash systems link (${trailingSlashMatch[0]})`);
  }
}

async function assertCanonicalAndHreflang(locale) {
  const path = envelopePath(locale);
  const html = await fetchHtml(path);
  const canonical = extractCanonical(html);
  const expectedCanonical = `https://www.sipanelco.ir${path}`;

  if (canonical !== expectedCanonical) {
    fail(`[${locale}] expected canonical "${expectedCanonical}", got "${canonical}"`);
  }

  const hreflangs = extractHreflangs(html);
  const expectedLangs = ['fa-IR', 'en', 'ar', 'ru', 'x-default'];

  for (const lang of expectedLangs) {
    if (!hreflangs.some((item) => item.lang === lang)) {
      fail(`[${locale}] missing hreflang "${lang}" on industrial-envelope-systems`);
    }
  }
}

async function assertFaqVisibleMatchesSchema(locale) {
  const html = await fetchHtml(envelopePath(locale));
  const schemaQuestions = extractFaqSchemaQuestions(html);
  const visibleQuestions = extractVisibleFaqQuestions(html);

  if (!schemaQuestions || schemaQuestions.length === 0) {
    fail(`[${locale}] industrial-envelope-systems is missing FAQPage schema questions`);
  }

  if (visibleQuestions.length !== schemaQuestions.length) {
    fail(`[${locale}] visible FAQ count (${visibleQuestions.length}) does not match FAQPage schema count (${schemaQuestions.length})`);
  }

  for (const question of schemaQuestions) {
    if (!visibleQuestions.includes(question)) {
      fail(`[${locale}] FAQPage schema question not found in visible FAQ: "${question}"`);
    }
  }
}

async function assertNoFaLeakInOtherLocales(locale) {
  if (locale === 'fa' || locale === 'ar') {
    // Arabic script overlaps the Persian Unicode range, so it cannot be used
    // as a leak signal for ar; ar is instead covered by exact title/H1
    // equality checks against the known-good baseline below.
    return;
  }

  const html = await fetchHtml(envelopePath(locale));
  const visible = visibleBodyText(html);
  const persianOnlyMarkers = ['هماهنگی', 'رابط‌ها', 'پوسته ساختمان'];

  for (const marker of persianOnlyMarkers) {
    if (visible.includes(marker)) {
      fail(`[${locale}] found fa-override text "${marker}" leaking into a non-fa locale`);
    }
  }
}

const knownGoodNonFaBaseline = {
  en: {
    title: 'Industrial Envelope Systems | SIPANEL',
    h1: 'Industrial Envelope Systems Coordinated as One Execution Package.'
  },
  ar: {
    title: 'أنظمة أغلفة المباني الصناعية | SIPANEL',
    h1: 'أنظمة أغلفة المباني الصناعية'
  },
  ru: {
    title: 'Промышленные ограждающие системы | SIPANEL',
    h1: 'Промышленные ограждающие системы'
  }
};

async function assertNonFaLocalesUnchanged(locale) {
  const baseline = knownGoodNonFaBaseline[locale];
  if (!baseline) return;

  const html = await fetchHtml(envelopePath(locale));
  const title = extractTag(html, 'title');
  const h1 = extractTag(html, 'h1');

  if (title !== baseline.title) {
    fail(`[${locale}] industrial-envelope-systems title changed unexpectedly. Expected "${baseline.title}", got "${title}"`);
  }

  if (h1 !== baseline.h1) {
    fail(`[${locale}] industrial-envelope-systems H1 changed unexpectedly. Expected "${baseline.h1}", got "${h1}"`);
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

  await assertFaHubAndEnvelopeAreDistinct();

  for (const locale of locales) {
    await assertEnvelopeLinksToHub(locale);
    await assertCanonicalAndHreflang(locale);
    await assertFaqVisibleMatchesSchema(locale);
    await assertNoFaLeakInOtherLocales(locale);
    await assertNonFaLocalesUnchanged(locale);
  }

  process.stdout.write(`Systems/envelope-coordination cannibalization tests passed for ${locales.length} locales.\n`);
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (server) server.kill('SIGTERM');
  });
