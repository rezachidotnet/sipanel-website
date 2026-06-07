import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {AboutPage} from '@/components/about/about-page';
import {ClientLogosSection} from '@/components/trust/client-logos-section';
import {locales, type Locale} from '@/i18n/routing';
import {getAboutPageData, getAboutPageMetadata} from '@/lib/about/about-page';

type Props = {
  params: Promise<{locale: string}>;
};

const page = getAboutPageData();

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;

  if (!locales.includes(locale as Locale) || !page.routes[locale as Locale]) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return getAboutPageMetadata(validLocale);
}

export default async function AboutPageRoute({params}: Props) {
  const {locale} = await params;

  if (!locales.includes(locale as Locale) || !page.routes[locale as Locale]) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return (
    <>
      {/* track: about_page_view */}
      <AboutPage locale={validLocale} page={page} />
      <ClientLogosSection />
    </>
  );
}
