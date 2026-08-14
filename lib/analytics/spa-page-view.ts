export type PageLocationInput = Pick<Location, 'origin' | 'pathname'>;

export type SpaPageViewPayload = {
  page_location: string;
  page_referrer: string;
  page_title: string;
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

    createPayload(nextLocation: string, pageTitle: string): SpaPageViewPayload | null {
      if (!nextLocation || nextLocation === previousLocation) {
        return null;
      }

      const payload = {
        page_location: nextLocation,
        page_referrer: previousLocation,
        page_title: pageTitle
      };

      previousLocation = nextLocation;
      return payload;
    }
  };
}
