import type {Locale} from '@/i18n/routing';

export type PageViewLocationInput = Pick<Location, 'origin' | 'pathname' | 'search'>;

export type PageViewPayload = {
  event: 'page_view';
  page_location: string;
  page_path: string;
  page_title: string;
  page_language: Locale;
  page_referrer: string;
};

type WindowWithDataLayer = Window & {
  dataLayer?: unknown[];
};

export function getCurrentPageLocation(location: PageViewLocationInput) {
  const pathname = location.pathname || '/';
  const search = location.search || '';

  return {
    pageLocation: `${location.origin}${pathname}${search}`,
    pagePath: `${pathname}${search}`
  };
}

export function createPageViewState() {
  let previousLocation: string | null = null;
  let lastEmittedLocation: string | null = null;

  return {
    getPreviousLocation() {
      return previousLocation;
    },

    createPayload(
      nextLocation: string,
      nextPath: string,
      pageTitle: string,
      pageLanguage: Locale,
      initialReferrer: string
    ): PageViewPayload | null {
      if (!nextLocation || nextLocation === lastEmittedLocation) {
        return null;
      }

      const payload: PageViewPayload = {
        event: 'page_view',
        page_location: nextLocation,
        page_path: nextPath,
        page_title: pageTitle,
        page_language: pageLanguage,
        page_referrer: previousLocation ?? initialReferrer
      };

      previousLocation = nextLocation;
      lastEmittedLocation = nextLocation;
      return payload;
    }
  };
}

export function pushPageView(payload: PageViewPayload) {
  if (typeof window === 'undefined') {
    return false;
  }

  const win = window as WindowWithDataLayer;
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push(payload);

  return true;
}
