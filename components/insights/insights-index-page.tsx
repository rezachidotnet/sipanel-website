'use client';

import {useMemo, useState} from 'react';
import {Link, getDirection, type Locale} from '@/i18n/routing';
import type {EngineeringInsightsPageData, InsightCategoryId} from '@/lib/insights/engineering-insights';
import {getInsightCategoryLabel} from '@/lib/insights/engineering-insights';

type Props = {
  locale: Locale;
  page: EngineeringInsightsPageData;
};

type ActiveCategory = InsightCategoryId | 'all';

function matchesSearch(article: EngineeringInsightsPageData['articles'][number], query: string) {
  if (!query.trim()) {
    return true;
  }

  const needle = query.trim().toLowerCase();

  return [article.title, article.summary, article.primaryKeyword, getInsightCategoryLabel(article.category)]
    .some((value) => value.toLowerCase().includes(needle));
}

export function InsightsIndexPage({locale, page}: Props) {
  const dir = getDirection(locale);
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');
  const visibleArticles = useMemo(
    () =>
      page.articles.filter((article) => {
        const categoryMatches = activeCategory === 'all' || article.category === activeCategory;
        return categoryMatches && matchesSearch(article, searchText);
      }),
    [activeCategory, page.articles, searchText]
  );

  return (
    <article className="insights-index-page" data-insights-index="" dir={dir}>
      {/* track: insights_page_view */}
      <section className="insights-index-hero" data-section="insights_index_hero" aria-labelledby="insights-index-title">
        <div className="container-shell insights-index-hero__inner">
          <div className="insights-index-hero__copy">
            <p className="insight-eyebrow">{page.hero.eyebrow}</p>
            <h1 id="insights-index-title">{page.seo.h1}</h1>
            <p>{page.hero.subheadline}</p>
            <div className="insights-index-hero__actions">
              <a className="button-primary" href="#insights-library">
                {page.hero.primaryCta}
              </a>
              {/* track: rfq_start */}
              <Link className="button-secondary" href="/contact#rfq-form">
                {page.hero.secondaryCta}
              </Link>
            </div>
          </div>
          <aside className="insights-index-hero__panel">
            <strong>Article governance</strong>
            <p>Problem, engineering cause, SIPANEL solution logic, technical proof state, and CTA. No invented metrics or unverified project results.</p>
          </aside>
        </div>
      </section>

      <section className="insights-library" id="insights-library" data-section="insights_search_and_filter" aria-labelledby="insights-library-title">
        <div className="container-shell insights-library__inner">
          <header className="insight-section-header">
            <div>
              <h2 id="insights-library-title">Engineering Article Library</h2>
              <p>Search by topic or filter by engineering category.</p>
            </div>
            <span className="insights-count">{visibleArticles.length} articles</span>
          </header>

          <div className="insights-controls">
            <label className="insights-search">
              <span>Search insights</span>
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search technical topic"
                type="search"
              />
            </label>
            <div className="insights-category-filter" aria-label="Insight categories">
              {page.categories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                  <button
                    aria-pressed={isActive}
                    className={isActive ? 'is-active' : undefined}
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    type="button"
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="insights-card-grid">
            {visibleArticles.map((article) => (
              <article className="insight-index-card" key={article.slug} data-category={article.category}>
                <span>{getInsightCategoryLabel(article.category)}</span>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <dl>
                  <div>
                    <dt>Structure</dt>
                    <dd>Problem to CTA</dd>
                  </div>
                  <div>
                    <dt>Proof state</dt>
                    <dd>Pending verified asset</dd>
                  </div>
                </dl>
                {/* track: article_view */}
                <Link href={`/insights/${article.slug}`} className="insight-card-link">
                  Read engineering insight
                </Link>
              </article>
            ))}
          </div>

          {visibleArticles.length === 0 ? (
            <p className="insights-empty">No insight matches the current search and category filter.</p>
          ) : null}
        </div>
      </section>
    </article>
  );
}
