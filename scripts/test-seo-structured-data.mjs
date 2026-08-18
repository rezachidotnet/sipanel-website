import {spawn} from 'node:child_process';
import process from 'node:process';

const port = process.env.PORT || '3101';
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const shouldStartServer = !process.env.BASE_URL;
const productionOrigin = 'https://www.sipanelco.com';
const locales = ['fa', 'en', 'ar', 'ru'];
const languageTags = {fa: 'fa-IR', en: 'en', ar: 'ar', ru: 'ru'};
const invalidInLanguageTypes = new Set([
  'BreadcrumbList',
  'Organization',
  'ListItem',
  'ContactPoint',
  'PostalAddress',
  'ImageObject'
]);

const representativeRoutes = [
  {path: '/', locale: 'fa', canonical: productionOrigin},
  {path: '/en', locale: 'en', canonical: `${productionOrigin}/en`},
  {path: '/ar', locale: 'ar', canonical: `${productionOrigin}/ar`},
  {path: '/ru', locale: 'ru', canonical: `${productionOrigin}/ru`},
  {path: '/projects', locale: 'fa', canonical: `${productionOrigin}/projects`},
  {path: '/en/projects', locale: 'en', canonical: `${productionOrigin}/en/projects`},
  {path: '/ar/projects', locale: 'ar', canonical: `${productionOrigin}/ar/projects`},
  {path: '/ru/projects', locale: 'ru', canonical: `${productionOrigin}/ru/projects`},
  {path: '/systems/sandwich-panel-systems', locale: 'fa', canonical: `${productionOrigin}/systems/sandwich-panel-systems`},
  {path: '/solutions/industrial-envelope-systems', locale: 'fa', canonical: `${productionOrigin}/solutions/industrial-envelope-systems`},
  {path: '/projects/army-hospital', locale: 'fa', canonical: `${productionOrigin}/projects/army-hospital`},
  {path: '/about', locale: 'fa', canonical: `${productionOrigin}/about`},
  {path: '/contact', locale: 'fa', canonical: `${productionOrigin}/contact`},
  {path: '/faq', locale: 'fa', canonical: `${productionOrigin}/faq`},
  {path: '/resources', locale: 'fa', canonical: `${productionOrigin}/resources`},
  {path: '/insights/sandwich-panel-joint-leakage-risk', locale: 'fa', canonical: `${productionOrigin}/insights/sandwich-panel-joint-leakage-risk`}
];

const filteredProjectRoutes = [
  {path: '/projects?filter=sandwich', locale: 'fa', canonical: `${productionOrigin}/projects`},
  {path: '/en/projects?filter=sandwich', locale: 'en', canonical: `${productionOrigin}/en/projects`},
  {path: '/ar/projects?filter=sandwich', locale: 'ar', canonical: `${productionOrigin}/ar/projects`},
  {path: '/ru/projects?filter=sandwich', locale: 'ru', canonical: `${productionOrigin}/ru/projects`}
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
      // Wait until Next.js is ready.
    }

    await sleep(1000);
  }

  fail(`Timed out waiting for ${baseUrl}`);
}

async function fetchHtml(path, headers) {
  const response = await fetch(`${baseUrl}${path}`, {headers, redirect: 'manual'});

  if (response.status !== 200) {
    fail(`${path} expected HTTP 200, received ${response.status}`);
  }

  return response.text();
}

function getHead(html) {
  return html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
}

