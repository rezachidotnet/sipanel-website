import {getLocalizedPath, locales, type Locale} from '@/i18n/routing';
import {buildPageMetadata, type LocalizedRouteMap} from '@/lib/seo/metadata';
import {getEngineeringResourceHubPage, type ResourceHubCard} from '@/lib/resources/engineering-resource-hub';

export type InsightCategoryId = 'panel_systems' | 'roofing_waterproofing' | 'cladding_facades';

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

const routes: LocalizedRouteMap = {
  en: getLocalizedPath('en', '/insights'),
  fa: getLocalizedPath('fa', '/insights'),
  ar: getLocalizedPath('ar', '/insights'),
  ru: getLocalizedPath('ru', '/insights')
};

const categoryLabels: Record<InsightCategoryId, string> = {
  panel_systems: 'Panel Systems',
  roofing_waterproofing: 'Roofing and Waterproofing',
  cladding_facades: 'Cladding and Facades'
};

const resources = getEngineeringResourceHubPage().localeContent.en.featuredResources;

function relatedResourceLinks(category: InsightCategoryId): EngineeringInsightLink[] {
  const byCategory = resources.filter((resource) => (resource.category as string) === category).slice(0, 2);
  const fallback = resources.filter((resource) => !byCategory.some((item) => item.slug === resource.slug)).slice(0, 2);
  const selected: ResourceHubCard[] = byCategory.length > 0 ? byCategory : fallback;

  return selected.map((resource) => ({
    title: resource.title,
    href: `/resources/${resource.slug}`,
    description: resource.assetStatus === 'pending_resource_file' ? 'Pending verified downloadable resource.' : resource.description
  }));
}

function articleRoute(slug: string): LocalizedRouteMap {
  return Object.fromEntries(locales.map((locale) => [locale, getLocalizedPath(locale, `/insights/${slug}`)])) as LocalizedRouteMap;
}

