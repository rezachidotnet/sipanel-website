const baseUrl = process.env.SEO_AUDIT_BASE_URL ?? 'http://127.0.0.1:3000';
const productionOrigin = 'https://www.sipanelco.ir';
const locales = ['fa', 'en', 'ar', 'ru'];
const languageTags = {fa: 'fa-IR', en: 'en', ar: 'ar', ru: 'ru'};
const requiredSchemaTypes = ['Organization', 'BreadcrumbList', 'Service', 'FAQPage', 'Article', 'CollectionPage', 'ContactPage'];

function stripScripts(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

function getHead(html) {
  return html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
}

function getBodyWithoutScripts(html) {
  return stripScripts(html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '');
}

function getMetaContent(head, name) {
  return head.match(new RegExp(`<meta\\s+[^>]*(?:name|property)=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`, 'i'))?.[1] ?? '';
}

function getTitle(head) {
  return head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
}

function getCanonical(head) {
  return head.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] ?? '';
}

function getHrefLangs(head) {
  const matches = [...head.matchAll(/<link\s+[^>]*rel=["']alternate["'][^>]*>/gi)];
  return matches.map((match) => {
    const tag = match[0];
    return {
      lang: tag.match(/hrefLang=["']([^"']+)["']/i)?.[1] ?? tag.match(/hreflang=["']([^"']+)["']/i)?.[1] ?? '',
      href: tag.match(/href=["']([^"']+)["']/i)?.[1] ?? ''
    };
  });
}

function getVisibleH1Count(html) {
  return (getBodyWithoutScripts(html).match(/<h1\b/gi) ?? []).length;
}

function getSchemaTypes(html) {
  return [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap((match) => {
      try {
        const parsed = JSON.parse(match[1]);
        const graph = Array.isArray(parsed?.['@graph']) ? parsed['@graph'] : [parsed];
        return graph.flatMap((item) => Array.isArray(item?.['@type']) ? item['@type'] : [item?.['@type']]).filter(Boolean);
      } catch {
        return ['INVALID_JSON_LD'];
      }
    });
}

function pathFromUrl(url) {
  return new URL(url).pathname;
}

function expectedLocale(pathname) {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return locales.includes(firstSegment) && firstSegment !== 'fa' ? firstSegment : 'fa';
}

function unprefixedPersianPath(pathname) {
  return pathname.replace(/^\/(?:en|ar|ru)(?=\/|$)/, '') || '/';
}

function localizedPath(locale, pathname) {
  const persianPath = unprefixedPersianPath(pathname);
  return locale === 'fa' ? persianPath : persianPath === '/' ? `/${locale}` : `/${locale}${persianPath}`;
}

function productionUrl(pathname) {
  return pathname === '/' ? productionOrigin : `${productionOrigin}${pathname}`;
}

async function fetchText(path) {
  const response = await fetch(`${baseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`${response.status} ${path}`);
  }

  return response.text();
}

const sitemapXml = await fetchText('/sitemap.xml');
const routePaths = [...new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => pathFromUrl(match[1])))]
  .sort();

const failures = [];
const schemaTypes = new Set();

for (const routePath of routePaths) {
  const html = await fetchText(routePath);
  const head = getHead(html);
  const title = getTitle(head);
  const description = getMetaContent(head, 'description');
  const canonical = getCanonical(head);
  const hrefLangs = getHrefLangs(head);
  const h1Count = getVisibleH1Count(html);
  const pageSchemaTypes = getSchemaTypes(html);
  pageSchemaTypes.forEach((type) => schemaTypes.add(type));

  if (!title) {
    failures.push(`${routePath}: missing title`);
  }

  if (!description) {
    failures.push(`${routePath}: missing meta description`);
  }

  if (!canonical) {
    failures.push(`${routePath}: missing canonical`);
  } else if (pathFromUrl(canonical) !== routePath) {
    failures.push(`${routePath}: canonical path mismatch (${canonical})`);
  }

  for (const locale of locales) {
    const expectedHref = productionUrl(localizedPath(locale, routePath));
    if (!hrefLangs.some((item) => item.lang === languageTags[locale] && item.href === expectedHref)) {
      failures.push(`${routePath}: missing hreflang ${languageTags[locale]}`);
    }
  }

  if (h1Count !== 1) {
    failures.push(`${routePath}: expected one visible H1, found ${h1Count}`);
  }

  if (!pageSchemaTypes.includes('Organization') && !pageSchemaTypes.includes('LocalBusiness')) {
    failures.push(`${routePath}: missing Organization or LocalBusiness schema`);
  }

  if (routePath.split('/').filter(Boolean).length > 1 && !pageSchemaTypes.includes('BreadcrumbList')) {
    failures.push(`${routePath}: missing BreadcrumbList schema`);
  }

  if (routePath.startsWith('/fa/') || routePath === '/fa') {
    failures.push(`${routePath}: route uses legacy /fa prefix`);
  }
}

for (const schemaType of requiredSchemaTypes) {
  if (!schemaTypes.has(schemaType)) {
    failures.push(`schema coverage: missing ${schemaType}`);
  }
}

if (sitemapXml.includes('http://127.0.0.1') || sitemapXml.includes('localhost')) {
  failures.push('sitemap: contains local development host');
}

if (/https:\/\/www\.sipanelco\.ir\/fa(?=[/?#"<\s]|$)/.test(sitemapXml)) {
  failures.push('sitemap: contains redirected /fa URL');
}

if (failures.length > 0) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`SEO audit passed for ${routePaths.length} localized routes.`);
console.log(`Schema types found: ${[...schemaTypes].sort().join(', ')}`);
