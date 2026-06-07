'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import heroImage from '@/assets/projects/mahshahr_taxi/photos/mahshahr_taxi-hero-desktop.webp';
import {Link} from '@/i18n/routing';
import {trackCtaClick, trackCatalogEvent} from '@/lib/analytics/events';
import {CatalogDownloadModal} from '@/components/home/catalog-download-modal';

export function HeroSection() {
  const t = useTranslations('hero');
  const [catalogOpen, setCatalogOpen] = useState(false);

  function handleCatalogClick() {
    trackCatalogEvent('catalog_cta_clicked', {component_id: 'homepage_hero'});
    setCatalogOpen(true);
  }

  return (
    <section className="hero-section" aria-labelledby="homepage-hero-title">
      <div className="container-shell hero-section__inner">
        <div className="hero-copy">
          <p className="hero-copy__eyebrow">{t('eyebrow')}</p>
          <h1 id="homepage-hero-title">{t('headline')}</h1>
          <p className="hero-copy__subheadline">{t('subheadline')}</p>

          <div className="hero-copy__actions">
            {/* track: catalog_cta_clicked */}
            <button
              type="button"
              className="button-primary"
              onClick={handleCatalogClick}
            >
              {t('primaryCta')}
            </button>
            {/* track: hero_secondary_cta_click */}
            <Link
              href="/contact"
              className="button-secondary"
              onClick={() => trackCtaClick('homepage_hero', t('secondaryCta'), 'hero_secondary_cta_click')}
            >
              {t('secondaryCta')}
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src={heroImage}
            alt={t('visualAlt')}
            fill
            priority
            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 90vw, 45vw"
            className="hero-visual__image"
          />
          <div className="hero-visual__overlay" aria-hidden="true" />
        </div>
      </div>

      <CatalogDownloadModal isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </section>
  );
}
