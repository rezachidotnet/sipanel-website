'use client';

import Image from 'next/image';
import {useState} from 'react';
import {LtrText} from '@/components/bidi/ltr-text';
import {Link, getDirection, type Locale} from '@/i18n/routing';
import {
  buildAboutBreadcrumbSchema,
  buildAboutOrganizationSchema,
  buildAboutPageSchema,
  type AboutLocaleContent,
  type AboutPageData
} from '@/lib/about/about-page';
import aboutHeroMain from '@/assets/projects/mahshahr_taxi/photos/mahshahr_taxi-hero-desktop.webp';
import aboutHeroSmallB from '@/assets/projects/tabas/photos/tabas-card.webp';
import aboutHeroSmallC from '@/assets/projects/megaparsmall-atrium/photos/megaparsmall-atrium-card.webp';

type Props = {
  locale: Locale;
  page: AboutPageData;
};

type SectionProps = {
  locale: Locale;
  content: AboutLocaleContent;
};

function SchemaPlaceholder({schema}: {schema: unknown}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />;
}

function LinkedPersianText({text}: {text: string}) {
  const phrase = 'فضاسازه نقش جهان';
  const parts = text.split(phrase);

  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? (
        <a className="about-inline-link" href="https://www.fazasazeh.ir" target="_blank" rel="noopener noreferrer">
          {phrase}
        </a>
      ) : null}
    </span>
  ));
}

function ProjectPhotoCollage({alt}: {alt: string}) {
  return (
    <div className="about-story__collage" aria-label={alt}>
      <div className="about-story__collage-main">
        <Image src={aboutHeroMain} alt={alt} fill priority sizes="(max-width: 767px) 100vw, 36vw" />
      </div>
      <div className="about-story__collage-stack">
        <div>
          <Image src={aboutHeroSmallB} alt={alt} fill sizes="(max-width: 767px) 50vw, 16vw" />
        </div>
        <div>
          <Image src={aboutHeroSmallC} alt={alt} fill sizes="(max-width: 767px) 50vw, 16vw" />
        </div>
      </div>
    </div>
  );
}

