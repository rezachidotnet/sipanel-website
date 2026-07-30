import {spawn} from 'node:child_process';
import process from 'node:process';

const port = process.env.PORT || '3102';
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const shouldStartServer = !process.env.BASE_URL;
const productionOrigin = 'https://www.sipanelco.ir';
const locales = ['fa', 'en', 'ar', 'ru'];
const languageTags = {fa: 'fa-IR', en: 'en', ar: 'ar', ru: 'ru'};
const htmlLangTags = {fa: 'fa', en: 'en', ar: 'ar', ru: 'ru'};
const dirByLocale = {fa: 'rtl', en: 'ltr', ar: 'rtl', ru: 'ltr'};
const focusedProjectSlugs = [
  'army-hospital',
  'mehrabad-aircraft-hangar',
  'ahvaz-airport-passenger-terminal',
  'kermanshah-industrial-university-petroleum-faculty',
  'mahshahr-taxi-parking'
];
const armyReferenceSectionOrder = [
  'case_study_hero',
  'case_study_group',
  'project_snapshot',
  'challenge_section',
  'engineering_decision_section',
  'execution_detail_section',
  'measured_result_section',
  'risk_prevented_section',
  'related_case_studies',
  'conversion_cta'
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

function localizedPath(locale, path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'fa') return normalized;
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
}

function localeOfPath(pathname) {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  if (pathname === '/ar' || pathname.startsWith('/ar/')) return 'ar';
  if (pathname === '/ru' || pathname.startsWith('/ru/')) return 'ru';
  return 'fa';
}

