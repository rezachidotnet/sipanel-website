import type {Metadata} from 'next';
import faqSystemSpec from '@/specs/pages/faq_system.json';
import {getLocalizedPath, locales, type Locale} from '@/i18n/routing';
import {productionContactInfo, type ProductionContactInfo} from '@/lib/contact/rfq-contact-page';
import {buildPageMetadata} from '@/lib/seo/metadata';
import {
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildOrganizationSchema as buildSharedOrganizationSchema
} from '@/lib/seo/schema';

type FaqCategoryId =
  | 'general'
  | 'sandwich_panels'
  | 'roofing_waterproofing'
  | 'aluminium_cladding'
  | 'engineering_process'
  | 'procurement_cost'
  | 'rfq_contact';

type FaqLocalizedText = Record<Locale, string>;

export type FaqRelatedLink = {
  href: string;
  pending?: boolean;
};

export type FaqItem = {
  id: string;
  category: FaqCategoryId;
  question: string;
  answer: string;
  relatedLinks: FaqRelatedLink[];
};

type FaqCategory = {
  id: FaqCategoryId;
  label: string;
};

export type FaqLocaleContent = {
  seo: {
    title: string;
    metaDescription: string;
    h1: string;
  };
  hero: {
    eyebrow: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    panelTitle: string;
    panelText: string;
  };
  filters: {
    title: string;
    searchLabel: string;
    searchPlaceholder: string;
    allLabel: string;
    clearLabel: string;
    expandAllLabel: string;
    collapseAllLabel: string;
    resultsLabel: string;
    emptyTitle: string;
    emptyText: string;
  };
  categories: FaqCategory[];
  items: FaqItem[];
  conversionCta: {
    headline: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    tertiaryCta: string;
  };
  relatedServices: {
    title: string;
    cards: Array<{
      title: string;
      href: string;
    }>;
  };
  relatedResources: {
    title: string;
    cards: Array<{
      title: string;
      description: string;
      href: string;
      status: 'hub_resource_pending';
    }>;
  };
  itemsTitle: string;
  itemsIntro: string;
};

export type FaqPageData = {
  routes: Record<Locale, string>;
  contact: ProductionContactInfo;
  localeContent: Record<Locale, FaqLocaleContent>;
};

const routeMap = faqSystemSpec.route as Record<Locale, string>;

const categoryLabels: Record<FaqCategoryId, FaqLocalizedText> = {
  general: {
    en: 'General',
    fa: 'عمومی',
    ar: 'عام',
    ru: 'Общее'
  },
  sandwich_panels: {
    en: 'Sandwich Panels',
    fa: 'پنل‌های ساندویچی',
    ar: 'ألواح الساندویش',
    ru: 'Сэндвич-панели'
  },
  roofing_waterproofing: {
    en: 'Roofing & Waterproofing',
    fa: 'سقف و آب‌بندی',
    ar: 'الأسقف والعزل المائي',
    ru: 'Кровля и гидроизоляция'
  },
  aluminium_cladding: {
    en: 'Aluminium Cladding',
    fa: 'کلادینگ آلومینیومی',
    ar: 'كسوة الألمنيوم',
    ru: 'Алюминиевое облицовывание'
  },
  engineering_process: {
    en: 'Engineering Process',
    fa: 'فرآیند مهندسی',
    ar: 'العملية الهندسية',
    ru: 'Инженерный процесс'
  },
  procurement_cost: {
    en: 'Procurement & Cost',
    fa: 'تأمین و هزینه',
    ar: 'المشتريات والتكلفة',
    ru: 'Закупки и стоимость'
  },
  rfq_contact: {
    en: 'RFQ & Contact',
    fa: 'استعلام قیمت و تماس',
    ar: 'طلب العرض والتواصل',
    ru: 'Запрос цены и контакт'
  }
};

