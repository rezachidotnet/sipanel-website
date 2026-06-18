'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';
import {trackContactClick, trackEvent} from '@/lib/analytics/events';

const whatsappHref = `https://wa.me/${productionContactInfo.whatsapp.replace(/\D/g, '')}`;

// Mobile-landscape only: hide on scroll-down, reveal on scroll-up.
const LANDSCAPE_QUERY = '(orientation: landscape) and (max-height: 520px) and (max-width: 950px)';
const SCROLL_DIRECTION_THRESHOLD = 10;

export function StickyMobileCta() {
  const t = useTranslations('stickyCta');
  const [isVisible, setIsVisible] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);

  useEffect(() => {
    let animationFrame = 0;

    function updateVisibility() {
      const hero = document.querySelector<HTMLElement>('.hero-section');
      const footer = document.querySelector<HTMLElement>('.site-footer');
      const heroTrigger = hero ? hero.offsetTop + hero.offsetHeight * 0.4 : 280;
      const footerRect = footer?.getBoundingClientRect();
      const isNearFooter = footerRect ? footerRect.top < window.innerHeight + 80 : false;

      setIsVisible(window.scrollY > heroTrigger && !isNearFooter);
    }

    function onScroll() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateVisibility);
    }

    updateVisibility();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Landscape phones: collapse the bar when scrolling down, restore on scroll up.
  useEffect(() => {
    const landscape = window.matchMedia(LANDSCAPE_QUERY);
    let lastScrollY = window.scrollY;
    let animationFrame = 0;

    function evaluate() {
      if (!landscape.matches) {
        setHiddenByScroll(false);
        lastScrollY = window.scrollY;
        return;
      }

      const current = window.scrollY;
      const delta = current - lastScrollY;
      if (Math.abs(delta) < SCROLL_DIRECTION_THRESHOLD) return;

      // Scrolling down (and past the very top) hides; scrolling up shows.
      setHiddenByScroll(delta > 0 && current > 0);
      lastScrollY = current;
    }

    function onScroll() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(evaluate);
    }

    function onOrientationChange() {
      lastScrollY = window.scrollY;
      if (!landscape.matches) setHiddenByScroll(false);
    }

    onOrientationChange();
    window.addEventListener('scroll', onScroll, {passive: true});
    landscape.addEventListener('change', onOrientationChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', onScroll);
      landscape.removeEventListener('change', onOrientationChange);
    };
  }, []);

  const className = [
    'sticky-mobile-cta',
    isVisible ? 'is-visible' : '',
    hiddenByScroll ? 'is-hidden-landscape' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside
      aria-label={t('label')}
      className={className}
    >
      {/* track: sticky_mobile_cta_click */}
      <a className="sticky-mobile-cta__primary" href="#rfq" onClick={() => trackEvent('sticky_cta_click', {component_id: 'sticky_mobile_cta'})}>
        {t('primary')}
      </a>
      {/* track: whatsapp_click */}
      <a className="sticky-mobile-cta__secondary" href={whatsappHref} onClick={() => trackContactClick('whatsapp', 'sticky_mobile_cta')}>
        {t('whatsapp')}
      </a>
    </aside>
  );
}
