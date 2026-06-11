'use client';

import {useState, type FormEvent} from 'react';
import Image from 'next/image';
import {Link, getDirection, type Locale} from '@/i18n/routing';
import type {ResourceDetailPageData} from '@/lib/resources/engineering-resource-hub';
import {formatResourceDate, getResourceTypeLabel} from '@/lib/resources/engineering-resource-hub';
import {ResourceBreadcrumb} from '@/components/resources/resource-breadcrumb';
import {
  buildArticleSchema,
  buildBreadcrumbListSchema,
  buildOrganizationSchema as buildSharedOrganizationSchema
} from '@/lib/seo/schema';
import {withBaseUrl} from '@/lib/seo/metadata';

type Props = {
  locale: Locale;
  page: ResourceDetailPageData;
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function buildBreadcrumbSchema(locale: Locale, page: ResourceDetailPageData) {
  return buildBreadcrumbListSchema(
    locale,
    `${page.route[locale]}#breadcrumb`,
    page.breadcrumbs.map((item) => ({name: item.label, item: item.href}))
  );
}

function buildDigitalDocumentSchema(locale: Locale, page: ResourceDetailPageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    '@id': withBaseUrl(`${page.route[locale]}#digital-document`),
    name: page.resource.title,
    description: page.resource.description,
    url: withBaseUrl(page.route[locale]),
    inLanguage: locale,
    encodingFormat: 'application/pdf',
    isAccessibleForFree: true,
    provider: {
      '@type': 'Organization',
      name: 'SIPANEL'
    }
  };
}

function ResourcePreviewGraphic({label}: {label: string}) {
  return (
    <div className="resource-detail-preview-graphic" aria-hidden="true">
      <div>
        <span />
        <span />
        <span />
      </div>
      <em>{label}</em>
    </div>
  );
}

function ResourceContextLinks({page}: {page: ResourceDetailPageData}) {
  const system = page.relatedSystems[0];
  const project = page.relatedProjects[0];

  if (!system && !project) {
    return null;
  }

  return (
    <div className="resource-detail-context-links">
      {system ? (
        <p>
          {page.ui.contextualSystemPrefix}{' '}
          <Link href={system.href}>{system.name}</Link>{' '}
          {page.ui.contextualSystemSuffix}
        </p>
      ) : null}
      {project ? (
        <p>
          {page.ui.contextualProjectPrefix}{' '}
          <Link href={project.href}>{project.name}</Link>{' '}
          {page.ui.contextualProjectSuffix}
        </p>
      ) : null}
    </div>
  );
}

