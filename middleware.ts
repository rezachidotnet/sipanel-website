import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {defaultLocale} from './i18n/routing';

export default function middleware(request: NextRequest) {
  const localPort = request.nextUrl.port || request.headers.get('host')?.split(':')[1];
  const url =
    localPort === '3000'
      ? new URL(`http://127.0.0.1:${localPort}/${defaultLocale}`)
      : request.nextUrl.clone();

  if (localPort !== '3000') {
    url.pathname = `/${defaultLocale}`;
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/']
};
