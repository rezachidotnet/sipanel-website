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
  params: {
    locale: Locale;
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllResourceDetailStaticParams();
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);
  const metadata = getResourceDetailMetadata(params.locale, params.slug);

  if (!metadata) {
    notFound();
  }

  return metadata;
}

export default function ResourceDetailRoute({params}: Props) {
  setRequestLocale(params.locale);

  if (!locales.includes(params.locale)) {
    notFound();
  }

  const page = getResourceDetailPage(params.locale, params.slug);

  if (!page) {
    notFound();
  }

  return <ResourceDetailPageTemplate locale={params.locale} page={page} />;
}
