import type {ServicePageTemplateData} from '@/components/services/service-page-template';
import {getLocalizedPath, type Locale} from '@/i18n/routing';
import daylightingHero from '@/assets/systems/transparent-roofing/cover-desktop.webp';
import daylightInteriorImg from '@/assets/systems/transparent-roofing/interior-view.webp';
import daylightInteriorMobileImg from '@/assets/systems/transparent-roofing/interior-view-mobile.webp';
import daylightJunctionImg from '@/assets/systems/transparent-roofing/junction-detail.webp';
import daylightJunctionMobileImg from '@/assets/systems/transparent-roofing/junction-detail-mobile.webp';
import bomMtoImage from '@/assets/technical/procurement/bom-mto-preview.webp';
import fadakMallCard from '@/assets/projects/fadak-mall-glass-skylight/photos/fadak-mall-glass-skylight-card.webp';
import atlasHotelCard from '@/assets/projects/atlas-hotel-shahinshahr-atrium/photos/atlas-hotel-shahinshahr-atrium-card.webp';
import kermanshahCard from '@/assets/projects/kermanshah-industrial-university-petroleum-faculty/photos/kermanshah-industrial-university-petroleum-faculty-card.webp';

export const daylightingTransparentRoofingSpec = {
  route: {
    en: getLocalizedPath('en', '/systems/daylighting-transparent-roofing'),
    fa: getLocalizedPath('fa', '/systems/daylighting-transparent-roofing'),
    ar: getLocalizedPath('ar', '/systems/daylighting-transparent-roofing'),
    ru: getLocalizedPath('ru', '/systems/daylighting-transparent-roofing')
  },
  seo: {
    primary_keyword: 'daylighting transparent roofing',
    title: 'Daylighting & Transparent Roofing | SIPANEL Industrial Skylight Systems',
    meta_description: 'SIPANEL engineers daylighting and transparent roofing systems with polycarbonate, glass skylights, and hybrid solutions — coordinating structural integration, thermal performance, and weather resistance for industrial projects.'
  }
};