export const engineeringInsightArticles: EngineeringInsightArticle[] = [
  {
    slug: 'sandwich-panel-joint-leakage-risk',
    category: 'panel_systems',
    routes: articleRoute('sandwich-panel-joint-leakage-risk'),
    title: 'Why Sandwich Panel Joint Logic Controls Leakage Risk',
    metaDescription:
      'Engineering explanation of sandwich panel joint leakage risk, installation causes, SIPANEL coordination logic, and pending technical proof placeholders.',
    primaryKeyword: 'sandwich panel joint leakage risk',
    eyebrow: 'Engineering Insight',
    summary:
      'Panel leakage risk is usually controlled by joint geometry, accessory coordination, and installation sequence before material ordering, not by panel selection alone.',
    readingTime: '6 min technical read',
    problemContext: {
      title: 'Problem',
      body:
        'Industrial panel projects can treat the panel as the only performance item. In practice, water path control depends on how joints, trims, fasteners, openings, and transitions are coordinated before execution starts.',
      points: [
        'Panel type and thickness do not solve an unresolved joint path.',
        'Uncoordinated accessories can create leakage points at edges and openings.',
        'Installation sequence affects how overlaps and seal lines behave on site.'
      ]
    },
    engineeringExplanation: {
      title: 'Engineering cause',
      body:
        'Leakage risk increases when the joint is detailed as a product boundary instead of an envelope system. The technical review must connect panel layout, flashing geometry, fastener position, tolerance, and site access.',
      points: [
        'Joint geometry defines where water can enter, drain, or be blocked.',
        'Fastener and trim positions must respect the panel module and substrate condition.',
        'Openings need a separate edge logic because they interrupt the normal water path.'
      ]
    },
    technicalVisual: {
      title: 'Pending panel joint proof diagram',
      description:
        'A verified joint-section diagram should show panel engagement, flashing return, fastening line, and water path. The asset is intentionally pending until a real reviewed diagram is attached.',
      status: 'pending_technical_proof',
      callouts: ['Water path control', 'Fastener line review', 'Opening edge logic']
    },
    executionLogic: {
      title: 'SIPANEL solution logic',
      steps: [
        {title: 'Review panel layout', description: 'Confirm module direction, opening positions, edge conditions, and installable lengths before procurement.'},
        {title: 'Coordinate accessories', description: 'Define trims, flashings, fasteners, and sealant interfaces as part of the envelope system.'},
        {title: 'Control installation sequence', description: 'Align site execution with the reviewed joint and transition logic before panels are fixed.'}
      ]
    },
    faqs: [
      {
        question: 'Can a higher-grade panel remove leakage risk by itself?',
        answer:
          'No. Panel specification helps, but leakage risk still depends on joint detailing, flashing continuity, penetrations, and installation control.'
      },
      {
        question: 'When should joint logic be reviewed?',
        answer:
          'The review should happen before material ordering because accessory gaps and layout conflicts become more expensive after procurement.'
      }
    ],
    relatedResources: relatedResourceLinks('panel_systems'),
    relatedServices: [{title: 'Sandwich Panel Systems', href: '/systems/sandwich-panel-systems', description: 'Panel selection, procurement coordination, and installation control.'}],
    relatedProjects: [{title: 'Project Proof', href: '/projects', description: 'Review verified SIPANEL project references without invented results.'}],
    relatedInsights: [{title: 'Standing seam roof drainage logic', href: '/insights/standing-seam-roof-drainage-logic'}],
    conversionCta: {
      headline: 'Review panel joint logic before procurement',
      text: 'Send the project scope for an engineering review focused on layout, accessories, and execution risk.',
      primaryCta: 'Request Technical Consultation',
      secondaryCta: 'View Related Resources'
    }
  },
  {
    slug: 'standing-seam-roof-drainage-logic',
    category: 'roofing_waterproofing',
    routes: articleRoute('standing-seam-roof-drainage-logic'),
    title: 'Standing Seam Roof Drainage Logic Before Execution',
    metaDescription:
      'Technical article on standing seam roof drainage logic, engineering causes of waterproofing risk, SIPANEL execution control, and pending proof assets.',
    primaryKeyword: 'standing seam roof drainage logic',
    eyebrow: 'Engineering Insight',
    summary:
      'Roof performance depends on slope, drainage path, seam continuity, gutter capacity, penetrations, and edge transitions being resolved before installation begins.',
    readingTime: '7 min technical read',
    problemContext: {
      title: 'Problem',
      body:
        'A standing seam roof can fail operationally when drainage behavior is reviewed too late. The roof surface, gutter line, penetrations, and edge details must work as one controlled water path.',
      points: [
        'Low-slope areas can hold water when drainage is not coordinated.',
        'Penetrations interrupt seam continuity and require specific flashing logic.',
        'Gutters and edge transitions must match the actual roof geometry.'
      ]
    },
    engineeringExplanation: {
      title: 'Engineering cause',
      body:
        'Waterproofing risk is created when the roof is detailed as isolated parts. Drainage behavior must be checked from high point to discharge point, including seams, laps, penetrations, gutters, and maintenance access.',
      points: [
        'Slope controls flow speed and standing-water exposure.',
        'Seam and flashing continuity controls where water can migrate under wind or backflow conditions.',
        'Installation sequence controls whether details remain accessible and verifiable.'
      ]
    },
    technicalVisual: {
      title: 'Pending roof drainage proof diagram',
      description:
        'A verified drainage diagram should identify slope direction, seam continuity, gutter collection, penetration flashing, and discharge logic. The technical proof asset is pending.',
      status: 'pending_technical_proof',
      callouts: ['Slope direction', 'Penetration flashing', 'Gutter discharge logic']
    },
    executionLogic: {
      title: 'SIPANEL solution logic',
      steps: [
        {title: 'Map the drainage path', description: 'Review slope, water movement, gutter position, and roof edges before shop drawing approval.'},
        {title: 'Resolve interruptions', description: 'Coordinate penetrations, upstands, overlaps, flashings, and service access before roof work starts.'},
        {title: 'Verify execution checkpoints', description: 'Use installation checkpoints for seam continuity, edge closure, drainage path, and final review.'}
      ]
    },
    faqs: [
      {
        question: 'Is standing seam roof performance only about seam quality?',
        answer:
          'No. Seam quality is important, but drainage path, slope, penetrations, gutters, and installation sequence also control waterproofing risk.'
      },
      {
        question: 'What proof should be available before execution?',
        answer:
          'The project should have reviewed drainage logic, penetration details, edge and gutter coordination, and installation checkpoints. If diagrams are not available, they should remain marked pending.'
      }
    ],
    relatedResources: relatedResourceLinks('roofing_waterproofing'),
    relatedServices: [{title: 'Standing Seam and ZIP Tech Roofing', href: '/systems/standing-seam-zip-tech-roofing', description: 'Roofing waterproofing logic, drainage review, and execution control.'}],
    relatedProjects: [{title: 'Project Proof', href: '/projects', description: 'Open verified project references and available photo proof.'}],
    relatedInsights: [{title: 'Panel joint leakage risk', href: '/insights/sandwich-panel-joint-leakage-risk'}],
    conversionCta: {
      headline: 'Check roof drainage logic before site work',
      text: 'Share roof geometry, penetrations, and project stage so the technical team can review execution risk.',
      primaryCta: 'Request Technical Consultation',
      secondaryCta: 'Download Engineering Resource'
    }
  },
  {
    slug: 'aluminium-cladding-facade-joint-control',
    category: 'cladding_facades',
    routes: articleRoute('aluminium-cladding-facade-joint-control'),
    title: 'Aluminium Cladding Joint Control for Industrial Facades',
    metaDescription:
      'Engineering insight on aluminium cladding joint control, facade execution risk, SIPANEL solution logic, and pending technical proof placeholders.',
    primaryKeyword: 'aluminium cladding joint control',
    eyebrow: 'Engineering Insight',
    summary:
      'Facade quality depends on joint rhythm, fixing logic, edge conditions, and opening coordination being reviewed as an execution system, not only a finish choice.',
    readingTime: '6 min technical read',
    problemContext: {
      title: 'Problem',
      body:
        'Cladding projects can lose alignment and execution control when facade joints are left to site interpretation. The visual grid must be coordinated with substrate, fixing points, openings, edges, and material sizes.',
      points: [
        'Uncontrolled joint rhythm can create visible alignment defects.',
        'Material sizing and fixing logic affect waste and installation quality.',
        'Openings and edge conditions need separate detailing before fabrication.'
      ]
    },
    engineeringExplanation: {
      title: 'Engineering cause',
      body:
        'Facade risk increases when architectural intent, panel module, substructure, fixing method, and site tolerance are not reviewed together. Joint control is both a visual and technical coordination task.',
      points: [
        'Panel module decisions affect material planning and facade rhythm.',
        'Fixing points must match substrate condition and installation access.',
        'Edges and openings define the most visible quality checkpoints.'
      ]
    },
    technicalVisual: {
      title: 'Pending facade joint proof diagram',
      description:
        'A verified facade diagram should show joint rhythm, fixing zone, opening edge control, and material module logic. The real technical proof asset is pending.',
      status: 'pending_technical_proof',
      callouts: ['Joint rhythm', 'Fixing zone', 'Opening edge control']
    },
    executionLogic: {
      title: 'SIPANEL solution logic',
      steps: [
        {title: 'Define facade grid', description: 'Review visual rhythm, panel module, openings, and edge lines before fabrication.'},
        {title: 'Coordinate fixing logic', description: 'Connect substructure, fixing method, panel dimensions, and installation sequence.'},
        {title: 'Control material planning', description: 'Check quantities, waste exposure, and accessory requirements before procurement.'}
      ]
    },
    faqs: [
      {
        question: 'Why does cladding joint control matter before procurement?',
        answer:
          'Joint rhythm affects panel dimensions, substructure coordination, accessories, and visible quality. Late changes can create rework or material waste.'
      },
      {
        question: 'Can facade quality be judged only after installation?',
        answer:
          'Final inspection matters, but many quality risks are created before installation when grid, fixing, edge, and opening details are not resolved.'
      }
    ],
    relatedResources: relatedResourceLinks('cladding_facades'),
    relatedServices: [{title: 'Aluminium Cladding and Covering', href: '/systems/aluminium-cladding-covering', description: 'Facade joint control, fixing logic, and material planning.'}],
    relatedProjects: [{title: 'Project Proof', href: '/projects', description: 'Review project references with verified available content.'}],
    relatedInsights: [{title: 'Panel joint leakage risk', href: '/insights/sandwich-panel-joint-leakage-risk'}],
    conversionCta: {
      headline: 'Review facade joint control before fabrication',
      text: 'Send project drawings or scope for a technical review of facade grid, fixing logic, and execution constraints.',
      primaryCta: 'Request Technical Consultation',
      secondaryCta: 'View Related Resources'
    }
  }
];

