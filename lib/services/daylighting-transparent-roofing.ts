import serviceSystemPages from '@/specs/pages/service_system_pages.json';
import type {ServicePageTemplateData} from '@/components/services/service-page-template';
import type {Locale} from '@/i18n/routing';

type ServiceSystemPageSpec = {
  id: string;
  route: Record<Locale, string>;
  seo: {
    primary_keyword: string;
    title: string;
    meta_description: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
    primary_cta: string;
    secondary_cta?: string;
    visual_direction: string;
  };
  problem_context: {
    title: string;
    cards: string[];
  };
  engineering_approach: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  applications: string[];
  technical_proof: {
    required_visuals: string[];
    interaction: string;
  };
  quality_checkpoints: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  conversion_cta: {
    headline: string;
    text: string;
    button: string;
  };
};

const servicePages = serviceSystemPages.pages as ServiceSystemPageSpec[];

function getRequiredDaylightingSpec(): ServiceSystemPageSpec {
  const page = servicePages.find((item) => item.id === 'daylighting_transparent_roofing');

  if (!page) {
    throw new Error('Missing daylighting_transparent_roofing in service_system_pages.json');
  }

  return page;
}

export const daylightingTransparentRoofingSpec = getRequiredDaylightingSpec();

type LocalizedContent = {
  seo: {title: string; metaDescription: string};
  hero: {eyebrow: string; h1: string; subheadline: string; primaryCta: string; secondaryCta: string};
  problemContext: {title: string; cards: string[]};
  engineeringApproach: {title: string; steps: Array<{title: string; description: string}>};
  systemApplications: {title: string; applications: string[]};
  technicalProof: {title: string; assets: Array<{title: string; description: string}>};
  qualityCheckpoints: {title: string; checkpoints: string[]};
  faq: {title: string; items: Array<{question: string; answer: string}>};
  conversionCta: {headline: string; text: string; button: string; secondaryButton: string};
  breadcrumbs: Array<{label: string; href: string}>;
};

const faContent: LocalizedContent = {
  seo: {
    title: 'نورگیرها و پوشش‌های شفاف | سیستم‌های نورگیر صنعتی SIPANEL',
    metaDescription: 'سی‌پانل سیستم‌های نورگیر و پوشش شفاف را با پلی‌کربنات، شیشه و راهکارهای ترکیبی برای ساختمان‌های صنعتی و تجاری مهندسی می‌کند.'
  },
  hero: {
    eyebrow: 'سیستم‌های نورگیر و شفاف',
    h1: 'سیستم‌های پوشش شفاف با مهندسی عملکردی',
    subheadline: 'سی‌پانل چیدمان نورگیر، انتخاب پلی‌کربنات، یکپارچگی سازه‌ای، عملکرد حرارتی و مقاومت آب‌وهوایی را برای پروژه‌های نورگیر صنعتی هماهنگ می‌کند.',
    primaryCta: 'درخواست بررسی نورگیر',
    secondaryCta: 'مشاهده پروژه‌های مرتبط'
  },
  problemContext: {
    title: 'مشکلات رایج در پروژه‌های نورگیر صنعتی',
    cards: [
      'انتخاب نادرست متریال برای شرایط UV و حرارتی',
      'عدم هماهنگی سازه‌ای بین نورگیر و قاب اصلی',
      'ریسک نشتی ناشی از فلاشینگ و آب‌بندی ضعیف پنل‌های شفاف',
      'عملکرد حرارتی ناکافی و خطر میعان',
      'کاهش عبور نور به دلیل مشخصات نادرست پنل',
      'تأخیر پروژه به دلیل جزئیات نامشخص یا نبود متعلقات'
    ]
  },
  engineeringApproach: {
    title: 'کنترل مهندسی ریسک سیستم نورگیر',
    steps: [
      {title: 'بررسی سیستم نورگیر', description: 'الزامات پروژه، نیاز عبور نور، بارهای حرارتی، تابش UV و شرایط سازه‌ای پیش از انتخاب متریال بررسی می‌شود.'},
      {title: 'هماهنگی متریال و جزئیات', description: 'نوع پلی‌کربنات، مشخصات شیشه، جزئیات فلاشینگ، درزهای انبساط و منطق آب‌بندی پیش از خرید هماهنگ می‌شود.'},
      {title: 'برنامه‌ریزی یکپارچگی سازه‌ای', description: 'اتصالات نورگیر، هماهنگی پرلین، مسیر بارها و شیب زهکشی با سازه اصلی تأیید می‌شود.'},
      {title: 'نصب کنترل‌شده', description: 'اجرا بر اساس جزئیات تأییدشده، چک‌پوینت‌های آب‌بندی، تأیید هم‌راستایی و پروتکل‌های حفاظت آب‌وهوایی انجام می‌شود.'}
    ]
  },
  systemApplications: {
    title: 'کاربردهای سیستم نورگیر و پوشش شفاف',
    applications: ['نورگیر سالن‌های صنعتی', 'نوار نورگیر انبارها', 'سقف شفاف آتریوم‌های تجاری', 'سقف شفاف سالن‌های ورزشی', 'راهکارهای نور کنترل‌شده سردخانه', 'سیستم‌های نورگیر پیوسته خط‌الرأس']
  },
  technicalProof: {
    title: 'شواهد فنی پیش از اجرا',
    assets: [
      {title: 'نقشه چیدمان نورگیر', description: 'نقشه چیدمان نورگیر بر اساس شاپ‌دراوینگ پروژه'},
      {title: 'جزئیات پنل پلی‌کربنات', description: 'دیتیل پنل پلی‌کربنات و اتصالات'},
      {title: 'جزئیات فلاشینگ و آب‌بندی', description: 'دیتیل فلاشینگ و آب‌بندی نورگیر'},
      {title: 'جزئیات اتصال سازه‌ای', description: 'دیتیل اتصال نورگیر به سازه اصلی'}
    ]
  },
  qualityCheckpoints: {
    title: 'چک‌پوینت‌های کیفیت',
    checkpoints: [
      'تأیید نوع پنل و حفاظت UV',
      'بازبینی اتصال سازه‌ای و مسیر بار',
      'هماهنگی جزئیات فلاشینگ و آب‌بندی',
      'ارزیابی ریسک حرارتی و میعان',
      'تأیید شیب زهکشی و مسیر آب',
      'بازرسی نهایی ظاهری و مقاومت آب‌وهوایی'
    ]
  },
  faq: {
    title: 'سوالات متداول',
    items: [
      {question: 'سی‌پانل با چه متریال‌های پوشش شفافی کار می‌کند؟', answer: 'سی‌پانل با پلی‌کربنات چندجداره، پلی‌کربنات تخت، نورگیرهای شیشه‌ای و سیستم‌های ترکیبی پوشش شفاف کار می‌کند.'},
      {question: 'ریسک نشتی در نصب نورگیر چگونه کنترل می‌شود؟', answer: 'با هماهنگی جزئیات فلاشینگ، منطق آب‌بندی، برنامه‌ریزی درز انبساط و تأیید مسیر زهکشی پیش از نصب.'},
      {question: 'آیا سی‌پانل در انتخاب متریال نورگیر کمک می‌کند؟', answer: 'بله. انتخاب متریال بر اساس نیاز عبور نور، تابش UV، عملکرد حرارتی، بارهای سازه‌ای و بودجه پروژه بررسی می‌شود.'}
    ]
  },
  conversionCta: {
    headline: 'برای نورگیر کنترل‌شده پروژه خود مشاوره بگیرید',
    text: 'درخواست بررسی مهندسی برای چیدمان نورگیر، انتخاب متریال و هماهنگی نصب.',
    button: 'درخواست بررسی نورگیر',
    secondaryButton: 'مشاهده پروژه‌های مرتبط'
  },
  breadcrumbs: [
    {label: 'خانه', href: '/fa'},
    {label: 'پوشانه‌ها', href: '/fa/systems'},
    {label: 'نورگیرها و پوشش‌های شفاف', href: '/fa/systems/daylighting-transparent-roofing'}
  ]
};

