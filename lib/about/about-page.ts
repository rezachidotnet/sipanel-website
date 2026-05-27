import type {Metadata} from 'next';
import type {StaticImageData} from 'next/image';
import aboutSipanelSpec from '@/specs/pages/about_sipanel.json';
import {locales, type Locale} from '@/i18n/routing';
import {productionContactInfo, type ProductionContactInfo} from '@/lib/contact/rfq-contact-page';
import {buildPageMetadata} from '@/lib/seo/metadata';
import {
  buildAboutPageSchema as buildSharedAboutPageSchema,
  buildBreadcrumbListSchema,
  buildOrganizationSchema as buildSharedOrganizationSchema
} from '@/lib/seo/schema';

import aboutStoryVisual from '@/assets/projects/andimeshk/photos/andimeshk-hero-desktop.webp';

type AboutRouteMap = Record<Locale, string>;

type AboutVisual = {
  image: StaticImageData;
  alt: string;
};

export type AboutPageData = {
  routes: AboutRouteMap;
  contact: ProductionContactInfo;
  localeContent: Record<Locale, AboutLocaleContent>;
};

export type AboutLocaleContent = {
  seo: {
    title: string;
    metaDescription: string;
    h1: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    trustMicrocopy: string;
    visualAlt: string;
  };
  companyStory: {
    title: string;
    lead: string;
    paragraphs?: string[];
    points: Array<{
      title: string;
      description: string;
    }>;
    heritageItems?: Array<{
      label: string;
      title: string;
      description: string;
    }>;
    visual: AboutVisual;
  };
  corePrinciples: {
    title: string;
    principles: Array<{
      title: string;
      description: string;
    }>;
  };
  systemsOverview: {
    title: string;
    systems: Array<{
      title: string;
      description: string;
      cta: string;
      href: string;
    }>;
  };
  workflowProcess: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  conversionCta: {
    headline: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    contactHint: string;
  };
  stickyMobileCta: {
    label: string;
    secondaryAction: string;
  };
};

const routeMap = aboutSipanelSpec.route as AboutRouteMap;

