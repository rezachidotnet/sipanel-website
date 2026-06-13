import type {Metadata} from 'next';
import {defaultLocale, locales, type Locale} from '@/i18n/routing';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';

export type LocalizedRouteMap = Record<Locale, string>;

export type OgSection = 'default' | 'resources' | 'projects' | 'systems';

type BuildPageMetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  routes: LocalizedRouteMap;
  type?: 'website' | 'article';
  section?: OgSection;
};

const OG_IMAGES: Record<OgSection, string> = {
  default: '/og/og-default.jpg',
  resources: '/og/og-resources.jpg',
  projects: '/og/og-projects.jpg',
  systems: '/og/og-systems.jpg'
};

const OG_IMAGE_ALT = 'SIPANEL — Engineering Power. Controlled Execution.';

function getOgImage(section: OgSection = 'default') {
  return withBaseUrl(OG_IMAGES[section] ?? OG_IMAGES.default);
}

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

export function buildPageMetadata({locale, title, description, routes, type = 'website', section = 'default'}: BuildPageMetadataInput): Metadata {
  const ogImage = getOgImage(section);

  return {
    title,
    description,
    alternates: buildAlternates(locale, routes),
    openGraph: {
      title,
      description,
      locale,
      url: routes[locale],
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  };
}
