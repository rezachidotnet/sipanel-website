'use client';

import {useEffect, useRef} from 'react';
import {usePathname} from 'next/navigation';
import {trackSpaPageView} from '@/lib/analytics/events';
import {createSpaPageViewState, getCanonicalPageLocation} from '@/lib/analytics/spa-page-view';
import type {Locale} from '@/i18n/routing';

type SpaPageViewState = ReturnType<typeof createSpaPageViewState>;

type Props = {
  pageLanguage: Locale;
};

function readCurrentLocation() {
  return getCanonicalPageLocation(window.location);
}

export function SpaPageViewTracker({pageLanguage}: Props) {
  const pathname = usePathname();
  const trackerRef = useRef<SpaPageViewState | null>(null);
  const handledPathnameRef = useRef<string | null>(null);
  const firstFrameRef = useRef<number | null>(null);
  const secondFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (!trackerRef.current) {
      trackerRef.current = createSpaPageViewState(readCurrentLocation());
      handledPathnameRef.current = pathname;
      return;
    }

    if (handledPathnameRef.current === pathname) {
      return;
    }

    handledPathnameRef.current = pathname;

    firstFrameRef.current = window.requestAnimationFrame(() => {
      secondFrameRef.current = window.requestAnimationFrame(() => {
        firstFrameRef.current = null;
        secondFrameRef.current = null;

        const payload = trackerRef.current?.createPayload(readCurrentLocation(), document.title, pageLanguage);

        if (payload) {
          trackSpaPageView(payload);
        }
      });
    });

    return () => {
      if (firstFrameRef.current !== null) {
        window.cancelAnimationFrame(firstFrameRef.current);
        firstFrameRef.current = null;
      }

      if (secondFrameRef.current !== null) {
        window.cancelAnimationFrame(secondFrameRef.current);
        secondFrameRef.current = null;
      }
    };
  }, [pageLanguage, pathname]);

  return null;
}
