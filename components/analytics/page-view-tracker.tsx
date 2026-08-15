'use client';

import {useEffect, useMemo, useRef} from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import {createPageViewState, getCurrentPageLocation, pushPageView} from '@/lib/analytics/page-view';
import type {Locale} from '@/i18n/routing';

type PageViewState = ReturnType<typeof createPageViewState>;

type Props = {
  pageLanguage: Locale;
};

const pageViewState = createPageViewState();

function readCurrentLocation() {
  return getCurrentPageLocation(window.location);
}

function scheduleAfterTitleUpdate(callback: () => void) {
  let secondFrameId: number | null = null;

  const firstFrameId = window.requestAnimationFrame(() => {
    secondFrameId = window.requestAnimationFrame(callback);
  });

  return () => {
    window.cancelAnimationFrame(firstFrameId);

    if (secondFrameId !== null) {
      window.cancelAnimationFrame(secondFrameId);
    }
  };
}

export function PageViewTracker({pageLanguage}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageKey = useMemo(() => {
    const queryString = searchParams.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }, [pathname, searchParams]);
  const trackerRef = useRef<PageViewState>(pageViewState);
  const initialReferrerRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pageKey) {
      return;
    }

    if (initialReferrerRef.current === null) {
      initialReferrerRef.current = document.referrer;
    }

    return scheduleAfterTitleUpdate(() => {
      const {pageLocation, pagePath} = readCurrentLocation();
      const payload = trackerRef.current.createPayload(
        pageLocation,
        pagePath,
        document.title,
        pageLanguage,
        initialReferrerRef.current ?? ''
      );

      if (payload) {
        pushPageView(payload);
      }
    });
  }, [pageKey, pageLanguage]);

  return null;
}