const faqItems = [
  {
    id: 'what_does_sipanel_do',
    category: 'general',
    question: {
      en: 'What does SIPANEL do?',
      fa: 'SIPANEL چه کاری انجام می‌دهد؟',
      ar: 'ماذا تفعل SIPANEL؟',
      ru: 'Чем занимается SIPANEL?'
    },
    answer: {
      en: 'SIPANEL engineers and executes industrial envelope systems, including sandwich panel systems, Standing Seam and ZIP Tech roofing, aluminium cladding, and related technical coordination. The focus is not only supply, but also risk reduction through precise design, smart procurement, and engineered installation.',
      fa: 'SIPANEL سیستم‌های پوسته صنعتی را مهندسی و اجرا می‌کند؛ از جمله سیستم‌های پنل ساندویچی، سقف Standing Seam و ZIP Tech، کلادینگ آلومینیومی و هماهنگی‌های فنی مرتبط. تمرکز فقط بر تامین نیست؛ کاهش ریسک از طریق طراحی دقیق، تامین هوشمند و نصب مهندسی‌شده نیز بخشی از کار است.',
      ar: 'تقوم SIPANEL بالهندسة والتنفيذ لأنظمة الغلاف الصناعي، بما في ذلك ألواح الساندويش، وأسقف Standing Seam و ZIP Tech، وكسوة الألمنيوم، والتنسيق الفني المرتبط بها. التركيز ليس على التوريد فقط، بل على تقليل المخاطر عبر التصميم الدقيق، والمشتريات الذكية، والتركيب الهندسي.',
      ru: 'SIPANEL проектирует и выполняет системы промышленной оболочки, включая сэндвич-панели, кровлю Standing Seam и ZIP Tech, алюминиевую облицовку и связанную техническую координацию. Фокус не только на поставке, но и на снижении риска через точное проектирование, умные закупки и инженерный монтаж.'
    },
    relatedLinks: ['/systems/sandwich-panel-systems', '/systems/standing-seam-zip-tech-roofing', '/systems/aluminium-cladding-covering']
  },
  {
    id: 'is_sipanel_only_panel_supplier',
    category: 'general',
    question: {
      en: 'Is SIPANEL only a sandwich panel supplier?',
      fa: 'آیا SIPANEL فقط تامین‌کننده پنل ساندویچی است؟',
      ar: 'هل SIPANEL مجرد مورّد لألواح الساندويش؟',
      ru: 'SIPANEL — это только поставщик сэндвич-панелей?'
    },
    answer: {
      en: 'No. SIPANEL should be positioned as an engineering-first industrial envelope company. Sandwich panels are one part of the system, alongside waterproof roofing, aluminium cladding, shop drawing coordination, procurement planning, and controlled installation.',
      fa: 'خیر. SIPANEL باید به‌عنوان یک شرکت پوسته صنعتی با رویکرد مهندسی‌محور معرفی شود. پنل ساندویچی فقط یکی از بخش‌های سیستم است، در کنار سقف آب‌بند، کلادینگ آلومینیومی، هماهنگی شاپ‌دراوینگ، برنامه‌ریزی تامین و نصب کنترل‌شده.',
      ar: 'لا. يجب تقديم SIPANEL كشركة غلاف صناعي تقودها الهندسة. ألواح الساندويش هي جزء واحد من المنظومة، إلى جانب الأسقف العازلة للماء، وكسوة الألمنيوم، وتنسيق الرسومات التنفيذية، وتخطيط المشتريات، والتركيب المنضبط.',
      ru: 'Нет. SIPANEL следует позиционировать как инженерную компанию по промышленной оболочке. Сэндвич-панели — лишь часть системы наряду с гидроизоляционной кровлей, алюминиевой облицовкой, согласованием рабочих чертежей, планированием закупок и контролируемым монтажом.'
    },
    relatedLinks: ['/about', '/systems']
  },
  {
    id: 'what_is_engineering_control',
    category: 'engineering_process',
    question: {
      en: 'What does engineering-controlled execution mean?',
      fa: 'اجرای کنترل‌شده مهندسی یعنی چه؟',
      ar: 'ماذا يعني التنفيذ الخاضع للتحكم الهندسي؟',
      ru: 'Что означает инженерно-контролируемое выполнение?'
    },
    answer: {
      en: 'Engineering-controlled execution means reviewing the system before installation: drawings, quantities, accessories, waterproofing details, installation sequence, and quality checkpoints. This helps reduce leakage risk, material waste, delays, rework, and hidden cost.',
      fa: 'اجرای کنترل‌شده مهندسی یعنی بررسی سیستم پیش از نصب: نقشه‌ها، مقادیر، متعلقات، جزئیات آب‌بندی، توالی نصب و نقاط کنترل کیفیت. این کار ریسک نشتی، پرت مصالح، تاخیر، دوباره‌کاری و هزینه پنهان را کاهش می‌دهد.',
      ar: 'يعني التنفيذ الخاضع للتحكم الهندسي مراجعة النظام قبل التركيب: الرسومات، والكميات، والملحقات، وتفاصيل العزل المائي، وتسلسل التركيب، ونقاط التحقق من الجودة. ويساعد ذلك على تقليل خطر التسرب، وهدر المواد، والتأخير، وإعادة العمل، والتكلفة الخفية.',
      ru: 'Инженерно-контролируемое выполнение означает проверку системы до монтажа: чертежи, объёмы, комплектующие, узлы гидроизоляции, последовательность монтажа и контрольные точки качества. Это снижает риск протечек, перерасход материалов, задержки, переделки и скрытые затраты.'
    },
    relatedLinks: ['/resources', '/contact']
  },
  {
    id: 'how_reduce_project_risk',
    category: 'engineering_process',
    question: {
      en: 'How does SIPANEL reduce project risk?',
      fa: 'SIPANEL چگونه ریسک پروژه را کاهش می‌دهد؟',
      ar: 'كيف تقلل SIPANEL مخاطر المشروع؟',
      ru: 'Как SIPANEL снижает риски проекта?'
    },
    answer: {
      en: 'SIPANEL reduces risk by reviewing project conditions early, coordinating technical details, planning procurement accurately, and controlling installation through execution logic and inspection checkpoints.',
      fa: 'SIPANEL با بررسی زودهنگام شرایط پروژه، هماهنگی جزئیات فنی، برنامه‌ریزی دقیق تامین و کنترل نصب از طریق منطق اجرا و نقاط بازرسی، ریسک را کاهش می‌دهد.',
      ar: 'تقلل SIPANEL المخاطر عبر مراجعة ظروف المشروع مبكرًا، وتنسيق التفاصيل الفنية، والتخطيط الدقيق للمشتريات، والتحكم في التركيب من خلال منطق التنفيذ ونقاط الفحص.',
      ru: 'SIPANEL снижает риск за счёт ранней проверки условий проекта, координации технических деталей, точного планирования закупок и контроля монтажа через логику выполнения и точки инспекции.'
    },
    relatedLinks: ['/solutions/industrial-envelope-systems']
  },
  {
    id: 'what_are_sandwich_panels',
    category: 'sandwich_panels',
    question: {
      en: 'What are sandwich panel systems used for?',
      fa: 'سیستم‌های پنل ساندویچی برای چه کاربردهایی استفاده می‌شوند؟',
      ar: 'فيما تُستخدم أنظمة ألواح الساندويش؟',
      ru: 'Для чего используются системы сэндвич-панелей?'
    },
    answer: {
      en: 'Sandwich panel systems are used for industrial walls, roofs, cold rooms, warehouses, factories, logistics centers, and insulated building envelopes. Their performance depends on panel selection, joint logic, accessories, flashing details, and installation quality.',
      fa: 'سیستم‌های پنل ساندویچی برای دیوارها و سقف‌های صنعتی، سردخانه‌ها، انبارها، کارخانه‌ها، مراکز لجستیک و پوسته‌های عایق ساختمان استفاده می‌شوند. عملکرد آن‌ها به انتخاب پنل، منطق درز، متعلقات، جزئیات فلاشینگ و کیفیت نصب وابسته است.',
      ar: 'تُستخدم أنظمة ألواح الساندويش للجدران والأسقف الصناعية، والغرف الباردة، والمستودعات، والمصانع، ومراكز اللوجستيات، وأغلفة المباني المعزولة. وتعتمد الأداء على اختيار اللوح، ومنطق الوصلات، والملحقات، وتفاصيل الفلاشينغ، وجودة التركيب.',
      ru: 'Системы сэндвич-панелей применяются для промышленных стен и кровель, холодильных камер, складов, заводов, логистических центров и утеплённых ограждающих конструкций. Их работа зависит от выбора панели, логики стыков, комплектующих, примыканий и качества монтажа.'
    },
    relatedLinks: ['/systems/sandwich-panel-systems']
  },
  {
    id: 'how_choose_panel_type',
    category: 'sandwich_panels',
    question: {
      en: 'How should the correct sandwich panel type be selected?',
      fa: 'نوع درست پنل ساندویچی چگونه باید انتخاب شود؟',
      ar: 'كيف يتم اختيار نوع لوح الساندويش الصحيح؟',
      ru: 'Как выбрать правильный тип сэндвич-панели?'
    },
    answer: {
      en: 'Panel type should be selected based on building use, insulation requirements, environmental conditions, fire considerations, panel thickness, joint type, project geometry, and installation conditions. SIPANEL reviews these factors before procurement.',
      fa: 'انتخاب نوع پنل باید بر اساس کاربری ساختمان، نیاز عایق، شرایط محیطی، الزامات حریق، ضخامت پنل، نوع درز، هندسه پروژه و شرایط نصب انجام شود. SIPANEL این عوامل را پیش از تامین بررسی می‌کند.',
      ar: 'يجب اختيار نوع اللوح وفقًا لاستخدام المبنى، ومتطلبات العزل، والظروف البيئية، واعتبارات الحريق، وسماكة اللوح، ونوع الوصلة، وهندسة المشروع، وظروف التركيب. وتراجع SIPANEL هذه العوامل قبل الشراء.',
      ru: 'Тип панели следует выбирать исходя из назначения здания, требований к теплоизоляции, условий среды, противопожарных требований, толщины панели, типа стыка, геометрии проекта и условий монтажа. SIPANEL проверяет эти факторы до закупки.'
    },
    relatedLinks: ['/resources', '/contact']
  },
  {
    id: 'how_reduce_panel_waste',
    category: 'sandwich_panels',
    question: {
      en: 'How can panel material waste be reduced?',
      fa: 'چگونه می‌توان پرت مصالح پنل را کاهش داد؟',
      ar: 'كيف يمكن تقليل هدر مواد الألواح؟',
      ru: 'Как снизить отходы материала панелей?'
    },
    answer: {
      en: 'Panel waste can be reduced through layout review, quantity planning, cutting logic, accessory coordination, and shop drawing review before ordering materials.',
      fa: 'پرت پنل با بازبینی چیدمان، برنامه‌ریزی مقادیر، منطق برش، هماهنگی متعلقات و بررسی شاپ‌دراوینگ پیش از سفارش مصالح کاهش می‌یابد.',
      ar: 'يمكن تقليل الهدر عبر مراجعة المخطط، وتخطيط الكميات، ومنطق القطع، وتنسيق الملحقات، ومراجعة الرسومات التنفيذية قبل طلب المواد.',
      ru: 'Отходы панелей можно снизить через проверку раскладки, планирование объёмов, логику раскроя, координацию комплектующих и проверку рабочих чертежей до заказа материалов.'
    },
    relatedLinks: ['/solutions/panel-material-optimization']
  },
  {
    id: 'why_shop_drawings_matter',
    category: 'engineering_process',
    question: {
      en: 'Why are shop drawings important for panel projects?',
      fa: 'چرا شاپ‌دراوینگ در پروژه‌های پنل مهم است؟',
      ar: 'لماذا تعتبر الرسومات التنفيذية مهمة في مشاريع الألواح؟',
      ru: 'Почему рабочие чертежи важны для проектов с панелями?'
    },
    answer: {
      en: 'Shop drawings clarify panel layout, dimensions, accessories, flashing logic, joint details, quantities, and installation sequence before site execution. They help reduce coordination errors and rework.',
      fa: 'شاپ‌دراوینگ پیش از اجرا، چیدمان پنل، ابعاد، متعلقات، منطق فلاشینگ، جزئیات درز، مقادیر و توالی نصب را روشن می‌کند. این کار خطاهای هماهنگی و دوباره‌کاری را کاهش می‌دهد.',
      ar: 'توضح الرسومات التنفيذية ترتيب الألواح والأبعاد والملحقات ومنطق الفلاشينغ وتفاصيل الوصلات والكميات وتسلسل التركيب قبل التنفيذ في الموقع. وهي تساعد على تقليل أخطاء التنسيق وإعادة العمل.',
      ru: 'Рабочие чертежи до начала работ проясняют раскладку панелей, размеры, комплектующие, логику примыканий, детали стыков, объёмы и последовательность монтажа. Это снижает ошибки координации и переделки.'
    },
    relatedLinks: ['/solutions/shop-drawing-review-panel-projects', '/resources']
  },
  {
    id: 'what_is_standing_seam_roofing',
    category: 'roofing_waterproofing',
    question: {
      en: 'What is Standing Seam roofing?',
      fa: 'سقف Standing Seam چیست؟',
      ar: 'ما هو سقف Standing Seam؟',
      ru: 'Что такое кровля Standing Seam?'
    },
    answer: {
      en: 'Standing Seam roofing is a metal roofing system with raised seams and concealed fastening. When designed correctly, it supports stronger waterproofing behavior for industrial roofs by reducing direct fastener exposure and improving seam control.',
      fa: 'سقف Standing Seam یک سیستم پوشش فلزی با درزهای برجسته و اتصال پنهان است. وقتی درست طراحی شود، با کاهش در معرض بودن پیچ‌ها و بهبود کنترل درز، رفتار آب‌بندی قوی‌تری برای سقف‌های صنعتی فراهم می‌کند.',
      ar: 'سقف Standing Seam هو نظام تسقيف معدني ذو درزات مرتفعة وتثبيت مخفي. وعند تصميمه بشكل صحيح، يحقق أداء عزل مائي أقوى للأسقف الصناعية عبر تقليل تعرض المثبتات المباشر وتحسين التحكم في الدرزات.',
      ru: 'Кровля Standing Seam — это металлическая кровельная система с приподнятыми фальцами и скрытым креплением. При правильном проектировании она обеспечивает более надёжную гидроизоляцию промышленных крыш за счёт снижения прямого воздействия крепежа и лучшего контроля швов.'
    },
    relatedLinks: ['/systems/standing-seam-zip-tech-roofing']
  },
  {
    id: 'what_is_zip_tech_roofing',
    category: 'roofing_waterproofing',
    question: {
      en: 'What is ZIP Tech roofing?',
      fa: 'سقف ZIP Tech چیست؟',
      ar: 'ما هو سقف ZIP Tech؟',
      ru: 'Что такое кровля ZIP Tech?'
    },
    answer: {
      en: 'ZIP Tech roofing refers to a concealed fastening roof system approach used for industrial waterproof roofing applications. The final performance depends on drainage planning, seam coordination, flashing detail, and controlled installation.',
      fa: 'سقف ZIP Tech به رویکردی در سیستم سقف با اتصال پنهان گفته می‌شود که در کاربردهای سقف آب‌بند صنعتی استفاده می‌شود. عملکرد نهایی به برنامه‌ریزی زهکشی، هماهنگی درزها، جزئیات فلاشینگ و نصب کنترل‌شده وابسته است.',
      ar: 'يشير سقف ZIP Tech إلى نهج نظام سقف بتثبيت مخفي يُستخدم في تطبيقات الأسقف الصناعية المقاومة للماء. ويعتمد الأداء النهائي على تخطيط التصريف، وتنسيق الدرزات، وتفاصيل الفلاشينغ، والتركيب المنضبط.',
      ru: 'ZIP Tech roofing — это подход к кровельной системе со скрытым креплением, применяемый для промышленных гидроизоляционных кровель. Итоговые характеристики зависят от планирования водоотвода, согласования швов, узлов примыканий и контролируемого монтажа.'
    },
    relatedLinks: ['/systems/standing-seam-zip-tech-roofing']
  },
  {
    id: 'why_industrial_roofs_leak',
    category: 'roofing_waterproofing',
    question: {
      en: 'Why do industrial roofs leak?',
      fa: 'چرا سقف‌های صنعتی نشتی می‌دهند؟',
      ar: 'لماذا تتسرّب الأسقف الصناعية؟',
      ru: 'Почему протекают промышленные крыши?'
    },
    answer: {
      en: 'Industrial roof leakage often comes from weak drainage planning, incorrect slope, poor flashing coordination, uncontrolled penetrations, exposed fastener issues, or installation sequence errors.',
      fa: 'نشتی سقف صنعتی معمولاً از برنامه‌ریزی ضعیف زهکشی، شیب نادرست، هماهنگی نامناسب فلاشینگ، بازشوهای کنترل‌نشده، مشکلات پیچ‌های در معرض دید یا خطاهای توالی نصب ایجاد می‌شود.',
      ar: 'غالبًا ما ينتج تسرب الأسقف الصناعية عن ضعف تخطيط التصريف، أو الميل غير الصحيح، أو سوء تنسيق الفلاشينغ، أو الاختراقات غير المنضبطة، أو مشاكل المثبتات الظاهرة، أو أخطاء تسلسل التركيب.',
      ru: 'Протечки промышленных крыш часто возникают из-за слабого планирования водоотвода, неправильного уклона, плохой координации примыканий, неконтролируемых проходок, проблем с открытым крепежом или ошибок в последовательности монтажа.'
    },
    relatedLinks: ['/solutions/industrial-roof-leakage-prevention']
  },
  {
    id: 'how_prevent_roof_leakage',
    category: 'roofing_waterproofing',
    question: {
      en: 'How can roof leakage risk be reduced before installation?',
      fa: 'چگونه می‌توان ریسک نشتی سقف را پیش از نصب کاهش داد؟',
      ar: 'كيف يمكن تقليل خطر تسرب السقف قبل التركيب؟',
      ru: 'Как снизить риск протечек крыши до монтажа?'
    },
    answer: {
      en: 'Leakage risk can be reduced by reviewing roof slope, drainage paths, gutters, downspouts, flashings, overlaps, penetrations, edge details, and installation sequence before roofing starts.',
      fa: 'ریسک نشتی با بررسی شیب سقف، مسیرهای زهکشی، ناودان‌ها، لوله‌های خروجی، فلاشینگ‌ها، همپوشانی‌ها، نفوذها، جزئیات لبه و توالی نصب پیش از آغاز کار سقف کاهش می‌یابد.',
      ar: 'يمكن تقليل خطر التسرب عبر مراجعة ميل السقف، ومسارات التصريف، والمزاريب، ومواسير التصريف، والفلاشينغ، والتراكبات، والاختراقات، وتفاصيل الحواف، وتسلسل التركيب قبل بدء أعمال التسقيف.',
      ru: 'Риск протечек можно снизить, заранее проверив уклон крыши, пути водоотвода, желоба, водостоки, примыкания, нахлёсты, проходки, кромки и последовательность монтажа до начала кровельных работ.'
    },
    relatedLinks: ['/systems/standing-seam-zip-tech-roofing', '/resources']
  },
  {
    id: 'what_is_aluminium_cladding',
    category: 'aluminium_cladding',
    question: {
      en: 'What is aluminium cladding used for?',
      fa: 'کلادینگ آلومینیومی برای چه کاربردهایی استفاده می‌شود؟',
      ar: 'فيما تُستخدم كسوة الألمنيوم؟',
      ru: 'Для чего используется алюминиевая облицовка?'
    },
    answer: {
      en: 'Aluminium cladding is used for industrial facades, factory exteriors, architectural metal coverings, entrance volumes, and exterior renovation projects. Quality depends on layout control, fixing details, edge conditions, and installation accuracy.',
      fa: 'کلادینگ آلومینیومی برای نمای صنعتی، پوسته بیرونی کارخانه، پوشش‌های فلزی معماری، حجم‌های ورودی و پروژه‌های بازسازی خارجی استفاده می‌شود. کیفیت آن به کنترل چیدمان، جزئیات فیکسینگ، شرایط لبه و دقت نصب وابسته است.',
      ar: 'تُستخدم كسوة الألمنيوم للواجهات الصناعية، وخارج المصانع، والتغطيات المعدنية المعمارية، والكتل المدخلية، ومشاريع التجديد الخارجي. وتعتمد الجودة على التحكم في التوزيع، وتفاصيل التثبيت، وحالات الحواف، ودقة التركيب.',
      ru: 'Алюминиевая облицовка используется для промышленных фасадов, наружных оболочек заводов, архитектурных металлических покрытий, входных объёмов и проектов наружной реконструкции. Качество зависит от контроля раскладки, деталей крепления, кромок и точности монтажа.'
    },
    relatedLinks: ['/systems/aluminium-cladding-covering']
  },
  {
    id: 'why_cladding_layout_matters',
    category: 'aluminium_cladding',
    question: {
      en: 'Why does facade layout matter in cladding projects?',
      fa: 'چرا چیدمان نما در پروژه‌های کلادینگ مهم است؟',
      ar: 'لماذا يهم توزيع الواجهة في مشاريع الكسوة؟',
      ru: 'Почему раскладка фасада важна в проектах облицовки?'
    },
    answer: {
      en: 'Facade layout controls panel rhythm, joint alignment, opening coordination, edge details, visual consistency, and material waste. Weak layout control can create visible quality problems and execution delays.',
      fa: 'چیدمان نما ریتم پنل، هم‌راستایی درزها، هماهنگی بازشوها، جزئیات لبه، یکنواختی بصری و پرت مصالح را کنترل می‌کند. کنترل ضعیف چیدمان می‌تواند مشکل کیفیت قابل‌مشاهده و تاخیر اجرایی ایجاد کند.',
      ar: 'يتحكم توزيع الواجهة في إيقاع الألواح، ومحاذاة الوصلات، وتنسيق الفتحات، وتفاصيل الحواف، والاتساق البصري، وهدر المواد. ويمكن أن يؤدي ضعف التحكم في التوزيع إلى مشكلات جودة ظاهرة وتأخير في التنفيذ.',
      ru: 'Раскладка фасада определяет ритм панелей, выравнивание швов, координацию проёмов, узлы кромок, визуальную целостность и отходы материала. Слабый контроль раскладки приводит к заметным проблемам качества и задержкам выполнения.'
    },
    relatedLinks: ['/systems/aluminium-cladding-covering']
  },
  {
    id: 'what_affects_cladding_cost',
    category: 'procurement_cost',
    question: {
      en: 'What affects aluminium cladding cost?',
      fa: 'چه عواملی بر هزینه کلادینگ آلومینیومی تاثیر می‌گذارند؟',
      ar: 'ما العوامل التي تؤثر على تكلفة كسوة الألمنيوم؟',
      ru: 'Что влияет на стоимость алюминиевой облицовки?'
    },
    answer: {
      en: 'Cladding cost depends on material type, panel size, fixing system, facade geometry, openings, edge details, waste percentage, substructure needs, and installation complexity.',
      fa: 'هزینه کلادینگ به نوع متریال، ابعاد پنل، سیستم فیکسینگ، هندسه نما، بازشوها، جزئیات لبه، درصد پرت، نیاز به زیرسازی و پیچیدگی نصب وابسته است.',
      ar: 'تعتمد تكلفة الكسوة على نوع المادة، وحجم اللوح، ونظام التثبيت، وهندسة الواجهة، والفتحات، وتفاصيل الحواف، ونسبة الهدر، واحتياجات الهيكل الفرعي، وتعقيد التركيب.',
      ru: 'Стоимость облицовки зависит от типа материала, размера панелей, системы крепления, геометрии фасада, проёмов, кромок, процента отходов, необходимости подсистемы и сложности монтажа.'
    },
    relatedLinks: ['/contact']
  },
  {
    id: 'how_request_quote',
    category: 'rfq_contact',
    question: {
      en: 'How can I request a quotation or technical consultation?',
      fa: 'چگونه می‌توانم درخواست پیش‌فاکتور یا مشاوره فنی بدهم؟',
      ar: 'كيف أطلب عرض سعر أو استشارة فنية؟',
      ru: 'Как запросить коммерческое предложение или техническую консультацию?'
    },
    answer: {
      en: 'You can use the RFQ form, call SIPANEL, send an email, or contact the team through WhatsApp. It is best to include project type, location, estimated area, project stage, and any drawings if available.',
      fa: 'می‌توانید از فرم RFQ استفاده کنید، با SIPANEL تماس بگیرید، ایمیل ارسال کنید یا از طریق واتساپ ارتباط بگیرید. بهتر است نوع پروژه، موقعیت، متراژ تقریبی، مرحله پروژه و در صورت وجود، نقشه‌ها را ارسال کنید.',
      ar: 'يمكنك استخدام نموذج طلب العرض، أو الاتصال بـ SIPANEL، أو إرسال بريد إلكتروني، أو التواصل عبر واتساب. من الأفضل تضمين نوع المشروع، والموقع، والمساحة التقديرية، ومرحلة المشروع، وأي رسومات متاحة.',
      ru: 'Вы можете использовать форму RFQ, позвонить в SIPANEL, отправить письмо или связаться через WhatsApp. Лучше указать тип проекта, местоположение, примерную площадь, стадию проекта и, если есть, чертежи.'
    },
    relatedLinks: ['/contact']
  },
  {
    id: 'what_info_for_rfq',
    category: 'rfq_contact',
    question: {
      en: 'What information should I send for RFQ?',
      fa: 'برای RFQ چه اطلاعاتی باید ارسال کنم؟',
      ar: 'ما المعلومات التي ينبغي إرسالها لطلب العرض؟',
      ru: 'Какие данные отправить для RFQ?'
    },
    answer: {
      en: 'Send your name, company, phone, project type, location, estimated area, project stage, main concern, and any available drawings or files. This helps the engineering team review the request more accurately.',
      fa: 'نام، شرکت، شماره تماس، نوع پروژه، موقعیت، متراژ تقریبی، مرحله پروژه، دغدغه اصلی و هر نقشه یا فایل موجود را ارسال کنید. این اطلاعات به تیم مهندسی کمک می‌کند درخواست را دقیق‌تر بررسی کند.',
      ar: 'أرسل اسمك، واسم الشركة، ورقم الهاتف، ونوع المشروع، والموقع، والمساحة التقديرية، ومرحلة المشروع، والمشكلة الرئيسية، وأي رسومات أو ملفات متاحة. هذا يساعد فريق الهندسة على مراجعة الطلب بدقة أكبر.',
      ru: 'Отправьте имя, компанию, телефон, тип проекта, местоположение, ориентировочную площадь, стадию проекта, основной вопрос и любые доступные чертежи или файлы. Это помогает инженерной команде точнее оценить запрос.'
    },
    relatedLinks: ['/contact']
  },
  {
    id: 'can_upload_drawings',
    category: 'rfq_contact',
    question: {
      en: 'Can I send drawings or project files?',
      fa: 'آیا می‌توانم نقشه یا فایل پروژه ارسال کنم؟',
      ar: 'هل يمكنني إرسال الرسومات أو ملفات المشروع؟',
      ru: 'Можно ли отправить чертежи или файлы проекта?'
    },
    answer: {
      en: 'Yes. The RFQ form can support optional uploads such as PDF, JPG, PNG, and DWG files if backend file upload is enabled securely.',
      fa: 'بله. فرم RFQ می‌تواند بارگذاری اختیاری فایل‌هایی مانند PDF، JPG، PNG و DWG را پشتیبانی کند، اگر بارگذاری سمت سرور به‌صورت امن فعال شود.',
      ar: 'نعم. يمكن لنموذج طلب العرض دعم رفع اختياري لملفات مثل PDF وJPG وPNG وDWG إذا تم تفعيل رفع الملفات في الخلفية بشكل آمن.',
      ru: 'Да. Форма RFQ может поддерживать необязательную загрузку PDF, JPG, PNG и DWG, если загрузка файлов на бэкенде будет безопасно включена.'
    },
    relatedLinks: ['/contact']
  }
] as const satisfies ReadonlyArray<{
  id: string;
  category: FaqCategoryId;
  question: FaqLocalizedText;
  answer: FaqLocalizedText;
  relatedLinks: string[];
}>;

