import type {Metadata} from 'next';
import {Suspense} from 'react';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {EngineeringResourceHubPage} from '@/components/resources/engineering-resource-hub-page';
import {SchemaScript} from '@/components/seo/schema-script';
import {getDirection, locales, type Locale} from '@/i18n/routing';
import {
  getEngineeringResourceHubBreadcrumbs,
  getEngineeringResourceHubMetadata,
  getEngineeringResourceHubPage
} from '@/lib/resources/engineering-resource-hub';
import {
  buildBreadcrumbListSchema,
  buildCollectionPageSchema,
  buildOrganizationSchema
} from '@/lib/seo/schema';

type Props = {
  params: {locale: Locale};
  searchParams?: {category?: string};
};

function buildResourceCollectionSchema(locale: Locale) {
  const page = getEngineeringResourceHubPage();
  const content = page.localeContent[locale];

  return buildCollectionPageSchema(locale, `${page.routes[locale]}#collection`, {
    name: content.seo.title,
    description: content.seo.meta_description,
    url: page.routes[locale],
    items: content.featuredResources.map((resource) => ({name: resource.title}))
  });
}

function buildResourceBreadcrumbSchema(locale: Locale) {
  const page = getEngineeringResourceHubPage();

  return buildBreadcrumbListSchema(
    locale,
    `${page.routes[locale]}#breadcrumb`,
    getEngineeringResourceHubBreadcrumbs(locale).map((item) => ({name: item.label, item: item.href}))
  );
}

function ResourceHubSeoFallback({locale}: {locale: Locale}) {
  const page = getEngineeringResourceHubPage();
  const content = page.localeContent[locale];

  return (
    <article className="resource-hub-page" dir={getDirection(locale)}>
      <SchemaScript schema={buildResourceCollectionSchema(locale)} />
      <SchemaScript schema={buildResourceBreadcrumbSchema(locale)} />
      <SchemaScript schema={buildOrganizationSchema(locale, `/${locale}#organization`)} />
      <section className="resource-hub-hero" data-section="resource_hub_hero" aria-labelledby="resource-hub-title">
        <div className="container-shell resource-hub-hero__inner">
          <div className="resource-hub-hero__copy">
            <p className="resource-hub-eyebrow">{content.hero.eyebrow}</p>
            <h1 id="resource-hub-title">{content.hero.h1}</h1>
            <p>{content.hero.subheadline}</p>
          </div>
        </div>
      </section>
    </article>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);
  const page = getEngineeringResourceHubPage();

  if (!page.routes[params.locale]) {
    notFound();
  }

  return getEngineeringResourceHubMetadata(params.locale);
}

export default function ResourcesPage({params}: Props) {
  setRequestLocale(params.locale);
  const page = getEngineeringResourceHubPage();

  if (!page.routes[params.locale]) {
    notFound();
  }

  return (
    <>
      {/* track: resources_page_view */}
      <Suspense fallback={<ResourceHubSeoFallback locale={params.locale} />}>
        <EngineeringResourceHubPage locale={params.locale} page={page} />
      </Suspense>
    </>
  );
}
