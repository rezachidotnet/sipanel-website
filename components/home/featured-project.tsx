'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export function FeaturedProject() {
  const t = useTranslations('featuredProject');
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {rootMargin: '200px'}
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [isVisible]);

  const scopeItems = t('scopeItems').split('|');

  return (
    <section
      ref={sectionRef}
      className={`featured-project${isVisible ? ' featured-project--visible' : ''}`}
      aria-labelledby="featured-project-title"
    >
      <div className="container-shell featured-project__inner">
        <header className="featured-project__eyebrow">
          <span>{t('eyebrow')}</span>
        </header>

        <div className="featured-project__layout">
          <div className="featured-project__video-wrap">
            <video
              ref={videoRef}
              className="featured-project__video"
              poster="/videos/projects/army-hospital/poster.webp"
              muted
              loop
              playsInline
              preload="none"
            >
              {isVisible && (
                <>
                  <source
                    src="/videos/projects/army-hospital/army-hospital-18s.webm"
                    type="video/webm"
                  />
                  <source
                    src="/videos/projects/army-hospital/army-hospital-18s.mp4"
                    type="video/mp4"
                  />
                </>
              )}
            </video>
          </div>

          <div className="featured-project__content">
            <h2 id="featured-project-title" className="featured-project__title">
              {t('title')}
            </h2>

            <p className="featured-project__value-statement">{t('valueStatement')}</p>

            <address className="featured-project__location">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.38 4.5 8.5 4.5 8.5s4.5-5.12 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5zm0 6.11a1.61 1.61 0 110-3.22 1.61 1.61 0 010 3.22z"
                  fill="currentColor"
                />
              </svg>
              <span>{t('location')}</span>
            </address>

            <div className="featured-project__metrics">
              <div className="featured-project__metric">
                <strong>{t('metric1Value')}</strong>
                <span>{t('metric1Label')}</span>
              </div>
              <div className="featured-project__metric">
                <strong>{t('metric2Value')}</strong>
                <span>{t('metric2Label')}</span>
              </div>
              <div className="featured-project__metric">
                <strong>{t('metric3Value')}</strong>
                <span>{t('metric3Label')}</span>
              </div>
            </div>

            <p className="featured-project__desc">{t('description')}</p>

            <div className="featured-project__scope">
              <h3 className="featured-project__scope-title">{t('scopeTitle')}</h3>
              <ul className="featured-project__scope-list">
                {scopeItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <Link href="/projects/army-hospital" className="featured-project__cta button-primary">
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
