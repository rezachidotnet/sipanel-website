import type {Metadata} from 'next';
import {Suspense} from 'react';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {FaqPage} from '@/components/faq/faq-page';
import {SchemaScript} from '@/components/seo/schema-script';
import {locales, type Locale} from '@/i18n/routing';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  getFaqPageData,
  getFaqPageMetadata
} from '@/lib/faq/faq-page';

type Props = {
  params: {locale: Locale};
};

const page = getFaqPageData();

function FaqSeoFallback({locale}: {locale: Locale}) {
  const content = page.localeContent[locale];

  return (
    <article className="faq-page" dir={locale === 'fa' || locale === 'ar' ? 'rtl' : 'ltr'}>
      <SchemaScript schema={buildFaqSchema(locale)} />
      <SchemaScript schema={buildBreadcrumbSchema(locale)} />
      <SchemaScript schema={buildOrganizationSchema(locale)} />
      <section className="faq-hero" data-section="faq_hero" aria-labelledby="faq-page-title">
        <div className="container-shell faq-hero__inner">
          <div className="faq-hero__copy">
            <p className="faq-eyebrow">{content.hero.eyebrow}</p>
            <h1 id="faq-page-title">{content.seo.h1}</h1>
            <p>{content.hero.subheadline}</p>
          </div>
        </div>
      </section>
    </article>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Props): Metadata {
  setRequestLocale(params.locale);

  if (!page.routes[params.locale]) {
    notFound();
  }

  return getFaqPageMetadata(params.locale);
}

export default function FaqPageRoute({params}: Props) {
  setRequestLocale(params.locale);

  if (!page.routes[params.locale]) {
    notFound();
  }

  return (
    <>
      {/* track: faq_page_view */}
      <Suspense fallback={<FaqSeoFallback locale={params.locale} />}>
        <FaqPage locale={params.locale} page={page} />
      </Suspense>
    </>
  );
}
