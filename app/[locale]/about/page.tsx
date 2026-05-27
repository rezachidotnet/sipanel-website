import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {AboutPage} from '@/components/about/about-page';
import {locales, type Locale} from '@/i18n/routing';
import {getAboutPageData, getAboutPageMetadata} from '@/lib/about/about-page';

type Props = {
  params: {locale: Locale};
};

const page = getAboutPageData();

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);

  if (!page.routes[params.locale]) {
    notFound();
  }

  return getAboutPageMetadata(params.locale);
}

export default function AboutPageRoute({params}: Props) {
  setRequestLocale(params.locale);

  if (!page.routes[params.locale]) {
    notFound();
  }

  return (
    <>
      {/* track: about_page_view */}
      <AboutPage locale={params.locale} page={page} />
    </>
  );
}

