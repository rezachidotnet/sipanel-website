import Image from 'next/image';
import {useTranslations} from 'next-intl';
import heroDesktop from '@/assets/home/hero/hero-desktop.webp';
import heroMobile from '@/assets/home/hero/hero-mobile.webp';
import {HeroActions} from '@/components/home/hero-actions';

// Single source of truth for the hero image sizing — reused by the <Image>
// and by the desktop preload below so the preload requests the exact same
// optimizer candidate the <img> resolves to (no double download).
const HERO_SIZES = '(max-width: 767px) 100vw, (max-width: 1024px) 90vw, 45vw';

// Mirrors next/image's default-loader srcSet for the desktop asset so the
// media-scoped desktop preload matches the rendered <img srcSet> exactly.
const HERO_DESKTOP_WIDTHS = [384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
// q=65 mirrors the <Image quality={65}> below so the preload matches the
// rendered candidate exactly (no double download).
const heroDesktopSrcSet = HERO_DESKTOP_WIDTHS.map(
  (w) => `/_next/image?url=${encodeURIComponent(heroDesktop.src)}&w=${w}&q=65 ${w}w`
).join(', ');
const heroDesktopPreloadHref = `/_next/image?url=${encodeURIComponent(heroDesktop.src)}&w=1920&q=65`;

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <>
      {/*
        Per-device LCP preloads, media-scoped to eliminate cross-device leakage.
        next/image `priority` is intentionally NOT used here because it emits a
        single desktop-srcset preload with no media condition, which the browser
        also fetches on mobile (where the <source> actually renders the raw
        hero-mobile.webp) — wasting bandwidth and leaving the real mobile LCP
        image un-preloaded. These two links fix that: mobile preloads only
        hero-mobile.webp, desktop preloads only the optimized hero-desktop
        variant. Hero markup, <picture> logic and visual layout are unchanged.
      */}
      <link
        rel="preload"
        as="image"
        href={heroMobile.src}
        type="image/webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={heroDesktopPreloadHref}
        imageSrcSet={heroDesktopSrcSet}
        imageSizes={HERO_SIZES}
        media="(min-width: 768px)"
        fetchPriority="high"
      />
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
                loading="eager"
                quality={65}
                sizes={HERO_SIZES}
                className="hero-visual__image"
              />
            </picture>
            <div className="hero-visual__overlay" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
}
