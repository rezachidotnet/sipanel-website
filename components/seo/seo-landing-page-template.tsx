'use client';

import '@/components/services/service-seo.css';
import './seo-landing.css';
import '@/components/resources/resources.css';
import Image, {type StaticImageData} from 'next/image';
import {Link, getDirection, getLocalizedPath, locales, type Locale} from '@/i18n/routing';
import {
  getSeoBreadcrumbLabels,
  type SeoLandingPageData,
  type SeoLandingPageLocaleContent,
  type SeoCaseStudy,
  type SeoResourceCard,
  type SeoProofAsset
} from '@/lib/seo/seo-landing-pages';
import {
  buildArticleSchema as buildSharedArticleSchema,
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildOrganizationSchema as buildSharedOrganizationSchema,
  buildServiceSchema as buildSharedServiceSchema,
  buildWebPageSchema
} from '@/lib/seo/schema';
import {trackCaseStudyEvent, trackEvent, trackFaqEvent, trackProofEvent, trackResourceEvent, trackRfqEvent} from '@/lib/analytics/events';

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function buildServiceSchema(locale: Locale, page: SeoLandingPageData, content: SeoLandingPageLocaleContent) {
  return buildSharedServiceSchema(locale, `${page.routes[locale]}#service`, {
    name: content.seo.h1,
    description: content.seo.metaDescription,
    serviceType: content.seo.primaryKeyword,
    url: page.routes[locale]
  });
}

function buildArticleSchema(locale: Locale, page: SeoLandingPageData, content: SeoLandingPageLocaleContent) {
  return buildSharedArticleSchema(locale, `${page.routes[locale]}#article`, {
    headline: content.seo.h1,
    description: content.seo.metaDescription,
    url: page.routes[locale]
  });
}

function buildFaqSchema(locale: Locale, page: SeoLandingPageData, content: SeoLandingPageLocaleContent) {
  return buildFaqPageSchema(locale, `${page.routes[locale]}#faq`, content.faq.items);
}

function buildBreadcrumbSchema(locale: Locale, page: SeoLandingPageData, content: SeoLandingPageLocaleContent) {
  const labels = getSeoBreadcrumbLabels(locale);
  return buildBreadcrumbListSchema(locale, `${page.routes[locale]}#breadcrumb`, [
    {name: labels.home, item: getLocalizedPath(locale)},
    {name: labels.solutions, item: getLocalizedPath(locale, '/solutions')},
    {name: content.seo.h1, item: page.routes[locale]}
  ]);
}

function buildOrganizationSchema(locale: Locale, _page: SeoLandingPageData) {
  return buildSharedOrganizationSchema(locale);
}

function SeoTechnicalPlaceholder({title}: {title: string}) {
  return (
    <div className="service-technical-placeholder seo-technical-placeholder" aria-label={title} role="img">
      <span />
      <span />
      <span />
      <em>{title}</em>
    </div>
  );
}

