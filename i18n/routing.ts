import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const locales = ['fa', 'en', 'ar', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fa';

export const rtlLocales: Locale[] = ['fa', 'ar'];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);

export function getDirection(locale: Locale) {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}
