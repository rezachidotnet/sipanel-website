import type {ServicePageTemplateData} from '@/components/services/service-page-template';
import {getLocalizedPath, type Locale} from '@/i18n/routing';
import aluminiumCladdingHero from '@/assets/systems/aluminium-claddin/cover-desktop.webp';
import aluminiumInstallImg from '@/assets/systems/aluminium-claddin/installation.webp';
import aluminiumInstallMobileImg from '@/assets/systems/aluminium-claddin/installation-mobile.webp';
import aluminiumJointImg from '@/assets/systems/aluminium-claddin/joint-detail.webp';
import aluminiumJointMobileImg from '@/assets/systems/aluminium-claddin/joint-detail-mobile.webp';
import bomMtoImage from '@/assets/technical/procurement/bom-mto-preview.webp';
import babakSardarbCard from '@/assets/projects/babak_sardarb/photos/babak_sardarb-card.webp';
import parandCard from '@/assets/projects/parand/photos/parand-card.webp';
import erbilEyeHospitalCard from '@/assets/projects/erbil-eye-hospital-entrance-canopy/photos/erbil-eye-hospital-entrance-canopy-card.webp';

export const aluminiumCladdingCoveringSpec = {
  route: {
    en: getLocalizedPath('en', '/systems/aluminium-cladding-covering'),
    fa: getLocalizedPath('fa', '/systems/aluminium-cladding-covering'),
    ar: getLocalizedPath('ar', '/systems/aluminium-cladding-covering'),
    ru: getLocalizedPath('ru', '/systems/aluminium-cladding-covering')
  },
  seo: {
    primary_keyword: 'aluminium cladding systems',
    title: 'Aluminium Cladding & Covering | SIPANEL Industrial Facade Systems',
    meta_description: 'SIPANEL engineers aluminium cladding systems with shop drawings, substructure coordination, panel layout, and controlled installation for industrial and commercial facade projects.'
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
    primaryKeyword: 'سیستم‌های نمای آلومینیومی',
    title: 'نمای آلومینیومی | سیستم‌های نمای صنعتی SIPANEL',
    metaDescription: 'سی‌پانل سیستم‌های نمای آلومینیومی را با شاپ‌دراوینگ، هماهنگی زیرسازه، چیدمان پنل و نصب کنترل‌شده برای پروژه‌های صنعتی و تجاری طراحی و اجرا می‌کند.'
  },
  hero: {
    eyebrow: 'سیستم‌های نمای صنعتی',
    h1: 'نمای آلومینیومی با مهندسی پیش از نصب',
    subheadline: 'سی‌پانل چیدمان پنل، زیرسازه، درزها، فلاشینگ‌ها، جزئیات لبه و حرکت حرارتی را پیش از شروع نصب هماهنگ می‌کند تا ریسک اجرا کاهش یابد.',
    primaryCta: 'درخواست بررسی مهندسی نما',
    secondaryCta: 'مشاهده پروژه‌های نما',
    visualAlt: 'نصب سیستم نمای آلومینیومی با جزئیات مهندسی',
    trustMicrocopy: 'بررسی فنی برای سیستم‌های نمای صنعتی، جزئیات زیرسازه و نصب کنترل‌شده.'
  },
  problemContext: {
    title: 'مشکلات نما معمولاً از ضعف هماهنگی شروع می‌شود',
    cards: [
      'هماهنگی ضعیف زیرسازه: عدم تطابق زیرسازه با چیدمان پنل باعث ناهم‌ترازی، بازکار و تأخیر می‌شود',
      'مشکلات تراز و تخت بودن پنل: بدون کنترل دقیق زیرسازه و نصب، سطح نما ناهموار و غیریکنواخت ظاهر می‌شود',
      'خرابی درز و سیلانت: درزهای بدون برنامه‌ریزی و سیلانت‌های نادرست باعث نفوذ آب و مشکلات بلندمدت نگهداری می‌شود',
      'مشکلات دیتیل لبه، گوشه و فلاشینگ: بدون جزئیات دقیق پیش از اجرا، لبه‌ها و گوشه‌ها نقاط ضعف نما می‌شوند',
      'خطاهای حرکت حرارتی و ترتیب نصب: سطوح بزرگ نما نیاز به جزئیات آگاه از انبساط حرارتی و ترتیب صحیح نصب دارند — بدون این هماهنگی حتی متریال خوب هم عمل نمی‌کند'
    ]
  },
  engineeringApproach: {
    title: 'کنترل مهندسی ریسک نما پیش از اجرا',
    steps: [
      {
        title: 'هماهنگی شاپ‌دراوینگ',
        description: 'چیدمان پنل، الگوی درز، جزئیات لبه، اتصالات زیرسازه و ترتیب نصب پیش از تأمین مستند می‌شود.'
      },
      {
        title: 'برنامه‌ریزی BOM و متریال',
        description: 'پنل‌ها، پروفیل‌های زیرسازه، بست‌ها، فلاشینگ‌ها، سیلانت‌ها و متعلقات برای کاهش پرت و تأخیر سایت برنامه‌ریزی می‌شود.'
      },
      {
        title: 'برنامه‌ریزی نصب',
        description: 'ترتیب نصب، کنترل تراز، تلورانس درز و چک‌پوینت‌های بازرسی پیش از شروع کار سایت تعریف می‌شود.'
      },
      {
        title: 'کنترل کیفیت',
        description: 'تخت بودن پنل، تراز درز، موقعیت فلاشینگ، خطوط سیلانت و جزئیات لبه در چک‌پوینت‌های تعریف‌شده بازرسی می‌شود.'
      }
    ]
  },
  independentRecommendations: {
    title: 'توصیه‌های مستقل سیستم نما',
    intro: 'سی‌پانل به عنوان مهندس سیستم نما عمل می‌کند، نه فروشنده پنل. انتخاب سیستم بر اساس شرایط پروژه انجام می‌شود، نه موجودی انبار.',
    points: [
      {title: 'انتخاب نما بر اساس پروژه', description: 'نوع پنل، سیستم زیرسازه، الگوی درز و جزئیات لبه بر اساس هندسه ساختمان، شرایط اقلیمی و الزامات پروژه بررسی می‌شود.'},
      {title: 'پشتیبانی برنامه‌ریزی تأمین', description: 'حجم پنل، پروفیل زیرسازه، فلاشینگ و متعلقات با شاپ‌دراوینگ هماهنگ می‌شود تا کمبود و تأخیر سایت کاهش یابد.'},
      {title: 'هماهنگی ریسک نصب', description: 'ترتیب نصب، کنترل تراز و چک‌پوینت‌های کیفیت پیش از شروع کار سایت بررسی و تعریف می‌شود.'}
    ],
    comparison: {
      traditional: {
        label: 'نصب سنتی نما',
        items: ['انتخاب پنل بدون بررسی زیرسازه', 'تصمیم جزئیات درز و لبه در سایت', 'فلاشینگ‌ها به صورت واکنشی مدیریت می‌شود', 'متعلقات با تأخیر یا ناقص', 'کیفیت وابسته به عادت نصاب']
      },
      sipanel: {
        label: 'رویکرد مهندسی SIPANEL',
        items: ['هندسه نما و زیرسازه از ابتدا بررسی می‌شود', 'درزها و جزئیات لبه پیش از نصب هماهنگ می‌شود', 'فلاشینگ‌ها به عنوان بخشی از سیستم دیتیل می‌شود', 'متعلقات پیش از تأمین برنامه‌ریزی می‌شود', 'اجرا با چک‌پوینت و کنترل فنی']
      }
    }
  },
  systemApplications: {
    title: 'کاربردهای سیستم نمای آلومینیومی',
    applications: [
      'کارخانه‌های صنعتی',
      'انبارها',
      'ساختمان‌های تجاری',
      'ترمینال‌های فرودگاه',
      'مجموعه‌های ورزشی',
      'نماهای معماری'
    ]
  },
  technicalProof: {
    title: 'شواهد فنی پیش از نصب',
    assets: [
      {title: 'شاپ‌دراوینگ نما', description: 'چیدمان پنل، الگوی درز و جزئیات اتصال پیش از تأمین', alt: 'نمونه شاپ‌دراوینگ نمای آلومینیومی'},
      {title: 'جزئیات آب‌بندی و فلاشینگ', description: 'دیتیل فلاشینگ، درز و آب‌بندی اتصالات نما', alt: 'جزئیات فلاشینگ و آب‌بندی نما'},
      {title: 'فهرست متریال (BOM)', description: 'فهرست پنل، زیرسازه، فلاشینگ و متعلقات هماهنگ با شاپ‌دراوینگ', alt: 'نمونه فهرست متریال نما'}
    ]
  },
  qualityCheckpoints: {
    title: 'چک‌پوینت‌های کیفیت نما',
    checkpoints: [
      'بررسی تراز و تخت بودن زیرسازه',
      'کنترل چیدمان پنل و تراز درز',
      'بازبینی فلاشینگ و دیتیل لبه و گوشه',
      'بررسی خطوط سیلانت و آب‌بندی درز',
      'تأیید جزئیات حرکت حرارتی و اتصال',
      'بازرسی نهایی تخت بودن و یکنواختی سطح نما'
    ]
  },
  relatedCaseStudies: {
    title: 'پروژه‌های مرتبط نما',
    intro: 'نتایج از پروژه‌های واقعی اجراشده با هماهنگی مهندسی SIPANEL.'
  },
  faq: {
    title: 'سوالات متداول نمای آلومینیومی',
    items: [
      {
        question: 'چرا نمای آلومینیومی برای پروژه‌های صنعتی و تجاری مناسب است؟',
        answer: 'نمای آلومینیومی با سبکی، دوام، مقاومت در برابر خوردگی و تنوع طراحی — زمانی که زیرسازه، چیدمان پنل، درزها و جزئیات لبه به درستی مهندسی شود — عملکرد مطلوب دارد.'
      },
      {
        question: 'بیشتر مشکلات نمای آلومینیومی از کجا شروع می‌شود؟',
        answer: 'مشکلات معمولاً از هماهنگی ضعیف زیرسازه، ناهم‌ترازی پنل، خرابی درز و سیلانت، جزئیات ناقص لبه و گوشه یا خطاهای ترتیب نصب شروع می‌شود.'
      },
      {
        question: 'آیا سی‌پانل زیرسازه نما را قبل از نصب بررسی می‌کند؟',
        answer: 'بله. تراز زیرسازه، اتصالات، چیدمان پنل، الگوی درز و جزئیات لبه پیش از برنامه‌ریزی نصب بررسی می‌شود.'
      },
      {
        question: 'تفاوت بین تأمین صرف نما و نمای مهندسی‌شده چیست؟',
        answer: 'تأمین صرف روی تحویل پنل تمرکز دارد. نمای مهندسی‌شده کل سیستم نما را هماهنگ می‌کند — شامل زیرسازه، جزئیات، تأمین، ترتیب نصب و چک‌پوینت‌های کیفیت.'
      },
      {
        question: 'آیا سی‌پانل شاپ‌دراوینگ نما تهیه می‌کند؟',
        answer: 'بله. چیدمان پنل، الگوی درز، جزئیات لبه، اتصالات زیرسازه و ترتیب نصب در شاپ‌دراوینگ پیش از تأمین مستند می‌شود.'
      },
      {
        question: 'حرکت حرارتی در نماهای بزرگ چگونه مدیریت می‌شود؟',
        answer: 'درزهای انبساط، اتصالات لغزنده و جزئیات آگاه از حرکت در شاپ‌دراوینگ تعریف می‌شود تا تنش حرارتی در سطوح بزرگ نما کنترل شود.'
      },
      {
        question: 'آب‌بندی درزهای نما چگونه کنترل می‌شود؟',
        answer: 'نوع سیلانت، عرض درز، عمق پشت‌بند و ترتیب اجرای سیلانت پیش از نصب بررسی و تعریف می‌شود تا ریسک نفوذ آب کاهش یابد.'
      },
    ]
  },
  conversionCta: {
    headline: 'قبل از شروع نصب، ریسک نما را بررسی کنید',
    text: 'درخواست بررسی فنی نما برای زیرسازه، چیدمان پنل، درزها و برنامه‌ریزی نصب کنترل‌شده.',
    button: 'درخواست بررسی مهندسی نما',
    secondaryButton: 'مشاهده پروژه‌های نما'
  },
  breadcrumbs: [
    {label: 'خانه', href: getLocalizedPath('fa')},
    {label: 'پوشانه‌ها', href: getLocalizedPath('fa', '/systems')},
    {label: 'نمای آلومینیومی', href: getLocalizedPath('fa', '/systems/aluminium-cladding-covering')}
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
    primaryKeyword: 'aluminium cladding systems',
    title: 'Aluminium Cladding & Covering | SIPANEL Industrial Facade Systems',
    metaDescription: 'SIPANEL engineers aluminium cladding systems with shop drawings, substructure coordination, panel layout, and controlled installation for industrial and commercial facade projects.'
  },
  hero: {
    eyebrow: 'Industrial Facade Systems',
    h1: 'Aluminium Cladding Engineered Before Installation',
    subheadline: 'SIPANEL coordinates panel layout, substructure, joints, flashings, edge details, and thermal movement before installation begins to reduce facade risk.',
    primaryCta: 'Request Facade Engineering Review',
    secondaryCta: 'View Facade Projects',
    visualAlt: 'Aluminium cladding installation with engineered substructure and panel layout',
    trustMicrocopy: 'Technical review for industrial facade systems, substructure details, and controlled installation.'
  },
  problemContext: {
    title: 'Facade Problems Usually Start with Poor Coordination',
    cards: [
      'Poor substructure coordination: misalignment between substructure and panel layout causes rework, delays, and visual defects on the finished facade',
      'Panel alignment and flatness issues: without precise substructure control and installation discipline, the facade surface appears uneven and inconsistent',
      'Joint and sealant failures: unplanned joints and incorrect sealant application lead to water ingress and long-term maintenance problems',
      'Edge, corner, and flashing detailing problems: without precise pre-installation details, edges and corners become weak points on the facade',
      'Thermal movement and installation sequence errors: large facade surfaces need movement-aware detailing and a controlled installation sequence — without this coordination, even good materials fail'
    ]
  },
  engineeringApproach: {
    title: 'How SIPANEL Engineers Facade Risk Before Execution',
    steps: [
      {
        title: 'Shop Drawing Coordination',
        description: 'Panel layout, joint patterns, edge details, substructure connections, and installation sequence are documented before procurement.'
      },
      {
        title: 'BOM & Material Planning',
        description: 'Panels, substructure profiles, fasteners, flashings, sealants, and accessories are planned to reduce waste and site delays.'
      },
      {
        title: 'Installation Planning',
        description: 'Installation sequence, alignment control, joint tolerance, and inspection checkpoints are defined before site work begins.'
      },
      {
        title: 'Quality Control',
        description: 'Panel flatness, joint alignment, flashing positions, sealant lines, and edge details are inspected at defined checkpoints.'
      }
    ]
  },
  independentRecommendations: {
    title: 'Independent Facade System Recommendations',
    intro: 'SIPANEL operates as a facade system engineer, not a panel reseller. System selection is based on project conditions, not warehouse inventory.',
    points: [
      {title: 'Project-First Facade Selection', description: 'Panel type, substructure system, joint pattern, and edge details are reviewed based on building geometry, climate conditions, and project requirements.'},
      {title: 'Procurement Planning Support', description: 'Panel quantities, substructure profiles, flashings, and accessories are coordinated with shop drawings to reduce shortages and site delays.'},
      {title: 'Installation Risk Coordination', description: 'Installation sequence, alignment control, and quality checkpoints are reviewed and defined before site work begins.'}
    ],
    comparison: {
      traditional: {
        label: 'Typical Facade Installation',
        items: ['Panel selected before substructure review', 'Joint and edge decisions made on site', 'Flashings handled reactively', 'Accessories missing or delayed', 'Quality depends on installer habit']
      },
      sipanel: {
        label: 'SIPANEL Engineering Approach',
        items: ['Facade geometry and substructure reviewed early', 'Joints and edge details coordinated before installation', 'Flashings detailed as part of the system', 'Accessories planned before procurement', 'Execution follows checkpoints and technical control']
      }
    }
  },
  systemApplications: {
    title: 'Where Aluminium Cladding Fits',
    applications: [
      'Industrial factories',
      'Warehouses',
      'Commercial buildings',
      'Airport terminals',
      'Sports complexes',
      'Architectural facades'
    ]
  },
  technicalProof: {
    title: 'Engineering Proof Before Installation',
    assets: [
      {title: 'Shop Drawing', description: 'Panel layout, joint patterns, and connection details coordinated before procurement.', alt: 'Aluminium cladding shop drawing example'},
      {title: 'Waterproofing / Flashing Detail', description: 'Flashing, joint sealing, and edge connection details reviewed before installation.', alt: 'Facade flashing and waterproofing detail'},
      {title: 'BOM / Material Takeoff', description: 'Panel, substructure, flashing, and accessory quantities coordinated with shop drawings.', alt: 'Facade material takeoff and BOM example'}
    ]
  },
  qualityCheckpoints: {
    title: 'Facade Quality Checkpoints',
    checkpoints: [
      'Substructure alignment and flatness verification',
      'Panel layout and joint alignment control',
      'Flashing, edge, and corner detail review',
      'Sealant line and joint waterproofing check',
      'Thermal movement and connection detail verification',
      'Final surface flatness and visual uniformity inspection'
    ]
  },
  relatedCaseStudies: {
    title: 'Related Facade Projects',
    intro: 'Results from real projects executed with SIPANEL engineering coordination.'
  },
  faq: {
    title: 'Aluminium Cladding Questions',
    items: [
      {
        question: 'Why is aluminium cladding suitable for industrial and commercial projects?',
        answer: 'Aluminium cladding offers lightweight construction, durability, corrosion resistance, and design flexibility — when substructure, panel layout, joints, and edge details are engineered correctly.'
      },
      {
        question: 'What causes most aluminium cladding problems?',
        answer: 'Problems typically start from poor substructure coordination, panel misalignment, joint and sealant failures, incomplete edge and corner details, or installation sequence errors.'
      },
      {
        question: 'Does SIPANEL review substructure before installation?',
        answer: 'Yes. Substructure alignment, connections, panel layout, joint patterns, and edge details are reviewed before installation planning begins.'
      },
      {
        question: 'What is the difference between supply-only cladding and engineered cladding?',
        answer: 'Supply-only focuses on panel delivery. Engineered cladding coordinates the complete facade system — including substructure, details, procurement, installation sequence, and quality checkpoints.'
      },
      {
        question: 'Does SIPANEL provide facade shop drawings?',
        answer: 'Yes. Panel layout, joint patterns, edge details, substructure connections, and installation sequence are documented in shop drawings before procurement.'
      },
      {
        question: 'How is thermal movement managed on large facades?',
        answer: 'Expansion joints, sliding connections, and movement-aware detailing are defined in shop drawings to control thermal stress across large facade surfaces.'
      },
      {
        question: 'How is joint waterproofing controlled on the facade?',
        answer: 'Sealant type, joint width, backer rod depth, and sealant application sequence are reviewed and defined before installation to reduce water ingress risk.'
      },
    ]
  },
  conversionCta: {
    headline: 'Review the Facade Risk Before Installation Starts',
    text: 'Request a technical facade review for substructure, panel layout, joints, and controlled installation planning.',
    button: 'Request Facade Engineering Review',
    secondaryButton: 'View Facade Projects'
  },
  breadcrumbs: [
    {label: 'Home', href: '/en'},
    {label: 'Systems', href: '/en/systems'},
    {label: 'Aluminium Cladding', href: '/en/systems/aluminium-cladding-covering'}
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
    primaryKeyword: 'أنظمة الكسوة الألومنيومية',
    title: 'الكسوة الألومنيومية | أنظمة الواجهات الصناعية SIPANEL',
    metaDescription: 'تهندس SIPANEL أنظمة الكسوة الألومنيومية مع رسومات الشوب وتنسيق البنية التحتية وتخطيط الألواح والتركيب المنضبط للمشاريع الصناعية والتجارية.'
  },
  hero: {
    eyebrow: 'أنظمة الواجهات الصناعية',
    h1: 'كسوة ألومنيومية مهندسة قبل التركيب',
    subheadline: 'تنسق SIPANEL تخطيط الألواح والبنية التحتية والمفاصل والفلاشينغ وتفاصيل الحواف والحركة الحرارية قبل بدء التركيب لتقليل مخاطر الواجهة.',
    primaryCta: 'طلب مراجعة هندسية للواجهة',
    secondaryCta: 'عرض مشاريع الواجهات',
    visualAlt: 'تركيب كسوة ألومنيومية مع بنية تحتية مهندسة وتخطيط ألواح',
    trustMicrocopy: 'مراجعة فنية لأنظمة الواجهات الصناعية وتفاصيل البنية التحتية والتركيب المنضبط.'
  },
  problemContext: {
    title: 'مشاكل الواجهة تبدأ عادةً من ضعف التنسيق',
    cards: [
      'تنسيق ضعيف للبنية التحتية: عدم التوافق بين البنية التحتية وتخطيط الألواح يسبب إعادة العمل والتأخير والعيوب البصرية',
      'مشاكل محاذاة الألواح واستوائها: بدون تحكم دقيق في البنية التحتية والتركيب يظهر سطح الواجهة غير متساوٍ وغير متناسق',
      'فشل المفاصل ومانع التسرب: المفاصل غير المخططة وتطبيق مانع التسرب الخاطئ يؤديان إلى تسرب المياه ومشاكل صيانة طويلة الأمد',
      'مشاكل تفصيل الحواف والزوايا والفلاشينغ: بدون تفاصيل دقيقة قبل التنفيذ تصبح الحواف والزوايا نقاط ضعف في الواجهة',
      'أخطاء الحركة الحرارية وتسلسل التركيب: أسطح الواجهة الكبيرة تحتاج تفصيلاً واعياً للحركة وتسلسل تركيب منضبط — بدون هذا التنسيق حتى المواد الجيدة تفشل'
    ]
  },
  engineeringApproach: {
    title: 'كيف تهندس SIPANEL مخاطر الواجهة قبل التنفيذ',
    steps: [
      {
        title: 'تنسيق رسومات الشوب',
        description: 'يتم توثيق تخطيط الألواح وأنماط المفاصل وتفاصيل الحواف واتصالات البنية التحتية وتسلسل التركيب قبل التوريد.'
      },
      {
        title: 'تخطيط BOM والمواد',
        description: 'يتم تخطيط الألواح وبروفيلات البنية التحتية والمثبتات والفلاشينغ ومانعات التسرب والملحقات لتقليل الهدر والتأخير.'
      },
      {
        title: 'تخطيط التركيب',
        description: 'يتم تحديد تسلسل التركيب والتحكم في المحاذاة وتحمل المفاصل ونقاط الفحص قبل بدء العمل في الموقع.'
      },
      {
        title: 'ضبط الجودة',
        description: 'يتم فحص استواء الألواح ومحاذاة المفاصل ومواقع الفلاشينغ وخطوط مانع التسرب وتفاصيل الحواف عند نقاط فحص محددة.'
      }
    ]
  },
  independentRecommendations: {
    title: 'توصيات مستقلة لنظام الواجهة',
    intro: 'تعمل SIPANEL كمهندس نظام واجهات وليس بائع ألواح. اختيار النظام يعتمد على ظروف المشروع وليس مخزون المستودع.',
    points: [
      {title: 'اختيار الواجهة حسب المشروع', description: 'يتم مراجعة نوع الألواح ونظام البنية التحتية ونمط المفاصل وتفاصيل الحواف بناءً على هندسة المبنى والظروف المناخية ومتطلبات المشروع.'},
      {title: 'دعم تخطيط التوريد', description: 'يتم تنسيق كميات الألواح وبروفيلات البنية التحتية والفلاشينغ والملحقات مع رسومات الشوب لتقليل النقص والتأخير.'},
      {title: 'تنسيق مخاطر التركيب', description: 'يتم مراجعة وتحديد تسلسل التركيب والتحكم في المحاذاة ونقاط الجودة قبل بدء العمل في الموقع.'}
    ],
    comparison: {
      traditional: {
        label: 'التركيب التقليدي للواجهة',
        items: ['اختيار الألواح قبل مراجعة البنية التحتية', 'قرارات المفاصل والحواف في الموقع', 'الفلاشينغ يُعالج بشكل تفاعلي', 'الملحقات ناقصة أو متأخرة', 'الجودة تعتمد على عادة المركّب']
      },
      sipanel: {
        label: 'نهج SIPANEL الهندسي',
        items: ['مراجعة هندسة الواجهة والبنية التحتية مبكراً', 'تنسيق المفاصل وتفاصيل الحواف قبل التركيب', 'الفلاشينغ مفصّل كجزء من النظام', 'الملحقات مخططة قبل التوريد', 'التنفيذ يتبع نقاط فحص وضبط فني']
      }
    }
  },
  systemApplications: {
    title: 'تطبيقات نظام الكسوة الألومنيومية',
    applications: [
      'المصانع الصناعية',
      'المستودعات',
      'المباني التجارية',
      'صالات المطارات',
      'المجمعات الرياضية',
      'الواجهات المعمارية'
    ]
  },
  technicalProof: {
    title: 'إثبات هندسي قبل التركيب',
    assets: [
      {title: 'رسم شوب للواجهة', description: 'تخطيط الألواح وأنماط المفاصل وتفاصيل الاتصال المنسقة قبل التوريد', alt: 'نموذج رسم شوب للكسوة الألومنيومية'},
      {title: 'تفاصيل العزل المائي والفلاشينغ', description: 'تفاصيل الفلاشينغ وعزل المفاصل واتصالات الحواف', alt: 'تفاصيل فلاشينغ وعزل مائي للواجهة'},
      {title: 'قائمة المواد (BOM)', description: 'كميات الألواح والبنية التحتية والفلاشينغ والملحقات المنسقة مع رسومات الشوب', alt: 'نموذج قائمة مواد الواجهة'}
    ]
  },
  qualityCheckpoints: {
    title: 'نقاط فحص جودة الواجهة',
    checkpoints: [
      'التحقق من محاذاة واستواء البنية التحتية',
      'التحكم في تخطيط الألواح ومحاذاة المفاصل',
      'مراجعة الفلاشينغ وتفاصيل الحواف والزوايا',
      'فحص خطوط مانع التسرب وعزل المفاصل',
      'التحقق من الحركة الحرارية وتفاصيل الاتصال',
      'الفحص النهائي لاستواء السطح والتناسق البصري'
    ]
  },
  relatedCaseStudies: {
    title: 'مشاريع واجهات ذات صلة',
    intro: 'نتائج من مشاريع حقيقية نُفذت بتنسيق هندسي من SIPANEL.'
  },
  faq: {
    title: 'أسئلة شائعة حول الكسوة الألومنيومية',
    items: [
      {
        question: 'لماذا تناسب الكسوة الألومنيومية المشاريع الصناعية والتجارية؟',
        answer: 'توفر الكسوة الألومنيومية بناءً خفيف الوزن ومتانة ومقاومة للتآكل ومرونة في التصميم — عندما تتم هندسة البنية التحتية وتخطيط الألواح والمفاصل وتفاصيل الحواف بشكل صحيح.'
      },
      {
        question: 'ما الذي يسبب معظم مشاكل الكسوة الألومنيومية؟',
        answer: 'تبدأ المشاكل عادةً من تنسيق ضعيف للبنية التحتية أو عدم محاذاة الألواح أو فشل المفاصل ومانع التسرب أو تفاصيل ناقصة للحواف والزوايا أو أخطاء في تسلسل التركيب.'
      },
      {
        question: 'هل تراجع SIPANEL البنية التحتية قبل التركيب؟',
        answer: 'نعم. تتم مراجعة محاذاة البنية التحتية والاتصالات وتخطيط الألواح وأنماط المفاصل وتفاصيل الحواف قبل تخطيط التركيب.'
      },
      {
        question: 'ما الفرق بين توريد الكسوة فقط والكسوة المهندسة؟',
        answer: 'التوريد فقط يركز على تسليم الألواح. الكسوة المهندسة تنسق نظام الواجهة الكامل — بما في ذلك البنية التحتية والتفاصيل والتوريد وتسلسل التركيب ونقاط فحص الجودة.'
      },
      {
        question: 'هل توفر SIPANEL رسومات شوب للواجهة؟',
        answer: 'نعم. يتم توثيق تخطيط الألواح وأنماط المفاصل وتفاصيل الحواف واتصالات البنية التحتية وتسلسل التركيب في رسومات الشوب قبل التوريد.'
      },
      {
        question: 'كيف تتم إدارة الحركة الحرارية في الواجهات الكبيرة؟',
        answer: 'يتم تحديد مفاصل التمدد والاتصالات المنزلقة والتفصيل الواعي للحركة في رسومات الشوب للتحكم في الإجهاد الحراري عبر أسطح الواجهة الكبيرة.'
      },
      {
        question: 'كيف يتم التحكم في عزل مفاصل الواجهة؟',
        answer: 'تتم مراجعة وتحديد نوع مانع التسرب وعرض المفصل وعمق الحشوة وتسلسل تطبيق مانع التسرب قبل التركيب لتقليل مخاطر تسرب المياه.'
      },
    ]
  },
  conversionCta: {
    headline: 'راجع مخاطر الواجهة قبل بدء التركيب',
    text: 'اطلب مراجعة فنية للواجهة تشمل البنية التحتية وتخطيط الألواح والمفاصل وتخطيط التركيب المنضبط.',
    button: 'طلب مراجعة هندسية للواجهة',
    secondaryButton: 'عرض مشاريع الواجهات'
  },
  breadcrumbs: [
    {label: 'الرئيسية', href: '/ar'},
    {label: 'الأنظمة', href: '/ar/systems'},
    {label: 'الكسوة الألومنيومية', href: '/ar/systems/aluminium-cladding-covering'}
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
    primaryKeyword: 'системы алюминиевой облицовки',
    title: 'Алюминиевая облицовка | Промышленные фасадные системы SIPANEL',
    metaDescription: 'SIPANEL проектирует системы алюминиевой облицовки с монтажными чертежами, координацией подконструкции, раскладкой панелей и контролируемым монтажом для промышленных и коммерческих фасадных проектов.'
  },
  hero: {
    eyebrow: 'Промышленные фасадные системы',
    h1: 'Алюминиевая облицовка, спроектированная до монтажа',
    subheadline: 'SIPANEL координирует раскладку панелей, подконструкцию, стыки, примыкания, детали кромок и тепловое расширение до начала монтажа для снижения фасадных рисков.',
    primaryCta: 'Запросить инженерную экспертизу фасада',
    secondaryCta: 'Посмотреть фасадные проекты',
    visualAlt: 'Монтаж алюминиевой облицовки с инженерной подконструкцией и раскладкой панелей',
    trustMicrocopy: 'Техническая экспертиза промышленных фасадных систем, деталей подконструкции и контролируемого монтажа.'
  },
  problemContext: {
    title: 'Проблемы фасада обычно начинаются с плохой координации',
    cards: [
      'Плохая координация подконструкции: несоответствие между подконструкцией и раскладкой панелей вызывает переделки, задержки и визуальные дефекты',
      'Проблемы выравнивания и плоскостности панелей: без точного контроля подконструкции и дисциплины монтажа поверхность фасада выглядит неровной и непоследовательной',
      'Отказ стыков и герметиков: незапланированные стыки и неправильное нанесение герметика приводят к проникновению воды и долгосрочным проблемам обслуживания',
      'Проблемы детализации кромок, углов и примыканий: без точных деталей до монтажа кромки и углы становятся слабыми местами фасада',
      'Ошибки теплового расширения и последовательности монтажа: большие фасадные поверхности требуют детализации с учётом движения и контролируемой последовательности монтажа — без этой координации даже хорошие материалы подводят'
    ]
  },
  engineeringApproach: {
    title: 'Как SIPANEL инженерно контролирует фасадные риски до монтажа',
    steps: [
      {
        title: 'Координация монтажных чертежей',
        description: 'Раскладка панелей, рисунок стыков, детали кромок, соединения подконструкции и последовательность монтажа документируются до закупки.'
      },
      {
        title: 'Планирование BOM и материалов',
        description: 'Панели, профили подконструкции, крепёж, примыкания, герметики и аксессуары планируются для снижения отходов и задержек на объекте.'
      },
      {
        title: 'Планирование монтажа',
        description: 'Последовательность монтажа, контроль выравнивания, допуски стыков и контрольные точки инспекции определяются до начала работ на объекте.'
      },
      {
        title: 'Контроль качества',
        description: 'Плоскостность панелей, выравнивание стыков, позиции примыканий, линии герметика и детали кромок проверяются в определённых контрольных точках.'
      }
    ]
  },
  independentRecommendations: {
    title: 'Независимые рекомендации по фасадной системе',
    intro: 'SIPANEL работает как инженер фасадной системы, а не перепродавец панелей. Выбор системы основан на условиях проекта, а не на складских запасах.',
    points: [
      {title: 'Выбор фасада под проект', description: 'Тип панели, система подконструкции, рисунок стыков и детали кромок рассматриваются на основе геометрии здания, климатических условий и требований проекта.'},
      {title: 'Поддержка планирования закупок', description: 'Количество панелей, профили подконструкции, примыкания и аксессуары координируются с монтажными чертежами для снижения дефицита и задержек.'},
      {title: 'Координация рисков монтажа', description: 'Последовательность монтажа, контроль выравнивания и контрольные точки качества определяются до начала работ на объекте.'}
    ],
    comparison: {
      traditional: {
        label: 'Типичный монтаж фасада',
        items: ['Панели выбираются до проверки подконструкции', 'Решения по стыкам и кромкам принимаются на объекте', 'Примыкания обрабатываются реактивно', 'Аксессуары отсутствуют или задерживаются', 'Качество зависит от привычек монтажника']
      },
      sipanel: {
        label: 'Инженерный подход SIPANEL',
        items: ['Геометрия фасада и подконструкция проверяются заранее', 'Стыки и детали кромок координируются до монтажа', 'Примыкания детализируются как часть системы', 'Аксессуары планируются до закупки', 'Монтаж следует контрольным точкам и техническому контролю']
      }
    }
  },
  systemApplications: {
    title: 'Применение алюминиевой облицовки',
    applications: [
      'Промышленные заводы',
      'Склады',
      'Коммерческие здания',
      'Терминалы аэропортов',
      'Спортивные комплексы',
      'Архитектурные фасады'
    ]
  },
  technicalProof: {
    title: 'Инженерное подтверждение до монтажа',
    assets: [
      {title: 'Монтажный чертёж фасада', description: 'Раскладка панелей, рисунок стыков и детали соединений, координированные до закупки', alt: 'Пример монтажного чертежа алюминиевой облицовки'},
      {title: 'Детали гидроизоляции и примыканий', description: 'Детали примыканий, герметизации стыков и соединений кромок', alt: 'Детали примыканий и гидроизоляции фасада'},
      {title: 'Ведомость материалов (BOM)', description: 'Количество панелей, подконструкции, примыканий и аксессуаров, координированных с монтажными чертежами', alt: 'Пример ведомости фасадных материалов'}
    ]
  },
  qualityCheckpoints: {
    title: 'Контрольные точки качества фасада',
    checkpoints: [
      'Проверка выравнивания и плоскостности подконструкции',
      'Контроль раскладки панелей и выравнивания стыков',
      'Проверка примыканий и деталей кромок и углов',
      'Проверка линий герметика и гидроизоляции стыков',
      'Верификация теплового расширения и деталей соединений',
      'Финальная инспекция плоскостности поверхности и визуальной однородности'
    ]
  },
  relatedCaseStudies: {
    title: 'Связанные фасадные проекты',
    intro: 'Результаты реальных проектов, выполненных с инженерной координацией SIPANEL.'
  },
  faq: {
    title: 'Вопросы об алюминиевой облицовке',
    items: [
      {
        question: 'Почему алюминиевая облицовка подходит для промышленных и коммерческих проектов?',
        answer: 'Алюминиевая облицовка обеспечивает лёгкую конструкцию, долговечность, коррозионную стойкость и гибкость дизайна — когда подконструкция, раскладка панелей, стыки и детали кромок правильно спроектированы.'
      },
      {
        question: 'Что вызывает большинство проблем алюминиевой облицовки?',
        answer: 'Проблемы обычно начинаются с плохой координации подконструкции, несовпадения панелей, отказа стыков и герметиков, неполных деталей кромок и углов или ошибок последовательности монтажа.'
      },
      {
        question: 'Проверяет ли SIPANEL подконструкцию до монтажа?',
        answer: 'Да. Выравнивание подконструкции, соединения, раскладка панелей, рисунок стыков и детали кромок проверяются до планирования монтажа.'
      },
      {
        question: 'В чём разница между простой поставкой облицовки и инженерной облицовкой?',
        answer: 'Простая поставка фокусируется на доставке панелей. Инженерная облицовка координирует полную фасадную систему — включая подконструкцию, детали, закупки, последовательность монтажа и контрольные точки качества.'
      },
      {
        question: 'Предоставляет ли SIPANEL монтажные чертежи фасада?',
        answer: 'Да. Раскладка панелей, рисунок стыков, детали кромок, соединения подконструкции и последовательность монтажа документируются в монтажных чертежах до закупки.'
      },
      {
        question: 'Как управляется тепловое расширение на больших фасадах?',
        answer: 'Деформационные швы, скользящие соединения и детализация с учётом движения определяются в монтажных чертежах для контроля термических напряжений на больших фасадных поверхностях.'
      },
      {
        question: 'Как контролируется гидроизоляция стыков фасада?',
        answer: 'Тип герметика, ширина стыка, глубина подложки и последовательность нанесения герметика определяются до монтажа для снижения риска проникновения воды.'
      },
    ]
  },
  conversionCta: {
    headline: 'Проверьте фасадные риски до начала монтажа',
    text: 'Запросите техническую экспертизу фасада по подконструкции, раскладке панелей, стыкам и планированию контролируемого монтажа.',
    button: 'Запросить инженерную экспертизу фасада',
    secondaryButton: 'Посмотреть фасадные проекты'
  },
  breadcrumbs: [
    {label: 'Главная', href: '/ru'},
    {label: 'Системы', href: '/ru/systems'},
    {label: 'Алюминиевая облицовка', href: '/ru/systems/aluminium-cladding-covering'}
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
      projectName: isFa ? 'ورودی استادیوم شهربابک'
        : isAr ? 'مدخل استاد شهر بابك'
        : isRu ? 'Вход стадиона Шахр Бабак'
        : 'Shahr Babak Stadium Entrance',
      location: isFa ? 'شهربابک، کرمان، ایران' : isAr ? 'شهر بابك، كرمان، إيران' : isRu ? 'Шахр Бабак, Керман, Иран' : 'Shahr Babak, Kerman, Iran',
      areaM2: '700 m²',
      projectType: isFa ? 'ورودی استادیوم' : isAr ? 'مدخل استاد' : isRu ? 'Вход стадиона' : 'Stadium Entrance',
      challenge: isFa
        ? 'ورودی منحنی استادیوم نیازمند دیتیل دقیق نمای آلومینیومی با هندسه خاص و هماهنگی زیرسازه و پنل بود.'
        : isAr
        ? 'تطلب مدخل الاستاد المنحني تفصيلاً دقيقاً للكسوة الألومنيومية بهندسة خاصة وتنسيق البنية التحتية والألواح.'
        : isRu
        ? 'Криволинейный вход стадиона потребовал точной детализации алюминиевой облицовки со сложной геометрией и координации подконструкции и панелей.'
        : 'Curved stadium entrance requiring precise aluminium cladding detailing with complex geometry and substructure-panel coordination.',
      measuredResult: isFa
        ? 'ورودی آلومینیومی بصری متمایز استادیوم با کیفیت کنترل‌شده تحویل شد.'
        : isAr
        ? 'تم تسليم مدخل استاد مميز بصرياً بكسوة ألومنيومية بجودة منضبطة.'
        : isRu
        ? 'Визуально выразительный алюминиевый вход стадиона сдан с контролируемым качеством.'
        : 'Visually distinctive aluminium-clad stadium entrance delivered with controlled quality.',
      href: getLocalizedPath(locale, '/projects/shahr-babak-stadium-entrance'),
      image: babakSardarbCard
    },
    {
      projectName: isFa ? 'دروازه ورودی شهر پرند'
        : isAr ? 'بوابة مدخل مدينة بارند'
        : isRu ? 'Входные ворота города Паранд'
        : 'Parand City Entrance Gate',
      location: isFa ? 'پرند، تهران، ایران' : isAr ? 'بارند، طهران، إيران' : isRu ? 'Паранд, Тегеран, Иран' : 'Parand, Tehran, Iran',
      areaM2: '500 m²',
      projectType: isFa ? 'دروازه ورودی شهر' : isAr ? 'بوابة مدخل مدينة' : isRu ? 'Входные ворота города' : 'City Entrance Gate',
      challenge: isFa
        ? 'ورودی معماری خاص شهر نیازمند نمای آلومینیومی سفارشی با هماهنگی دقیق هندسه، زیرسازه و پنل بود.'
        : isAr
        ? 'تطلب مدخل المدينة المعماري الخاص كسوة ألومنيومية مخصصة مع تنسيق دقيق للهندسة والبنية التحتية والألواح.'
        : isRu
        ? 'Архитектурный городской вход потребовал индивидуальной алюминиевой облицовки с точной координацией геометрии, подконструкции и панелей.'
        : 'Special architectural city entrance requiring customized aluminium cladding with precise geometry, substructure, and panel coordination.',
      measuredResult: isFa
        ? 'دروازه ورودی شهر با نمای آلومینیومی متمایز و کیفیت کنترل‌شده تحویل شد.'
        : isAr
        ? 'تم تسليم بوابة مدخل المدينة بكسوة ألومنيومية مميزة وجودة منضبطة.'
        : isRu
        ? 'Выразительные входные ворота города с алюминиевой облицовкой сданы с контролируемым качеством.'
        : 'Distinctive aluminium-clad city entrance gate delivered with controlled quality.',
      href: getLocalizedPath(locale, '/projects/parand-city-entrance'),
      image: parandCard
    },
    {
      projectName: isFa ? 'سایبان ورودی بیمارستان چشم اربیل'
        : isAr ? 'مظلة مدخل مستشفى العيون في أربيل'
        : isRu ? 'Навес входной зоны глазной больницы Эрбиля'
        : 'Erbil Eye Hospital Entrance Canopy',
      location: isFa ? 'اربیل، اقلیم کردستان، عراق' : isAr ? 'أربيل، إقليم كردستان، العراق' : isRu ? 'Эрбиль, Курдистан, Ирак' : 'Erbil, Kurdistan Region, Iraq',
      areaM2: '1,500 m²',
      projectType: isFa ? 'سایبان ورودی بیمارستان' : isAr ? 'مظلة مدخل مستشفى' : isRu ? 'Навес входной зоны больницы' : 'Hospital Entrance Canopy',
      challenge: isFa
        ? 'ترجمه مفهوم معماری نمادین چشم‌شکل به سازه قابل ساخت با حفظ هویت بصری و هماهنگی سازه، پنل و زیرسازه.'
        : isAr
        ? 'ترجمة المفهوم المعماري الرمزي بشكل العين إلى هيكل قابل للبناء مع الحفاظ على الهوية البصرية وتنسيق الهيكل والألواح والبنية التحتية.'
        : isRu
        ? 'Перевод символической архитектурной концепции в форме глаза в строительную конструкцию с сохранением визуальной идентичности и координацией конструкции, панелей и подконструкции.'
        : 'Translating the symbolic eye-shaped architectural concept into a buildable structure while preserving visual identity and coordinating structure, panels, and substructure.',
      measuredResult: isFa
        ? 'اجرای موفق ۱,۵۰۰ مترمربع سایبان ورودی با حفظ هویت چشم‌شکل و کیفیت کنترل‌شده.'
        : isAr
        ? 'تنفيذ ناجح لـ 1,500 م² من مظلة المدخل مع الحفاظ على الهوية بشكل العين والجودة المنضبطة.'
        : isRu
        ? 'Успешное выполнение 1 500 м² навеса входной зоны с сохранением формы глаза и контролируемым качеством.'
        : 'Successful completion of 1,500 m² entrance canopy preserving the eye-shaped identity with controlled quality.',
      href: getLocalizedPath(locale, '/projects/erbil-eye-hospital-entrance-canopy'),
      image: erbilEyeHospitalCard
    }
  ];
}

