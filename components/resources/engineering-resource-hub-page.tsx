import {Link, type Locale, getDirection} from '@/i18n/routing';
import {
  getEngineeringResourceHubBreadcrumbs,
  getProductionContactInfo,
  getResourceTypeLabel,
  type ResourceHubCard,
  type ResourceHubCategory,
  type ResourceHubPageData
} from '@/lib/resources/engineering-resource-hub';
import {
  buildBreadcrumbListSchema,
  buildCollectionPageSchema,
  buildOrganizationSchema as buildSharedOrganizationSchema
} from '@/lib/seo/schema';

type Props = {
  locale: Locale;
  page: ResourceHubPageData;
};

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function buildCollectionSchema(locale: Locale, page: ResourceHubPageData) {
  const content = page.localeContent[locale];

  return buildCollectionPageSchema(locale, `${page.routes[locale]}#collection`, {
    name: content.seo.title,
    description: content.seo.meta_description,
    url: page.routes[locale],
    items: content.featuredResources.map((resource) => ({name: resource.title}))
  });
}

function buildBreadcrumbSchema(locale: Locale, page: ResourceHubPageData) {
  return buildBreadcrumbListSchema(
    locale,
    `${page.routes[locale]}#breadcrumb`,
    getEngineeringResourceHubBreadcrumbs(locale).map((item) => ({name: item.label, item: item.href}))
  );
}

function buildOrganizationSchema(locale: Locale) {
  return buildSharedOrganizationSchema(locale, `/${locale}#organization`);
}

function ResourceHubDocumentPreview({label}: {label: string}) {
  return (
    <div className="resource-hub-doc-preview" aria-hidden="true">
      <div className="resource-hub-doc-preview__sheet">
        <span />
        <span />
        <span />
      </div>
      <em>{label}</em>
    </div>
  );
}

function ResourceFilters({categories, groupId}: {categories: ResourceHubCategory[]; groupId: string}) {
  return (
    <div className="resource-filter-controls" aria-label="Resource categories">
      <input className="resource-filter-input" type="radio" name={`resource-category-${groupId}`} id={`resource-filter-${groupId}-all`} defaultChecked />
      <label className="resource-filter-pill" htmlFor={`resource-filter-${groupId}-all`}>
        {/* track: resource_category_filter */}
        All resources
      </label>

      {categories.map((category) => (
        <span className="resource-filter-option" key={category.id}>
          <input className="resource-filter-input" type="radio" name={`resource-category-${groupId}`} id={`resource-filter-${groupId}-${category.id}`} />
          <label className="resource-filter-pill" htmlFor={`resource-filter-${groupId}-${category.id}`}>
            {/* track: resource_category_filter */}
            {category.label}
          </label>
        </span>
      ))}
    </div>
  );
}

function ResourceCard({resource, categoryLabel, mode = 'grid'}: {resource: ResourceHubCard; categoryLabel: string; mode?: 'featured' | 'grid'}) {
  const pendingMessage = resource.leadCapture
    ? 'Lead capture required before release. Resource file pending verification.'
    : 'Resource content is pending verified downloadable file.';

  return (
    <article
      className="resource-card resource-hub-card"
      data-resource-id={resource.id}
      data-category={resource.category}
      data-resource-category={resource.category}
      data-asset-status={resource.assetStatus}
      data-lead-capture={resource.leadCaptureStatus}
    >
      <div className="resource-card__preview" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="resource-card__content">
        <div className="resource-hub-card__meta">
          <span className="resource-card__type">{getResourceTypeLabel(resource.type)}</span>
          <span className="resource-hub-card__category">{categoryLabel}</span>
        </div>

        <h3>{resource.title}</h3>
        <p>{resource.description}</p>

        <dl className="resource-hub-card__stats">
          <div>
            <dt>Difficulty</dt>
            <dd>{resource.difficulty}</dd>
          </div>
          <div>
            <dt>Read time</dt>
            <dd>{resource.readTime}</dd>
          </div>
        </dl>

        <span className="resource-card__pending">{pendingMessage}</span>

        <div className="resource-hub-card__actions">
          {/* track: resource_card_click */}
          <Link href={resource.relatedServiceHref} className="resource-hub-card__link">
            Related system
          </Link>
          {/* track: resource_download_start */}
          <Link className="resource-card__cta" href={`/resources/${resource.slug}#download-lead-capture-form`} data-download-mode={mode}>
            {resource.cta}
          </Link>
        </div>
      </div>
    </article>
  );
}

function FieldLabel({field}: {field: string}) {
  const labels: Record<string, string> = {
    name: 'Name',
    company: 'Company',
    phone: 'Phone',
    email: 'Email',
    project_type: 'Project type',
    resource_requested: 'Resource requested',
    project_stage: 'Project stage',
    message: 'Message'
  };

  return <>{labels[field] ?? field.replaceAll('_', ' ')}</>;
}