const localeCopy: Record<Locale, Omit<FaqLocaleContent, 'categories' | 'items' | 'relatedServices' | 'relatedResources'>> = {
  en: {
    seo: {
      title: 'FAQ | SIPANEL Industrial Panel, Roofing & Cladding Questions',
      metaDescription:
        'Find answers about SIPANEL sandwich panel systems, Standing Seam roofing, aluminium cladding, waterproofing, shop drawings, procurement, and industrial envelope execution.',
      h1: 'Industrial Panel, Roofing & Cladding Questions.'
    },
    hero: {
      eyebrow: 'Technical FAQ',
      subheadline:
        'Clear answers about sandwich panel systems, Standing Seam and ZIP Tech roofing, aluminium cladding, waterproofing logic, shop drawings, procurement, and controlled industrial execution.',
      primaryCta: 'Request Technical Consultation',
      secondaryCta: 'Explore Systems',
      panelTitle: 'Engineering-first FAQ',
      panelText: 'Direct answers about panels, roofing, cladding, procurement, and project risk before the RFQ stage.'
    },
    filters: {
      title: 'Search and filter by technical topic',
      searchLabel: 'Search questions',
      searchPlaceholder: 'Search by keyword, system, or topic',
      allLabel: 'All',
      clearLabel: 'Clear filters',
      expandAllLabel: 'Expand all',
      collapseAllLabel: 'Collapse all',
      resultsLabel: 'questions',
      emptyTitle: 'No questions match this filter.',
      emptyText: 'Try a different keyword or select another technical category.'
    },
    conversionCta: {
      headline: 'Didn’t Find the Technical Answer You Need?',
      text:
        'Send your project details and SIPANEL can review the system, risk points, procurement needs, or execution conditions.',
      primaryCta: 'Request Technical Consultation',
      secondaryCta: 'Contact via WhatsApp',
      tertiaryCta: 'Call SIPANEL'
    },
    itemsTitle: 'Questions and answers',
    itemsIntro: 'Short, technical answers. Expand only the items you need.'
  },
  fa: {
    seo: {
      title: 'FAQ | پرسش‌های صنعتی SIPANEL درباره پنل، سقف و کلادینگ',
      metaDescription:
        'پاسخ سوالات درباره سیستم‌های پنل ساندویچی SIPANEL، سقف Standing Seam، کلادینگ آلومینیومی، آب‌بندی، شاپ‌دراوینگ، تامین و اجرای پوسته صنعتی را پیدا کنید.',
      h1: 'Industrial Panel, Roofing & Cladding Questions.'
    },
    hero: {
      eyebrow: 'سوالات فنی',
      subheadline:
        'پاسخ‌های روشن درباره سیستم‌های پنل ساندویچی، سقف Standing Seam و ZIP Tech، کلادینگ آلومینیومی، منطق آب‌بندی، شاپ‌دراوینگ، تامین و اجرای کنترل‌شده صنعتی.',
      primaryCta: 'درخواست مشاوره فنی',
      secondaryCta: 'مشاهده سیستم‌ها',
      panelTitle: 'پرسش‌وپاسخ مهندسی‌محور',
      panelText: 'پاسخ‌های مستقیم درباره پنل، سقف، کلادینگ، تامین و ریسک پروژه پیش از مرحله RFQ.'
    },
    filters: {
      title: 'جست‌وجو و فیلتر بر اساس موضوع فنی',
      searchLabel: 'جست‌وجوی سوالات',
      searchPlaceholder: 'جست‌وجو با کلمه کلیدی، سیستم یا موضوع',
      allLabel: 'همه',
      clearLabel: 'پاک‌کردن فیلترها',
      expandAllLabel: 'باز کردن همه',
      collapseAllLabel: 'بستن همه',
      resultsLabel: 'سوال',
      emptyTitle: 'هیچ سوالی با این فیلتر پیدا نشد.',
      emptyText: 'یک کلمه کلیدی دیگر امتحان کنید یا دسته فنی دیگری را انتخاب کنید.'
    },
    conversionCta: {
      headline: 'اگر پاسخ فنی موردنیازتان را پیدا نکردید',
      text: 'جزئیات پروژه را ارسال کنید تا SIPANEL سیستم، نقاط ریسک، نیازهای تامین یا شرایط اجرا را بررسی کند.',
      primaryCta: 'درخواست مشاوره فنی',
      secondaryCta: 'تماس از طریق واتساپ',
      tertiaryCta: 'تماس با SIPANEL'
    },
    itemsTitle: 'پرسش و پاسخ',
    itemsIntro: 'پاسخ‌های کوتاه و فنی. فقط موارد موردنیاز را باز کنید.'
  },
  ar: {
    seo: {
      title: 'FAQ | أسئلة SIPANEL حول الألواح والأسقف والكسوة',
      metaDescription:
        'اعثر على إجابات حول أنظمة ألواح SIPANEL، وأسقف Standing Seam، وكسوة الألمنيوم، والعزل المائي، والرسومات التنفيذية، والمشتريات، وتنفيذ الغلاف الصناعي.',
      h1: 'Industrial Panel, Roofing & Cladding Questions.'
    },
    hero: {
      eyebrow: 'الأسئلة الفنية',
      subheadline:
        'إجابات واضحة حول أنظمة ألواح الساندويش، وأسقف Standing Seam وZIP Tech، وكسوة الألمنيوم، ومنطق العزل المائي، والرسومات التنفيذية، والمشتريات، والتنفيذ الصناعي المنضبط.',
      primaryCta: 'طلب استشارة فنية',
      secondaryCta: 'عرض الأنظمة',
      panelTitle: 'أسئلة وأجوبة هندسية',
      panelText: 'إجابات مباشرة عن الألواح والأسقف والكسوة والمشتريات ومخاطر المشروع قبل مرحلة طلب العرض.'
    },
    filters: {
      title: 'البحث والتصفية حسب الموضوع الفني',
      searchLabel: 'البحث في الأسئلة',
      searchPlaceholder: 'ابحث بالكلمة المفتاحية أو النظام أو الموضوع',
      allLabel: 'الكل',
      clearLabel: 'مسح المرشحات',
      expandAllLabel: 'توسيع الكل',
      collapseAllLabel: 'طيّ الكل',
      resultsLabel: 'سؤال',
      emptyTitle: 'لا توجد أسئلة مطابقة لهذا التصفية.',
      emptyText: 'جرّب كلمة مختلفة أو اختر فئة فنية أخرى.'
    },
    conversionCta: {
      headline: 'إذا لم تجد الإجابة الفنية التي تحتاجها',
      text: 'أرسل تفاصيل مشروعك حتى تراجع SIPANEL النظام ونقاط المخاطر واحتياجات المشتريات أو ظروف التنفيذ.',
      primaryCta: 'طلب استشارة فنية',
      secondaryCta: 'التواصل عبر واتساب',
      tertiaryCta: 'الاتصال بـ SIPANEL'
    },
    itemsTitle: 'الأسئلة والإجابات',
    itemsIntro: 'إجابات قصيرة وفنية. افتح فقط البنود التي تحتاجها.'
  },
  ru: {
    seo: {
      title: 'FAQ | Вопросы SIPANEL по панелям, кровле и облицовке',
      metaDescription:
        'Найдите ответы о системах SIPANEL из сэндвич-панелей, кровле Standing Seam, алюминиевой облицовке, гидроизоляции, рабочих чертежах, закупках и выполнении промышленной оболочки.',
      h1: 'Industrial Panel, Roofing & Cladding Questions.'
    },
    hero: {
      eyebrow: 'Технические вопросы',
      subheadline:
        'Понятные ответы о сэндвич-панелях, кровле Standing Seam и ZIP Tech, алюминиевой облицовке, логике гидроизоляции, рабочих чертежах, закупках и контролируемом промышленном выполнении.',
      primaryCta: 'Запросить техническую консультацию',
      secondaryCta: 'Посмотреть системы',
      panelTitle: 'FAQ с инженерным подходом',
      panelText: 'Прямые ответы о панелях, кровле, облицовке, закупках и рисках проекта до стадии RFQ.'
    },
    filters: {
      title: 'Поиск и фильтрация по технической теме',
      searchLabel: 'Поиск вопросов',
      searchPlaceholder: 'Искать по ключевому слову, системе или теме',
      allLabel: 'Все',
      clearLabel: 'Сбросить фильтры',
      expandAllLabel: 'Развернуть все',
      collapseAllLabel: 'Свернуть все',
      resultsLabel: 'вопросов',
      emptyTitle: 'По этому фильтру вопросов не найдено.',
      emptyText: 'Попробуйте другой запрос или выберите другую техническую категорию.'
    },
    conversionCta: {
      headline: 'Не нашли нужный технический ответ?',
      text: 'Отправьте данные проекта, и SIPANEL сможет проверить систему, риски, закупки или условия выполнения.',
      primaryCta: 'Запросить техническую консультацию',
      secondaryCta: 'Связаться через WhatsApp',
      tertiaryCta: 'Позвонить в SIPANEL'
    },
    itemsTitle: 'Вопросы и ответы',
    itemsIntro: 'Короткие технические ответы. Открывайте только нужные пункты.'
  }
};

