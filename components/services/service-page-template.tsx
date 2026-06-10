'use client';

import Image, {type StaticImageData} from 'next/image';
import {Link, type Locale, getDirection, locales} from '@/i18n/routing';
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildOrganizationSchema as buildSharedOrganizationSchema,
  buildServiceSchema as buildSharedServiceSchema
} from '@/lib/seo/schema';
import {trackCaseStudyEvent, trackEvent, trackFaqEvent, trackProofEvent, trackRfqEvent} from '@/lib/analytics/events';

type LocalizedRoutes = Record<Locale, string>;

type ServiceStep = {
  title: string;
  description: string;
};

type ServiceTechnicalAsset = {
  title: string;
  description?: string;
  image?: StaticImageData;
  alt?: string;
  assetStatus?: 'available' | 'pending';
};

type ServiceCaseStudy = {
  projectName: string;
  location: string;
  projectType?: string;
  areaM2?: string;
  challenge: string;
  measuredResult: string;
  href?: string;
  image?: StaticImageData;
  assetStatus?: 'available' | 'pending';
};

type ServiceFaq = {
  question: string;
  answer: string;
};

type CaseStudyLabels = {
  challenge: string;
  result: string;
  viewProject: string;
};

export type ServicePageTemplateData = {
  id: string;
  routes: LocalizedRoutes;
  seo: {
    primaryKeyword: string;
    title: string;
    metaDescription: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta?: string;
    visualDirection: string;
    visual?: StaticImageData;
    visualAlt?: string;
    trustMicrocopy?: string;
  };
  problemContext: {
    title: string;
    cards: string[];
  };
  engineeringApproach: {
    title: string;
    steps: ServiceStep[];
  };
  independentRecommendations?: {
    title: string;
    intro: string;
    points: Array<{title: string; description: string}>;
    comparison: {
      traditional: {label: string; items: string[]};
      sipanel: {label: string; items: string[]};
    };
  };
  systemApplications: {
    title: string;
    applications: string[];
  };
  technicalProof: {
    title: string;
    description: string;
    requiredVisuals: string[];
    assets?: ServiceTechnicalAsset[];
  };
  processWorkflow: {
    title: string;
    steps: ServiceStep[];
  };
  qualityCheckpoints: {
    title: string;
    checkpoints: string[];
  };
  relatedCaseStudies: {
    title: string;
    intro?: string;
    cases?: ServiceCaseStudy[];
  };
  faq: {
    title: string;
    items: ServiceFaq[];
  };
  conversionCta: {
    headline: string;
    text: string;
    button: string;
    secondaryButton?: string;
  };
  breadcrumbs?: Array<{
    label: string;
    href: string;
  }>;
  caseStudyLabels?: CaseStudyLabels;
  schemas?: {
    organization?: boolean;
  };
};

type ServicePageTemplateProps = {
  locale: Locale;
  page: ServicePageTemplateData;
};

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function buildServiceSchema(locale: Locale, page: ServicePageTemplateData) {
  return buildSharedServiceSchema(locale, `${page.routes[locale]}#service`, {
    name: page.hero.h1,
    description: page.seo.metaDescription,
    serviceType: page.seo.primaryKeyword,
    url: page.routes[locale]
  });
}

function buildFaqSchema(locale: Locale, page: ServicePageTemplateData) {
  return buildFaqPageSchema(locale, `${page.routes[locale]}#faq`, page.faq.items);
}

function buildBreadcrumbSchema(locale: Locale, page: ServicePageTemplateData) {
  const breadcrumbs = page.breadcrumbs ?? [
    {label: 'Home', href: `/${locale}`},
    {label: 'Systems', href: `/${locale}/systems`},
    {label: page.hero.h1, href: page.routes[locale]}
  ];

  return buildBreadcrumbListSchema(
    locale,
    `${page.routes[locale]}#breadcrumb`,
    breadcrumbs.map((item) => ({name: item.label, item: item.href}))
  );
}

function buildOrganizationSchema(locale: Locale, page: ServicePageTemplateData) {
  return buildSharedOrganizationSchema(locale, `${page.routes[locale]}#organization`);
}

function getCaseStudyLabels(page: ServicePageTemplateData): CaseStudyLabels {
  return page.caseStudyLabels ?? {challenge: 'Challenge', result: 'Result', viewProject: 'View Project'};
}

