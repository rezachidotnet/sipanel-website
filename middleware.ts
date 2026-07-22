import createMiddleware from 'next-intl/middleware';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);
const canonicalHostname = 'www.sipanelco.ir';
const productionHostnames = new Set(['sipanelco.ir', canonicalHostname]);

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

function getForwardedProtocol(request: NextRequest) {
  return request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '');
}

function getRequestHostname(request: NextRequest) {
  return request.headers.get('host')?.split(':')[0] ?? request.nextUrl.hostname;
}

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const requestHostname = getRequestHostname(request);
  let shouldRedirect = false;

  if (isLocalePrefixedSitemapPath(url.pathname)) {
    url.pathname = '/sitemap.xml';
    shouldRedirect = true;
  } else if (isLegacyPersianPath(url.pathname)) {
    url.pathname = stripLegacyPersianPrefix(url.pathname);
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
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/(fa|en|ar|ru)/sitemap.xml']
};
