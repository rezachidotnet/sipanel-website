import createMiddleware from 'next-intl/middleware';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {routing} from './i18n/routing';
import {prefersMarkdown} from './lib/markdown/accept';

const intlMiddleware = createMiddleware(routing);
const canonicalHostname = 'www.sipanelco.com';
const productionHostnames = new Set(['sipanelco.ir', 'www.sipanelco.ir', 'sipanelco.com', canonicalHostname]);
const markdownInternalHeader = 'x-sipanel-markdown-internal';

function isLegacyPersianPath(pathname: string) {
  return pathname === '/fa' || pathname.startsWith('/fa/');
}

function stripLegacyPersianPrefix(pathname: string) {
  if (pathname === '/fa' || pathname === '/fa/') {
    return '/';
  }

  return pathname.slice('/fa'.length);
}

function isLocalePrefixedSitemapPath(pathname: string) {
  return /^\/(?:fa|en|ar|ru)\/sitemap\.xml$/.test(pathname);
}

function shouldNormalizeTrailingSlash(pathname: string) {
  return pathname !== '/' && pathname.endsWith('/');
}

function getForwardedProtocol(request: NextRequest) {
  return request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '');
}

function getRequestHostname(request: NextRequest) {
  return request.headers.get('host')?.split(':')[0] ?? request.nextUrl.hostname;
}

function addAcceptVary(response: NextResponse) {
  const fields = response.headers
    .get('vary')
    ?.split(',')
    .map((field) => field.trim())
    .filter(Boolean) ?? [];

  if (!fields.some((field) => field.toLowerCase() === 'accept')) {
    fields.push('Accept');
  }

  response.headers.set('Vary', fields.join(', '));
  return response;
}

function isMarkdownEligibleRequest(request: NextRequest) {
  if (request.headers.get(markdownInternalHeader) === '1') {
    return false;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return false;
  }

  return prefersMarkdown(request.headers.get('accept'));
}

function isExplicitLocalePath(pathname: string) {
  return /^\/(?:fa|en|ar|ru)(?:\/|$)/.test(pathname);
}

function rewriteDefaultLocaleRequest(request: NextRequest, url: URL) {
  if (isExplicitLocalePath(url.pathname)) {
    return null;
  }

  const rewriteUrl = new URL(url);
  rewriteUrl.pathname = url.pathname === '/' ? '/fa' : `/fa${url.pathname}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(markdownInternalHeader, '1');

  const response = NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeaders
    }
  });
  response.cookies.set('NEXT_LOCALE', 'fa', {path: '/', sameSite: 'lax'});

  return addAcceptVary(response);
}

export default function middleware(request: NextRequest) {
  if (request.headers.get(markdownInternalHeader) === '1') {
    return NextResponse.next();
  }

  const url = new URL(request.url);

  if (url.pathname === '/robots.txt') {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(markdownInternalHeader, '1');

    return NextResponse.rewrite(new URL('/robots-content', request.url), {
      request: {
        headers: requestHeaders
      }
    });
  }

  const requestHostname = getRequestHostname(request);
  let shouldRedirect = false;

  if (isLocalePrefixedSitemapPath(url.pathname)) {
    url.pathname = '/sitemap.xml';
    shouldRedirect = true;
  } else if (isLegacyPersianPath(url.pathname)) {
    url.pathname = stripLegacyPersianPrefix(url.pathname);
    shouldRedirect = true;
  }

  if (shouldNormalizeTrailingSlash(url.pathname)) {
    url.pathname = url.pathname.replace(/\/+$/, '');
    shouldRedirect = true;
  }

  if (productionHostnames.has(requestHostname)) {
    url.hostname = canonicalHostname;
    url.port = '';

    if (requestHostname !== canonicalHostname) {
      shouldRedirect = true;
    }

    if (getForwardedProtocol(request) === 'http' || url.protocol === 'http:') {
      url.protocol = 'https:';
      shouldRedirect = true;
    }
  }

  if (shouldRedirect) {
    return addAcceptVary(NextResponse.redirect(url, 308));
  }

  if (isMarkdownEligibleRequest(request)) {
    const markdownUrl = new URL('/api/markdown', request.url);
    markdownUrl.searchParams.set('path', `${url.pathname}${url.search}`);
    return addAcceptVary(NextResponse.rewrite(markdownUrl));
  }

  const defaultLocaleResponse = rewriteDefaultLocaleRequest(request, url);

  if (defaultLocaleResponse) {
    return defaultLocaleResponse;
  }

  return addAcceptVary(intlMiddleware(request));
}

export const config = {
  matcher: ['/robots.txt', '/((?!api|_next|_vercel|.*\\..*).*)', '/(fa|en|ar|ru)/sitemap.xml']
};