function localizeText(text: FaqLocalizedText, locale: Locale) {
  return text[locale];
}

function localizeInternalHref(locale: Locale, href: string) {
  if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href;
  }

  return getLocalizedPath(locale, href);
}

function getRelatedLinkLabel(locale: Locale, href: string) {
  const labels: Record<Locale, Record<string, string>> = {
    en: {
      '/systems/sandwich-panel-systems': 'Sandwich Panel Systems',
      '/systems/standing-seam-zip-tech-roofing': 'Standing Seam Roofing',
      '/systems/aluminium-cladding-covering': 'Aluminium Cladding',
      '/systems/daylighting-transparent-roofing': 'Daylighting & Transparent Roofing',
      '/solutions/industrial-envelope-systems': 'Industrial Envelope Systems',
      '/solutions/panel-material-optimization': 'Panel Material Optimization',
      '/solutions/shop-drawing-review-panel-projects': 'Shop Drawing Review',
      '/solutions/industrial-roof-leakage-prevention': 'Roof Leakage Prevention',
      '/contact': 'Contact / RFQ',
      '/resources': 'Engineering Resources',
      '/systems': 'Systems overview',
      '/about': 'About page pending'
    },
    fa: {
      '/systems/sandwich-panel-systems': 'سیستم‌های پنل ساندویچی',
      '/systems/standing-seam-zip-tech-roofing': 'سقف Standing Seam',
      '/systems/aluminium-cladding-covering': 'کلادینگ آلومینیومی',
      '/systems/daylighting-transparent-roofing': 'نورگیرها و پوشش‌های شفاف',
      '/solutions/industrial-envelope-systems': 'سیستم‌های پوسته صنعتی',
      '/solutions/panel-material-optimization': 'بهینه‌سازی متریال پنل',
      '/solutions/shop-drawing-review-panel-projects': 'بازبینی شاپ‌دراوینگ',
      '/solutions/industrial-roof-leakage-prevention': 'پیشگیری از نشتی سقف',
      '/contact': 'تماس / RFQ',
      '/resources': 'منابع مهندسی',
      '/systems': 'نمای کلی سیستم‌ها',
      '/about': 'صفحه درباره در انتظار'
    },
    ar: {
      '/systems/sandwich-panel-systems': 'أنظمة ألواح الساندويش',
      '/systems/standing-seam-zip-tech-roofing': 'سقف Standing Seam',
      '/systems/aluminium-cladding-covering': 'كسوة الألمنيوم',
      '/systems/daylighting-transparent-roofing': 'أنظمة الإضاءة الطبيعية والتغطيات الشفافة',
      '/solutions/industrial-envelope-systems': 'أنظمة الغلاف الصناعي',
      '/solutions/panel-material-optimization': 'تحسين مواد الألواح',
      '/solutions/shop-drawing-review-panel-projects': 'مراجعة الرسومات التنفيذية',
      '/solutions/industrial-roof-leakage-prevention': 'منع تسرب السقف',
      '/contact': 'التواصل / طلب العرض',
      '/resources': 'الموارد الهندسية',
      '/systems': 'نظرة عامة على الأنظمة',
      '/about': 'صفحة من نحن قيد الإنشاء'
    },
    ru: {
      '/systems/sandwich-panel-systems': 'Сэндвич-панели',
      '/systems/standing-seam-zip-tech-roofing': 'Кровля Standing Seam',
      '/systems/aluminium-cladding-covering': 'Алюминиевая облицовка',
      '/systems/daylighting-transparent-roofing': 'Системы естественного освещения',
      '/solutions/industrial-envelope-systems': 'Системы промышленной оболочки',
      '/solutions/panel-material-optimization': 'Оптимизация материалов панелей',
      '/solutions/shop-drawing-review-panel-projects': 'Проверка рабочих чертежей',
      '/solutions/industrial-roof-leakage-prevention': 'Предотвращение протечек кровли',
      '/contact': 'Контакт / RFQ',
      '/resources': 'Инженерные ресурсы',
      '/systems': 'Обзор систем',
      '/about': 'Страница «О нас» в разработке'
    }
  };

  return labels[locale][href] ?? href;
}

