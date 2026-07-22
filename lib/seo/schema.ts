import {getLanguageTag, type Locale} from '@/i18n/routing';
import {productionContactInfo, type ProductionContactInfo} from '@/lib/contact/rfq-contact-page';
import {getSiteBaseUrl, withBaseUrl} from '@/lib/seo/metadata';

type BreadcrumbItem = {
  name: string;
  item: string;
};

type SchemaRecord = Record<string, unknown>;

function compactObject<T extends SchemaRecord>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== null && entry !== '')
  ) as T;
}

function contactUrl(contact: ProductionContactInfo) {
  if (!contact.website) {
    return undefined;
  }

  return contact.website.startsWith('http') ? contact.website : getSiteBaseUrl();
}

function webPageId(url: string) {
  return withBaseUrl(`${url}#webpage`);
}

function organizationBase(_locale: Locale, id: string, contact: ProductionContactInfo = productionContactInfo) {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': withBaseUrl(id),
    name: contact.company_name || 'SIPANEL',
    url: contactUrl(contact),
    telephone: contact.phone || undefined,
    email: contact.email || undefined,
    address: contact.address || undefined
  });
}

export function buildOrganizationSchema(locale: Locale, id = '/#organization') {
  return organizationBase(locale, id);
}

export function buildWebsiteSchema(locale: Locale, id = '/#website') {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': withBaseUrl(id),
    url: withBaseUrl('/'),
    name: productionContactInfo.company_name || 'SIPANEL',
    inLanguage: getLanguageTag(locale),
    publisher: {'@id': withBaseUrl('/#organization')}
  });
}

export function buildLocalBusinessSchema(locale: Locale, id = '/#local-business') {
  const contact = productionContactInfo;

  return compactObject({
    ...organizationBase(locale, id, contact),
    '@type': 'LocalBusiness'
  });
}

export function buildBreadcrumbListSchema(locale: Locale, id: string, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': withBaseUrl(id),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: withBaseUrl(item.item)
    }))
  };
}

export function buildFaqPageSchema(
  locale: Locale,
  id: string,
  items: Array<{
    question: string;
    answer: string;
  }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': withBaseUrl(id),
    inLanguage: getLanguageTag(locale),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function buildServiceSchema(
  locale: Locale,
  id: string,
  input: {
    name: string;
    description: string;
    serviceType?: string;
    url: string;
  }
) {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': withBaseUrl(id),
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    provider: {
      '@type': 'Organization',
      '@id': withBaseUrl('/#organization'),
      name: productionContactInfo.company_name || 'SIPANEL'
    },
    url: withBaseUrl(input.url)
  });
}

export function buildArticleSchema(
  locale: Locale,
  id: string,
  input: {
    headline: string;
    description: string;
    url: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': withBaseUrl(id),
    headline: input.headline,
    description: input.description,
    url: withBaseUrl(input.url),
    inLanguage: getLanguageTag(locale),
    author: {
      '@type': 'Organization',
      '@id': withBaseUrl('/#organization'),
      name: productionContactInfo.company_name || 'SIPANEL'
    }
  };
}

export function buildAboutPageSchema(
  locale: Locale,
  _id: string,
  input: {
    name: string;
    description: string;
    url: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': webPageId(input.url),
    name: input.name,
    description: input.description,
    url: withBaseUrl(input.url),
    inLanguage: getLanguageTag(locale)
  };
}

export function buildContactPageSchema(
  locale: Locale,
  _id: string,
  input: {
    name: string;
    description: string;
    url: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': webPageId(input.url),
    name: input.name,
    description: input.description,
    url: withBaseUrl(input.url),
    inLanguage: getLanguageTag(locale)
  };
}

export function buildWebPageSchema(
  locale: Locale,
  input: {
    name: string;
    description: string;
    url: string;
  }
) {
  const canonicalUrl = withBaseUrl(input.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: input.name,
    description: input.description,
    inLanguage: getLanguageTag(locale),
    isPartOf: {
      '@id': withBaseUrl('/#website')
    },
    about: {
      '@id': withBaseUrl('/#organization')
    },
    breadcrumb: {
      '@id': `${canonicalUrl}#breadcrumb`
    }
  };
}

export function buildCollectionPageSchema(
  locale: Locale,
  _id: string,
  input: {
    name: string;
    description: string;
    url: string;
    items?: Array<{name: string; url?: string}>;
  }
) {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': webPageId(input.url),
    name: input.name,
    description: input.description,
    url: withBaseUrl(input.url),
    inLanguage: getLanguageTag(locale),
    hasPart: input.items?.map((item) =>
      compactObject({
        '@type': 'CreativeWork',
        name: item.name,
        url: item.url ? withBaseUrl(item.url) : undefined
      })
    )
  });
}
