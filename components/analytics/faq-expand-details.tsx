'use client';

import {useRef, type ReactNode} from 'react';
import type {Locale} from '@/i18n/routing';
import {trackFaqExpand} from '@/lib/analytics/events';

type FaqExpandAnalytics = {
  faqId: string;
  faqQuestion: string;
  faqCategory: string;
  faqPosition: number;
  pageLanguage: Locale;
};

type Props = {
  analytics: FaqExpandAnalytics;
  children: ReactNode;
  className?: string;
  summary: ReactNode;
};

export function FaqExpandDetails({analytics, children, className, summary}: Props) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function handleSummaryClick() {
    if (detailsRef.current?.open === false) {
      trackFaqExpand({
        faq_id: analytics.faqId,
        faq_question: analytics.faqQuestion,
        faq_category: analytics.faqCategory,
        faq_position: analytics.faqPosition,
        page_language: analytics.pageLanguage
      });
    }
  }

  return (
    <details className={className} ref={detailsRef}>
      <summary onClick={handleSummaryClick}>{summary}</summary>
      {children}
    </details>
  );
}
