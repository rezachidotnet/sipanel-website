'use client';

import './seo-landing.css';
import Image, {type StaticImageData} from 'next/image';
import {Link, getDirection, locales, type Locale} from '@/i18n/routing';
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
  buildServiceSchema as buildSharedServiceSchema
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
    {name: labels.home, item: `/${locale}`},
    {name: labels.solutions, item: `/${locale}/solutions`},
    {name: content.seo.h1, item: page.routes[locale]}
  ]);
}

function buildOrganizationSchema(locale: Locale, page: SeoLandingPageData) {
  return buildSharedOrganizationSchema(locale, `${page.routes[locale]}#organization`);
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

function SeoProofCard({asset, pageSlug}: {asset: SeoProofAsset; pageSlug: string}) {
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
      {asset.description ? <p>{asset.description}</p> : <p>Pending real technical asset.</p>}
      {/* track: technical_proof_open */}
      {/* track: diagram_zoom */}
      <button
        className="seo-proof-card__cta"
        type="button"
        disabled
        aria-disabled="true"
        onClick={() => trackProofEvent('technical_proof_open', {component_id: pageSlug, diagram_type: asset.title})}
      >
        Open technical viewer
      </button>
    </article>
  );
}

function SeoCaseStudyCard({caseStudy}: {caseStudy: SeoCaseStudy}) {
  return (
    <article className="seo-case-card" data-asset-status={caseStudy.assetStatus ?? 'pending'}>
      <div className="seo-case-card__media">
        {caseStudy.image ? (
          <Image src={caseStudy.image} alt={`${caseStudy.projectName} project photography`} fill sizes="(max-width: 767px) 84vw, 30vw" />
        ) : (
          <SeoTechnicalPlaceholder title={caseStudy.projectName} />
        )}
      </div>
      <h3>{caseStudy.projectName}</h3>
      <p>{caseStudy.location}</p>
      <dl>
        {caseStudy.projectType ? (
          <>
            <dt>Project type</dt>
            <dd>{caseStudy.projectType}</dd>
          </>
        ) : null}
        {caseStudy.areaM2 ? (
          <>
            <dt>Area</dt>
            <dd>{caseStudy.areaM2}</dd>
          </>
        ) : null}
        <dt>Challenge</dt>
        <dd>{caseStudy.challenge}</dd>
        <dt>Engineering decision</dt>
        <dd>{caseStudy.engineeringDecision}</dd>
        <dt>Result</dt>
        <dd>{caseStudy.measuredResult}</dd>
      </dl>
      {/* track: related_case_study_click */}
      {caseStudy.href ? (
        <Link href={caseStudy.href} className="seo-case-card__link" onClick={() => trackCaseStudyEvent('related_case_study_click', {case_study_name: caseStudy.projectName})}>
          {caseStudy.projectType ?? 'View project proof'}
        </Link>
      ) : (
        <span className="seo-case-card__pending">Pending verified project proof.</span>
      )}
    </article>
  );
}

function SeoResourceCardView({resource}: {resource: SeoResourceCard}) {
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
          <span className="resource-card__pending">{resource.leadCapture ? 'Lead capture required before download.' : 'Verified resource.'}</span>
        ) : (
          <span className="resource-card__pending">Pending real downloadable resource.</span>
        )}
        {/* track: related_resource_click */}
        {resource.href ? (
          <Link href={resource.href} className="resource-card__cta" onClick={() => trackResourceEvent('related_resource_click', {resource_type: resource.resourceType, component_id: resource.title})}>
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
          location: 'Pending verified project data',
          challenge: 'Pending real project proof.',
          engineeringDecision: 'Pending real project proof.',
          measuredResult: 'Pending real project proof.',
          assetStatus: 'pending'
        }
      ];
  const resources: SeoResourceCard[] = content.relatedResources.resources?.length
    ? content.relatedResources.resources
    : [
        {
          resourceType: 'Resource',
          title: content.relatedResources.pendingLabel,
          shortDescription: 'Pending real downloadable resource.',
          cta: content.relatedResources.cta,
          assetStatus: 'pending'
        }
      ];

  return (
    <article className="seo-page-template" data-seo-slug={page.slug} dir={dir}>
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
              <SeoProofCard key={asset.title} asset={asset} pageSlug={page.slug} />
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
            <div className="seo-inline-links" aria-label="Related systems">
              {content.applicationDetails.relatedServices.map((item) => (
                <Link key={item.href} href={item.href} className="seo-inline-link" onClick={() => trackEvent('related_service_click', {component_id: page.slug, cta_text: item.title})}>
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
              caseStudies.map((caseStudy) => <SeoCaseStudyCard key={caseStudy.projectName} caseStudy={caseStudy} />)
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
              resources.map((resource) => <SeoResourceCardView key={resource.title} resource={resource} />)
            ) : (
              <article className="resource-card" data-asset-status="pending">
                <div className="resource-card__preview" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="resource-card__content">
                  <span className="resource-card__type">Resource</span>
                  <h3>{content.relatedResources.pendingLabel}</h3>
                  <p>Pending real downloadable resource.</p>
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

      <nav className="service-locale-routes seo-locale-routes" aria-label="Localized solution routes">
        {locales.map((itemLocale) => (
          <a key={itemLocale} href={page.routes[itemLocale]} hrefLang={itemLocale}>
            {itemLocale.toUpperCase()}
          </a>
        ))}
      </nav>
    </article>
  );
}
