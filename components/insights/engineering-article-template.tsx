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

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function buildBreadcrumbSchema(locale: Locale, article: EngineeringInsightArticle) {
  return buildBreadcrumbListSchema(locale, `${article.routes[locale]}#breadcrumb`, [
    {name: 'Home', item: getLocalizedPath(locale)},
    {name: 'Insights', item: getLocalizedPath(locale, '/insights')},
    {name: article.title, item: article.routes[locale]}
  ]);
}

function PendingTechnicalProof({article}: {article: EngineeringInsightArticle}) {
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
          Pending verified technical proof
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
                <dt>Category</dt>
                <dd>{getInsightCategoryLabel(article.category)}</dd>
              </div>
              <div>
                <dt>Reading time</dt>
                <dd>{article.readingTime}</dd>
              </div>
              <div>
                <dt>Primary topic</dt>
                <dd>{article.primaryKeyword}</dd>
              </div>
            </dl>
          </div>
          <aside className="insight-article-hero__panel">
            <strong>SEO article structure</strong>
            <ol>
              <li>Problem</li>
              <li>Engineering cause</li>
              <li>SIPANEL solution logic</li>
              <li>Technical proof or diagram</li>
              <li>CTA</li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="insight-section insight-section--light" data-section="problem_context" aria-labelledby="insight-problem-title">
        <div className="container-shell insight-two-column">
          <div>
            <p className="insight-section-label">Problem</p>
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
            <p className="insight-section-label">Engineering cause</p>
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
            <p className="insight-section-label">Technical proof or diagram</p>
            <h2 id="insight-proof-title">Technical proof state</h2>
            <p>No metric, project result, or proof image is shown until a verified asset is attached.</p>
          </header>
          <PendingTechnicalProof article={article} />
        </div>
      </section>

      <section className="insight-section" data-section="execution_logic" aria-labelledby="insight-execution-title">
        <div className="container-shell insight-section__inner">
          <header className="insight-section-header">
            <p className="insight-section-label">SIPANEL solution logic</p>
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
            <h2 id="insight-faq-title">Technical FAQ</h2>
            <Link href="/faq" className="insight-inline-link">
              View complete FAQ
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
            <h2 id="insight-related-resources-title">Related Engineering Resources</h2>
            <Link href="/resources" className="insight-inline-link">
              Open resource hub
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
            <h2 id="insight-related-services-title">Related Services and Insights</h2>
          </header>
          <div className="insight-link-grid">
            {article.relatedServices.map((service) => (
              <LinkCard key={service.href} link={service} />
            ))}
            {article.relatedInsights.map((insight) => (
              <LinkCard key={insight.href} link={insight} />
            ))}
            <LinkCard link={{title: 'Insights Index', href: '/insights', description: 'Return to all engineering insights.'}} />
          </div>
        </div>
      </section>

      <section className="insight-section insight-section--dark" data-section="conversion_cta" aria-labelledby="insight-cta-title">
        <div className="container-shell insight-conversion">
          <div>
            <p className="insight-section-label">CTA</p>
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
