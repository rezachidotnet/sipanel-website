import './insights.css';
import {Link, getDirection, getLocalizedPath, type Locale} from '@/i18n/routing';
import type {EngineeringInsightArticle} from '@/lib/insights/engineering-insights';
import {getInsightCategoryLabel} from '@/lib/insights/engineering-insights';
import {
  buildArticleSchema,
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildOrganizationSchema,
  buildWebPageSchema
} from '@/lib/seo/schema';

type Props = {
  locale: Locale;
  article: EngineeringInsightArticle;
};

const labelsByLocale = {
  fa: {
    home: 'خانه',
    insights: 'بینش‌های مهندسی',
    category: 'دسته',
    readingTime: 'زمان مطالعه',
    primaryTopic: 'موضوع اصلی',
    articleStructure: 'ساختار مقاله فنی',
    structureItems: ['مسئله', 'علت مهندسی', 'منطق راهکار SIPANEL', 'اثبات فنی یا نمودار', 'اقدام'],
    problem: 'مسئله',
    engineeringCause: 'علت مهندسی',
    proofLabel: 'اثبات فنی یا نمودار',
    proofTitle: 'وضعیت اثبات فنی',
    proofText: 'تا زمانی که دارایی تأییدشده پیوست نشده باشد، هیچ عدد، نتیجه پروژه یا تصویر اثباتی نمایش داده نمی‌شود.',
    pendingProof: 'اثبات فنی تأییدشده در انتظار',
    solutionLogic: 'منطق راهکار SIPANEL',
    faq: 'پرسش‌های فنی',
    completeFaq: 'مشاهده FAQ کامل',
    relatedResources: 'منابع مهندسی مرتبط',
    resourceHub: 'باز کردن مرکز منابع',
    relatedServices: 'خدمات و بینش‌های مرتبط',
    insightsIndexTitle: 'فهرست بینش‌ها',
    insightsIndexDescription: 'بازگشت به همه بینش‌های مهندسی.',
    cta: 'اقدام',
    categories: {
      panel_systems: 'سیستم‌های پانلی',
      roofing_waterproofing: 'سقف و آب‌بندی',
      cladding_facades: 'نما و کلادینگ'
    }
  },
  en: {
    home: 'Home',
    insights: 'Insights',
    category: 'Category',
    readingTime: 'Reading time',
    primaryTopic: 'Primary topic',
    articleStructure: 'SEO article structure',
    structureItems: ['Problem', 'Engineering cause', 'SIPANEL solution logic', 'Technical proof or diagram', 'CTA'],
    problem: 'Problem',
    engineeringCause: 'Engineering cause',
    proofLabel: 'Technical proof or diagram',
    proofTitle: 'Technical proof state',
    proofText: 'No metric, project result, or proof image is shown until a verified asset is attached.',
    pendingProof: 'Pending verified technical proof',
    solutionLogic: 'SIPANEL solution logic',
    faq: 'Technical FAQ',
    completeFaq: 'View complete FAQ',
    relatedResources: 'Related Engineering Resources',
    resourceHub: 'Open resource hub',
    relatedServices: 'Related Services and Insights',
    insightsIndexTitle: 'Insights Index',
    insightsIndexDescription: 'Return to all engineering insights.',
    cta: 'CTA',
    categories: {
      panel_systems: 'Panel Systems',
      roofing_waterproofing: 'Roofing and Waterproofing',
      cladding_facades: 'Cladding and Facades'
    }
  },
  ar: {
    home: 'الرئيسية',
    insights: 'رؤى هندسية',
    category: 'الفئة',
    readingTime: 'مدة القراءة',
    primaryTopic: 'الموضوع الرئيسي',
    articleStructure: 'هيكل المقال الفني',
    structureItems: ['المشكلة', 'السبب الهندسي', 'منطق حل SIPANEL', 'الإثبات الفني أو المخطط', 'الإجراء'],
    problem: 'المشكلة',
    engineeringCause: 'السبب الهندسي',
    proofLabel: 'الإثبات الفني أو المخطط',
    proofTitle: 'حالة الإثبات الفني',
    proofText: 'لا يعرض أي رقم أو نتيجة مشروع أو صورة إثبات حتى يتم إرفاق أصل موثق.',
    pendingProof: 'إثبات فني موثق قيد الإعداد',
    solutionLogic: 'منطق حل SIPANEL',
    faq: 'أسئلة فنية شائعة',
    completeFaq: 'عرض FAQ الكامل',
    relatedResources: 'موارد هندسية مرتبطة',
    resourceHub: 'فتح مركز الموارد',
    relatedServices: 'خدمات ورؤى مرتبطة',
    insightsIndexTitle: 'فهرس الرؤى',
    insightsIndexDescription: 'العودة إلى جميع الرؤى الهندسية.',
    cta: 'الإجراء',
    categories: {
      panel_systems: 'أنظمة الألواح',
      roofing_waterproofing: 'الأسقف والعزل المائي',
      cladding_facades: 'الواجهات والكلادينج'
    }
  },
  ru: {
    home: 'Главная',
    insights: 'Инженерные материалы',
    category: 'Категория',
    readingTime: 'Время чтения',
    primaryTopic: 'Основная тема',
    articleStructure: 'Структура технической статьи',
    structureItems: ['Задача', 'Инженерная причина', 'Логика решения SIPANEL', 'Техническое подтверждение или схема', 'Действие'],
    problem: 'Задача',
    engineeringCause: 'Инженерная причина',
    proofLabel: 'Техническое подтверждение или схема',
    proofTitle: 'Статус технического подтверждения',
    proofText: 'Метрика, результат проекта или подтверждающее изображение не показываются, пока не приложен проверенный материал.',
    pendingProof: 'Проверенное техническое подтверждение ожидается',
    solutionLogic: 'Логика решения SIPANEL',
    faq: 'Технические вопросы',
    completeFaq: 'Смотреть полный FAQ',
    relatedResources: 'Связанные инженерные ресурсы',
    resourceHub: 'Открыть центр ресурсов',
    relatedServices: 'Связанные услуги и материалы',
    insightsIndexTitle: 'Индекс материалов',
    insightsIndexDescription: 'Вернуться ко всем инженерным материалам.',
    cta: 'Действие',
    categories: {
      panel_systems: 'Панельные системы',
      roofing_waterproofing: 'Кровля и гидроизоляция',
      cladding_facades: 'Фасады и облицовка'
    }
  }
} satisfies Record<Locale, {
  home: string;
  insights: string;
  category: string;
  readingTime: string;
  primaryTopic: string;
  articleStructure: string;
  structureItems: string[];
  problem: string;
  engineeringCause: string;
  proofLabel: string;
  proofTitle: string;
  proofText: string;
  pendingProof: string;
  solutionLogic: string;
  faq: string;
  completeFaq: string;
  relatedResources: string;
  resourceHub: string;
  relatedServices: string;
  insightsIndexTitle: string;
  insightsIndexDescription: string;
  cta: string;
  categories: Record<string, string>;
}>;

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function buildBreadcrumbSchema(locale: Locale, article: EngineeringInsightArticle) {
  const labels = labelsByLocale[locale];

  return buildBreadcrumbListSchema(locale, `${article.routes[locale]}#breadcrumb`, [
    {name: labels.home, item: getLocalizedPath(locale)},
    {name: labels.insights, item: getLocalizedPath(locale, '/insights')},
    {name: article.title, item: article.routes[locale]}
  ]);
}