export const engineeringInsightsPage: EngineeringInsightsPageData = {
  routes,
  seo: {
    title: 'Engineering Insights | SIPANEL',
    metaDescription:
      'Technical engineering insights for industrial panel systems, roofing waterproofing, cladding, resources, projects, and FAQ links.',
    h1: 'Engineering Insights'
  },
  hero: {
    eyebrow: 'SIPANEL Engineering',
    subheadline:
      'Technical articles focused on problem context, engineering cause, SIPANEL execution logic, pending proof states, and internal project resources.',
    primaryCta: 'Browse Technical Articles',
    secondaryCta: 'Request Technical Consultation'
  },
  categories: [
    {id: 'all', label: 'All Topics'},
    {id: 'panel_systems', label: categoryLabels.panel_systems},
    {id: 'roofing_waterproofing', label: categoryLabels.roofing_waterproofing},
    {id: 'cladding_facades', label: categoryLabels.cladding_facades}
  ],
  articles: engineeringInsightArticles
};

const insightLocaleLabels = {
  fa: {
    seoTitle: 'بینش‌های مهندسی | SIPANEL',
    metaDescription: 'مقاله‌های فنی سی‌پانل درباره سیستم‌های پانلی، آب‌بندی سقف، نما، منابع مهندسی و کنترل ریسک اجرا.',
    h1: 'بینش‌های مهندسی',
    eyebrow: 'مهندسی SIPANEL',
    subheadline: 'مقاله‌های فنی درباره مسئله پروژه، علت مهندسی، منطق اجرای سی‌پانل، وضعیت اثبات و منابع داخلی.',
    all: 'همه موضوعات',
    categories: {panel_systems: 'سیستم‌های پانلی', roofing_waterproofing: 'سقف و آب‌بندی', cladding_facades: 'نما و کلادینگ'},
    articleEyebrow: 'بینش مهندسی',
    readingTime: '۶ دقیقه مطالعه فنی',
    problem: 'مسئله',
    cause: 'علت مهندسی',
    visual: 'نمودار فنی در انتظار',
    execution: 'منطق راهکار SIPANEL',
    resources: 'منابع مرتبط',
    services: 'خدمات مرتبط',
    projects: 'شواهد پروژه‌ای',
    cta: 'درخواست مشاوره فنی',
    secondary: 'مشاهده منابع مرتبط'
  },
  ar: {
    seoTitle: 'رؤى هندسية | SIPANEL',
    metaDescription: 'مقالات فنية من SIPANEL حول أنظمة الألواح وعزل الأسقف والواجهات والموارد الهندسية وضبط مخاطر التنفيذ.',
    h1: 'رؤى هندسية',
    eyebrow: 'هندسة SIPANEL',
    subheadline: 'مقالات فنية حول سياق المشكلة والسبب الهندسي ومنطق تنفيذ SIPANEL وحالة الإثبات والموارد الداخلية.',
    all: 'كل الموضوعات',
    categories: {panel_systems: 'أنظمة الألواح', roofing_waterproofing: 'الأسقف والعزل المائي', cladding_facades: 'الواجهات والكلادينج'},
    articleEyebrow: 'رؤية هندسية',
    readingTime: 'قراءة فنية ٦ دقائق',
    problem: 'المشكلة',
    cause: 'السبب الهندسي',
    visual: 'مخطط فني قيد التوثيق',
    execution: 'منطق حل SIPANEL',
    resources: 'موارد مرتبطة',
    services: 'خدمات مرتبطة',
    projects: 'إثباتات مشاريع',
    cta: 'اطلب استشارة فنية',
    secondary: 'عرض الموارد المرتبطة'
  },
  ru: {
    seoTitle: 'Инженерные материалы | SIPANEL',
    metaDescription: 'Технические статьи SIPANEL о панельных системах, гидроизоляции кровель, фасадах, инженерных ресурсах и контроле рисков выполнения.',
    h1: 'Инженерные материалы',
    eyebrow: 'Инженерия SIPANEL',
    subheadline: 'Технические статьи о контексте задачи, инженерной причине, логике выполнения SIPANEL, статусе подтверждений и внутренних ресурсах.',
    all: 'Все темы',
    categories: {panel_systems: 'Панельные системы', roofing_waterproofing: 'Кровля и гидроизоляция', cladding_facades: 'Фасады и облицовка'},
    articleEyebrow: 'Инженерный материал',
    readingTime: '6 минут технического чтения',
    problem: 'Задача',
    cause: 'Инженерная причина',
    visual: 'Техническая схема ожидает подтверждения',
    execution: 'Логика решения SIPANEL',
    resources: 'Связанные ресурсы',
    services: 'Связанные услуги',
    projects: 'Проектные доказательства',
    cta: 'Запросить техническую консультацию',
    secondary: 'Смотреть связанные ресурсы'
  }
} satisfies Record<Exclude<Locale, 'en'>, {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  subheadline: string;
  all: string;
  categories: Record<InsightCategoryId, string>;
  articleEyebrow: string;
  readingTime: string;
  problem: string;
  cause: string;
  visual: string;
  execution: string;
  resources: string;
  services: string;
  projects: string;
  cta: string;
  secondary: string;
}>;

