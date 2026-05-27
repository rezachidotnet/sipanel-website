import engineeringResourceHubSpec from '@/specs/pages/engineering_resource_hub.json';
import {locales, type Locale} from '@/i18n/routing';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';
import {buildPageMetadata} from '@/lib/seo/metadata';

type ResourceCategoryId =
  | 'panel_systems'
  | 'roofing_waterproofing'
  | 'cladding_facades'
  | 'shop_drawings'
  | 'procurement'
  | 'quality_control';

type ResourceHubSpec = {
  route: Record<Locale, string>;
  seo: {
    primary_keyword: string;
    title: string;
    meta_description: string;
    h1: string;
  };
  page_sections: Array<
    | {
        id: 'resource_hub_hero';
        content: {
          eyebrow: string;
          h1: string;
          subheadline: string;
          primary_cta: string;
          secondary_cta: string;
          trust_microcopy: string;
        };
        visual: {
          fallback: string;
        };
      }
    | {
        id: 'resource_categories';
        title: string;
        categories: Array<{
          id: ResourceCategoryId;
          label: string;
        }>;
      }
    | {
        id: 'featured_resources';
        title: string;
        resources: Array<{
          id: string;
          type: 'checklist' | 'guide' | 'technical_note' | 'worksheet';
          category: ResourceCategoryId;
          title: string;
          description: string;
          difficulty: string;
          read_time: string;
          cta: string;
          lead_capture: boolean;
        }>;
      }
    | {
        id: 'engineering_learning_paths';
      }
    | {
        id: 'technical_proof_library';
      }
    | {
        id: 'resource_lead_capture';
        title: string;
        form_fields: string[];
        cta: string;
      }
    | {
        id: 'related_services';
        title: string;
        cards: Array<{
          title: string;
          link: string;
        }>;
      }
    | {
        id: 'conversion_cta';
        headline: string;
        text: string;
        primary_cta: string;
        secondary_cta: string;
      }
  >;
};

export type ResourceHubCategory = {
  id: ResourceCategoryId;
  label: string;
};

export type ResourceHubCard = {
  id: string;
  slug: string;
  type: 'checklist' | 'guide' | 'technical_note' | 'worksheet';
  category: ResourceCategoryId;
  title: string;
  description: string;
  difficulty: string;
  readTime: string;
  cta: string;
  leadCapture: boolean;
  assetStatus: 'pending_resource_file';
  leadCaptureStatus: 'pending_lead_capture' | 'not_required';
  relatedServiceHref: string;
};

export type ResourceDetailPageData = {
  resource: ResourceHubCard;
  categoryLabel: string;
  route: Record<Locale, string>;
  breadcrumbs: Array<{
    label: string;
    href: string;
  }>;
  relatedServices: Array<{
    title: string;
    href: string;
  }>;
  relatedResources: ResourceHubCard[];
  context: {
    title: string;
    description: string;
    points: string[];
  };
  previewSections: Array<{
    title: string;
    description: string;
  }>;
  conversionCta: ResourceHubLocaleContent['conversionCta'];
  leadCapture: ResourceHubLocaleContent['leadCapture'];
};

export type ResourceHubLocaleContent = {
  seo: ResourceHubSpec['seo'];
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    trustMicrocopy: string;
    visualFallback: string;
  };
  categories: ResourceHubCategory[];
  featuredResources: ResourceHubCard[];
  leadCapture: {
    title: string;
    fields: string[];
    cta: string;
  };
  relatedServices: Array<{
    title: string;
    href: string;
  }>;
  conversionCta: {
    headline: string;
    text: string;
    primary_cta: string;
    secondary_cta: string;
  };
  relatedLinks: Array<{
    label: string;
    href: string;
  }>;
};

export type ResourceHubPageData = {
  routes: Record<Locale, string>;
  localeContent: Record<Locale, ResourceHubLocaleContent>;
};

const resourceHubSpec = engineeringResourceHubSpec as ResourceHubSpec;

const resourceTypeLabels: Record<ResourceHubCard['type'], string> = {
  checklist: 'Checklist',
  guide: 'Guide',
  technical_note: 'Technical Note',
  worksheet: 'Worksheet'
};

const relatedServiceByCategory: Record<ResourceCategoryId, string> = {
  panel_systems: '/systems/sandwich-panel-systems',
  roofing_waterproofing: '/systems/standing-seam-zip-tech-roofing',
  cladding_facades: '/systems/aluminium-cladding-covering',
  shop_drawings: '/solutions/shop-drawing-review-panel-projects',
  procurement: '/solutions/panel-material-optimization',
  quality_control: '/solutions/industrial-envelope-systems'
};