export function EngineeringResourceHubPage({locale, page}: Props) {
  const dir = getDirection(locale);
  const content = page.localeContent[locale];
  const contact = getProductionContactInfo();
  const featuredResources = content.featuredResources.slice(0, 3);
  const categoryLabelById = new Map(content.categories.map((category) => [category.id, category.label]));

  return (
    <article className="resource-hub-page" data-resource-hub="" dir={dir}>
      <SchemaPlaceholder schema={buildCollectionSchema(locale, page)} />
      <SchemaPlaceholder schema={buildBreadcrumbSchema(locale, page)} />
      <SchemaPlaceholder schema={buildOrganizationSchema(locale)} />

      <section className="resource-hub-hero" data-section="resource_hub_hero" aria-labelledby="resource-hub-title">
        <div className="container-shell resource-hub-hero__inner">
          <div className="resource-hub-hero__copy">
            <p className="resource-hub-eyebrow">{content.hero.eyebrow}</p>
            <h1 id="resource-hub-title">{content.hero.h1}</h1>
            <p>{content.hero.subheadline}</p>
            <span>{content.hero.trustMicrocopy}</span>

            <div className="resource-hub-hero__actions">
              {/* track: resource_download_start */}
              <a href="#lead-capture-download-flow" className="button-primary">
                {content.hero.primaryCta}
              </a>
              {/* track: rfq_start */}
              <Link href="/contact#rfq-form" className="button-secondary">
                {content.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="resource-hub-hero__visual" aria-label={content.hero.visualFallback} role="img">
            <div className="resource-hub-doc-stack">
              <ResourceHubDocumentPreview label={content.hero.visualFallback} />
              <ResourceHubDocumentPreview label="Panel layout" />
              <ResourceHubDocumentPreview label="Waterproofing detail" />
            </div>
          </div>
        </div>
      </section>

      <section className="resource-hub-section resource-hub-section--light" data-section="resource_categories" aria-labelledby="resource-categories-title">
        <div className="container-shell resource-hub-section__inner">
          <header>
            <h2 id="resource-categories-title">Browse by Engineering Topic</h2>
          </header>
          <ResourceFilters categories={content.categories} groupId="categories" />
        </div>
      </section>

      <section className="resource-hub-section" data-section="featured_resources" aria-labelledby="featured-resources-title">
        <div className="container-shell resource-hub-section__inner">
          <header className="resource-hub-section__header">
            <div>
              <h2 id="featured-resources-title">Featured Engineering Resources</h2>
              <p>High-value resources remain marked pending until real downloadable files are verified.</p>
            </div>
          </header>

          <div className="resource-hub-featured-grid">
            {featuredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                categoryLabel={categoryLabelById.get(resource.category) ?? resource.category}
                mode="featured"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="resource-hub-section resource-hub-section--light" data-section="resource_grid" aria-labelledby="resource-grid-title">
        <div className="container-shell resource-hub-section__inner">
          <header className="resource-hub-section__header">
            <div>
              <h2 id="resource-grid-title">Engineering Resource Library</h2>
              <p>Filter by system topic, then start the lead-capture flow for pending downloads.</p>
            </div>
            <span className="resource-hub-count">{content.featuredResources.length} resources</span>
          </header>

          <div className="resource-hub-filter-shell">
            <ResourceFilters categories={content.categories} groupId="grid" />
            <div className="resource-hub-grid">
              {content.featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} categoryLabel={categoryLabelById.get(resource.category) ?? resource.category} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="resource-hub-section"
        id="lead-capture-download-flow"
        data-section="lead_capture_download_flow"
        aria-labelledby="resource-lead-title"
      >
        <div className="container-shell resource-lead-flow">
          <div className="resource-lead-flow__copy">
            <h2 id="resource-lead-title">{content.leadCapture.title}</h2>
            <p>Downloads are released through consultation-ready lead capture because verified resource files are not yet attached to the website.</p>
            <ResourceHubDocumentPreview label="Pending verified resource file" />
          </div>

          <form className="resource-lead-form" aria-label={content.leadCapture.title}>
            {content.leadCapture.fields.map((field) => (
              <label key={field} className={field === 'message' ? 'resource-lead-form__field resource-lead-form__field--full' : 'resource-lead-form__field'}>
                <span>
                  <FieldLabel field={field} />
                </span>
                {field === 'message' ? (
                  <textarea name={field} rows={4} placeholder="Project context or requested resource" />
                ) : (
                  <input name={field} type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} />
                )}
              </label>
            ))}

            <div className="resource-lead-form__actions">
              {/* track: resource_download_complete */}
              <p role="status">Submission endpoint pending. The download flow is connected to this lead-capture form.</p>
              {/* track: resource_download_start */}
              <button type="button" className="resource-card__cta" disabled aria-disabled="true">
                {content.leadCapture.cta}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="resource-hub-section resource-hub-section--light" data-section="related_services" aria-labelledby="resource-related-title">
        <div className="container-shell resource-hub-section__inner">
          <header className="resource-hub-section__header">
            <h2 id="resource-related-title">Explore Related Systems</h2>
          </header>

          <div className="resource-related-grid">
            {content.relatedServices.map((service) => (
              <Link key={service.href} href={service.href} className="resource-related-card">
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="resource-hub-section resource-hub-section--dark" data-section="conversion_cta" aria-labelledby="resource-hub-conversion-title">
        <div className="container-shell resource-hub-conversion">
          <div>
            <h2 id="resource-hub-conversion-title">{content.conversionCta.headline}</h2>
            <p>{content.conversionCta.text}</p>
          </div>
          <div className="resource-hub-conversion__actions">
            {/* track: rfq_start */}
            <Link href="/contact#rfq-form" className="button-primary">
              {content.conversionCta.primary_cta}
            </Link>
            <a className="button-secondary" href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}>
              {content.conversionCta.secondary_cta}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
