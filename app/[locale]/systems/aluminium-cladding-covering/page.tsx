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
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  const pageData = getAluminiumCladdingCoveringPage(validLocale);

  return buildPageMetadata({
    locale: validLocale,
    title: pageData.seo.title,
    description: pageData.seo.metaDescription,
    routes: aluminiumCladdingCoveringSpec.route,
    section: 'systems'
  });
}

export default async function AluminiumCladdingCoveringPage({params}: Props) {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  const pageData = getAluminiumCladdingCoveringPage(validLocale);

  return (
    <>
      {/* track: service_page_view */}
      <ServicePageTemplate locale={validLocale} page={pageData} />
    </>
  );
}