function buildLocaleContent(locale: Locale): FaqLocaleContent {
  const copy = localeCopy[locale];

  return {
    seo: copy.seo,
    hero: copy.hero,
    filters: copy.filters,
    itemsTitle: copy.itemsTitle,
    itemsIntro: copy.itemsIntro,
    categories: (faqSystemSpec.page_sections.find((section) => section.id === 'faq_search_and_filters')?.categories ?? []).map((category) => ({
      id: category.id as FaqCategoryId,
      label: categoryLabels[category.id as FaqCategoryId][locale]
    })),
    items: faqItems.map((item) => ({
      id: item.id,
      category: item.category,
      question: localizeText(item.question, locale),
      answer: localizeText(item.answer, locale),
      relatedLinks: item.relatedLinks.map((href) => ({href, pending: href === '/about' || href === '/systems'}))
    })),
    conversionCta: copy.conversionCta,
    relatedServices: {
      title: {
        en: 'Related Industrial Envelope Systems',
        fa: 'سیستم‌های مرتبط پوسته صنعتی',
        ar: 'أنظمة الغلاف الصناعي ذات الصلة',
        ru: 'Связанные системы промышленной оболочки'
      }[locale],
      cards: [
        {title: getRelatedLinkLabel(locale, '/systems/sandwich-panel-systems'), href: '/systems/sandwich-panel-systems'},
        {title: getRelatedLinkLabel(locale, '/systems/standing-seam-zip-tech-roofing'), href: '/systems/standing-seam-zip-tech-roofing'},
        {title: getRelatedLinkLabel(locale, '/systems/aluminium-cladding-covering'), href: '/systems/aluminium-cladding-covering'},
        {title: getRelatedLinkLabel(locale, '/systems/daylighting-transparent-roofing'), href: '/systems/daylighting-transparent-roofing'}
      ]
    },
    relatedResources: {
      title: {
        en: 'Related Engineering Resources',
        fa: 'منابع مهندسی مرتبط',
        ar: 'الموارد الهندسية ذات الصلة',
        ru: 'Связанные инженерные ресурсы'
      }[locale],
      cards: [
        {
          title: {
            en: 'Sandwich Panel Selection Guide',
            fa: 'راهنمای انتخاب پنل ساندویچی',
            ar: 'دليل اختيار ألواح الساندويش',
            ru: 'Руководство по выбору сэндвич-панелей'
          }[locale],
          description: {
            en: 'Pending resource in the Engineering Resource Hub.',
            fa: 'منبع در انتظار در مرکز منابع مهندسی.',
            ar: 'مورد قيد الانتظار في مركز الموارد الهندسية.',
            ru: 'Материал ожидает подтверждения в инженерном центре ресурсов.'
          }[locale],
          href: '/resources',
          status: 'hub_resource_pending'
        },
        {
          title: {
            en: 'Industrial Roof Leakage Prevention Checklist',
            fa: 'چک‌لیست پیشگیری از نشتی سقف صنعتی',
            ar: 'قائمة منع تسرب الأسقف الصناعية',
            ru: 'Чек-лист предотвращения протечек промышленной кровли'
          }[locale],
          description: {
            en: 'Pending resource in the Engineering Resource Hub.',
            fa: 'منبع در انتظار در مرکز منابع مهندسی.',
            ar: 'مورد قيد الانتظار في مركز الموارد الهندسية.',
            ru: 'Материал ожидает подтверждения в инженерном центре ресурсов.'
          }[locale],
          href: '/resources',
          status: 'hub_resource_pending'
        },
        {
          title: {
            en: 'Shop Drawing Review Guide',
            fa: 'راهنمای بازبینی شاپ‌دراوینگ',
            ar: 'دليل مراجعة الرسومات التنفيذية',
            ru: 'Руководство по проверке рабочих чертежей'
          }[locale],
          description: {
            en: 'Pending resource in the Engineering Resource Hub.',
            fa: 'منبع در انتظار در مرکز منابع مهندسی.',
            ar: 'مورد قيد الانتظار في مركز الموارد الهندسية.',
            ru: 'Материал ожидает подтверждения в инженерном центре ресурсов.'
          }[locale],
          href: '/resources',
          status: 'hub_resource_pending'
        }
      ]
    }
  };
}

