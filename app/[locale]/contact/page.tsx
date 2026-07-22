import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {RfqContactPage} from '@/components/contact/rfq-contact-page';
import {getLocalizedPath, locales, type Locale} from '@/i18n/routing';
import {getRfqContactPageData, rfqContactPage} from '@/lib/contact/rfq-contact-page';
import {buildPageMetadata} from '@/lib/seo/metadata';
import {
  buildBreadcrumbListSchema,
  buildContactPageSchema as buildSharedContactPageSchema,
  buildFaqPageSchema,
  buildLocalBusinessSchema as buildSharedLocalBusinessSchema,
  buildOrganizationSchema as buildSharedOrganizationSchema
} from '@/lib/seo/schema';

type Props = {
  params: Promise<{locale: string}>;
};

const pageData = getRfqContactPageData();

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function buildContactPageSchema(locale: Locale) {
  return buildSharedContactPageSchema(locale, `${rfqContactPage.route[locale]}#contact-page`, {
    name: rfqContactPage.seo.h1,
    description: rfqContactPage.seo.meta_description,
    url: rfqContactPage.route[locale]
  });
}

function buildOrganizationSchema(locale: Locale) {
  return buildSharedOrganizationSchema(locale);
}

function buildLocalBusinessSchema(locale: Locale) {
  return buildSharedLocalBusinessSchema(locale, `${rfqContactPage.route[locale]}#local-business`);
}

function buildBreadcrumbSchema(locale: Locale) {
  return buildBreadcrumbListSchema(locale, `${rfqContactPage.route[locale]}#breadcrumb`, [
    {name: locale === 'fa' ? 'خانه' : locale === 'ar' ? 'الرئيسية' : locale === 'ru' ? 'Главная' : 'Home', item: getLocalizedPath(locale)},
    {name: locale === 'fa' ? 'تماس' : locale === 'ar' ? 'اتصل بنا' : locale === 'ru' ? 'Контакты' : 'Contact', item: rfqContactPage.route[locale]}
  ]);
}

function buildFaqSchema(locale: Locale) {
  return buildFaqPageSchema(locale, `${rfqContactPage.route[locale]}#faq`, pageData.faq.items);
}

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

  return buildPageMetadata({
    locale: validLocale,
    title: rfqContactPage.seo.title,
    description: rfqContactPage.seo.meta_description,
    routes: rfqContactPage.route
  });
}

export default async function ContactPage({params}: Props) {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return (
    <>
      <SchemaPlaceholder schema={buildContactPageSchema(validLocale)} />
      <SchemaPlaceholder schema={buildOrganizationSchema(validLocale)} />
      <SchemaPlaceholder schema={buildLocalBusinessSchema(validLocale)} />
      <SchemaPlaceholder schema={buildBreadcrumbSchema(validLocale)} />
      <SchemaPlaceholder schema={buildFaqSchema(validLocale)} />
      {/* track: contact_page_view */}
      <RfqContactPage locale={validLocale} page={pageData} />
    </>
  );
}
