import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {SeoLandingPageTemplate} from '@/components/seo/seo-landing-page-template';
import {locales, type Locale} from '@/i18n/routing';
import {
  buildSeoLandingPageMetadata,
  getSeoLandingPageBySlug,
  listSeoLandingPageSlugs
} from '@/lib/seo/seo-landing-pages';

type Props = {
  params: {locale: Locale; slug: string};
};

export function generateStaticParams() {
  return listSeoLandingPageSlugs().flatMap((slug) => locales.map((locale) => ({locale, slug})));
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);
  const page = getSeoLandingPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return buildSeoLandingPageMetadata(page, params.locale);
}

export default function SeoSolutionPage({params}: Props) {
  setRequestLocale(params.locale);
  const page = getSeoLandingPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      {/* track: seo_landing_page_view */}
      <SeoLandingPageTemplate locale={params.locale} page={page} />
    </>
  );
}