export function getDaylightingTransparentRoofingPage(locale: Locale): ServicePageTemplateData {
  const page = daylightingTransparentRoofingSpec;
  const isFa = locale === 'fa';
  const fa = faContent;

  return {
    id: page.id,
    routes: page.route,
    seo: {
      primaryKeyword: isFa ? 'سیستم‌های نورگیر و پوشش شفاف' : page.seo.primary_keyword,
      title: isFa ? fa.seo.title : page.seo.title,
      metaDescription: isFa ? fa.seo.metaDescription : page.seo.meta_description
    },
    hero: {
      eyebrow: isFa ? fa.hero.eyebrow : page.hero.eyebrow,
      h1: isFa ? fa.hero.h1 : page.hero.h1,
      subheadline: isFa ? fa.hero.subheadline : page.hero.subheadline,
      primaryCta: isFa ? fa.hero.primaryCta : page.hero.primary_cta,
      secondaryCta: isFa ? fa.hero.secondaryCta : page.hero.secondary_cta,
      visualDirection: page.hero.visual_direction
    },
    problemContext: {
      title: isFa ? fa.problemContext.title : page.problem_context.title,
      cards: isFa ? fa.problemContext.cards : page.problem_context.cards
    },
    engineeringApproach: {
      title: isFa ? fa.engineeringApproach.title : page.engineering_approach.title,
      steps: isFa ? fa.engineeringApproach.steps : page.engineering_approach.steps
    },
    systemApplications: {
      title: isFa ? fa.systemApplications.title : `Where ${page.seo.primary_keyword} are used`,
      applications: isFa ? fa.systemApplications.applications : page.applications
    },
    technicalProof: {
      title: isFa ? fa.technicalProof.title : 'Technical Proof',
      description: '',
      requiredVisuals: [],
      assets: isFa ? fa.technicalProof.assets.map((a) => ({title: a.title, description: a.description})) : undefined
    },
    processWorkflow: {
      title: isFa ? 'گردش‌کار مهندسی کنترل‌شده' : 'Engineering-Controlled Workflow',
      steps: isFa ? fa.engineeringApproach.steps : page.engineering_approach.steps
    },
    qualityCheckpoints: {
      title: isFa ? fa.qualityCheckpoints.title : `${page.seo.primary_keyword} quality checkpoints`,
      checkpoints: isFa ? fa.qualityCheckpoints.checkpoints : page.quality_checkpoints
    },
    relatedCaseStudies: {
      title: isFa ? 'پروژه‌های مرتبط' : (page.hero.secondary_cta ?? 'Related Projects')
    },
    faq: {
      title: isFa ? fa.faq.title : 'Frequently Asked Questions',
      items: isFa ? fa.faq.items : page.faq
    },
    conversionCta: {
      headline: isFa ? fa.conversionCta.headline : page.conversion_cta.headline,
      text: isFa ? fa.conversionCta.text : page.conversion_cta.text,
      button: isFa ? fa.conversionCta.button : page.conversion_cta.button,
      secondaryButton: isFa ? fa.conversionCta.secondaryButton : undefined
    },
    breadcrumbs: isFa ? fa.breadcrumbs : undefined
  };
}
