'use client';

import './case-study.css';
import Image from 'next/image';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Link, getDirection, type Locale} from '@/i18n/routing';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';
import {trackCaseStudyEvent, trackProofEvent} from '@/lib/analytics/events';
import {
  buildCaseStudyArticleSchema,
  buildCaseStudyBreadcrumbSchema,
  buildCaseStudyOrganizationSchema,
  buildCaseStudyServiceSchema,
  buildCaseStudyWebPageSchema,
  type CaseStudyPageData,
  type CaseStudyProofAsset,
  type CaseStudyRelatedStudy
} from '@/lib/case-studies/case-study-pages';

type Props = {
  locale: Locale;
  page: CaseStudyPageData;
};

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function isPendingValue(value: string) {
  return !value || value === 'pending' || value === 'pending_verified_data' || value === 'unknown';
}

function buildPhoneHref() {
  return productionContactInfo.phone ? `tel:${productionContactInfo.phone.replace(/\s/g, '')}` : null;
}

function buildWhatsappHref() {
  return productionContactInfo.whatsapp ? `https://wa.me/${productionContactInfo.whatsapp.replace(/\D/g, '')}` : null;
}

function buildPendingProofItems(label: string): CaseStudyProofAsset[] {
  return [
    {
      title: label,
      description: label,
      assetStatus: 'pending',
      assetType: 'project_image'
    }
  ];
}

function buildPendingRelatedStudies(label: string): CaseStudyRelatedStudy[] {
  return [
    {
      projectName: label,
      location: '',
      challenge: label,
      engineeringDecision: label,
      measuredResult: label,
      assetStatus: 'pending'
    },
    {
      projectName: label,
      location: '',
      challenge: label,
      engineeringDecision: label,
      measuredResult: label,
      assetStatus: 'pending'
    }
  ];
}

function getTemplateLabels(locale: Locale) {
  return {
    project: {
      en: 'Project',
      fa: 'پروژه',
      ar: 'المشروع',
      ru: 'Проект'
    }[locale],
    location: {
      en: 'Location',
      fa: 'موقعیت',
      ar: 'الموقع',
      ru: 'Локация'
    }[locale],
    system: {
      en: 'System',
      fa: 'سیستم',
      ar: 'النظام',
      ru: 'Система'
    }[locale],
    installationSequence: {
      en: 'Installation sequence',
      fa: 'ترتیب نصب',
      ar: 'تسلسل التركيب',
      ru: 'Последовательность монтажа'
    }[locale],
    procurementControl: {
      en: 'Procurement control',
      fa: 'کنترل تامین',
      ar: 'ضبط التوريد',
      ru: 'Контроль поставок'
    }[locale],
    siteCoordination: {
      en: 'Coordination with site team',
      fa: 'هماهنگی با تیم کارگاه',
      ar: 'التنسيق مع فريق الموقع',
      ru: 'Координация с площадкой'
    }[locale],
    qualityCheckpoints: {
      en: 'Quality checkpoints',
      fa: 'نقاط کنترل کیفیت',
      ar: 'نقاط ضبط الجودة',
      ru: 'Контрольные точки качества'
    }[locale],
    viewSystem: {
      en: 'View system',
      fa: 'مشاهده سیستم',
      ar: 'عرض النظام',
      ru: 'Смотреть систему'
    }[locale],
    challenge: {
      en: 'Challenge',
      fa: 'چالش',
      ar: 'التحدي',
      ru: 'Задача'
    }[locale],
    engineeringDecision: {
      en: 'Engineering decision',
      fa: 'تصمیم مهندسی',
      ar: 'القرار الهندسي',
      ru: 'Инженерное решение'
    }[locale],
    result: {
      en: 'Result',
      fa: 'نتیجه',
      ar: 'النتيجة',
      ru: 'Результат'
    }[locale],
    phone: {
      en: 'Contact by phone',
      fa: 'تماس تلفنی',
      ar: 'اتصال هاتفي',
      ru: 'Позвонить'
    }[locale],
    caseStudy: {
      en: 'Case Study',
      fa: 'مطالعه موردی',
      ar: 'دراسة حالة',
      ru: 'Кейс-стади'
    }[locale],
    relatedCaseStudies: {
      en: 'Related Case Studies',
      fa: 'مطالعه موردی مرتبط',
      ar: 'دراسات حالة ذات صلة',
      ru: 'Связанные кейсы'
    }[locale],
    projectPhotography: {
      en: 'project photography',
      fa: 'عکس پروژه',
      ar: 'صورة المشروع',
      ru: 'фотография проекта'
    }[locale]
  };
}

