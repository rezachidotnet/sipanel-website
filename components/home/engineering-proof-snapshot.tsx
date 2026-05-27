'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import type {StaticImageData} from 'next/image';
import {trackProofEvent} from '@/lib/analytics/events';
import bomMtoMobile from '@/assets/technical/procurement/bom-mto-mobile.webp';
import bomMtoDesktop from '@/assets/technical/procurement/bom-mto-preview.webp';
import shopDrawingsDesktop from '@/assets/technical/shop-drawings/shop-drawings-main.webp';
import shopDrawingsMobile from '@/assets/technical/shop-drawings/shop-drawings-mobile.webp';
import gutterFlashingDesktop from '@/assets/technical/waterproofing/gutter-flashing-desktop.webp';
import gutterFlashingMobile from '@/assets/technical/waterproofing/gutter-flashing-mobile.webp';

const proofCards = [
  {
    id: 'shopDrawing',
    desktopAsset: shopDrawingsDesktop,
    mobileAsset: shopDrawingsMobile
  },
  {
    id: 'waterproofing',
    desktopAsset: gutterFlashingDesktop,
    mobileAsset: gutterFlashingMobile
  },
  {
    id: 'materialOptimization',
    desktopAsset: bomMtoDesktop,
    mobileAsset: bomMtoMobile
  }
] as const;

type ProofCard = (typeof proofCards)[number];

export function EngineeringProofSnapshot() {
  const t = useTranslations('proofSnapshot');
  const [activeCard, setActiveCard] = useState<ProofCard | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!activeCard) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        trackProofEvent('diagram_close', {
          component_id: 'engineering_proof_snapshot',
          diagram_type: activeCard.id
        });
        setActiveCard(null);
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCard]);

  function openViewer(card: ProofCard) {
    trackProofEvent('proof_card_expand', {
      component_id: 'engineering_proof_snapshot',
      diagram_type: card.id
    });
    trackProofEvent('diagram_open', {
      component_id: 'engineering_proof_snapshot',
      diagram_type: card.id
    });
    setIsZoomed(false);
    setActiveCard(card);
  }

  function closeViewer(card = activeCard) {
    if (card) {
      trackProofEvent('diagram_close', {
        component_id: 'engineering_proof_snapshot',
        diagram_type: card.id
      });
    }

    setActiveCard(null);
    setIsZoomed(false);
  }

  function toggleZoom() {
    if (!activeCard) {
      return;
    }

    trackProofEvent('diagram_zoom', {
      component_id: 'engineering_proof_snapshot',
      diagram_type: activeCard.id
    });
    setIsZoomed((current) => !current);
  }

  return (
    <section className="proof-snapshot" aria-labelledby="proof-snapshot-title">
      <div className="container-shell proof-snapshot__inner">
        <div className="proof-snapshot__header">
          <p>{t('eyebrow')}</p>
          <h2 id="proof-snapshot-title">{t('title')}</h2>
          <span>{t('description')}</span>
        </div>

        <div className="proof-snapshot__grid">
          {proofCards.map((card) => (
            <article className="proof-card" key={card.id}>
              <button
                className="proof-card__toggle"
                onClick={() => openViewer(card)}
                type="button"
              >
                <ResponsiveDiagramImage
                  alt={t(`cards.${card.id}.alt`)}
                  desktopAsset={card.desktopAsset}
                  mobileAsset={card.mobileAsset}
                />
                <span className="proof-card__title">{t(`cards.${card.id}.title`)}</span>
                <span className="proof-card__body">{t(`cards.${card.id}.proof`)}</span>
                <span className="proof-card__action">{t('actionLabel')}</span>
              </button>
            </article>
          ))}
        </div>

        <div className="proof-snapshot__risk-strip" aria-label={t('riskStripLabel')}>
          {['installationError', 'materialWaste', 'rework', 'waterIngress'].map((item) => (
            <span key={item}>{t(`riskStrip.${item}`)}</span>
          ))}
        </div>
      </div>

      {activeCard ? (
        <div className="technical-diagram-modal" role="dialog" aria-modal="true" aria-labelledby="technical-diagram-modal-title">
          <button className="technical-diagram-modal__backdrop" type="button" aria-label={t('backdropCloseLabel')} onClick={() => closeViewer()} />
          <div className="technical-diagram-modal__panel">
            <div className="technical-diagram-modal__header">
              <strong id="technical-diagram-modal-title">{t(`cards.${activeCard.id}.title`)}</strong>
              <div className="technical-diagram-modal__actions">
                <button type="button" onClick={toggleZoom}>{isZoomed ? t('zoomOutLabel') : t('zoomInLabel')}</button>
                <button type="button" onClick={() => closeViewer()}>{t('closeLabel')}</button>
              </div>
            </div>
            <div className={isZoomed ? 'technical-diagram-modal__viewport is-zoomed' : 'technical-diagram-modal__viewport'}>
              <ResponsiveDiagramImage
                alt={t(`cards.${activeCard.id}.alt`)}
                desktopAsset={activeCard.desktopAsset}
                eager
                mobileAsset={activeCard.mobileAsset}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ResponsiveDiagramImage({
  alt,
  desktopAsset,
  eager = false,
  mobileAsset
}: {
  alt: string;
  desktopAsset: StaticImageData;
  eager?: boolean;
  mobileAsset: StaticImageData;
}) {
  return (
    <picture className="proof-diagram">
      <source media="(max-width: 767px)" srcSet={mobileAsset.src} />
      <img
        alt={alt}
        decoding="async"
        height={desktopAsset.height}
        loading={eager ? 'eager' : 'lazy'}
        src={desktopAsset.src}
        width={desktopAsset.width}
      />
    </picture>
  );
}
