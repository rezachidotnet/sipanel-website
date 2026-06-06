import type {Metadata} from 'next';
import {Suspense} from 'react';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {EngineeringResourceHubPage} from '@/components/resources/engineering-resource-hub-page';
import {getDirection, locales, type Locale} from '@/i18n/routing';
import {
  getEngineeringResourceHubMetadata,
  getEngineeringResourceHubPage
} from '@/lib/resources/engineering-resource-hub';

type Props = {
  params: Promise<{locale: string}>;
  searchParams?: {category?: string};
};

function ResourceHubSeoFallback({locale}: {locale: Locale}) {
  const page = getEngineeringResourceHubPage();
  const content = page.localeContent[locale];

  return (
    <article className="resource-hub-page" dir={getDirection(locale)}>
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

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const page = getEngineeringResourceHubPage();

  if (!locales.includes(locale as Locale) || !page.routes[locale as Locale]) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return getEngineeringResourceHubMetadata(validLocale);
}

export default async function ResourcesPage({params}: Props) {
  const {locale} = await params;
  const page = getEngineeringResourceHubPage();

  if (!locales.includes(locale as Locale) || !page.routes[locale as Locale]) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return (
    <>
      {/* track: resources_page_view */}
      <Suspense fallback={<ResourceHubSeoFallback locale={validLocale} />}>
        <EngineeringResourceHubPage locale={validLocale} page={page} />
      </Suspense>
    </>
  );
}