type LocalizedContent = {
  seo: {
    primaryKeyword: string;
    title: string;
    metaDescription: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    visualAlt: string;
    trustMicrocopy: string;
  };
  problemContext: {
    title: string;
    cards: string[];
  };
  engineeringApproach: {
    title: string;
    steps: Array<{title: string; description: string}>;
  };
  independentRecommendations: {
    title: string;
    intro: string;
    points: Array<{title: string; description: string}>;
    comparison: {
      traditional: {label: string; items: string[]};
      sipanel: {label: string; items: string[]};
    };
  };
  systemApplications: {
    title: string;
    applications: string[];
  };
  technicalProof: {
    title: string;
    assets: Array<{title: string; description: string; alt: string}>;
  };
  qualityCheckpoints: {
    title: string;
    checkpoints: string[];
  };
  relatedCaseStudies: {
    title: string;
    intro: string;
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

// ── Persian ──

const fa: LocalizedContent = {
  seo: {
    primaryKeyword: 'سیستم‌های نورگیر و پوشش شفاف',
    title: 'نورگیرها و پوشش‌های شفاف | سیستم‌های نورگیر صنعتی SIPANEL',
    metaDescription: 'سی‌پانل سیستم‌های نورگیر و پوشش شفاف را با پلی‌کربنات، اسکای‌لایت شیشه‌ای و راهکارهای ترکیبی — همراه با یکپارچگی سازه‌ای، عملکرد حرارتی و مقاومت در برابر آب‌وهوا — برای پروژه‌های صنعتی مهندسی می‌کند.'
  },
  hero: {
    eyebrow: 'سیستم‌های نورگیر و شفاف',
    h1: 'سیستم‌های پوشش شفاف با مهندسی عملکردی',
    subheadline: 'سی‌پانل چیدمان نورگیر، انتخاب پلی‌کربنات، یکپارچگی سازه‌ای، عملکرد حرارتی و مقاومت در برابر آب‌وهوا را پیش از شروع نصب هماهنگ می‌کند.',
    primaryCta: 'درخواست بررسی نورگیر',
    secondaryCta: 'مشاهده پروژه‌های مرتبط',
    visualAlt: 'نصب نورگیر صنعتی با جزئیات مهندسی عملکردی',
    trustMicrocopy: 'بررسی فنی برای سیستم‌های نورگیر صنعتی، انتخاب متریال و هماهنگی نصب.'
  },
  problemContext: {
    title: 'مشکلات رایج نورگیر معمولاً از ضعف هماهنگی شروع می‌شود',
    cards: [
      'انتخاب نادرست متریال برای شرایط UV و حرارتی: بدون بررسی اقلیمی، پلی‌کربنات یا شیشه نامناسب انتخاب می‌شود و عمر مفید کاهش می‌یابد',
      'هماهنگی ضعیف سازه‌ای بین نورگیر و قاب اصلی: نورگیر بدون هماهنگی با سازه اصلی نصب می‌شود و ریسک ترک، تغییر شکل یا نشتی ایجاد می‌شود',
      'ریسک نشتی از فلاشینگ و آب‌بندی ضعیف در پنل‌های شفاف: نقاط اتصال نورگیر به سقف فلزی بدون دیتیل دقیق مستعد نشتی هستند',
      'عملکرد حرارتی ناکافی و ریسک تعریق: بدون بررسی عایق‌بندی و تهویه، تعریق و افت عملکرد حرارتی ایجاد می‌شود',
      'کاهش عبور نور و تأخیر پروژه از دیتیل‌گذاری نامشخص: بدون شاپ‌دراوینگ و برنامه‌ریزی دقیق، هم عملکرد نوری کاهش می‌یابد و هم زمان‌بندی پروژه به هم می‌ریزد'
    ]
  },
  engineeringApproach: {
    title: 'کنترل مهندسی ریسک نورگیر پیش از اجرا',
    steps: [
      {
        title: 'هماهنگی شاپ‌دراوینگ',
        description: 'چیدمان نورگیر، آرایش پنل، جزئیات فلاشینگ، اتصالات سازه‌ای و ترتیب نصب پیش از تأمین مستند می‌شود.'
      },
      {
        title: 'برنامه‌ریزی BOM و متریال',
        description: 'پنل‌های پلی‌کربنات، یونیت‌های شیشه‌ای، گسکت‌ها، فلاشینگ‌ها، سیلانت‌ها و متعلقات سازه‌ای برای کاهش پرت و تأخیر سایت برنامه‌ریزی می‌شود.'
      },
      {
        title: 'برنامه‌ریزی نصب',
        description: 'ترتیب نصب، منطق آب‌بندی، چک‌پوینت‌های سیلینگ و نقاط بازرسی پیش از شروع کار سایت تعریف می‌شود.'
      },
      {
        title: 'کنترل کیفیت',
        description: 'تراز پنل، کیفیت آب‌بندی، موقعیت فلاشینگ، کنترل تعریق و عبور نور در چک‌پوینت‌های تعریف‌شده بازرسی می‌شود.'
      }
    ]
  },
  independentRecommendations: {
    title: 'توصیه‌های مستقل سیستم نورگیر',
    intro: 'سی‌پانل به عنوان مهندس سیستم نورگیر عمل می‌کند، نه فروشنده پلی‌کربنات. انتخاب سیستم بر اساس نیاز پروژه انجام می‌شود، نه موجودی انبار.',
    points: [
      {title: 'انتخاب نورگیر بر اساس پروژه', description: 'نوع پلی‌کربنات، مشخصات شیشه، سیستم آب‌بندی و جزئیات حرارتی بر اساس اقلیم، هندسه سقف و نیازهای پروژه بررسی می‌شود.'},
      {title: 'پشتیبانی برنامه‌ریزی تأمین', description: 'حجم پنل، گسکت، فلاشینگ و متعلقات با شاپ‌دراوینگ هماهنگ می‌شود تا کمبود و تأخیر سایت کاهش یابد.'},
      {title: 'هماهنگی ریسک نصب', description: 'ترتیب نصب، جزئیات آب‌بندی و چک‌پوینت‌های کیفیت پیش از شروع کار سایت بررسی و تعریف می‌شود.'}
    ],
    comparison: {
      traditional: {
        label: 'نصب سنتی نورگیر',
        items: ['انتخاب متریال بدون بررسی حرارتی و UV', 'تصمیم فلاشینگ و آب‌بندی در سایت', 'هماهنگی سازه‌ای ضعیف یا ناقص', 'متعلقات با تأخیر یا ناقص', 'کیفیت وابسته به عادت نصاب']
      },
      sipanel: {
        label: 'رویکرد مهندسی SIPANEL',
        items: ['متریال بر اساس شرایط اقلیمی و حرارتی پروژه انتخاب می‌شود', 'فلاشینگ و آب‌بندی پیش از نصب هماهنگ می‌شود', 'یکپارچگی سازه‌ای نورگیر با قاب اصلی بررسی می‌شود', 'متعلقات پیش از تأمین برنامه‌ریزی می‌شود', 'اجرا با چک‌پوینت و کنترل فنی']
      }
    }
  },
  systemApplications: {
    title: 'کاربردهای سیستم نورگیر و پوشش شفاف',
    applications: [
      'نورگیرهای کارخانه‌های صنعتی',
      'نوارهای نور طبیعی انبارها',
      'سقف شفاف آتریوم تجاری',
      'پوشش شفاف سالن‌های ورزشی',
      'راهکارهای نور کنترل‌شده سردخانه‌ها',
      'سیستم‌های نورگیر خط‌الرأسی پیوسته'
    ]
  },
  technicalProof: {
    title: 'شواهد فنی پیش از نصب',
    assets: [
      {title: 'شاپ‌دراوینگ نورگیر', description: 'چیدمان نورگیر، آرایش پنل و جزئیات اتصال پیش از تأمین', alt: 'نمونه شاپ‌دراوینگ نورگیر صنعتی'},
      {title: 'جزئیات آب‌بندی و فلاشینگ', description: 'دیتیل فلاشینگ، آب‌بندی و انتقال آب در محل اتصال نورگیر', alt: 'جزئیات آب‌بندی و فلاشینگ نورگیر'},
      {title: 'فهرست متریال (BOM)', description: 'فهرست پنل، گسکت، فلاشینگ و متعلقات هماهنگ با شاپ‌دراوینگ', alt: 'نمونه فهرست متریال نورگیر'}
    ]
  },
  qualityCheckpoints: {
    title: 'چک‌پوینت‌های کیفیت نورگیر',
    checkpoints: [
      'بررسی تراز پنل و هماهنگی سازه‌ای نورگیر',
      'بازبینی کیفیت آب‌بندی و سیلانت در محل اتصالات',
      'تأیید موقعیت و تداوم فلاشینگ',
      'بررسی کنترل تعریق و عملکرد حرارتی',
      'تأیید عبور نور و یکنواختی نوردهی',
      'بازرسی نهایی پس از نصب'
    ]
  },
  relatedCaseStudies: {
    title: 'پروژه‌های مرتبط نورگیر',
    intro: 'نتایج از پروژه‌های واقعی اجراشده با هماهنگی مهندسی SIPANEL.'
  },
  faq: {
    title: 'سوالات متداول نورگیر و پوشش شفاف',
    items: [
      {
        question: 'سی‌پانل با چه متریال‌هایی کار می‌کند؟',
        answer: 'سی‌پانل با پلی‌کربنات چندجداره، پلی‌کربنات تک‌جداره (سالید)، اسکای‌لایت شیشه‌ای و سیستم‌های ترکیبی کار می‌کند. انتخاب متریال بر اساس شرایط اقلیمی، حرارتی و عملکردی پروژه انجام می‌شود.'
      },
      {
        question: 'ریسک نشتی در نورگیر چگونه کنترل می‌شود؟',
        answer: 'جزئیات فلاشینگ، منطق آب‌بندی، گسکت‌ها و نقاط انتقال آب بین نورگیر و سقف فلزی پیش از نصب بررسی و هماهنگ می‌شود تا ریسک نشتی کاهش یابد.'
      },
      {
        question: 'آیا سی‌پانل در انتخاب متریال نورگیر کمک می‌کند؟',
        answer: 'بله. نوع پلی‌کربنات، ضخامت، پوشش UV، مشخصات شیشه و سیستم آب‌بندی بر اساس اقلیم، بار حرارتی و نیازهای نوری پروژه بررسی و توصیه می‌شود.'
      },
      {
        question: 'تعریق در نورگیر چگونه کنترل می‌شود؟',
        answer: 'انتخاب صحیح پلی‌کربنات چندجداره، بررسی عایق‌بندی حرارتی، کنترل تهویه و دیتیل‌گذاری نقاط انتقال دما از تشکیل تعریق جلوگیری می‌کند.'
      },
      {
        question: 'یکپارچگی سازه‌ای نورگیر با قاب اصلی چگونه تأمین می‌شود؟',
        answer: 'بارهای نورگیر، اتصالات به سازه اصلی، بار باد و بار برف پیش از طراحی نهایی بررسی می‌شود تا نورگیر بدون تنش اضافی روی سازه اصلی عمل کند.'
      },
      {
        question: 'حرکت حرارتی در سیستم‌های نورگیر چگونه مدیریت می‌شود؟',
        answer: 'جزئیات انبساط، گسکت‌های انعطاف‌پذیر و فاصله‌گذاری پنل در شاپ‌دراوینگ تعریف می‌شود تا تنش حرارتی در نورگیر کنترل شود.'
      },
      {
        question: 'آب‌بندی محل اتصال نورگیر به سقف فلزی چگونه کنترل می‌شود؟',
        answer: 'جزئیات فلاشینگ، منطق هم‌پوشانی و آب‌بندی نقاط انتقال بین نورگیر و سقف فلزی یا ساندویچ‌پانل پیش از نصب بررسی می‌شود تا ریسک نشتی کاهش یابد.'
      },
      {
        question: 'تفاوت بین تأمین صرف نورگیر و اجرای مهندسی‌شده چیست؟',
        answer: 'تأمین صرف روی تحویل پنل تمرکز دارد. اجرای مهندسی‌شده کل سیستم نورگیر را هماهنگ می‌کند — شامل انتخاب متریال، شاپ‌دراوینگ، آب‌بندی، تأمین، نصب کنترل‌شده و چک‌پوینت‌های کیفیت.'
      }
    ]
  },
  conversionCta: {
    headline: 'قبل از شروع نصب، پروژه نورگیر خود را بررسی کنید',
    text: 'درخواست بررسی فنی نورگیر برای انتخاب متریال، آب‌بندی، یکپارچگی سازه‌ای و برنامه‌ریزی نصب کنترل‌شده.',
    button: 'درخواست بررسی نورگیر',
    secondaryButton: 'مشاهده پروژه‌های نورگیر'
  },
  breadcrumbs: [
    {label: 'خانه', href: getLocalizedPath('fa')},
    {label: 'پوشانه‌ها', href: getLocalizedPath('fa', '/systems')},
    {label: 'نورگیرها و پوشش‌های شفاف', href: getLocalizedPath('fa', '/systems/daylighting-transparent-roofing')}
  ],
  caseStudyLabels: {
    challenge: 'چالش',
    result: 'نتیجه',
    viewProject: 'مشاهده پروژه'
  }
};

// ── English ──

const en: LocalizedContent = {
  seo: {
    primaryKeyword: 'daylighting transparent roofing',
    title: 'Daylighting & Transparent Roofing | SIPANEL Industrial Skylight Systems',
    metaDescription: 'SIPANEL engineers daylighting and transparent roofing systems with polycarbonate, glass skylights, and hybrid solutions — coordinating structural integration, thermal performance, and weather resistance for industrial projects.'
  },
  hero: {
    eyebrow: 'Daylighting & Transparent Systems',
    h1: 'Transparent Roofing Systems Engineered for Performance',
    subheadline: 'SIPANEL coordinates skylight layout, polycarbonate selection, structural integration, thermal performance, and weather resistance before installation begins.',
    primaryCta: 'Request Daylighting Review',
    secondaryCta: 'View Related Projects',
    visualAlt: 'Industrial skylight installation with engineered performance detailing',
    trustMicrocopy: 'Technical review for industrial daylighting systems, material selection, and installation coordination.'
  },
  problemContext: {
    title: 'Common Daylighting Problems Start with Poor Coordination',
    cards: [
      'Incorrect material selection for UV and thermal conditions: without climate review, the wrong polycarbonate or glass type is specified, reducing service life',
      'Poor structural coordination between skylight and primary frame: skylights installed without integration with the main structure create risk of cracking, deformation, or leakage',
      'Leakage risk from weak flashing and sealing at transparent panels: skylight-to-metal-roof connection points without precise detailing are prone to water ingress',
      'Inadequate thermal performance and condensation risk: without insulation and ventilation review, condensation forms and thermal performance drops',
      'Reduced light transmission and project delays from unclear detailing: without shop drawings and precise planning, both optical performance and project timelines suffer'
    ]
  },
  engineeringApproach: {
    title: 'How SIPANEL Engineers Daylighting Risk Before Execution',
    steps: [
      {
        title: 'Shop Drawing Coordination',
        description: 'Skylight layout, panel arrangement, flashing details, structural connections, and installation sequence are documented before procurement.'
      },
      {
        title: 'BOM & Material Planning',
        description: 'Polycarbonate panels, glass units, gaskets, flashings, sealants, and structural accessories are planned to reduce waste and site delays.'
      },
      {
        title: 'Installation Planning',
        description: 'Installation sequence, waterproofing logic, sealing checkpoints, and inspection points are defined before site work begins.'
      },
      {
        title: 'Quality Control',
        description: 'Panel alignment, sealing quality, flashing positions, condensation control, and light transmission are inspected at defined checkpoints.'
      }
    ]
  },
  independentRecommendations: {
    title: 'Independent Daylighting System Recommendations',
    intro: 'SIPANEL operates as a daylighting system engineer, not a polycarbonate reseller. System selection is based on project needs, not warehouse inventory.',
    points: [
      {title: 'Project-First Daylighting Selection', description: 'Polycarbonate type, glass specification, sealing system, and thermal detailing are reviewed based on climate, roof geometry, and project requirements.'},
      {title: 'Procurement Planning Support', description: 'Panel quantities, gaskets, flashings, and accessories are coordinated with shop drawings to reduce shortages and site delays.'},
      {title: 'Installation Risk Coordination', description: 'Installation sequence, waterproofing details, and quality checkpoints are reviewed and defined before site work begins.'}
    ],
    comparison: {
      traditional: {
        label: 'Typical Skylight Installation',
        items: ['Material selected without thermal or UV review', 'Flashing and sealing decisions made on site', 'Weak or incomplete structural coordination', 'Accessories missing or delayed', 'Quality depends on installer habit']
      },
      sipanel: {
        label: 'SIPANEL Engineering Approach',
        items: ['Material selected based on project climate and thermal conditions', 'Flashing and sealing coordinated before installation', 'Structural integration of skylight with primary frame reviewed', 'Accessories planned before procurement', 'Execution follows checkpoints and technical control']
      }
    }
  },
  systemApplications: {
    title: 'Where Daylighting & Transparent Roofing Fits',
    applications: [
      'Industrial factory skylights',
      'Warehouse daylighting strips',
      'Commercial atrium roofing',
      'Sports hall transparent roofing',
      'Cold storage controlled-light solutions',
      'Continuous ridge daylighting systems'
    ]
  },
  technicalProof: {
    title: 'Engineering Proof Before Installation',
    assets: [
      {title: 'Skylight Shop Drawing', description: 'Skylight layout, panel arrangement, and connection details coordinated before procurement.', alt: 'Industrial skylight shop drawing example'},
      {title: 'Waterproofing / Flashing Detail', description: 'Flashing, sealing, and water transition details at skylight connection points.', alt: 'Skylight flashing and waterproofing detail'},
      {title: 'BOM / Material Takeoff', description: 'Panel, gasket, flashing, and accessory quantities coordinated with shop drawings.', alt: 'Skylight material takeoff and BOM example'}
    ]
  },
  qualityCheckpoints: {
    title: 'Daylighting Quality Checkpoints',
    checkpoints: [
      'Panel alignment and structural coordination check',
      'Sealing and sealant quality at connection points',
      'Flashing position and continuity verification',
      'Condensation control and thermal performance check',
      'Light transmission and daylight uniformity confirmation',
      'Post-installation inspection'
    ]
  },
  relatedCaseStudies: {
    title: 'Related Daylighting Projects',
    intro: 'Results from real projects executed with SIPANEL engineering coordination.'
  },
  faq: {
    title: 'Daylighting & Transparent Roofing Questions',
    items: [
      {
        question: 'What materials does SIPANEL work with for daylighting systems?',
        answer: 'SIPANEL works with multiwall polycarbonate, solid polycarbonate, glass skylights, and hybrid systems. Material selection is based on project climate, thermal conditions, and performance requirements.'
      },
      {
        question: 'How is leakage risk controlled in skylight systems?',
        answer: 'Flashing details, sealing logic, gaskets, and water transition points between the skylight and metal roofing are reviewed and coordinated before installation to reduce leakage risk.'
      },
      {
        question: 'Does SIPANEL help with daylighting material selection?',
        answer: 'Yes. Polycarbonate type, thickness, UV coating, glass specifications, and sealing systems are reviewed and recommended based on climate, thermal load, and lighting requirements.'
      },
      {
        question: 'How is condensation controlled in skylight systems?',
        answer: 'Proper multiwall polycarbonate selection, thermal insulation review, ventilation control, and temperature transition detailing prevent condensation from forming.'
      },
      {
        question: 'How is structural integration between the skylight and primary frame ensured?',
        answer: 'Skylight loads, connections to the primary structure, wind loads, and snow loads are reviewed before final design so the skylight operates without creating excessive stress on the main structure.'
      },
      {
        question: 'How is thermal movement managed in skylight systems?',
        answer: 'Expansion details, flexible gaskets, and panel spacing are defined in shop drawings to control thermal stress in the skylight system.'
      },
      {
        question: 'How are waterproofing transitions between skylight and metal roofing controlled?',
        answer: 'Flashing details, overlap logic, and sealing at transition points between the skylight and metal roofing or sandwich panel systems are reviewed before installation to reduce leakage risk.'
      },
      {
        question: 'What is the difference between supply-only skylights and engineered execution?',
        answer: 'Supply-only focuses on panel delivery. Engineered execution coordinates the complete skylight system — including material selection, shop drawings, waterproofing, procurement, controlled installation, and quality checkpoints.'
      }
    ]
  },
  conversionCta: {
    headline: 'Review Your Daylighting Project Before Installation Starts',
    text: 'Request a technical daylighting review for material selection, waterproofing, structural integration, and controlled installation planning.',
    button: 'Request Daylighting Review',
    secondaryButton: 'View Daylighting Projects'
  },
  breadcrumbs: [
    {label: 'Home', href: '/en'},
    {label: 'Systems', href: '/en/systems'},
    {label: 'Daylighting & Transparent Roofing', href: '/en/systems/daylighting-transparent-roofing'}
  ],
  caseStudyLabels: {
    challenge: 'Challenge',
    result: 'Result',
    viewProject: 'View Project'
  }
};

// ── Arabic ──

const ar: LocalizedContent = {
  seo: {
    primaryKeyword: 'أنظمة الإضاءة الطبيعية والتسقيف الشفاف',
    title: 'الإضاءة الطبيعية والتسقيف الشفاف | أنظمة المناور الصناعية SIPANEL',
    metaDescription: 'تهندس SIPANEL أنظمة الإضاءة الطبيعية والتسقيف الشفاف بالبولي كربونات والمناور الزجاجية والحلول الهجينة — مع تنسيق التكامل الهيكلي والأداء الحراري ومقاومة الطقس للمشاريع الصناعية.'
  },
  hero: {
    eyebrow: 'أنظمة الإضاءة الطبيعية والشفافة',
    h1: 'أنظمة التسقيف الشفاف المهندسة للأداء',
    subheadline: 'تنسق SIPANEL تخطيط المناور واختيار البولي كربونات والتكامل الهيكلي والأداء الحراري ومقاومة الطقس قبل بدء التركيب.',
    primaryCta: 'طلب مراجعة الإضاءة الطبيعية',
    secondaryCta: 'عرض المشاريع ذات الصلة',
    visualAlt: 'تركيب مناور صناعية مع تفاصيل هندسية للأداء',
    trustMicrocopy: 'مراجعة فنية لأنظمة الإضاءة الطبيعية الصناعية واختيار المواد وتنسيق التركيب.'
  },
  problemContext: {
    title: 'مشاكل الإضاءة الطبيعية الشائعة تبدأ بضعف التنسيق',
    cards: [
      'اختيار مواد غير صحيح لظروف الأشعة فوق البنفسجية والحرارة: بدون مراجعة مناخية يتم تحديد نوع بولي كربونات أو زجاج غير مناسب مما يقلل العمر الافتراضي',
      'تنسيق هيكلي ضعيف بين المنور والإطار الرئيسي: تركيب المناور بدون تكامل مع الهيكل الرئيسي يخلق مخاطر التشقق أو التشوه أو التسرب',
      'مخاطر التسرب من ضعف الفلاشينغ والعزل عند الألواح الشفافة: نقاط اتصال المنور بالسقف المعدني بدون تفصيل دقيق معرضة لتسرب المياه',
      'أداء حراري غير كافٍ ومخاطر التكثف: بدون مراجعة العزل والتهوية يتشكل التكثف وينخفض الأداء الحراري',
      'انخفاض نفاذية الضوء وتأخير المشروع بسبب تفاصيل غير واضحة: بدون رسومات الشوب والتخطيط الدقيق يتأثر كل من الأداء الضوئي والجدول الزمني'
    ]
  },
  engineeringApproach: {
    title: 'كيف تهندس SIPANEL مخاطر الإضاءة الطبيعية قبل التنفيذ',
    steps: [
      {
        title: 'تنسيق رسومات الشوب',
        description: 'يتم توثيق تخطيط المنور وترتيب الألواح وتفاصيل الفلاشينغ والوصلات الهيكلية وتسلسل التركيب قبل التوريد.'
      },
      {
        title: 'تخطيط BOM والمواد',
        description: 'يتم تخطيط ألواح البولي كربونات والوحدات الزجاجية والحشيات والفلاشينغ ومواد العزل والملحقات الهيكلية لتقليل الهدر والتأخير.'
      },
      {
        title: 'تخطيط التركيب',
        description: 'يتم تحديد تسلسل التركيب ومنطق العزل المائي ونقاط فحص العزل ونقاط التفتيش قبل بدء العمل في الموقع.'
      },
      {
        title: 'ضبط الجودة',
        description: 'يتم فحص محاذاة الألواح وجودة العزل ومواقع الفلاشينغ والتحكم في التكثف ونفاذية الضوء عند نقاط فحص محددة.'
      }
    ]
  },
  independentRecommendations: {
    title: 'توصيات مستقلة لنظام الإضاءة الطبيعية',
    intro: 'تعمل SIPANEL كمهندس نظام إضاءة طبيعية وليس بائع بولي كربونات. اختيار النظام يعتمد على احتياجات المشروع وليس مخزون المستودع.',
    points: [
      {title: 'اختيار الإضاءة الطبيعية حسب المشروع', description: 'يتم مراجعة نوع البولي كربونات ومواصفات الزجاج ونظام العزل والتفاصيل الحرارية بناءً على المناخ وهندسة السقف ومتطلبات المشروع.'},
      {title: 'دعم تخطيط التوريد', description: 'يتم تنسيق كميات الألواح والحشيات والفلاشينغ والملحقات مع رسومات الشوب لتقليل النقص والتأخير.'},
      {title: 'تنسيق مخاطر التركيب', description: 'يتم مراجعة وتحديد تسلسل التركيب وتفاصيل العزل المائي ونقاط الجودة قبل بدء العمل في الموقع.'}
    ],
    comparison: {
      traditional: {
        label: 'التركيب التقليدي للمناور',
        items: ['اختيار المواد بدون مراجعة حرارية أو UV', 'قرارات الفلاشينغ والعزل في الموقع', 'تنسيق هيكلي ضعيف أو ناقص', 'الملحقات ناقصة أو متأخرة', 'الجودة تعتمد على عادة المركّب']
      },
      sipanel: {
        label: 'نهج SIPANEL الهندسي',
        items: ['اختيار المواد بناءً على المناخ والظروف الحرارية للمشروع', 'تنسيق الفلاشينغ والعزل قبل التركيب', 'مراجعة التكامل الهيكلي للمنور مع الإطار الرئيسي', 'الملحقات مخططة قبل التوريد', 'التنفيذ يتبع نقاط فحص وضبط فني']
      }
    }
  },
  systemApplications: {
    title: 'تطبيقات أنظمة الإضاءة الطبيعية والتسقيف الشفاف',
    applications: [
      'مناور المصانع الصناعية',
      'شرائط الإضاءة الطبيعية للمستودعات',
      'تسقيف الأتريوم التجاري',
      'التسقيف الشفاف للصالات الرياضية',
      'حلول الإضاءة المتحكم فيها للتخزين البارد',
      'أنظمة الإضاءة الطبيعية المستمرة على خط القمة'
    ]
  },
  technicalProof: {
    title: 'إثبات هندسي قبل التركيب',
    assets: [
      {title: 'رسم شوب للمنور', description: 'تخطيط المنور وترتيب الألواح وتفاصيل الاتصال المنسقة قبل التوريد', alt: 'نموذج رسم شوب لمنور صناعي'},
      {title: 'تفاصيل العزل المائي والفلاشينغ', description: 'تفاصيل الفلاشينغ والعزل وانتقال المياه عند نقاط اتصال المنور', alt: 'تفاصيل فلاشينغ وعزل مائي للمنور'},
      {title: 'قائمة المواد (BOM)', description: 'كميات الألواح والحشيات والفلاشينغ والملحقات المنسقة مع رسومات الشوب', alt: 'نموذج قائمة مواد المنور'}
    ]
  },
  qualityCheckpoints: {
    title: 'نقاط فحص جودة الإضاءة الطبيعية',
    checkpoints: [
      'فحص محاذاة الألواح والتنسيق الهيكلي للمنور',
      'مراجعة جودة العزل ومانع التسرب عند نقاط الاتصال',
      'التحقق من موقع واستمرارية الفلاشينغ',
      'فحص التحكم في التكثف والأداء الحراري',
      'تأكيد نفاذية الضوء وانتظام الإضاءة الطبيعية',
      'الفحص النهائي بعد التركيب'
    ]
  },
  relatedCaseStudies: {
    title: 'مشاريع إضاءة طبيعية ذات صلة',
    intro: 'نتائج من مشاريع حقيقية نُفذت بتنسيق هندسي من SIPANEL.'
  },
  faq: {
    title: 'أسئلة شائعة حول الإضاءة الطبيعية والتسقيف الشفاف',
    items: [
      {
        question: 'ما المواد التي تعمل بها SIPANEL لأنظمة الإضاءة الطبيعية؟',
        answer: 'تعمل SIPANEL مع البولي كربونات متعدد الجدران والبولي كربونات الصلب والمناور الزجاجية والأنظمة الهجينة. يتم اختيار المواد بناءً على المناخ والظروف الحرارية ومتطلبات الأداء.'
      },
      {
        question: 'كيف يتم التحكم في مخاطر التسرب في أنظمة المناور؟',
        answer: 'تتم مراجعة وتنسيق تفاصيل الفلاشينغ ومنطق العزل والحشيات ونقاط انتقال المياه بين المنور والسقف المعدني قبل التركيب لتقليل مخاطر التسرب.'
      },
      {
        question: 'هل تساعد SIPANEL في اختيار مواد الإضاءة الطبيعية؟',
        answer: 'نعم. يتم مراجعة والتوصية بنوع البولي كربونات والسمك وطلاء UV ومواصفات الزجاج وأنظمة العزل بناءً على المناخ والحمل الحراري ومتطلبات الإضاءة.'
      },
      {
        question: 'كيف يتم التحكم في التكثف في أنظمة المناور؟',
        answer: 'الاختيار الصحيح للبولي كربونات متعدد الجدران ومراجعة العزل الحراري والتحكم في التهوية وتفصيل نقاط انتقال الحرارة يمنع تشكل التكثف.'
      },
      {
        question: 'كيف يتم ضمان التكامل الهيكلي بين المنور والإطار الرئيسي؟',
        answer: 'تتم مراجعة أحمال المنور والوصلات بالهيكل الرئيسي وأحمال الرياح والثلوج قبل التصميم النهائي حتى يعمل المنور دون خلق إجهاد زائد على الهيكل الرئيسي.'
      },
      {
        question: 'كيف تتم إدارة الحركة الحرارية في أنظمة المناور؟',
        answer: 'يتم تحديد تفاصيل التمدد والحشيات المرنة وتباعد الألواح في رسومات الشوب للتحكم في الإجهاد الحراري في نظام المنور.'
      },
      {
        question: 'كيف يتم التحكم في انتقالات العزل المائي بين المنور والسقف المعدني؟',
        answer: 'تتم مراجعة تفاصيل الفلاشينغ ومنطق التراكب والعزل عند نقاط الانتقال بين المنور والسقف المعدني أو أنظمة الساندويتش بانل قبل التركيب لتقليل مخاطر التسرب.'
      },
      {
        question: 'ما الفرق بين توريد المناور فقط والتنفيذ المهندس؟',
        answer: 'التوريد فقط يركز على تسليم الألواح. التنفيذ المهندس ينسق نظام المنور الكامل — بما في ذلك اختيار المواد ورسومات الشوب والعزل المائي والتوريد والتركيب المنضبط ونقاط فحص الجودة.'
      }
    ]
  },
  conversionCta: {
    headline: 'راجع مشروع الإضاءة الطبيعية قبل بدء التركيب',
    text: 'اطلب مراجعة فنية للإضاءة الطبيعية تشمل اختيار المواد والعزل المائي والتكامل الهيكلي وتخطيط التركيب المنضبط.',
    button: 'طلب مراجعة الإضاءة الطبيعية',
    secondaryButton: 'عرض مشاريع الإضاءة الطبيعية'
  },
  breadcrumbs: [
    {label: 'الرئيسية', href: '/ar'},
    {label: 'الأنظمة', href: '/ar/systems'},
    {label: 'الإضاءة الطبيعية والتسقيف الشفاف', href: '/ar/systems/daylighting-transparent-roofing'}
  ],
  caseStudyLabels: {
    challenge: 'التحدي',
    result: 'النتيجة',
    viewProject: 'عرض المشروع'
  }
};

// ── Russian ──

const ru: LocalizedContent = {
  seo: {
    primaryKeyword: 'системы естественного освещения и прозрачной кровли',
    title: 'Естественное освещение и прозрачная кровля | Промышленные световые системы SIPANEL',
    metaDescription: 'SIPANEL проектирует системы естественного освещения и прозрачной кровли с поликарбонатом, стеклянными световыми фонарями и гибридными решениями — координируя конструктивную интеграцию, тепловые характеристики и погодозащиту для промышленных объектов.'
  },
  hero: {
    eyebrow: 'Системы естественного освещения и прозрачные системы',
    h1: 'Прозрачные кровельные системы, спроектированные для производительности',
    subheadline: 'SIPANEL координирует компоновку световых фонарей, выбор поликарбоната, конструктивную интеграцию, тепловые характеристики и погодозащиту до начала монтажа.',
    primaryCta: 'Запросить экспертизу естественного освещения',
    secondaryCta: 'Посмотреть связанные проекты',
    visualAlt: 'Монтаж промышленных световых фонарей с инженерной детализацией',
    trustMicrocopy: 'Техническая экспертиза промышленных систем естественного освещения, выбора материалов и координации монтажа.'
  },
  problemContext: {
    title: 'Типичные проблемы естественного освещения начинаются с плохой координации',
    cards: [
      'Неправильный выбор материала для УФ и тепловых условий: без климатического анализа выбирается неподходящий поликарбонат или стекло, что сокращает срок службы',
      'Слабая конструктивная координация между световым фонарём и основным каркасом: световые фонари, установленные без интеграции с основной конструкцией, создают риск трещин, деформации или протечек',
      'Риск протечки из-за слабого примыкания и герметизации прозрачных панелей: точки соединения светового фонаря с металлической кровлей без точной детализации подвержены проникновению воды',
      'Недостаточные тепловые характеристики и риск конденсации: без анализа теплоизоляции и вентиляции образуется конденсат и падают тепловые показатели',
      'Снижение светопропускания и задержки проекта из-за нечёткой детализации: без монтажных чертежей и точного планирования страдают и оптические характеристики, и сроки проекта'
    ]
  },
  engineeringApproach: {
    title: 'Как SIPANEL инженерно контролирует риски освещения до монтажа',
    steps: [
      {
        title: 'Координация монтажных чертежей',
        description: 'Компоновка световых фонарей, расположение панелей, детали примыканий, конструктивные соединения и последовательность монтажа документируются до закупки.'
      },
      {
        title: 'Планирование BOM и материалов',
        description: 'Поликарбонатные панели, стеклопакеты, уплотнители, примыкания, герметики и конструктивные аксессуары планируются для снижения отходов и задержек на объекте.'
      },
      {
        title: 'Планирование монтажа',
        description: 'Последовательность монтажа, логика гидроизоляции, контрольные точки герметизации и точки инспекции определяются до начала работ на объекте.'
      },
      {
        title: 'Контроль качества',
        description: 'Выравнивание панелей, качество герметизации, позиции примыканий, контроль конденсации и светопропускание проверяются в определённых контрольных точках.'
      }
    ]
  },
  independentRecommendations: {
    title: 'Независимые рекомендации по системе естественного освещения',
    intro: 'SIPANEL работает как инженер системы естественного освещения, а не перепродавец поликарбоната. Выбор системы основан на потребностях проекта, а не на складских запасах.',
    points: [
      {title: 'Выбор освещения под проект', description: 'Тип поликарбоната, спецификация стекла, система герметизации и тепловые детали рассматриваются на основе климата, геометрии кровли и требований проекта.'},
      {title: 'Поддержка планирования закупок', description: 'Количество панелей, уплотнителей, примыканий и аксессуаров координируется с монтажными чертежами для снижения дефицита и задержек.'},
      {title: 'Координация рисков монтажа', description: 'Последовательность монтажа, детали гидроизоляции и контрольные точки качества определяются до начала работ на объекте.'}
    ],
    comparison: {
      traditional: {
        label: 'Типичный монтаж световых фонарей',
        items: ['Материал выбирается без теплового или УФ-анализа', 'Решения по примыканиям и герметизации принимаются на объекте', 'Слабая или неполная конструктивная координация', 'Аксессуары отсутствуют или задерживаются', 'Качество зависит от привычек монтажника']
      },
      sipanel: {
        label: 'Инженерный подход SIPANEL',
        items: ['Материал выбирается на основе климата и тепловых условий проекта', 'Примыкания и герметизация координируются до монтажа', 'Конструктивная интеграция светового фонаря с основным каркасом проверяется', 'Аксессуары планируются до закупки', 'Монтаж следует контрольным точкам и техническому контролю']
      }
    }
  },
  systemApplications: {
    title: 'Применение систем естественного освещения и прозрачной кровли',
    applications: [
      'Световые фонари промышленных заводов',
      'Световые полосы складов',
      'Прозрачная кровля коммерческих атриумов',
      'Прозрачная кровля спортивных залов',
      'Решения контролируемого освещения для холодильных хранилищ',
      'Непрерывные коньковые системы естественного освещения'
    ]
  },
  technicalProof: {
    title: 'Инженерное подтверждение до монтажа',
    assets: [
      {title: 'Монтажный чертёж светового фонаря', description: 'Компоновка светового фонаря, расположение панелей и детали соединений, координированные до закупки', alt: 'Пример монтажного чертежа промышленного светового фонаря'},
      {title: 'Детали гидроизоляции и примыканий', description: 'Детали примыканий, герметизации и перехода воды в точках соединения светового фонаря', alt: 'Детали примыканий и гидроизоляции светового фонаря'},
      {title: 'Ведомость материалов (BOM)', description: 'Количество панелей, уплотнителей, примыканий и аксессуаров, координированных с монтажными чертежами', alt: 'Пример ведомости материалов светового фонаря'}
    ]
  },
  qualityCheckpoints: {
    title: 'Контрольные точки качества естественного освещения',
    checkpoints: [
      'Проверка выравнивания панелей и конструктивной координации светового фонаря',
      'Проверка качества герметизации и герметика в точках соединения',
      'Верификация позиции и непрерывности примыканий',
      'Проверка контроля конденсации и тепловых характеристик',
      'Подтверждение светопропускания и равномерности естественного освещения',
      'Инспекция после монтажа'
    ]
  },
  relatedCaseStudies: {
    title: 'Связанные проекты естественного освещения',
    intro: 'Результаты реальных проектов, выполненных с инженерной координацией SIPANEL.'
  },
  faq: {
    title: 'Вопросы о естественном освещении и прозрачной кровле',
    items: [
      {
        question: 'С какими материалами работает SIPANEL для систем естественного освещения?',
        answer: 'SIPANEL работает с многостенным поликарбонатом, монолитным поликарбонатом, стеклянными световыми фонарями и гибридными системами. Выбор материала основан на климате проекта, тепловых условиях и требованиях к производительности.'
      },
      {
        question: 'Как контролируется риск протечки в системах световых фонарей?',
        answer: 'Детали примыканий, логика герметизации, уплотнители и точки перехода воды между световым фонарём и металлической кровлей проверяются и координируются до монтажа для снижения риска протечек.'
      },
      {
        question: 'Помогает ли SIPANEL с выбором материалов для естественного освещения?',
        answer: 'Да. Тип поликарбоната, толщина, УФ-покрытие, спецификации стекла и системы герметизации анализируются и рекомендуются на основе климата, тепловой нагрузки и требований к освещению.'
      },
      {
        question: 'Как контролируется конденсация в системах световых фонарей?',
        answer: 'Правильный выбор многостенного поликарбоната, анализ теплоизоляции, контроль вентиляции и детализация точек перепада температур предотвращают образование конденсата.'
      },
      {
        question: 'Как обеспечивается конструктивная интеграция светового фонаря с основным каркасом?',
        answer: 'Нагрузки светового фонаря, соединения с основной конструкцией, ветровые и снеговые нагрузки проверяются до окончательного проектирования, чтобы световой фонарь работал без создания избыточных напряжений в основной конструкции.'
      },
      {
        question: 'Как управляется тепловое расширение в системах световых фонарей?',
        answer: 'Детали расширения, гибкие уплотнители и шаг панелей определяются в монтажных чертежах для контроля термических напряжений в системе светового фонаря.'
      },
      {
        question: 'Как контролируются гидроизоляционные переходы между световым фонарём и металлической кровлей?',
        answer: 'Детали примыканий, логика перекрытия и герметизация в точках перехода между световым фонарём и металлической кровлей или системами сэндвич-панелей проверяются до монтажа для снижения риска протечек.'
      },
      {
        question: 'В чём разница между простой поставкой световых фонарей и инженерно-контролируемым исполнением?',
        answer: 'Простая поставка фокусируется на доставке панелей. Инженерно-контролируемое исполнение координирует полную систему светового фонаря — включая выбор материалов, монтажные чертежи, гидроизоляцию, закупки, контролируемый монтаж и контрольные точки качества.'
      }
    ]
  },
  conversionCta: {
    headline: 'Проверьте проект естественного освещения до начала монтажа',
    text: 'Запросите техническую экспертизу естественного освещения по выбору материалов, гидроизоляции, конструктивной интеграции и планированию контролируемого монтажа.',
    button: 'Запросить экспертизу естественного освещения',
    secondaryButton: 'Посмотреть проекты освещения'
  },
  breadcrumbs: [
    {label: 'Главная', href: '/ru'},
    {label: 'Системы', href: '/ru/systems'},
    {label: 'Естественное освещение и прозрачная кровля', href: '/ru/systems/daylighting-transparent-roofing'}
  ],
  caseStudyLabels: {
    challenge: 'Задача',
    result: 'Результат',
    viewProject: 'Посмотреть проект'
  }
};

// ── Related case studies ──

function getRelatedCaseStudies(locale: Locale) {
  const isFa = locale === 'fa';
  const isAr = locale === 'ar';
  const isRu = locale === 'ru';

  return [
    {
      projectName: isFa ? 'اسکای‌لایت فدک مال'
        : isAr ? 'السكاي لايت الزجاجي لفدك مول'
        : isRu ? 'Стеклянный световой фонарь Fadak Mall'
        : 'Fadak Mall Glass Skylight',
      location: isFa ? 'اصفهان، ایران' : isAr ? 'أصفهان، إيران' : isRu ? 'Исфахан, Иран' : 'Isfahan, Iran',
      areaM2: '500 m²',
      projectType: isFa ? 'اسکای‌لایت شیشه‌ای تجاری' : isAr ? 'سكاي لايت زجاجي تجاري' : isRu ? 'Коммерческий стеклянный световой фонарь' : 'Commercial glass skylight',
      challenge: isFa
        ? 'پوشش شیشه‌ای روی فرم بیضوی سه‌بعدی نیازمند هماهنگی هندسی دقیق، کنترل بار و آب‌بندی بود.'
        : isAr
        ? 'تطلب الغلاف الزجاجي فوق الشكل البيضاوي ثلاثي الأبعاد تنسيقاً هندسياً دقيقاً والتحكم في الأحمال والعزل المائي.'
        : isRu
        ? 'Стеклянное ограждение над трёхмерной эллиптической формой потребовало точной геометрической координации, контроля нагрузок и гидроизоляции.'
        : 'Glass enclosure over a three-dimensional elliptical form required precise geometric coordination, load control, and waterproofing.',
      measuredResult: isFa
        ? 'اسکای‌لایت شیشه‌ای ۵۰۰ مترمربعی با تأمین نور طبیعی برای آتریوم مرکز تجاری تحویل شد.'
        : isAr
        ? 'تم تسليم سكاي لايت زجاجي بمساحة 500 م² يوفر الإضاءة الطبيعية لأتريوم المول.'
        : isRu
        ? 'Сдан стеклянный световой фонарь площадью 500 м², обеспечивающий естественное освещение атриума торгового центра.'
        : '500 m² glass skylight delivered, providing natural daylight to the mall atrium.',
      href: getLocalizedPath(locale, '/projects/fadak-mall-glass-skylight'),
      image: fadakMallCard
    },
    {
      projectName: isFa ? 'آتریوم هتل اطلس'
        : isAr ? 'أتريوم فندق أطلس'
        : isRu ? 'Атриум отеля Atlas'
        : 'Atlas Hotel Atrium',
      location: isFa ? 'شاهین‌شهر، اصفهان، ایران' : isAr ? 'شاهين شهر، أصفهان، إيران' : isRu ? 'Шахиншахр, Исфахан, Иран' : 'Shahin Shahr, Isfahan, Iran',
      areaM2: '700 m²',
      projectType: isFa ? 'آتریوم مرکزی هتل' : isAr ? 'أتريوم مركزي للفندق' : isRu ? 'Центральный атриум отеля' : 'Hotel Central Atrium',
      challenge: isFa
        ? 'آتریوم به‌عنوان فضای عمومی اصلی هتل نیازمند پوشش سبک و نورگذر با حفظ کیفیت معماری بود.'
        : isAr
        ? 'كان الأتريوم الفضاء العام الرئيسي للفندق وتطلب غلافاً خفيفاً شفافاً مع الحفاظ على الجودة المعمارية.'
        : isRu
        ? 'Атриум являлся главным общественным пространством отеля и требовал лёгкого светопрозрачного ограждения с сохранением архитектурного качества.'
        : 'The atrium served as the focal public space of the hotel and required a lightweight, translucent enclosure capable of delivering natural daylight while preserving architectural quality.',
      measuredResult: isFa
        ? 'اجرای موفق ۷۰۰ مترمربع پوشش پلی‌کربنات آتریوم با ایجاد فضای روشن و مطلوب مهمان‌نوازی.'
        : isAr
        ? 'إنجاز 700 م² من غلاف الأتريوم بالبولي كربونات مما خلق بيئة ضيافة مشرقة ومرحبة.'
        : isRu
        ? 'Успешное выполнение 700 м² поликарбонатного ограждения атриума, создание светлой и комфортной гостиничной среды.'
        : '700 m² polycarbonate atrium enclosure completed, creating a bright and welcoming hospitality environment.',
      href: getLocalizedPath(locale, '/projects/atlas-hotel-shahinshahr-atrium'),
      image: atlasHotelCard
    },
    {
      projectName: isFa ? 'دانشکده نفت دانشگاه صنعتی کرمانشاه'
        : isAr ? 'كلية النفط في الجامعة الصناعية بكرمانشاه'
        : isRu ? 'Нефтяной факультет Промышленного университета Керманшаха'
        : 'Kermanshah Industrial University Petroleum Faculty',
      location: isFa ? 'کرمانشاه، ایران' : isAr ? 'كرمانشاه، إيران' : isRu ? 'Керманшах, Иран' : 'Kermanshah, Iran',
      areaM2: '1,000 m²',
      projectType: isFa ? 'نمای شیشه‌ای مقاوم زلزله' : isAr ? 'واجهة زجاجية مقاومة للزلازل' : isRu ? 'Сейсмостойкий стеклянный фасад' : 'Seismic-resistant glass facade',
      challenge: isFa
        ? 'طراحی اتصالات نما به‌گونه‌ای که حرکت سازه در زلزله باعث آسیب یا شکست پنل‌های شیشه‌ای نشود.'
        : isAr
        ? 'تصميم وصلات الواجهة بحيث لا تؤدي الحركة الهيكلية أثناء الزلازل إلى تلف أو كسر الألواح الزجاجية.'
        : isRu
        ? 'Проектирование узлов крепления фасада так, чтобы сейсмические перемещения конструкции не повреждали стеклянные панели.'
        : 'Facade connections designed so that structural movement during earthquakes would not damage or break the glass panels.',
      measuredResult: isFa
        ? 'اجرای ۱,۰۰۰ مترمربع نمای شیشه‌ای که در زلزله کرمانشاه بدون آسیب به شیشه عمل کرد.'
        : isAr
        ? 'تنفيذ 1,000 م² من الواجهة الزجاجية التي صمدت دون ضرر خلال زلزال كرمانشاه.'
        : isRu
        ? 'Выполнено 1 000 м² стеклянного фасада, выдержавшего Керманшахское землетрясение без повреждения стёкол.'
        : '1,000 m² glass facade executed, reportedly performed without glass damage during the Kermanshah earthquake.',
      href: getLocalizedPath(locale, '/projects/kermanshah-industrial-university-petroleum-faculty'),
      image: kermanshahCard
    }
  ];
}

// ── Locale map ──

const localeContent: Record<string, LocalizedContent> = {fa, en, ar, ru};

// ── Page builder ──

export function getDaylightingTransparentRoofingPage(locale: Locale): ServicePageTemplateData {
  const content = localeContent[locale] ?? en;

  return {
    id: 'daylighting_transparent_roofing',
    routes: daylightingTransparentRoofingSpec.route,
    seo: content.seo,
    hero: {
      eyebrow: content.hero.eyebrow,
      h1: content.hero.h1,
      subheadline: content.hero.subheadline,
      primaryCta: content.hero.primaryCta,
      secondaryCta: content.hero.secondaryCta,
      visualDirection: content.hero.visualAlt,
      visual: daylightingHero,
      visualAlt: content.hero.visualAlt,
      trustMicrocopy: content.hero.trustMicrocopy
    },
    problemContext: content.problemContext,
    engineeringApproach: content.engineeringApproach,
    independentRecommendations: {
      ...content.independentRecommendations,
      contextualLinks: [
        {
          label: locale === 'fa'
            ? 'بررسی تخصصی پوشش ETFE'
            : locale === 'ar'
            ? 'مراجعة تخصصية لأنظمة ETFE'
            : locale === 'ru'
            ? 'Специализированная проверка систем ETFE'
            : 'Specialist ETFE system review',
          href: '/systems/etfe-roof-facade-systems'
        }
      ]
    },
    systemApplications: content.systemApplications,
    technicalProof: {
      title: content.technicalProof.title,
      description: '',
      requiredVisuals: [],
      assets: [
        {
          title: content.technicalProof.assets[0].title,
          description: content.technicalProof.assets[0].description,
          image: daylightInteriorImg,
          imageMobile: daylightInteriorMobileImg,
          alt: content.technicalProof.assets[0].alt
        },
        {
          title: content.technicalProof.assets[1].title,
          description: content.technicalProof.assets[1].description,
          image: daylightJunctionImg,
          imageMobile: daylightJunctionMobileImg,
          alt: content.technicalProof.assets[1].alt
        },
        {
          title: content.technicalProof.assets[2].title,
          description: content.technicalProof.assets[2].description,
          image: bomMtoImage,
          alt: content.technicalProof.assets[2].alt
        }
      ]
    },
    processWorkflow: {
      title: '',
      steps: []
    },
    qualityCheckpoints: content.qualityCheckpoints,
    relatedCaseStudies: {
      title: content.relatedCaseStudies.title,
      intro: content.relatedCaseStudies.intro,
      cases: getRelatedCaseStudies(locale)
    },
    faq: content.faq,
    conversionCta: content.conversionCta,
    breadcrumbs: content.breadcrumbs,
    caseStudyLabels: content.caseStudyLabels,
    schemas: {
      organization: true
    }
  };
}
