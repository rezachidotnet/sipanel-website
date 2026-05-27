import type {MetadataRoute} from 'next';
import {defaultLocale, locales, type Locale} from '@/i18n/routing';
import {aboutPageData} from '@/lib/about/about-page';
import {caseStudyPages} from '@/lib/case-studies/case-study-pages';
import {rfqContactPage} from '@/lib/contact/rfq-contact-page';
import {faqPageData} from '@/lib/faq/faq-page';
import {engineeringInsightArticles, engineeringInsightsPage} from '@/lib/insights/engineering-insights';
import {engineeringResourceHubPage} from '@/lib/resources/engineering-resource-hub';
import {seoLandingPages} from '@/lib/seo/seo-landing-pages';
import {withBaseUrl, type LocalizedRouteMap} from '@/lib/seo/metadata';
import {aluminiumCladdingCoveringSpec} from '@/lib/services/aluminium-cladding-covering';
import {sandwichPanelSystemsSpec} from '@/lib/services/sandwich-panel-systems';
import {standingSeamZipTechRoofingSpec} from '@/lib/services/standing-seam-zip-tech-roofing';

const homeRoutes: LocalizedRouteMap = {
  en: '/en',
  fa: '/fa',
  ar: '/ar',
  ru: '/ru'
};

const systemsOverviewRoutes: LocalizedRouteMap = {
  en: '/en/systems',
  fa: '/fa/systems',
  ar: '/ar/systems',
  ru: '/ru/systems'
};

const projectsOverviewRoutes: LocalizedRouteMap = {
  en: '/en/projects',
  fa: '/fa/projects',
  ar: '/ar/projects',
  ru: '/ru/projects'
};

const routeMaps: LocalizedRouteMap[] = [
  homeRoutes,
  systemsOverviewRoutes,
  sandwichPanelSystemsSpec.route,
  standingSeamZipTechRoofingSpec.route,
  aluminiumCladdingCoveringSpec.route,
  projectsOverviewRoutes,
  rfqContactPage.route,
  engineeringInsightsPage.routes,
  ...engineeringInsightArticles.map((article) => article.routes),
  engineeringResourceHubPage.routes,
  faqPageData.routes,
  aboutPageData.routes,
  ...seoLandingPages.map((page) => page.routes),
  ...Object.values(caseStudyPages).map((page) => page.routes)
];

function alternatesFor(routes: LocalizedRouteMap) {
  return {
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, withBaseUrl(routes[locale])])) as Record<Locale, string>,
      'x-default': withBaseUrl(routes[defaultLocale])
    }
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routeMaps.flatMap((routes) =>
    locales.map((locale) => ({
      url: withBaseUrl(routes[locale]),
      lastModified: new Date(),
      changeFrequency: locale === defaultLocale && routes[locale] === `/${defaultLocale}` ? 'weekly' : 'monthly',
      priority: routes[locale] === `/${locale}` ? 1 : 0.7,
      alternates: alternatesFor(routes)
    }))
  );
}

export const dynamic = 'force-static';