export function CaseStudyPageTemplate({locale, page}: Props) {
  const dir = getDirection(locale);
  const isCaseStudyOnly = page.detailLayout === 'case-study-only';
  const content = page.localeContent[locale];
  const labels = getTemplateLabels(locale);
  const galleryItems = useMemo(
    () => (content.technicalProofGallery.items.length > 0 ? content.technicalProofGallery.items : buildPendingProofItems(content.technicalProofGallery.pendingLabel)),
    [content.technicalProofGallery.items, content.technicalProofGallery.pendingLabel]
  );
  const relatedStudies = useMemo(
    () =>
      content.relatedCaseStudies.items.length > 0
        ? content.relatedCaseStudies.items
        : buildPendingRelatedStudies(content.relatedCaseStudies.pendingLabel),
    [content.relatedCaseStudies.items, content.relatedCaseStudies.pendingLabel]
  );
  const [activeAssetIndex, setActiveAssetIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const closeModalButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const activeAsset = activeAssetIndex !== null ? galleryItems[activeAssetIndex] : null;
  const hasImage = Boolean(activeAsset?.image);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const phoneHref = buildPhoneHref();
  const whatsappHref = buildWhatsappHref();

  const closeGalleryModal = useCallback(() => {
    const closingAsset = activeAssetIndex !== null ? galleryItems[activeAssetIndex] : null;

    if (closingAsset) {
      trackProofEvent('diagram_close', {
        component_id: page.slug,
        diagram_type: closingAsset.assetType ?? 'project_image'
      });
    }

    setActiveAssetIndex(null);
    previousFocusRef.current?.focus();
  }, [activeAssetIndex, galleryItems, page.slug]);

  useEffect(() => {
    if (activeAssetIndex === null) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeGalleryModal();
        return;
      }

      if (event.key === 'ArrowRight') {
        setActiveAssetIndex((current) => {
          if (current === null) {
            return current;
          }

          return (current + 1) % galleryItems.length;
        });
      }

      if (event.key === 'ArrowLeft') {
        setActiveAssetIndex((current) => {
          if (current === null) {
            return current;
          }

          return (current - 1 + galleryItems.length) % galleryItems.length;
        });
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeAssetIndex, closeGalleryModal, galleryItems.length]);

  useEffect(() => {
    if (activeAssetIndex !== null) {
      closeModalButtonRef.current?.focus();
    }
  }, [activeAssetIndex]);

  useEffect(() => {
    setZoom(1);
  }, [activeAssetIndex]);

  useEffect(() => {
    document.body.style.overflow = activeAssetIndex === null ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeAssetIndex]);

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video) {
      return;
    }

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    function apply() {
      if (mql.matches) {
        video?.pause();
      } else {
        video?.play().catch(() => {});
      }
    }

    apply();
    mql.addEventListener('change', apply);
    return () => mql.removeEventListener('change', apply);
  }, []);

  return (
    <article className="case-study-page" data-case-study-page="" dir={dir}>
      <SchemaPlaceholder schema={buildCaseStudyWebPageSchema(locale, page)} />
      <SchemaPlaceholder schema={buildCaseStudyArticleSchema(locale, page)} />
      <SchemaPlaceholder schema={buildCaseStudyServiceSchema(locale, page)} />
      <SchemaPlaceholder schema={buildCaseStudyBreadcrumbSchema(locale, page)} />
      <SchemaPlaceholder schema={buildCaseStudyOrganizationSchema(locale, page)} />

      <section className="case-study-hero" data-section="case_study_hero" aria-labelledby="case-study-title">
        <div className="container-shell case-study-hero__inner">
          <div className="case-study-hero__copy">
            <p className="case-study-eyebrow">{content.hero.eyebrow}</p>
            <h1 id="case-study-title">{page.localeContent[locale].seo.h1}</h1>
            <p className="case-study-hero__summary">{content.hero.shortSummary}</p>
            <dl className="case-study-hero__meta">
              <div>
                <dt>{labels.project}</dt>
                <dd>{content.hero.projectName}</dd>
              </div>
              <div>
                <dt>{labels.location}</dt>
                <dd>{content.hero.location}</dd>
              </div>
              <div>
                <dt>{labels.system}</dt>
                <dd>{content.hero.mainService}</dd>
              </div>
            </dl>
            <span>{content.hero.trustMicrocopy}</span>
            <div className="case-study-hero__actions">
              {/* track: case_study_cta_click */}
              <Link
                href="/contact#rfq-form"
                className="button-primary"
                data-analytics-event="case_study_cta_click"
                data-analytics-owner="application"
                data-analytics-component={`${page.slug}_hero`}
                data-analytics-location="case_study_hero"
                data-analytics-label={content.hero.primaryCta}
                onClick={() => trackCaseStudyEvent('case_study_cta_click', {component_id: `${page.slug}_hero`, cta_text: content.hero.primaryCta})}
              >
                {content.hero.primaryCta}
              </Link>
              {/* track: related_service_click */}
              <Link
                href={content.relatedServices.links[0]?.href ?? '/systems'}
                className="button-secondary"
                data-analytics-event="related_service_click"
                data-analytics-owner="unassigned"
                data-analytics-component={`${page.slug}_hero_related_service`}
                data-analytics-location="case_study_hero"
                data-analytics-label={content.hero.secondaryCta}
              >
                {content.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="case-study-hero__visual">
            {content.hero.heroVideo ? (
              <div className="case-study-hero__video-wrap">
                <video
                  ref={heroVideoRef}
                  className="case-study-hero__video"
                  src={content.hero.heroVideo.src}
                  poster={content.hero.heroVideo.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={content.hero.heroVideo.title}
                  title={content.hero.heroVideo.title}
                />
                <span className="case-study-hero__video-label">
                  {{en: 'Project Video', fa: 'ویدئوی پروژه', ar: 'فيديو المشروع', ru: 'Видео проекта'}[locale]}
                </span>
              </div>
            ) : content.hero.heroImage ? (
              <Image
                src={content.hero.heroImage}
                alt={content.hero.heroAlt}
                fill
                priority
                quality={65}
                sizes="(max-width: 767px) 100vw, 45vw"
              />
            ) : (
              <div className="case-study-placeholder" aria-label={content.projectSnapshot.pendingLabel} role="img">
                <span />
                <span />
                <span />
                <em>{content.projectSnapshot.pendingLabel}</em>
              </div>
            )}
          </div>
        </div>
      </section>

      {isCaseStudyOnly ? (
        <div className="case-study-group-heading" data-section="case_study_group">
          <div className="container-shell">
            <h2 id="case-study-group-title">{labels.caseStudy}</h2>
          </div>
        </div>
      ) : null}

      <section className="case-study-section case-study-section--light" data-section="project_snapshot" aria-labelledby="case-study-snapshot-title">
        <div className="container-shell case-study-section__inner">
          <header className="case-study-section__header">
            <h2 id="case-study-snapshot-title">{content.projectSnapshot.title}</h2>
          </header>
          <div className="case-study-snapshot-grid">
            {content.projectSnapshot.items
              .filter((item) => !isCaseStudyOnly || (!item.pending && !isPendingValue(item.value)))
              .map((item) => (
                <article className={isPendingValue(item.value) || item.pending ? 'case-study-snapshot-card is-pending' : 'case-study-snapshot-card'} key={item.label}>
                  <span>{item.label}</span>
                  <strong>{isPendingValue(item.value) || item.pending ? content.projectSnapshot.pendingLabel : item.value}</strong>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="case-study-section" data-section="challenge_section" aria-labelledby="case-study-challenge-title">
        <div className="container-shell case-study-section__inner">
          <header className="case-study-section__header">
            <h2 id="case-study-challenge-title">{content.challenge.title}</h2>
          </header>
          <div className="case-study-text-block">
            <p>{content.challenge.summary}</p>
            <ul className="case-study-bullets">
              {content.challenge.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <strong>{content.challenge.risk}</strong>
          </div>
        </div>
      </section>

      <section className="case-study-section case-study-section--light" data-section="engineering_decision_section" aria-labelledby="case-study-decision-title">
        <div className="container-shell case-study-section__inner">
          <header className="case-study-section__header">
            <h2 id="case-study-decision-title">{content.engineeringDecision.title}</h2>
          </header>
          <div className="case-study-text-block">
            <p>{content.engineeringDecision.summary}</p>
            <p>{content.engineeringDecision.technicalReasoning}</p>
            <p>{content.engineeringDecision.selectedSystemLogic}</p>
            <p>{content.engineeringDecision.coordinationNote}</p>
          </div>
        </div>
      </section>

      <section className="case-study-section" data-section="execution_detail_section" aria-labelledby="case-study-execution-title">
        <div className="container-shell case-study-section__inner">
          <header className="case-study-section__header">
            <h2 id="case-study-execution-title">{content.executionDetail.title}</h2>
          </header>
          <div className="case-study-execution-grid">
            <article className="case-study-execution-card">
              <h3>{labels.installationSequence}</h3>
              <p>{content.executionDetail.installationSequence}</p>
            </article>
            <article className="case-study-execution-card">
              <h3>{labels.procurementControl}</h3>
              <p>{content.executionDetail.procurementControl}</p>
            </article>
            <article className="case-study-execution-card">
              <h3>{labels.siteCoordination}</h3>
              <p>{content.executionDetail.coordinationWithSiteTeam}</p>
            </article>
            <article className="case-study-execution-card case-study-execution-card--full">
              <h3>{labels.qualityCheckpoints}</h3>
              <ul className="case-study-bullets">
                {content.executionDetail.qualityCheckpoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {!isCaseStudyOnly ? (
        <section className="case-study-section case-study-section--light" data-section="technical_proof_gallery" aria-labelledby="case-study-proof-title">
          <div className="container-shell case-study-section__inner">
            <header className="case-study-section__header">
              <h2 id="case-study-proof-title">{content.technicalProofGallery.title}</h2>
              <p>{content.technicalProofGallery.pendingLabel}</p>
            </header>
            <div className="case-study-gallery" role="list" aria-label={content.technicalProofGallery.title}>
              {galleryItems.map((asset, index) => (
                <button
                  key={asset.title}
                  className={asset.image ? 'case-study-gallery-card' : 'case-study-gallery-card is-pending'}
                  type="button"
                  role="listitem"
                  aria-label={`${content.technicalProofGallery.openLabel}: ${asset.title}`}
                  onClick={() => {
                    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
                    trackProofEvent('technical_proof_open', {
                      component_id: page.slug,
                      diagram_type: asset.assetType ?? 'project_image'
                    });
                    setActiveAssetIndex(index);
                  }}
                >
                  {/* track: technical_proof_open */}
                  <div className="case-study-gallery-card__media">
                    {asset.image ? (
                      <Image src={asset.image} alt={asset.alt ?? asset.title} fill sizes="(max-width: 767px) 82vw, 30vw" />
                    ) : (
                      <div className="case-study-placeholder" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <em>{asset.title}</em>
                      </div>
                    )}
                  </div>
                  <div className="case-study-gallery-card__content">
                    <span>{asset.assetType ?? 'project_image'}</span>
                    <h3>{asset.title}</h3>
                    <p>{asset.description ?? content.technicalProofGallery.pendingLabel}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="case-study-section" data-section="measured_result_section" aria-labelledby="case-study-result-title">
        <div className="container-shell case-study-section__inner">
          <header className="case-study-section__header">
            <h2 id="case-study-result-title">{content.measuredResult.title}</h2>
            {!isCaseStudyOnly ? <p>{content.measuredResult.pendingLabel}</p> : null}
          </header>
          <div className="case-study-result-grid">
            {content.measuredResult.items
              .filter((item) => !isCaseStudyOnly || (item.verificationStatus !== 'pending' && !isPendingValue(item.value)))
              .map((item) => (
                <article className={item.verificationStatus === 'pending' || isPendingValue(item.value) ? 'case-study-result-card is-pending' : 'case-study-result-card'} key={item.label}>
                  <span>{item.label}</span>
                  <strong>{isPendingValue(item.value) ? content.measuredResult.pendingLabel : item.value}</strong>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="case-study-section case-study-section--light" data-section="risk_prevented_section" aria-labelledby="case-study-risk-title">
        <div className="container-shell case-study-section__inner">
          <header className="case-study-section__header">
            <h2 id="case-study-risk-title">{content.riskPrevented.title}</h2>
          </header>
          <div className="case-study-risk-grid">
            {content.riskPrevented.items.map((item) => (
              <article className="case-study-risk-card" key={item.risk}>
                <h3>{item.risk}</h3>
                <p>{item.explanation}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {!isCaseStudyOnly ? (
        <section className="case-study-section" data-section="related_services" aria-labelledby="case-study-services-title">
          <div className="container-shell case-study-section__inner">
            <header className="case-study-section__header">
              <h2 id="case-study-services-title">{content.relatedServices.title}</h2>
            </header>
            <div className="service-card-grid case-study-service-grid">
              {content.relatedServices.links.map((service) => (
                <article className="service-card case-study-service-card" key={service.href}>
                  <h3>{service.title}</h3>
                  {service.description ? <p>{service.description}</p> : null}
                  {/* track: related_service_click */}
                  <Link
                    href={service.href}
                    className="case-study-service-card__link"
                    data-analytics-event="related_service_click"
                    data-analytics-owner="unassigned"
                    data-analytics-component={`${page.slug}_related_service`}
                    data-analytics-location="case_study_related_services"
                    data-analytics-label={service.title}
                  >
                    {labels.viewSystem}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="case-study-section case-study-section--light" data-section="related_case_studies" aria-labelledby="case-study-related-title">
        <div className="container-shell case-study-section__inner">
          <header className="case-study-section__header">
            <h2 id="case-study-related-title">{isCaseStudyOnly ? labels.relatedCaseStudies : content.relatedCaseStudies.title}</h2>
          </header>
          <div className="case-study-related-grid">
            {relatedStudies.map((study, index) => (
              <article className="case-study-related-card" key={`${study.projectName}-${index}`} data-asset-status={study.assetStatus ?? 'pending'}>
                <div className="case-study-related-card__image">
                  {study.image ? (
                    <Image src={study.image} alt={`${study.projectName} ${labels.projectPhotography}`} fill sizes="(max-width: 767px) 82vw, 30vw" />
                  ) : (
                    <div className="case-study-placeholder" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <em>{study.projectName}</em>
                    </div>
                  )}
                </div>
                <h3>{study.projectName}</h3>
                <p>{study.location}</p>
                <dl>
                  <dt>{labels.challenge}</dt>
                  <dd>{study.challenge}</dd>
                  <dt>{labels.engineeringDecision}</dt>
                  <dd>{study.engineeringDecision}</dd>
                  <dt>{labels.result}</dt>
                  <dd>{study.measuredResult}</dd>
                </dl>
                {!isCaseStudyOnly ? (
                  <>
                    {/* track: related_case_study_click */}
                    {study.href ? (
                      <Link href={study.href} className="case-study-related-card__link">
                        {content.relatedCaseStudies.cta}
                      </Link>
                    ) : (
                      <span className="case-study-related-card__pending">{content.relatedCaseStudies.pendingLabel}</span>
                    )}
                  </>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-study-conversion" data-section="conversion_cta" aria-labelledby="case-study-cta-title">
        <div className="container-shell case-study-conversion__inner">
          <div className="case-study-conversion__copy">
            <h2 id="case-study-cta-title">{content.conversionCta.headline}</h2>
            <p>{content.conversionCta.text}</p>
          </div>
            <div className="case-study-conversion__actions">
            {/* track: case_study_cta_click */}
            <Link
              href="/contact#rfq-form"
              className="button-primary"
              data-analytics-event="case_study_cta_click"
              data-analytics-owner="application"
              data-analytics-component={`${page.slug}_conversion_cta`}
              data-analytics-location="case_study_conversion"
              data-analytics-label={content.conversionCta.primaryCta}
              onClick={() => trackCaseStudyEvent('case_study_cta_click', {component_id: `${page.slug}_conversion_cta`, cta_text: content.conversionCta.primaryCta})}
            >
              {content.conversionCta.primaryCta}
            </Link>
            {whatsappHref ? (
              <>
                {/* track: whatsapp_click */}
                <a
                  href={whatsappHref}
                  className="button-secondary"
                  data-analytics-event="whatsapp_click"
                  data-analytics-owner="unassigned"
                  data-analytics-component="case_study_conversion_cta"
                  data-analytics-location="case_study_page"
                  data-analytics-label="whatsapp"
                >
                  {content.conversionCta.secondaryCta}
                </a>
              </>
            ) : (
              <button className="button-secondary" type="button" disabled aria-disabled="true">
                {content.conversionCta.secondaryCta}
              </button>
            )}
            {phoneHref ? (
              <>
                {/* track: phone_click */}
                <a
                  href={phoneHref}
                  className="button-secondary"
                  data-analytics-event="phone_click"
                  data-analytics-owner="unassigned"
                  data-analytics-component="case_study_conversion_cta"
                  data-analytics-location="case_study_page"
                  data-analytics-label="phone"
                >
                  {labels.phone}
                </a>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {activeAsset && !isCaseStudyOnly ? (
        <div className="case-study-gallery-modal" role="dialog" aria-modal="true" aria-label={content.technicalProofGallery.title}>
          <div className="case-study-gallery-modal__backdrop" onClick={closeGalleryModal} aria-hidden="true" />
          <div className="case-study-gallery-modal__panel">
            <div className="case-study-gallery-modal__header">
              <strong>{activeAsset.title}</strong>
              <div className="case-study-gallery-modal__actions">
                <button
                  type="button"
                  onClick={() => {
                    trackProofEvent('diagram_zoom', {
                      component_id: page.slug,
                      diagram_type: activeAsset.assetType ?? 'project_image',
                      interaction_type: 'zoom_in'
                    });
                    setZoom((current) => Math.min(current + 0.25, 2.5));
                  }}
                >
                  {/* track: technical_proof_zoom */}
                  {content.technicalProofGallery.zoomInLabel}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    trackProofEvent('diagram_zoom', {
                      component_id: page.slug,
                      diagram_type: activeAsset.assetType ?? 'project_image',
                      interaction_type: 'zoom_out'
                    });
                    setZoom((current) => Math.max(current - 0.25, 1));
                  }}
                >
                  {/* track: technical_proof_zoom */}
                  {content.technicalProofGallery.zoomOutLabel}
                </button>
                <button ref={closeModalButtonRef} type="button" onClick={closeGalleryModal}>
                  {content.technicalProofGallery.closeLabel}
                </button>
              </div>
            </div>
            <div className="case-study-gallery-modal__body">
              <div className="case-study-gallery-modal__viewport">
                {hasImage && activeAsset.image ? (
                  <div className="case-study-gallery-modal__image" style={{transform: `scale(${zoom})`}}>
                    <Image src={activeAsset.image} alt={activeAsset.alt ?? activeAsset.title} fill sizes="100vw" />
                  </div>
                ) : (
                  <div className="case-study-placeholder case-study-placeholder--modal" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <em>{content.technicalProofGallery.pendingLabel}</em>
                  </div>
                )}
              </div>
              <p>{activeAsset.description ?? content.technicalProofGallery.pendingLabel}</p>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