function CorePrinciplesAccordion({locale, title, principles}: {locale: Locale; title: string; principles: Array<{title: string; description: string}>}) {
  const [active, setActive] = useState(principles[0]?.title ?? '');
  const dir = getDirection(locale);

  return (
    <div className="about-principles" dir={dir}>
      <header className="about-section__header">
        <h2>{title}</h2>
      </header>
      <div className="about-principles__grid">
        {principles.map((principle, index) => {
          const isOpen = active === principle.title;

          return (
            <article className={isOpen ? 'about-principle-card is-open' : 'about-principle-card'} key={principle.title}>
              <h3>
                <button
                  aria-expanded={isOpen}
                  className="about-principle-card__button"
                  onClick={() => setActive((current) => (current === principle.title ? '' : principle.title))}
                  type="button"
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {principle.title}
                </button>
              </h3>
              <div className="about-principle-card__panel" hidden={!isOpen}>
                <p>{principle.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function HeritageHeroSection({content}: SectionProps) {
  const heritageParagraphs = content.companyStory.paragraphs ?? [];
  const hasHeritageStory = heritageParagraphs.length > 0;
  const supportingText =
    'سی‌پانل با تکیه بر تجربه اجرایی مدیران فضاسازه نقش جهان، راهکارهای مهندسی‌شده پوشش صنعتی را برای کاهش ریسک اجرا، کنترل کیفیت و بهینه‌سازی عملکرد پروژه‌ها توسعه داده است.';

  return (
    <section className="about-section about-section--heritage about-heritage-hero" data-section="heritage_hero" aria-labelledby="about-page-title">
      <div className="container-shell about-section__inner about-story">
        <div className="about-story__copy">
          <p className="about-eyebrow">{content.hero.eyebrow}</p>
          <h1 id="about-page-title" className="about-story__headline">
            {hasHeritageStory ? content.companyStory.title : content.hero.h1}
          </h1>
          <p className="about-story__intro">
            {hasHeritageStory ? <LinkedPersianText text={supportingText} /> : content.hero.subheadline}
          </p>
          <Link href="/contact" className="button-primary about-story__cta">
            {content.hero.primaryCta}
          </Link>
          <p className={hasHeritageStory ? 'about-story__kicker' : 'about-story__lead'} id="about-story-title">
            {hasHeritageStory ? <LinkedPersianText text={content.companyStory.lead} /> : content.companyStory.lead}
          </p>
        </div>

        <div className="about-story__visual">
          {hasHeritageStory ? (
            <ProjectPhotoCollage alt={content.companyStory.visual.alt} />
          ) : (
            <div className="about-story__image">
              <Image src={content.companyStory.visual.image} alt={content.companyStory.visual.alt} fill sizes="(max-width: 767px) 100vw, 40vw" />
            </div>
          )}
          <div className="about-story__visual-note">
            <strong>SIPANEL</strong>
            <p>{content.hero.trustMicrocopy}</p>
          </div>
        </div>

        <div className="about-story__body">
          {hasHeritageStory ? (
            <div className="about-story__paragraphs">
              {heritageParagraphs.map((paragraph) => (
                <p key={paragraph}>
                  <LinkedPersianText text={paragraph} />
                </p>
              ))}
            </div>
          ) : null}
          {!hasHeritageStory ? (
            <div className="about-story__points">
              {content.companyStory.points.map((point) => (
                <article className="about-story__point" key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </article>
              ))}
            </div>
          ) : null}
          {content.companyStory.heritageItems?.length ? (
            <div className="about-story__timeline" aria-label={content.companyStory.title}>
              {content.companyStory.heritageItems.map((item) => (
                <article className="about-story__timeline-item" key={`${item.label}-${item.title}`}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>
                    <LinkedPersianText text={item.description} />
                  </p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CorePrinciplesSection({locale, content}: SectionProps) {
  return (
    <section className="about-section about-section--light" data-section="core_principles" aria-labelledby="about-principles-title">
      <div className="container-shell about-section__inner">
        <CorePrinciplesAccordion locale={locale} title={content.corePrinciples.title} principles={content.corePrinciples.principles} />
      </div>
    </section>
  );
}

function SystemsOverviewSection({content}: {content: AboutLocaleContent}) {
  return (
    <section className="about-section" data-section="systems_overview" aria-labelledby="about-systems-title" id="systems-overview">
      <div className="container-shell about-section__inner">
        <header className="about-section__header">
          <h2 id="about-systems-title">{content.systemsOverview.title}</h2>
        </header>
        <div className="service-card-grid about-systems-grid">
          {content.systemsOverview.systems.map((system) => (
            <article className="service-card about-system-card" key={system.title}>
              <h3>{system.title}</h3>
              <p>{system.description}</p>
              {/* track: system_card_click */}
              <Link href={system.href} className="about-system-card__link">
                {system.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowProcessSection({content}: {content: AboutLocaleContent}) {
  return (
    <section className="about-section about-section--light" data-section="workflow_process" aria-labelledby="about-workflow-title">
      <div className="container-shell about-section__inner">
        <header className="about-section__header">
          <h2 id="about-workflow-title">{content.workflowProcess.title}</h2>
        </header>
        <div className="service-process-list about-workflow-list">
          {content.workflowProcess.steps.map((step, index) => (
            <article className="service-process-item about-process-item" key={step.title}>
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
  );
}

function FinalCTASection({content, page}: {content: AboutLocaleContent; page: AboutPageData}) {
  return (
    <section className="about-section about-conversion" data-section="conversion_cta" aria-labelledby="about-conversion-title">
      <div className="container-shell about-conversion__inner">
        <div className="about-conversion__copy">
          <h2 id="about-conversion-title">{content.conversionCta.headline}</h2>
          <p>{content.conversionCta.text}</p>
          <span>{content.conversionCta.contactHint}</span>
        </div>
        <div className="about-conversion__actions">
          {/* track: consultation_cta_click */}
          <Link href="/contact#rfq-form" className="button-primary">
            {content.conversionCta.primaryCta}
          </Link>
          {/* track: whatsapp_click */}
          <a className="button-secondary" href={`https://wa.me/${page.contact.whatsapp.replace(/\D/g, '')}`}>
            {content.conversionCta.secondaryCta}
          </a>
          <div className="about-conversion__contact">
            {/* track: phone_click */}
            <LtrText as="a" href={`tel:${page.contact.phone.replace(/\s/g, '')}`}>{page.contact.phone}</LtrText>
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyMobileCTA({content, page}: {content: AboutLocaleContent; page: AboutPageData}) {
  return (
    <div className="about-sticky-cta">
      {/* track: consultation_cta_click */}
      <Link href="/contact#rfq-form">{content.stickyMobileCta.label}</Link>
      {/* track: whatsapp_click */}
      <a href={`https://wa.me/${page.contact.whatsapp.replace(/\D/g, '')}`}>{content.stickyMobileCta.secondaryAction}</a>
    </div>
  );
}

export function AboutPage({locale, page}: Props) {
  const dir = getDirection(locale);
  const content = page.localeContent[locale];

  return (
    <article className="about-page" data-about-page="" dir={dir}>
      <SchemaPlaceholder schema={buildAboutPageSchema(locale)} />
      <SchemaPlaceholder schema={buildAboutBreadcrumbSchema(locale)} />
      <SchemaPlaceholder schema={buildAboutOrganizationSchema(locale)} />

      <HeritageHeroSection locale={locale} content={content} />
      <CorePrinciplesSection locale={locale} content={content} />
      <SystemsOverviewSection content={content} />
      <WorkflowProcessSection content={content} />
      <FinalCTASection content={content} page={page} />
      <StickyMobileCTA content={content} page={page} />
    </article>
  );
}
