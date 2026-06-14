import Image from 'next/image';
import {useTranslations} from 'next-intl';
import heroDesktop from '@/assets/home/hero/hero-desktop.webp';
import heroMobile from '@/assets/home/hero/hero-mobile.webp';
import {HeroActions} from '@/components/home/hero-actions';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="hero-section" aria-labelledby="homepage-hero-title">
      <div className="container-shell hero-section__inner">
        <div className="hero-copy">
          <h1 id="homepage-hero-title">{t('headline')}</h1>
          <p className="hero-copy__subheadline">{t('subheadline')}</p>

          <HeroActions primaryLabel={t('primaryCta')} secondaryLabel={t('secondaryCta')} />
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
    </section>
  );
}