const seoTemplateLabels = {
  fa: {
    pendingTechnicalAsset: 'دارایی فنی واقعی در انتظار است.',
    openTechnicalViewer: 'باز کردن نمایشگر فنی',
    projectPhotography: 'عکس پروژه',
    projectType: 'نوع پروژه',
    area: 'مساحت',
    challenge: 'چالش',
    engineeringDecision: 'تصمیم مهندسی',
    result: 'نتیجه',
    viewProjectProof: 'مشاهده شواهد پروژه',
    pendingProjectLocation: 'داده پروژه تاییدشده در انتظار است',
    pendingProjectProof: 'شواهد پروژه واقعی در انتظار است.',
    resource: 'منبع',
    leadCapture: 'پیش از دانلود، ثبت درخواست لازم است.',
    verifiedResource: 'منبع تاییدشده.',
    pendingDownload: 'منبع دانلود واقعی در انتظار است.',
    relatedSystems: 'سیستم‌های مرتبط',
    localizedRoutes: 'مسیرهای محلی‌سازی‌شده راهکار'
  },
  en: {
    pendingTechnicalAsset: 'Pending real technical asset.',
    openTechnicalViewer: 'Open technical viewer',
    projectPhotography: 'project photography',
    projectType: 'Project type',
    area: 'Area',
    challenge: 'Challenge',
    engineeringDecision: 'Engineering decision',
    result: 'Result',
    viewProjectProof: 'View project proof',
    pendingProjectLocation: 'Pending verified project data',
    pendingProjectProof: 'Pending real project proof.',
    resource: 'Resource',
    leadCapture: 'Lead capture required before download.',
    verifiedResource: 'Verified resource.',
    pendingDownload: 'Pending real downloadable resource.',
    relatedSystems: 'Related systems',
    localizedRoutes: 'Localized solution routes'
  },
  ar: {
    pendingTechnicalAsset: 'الأصل الفني الحقيقي قيد الإعداد.',
    openTechnicalViewer: 'فتح العارض الفني',
    projectPhotography: 'صورة المشروع',
    projectType: 'نوع المشروع',
    area: 'المساحة',
    challenge: 'التحدي',
    engineeringDecision: 'القرار الهندسي',
    result: 'النتيجة',
    viewProjectProof: 'عرض إثبات المشروع',
    pendingProjectLocation: 'بيانات المشروع الموثقة قيد الإعداد',
    pendingProjectProof: 'إثبات المشروع الحقيقي قيد الإعداد.',
    resource: 'مورد',
    leadCapture: 'يتطلب التسجيل قبل التنزيل.',
    verifiedResource: 'مورد موثق.',
    pendingDownload: 'المورد القابل للتنزيل قيد الإعداد.',
    relatedSystems: 'أنظمة مرتبطة',
    localizedRoutes: 'مسارات الحل المحلية'
  },
  ru: {
    pendingTechnicalAsset: 'Реальный технический материал ожидается.',
    openTechnicalViewer: 'Открыть технический просмотр',
    projectPhotography: 'фотография проекта',
    projectType: 'Тип проекта',
    area: 'Площадь',
    challenge: 'Задача',
    engineeringDecision: 'Инженерное решение',
    result: 'Результат',
    viewProjectProof: 'Смотреть проектное подтверждение',
    pendingProjectLocation: 'Проверенные данные проекта ожидаются',
    pendingProjectProof: 'Реальное проектное подтверждение ожидается.',
    resource: 'Ресурс',
    leadCapture: 'Перед загрузкой требуется заявка.',
    verifiedResource: 'Проверенный ресурс.',
    pendingDownload: 'Реальный загружаемый ресурс ожидается.',
    relatedSystems: 'Связанные системы',
    localizedRoutes: 'Локализованные маршруты решения'
  }
} satisfies Record<Locale, Record<string, string>>;

function SeoProofCard({asset, pageSlug, labels}: {asset: SeoProofAsset; pageSlug: string; labels: typeof seoTemplateLabels[Locale]}) {
  return (
    <article className="seo-proof-card" data-asset-status={asset.assetStatus ?? 'pending'}>
      <div className="seo-proof-card__preview">
        {asset.image ? (
          <Image src={asset.image} alt={asset.alt ?? asset.title} fill sizes="(max-width: 767px) 84vw, 30vw" />
        ) : (
          <SeoTechnicalPlaceholder title={asset.title} />
        )}
      </div>
      <h3>{asset.title}</h3>
      {asset.description ? <p>{asset.description}</p> : <p>{labels.pendingTechnicalAsset}</p>}
      {/* track: technical_proof_open */}
      {/* track: diagram_zoom */}
      <button
        className="seo-proof-card__cta"
        type="button"
        disabled
        aria-disabled="true"
        onClick={() => trackProofEvent('technical_proof_open', {component_id: pageSlug, diagram_type: asset.title})}
      >
        {labels.openTechnicalViewer}
      </button>
    </article>
  );
}

function SeoCaseStudyCard({caseStudy, labels}: {caseStudy: SeoCaseStudy; labels: typeof seoTemplateLabels[Locale]}) {
  return (
    <article className="seo-case-card" data-asset-status={caseStudy.assetStatus ?? 'pending'}>
      <div className="seo-case-card__media">
        {caseStudy.image ? (
          <Image src={caseStudy.image} alt={`${caseStudy.projectName} ${labels.projectPhotography}`} fill sizes="(max-width: 767px) 84vw, 30vw" />
        ) : (
          <SeoTechnicalPlaceholder title={caseStudy.projectName} />
        )}
      </div>
      <h3>{caseStudy.projectName}</h3>
      <p>{caseStudy.location}</p>
      <dl>
        {caseStudy.projectType ? (
          <>
            <dt>{labels.projectType}</dt>
            <dd>{caseStudy.projectType}</dd>
          </>
        ) : null}
        {caseStudy.areaM2 ? (
          <>
            <dt>{labels.area}</dt>
            <dd>{caseStudy.areaM2}</dd>
          </>
        ) : null}
        <dt>{labels.challenge}</dt>
        <dd>{caseStudy.challenge}</dd>
        <dt>{labels.engineeringDecision}</dt>
        <dd>{caseStudy.engineeringDecision}</dd>
        <dt>{labels.result}</dt>
        <dd>{caseStudy.measuredResult}</dd>
      </dl>
      {/* track: related_case_study_click */}
      {caseStudy.href ? (
        <Link
          href={caseStudy.href}
          className="seo-case-card__link"
          data-analytics-event="related_case_study_click"
          data-analytics-owner="application"
          data-analytics-component="seo_related_case_study"
          data-analytics-location="seo_related_case_studies"
          data-analytics-label={caseStudy.projectName}
          onClick={() => trackCaseStudyEvent('related_case_study_click', {case_study_name: caseStudy.projectName})}
        >
          {caseStudy.projectType ?? labels.viewProjectProof}
        </Link>
      ) : (
        <span className="seo-case-card__pending">{labels.pendingProjectProof}</span>
      )}
    </article>
  );
}