function getCanonicalLinks(head) {
  return [...head.matchAll(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
}

function getHrefLangs(head) {
  return [...head.matchAll(/<link\s+[^>]*rel=["']alternate["'][^>]*>/gi)].map((match) => {
    const tag = match[0];
    return {
      lang: tag.match(/hrefLang=["']([^"']+)["']/i)?.[1] ?? tag.match(/hreflang=["']([^"']+)["']/i)?.[1] ?? '',
      href: tag.match(/href=["']([^"']+)["']/i)?.[1] ?? ''
    };
  });
}

function getJsonLd(html) {
  return [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap((match) => {
    let parsed;

    try {
      parsed = JSON.parse(match[1]);
    } catch (error) {
      fail(`Malformed JSON-LD: ${error.message}`);
    }

    return Array.isArray(parsed?.['@graph']) ? parsed['@graph'] : [parsed];
  });
}

function stripBoilerplate(html) {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
}

function visibleText(html) {
  return stripBoilerplate(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function scriptRatio(text, pattern) {
  const letters = text.match(/\p{L}/gu) ?? [];
  if (letters.length === 0) return 0;
  const matching = text.match(pattern) ?? [];
  return matching.length / letters.length;
}

function tokenOverlap(a, b) {
  const tokenSet = (value) => new Set((value.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) ?? []));
  const left = tokenSet(a);
  const right = tokenSet(b);
  let intersection = 0;

  for (const token of left) {
    if (right.has(token)) intersection += 1;
  }

  return intersection / Math.max(1, Math.min(left.size, right.size));
}

function schemaTypes(node) {
  const type = node?.['@type'];
  return Array.isArray(type) ? type : type ? [type] : [];
}

function walk(node, visit) {
  if (Array.isArray(node)) {
    node.forEach((item) => walk(item, visit));
    return;
  }

  if (!node || typeof node !== 'object') return;

  visit(node);
  Object.values(node).forEach((value) => walk(value, visit));
}

function assertNoInvalidInLanguage(node) {
  walk(node, (item) => {
    if (!Object.prototype.hasOwnProperty.call(item, 'inLanguage')) return;

    for (const type of schemaTypes(item)) {
      if (invalidInLanguageTypes.has(type)) {
        fail(`${type} must not contain inLanguage`);
      }
    }
  });
}

function assertNoBadUrls(node) {
  walk(node, (item) => {
    for (const [key, value] of Object.entries(item)) {
      if (!['@id', 'url', 'item', 'href'].includes(key) || typeof value !== 'string') continue;

      if (!value || value.includes('undefined') || value.includes('localhost') || value.includes('127.0.0.1')) {
        fail(`Invalid URL value for ${key}: ${value}`);
      }

      if (/https:\/\/www\.sipanelco\.com\/fa(?=[/?#]|$)/.test(value)) {
        fail(`Persian URL contains /fa: ${value}`);
      }

      if (value.includes('sipanelco.ir')) {
        fail(`Schema URL value still references legacy sipanelco.ir: ${value}`);
      }
    }
  });
}

function assertNoProjectQuerySchemaUrls(node) {
  walk(node, (item) => {
    for (const [key, value] of Object.entries(item)) {
      if (!['@id', 'url', 'item', 'href'].includes(key) || typeof value !== 'string') continue;

      if (value.includes('/projects?')) {
        fail(`Schema URL contains project filter query for ${key}: ${value}`);
      }
    }
  });
}

function assertBreadcrumb(schema, canonical) {
  const breadcrumbs = schema.filter((item) => schemaTypes(item).includes('BreadcrumbList'));

  for (const breadcrumb of breadcrumbs) {
    if (Object.prototype.hasOwnProperty.call(breadcrumb, 'inLanguage')) {
      fail('BreadcrumbList contains inLanguage');
    }

    const items = breadcrumb.itemListElement ?? [];
    items.forEach((item, index) => {
      if (item.position !== index + 1) {
        fail(`Breadcrumb position ${item.position} is not sequential`);
      }

      if (Object.prototype.hasOwnProperty.call(item, 'inLanguage')) {
        fail('ListItem contains inLanguage');
      }
    });

    const finalItem = items.at(-1)?.item;
    if (finalItem !== canonical) {
      fail(`Breadcrumb final URL mismatch: expected ${canonical}, received ${finalItem}`);
    }
  }
}

function assertPageSchema(schema, route) {
  if (['/', '/en', '/ar', '/ru'].includes(route.path)) {
    return;
  }

  const pageSchema = schema.find((item) =>
    ['WebPage', 'CollectionPage', 'AboutPage', 'ContactPage'].some((type) => schemaTypes(item).includes(type))
  );

  if (!pageSchema && route.path !== '/') {
    fail(`${route.path} is missing page-level schema`);
  }

  if (!pageSchema) return;

  if (pageSchema.url !== route.canonical) {
    fail(`${route.path} page schema URL mismatch: ${pageSchema.url}`);
  }

  if (pageSchema['@id'] !== `${route.canonical}#webpage`) {
    fail(`${route.path} page schema @id mismatch: ${pageSchema['@id']}`);
  }

  if (pageSchema.inLanguage !== languageTags[route.locale]) {
    fail(`${route.path} page schema language mismatch: ${pageSchema.inLanguage}`);
  }
}

function assertDuplicateIds(schema) {
  const ids = new Map();

  for (const item of schema) {
    const id = item?.['@id'];
    if (!id) continue;

    const fingerprint = JSON.stringify({type: item['@type'], url: item.url, name: item.name, headline: item.headline});
    const previous = ids.get(id);

    if (previous && previous !== fingerprint) {
      fail(`Duplicate @id represents different entities: ${id}`);
    }

    ids.set(id, fingerprint);
  }
}

async function assertRoute(route) {
  const html = await fetchHtml(route.path);
  const canonicalLinks = getCanonicalLinks(html);

  if (canonicalLinks.length !== 1 || canonicalLinks[0] !== route.canonical) {
    fail(`${route.path} canonical mismatch: ${canonicalLinks.join(', ') || 'missing'}`);
  }

  const hrefLangs = getHrefLangs(html);
  for (const locale of locales) {
    const expectedPath = locale === 'fa' ? route.path.replace(/^\/(?:en|ar|ru)(?=\/|$)/, '') || '/' : `/${locale}${route.path.replace(/^\/(?:en|ar|ru)(?=\/|$)/, '')}`;
    const normalizedExpectedPath = expectedPath === `/${locale}/` ? `/${locale}` : expectedPath;
    const expectedHref = normalizedExpectedPath === '/' ? productionOrigin : `${productionOrigin}${normalizedExpectedPath}`;

    if (!hrefLangs.some((item) => item.lang === languageTags[locale] && item.href === expectedHref)) {
      fail(`${route.path} missing hreflang ${languageTags[locale]} -> ${expectedHref}`);
    }
  }

  if (!hrefLangs.some((item) => item.lang === 'x-default' && item.href === route.canonical.replace(/^https:\/\/www\.sipanelco\.com\/(?:en|ar|ru)(?=\/|$)/, productionOrigin))) {
    fail(`${route.path} missing x-default`);
  }

  if (html.includes('/fa/sitemap.xml') || html.includes('/en/sitemap.xml') || html.includes('/ar/sitemap.xml') || html.includes('/ru/sitemap.xml')) {
    fail(`${route.path} contains locale-prefixed sitemap link`);
  }

  if (/\bhref=["']\/fa(?:\/|["'#?])/.test(html) || html.includes('https://www.sipanelco.com/fa/') || html.includes('https://www.sipanelco.ir/fa/')) {
    fail(`${route.path} contains legacy /fa internal link`);
  }

  // The info@sipanelco.ir contact email is intentionally preserved during the
  // domain migration (mailbox migration is a separate, later step) — only
  // flag sipanelco.ir occurrences that are NOT part of that email address.
  const nonEmailIrMatches = html.match(/sipanelco\.ir/g)?.length ?? 0;
  const emailIrMatches = html.match(/info@sipanelco\.ir/g)?.length ?? 0;
  if (nonEmailIrMatches > emailIrMatches) {
    fail(`${route.path} contains a legacy sipanelco.ir URL reference in generated SEO output`);
  }

  if (/href=["'][^"']*(?:\/projects\?|\?filter=)/.test(html)) {
    fail(`${route.path} contains crawlable project filter href`);
  }

  const schema = getJsonLd(html);
  assertNoInvalidInLanguage(schema);
  assertNoBadUrls(schema);
  assertNoProjectQuerySchemaUrls(schema);
  assertDuplicateIds(schema);
  assertBreadcrumb(schema, route.canonical);
  assertPageSchema(schema, route);
}

async function assertFilteredProjectRoute(route) {
  const html = await fetchHtml(route.path);
  const canonicalLinks = getCanonicalLinks(html);

  if (canonicalLinks.length !== 1 || canonicalLinks[0] !== route.canonical) {
    fail(`${route.path} canonical mismatch: ${canonicalLinks.join(', ') || 'missing'}`);
  }

  if (/<meta\s+[^>]*(?:name|property)=["']robots["'][^>]*noindex/i.test(html)) {
    fail(`${route.path} must not emit noindex`);
  }

  if (/href=["'][^"']*(?:\/projects\?|\?filter=)/.test(html)) {
    fail(`${route.path} contains crawlable project filter href`);
  }

  const schema = getJsonLd(html);
  assertNoInvalidInLanguage(schema);
  assertNoBadUrls(schema);
  assertNoProjectQuerySchemaUrls(schema);
  assertDuplicateIds(schema);
  assertBreadcrumb(schema, route.canonical);
  assertPageSchema(schema, route);
}

async function assertLocaleHeaders() {
  const faWithEnglishHeader = await fetch(`${baseUrl}/projects`, {
    headers: {'Accept-Language': 'en-US,en;q=0.9'},
    redirect: 'manual'
  });
  if (faWithEnglishHeader.status !== 200) fail(`/projects redirected or failed with Accept-Language en: ${faWithEnglishHeader.status}`);

  const enWithPersianHeader = await fetch(`${baseUrl}/en/projects`, {
    headers: {'Accept-Language': 'fa-IR,fa;q=0.9'},
    redirect: 'manual'
  });
  if (enWithPersianHeader.status !== 200) fail(`/en/projects redirected or failed with Accept-Language fa: ${enWithPersianHeader.status}`);
}

async function assertSitemap() {
  const response = await fetch(`${baseUrl}/sitemap.xml`);
  if (response.status !== 200) fail(`/sitemap.xml expected HTTP 200, received ${response.status}`);

  const xml = await response.text();
  const secondResponse = await fetch(`${baseUrl}/sitemap.xml`);
  const secondXml = await secondResponse.text();

  if (xml !== secondXml) fail('Sitemap output changed across repeated generation');
  if (/https:\/\/www\.sipanelco\.com\/fa(?=[/?#"<\s]|$)/.test(xml)) fail('Sitemap contains /fa URL');
  if (xml.includes('sipanelco.ir')) fail('Sitemap contains a legacy sipanelco.ir URL');
  if (/<loc>[^<]*\?[^<]*<\/loc>/.test(xml)) fail('Sitemap contains a query-string URL');
  if (/<loc>[^<]*#[^<]*<\/loc>/.test(xml)) fail('Sitemap contains a fragment URL');
  if (/\/(?:fa|en|ar|ru)\/sitemap\.xml/.test(xml)) fail('Sitemap contains locale-prefixed sitemap URL');
  if (/\/projects\?filter=/.test(xml)) fail('Sitemap contains parameterized project filter URL');

  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const uniqueUrls = new Set(urls);
  if (urls.length !== uniqueUrls.size) fail('Sitemap contains duplicate URLs');

  const localeCounts = {fa: 0, en: 0, ar: 0, ru: 0};
  for (const url of urls) {
    if (!url.startsWith(`${productionOrigin}/`) && url !== productionOrigin) {
      fail(`Sitemap contains a non-canonical URL: ${url}`);
    }

    if (url === productionOrigin || url.startsWith(`${productionOrigin}/`)) {
      const path = new URL(url).pathname;
      const segment = path.split('/').filter(Boolean)[0];
      if (segment === 'en' || segment === 'ar' || segment === 'ru') localeCounts[segment] += 1;
      else localeCounts.fa += 1;
    }
  }

  if (new Set(Object.values(localeCounts)).size !== 1) {
    fail(`Sitemap locale counts are not balanced: ${JSON.stringify(localeCounts)}`);
  }

  for (const lastmod of [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1])) {
    if (Number.isNaN(Date.parse(lastmod))) fail(`Invalid sitemap lastmod: ${lastmod}`);
    if (/2026-07-23T08:12:59\.32[456]Z/.test(lastmod)) fail(`Sitemap contains deployment-generated lastmod: ${lastmod}`);
  }
}

async function assertProjectLocalizationQuality() {
  const [enHtml, arHtml, ruHtml] = await Promise.all([
    fetchHtml('/en/projects'),
    fetchHtml('/ar/projects'),
    fetchHtml('/ru/projects')
  ]);

  const enText = visibleText(enHtml);
  const arText = visibleText(arHtml);
  const ruText = visibleText(ruHtml);
  const arRatio = scriptRatio(arText, /[\u0600-\u06FF]/g);
  const ruRatio = scriptRatio(ruText, /[\u0400-\u04FF]/g);

  if (arRatio < 0.55) fail(`/ar/projects Arabic-script ratio too low: ${arRatio.toFixed(3)}`);
  if (ruRatio < 0.55) fail(`/ru/projects Cyrillic-script ratio too low: ${ruRatio.toFixed(3)}`);

  for (const phrase of [
    'The main challenge was',
    'The project required',
    'Successful execution',
    'Engineering teams coordinated',
    'Risks prevented'
  ]) {
    if (arText.includes(phrase)) fail(`/ar/projects contains untranslated English phrase: ${phrase}`);
    if (ruText.includes(phrase)) fail(`/ru/projects contains untranslated English phrase: ${phrase}`);
  }

  const arOverlap = tokenOverlap(enText, arText);
  const ruOverlap = tokenOverlap(enText, ruText);
  if (arOverlap > 0.35) fail(`/en/projects and /ar/projects overlap too high: ${arOverlap.toFixed(3)}`);
  if (ruOverlap > 0.35) fail(`/en/projects and /ru/projects overlap too high: ${ruOverlap.toFixed(3)}`);
}

async function assertArabicAboutQuality() {
  const html = await fetchHtml('/ar/about');
  const head = getHead(html);
  const text = visibleText(html);
  const arabicRatio = scriptRatio(text, /[\u0600-\u06FF]/g);

  if (!getCanonicalLinks(head).includes(`${productionOrigin}/ar/about`)) fail('/ar/about canonical missing');
  if (arabicRatio < 0.65) fail(`/ar/about Arabic-script ratio too low: ${arabicRatio.toFixed(3)}`);
  if (text.includes('Engineering-Controlled Industrial Envelope Systems')) fail('/ar/about contains English fallback H1 text');
  if (!text.includes('رسومات الشوب') || !text.includes('العزل المائي') || !text.includes('التوريد')) {
    fail('/ar/about is missing expected substantive Arabic engineering content');
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

  for (const route of representativeRoutes) {
    await assertRoute(route);
  }

  for (const route of filteredProjectRoutes) {
    await assertFilteredProjectRoute(route);
  }

  await assertProjectLocalizationQuality();
  await assertArabicAboutQuality();
  await assertLocaleHeaders();
  await assertSitemap();
  console.log(`Structured data SEO tests passed for ${representativeRoutes.length} representative routes.`);
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (server) server.kill('SIGTERM');
  });
