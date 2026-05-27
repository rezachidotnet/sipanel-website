import type {Metadata} from 'next';
import {defaultLocale, locales, type Locale} from '@/i18n/routing';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';

export type LocalizedRouteMap = Record<Locale, string>;

type BuildPageMetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  routes: LocalizedRouteMap;
  type?: 'website' | 'article';
};

export function getSiteBaseUrl() {
  const website = productionContactInfo.website?.trim();

  if (!website) {
    return 'https://www.sipanelco.ir';
  }

  return website.startsWith('http') ? website.replace(/\/$/, '') : `https://${website.replace(/\/$/, '')}`;
}

export function withBaseUrl(path: string) {
  if (path.startsWith('http')) {
    return path;
  }

  return `${getSiteBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildAlternates(locale: Locale, routes: LocalizedRouteMap) {
  return {
    canonical: routes[locale],
    languages: {
      ...Object.fromEntries(locales.map((item) => [item, routes[item]])),
      'x-default': routes[defaultLocale]
    }
  };
}

export function buildPageMetadata({locale, title, description, routes, type = 'website'}: BuildPageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: buildAlternates(locale, routes),
    openGraph: {
      title,
      description,
      locale,
      url: routes[locale],
      type
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
