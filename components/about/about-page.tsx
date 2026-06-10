'use client';

import Image from 'next/image';
import {Link, getDirection, type Locale} from '@/i18n/routing';
import {
  buildAboutBreadcrumbSchema,
  buildAboutOrganizationSchema,
  buildAboutPageSchema,
  type AboutLocaleContent,
  type AboutPageData
} from '@/lib/about/about-page';
import leadershipPhoto from '@/assets/about/leadership/am-taleghani.webp';

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

function UnifiedExecutionApproachSection({content}: SectionProps) {
  return (
    <section className="about-section about-section--light" data-section="execution_approach" aria-labelledby="about-approach-title">
      <div className="container-shell about-section__inner">
        <header className="about-section__header">
          <h2 id="about-approach-title">{content.executionApproach.title}</h2>
          <p>{content.executionApproach.intro}</p>
        </header>
        <div className="about-approach-grid">
          {content.executionApproach.pillars.map((pillar, index) => (
            <article className="about-approach-card" key={pillar.title}>
              <span className="about-approach-card__number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipSection({content}: SectionProps) {
  return (
    <section className="about-section" data-section="leadership" aria-labelledby="about-leadership-title">
      <div className="container-shell about-section__inner">
        <header className="about-section__header">
          <h2 id="about-leadership-title">{content.leadership.title}</h2>
        </header>
        <div className="about-leadership">
          <div className="about-leadership__photo">
            {/* TODO: Replace with final approved founder portrait when available */}
            <Image
              src={leadershipPhoto}
              alt={content.leadership.imageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 280px"
            />
          </div>
          <div className="about-leadership__content">
            <h3>{content.leadership.name}</h3>
            <span className="about-leadership__role">{content.leadership.role}</span>
            <p>{content.leadership.bio}</p>
          </div>
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
          {/* track: phone_click */}
          <a className="button-secondary" href={`tel:${page.contact.phone.replace(/\s/g, '')}`}>
            {content.conversionCta.phoneCta}
          </a>
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
      <UnifiedExecutionApproachSection locale={locale} content={content} />
      <LeadershipSection locale={locale} content={content} />
      <FinalCTASection content={content} page={page} />
      <StickyMobileCTA content={content} page={page} />
    </article>
  );
}