function SeoResourceCardView({resource, labels}: {resource: SeoResourceCard; labels: typeof seoTemplateLabels[Locale]}) {
  return (
    <article className="resource-card seo-resource-card" data-resource-id={resource.title} data-asset-status={resource.assetStatus ?? 'pending'}>
      <div className="resource-card__preview" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="resource-card__content">
        <span className="resource-card__type">{resource.resourceType}</span>
        <h3>{resource.title}</h3>
        <p>{resource.shortDescription}</p>
        {resource.assetStatus === 'available' ? (
          <span className="resource-card__pending">{resource.leadCapture ? labels.leadCapture : labels.verifiedResource}</span>
        ) : (
          <span className="resource-card__pending">{labels.pendingDownload}</span>
        )}
        {/* track: related_resource_click */}
        {resource.href ? (
          <Link
            href={resource.href}
            className="resource-card__cta"
            data-analytics-event="related_resource_click"
            data-analytics-owner="application"
            data-analytics-component="seo_related_resource"
            data-analytics-location="seo_related_resources"
            data-analytics-label={resource.title}
            onClick={() => trackResourceEvent('related_resource_click', {resource_type: resource.resourceType, component_id: resource.title})}
          >
            {resource.cta}
          </Link>
        ) : (
          <button className="resource-card__cta" type="button" disabled aria-disabled="true">
            {resource.cta}
          </button>
        )}
      </div>
    </article>
  );
}

type SeoLandingPageTemplateProps = {
  locale: Locale;
  page: SeoLandingPageData;
};

