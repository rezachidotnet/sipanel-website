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
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return listSeoLandingPageSlugs().flatMap((slug) => locales.map((locale) => ({locale, slug})));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const page = getSeoLandingPageBySlug(slug);

  if (!locales.includes(locale as Locale) || !page) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return buildSeoLandingPageMetadata(page, validLocale);
}

export default async function SeoSolutionPage({params}: Props) {
  const {locale, slug} = await params;
  const page = getSeoLandingPageBySlug(slug);

  if (!locales.includes(locale as Locale) || !page) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return (
    <>
      {/* track: seo_landing_page_view */}
      <SeoLandingPageTemplate locale={validLocale} page={page} />
    </>
  );
}
