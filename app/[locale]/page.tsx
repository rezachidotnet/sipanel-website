import {getTranslations, setRequestLocale} from 'next-intl/server';
import {CaseStudiesPreview} from '@/components/home/case-studies-preview';
import {ComparisonSection} from '@/components/home/comparison-section';
import {EngineeringProofSnapshot} from '@/components/home/engineering-proof-snapshot';
import {HeroSection} from '@/components/home/hero-section';
import {ProcessSection} from '@/components/home/process-section';
import {ResourcesPreview} from '@/components/home/resources-preview';
import {RfqSection} from '@/components/home/rfq-section';
import {StickyMobileCta} from '@/components/home/sticky-mobile-cta';
import {TrustBar} from '@/components/home/trust-bar';
import {SchemaScript} from '@/components/seo/schema-script';
import type {Locale} from '@/i18n/routing';
import {buildLocalBusinessSchema, buildOrganizationSchema} from '@/lib/seo/schema';

type Props = {
  params: {locale: Locale};
};

export default async function HomePage({params}: Props) {
  setRequestLocale(params.locale);
  const rfq = await getTranslations({locale: params.locale, namespace: 'rfq'});
  const localizedAddress = rfq.has('contact.address') ? rfq('contact.address') : '';
  const organizationSchema = buildOrganizationSchema(params.locale, `/${params.locale}#organization`);
  const localBusinessSchema = buildLocalBusinessSchema(params.locale, `/${params.locale}#local-business`);
  const localizedOrganizationSchema = localizedAddress ? {...organizationSchema, address: localizedAddress} : organizationSchema;
  const localizedLocalBusinessSchema = localizedAddress ? {...localBusinessSchema, address: localizedAddress} : localBusinessSchema;

  return (
    <>
      <SchemaScript schema={localizedOrganizationSchema} />
      <SchemaScript schema={localizedLocalBusinessSchema} />
      <HeroSection />
      <TrustBar />
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
