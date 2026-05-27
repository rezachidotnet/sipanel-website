import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {ServicePageTemplate} from '@/components/services/service-page-template';
import {locales, type Locale} from '@/i18n/routing';
import {
  aluminiumCladdingCoveringSpec,
  getAluminiumCladdingCoveringPage
} from '@/lib/services/aluminium-cladding-covering';
import {buildPageMetadata} from '@/lib/seo/metadata';

type Props = {
  params: {locale: Locale};
};

const pageData = getAluminiumCladdingCoveringPage();

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);

  return buildPageMetadata({
    locale: params.locale,
    title: aluminiumCladdingCoveringSpec.seo.title,
    description: aluminiumCladdingCoveringSpec.seo.meta_description,
    routes: aluminiumCladdingCoveringSpec.route
  });
}

export default function AluminiumCladdingCoveringPage({params}: Props) {
  setRequestLocale(params.locale);

  return (
    <>
      {/* track: service_page_view */}
      <ServicePageTemplate locale={params.locale} page={pageData} />
    </>
  );
}
