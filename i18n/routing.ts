import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const locales = ['fa', 'en', 'ar', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fa';

export const rtlLocales: Locale[] = ['fa', 'ar'];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
  alternateLinks: false
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);

export function normalizeCanonicalPath(path: string) {
  if (path.startsWith('http')) {
    const url = new URL(path);
    url.pathname = normalizeCanonicalPath(url.pathname);
    return url.toString();
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (normalizedPath === `/${defaultLocale}`) {
    return '/';
  }

  if (normalizedPath.startsWith(`/${defaultLocale}/`)) {
    return normalizedPath.slice(defaultLocale.length + 1);
  }

  return normalizedPath;
}

export function getLocalizedPath(locale: Locale, path = '/') {
  const normalizedPath = normalizeCanonicalPath(path);

  if (locale === defaultLocale) {
    return normalizedPath;
  }

  return normalizedPath === '/' ? `/${locale}` : `/${locale}${normalizedPath}`;
}

export function getLanguageTag(locale: Locale) {
  return locale === 'fa' ? 'fa-IR' : locale;
}

export function normalizeLocalizedRouteMap<T extends Record<Locale, string>>(routes: T): T {
  return Object.fromEntries(
    locales.map((locale) => {
      const routePath = normalizeCanonicalPath(routes[locale]);
      const unprefixedPath = routePath.replace(/^\/(?:en|ar|ru)(?=\/|$)/, '') || '/';
      return [locale, getLocalizedPath(locale, unprefixedPath)];
    })
  ) as T;
}

export function getDirection(locale: Locale) {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}
