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
  const localized = {
    fa: [
      {
        projectName: 'بیمارستان ۳۲ تختخوابی ارتش',
        location: 'راز و جرگلان، خراسان شمالی، ایران',
        projectType: 'بیمارستان اضطراری — تحویل کامل EPC',
        challenge: 'بیمارستان نظامی ۳۲ تختخوابی در شرایط اضطراری کرونا ظرف ۵۰ روز از خاکبرداری تا بهره‌برداری نیاز داشت — شامل سازه، پوشانه ساندویچ پانل و پارتیشن‌های داخلی.',
        measuredResult: 'تحویل کامل از خاکبرداری تا بهره‌برداری در کمتر از ۵۰ روز. پوشانه ساندویچ پانل سقف و دیوار با هماهنگی EPC یکپارچه.'
      },
      {
        projectName: 'تأسیسات راه‌آهن طبس',
        location: 'طبس، ایران',
        projectType: 'سیستم سقف ساندویچ پانل دهانه بزرگ',
        challenge: 'سازه دوقوسی راه‌آهن نیازمند هماهنگی دقیق ساندویچ پانل با هندسه غیرمعمول، تراز سازه‌ای و تداوم آب‌بندی در دهانه بزرگ بود.',
        measuredResult: 'سیستم سقف ساندویچ پانل ۱۰,۰۰۰ مترمربع با عملکرد سازه‌ای قابل‌اتکا و کنترل نصب هماهنگ تحویل شد.'
      },
      {
        projectName: 'پارکینگ تاکسیرانی ماهشهر',
        location: 'بندر ماهشهر، خوزستان، ایران',
        projectType: 'سیستم سقف ساندویچ پانل تجاری',
        challenge: 'پارکینگ ساحلی در محیط خورنده خوزستان نیازمند هماهنگی ساندویچ پانل، زهکشی کنترل‌شده و دیتیل مقاوم در برابر خوردگی بود.',
        measuredResult: 'سیستم سقف ساندویچ پانل ۴,۰۰۰ مترمربع با مدیریت آب باران کنترل‌شده و حفاظت بلندمدت در محیط ساحلی تحویل شد.'
      }
    ],
    en: [
      {
        projectName: '32-Bed Military Hospital',
        location: 'Raz & Jargalan, North Khorasan, Iran',
        projectType: 'Emergency hospital — Full EPC delivery',
        challenge: 'COVID-19 emergency required a 32-bed hospital from excavation to readiness in under 50 days — including structure, sandwich panel envelope, and internal partitions.',
        measuredResult: 'Delivered from excavation to operational readiness in under 50 days. Sandwich panel roof and wall envelope coordinated through integrated EPC.'
      },
      {
        projectName: 'Tabas Railway Facility',
        location: 'Tabas, Iran',
        projectType: 'Large-span railway roofing system',
        challenge: 'Double-curved railway structure required sandwich panel coordination across non-standard geometry, structural alignment, and waterproofing continuity over large spans.',
        measuredResult: '10,000 m² sandwich panel roofing system delivered with controlled installation and reliable structural performance across double-curved spans.'
      },
      {
        projectName: 'Mahshahr Taxi Parking Facility',
        location: 'Bandar Mahshahr, Khuzestan, Iran',
        projectType: 'Commercial parking roofing system',
        challenge: 'Coastal parking facility in corrosive Khuzestan environment required sandwich panel coordination, controlled rainwater drainage, and corrosion-resistant detailing.',
        measuredResult: '4,000 m² sandwich panel roofing delivered with controlled rainwater management and long-term weather protection in a coastal environment.'
      }
    ],
    ar: [
      {
        projectName: 'مستشفى عسكري بسعة 32 سريرا',
        location: 'راز وجرغلان، خراسان الشمالية، إيران',
        projectType: 'مستشفى طوارئ — تسليم EPC كامل',
        challenge: 'تطلبت حالة الطوارئ الخاصة بكوفيد-19 تنفيذ مستشفى عسكري بسعة 32 سريرا من الحفر حتى الجاهزية خلال أقل من 50 يوما، بما يشمل الهيكل وغلاف ألواح الساندويتش والقواطع الداخلية.',
        measuredResult: 'تم التسليم من الحفر حتى الجاهزية التشغيلية خلال أقل من 50 يوما، مع تنسيق غلاف السقف والجدران من ألواح الساندويتش ضمن تنفيذ EPC متكامل.'
      },
      {
        projectName: 'منشأة سكة حديد طبس',
        location: 'طبس، إيران',
        projectType: 'نظام سقف واسع الامتداد بألواح الساندويتش',
        challenge: 'احتاجت البنية ذات القوسين إلى تنسيق دقيق لألواح الساندويتش مع هندسة غير تقليدية واستواء إنشائي واستمرارية العزل المائي عبر بحور كبيرة.',
        measuredResult: 'تم تسليم نظام سقف ألواح ساندويتش بمساحة 10,000 م² مع تركيب مضبوط وأداء إنشائي موثوق عبر البحور المنحنية.'
      },
      {
        projectName: 'مرفق مواقف سيارات الأجرة في ماهشهر',
        location: 'بندر ماهشهر، خوزستان، إيران',
        projectType: 'نظام سقف تجاري لمواقف السيارات',
        challenge: 'احتاج مرفق المواقف الساحلي في بيئة خوزستان المتآكلة إلى تنسيق ألواح الساندويتش وتصريف مضبوط لمياه الأمطار وتفاصيل مقاومة للتآكل.',
        measuredResult: 'تم تسليم سقف ألواح ساندويتش بمساحة 4,000 م² مع إدارة مضبوطة لمياه الأمطار وحماية طويلة الأمد في بيئة ساحلية.'
      }
    ],
    ru: [
      {
        projectName: 'Военный госпиталь на 32 койки',
        location: 'Раз и Джаргалан, Северный Хорасан, Иран',
        projectType: 'Экстренный госпиталь — полный EPC-комплекс',
        challenge: 'Условия COVID-19 потребовали подготовить военный госпиталь на 32 койки от земляных работ до готовности менее чем за 50 дней, включая конструкцию, ограждение из сэндвич-панелей и внутренние перегородки.',
        measuredResult: 'Объект был доведен от земляных работ до эксплуатационной готовности менее чем за 50 дней; кровля и стены из сэндвич-панелей были согласованы в рамках единого EPC-процесса.'
      },
      {
        projectName: 'Железнодорожный объект в Табасе',
        location: 'Табас, Иран',
        projectType: 'Крупнопролетная кровельная система из сэндвич-панелей',
        challenge: 'Двухкриволинейная железнодорожная конструкция потребовала точной координации сэндвич-панелей с нестандартной геометрией, выравниванием несущей структуры и непрерывностью гидроизоляции.',
        measuredResult: 'Кровельная система из сэндвич-панелей площадью 10,000 м² была выполнена с контролируемым монтажом и надежной работой на больших криволинейных пролетах.'
      },
      {
        projectName: 'Парковка такси в Махшехре',
        location: 'Бендер-Махшехр, Хузестан, Иран',
        projectType: 'Коммерческая кровельная система для парковки',
        challenge: 'Прибрежный объект в коррозионной среде Хузестана потребовал согласования сэндвич-панелей, контролируемого отвода дождевой воды и коррозионно-стойких деталей.',
        measuredResult: 'Кровля из сэндвич-панелей площадью 4,000 м² была выполнена с контролем дождевой воды и долговременной защитой в прибрежной среде.'
      }
    ]
  } satisfies Record<Locale, Array<{
    projectName: string;
    location: string;
    projectType: string;
    challenge: string;
    measuredResult: string;
  }>>;

  const slugs = ['army-hospital', 'tabas-railway-facility', 'mahshahr-taxi-parking'];
  const images = [armyHospitalCard, tabasCard, mahshahrTaxiCard];

  const cases = localized[locale].map((item, index) => ({
    ...item,
    areaM2: index === 0 ? '1,000 m²' : index === 1 ? '10,000 m²' : '4,000 m²',
    href: getLocalizedPath(locale, `/projects/${slugs[index]}`),
    image: images[index]
  }));

  return cases;
}

