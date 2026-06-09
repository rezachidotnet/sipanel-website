'use client';

import {useState} from 'react';
import {trackCatalogEvent} from '@/lib/analytics/events';
import {CatalogDownloadModal} from '@/components/home/catalog-download-modal';

export function CatalogDownloadButton({label, componentId}: {label: string; componentId: string}) {
  const [catalogOpen, setCatalogOpen] = useState(false);

  function handleClick() {
    trackCatalogEvent('catalog_cta_clicked', {component_id: componentId});
    setCatalogOpen(true);
  }

  return (
    <>
      <button type="button" className="button-catalog-download" onClick={handleClick}>
        {label}
      </button>
      <CatalogDownloadModal isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </>
  );
}
