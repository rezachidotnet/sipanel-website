import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {RfqContactPage} from '@/components/contact/rfq-contact-page';
import {locales, type Locale} from '@/i18n/routing';
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
  params: {locale: Locale};
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
  return buildSharedOrganizationSchema(locale, `${rfqContactPage.route[locale]}#organization`);
}

function buildLocalBusinessSchema(locale: Locale) {
  return buildSharedLocalBusinessSchema(locale, `${rfqContactPage.route[locale]}#local-business`);
}

function buildBreadcrumbSchema(locale: Locale) {
  return buildBreadcrumbListSchema(locale, `${rfqContactPage.route[locale]}#breadcrumb`, [
    {name: locale === 'fa' ? 'خانه' : locale === 'ar' ? 'الرئيسية' : locale === 'ru' ? 'Главная' : 'Home', item: `/${locale}`},
    {name: locale === 'fa' ? 'تماس' : locale === 'ar' ? 'اتصل بنا' : locale === 'ru' ? 'Контакты' : 'Contact', item: rfqContactPage.route[locale]}
  ]);
}

function buildFaqSchema(locale: Locale) {
  return buildFaqPageSchema(locale, `${rfqContactPage.route[locale]}#faq`, pageData.faq.items);
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);

  return buildPageMetadata({
    locale: params.locale,
    title: rfqContactPage.seo.title,
    description: rfqContactPage.seo.meta_description,
    routes: rfqContactPage.route
  });
}

export default function ContactPage({params}: Props) {
  setRequestLocale(params.locale);

  return (
    <>
      <SchemaPlaceholder schema={buildContactPageSchema(params.locale)} />
      <SchemaPlaceholder schema={buildOrganizationSchema(params.locale)} />
      <SchemaPlaceholder schema={buildLocalBusinessSchema(params.locale)} />
      <SchemaPlaceholder schema={buildBreadcrumbSchema(params.locale)} />
      <SchemaPlaceholder schema={buildFaqSchema(params.locale)} />
      {/* track: contact_page_view */}
      <RfqContactPage locale={params.locale} page={pageData} />
    </>
  );
}