const aboutCopy: Record<Locale, Omit<AboutLocaleContent, 'companyStory' | 'corePrinciples' | 'systemsOverview' | 'workflowProcess'>> = {
  en: {
    seo: {
      title: 'About SIPANEL | Industrial Envelope Engineering & Controlled Execution',
      metaDescription:
        'Learn how SIPANEL helps industrial projects reduce execution risk through engineering review, smart procurement, waterproofing logic, and controlled installation systems.',
      h1: 'Engineering-Controlled Industrial Envelope Systems.'
    },
    hero: {
      eyebrow: 'About SIPANEL',
      h1: 'Engineering-Controlled Industrial Envelope Systems.',
      subheadline:
        'SIPANEL helps industrial projects reduce leakage risk, material waste, coordination errors, and execution uncertainty through engineering review, smart procurement, and controlled installation.',
      primaryCta: 'Request Technical Consultation',
      secondaryCta: 'Explore Systems',
      trustMicrocopy: 'Built around industrial execution control, not just material supply.',
      visualAlt: 'Industrial SIPANEL project collage'
    },
    conversionCta: {
      headline: 'Reduce Execution Risk Before Construction Begins.',
      text: 'Request a technical consultation for your industrial panel, roofing, or cladding project.',
      primaryCta: 'Request Technical Consultation',
      secondaryCta: 'Contact via WhatsApp',
      contactHint: 'Verified contact data only.'
    },
    stickyMobileCta: {
      label: 'Technical Consultation',
      secondaryAction: 'WhatsApp'
    }
  },
  fa: {
    seo: {
      title: 'درباره SIPANEL | مهندسی پوسته صنعتی و اجرای کنترل‌شده',
      metaDescription:
        'ببینید SIPANEL چگونه با بازبینی مهندسی، تامین هوشمند، منطق آب‌بندی و نصب کنترل‌شده، ریسک اجرای پروژه‌های صنعتی را کاهش می‌دهد.',
      h1: 'درباره SIPANEL'
    },
    hero: {
      eyebrow: 'درباره SIPANEL',
      h1: 'درباره SIPANEL',
      subheadline:
        'SIPANEL با بازبینی مهندسی، تامین هوشمند و نصب کنترل‌شده به پروژه‌های صنعتی کمک می‌کند تا ریسک نشتی، پرت مصالح، خطاهای هماهنگی و عدم‌قطعیت اجرا را کاهش دهند.',
      primaryCta: 'درخواست مشاوره فنی',
      secondaryCta: 'مشاهده سیستم‌ها',
      trustMicrocopy: 'بر پایه کنترل اجرای صنعتی، نه فقط تامین مصالح.',
      visualAlt: 'کلاژ پروژه صنعتی SIPANEL'
    },
    conversionCta: {
      headline: 'ریسک اجرا را پیش از شروع ساخت کاهش دهید.',
      text: 'برای پروژه پنل صنعتی، سقف یا کلادینگ خود مشاوره فنی درخواست کنید.',
      primaryCta: 'درخواست مشاوره فنی',
      secondaryCta: 'تماس از طریق واتساپ',
      contactHint: 'فقط اطلاعات تماس تاییدشده.'
    },
    stickyMobileCta: {
      label: 'مشاوره فنی',
      secondaryAction: 'واتساپ'
    }
  },
  ar: {
    seo: {
      title: 'حول SIPANEL | هندسة الغلاف الصناعي والتنفيذ الخاضع للتحكم',
      metaDescription:
        'تعرف على كيفية مساعدة SIPANEL للمشاريع الصناعية في تقليل مخاطر التنفيذ عبر المراجعة الهندسية، والمشتريات الذكية، ومنطق العزل المائي، والتركيب المنضبط.',
      h1: 'أنظمة الغلاف الصناعي الخاضعة للتحكم الهندسي.'
    },
    hero: {
      eyebrow: 'حول SIPANEL',
      h1: 'أنظمة الغلاف الصناعي الخاضعة للتحكم الهندسي.',
      subheadline:
        'تساعد SIPANEL المشاريع الصناعية على تقليل خطر التسرب، وهدر المواد، وأخطاء التنسيق، وعدم اليقين في التنفيذ عبر المراجعة الهندسية، والمشتريات الذكية، والتركيب المنضبط.',
      primaryCta: 'طلب استشارة فنية',
      secondaryCta: 'عرض الأنظمة',
      trustMicrocopy: 'مبنية على ضبط التنفيذ الصناعي، وليس مجرد توريد المواد.',
      visualAlt: 'كولاج مشروع صناعي من SIPANEL'
    },
    conversionCta: {
      headline: 'قلل مخاطر التنفيذ قبل بدء البناء.',
      text: 'اطلب استشارة فنية لمشروع الألواح أو الأسقف أو الكسوة الصناعية.',
      primaryCta: 'طلب استشارة فنية',
      secondaryCta: 'التواصل عبر واتساب',
      contactHint: 'بيانات التواصل الموثقة فقط.'
    },
    stickyMobileCta: {
      label: 'استشارة فنية',
      secondaryAction: 'واتساب'
    }
  },
  ru: {
    seo: {
      title: 'О SIPANEL | Инженерия промышленной оболочки и контролируемое выполнение',
      metaDescription:
        'Узнайте, как SIPANEL снижает риски промышленных проектов через инженерную проверку, умные закупки, логику гидроизоляции и контролируемый монтаж.',
      h1: 'Промышленные системы оболочки под инженерным контролем.'
    },
    hero: {
      eyebrow: 'О SIPANEL',
      h1: 'Промышленные системы оболочки под инженерным контролем.',
      subheadline:
        'SIPANEL помогает промышленным проектам снижать риск протечек, перерасхода материалов, ошибок координации и неопределённости исполнения через инженерную проверку, умные закупки и контролируемый монтаж.',
      primaryCta: 'Запросить техническую консультацию',
      secondaryCta: 'Посмотреть системы',
      trustMicrocopy: 'Основано на контроле промышленного исполнения, а не только на поставке материалов.',
      visualAlt: 'Коллаж промышленного проекта SIPANEL'
    },
    conversionCta: {
      headline: 'Снизьте риск выполнения до начала строительства.',
      text: 'Запросите техническую консультацию для вашего проекта панелей, кровли или облицовки.',
      primaryCta: 'Запросить техническую консультацию',
      secondaryCta: 'Связаться через WhatsApp',
      contactHint: 'Только проверенные контактные данные.'
    },
    stickyMobileCta: {
      label: 'Техническая консультация',
      secondaryAction: 'WhatsApp'
    }
  }
};

