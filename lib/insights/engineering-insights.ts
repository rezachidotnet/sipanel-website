import type {Metadata} from 'next';
import {getLocalizedPath, locales, type Locale} from '@/i18n/routing';
import {buildPageMetadata, type LocalizedRouteMap} from '@/lib/seo/metadata';
import {getEngineeringResourceHubPage} from '@/lib/resources/engineering-resource-hub';
import {caseStudyPages} from '@/lib/case-studies/case-study-pages';
import {insightArticleFileSchema, type InsightArticleFile} from '@/lib/insights/content-schema';
import {rawInsightArticleFiles} from '@/lib/insights/articles.generated';
import {
  getInsightCategoryLabel,
  insightCategoryIds,
  insightSystems,
  type InsightCategoryId
} from '@/lib/insights/systems';

export type {InsightCategoryId} from '@/lib/insights/systems';
export {getInsightCategoryLabel} from '@/lib/insights/systems';

export type EngineeringInsightFaq = {
  question: string;
  answer: string;
};

export type EngineeringInsightLink = {
  title: string;
  href: string;
  description?: string;
};

export type EngineeringInsightArticle = {
  slug: string;
  category: InsightCategoryId;
  routes: LocalizedRouteMap;
  publishedAt: string;
  updatedAt: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  eyebrow: string;
  summary: string;
  readingTime: string;
  problemContext: {
    title: string;
    body: string;
    points: string[];
  };
  engineeringExplanation: {
    title: string;
    body: string;
    points: string[];
  };
  technicalVisual: {
    title: string;
    description: string;
    status: 'pending_technical_proof';
    callouts: string[];
  };
  executionLogic: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  faqs: EngineeringInsightFaq[];
  /** Stable analytics id suffixes, one per FAQ, identical across locales. */
  faqIds: string[];
  relatedResources: EngineeringInsightLink[];
  relatedServices: EngineeringInsightLink[];
  relatedProjects: EngineeringInsightLink[];
  relatedInsights: EngineeringInsightLink[];
  conversionCta: {
    headline: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export type EngineeringInsightsPageData = {
  routes: LocalizedRouteMap;
  seo: {
    title: string;
    metaDescription: string;
    h1: string;
  };
  hero: {
    eyebrow: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  categories: Array<{
    id: InsightCategoryId | 'all';
    label: string;
  }>;
  articles: EngineeringInsightArticle[];
};

/* -------------------------------------------------------------------------- */
/* Content source: content/insights/*.json (validated at build time)          */
/* -------------------------------------------------------------------------- */

function parseInsightFiles(): InsightArticleFile[] {
  const files = rawInsightArticleFiles.map((raw, index) => {
    const result = insightArticleFileSchema.safeParse(raw);
    if (!result.success) {
      const slug = (raw as {slug?: string})?.slug ?? `#${index}`;
      throw new Error(`Invalid insight content file "${slug}": ${result.error.message}`);
    }
    return result.data;
  });

  const seen = new Set<string>();
  for (const file of files) {
    if (seen.has(file.slug)) throw new Error(`Duplicate insight slug "${file.slug}".`);
    seen.add(file.slug);
  }

  return files
    .filter((file) => file.status === 'published')
    .sort((a, b) => (a.publishedAt === b.publishedAt ? a.slug.localeCompare(b.slug) : b.publishedAt.localeCompare(a.publishedAt)));
}

const insightFiles: InsightArticleFile[] = parseInsightFiles();
const insightFilesBySlug = new Map(insightFiles.map((file) => [file.slug, file]));

/* -------------------------------------------------------------------------- */
/* Locale labels                                                              */
/* -------------------------------------------------------------------------- */

type InsightLocaleLabels = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  subheadline: string;
  all: string;
  articleEyebrow: string;
  cta: string;
  secondary: string;
  projectsTitle: string;
  projectsDescription: string;
  pendingResource: string;
  articleTitleSuffix: string;
};

const insightLocaleLabels: Record<Locale, InsightLocaleLabels> = {
  en: {
    seoTitle: 'Engineering Insights | SIPANEL',
    metaDescription:
      'Technical engineering insights on sandwich panels, standing seam roofing, aluminium cladding, daylighting, tensile membranes, retractable roofs, and ETFE systems.',
    h1: 'Engineering Insights',
    eyebrow: 'SIPANEL Engineering',
    subheadline:
      'Technical articles focused on problem context, engineering cause, SIPANEL execution logic, pending proof states, and internal project resources.',
    all: 'All Topics',
    articleEyebrow: 'Engineering Insight',
    cta: 'Request Technical Consultation',
    secondary: 'View Related Resources',
    projectsTitle: 'Project Proof',
    projectsDescription: 'Review verified SIPANEL project references without invented results.',
    pendingResource: 'Pending verified downloadable resource.',
    articleTitleSuffix: 'SIPANEL Engineering Insight'
  },
  fa: {
    seoTitle: 'بینش‌های مهندسی | SIPANEL',
    metaDescription:
      'مقاله‌های فنی سی‌پانل درباره ساندویچ پانل، سقف استندینگ سیم، نمای آلومینیومی، نورگیر، سازه پارچه‌ای کششی، سقف متحرک و پوشش ETFE.',
    h1: 'بینش‌های مهندسی',
    eyebrow: 'مهندسی SIPANEL',
    subheadline: 'مقاله‌های فنی درباره مسئله پروژه، علت مهندسی، منطق اجرای سی‌پانل، وضعیت اثبات و منابع داخلی.',
    all: 'همه موضوعات',
    articleEyebrow: 'بینش مهندسی',
    cta: 'درخواست مشاوره فنی',
    secondary: 'مشاهده منابع مرتبط',
    projectsTitle: 'شواهد پروژه‌ای',
    projectsDescription: 'مرور پروژه‌های تأییدشده سی‌پانل بدون نتیجه‌سازی.',
    pendingResource: 'فایل قابل دانلود تأییدشده در انتظار.',
    articleTitleSuffix: 'بینش مهندسی SIPANEL'
  },
  ar: {
    seoTitle: 'رؤى هندسية | SIPANEL',
    metaDescription:
      'مقالات فنية من SIPANEL حول ألواح الساندويتش وأسقف ستاندينغ سيم والكسوة بالألمنيوم والإنارة الطبيعية والأغشية الشدية والأسقف المتحركة وأنظمة ETFE.',
    h1: 'رؤى هندسية',
    eyebrow: 'هندسة SIPANEL',
    subheadline: 'مقالات فنية حول سياق المشكلة والسبب الهندسي ومنطق تنفيذ SIPANEL وحالة الإثبات والموارد الداخلية.',
    all: 'كل الموضوعات',
    articleEyebrow: 'رؤية هندسية',
    cta: 'اطلب استشارة فنية',
    secondary: 'عرض الموارد المرتبطة',
    projectsTitle: 'إثباتات المشاريع',
    projectsDescription: 'راجع مراجع مشاريع SIPANEL الموثقة دون نتائج مختلقة.',
    pendingResource: 'مورد قابل للتنزيل موثق قيد الإعداد.',
    articleTitleSuffix: 'رؤية هندسية SIPANEL'
  },
  ru: {
    seoTitle: 'Инженерные материалы | SIPANEL',
    metaDescription:
      'Технические статьи SIPANEL о сэндвич-панелях, фальцевой кровле, алюминиевой облицовке, зенитных фонарях, мембранных конструкциях, раздвижных кровлях и ETFE.',
    h1: 'Инженерные материалы',
    eyebrow: 'Инженерия SIPANEL',
    subheadline: 'Технические статьи о контексте задачи, инженерной причине, логике выполнения SIPANEL, статусе подтверждений и внутренних ресурсах.',
    all: 'Все темы',
    articleEyebrow: 'Инженерный материал',
    cta: 'Запросить техническую консультацию',
    secondary: 'Смотреть связанные ресурсы',
    projectsTitle: 'Проектные подтверждения',
    projectsDescription: 'Проверенные проекты SIPANEL без вымышленных результатов.',
    pendingResource: 'Проверенный файл для скачивания ожидается.',
    articleTitleSuffix: 'Инженерный материал SIPANEL'
  }
};

function toLocaleDigits(value: number, locale: Locale) {
  if (locale === 'fa') return value.toLocaleString('fa-IR');
  if (locale === 'ar') return value.toLocaleString('ar-EG');
  return String(value);
}

function formatReadingTime(minutes: number, locale: Locale) {
  const n = toLocaleDigits(minutes, locale);
  switch (locale) {
    case 'fa':
      return `${n} دقیقه مطالعه فنی`;
    case 'ar':
      return minutes <= 10 ? `قراءة فنية ${n} دقائق` : `قراءة فنية ${n} دقيقة`;
    case 'ru': {
      const mod10 = minutes % 10;
      const mod100 = minutes % 100;
      const word = mod10 === 1 && mod100 !== 11 ? 'минута' : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 'минуты' : 'минут';
      return `${minutes} ${word} технического чтения`;
    }
    default:
      return `${minutes} min technical read`;
  }
}

/* -------------------------------------------------------------------------- */
/* Related links                                                              */
/* -------------------------------------------------------------------------- */

function articleRoute(slug: string): LocalizedRouteMap {
  return Object.fromEntries(locales.map((locale) => [locale, getLocalizedPath(locale, `/insights/${slug}`)])) as LocalizedRouteMap;
}

function resolveRelatedResources(file: InsightArticleFile, locale: Locale): EngineeringInsightLink[] {
  const resources = getEngineeringResourceHubPage().localeContent[locale].featuredResources;
  const systemHref = insightSystems[file.category].href;

  const explicit = file.relatedResources
    .map((slug) => resources.find((resource) => resource.slug === slug))
    .filter((resource): resource is NonNullable<typeof resource> => Boolean(resource));
  const bySystem = resources.filter((resource) => resource.relatedServiceHref === systemHref);
  const selected = explicit.length > 0 ? explicit : bySystem.length > 0 ? bySystem.slice(0, 2) : resources.slice(0, 2);

  return selected.map((resource) => ({
    title: resource.title,
    href: `/resources/${resource.slug}`,
    description: resource.assetStatus === 'pending_resource_file' ? insightLocaleLabels[locale].pendingResource : resource.description
  }));
}

function resolveRelatedProjects(file: InsightArticleFile, locale: Locale): EngineeringInsightLink[] {
  const projects = file.relatedProjects
    .map((slug) => caseStudyPages[slug])
    .filter((page): page is NonNullable<typeof page> => Boolean(page))
    .map((page) => ({
      title: page.localeContent[locale].hero.projectName,
      href: `/projects/${page.slug}`,
      description: page.localeContent[locale].hero.projectType
    }));

  if (projects.length > 0) return projects;

  const labels = insightLocaleLabels[locale];
  return [{title: labels.projectsTitle, href: '/projects', description: labels.projectsDescription}];
}

function resolveRelatedInsights(file: InsightArticleFile, locale: Locale): EngineeringInsightLink[] {
  const explicit = file.relatedInsights
    .map((slug) => insightFilesBySlug.get(slug))
    .filter((item): item is InsightArticleFile => Boolean(item) && item?.slug !== file.slug);
  const sameCategory = insightFiles.filter((item) => item.category === file.category && item.slug !== file.slug);
  const recent = insightFiles.filter((item) => item.slug !== file.slug);

  const picked: InsightArticleFile[] = [];
  for (const item of [...explicit, ...sameCategory, ...recent]) {
    if (picked.length >= 3) break;
    if (!picked.some((existing) => existing.slug === item.slug)) picked.push(item);
  }

  return picked.map((item) => ({title: item.locales[locale].title, href: `/insights/${item.slug}`}));
}

function toArticle(file: InsightArticleFile, locale: Locale): EngineeringInsightArticle {
  const content = file.locales[locale];
  const labels = insightLocaleLabels[locale];
  const system = insightSystems[file.category];

  return {
    slug: file.slug,
    category: file.category,
    routes: articleRoute(file.slug),
    publishedAt: file.publishedAt,
    updatedAt: file.updatedAt,
    title: content.title,
    metaDescription: content.metaDescription,
    primaryKeyword: content.primaryKeyword,
    eyebrow: labels.articleEyebrow,
    summary: content.summary,
    readingTime: formatReadingTime(content.readingMinutes, locale),
    problemContext: content.problem,
    engineeringExplanation: content.cause,
    technicalVisual: {...content.visual, status: 'pending_technical_proof'},
    executionLogic: content.execution,
    faqs: content.faqs,
    faqIds: file.faqIds,
    relatedResources: resolveRelatedResources(file, locale),
    relatedServices: [{title: system.serviceTitle[locale], href: system.href, description: system.serviceDescription[locale]}],
    relatedProjects: resolveRelatedProjects(file, locale),
    relatedInsights: resolveRelatedInsights(file, locale),
    conversionCta: {
      headline: content.cta.headline,
      text: content.cta.text,
      primaryCta: labels.cta,
      secondaryCta: labels.secondary
    }
  };
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

const routes: LocalizedRouteMap = {
  en: getLocalizedPath('en', '/insights'),
  fa: getLocalizedPath('fa', '/insights'),
  ar: getLocalizedPath('ar', '/insights'),
  ru: getLocalizedPath('ru', '/insights')
};

/** English articles; routes/dates are locale-independent (used by the sitemap). */
export const engineeringInsightArticles: EngineeringInsightArticle[] = insightFiles.map((file) => toArticle(file, 'en'));

export function getEngineeringInsightsPage(locale: Locale = 'en'): EngineeringInsightsPageData {
  const labels = insightLocaleLabels[locale];
  const usedCategories = new Set(insightFiles.map((file) => file.category));

  return {
    routes,
    seo: {
      title: labels.seoTitle,
      metaDescription: labels.metaDescription,
      h1: labels.h1
    },
    hero: {
      eyebrow: labels.eyebrow,
      subheadline: labels.subheadline,
      primaryCta: locale === 'en' ? 'Browse Technical Articles' : labels.cta,
      secondaryCta: locale === 'en' ? 'Request Technical Consultation' : labels.secondary
    },
    categories: [
      {id: 'all', label: labels.all},
      ...insightCategoryIds
        .filter((id) => usedCategories.has(id))
        .map((id) => ({id, label: getInsightCategoryLabel(id, locale)}))
    ],
    articles: insightFiles.map((file) => toArticle(file, locale))
  };
}

export const engineeringInsightsPage: EngineeringInsightsPageData = getEngineeringInsightsPage('en');

export function getEngineeringInsightsMetadata(locale: Locale) {
  const page = getEngineeringInsightsPage(locale);

  return buildPageMetadata({
    locale,
    title: page.seo.title,
    description: page.seo.metaDescription,
    routes: page.routes
  });
}

export function getEngineeringInsightArticle(locale: Locale, slug: string) {
  const file = insightFilesBySlug.get(slug);
  return file ? toArticle(file, locale) : null;
}

export function getEngineeringInsightArticleMetadata(locale: Locale, slug: string): Metadata | null {
  const article = getEngineeringInsightArticle(locale, slug);

  if (!article) {
    return null;
  }

  const metadata = buildPageMetadata({
    locale,
    title: `${article.title} | ${insightLocaleLabels[locale].articleTitleSuffix}`,
    description: article.metaDescription,
    routes: article.routes,
    type: 'article'
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt
    }
  };
}

export function getAllEngineeringInsightStaticParams() {
  return locales.flatMap((locale) => insightFiles.map((file) => ({locale, slug: file.slug})));
}