export function ServicePageTemplate({locale, page}: ServicePageTemplateProps) {
  const dir = getDirection(locale);
  const hasCaseStudies = Boolean(page.relatedCaseStudies.cases?.length);
  const labels = getCaseStudyLabels(page);

  const hasRealTechnicalAssets = page.technicalProof.assets?.some((a) => a.image) ?? false;
  const technicalAssetsWithDescriptions = page.technicalProof.assets?.filter((a) => a.image || a.description) ?? [];
  const showTechnicalProofSection = hasRealTechnicalAssets || technicalAssetsWithDescriptions.length > 0;

  return (
    <article className="service-page-template" data-service-id={page.id} dir={dir}>
      <SchemaPlaceholder schema={buildServiceSchema(locale, page)} />
      <SchemaPlaceholder schema={buildFaqSchema(locale, page)} />
      <SchemaPlaceholder schema={buildBreadcrumbSchema(locale, page)} />
      <SchemaPlaceholder schema={buildOrganizationSchema(locale, page)} />

      <section className="service-hero" data-section="service_hero" aria-labelledby="service-page-title">
        <div className="container-shell service-hero__inner">
          <div className="service-hero__copy">
            <p className="service-eyebrow">{page.hero.eyebrow}</p>
            <h1 id="service-page-title">{page.hero.h1}</h1>
            <p>{page.hero.subheadline}</p>
            {page.hero.trustMicrocopy ? <span>{page.hero.trustMicrocopy}</span> : null}
            <div className="service-hero__actions">
              {/* track: service_primary_cta_click */}
              {/* track: hero_primary_cta_click */}
              <Link href="/contact#rfq-form" className="button-primary" onClick={() => trackRfqEvent('rfq_start', {component_id: page.id})}>
                {page.hero.primaryCta}
              </Link>
              {page.hero.secondaryCta ? (
                <>
                  {/* track: service_secondary_cta_click */}
                  {/* track: hero_secondary_cta_click */}
                  <Link href="#service-related-case-studies" className="button-secondary" onClick={() => trackCaseStudyEvent('case_study_view', {component_id: page.id})}>
                    {page.hero.secondaryCta}
                  </Link>
                </>
              ) : null}
            </div>
          </div>

          <div
            className="service-hero__visual"
            data-asset-status={page.hero.visual ? 'available' : 'pending_real_technical_asset'}
          >
            {page.hero.visual ? (
              <Image
                src={page.hero.visual}
                alt={page.hero.visualAlt ?? page.hero.visualDirection}
                fill
                priority
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 90vw, 45vw"
              />
            ) : (
              <div className="service-technical-placeholder" aria-label={page.hero.visualDirection} role="img">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        className="service-section service-section--light"
        data-section="problem_context"
        aria-labelledby="service-problem-title"
      >
        <div className="container-shell service-section__inner">
          <header>
            <h2 id="service-problem-title">{page.problemContext.title}</h2>
          </header>
          <div className="service-card-grid service-card-grid--problem">
            {page.problemContext.cards.map((problem) => (
              <article className="service-card" key={problem}>
                <p>{problem}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="service-related-case-studies"
        className="service-section"
        data-section="related_case_studies"
        aria-labelledby="service-cases-title"
      >
        <div className="container-shell service-section__inner">
          <header>
            <h2 id="service-cases-title">{page.relatedCaseStudies.title}</h2>
            {page.relatedCaseStudies.intro ? <p>{page.relatedCaseStudies.intro}</p> : null}
          </header>
          {hasCaseStudies ? (
            <div className="service-case-grid" data-asset-status="available">
              {page.relatedCaseStudies.cases?.map((project) => (
                <article className="service-case-card" key={project.projectName}>
                  <div className="service-case-card__media" data-asset-status={project.image ? 'available' : 'pending_project_proof'}>
                    {project.image ? (
                      <Image src={project.image} alt={project.projectName} fill sizes="(max-width: 767px) 84vw, 30vw" />
                    ) : (
                      <div className="service-technical-placeholder" aria-label={project.projectName} role="img">
                        <span />
                        <span />
                        <span />
                      </div>
                    )}
                  </div>
                  <h3>{project.projectName}</h3>
                  <p>{project.location}{project.areaM2 ? ` — ${project.areaM2}` : ''}</p>
                  <dl>
                    <dt>{labels.challenge}</dt>
                    <dd>{project.challenge}</dd>
                    <dt>{labels.result}</dt>
                    <dd>{project.measuredResult}</dd>
                  </dl>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="service-section service-section--light" data-section="sipanel_engineering_approach" aria-labelledby="service-approach-title">
        <div className="container-shell service-section__inner">
          <header>
            <h2 id="service-approach-title">{page.engineeringApproach.title}</h2>
          </header>
          <div className="service-step-grid">
            {page.engineeringApproach.steps.map((step, index) => (
              <article className="service-step" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {page.independentRecommendations ? (
        <section className="service-section service-section--light" data-section="independent_recommendations" aria-labelledby="service-recommendations-title">
          <div className="container-shell service-section__inner">
            <header>
              <h2 id="service-recommendations-title">{page.independentRecommendations.title}</h2>
              <p>{page.independentRecommendations.intro}</p>
            </header>
            <div className="service-recommendations-grid">
              {page.independentRecommendations.points.map((point) => (
                <article className="service-recommendations-card" key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </article>
              ))}
            </div>
            <div className="service-comparison">
              <div className="service-comparison__column service-comparison__column--traditional">
                <h3>{page.independentRecommendations.comparison.traditional.label}</h3>
                <ul>
                  {page.independentRecommendations.comparison.traditional.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="service-comparison__column service-comparison__column--sipanel">
                <h3>{page.independentRecommendations.comparison.sipanel.label}</h3>
                <ul>
                  {page.independentRecommendations.comparison.sipanel.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="service-section service-section--light"
        data-section="system_applications"
        aria-labelledby="service-applications-title"
      >
        <div className="container-shell service-section__inner">
          <header>
            <h2 id="service-applications-title">{page.systemApplications.title}</h2>
          </header>
          <div className="service-swipe-list">
            {page.systemApplications.applications.map((application) => (
              <article className="service-pill-card" key={application}>
                {application}
              </article>
            ))}
          </div>
        </div>
      </section>

      {showTechnicalProofSection ? (
        <section
          className="service-section service-technical-proof"
          data-section="technical_proof"
          aria-labelledby="service-proof-title"
        >
          <div className="container-shell service-section__inner">
            <header>
              <h2 id="service-proof-title">{page.technicalProof.title}</h2>
            </header>
            <div className="service-proof-grid" data-asset-status={hasRealTechnicalAssets ? 'available' : 'engineering_cards'}>
              {technicalAssetsWithDescriptions.map((asset) => (
                <article
                  className="service-proof-card"
                  key={asset.title}
                  onClick={() => trackProofEvent('technical_proof_open', {component_id: page.id, diagram_type: asset.title})}
                >
                  {asset.image ? (
                    <div className="service-proof-card__preview">
                      <Image src={asset.image} alt={asset.alt ?? asset.title} fill sizes="(max-width: 767px) 84vw, 30vw" />
                    </div>
                  ) : null}
                  <h3>{asset.title}</h3>
                  {asset.description ? <p>{asset.description}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.processWorkflow.steps.length > 0 ? (
        <section
          className="service-section service-section--light"
          data-section="process_workflow"
          aria-labelledby="service-process-title"
        >
          <div className="container-shell service-section__inner">
            <header>
              <h2 id="service-process-title">{page.processWorkflow.title}</h2>
            </header>
            <div className="service-process-list">
              {page.processWorkflow.steps.map((step, index) => (
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
      ) : null}

      <section className="service-section" data-section="quality_checkpoints" aria-labelledby="service-quality-title">
        <div className="container-shell service-section__inner">
          <header>
            <h2 id="service-quality-title">{page.qualityCheckpoints.title}</h2>
          </header>
          <ul className="service-checklist">
            {page.qualityCheckpoints.checkpoints.map((checkpoint) => (
              <li key={checkpoint}>{checkpoint}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-section" data-section="faq_section" aria-labelledby="service-faq-title">
        <div className="container-shell service-section__inner">
          <header>
            <h2 id="service-faq-title">{page.faq.title}</h2>
          </header>
          <div className="service-faq-list">
            {page.faq.items.map((item) => (
              <details className="service-faq-item" key={item.question} onToggle={(event) => {
                if (event.currentTarget.open) {
                  trackFaqEvent('faq_expand', {component_id: page.id, component_name: item.question});
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

      <section className="service-conversion-cta" data-section="conversion_cta" aria-labelledby="service-conversion-title">
        <div className="container-shell service-conversion-cta__inner">
          <div>
            <h2 id="service-conversion-title">{page.conversionCta.headline}</h2>
            <p>{page.conversionCta.text}</p>
          </div>
          <div className="service-conversion-cta__actions">
            {/* track: rfq_start */}
            {/* track: roof_review_cta_click */}
            <Link href="/contact#rfq-form" className="button-primary" onClick={() => trackRfqEvent('rfq_start', {component_id: `${page.id}_conversion_cta`})}>
              {page.conversionCta.button}
            </Link>
            {page.conversionCta.secondaryButton ? (
              <Link href="#service-related-case-studies" className="button-secondary" onClick={() => trackEvent('service_page_click', {component_id: `${page.id}_conversion_cta`, cta_text: page.conversionCta.secondaryButton})}>
                {page.conversionCta.secondaryButton}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <nav className="service-locale-routes" aria-label="Localized service routes">
        {locales.map((itemLocale) => (
          <a key={itemLocale} href={page.routes[itemLocale]} hrefLang={itemLocale}>
            {itemLocale.toUpperCase()}
          </a>
        ))}
      </nav>
    </article>
  );
}
