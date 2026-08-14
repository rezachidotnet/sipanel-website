import type {Locale} from '@/i18n/routing';

export type PageLocationInput = Pick<Location, 'origin' | 'pathname'>;

export type SpaPageViewPayload = {
  page_location: string;
  page_referrer: string;
  page_title: string;
  page_language: Locale;
};

export function getCanonicalPageLocation(location: PageLocationInput) {
  const pathname = location.pathname || '/';
  return `${location.origin}${pathname}`;
}

export function createSpaPageViewState(initialLocation: string) {
  let previousLocation = initialLocation;

  return {
    getPreviousLocation() {
      return previousLocation;
    },

    createPayload(nextLocation: string, pageTitle: string, pageLanguage: Locale): SpaPageViewPayload | null {
      if (!nextLocation || nextLocation === previousLocation) {
        return null;
      }

      const payload = {
        page_location: nextLocation,
        page_referrer: previousLocation,
        page_title: pageTitle,
        page_language: pageLanguage
      };

      previousLocation = nextLocation;
      return payload;
    }
  };
}