const technicalContextByCategory: Record<ResourceCategoryId, {description: string; points: string[]}> = {
  panel_systems: {
    description:
      'Panel system decisions should be reviewed before procurement because panel type, core, thickness, joint logic, accessories, and installation conditions affect envelope performance.',
    points: ['Panel selection criteria', 'Joint and accessory coordination', 'Procurement review before ordering']
  },
  roofing_waterproofing: {
    description:
      'Roofing and waterproofing resources focus on slope, drainage, seam logic, flashing, penetrations, gutters, and installation sequence before roof work starts.',
    points: ['Drainage and slope review', 'Flashing and penetration control', 'Installation sequence checkpoints']
  },
  cladding_facades: {
    description:
      'Cladding resources support facade layout control, fixing logic, joint alignment, edge conditions, opening coordination, and material planning.',
    points: ['Facade grid and joint review', 'Fixing and edge detail coordination', 'Material optimization before installation']
  },
  shop_drawings: {
    description:
      'Shop drawing resources help review panel layout, dimensions, quantities, accessories, flashing logic, and installation sequence before site execution.',
    points: ['Layout and quantity verification', 'Accessory and flashing coordination', 'Execution sequence review']
  },
  procurement: {
    description:
      'Procurement resources support quantity planning, accessory review, material gaps, waste control, and clearer ordering before project cost becomes fixed.',
    points: ['MTO and accessory planning', 'Waste and gap reduction', 'Procurement readiness review']
  },
  quality_control: {
    description:
      'Quality control resources focus on inspection checkpoints for alignment, waterproofing behavior, installation quality, and final verification.',
    points: ['Site inspection checkpoints', 'Waterproofing and alignment review', 'Final verification references']
  }
};

const previewSectionsByCategory: Record<ResourceCategoryId, Array<{title: string; description: string}>> = {
  panel_systems: [
    {title: 'System Selection Inputs', description: 'Building use, insulation needs, panel thickness, core selection, and joint logic.'},
    {title: 'Coordination Checks', description: 'Accessories, flashing transitions, openings, and installation constraints.'},
    {title: 'Procurement Readiness', description: 'Structured review before material ordering and site execution.'}
  ],
  roofing_waterproofing: [
    {title: 'Leakage Risk Inputs', description: 'Slope, drainage paths, gutters, penetrations, overlaps, and edge details.'},
    {title: 'Detail Coordination', description: 'Seam behavior, flashing logic, roof movement, and waterproofing transitions.'},
    {title: 'Pre-Installation Review', description: 'Technical checkpoints before roof work starts on site.'}
  ],
  cladding_facades: [
    {title: 'Facade Layout Review', description: 'Grid, rhythm, joints, openings, panel sizing, and visual alignment.'},
    {title: 'Fixing Logic', description: 'Substructure, edge conditions, fixing points, and installation sequence.'},
    {title: 'Material Control', description: 'Waste reduction and quantity coordination before procurement.'}
  ],
  shop_drawings: [
    {title: 'Drawing Scope', description: 'Panel layout, dimensions, accessories, flashings, and quantities.'},
    {title: 'Review Logic', description: 'Coordination checks before procurement and installation.'},
    {title: 'Execution Clarity', description: 'Sequence references for installers and project teams.'}
  ],
  procurement: [
    {title: 'Quantity Planning', description: 'Panels, flashings, trims, fasteners, accessories, and gaps.'},
    {title: 'Cost Control Inputs', description: 'Waste, lead time, missing items, and procurement sequencing.'},
    {title: 'Ordering Readiness', description: 'Structured review before committing project materials.'}
  ],
  quality_control: [
    {title: 'Inspection Scope', description: 'Installation quality, alignment, fastening, waterproofing, and finish control.'},
    {title: 'Checkpoint Logic', description: 'Practical references for site review and technical verification.'},
    {title: 'Completion Review', description: 'Final checks before handover and risk closure.'}
  ]
};

const breadcrumbLabels: Record<Locale, {home: string; resources: string}> = {
  en: {home: 'Home', resources: 'Resources'},
  fa: {home: 'خانه', resources: 'منابع'},
  ar: {home: 'الرئيسية', resources: 'الموارد'},
  ru: {home: 'Главная', resources: 'Ресурсы'}
};

function buildFeaturedResources(): ResourceHubCard[] {
  const resourcesSection = resourceHubSpec.page_sections.find(
    (section): section is Extract<ResourceHubSpec['page_sections'][number], {id: 'featured_resources'}> =>
      section.id === 'featured_resources'
  );

  if (!resourcesSection) {
    throw new Error('Missing featured_resources in engineering_resource_hub.json');
  }

  return resourcesSection.resources.map((resource) => ({
    id: resource.id,
    slug: resource.id.replaceAll('_', '-'),
    type: resource.type,
    category: resource.category,
    title: resource.title,
    description: resource.description,
    difficulty: resource.difficulty,
    readTime: resource.read_time,
    cta: resource.cta,
    leadCapture: resource.lead_capture,
    assetStatus: 'pending_resource_file',
    leadCaptureStatus: resource.lead_capture ? 'pending_lead_capture' : 'not_required',
    relatedServiceHref: relatedServiceByCategory[resource.category]
  }));
}

