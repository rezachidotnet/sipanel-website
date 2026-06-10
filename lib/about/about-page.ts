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
  executionApproach: {
    title: string;
    intro: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
  };
  leadership: {
    title: string;
    name: string;
    role: string;
    bio: string;
    imageAlt: string;
  };
  conversionCta: {
    headline: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    phoneCta: string;
    contactHint: string;
  };
  stickyMobileCta: {
    label: string;
    secondaryAction: string;
  };
};

const routeMap = aboutSipanelSpec.route as AboutRouteMap;

const aboutCopy: Record<Locale, Omit<AboutLocaleContent, 'companyStory' | 'executionApproach' | 'leadership'>> = {
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
      phoneCta: 'Call Us',
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
      phoneCta: 'تماس تلفنی',
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
      phoneCta: 'اتصل بنا',
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
      phoneCta: 'Позвонить',
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

const executionApproach = {
  en: {
    title: 'How SIPANEL Controls Execution',
    intro: 'Every industrial envelope project carries risk — in panel selection, waterproofing details, procurement timing, and installation quality. SIPANEL controls these risks through four engineering disciplines applied before and during execution.',
    pillars: [
      {title: 'Engineering Review Before Procurement', description: 'Project conditions, roof geometry, panel layout, drainage, flashing, and execution risks are reviewed before procurement starts.'},
      {title: 'Technical Coordination Before Installation', description: 'Drawings, accessories, overlaps, installation sequence, and site constraints are coordinated before installation begins.'},
      {title: 'Waterproofing and Detail Control', description: 'Drainage paths, gutters, flashing, sealing points, and foam continuity are planned and checked.'},
      {title: 'Controlled Execution and Handover', description: 'Installation follows approved details, site checks, alignment control, and final review before handover.'}
    ]
  },
  fa: {
    title: 'رویکرد اجرایی SIPANEL',
    intro: 'هر پروژه پوشش صنعتی ریسک دارد — در انتخاب پنل، جزئیات آب‌بندی، زمان‌بندی تأمین و کیفیت نصب. سی‌پانل این ریسک‌ها را با چهار رویکرد مهندسی پیش و حین اجرا کنترل می‌کند.',
    pillars: [
      {title: 'بازبینی مهندسی پیش از خرید', description: 'شرایط پروژه، هندسه سقف، چیدمان پانل، زهکشی، فلاشینگ و ریسک‌های اجرا پیش از شروع تأمین بررسی می‌شوند.'},
      {title: 'هماهنگی فنی پیش از نصب', description: 'نقشه‌ها، متعلقات، همپوشانی‌ها، ترتیب نصب و محدودیت‌های سایت پیش از شروع نصب هماهنگ می‌شوند.'},
      {title: 'کنترل آب‌بندی و جزئیات اجرایی', description: 'مسیرهای زهکشی، ناودان‌ها، فلاشینگ، نقاط آب‌بندی و تداوم فوم برنامه‌ریزی و بازبینی می‌شوند.'},
      {title: 'اجرای کنترل‌شده و تحویل', description: 'نصب بر اساس جزئیات تأییدشده، بازبینی سایت، کنترل هم‌راستایی و بررسی نهایی پیش از تحویل انجام می‌شود.'}
    ]
  },
  ar: {
    title: 'نهج SIPANEL في ضبط التنفيذ',
    intro: 'كل مشروع غلاف صناعي يحمل مخاطر — في اختيار الألواح وتفاصيل العزل المائي وتوقيت التوريد وجودة التركيب. تضبط SIPANEL هذه المخاطر عبر أربعة مبادئ هندسية تُطبق قبل وأثناء التنفيذ.',
    pillars: [
      {title: 'المراجعة الهندسية قبل الشراء', description: 'تُراجع ظروف المشروع وهندسة السقف وتوزيع الألواح والتصريف والفلاشينغ ومخاطر التنفيذ قبل بدء التوريد.'},
      {title: 'التنسيق الفني قبل التركيب', description: 'تُنسق الرسومات والملحقات والتراكبات وتسلسل التركيب وقيود الموقع قبل بدء التركيب.'},
      {title: 'ضبط العزل المائي والتفاصيل', description: 'تُخطط وتُفحص مسارات التصريف والمزاريب والفلاشينغ ونقاط الختم واستمرارية العزل.'},
      {title: 'التنفيذ المنضبط والتسليم', description: 'يتبع التركيب التفاصيل المعتمدة وفحوص الموقع وضبط المحاذاة والمراجعة النهائية قبل التسليم.'}
    ]
  },
  ru: {
    title: 'Как SIPANEL контролирует выполнение',
    intro: 'Каждый проект промышленной оболочки несёт риск — в выборе панелей, деталях гидроизоляции, сроках поставок и качестве монтажа. SIPANEL контролирует эти риски с помощью четырёх инженерных дисциплин, применяемых до и во время выполнения.',
    pillars: [
      {title: 'Инженерная проверка до закупки', description: 'Условия проекта, геометрия кровли, раскладка панелей, водоотвод, примыкания и риски выполнения проверяются до начала закупок.'},
      {title: 'Техническая координация до монтажа', description: 'Чертежи, комплектующие, нахлёсты, последовательность монтажа и ограничения площадки согласуются до начала монтажа.'},
      {title: 'Контроль гидроизоляции и деталей', description: 'Пути водоотвода, желоба, примыкания, точки герметизации и непрерывность утепления планируются и проверяются.'},
      {title: 'Контролируемый монтаж и сдача', description: 'Монтаж выполняется по утверждённым деталям с проверками на площадке, контролем выравнивания и финальной ревизией перед сдачей.'}
    ]
  }
} as Record<Locale, {title: string; intro: string; pillars: Array<{title: string; description: string}>}>;

const leadership = {
  en: {
    title: 'Technical Leadership',
    name: 'A.M. Taleghani',
    role: 'CEO & Technical Director',
    bio: 'SIPANEL was built to bridge the gap between design, procurement, and execution in industrial building envelope projects. Its technical leadership focuses on reducing execution errors, coordinating before procurement, controlling waterproofing details, and delivering reliable industrial envelope systems.',
    imageAlt: 'A.M. Taleghani — CEO & Technical Director of SIPANEL'
  },
  fa: {
    title: 'رهبری فنی',
    name: 'A.M. Taleghani',
    role: 'مدیرعامل و مدیر فنی',
    bio: 'SIPANEL با نگاه مهندسی به فاصله میان طراحی، تأمین و اجرای سیستم‌های پوشش صنعتی شکل گرفته است. تمرکز مدیریت فنی شرکت بر کاهش خطاهای اجرایی، هماهنگی پیش از خرید، کنترل آب‌بندی و تحویل قابل اتکا در پروژه‌های صنعتی است.',
    imageAlt: 'A.M. Taleghani — مدیرعامل و مدیر فنی SIPANEL'
  },
  ar: {
    title: 'القيادة الفنية',
    name: 'A.M. Taleghani',
    role: 'الرئيس التنفيذي والمدير الفني',
    bio: 'تأسست SIPANEL لسد الفجوة بين التصميم والتوريد والتنفيذ في مشاريع الغلاف الصناعي. تركز القيادة الفنية على تقليل أخطاء التنفيذ والتنسيق قبل الشراء وضبط تفاصيل العزل المائي وتسليم أنظمة غلاف صناعية موثوقة.',
    imageAlt: 'A.M. Taleghani — الرئيس التنفيذي والمدير الفني لـ SIPANEL'
  },
  ru: {
    title: 'Техническое руководство',
    name: 'A.M. Taleghani',
    role: 'Генеральный директор и технический директор',
    bio: 'SIPANEL создан для устранения разрыва между проектированием, снабжением и выполнением в проектах промышленных оболочек. Техническое руководство сосредоточено на сокращении ошибок выполнения, координации до закупки, контроле гидроизоляции и надёжной поставке промышленных оболочек.',
    imageAlt: 'A.M. Taleghani — Генеральный и технический директор SIPANEL'
  }
} as Record<Locale, {title: string; name: string; role: string; bio: string; imageAlt: string}>;

function buildLocaleContent(locale: Locale): AboutLocaleContent {
  return {
    ...aboutCopy[locale],
    companyStory: companyStory[locale],
    executionApproach: executionApproach[locale],
    leadership: leadership[locale]
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