const localizedInsightTitles: Record<string, Record<Locale, string>> = {
  'sandwich-panel-joint-leakage-risk': {
    en: 'Why Sandwich Panel Joint Logic Controls Leakage Risk',
    fa: 'چرا منطق درز ساندویچ پانل ریسک نشتی را کنترل می‌کند',
    ar: 'لماذا تتحكم منطق وصلات ألواح الساندويتش في مخاطر التسرب',
    ru: 'Почему логика стыков сэндвич-панелей контролирует риск протечек'
  },
  'standing-seam-roof-drainage-logic': {
    en: 'Standing Seam Roof Drainage Logic Before Execution',
    fa: 'منطق زهکشی سقف استندینگ سیم پیش از اجرا',
    ar: 'منطق تصريف سقف ستاندينغ سيم قبل التنفيذ',
    ru: 'Логика водоотвода фальцевой кровли до выполнения'
  },
  'aluminium-cladding-facade-joint-control': {
    en: 'Aluminium Cladding Joint Control for Industrial Facades',
    fa: 'کنترل درز نمای آلومینیومی در نماهای صنعتی',
    ar: 'ضبط فواصل الكسوة بالألمنيوم للواجهات الصناعية',
    ru: 'Контроль стыков алюминиевой облицовки промышленных фасадов'
  }
};

