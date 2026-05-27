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
  params: {locale: Locale; slug: string};
};

export function generateStaticParams() {
  return listCaseStudySlugs().flatMap((slug) => locales.map((locale) => ({locale, slug})));
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);
  const page = getCaseStudyPageData(params.slug);

  if (!page) {
    notFound();
  }

  return getCaseStudyPageMetadata(params.locale, page);
}

export default function CaseStudyPage({params}: Props) {
  setRequestLocale(params.locale);
  const page = getCaseStudyPageData(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      {/* track: case_study_page_view */}
      <CaseStudyPageTemplate locale={params.locale} page={page} />
    </>
  );
}
