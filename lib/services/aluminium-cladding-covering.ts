import aluminiumCladdingPageSpec from '@/specs/pages/aluminium_cladding_page.json';
import type {ServicePageTemplateData} from '@/components/services/service-page-template';
import type {Locale} from '@/i18n/routing';

type LocalizedRoutes = Record<Locale, string>;

type AluminiumCladdingSection =
  | {
      id: 'service_hero';
      content: {
        eyebrow: string;
        h1: string;
        subheadline: string;
        primary_cta: string;
        secondary_cta?: string;
        trust_microcopy?: string;
      };
      visual: {
        alt_text: string;
      };
    }
  | {
      id: 'problem_context';
      title: string;
      intro: string;
      cards: Array<{
        title: string;
        description: string;
      }>;
    }
  | {
      id: 'sipanel_solution';
      title: string;
      proof_note: string;
      steps: Array<{
        title: string;
        description: string;
      }>;
    }
  | {
      id: 'system_details';
      title: string;
      details: Array<{
        title: string;
        description: string;
      }>;
    }
  | {
      id: 'technical_proof_viewer';
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    }
  | {
      id: 'applications';
      title: string;
      cards: string[];
    }
  | {
      id: 'quality_checkpoints';
      title: string;
      items: string[];
    }
  | {
      id: 'related_case_studies';
      title: string;
    }
  | {
      id: 'faq_section';
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    }
  | {
      id: 'conversion_cta';
      headline: string;
      text: string;
      primary_cta: string;
      secondary_cta?: string;
    };

type AluminiumCladdingPageSpec = {
  page: 'aluminium_cladding_covering';
  route: LocalizedRoutes;
  seo: {
    primary_keyword: string;
    title: string;
    meta_description: string;
    h1: string;
  };
  page_sections: AluminiumCladdingSection[];
};

const page = aluminiumCladdingPageSpec as AluminiumCladdingPageSpec;

function getSection<T extends AluminiumCladdingSection['id']>(
  id: T
): Extract<AluminiumCladdingSection, {id: T}> {
  const section = page.page_sections.find((item): item is Extract<AluminiumCladdingSection, {id: T}> => item.id === id);

  if (!section) {
    throw new Error(`Missing ${id} in aluminium_cladding_page.json`);
  }

  return section;
}

export const aluminiumCladdingCoveringSpec = page;

export function getAluminiumCladdingCoveringPage(): ServicePageTemplateData {
  const hero = getSection('service_hero');
  const problem = getSection('problem_context');
  const solution = getSection('sipanel_solution');
  const systemDetails = getSection('system_details');
  const technicalProof = getSection('technical_proof_viewer');
  const applications = getSection('applications');
  const checkpoints = getSection('quality_checkpoints');
  const relatedCases = getSection('related_case_studies');
  const faq = getSection('faq_section');
  const conversion = getSection('conversion_cta');

  return {
    id: page.page,
    routes: page.route,
    seo: {
      primaryKeyword: page.seo.primary_keyword,
      title: page.seo.title,
      metaDescription: page.seo.meta_description
    },
    hero: {
      eyebrow: hero.content.eyebrow,
      h1: hero.content.h1,
      subheadline: hero.content.subheadline,
      primaryCta: hero.content.primary_cta,
      secondaryCta: hero.content.secondary_cta,
      visualDirection: hero.visual.alt_text,
      trustMicrocopy: hero.content.trust_microcopy
    },
    problemContext: {
      title: problem.title,
      cards: problem.cards.map((card) => `${card.title}: ${card.description}`)
    },
    engineeringApproach: {
      title: solution.title,
      steps: solution.steps
    },
    systemApplications: {
      title: applications.title,
      applications: [...applications.cards, ...systemDetails.details.map((detail) => `${detail.title}: ${detail.description}`)]
    },
    technicalProof: {
      title: technicalProof.title,
      description: solution.proof_note,
      requiredVisuals: technicalProof.items.map((item) => item.title),
      assets: technicalProof.items.map((item) => ({
        title: item.title,
        description: `${item.description} Pending real facade/cladding asset.`,
        assetStatus: 'pending'
      }))
    },
    processWorkflow: {
      title: 'Cladding Execution Workflow',
      steps: solution.steps
    },
    qualityCheckpoints: {
      title: checkpoints.title,
      checkpoints: checkpoints.items
    },
    relatedCaseStudies: {
      title: relatedCases.title
    },
    faq: {
      title: faq.title,
      items: faq.items
    },
    conversionCta: {
      headline: conversion.headline,
      text: conversion.text,
      button: conversion.primary_cta
    },
    schemas: {
      organization: true
    }
  };
}