export const faqPageData: FaqPageData = {
  routes: routeMap,
  contact: productionContactInfo,
  localeContent: Object.fromEntries(locales.map((locale) => [locale, buildLocaleContent(locale)])) as Record<
    Locale,
    FaqLocaleContent
  >
};

export function getFaqPageData() {
  return faqPageData;
}

export function getFaqPageMetadata(locale: Locale): Metadata {
  const content = faqPageData.localeContent[locale];

  return buildPageMetadata({
    locale,
    title: content.seo.title,
    description: content.seo.metaDescription,
    routes: faqPageData.routes
  });
}

export function getFaqBreadcrumbLabels(locale: Locale) {
  return {
    home: {
      en: 'Home',
      fa: 'خانه',
      ar: 'الرئيسية',
      ru: 'Главная'
    }[locale],
    faq: {
      en: 'FAQ',
      fa: 'سوالات متداول',
      ar: 'الأسئلة الشائعة',
      ru: 'FAQ'
    }[locale]
  };
}

export function buildFaqSchema(locale: Locale) {
  const content = faqPageData.localeContent[locale];

  return buildFaqPageSchema(
    locale,
    `${faqPageData.routes[locale]}#faq`,
    content.items.map((item) => ({question: item.question, answer: item.answer}))
  );
}

export function buildBreadcrumbSchema(locale: Locale) {
  const labels = getFaqBreadcrumbLabels(locale);

  return buildBreadcrumbListSchema(locale, `${faqPageData.routes[locale]}#breadcrumb`, [
    {name: labels.home, item: `/${locale}`},
    {name: labels.faq, item: faqPageData.routes[locale]}
  ]);
}

export function buildOrganizationSchema(locale: Locale) {
  return buildSharedOrganizationSchema(locale, `${faqPageData.routes[locale]}#organization`);
}

export function getFaqRelatedLinkLabel(locale: Locale, href: string) {
  return getRelatedLinkLabel(locale, href);
}

export function getFaqRelatedLinkHref(locale: Locale, href: string) {
  return localizeInternalHref(locale, href);
}
