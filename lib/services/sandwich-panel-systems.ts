import serviceSystemPages from '@/specs/pages/service_system_pages.json';
import type {ServicePageTemplateData} from '@/components/services/service-page-template';
import {getLocalizedPath, type Locale} from '@/i18n/routing';
import armyHospitalCard from '@/assets/projects/army-hospital/photos/army-hospital-card.webp';
import tabasCard from '@/assets/projects/tabas/photos/tabas-card.webp';
import mahshahrTaxiCard from '@/assets/projects/mahshahr_taxi/photos/mahshahr_taxi-card.webp';
import sandwichPanelHero from '@/assets/systems/sandwich-panel/hero-desktop.webp';
import installationImg from '@/assets/systems/sandwich-panel/installation.webp';
import installationMobileImg from '@/assets/systems/sandwich-panel/installation-mobile.webp';
import technicalDetailImg from '@/assets/systems/sandwich-panel/technical-detail.webp';
import technicalDetailMobileImg from '@/assets/systems/sandwich-panel/technical-detail-mobile.webp';
import bomMtoImage from '@/assets/technical/procurement/bom-mto-preview.webp';

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

export const sandwichPanelSystemsSpec = {
  ...getRequiredSandwichPanelSystemsSpec(),
  route: {
    en: getLocalizedPath('en', '/systems/sandwich-panel-systems'),
    fa: getLocalizedPath('fa', '/systems/sandwich-panel-systems'),
    ar: getLocalizedPath('ar', '/systems/sandwich-panel-systems'),
    ru: getLocalizedPath('ru', '/systems/sandwich-panel-systems')
  }
};

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
        question: 'سی‌پانل نوع پانل مناسب پروژه را چگونه انتخاب می‌کند؟',
        answer: 'نوع پانل، هسته عایق (PIR، PUR، پشم سنگ، EPS) و ضخامت بر اساس اقلیم پروژه، بارهای سازه‌ای، مقررات حریق و کاربری بررسی می‌شود.'
      },
      {
        question: 'ریسک نشتی سقف در سیستم‌های ساندویچ پانل چگونه کنترل می‌شود؟',
        answer: 'شیب سقف، مسیرهای زهکشی، جزئیات فلاشینگ، آب‌بندی درز و ترتیب نصب پیش از تأمین پانل بررسی و هماهنگ می‌شود.'
      },
      {
        question: 'آیا سی‌پانل شاپ‌دراوینگ پیش از خرید تهیه می‌کند؟',
        answer: 'بله. چیدمان پانل، لیست برش، موقعیت فلاشینگ، حجم متعلقات و ترتیب نصب در شاپ‌دراوینگ پیش از سفارش مستند می‌شود.'
      },
      {
        question: 'سی‌پانل چگونه پرت متریال را کاهش می‌دهد؟',
        answer: 'با برنامه‌ریزی هماهنگ چیدمان، استخراج دقیق BOM، بهینه‌سازی لیست برش و تأیید حجم متعلقات پیش از خرید.'
      },
      {
        question: 'آیا سی‌پانل با تولیدکننده خاصی کار می‌کند؟',
        answer: 'سی‌پانل وابسته به یک تولیدکننده نیست. برند و مشخصات پانل بر اساس نیاز پروژه پیشنهاد می‌شود، نه بر اساس قرارداد با تأمین‌کننده.'
      },
      {
        question: 'در بررسی مهندسی چه مواردی انجام می‌شود؟',
        answer: 'نقشه‌های پروژه، الزامات پوشانه، نیاز عایق‌بندی، منطق آب‌بندی و شرایط سایت بررسی می‌شود. یک برنامه اجرایی هماهنگ پیش از خرید تهیه می‌شود.'
      },
      {
        question: 'آیا سی‌پانل تأمین و متعلقات را هماهنگ می‌کند؟',
        answer: 'بله. پانل، فلاشینگ، بست، تریم، درزگیر و متعلقات خط‌الرأس/لبه با هم برنامه‌ریزی می‌شوند تا از تأخیر سایت و کمبود قطعات جلوگیری شود.'
      },
      {
        question: 'آیا سی‌پانل فقط تأمین‌کننده است یا نصب هم انجام می‌دهد؟',
        answer: 'سی‌پانل اجرای مهندسی‌شده ارائه می‌دهد — از بررسی سیستم و شاپ‌دراوینگ تا هماهنگی تأمین و نصب کنترل‌شده.'
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
    {label: 'خانه', href: getLocalizedPath('fa')},
    {label: 'پوشانه‌ها', href: getLocalizedPath('fa', '/systems')},
    {label: 'سیستم‌های ساندویچ پانل', href: getLocalizedPath('fa', '/systems/sandwich-panel-systems')}
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
      projectName: locale === 'fa' ? 'بیمارستان ۳۲ تختخوابی ارتش' : '32-Bed Military Hospital',
      location: locale === 'fa' ? 'راز و جرگلان، خراسان شمالی، ایران' : 'Raz & Jargalan, North Khorasan, Iran',
      areaM2: '1,000 m²',
      projectType: locale === 'fa' ? 'بیمارستان اضطراری — تحویل کامل EPC' : 'Emergency hospital — Full EPC delivery',
      challenge: locale === 'fa'
        ? 'بیمارستان نظامی ۳۲ تختخوابی در شرایط اضطراری کرونا ظرف ۵۰ روز از خاکبرداری تا بهره‌برداری نیاز داشت — شامل سازه، پوشانه ساندویچ پانل و پارتیشن‌های داخلی.'
        : 'COVID-19 emergency required a 32-bed hospital from excavation to readiness in under 50 days — including structure, sandwich panel envelope, and internal partitions.',
      measuredResult: locale === 'fa'
        ? 'تحویل کامل از خاکبرداری تا بهره‌برداری در کمتر از ۵۰ روز. پوشانه ساندویچ پانل سقف و دیوار با هماهنگی EPC یکپارچه.'
        : 'Delivered from excavation to operational readiness in under 50 days. Sandwich panel roof and wall envelope coordinated through integrated EPC.',
      href: getLocalizedPath(locale, '/projects/army-hospital'),
      image: armyHospitalCard
    },
    {
      projectName: locale === 'fa' ? 'تأسیسات راه‌آهن طبس' : 'Tabas Railway Facility',
      location: locale === 'fa' ? 'طبس، ایران' : 'Tabas, Iran',
      areaM2: '10,000 m²',
      projectType: locale === 'fa' ? 'سیستم سقف ساندویچ پانل دهانه بزرگ' : 'Large-span railway roofing system',
      challenge: locale === 'fa'
        ? 'سازه دوقوسی راه‌آهن نیازمند هماهنگی دقیق ساندویچ پانل با هندسه غیرمعمول، تراز سازه‌ای و تداوم آب‌بندی در دهانه بزرگ بود.'
        : 'Double-curved railway structure required sandwich panel coordination across non-standard geometry, structural alignment, and waterproofing continuity over large spans.',
      measuredResult: locale === 'fa'
        ? 'سیستم سقف ساندویچ پانل ۱۰,۰۰۰ مترمربع با عملکرد سازه‌ای قابل‌اتکا و کنترل نصب هماهنگ تحویل شد.'
        : '10,000 m² sandwich panel roofing system delivered with controlled installation and reliable structural performance across double-curved spans.',
      href: getLocalizedPath(locale, '/projects/tabas-railway-facility'),
      image: tabasCard
    },
    {
      projectName: locale === 'fa' ? 'پارکینگ تاکسیرانی ماهشهر' : 'Mahshahr Taxi Parking Facility',
      location: locale === 'fa' ? 'بندر ماهشهر، خوزستان، ایران' : 'Bandar Mahshahr, Khuzestan, Iran',
      areaM2: '4,000 m²',
      projectType: locale === 'fa' ? 'سیستم سقف ساندویچ پانل تجاری' : 'Commercial parking roofing system',
      challenge: locale === 'fa'
        ? 'پارکینگ ساحلی در محیط خورنده خوزستان نیازمند هماهنگی ساندویچ پانل، زهکشی کنترل‌شده و دیتیل مقاوم در برابر خوردگی بود.'
        : 'Coastal parking facility in corrosive Khuzestan environment required sandwich panel coordination, controlled rainwater drainage, and corrosion-resistant detailing.',
      measuredResult: locale === 'fa'
        ? 'سیستم سقف ساندویچ پانل ۴,۰۰۰ مترمربع با مدیریت آب باران کنترل‌شده و حفاظت بلندمدت در محیط ساحلی تحویل شد.'
        : '4,000 m² sandwich panel roofing delivered with controlled rainwater management and long-term weather protection in a coastal environment.',
      href: getLocalizedPath(locale, '/projects/mahshahr-taxi-parking'),
      image: mahshahrTaxiCard
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
      visualDirection: page.hero.visual_direction,
      visual: sandwichPanelHero,
      visualAlt: isFa ? 'نصب ساندویچ پانل سقف صنعتی' : 'Industrial sandwich panel roof installation',
      trustMicrocopy: isFa
        ? 'بیش از ۲۰۰ پروژه صنعتی با هماهنگی مهندسی SIPANEL اجرا شده است.'
        : '200+ industrial projects executed with SIPANEL engineering coordination.'
    },
    problemContext: {
      title: isFa ? fa.problemContext.title : page.problem_context.title,
      cards: isFa ? fa.problemContext.cards : page.problem_context.cards
    },
    engineeringApproach: {
      title: isFa ? fa.engineeringApproach.title : page.engineering_approach.title,
      steps: isFa ? fa.engineeringApproach.steps : page.engineering_approach.steps
    },
    independentRecommendations: {
      title: isFa
        ? 'توصیه‌های مستقل سیستم'
        : 'Independent System Recommendations',
      intro: isFa
        ? 'سی‌پانل به عنوان مهندس سیستم پوشش عمل می‌کند، نه به عنوان فروشنده متریال. انتخاب سیستم بر اساس شرایط پروژه انجام می‌شود، نه بر اساس موجودی انبار.'
        : 'SIPANEL operates as an envelope system engineer, not a material reseller. System selection is based on project conditions, not warehouse inventory.',
      points: isFa
        ? [
            {title: 'انتخاب سیستم بر اساس پروژه', description: 'نوع پانل، هسته عایق و ضخامت بر اساس اقلیم، بارها، مقررات حریق و کاربری پروژه بررسی و پیشنهاد می‌شود.'},
            {title: 'پشتیبانی برنامه‌ریزی تأمین', description: 'حجم پانل، فلاشینگ، بست و متعلقات پیش از سفارش با شاپ‌دراوینگ و لیست برش هماهنگ می‌شود.'},
            {title: 'هماهنگی ریسک نصب', description: 'ترتیب نصب، جزئیات آب‌بندی و چک‌پوینت‌های کیفیت پیش از شروع کار سایت بررسی می‌شود.'}
          ]
        : [
            {title: 'Project-First System Selection', description: 'Panel type, insulation core, and thickness are reviewed based on climate, loads, fire regulations, and project use — not supplier preference.'},
            {title: 'Procurement Planning Support', description: 'Panel quantities, flashings, fasteners, and accessories are coordinated with shop drawings and cut lists before ordering.'},
            {title: 'Installation Risk Coordination', description: 'Installation sequence, waterproofing details, and quality checkpoints are reviewed before site work begins.'}
          ],
      comparison: isFa
        ? {
            traditional: {
              label: 'تأمین سنتی',
              items: ['انتخاب بر اساس موجودی', 'بدون شاپ‌دراوینگ', 'بدون بررسی آب‌بندی', 'تأمین جداگانه متعلقات', 'حل مشکل در سایت']
            },
            sipanel: {
              label: 'رویکرد مهندسی SIPANEL',
              items: ['انتخاب بر اساس شرایط پروژه', 'شاپ‌دراوینگ پیش از خرید', 'بررسی منطق آب‌بندی', 'تأمین هماهنگ متعلقات', 'پیشگیری از مشکل پیش از اجرا']
            }
          }
        : {
            traditional: {
              label: 'Traditional Supply',
              items: ['Selection based on stock availability', 'No shop drawings before procurement', 'Waterproofing reviewed after installation', 'Accessories ordered separately', 'Problems resolved on site']
            },
            sipanel: {
              label: 'SIPANEL Engineering Approach',
              items: ['Selection based on project conditions', 'Shop drawings before procurement', 'Waterproofing logic reviewed upfront', 'Accessories coordinated with panels', 'Risks identified before site work']
            }
          }
    },
    systemApplications: {
      title: isFa ? fa.systemApplications.title : `Where ${page.seo.primary_keyword} are used`,
      applications: isFa ? fa.systemApplications.applications : page.applications
    },
    technicalProof: {
      title: isFa ? fa.technicalProof.title : 'Engineering Proof',
      description: '',
      requiredVisuals: [],
      assets: [
        {
          title: isFa ? 'نقشه شاپ‌دراوینگ' : 'Shop Drawing',
          description: isFa ? 'نقشه چیدمان پانل و جزئیات اتصال پیش از تأمین' : 'Panel layout and connection details coordinated before procurement.',
          image: installationImg,
          imageMobile: installationMobileImg,
          alt: isFa ? 'نمونه شاپ‌دراوینگ ساندویچ پانل' : 'Sandwich panel shop drawing example'
        },
        {
          title: isFa ? 'جزئیات آب‌بندی' : 'Waterproofing Detail',
          description: isFa ? 'جزئیات فلاشینگ، ناودان و آب‌بندی درز' : 'Flashing, gutter, and joint sealing details reviewed before installation.',
          image: technicalDetailImg,
          imageMobile: technicalDetailMobileImg,
          alt: isFa ? 'جزئیات فلاشینگ و آب‌بندی' : 'Flashing and waterproofing detail'
        },
        {
          title: isFa ? 'فهرست متریال (BOM)' : 'BOM / Material Takeoff',
          description: isFa ? 'فهرست متریال و برآورد حجم تأمین هماهنگ با شاپ‌دراوینگ' : 'Material list and quantity takeoff coordinated with shop drawings.',
          image: bomMtoImage,
          alt: isFa ? 'نمونه فهرست متریال و BOM' : 'BOM and material takeoff example'
        }
      ]
    },
    processWorkflow: {
      title: '',
      steps: []
    },
    qualityCheckpoints: {
      title: isFa ? fa.qualityCheckpoints.title : 'Sandwich Panel Systems Quality Checkpoints',
      checkpoints: isFa ? fa.qualityCheckpoints.checkpoints : page.quality_checkpoints
    },
    relatedCaseStudies: {
      title: isFa ? 'شواهد اجرایی از پروژه‌های واقعی' : 'Project Proof From Real Execution',
      intro: isFa
        ? 'نتایج زیر از پروژه‌های واقعی اجراشده با هماهنگی مهندسی SIPANEL استخراج شده است.'
        : 'The following results are from real projects executed with SIPANEL engineering coordination.',
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
    breadcrumbs: isFa ? fa.breadcrumbs : [
      {label: locale === 'ar' ? 'الرئيسية' : locale === 'ru' ? 'Главная' : 'Home', href: getLocalizedPath(locale)},
      {label: locale === 'ar' ? 'الأنظمة' : locale === 'ru' ? 'Системы' : 'Systems', href: getLocalizedPath(locale, '/systems')},
      {label: locale === 'ar' ? 'أنظمة ألواح الساندويتش' : locale === 'ru' ? 'Сэндвич-панельные системы' : 'Sandwich Panel Systems', href: getLocalizedPath(locale, '/systems/sandwich-panel-systems')}
    ],
    caseStudyLabels: isFa ? fa.caseStudyLabels : locale === 'ar' ? {challenge: 'التحدي', result: 'النتيجة', viewProject: 'عرض المشروع'} : locale === 'ru' ? {challenge: 'Задача', result: 'Результат', viewProject: 'Посмотреть проект'} : {challenge: 'Challenge', result: 'Result', viewProject: 'View Project'}
  };
}
