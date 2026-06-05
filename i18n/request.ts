import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {defaultLocale, locales, type Locale} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocale = (await requestLocale) ?? defaultLocale;

  if (!locales.includes(requestedLocale as Locale)) {
    notFound();
  }

  return {
    locale: requestedLocale,
    messages: (await import(`../messages/${requestedLocale}.json`)).default
  };
});
