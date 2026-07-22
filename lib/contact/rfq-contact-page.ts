import mergedSpec from '@/specs/0_Sipanel_website_merged_2.json';
import rfqContactSpec from '@/specs/pages/rfq_contact_page.json';
import {normalizeLocalizedRouteMap, type Locale} from '@/i18n/routing';

type LocalizedRoutes = Record<Locale, string>;

export type ProductionContactInfo = {
  company_name: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
};

export type RfqContactSection =
  | {
      id: 'contact_hero';
      content: {
        eyebrow: string;
        h1: string;
        subheadline: string;
        primary_cta: string;
        secondary_cta: string;
        trust_microcopy: string;
      };
    }
  | {
      id: 'contact_options';
      title: string;
      cards: Array<{
        type: 'phone' | 'whatsapp' | 'email' | 'address';
        label: string;
        cta: string;
      }>;
    }
  | {
      id: 'rfq_form';
      title: string;
      steps: Array<{
        id: string;
        title: string;
        fields: Array<{
          name: string;
          type: string;
          label: string;
          required: boolean;
          placeholder?: string;
          options?: string[];
        }>;
      }>;
      submit: {
        label: string;
        loading_label: string;
        success_title: string;
        success_message: string;
      };
    }
  | {
      id: 'project_type_guidance';
      title: string;
      cards: Array<{
        title: string;
        description: string;
      }>;
    }
  | {
      id: 'trust_before_submit';
      title: string;
      benefits: string[];
    }
  | {
      id: 'location_section';
      title: string;
    }
  | {
      id: 'faq_section';
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };

export type RfqContactPageSpec = {
  page: 'rfq_contact';
  route: LocalizedRoutes;
  seo: {
    primary_keyword: string;
    title: string;
    meta_description: string;
    h1: string;
  };
  page_sections: RfqContactSection[];
};

export const rfqContactPage = {
  ...(rfqContactSpec as RfqContactPageSpec),
  route: normalizeLocalizedRouteMap((rfqContactSpec as RfqContactPageSpec).route)
};
export const productionContactInfo =
  mergedSpec.Sipanel_website_top_rank_deep_merged.production_contact_info as ProductionContactInfo;

export function getRfqContactSection<T extends RfqContactSection['id']>(
  id: T
): Extract<RfqContactSection, {id: T}> {
  const section = rfqContactPage.page_sections.find((item): item is Extract<RfqContactSection, {id: T}> => item.id === id);

  if (!section) {
    throw new Error(`Missing ${id} in rfq_contact_page.json`);
  }

  return section;
}

export function getRfqContactPageData() {
  return {
    route: rfqContactPage.route,
    seo: rfqContactPage.seo,
    contact: productionContactInfo,
    hero: getRfqContactSection('contact_hero'),
    options: getRfqContactSection('contact_options'),
    form: getRfqContactSection('rfq_form'),
    guidance: getRfqContactSection('project_type_guidance'),
    trust: getRfqContactSection('trust_before_submit'),
    faq: getRfqContactSection('faq_section')
  };
}
