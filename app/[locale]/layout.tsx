import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Footer} from '@/components/layout/footer';
import {Header} from '@/components/layout/header';
import {LocaleRuntime} from '@/components/localization/locale-runtime';
import {getDirection, locales, type Locale} from '@/i18n/routing';
import {buildPageMetadata, getSiteBaseUrl} from '@/lib/seo/metadata';
import '../globals.css';

const inter = localFont({
  src: [
    {
      path: '../../assets/fonts/inter/Inter-Latin.woff2',
      weight: '400 900',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/inter/Inter-LatinExt.woff2',
      weight: '400 900',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/inter/Inter-Cyrillic.woff2',
      weight: '400 900',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-inter',
  preload: true
});

const vazirmatn = localFont({
  src: '../../assets/fonts/vazirmatn/Vazirmatn-Arabic.woff2',
  display: 'swap',
  variable: '--font-vazirmatn',
  weight: '400 800',
  preload: true
});

const ibmPlexSansArabic = localFont({
  src: [
    {
      path: '../../assets/fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Arabic-400.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Arabic-500.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Arabic-600.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../assets/fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Arabic-700.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-ibm-plex-sans-arabic',
  preload: true
});

type Props = {
  children: React.ReactNode;
  params: {locale: Locale};
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  setRequestLocale(params.locale);
  const t = await getTranslations({locale: params.locale, namespace: 'metadata'});

  return {
    metadataBase: new URL(getSiteBaseUrl()),
    ...buildPageMetadata({
      locale: params.locale,
      title: t('title'),
      description: t('description'),
      routes: {
        en: '/en',
        fa: '/fa',
        ar: '/ar',
        ru: '/ru'
      }
    }),
    icons: {
      icon: [
        {url: '/favicon.ico', sizes: 'any'},
        {url: '/icons/icon-16.png', type: 'image/png', sizes: '16x16'},
        {url: '/icons/icon-32.png', type: 'image/png', sizes: '32x32'},
        {url: '/icons/icon-48.png', type: 'image/png', sizes: '48x48'},
        {url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192'},
        {url: '/icons/icon-512.png', type: 'image/png', sizes: '512x512'}
      ],
      shortcut: ['/favicon.ico'],
      apple: [
        {url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180'}
      ]
    },
    manifest: '/manifest.webmanifest',
    other: {
      'msapplication-TileImage': '/icons/icon-192.png',
      'msapplication-TileColor': '#FF6A00'
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  if (!locales.includes(params.locale)) {
    notFound();
  }

  setRequestLocale(params.locale);
  const messages = await getMessages();
  const dir = getDirection(params.locale);
  const localeFontClass =
    params.locale === 'fa'
      ? vazirmatn.className
      : params.locale === 'ar'
        ? ibmPlexSansArabic.className
        : inter.className;

  return (
    <html
      lang={params.locale}
      dir={dir}
      data-locale={params.locale}
      className={`${inter.variable} ${vazirmatn.variable} ${ibmPlexSansArabic.variable} typography-${params.locale}`}
    >
      <body className={localeFontClass}>
        <NextIntlClientProvider messages={messages}>
          <LocaleRuntime locale={params.locale} dir={dir} />
          <Header locale={params.locale} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