function getSection<T extends ResourceHubSpec['page_sections'][number]['id']>(
  id: T
): Extract<ResourceHubSpec['page_sections'][number], {id: T}> {
  const section = resourceHubSpec.page_sections.find((item): item is Extract<ResourceHubSpec['page_sections'][number], {id: T}> => item.id === id);

  if (!section) {
    throw new Error(`Missing ${id} in engineering_resource_hub.json`);
  }

  return section;
}

function buildLocaleContent(): ResourceHubLocaleContent {
  const hero = getSection('resource_hub_hero');
  const categories = getSection('resource_categories');
  const leadCapture = getSection('resource_lead_capture');
  const relatedServices = getSection('related_services');
  const conversion = getSection('conversion_cta');

  return {
    seo: resourceHubSpec.seo,
    hero: {
      eyebrow: hero.content.eyebrow,
      h1: hero.content.h1,
      subheadline: hero.content.subheadline,
      primaryCta: hero.content.primary_cta,
      secondaryCta: hero.content.secondary_cta,
      trustMicrocopy: hero.content.trust_microcopy,
      visualFallback: hero.visual.fallback
    },
    categories: categories.categories,
    featuredResources: buildFeaturedResources(),
    leadCapture: {
      title: leadCapture.title,
      fields: leadCapture.form_fields,
      cta: leadCapture.cta
    },
    relatedServices: relatedServices.cards.map((card) => ({
      title: card.title,
      href: card.link
    })),
    conversionCta: conversion,
    relatedLinks: [
      {label: 'Sandwich Panel Systems', href: '/systems/sandwich-panel-systems'},
      {label: 'Standing Seam & ZIP Tech Roofing', href: '/systems/standing-seam-zip-tech-roofing'},
      {label: 'Aluminium Cladding & Covering', href: '/systems/aluminium-cladding-covering'},
      {label: 'Project Proof', href: '/#case-studies-preview'}
    ]
  };
}

const localeContent = buildLocaleContent();

export const engineeringResourceHubPage: ResourceHubPageData = {
  routes: resourceHubSpec.route,
  localeContent: Object.fromEntries(locales.map((locale) => [locale, localeContent])) as Record<
    Locale,
    ResourceHubLocaleContent
  >
};

export function getEngineeringResourceHubPage() {
  return engineeringResourceHubPage;
}

export function getEngineeringResourceHubMetadata(locale: Locale) {
  const content = engineeringResourceHubPage.localeContent[locale];

  return buildPageMetadata({
    locale,
    title: content.seo.title,
    description: content.seo.meta_description,
    routes: engineeringResourceHubPage.routes
  });
}

export function getResourceDetailPage(locale: Locale, slug: string): ResourceDetailPageData | null {
  const content = engineeringResourceHubPage.localeContent[locale];
  const resource = content.featuredResources.find((item) => item.slug === slug);

  if (!resource) {
    return null;
  }

  const categoryLabel = content.categories.find((category) => category.id === resource.category)?.label ?? resource.category;
  const route = Object.fromEntries(locales.map((item) => [item, `/${item}/resources/${resource.slug}`])) as Record<Locale, string>;
  const relatedResources = content.featuredResources
    .filter((item) => item.slug !== resource.slug)
    .filter((item) => item.category === resource.category || item.leadCapture === resource.leadCapture)
    .slice(0, 3);

  return {
    resource,
    categoryLabel,
    route,
    breadcrumbs: [...getEngineeringResourceHubBreadcrumbs(locale), {label: resource.title, href: route[locale]}],
    relatedServices: content.relatedServices.filter((service) => service.href === resource.relatedServiceHref || content.relatedServices.length <= 3),
    relatedResources: relatedResources.length > 0 ? relatedResources : content.featuredResources.filter((item) => item.slug !== resource.slug).slice(0, 3),
    context: {
      title: 'Technical Context',
      ...technicalContextByCategory[resource.category]
    },
    previewSections: previewSectionsByCategory[resource.category],
    conversionCta: content.conversionCta,
    leadCapture: content.leadCapture
  };
}

export function getAllResourceDetailStaticParams() {
  const content = engineeringResourceHubPage.localeContent.en;

  return locales.flatMap((locale) => content.featuredResources.map((resource) => ({locale, slug: resource.slug})));
}

export function getResourceDetailMetadata(locale: Locale, slug: string) {
  const page = getResourceDetailPage(locale, slug);

  if (!page) {
    return null;
  }

  return buildPageMetadata({
    locale,
    title: `${page.resource.title} | SIPANEL Engineering Resource`,
    description: page.resource.description,
    routes: page.route
  });
}

export function getEngineeringResourceHubBreadcrumbs(locale: Locale) {
  const labels = breadcrumbLabels[locale];

  return [
    {label: labels.home, href: `/${locale}`},
    {label: labels.resources, href: engineeringResourceHubPage.routes[locale]}
  ];
}

export function getResourceTypeLabel(type: ResourceHubCard['type']) {
  return resourceTypeLabels[type];
}

export function getProductionContactInfo() {
  return productionContactInfo;
}
