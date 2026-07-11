'use client';

import {useState} from 'react';
import dynamic from 'next/dynamic';
import {Link} from '@/i18n/routing';
import {trackCtaClick, trackCatalogEvent} from '@/lib/analytics/events';

// Above-fold CTA island stays light: the catalog modal (its own form +
// next-intl usage) loads only on first click, not during initial hydration.
const CatalogDownloadModal = dynamic(
  () => import('@/components/home/catalog-download-modal').then((m) => m.CatalogDownloadModal),
  {ssr: false}
);

type Props = {
  primaryLabel: string;
  secondaryLabel: string;
};

export function HeroActions({primaryLabel, secondaryLabel}: Props) {
  const [catalogOpen, setCatalogOpen] = useState(false);

  function handleCatalogClick() {
    trackCatalogEvent('catalog_cta_click', {component_id: 'homepage_hero'});
    setCatalogOpen(true);
  }

  return (
    <>
      <div className="hero-copy__actions">
        {/* track: hero_primary_cta_click */}
        <Link
          href="/contact"
          className="button-primary"
          data-analytics-event="hero_primary_cta_click"
          data-analytics-owner="application"
          data-analytics-component="homepage_hero"
          data-analytics-location="homepage_hero"
          data-analytics-label="primary_cta"
          onClick={() => trackCtaClick('homepage_hero', primaryLabel, 'hero_primary_cta_click')}
        >
          {primaryLabel}
        </Link>
        {/* track: catalog_cta_click */}
        <button
          type="button"
          className="button-secondary"
          data-analytics-event="catalog_cta_click"
          data-analytics-owner="application"
          data-analytics-component="homepage_hero"
          data-analytics-location="homepage_hero"
          data-analytics-label="catalog"
          onClick={handleCatalogClick}
        >
          {secondaryLabel}
        </button>
      </div>

      {catalogOpen && (
        <CatalogDownloadModal isOpen onClose={() => setCatalogOpen(false)} />
      )}
    </>
  );
}
