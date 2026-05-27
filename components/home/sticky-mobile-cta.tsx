'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';
import {trackContactClick, trackEvent} from '@/lib/analytics/events';

const whatsappHref = `https://wa.me/${productionContactInfo.whatsapp.replace(/\D/g, '')}`;

export function StickyMobileCta() {
  const t = useTranslations('stickyCta');
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <aside
      aria-label={t('label')}
      className={isVisible ? 'sticky-mobile-cta is-visible' : 'sticky-mobile-cta'}
    >
      {/* track: sticky_mobile_cta_click */}
      <a className="sticky-mobile-cta__primary" href="#engineering-review" onClick={() => trackEvent('sticky_cta_click', {component_id: 'sticky_mobile_cta'})}>
        {t('primary')}
      </a>
      {/* track: whatsapp_click */}
      <a className="sticky-mobile-cta__secondary" href={whatsappHref} onClick={() => trackContactClick('whatsapp', 'sticky_mobile_cta')}>
        {t('whatsapp')}
      </a>
    </aside>
  );
}
