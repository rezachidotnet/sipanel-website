import type {Metadata} from 'next';
import type {StaticImageData} from 'next/image';
import aboutSipanelSpec from '@/specs/pages/about_sipanel.json';
import {getLocalizedPath, locales, normalizeLocalizedRouteMap, type Locale} from '@/i18n/routing';
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

const routeMap = normalizeLocalizedRouteMap(aboutSipanelSpec.route as AboutRouteMap);

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
        'SIPANEL was developed based on the executive experience of Fazasazeh Naghsh-e-Jahan managers, delivering engineered industrial envelope solutions to reduce execution risk, control quality, and optimize project performance.',
      primaryCta: 'Request Technical Consultation',
      secondaryCta: 'Explore Systems',
      trustMicrocopy: 'Built on the engineering heritage of Fazasazeh Naghsh-e-Jahan, operating internationally through Global Innovative Co.',
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
        'سی‌پانل با تکیه بر تجربه اجرایی مدیران فضاسازه نقش جهان، راهکارهای مهندسی‌شده پوشش صنعتی را برای کاهش ریسک اجرا، کنترل کیفیت و بهینه‌سازی عملکرد پروژه‌ها توسعه داده است.',
      primaryCta: 'درخواست مشاوره فنی',
      secondaryCta: 'مشاهده سیستم‌ها',
      trustMicrocopy: 'بر پایه تجربه اجرایی مدیران فضاسازه نقش جهان',
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
      trustMicrocopy: 'تستند إلى الخبرة الهندسية لشركة Fazasazeh Naghsh-e-Jahan وتدير عملياتها الدولية من خلال Global Innovative Co.',
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
      trustMicrocopy: 'Создана на основе инженерного опыта Fazasazeh Naghsh-e-Jahan, международная деятельность через Global Innovative Co.',
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
    title: 'The Experience That Shaped SIPANEL',
    lead: '',
    paragraphs: [
      'Sian Sanat Iranian was founded in 2015, drawing on the technical expertise and hands-on experience of the management team at Fazasazeh Naghsh-e-Jahan. With Fazasazeh focused on constructing industrial halls using space frame structural systems, the need for specialized envelope solutions led to the creation of the SIPANEL brand.',
      'Technical experience in designing, extracting and preparing shop drawings, combined with involvement in projects with diverse architectures and applications, has given us deep expertise in designing and executing industrial envelope systems. In addition, continuous multi-year collaboration with domestic and international manufacturers has provided us with precise knowledge of the quality, performance and capabilities of different materials, allowing us to recommend the most suitable envelope system for each project.',
      'Executing hundreds of industrial projects across Iran and neighboring countries, under diverse climatic conditions, has generated invaluable experience. SIPANEL is built on the engineering heritage of Fazasazeh Naghsh-e-Jahan and conducts its international operations through Global Innovative Co.'
    ],
    points: [
      {
        title: 'Executive heritage',
        description:
          'Sian Sanat Iranian was established building on the technical expertise of the Fazasazeh Naghsh-e-Jahan management team.'
      },
      {
        title: 'Industrial envelope expertise',
        description:
          'Experience in design, shop drawing preparation, and execution across diverse projects forms the foundation of SIPANEL\'s specialization.'
      },
      {
        title: 'Material knowledge',
        description:
          'Continuous collaboration with domestic and international manufacturers enables recommending the optimal envelope system for each project.'
      },
      {
        title: 'Controlled execution',
        description:
          'Experience across various climates and project types has shaped a design, procurement, and controlled execution approach.'
      }
    ],
    heritageItems: [
      {
        label: '2015',
        title: 'Sian Sanat Iranian Founded',
        description: 'Established building on the technical expertise of Fazasazeh Naghsh-e-Jahan managers.'
      },
      {
        label: 'Executive Roots',
        title: 'Industrial Hall Construction',
        description: 'Recognizing project needs for specialized envelope solutions alongside space frame systems.'
      },
      {
        label: 'Specialization Path',
        title: 'SIPANEL',
        description: 'Focused on design, procurement, and controlled execution of industrial envelope systems.'
      }
    ],
    visual: {
      image: aboutStoryVisual,
      alt: 'Industrial project engineering reference visual'
    }
  },
  fa: {
    title: 'تجربه‌ای که سی‌پانل را شکل داد',
    lead: '',
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
    title: 'التجربة التي شكّلت SIPANEL',
    lead: '',
    paragraphs: [
      'تأسست شركة سيان صنعت إيرانيان عام ٢٠١٥ بالاعتماد على الخبرة الفنية والتنفيذية لفريق إدارة شركة Fazasazeh Naghsh-e-Jahan. مع تركيز فضاسازه على بناء القاعات الصناعية باستخدام أنظمة الهياكل الفراغية، أدت الحاجة إلى حلول غلاف متخصصة إلى إنشاء علامة SIPANEL التجارية.',
      'الخبرة الفنية في التصميم وإعداد رسومات الشوب، إلى جانب المشاركة في مشاريع ذات تصاميم واستخدامات متنوعة، منحتنا تخصصاً عميقاً في تصميم وتنفيذ أنظمة الغلاف الصناعي.',
      'تنفيذ مئات المشاريع الصناعية في مختلف أنحاء إيران والدول المجاورة تحت ظروف مناخية متنوعة وفّر خبرات لا تُقدّر بثمن. تستند SIPANEL إلى الخبرة الهندسية لشركة Fazasazeh Naghsh-e-Jahan وتدير عملياتها الدولية من خلال Global Innovative Co.'
    ],
    points: [
      {
        title: 'الجذور التنفيذية',
        description: 'تأسست سيان صنعت إيرانيان بالاعتماد على الخبرة الفنية لفريق إدارة Fazasazeh Naghsh-e-Jahan.'
      },
      {
        title: 'تخصص الغلاف الصناعي',
        description: 'الخبرة في التصميم وإعداد رسومات الشوب والتنفيذ عبر مشاريع متنوعة تشكل أساس تخصص SIPANEL.'
      },
      {
        title: 'معرفة المواد',
        description: 'التعاون المستمر مع المصنعين المحليين والدوليين يتيح التوصية بنظام الغلاف الأمثل لكل مشروع.'
      },
      {
        title: 'التنفيذ المنضبط',
        description: 'الخبرة في مناخات وأنواع مشاريع متعددة شكّلت نهج التصميم والتوريد والتنفيذ المنضبط.'
      }
    ],
    heritageItems: [
      {
        label: '٢٠١٥',
        title: 'تأسيس سيان صنعت إيرانيان',
        description: 'بداية المسيرة بالاعتماد على الخبرة الفنية لمديري Fazasazeh Naghsh-e-Jahan.'
      },
      {
        label: 'الجذور التنفيذية',
        title: 'بناء القاعات الصناعية',
        description: 'إدراك حاجة المشاريع لحلول غلاف متخصصة إلى جانب أنظمة الهياكل الفراغية.'
      },
      {
        label: 'مسار التخصص',
        title: 'SIPANEL',
        description: 'التركيز على تصميم وتوريد وتنفيذ منضبط لأنظمة الغلاف الصناعي.'
      }
    ],
    visual: {
      image: aboutStoryVisual,
      alt: 'مرجع بصري لهندسة مشروع صناعي'
    }
  },
  ru: {
    title: 'Опыт, сформировавший SIPANEL',
    lead: '',
    paragraphs: [
      'Компания Sian Sanat Iranian была основана в 2015 году, опираясь на технический опыт и практические знания управленческой команды Fazasazeh Naghsh-e-Jahan. Поскольку Fazasazeh специализировалась на строительстве промышленных залов с использованием пространственных каркасных систем, потребность проектов в специализированных решениях оболочки привела к созданию бренда SIPANEL.',
      'Технический опыт в проектировании и подготовке рабочих чертежей в сочетании с участием в проектах различных архитектурных решений и назначений дал нам глубокую экспертизу в проектировании и выполнении систем промышленной оболочки.',
      'Выполнение сотен промышленных проектов по всему Ирану и в соседних странах в различных климатических условиях принесло бесценный опыт. SIPANEL создана на основе инженерного опыта Fazasazeh Naghsh-e-Jahan и осуществляет международную деятельность через Global Innovative Co.'
    ],
    points: [
      {
        title: 'Исполнительные корни',
        description: 'Sian Sanat Iranian основана на техническом опыте управленческой команды Fazasazeh Naghsh-e-Jahan.'
      },
      {
        title: 'Экспертиза промышленной оболочки',
        description: 'Опыт проектирования, подготовки рабочих чертежей и выполнения разнообразных проектов — основа специализации SIPANEL.'
      },
      {
        title: 'Знание материалов',
        description: 'Постоянное сотрудничество с отечественными и зарубежными производителями позволяет рекомендовать оптимальную систему оболочки для каждого проекта.'
      },
      {
        title: 'Контролируемое выполнение',
        description: 'Опыт работы в различных климатах и типах проектов сформировал подход проектирования, снабжения и контролируемого выполнения.'
      }
    ],
    heritageItems: [
      {
        label: '2015',
        title: 'Основание Sian Sanat Iranian',
        description: 'Начало пути на основе технического опыта руководителей Fazasazeh Naghsh-e-Jahan.'
      },
      {
        label: 'Исполнительные корни',
        title: 'Строительство промышленных залов',
        description: 'Осознание потребности проектов в специализированных решениях оболочки наряду с каркасными системами.'
      },
      {
        label: 'Путь специализации',
        title: 'SIPANEL',
        description: 'Фокус на проектировании, снабжении и контролируемом выполнении систем промышленной оболочки.'
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
    {name: locale === 'fa' ? 'خانه' : locale === 'ar' ? 'الرئيسية' : locale === 'ru' ? 'Главная' : 'Home', item: getLocalizedPath(locale)},
    {
      name: locale === 'fa' ? 'درباره SIPANEL' : locale === 'ar' ? 'حول SIPANEL' : locale === 'ru' ? 'О SIPANEL' : 'About SIPANEL',
      item: aboutPageData.routes[locale]
    }
  ]);
}

export function buildAboutOrganizationSchema(locale: Locale) {
  return buildSharedOrganizationSchema(locale);
}

export function getAboutPageStickyCopy(locale: Locale) {
  return aboutPageData.localeContent[locale].stickyMobileCta;
}