const companyStory = {
  en: {
    title: 'Why SIPANEL Exists',
    lead:
      'Industrial envelope problems usually begin long before installation: unclear drawings, weak system selection, poor sequencing, and unplanned coordination.',
    points: [
      {
        title: 'Problem in the market',
        description:
          'Projects often start with materials, not with a system review. That creates leakage risk, waste, and execution drift.'
      },
      {
        title: 'Why execution fails',
        description:
          'When drawings, drainage logic, accessories, and site sequencing are not aligned, site teams spend time correcting avoidable issues.'
      },
      {
        title: 'Why engineering matters',
        description:
          'Engineering review reduces uncertainty before procurement and installation, when changes are still inexpensive to make.'
      },
      {
        title: 'How SIPANEL approaches projects',
        description:
          'SIPANEL works from system review to controlled installation so the project stays coordinated, measurable, and technically defensible.'
      }
    ],
    visual: {
      image: aboutStoryVisual,
      alt: 'Industrial project engineering reference visual'
    }
  },
  fa: {
    title: 'تجربه‌ای که سی‌پانل را شکل داد',
    lead: 'بر پایه تجربه اجرایی مدیران فضاسازه نقش جهان',
    paragraphs: [
      'شرکت سیان صنعت ایرانیان در سال ۱۳۹۴ با اتکا به تجربه و دانش فنی جمعی از مدیران شرکت فضاسازه نقش جهان تأسیس شد. با توجه به تمرکز فضاسازه نقش جهان بر احداث سالن‌های صنعتی با سیستم سازه فضایی، نیاز پروژه‌ها به راهکارهای تخصصی پوشش، زمینه شکل‌گیری برند SIPANEL را فراهم کرد.',
      'تجربه فنی در طراحی، استخراج و تهیه نقشه‌های شاپ، همراه با حضور در پروژه‌هایی با معماری‌ها و کاربری‌های متنوع، ما را در طراحی و اجرای انواع سیستم‌های پوشانه صنعتی به تخصصی عمیق رسانده است. از سوی دیگر، همکاری مستمر و چندین‌ساله با تولیدکنندگان داخلی و خارجی، شناخت دقیقی از کیفیت، عملکرد و قابلیت‌های متریال‌های مختلف در اختیار ما قرار داده تا بتوانیم مناسب‌ترین سیستم پوشش را متناسب با نیاز هر پروژه پیشنهاد دهیم.',
      'اجرای صدها پروژه صنعتی در نقاط مختلف ایران و کشورهای همسایه، در شرایط اقلیمی گوناگون، تجربیات ارزشمندی برای ما ایجاد کرده است. این مسیر، سی‌پانل را به مجموعه‌ای متخصص در طراحی، تأمین و اجرای کنترل‌شده سیستم‌های پوشش صنعتی تبدیل کرده است.'
    ],
    points: [
      {
        title: 'ریشه اجرایی',
        description: 'سیان صنعت ایرانیان با اتکا به تجربه و دانش فنی مدیران فضاسازه نقش جهان شکل گرفت.'
      },
      {
        title: 'تخصص پوشانه صنعتی',
        description: 'تجربه طراحی، استخراج و تهیه نقشه‌های شاپ، پایه تخصص سی‌پانل در پوشش صنعتی است.'
      },
      {
        title: 'شناخت متریال',
        description: 'همکاری مستمر با تولیدکنندگان داخلی و خارجی، امکان پیشنهاد سیستم پوشش متناسب با نیاز پروژه را فراهم کرده است.'
      },
      {
        title: 'اجرای کنترل‌شده',
        description: 'تجربه پروژه‌های صنعتی در اقلیم‌های گوناگون، رویکرد طراحی، تأمین و اجرای کنترل‌شده را شکل داده است.'
      }
    ],
    heritageItems: [
      {
        label: '۱۳۹۴',
        title: 'تأسیس سیان صنعت ایرانیان',
        description: 'شروع مسیر با اتکا به تجربه فنی مدیران فضاسازه نقش جهان.'
      },
      {
        label: 'ریشه اجرایی',
        title: 'احداث سالن‌های صنعتی',
        description: 'شناخت نیاز پروژه‌ها به پوشش تخصصی در کنار سیستم‌های سازه فضایی.'
      },
      {
        label: 'مسیر تخصص',
        title: 'SIPANEL',
        description: 'تمرکز بر طراحی، تأمین و اجرای کنترل‌شده سیستم‌های پوشش صنعتی.'
      }
    ],
    visual: {
      image: aboutStoryVisual,
      alt: 'نمای مرجع پروژه صنعتی'
    }
  },
  ar: {
    title: 'لماذا وُجدت SIPANEL',
    lead:
      'غالبًا ما تبدأ مشكلات الغلاف الصناعي قبل التركيب بفترة طويلة: رسومات غير واضحة، اختيار نظام ضعيف، وتسلسل غير منظم، وتنسيق غير مخطط.',
    points: [
      {
        title: 'مشكلة السوق',
        description:
          'تبدأ المشاريع غالبًا بالمواد وليس بمراجعة النظام، وهذا يخلق خطر التسرب والهدر والانحراف في التنفيذ.'
      },
      {
        title: 'لماذا يفشل التنفيذ',
        description:
          'عندما لا تكون الرسومات ومنطق التصريف والملحقات وتسلسل الموقع متناسقة، يقضي فريق التنفيذ الوقت في معالجة مشكلات كان يمكن تجنبها.'
      },
      {
        title: 'لماذا تهم الهندسة',
        description:
          'تقلل المراجعة الهندسية عدم اليقين قبل الشراء والتركيب، عندما لا تزال التعديلات منخفضة التكلفة.'
      },
      {
        title: 'كيف تتعامل SIPANEL مع المشاريع',
        description:
          'تعمل SIPANEL من مراجعة النظام حتى التركيب المنضبط بحيث يبقى المشروع منسقًا وقابلًا للقياس ومدافعًا عنه فنيًا.'
      }
    ],
    visual: {
      image: aboutStoryVisual,
      alt: 'مرجع بصري لهندسة مشروع صناعي'
    }
  },
  ru: {
    title: 'Почему существует SIPANEL',
    lead:
      'Проблемы промышленной оболочки обычно начинаются задолго до монтажа: неясные чертежи, слабый выбор системы, плохая последовательность и несогласованность работ.',
    points: [
      {
        title: 'Проблема рынка',
        description:
          'Проекты часто начинают с материалов, а не с проверки системы. Это создаёт риск протечек, потерь и отклонений в выполнении.'
      },
      {
        title: 'Почему выполнение срывается',
        description:
          'Когда чертежи, логика водоотвода, комплектующие и последовательность работ не согласованы, команда тратит время на исправление предотвратимых проблем.'
      },
      {
        title: 'Почему важна инженерия',
        description:
          'Инженерная проверка снижает неопределённость до закупки и монтажа, когда изменения ещё недороги.'
      },
      {
        title: 'Как SIPANEL ведёт проекты',
        description:
          'SIPANEL работает от проверки системы до контролируемого монтажа, чтобы проект оставался согласованным, измеримым и технически обоснованным.'
      }
    ],
    visual: {
      image: aboutStoryVisual,
      alt: 'Инженерный референс промышленного проекта'
    }
  }
} as Record<
  Locale,
  {
    title: string;
    lead: string;
    paragraphs?: string[];
    points: Array<{title: string; description: string}>;
    heritageItems?: Array<{label: string; title: string; description: string}>;
    visual: AboutVisual;
  }