function stripLocale(pathname) {
  return pathname.replace(/^\/(?:en|ar|ru)(?=\/|$)/, '') || '/';
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getHead(html) {
  return html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
}

function stripBoilerplate(html) {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
}

function visibleText(html) {
  return decodeHtml(stripBoilerplate(html).replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function anchorText(html) {
  return decodeHtml(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function scriptRatio(text, pattern) {
  const letters = text.match(/\p{L}/gu) ?? [];
  if (letters.length === 0) return 0;
  const matching = text.match(pattern) ?? [];
  return matching.length / letters.length;
}

function longEnglishSentences(text) {
  return text
    .split(/(?<=[.!?؟؛])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => {
      const englishWords = (sentence.match(/[A-Za-z]{3,}/g) ?? []).filter(
        (word) => !/^(SIPANEL|EPC|BIM|CAD|ZIP|PIR|PUR|PVC|MTO|COVID|ISO|m|mm|cm|km|Iran|Tehran|Ahvaz|Kermanshah|Mehrabad|Mahshahr|ZIP-TECH)$/i.test(word)
      );
      const arabic = (sentence.match(/[\u0600-\u06FF]/g) ?? []).length;
      const cyrillic = (sentence.match(/[\u0400-\u04FF]/g) ?? []).length;
      return englishWords.length >= 6 && englishWords.join('').length > arabic + cyrillic;
    });
}

async function fetchHtml(path) {
  const response = await fetch(`${baseUrl}${path}`, {redirect: 'manual'});
  if (response.status !== 200) fail(`${path} expected HTTP 200, received ${response.status}`);
  return response.text();
}

function assertCanonical(path, html) {
  const canonical = getHead(html).match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1];
  const expected = `${productionOrigin}${path === '/' ? '' : path}`;
  if (canonical !== expected) fail(`${path} canonical mismatch: expected ${expected}, received ${canonical ?? 'missing'}`);
}

function assertHtmlLocale(path, locale, html) {
  const htmlTag = html.match(/<html[^>]*>/i)?.[0] ?? '';
  if (!new RegExp(`lang=["']${htmlLangTags[locale]}["']`, 'i').test(htmlTag)) {
    fail(`${path} missing html lang for ${locale}: ${htmlTag}`);
  }
  if (!new RegExp(`dir=["']${dirByLocale[locale]}["']`, 'i').test(htmlTag)) {
    fail(`${path} missing html dir for ${locale}: ${htmlTag}`);
  }
}

function assertNoLegacyPersianLinks(path, html) {
  if (/href=["']\/fa(?:\/|["'#?])/.test(html) || /https:\/\/www\.sipanelco\.ir\/fa(?:\/|["'#?])/.test(html)) {
    fail(`${path} contains a crawlable /fa URL`);
  }
}

function assertVisibleLanguage(path, locale, html) {
  const text = visibleText(html);
  const failures = locale === 'en' ? [] : longEnglishSentences(text);
  if (failures.length > 0) {
    fail(`${path} contains untranslated English descriptive text: ${failures.slice(0, 2).join(' | ')}`);
  }

  if (locale === 'fa' && scriptRatio(text, /[\u0600-\u06FF]/g) < 0.35) fail(`${path} Persian/Arabic script ratio is too low`);
  if (locale === 'ar' && scriptRatio(text, /[\u0600-\u06FF]/g) < 0.35) fail(`${path} Arabic script ratio is too low`);
  if (locale === 'ru' && scriptRatio(text, /[\u0400-\u04FF]/g) < 0.3) fail(`${path} Cyrillic script ratio is too low`);
}

function assertArmyReferenceLayout(path, html) {
  const sectionOrder = [...html.matchAll(/data-section=["']([^"']+)["']/g)].map((match) => match[1]);
  if (sectionOrder.join(' > ') !== armyReferenceSectionOrder.join(' > ')) {
    fail(`${path} section order drifted from Army Hospital reference: ${sectionOrder.join(' > ')}`);
  }

  const snapshotCards = (html.match(/class=["'][^"']*case-study-snapshot-card/g) ?? []).length;
  if (snapshotCards < 3) fail(`${path} expected at least three populated project facts, found ${snapshotCards}`);

  for (const required of [
    'case-study-challenge-title',
    'case-study-decision-title',
    'case-study-execution-title',
    'case-study-result-title',
    'case-study-risk-title',
    'case-study-related-title',
    'case-study-cta-title'
  ]) {
    if (!html.includes(required)) fail(`${path} missing required case-study heading anchor ${required}`);
  }
}

function assertLocalizedProjectMetadata(path, locale, html) {
  const head = getHead(html);
  const title = decodeHtml(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const description = decodeHtml(head.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["'][^>]*>/i)?.[1] ?? '');
  const ogDescription = decodeHtml(head.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["'][^>]*>/i)?.[1] ?? '');
  const combined = `${title} ${description} ${ogDescription}`;

  if (!title || !description) fail(`${path} missing localized title or meta description`);
  if (/placeholder case study|ساختار اولیه|بانتظار بيانات|Ожидаются подтвержденные данные/i.test(combined)) {
    fail(`${path} metadata contains placeholder or pending copy`);
  }

  assertVisibleLanguage(path, locale, `<main>${combined}</main>`);
}

function assertLocalizedSchema(path, locale, html) {
  const scripts = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => decodeHtml(match[1]));
  if (scripts.length === 0) fail(`${path} missing JSON-LD schema`);

  const combined = scripts.join(' ');
  const expectedLanguage = `"inLanguage":"${languageTags[locale]}"`;
  if (!combined.includes(expectedLanguage)) fail(`${path} schema missing ${expectedLanguage}`);
  if (/https:\/\/www\.sipanelco\.ir\/fa(?:\/|["'#?])/.test(combined)) fail(`${path} schema contains legacy /fa URL`);
  if (/placeholder case study|pending verified project data/i.test(combined)) fail(`${path} schema contains placeholder English copy`);
}

function assertRelatedCaseStudyLinks(path, locale, html) {
  const section = html.match(/<section[^>]*data-section=["']related_case_studies["'][\s\S]*?<\/section>/i)?.[0] ?? '';
  if (!section) fail(`${path} missing related case studies section`);

  const links = [...section.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  if (links.length < 2) fail(`${path} expected crawlable related case-study links, found ${links.length}`);

  for (const match of links) {
    const href = match[1];
    const destinationPath = href.split(/[?#]/)[0];
    if (/^\/fa(?:\/|$)/.test(destinationPath)) fail(`${path} related card links to legacy /fa URL via ${href}`);
    if (localeOfPath(destinationPath) !== locale) {
      fail(`${path} related card wrong-locale href "${anchorText(match[2])}" -> ${href}`);
    }
  }
}

async function assertProjectPages() {
  for (const slug of focusedProjectSlugs) {
    for (const locale of locales) {
      const path = localizedPath(locale, `/projects/${slug}`);
      const html = await fetchHtml(path);
      assertCanonical(path, html);
      assertHtmlLocale(path, locale, html);
      assertNoLegacyPersianLinks(path, html);
      assertVisibleLanguage(path, locale, html);
      assertArmyReferenceLayout(path, html);
      assertLocalizedProjectMetadata(path, locale, html);
      assertLocalizedSchema(path, locale, html);
      assertRelatedCaseStudyLinks(path, locale, html);

      if (locale !== 'en' && getHead(html).includes('placeholder case study')) {
        fail(`${path} metadata still contains English placeholder copy`);
      }
    }
  }
}

async function assertInternalLinks() {
  const sitemapXml = await fetch(`${baseUrl}/sitemap.xml`).then((response) => {
    if (response.status !== 200) fail(`/sitemap.xml expected HTTP 200, received ${response.status}`);
    return response.text();
  });
  const paths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const pathSet = new Set(paths);
  let checked = 0;

  for (const path of paths) {
    const locale = localeOfPath(path);
    const html = await fetchHtml(path);
    assertNoLegacyPersianLinks(path, html);
    assertVisibleLanguage(path, locale, html);

    for (const match of html.matchAll(/<a\b([^>]*?)href=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi)) {
      let href = match[2];
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('https://wa.me')) continue;
      if (/^https?:\/\//.test(href) && !href.startsWith(productionOrigin)) continue;
      if (href.startsWith(productionOrigin)) href = new URL(href).pathname + new URL(href).search;
      if (!href.startsWith('/')) continue;
      checked += 1;

      const destinationPath = href.split(/[?#]/)[0];
      if (/^\/fa(?:\/|$)/.test(destinationPath)) fail(`${path} links to legacy /fa URL via ${href}`);

      const destinationLocale = localeOfPath(destinationPath);
      const expectedSameLocale = localizedPath(locale, stripLocale(destinationPath));
      const text = anchorText(match[4]).toLowerCase();
      const languageSwitcher = /^(فارسی|english|العربية|русский|fa|en|ar|ru)$/.test(text);

      if (!languageSwitcher && destinationLocale !== locale && pathSet.has(expectedSameLocale)) {
        fail(`${path} wrong-locale link: "${anchorText(match[4])}" -> ${href}; expected ${expectedSameLocale}`);
      }
    }
  }

  process.stdout.write(`Locale link audit checked ${checked} internal anchors across ${paths.length} sitemap pages.\n`);
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

  await assertProjectPages();
  await assertInternalLinks();
  process.stdout.write('Locale integrity tests passed.\n');
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (server) server.kill('SIGTERM');
  });
