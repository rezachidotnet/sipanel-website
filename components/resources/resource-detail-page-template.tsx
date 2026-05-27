'use client';

import {useState, type FormEvent} from 'react';
import {Link, getDirection, type Locale} from '@/i18n/routing';
import type {ResourceDetailPageData} from '@/lib/resources/engineering-resource-hub';
import {getResourceTypeLabel} from '@/lib/resources/engineering-resource-hub';
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
    encodingFormat: page.resource.assetStatus === 'pending_resource_file' ? 'pending verified file' : 'application/pdf',
    isAccessibleForFree: false,
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

export function ResourceDetailPageTemplate({locale, page}: Props) {
  const dir = getDirection(locale);
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
          resource_title: page.resource.title
        })
      });
      const payload = (await response.json()) as {ok?: boolean; message?: string};

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? 'LEAD_SUBMIT_FAILED');
      }

      setSubmitState('success');
      setFeedback(
        page.resource.assetStatus === 'pending_resource_file'
          ? 'Your request was sent. The verified file is pending, so SIPANEL will follow up with the resource status.'
          : 'Your request was sent. File access can be released after lead review.'
      );
      form.reset();
    } catch {
      setSubmitState('error');
      setFeedback('The request could not be sent. Please review the fields or use the consultation form.');
    }
  }

  return (
    <article className="resource-detail-page" data-resource-detail="" dir={dir}>
      {/* track: resource_detail_view */}
      <SchemaPlaceholder schema={buildArticleSchema(locale, `${page.route[locale]}#article`, {
        headline: page.resource.title,
        description: page.resource.description,
        url: page.route[locale]
      })} />
      <SchemaPlaceholder schema={buildDigitalDocumentSchema(locale, page)} />
      <SchemaPlaceholder schema={buildBreadcrumbSchema(locale, page)} />
      <SchemaPlaceholder schema={buildSharedOrganizationSchema(locale, `${page.route[locale]}#organization`)} />

      <section className="resource-detail-hero" data-section="resource_detail_hero" aria-labelledby="resource-detail-title">
        <div className="container-shell resource-detail-hero__inner">
          <div className="resource-detail-hero__copy">
            <p className="resource-hub-eyebrow">SIPANEL Engineering Resource</p>
            <h1 id="resource-detail-title">{page.resource.title}</h1>
            <p>{page.resource.description}</p>
            <div className="resource-detail-hero__actions">
              {/* track: resource_download_start */}
              <a className="button-primary" href="#download-lead-capture-form">
                {page.resource.cta}
              </a>
              {/* track: rfq_start */}
              <Link className="button-secondary" href="/contact#rfq-form">
                Request Technical Consultation
              </Link>
            </div>
          </div>
          <div className="resource-detail-hero__visual">
            <ResourcePreviewGraphic label={page.resource.assetStatus === 'pending_resource_file' ? 'Pending verified resource file' : 'Verified resource file'} />
          </div>
        </div>
      </section>

      <section className="resource-detail-section resource-detail-section--light" data-section="resource_summary" aria-labelledby="resource-summary-title">
        <div className="container-shell resource-detail-section__inner">
          <header>
            <h2 id="resource-summary-title">Resource Summary</h2>
          </header>
          <dl className="resource-detail-summary-grid">
            <div>
              <dt>Resource type</dt>
              <dd>{getResourceTypeLabel(page.resource.type)}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{page.categoryLabel}</dd>
            </div>
            <div>
              <dt>Difficulty</dt>
              <dd>{page.resource.difficulty}</dd>
            </div>
            <div>
              <dt>Read time</dt>
              <dd>{page.resource.readTime}</dd>
            </div>
            <div>
              <dt>File status</dt>
              <dd>Pending verified downloadable file</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="resource-detail-section" data-section="technical_context" aria-labelledby="resource-context-title">
        <div className="container-shell resource-detail-context">
          <div>
            <h2 id="resource-context-title">{page.context.title}</h2>
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
            <h2 id="resource-preview-title">Preview Sections</h2>
            <p>Structured preview only. No downloadable file is shown until a real resource file is available.</p>
          </header>
          <div className="resource-detail-preview-grid">
            {page.previewSections.map((section) => (
              <article className="resource-detail-preview-card" key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
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
            <h2 id="resource-download-title">Request Resource Access</h2>
            <p>Submit contact details before file access. This resource currently has a structured pending state because no verified PDF is attached.</p>
            <span>Requested resource: {page.resource.title}</span>
          </div>

          <form className="resource-detail-form" onSubmit={handleSubmit}>
            <input className="rfq-form__honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label>
              <span>Name</span>
              <input name="name" required minLength={2} />
            </label>
            <label>
              <span>Company</span>
              <input name="company" />
            </label>
            <label>
              <span>Phone</span>
              <input name="phone" required type="tel" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" />
            </label>
            <label>
              <span>Project type</span>
              <input name="project_type" defaultValue={page.categoryLabel} />
            </label>
            <label>
              <span>Project stage</span>
              <input name="project_stage" />
            </label>
            <label className="resource-detail-form__full">
              <span>Message</span>
              <textarea name="message" rows={4} defaultValue={`Please send availability status for ${page.resource.title}.`} />
            </label>

            <div className="resource-detail-form__actions">
              <p className={submitState === 'error' ? 'resource-detail-form__error' : 'resource-detail-form__feedback'} aria-live="polite">
                {feedback || 'The form creates a lead before resource access.'}
              </p>
              {/* track: resource_download_complete */}
              <button className="resource-card__cta" type="submit" disabled={submitState === 'submitting' || submitState === 'success'}>
                {submitState === 'submitting' ? 'Sending request...' : page.leadCapture.cta}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="resource-detail-section resource-detail-section--light" data-section="related_services" aria-labelledby="resource-related-services-title">
        <div className="container-shell resource-detail-section__inner">
          <header>
            <h2 id="resource-related-services-title">Related Services</h2>
          </header>
          <div className="resource-detail-link-grid">
            {page.relatedServices.map((service) => (
              <Link className="resource-related-card" href={service.href} key={service.href}>
                {/* track: related_service_click */}
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="resource-detail-section" data-section="related_resources" aria-labelledby="resource-related-resources-title">
        <div className="container-shell resource-detail-section__inner">
          <header>
            <h2 id="resource-related-resources-title">Related Resources</h2>
          </header>
          <div className="resource-detail-link-grid">
            {page.relatedResources.map((resource) => (
              <Link className="resource-related-card resource-related-card--resource" href={`/resources/${resource.slug}`} key={resource.slug}>
                {/* track: related_resource_click */}
                <span>{resource.title}</span>
                <em>{resource.assetStatus === 'pending_resource_file' ? 'Pending verified downloadable file' : 'Verified downloadable file'}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="resource-detail-section resource-detail-section--dark" data-section="conversion_cta" aria-labelledby="resource-detail-cta-title">
        <div className="container-shell resource-detail-conversion">
          <div>
            <h2 id="resource-detail-cta-title">{page.conversionCta.headline}</h2>
            <p>{page.conversionCta.text}</p>
          </div>
          <div className="resource-detail-conversion__actions">
            {/* track: rfq_start */}
            <Link href="/contact#rfq-form" className="button-primary">
              {page.conversionCta.primary_cta}
            </Link>
            <a href="#download-lead-capture-form" className="button-secondary">
              {page.conversionCta.secondary_cta}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