>;

const corePrinciples = {
  en: {
    title: 'Core Execution Principles',
    principles: [
      {title: 'Engineering Before Installation', description: 'Project risk should be reviewed before site execution begins.'},
      {
        title: 'Waterproofing Logic Matters',
        description: 'Drainage, flashings, overlaps, seams, and penetrations determine long-term roof performance.'
      },
      {
        title: 'Layout Controls Quality',
        description: 'Panel rhythm, facade alignment, and quantity planning affect execution quality and waste.'
      },
      {
        title: 'Execution Needs Coordination',
        description: 'Installation quality depends on sequencing, drawings, procurement, and inspection checkpoints.'
      },
      {
        title: 'Technical Proof Over Claims',
        description: 'Real details, diagrams, and execution proof matter more than marketing language.'
      },
      {
        title: 'Industrial Projects Need Control',
        description: 'Large industrial systems require planning, verification, and engineering discipline.'
      }
    ]
  },
  fa: {
    title: 'اصول اصلی اجرا',
    principles: [
      {title: 'مهندسی پیش از نصب', description: 'ریسک پروژه باید پیش از شروع اجرای سایت بررسی شود.'},
      {
        title: 'منطق آب‌بندی مهم است',
        description: 'زهکشی، فلاشینگ‌ها، همپوشانی‌ها، درزها و نفوذها عملکرد بلندمدت سقف را تعیین می‌کنند.'
      },
      {
        title: 'چیدمان کیفیت را کنترل می‌کند',
        description: 'ریتم پنل، هم‌راستایی نما و برنامه‌ریزی مقدار، کیفیت اجرا و پرت را تحت تاثیر قرار می‌دهند.'
      },
      {
        title: 'اجرا به هماهنگی نیاز دارد',
        description: 'کیفیت نصب به توالی، نقشه‌ها، تامین و نقاط بازرسی وابسته است.'
      },
      {
        title: 'شواهد فنی مهم‌تر از ادعاست',
        description: 'جزئیات واقعی، دیاگرام‌ها و شواهد اجرا از زبان بازاریابی مهم‌ترند.'
      },
      {
        title: 'پروژه‌های صنعتی کنترل می‌خواهند',
        description: 'سیستم‌های صنعتی بزرگ به برنامه‌ریزی، تایید و انضباط مهندسی نیاز دارند.'
      }
    ]
  },
  ar: {
    title: 'مبادئ التنفيذ الأساسية',
    principles: [
      {title: 'الهندسة قبل التركيب', description: 'يجب مراجعة مخاطر المشروع قبل بدء التنفيذ في الموقع.'},
      {
        title: 'منطق العزل المائي مهم',
        description: 'التصريف والفلاشينغ والتراكبات والدرزات والاختراقات تحدد أداء السقف على المدى الطويل.'
      },
      {
        title: 'التوزيع يتحكم في الجودة',
        description: 'إيقاع الألواح، ومحاذاة الواجهات، وتخطيط الكميات تؤثر في جودة التنفيذ والهدر.'
      },
      {
        title: 'التنفيذ يحتاج تنسيقًا',
        description: 'تعتمد جودة التركيب على التسلسل والرسومات والمشتريات ونقاط الفحص.'
      },
      {
        title: 'الدليل الفني أهم من الادعاء',
        description: 'التفاصيل الحقيقية والرسومات وشواهد التنفيذ أهم من لغة التسويق.'
      },
      {
        title: 'المشاريع الصناعية تحتاج ضبطًا',
        description: 'تحتاج الأنظمة الصناعية الكبيرة إلى التخطيط والتحقق والانضباط الهندسي.'
      }
    ]
  },
  ru: {
    title: 'Основные принципы выполнения',
    principles: [
      {title: 'Сначала инженерия, потом монтаж', description: 'Риск проекта нужно проверять до начала работ на площадке.'},
      {
        title: 'Логика гидроизоляции имеет значение',
        description: 'Водоотвод, примыкания, нахлёсты, швы и проходки определяют долговечность кровли.'
      },
      {
        title: 'Раскладка управляет качеством',
        description: 'Ритм панелей, выравнивание фасада и планирование объёмов влияют на качество и отходы.'
      },
      {
        title: 'Выполнение требует координации',
        description: 'Качество монтажа зависит от последовательности, чертежей, закупок и точек контроля.'
      },
      {
        title: 'Техническое доказательство важнее заявлений',
        description: 'Реальные узлы, схемы и доказательства выполнения важнее маркетинговых формулировок.'
      },
      {
        title: 'Промышленные проекты требуют контроля',
        description: 'Крупные промышленные системы требуют планирования, проверки и инженерной дисциплины.'
      }
    ]
  }
} as Record<Locale, {title: string; principles: Array<{title: string; description: string}>}>;

