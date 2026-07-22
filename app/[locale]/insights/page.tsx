import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {InsightsIndexPage} from '@/components/insights/insights-index-page';
import {SchemaScript} from '@/components/seo/schema-script';
import {getDirection, getLocalizedPath, locales, type Locale} from '@/i18n/routing';
import {getEngineeringInsightsMetadata, getEngineeringInsightsPage} from '@/lib/insights/engineering-insights';
import {buildBreadcrumbListSchema, buildCollectionPageSchema, buildOrganizationSchema} from '@/lib/seo/schema';

type Props = {
  params: Promise<{locale: string}>;
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
          {name: 'Home', item: getLocalizedPath(locale)},
          {name: 'Insights', item: page.routes[locale]}
        ])}
      />
      <SchemaScript schema={buildOrganizationSchema(locale)} />
    </>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return getEngineeringInsightsMetadata(validLocale);
}

export default async function InsightsRoute({params}: Props) {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return (
    <div dir={getDirection(validLocale)}>
      <InsightsSchema locale={validLocale} />
      <InsightsIndexPage locale={validLocale} page={getEngineeringInsightsPage()} />
    </div>
  );
}
