'use client';

import './insights.css';
import {useMemo, useState} from 'react';
import {Link, getDirection, type Locale} from '@/i18n/routing';
import type {EngineeringInsightsPageData, InsightCategoryId} from '@/lib/insights/engineering-insights';
import {getInsightCategoryLabel} from '@/lib/insights/engineering-insights';

type Props = {
  locale: Locale;
  page: EngineeringInsightsPageData;
};

type ActiveCategory = InsightCategoryId | 'all';

const uiLabels = {
  fa: {
    governanceTitle: 'چارچوب مقاله',
    governanceText: 'مسئله، علت مهندسی، منطق راهکار SIPANEL، وضعیت اثبات فنی و مسیر اقدام بدون عددسازی یا نتیجه تأییدنشده.',
    libraryTitle: 'کتابخانه مقاله‌های مهندسی',
    libraryText: 'بر اساس موضوع یا دسته مهندسی جستجو کنید.',
    count: 'مقاله',
    searchLabel: 'جستجوی بینش‌ها',
    searchPlaceholder: 'جستجوی موضوع فنی',
    categoryAria: 'دسته‌های بینش',
    structure: 'ساختار',
    structureValue: 'از مسئله تا اقدام',
    proofState: 'وضعیت اثبات',
    proofStateValue: 'دارایی تأییدشده در انتظار',
    read: 'مطالعه بینش مهندسی',
    empty: 'هیچ بینشی با جستجو و فیلتر فعلی مطابقت ندارد.'
  },
  en: {
    governanceTitle: 'Article governance',
    governanceText: 'Problem, engineering cause, SIPANEL solution logic, technical proof state, and CTA. No invented metrics or unverified project results.',
    libraryTitle: 'Engineering Article Library',
    libraryText: 'Search by topic or filter by engineering category.',
    count: 'articles',
    searchLabel: 'Search insights',
    searchPlaceholder: 'Search technical topic',
    categoryAria: 'Insight categories',
    structure: 'Structure',
    structureValue: 'Problem to CTA',
    proofState: 'Proof state',
    proofStateValue: 'Pending verified asset',
    read: 'Read engineering insight',
    empty: 'No insight matches the current search and category filter.'
  },
  ar: {
    governanceTitle: 'حوكمة المقال',
    governanceText: 'المشكلة والسبب الهندسي ومنطق حل SIPANEL وحالة الإثبات الفني ومسار الإجراء دون أرقام مخترعة أو نتائج غير موثقة.',
    libraryTitle: 'مكتبة المقالات الهندسية',
    libraryText: 'ابحث حسب الموضوع أو رشح حسب الفئة الهندسية.',
    count: 'مقالات',
    searchLabel: 'بحث في الرؤى',
    searchPlaceholder: 'ابحث عن موضوع فني',
    categoryAria: 'فئات الرؤى',
    structure: 'الهيكل',
    structureValue: 'من المشكلة إلى الإجراء',
    proofState: 'حالة الإثبات',
    proofStateValue: 'أصل موثق قيد الإعداد',
    read: 'قراءة الرؤية الهندسية',
    empty: 'لا توجد رؤية مطابقة للبحث والمرشح الحاليين.'
  },
  ru: {
    governanceTitle: 'Контроль статьи',
    governanceText: 'Задача, инженерная причина, логика решения SIPANEL, статус технического подтверждения и действие без вымышленных метрик или неподтвержденных результатов.',
    libraryTitle: 'Библиотека инженерных статей',
    libraryText: 'Ищите по теме или фильтруйте по инженерной категории.',
    count: 'статьи',
    searchLabel: 'Поиск материалов',
    searchPlaceholder: 'Поиск технической темы',
    categoryAria: 'Категории материалов',
    structure: 'Структура',
    structureValue: 'От задачи к действию',
    proofState: 'Статус подтверждения',
    proofStateValue: 'Проверенный материал ожидается',
    read: 'Читать инженерный материал',
    empty: 'Нет материала, соответствующего текущему поиску и фильтру.'
  }
} satisfies Record<Locale, Record<string, string>>;

function categoryLabel(page: EngineeringInsightsPageData, categoryId: InsightCategoryId) {
  return page.categories.find((category) => category.id === categoryId)?.label ?? getInsightCategoryLabel(categoryId);
}

function matchesSearch(article: EngineeringInsightsPageData['articles'][number], query: string, page: EngineeringInsightsPageData) {
  if (!query.trim()) {
    return true;
  }

  const needle = query.trim().toLowerCase();

  return [article.title, article.summary, article.primaryKeyword, categoryLabel(page, article.category)]
    .some((value) => value.toLowerCase().includes(needle));
}

export function InsightsIndexPage({locale, page}: Props) {
  const dir = getDirection(locale);
  const labels = uiLabels[locale];
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');
  const visibleArticles = useMemo(
    () =>
      page.articles.filter((article) => {
        const categoryMatches = activeCategory === 'all' || article.category === activeCategory;
        return categoryMatches && matchesSearch(article, searchText, page);
      }),
    [activeCategory, page, searchText]
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
            <strong>{labels.governanceTitle}</strong>
            <p>{labels.governanceText}</p>
          </aside>
        </div>
      </section>

      <section className="insights-library" id="insights-library" data-section="insights_search_and_filter" aria-labelledby="insights-library-title">
        <div className="container-shell insights-library__inner">
          <header className="insight-section-header">
            <div>
              <h2 id="insights-library-title">{labels.libraryTitle}</h2>
              <p>{labels.libraryText}</p>
            </div>
            <span className="insights-count">{visibleArticles.length} {labels.count}</span>
          </header>

          <div className="insights-controls">
            <label className="insights-search">
              <span>{labels.searchLabel}</span>
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder={labels.searchPlaceholder}
                type="search"
              />
            </label>
            <div className="insights-category-filter" aria-label={labels.categoryAria}>
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
                <span>{categoryLabel(page, article.category)}</span>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <dl>
                  <div>
                    <dt>{labels.structure}</dt>
                    <dd>{labels.structureValue}</dd>
                  </div>
                  <div>
                    <dt>{labels.proofState}</dt>
                    <dd>{labels.proofStateValue}</dd>
                  </div>
                </dl>
                {/* track: article_view */}
                <Link href={`/insights/${article.slug}`} className="insight-card-link">
                  {labels.read}
                </Link>
              </article>
            ))}
          </div>

          {visibleArticles.length === 0 ? (
            <p className="insights-empty">{labels.empty}</p>
          ) : null}
        </div>
      </section>
    </article>
  );
}