const systemsOverview = {
  en: {
    title: 'Industrial Envelope Systems',
    systems: [
      {
        title: 'Sandwich Panel Systems',
        description: 'Panel layout, insulation systems, accessories, flashing coordination, and installation control.',
        cta: 'Explore Panel Systems',
        href: '/systems/sandwich-panel-systems'
      },
      {
        title: 'Standing Seam & ZIP Tech Roofing',
        description: 'Waterproof roofing systems designed around drainage logic, concealed fastening, and controlled execution.',
        cta: 'Explore Roofing Systems',
        href: '/systems/standing-seam-zip-tech-roofing'
      },
      {
        title: 'Aluminium Cladding & Covering',
        description: 'Industrial facade systems coordinated through layout control, fixing logic, and precise execution.',
        cta: 'Explore Cladding Systems',
        href: '/systems/aluminium-cladding-covering'
      }
    ]
  },
  fa: {
    title: 'سیستم های پوشش صنعتی',
    systems: [
      {
        title: 'سیستم‌های پنل ساندویچی',
        description: 'چیدمان پنل، عایق، متعلقات، هماهنگی فلاشینگ و کنترل نصب.',
        cta: 'مشاهده سیستم‌های پنل',
        href: '/systems/sandwich-panel-systems'
      },
      {
        title: 'سقف Standing Seam و ZIP Tech',
        description: 'سیستم‌های سقف آب‌بند بر پایه منطق زهکشی، اتصال پنهان و اجرای کنترل‌شده.',
        cta: 'مشاهده سیستم‌های سقف',
        href: '/systems/standing-seam-zip-tech-roofing'
      },
      {
        title: 'کلادینگ و پوشش آلومینیومی',
        description: 'سیستم‌های نمای صنعتی با کنترل چیدمان، منطق فیکسینگ و اجرای دقیق.',
        cta: 'مشاهده سیستم‌های کلادینگ',
        href: '/systems/aluminium-cladding-covering'
      }
    ]
  },
  ar: {
    title: 'أنظمة الغلاف الصناعي',
    systems: [
      {
        title: 'أنظمة ألواح الساندويش',
        description: 'توزيع الألواح، والعزل، والملحقات، وتنسيق الفلاشينغ، وضبط التركيب.',
        cta: 'استكشاف أنظمة الألواح',
        href: '/systems/sandwich-panel-systems'
      },
      {
        title: 'Standing Seam وZIP Tech للأسقف',
        description: 'أنظمة أسقف مقاومة للماء مبنية على منطق التصريف، والتثبيت المخفي، والتنفيذ المنضبط.',
        cta: 'استكشاف أنظمة الأسقف',
        href: '/systems/standing-seam-zip-tech-roofing'
      },
      {
        title: 'كسوة وتغطية الألمنيوم',
        description: 'أنظمة واجهات صناعية بتنسيق التوزيع ومنطق التثبيت والتنفيذ الدقيق.',
        cta: 'استكشاف أنظمة الكسوة',
        href: '/systems/aluminium-cladding-covering'
      }
    ]
  },
  ru: {
    title: 'Системы промышленной оболочки',
    systems: [
      {
        title: 'Системы сэндвич-панелей',
        description: 'Раскладка панелей, утепление, комплектующие, согласование примыканий и контроль монтажа.',
        cta: 'Смотреть системы панелей',
        href: '/systems/sandwich-panel-systems'
      },
      {
        title: 'Кровля Standing Seam и ZIP Tech',
        description: 'Гидроизоляционные кровли, спроектированные вокруг логики водоотвода, скрытого крепежа и контролируемого выполнения.',
        cta: 'Смотреть системы кровли',
        href: '/systems/standing-seam-zip-tech-roofing'
      },
      {
        title: 'Алюминиевая облицовка и покрытие',
        description: 'Промышленные фасадные системы с контролем раскладки, логики крепления и точного выполнения.',
        cta: 'Смотреть системы облицовки',
        href: '/systems/aluminium-cladding-covering'
      }
    ]
  }
} as Record<
  Locale,
  {
    title: string;
    systems: Array<{title: string; description: string; cta: string; href: string}>;
  }
