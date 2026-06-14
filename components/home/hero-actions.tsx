'use client';

import {useState} from 'react';
import {Link} from '@/i18n/routing';
import {trackCtaClick, trackCatalogEvent} from '@/lib/analytics/events';
import {CatalogDownloadModal} from '@/components/home/catalog-download-modal';

type Props = {
  primaryLabel: string;
  secondaryLabel: string;
};

export function HeroActions({primaryLabel, secondaryLabel}: Props) {
  const [catalogOpen, setCatalogOpen] = useState(false);

  function handleCatalogClick() {
    trackCatalogEvent('catalog_cta_clicked', {component_id: 'homepage_hero'});
    setCatalogOpen(true);
  }

  return (
    <>
      <div className="hero-copy__actions">
        {/* track: hero_primary_cta_click */}
        <Link
          href="/contact"
          className="button-primary"
          onClick={() => trackCtaClick('homepage_hero', primaryLabel, 'hero_primary_cta_click')}
        >
          {primaryLabel}
        </Link>
        {/* track: catalog_cta_clicked */}
        <button
          type="button"
          className="button-secondary"
          onClick={handleCatalogClick}
        >
          {secondaryLabel}
        </button>
      </div>

      <CatalogDownloadModal isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </>
  );
}
