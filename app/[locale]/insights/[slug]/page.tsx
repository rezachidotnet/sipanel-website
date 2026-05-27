import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {EngineeringArticleTemplate} from '@/components/insights/engineering-article-template';
import {locales, type Locale} from '@/i18n/routing';
import {
  getAllEngineeringInsightStaticParams,
  getEngineeringInsightArticle,
  getEngineeringInsightArticleMetadata
} from '@/lib/insights/engineering-insights';

type Props = {
  params: {
    locale: Locale;
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllEngineeringInsightStaticParams();
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);
  const metadata = getEngineeringInsightArticleMetadata(params.locale, params.slug);

  if (!metadata) {
    notFound();
  }

  return metadata;
}

export default function InsightArticleRoute({params}: Props) {
  setRequestLocale(params.locale);

  if (!locales.includes(params.locale)) {
    notFound();
  }

  const article = getEngineeringInsightArticle(params.locale, params.slug);

  if (!article) {
    notFound();
  }

  return <EngineeringArticleTemplate locale={params.locale} article={article} />;
}
