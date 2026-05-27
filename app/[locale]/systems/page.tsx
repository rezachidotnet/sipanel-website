import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {SchemaScript} from '@/components/seo/schema-script';
import {getDirection, locales, type Locale, Link} from '@/i18n/routing';
import {buildPageMetadata, type LocalizedRouteMap} from '@/lib/seo/metadata';
import {buildBreadcrumbListSchema, buildCollectionPageSchema, buildOrganizationSchema} from '@/lib/seo/schema';
import {aluminiumCladdingCoveringSpec} from '@/lib/services/aluminium-cladding-covering';
import {sandwichPanelSystemsSpec} from '@/lib/services/sandwich-panel-systems';
import {standingSeamZipTechRoofingSpec} from '@/lib/services/standing-seam-zip-tech-roofing';

type Props = {
  params: {locale: Locale};
};

const routes: LocalizedRouteMap = {
  en: '/en/systems',
  fa: '/fa/systems',
  ar: '/ar/systems',
  ru: '/ru/systems'
};

const copy: Record<Locale, {title: string; description: string; eyebrow: string; listTitle: string; cta: string; home: string}> = {
  en: {
    title: 'SIPANEL System Pages',
    description: 'Explore implemented SIPANEL industrial envelope system pages for panels, roofing, and cladding.',
    eyebrow: 'Industrial Envelope Systems',
    listTitle: 'Industrial Envelope Systems',
    cta: 'Open System',
    home: 'Home'
  },
  fa: {
    title: 'راهکارهای مهندسی‌شده SIPANEL برای پوشش سقف و نما',
    description: 'سیستم‌های پوسته صنعتی SIPANEL برای پانل ساندویچی، سقف‌های ایستادرز و پوشش‌های نمای آلومینیومی با رویکرد مهندسی، کنترل اجرا و بهینه‌سازی عملکرد توسعه یافته‌اند تا پروژه‌های صنعتی با ریسک کمتر، دوام بیشتر و کیفیت اجرایی بالاتر اجرا شوند. این سیستم‌ها از مرحله انتخاب متریال و طراحی جزئیات تا نصب نهایی، بر پایه منطق اجرایی، آب‌بندی کنترل‌شده و هماهنگی دقیق اجزا مدیریت می‌شوند.',
    eyebrow: 'پوشانه ی سازه های صنعتی',
    listTitle: 'پوشانه های صنعتی',
    cta: 'مشاهده سیستم',
    home: 'خانه'
  },
  ar: {
    title: 'صفحات أنظمة SIPANEL',
    description: 'استعرض صفحات أنظمة الغلاف الصناعي من SIPANEL للألواح والتسقيف والكسوة.',
    eyebrow: 'أنظمة الغلاف الصناعي',
    listTitle: 'أنظمة الغلاف الصناعي',
    cta: 'فتح النظام',
    home: 'الرئيسية'
  },
  ru: {
    title: 'Страницы систем SIPANEL',
    description: 'Откройте страницы промышленных ограждающих систем SIPANEL для панелей, кровли и облицовки.',
    eyebrow: 'Промышленные ограждающие системы',
    listTitle: 'Промышленные ограждающие системы',
    cta: 'Открыть систему',
    home: 'Главная'
  }
};

const systems = [
  {
    id: 'sandwich-panel-systems',
    title: sandwichPanelSystemsSpec.hero.h1,
    description: sandwichPanelSystemsSpec.seo.meta_description,
    routes: sandwichPanelSystemsSpec.route
  },
  {
    id: 'standing-seam-zip-tech-roofing',
    title: standingSeamZipTechRoofingSpec.seo.h1,
    description: standingSeamZipTechRoofingSpec.seo.meta_description,
    routes: standingSeamZipTechRoofingSpec.route
  },
  {
    id: 'aluminium-cladding-covering',
    title: aluminiumCladdingCoveringSpec.seo.h1,
    description: aluminiumCladdingCoveringSpec.seo.meta_description,
    routes: aluminiumCladdingCoveringSpec.route
  }
];

function toLocalizedLinkHref(route: string) {
  return route.replace(/^\/(en|fa|ar|ru)/, '');
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Props): Metadata {
  const content = copy[params.locale];

  return buildPageMetadata({
    locale: params.locale,
    title: content.title,
    description: content.description,
    routes
  });
}

function buildCollectionSchema(locale: Locale) {
  const content = copy[locale];

  return buildCollectionPageSchema(locale, `${routes[locale]}#collection`, {
    name: content.title,
    description: content.description,
    url: routes[locale],
    items: systems.map((system) => ({
      name: system.title,
      url: system.routes[locale]
    }))
  });
}

function buildBreadcrumbSchema(locale: Locale) {
  return buildBreadcrumbListSchema(locale, `${routes[locale]}#breadcrumb`, [
    {name: copy[locale].home, item: `/${locale}`},
    {name: copy[locale].title, item: routes[locale]}
  ]);
}

export default function SystemsOverviewPage({params}: Props) {
  setRequestLocale(params.locale);
  const content = copy[params.locale];

  return (
    <article className="seo-page-template" dir={getDirection(params.locale)}>
      <SchemaScript schema={buildCollectionSchema(params.locale)} />
      <SchemaScript schema={buildBreadcrumbSchema(params.locale)} />
      <SchemaScript schema={buildOrganizationSchema(params.locale, `${routes[params.locale]}#organization`)} />
      <section className="seo-hero" aria-labelledby="systems-overview-title">
        <div className="container-shell seo-hero__inner">
          <div className="seo-hero__copy">
            <p className="service-eyebrow">{content.eyebrow}</p>
            <h1 id="systems-overview-title">{content.title}</h1>
            <p>{content.description}</p>
          </div>
        </div>
      </section>

      <section className="seo-section" aria-labelledby="systems-list-title">
        <div className="container-shell seo-section__inner">
          <header>
            <h2 id="systems-list-title">{content.listTitle}</h2>
          </header>
          <div className="service-card-grid">
            {systems.map((system) => (
              <article className="service-card" key={system.id}>
                <h3>{system.title}</h3>
                <p>{system.description}</p>
                <Link href={toLocalizedLinkHref(system.routes[params.locale])} className="seo-inline-link">
                  {content.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
