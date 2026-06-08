import {getTranslations, setRequestLocale} from 'next-intl/server';
import {CaseStudiesPreview} from '@/components/home/case-studies-preview';
import {ComparisonSection} from '@/components/home/comparison-section';
import {EngineeringProofSnapshot} from '@/components/home/engineering-proof-snapshot';
import {HeroSection} from '@/components/home/hero-section';
import {ProcessSection} from '@/components/home/process-section';
import {FeaturedProject} from '@/components/home/featured-project';
import {SystemsShowcase} from '@/components/home/systems-showcase';
import {ResourcesPreview} from '@/components/home/resources-preview';
import {RfqSection} from '@/components/home/rfq-section';
import {StickyMobileCta} from '@/components/home/sticky-mobile-cta';
import {TrustBar} from '@/components/home/trust-bar';
import {ClientLogosSection} from '@/components/trust/client-logos-section';
import {SchemaScript} from '@/components/seo/schema-script';
import {locales, type Locale} from '@/i18n/routing';
import {buildLocalBusinessSchema, buildOrganizationSchema} from '@/lib/seo/schema';
import {notFound} from 'next/navigation';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);
  const rfq = await getTranslations({locale: validLocale, namespace: 'rfq'});
  const localizedAddress = rfq.has('contact.address') ? rfq('contact.address') : '';
  const organizationSchema = buildOrganizationSchema(validLocale, `/${validLocale}#organization`);
  const localBusinessSchema = buildLocalBusinessSchema(validLocale, `/${validLocale}#local-business`);
  const localizedOrganizationSchema = localizedAddress ? {...organizationSchema, address: localizedAddress} : organizationSchema;
  const localizedLocalBusinessSchema = localizedAddress ? {...localBusinessSchema, address: localizedAddress} : localBusinessSchema;

  return (
    <>
      <SchemaScript schema={localizedOrganizationSchema} />
      <SchemaScript schema={localizedLocalBusinessSchema} />
      <HeroSection />
      <TrustBar />
      <ClientLogosSection variant="carousel" />
      <SystemsShowcase />
      <FeaturedProject />
      <EngineeringProofSnapshot />
      <StickyMobileCta />
      <ProcessSection />
      <CaseStudiesPreview />
      <ComparisonSection />
      <ResourcesPreview />
      <RfqSection />
    </>
  );
}
