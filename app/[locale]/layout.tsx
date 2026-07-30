import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {GoogleTagManager} from '@next/third-parties/google';
import {NextIntlClientProvider} from 'next-intl';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Footer} from '@/components/layout/footer';
import {Header} from '@/components/layout/header';
import {LocaleRuntime} from '@/components/localization/locale-runtime';
import {HashScrollManager} from '@/components/navigation/hash-scroll-manager';
import {getDirection, getLocalizedPath, locales, type Locale} from '@/i18n/routing';
import {buildPageMetadata, getSiteBaseUrl} from '@/lib/seo/metadata';
import '../globals.css';

// Secondary (non-fa) fonts: deferred, not preloaded. The @font-face + CSS
// variable are still emitted so en/ru (Inter) and ar (IBM Plex) render
// correctly via `display: swap`; only the high-priority <link rel="preload">
// is dropped so it no longer competes with the LCP image on /fa.
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
  preload: false
});

// Primary font for /fa (source-of-truth locale) — the only font preloaded.
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
  preload: false
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const isValidGtmId = typeof gtmId === 'string' && /^GTM-[A-Z0-9]+$/i.test(gtmId);

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);
  const t = await getTranslations({locale: validLocale, namespace: 'metadata'});

  return {
    metadataBase: new URL(getSiteBaseUrl()),
    ...buildPageMetadata({
      locale: validLocale,
      title: t('title'),
      description: t('description'),
      routes: {
        en: getLocalizedPath('en'),
        fa: getLocalizedPath('fa'),
        ar: getLocalizedPath('ar'),
        ru: getLocalizedPath('ru')
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
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);
  const messages = await getMessages();
  const dir = getDirection(validLocale);
  const localeFontClass =
    validLocale === 'fa'
      ? vazirmatn.className
      : validLocale === 'ar'
        ? ibmPlexSansArabic.className
        : inter.className;

  return (
    <html
      lang={validLocale}
      dir={dir}
      data-locale={validLocale}
      className={`${inter.variable} ${vazirmatn.variable} ${ibmPlexSansArabic.variable} typography-${validLocale}`}
    >
      <body className={localeFontClass}>
        <NextIntlClientProvider messages={messages}>
          <LocaleRuntime locale={validLocale} dir={dir} />
          <HashScrollManager />
          <Header locale={validLocale} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
      {isValidGtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
    </html>
  );
}
