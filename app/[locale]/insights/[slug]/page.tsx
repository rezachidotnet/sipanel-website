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
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllEngineeringInsightStaticParams();
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const metadata = getEngineeringInsightArticleMetadata(validLocale, slug);

  if (!metadata) {
    notFound();
  }

  setRequestLocale(validLocale);

  return metadata;
}

export default async function InsightArticleRoute({params}: Props) {
  const {locale, slug} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  const article = getEngineeringInsightArticle(validLocale, slug);

  if (!article) {
    notFound();
  }

  return <EngineeringArticleTemplate locale={validLocale} article={article} />;
}
