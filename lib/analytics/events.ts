'use client';

import {sendGTMEvent} from '@next/third-parties/google';
import type {Locale} from '@/i18n/routing';

export const approvedAnalyticsEvents = [
  'language_change',
  'hero_primary_cta_click',
  'proof_card_expand',
  'case_study_cta_click',
  'related_case_study_click',
  'diagram_open',
  'diagram_zoom',
  'diagram_close',
  'technical_proof_open',
  'resource_download_start',
  'resource_download_complete',
  'related_resource_click',
  'sticky_cta_click',
  'rfq_start',
  'rfq_step_complete',
  'rfq_submit',
  'rfq_error',
  'file_upload_attempt',
  'phone_click',
  'whatsapp_click',
  'email_click',
  'related_service_click',
  'service_page_click',
  'faq_category_filter',
  'faq_expand',
  'catalog_cta_click',
  'catalog_form_submitted',
  'catalog_download_started',
  'language_switcher_open'
] as const;

export type AnalyticsEventName = (typeof approvedAnalyticsEvents)[number];

export type AnalyticsParams = Partial<{
  page_location: string;
  page_referrer: string;
  page_language: Locale | string;
  page_url: string;
  page_path: string;
  page_title: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  viewport_width: number;
  traffic_source: string;
  language: Locale | string;
  component_id: string;
  component_name: string;
  section_id: string;
  cta_text: string;
  interaction_type: string;
  lead_type: string;
  project_type: string;
  form_step: number | string;
  submission_method: string;
  diagram_type: string;
  resource_type: string;
  case_study_name: string;
  engineering_topic: string;
  previous_language: string;
  selected_language: string;
  search_query: string;
  category: string;
  faq_id: string;
  faq_question: string;
  faq_category: string;
  faq_position: number;
}>;

type WindowWithAnalytics = Window & {
  dataLayer?: unknown[];
};

type GtmEvent = {
  event: string;
  [key: string]: string | number | boolean | undefined;
};

type FaqExpandPayload = {
  event: 'faq_expand';
  faq_id: string;
  faq_question: string;
  faq_category: string;
  faq_position: number;
  page_language: Locale;
};

const approvedEventSet = new Set<string>(approvedAnalyticsEvents);
const missingGtmWarnings = new Set<string>();

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function hasGtmTransport(win: WindowWithAnalytics) {
  return Boolean(process.env.NEXT_PUBLIC_GTM_ID || win.dataLayer);
}

function warnMissingGtmTransport(eventName: AnalyticsEventName) {
  if (process.env.NODE_ENV !== 'development' || missingGtmWarnings.has(eventName)) {
    return;
  }

  missingGtmWarnings.add(eventName);
  console.warn(`[analytics] GTM/dataLayer unavailable; skipped "${eventName}".`);
}

function getDeviceType(width: number): AnalyticsParams['device_type'] {
  if (width < 768) {
    return 'mobile';
  }

  if (width < 1024) {
    return 'tablet';
  }

  return 'desktop';
}

function getTrafficSource() {
  if (document.referrer) {
    try {
      return new URL(document.referrer).hostname;
    } catch {
      return 'referral';
    }
  }

  return 'direct';
}

function getLanguage() {
  return document.documentElement.lang || undefined;
}

function buildCommonParams(): AnalyticsParams {
  const width = window.innerWidth;
  const pagePath = window.location.pathname;

  return {
    page_url: `${window.location.origin}${pagePath}`,
    page_path: pagePath,
    page_title: document.title,
    device_type: getDeviceType(width),
    viewport_width: width,
    traffic_source: getTrafficSource(),
    language: getLanguage()
  };
}

function sanitizeParams(params: AnalyticsParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
}

function dispatchGtmEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (!isBrowser() || !isApprovedAnalyticsEvent(eventName)) {
    return false;
  }

  const win = window as WindowWithAnalytics;

  if (!hasGtmTransport(win)) {
    warnMissingGtmTransport(eventName);
    return false;
  }

  const gtmPayload: GtmEvent = {
    event: eventName,
    ...sanitizeParams(params)
  };

  sendGTMEvent(gtmPayload);

  return true;
}

export function isApprovedAnalyticsEvent(eventName: string): eventName is AnalyticsEventName {
  return approvedEventSet.has(eventName);
}

export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (!isBrowser()) {
    return false;
  }

  const payload = sanitizeParams({
    ...buildCommonParams(),
    ...params
  });

  return dispatchGtmEvent(eventName, payload);
}

export function trackCtaClick(component_id: string, cta_text: string, eventName: AnalyticsEventName) {
  return trackEvent(eventName, {
    component_id,
    cta_text,
    interaction_type: 'click'
  });
}

export function trackRfqEvent(eventName: 'rfq_start' | 'rfq_step_complete' | 'rfq_submit' | 'rfq_error', params: AnalyticsParams = {}) {
  return trackEvent(eventName, {
    lead_type: 'rfq',
    ...params
  });
}

export function trackLanguageChange(previous_language: string, selected_language: string, component_id = 'language_switcher') {
  return trackEvent('language_change', {
    previous_language,
    selected_language,
    component_id,
    interaction_type: 'click'
  });
}

export function trackProofEvent(eventName: 'proof_card_expand' | 'diagram_open' | 'diagram_zoom' | 'diagram_close' | 'technical_proof_open', params: AnalyticsParams = {}) {
  return trackEvent(eventName, params);
}

export function trackFaqEvent(eventName: 'faq_category_filter', params: AnalyticsParams = {}) {
  return trackEvent(eventName, params);
}

export function trackFaqExpand(params: Omit<FaqExpandPayload, 'event'>) {
  if (!isBrowser()) {
    return false;
  }

  const payload: FaqExpandPayload = {
    event: 'faq_expand',
    faq_id: params.faq_id,
    faq_question: params.faq_question.replace(/\s+/g, ' ').trim(),
    faq_category: params.faq_category,
    faq_position: params.faq_position,
    page_language: params.page_language
  };

  const win = window as WindowWithAnalytics;
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push(payload);

  return true;
}

export function trackResourceEvent(eventName: 'resource_download_start' | 'resource_download_complete' | 'related_resource_click', params: AnalyticsParams = {}) {
  return trackEvent(eventName, params);
}

export function trackCaseStudyEvent(eventName: 'case_study_cta_click' | 'related_case_study_click', params: AnalyticsParams = {}) {
  return trackEvent(eventName, params);
}

export function trackCatalogEvent(eventName: 'catalog_cta_click' | 'catalog_form_submitted' | 'catalog_download_started', params: AnalyticsParams = {}) {
  return trackEvent(eventName, {
    lead_type: 'catalog_download',
    ...params
  });
}

export function trackContactClick(type: 'phone' | 'whatsapp' | 'email', component_id?: string) {
  const eventName = {
    phone: 'phone_click',
    whatsapp: 'whatsapp_click',
    email: 'email_click'
  }[type] as AnalyticsEventName;

  return trackEvent(eventName, {
    component_id,
    interaction_type: 'click'
  });
}
