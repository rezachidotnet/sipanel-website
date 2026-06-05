import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {ResourceDetailPageTemplate} from '@/components/resources/resource-detail-page-template';
import {locales, type Locale} from '@/i18n/routing';
import {
  getAllResourceDetailStaticParams,
  getResourceDetailMetadata,
  getResourceDetailPage
} from '@/lib/resources/engineering-resource-hub';

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllResourceDetailStaticParams();
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const metadata = getResourceDetailMetadata(validLocale, slug);

  if (!metadata) {
    notFound();
  }

  setRequestLocale(validLocale);

  return metadata;
}

export default async function ResourceDetailRoute({params}: Props) {
  const {locale, slug} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  const page = getResourceDetailPage(validLocale, slug);

  if (!page) {
    notFound();
  }

  return <ResourceDetailPageTemplate locale={validLocale} page={page} />;
}
