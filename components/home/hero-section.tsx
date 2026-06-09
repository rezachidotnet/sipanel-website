'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import heroDesktop from '@/assets/home/hero/hero-desktop.webp';
import heroMobile from '@/assets/home/hero/hero-mobile.webp';
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
          <h1 id="homepage-hero-title">{t('headline')}</h1>
          <p className="hero-copy__subheadline">{t('subheadline')}</p>

          <div className="hero-copy__actions">
            {/* track: hero_primary_cta_click */}
            <Link
              href="/contact"
              className="button-primary"
              onClick={() => trackCtaClick('homepage_hero', t('primaryCta'), 'hero_primary_cta_click')}
            >
              {t('primaryCta')}
            </Link>
            {/* track: catalog_cta_clicked */}
            <button
              type="button"
              className="button-secondary"
              onClick={handleCatalogClick}
            >
              {t('secondaryCta')}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <picture>
            <source media="(max-width: 767px)" srcSet={heroMobile.src} width={heroMobile.width} height={heroMobile.height} />
            <Image
              src={heroDesktop}
              alt={t('visualAlt')}
              fill
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1024px) 90vw, 45vw"
              className="hero-visual__image"
            />
          </picture>
          <div className="hero-visual__overlay" aria-hidden="true" />
        </div>
      </div>

      <CatalogDownloadModal isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </section>
  );
}