function getLocalizedSandwichPanelSystemsPage(locale: Extract<Locale, 'ar' | 'ru'>): ServicePageTemplateData {
  const isAr = locale === 'ar';
  const labels = isAr
    ? {
        keyword: 'سندويج بنل',
        title: 'سندويج بنل للأسقف والجدران الصناعية | SIPANEL',
        description: 'أنظمة سندويج بنل (ألواح الساندويتش) للأسقف والجدران الصناعية، مع مراجعة هندسية للتخطيط والعزل المائي والتوريد وتسلسل التركيب قبل الشراء والتنفيذ.',
        eyebrow: 'أنظمة أغلفة صناعية',
        h1: 'أنظمة سندويج بنل للأسقف والجدران',
        subheadline: 'تراجع SIPANEL نوع اللوح وسماكة العزل والتفاصيل والملحقات وتسلسل التركيب حتى يعمل السقف والجدار كنظام واحد.',
        primaryCta: 'اطلب استشارة فنية',
        secondaryCta: 'عرض المشاريع المرتبطة',
        trust: 'مراجعة هندسية للتخطيط والتوريد والتركيب في مشاريع ألواح الساندويتش.',
        problemTitle: 'مخاطر أنظمة ألواح الساندويتش قبل التنفيذ',
        problemCards: [
          'اختيار اللوح دون تنسيق المفاصل والفلاشينغ يمكن أن يترك نقاط تسرب.',
          'فصل التوريد عن رسومات الورشة يسبب نقص الملحقات أو تأخر الموقع.',
          'عدم ضبط تسلسل التركيب يزيد إعادة العمل ومخاطر العزل المائي.'
        ],
        approachTitle: 'منهج SIPANEL الهندسي',
        recommendationTitle: 'توصيات مستقلة للنظام',
        recommendationIntro: 'تتعامل SIPANEL مع النظام كغلاف هندسي كامل، وليس كعملية بيع مواد فقط.',
        traditional: 'توريد تقليدي',
        sipanel: 'منهج SIPANEL',
        applicationsTitle: 'استخدامات سندويج بنل',
        applications: ['أسقف وجدران المصانع', 'المستودعات والقاعات الصناعية', 'الغرف الباردة والمناطق المعزولة', 'مشاريع التوسعة والتجديد'],
        proofTitle: 'إثبات هندسي قبل التنفيذ',
        proofItems: ['رسومات الورشة', 'تفاصيل العزل المائي', 'قائمة المواد والكميات'],
        qualityTitle: 'نقاط ضبط الجودة',
        checkpoints: ['مراجعة نوع اللوح والسماكة', 'فحص المفاصل والفلاشينغ', 'تأكيد كميات الملحقات', 'مراجعة تسلسل التركيب', 'فحص العزل النهائي'],
        casesTitle: 'إثباتات مشاريع حقيقية',
        casesIntro: 'أمثلة مشاريع مرتبطة بأنظمة ألواح الساندويتش وتنفيذ الغلاف الصناعي.',
        challenge: 'التحدي',
        result: 'النتيجة',
        viewProject: 'عرض المشروع',
        faqTitle: 'أسئلة شائعة',
        conversionHeadline: 'راجع نظام سندويج بنل قبل الشراء والتركيب',
        conversionText: 'أرسل الرسومات ومعلومات المشروع حتى يراجع فريق SIPANEL التخطيط والتوريد ومخاطر التركيب.',
        conversionButton: 'اطلب مراجعة هندسية'
      }
    : {
        keyword: 'Системы сэндвич-панелей',
        title: 'Системы сэндвич-панелей | SIPANEL',
        description: 'Системы сэндвич-панелей с инженерной проверкой раскладки, гидроизоляции, поставки и последовательности монтажа до закупки и выполнения.',
        eyebrow: 'Промышленные ограждающие системы',
        h1: 'Системы сэндвич-панелей с инженерным контролем до выполнения',
        subheadline: 'SIPANEL проверяет тип панели, толщину утепления, детали, аксессуары и последовательность монтажа, чтобы кровля и стены работали как единая система.',
        primaryCta: 'Запросить техническую консультацию',
        secondaryCta: 'Смотреть связанные проекты',
        trust: 'Инженерная проверка раскладки, поставки и монтажа для проектов сэндвич-панелей.',
        problemTitle: 'Риски систем сэндвич-панелей до выполнения',
        problemCards: [
          'Выбор панели без координации стыков и примыканий оставляет риск протечек.',
          'Отрыв поставки от рабочих чертежей приводит к нехватке аксессуаров и задержкам.',
          'Непроверенная последовательность монтажа повышает риск переделок и гидроизоляционных ошибок.'
        ],
        approachTitle: 'Инженерный подход SIPANEL',
        recommendationTitle: 'Независимые рекомендации по системе',
        recommendationIntro: 'SIPANEL рассматривает систему как цельную инженерную оболочку, а не как продажу материалов.',
        traditional: 'Традиционная поставка',
        sipanel: 'Подход SIPANEL',
        applicationsTitle: 'Где применяются системы сэндвич-панелей',
        applications: ['Кровли и стены заводов', 'Склады и промышленные залы', 'Холодильные и изолированные зоны', 'Расширения и реконструкции'],
        proofTitle: 'Инженерное подтверждение до выполнения',
        proofItems: ['Рабочие чертежи', 'Детали гидроизоляции', 'Ведомость материалов и объемов'],
        qualityTitle: 'Контрольные точки качества',
        checkpoints: ['Проверка типа и толщины панели', 'Проверка стыков и примыканий', 'Подтверждение количества аксессуаров', 'Проверка последовательности монтажа', 'Итоговая проверка герметизации'],
        casesTitle: 'Доказательства реальных проектов',
        casesIntro: 'Примеры проектов, связанных с системами сэндвич-панелей и промышленной оболочкой.',
        challenge: 'Задача',
        result: 'Результат',
        viewProject: 'Смотреть проект',
        faqTitle: 'Вопросы и ответы',
        conversionHeadline: 'Проверьте систему сэндвич-панелей до закупки и монтажа',
        conversionText: 'Отправьте чертежи и данные проекта, чтобы команда SIPANEL проверила раскладку, поставку и монтажные риски.',
        conversionButton: 'Запросить инженерную проверку'
      };

  return {
    id: sandwichPanelSystemsSpec.id,
    routes: sandwichPanelSystemsSpec.route,
    seo: {
      primaryKeyword: labels.keyword,
      title: labels.title,
      metaDescription: labels.description
    },
    hero: {
      eyebrow: labels.eyebrow,
      h1: labels.h1,
      subheadline: labels.subheadline,
      primaryCta: labels.primaryCta,
      secondaryCta: labels.secondaryCta,
      visualDirection: labels.proofTitle,
      visual: sandwichPanelHero,
      visualAlt: labels.h1,
      trustMicrocopy: labels.trust
    },
    problemContext: {
      title: labels.problemTitle,
      cards: labels.problemCards
    },
    engineeringApproach: {
      title: labels.approachTitle,
      steps: [
        {title: labels.proofItems[0], description: labels.subheadline},
        {title: labels.proofItems[1], description: labels.conversionText},
        {title: labels.proofItems[2], description: labels.trust}
      ]
    },
    independentRecommendations: {
      title: labels.recommendationTitle,
      intro: labels.recommendationIntro,
      points: [
        {title: labels.proofItems[0], description: labels.subheadline},
        {title: labels.proofItems[2], description: labels.trust},
        {title: labels.qualityTitle, description: labels.conversionText}
      ],
      comparison: {
        traditional: {label: labels.traditional, items: labels.problemCards},
        sipanel: {label: labels.sipanel, items: labels.checkpoints.slice(0, 3)}
      }
    },
    systemApplications: {
      title: labels.applicationsTitle,
      applications: labels.applications
    },
    technicalProof: {
      title: labels.proofTitle,
      description: '',
      requiredVisuals: [],
      assets: [
        {title: labels.proofItems[0], description: labels.subheadline, image: installationImg, imageMobile: installationMobileImg, alt: labels.proofItems[0]},
        {title: labels.proofItems[1], description: labels.conversionText, image: technicalDetailImg, imageMobile: technicalDetailMobileImg, alt: labels.proofItems[1]},
        {title: labels.proofItems[2], description: labels.trust, image: bomMtoImage, alt: labels.proofItems[2]}
      ]
    },
    processWorkflow: {title: '', steps: []},
    qualityCheckpoints: {
      title: labels.qualityTitle,
      checkpoints: labels.checkpoints
    },
    relatedCaseStudies: {
      title: labels.casesTitle,
      intro: labels.casesIntro,
      cases: getRelatedCaseStudies(locale)
    },
    faq: {
      title: labels.faqTitle,
      items: [
        {question: labels.recommendationTitle, answer: labels.recommendationIntro},
        {question: labels.qualityTitle, answer: labels.conversionText}
      ]
    },
    conversionCta: {
      headline: labels.conversionHeadline,
      text: labels.conversionText,
      button: labels.conversionButton,
      secondaryButton: labels.secondaryCta
    },
    breadcrumbs: [
      {label: isAr ? 'الرئيسية' : 'Главная', href: getLocalizedPath(locale)},
      {label: isAr ? 'الأنظمة' : 'Системы', href: getLocalizedPath(locale, '/systems')},
      {label: labels.keyword, href: getLocalizedPath(locale, '/systems/sandwich-panel-systems')}
    ],
    caseStudyLabels: {
      challenge: labels.challenge,
      result: labels.result,
      viewProject: labels.viewProject
    }
  };
}

export function getSandwichPanelSystemsPage(locale: Locale): ServicePageTemplateData {
  if (locale === 'ar' || locale === 'ru') {
    return getLocalizedSandwichPanelSystemsPage(locale);
  }

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
      {label: 'Home', href: getLocalizedPath(locale)},
      {label: 'Systems', href: getLocalizedPath(locale, '/systems')},
      {label: 'Sandwich Panel Systems', href: getLocalizedPath(locale, '/systems/sandwich-panel-systems')}
    ],
    caseStudyLabels: isFa ? fa.caseStudyLabels : {challenge: 'Challenge', result: 'Result', viewProject: 'View Project'}
  };
}
