import serviceSystemPages from '@/specs/pages/service_system_pages.json';
import type {ServicePageTemplateData} from '@/components/services/service-page-template';
import type {Locale} from '@/i18n/routing';

type ServiceSystemPageSpec = {
  id: string;
  route: Record<Locale, string>;
  seo: {
    primary_keyword: string;
    title: string;
    meta_description: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
    primary_cta: string;
    secondary_cta?: string;
    visual_direction: string;
  };
  problem_context: {
    title: string;
    cards: string[];
  };
  engineering_approach: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  applications: string[];
  technical_proof: {
    required_visuals: string[];
    interaction: string;
  };
  quality_checkpoints: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  conversion_cta: {
    headline: string;
    text: string;
    button: string;
  };
};

const servicePages = serviceSystemPages.pages as ServiceSystemPageSpec[];

function getRequiredSandwichPanelSystemsSpec(): ServiceSystemPageSpec {
  const page = servicePages.find((item) => item.id === 'sandwich_panel_systems');

  if (!page) {
    throw new Error('Missing sandwich_panel_systems in service_system_pages.json');
  }

  return page;
}

export const sandwichPanelSystemsSpec = getRequiredSandwichPanelSystemsSpec();

export function getSandwichPanelSystemsPage(): ServicePageTemplateData {
  const page = sandwichPanelSystemsSpec;

  return {
    id: page.id,
    routes: page.route,
    seo: {
      primaryKeyword: page.seo.primary_keyword,
      title: page.seo.title,
      metaDescription: page.seo.meta_description
    },
    hero: {
      eyebrow: page.hero.eyebrow,
      h1: page.hero.h1,
      subheadline: page.hero.subheadline,
      primaryCta: page.hero.primary_cta,
      secondaryCta: page.hero.secondary_cta,
      visualDirection: page.hero.visual_direction
    },
    problemContext: {
      title: page.problem_context.title,
      cards: page.problem_context.cards
    },
    engineeringApproach: {
      title: page.engineering_approach.title,
      steps: page.engineering_approach.steps
    },
    systemApplications: {
      title: `Where ${page.seo.primary_keyword} are used`,
      applications: page.applications
    },
    technicalProof: {
      title: 'Technical Proof',
      description: page.technical_proof.interaction,
      requiredVisuals: page.technical_proof.required_visuals
    },
    processWorkflow: {
      title: 'Engineering-Controlled Workflow',
      steps: page.engineering_approach.steps
    },
    qualityCheckpoints: {
      title: `${page.seo.primary_keyword} quality checkpoints`,
      checkpoints: page.quality_checkpoints
    },
    relatedCaseStudies: {
      title: page.hero.secondary_cta ?? 'Related Projects'
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: page.faq
    },
    conversionCta: {
      headline: page.conversion_cta.headline,
      text: page.conversion_cta.text,
      button: page.conversion_cta.button
    }
  };
}
