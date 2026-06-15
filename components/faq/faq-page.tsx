'use client';

import './faq.css';
import {useEffect, useId, useMemo, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {Link, getDirection, usePathname, useRouter, type Locale} from '@/i18n/routing';
import {
  getFaqRelatedLinkLabel,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  type FaqPageData,
  type FaqLocaleContent,
  type FaqItem
} from '@/lib/faq/faq-page';

type Props = {
  locale: Locale;
  page: FaqPageData;
};

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function getCategoryCounts(items: FaqItem[], categoryId: string) {
  return categoryId === 'all' ? items.length : items.filter((item) => item.category === categoryId).length;
}

function matchesSearch(item: FaqItem, query: string) {
  if (!query) {
    return true;
  }

  const needle = query.toLowerCase();
  return [item.question, item.answer].some((value) => value.toLowerCase().includes(needle));
}

function getFaqVisibleItems(content: FaqLocaleContent, activeCategory: string, searchQuery: string) {
  return content.items.filter((item) => {
    const categoryMatches = activeCategory === 'all' || item.category === activeCategory;
    return categoryMatches && matchesSearch(item, searchQuery);
  });
}

function getGroupedFaqItems(content: FaqLocaleContent, visibleItems: FaqItem[]) {
  return content.categories
    .map((category) => ({
      category,
      items: visibleItems.filter((item) => item.category === category.id)
    }))
    .filter((group) => group.items.length > 0);
}

export function FaqPage({locale, page}: Props) {
  const dir = getDirection(locale);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const content = page.localeContent[locale];
  const searchInputId = useId();
  const activeCategoryParam = searchParams.get('category') ?? 'all';
  const queryParam = searchParams.get('q') ?? '';
  const [searchText, setSearchText] = useState(queryParam);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const categoryIds = useMemo(() => new Set(content.categories.map((category) => category.id)), [content.categories]);

  const activeCategory =
    activeCategoryParam === 'all' || categoryIds.has(activeCategoryParam as FaqItem['category'])
      ? activeCategoryParam
      : 'all';
  const visibleItems = useMemo(() => getFaqVisibleItems(content, activeCategory, searchText), [activeCategory, content, searchText]);
  const groupedVisibleItems = useMemo(() => getGroupedFaqItems(content, visibleItems), [content, visibleItems]);
  const desktopExpandAll = expandedIds.length > 0 && expandedIds.length === visibleItems.length && visibleItems.length > 0;

  useEffect(() => {
    setSearchText(queryParam);
  }, [queryParam]);

  useEffect(() => {
    setExpandedIds((current) => current.filter((id) => visibleItems.some((item) => item.id === id)));
  }, [visibleItems]);

  function updateQuery(nextValues: {category?: string; q?: string}) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextValues.category !== undefined) {
      if (nextValues.category === 'all') {
        params.delete('category');
      } else {
        params.set('category', nextValues.category);
      }
    }

    if (nextValues.q !== undefined) {
      const trimmed = nextValues.q.trim();

      if (trimmed) {
        params.set('q', trimmed);
      } else {
        params.delete('q');
      }
    }

    const query = params.toString();
    const nextHref = query ? `${pathname}?${query}` : pathname;
    router.replace(nextHref, {scroll: false});
  }

  function updateCategory(nextCategory: string) {
    /* track: faq_category_filter */
    updateQuery({category: nextCategory});
  }

  function updateSearch(value: string) {
    /* track: faq_search */
    setSearchText(value);
    updateQuery({q: value});
  }

  function toggleExpanded(id: string) {
    /* track: faq_expand */
    setExpandedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  }

  function setAllExpanded(expand: boolean) {
    /* track: faq_expand */
    setExpandedIds(expand ? visibleItems.map((item) => item.id) : []);
  }

  return (
    <article className="faq-page" data-faq-page="" dir={dir}>
      <SchemaPlaceholder schema={buildFaqSchema(locale)} />
      <SchemaPlaceholder schema={buildBreadcrumbSchema(locale)} />
      <SchemaPlaceholder schema={buildOrganizationSchema(locale)} />

      <section className="faq-hero" data-section="faq_hero" aria-labelledby="faq-page-title">
        <div className="container-shell faq-hero__inner">
          <div className="faq-hero__copy">
            <p className="faq-eyebrow">{content.hero.eyebrow}</p>
            <h1 id="faq-page-title">{content.seo.h1}</h1>
            <p>{content.hero.subheadline}</p>
            <div className="faq-hero__actions">
              {/* track: rfq_start */}
              <Link className="button-primary" href="/contact#rfq-form">
                {content.hero.primaryCta}
              </Link>
              {/* track: related_service_click */}
              <Link className="button-secondary" href="/systems/sandwich-panel-systems">
                {content.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <aside className="faq-hero__panel">
            <strong>{content.hero.panelTitle}</strong>
            <p>{content.hero.panelText}</p>
          </aside>
        </div>
      </section>

      <section
        className="faq-search-and-filters"
        data-section="faq_search_and_filters"
        aria-labelledby="faq-search-filter-title"
      >
        <div className="container-shell faq-search-and-filters__inner">
          <header className="faq-section-header">
            <h2 id="faq-search-filter-title">{content.filters.title}</h2>
            <p>{content.filters.searchPlaceholder}</p>
          </header>

          <div className="faq-search-layout">
            <aside className="faq-filter-sidebar" aria-label={content.filters.title}>
              <div className="faq-search-field">
                <label htmlFor={searchInputId}>{content.filters.searchLabel}</label>
                <input
                  id={searchInputId}
                  value={searchText}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder={content.filters.searchPlaceholder}
                  type="search"
                />
              </div>

              <button
                className="faq-filter-clear"
                onClick={() => {
                  /* track: faq_search */
                  setSearchText('');
                  updateQuery({category: 'all', q: ''});
                }}
                type="button"
              >
                {content.filters.clearLabel}
              </button>

              <div className="faq-filter-sidebar__group">
                {content.categories.map((category) => {
                  const isActive = activeCategory === category.id;

                  return (
                    <button
                      aria-pressed={isActive}
                      className={isActive ? 'faq-filter-sidebar__button is-active' : 'faq-filter-sidebar__button'}
                      key={category.id}
                      onClick={() => updateCategory(category.id)}
                      type="button"
                    >
                      <span>{category.label}</span>
                      <em>{getCategoryCounts(content.items, category.id)}</em>
                    </button>
                  );
                })}
              </div>

              <div className="faq-expand-controls">
                <button disabled={desktopExpandAll || visibleItems.length === 0} onClick={() => setAllExpanded(true)} type="button">
                  {content.filters.expandAllLabel}
                </button>
                <button disabled={!desktopExpandAll || visibleItems.length === 0} onClick={() => setAllExpanded(false)} type="button">
                  {content.filters.collapseAllLabel}
                </button>
              </div>
            </aside>

            <div className="faq-search-main">
              <div className="faq-filter-pills" role="toolbar" aria-label={content.filters.title}>
                <button
                  aria-pressed={activeCategory === 'all'}
                  className={activeCategory === 'all' ? 'faq-filter-pill is-active' : 'faq-filter-pill'}
                  onClick={() => updateCategory('all')}
                  type="button"
                >
                  {content.filters.allLabel}
                </button>
                {content.categories.map((category) => {
                  const count = getCategoryCounts(content.items, category.id);

                  return (
                    <button
                      aria-pressed={activeCategory === category.id}
                      className={activeCategory === category.id ? 'faq-filter-pill is-active' : 'faq-filter-pill'}
                      key={category.id}
                      onClick={() => updateCategory(category.id)}
                      type="button"
                    >
                      {category.label}
                      <em>{count}</em>
                    </button>
                  );
                })}
              </div>

              <div className="faq-search-summary" aria-live="polite">
                <strong>{visibleItems.length}</strong>
                <span>{content.filters.resultsLabel}</span>
              </div>

              <button className="faq-mobile-clear" onClick={() => updateQuery({category: 'all', q: ''})} type="button">
                {content.filters.clearLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-items" data-section="faq_items" aria-labelledby="faq-items-title">
        <div className="container-shell faq-items__inner">
          <header className="faq-section-header">
            <h2 id="faq-items-title">{content.itemsTitle}</h2>
            <p>{content.itemsIntro}</p>
          </header>

          {visibleItems.length > 0 ? (
            <div className="faq-accordion-list">
              {groupedVisibleItems.map((group) => (
                <section className="faq-accordion-group" key={group.category.id} aria-labelledby={`faq-group-${group.category.id}`}>
                  <h3 id={`faq-group-${group.category.id}`}>{group.category.label}</h3>
                  <div className="faq-accordion-group__items">
                    {group.items.map((item) => {
                      const open = expandedIds.includes(item.id);
                      const itemId = `faq-item-${item.id}`;
                      const panelId = `faq-panel-${item.id}`;

                      return (
                        <article className={open ? 'faq-accordion-item is-open' : 'faq-accordion-item'} key={item.id}>
                          <h4>
                            <button
                              aria-controls={panelId}
                              aria-expanded={open}
                              id={itemId}
                              onClick={() => toggleExpanded(item.id)}
                              type="button"
                            >
                              <span className="faq-accordion-item__category">{group.category.label}</span>
                              <span className="faq-accordion-item__question">{item.question}</span>
                            </button>
                          </h4>

                          <div aria-labelledby={itemId} className="faq-accordion-item__panel" hidden={!open} id={panelId} role="region">
                            <p>{item.answer}</p>
                            {item.relatedLinks.length > 0 ? (
                              <div className="faq-related-links">
                                {item.relatedLinks.map((link) =>
                                  link.pending ? (
                                    <span className="faq-related-link is-pending" key={`${item.id}-${link.href}`}>
                                      {getFaqRelatedLinkLabel(locale, link.href)}
                                    </span>
                                  ) : (
                                    <Link className="faq-related-link" href={link.href} key={`${item.id}-${link.href}`}>
                                      {/* track: related_service_click */}
                                      {getFaqRelatedLinkLabel(locale, link.href)}
                                    </Link>
                                  )
                                )}
                              </div>
                            ) : null}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="faq-empty-state">
              <strong>{content.filters.emptyTitle}</strong>
              <p>{content.filters.emptyText}</p>
              <button onClick={() => updateQuery({category: 'all', q: ''})} type="button">
                {content.filters.clearLabel}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="faq-related-section" data-section="related_services" aria-labelledby="faq-related-services-title">
        <div className="container-shell faq-related-section__inner">
          <header className="faq-section-header">
            <h2 id="faq-related-services-title">{content.relatedServices.title}</h2>
          </header>
          <div className="faq-related-card-grid">
            {content.relatedServices.cards.map((service) => (
              <Link className="faq-related-card" href={service.href} key={service.href}>
                {/* track: related_service_click */}
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-related-section faq-related-section--light" data-section="related_resources" aria-labelledby="faq-related-resources-title">
        <div className="container-shell faq-related-section__inner">
          <header className="faq-section-header">
            <h2 id="faq-related-resources-title">{content.relatedResources.title}</h2>
          </header>
          <div className="faq-related-card-grid">
            {content.relatedResources.cards.map((resource) => (
              <Link className="faq-related-card faq-related-card--resource" href={resource.href} key={resource.title} data-resource-status={resource.status}>
                {/* track: related_resource_click */}
                <span>{resource.title}</span>
                <em>{resource.description}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-conversion" data-section="conversion_cta" aria-labelledby="faq-cta-title">
        <div className="container-shell faq-conversion__inner">
          <div className="faq-conversion__copy">
            <h2 id="faq-cta-title">{content.conversionCta.headline}</h2>
            <p>{content.conversionCta.text}</p>
          </div>
          <div className="faq-conversion__actions">
            {/* track: rfq_start */}
            <Link className="button-primary" href="/contact#rfq-form">
              {content.conversionCta.primaryCta}
            </Link>
            <a className="button-secondary" href={`https://wa.me/${page.contact.whatsapp.replace(/\D/g, '')}`}>
              {content.conversionCta.secondaryCta}
            </a>
            <a className="button-secondary" href={`tel:${page.contact.phone.replace(/\s/g, '')}`}>
              {content.conversionCta.tertiaryCta}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
