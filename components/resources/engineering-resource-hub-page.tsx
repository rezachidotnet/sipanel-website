import Image from 'next/image';
import {Link, type Locale, getDirection} from '@/i18n/routing';
import {
  formatResourceDate,
  getEngineeringResourceHubBreadcrumbs,
  getResourceTypeLabel,
  getStatLabels,
  type ResourceHubCard,
  type ResourceHubCategory,
  type ResourceHubPageData
} from '@/lib/resources/engineering-resource-hub';
import {ResourceBreadcrumb} from '@/components/resources/resource-breadcrumb';
import {ResourceSortControl} from '@/components/resources/resource-sort-control';
import {
  buildBreadcrumbListSchema,
  buildCollectionPageSchema,
  buildFaqPageSchema,
  buildOrganizationSchema as buildSharedOrganizationSchema
} from '@/lib/seo/schema';

type Props = {
  locale: Locale;
  page: ResourceHubPageData;
  proofMetrics: Array<{id: 'yearsExperience' | 'industrialProjects' | 'executedPanelArea'; value: string; label: string}>;
  proofLabel: string;
};

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function buildCollectionSchema(locale: Locale, page: ResourceHubPageData) {
  const content = page.localeContent[locale];

  return buildCollectionPageSchema(locale, `${page.routes[locale]}#collection`, {
    name: content.localeSeo.title,
    description: content.localeSeo.meta_description,
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

function formatResourceCount(count: number, locale: Locale) {
  const number = locale === 'fa' || locale === 'ar'
    ? count.toLocaleString(`${locale}-u-nu-${locale === 'ar' ? 'arab' : 'native'}`)
    : count.toLocaleString(locale);

  if (locale === 'fa') {
    return `${number} منبع`;
  }

  if (locale === 'ar') {
    return `${number} مورد`;
  }

  if (locale === 'ru') {
    return `${number} ресурсов`;
  }

  return `${number} ${count === 1 ? 'resource' : 'resources'}`;
}

function ResourceFilters({
  categories,
  counts,
  groupId,
  allLabel,
  locale,
  totalCount,
  filterAriaLabel
}: {
  categories: ResourceHubCategory[];
  counts: Map<ResourceHubCategory['id'], number>;
  groupId: string;
  allLabel: string;
  locale: Locale;
  totalCount: number;
  filterAriaLabel: string;
}) {
  return (
    <div className="resource-filter-controls" aria-label={filterAriaLabel}>
      <input className="resource-filter-input" type="radio" name={`resource-category-${groupId}`} id={`resource-filter-${groupId}-all`} defaultChecked />
      <label className="resource-filter-pill" htmlFor={`resource-filter-${groupId}-all`}>
        {/* track: resource_category_filter */}
        <span>{allLabel}</span>
        <em>{formatResourceCount(totalCount, locale)}</em>
      </label>

      {categories.map((category) => (
        <span className="resource-filter-option" key={category.id}>
          <input className="resource-filter-input" type="radio" name={`resource-category-${groupId}`} id={`resource-filter-${groupId}-${category.id}`} />
          <label className="resource-filter-pill" htmlFor={`resource-filter-${groupId}-${category.id}`}>
            {/* track: resource_category_filter */}
            <span>{category.label}</span>
            <em>{formatResourceCount(counts.get(category.id) ?? 0, locale)}</em>
          </label>
        </span>
      ))}
    </div>
  );
}


function ResourceProofStrip({metrics, label}: {metrics: Props['proofMetrics']; label: string}) {
  return (
    <section className="resource-hub-proof-strip" aria-label={label}>
      <div className="container-shell">
        <div className="resource-hub-proof-strip__grid">
          {metrics.map((metric) => (
            <div className="resource-hub-proof-strip__item" key={metric.id}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceCardStats({resource, locale}: {resource: ResourceHubCard; locale: Locale}) {
  const {preview} = resource;
  const labels = getStatLabels(locale);
  const items: Array<{label: string; value: string}> = [];

  if (preview.format) {
    items.push({label: '', value: preview.format});
  }

  if (preview.pageCount) {
    const num = locale === 'fa' || locale === 'ar'
      ? preview.pageCount.toLocaleString(`${locale}-u-nu-${locale === 'ar' ? 'arab' : 'native'}`)
      : String(preview.pageCount);
    items.push({label: '', value: `${num} ${labels.pages}`});
  }

  if (preview.readingTime) {
    const match = preview.readingTime.match(/(\d+)/);
    if (match) {
      const num = locale === 'fa' || locale === 'ar'
        ? Number(match[1]).toLocaleString(`${locale}-u-nu-${locale === 'ar' ? 'arab' : 'native'}`)
        : match[1];
      items.push({label: labels.readingTime, value: `${num} ${labels.minutes}`});
    }
  }

  if (preview.updatedAt) {
    items.push({label: labels.updated, value: formatResourceDate(preview.updatedAt, locale)});
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <dl className="resource-hub-card__stats">
      {items.map((item) => (
        <div key={item.value}>
          {item.label ? <dt>{item.label}</dt> : <dt className="sr-only">{item.value}</dt>}
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ResourceCardPreview({resource, locale, priority = false}: {resource: ResourceHubCard; locale: Locale; priority?: boolean}) {
  const image = resource.preview.image;
  const imageAlt = resource.preview.imageAlt?.[locale] ?? resource.title;

  if (image) {
    return (
      <div className="resource-card__preview resource-card__preview--image">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1024px) 45vw, 30vw"
          priority={priority}
          placeholder="blur"
        />
      </div>
    );
  }

  return (
    <div className="resource-card__preview" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function ResourceCard({resource, categoryLabel, locale, ui, mode = 'grid'}: {resource: ResourceHubCard; categoryLabel: string; locale: Locale; ui: {relatedSystem: string; viewDetails: string; pendingFile: string; pendingLead: string; hasRelatedProjects: string}; mode?: 'featured' | 'grid'}) {
  const pendingMessage = resource.leadCapture ? ui.pendingLead : ui.pendingFile;
  const typeLabel = getResourceTypeLabel(resource.type, locale);

  return (
    <article
      className="resource-card resource-hub-card"
      data-resource-id={resource.id}
      data-resource-type={resource.type}
      data-category={resource.category}
      data-resource-category={resource.category}
      data-asset-status={resource.assetStatus}
      data-lead-capture={resource.leadCaptureStatus}
      data-sort-date={resource.sortDate}
      data-sort-order={resource.recommendedOrder}
      data-sort-readtime={resource.sortReadTime}
    >
      <ResourceCardPreview resource={resource} locale={locale} priority={mode === 'featured'} />

      <div className="resource-card__content">
        <div className="resource-hub-card__meta">
          <strong className="resource-card__type">
            <span aria-hidden="true" />
            {typeLabel}
          </strong>
          <span className="resource-hub-card__category">{categoryLabel}</span>
        </div>

        <h3>{resource.title}</h3>
        <p>{resource.description}</p>

        <ResourceCardStats resource={resource} locale={locale} />

        <span className="resource-card__pending">{pendingMessage}</span>
        {resource.relatedProjectSlugs.length > 0 && (
          <span className="resource-card__projects-hint">{ui.hasRelatedProjects}</span>
        )}

        <div className="resource-hub-card__actions">
          {/* track: resource_card_click */}
          <Link href={resource.relatedServiceHref} className="resource-hub-card__link">
            {ui.relatedSystem}
          </Link>
          {/* track: resource_detail_view */}
          <Link className="resource-card__cta" href={`/resources/${resource.slug}`}>
            {ui.viewDetails}
          </Link>
        </div>
      </div>
    </article>
  );
}



export function EngineeringResourceHubPage({locale, page, proofMetrics, proofLabel}: Props) {
  const dir = getDirection(locale);
  const content = page.localeContent[locale];
  const featuredResources = content.featuredResources.slice(0, 3);
  const featuredIds = new Set(featuredResources.map((r) => r.id));
  const libraryResources = content.featuredResources.filter((r) => !featuredIds.has(r.id));
  const categoryLabelById = new Map(content.categories.map((category) => [category.id, category.label]));
  const libraryCategoryCounts = libraryResources.reduce((counts, resource) => {
    counts.set(resource.category, (counts.get(resource.category) ?? 0) + 1);
    return counts;
  }, new Map<ResourceHubCategory['id'], number>());
  const filterCategories = content.categories.filter((category) => (libraryCategoryCounts.get(category.id) ?? 0) > 0);
  const totalLibraryCount = libraryResources.length;

  return (
    <article className="resource-hub-page" data-resource-hub="" dir={dir}>
      <SchemaPlaceholder schema={buildCollectionSchema(locale, page)} />
      <SchemaPlaceholder schema={buildBreadcrumbSchema(locale, page)} />
      <SchemaPlaceholder schema={buildOrganizationSchema(locale)} />

      <div className="container-shell">
        <ResourceBreadcrumb items={getEngineeringResourceHubBreadcrumbs(locale)} ariaLabel={content.ui.breadcrumbAriaLabel} />
      </div>

      <section className="resource-hub-hero" data-section="resource_hub_hero" aria-labelledby="resource-hub-title">
        <div className="container-shell resource-hub-hero__inner">
          <div className="resource-hub-hero__copy">
            <p className="resource-hub-eyebrow">{content.hero.eyebrow}</p>
            <h1 id="resource-hub-title">{content.hero.h1}</h1>
            <p>{content.hero.subheadline}</p>
            <span>{content.hero.trustMicrocopy}</span>

            <div className="resource-hub-hero__actions">
              {/* track: resource_download_start */}
              {content.hero.primaryCtaDisabled ? (
                <span className="button-primary button-primary--disabled" aria-disabled="true">
                  {content.hero.primaryCta}
                </span>
              ) : content.hero.primaryCtaHref.startsWith('#') ? (
                <a href={content.hero.primaryCtaHref} className="button-primary">
                  {content.hero.primaryCta}
                </a>
              ) : (
                <Link href={content.hero.primaryCtaHref} className="button-primary">
                  {content.hero.primaryCta}
                </Link>
              )}
              {/* track: rfq_start */}
              <Link href={content.hero.secondaryCtaHref} className="button-secondary">
                {content.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="resource-hub-hero__visual" aria-label={content.hero.visualFallback} role="img">
            <div className="resource-hub-doc-stack">
              <ResourceHubDocumentPreview label={content.hero.visualFallback} />
              <ResourceHubDocumentPreview label={content.ui.heroVisualLabel1} />
              <ResourceHubDocumentPreview label={content.ui.heroVisualLabel2} />
            </div>
          </div>
        </div>
      </section>

      <ResourceProofStrip metrics={proofMetrics} label={proofLabel} />

      <section className="resource-hub-section" data-section="featured_resources" aria-labelledby="featured-resources-title">
        <div className="container-shell resource-hub-section__inner">
          <header className="resource-hub-section__header">
            <h2 id="featured-resources-title">{content.ui.sectionFeatured}</h2>
          </header>

          <div className="resource-hub-featured-grid">
            {featuredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                categoryLabel={categoryLabelById.get(resource.category) ?? resource.category}
                locale={locale}
                ui={content.ui}
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
              <h2 id="resource-grid-title">{content.ui.sectionLibrary}</h2>
            </div>
            <span className="resource-hub-count">{formatResourceCount(totalLibraryCount, locale)}</span>
          </header>

          <div className="resource-hub-filter-shell">
            <div className="resource-hub-filter-bar">
              <ResourceFilters
                categories={filterCategories}
                counts={libraryCategoryCounts}
                groupId="grid"
                allLabel={content.allResourcesLabel}
                locale={locale}
                totalCount={totalLibraryCount}
                filterAriaLabel={content.ui.filterAriaLabel}
              />
              <ResourceSortControl
                labels={{
                  sortLabel: content.ui.sortLabel,
                  sortNewest: content.ui.sortNewest,
                  sortOldest: content.ui.sortOldest,
                  sortRecommended: content.ui.sortRecommended,
                  sortShorterRead: content.ui.sortShorterRead
                }}
                gridSelector=".resource-hub-grid"
                hasReadTime={libraryResources.some((r) => r.sortReadTime > 0)}
              />
            </div>
            <div className="resource-hub-grid">
              {libraryResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} categoryLabel={categoryLabelById.get(resource.category) ?? resource.category} locale={locale} ui={content.ui} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {content.faq.items.length > 0 && (
        <section className="resource-hub-section" data-section="resource_faq" aria-labelledby="resource-hub-faq-title">
          <SchemaPlaceholder schema={buildFaqPageSchema(locale, `${page.routes[locale]}#faq`, content.faq.items)} />
          <div className="container-shell resource-hub-section__inner">
            <header>
              <h2 id="resource-hub-faq-title">{content.faq.title}</h2>
            </header>
            <div className="resource-hub-faq-list">
              {content.faq.items.map((item) => (
                <details className="resource-hub-faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="resource-hub-section resource-hub-section--light" data-section="related_services" aria-labelledby="resource-related-title">
        <div className="container-shell resource-hub-section__inner">
          <header className="resource-hub-section__header">
            <h2 id="resource-related-title">{content.ui.sectionExplore}</h2>
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

      <section
        className="resource-hub-section"
        id="lead-capture-download-flow"
        data-section="lead_capture_download_flow"
        aria-labelledby="resource-lead-title"
      >
        <div className="container-shell resource-lead-flow">
          <div className="resource-lead-flow__copy">
            <h2 id="resource-lead-title">{content.ui.indexLeadTitle}</h2>
            <p>{content.ui.indexLeadNote}</p>
            <ResourceHubDocumentPreview label={content.ui.pendingBadge} />
          </div>

          <form className="resource-lead-form" aria-label={content.ui.indexLeadTitle}>
            <label className="resource-lead-form__field">
              <span>{content.ui.fieldName}</span>
              <input name="name" required minLength={2} autoComplete="name" />
            </label>
            <label className="resource-lead-form__field">
              <span>{content.ui.fieldPhone}</span>
              <input name="phone" required type="tel" autoComplete="tel" dir="ltr" />
            </label>
            <label className="resource-lead-form__field">
              <span>{content.ui.fieldCompany}</span>
              <input name="company" autoComplete="organization" />
            </label>
            <label className="resource-lead-form__field">
              <span>{content.ui.fieldProjectType}</span>
              <input name="project_type" />
            </label>
            <label className="resource-lead-form__field resource-lead-form__field--full">
              <span>{content.ui.fieldMessage}</span>
              <textarea name="message" rows={3} />
            </label>

            <div className="resource-lead-form__actions">
              <button type="button" className="resource-card__cta" disabled aria-disabled="true">
                {content.ui.downloadSubmit}
              </button>
              <p className="resource-lead-form__privacy">{content.ui.privacyNote}</p>
            </div>
          </form>
        </div>
      </section>

      <section className="resource-hub-section resource-hub-section--dark" data-section="conversion_cta" aria-labelledby="resource-hub-conversion-title">
        <div className="container-shell resource-hub-conversion">
          <div>
            <h2 id="resource-hub-conversion-title">{content.ui.rfqConversionTitle}</h2>
            <p>{content.ui.rfqConversionDescription}</p>
            <ul className="resource-hub-conversion__proof" aria-label={content.ui.rfqConversionHelper}>
              {content.ui.rfqConversionTrust.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="resource-hub-conversion__actions">
            {/* track: rfq_start */}
            <Link href="/contact#rfq-form" className="button-primary">
              {content.ui.rfqConversionPrimary}
            </Link>
            <Link href="/contact" className="button-secondary">
              {content.ui.rfqConversionSecondary}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