export function SeoLandingPageTemplate({locale, page}: SeoLandingPageTemplateProps) {
  const dir = getDirection(locale);
  const labels = seoTemplateLabels[locale];
  const content = page.localeContent[locale];
  const hasTechnicalAssets = Boolean(content.technicalProof.assets?.length);
  const hasCaseStudies = Boolean(content.relatedCaseStudies.cases?.length);
  const hasResources = Boolean(content.relatedResources.resources?.length);
  const technicalAssets: SeoProofAsset[] = content.technicalProof.assets?.length
    ? content.technicalProof.assets
    : content.technicalProof.pendingLabel
      ? [{title: content.technicalProof.pendingLabel, assetStatus: 'pending'}]
      : [];
  const caseStudies: SeoCaseStudy[] = content.relatedCaseStudies.cases?.length
    ? content.relatedCaseStudies.cases
    : [
        {
          projectName: content.relatedCaseStudies.pendingLabel,
          location: labels.pendingProjectLocation,
          challenge: labels.pendingProjectProof,
          engineeringDecision: labels.pendingProjectProof,
          measuredResult: labels.pendingProjectProof,
          assetStatus: 'pending'
        }
      ];
  const resources: SeoResourceCard[] = content.relatedResources.resources?.length
    ? content.relatedResources.resources
    : [
        {
          resourceType: labels.resource,
          title: content.relatedResources.pendingLabel,
          shortDescription: labels.pendingDownload,
          cta: content.relatedResources.cta,
          assetStatus: 'pending'
        }
      ];

  return (
    <article className="seo-page-template" data-seo-slug={page.slug} dir={dir}>
      <SchemaPlaceholder schema={buildWebPageSchema(locale, {name: content.seo.h1, description: content.seo.metaDescription, url: page.routes[locale]})} />
      {content.schemas?.service !== false ? <SchemaPlaceholder schema={buildServiceSchema(locale, page, content)} /> : null}
      {content.schemas?.article ? <SchemaPlaceholder schema={buildArticleSchema(locale, page, content)} /> : null}
      {content.schemas?.faq !== false ? <SchemaPlaceholder schema={buildFaqSchema(locale, page, content)} /> : null}
      {content.schemas?.breadcrumb !== false ? <SchemaPlaceholder schema={buildBreadcrumbSchema(locale, page, content)} /> : null}
      <SchemaPlaceholder schema={buildOrganizationSchema(locale, page)} />

      <section className="seo-hero" data-section="seo_hero" aria-labelledby="seo-page-title">
        <div className="container-shell seo-hero__inner">
          <div className="seo-hero__copy">
            <p className="service-eyebrow">{content.hero.eyebrow}</p>
            <h1 id="seo-page-title">{content.hero.h1}</h1>
            <p>{content.hero.shortIntro}</p>
            <span>{content.hero.trustMicrocopy}</span>
            <div className="seo-hero__actions">
              {/* track: seo_primary_cta_click */}
              <Link href="/contact#rfq-form" className="button-primary" onClick={() => trackRfqEvent('rfq_start', {component_id: page.slug})}>
                {content.hero.primaryCta}
              </Link>
              {/* track: seo_secondary_cta_click */}
              {/* track: phone_click */}
              {/* track: whatsapp_click */}
              <Link href="/contact#rfq-form" className="button-secondary" onClick={() => trackRfqEvent('rfq_start', {component_id: page.slug})}>
                {content.hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="seo-hero__visual" data-asset-status={content.hero.heroVisual ? 'available' : 'pending'}>
            {content.hero.heroVisual ? (
              <Image
                src={content.hero.heroVisual}
                alt={content.hero.heroVisualAlt}
                fill
                priority
                quality={65}
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 90vw, 40vw"
              />
            ) : (
              <SeoTechnicalPlaceholder title={content.hero.heroVisualDirection} />
            )}
          </div>
        </div>
      </section>

      <section className="service-section service-section--light" data-section="search_intent_problem" aria-labelledby="seo-problem-title">
        <div className="container-shell service-section__inner">
          <header>
            <h2 id="seo-problem-title">{content.searchIntentProblem.title}</h2>
          </header>
          <div className="service-card-grid service-card-grid--problem">
            {content.searchIntentProblem.cards.map((card) => (
              <article className="service-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-section" data-section="technical_context" aria-labelledby="seo-context-title">
        <div className="container-shell seo-section__inner">
          <header>
            <h2 id="seo-context-title">{content.technicalContext.title}</h2>
            <p>{content.technicalContext.intro}</p>
          </header>
          <div className="seo-context-grid">
            {content.technicalContext.points.map((point) => (
              <article className="seo-context-card" key={point}>
                {point}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section service-section--light" data-section="sipanel_solution" aria-labelledby="seo-solution-title">
        <div className="container-shell service-section__inner">
          <header>
            <h2 id="seo-solution-title">{content.sipanelSolution.title}</h2>
          </header>
          <div className="service-step-grid">
            {content.sipanelSolution.pillars.map((pillar, index) => (
              <article className="service-step" key={pillar.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-section" data-section="engineering_workflow" aria-labelledby="seo-workflow-title">
        <div className="container-shell seo-section__inner">
          <header>
            <h2 id="seo-workflow-title">{content.engineeringWorkflow.title}</h2>
          </header>
          <div className="service-process-list">
            {content.engineeringWorkflow.steps.map((step, index) => (
              <article className="service-process-item" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section service-section--light" data-section="technical_proof" aria-labelledby="seo-proof-title">
        <div className="container-shell service-section__inner">
          <header>
            <h2 id="seo-proof-title">{content.technicalProof.title}</h2>
            <p>{content.technicalProof.description}</p>
          </header>
          <div className="service-proof-grid" data-asset-status={hasTechnicalAssets ? 'available' : 'pending'}>
            {technicalAssets.map((asset) => (
              <SeoProofCard key={asset.title} asset={asset} pageSlug={page.slug} labels={labels} />
            ))}
          </div>
        </div>
      </section>

      <section className="seo-section" data-section="application_details" aria-labelledby="seo-applications-title">
        <div className="container-shell seo-section__inner">
          <header>
            <h2 id="seo-applications-title">{content.applicationDetails.title}</h2>
          </header>
          <div className="service-card-grid">
            {content.applicationDetails.items.map((item) => (
              <article className="service-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          {content.applicationDetails.relatedServices?.length ? (
            <div className="seo-inline-links" aria-label={labels.relatedSystems}>
              {content.applicationDetails.relatedServices.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="seo-inline-link"
                  data-analytics-event="related_service_click"
                  data-analytics-owner="application"
                  data-analytics-component="seo_related_service"
                  data-analytics-location="seo_related_services"
                  data-analytics-label={item.title}
                  onClick={() => trackEvent('related_service_click', {component_id: page.slug, cta_text: item.title})}
                >
                  {/* track: related_service_click */}
                  {item.title}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="seo-section seo-section--light" data-section="quality_checkpoints" aria-labelledby="seo-checkpoints-title">
        <div className="container-shell seo-section__inner">
          <header>
            <h2 id="seo-checkpoints-title">{content.qualityCheckpoints.title}</h2>
          </header>
          <ul className="service-checklist">
            {content.qualityCheckpoints.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="seo-section" data-section="related_case_studies" aria-labelledby="seo-cases-title">
        <div className="container-shell seo-section__inner">
          <header>
            <h2 id="seo-cases-title">{content.relatedCaseStudies.title}</h2>
          </header>
          <div className="service-case-grid" data-asset-status={hasCaseStudies ? 'available' : 'pending'}>
            {hasCaseStudies ? (
              caseStudies.map((caseStudy) => <SeoCaseStudyCard key={caseStudy.projectName} caseStudy={caseStudy} labels={labels} />)
            ) : (
              <article className="service-card service-card--pending">
                <p data-asset-status="pending">{content.relatedCaseStudies.pendingLabel}</p>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="seo-section seo-section--light" data-section="related_resources" aria-labelledby="seo-resources-title">
        <div className="container-shell seo-section__inner">
          <header>
            <h2 id="seo-resources-title">{content.relatedResources.title}</h2>
          </header>
          <div className="resource-cards" data-asset-status={hasResources ? 'available' : 'pending'}>
            {hasResources ? (
              resources.map((resource) => <SeoResourceCardView key={resource.title} resource={resource} labels={labels} />)
            ) : (
              <article className="resource-card" data-asset-status="pending">
                <div className="resource-card__preview" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="resource-card__content">
                  <span className="resource-card__type">{labels.resource}</span>
                  <h3>{content.relatedResources.pendingLabel}</h3>
                  <p>{labels.pendingDownload}</p>
                  <span className="resource-card__pending">{content.relatedResources.pendingLabel}</span>
                  <button className="resource-card__cta" type="button" disabled aria-disabled="true">
                    {content.relatedResources.cta}
                  </button>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="seo-section" data-section="faq_section" aria-labelledby="seo-faq-title">
        <div className="container-shell seo-section__inner">
          <header>
            <h2 id="seo-faq-title">{content.faq.title}</h2>
          </header>
          <div className="service-faq-list">
            {content.faq.items.map((item) => (
              <details className="service-faq-item" key={item.question} onToggle={(event) => {
                if (event.currentTarget.open) {
                  trackFaqEvent('faq_expand', {component_id: page.slug, component_name: item.question});
                }
              }}>
                {/* track: faq_expand */}
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="service-conversion-cta" data-section="conversion_cta" aria-labelledby="seo-conversion-title">
        <div className="container-shell service-conversion-cta__inner">
          <div>
            <h2 id="seo-conversion-title">{content.conversionCta.headline}</h2>
            <p>{content.conversionCta.text}</p>
          </div>
          <div className="service-conversion-cta__actions">
            {/* track: rfq_start */}
            {/* track: seo_primary_cta_click */}
            <Link href="/contact#rfq-form" className="button-primary" onClick={() => trackRfqEvent('rfq_start', {component_id: `${page.slug}_conversion_cta`})}>
              {content.conversionCta.primaryCta}
            </Link>
            {/* track: seo_secondary_cta_click */}
            {/* track: whatsapp_click */}
            {/* track: phone_click */}
            <Link href="/contact#rfq-form" className="button-secondary" onClick={() => trackRfqEvent('rfq_start', {component_id: `${page.slug}_conversion_cta`})}>
              {content.conversionCta.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <nav className="service-locale-routes seo-locale-routes" aria-label={labels.localizedRoutes}>
        {locales.map((itemLocale) => (
          <a key={itemLocale} href={page.routes[itemLocale]} hrefLang={itemLocale}>
            {itemLocale.toUpperCase()}
          </a>
        ))}
      </nav>
    </article>
  );
}
