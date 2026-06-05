import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {CaseStudyPageTemplate} from '@/components/case-studies/case-study-page-template';
import {locales, type Locale} from '@/i18n/routing';
import {
  getCaseStudyPageData,
  getCaseStudyPageMetadata,
  listCaseStudySlugs
} from '@/lib/case-studies/case-study-pages';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return listCaseStudySlugs().flatMap((slug) => locales.map((locale) => ({locale, slug})));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const page = getCaseStudyPageData(slug);

  if (!locales.includes(locale as Locale) || !page) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return getCaseStudyPageMetadata(validLocale, page);
}

export default async function CaseStudyPage({params}: Props) {
  const {locale, slug} = await params;
  const page = getCaseStudyPageData(slug);

  if (!locales.includes(locale as Locale) || !page) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return (
    <>
      {/* track: case_study_page_view */}
      <CaseStudyPageTemplate locale={validLocale} page={page} />
    </>
  );
}