function PendingTechnicalProof({article, pendingLabel}: {article: EngineeringInsightArticle; pendingLabel: string}) {
  return (
    <div className="insight-proof" data-proof-status={article.technicalVisual.status}>
      <div className="insight-proof__diagram" aria-label={article.technicalVisual.title} role="img">
        <span />
        <span />
        <span />
      </div>
      <div className="insight-proof__content">
        <strong>{article.technicalVisual.title}</strong>
        <p>{article.technicalVisual.description}</p>
        <ul>
          {article.technicalVisual.callouts.map((callout) => (
            <li key={callout}>{callout}</li>
          ))}
        </ul>
        {/* track: technical_proof_open */}
        <button type="button" disabled aria-disabled="true">
          {pendingLabel}
        </button>
      </div>
    </div>
  );
}

function LinkCard({link}: {link: {title: string; href: string; description?: string}}) {
  return (
    <Link className="insight-link-card" href={link.href}>
      {/* track: related_resource_click */}
      {/* track: related_service_click */}
      {/* track: related_case_study_click */}
      <span>{link.title}</span>
      {link.description ? <p>{link.description}</p> : null}
    </Link>
  );
}

export function EngineeringArticleTemplate({locale, article}: Props) {
  const dir = getDirection(locale);
  const labels = labelsByLocale[locale];
  const categoryLabel = labels.categories[article.category] ?? getInsightCategoryLabel(article.category);

  return (
    <article className="insight-article-page" data-insight-article={article.slug} dir={dir}>
      {/* track: article_view */}
      {/* track: article_scroll_depth */}
      <SchemaPlaceholder schema={buildWebPageSchema(locale, {name: article.title, description: article.metaDescription, url: article.routes[locale]})} />
      <SchemaPlaceholder
        schema={buildArticleSchema(locale, `${article.routes[locale]}#article`, {
          headline: article.title,
          description: article.metaDescription,
          url: article.routes[locale]
        })}
      />
      <SchemaPlaceholder schema={buildBreadcrumbSchema(locale, article)} />
      <SchemaPlaceholder schema={buildFaqPageSchema(locale, `${article.routes[locale]}#faq`, article.faqs)} />
      <SchemaPlaceholder schema={buildOrganizationSchema(locale)} />

      <section className="insight-article-hero" data-section="article_hero" aria-labelledby="insight-article-title">
        <div className="container-shell insight-article-hero__inner">
          <div className="insight-article-hero__copy">
            <p className="insight-eyebrow">{article.eyebrow}</p>
            <h1 id="insight-article-title">{article.title}</h1>
            <p>{article.summary}</p>
            <dl className="insight-article-meta">
              <div>
                <dt>{labels.category}</dt>
                <dd>{categoryLabel}</dd>
              </div>
              <div>
                <dt>{labels.readingTime}</dt>
                <dd>{article.readingTime}</dd>
              </div>
              <div>
                <dt>{labels.primaryTopic}</dt>
                <dd>{article.primaryKeyword}</dd>
              </div>
            </dl>
          </div>
          <aside className="insight-article-hero__panel">
            <strong>{labels.articleStructure}</strong>
            <ol>
              {labels.structureItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="insight-section insight-section--light" data-section="problem_context" aria-labelledby="insight-problem-title">
        <div className="container-shell insight-two-column">
          <div>
            <p className="insight-section-label">{labels.problem}</p>
            <h2 id="insight-problem-title">{article.problemContext.title}</h2>
            <p>{article.problemContext.body}</p>
          </div>
          <ul className="insight-check-list">
            {article.problemContext.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="insight-section" data-section="engineering_explanation" aria-labelledby="insight-cause-title">
        <div className="container-shell insight-two-column">
          <div>
            <p className="insight-section-label">{labels.engineeringCause}</p>
            <h2 id="insight-cause-title">{article.engineeringExplanation.title}</h2>
            <p>{article.engineeringExplanation.body}</p>
          </div>
          <ul className="insight-check-list">
            {article.engineeringExplanation.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="insight-section insight-section--light" data-section="technical_visual_or_diagram" aria-labelledby="insight-proof-title">
        <div className="container-shell insight-section__inner">
          <header className="insight-section-header">
            <p className="insight-section-label">{labels.proofLabel}</p>
            <h2 id="insight-proof-title">{labels.proofTitle}</h2>
            <p>{labels.proofText}</p>
          </header>
          <PendingTechnicalProof article={article} pendingLabel={labels.pendingProof} />
        </div>
      </section>

      <section className="insight-section" data-section="execution_logic" aria-labelledby="insight-execution-title">
        <div className="container-shell insight-section__inner">
          <header className="insight-section-header">
            <p className="insight-section-label">{labels.solutionLogic}</p>
            <h2 id="insight-execution-title">{article.executionLogic.title}</h2>
          </header>
          <div className="insight-step-grid">
            {article.executionLogic.steps.map((step, index) => (
              <article className="insight-step-card" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="insight-section insight-section--light" data-section="faq_section" aria-labelledby="insight-faq-title">
        <div className="container-shell insight-section__inner">
          <header className="insight-section-header">
            <h2 id="insight-faq-title">{labels.faq}</h2>
            <Link href="/faq" className="insight-inline-link">
              {labels.completeFaq}
            </Link>
          </header>
          <div className="insight-faq-list">
            {article.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {/* track: faq_expand */}
                  {faq.question}
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="insight-section" data-section="related_resources" aria-labelledby="insight-related-resources-title">
        <div className="container-shell insight-section__inner">
          <header className="insight-section-header">
            <h2 id="insight-related-resources-title">{labels.relatedResources}</h2>
            <Link href="/resources" className="insight-inline-link">
              {labels.resourceHub}
            </Link>
          </header>
          <div className="insight-link-grid">
            {article.relatedResources.map((resource) => (
              <LinkCard key={resource.href} link={resource} />
            ))}
            {article.relatedProjects.map((project) => (
              <LinkCard key={project.href} link={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="insight-section insight-section--light" data-section="related_services" aria-labelledby="insight-related-services-title">
        <div className="container-shell insight-section__inner">
          <header className="insight-section-header">
            <h2 id="insight-related-services-title">{labels.relatedServices}</h2>
          </header>
          <div className="insight-link-grid">
            {article.relatedServices.map((service) => (
              <LinkCard key={service.href} link={service} />
            ))}
            {article.relatedInsights.map((insight) => (
              <LinkCard key={insight.href} link={insight} />
            ))}
            <LinkCard link={{title: labels.insightsIndexTitle, href: '/insights', description: labels.insightsIndexDescription}} />
          </div>
        </div>
      </section>

      <section className="insight-section insight-section--dark" data-section="conversion_cta" aria-labelledby="insight-cta-title">
        <div className="container-shell insight-conversion">
          <div>
            <p className="insight-section-label">{labels.cta}</p>
            <h2 id="insight-cta-title">{article.conversionCta.headline}</h2>
            <p>{article.conversionCta.text}</p>
          </div>
          <div className="insight-conversion__actions">
            {/* track: rfq_start */}
            <Link className="button-primary" href="/contact#rfq-form">
              {article.conversionCta.primaryCta}
            </Link>
            <Link className="button-secondary" href="/resources">
              {article.conversionCta.secondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