function localizedInsightArticle(article: EngineeringInsightArticle, locale: Locale): EngineeringInsightArticle {
  if (locale === 'en') return article;

  const labels = insightLocaleLabels[locale];
  const title = localizedInsightTitles[article.slug]?.[locale] ?? article.title;

  return {
    ...article,
    title,
    metaDescription: `${title}. ${labels.metaDescription}`,
    primaryKeyword: title,
    eyebrow: labels.articleEyebrow,
    summary: labels.subheadline,
    readingTime: labels.readingTime,
    problemContext: {
      title: labels.problem,
      body: locale === 'fa'
        ? 'ریسک پروژه زمانی افزایش می‌یابد که جزئیات پوسته، مسیر آب، اکسسوری‌ها و توالی نصب پیش از خرید و اجرا هماهنگ نشده باشد.'
        : locale === 'ar'
        ? 'تزداد مخاطر المشروع عندما لا تنسق تفاصيل الغلاف ومسار المياه والملحقات وتسلسل التركيب قبل الشراء والتنفيذ.'
        : 'Риск проекта возрастает, когда детали оболочки, путь воды, аксессуары и последовательность монтажа не согласованы до закупки и выполнения.',
      points: [labels.problem, labels.resources, labels.projects]
    },
    engineeringExplanation: {
      title: labels.cause,
      body: locale === 'fa'
        ? 'بازبینی مهندسی باید نقشه، دیتیل، متریال، دسترسی نصب و نقاط کنترل کیفیت را به یک منطق اجرایی واحد وصل کند.'
        : locale === 'ar'
        ? 'يجب أن تربط المراجعة الهندسية الرسومات والتفاصيل والمواد وإمكانية التركيب ونقاط ضبط الجودة بمنطق تنفيذ واحد.'
        : 'Инженерная проверка должна связать чертежи, детали, материалы, доступ монтажа и контрольные точки качества в единую логику выполнения.',
      points: [labels.problem, labels.cause, labels.execution]
    },
    technicalVisual: {
      title: labels.visual,
      description: locale === 'fa' ? 'نمودار واقعی پس از تأیید مستندات پروژه منتشر می‌شود.' : locale === 'ar' ? 'ينشر المخطط الحقيقي بعد توثيق مستندات المشروع.' : 'Реальная схема публикуется после подтверждения проектных документов.',
      status: 'pending_technical_proof',
      callouts: [labels.problem, labels.cause, labels.execution]
    },
    executionLogic: {
      title: labels.execution,
      steps: [
        {title: labels.problem, description: labels.subheadline},
        {title: labels.resources, description: labels.metaDescription},
        {title: labels.projects, description: labels.subheadline}
      ]
    },
    faqs: [
      {question: locale === 'fa' ? 'این بازبینی چه زمانی باید انجام شود؟' : locale === 'ar' ? 'متى يجب إجراء هذه المراجعة؟' : 'Когда нужно выполнять такую проверку?', answer: labels.subheadline},
      {question: locale === 'fa' ? 'اگر سند فنی هنوز آماده نباشد چه می‌شود؟' : locale === 'ar' ? 'ماذا لو لم تكن الوثيقة الفنية جاهزة؟' : 'Что если технический документ еще не готов?', answer: labels.visual}
    ],
    relatedResources: [{title: labels.resources, href: '/resources', description: labels.metaDescription}],
    relatedServices: [{title: labels.services, href: '/systems', description: labels.subheadline}],
    relatedProjects: [{title: labels.projects, href: '/projects', description: labels.subheadline}],
    relatedInsights: [],
    conversionCta: {
      headline: labels.cta,
      text: labels.subheadline,
      primaryCta: labels.cta,
      secondaryCta: labels.secondary
    }
  };
}

