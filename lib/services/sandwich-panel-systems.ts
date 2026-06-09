import serviceSystemPages from '@/specs/pages/service_system_pages.json';
import type {ServicePageTemplateData} from '@/components/services/service-page-template';
import type {Locale} from '@/i18n/routing';
import tabasCard from '@/assets/projects/tabas/photos/tabas-card.webp';
import mahshahrTaxiCard from '@/assets/projects/mahshahr_taxi/photos/mahshahr_taxi-card.webp';

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

function getRequiredSandwichPanelSystemsSpec(): ServiceSystemPageSpec {
  const page = servicePages.find((item) => item.id === 'sandwich_panel_systems');

  if (!page) {
    throw new Error('Missing sandwich_panel_systems in service_system_pages.json');
  }

  return page;
}

export const sandwichPanelSystemsSpec = getRequiredSandwichPanelSystemsSpec();

type LocalizedContent = {
  seo: {
    title: string;
    metaDescription: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  problemContext: {
    title: string;
    cards: string[];
  };
  engineeringApproach: {
    title: string;
    steps: Array<{title: string; description: string}>;
  };
  systemApplications: {
    title: string;
    applications: string[];
  };
  technicalProof: {
    title: string;
    assets: Array<{title: string; description: string}>;
  };
  processWorkflow: {
    title: string;
  };
  qualityCheckpoints: {
    title: string;
    checkpoints: string[];
  };
  relatedCaseStudies: {
    title: string;
  };
  faq: {
    title: string;
    items: Array<{question: string; answer: string}>;
  };
  conversionCta: {
    headline: string;
    text: string;
    button: string;
    secondaryButton: string;
  };
  breadcrumbs: Array<{label: string; href: string}>;
  caseStudyLabels: {
    challenge: string;
    result: string;
    viewProject: string;
  };
};

const faContent: LocalizedContent = {
  seo: {
    title: 'سیستم‌های ساندویچ پانل | مهندسی، تأمین و اجرای کنترل‌شده SIPANEL',
    metaDescription: 'سی‌پانل سیستم‌های ساندویچ پانل را با شاپ‌دراوینگ، انتخاب متریال، منطق آب‌بندی، تأمین کنترل‌شده و نصب مهندسی برای پروژه‌های صنعتی اجرا می‌کند.'
  },
  hero: {
    eyebrow: 'سیستم‌های پانل صنعتی',
    h1: 'سیستم‌های ساندویچ پانل با مهندسی پیش از نصب',
    subheadline: 'سی‌پانل چیدمان پانل، یراق‌آلات، فلاشینگ، حجم تأمین و ترتیب نصب را هماهنگ می‌کند تا پرت مصالح، ریسک نشتی و خطاهای اجرایی کاهش یابد.',
    primaryCta: 'درخواست بررسی مهندسی پروژه',
    secondaryCta: 'مشاهده پروژه‌های مرتبط'
  },
  problemContext: {
    title: 'مشکلات رایج در پروژه‌های ساندویچ پانل',
    cards: [
      'انتخاب نادرست نوع پانل متناسب با اقلیم یا کاربری',
      'عدم هماهنگی بین تأمین‌کننده و تیم نصب',
      'پرت مصالح به دلیل برآورد نادرست حجم',
      'ریسک نشتی ناشی از جزئیات ضعیف فلاشینگ و درز',
      'تأخیر پروژه به دلیل نبود یراق‌آلات یا نقشه‌های ناقص'
    ]
  },
  engineeringApproach: {
    title: 'کنترل مهندسی ریسک سیستم پانل',
    steps: [
      {
        title: 'بررسی سیستم پانل',
        description: 'نقشه‌های پروژه، الزامات پوشانه، نیاز عایق‌بندی و شرایط سایت پیش از تأمین بررسی می‌شود.'
      },
      {
        title: 'هماهنگی شاپ‌دراوینگ',
        description: 'چیدمان پانل، لیست برش، منطق درز، یراق‌آلات و ترتیب نصب پیش از اجرا مشخص می‌شود.'
      },
      {
        title: 'برنامه‌ریزی تأمین هوشمند',
        description: 'حجم پانل، فلاشینگ، بست، تریم و یراق‌آلات برای کاهش پرت و تأخیر سایت برنامه‌ریزی می‌شود.'
      },
      {
        title: 'نصب کنترل‌شده',
        description: 'اجرا بر اساس نقشه‌های هماهنگ، چک‌پوینت‌های بازرسی و منطق جزئیات آب‌بندی انجام می‌شود.'
      }
    ]
  },
  systemApplications: {
    title: 'کاربردهای سیستم ساندویچ پانل',
    applications: [
      'کارخانه‌های صنعتی',
      'انبارها و سوله‌ها',
      'سردخانه‌ها',
      'تأسیسات غذایی و دارویی',
      'مراکز لجستیک',
      'فضاهای صنعتی تمیز'
    ]
  },
  technicalProof: {
    title: 'شواهد فنی پیش از اجرا',
    assets: [
      {title: 'پیش‌نمایش چیدمان پانل', description: 'نقشه چیدمان ساندویچ پانل بر اساس شاپ‌دراوینگ پروژه'},
      {title: 'جزئیات اتصال', description: 'دیتیل اتصالات پانل و المان‌های سازه‌ای'},
      {title: 'جزئیات فلاشینگ', description: 'دیتیل فلاشینگ و آب‌بندی درزها'},
      {title: 'پیش‌نمایش BOM/MTO', description: 'فهرست متریال و برآورد حجم تأمین'}
    ]
  },
  processWorkflow: {
    title: 'گردش‌کار مهندسی کنترل‌شده'
  },
  qualityCheckpoints: {
    title: 'چک‌پوینت‌های کیفیت',
    checkpoints: [
      'بررسی ضخامت پانل و نوع هسته',
      'بازبینی درز و هم‌پوشانی',
      'هماهنگی فلاشینگ و تریم',
      'تأیید حجم یراق‌آلات',
      'بازبینی ترتیب نصب',
      'بازرسی نهایی ظاهری و آب‌بندی'
    ]
  },
  relatedCaseStudies: {
    title: 'پروژه‌های مرتبط'
  },
  faq: {
    title: 'سوالات متداول',
    items: [
      {
        question: 'سی‌پانل چگونه پرت مصالح ساندویچ پانل را کاهش می‌دهد؟',
        answer: 'با بررسی چیدمان، حجم، منطق برش و یراق‌آلات پیش از تأمین و نصب.'
      },
      {
        question: 'آیا سی‌پانل فقط تأمین‌کننده ساندویچ پانل است؟',
        answer: 'خیر. سی‌پانل بر اجرای مهندسی‌شده سیستم پانل تمرکز دارد؛ شامل بررسی، هماهنگی تأمین و نصب.'
      },
      {
        question: 'انتخاب نوع پانل بر چه اساسی انجام می‌شود؟',
        answer: 'بر اساس کاربری پروژه، نیاز عایق‌بندی، شرایط محیطی، ملاحظات حریق و شرایط اجرایی.'
      },
      {
        question: 'برای کاهش ریسک نفوذ آب در سقف ساندویچ پانل چه مواردی کنترل می‌شود؟',
        answer: 'شیب سقف، مسیر آب‌بندی، جزئیات فلاشینگ، درزهای اتصال و ترتیب نصب بررسی و کنترل می‌شود.'
      }
    ]
  },
  conversionCta: {
    headline: 'قبل از تأمین و نصب، ریسک سیستم پانل را بررسی کنید',
    text: 'درخواست بررسی مهندسی پروژه برای چیدمان، تأمین و اجرای کنترل‌شده.',
    button: 'درخواست بررسی مهندسی پروژه',
    secondaryButton: 'مشاهده پروژه‌های مرتبط'
  },
  breadcrumbs: [
    {label: 'خانه', href: '/fa'},
    {label: 'پوشانه‌ها', href: '/fa/systems'},
    {label: 'سیستم‌های ساندویچ پانل', href: '/fa/systems/sandwich-panel-systems'}
  ],
  caseStudyLabels: {
    challenge: 'چالش',
    result: 'نتیجه',
    viewProject: 'مشاهده پروژه'
  }
};

function getRelatedCaseStudies(locale: Locale) {
  const cases = [
    {
      projectName: locale === 'fa' ? 'تأسیسات راه‌آهن طبس' : 'Tabas Railway Facility',
      location: locale === 'fa' ? 'طبس، ایران' : 'Tabas, Iran',
      areaM2: '10,000 m²',
      projectType: locale === 'fa' ? 'سیستم سقف ساندویچ پانل دهانه بزرگ' : 'Large-span railway roofing system',
      challenge: locale === 'fa'
        ? 'سازه دوقوسی راه‌آهن نیازمند هماهنگی دقیق ساندویچ پانل، تراز سازه‌ای و تداوم آب‌بندی بود.'
        : 'A double-curved railway structure required advanced sandwich panel coordination, precise structural alignment, and waterproofing continuity.',
      measuredResult: locale === 'fa'
        ? 'سیستم سقف ساندویچ پانل دهانه بزرگ با عملکرد سازه‌ای قابل‌اتکا تحویل شد.'
        : 'A durable large-span sandwich panel roofing system was delivered with reliable structural performance.',
      href: `/${locale}/projects/tabas-railway-facility`,
      image: tabasCard
    },
    {
      projectName: locale === 'fa' ? 'پارکینگ تاکسیرانی ماهشهر' : 'Mahshahr Taxi Parking Facility',
      location: locale === 'fa' ? 'بندر ماهشهر، خوزستان، ایران' : 'Bandar Mahshahr, Khuzestan, Iran',
      areaM2: '4,000 m²',
      projectType: locale === 'fa' ? 'سیستم سقف ساندویچ پانل تجاری' : 'Commercial parking roofing system',
      challenge: locale === 'fa'
        ? 'پارکینگ ساحلی نیازمند هماهنگی ساندویچ پانل، زهکشی کنترل‌شده و دیتیل مقاوم در برابر خوردگی بود.'
        : 'A coastal parking facility required sandwich panel coordination, controlled rainwater drainage, and corrosion-resistant detailing.',
      measuredResult: locale === 'fa'
        ? 'سیستم سقف ساندویچ پانل با مدیریت آب باران و حفاظت بلندمدت در برابر آب‌وهوا تحویل شد.'
        : 'A durable sandwich panel roofing system was delivered with reliable rainwater management and long-term weather protection.',
      href: `/${locale}/projects/mahshahr-taxi-parking`,
      image: mahshahrTaxiCard
    },
    {
      projectName: locale === 'fa' ? 'بیمارستان ۳۲ تختخوابی ارتش' : '32-Bed Military Hospital',
      location: locale === 'fa' ? 'راز و جرگلان، خراسان شمالی، ایران' : 'Raz & Jargalan, North Khorasan, Iran',
      areaM2: '1,000 m²',
      projectType: locale === 'fa' ? 'بیمارستان اضطراری — تحویل کامل EPC' : 'Emergency hospital — Full EPC delivery',
      challenge: locale === 'fa'
        ? 'بیمارستان نظامی ۳۲ تختخوابی در شرایط اضطراری کرونا ظرف ۵۰ روز از خاکبرداری تا بهره‌برداری نیاز داشت.'
        : 'A fully operational 32-bed military hospital was needed from excavation to readiness in under 50 days during the COVID-19 emergency.',
      measuredResult: locale === 'fa'
        ? 'بیمارستان نظامی ۳۲ تختخوابی از خاکبرداری تا بهره‌برداری در کمتر از ۵۰ روز تحویل شد.'
        : 'A fully operational 32-bed military hospital was delivered from excavation to readiness in less than 50 days.',
      href: `/${locale}/projects/army-hospital`
    }
  ];

  return cases;
}

export function getSandwichPanelSystemsPage(locale: Locale): ServicePageTemplateData {
  const page = sandwichPanelSystemsSpec;
  const isFa = locale === 'fa';
  const fa = faContent;

  return {
    id: page.id,
    routes: page.route,
    seo: {
      primaryKeyword: isFa ? 'سیستم‌های ساندویچ پانل' : page.seo.primary_keyword,
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
      title: isFa ? fa.processWorkflow.title : 'Engineering-Controlled Workflow',
      steps: isFa ? fa.engineeringApproach.steps : page.engineering_approach.steps
    },
    qualityCheckpoints: {
      title: isFa ? fa.qualityCheckpoints.title : `${page.seo.primary_keyword} quality checkpoints`,
      checkpoints: isFa ? fa.qualityCheckpoints.checkpoints : page.quality_checkpoints
    },
    relatedCaseStudies: {
      title: isFa ? fa.relatedCaseStudies.title : (page.hero.secondary_cta ?? 'Related Projects'),
      cases: getRelatedCaseStudies(locale)
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
    breadcrumbs: isFa ? fa.breadcrumbs : undefined,
    caseStudyLabels: isFa ? fa.caseStudyLabels : undefined
  };
}