>;

const workflowProcess = {
  en: {
    title: 'How SIPANEL Approaches Industrial Projects',
    steps: [
      {title: 'Project Review', description: 'Review project conditions, system requirements, and execution risks.'},
      {
        title: 'Technical Coordination',
        description: 'Coordinate drawings, drainage logic, details, accessories, and procurement planning.'
      },
      {
        title: 'Execution Planning',
        description: 'Define installation sequencing, inspection points, and quality control flow.'
      },
      {
        title: 'Controlled Installation',
        description: 'Execute according to technical standards, coordination logic, and engineering review.'
      }
    ]
  },
  fa: {
    title: 'SIPANEL چگونه پروژه‌های صنعتی را پیش می‌برد',
    steps: [
      {title: 'بازبینی پروژه', description: 'شرایط پروژه، نیازهای سیستم و ریسک‌های اجرا بررسی می‌شوند.'},
      {
        title: 'هماهنگی فنی',
        description: 'نقشه‌ها، منطق زهکشی، جزئیات، متعلقات و برنامه‌ریزی تامین هماهنگ می‌شوند.'
      },
      {
        title: 'برنامه‌ریزی اجرا',
        description: 'توالی نصب، نقاط بازرسی و جریان کنترل کیفیت تعریف می‌شود.'
      },
      {
        title: 'نصب کنترل‌شده',
        description: 'اجرا مطابق استانداردهای فنی، منطق هماهنگی و بازبینی مهندسی انجام می‌شود.'
      }
    ]
  },
  ar: {
    title: 'كيف تتعامل SIPANEL مع المشاريع الصناعية',
    steps: [
      {title: 'مراجعة المشروع', description: 'تُراجع ظروف المشروع ومتطلبات النظام ومخاطر التنفيذ.'},
      {
        title: 'التنسيق الفني',
        description: 'تُنسق الرسومات ومنطق التصريف والتفاصيل والملحقات وتخطيط المشتريات.'
      },
      {
        title: 'تخطيط التنفيذ',
        description: 'يُحدد تسلسل التركيب ونقاط الفحص ومسار ضبط الجودة.'
      },
      {
        title: 'تركيب منضبط',
        description: 'يُنفذ العمل وفق المعايير الفنية ومنطق التنسيق والمراجعة الهندسية.'
      }
    ]
  },
  ru: {
    title: 'Как SIPANEL подходит к промышленным проектам',
    steps: [
      {title: 'Проверка проекта', description: 'Проверяются условия проекта, требования системы и риски выполнения.'},
      {
        title: 'Техническая координация',
        description: 'Согласуются чертежи, логика водоотвода, детали, комплектующие и закупки.'
      },
      {
        title: 'Планирование выполнения',
        description: 'Определяются последовательность монтажа, точки контроля и поток качества.'
      },
      {
        title: 'Контролируемый монтаж',
        description: 'Выполнение идёт по техническим стандартам, логике координации и инженерной проверке.'
      }
    ]
  }
} as Record<Locale, {title: string; steps: Array<{title: string; description: string}>}>;

