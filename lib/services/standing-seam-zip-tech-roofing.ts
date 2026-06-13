import type {ServicePageTemplateData} from '@/components/services/service-page-template';
import type {Locale} from '@/i18n/routing';
import standingSeamHero from '@/assets/systems/standing-seam/standing-seam-hero.webp';
import clipInstallImg from '@/assets/systems/standing-seam/clip-installation.webp';
import seamDetailImg from '@/assets/systems/standing-seam/seam-detail.webp';
import bomMtoImage from '@/assets/technical/procurement/bom-mto-preview.webp';
import ahvazAirportCard from '@/assets/projects/ahvaz-airport-passenger-terminal/photos/ahvaz-airport-passenger-terminal-card.webp';
import megaparsCard from '@/assets/projects/megaparsmall-atrium/photos/megaparsmall-atrium-card.webp';
import shahrBabakHallCard from '@/assets/projects/shahre-babak-hall/photos/shahre-babak-hall-card.webp';

export const standingSeamZipTechRoofingSpec = {
  route: {
    en: '/en/systems/standing-seam-zip-tech-roofing',
    fa: '/fa/systems/standing-seam-zip-tech-roofing',
    ar: '/ar/systems/standing-seam-zip-tech-roofing',
    ru: '/ru/systems/standing-seam-zip-tech-roofing'
  },
  seo: {
    primary_keyword: 'standing seam roofing',
    title: 'Standing Seam & ZIP Tech Roofing | SIPANEL Industrial Waterproof Roofing',
    meta_description: 'SIPANEL designs and executes Standing Seam and ZIP Tech roofing systems with drainage logic, flashing coordination, concealed fastening, and controlled installation for industrial projects.'
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
    primaryKeyword: 'سقف استندینگ سیم',
    title: 'سقف استندینگ سیم و ZIP Tech | سیستم سقف ضدآب صنعتی SIPANEL',
    metaDescription: 'سی‌پانل سیستم‌های سقف استندینگ سیم و ZIP Tech را با منطق زهکشی، هماهنگی فلاشینگ، اتصال مخفی و نصب کنترل‌شده برای پروژه‌های صنعتی طراحی و اجرا می‌کند.'
  },
  hero: {
    eyebrow: 'سقف ضدآب صنعتی',
    h1: 'سقف استندینگ سیم با منطق مهندسی آب‌بندی',
    subheadline: 'سی‌پانل شیب سقف، مسیرهای زهکشی، درزها، فلاشینگ‌ها، ناودان‌ها، نقاط نفوذ و جزئیات اتصال مخفی را پیش از شروع نصب هماهنگ می‌کند تا ریسک نشتی کاهش یابد.',
    primaryCta: 'درخواست بررسی مهندسی سقف',
    secondaryCta: 'مشاهده پروژه‌های سقف',
    visualAlt: 'سیستم سقف استندینگ سیم با جزئیات مهندسی آب‌بندی',
    trustMicrocopy: 'بررسی فنی برای زهکشی سقف صنعتی، جزئیات فلاشینگ و نصب کنترل‌شده.'
  },
  problemContext: {
    title: 'نشتی سقف معمولاً یک مشکل هماهنگی است',
    cards: [
      'طراحی ضعیف زهکشی: شیب، ناودان یا لوله‌های آبرو هماهنگ نشده و آب روی سقف جمع می‌شود',
      'جزئیات نادرست فلاشینگ: لبه‌ها، خط‌الرأس، دره‌ها و اتصال دیوار نیاز به دیتیل دقیق پیش از اجرا دارند',
      'نفوذهای کنترل‌نشده: نورگیرها، دریچه‌ها، کانال‌ها و بازشوهای تأسیساتی بدون دیتیل صحیح ریسک ایجاد می‌کنند',
      'ریسک اتصال رو: استراتژی نادرست اتصال احتمال نفوذ آب و مشکلات نگهداری را افزایش می‌دهد',
      'مشکلات انبساط و خطاهای نصب: سطوح بزرگ سقف نیاز به دیتیل آگاه از حرکت و ترتیب صحیح نصب دارند — بدون این هماهنگی حتی متریال خوب هم عمل نمی‌کند'
    ]
  },
  engineeringApproach: {
    title: 'کنترل مهندسی ریسک سقف پیش از اجرا',
    steps: [
      {
        title: 'هماهنگی شاپ‌دراوینگ',
        description: 'چیدمان ورق، مسیر درز، جزئیات فلاشینگ، موقعیت کلیپ و ترتیب نصب پیش از تأمین مستند می‌شود.'
      },
      {
        title: 'برنامه‌ریزی BOM و متریال',
        description: 'ورق، کلیپ، بست، ناودان، تریم، فلاشینگ و متعلقات زهکشی برای کاهش پرت و تأخیر برنامه‌ریزی می‌شود.'
      },
      {
        title: 'برنامه‌ریزی نصب',
        description: 'ترتیب نصب، منطق آب‌بندی، جزئیات نقاط نفوذ و چک‌پوینت‌های بازرسی پیش از شروع کار سایت تعریف می‌شود.'
      },
      {
        title: 'کنترل کیفیت',
        description: 'شیب، تراز درز، موقعیت فلاشینگ، آب‌بندی نقاط نفوذ و منطق اتصال در چک‌پوینت‌های تعریف‌شده بازرسی می‌شود.'
      }
    ]
  },
  independentRecommendations: {
    title: 'توصیه‌های مستقل سیستم سقف',
    intro: 'سی‌پانل به عنوان مهندس سیستم سقف عمل می‌کند، نه فروشنده ورق. انتخاب سیستم بر اساس شرایط پروژه انجام می‌شود، نه موجودی انبار.',
    points: [
      {title: 'انتخاب سیستم بر اساس پروژه', description: 'نوع پروفیل، روش اتصال، شیب و جزئیات زهکشی بر اساس اقلیم، هندسه سقف و الزامات پروژه بررسی می‌شود.'},
      {title: 'پشتیبانی برنامه‌ریزی تأمین', description: 'حجم ورق، کلیپ، فلاشینگ و متعلقات با شاپ‌دراوینگ هماهنگ می‌شود تا کمبود و تأخیر سایت کاهش یابد.'},
      {title: 'هماهنگی ریسک نصب', description: 'ترتیب نصب، جزئیات آب‌بندی و چک‌پوینت‌های کیفیت پیش از شروع کار سایت بررسی و تعریف می‌شود.'}
    ],
    comparison: {
      traditional: {
        label: 'نصب سنتی سقف',
        items: ['انتخاب متریال بدون بررسی زهکشی', 'تصمیم فلاشینگ در سایت', 'نفوذها به صورت واکنشی مدیریت می‌شود', 'متعلقات با تأخیر یا ناقص', 'کیفیت وابسته به عادت نصاب']
      },
      sipanel: {
        label: 'رویکرد مهندسی SIPANEL',
        items: ['هندسه و زهکشی سقف از ابتدا بررسی می‌شود', 'فلاشینگ پیش از نصب هماهنگ می‌شود', 'نفوذها به عنوان بخشی از سیستم دیتیل می‌شود', 'متعلقات پیش از تأمین برنامه‌ریزی می‌شود', 'اجرا با چک‌پوینت و کنترل فنی']
      }
    }
  },
  systemApplications: {
    title: 'کاربردهای سیستم سقف استندینگ سیم',
    applications: [
      'کارخانه‌های صنعتی',
      'انبارهای دهانه بزرگ',
      'سالن‌های تولید',
      'مراکز لجستیک',
      'سردخانه‌ها',
      'پروژه‌های سقف ضدآب صنعتی'
    ]
  },
  technicalProof: {
    title: 'شواهد فنی پیش از نصب',
    assets: [
      {title: 'شاپ‌دراوینگ سقف', description: 'چیدمان ورق، مسیر درز و جزئیات اتصال پیش از تأمین', alt: 'نمونه شاپ‌دراوینگ سقف استندینگ سیم'},
      {title: 'جزئیات آب‌بندی', description: 'دیتیل فلاشینگ، ناودان و آب‌بندی درز سقف', alt: 'جزئیات فلاشینگ و آب‌بندی سقف'},
      {title: 'فهرست متریال (BOM)', description: 'فهرست ورق، کلیپ، فلاشینگ و متعلقات هماهنگ با شاپ‌دراوینگ', alt: 'نمونه فهرست متریال سقف'}
    ]
  },
  qualityCheckpoints: {
    title: 'چک‌پوینت‌های کیفیت سقف',
    checkpoints: [
      'بررسی شیب، مسیر زهکشی و هماهنگی ناودان',
      'تراز درز و موقعیت کلیپ',
      'بازبینی فلاشینگ و دیتیل لبه',
      'بررسی آب‌بندی نقاط نفوذ',
      'تأیید منطق اتصال و بررسی انبساط حرارتی',
      'بازرسی نهایی پس از نصب'
    ]
  },
  relatedCaseStudies: {
    title: 'پروژه‌های مرتبط سقف',
    intro: 'نتایج از پروژه‌های واقعی اجراشده با هماهنگی مهندسی SIPANEL.'
  },
  faq: {
    title: 'سوالات متداول سقف استندینگ سیم',
    items: [
      {
        question: 'چرا سقف استندینگ سیم برای پروژه‌های صنعتی مناسب است؟',
        answer: 'سقف استندینگ سیم با اتصال مخفی، کنترل تمیز درز و رفتار بهتر آب‌بندی — زمانی که هندسه سقف، زهکشی، فلاشینگ و ترتیب نصب به درستی مهندسی شود — عملکرد مطلوب دارد.'
      },
      {
        question: 'بیشتر نشتی‌های سقف صنعتی از کجا شروع می‌شود؟',
        answer: 'نشتی معمولاً از طراحی ضعیف زهکشی، هماهنگی ناقص فلاشینگ، نفوذهای کنترل‌نشده، مشکلات اتصال رو یا خطاهای ترتیب نصب شروع می‌شود.'
      },
      {
        question: 'آیا سی‌پانل زهکشی را قبل از نصب بررسی می‌کند؟',
        answer: 'بله. شیب، مسیرهای زهکشی، ناودان‌ها، لوله‌های آبرو، لبه‌های سقف و شرایط نقاط نفوذ پیش از برنامه‌ریزی نصب بررسی می‌شود.'
      },
      {
        question: 'تفاوت بین تأمین صرف سقف و سقف مهندسی‌شده چیست؟',
        answer: 'تأمین صرف روی تحویل متریال تمرکز دارد. سقف مهندسی‌شده کل سیستم آب‌بندی را هماهنگ می‌کند — شامل جزئیات، تأمین، ترتیب نصب و چک‌پوینت‌های کیفیت.'
      },
      {
        question: 'آیا سی‌پانل شاپ‌دراوینگ سقف تهیه می‌کند؟',
        answer: 'بله. چیدمان ورق، مسیر درز، موقعیت کلیپ، فلاشینگ و ترتیب نصب در شاپ‌دراوینگ پیش از تأمین مستند می‌شود.'
      },
      {
        question: 'سی‌پانل فقط تأمین‌کننده است یا نصب هم انجام می‌دهد؟',
        answer: 'سی‌پانل اجرای مهندسی‌شده ارائه می‌دهد — از بررسی هندسه سقف و شاپ‌دراوینگ تا هماهنگی تأمین و نصب کنترل‌شده با چک‌پوینت‌های کیفیت.'
      },
      {
        question: 'حرکت حرارتی در سقف‌های دهانه بزرگ چگونه مدیریت می‌شود؟',
        answer: 'کلیپ‌های لغزنده، فاصله درز و جزئیات آگاه از حرکت در شاپ‌دراوینگ تعریف می‌شود تا تنش حرارتی در سطوح بزرگ سقف کنترل شود.'
      },
      {
        question: 'آب‌بندی محل اتصال سقف به دیوار چگونه کنترل می‌شود؟',
        answer: 'جزئیات فلاشینگ، منطق هم‌پوشانی و آب‌بندی نقاط تغییر صفحه پیش از نصب بررسی می‌شود تا ریسک نشتی در محل‌های انتقال کاهش یابد.'
      }
    ]
  },
  conversionCta: {
    headline: 'قبل از شروع نصب، ریسک نشتی سقف را بررسی کنید',
    text: 'درخواست بررسی فنی سقف برای زهکشی، فلاشینگ، نقاط نفوذ و برنامه‌ریزی نصب کنترل‌شده.',
    button: 'درخواست بررسی مهندسی سقف',
    secondaryButton: 'مشاهده پروژه‌های سقف'
  },
  breadcrumbs: [
    {label: 'خانه', href: '/fa'},
    {label: 'پوشانه‌ها', href: '/fa/systems'},
    {label: 'سقف استندینگ سیم', href: '/fa/systems/standing-seam-zip-tech-roofing'}
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
    primaryKeyword: 'standing seam roofing',
    title: 'Standing Seam & ZIP Tech Roofing | SIPANEL Industrial Waterproof Roofing',
    metaDescription: 'SIPANEL designs and executes Standing Seam and ZIP Tech roofing systems with drainage logic, flashing coordination, concealed fastening, and controlled installation for industrial projects.'
  },
  hero: {
    eyebrow: 'Industrial Waterproof Roofing',
    h1: 'Standing Seam Roofing Built Around Waterproofing Logic',
    subheadline: 'SIPANEL coordinates roof slope, drainage paths, seams, flashings, gutters, penetrations, and concealed fastening details to reduce leakage risk before installation begins.',
    primaryCta: 'Request Roof Engineering Review',
    secondaryCta: 'View Roofing Projects',
    visualAlt: 'Standing seam roofing system with engineered waterproofing detail',
    trustMicrocopy: 'Technical review for industrial roof drainage, flashing details, and controlled installation.'
  },
  problemContext: {
    title: 'Roof Leakage Is Usually a Coordination Problem',
    cards: [
      'Weak drainage planning: poor slope, gutter, or downspout coordination creates standing water and long-term leakage risk',
      'Incorrect flashing details: edges, ridges, valleys, and wall connections need precise details before execution',
      'Uncontrolled penetrations: skylights, vents, ducts, and service openings create risk when not detailed correctly',
      'Exposed fastener risk: incorrect fastening strategy increases the chance of water ingress and maintenance problems',
      'Thermal movement and installation sequence: large roof surfaces need movement-aware detailing and a controlled installation sequence — without this coordination, even good materials fail'
    ]
  },
  engineeringApproach: {
    title: 'How SIPANEL Engineers Roofing Risk Before Execution',
    steps: [
      {
        title: 'Shop Drawing Coordination',
        description: 'Sheet layout, seam paths, flashing details, clip positions, and installation sequence are documented before procurement.'
      },
      {
        title: 'BOM & Material Planning',
        description: 'Sheets, clips, fasteners, gutters, trims, flashings, and drainage accessories are planned to reduce waste and site delays.'
      },
      {
        title: 'Installation Planning',
        description: 'Installation sequence, waterproofing logic, penetration details, and inspection checkpoints are defined before site work begins.'
      },
      {
        title: 'Quality Control',
        description: 'Slope, seam alignment, flashing positions, penetration sealing, and fastening logic are inspected at defined checkpoints.'
      }
    ]
  },
  independentRecommendations: {
    title: 'Independent Roofing System Recommendations',
    intro: 'SIPANEL operates as a roofing system engineer, not a sheet metal reseller. System selection is based on project conditions, not warehouse inventory.',
    points: [
      {title: 'Project-First System Selection', description: 'Profile type, fastening method, slope, and drainage details are reviewed based on climate, roof geometry, and project requirements.'},
      {title: 'Procurement Planning Support', description: 'Sheet quantities, clips, flashings, and accessories are coordinated with shop drawings to reduce shortages and site delays.'},
      {title: 'Installation Risk Coordination', description: 'Installation sequence, waterproofing details, and quality checkpoints are reviewed and defined before site work begins.'}
    ],
    comparison: {
      traditional: {
        label: 'Typical Roofing Installation',
        items: ['Material selected before drainage review', 'Flashing decisions made on site', 'Penetrations handled reactively', 'Accessories missing or delayed', 'Quality depends on installer habit']
      },
      sipanel: {
        label: 'SIPANEL Engineering Approach',
        items: ['Roof geometry and drainage reviewed early', 'Flashing logic coordinated before installation', 'Penetrations detailed as part of the system', 'Accessories planned before procurement', 'Execution follows checkpoints and technical control']
      }
    }
  },
  systemApplications: {
    title: 'Where Standing Seam Roofing Fits',
    applications: [
      'Industrial factories',
      'Large-span warehouses',
      'Production halls',
      'Logistics centers',
      'Cold storage facilities',
      'Waterproof industrial roofing projects'
    ]
  },
  technicalProof: {
    title: 'Engineering Proof Before Installation',
    assets: [
      {title: 'Roof Shop Drawing', description: 'Sheet layout, seam paths, and connection details coordinated before procurement.', alt: 'Standing seam roof shop drawing example'},
      {title: 'Waterproofing Detail', description: 'Flashing, gutter, and roof joint sealing details reviewed before installation.', alt: 'Roof flashing and waterproofing detail'},
      {title: 'BOM / Material Takeoff', description: 'Sheet, clip, flashing, and accessory quantities coordinated with shop drawings.', alt: 'Roof material takeoff and BOM example'}
    ]
  },
  qualityCheckpoints: {
    title: 'Roofing Quality Checkpoints',
    checkpoints: [
      'Slope, drainage path, and gutter coordination',
      'Seam alignment and clip positioning',
      'Flashing and edge detail review',
      'Penetration waterproofing check',
      'Fastening logic and thermal expansion review',
      'Post-installation inspection'
    ]
  },
  relatedCaseStudies: {
    title: 'Related Roofing Projects',
    intro: 'Results from real projects executed with SIPANEL engineering coordination.'
  },
  faq: {
    title: 'Standing Seam Roofing Questions',
    items: [
      {
        question: 'Why is standing seam roofing suitable for industrial projects?',
        answer: 'Standing seam roofing supports concealed fastening, clean seam control, and better waterproofing behavior when roof geometry, drainage, flashings, and installation sequence are engineered correctly.'
      },
      {
        question: 'What causes most industrial roof leakage?',
        answer: 'Leakage often comes from weak drainage planning, poor flashing coordination, uncontrolled penetrations, exposed fastener issues, or installation sequence errors.'
      },
      {
        question: 'Does SIPANEL review drainage before installation?',
        answer: 'Yes. SIPANEL reviews slope, drainage paths, gutters, downspouts, roof edges, and penetration conditions before installation planning.'
      },
      {
        question: 'What is the difference between supply-only roofing and engineering-controlled roofing?',
        answer: 'Supply-only focuses on material delivery. Engineering-controlled roofing coordinates the complete waterproofing system — including details, procurement, installation sequence, and quality checkpoints.'
      },
      {
        question: 'Does SIPANEL provide roof shop drawings?',
        answer: 'Yes. Sheet layout, seam paths, clip positions, flashings, and installation sequence are documented in shop drawings before procurement.'
      },
      {
        question: 'Is SIPANEL a supplier only or does it also handle installation?',
        answer: 'SIPANEL provides engineering-controlled execution — from roof geometry review and shop drawings to procurement coordination and controlled installation with quality checkpoints.'
      },
      {
        question: 'How is thermal movement managed in long-span roofing?',
        answer: 'Sliding clips, seam spacing, and movement-aware detailing are defined in shop drawings to control thermal stress across large roof surfaces.'
      },
      {
        question: 'How are waterproofing transitions at roof-wall connections controlled?',
        answer: 'Flashing details, overlap logic, and sealing at plane-change points are reviewed before installation to reduce leakage risk at transition zones.'
      }
    ]
  },
  conversionCta: {
    headline: 'Review the Leakage Risk Before Roofing Starts',
    text: 'Request a technical roofing review for drainage, flashing, penetrations, and controlled installation planning.',
    button: 'Request Roof Engineering Review',
    secondaryButton: 'View Roofing Projects'
  },
  breadcrumbs: [
    {label: 'Home', href: '/en'},
    {label: 'Systems', href: '/en/systems'},
    {label: 'Standing Seam Roofing', href: '/en/systems/standing-seam-zip-tech-roofing'}
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
    primaryKeyword: 'تسقيف ستاندينغ سيم',
    title: 'تسقيف ستاندينغ سيم و ZIP Tech | أنظمة التسقيف الصناعي المقاوم للماء SIPANEL',
    metaDescription: 'تصمم SIPANEL وتنفذ أنظمة تسقيف ستاندينغ سيم و ZIP Tech مع منطق الصرف وتنسيق الفلاشينغ والتثبيت المخفي والتركيب المنضبط للمشاريع الصناعية.'
  },
  hero: {
    eyebrow: 'تسقيف صناعي مقاوم للماء',
    h1: 'تسقيف ستاندينغ سيم مبني على منطق العزل المائي',
    subheadline: 'تنسق SIPANEL ميل السقف ومسارات الصرف والدرزات والفلاشينغ والمزاريب والاختراقات وتفاصيل التثبيت المخفي لتقليل مخاطر التسرب قبل بدء التركيب.',
    primaryCta: 'طلب مراجعة هندسية للسقف',
    secondaryCta: 'عرض مشاريع التسقيف',
    visualAlt: 'نظام تسقيف ستاندينغ سيم مع تفاصيل هندسية للعزل المائي',
    trustMicrocopy: 'مراجعة فنية لصرف السقف الصناعي وتفاصيل الفلاشينغ والتركيب المنضبط.'
  },
  problemContext: {
    title: 'تسرب السقف عادةً مشكلة تنسيق',
    cards: [
      'تخطيط صرف ضعيف: ضعف تنسيق الميل والمزاريب وأنابيب الصرف يؤدي إلى تجمع المياه ومخاطر تسرب طويلة الأمد',
      'تفاصيل فلاشينغ غير صحيحة: الحواف والقمم والوديان واتصالات الجدران تحتاج تفاصيل دقيقة قبل التنفيذ',
      'اختراقات غير منضبطة: المناور والفتحات والقنوات تخلق مخاطر عند عدم تفصيلها بشكل صحيح',
      'مخاطر التثبيت المكشوف: استراتيجية تثبيت غير صحيحة تزيد احتمال تسرب المياه ومشاكل الصيانة',
      'التمدد الحراري وتسلسل التركيب: أسطح السقف الكبيرة تحتاج تفصيلاً واعياً للحركة وتسلسل تركيب منضبط — بدون هذا التنسيق حتى المواد الجيدة تفشل'
    ]
  },
  engineeringApproach: {
    title: 'كيف تهندس SIPANEL مخاطر التسقيف قبل التنفيذ',
    steps: [
      {
        title: 'تنسيق رسومات الشوب',
        description: 'يتم توثيق تخطيط الألواح ومسارات الدرزات وتفاصيل الفلاشينغ ومواقع المشابك وتسلسل التركيب قبل التوريد.'
      },
      {
        title: 'تخطيط BOM والمواد',
        description: 'يتم تخطيط الألواح والمشابك والمثبتات والمزاريب والتشطيبات والفلاشينغ وملحقات الصرف لتقليل الهدر والتأخير.'
      },
      {
        title: 'تخطيط التركيب',
        description: 'يتم تحديد تسلسل التركيب ومنطق العزل المائي وتفاصيل الاختراقات ونقاط الفحص قبل بدء العمل في الموقع.'
      },
      {
        title: 'ضبط الجودة',
        description: 'يتم فحص الميل ومحاذاة الدرزات ومواقع الفلاشينغ وعزل الاختراقات ومنطق التثبيت عند نقاط فحص محددة.'
      }
    ]
  },
  independentRecommendations: {
    title: 'توصيات مستقلة لنظام التسقيف',
    intro: 'تعمل SIPANEL كمهندس نظام تسقيف وليس بائع ألواح معدنية. اختيار النظام يعتمد على ظروف المشروع وليس مخزون المستودع.',
    points: [
      {title: 'اختيار النظام حسب المشروع', description: 'يتم مراجعة نوع البروفيل وطريقة التثبيت والميل وتفاصيل الصرف بناءً على المناخ وهندسة السقف ومتطلبات المشروع.'},
      {title: 'دعم تخطيط التوريد', description: 'يتم تنسيق كميات الألواح والمشابك والفلاشينغ والملحقات مع رسومات الشوب لتقليل النقص والتأخير.'},
      {title: 'تنسيق مخاطر التركيب', description: 'يتم مراجعة وتحديد تسلسل التركيب وتفاصيل العزل المائي ونقاط الجودة قبل بدء العمل في الموقع.'}
    ],
    comparison: {
      traditional: {
        label: 'التركيب التقليدي للتسقيف',
        items: ['اختيار المواد قبل مراجعة الصرف', 'قرارات الفلاشينغ في الموقع', 'الاختراقات تُعالج بشكل تفاعلي', 'الملحقات ناقصة أو متأخرة', 'الجودة تعتمد على عادة المركّب']
      },
      sipanel: {
        label: 'نهج SIPANEL الهندسي',
        items: ['مراجعة هندسة السقف والصرف مبكراً', 'تنسيق الفلاشينغ قبل التركيب', 'الاختراقات مفصّلة كجزء من النظام', 'الملحقات مخططة قبل التوريد', 'التنفيذ يتبع نقاط فحص وضبط فني']
      }
    }
  },
  systemApplications: {
    title: 'تطبيقات نظام تسقيف ستاندينغ سيم',
    applications: [
      'المصانع الصناعية',
      'المستودعات ذات الفتحات الكبيرة',
      'صالات الإنتاج',
      'مراكز اللوجستيات',
      'مرافق التخزين البارد',
      'مشاريع التسقيف الصناعي المقاوم للماء'
    ]
  },
  technicalProof: {
    title: 'إثبات هندسي قبل التركيب',
    assets: [
      {title: 'رسم شوب للسقف', description: 'تخطيط الألواح ومسارات الدرزات وتفاصيل الاتصال المنسقة قبل التوريد', alt: 'نموذج رسم شوب لسقف ستاندينغ سيم'},
      {title: 'تفاصيل العزل المائي', description: 'تفاصيل الفلاشينغ والمزاريب وعزل درزات السقف', alt: 'تفاصيل فلاشينغ وعزل مائي للسقف'},
      {title: 'قائمة المواد (BOM)', description: 'كميات الألواح والمشابك والفلاشينغ والملحقات المنسقة مع رسومات الشوب', alt: 'نموذج قائمة مواد السقف'}
    ]
  },
  qualityCheckpoints: {
    title: 'نقاط فحص جودة التسقيف',
    checkpoints: [
      'التحقق من الميل ومسار الصرف وتنسيق المزاريب',
      'محاذاة الدرزات وتموضع المشابك',
      'مراجعة الفلاشينغ وتفاصيل الحواف',
      'فحص عزل الاختراقات',
      'التحقق من منطق التثبيت ومراجعة التمدد الحراري',
      'الفحص النهائي بعد التركيب'
    ]
  },
  relatedCaseStudies: {
    title: 'مشاريع تسقيف ذات صلة',
    intro: 'نتائج من مشاريع حقيقية نُفذت بتنسيق هندسي من SIPANEL.'
  },
  faq: {
    title: 'أسئلة شائعة حول تسقيف ستاندينغ سيم',
    items: [
      {
        question: 'لماذا يناسب تسقيف ستاندينغ سيم المشاريع الصناعية؟',
        answer: 'يدعم تسقيف ستاندينغ سيم التثبيت المخفي والتحكم النظيف في الدرزات وسلوك عزل مائي أفضل عندما تتم هندسة هندسة السقف والصرف والفلاشينغ وتسلسل التركيب بشكل صحيح.'
      },
      {
        question: 'ما الذي يسبب معظم تسربات السقف الصناعي؟',
        answer: 'غالباً ما يأتي التسرب من تخطيط صرف ضعيف أو تنسيق فلاشينغ سيء أو اختراقات غير منضبطة أو مشاكل تثبيت مكشوف أو أخطاء في تسلسل التركيب.'
      },
      {
        question: 'هل تراجع SIPANEL الصرف قبل التركيب؟',
        answer: 'نعم. تراجع SIPANEL الميل ومسارات الصرف والمزاريب وأنابيب الصرف وحواف السقف وظروف الاختراقات قبل تخطيط التركيب.'
      },
      {
        question: 'ما الفرق بين توريد التسقيف فقط والتسقيف المنضبط هندسياً؟',
        answer: 'التوريد فقط يركز على تسليم المواد. التسقيف المنضبط هندسياً ينسق نظام العزل المائي الكامل — بما في ذلك التفاصيل والتوريد وتسلسل التركيب ونقاط فحص الجودة.'
      },
      {
        question: 'هل توفر SIPANEL رسومات شوب للسقف؟',
        answer: 'نعم. يتم توثيق تخطيط الألواح ومسارات الدرزات ومواقع المشابك والفلاشينغ وتسلسل التركيب في رسومات الشوب قبل التوريد.'
      },
      {
        question: 'هل SIPANEL مورد فقط أم تتولى التركيب أيضاً؟',
        answer: 'توفر SIPANEL تنفيذاً منضبطاً هندسياً — من مراجعة هندسة السقف ورسومات الشوب إلى تنسيق التوريد والتركيب المنضبط مع نقاط فحص الجودة.'
      },
      {
        question: 'كيف تتم إدارة الحركة الحرارية في الأسقف ذات الفتحات الكبيرة؟',
        answer: 'يتم تحديد المشابك المنزلقة وتباعد الدرزات والتفصيل الواعي للحركة في رسومات الشوب للتحكم في الإجهاد الحراري عبر أسطح السقف الكبيرة.'
      },
      {
        question: 'كيف يتم التحكم في انتقالات العزل المائي عند اتصالات السقف بالجدار؟',
        answer: 'تتم مراجعة تفاصيل الفلاشينغ ومنطق التراكب والعزل عند نقاط تغيير المستوى قبل التركيب لتقليل مخاطر التسرب في مناطق الانتقال.'
      }
    ]
  },
  conversionCta: {
    headline: 'راجع مخاطر التسرب قبل بدء التسقيف',
    text: 'اطلب مراجعة فنية للسقف تشمل الصرف والفلاشينغ والاختراقات وتخطيط التركيب المنضبط.',
    button: 'طلب مراجعة هندسية للسقف',
    secondaryButton: 'عرض مشاريع التسقيف'
  },
  breadcrumbs: [
    {label: 'الرئيسية', href: '/ar'},
    {label: 'الأنظمة', href: '/ar/systems'},
    {label: 'تسقيف ستاندينغ سيم', href: '/ar/systems/standing-seam-zip-tech-roofing'}
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
    primaryKeyword: 'фальцевая кровля',
    title: 'Фальцевая кровля и ZIP Tech | Промышленная водонепроницаемая кровля SIPANEL',
    metaDescription: 'SIPANEL проектирует и монтирует фальцевые кровельные системы и ZIP Tech с логикой водоотведения, координацией примыканий, скрытым креплением и контролируемым монтажом для промышленных объектов.'
  },
  hero: {
    eyebrow: 'Промышленная водонепроницаемая кровля',
    h1: 'Фальцевая кровля, построенная на логике гидроизоляции',
    subheadline: 'SIPANEL координирует уклон кровли, пути водоотведения, фальцы, примыкания, водостоки, проходки и детали скрытого крепления для снижения риска протечек до начала монтажа.',
    primaryCta: 'Запросить инженерную экспертизу кровли',
    secondaryCta: 'Посмотреть кровельные проекты',
    visualAlt: 'Фальцевая кровельная система с инженерной гидроизоляцией',
    trustMicrocopy: 'Техническая экспертиза водоотведения промышленной кровли, деталей примыканий и контролируемого монтажа.'
  },
  problemContext: {
    title: 'Протечка кровли — обычно проблема координации',
    cards: [
      'Слабое планирование водоотведения: плохая координация уклона, желобов или водостоков создаёт застой воды и долгосрочный риск протечек',
      'Неправильные детали примыканий: края, коньки, ендовы и примыкания к стенам требуют точных деталей до начала работ',
      'Неконтролируемые проходки: световые люки, вентиляция, воздуховоды и технические отверстия создают риск без правильной детализации',
      'Риск открытого крепления: неправильная стратегия крепления увеличивает вероятность проникновения воды и проблем с обслуживанием',
      'Тепловое расширение и последовательность монтажа: большие кровельные поверхности требуют детализации с учётом движения и контролируемой последовательности монтажа — без этой координации даже хорошие материалы подводят'
    ]
  },
  engineeringApproach: {
    title: 'Как SIPANEL инженерно контролирует риски кровли до монтажа',
    steps: [
      {
        title: 'Координация монтажных чертежей',
        description: 'Раскладка листов, пути фальцев, детали примыканий, позиции кляммеров и последовательность монтажа документируются до закупки.'
      },
      {
        title: 'Планирование BOM и материалов',
        description: 'Листы, кляммеры, крепёж, водостоки, отделка, примыкания и аксессуары водоотведения планируются для снижения отходов и задержек.'
      },
      {
        title: 'Планирование монтажа',
        description: 'Последовательность монтажа, логика гидроизоляции, детали проходок и контрольные точки инспекции определяются до начала работ на объекте.'
      },
      {
        title: 'Контроль качества',
        description: 'Уклон, выравнивание фальцев, позиции примыканий, герметизация проходок и логика крепления проверяются в определённых контрольных точках.'
      }
    ]
  },
  independentRecommendations: {
    title: 'Независимые рекомендации по кровельной системе',
    intro: 'SIPANEL работает как инженер кровельной системы, а не перепродавец листового металла. Выбор системы основан на условиях проекта, а не на складских запасах.',
    points: [
      {title: 'Выбор системы под проект', description: 'Тип профиля, метод крепления, уклон и детали водоотведения рассматриваются на основе климата, геометрии кровли и требований проекта.'},
      {title: 'Поддержка планирования закупок', description: 'Количество листов, кляммеров, примыканий и аксессуаров координируется с монтажными чертежами для снижения дефицита и задержек.'},
      {title: 'Координация рисков монтажа', description: 'Последовательность монтажа, детали гидроизоляции и контрольные точки качества определяются до начала работ на объекте.'}
    ],
    comparison: {
      traditional: {
        label: 'Типичный монтаж кровли',
        items: ['Материал выбирается до проверки водоотведения', 'Решения по примыканиям принимаются на объекте', 'Проходки обрабатываются реактивно', 'Аксессуары отсутствуют или задерживаются', 'Качество зависит от привычек монтажника']
      },
      sipanel: {
        label: 'Инженерный подход SIPANEL',
        items: ['Геометрия кровли и водоотведение проверяются заранее', 'Логика примыканий координируется до монтажа', 'Проходки детализируются как часть системы', 'Аксессуары планируются до закупки', 'Монтаж следует контрольным точкам и техническому контролю']
      }
    }
  },
  systemApplications: {
    title: 'Применение фальцевой кровли',
    applications: [
      'Промышленные заводы',
      'Склады большого пролёта',
      'Производственные цеха',
      'Логистические центры',
      'Холодильные хранилища',
      'Промышленные водонепроницаемые кровельные проекты'
    ]
  },
  technicalProof: {
    title: 'Инженерное подтверждение до монтажа',
    assets: [
      {title: 'Монтажный чертёж кровли', description: 'Раскладка листов, пути фальцев и детали соединений, координированные до закупки', alt: 'Пример монтажного чертежа фальцевой кровли'},
      {title: 'Детали гидроизоляции', description: 'Детали примыканий, водостоков и герметизации стыков кровли', alt: 'Детали примыканий и гидроизоляции кровли'},
      {title: 'Ведомость материалов (BOM)', description: 'Количество листов, кляммеров, примыканий и аксессуаров, координированных с монтажными чертежами', alt: 'Пример ведомости кровельных материалов'}
    ]
  },
  qualityCheckpoints: {
    title: 'Контрольные точки качества кровли',
    checkpoints: [
      'Проверка уклона, пути водоотведения и координация желобов',
      'Выравнивание фальцев и позиционирование кляммеров',
      'Проверка примыканий и деталей краёв',
      'Проверка гидроизоляции проходок',
      'Верификация логики крепления и проверка теплового расширения',
      'Инспекция после монтажа'
    ]
  },
  relatedCaseStudies: {
    title: 'Связанные кровельные проекты',
    intro: 'Результаты реальных проектов, выполненных с инженерной координацией SIPANEL.'
  },
  faq: {
    title: 'Вопросы о фальцевой кровле',
    items: [
      {
        question: 'Почему фальцевая кровля подходит для промышленных проектов?',
        answer: 'Фальцевая кровля поддерживает скрытое крепление, чистый контроль фальцев и лучшее поведение гидроизоляции, когда геометрия кровли, водоотведение, примыкания и последовательность монтажа правильно спроектированы.'
      },
      {
        question: 'Что вызывает большинство протечек промышленной кровли?',
        answer: 'Протечки часто возникают из-за слабого планирования водоотведения, плохой координации примыканий, неконтролируемых проходок, проблем с открытым креплением или ошибок последовательности монтажа.'
      },
      {
        question: 'Проверяет ли SIPANEL водоотведение до монтажа?',
        answer: 'Да. SIPANEL проверяет уклон, пути водоотведения, желоба, водостоки, края кровли и условия проходок до планирования монтажа.'
      },
      {
        question: 'В чём разница между простой поставкой кровли и инженерно-контролируемой кровлей?',
        answer: 'Простая поставка фокусируется на доставке материалов. Инженерно-контролируемая кровля координирует полную систему гидроизоляции — включая детали, закупки, последовательность монтажа и контрольные точки качества.'
      },
      {
        question: 'Предоставляет ли SIPANEL монтажные чертежи кровли?',
        answer: 'Да. Раскладка листов, пути фальцев, позиции кляммеров, примыкания и последовательность монтажа документируются в монтажных чертежах до закупки.'
      },
      {
        question: 'SIPANEL — только поставщик или также выполняет монтаж?',
        answer: 'SIPANEL обеспечивает инженерно-контролируемое исполнение — от проверки геометрии кровли и монтажных чертежей до координации закупок и контролируемого монтажа с контрольными точками качества.'
      },
      {
        question: 'Как управляется тепловое расширение на кровлях большого пролёта?',
        answer: 'Скользящие кляммеры, шаг фальцев и детализация с учётом движения определяются в монтажных чертежах для контроля термических напряжений на больших кровельных поверхностях.'
      },
      {
        question: 'Как контролируются гидроизоляционные переходы в местах примыкания кровли к стенам?',
        answer: 'Детали примыканий, логика перекрытия и герметизация в точках смены плоскости проверяются до монтажа для снижения риска протечек в зонах переходов.'
      }
    ]
  },
  conversionCta: {
    headline: 'Проверьте риск протечек до начала кровельных работ',
    text: 'Запросите техническую экспертизу кровли по водоотведению, примыканиям, проходкам и планированию контролируемого монтажа.',
    button: 'Запросить инженерную экспертизу кровли',
    secondaryButton: 'Посмотреть кровельные проекты'
  },
  breadcrumbs: [
    {label: 'Главная', href: '/ru'},
    {label: 'Системы', href: '/ru/systems'},
    {label: 'Фальцевая кровля', href: '/ru/systems/standing-seam-zip-tech-roofing'}
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
      projectName: isFa ? 'سالن انتظار فرودگاه اهواز'
        : isAr ? 'صالة المسافرين في مطار الأهواز'
        : isRu ? 'Пассажирский терминал аэропорта Ахваз'
        : 'Ahvaz Airport Passenger Terminal',
      location: isFa ? 'اهواز، ایران' : isAr ? 'الأهواز، إيران' : isRu ? 'Ахваз, Иран' : 'Ahvaz, Iran',
      areaM2: '4,000 m²',
      projectType: isFa ? 'سالن انتظار فرودگاه' : isAr ? 'صالة مسافرين' : isRu ? 'Пассажирский терминал аэропорта' : 'Airport Passenger Terminal',
      challenge: isFa
        ? 'نمای خمیده معماری فرودگاه نیازمند خم‌کاری عمود پنل ZIP-TECH، کنترل هندسی فرم منحنی و هماهنگی دقیق بین زیرسازه، پنل آلومینیومی و سیستم سقف بود.'
        : isAr
        ? 'تطلبت الواجهة المعمارية المنحنية للمطار ثني عمودي لألواح ZIP-TECH وتحكماً هندسياً في الشكل المنحني وتنسيقاً دقيقاً بين البنية التحتية والألواح.'
        : isRu
        ? 'Изогнутый архитектурный фасад аэропорта потребовал перпендикулярного гиба панелей ZIP-TECH, геометрического контроля криволинейной формы и точной координации между подконструкцией и панелями.'
        : 'Curved front architectural feature required perpendicular ZIP-TECH panel bending, geometric control of the curved form, and precise coordination between substructure and panels.',
      measuredResult: isFa
        ? 'اجرای موفق ۴,۰۰۰ مترمربع ZIP-TECH و نمای آلومینیومی با حفظ فرم معماری منحنی و کیفیت نهایی.'
        : isAr
        ? 'تنفيذ ناجح لـ 4,000 م² من ZIP-TECH والكسوة الألومنيومية مع الحفاظ على الشكل المعماري المنحني والجودة النهائية.'
        : isRu
        ? 'Успешное выполнение 4 000 м² ZIP-TECH и алюминиевой облицовки с сохранением криволинейной архитектурной формы и финального качества.'
        : 'Successful execution of 4,000 m² ZIP-TECH and aluminium cladding while preserving the curved architectural form and final visual quality.',
      href: `/${locale}/projects/ahvaz-airport-passenger-terminal`,
      image: ahvazAirportCard
    },
    {
      projectName: 'Megapars Mall Atrium',
      location: isFa ? 'ایران' : isAr ? 'إيران' : isRu ? 'Иран' : 'Iran',
      areaM2: '4,500 m²',
      projectType: isFa ? 'سقف آتریوم تجاری' : isAr ? 'تسقيف أتريوم تجاري' : isRu ? 'Кровля коммерческого атриума' : 'Atrium roofing structure',
      challenge: isFa
        ? 'سقف آتریوم تجاری دهانه بزرگ نیازمند هماهنگی پنل ZIP منحنی، تداوم آب‌بندی، کنترل انبساط حرارتی و یکپارچگی معماری بود.'
        : isAr
        ? 'تطلب سقف الأتريوم التجاري الكبير تنسيق ألواح ZIP المنحنية واستمرارية العزل المائي والتحكم في التمدد الحراري والتكامل المعماري.'
        : isRu
        ? 'Кровля большепролётного коммерческого атриума потребовала координации криволинейных ZIP-панелей, непрерывности гидроизоляции, контроля теплового расширения и архитектурной интеграции.'
        : 'Large-span commercial atrium roof required curved ZIP panel coordination, waterproofing integrity, thermal movement control, and architectural integration.',
      measuredResult: isFa
        ? 'سقف آتریوم با آب‌بندی قابل‌اتکا، اجرای دقیق استندینگ سیم و کنترل کیفیت نصب دهانه بزرگ تحویل شد.'
        : isAr
        ? 'تم تسليم سقف الأتريوم مع عزل مائي موثوق وتنفيذ دقيق لنظام ستاندينغ سيم وضبط جودة التركيب على المدى الكبير.'
        : isRu
        ? 'Кровля атриума сдана с надёжной гидроизоляцией, точным монтажом фальцевой системы и контролем качества на большом пролёте.'
        : 'Atrium roof delivered with reliable waterproofing, precise standing seam execution, and controlled long-span installation quality.',
      href: `/${locale}/projects/megaparsmall-atrium`,
      image: megaparsCard
    },
    {
      projectName: 'Shahr Babak Wrestling Hall',
      location: isFa ? 'شهر بابک، کرمان، ایران' : isAr ? 'شهر بابك، كرمان، إيران' : isRu ? 'Шахр Бабак, Керман, Иран' : 'Shahr Babak, Kerman, Iran',
      areaM2: '900 m²',
      projectType: isFa ? 'مجموعه ورزشی چند گنبدی' : isAr ? 'مجمع رياضي متعدد القباب' : isRu ? 'Многокупольный спортивный комплекс' : 'Multi-dome wrestling sports complex',
      challenge: isFa
        ? 'سالن‌های ورزشی گنبدی‌شکل نیازمند هماهنگی پنل ZIP منحنی، تراز سازه‌ای، تداوم آب‌بندی و تمامیت ظاهری سقف بودند.'
        : isAr
        ? 'تطلبت صالات المصارعة ذات القباب تنسيق ألواح ZIP المنحنية ومحاذاة هيكلية واستمرارية العزل المائي وتشطيب سقف متناسق.'
        : isRu
        ? 'Купольные спортивные залы потребовали координации криволинейных ZIP-панелей, конструктивного выравнивания, непрерывности гидроизоляции и визуальной однородности кровли.'
        : 'Multiple dome-shaped sports halls required curved ZIP panel coordination, structural alignment, waterproofing continuity, and visually consistent roof finishing.',
      measuredResult: isFa
        ? 'سه سالن کشتی گنبدی‌شکل با عملکرد قابل‌اتکای سقف ZIP و کیفیت کنترل‌شده نصب تحویل شد.'
        : isAr
        ? 'تم تسليم ثلاث صالات مصارعة ذات قباب مع أداء موثوق لسقف ZIP وجودة تركيب منضبطة.'
        : isRu
        ? 'Три купольных борцовских зала сданы с надёжной работой ZIP-кровли и контролируемым качеством монтажа.'
        : 'Three structurally coordinated dome-shaped wrestling halls delivered with reliable ZIP panel roof performance and controlled installation quality.',
      href: `/${locale}/projects/shahre-babak-hall`,
      image: shahrBabakHallCard
    }
  ];
}

// ── Locale map ──

const localeContent: Record<string, LocalizedContent> = {fa, en, ar, ru};

// ── Page builder ──

export function getStandingSeamZipTechRoofingPage(locale: Locale): ServicePageTemplateData {
  const content = localeContent[locale] ?? en;

  return {
    id: 'standing_seam_zip_tech_roofing',
    routes: standingSeamZipTechRoofingSpec.route,
    seo: content.seo,
    hero: {
      eyebrow: content.hero.eyebrow,
      h1: content.hero.h1,
      subheadline: content.hero.subheadline,
      primaryCta: content.hero.primaryCta,
      secondaryCta: content.hero.secondaryCta,
      visualDirection: content.hero.visualAlt,
      visual: standingSeamHero,
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
          image: clipInstallImg,
          alt: content.technicalProof.assets[0].alt
        },
        {
          title: content.technicalProof.assets[1].title,
          description: content.technicalProof.assets[1].description,
          image: seamDetailImg,
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
