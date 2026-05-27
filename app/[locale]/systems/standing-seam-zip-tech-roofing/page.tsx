import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {ServicePageTemplate} from '@/components/services/service-page-template';
import {locales, type Locale} from '@/i18n/routing';
import {
  getStandingSeamZipTechRoofingPage,
  standingSeamZipTechRoofingSpec
} from '@/lib/services/standing-seam-zip-tech-roofing';
import {buildPageMetadata} from '@/lib/seo/metadata';

type Props = {
  params: {locale: Locale};
};

const pageData = getStandingSeamZipTechRoofingPage();

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);

  return buildPageMetadata({
    locale: params.locale,
    title: standingSeamZipTechRoofingSpec.seo.title,
    description: standingSeamZipTechRoofingSpec.seo.meta_description,
    routes: standingSeamZipTechRoofingSpec.route
  });
}

export default function StandingSeamZipTechRoofingPage({params}: Props) {
  setRequestLocale(params.locale);

  return (
    <>
      {/* track: service_page_view */}
      <ServicePageTemplate locale={params.locale} page={pageData} />
    </>
  );
}