function buildLocaleContent(locale: Locale): AboutLocaleContent {
  return {
    ...aboutCopy[locale],
    companyStory: companyStory[locale],
    corePrinciples: corePrinciples[locale],
    systemsOverview: systemsOverview[locale],
    workflowProcess: workflowProcess[locale]
  };
}

export const aboutPageData: AboutPageData = {
  routes: routeMap,
  contact: productionContactInfo,
  localeContent: Object.fromEntries(locales.map((locale) => [locale, buildLocaleContent(locale)])) as Record<
    Locale,
    AboutLocaleContent
  >
};

export function getAboutPageData() {
  return aboutPageData;
}

export function getAboutPageMetadata(locale: Locale): Metadata {
  const content = aboutPageData.localeContent[locale];

  return buildPageMetadata({
    locale,
    title: content.seo.title,
    description: content.seo.metaDescription,
    routes: aboutPageData.routes
  });
}

export function buildAboutPageSchema(locale: Locale) {
  const content = aboutPageData.localeContent[locale];

  return buildSharedAboutPageSchema(locale, `${aboutPageData.routes[locale]}#about-page`, {
    name: content.seo.h1,
    description: content.seo.metaDescription,
    url: aboutPageData.routes[locale]
  });
}

export function buildAboutBreadcrumbSchema(locale: Locale) {
  return buildBreadcrumbListSchema(locale, `${aboutPageData.routes[locale]}#breadcrumb`, [
    {name: locale === 'fa' ? 'خانه' : locale === 'ar' ? 'الرئيسية' : locale === 'ru' ? 'Главная' : 'Home', item: `/${locale}`},
    {
      name: locale === 'fa' ? 'درباره SIPANEL' : locale === 'ar' ? 'حول SIPANEL' : locale === 'ru' ? 'О SIPANEL' : 'About SIPANEL',
      item: aboutPageData.routes[locale]
    }
  ]);
}

export function buildAboutOrganizationSchema(locale: Locale) {
  return buildSharedOrganizationSchema(locale, `${aboutPageData.routes[locale]}#organization`);
}

export function getAboutPageStickyCopy(locale: Locale) {
  return aboutPageData.localeContent[locale].stickyMobileCta;
}
