import {spawn} from 'node:child_process';
import process from 'node:process';

const port = process.env.PORT || '3101';
const baseUrl = process.env.BASE_URL || `http://127.0.0.1:${port}`;
const shouldStartServer = !process.env.BASE_URL;
const productionOrigin = 'https://www.sipanelco.ir';
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

      if (/https:\/\/www\.sipanelco\.ir\/fa(?=[/?#]|$)/.test(value)) {
        fail(`Persian URL contains /fa: ${value}`);
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
  const head = getHead(html);
  const canonicalLinks = getCanonicalLinks(head);

  if (canonicalLinks.length !== 1 || canonicalLinks[0] !== route.canonical) {
    fail(`${route.path} canonical mismatch: ${canonicalLinks.join(', ') || 'missing'}`);
  }

  const hrefLangs = getHrefLangs(head);
  for (const locale of locales) {
    const expectedPath = locale === 'fa' ? route.path.replace(/^\/(?:en|ar|ru)(?=\/|$)/, '') || '/' : `/${locale}${route.path.replace(/^\/(?:en|ar|ru)(?=\/|$)/, '')}`;
    const normalizedExpectedPath = expectedPath === `/${locale}/` ? `/${locale}` : expectedPath;
    const expectedHref = normalizedExpectedPath === '/' ? productionOrigin : `${productionOrigin}${normalizedExpectedPath}`;

    if (!hrefLangs.some((item) => item.lang === languageTags[locale] && item.href === expectedHref)) {
      fail(`${route.path} missing hreflang ${languageTags[locale]} -> ${expectedHref}`);
    }
  }

  if (!hrefLangs.some((item) => item.lang === 'x-default' && item.href === route.canonical.replace(/^https:\/\/www\.sipanelco\.ir\/(?:en|ar|ru)(?=\/|$)/, productionOrigin))) {
    fail(`${route.path} missing x-default`);
  }

  if (html.includes('/fa/sitemap.xml') || html.includes('/en/sitemap.xml') || html.includes('/ar/sitemap.xml') || html.includes('/ru/sitemap.xml')) {
    fail(`${route.path} contains locale-prefixed sitemap link`);
  }

  const schema = getJsonLd(html);
  assertNoInvalidInLanguage(schema);
  assertNoBadUrls(schema);
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
  if (/https:\/\/www\.sipanelco\.ir\/fa(?=[/?#"<\s]|$)/.test(xml)) fail('Sitemap contains /fa URL');
  if (/\/(?:fa|en|ar|ru)\/sitemap\.xml/.test(xml)) fail('Sitemap contains locale-prefixed sitemap URL');
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
