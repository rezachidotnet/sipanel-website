'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import heroImage from '@/assets/projects/andimeshk/photos/andimeshk-hero-desktop.webp';
import {Link} from '@/i18n/routing';
import {trackCtaClick} from '@/lib/analytics/events';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="hero-section" aria-labelledby="homepage-hero-title">
      <div className="container-shell hero-section__inner">
        <div className="hero-copy">
          <p className="hero-copy__eyebrow">{t('eyebrow')}</p>
          <h1 id="homepage-hero-title">{t('headline')}</h1>
          <p className="hero-copy__subheadline">{t('subheadline')}</p>

          <div className="hero-copy__actions">
            {/* track: hero_primary_cta_click */}
            <Link
              href="/#rfq"
              className="button-primary"
              onClick={() => trackCtaClick('homepage_hero', t('primaryCta'), 'hero_primary_cta_click')}
            >
              {t('primaryCta')}
            </Link>
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
    </section>
  );
}
