import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {EngineeringResourceHubPage} from '@/components/resources/engineering-resource-hub-page';
import {locales, type Locale} from '@/i18n/routing';
import {
  getEngineeringResourceHubMetadata,
  getEngineeringResourceHubPage
} from '@/lib/resources/engineering-resource-hub';

type Props = {
  params: Promise<{locale: string}>;
  searchParams?: {category?: string};
};

type ProofMetric = {
  id: 'yearsExperience' | 'industrialProjects' | 'executedPanelArea';
  value: string;
  label: string;
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const page = getEngineeringResourceHubPage();

  if (!locales.includes(locale as Locale) || !page.routes[locale as Locale]) {
    notFound();
  }

  const validLocale = locale as Locale;

  setRequestLocale(validLocale);

  return getEngineeringResourceHubMetadata(validLocale);
}

export default async function ResourcesPage({params}: Props) {
  const {locale} = await params;
  const page = getEngineeringResourceHubPage();

  if (!locales.includes(locale as Locale) || !page.routes[locale as Locale]) {
    notFound();
  }

  const validLocale = locale as Locale;
  const trustBar = await getTranslations({locale: validLocale, namespace: 'trustBar'});
  const proofMetrics: ProofMetric[] = [
    {
      id: 'yearsExperience',
      value: trustBar('metrics.yearsExperience.value'),
      label: trustBar('metrics.yearsExperience.label')
    },
    {
      id: 'industrialProjects',
      value: trustBar('metrics.industrialProjects.value'),
      label: trustBar('metrics.industrialProjects.label')
    },
    {
      id: 'executedPanelArea',
      value: trustBar('metrics.executedPanelArea.value'),
      label: trustBar('metrics.executedPanelArea.label')
    }
  ];

  setRequestLocale(validLocale);

  return (
    <>
      {/* track: resources_page_view */}
      <EngineeringResourceHubPage locale={validLocale} page={page} proofMetrics={proofMetrics} proofLabel={trustBar('ariaLabel')} />
    </>
  );
}
