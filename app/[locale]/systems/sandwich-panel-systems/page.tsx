import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {ServicePageTemplate} from '@/components/services/service-page-template';
import {locales, type Locale} from '@/i18n/routing';
import {getSandwichPanelSystemsPage, sandwichPanelSystemsSpec} from '@/lib/services/sandwich-panel-systems';
import {buildPageMetadata} from '@/lib/seo/metadata';

type Props = {
  params: {locale: Locale};
};

const pageData = getSandwichPanelSystemsPage();

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);

  return buildPageMetadata({
    locale: params.locale,
    title: sandwichPanelSystemsSpec.seo.title,
    description: sandwichPanelSystemsSpec.seo.meta_description,
    routes: sandwichPanelSystemsSpec.route
  });
}

export default function SandwichPanelSystemsPage({params}: Props) {
  setRequestLocale(params.locale);

  return (
    <>
      {/* track: service_page_view */}
      <ServicePageTemplate locale={params.locale} page={pageData} />
    </>
  );
}