function ResourceAuthorityBlock({locale, page}: {locale: Locale; page: ResourceDetailPageData}) {
  const {resource, ui} = page;
  const items = [
    resource.authorName ? {label: ui.preparedByLabel, name: resource.authorName, role: resource.authorRole} : null,
    resource.reviewedBy ? {label: ui.reviewedByLabel, name: resource.reviewedBy, role: resource.reviewedByRole} : null,
    resource.updatedAt ? {label: ui.lastUpdatedLabel, name: formatResourceDate(resource.updatedAt, locale)} : null
  ].filter((item): item is {label: string; name: string; role?: string} => item !== null);

  if (items.length === 0) {
    return null;
  }

  return (
    <dl className="resource-detail-authority">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>
            <span>{item.name}</span>
            {item.role ? <em>{item.role}</em> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ResourceDetailPageTemplate({locale, page}: Props) {
  const dir = getDirection(locale);
  const ui = page.ui;
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState('submitting');
    setFeedback('');

    try {
      /* track: resource_lead_submit */
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          name: formData.get('name'),
          company: formData.get('company'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          project_type: formData.get('project_type'),
          project_stage: formData.get('project_stage'),
          message: formData.get('message'),
          website: formData.get('website'),
          resource_slug: page.resource.slug,
          resource_title: page.resource.title,
          source_page: `/resources/${page.resource.slug}`,
          form_type: 'Resource Download',
          language: locale
        })
      });
      const payload = (await response.json()) as {ok?: boolean; message?: string};

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? 'LEAD_SUBMIT_FAILED');
      }

      setSubmitState('success');
      setFeedback(
        page.resource.assetStatus === 'pending_resource_file'
          ? ui.downloadSuccessPending
          : ui.downloadSuccess
      );
      form.reset();
    } catch {
      setSubmitState('error');
      setFeedback(ui.downloadError);
    }
  }

  return (
    <article className="resource-detail-page" data-resource-detail="" dir={dir}>
      {/* track: resource_detail_view */}
      <SchemaPlaceholder schema={buildArticleSchema(locale, `${page.route[locale]}#article`, {
        headline: page.resource.title,
        description: page.detailContent.seoDescription,
        url: page.route[locale]
      })} />
      <SchemaPlaceholder schema={buildDigitalDocumentSchema(locale, page)} />
      <SchemaPlaceholder schema={buildBreadcrumbSchema(locale, page)} />
      <SchemaPlaceholder schema={buildSharedOrganizationSchema(locale, `${page.route[locale]}#organization`)} />

      <div className="container-shell">
        <ResourceBreadcrumb items={page.breadcrumbs} ariaLabel={ui.breadcrumbAriaLabel} />
      </div>

      <section className="resource-detail-hero" data-section="resource_detail_hero" aria-labelledby="resource-detail-title">
        <div className="container-shell resource-detail-hero__inner">
          <div className="resource-detail-hero__copy">
            <p className="resource-hub-eyebrow">{ui.eyebrow}</p>
            <h1 id="resource-detail-title">{page.resource.title}</h1>
            <p>{page.detailContent.summary}</p>
            <ResourceAuthorityBlock locale={locale} page={page} />
            <div className="resource-detail-hero__actions">
              {/* track: resource_download_start */}
              <a className="button-primary" href="#download-lead-capture-form">
                {page.resource.cta}
              </a>
              {/* track: rfq_start */}
              <Link className="button-secondary" href="/contact#rfq-form">
                {ui.requestConsultation}
              </Link>
            </div>
          </div>
          <div className="resource-detail-hero__visual">
            <ResourcePreviewGraphic label={page.resource.assetStatus === 'pending_resource_file' ? ui.pendingBadge : ui.verifiedBadge} />
          </div>
        </div>
      </section>

      <section className="resource-detail-section resource-detail-section--light" data-section="resource_summary" aria-labelledby="resource-summary-title">
        <div className="container-shell resource-detail-section__inner">
          <header>
            <h2 id="resource-summary-title">{ui.summaryTitle}</h2>
          </header>
          <dl className="resource-detail-summary-grid">
            <div>
              <dt>{ui.summaryType}</dt>
              <dd>{getResourceTypeLabel(page.resource.type, locale)}</dd>
            </div>
            <div>
              <dt>{ui.summaryCategory}</dt>
              <dd>{page.categoryLabel}</dd>
            </div>
            <div>
              <dt>{ui.summaryDifficulty}</dt>
              <dd>{page.resource.difficulty}</dd>
            </div>
            <div>
              <dt>{ui.summaryReadTime}</dt>
              <dd>{page.resource.readTime}</dd>
            </div>
            <div>
              <dt>{ui.summaryFileStatus}</dt>
              <dd>{ui.summaryFileStatusPending}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="resource-detail-section" data-section="resource_introduction" aria-labelledby="resource-introduction-title">
        <div className="container-shell resource-detail-prose">
          <h2 id="resource-introduction-title">{ui.introductionTitle}</h2>
          <p className="resource-detail-authority-note">{ui.authorityNote}</p>
          <p>{page.detailContent.introduction}</p>
          <ResourceContextLinks page={page} />
        </div>
      </section>

      <section className="resource-detail-section resource-detail-section--light" data-section="use_when" aria-labelledby="resource-use-when-title">
        <div className="container-shell resource-detail-section__inner">
          <header>
            <h2 id="resource-use-when-title">{ui.useWhenTitle}</h2>
          </header>
          <div className="resource-detail-list-grid">
            {page.detailContent.useWhen.map((item) => (
              <article className="resource-detail-mini-card" key={item}>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="resource-detail-section" data-section="technical_context" aria-labelledby="resource-context-title">
        <div className="container-shell resource-detail-context">
          <div>
            <h2 id="resource-context-title">{ui.contextTitle}</h2>
            <p>{page.context.description}</p>
          </div>
          <ul>
            {page.context.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="resource-detail-section resource-detail-section--light" data-section="preview_sections" aria-labelledby="resource-preview-title">
        <div className="container-shell resource-detail-section__inner">
          <header>
            <h2 id="resource-preview-title">{ui.keyTechnicalPointsTitle}</h2>
            <p>{ui.previewNote}</p>
          </header>
          <div className="resource-detail-preview-grid">
            {page.detailContent.keyPoints.map((point) => (
              <article className="resource-detail-preview-card" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="resource-detail-section" data-section="common_mistakes" aria-labelledby="resource-mistakes-title">
        <div className="container-shell resource-detail-section__inner">
          <header>
            <h2 id="resource-mistakes-title">{ui.commonMistakesTitle}</h2>
          </header>
          <div className="resource-detail-preview-grid">
            {page.detailContent.commonMistakes.map((mistake) => (
              <article className="resource-detail-preview-card resource-detail-preview-card--warning" key={mistake.title}>
                <h3>{mistake.title}</h3>
                <p>{mistake.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="resource-detail-section"
        id="download-lead-capture-form"
        data-section="download_lead_capture_form"
        aria-labelledby="resource-download-title"
      >
        <div className="container-shell resource-detail-download">
          <div className="resource-detail-download__copy">
            <h2 id="resource-download-title">{ui.downloadTitle}</h2>
            <p>{page.resource.assetStatus === 'pending_resource_file' ? ui.downloadPendingNote : ui.downloadNote}</p>
            <span>{ui.downloadRequested}: {page.resource.title}</span>
          </div>

          <form className="resource-detail-form" onSubmit={handleSubmit}>
            <input className="rfq-form__honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label>
              <span>{ui.fieldName}</span>
              <input name="name" required minLength={2} autoComplete="name" />
            </label>
            <label>
              <span>{ui.fieldPhone}</span>
              <input name="phone" required type="tel" autoComplete="tel" dir="ltr" />
            </label>
            <label>
              <span>{ui.fieldCompany}</span>
              <input name="company" autoComplete="organization" />
            </label>
            <label>
              <span>{ui.fieldProjectType}</span>
              <input name="project_type" defaultValue={page.categoryLabel} />
            </label>
            <label className="resource-detail-form__full">
              <span>{ui.fieldMessage}</span>
              <textarea name="message" rows={3} />
            </label>

            <div className="resource-detail-form__actions">
              <p className={submitState === 'error' ? 'resource-detail-form__error' : 'resource-detail-form__feedback'} aria-live="polite">
                {feedback}
              </p>
              <button className="resource-card__cta" type="submit" disabled={submitState === 'submitting' || submitState === 'success'}>
                {submitState === 'submitting' ? ui.downloadSending : ui.downloadSubmit}
              </button>
              <p className="resource-detail-form__privacy">{ui.privacyNote}</p>
            </div>
          </form>
        </div>
      </section>

      <section className="resource-detail-section" data-section="related_resources" aria-labelledby="resource-related-resources-title">
        <div className="container-shell resource-detail-section__inner">
          <header>
            <h2 id="resource-related-resources-title">{ui.relatedResourcesTitle}</h2>
          </header>
          <div className="resource-detail-link-grid">
            {page.relatedResources.map((resource) => (
              <Link className="resource-related-card resource-related-card--resource" href={`/resources/${resource.slug}`} key={resource.slug}>
                {/* track: related_resource_click */}
                <span>{resource.title}</span>
                <em>{resource.assetStatus === 'pending_resource_file' ? ui.pendingBadge : ui.verifiedBadge}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {page.relatedSystems.length > 0 && (
        <section className="resource-detail-section resource-detail-section--light" data-section="related_systems" aria-labelledby="resource-related-systems-title">
          <div className="container-shell resource-detail-section__inner">
            <header>
              <h2 id="resource-related-systems-title">{ui.relatedSystemsTitle}</h2>
            </header>
            <div className="resource-detail-system-grid">
              {page.relatedSystems.map((system) => (
                <Link className="resource-system-card" href={system.href} key={system.key}>
                  <div className="resource-system-card__image">
                    <Image src={system.image} alt={system.name} fill sizes="(max-width: 768px) 100vw, 400px" />
                  </div>
                  <div className="resource-system-card__body">
                    <span className="resource-system-card__name">{system.name}</span>
                    <p>{system.description}</p>
                    <span className="resource-system-card__cta">{ui.exploreSystemLabel}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.relatedProjects.length > 0 && (
        <section className="resource-detail-section" data-section="related_projects" aria-labelledby="resource-related-projects-title">
          <div className="container-shell resource-detail-section__inner">
            <header>
              <h2 id="resource-related-projects-title">{ui.relatedProjectsTitle}</h2>
              <p>{ui.relatedProjectsProofIntro}</p>
            </header>
            <div className="resource-detail-project-grid">
              {page.relatedProjects.map((project) => (
                <Link className="resource-project-card" href={project.href} key={project.slug}>
                  {project.image ? (
                    <div className="resource-project-card__image">
                      <Image src={project.image} alt={project.name} fill sizes="(max-width: 768px) 100vw, 400px" />
                    </div>
                  ) : null}
                  <div className="resource-project-card__body">
                    <span className="resource-project-card__name">{project.name}</span>
                    {project.reason ? <p>{project.reason}</p> : null}
                    <div className="resource-project-card__meta">
                      {project.area ? <em>{project.area}</em> : null}
                      <em>{project.location}</em>
                    </div>
                    <span className="resource-project-card__cta">{ui.viewProjectLabel}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="resource-detail-section resource-detail-section--dark" data-section="conversion_cta" aria-labelledby="resource-detail-cta-title">
        <div className="container-shell resource-detail-conversion">
          <div>
            <h2 id="resource-detail-cta-title">{ui.detailConsultationTitle}</h2>
            <p>{ui.detailConsultationDescription}</p>
          </div>
          <div className="resource-detail-conversion__actions">
            {/* track: rfq_start */}
            <Link href="/contact#rfq-form" className="button-primary">
              {ui.detailConsultationButton}
            </Link>
            <Link href="/resources" className="button-secondary">
              {ui.detailCatalogButton}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