export function getEngineeringInsightsPage(locale: Locale = 'en') {
  if (locale === 'en') return engineeringInsightsPage;

  const labels = insightLocaleLabels[locale];
  const articles = engineeringInsightArticles.map((article) => localizedInsightArticle(article, locale));

  return {
    ...engineeringInsightsPage,
    seo: {
      title: labels.seoTitle,
      metaDescription: labels.metaDescription,
      h1: labels.h1
    },
    hero: {
      eyebrow: labels.eyebrow,
      subheadline: labels.subheadline,
      primaryCta: labels.cta,
      secondaryCta: labels.secondary
    },
    categories: [
      {id: 'all', label: labels.all},
      {id: 'panel_systems', label: labels.categories.panel_systems},
      {id: 'roofing_waterproofing', label: labels.categories.roofing_waterproofing},
      {id: 'cladding_facades', label: labels.categories.cladding_facades}
    ] satisfies EngineeringInsightsPageData['categories'],
    articles
  };
}

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
  const article = engineeringInsightArticles.find((item) => item.slug === slug && item.routes[locale]) ?? null;
  return article ? localizedInsightArticle(article, locale) : null;
}

export function getEngineeringInsightArticleMetadata(locale: Locale, slug: string) {
  const article = getEngineeringInsightArticle(locale, slug);

  if (!article) {
    return null;
  }

  const titleSuffix = locale === 'fa'
    ? 'بینش مهندسی SIPANEL'
    : locale === 'ar'
    ? 'رؤية هندسية SIPANEL'
    : locale === 'ru'
    ? 'Инженерный материал SIPANEL'
    : 'SIPANEL Engineering Insight';

  return buildPageMetadata({
    locale,
    title: `${article.title} | ${titleSuffix}`,
    description: article.metaDescription,
    routes: article.routes,
    type: 'article'
  });
}

export function getAllEngineeringInsightStaticParams() {
  return locales.flatMap((locale) => engineeringInsightArticles.map((article) => ({locale, slug: article.slug})));
}

export function getInsightCategoryLabel(category: InsightCategoryId) {
  return categoryLabels[category];
}
