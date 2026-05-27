import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {InsightsIndexPage} from '@/components/insights/insights-index-page';
import {SchemaScript} from '@/components/seo/schema-script';
import {getDirection, locales, type Locale} from '@/i18n/routing';
import {getEngineeringInsightsMetadata, getEngineeringInsightsPage} from '@/lib/insights/engineering-insights';
import {buildBreadcrumbListSchema, buildCollectionPageSchema, buildOrganizationSchema} from '@/lib/seo/schema';

type Props = {
  params: {locale: Locale};
};

function InsightsSchema({locale}: {locale: Locale}) {
  const page = getEngineeringInsightsPage();

  return (
    <>
      <SchemaScript
        schema={buildCollectionPageSchema(locale, `${page.routes[locale]}#collection`, {
          name: page.seo.title,
          description: page.seo.metaDescription,
          url: page.routes[locale],
          items: page.articles.map((article) => ({name: article.title, url: article.routes[locale]}))
        })}
      />
      <SchemaScript
        schema={buildBreadcrumbListSchema(locale, `${page.routes[locale]}#breadcrumb`, [
          {name: 'Home', item: `/${locale}`},
          {name: 'Insights', item: page.routes[locale]}
        ])}
      />
      <SchemaScript schema={buildOrganizationSchema(locale, `${page.routes[locale]}#organization`)} />
    </>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);

  if (!locales.includes(params.locale)) {
    notFound();
  }

  return getEngineeringInsightsMetadata(params.locale);
}

export default function InsightsRoute({params}: Props) {
  setRequestLocale(params.locale);

  if (!locales.includes(params.locale)) {
    notFound();
  }

  return (
    <div dir={getDirection(params.locale)}>
      <InsightsSchema locale={params.locale} />
      <InsightsIndexPage locale={params.locale} page={getEngineeringInsightsPage()} />
    </div>
  );
}
