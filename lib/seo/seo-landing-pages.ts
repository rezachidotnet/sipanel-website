import type {Metadata} from 'next';
import type {StaticImageData} from 'next/image';
import {getLocalizedPath, locales, type Locale} from '@/i18n/routing';
import {buildPageMetadata} from '@/lib/seo/metadata';

export type SeoProofAsset = {
  title: string;
  description?: string;
  image?: StaticImageData;
  alt?: string;
  assetStatus?: 'available' | 'pending';
};

export type SeoCaseStudy = {
  projectName: string;
  location: string;
  projectType?: string;
  areaM2?: string;
  challenge: string;
  engineeringDecision: string;
  measuredResult: string;
  href?: string;
  image?: StaticImageData;
  assetStatus?: 'available' | 'pending';
};

export type SeoResourceCard = {
  resourceType: string;
  category?: string;
  title: string;
  shortDescription: string;
  cta: string;
  href?: string;
  assetStatus?: 'available' | 'pending';
  leadCapture?: boolean;
};

export type SeoLinkCard = {
  title: string;
  href: string;
  description?: string;
};

export type SeoLandingPageLocaleContent = {
  seo: {
    primaryKeyword: string;
    title: string;
    metaDescription: string;
    h1: string;
    shortIntro: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    shortIntro: string;
    trustMicrocopy: string;
    primaryCta: string;
    secondaryCta: string;
    heroVisualDirection: string;
    heroVisualAlt: string;
    heroVisual?: StaticImageData;
  };
  searchIntentProblem: {
    title: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  technicalContext: {
    title: string;
    intro: string;
    points: string[];
  };
  sipanelSolution: {
    title: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
  };
  engineeringWorkflow: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  technicalProof: {
    title: string;
    description: string;
    pendingLabel: string;
    assets?: SeoProofAsset[];
  };
  applicationDetails: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    relatedServices?: SeoLinkCard[];
  };
  qualityCheckpoints: {
    title: string;
    items: string[];
  };
  relatedCaseStudies: {
    title: string;
    pendingLabel: string;
    cta: string;
    cases?: SeoCaseStudy[];
  };
  relatedResources: {
    title: string;
    pendingLabel: string;
    cta: string;
    resources?: SeoResourceCard[];
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  conversionCta: {
    headline: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
  };
  schemas?: {
    service?: boolean;
    article?: boolean;
    faq?: boolean;
    breadcrumb?: boolean;
  };
};

export type SeoLandingPageData = {
  slug: string;
  routes: Record<Locale, string>;
  localeContent: Record<Locale, SeoLandingPageLocaleContent>;
};

type SeoRelatedServiceLink = {
  title: string;
  path: string;
  description?: string;
};

type SeoLandingPageDefinition = {
  slug: string;
  routeSlug: string;
  keyword: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  shortIntro: string;
  heroEyebrow: string;
  heroTrustMicrocopy: string;
  heroVisualDirection: string;
  heroVisualAlt: string;
  primaryCta: string;
  heroSecondaryCta: string;
  conversionSecondaryCta: string;
  problemTitle: string;
  problemCards: Array<{
    title: string;
    description: string;
  }>;
  technicalContextTitle: string;
  technicalContextIntro: string;
  technicalContextPoints: string[];
  solutionTitle: string;
  solutionPillars: Array<{
    title: string;
    description: string;
  }>;
  workflowTitle: string;
  workflowSteps: Array<{
    title: string;
    description: string;
  }>;
  technicalProofTitle: string;
  technicalProofDescription: string;
  technicalProofPendingLabel: string;
  applicationTitle: string;
  applications: Array<{
    title: string;
    description: string;
  }>;
  relatedServiceLinks: SeoRelatedServiceLink[];
  qualityCheckpointsTitle: string;
  qualityCheckpoints: string[];
  relatedCaseStudiesTitle: string;
  relatedCaseStudiesPendingLabel: string;
  relatedCaseStudiesCta: string;
  relatedResourcesTitle: string;
  relatedResourcesPendingLabel: string;
  relatedResourcesCta: string;
  faqFocus: string;
  conversionHeadline: string;
  conversionText: string;
};

function buildLocalizedRoutes(routeSlug: string): Record<Locale, string> {
  return {
    en: getLocalizedPath('en', `/solutions/${routeSlug}`),
    fa: getLocalizedPath('fa', `/solutions/${routeSlug}`),
    ar: getLocalizedPath('ar', `/solutions/${routeSlug}`),
    ru: getLocalizedPath('ru', `/solutions/${routeSlug}`)
  };
}

function buildRelatedServices(locale: Locale, links: SeoRelatedServiceLink[]): SeoLinkCard[] {
  const serviceLabels: Record<string, Record<Locale, {title: string; description: string}>> = {
    '/systems/sandwich-panel-systems': {
      en: {title: 'Sandwich Panel Systems', description: 'Panel system engineering and installation control'},
      fa: {title: 'سیستم‌های ساندویچ پانل', description: 'مهندسی سیستم پانل و کنترل نصب'},
      ar: {title: 'أنظمة ألواح الساندويتش', description: 'هندسة نظام الألواح وضبط التركيب'},
      ru: {title: 'Системы сэндвич-панелей', description: 'Инженерия панельной системы и контроль монтажа'}
    },
    '/systems/standing-seam-zip-tech-roofing': {
      en: {title: 'Standing Seam & ZIP Tech Roofing', description: 'Roof waterproofing and drainage control'},
      fa: {title: 'سقف استندینگ سیم و ZIP Tech', description: 'کنترل آب‌بندی و زهکشی سقف'},
      ar: {title: 'أسقف ستاندينغ سيم و ZIP Tech', description: 'ضبط العزل المائي وتصريف السقف'},
      ru: {title: 'Фальцевая кровля и ZIP Tech', description: 'Контроль гидроизоляции и водоотвода кровли'}
    },
    '/systems/aluminium-cladding-covering': {
      en: {title: 'Aluminium Cladding & Covering', description: 'Facade joint and material planning'},
      fa: {title: 'کلادینگ و پوشش آلومینیومی', description: 'برنامه‌ریزی درز نما و متریال'},
      ar: {title: 'الكسوة والتغطية بالألمنيوم', description: 'تخطيط فواصل الواجهة والمواد'},
      ru: {title: 'Алюминиевая облицовка и покрытие', description: 'Планирование фасадных стыков и материалов'}
    }
  };

  return links.map((link) => ({
    title: serviceLabels[link.path]?.[locale]?.title ?? link.title,
    href: link.path,
    description: serviceLabels[link.path]?.[locale]?.description ?? link.description
  }));
}

function buildSeoFaqItems(keyword: string, focus: string) {
  return [
    {
      question: `What does ${keyword} review cover?`,
      answer: `It covers ${focus}, together with layout, coordination, procurement logic, and installation risk before execution starts.`
    },
    {
      question: `Can SIPANEL review this project before procurement?`,
      answer: 'Yes. The pages are structured to support pre-procurement technical review so the project can reduce rework, waste, and coordination gaps.'
    },
    {
      question: `What happens if real drawings or project proof are still pending?`,
      answer: 'The page uses pending technical proof states until verified drawings, project photos, or case studies are available.'
    },
    {
      question: `How do I start a technical consultation?`,
      answer: 'Use the conversion CTA to request an engineering review, then share the available project information for SIPANEL to assess the risks.'
    }
  ];
}

const localizedSolutionNames: Record<string, Record<Locale, string>> = {
  'industrial-sandwich-panel-installation': {
    en: 'Industrial sandwich panel installation',
    fa: 'اجرای صنعتی ساندویچ پانل',
    ar: 'تركيب ألواح الساندويتش الصناعية',
    ru: 'Монтаж промышленных сэндвич-панелей'
  },
  'sandwich-panel-for-factory-buildings': {
    en: 'Sandwich panel for factory buildings',
    fa: 'ساندویچ پانل برای ساختمان‌های کارخانه',
    ar: 'ألواح الساندويتش لمباني المصانع',
    ru: 'Сэндвич-панели для заводских зданий'
  },
  'standing-seam-roofing-industrial-buildings': {
    en: 'Standing seam roofing for industrial buildings',
    fa: 'سقف استندینگ سیم برای ساختمان‌های صنعتی',
    ar: 'أسقف ستاندينغ سيم للمباني الصناعية',
    ru: 'Фальцевая кровля для промышленных зданий'
  },
  'industrial-roof-leakage-prevention': {
    en: 'Industrial roof leakage prevention',
    fa: 'پیشگیری از نشت سقف صنعتی',
    ar: 'منع تسرب الأسقف الصناعية',
    ru: 'Предотвращение протечек промышленных кровель'
  },
  'aluminium-cladding-industrial-facades': {
    en: 'Aluminium cladding for industrial facades',
    fa: 'نمای آلومینیومی برای نماهای صنعتی',
    ar: 'الكسوة بالألمنيوم للواجهات الصناعية',
    ru: 'Алюминиевая облицовка промышленных фасадов'
  },
  'shop-drawing-review-panel-projects': {
    en: 'Shop drawing review for panel projects',
    fa: 'بازبینی شاپ‌دراوینگ پروژه‌های پانلی',
    ar: 'مراجعة رسومات الورشة لمشاريع الألواح',
    ru: 'Проверка рабочих чертежей панельных проектов'
  },
  'industrial-envelope-systems': {
    en: 'Industrial envelope systems',
    fa: 'سیستم‌های پوشانه صنعتی',
    ar: 'أنظمة أغلفة المباني الصناعية',
    ru: 'Промышленные ограждающие системы'
  },
  'panel-material-optimization': {
    en: 'Panel material optimization',
    fa: 'بهینه‌سازی متریال پانل',
    ar: 'تحسين مواد الألواح',
    ru: 'Оптимизация материалов панелей'
  }
};

const localizedSolutionUi = {
  fa: {
    titleSuffix: ' | SIPANEL',
    eyebrow: 'راهکار مهندسی',
    trust: 'بازبینی مهندسی پیش از تأمین، اجرا و تحویل پروژه.',
    primaryCta: 'درخواست مشاوره فنی',
    secondaryCta: 'بررسی هزینه پروژه',
    problem: 'ریسک‌های اصلی پیش از اجرا',
    context: 'الزامات فنی',
    solution: 'سی‌پانل چگونه ریسک را کاهش می‌دهد',
    workflow: 'گردش‌کار مهندسی',
    proof: 'شواهد فنی پیش از اجرا',
    pending: 'در انتظار سند فنی تاییدشده',
    applications: 'کاربردها',
    quality: 'چک‌پوینت‌های کیفیت',
    cases: 'شواهد پروژه‌ای مرتبط',
    resources: 'منابع مهندسی مرتبط',
    faq: 'سوالات متداول',
    conversion: 'پیش از شروع اجرا، ریسک پروژه را بررسی کنید',
    conversionText: 'نقشه‌ها و اطلاعات پروژه را ارسال کنید تا تیم مهندسی سی‌پانل محدوده، جزئیات و ریسک اجرا را بررسی کند.',
    resourceCta: 'مشاهده منبع مهندسی',
    casesCta: 'مشاهده پروژه‌ها'
  },
  ar: {
    titleSuffix: ' | SIPANEL',
    eyebrow: 'حل هندسي',
    trust: 'مراجعة هندسية قبل التوريد والتنفيذ وتسليم المشروع.',
    primaryCta: 'اطلب استشارة فنية',
    secondaryCta: 'راجع تكلفة المشروع',
    problem: 'المخاطر الرئيسية قبل التنفيذ',
    context: 'المتطلبات الفنية',
    solution: 'كيف تقلل SIPANEL مخاطر المشروع',
    workflow: 'مسار العمل الهندسي',
    proof: 'الإثبات الفني قبل التنفيذ',
    pending: 'بانتظار مستند فني موثق',
    applications: 'الاستخدامات',
    quality: 'نقاط ضبط الجودة',
    cases: 'إثباتات مشاريع مرتبطة',
    resources: 'موارد هندسية مرتبطة',
    faq: 'أسئلة شائعة',
    conversion: 'راجع مخاطر المشروع قبل بدء التنفيذ',
    conversionText: 'أرسل الرسومات ومعلومات المشروع حتى يراجع فريق SIPANEL الهندسي النطاق والتفاصيل ومخاطر التنفيذ.',
    resourceCta: 'عرض المورد الهندسي',
    casesCta: 'عرض المشاريع'
  },
  ru: {
    titleSuffix: ' | SIPANEL',
    eyebrow: 'Инженерное решение',
    trust: 'Инженерная проверка до поставки, монтажа и сдачи проекта.',
    primaryCta: 'Запросить техническую консультацию',
    secondaryCta: 'Проверить стоимость проекта',
    problem: 'Ключевые риски до выполнения',
    context: 'Технические требования',
    solution: 'Как SIPANEL снижает риск проекта',
    workflow: 'Инженерный процесс',
    proof: 'Техническое подтверждение до выполнения',
    pending: 'Ожидается подтвержденный технический документ',
    applications: 'Применение',
    quality: 'Контрольные точки качества',
    cases: 'Связанные проектные доказательства',
    resources: 'Связанные инженерные ресурсы',
    faq: 'Вопросы и ответы',
    conversion: 'Проверьте риски проекта до начала выполнения',
    conversionText: 'Отправьте чертежи и данные проекта, чтобы инженерная команда SIPANEL проверила объем, детали и риски выполнения.',
    resourceCta: 'Смотреть инженерный ресурс',
    casesCta: 'Смотреть проекты'
  }
} satisfies Record<Exclude<Locale, 'en'>, Record<string, string>>;

function localizedSolutionContent(def: SeoLandingPageDefinition, locale: Locale): SeoLandingPageLocaleContent {
  if (locale === 'en') {
    return {
      seo: {
        primaryKeyword: def.keyword,
        title: def.seoTitle,
        metaDescription: def.metaDescription,
        h1: def.h1,
        shortIntro: def.shortIntro
      },
      hero: {
        eyebrow: def.heroEyebrow,
        h1: def.h1,
        shortIntro: def.shortIntro,
        trustMicrocopy: def.heroTrustMicrocopy,
        primaryCta: def.primaryCta,
        secondaryCta: def.heroSecondaryCta,
        heroVisualDirection: def.heroVisualDirection,
        heroVisualAlt: def.heroVisualAlt
      },
      searchIntentProblem: {title: def.problemTitle, cards: def.problemCards},
      technicalContext: {title: def.technicalContextTitle, intro: def.technicalContextIntro, points: def.technicalContextPoints},
      sipanelSolution: {title: def.solutionTitle, pillars: def.solutionPillars},
      engineeringWorkflow: {title: def.workflowTitle, steps: def.workflowSteps},
      technicalProof: {title: def.technicalProofTitle, description: def.technicalProofDescription, pendingLabel: def.technicalProofPendingLabel},
      applicationDetails: {title: def.applicationTitle, items: def.applications, relatedServices: buildRelatedServices(locale, def.relatedServiceLinks)},
      qualityCheckpoints: {title: def.qualityCheckpointsTitle, items: def.qualityCheckpoints},
      relatedCaseStudies: {title: def.relatedCaseStudiesTitle, pendingLabel: def.relatedCaseStudiesPendingLabel, cta: def.relatedCaseStudiesCta},
      relatedResources: {title: def.relatedResourcesTitle, pendingLabel: def.relatedResourcesPendingLabel, cta: def.relatedResourcesCta},
      faq: {title: `${def.keyword} Questions`, items: buildSeoFaqItems(def.keyword, def.faqFocus)},
      conversionCta: {headline: def.conversionHeadline, text: def.conversionText, primaryCta: def.primaryCta, secondaryCta: def.conversionSecondaryCta},
      schemas: {service: true, article: true, faq: true, breadcrumb: true}
    };
  }

  const ui = localizedSolutionUi[locale];
  const name = localizedSolutionNames[def.slug]?.[locale] ?? def.keyword;

  return {
    seo: {
      primaryKeyword: name,
      title: `${name}${ui.titleSuffix}`,
      metaDescription: locale === 'fa'
        ? `${name} با تمرکز بر هماهنگی مهندسی، کنترل تأمین، جزئیات اجرایی و کاهش ریسک پیش از شروع پروژه.`
        : locale === 'ar'
        ? `${name} مع تركيز على التنسيق الهندسي وضبط التوريد وتفاصيل التنفيذ وتقليل المخاطر قبل بدء المشروع.`
        : `${name}: инженерная координация, контроль поставки, исполнительные детали и снижение рисков до начала проекта.`,
      h1: name,
      shortIntro: locale === 'fa'
        ? `سی‌پانل ${name} را به‌عنوان یک بسته مهندسی هماهنگ بررسی می‌کند تا ریسک طراحی، تأمین و نصب پیش از اجرا کنترل شود.`
        : locale === 'ar'
        ? `تراجع SIPANEL ${name} كحزمة هندسية منسقة حتى تتم إدارة مخاطر التصميم والتوريد والتركيب قبل التنفيذ.`
        : `SIPANEL рассматривает ${name} как согласованный инженерный пакет, чтобы контролировать риски проектирования, поставки и монтажа до выполнения.`
    },
    hero: {
      eyebrow: ui.eyebrow,
      h1: name,
      shortIntro: locale === 'fa'
        ? `تمرکز این صفحه بر کنترل فنی ${name} پیش از سفارش متریال و شروع کارگاه است.`
        : locale === 'ar'
        ? `تركز هذه الصفحة على الضبط الفني لـ ${name} قبل طلب المواد وبدء العمل في الموقع.`
        : `Эта страница посвящена техническому контролю ${name} до заказа материалов и начала работ.`,
      trustMicrocopy: ui.trust,
      primaryCta: ui.primaryCta,
      secondaryCta: ui.secondaryCta,
      heroVisualDirection: ui.pending,
      heroVisualAlt: ui.pending
    },
    searchIntentProblem: {
      title: ui.problem,
      cards: [
        {title: locale === 'ru' ? 'Координация' : locale === 'ar' ? 'التنسيق' : 'هماهنگی', description: ui.conversionText},
        {title: locale === 'ru' ? 'Поставка' : locale === 'ar' ? 'التوريد' : 'تأمین', description: locale === 'fa' ? 'اقلام، اکسسوری‌ها و توالی خرید باید با نقشه و برنامه اجرا هماهنگ باشد.' : locale === 'ar' ? 'يجب أن تتوافق المواد والملحقات وتسلسل الشراء مع الرسومات وخطة التنفيذ.' : 'Материалы, аксессуары и порядок закупки должны соответствовать чертежам и плану работ.'},
        {title: locale === 'ru' ? 'Монтаж' : locale === 'ar' ? 'التركيب' : 'نصب', description: locale === 'fa' ? 'جزئیات نصب و نقاط کنترل کیفیت پیش از شروع کارگاه مشخص می‌شود.' : locale === 'ar' ? 'تحدد تفاصيل التركيب ونقاط ضبط الجودة قبل بدء العمل في الموقع.' : 'Монтажные детали и контрольные точки качества определяются до начала работ.'}
      ]
    },
    technicalContext: {
      title: ui.context,
      intro: locale === 'fa' ? `${name} نیازمند بررسی نقشه، مرزهای محدوده، دیتیل اتصال، متریال و توالی اجرا است.` : locale === 'ar' ? `يتطلب ${name} مراجعة الرسومات وحدود النطاق وتفاصيل الوصلات والمواد وتسلسل التنفيذ.` : `${name} требует проверки чертежей, границ объема, узлов, материалов и последовательности работ.`,
      points: [ui.problem, ui.context, ui.quality]
    },
    sipanelSolution: {
      title: ui.solution,
      pillars: [
        {title: locale === 'ru' ? 'Проектирование' : locale === 'ar' ? 'التصميم' : 'طراحی', description: ui.trust},
        {title: locale === 'ru' ? 'Поставка' : locale === 'ar' ? 'التوريد' : 'تأمین', description: locale === 'fa' ? 'فهرست متریال و اکسسوری‌ها پیش از خرید با نقشه هماهنگ می‌شود.' : locale === 'ar' ? 'تنسق قائمة المواد والملحقات مع الرسومات قبل الشراء.' : 'Ведомость материалов и аксессуаров согласуется с чертежами до закупки.'},
        {title: locale === 'ru' ? 'Выполнение' : locale === 'ar' ? 'التنفيذ' : 'اجرا', description: locale === 'fa' ? 'توالی نصب و کنترل کیفیت برای کاهش دوباره‌کاری تعریف می‌شود.' : locale === 'ar' ? 'يحدد تسلسل التركيب وضبط الجودة لتقليل إعادة العمل.' : 'Последовательность монтажа и контроль качества задаются для снижения переделок.'}
      ]
    },
    engineeringWorkflow: {
      title: ui.workflow,
      steps: ['review', 'details', 'procurement', 'execution', 'verification'].map((_, index) => ({
        title: [ui.context, ui.problem, ui.resources, ui.quality, ui.proof][index],
        description: ui.conversionText
      }))
    },
    technicalProof: {title: ui.proof, description: ui.pending, pendingLabel: ui.pending},
    applicationDetails: {
      title: ui.applications,
      items: [
        {title: name, description: locale === 'fa' ? 'برای پروژه‌هایی که به هماهنگی مهندسی پیش از اجرا نیاز دارند.' : locale === 'ar' ? 'للمشاريع التي تحتاج إلى تنسيق هندسي قبل التنفيذ.' : 'Для проектов, которым нужна инженерная координация до выполнения.'}
      ],
      relatedServices: buildRelatedServices(locale, def.relatedServiceLinks)
    },
    qualityCheckpoints: {title: ui.quality, items: [ui.context, ui.resources, ui.proof]},
    relatedCaseStudies: {title: ui.cases, pendingLabel: ui.pending, cta: ui.casesCta},
    relatedResources: {title: ui.resources, pendingLabel: ui.pending, cta: ui.resourceCta},
    faq: {
      title: ui.faq,
      items: [
        {question: locale === 'fa' ? `بازبینی ${name} شامل چه مواردی است؟` : locale === 'ar' ? `ماذا تشمل مراجعة ${name}؟` : `Что включает проверка ${name}?`, answer: ui.conversionText},
        {question: locale === 'fa' ? 'آیا پیش از خرید قابل بررسی است؟' : locale === 'ar' ? 'هل يمكن المراجعة قبل الشراء؟' : 'Можно ли проверить до закупки?', answer: ui.trust}
      ]
    },
    conversionCta: {headline: ui.conversion, text: ui.conversionText, primaryCta: ui.primaryCta, secondaryCta: ui.secondaryCta},
    schemas: {service: true, article: true, faq: true, breadcrumb: true}
  };
}

function buildSeoLandingPage(def: SeoLandingPageDefinition): SeoLandingPageData {
  const routes = buildLocalizedRoutes(def.routeSlug);

  return {
    slug: def.slug,
    routes,
    localeContent: Object.fromEntries(
      locales.map((locale) => [locale, localizedSolutionContent(def, locale)])
    ) as Record<Locale, SeoLandingPageLocaleContent>
  };
}

export const seoLandingPages = [
  buildSeoLandingPage({
    slug: 'industrial-sandwich-panel-installation',
    routeSlug: 'industrial-sandwich-panel-installation',
    keyword: 'industrial sandwich panel installation',
    seoTitle: 'Industrial Sandwich Panel Installation | SIPANEL',
    metaDescription:
      'Industrial sandwich panel installation needs shop drawings, accessory planning, sealing logic, and controlled sequencing. SIPANEL reviews the installation risk before work starts.',
    h1: 'Industrial Sandwich Panel Installation Planned Before Site Work.',
    shortIntro:
      'SIPANEL aligns layout, accessories, cuts, and sequencing before installation so industrial panel projects reduce rework, waste, and leakage risk.',
    heroEyebrow: 'Industrial Panel Execution',
    heroTrustMicrocopy: 'Engineering-led review for panel layout, procurement, and installation sequencing.',
    heroVisualDirection: 'Pending technical installation preview',
    heroVisualAlt: 'Structured placeholder for industrial sandwich panel installation proof',
    primaryCta: 'Request Technical Consultation',
    heroSecondaryCta: 'Request Project Cost Check',
    conversionSecondaryCta: 'Contact via WhatsApp',
    problemTitle: 'The Real Risk Behind industrial sandwich panel installation',
    problemCards: [
      {title: 'Layout drift', description: 'Panel lines, openings, and accessories shift once installation starts without a prior layout review.'},
      {title: 'Accessory mismatch', description: 'Flashing, trims, and fixings often arrive late or in the wrong sequence when procurement is not coordinated.'},
      {title: 'Seal failure', description: 'Small gaps in joint preparation can create leakage or thermal performance issues later.'}
    ],
    technicalContextTitle: 'What industrial sandwich panel installation Requires Technically',
    technicalContextIntro:
      'A controlled installation starts with layout logic, joint direction, penetrations, accessory planning, and a clear delivery sequence.',
    technicalContextPoints: [
      'Confirm panel orientation, support spacing, and joint overlap before delivery.',
      'Coordinate openings, trims, and penetrations so site cutting stays limited.',
      'Verify fastener, sealant, and inspection points before the first panel is fixed.'
    ],
    solutionTitle: 'How SIPANEL Reduces Project Risk',
    solutionPillars: [
      {title: 'Precise Design', description: 'Review the layout, details, and execution conditions before procurement.'},
      {title: 'Smart Procurement', description: 'Plan materials, accessories, quantities, and project needs to reduce waste and delay.'},
      {title: 'Engineered Installation', description: 'Sequence installation with inspection checkpoints and controlled execution logic.'}
    ],
    workflowTitle: 'Engineering Workflow for industrial sandwich panel installation',
    workflowSteps: [
      {title: 'Project condition review', description: 'Check dimensions, tolerances, support conditions, and site constraints first.'},
      {title: 'Layout coordination', description: 'Align panel direction, openings, and accessory positions before procurement.'},
      {title: 'Material takeoff', description: 'Prepare a controlled quantity plan for panels, trims, fasteners, and sealants.'},
      {title: 'Installation sequencing', description: 'Sequence delivery and fixing so sealing and inspection remain manageable.'},
      {title: 'Final verification', description: 'Confirm joints, fixings, and interfaces before handover.'}
    ],
    technicalProofTitle: 'Technical Proof Before Execution',
    technicalProofDescription:
      'Real shop drawings and project photos are not yet published for this page, so the proof area remains structured and pending.',
    technicalProofPendingLabel: 'Pending real installation drawing',
    applicationTitle: 'Where industrial sandwich panel installation Is Used',
    applications: [
      {title: 'Factory roofs and walls', description: 'Use controlled layout and sealing logic where continuous production spaces need stable envelope performance.'},
      {title: 'Cold rooms and insulated zones', description: 'Maintain thermal continuity and joint control around openings and transitions.'},
      {title: 'Expansion and retrofit projects', description: 'Limit site cutting and rework when work must fit an active facility.'}
    ],
    relatedServiceLinks: [
      {
        title: 'Sandwich Panel Systems',
        path: '/systems/sandwich-panel-systems',
        description: 'Panel system engineering and installation control'
      }
    ],
    qualityCheckpointsTitle: 'industrial sandwich panel installation Quality Checkpoints',
    qualityCheckpoints: [
      'Confirm layout and support conditions before unloading.',
      'Check trim, accessory, and fastening quantities against the takeoff.',
      'Inspect joint preparation and sealant continuity during installation.',
      'Review penetration details before closing interfaces.',
      'Verify the final surface, fasteners, and handover documentation.'
    ],
    relatedCaseStudiesTitle: 'Related Project Proof',
    relatedCaseStudiesPendingLabel: 'Pending verified panel installation proof.',
    relatedCaseStudiesCta: 'View Related Projects',
    relatedResourcesTitle: 'Related Engineering Resources',
    relatedResourcesPendingLabel: 'Panel Installation Checklist',
    relatedResourcesCta: 'Download Engineering Resource',
    faqFocus: 'controlled panel layout, procurement sequencing, and installation quality',
    conversionHeadline: 'Review industrial sandwich panel installation Before Execution Starts.',
    conversionText:
      'SIPANEL can review layout, procurement, sealing logic, and installation sequencing before site execution begins.'
  }),
  buildSeoLandingPage({
    slug: 'sandwich-panel-for-factory-buildings',
    routeSlug: 'sandwich-panel-for-factory-buildings',
    keyword: 'sandwich panel for factory buildings',
    seoTitle: 'Sandwich Panel for Factory Buildings | SIPANEL',
    metaDescription:
      'Sandwich panel for factory buildings needs insulation logic, wall and roof coordination, accessory planning, and controlled installation. SIPANEL reviews the risk before procurement.',
    h1: 'Sandwich Panel for Factory Buildings Planned as One System.',
    shortIntro:
      'SIPANEL connects wall, roof, and opening details so factory buildings keep insulation, durability, and installation control aligned.',
    heroEyebrow: 'Factory Envelope Systems',
    heroTrustMicrocopy: 'Engineering-led review for factory panel selection, procurement, and coordination.',
    heroVisualDirection: 'Pending factory envelope preview',
    heroVisualAlt: 'Structured placeholder for factory sandwich panel proof',
    primaryCta: 'Request Technical Consultation',
    heroSecondaryCta: 'Request Project Cost Check',
    conversionSecondaryCta: 'Contact via WhatsApp',
    problemTitle: 'The Real Risk Behind sandwich panel for factory buildings',
    problemCards: [
      {title: 'Mixed scope', description: 'Roof, wall, and opening details are often ordered separately, which causes coordination gaps.'},
      {title: 'Thermal breaks', description: 'Unplanned transitions can weaken insulation continuity and create operational losses.'},
      {title: 'Delivery mismatch', description: 'Accessory packages and panel quantities can arrive out of sequence without an engineering takeoff.'}
    ],
    technicalContextTitle: 'What sandwich panel for factory buildings Requires Technically',
    technicalContextIntro:
      'Factory buildings need coordinated roof and wall logic, controlled junctions, and a procurement plan that matches construction sequencing.',
    technicalContextPoints: [
      'Coordinate roof-to-wall transitions and openings before procurement.',
      'Use the same layout logic for panel direction, trims, and accessory takeoff.',
      'Plan installation around production schedules, access limits, and site tolerances.'
    ],
    solutionTitle: 'How SIPANEL Reduces Project Risk',
    solutionPillars: [
      {title: 'Precise Design', description: 'Review the building envelope as one coordinated system.'},
      {title: 'Smart Procurement', description: 'Match quantities, trims, and accessories to the approved layout.'},
      {title: 'Engineered Installation', description: 'Sequence roof and wall work so interfaces stay controlled.'}
    ],
    workflowTitle: 'Engineering Workflow for sandwich panel for factory buildings',
    workflowSteps: [
      {title: 'Building condition review', description: 'Check dimensions, structure, and access paths before the takeoff is set.'},
      {title: 'System selection', description: 'Select panel logic based on insulation needs, use case, and coordination points.'},
      {title: 'Detail coordination', description: 'Review corners, openings, and roof-wall transitions with the same package.'},
      {title: 'Procurement planning', description: 'Prepare quantities and accessories to reduce waste and reordering.'},
      {title: 'Verification', description: 'Confirm installation quality, sealing, and documentation before handover.'}
    ],
    technicalProofTitle: 'Technical Proof Before Execution',
    technicalProofDescription:
      'This page uses pending proof states until a verified factory project drawing or image set is available.',
    technicalProofPendingLabel: 'Pending real factory panel proof',
    applicationTitle: 'Where sandwich panel for factory buildings Is Used',
    applications: [
      {title: 'Production halls', description: 'Support controlled indoor environments and durable wall and roof systems.'},
      {title: 'Assembly buildings', description: 'Coordinate openings, trims, and service routes without losing installation control.'},
      {title: 'Logistics and storage bays', description: 'Maintain practical enclosure performance with fast, repeatable execution.'}
    ],
    relatedServiceLinks: [
      {
        title: 'Sandwich Panel Systems',
        path: '/systems/sandwich-panel-systems',
        description: 'Factory panel system engineering'
      }
    ],
    qualityCheckpointsTitle: 'sandwich panel for factory buildings Quality Checkpoints',
    qualityCheckpoints: [
      'Verify the approved layout against the structure before purchase.',
      'Check openings, trims, and accessory quantities before delivery.',
      'Inspect wall and roof junctions for sealing continuity.',
      'Confirm the procurement sequence matches the site plan.',
      'Review final installation records and outstanding items.'
    ],
    relatedCaseStudiesTitle: 'Related Project Proof',
    relatedCaseStudiesPendingLabel: 'Pending verified factory project proof.',
    relatedCaseStudiesCta: 'View Related Projects',
    relatedResourcesTitle: 'Related Engineering Resources',
    relatedResourcesPendingLabel: 'Sandwich Panel Selection Guide',
    relatedResourcesCta: 'Download Engineering Resource',
    faqFocus: 'factory panel selection, thermal continuity, and envelope coordination',
    conversionHeadline: 'Review sandwich panel for factory buildings Before Execution Starts.',
    conversionText:
      'SIPANEL can review factory envelope conditions, panel selection, and installation risks before procurement begins.'
  }),
  buildSeoLandingPage({
    slug: 'standing-seam-roofing-industrial-buildings',
    routeSlug: 'standing-seam-roofing-industrial-buildings',
    keyword: 'standing seam roofing for industrial buildings',
    seoTitle: 'Standing Seam Roofing for Industrial Buildings | SIPANEL',
    metaDescription:
      'Standing seam roofing for industrial buildings depends on drainage logic, concealed fastening, flashing coordination, and movement control. SIPANEL reviews the roof risk before site work starts.',
    h1: 'Standing Seam Roofing for Industrial Buildings Built Around Waterproofing Logic.',
    shortIntro:
      'SIPANEL reviews seams, flashings, drainage, and concealed fastening before roofing starts so leakage risk stays under control.',
    heroEyebrow: 'Industrial Roofing Engineering',
    heroTrustMicrocopy: 'Engineering-led review for roof drainage, seams, penetrations, and waterproofing control.',
    heroVisualDirection: 'Pending roofing detail preview',
    heroVisualAlt: 'Structured placeholder for standing seam roofing proof',
    primaryCta: 'Request Technical Consultation',
    heroSecondaryCta: 'Request Project Cost Check',
    conversionSecondaryCta: 'Contact via WhatsApp',
    problemTitle: 'The Real Risk Behind standing seam roofing for industrial buildings',
    problemCards: [
      {title: 'Drainage errors', description: 'Slope and outlet logic can be missed when roof geometry is not reviewed early.'},
      {title: 'Flashing conflicts', description: 'Transitions, gutters, and penetrations can clash if the coordination package is incomplete.'},
      {title: 'Movement issues', description: 'Concealed fasteners still need thermal and structural movement planned correctly.'}
    ],
    technicalContextTitle: 'What standing seam roofing for industrial buildings Requires Technically',
    technicalContextIntro:
      'A standing seam roof only performs well when drainage paths, seam layout, flashing details, and fastening logic are coordinated as one system.',
    technicalContextPoints: [
      'Confirm roof slope, drainage routes, and outlet points before detailing.',
      'Coordinate flashing and penetration geometry so water paths stay controlled.',
      'Review concealed fastener logic and movement allowances before procurement.'
    ],
    solutionTitle: 'How SIPANEL Reduces Project Risk',
    solutionPillars: [
      {title: 'Precise Design', description: 'Coordinate roof geometry, drainage, and detail logic before ordering materials.'},
      {title: 'Smart Procurement', description: 'Plan seam accessories, flashings, and support items to reduce waste.'},
      {title: 'Engineered Installation', description: 'Sequence roof work to preserve waterproofing control during execution.'}
    ],
    workflowTitle: 'Engineering Workflow for standing seam roofing for industrial buildings',
    workflowSteps: [
      {title: 'Roof condition review', description: 'Review slope, drainage, structure, and interfaces before detailing.'},
      {title: 'Seam coordination', description: 'Set seam layout and penetration positions as part of the roof package.'},
      {title: 'Flashing planning', description: 'Coordinate edges, gutters, and terminations with the roof logic.'},
      {title: 'Installation sequencing', description: 'Sequence panels and flashings so waterproofing layers remain protected.'},
      {title: 'Final verification', description: 'Confirm sealing, drainage, and movement allowances before handover.'}
    ],
    technicalProofTitle: 'Technical Proof Before Execution',
    technicalProofDescription:
      'Drainage sketches and roofing details remain pending until verified roof assets are available.',
    technicalProofPendingLabel: 'Pending real roofing detail',
    applicationTitle: 'Where standing seam roofing for industrial buildings Is Used',
    applications: [
      {title: 'High-drain industrial roofs', description: 'Use controlled drainage and seam logic where water management is critical.'},
      {title: 'Long-span roof areas', description: 'Coordinate movement and fastening over larger roof runs.'},
      {title: 'Equipment-rich roof zones', description: 'Plan penetrations and flashings carefully around rooftop services.'}
    ],
    relatedServiceLinks: [
      {
        title: 'Standing Seam & ZIP Tech Roofing',
        path: '/systems/standing-seam-zip-tech-roofing',
        description: 'Waterproof roofing engineering'
      }
    ],
    qualityCheckpointsTitle: 'standing seam roofing for industrial buildings Quality Checkpoints',
    qualityCheckpoints: [
      'Confirm slope and outlet logic before ordering roofing materials.',
      'Check flashing drawings around penetrations and edges.',
      'Review seam alignment and fastening logic during installation.',
      'Inspect drainage paths and water discharge details.',
      'Verify handover notes for maintenance and inspection.'
    ],
    relatedCaseStudiesTitle: 'Related Project Proof',
    relatedCaseStudiesPendingLabel: 'Pending verified roofing project proof.',
    relatedCaseStudiesCta: 'View Related Projects',
    relatedResourcesTitle: 'Related Engineering Resources',
    relatedResourcesPendingLabel: 'Standing Seam Roof Detail Notes',
    relatedResourcesCta: 'Download Engineering Resource',
    faqFocus: 'roof drainage, concealed fastening, and leakage prevention',
    conversionHeadline: 'Review standing seam roofing for industrial buildings Before Execution Starts.',
    conversionText:
      'SIPANEL can review roof drainage logic, flashing coordination, and leakage risk before roofing execution begins.'
  }),
  buildSeoLandingPage({
    slug: 'industrial-roof-leakage-prevention',
    routeSlug: 'industrial-roof-leakage-prevention',
    keyword: 'industrial roof leakage prevention',
    seoTitle: 'Industrial Roof Leakage Prevention | SIPANEL',
    metaDescription:
      'Industrial roof leakage prevention depends on slope, drainage, flashing transitions, penetrations, and inspection checkpoints. SIPANEL reviews the roof risk before work starts.',
    h1: 'Industrial Roof Leakage Prevention Planned Before Roofing Starts.',
    shortIntro:
      'SIPANEL reviews slope, drainage, flashings, and roof interfaces so leakage risk is addressed before construction begins.',
    heroEyebrow: 'Roof Risk Control',
    heroTrustMicrocopy: 'Engineering-led review for leakage risk, roof interfaces, and waterproofing sequencing.',
    heroVisualDirection: 'Pending roof leakage prevention preview',
    heroVisualAlt: 'Structured placeholder for roof leakage prevention proof',
    primaryCta: 'Request Technical Consultation',
    heroSecondaryCta: 'Request Project Cost Check',
    conversionSecondaryCta: 'Contact via WhatsApp',
    problemTitle: 'The Real Risk Behind industrial roof leakage prevention',
    problemCards: [
      {title: 'Slope gaps', description: 'Water paths fail when roof fall and outlet logic are not reviewed together.'},
      {title: 'Interface leakage', description: 'Penetrations, gutters, and wall transitions are the most common failure points.'},
      {title: 'Patch-first repairs', description: 'Without a technical review, temporary fixes can hide the real leakage source.'}
    ],
    technicalContextTitle: 'What industrial roof leakage prevention Requires Technically',
    technicalContextIntro:
      'Leakage prevention starts with the roof geometry, then moves to water paths, flashings, transitions, and inspection access.',
    technicalContextPoints: [
      'Review slope, valley routes, gutters, and discharge points before procurement.',
      'Coordinate roof penetrations and wall transitions in one detail package.',
      'Set inspection checkpoints before closing the waterproofing layers.'
    ],
    solutionTitle: 'How SIPANEL Reduces Project Risk',
    solutionPillars: [
      {title: 'Precise Design', description: 'Map the roof water path and detail risk areas before execution.'},
      {title: 'Smart Procurement', description: 'Match flashings, sealants, and accessories to the approved roof logic.'},
      {title: 'Engineered Installation', description: 'Sequence the work so waterproofing and inspection stay controlled.'}
    ],
    workflowTitle: 'Engineering Workflow for industrial roof leakage prevention',
    workflowSteps: [
      {title: 'Leak source review', description: 'Identify slope, drainage, and interface problems before any repair or new work.'},
      {title: 'Detail coordination', description: 'Align penetrations, gutters, and edges in one waterproofing package.'},
      {title: 'Material planning', description: 'Plan sealants, flashings, and accessories to match the roof geometry.'},
      {title: 'Execution control', description: 'Sequence work so temporary exposure stays limited.'},
      {title: 'Verification', description: 'Inspect the completed roof path and water discharge points before handover.'}
    ],
    technicalProofTitle: 'Technical Proof Before Execution',
    technicalProofDescription:
      'Leakage details remain pending until a verified roof drawing or project record is available.',
    technicalProofPendingLabel: 'Pending real leakage detail',
    applicationTitle: 'Where industrial roof leakage prevention Is Used',
    applications: [
      {title: 'Existing roofs with water ingress', description: 'Use a review-first approach when the leakage source is not yet clear.'},
      {title: 'New industrial roofs', description: 'Prevent future leakage through slope, flashing, and interface review.'},
      {title: 'Phased roof repairs', description: 'Control exposure and sequencing when work must happen in stages.'}
    ],
    relatedServiceLinks: [
      {
        title: 'Standing Seam & ZIP Tech Roofing',
        path: '/systems/standing-seam-zip-tech-roofing',
        description: 'Roof waterproofing engineering'
      }
    ],
    qualityCheckpointsTitle: 'industrial roof leakage prevention Quality Checkpoints',
    qualityCheckpoints: [
      'Verify slope, gutters, and discharge points before roof work begins.',
      'Check all penetrations and transitions for waterproofing continuity.',
      'Confirm sealant and flashing compatibility with the roof system.',
      'Inspect temporary exposure control during execution.',
      'Review final water path and maintenance notes.'
    ],
    relatedCaseStudiesTitle: 'Related Project Proof',
    relatedCaseStudiesPendingLabel: 'Pending verified leakage project proof.',
    relatedCaseStudiesCta: 'View Related Projects',
    relatedResourcesTitle: 'Related Engineering Resources',
    relatedResourcesPendingLabel: 'Industrial Roof Leakage Prevention Checklist',
    relatedResourcesCta: 'Download Engineering Resource',
    faqFocus: 'leakage source control, drainage logic, and roof waterproofing',
    conversionHeadline: 'Review industrial roof leakage prevention Before Execution Starts.',
    conversionText:
      'SIPANEL can review roof water paths, interface risks, and repair sequencing before roofing execution begins.'
  }),
  buildSeoLandingPage({
    slug: 'aluminium-cladding-industrial-facades',
    routeSlug: 'aluminium-cladding-industrial-facades',
    keyword: 'aluminium cladding for industrial facades',
    seoTitle: 'Aluminium Cladding for Industrial Facades | SIPANEL',
    metaDescription:
      'Aluminium cladding for industrial facades depends on facade layout control, fixing logic, edge detailing, material optimization, and installation discipline. SIPANEL reviews the facade risk before work starts.',
    h1: 'Aluminium Cladding for Industrial Facades With Controlled Execution.',
    shortIntro:
      'SIPANEL coordinates grid layout, edge details, and fixing logic before facade work starts so material waste and execution risk stay controlled.',
    heroEyebrow: 'Industrial Facade Engineering',
    heroTrustMicrocopy: 'Engineering-led review for facade grid, fixing logic, and installation discipline.',
    heroVisualDirection: 'Pending facade cladding preview',
    heroVisualAlt: 'Structured placeholder for aluminium cladding proof',
    primaryCta: 'Request Technical Consultation',
    heroSecondaryCta: 'Request Project Cost Check',
    conversionSecondaryCta: 'Contact via WhatsApp',
    problemTitle: 'The Real Risk Behind aluminium cladding for industrial facades',
    problemCards: [
      {title: 'Grid drift', description: 'Facade rhythm can shift if the layout is not controlled before fabrication.'},
      {title: 'Edge failures', description: 'Corners, openings, and joints need detailed coordination to avoid weak visual or waterproofing points.'},
      {title: 'Material waste', description: 'Cut losses rise when panel sizes and fixing patterns are not planned around the facade grid.'}
    ],
    technicalContextTitle: 'What aluminium cladding for industrial facades Requires Technically',
    technicalContextIntro:
      'A facade system needs precise grid control, substructure logic, opening coordination, and clear edge detailing before fabrication begins.',
    technicalContextPoints: [
      'Set the facade rhythm and opening geometry before material takeoff.',
      'Coordinate fixing points and substructure spacing with the cladding layout.',
      'Review edge, corner, and parapet details so the visual and technical logic stay aligned.'
    ],
    solutionTitle: 'How SIPANEL Reduces Project Risk',
    solutionPillars: [
      {title: 'Precise Design', description: 'Review the facade grid, edges, and openings as one coordinated package.'},
      {title: 'Smart Procurement', description: 'Plan panel sizes and accessories to reduce cuts and waste.'},
      {title: 'Engineered Installation', description: 'Execute facade work with control over fixing and quality checkpoints.'}
    ],
    workflowTitle: 'Engineering Workflow for aluminium cladding for industrial facades',
    workflowSteps: [
      {title: 'Facade review', description: 'Review grid, openings, and substructure conditions before detailing.'},
      {title: 'Fixing logic', description: 'Set attachment patterns and support spacing around the facade layout.'},
      {title: 'Edge detailing', description: 'Coordinate corners, parapets, and terminations as part of one package.'},
      {title: 'Material planning', description: 'Reduce waste by matching sizes and cut paths to the layout.'},
      {title: 'Verification', description: 'Confirm finished alignment, fixings, and interfaces before handover.'}
    ],
    technicalProofTitle: 'Technical Proof Before Execution',
    technicalProofDescription:
      'Facade drawings and cladding project photos are pending until verified assets are available.',
    technicalProofPendingLabel: 'Pending real facade detail',
    applicationTitle: 'Where aluminium cladding for industrial facades Is Used',
    applications: [
      {title: 'Factory front facades', description: 'Control the building face where appearance and durability both matter.'},
      {title: 'Office and entrance zones', description: 'Coordinate openings and detailing where people first see the project.'},
      {title: 'Screen and accent cladding', description: 'Use controlled layout to keep the facade rhythm consistent.'}
    ],
    relatedServiceLinks: [
      {
        title: 'Aluminium Cladding & Covering',
        path: '/systems/aluminium-cladding-covering',
        description: 'Facade and cladding engineering'
      }
    ],
    qualityCheckpointsTitle: 'aluminium cladding for industrial facades Quality Checkpoints',
    qualityCheckpoints: [
      'Verify the facade grid before fabrication or procurement.',
      'Check edge, corner, and opening details in the approved set.',
      'Review fixing logic and substructure spacing.',
      'Inspect material cut paths to control waste.',
      'Confirm alignment and final visual quality at handover.'
    ],
    relatedCaseStudiesTitle: 'Related Project Proof',
    relatedCaseStudiesPendingLabel: 'Pending verified facade project proof.',
    relatedCaseStudiesCta: 'View Related Projects',
    relatedResourcesTitle: 'Related Engineering Resources',
    relatedResourcesPendingLabel: 'Aluminium Cladding Layout Checklist',
    relatedResourcesCta: 'Download Engineering Resource',
    faqFocus: 'facade layout control, fixing logic, and edge detailing',
    conversionHeadline: 'Review aluminium cladding for industrial facades Before Execution Starts.',
    conversionText:
      'SIPANEL can review the facade layout, fixing logic, and material planning before facade execution begins.'
  }),
  buildSeoLandingPage({
    slug: 'shop-drawing-review-panel-projects',
    routeSlug: 'shop-drawing-review-panel-projects',
    keyword: 'shop drawing review for panel projects',
    seoTitle: 'Shop Drawing Review for Panel Projects | SIPANEL',
    metaDescription:
      'Shop drawing review for panel projects helps control layout, quantities, accessories, penetrations, and execution sequencing. SIPANEL reviews the drawings before procurement starts.',
    h1: 'Shop Drawing Review for Panel Projects Before Procurement.',
    shortIntro:
      'SIPANEL checks layout, accessory logic, quantities, and sequence risk so panel projects can move from drawing to execution with more control.',
    heroEyebrow: 'Technical Drawing Review',
    heroTrustMicrocopy: 'Engineering-led review for drawings, quantities, and procurement control.',
    heroVisualDirection: 'Pending shop drawing preview',
    heroVisualAlt: 'Structured placeholder for shop drawing review proof',
    primaryCta: 'Request Technical Consultation',
    heroSecondaryCta: 'Request Project Cost Check',
    conversionSecondaryCta: 'Contact via WhatsApp',
    problemTitle: 'The Real Risk Behind shop drawing review for panel projects',
    problemCards: [
      {title: 'Quantity gaps', description: 'Material takeoff errors can create waste or delays when drawings are not reviewed carefully.'},
      {title: 'Accessory misses', description: 'Flashing, trims, and fixings are often overlooked during early coordination.'},
      {title: 'Sequence problems', description: 'Installation can become inefficient if the drawing package does not reflect site order.'}
    ],
    technicalContextTitle: 'What shop drawing review for panel projects Requires Technically',
    technicalContextIntro:
      'A drawing review is more than checking dimensions. It should test the layout, the quantity plan, the accessory package, and the installation sequence together.',
    technicalContextPoints: [
      'Validate dimensions, openings, and interface conditions against the project brief.',
      'Check the BOM/MTO logic so quantities and accessories match the approved layout.',
      'Review sequencing, delivery packaging, and installation order before procurement.'
    ],
    solutionTitle: 'How SIPANEL Reduces Project Risk',
    solutionPillars: [
      {title: 'Precise Design', description: 'Review layout and details before materials are committed.'},
      {title: 'Smart Procurement', description: 'Align takeoff, accessories, and packaging with the drawing package.'},
      {title: 'Engineered Installation', description: 'Turn the drawing set into a controlled execution sequence.'}
    ],
    workflowTitle: 'Engineering Workflow for shop drawing review for panel projects',
    workflowSteps: [
      {title: 'Brief review', description: 'Check the project scope, constraints, and available base information first.'},
      {title: 'Layout validation', description: 'Review panel layout, openings, and details for coordination gaps.'},
      {title: 'Quantity check', description: 'Confirm the takeoff and accessory logic against the layout.'},
      {title: 'Execution sequence', description: 'Set the installation order and delivery plan before procurement.'},
      {title: 'Review closure', description: 'Record unresolved items and final approved changes before release.'}
    ],
    technicalProofTitle: 'Technical Proof Before Execution',
    technicalProofDescription:
      'The proof area remains pending until verified drawings or project records can be published.',
    technicalProofPendingLabel: 'Pending real drawing preview',
    applicationTitle: 'Where shop drawing review for panel projects Is Used',
    applications: [
      {title: 'Pre-procurement sign-off', description: 'Use it to check the package before purchase orders are issued.'},
      {title: 'Design coordination', description: 'Use it when multiple trades share the same envelope interfaces.'},
      {title: 'Execution planning', description: 'Use it to turn the drawing set into a practical site sequence.'}
    ],
    relatedServiceLinks: [
      {
        title: 'Sandwich Panel Systems',
        path: '/systems/sandwich-panel-systems',
        description: 'Panel execution and takeoff control'
      }
    ],
    qualityCheckpointsTitle: 'shop drawing review for panel projects Quality Checkpoints',
    qualityCheckpoints: [
      'Confirm dimensions and openings against the project brief.',
      'Check BOM/MTO quantities and accessory counts.',
      'Review flashing, trims, and penetrations in the same set.',
      'Validate the installation sequence and packaging plan.',
      'Note all open items before the drawings are released.'
    ],
    relatedCaseStudiesTitle: 'Related Project Proof',
    relatedCaseStudiesPendingLabel: 'Pending verified drawing review proof.',
    relatedCaseStudiesCta: 'View Related Projects',
    relatedResourcesTitle: 'Related Engineering Resources',
    relatedResourcesPendingLabel: 'Shop Drawing Review Guide for Panel Projects',
    relatedResourcesCta: 'Download Engineering Resource',
    faqFocus: 'drawing coordination, quantity control, and execution sequencing',
    conversionHeadline: 'Review shop drawing review for panel projects Before Execution Starts.',
    conversionText:
      'SIPANEL can review the drawing package, the quantity logic, and the execution sequence before procurement begins.'
  }),
  buildSeoLandingPage({
    slug: 'industrial-envelope-systems',
    routeSlug: 'industrial-envelope-systems',
    keyword: 'industrial envelope systems',
    seoTitle: 'Industrial Envelope Systems | SIPANEL',
    metaDescription:
      'Industrial envelope systems require coordinated roofs, walls, cladding, procurement, and installation control. SIPANEL reviews the envelope package before execution starts.',
    h1: 'Industrial Envelope Systems Coordinated as One Execution Package.',
    shortIntro:
      'SIPANEL aligns panel, roofing, and cladding logic so industrial envelope projects reduce scope gaps, rework, and execution uncertainty.',
    heroEyebrow: 'Envelope Engineering',
    heroTrustMicrocopy: 'Engineering-led review for roof, wall, facade, and interface control.',
    heroVisualDirection: 'Pending industrial envelope preview',
    heroVisualAlt: 'Structured placeholder for industrial envelope systems proof',
    primaryCta: 'Request Technical Consultation',
    heroSecondaryCta: 'Request Project Cost Check',
    conversionSecondaryCta: 'Contact via WhatsApp',
    problemTitle: 'The Real Risk Behind industrial envelope systems',
    problemCards: [
      {title: 'Scope gaps', description: 'Separate roof, wall, and facade packages can leave unresolved interface risk.'},
      {title: 'Procurement drift', description: 'Material orders can diverge from the approved envelope logic if the system is not coordinated.'},
      {title: 'Execution conflict', description: 'Multiple trades can work against each other unless the envelope sequence is managed as one package.'}
    ],
    technicalContextTitle: 'What industrial envelope systems Requires Technically',
    technicalContextIntro:
      'An industrial envelope only works when roof, wall, cladding, and penetration details are coordinated around one execution logic.',
    technicalContextPoints: [
      'Review roof-to-wall transitions and facade interfaces together.',
      'Coordinate material planning and procurement across all envelope components.',
      'Set sequencing so the different trades do not create execution conflicts.'
    ],
    solutionTitle: 'How SIPANEL Reduces Project Risk',
    solutionPillars: [
      {title: 'Precise Design', description: 'Review the entire envelope package before any part is ordered.'},
      {title: 'Smart Procurement', description: 'Plan all materials and accessories as one coordinated takeoff.'},
      {title: 'Engineered Installation', description: 'Sequence the envelope work so interfaces remain under control.'}
    ],
    workflowTitle: 'Engineering Workflow for industrial envelope systems',
    workflowSteps: [
      {title: 'Envelope review', description: 'Map roof, wall, and facade conditions before detailing.'},
      {title: 'Interface coordination', description: 'Align every transition and penetration across the package.'},
      {title: 'Procurement control', description: 'Build a material plan that matches the approved envelope layout.'},
      {title: 'Execution sequencing', description: 'Sequence the work so one trade does not block another.'},
      {title: 'Verification', description: 'Confirm the completed envelope as one system before handover.'}
    ],
    technicalProofTitle: 'Technical Proof Before Execution',
    technicalProofDescription:
      'Project proof remains pending until verified roof, wall, or facade assets can be published.',
    technicalProofPendingLabel: 'Pending real envelope proof',
    applicationTitle: 'Where industrial envelope systems Is Used',
    applications: [
      {title: 'Factory envelopes', description: 'Coordinate roof, wall, and facade systems under one execution plan.'},
      {title: 'Warehouse envelopes', description: 'Use controlled procurement and installation to keep the building shell efficient.'},
      {title: 'Multi-system projects', description: 'Use one envelope logic when several cladding and roofing systems meet.'}
    ],
    relatedServiceLinks: [
      {
        title: 'Sandwich Panel Systems',
        path: '/systems/sandwich-panel-systems',
        description: 'Panel envelope engineering'
      },
      {
        title: 'Standing Seam & ZIP Tech Roofing',
        path: '/systems/standing-seam-zip-tech-roofing',
        description: 'Roof waterproofing engineering'
      },
      {
        title: 'Aluminium Cladding & Covering',
        path: '/systems/aluminium-cladding-covering',
        description: 'Facade engineering and cladding control'
      }
    ],
    qualityCheckpointsTitle: 'industrial envelope systems Quality Checkpoints',
    qualityCheckpoints: [
      'Confirm roof, wall, and facade scope boundaries.',
      'Check all interface details before procurement.',
      'Review the procurement plan as one envelope package.',
      'Control installation sequencing across the different trades.',
      'Verify final handover records for the complete envelope.'
    ],
    relatedCaseStudiesTitle: 'Related Project Proof',
    relatedCaseStudiesPendingLabel: 'Pending verified envelope project proof.',
    relatedCaseStudiesCta: 'View Related Projects',
    relatedResourcesTitle: 'Related Engineering Resources',
    relatedResourcesPendingLabel: 'Industrial Envelope Technical Resources',
    relatedResourcesCta: 'Download Engineering Resource',
    faqFocus: 'multi-system coordination, envelope sequencing, and execution control',
    conversionHeadline: 'Review industrial envelope systems Before Execution Starts.',
    conversionText:
      'SIPANEL can review roof, wall, facade, and interface risks before the envelope package moves into execution.'
  }),
  buildSeoLandingPage({
    slug: 'panel-material-optimization',
    routeSlug: 'panel-material-optimization',
    keyword: 'panel material optimization',
    seoTitle: 'Panel Material Optimization | SIPANEL',
    metaDescription:
      'Panel material optimization reduces waste through layout logic, takeoff accuracy, accessory control, and procurement planning. SIPANEL reviews the material plan before ordering starts.',
    h1: 'Panel Material Optimization for Controlled Procurement and Lower Waste.',
    shortIntro:
      'SIPANEL reviews layout, cut paths, accessories, and delivery logic so panel projects can reduce waste and keep procurement controlled.',
    heroEyebrow: 'Procurement Engineering',
    heroTrustMicrocopy: 'Engineering-led review for takeoff accuracy, cut control, and procurement sequencing.',
    heroVisualDirection: 'Pending material optimization preview',
    heroVisualAlt: 'Structured placeholder for panel material optimization proof',
    primaryCta: 'Request Technical Consultation',
    heroSecondaryCta: 'Request Project Cost Check',
    conversionSecondaryCta: 'Contact via WhatsApp',
    problemTitle: 'The Real Risk Behind panel material optimization',
    problemCards: [
      {title: 'Over-ordering', description: 'Extra material often appears when takeoff logic is not checked against the actual layout.'},
      {title: 'Cut waste', description: 'Unplanned panel lengths and openings can create avoidable offcuts.'},
      {title: 'Accessory mismatch', description: 'Fasteners, trims, and sealants can be misplanned when procurement is separated from design.'}
    ],
    technicalContextTitle: 'What panel material optimization Requires Technically',
    technicalContextIntro:
      'Material optimization starts with the layout, then moves into cut planning, takeoff accuracy, and procurement sequencing.',
    technicalContextPoints: [
      'Use the approved layout to calculate quantities and accessory counts.',
      'Plan cut paths and panel lengths to reduce offcuts and avoid repeat ordering.',
      'Sequence procurement so packs, trims, and fixings match the installation order.'
    ],
    solutionTitle: 'How SIPANEL Reduces Project Risk',
    solutionPillars: [
      {title: 'Precise Design', description: 'Use the layout to establish material demand before procurement.'},
      {title: 'Smart Procurement', description: 'Coordinate quantities, packaging, and delivery to reduce waste.'},
      {title: 'Engineered Installation', description: 'Keep the on-site sequence aligned with the material plan.'}
    ],
    workflowTitle: 'Engineering Workflow for panel material optimization',
    workflowSteps: [
      {title: 'Layout review', description: 'Start from the approved layout and opening logic.'},
      {title: 'Takeoff check', description: 'Confirm quantities, accessories, and contingency allowances.'},
      {title: 'Cut path planning', description: 'Reduce waste by planning panel lengths and cut sequences early.'},
      {title: 'Procurement sequencing', description: 'Match delivery and packaging to the site schedule.'},
      {title: 'Verification', description: 'Compare ordered quantities and installed usage before closeout.'}
    ],
    technicalProofTitle: 'Technical Proof Before Execution',
    technicalProofDescription:
      'MTO sheets and cut maps remain pending until verified project documents can be shared.',
    technicalProofPendingLabel: 'Pending real MTO preview',
    applicationTitle: 'Where panel material optimization Is Used',
    applications: [
      {title: 'Repetitive bay projects', description: 'Reduce waste where the same panel pattern repeats across many spans.'},
      {title: 'Phased build schedules', description: 'Keep procurement aligned when delivery happens in stages.'},
      {title: 'Retrofit and expansion work', description: 'Limit offcuts and reordering when the new work meets existing conditions.'}
    ],
    relatedServiceLinks: [
      {
        title: 'Sandwich Panel Systems',
        path: '/systems/sandwich-panel-systems',
        description: 'Panel layout and execution control'
      }
    ],
    qualityCheckpointsTitle: 'panel material optimization Quality Checkpoints',
    qualityCheckpoints: [
      'Validate the panel takeoff against the approved layout.',
      'Check accessory quantities before purchase orders are issued.',
      'Review cut waste and packaging logic before delivery.',
      'Confirm installation sequencing matches the material plan.',
      'Close out discrepancies between ordered and installed quantities.'
    ],
    relatedCaseStudiesTitle: 'Related Project Proof',
    relatedCaseStudiesPendingLabel: 'Pending verified optimization proof.',
    relatedCaseStudiesCta: 'View Related Projects',
    relatedResourcesTitle: 'Related Engineering Resources',
    relatedResourcesPendingLabel: 'MTO Procurement Planning Sheet',
    relatedResourcesCta: 'Download Engineering Resource',
    faqFocus: 'takeoff accuracy, cut waste reduction, and procurement control',
    conversionHeadline: 'Review panel material optimization Before Execution Starts.',
    conversionText:
      'SIPANEL can review takeoff logic, cut waste, and procurement planning before material orders are placed.'
  })
] as const;

export const seoLandingPageRegistry: Record<string, SeoLandingPageData> = Object.fromEntries(
  seoLandingPages.map((page) => [page.slug, page])
);

const seoBreadcrumbLabels: Record<Locale, {home: string; solutions: string}> = {
  en: {home: 'Home', solutions: 'Solutions'},
  fa: {home: 'خانه', solutions: 'راهکارها'},
  ar: {home: 'الرئيسية', solutions: 'الحلول'},
  ru: {home: 'Главная', solutions: 'Решения'}
};

export function getSeoLandingPageBySlug(slug: string) {
  return seoLandingPageRegistry[slug];
}

export function listSeoLandingPageSlugs() {
  return Object.keys(seoLandingPageRegistry);
}

export function getSeoLandingPageContent(page: SeoLandingPageData, locale: Locale) {
  return page.localeContent[locale];
}

export function getSeoBreadcrumbLabels(locale: Locale) {
  return seoBreadcrumbLabels[locale];
}

export function buildSeoLandingPageMetadata(page: SeoLandingPageData, locale: Locale): Metadata {
  const content = getSeoLandingPageContent(page, locale);

  return buildPageMetadata({
    locale,
    title: content.seo.title,
    description: content.seo.metaDescription,
    routes: page.routes
  });
}