// ── Locale map ──

const localeContent: Record<string, LocalizedContent> = {fa, en, ar, ru};

// ── Page builder ──

export function getAluminiumCladdingCoveringPage(locale: Locale): ServicePageTemplateData {
  const content = localeContent[locale] ?? en;

  return {
    id: 'aluminium_cladding_covering',
    routes: aluminiumCladdingCoveringSpec.route,
    seo: content.seo,
    hero: {
      eyebrow: content.hero.eyebrow,
      h1: content.hero.h1,
      subheadline: content.hero.subheadline,
      primaryCta: content.hero.primaryCta,
      secondaryCta: content.hero.secondaryCta,
      visualDirection: content.hero.visualAlt,
      visual: aluminiumCladdingHero,
      visualAlt: content.hero.visualAlt,
      trustMicrocopy: content.hero.trustMicrocopy
    },
    problemContext: content.problemContext,
    engineeringApproach: content.engineeringApproach,
    independentRecommendations: content.independentRecommendations,
    systemApplications: content.systemApplications,
    technicalProof: {
      title: content.technicalProof.title,
      description: '',
      requiredVisuals: [],
      assets: [
        {
          title: content.technicalProof.assets[0].title,
          description: content.technicalProof.assets[0].description,
          image: aluminiumInstallImg,
          imageMobile: aluminiumInstallMobileImg,
          alt: content.technicalProof.assets[0].alt
        },
        {
          title: content.technicalProof.assets[1].title,
          description: content.technicalProof.assets[1].description,
          image: aluminiumJointImg,
          imageMobile: aluminiumJointMobileImg,
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
    caseStudyLabels: content.caseStudyLabels
  };
}
