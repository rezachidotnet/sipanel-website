import engineeringResourceHubSpec from '@/specs/pages/engineering_resource_hub.json';
import type {StaticImageData} from 'next/image';
import {locales, type Locale} from '@/i18n/routing';
import sandwichPanelCover from '@/assets/systems/sandwich-panel/cover-desktop.webp';
import aluminiumCladdingCover from '@/assets/systems/aluminium-claddin/cover-desktop.webp';
import standingSeamCover from '@/assets/systems/standing-seam/cover-desktop.webp';
import roofLeakagePreview from '@/assets/resources/roof-leakage-prevention-checklist.webp';
import sandwichPanelSelectionPreview from '@/assets/resources/sandwich-panel-selection-guide.webp';
import shopDrawingReviewPreview from '@/assets/resources/shop-drawing-review-guide.webp';
import standingSeamNotesPreview from '@/assets/resources/standing-seam-roof-detail-notes.webp';
import aluminiumCladdingChecklistPreview from '@/assets/resources/aluminium-cladding-layout-checklist.webp';
import mtoProcurementPreview from '@/assets/resources/mto-procurement-planning-sheet.webp';
import {getCaseStudyPageData, getCaseStudyCardMeta} from '@/lib/case-studies/case-study-pages';
import daylightingCover from '@/assets/systems/transparent-roofing/cover-desktop.webp';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';
import {buildPageMetadata} from '@/lib/seo/metadata';

type ResourceCategoryId =
  | 'technical_guides'
  | 'execution_details'
  | 'procurement_and_supply'
  | 'case_studies'
  | 'datasheets';

type ResourceTypeId = 'pdf' | 'guide' | 'checklist' | 'cad' | 'datasheet' | 'case_study' | 'article';

type ResourceHubSpec = {
  route: Record<Locale, string>;
  seo: {
    primary_keyword: string;
    title: string;
    meta_description: string;
    h1: string;
  };
  page_sections: Array<
    | {
        id: 'resource_hub_hero';
        content: {
          eyebrow: string;
          h1: string;
          subheadline: string;
          primary_cta: string;
          secondary_cta: string;
          trust_microcopy: string;
        };
        visual: {
          fallback: string;
        };
      }
    | {
        id: 'resource_categories';
        title: string;
        categories: Array<{
          id: ResourceCategoryId;
          label: string;
        }>;
      }
    | {
        id: 'featured_resources';
        title: string;
        resources: Array<{
          id: string;
          type: ResourceTypeId;
          category: ResourceCategoryId;
          title: string;
          description: string;
          difficulty: string;
          read_time: string;
          cta: string;
          lead_capture: boolean;
        }>;
      }
    | {
        id: 'engineering_learning_paths';
      }
    | {
        id: 'technical_proof_library';
      }
    | {
        id: 'resource_lead_capture';
        title: string;
        form_fields: string[];
        cta: string;
      }
    | {
        id: 'related_services';
        title: string;
        cards: Array<{
          title: string;
          link: string;
        }>;
      }
    | {
        id: 'conversion_cta';
        headline: string;
        text: string;
        primary_cta: string;
        secondary_cta: string;
      }
  >;
};

export type ResourceHubCategory = {
  id: ResourceCategoryId;
  label: string;
  description: string;
};

export type ResourcePreviewMeta = {
  pageCount?: number;
  fileSize?: string;
  readingTime?: string;
  format?: string;
  updatedAt?: string;
  image?: StaticImageData;
  imageAlt?: Record<Locale, string>;
};

export type ResourceAuthorityMeta = {
  authorName?: string;
  authorRole?: string;
  reviewedBy?: string;
  reviewedByRole?: string;
};

export type RelatedProject = {
  slug: string;
  name: string;
  location: string;
  systemType: string;
  reason?: string;
  href: string;
  image?: StaticImageData;
  area?: string;
};

export type ResourceDetailContent = {
  title: string;
  summary: string;
  seoDescription: string;
  introduction: string;
  useWhen: string[];
  keyPoints: Array<{title: string; description: string}>;
  commonMistakes: Array<{title: string; description: string}>;
};

export type ResourceHubCard = {
  id: string;
  slug: string;
  type: ResourceTypeId;
  category: ResourceCategoryId;
  title: string;
  description: string;
  difficulty: string;
  readTime: string;
  cta: string;
  leadCapture: boolean;
  assetStatus: 'pending_resource_file' | 'available';
  downloadPath?: string;
  leadCaptureStatus: 'pending_lead_capture' | 'not_required';
  relatedServiceHref: string;
  preview: ResourcePreviewMeta;
  relatedProjectSlugs: string[];
  authorName?: string;
  authorRole?: string;
  reviewedBy?: string;
  reviewedByRole?: string;
  updatedAt?: string;
  recommendedOrder: number;
  sortDate: string;
  sortReadTime: number;
};

export type ResourceDetailPageData = {
  resource: ResourceHubCard;
  categoryLabel: string;
  route: Record<Locale, string>;
  breadcrumbs: Array<{
    label: string;
    href: string;
  }>;
  relatedSystems: RelatedSystem[];
  relatedResources: ResourceHubCard[];
  context: {
    title: string;
    description: string;
    points: string[];
  };
  detailContent: ResourceDetailContent;
  previewSections: Array<{
    title: string;
    description: string;
  }>;
  relatedProjects: RelatedProject[];
  conversionCta: ResourceHubLocaleContent['conversionCta'];
  leadCapture: ResourceHubLocaleContent['leadCapture'];
  ui: ResourceHubUiLabels;
};

export type ResourceHubLocaleSeo = {
  title: string;
  meta_description: string;
  detailSuffix: string;
};

export type ResourceHubLocaleContent = {
  seo: ResourceHubSpec['seo'];
  localeSeo: ResourceHubLocaleSeo;
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
    primaryCta: string;
    primaryCtaHref: string;
    primaryCtaDisabled?: boolean;
    secondaryCta: string;
    secondaryCtaHref: string;
    trustMicrocopy: string;
    visualFallback: string;
  };
  allResourcesLabel: string;
  ui: ResourceHubUiLabels;
  categories: ResourceHubCategory[];
  featuredResources: ResourceHubCard[];
  leadCapture: {
    title: string;
    fields: string[];
    cta: string;
  };
  relatedServices: Array<{
    title: string;
    href: string;
  }>;
  faq: {
    title: string;
    items: Array<{question: string; answer: string}>;
  };
  conversionCta: {
    headline: string;
    text: string;
    primary_cta: string;
    secondary_cta: string;
  };
  relatedLinks: Array<{
    label: string;
    href: string;
  }>;
};

export type ResourceHubPageData = {
  routes: Record<Locale, string>;
  localeContent: Record<Locale, ResourceHubLocaleContent>;
};

const resourceHubSpec = engineeringResourceHubSpec as ResourceHubSpec;

const resourceTypeLabels: Record<Locale, Record<ResourceTypeId, string>> = {
  en: {pdf: 'PDF', guide: 'Guide', checklist: 'Checklist', cad: 'CAD', datasheet: 'Datasheet', case_study: 'Case Study', article: 'Article'},
  fa: {pdf: 'PDF', guide: 'راهنما', checklist: 'چک\u200cلیست', cad: 'CAD', datasheet: 'دیتاشیت', case_study: 'مطالعه موردی', article: 'مقاله'},
  ar: {pdf: 'PDF', guide: 'دليل', checklist: 'قائمة تحقق', cad: 'CAD', datasheet: 'نشرة بيانات', case_study: 'دراسة حالة', article: 'مقال'},
  ru: {pdf: 'PDF', guide: 'Руководство', checklist: 'Чек-лист', cad: 'CAD', datasheet: 'Технический паспорт', case_study: 'Кейс', article: 'Статья'}
};

const difficultyLabels: Record<Locale, Record<string, string>> = {
  en: {Practical: 'Practical', Technical: 'Technical', Advanced: 'Advanced'},
  fa: {Practical: 'کاربردی', Technical: 'فنی', Advanced: 'پیشرفته'},
  ar: {Practical: 'عملي', Technical: 'فني', Advanced: 'متقدم'},
  ru: {Practical: 'Практический', Technical: 'Технический', Advanced: 'Продвинутый'}
};

const ctaLabels: Record<Locale, Record<string, string>> = {
  en: {'Download Checklist': 'Download Checklist', 'Download Guide': 'Download Guide', 'Read Technical Note': 'Read Technical Note', 'Download Worksheet': 'Download Worksheet'},
  fa: {'Download Checklist': 'دانلود چک\u200cلیست', 'Download Guide': 'دانلود راهنما', 'Read Technical Note': 'مطالعه یادداشت فنی', 'Download Worksheet': 'دانلود کاربرگ'},
  ar: {'Download Checklist': 'تحميل القائمة', 'Download Guide': 'تحميل الدليل', 'Read Technical Note': 'قراءة الملاحظة الفنية', 'Download Worksheet': 'تحميل ورقة العمل'},
  ru: {'Download Checklist': 'Скачать чек-лист', 'Download Guide': 'Скачать руководство', 'Read Technical Note': 'Читать техзаметку', 'Download Worksheet': 'Скачать лист'}
};

const resourcePreviewData: Record<string, ResourcePreviewMeta> = {
  roof_leakage_prevention_checklist: {
    pageCount: 8,
    fileSize: '1.2 MB',
    readingTime: '8 min',
    format: 'PDF',
    updatedAt: '2026-03',
    image: roofLeakagePreview,
    imageAlt: {
      en: 'Preview of the industrial roof leakage prevention checklist',
      fa: 'پیش‌نمایش چک‌لیست پیشگیری از نشتی سقف صنعتی',
      ar: 'معاينة قائمة منع تسرب الأسقف الصناعية',
      ru: 'Превью чек-листа предотвращения протечек промышленной кровли'
    }
  },
  sandwich_panel_selection_guide: {
    pageCount: 14,
    fileSize: '2.4 MB',
    readingTime: '10 min',
    format: 'PDF',
    updatedAt: '2026-03',
    image: sandwichPanelSelectionPreview,
    imageAlt: {
      en: 'Preview of the sandwich panel selection guide',
      fa: 'پیش‌نمایش راهنمای انتخاب ساندویچ پانل',
      ar: 'معاينة دليل اختيار ألواح الساندويتش',
      ru: 'Превью руководства по выбору сэндвич-панелей'
    }
  },
  shop_drawing_review_guide: {
    pageCount: 12,
    fileSize: '1.8 MB',
    readingTime: '12 min',
    format: 'PDF',
    updatedAt: '2026-02',
    image: shopDrawingReviewPreview,
    imageAlt: {
      en: 'Shop drawing preview for panel project review',
      fa: 'پیش‌نمایش شاپ دراوینگ برای بازبینی پروژه پانل',
      ar: 'معاينة رسومات تنفيذية لمراجعة مشروع الألواح',
      ru: 'Превью рабочих чертежей для проверки панельного проекта'
    }
  },
  standing_seam_roof_detail_notes: {
    pageCount: 6,
    readingTime: '9 min',
    format: 'PDF',
    updatedAt: '2026-03',
    image: standingSeamNotesPreview,
    imageAlt: {
      en: 'Standing seam roof detail preview',
      fa: 'تصویر دیتیل اجرایی سقف ایستادرز',
      ar: 'معاينة تفاصيل سقف قائم الدرزة',
      ru: 'Превью узлов кровли стоячего фальца'
    }
  },
  aluminium_cladding_layout_checklist: {
    pageCount: 7,
    fileSize: '1.1 MB',
    readingTime: '7 min',
    format: 'PDF',
    updatedAt: '2026-02',
    image: aluminiumCladdingChecklistPreview,
    imageAlt: {
      en: 'Preview of the aluminium cladding layout checklist',
      fa: 'پیش‌نمایش چک‌لیست چیدمان کلادینگ آلومینیومی',
      ar: 'معاينة قائمة تخطيط الكلادينج الألومنيوم',
      ru: 'Превью чек-листа раскладки алюминиевой облицовки'
    }
  },
  mto_procurement_planning_sheet: {
    pageCount: 5,
    fileSize: '0.8 MB',
    readingTime: '6 min',
    format: 'PDF',
    updatedAt: '2026-03',
    image: mtoProcurementPreview,
    imageAlt: {
      en: 'Preview of the MTO and procurement planning sheet',
      fa: 'پیش‌نمایش برگه برنامه‌ریزی MTO و خرید',
      ar: 'معاينة ورقة تخطيط MTO والمشتريات',
      ru: 'Превью листа планирования MTO и закупки'
    }
  }
};

const defaultResourceAuthority: Record<Locale, Required<ResourceAuthorityMeta>> = {
  en: {
    authorName: 'SIPANEL Engineering Team',
    authorRole: 'Industrial envelope engineering',
    reviewedBy: 'SIPANEL Engineering Team',
    reviewedByRole: 'Technical review'
  },
  fa: {
    authorName: 'تیم مهندسی SIPANEL',
    authorRole: 'مهندسی پوشش‌های صنعتی',
    reviewedBy: 'تیم مهندسی SIPANEL',
    reviewedByRole: 'بازبینی فنی'
  },
  ar: {
    authorName: 'فريق هندسة SIPANEL',
    authorRole: 'هندسة أغلفة المباني الصناعية',
    reviewedBy: 'فريق هندسة SIPANEL',
    reviewedByRole: 'مراجعة فنية'
  },
  ru: {
    authorName: 'Инженерная команда SIPANEL',
    authorRole: 'Инженерия промышленных ограждающих систем',
    reviewedBy: 'Инженерная команда SIPANEL',
    reviewedByRole: 'Техническая проверка'
  }
};

const resourceAuthorityData: Record<string, Partial<Record<Locale, ResourceAuthorityMeta>>> = {};

const resourceRelatedProjects: Record<string, string[]> = {
  roof_leakage_prevention_checklist: ['shahre-babak-hall', 'andimeshk-stadium'],
  sandwich_panel_selection_guide: ['tabas-railway-facility', 'mahshahr-taxi-parking', 'tiran-gas-station'],
  shop_drawing_review_guide: ['sepehan-flower-market', 'absaar-water-park'],
  standing_seam_roof_detail_notes: ['shahre-babak-hall', 'megaparsmall-atrium'],
  aluminium_cladding_layout_checklist: ['shahr-babak-stadium-entrance', 'parand-city-entrance'],
  mto_procurement_planning_sheet: ['andimeshk-stadium', 'tabas-railway-facility']
};

const resourceProjectReasons: Record<string, Record<string, Record<Locale, string>>> = {
  roof_leakage_prevention_checklist: {
    'shahre-babak-hall': {
      en: 'Curved ZIP roof execution required waterproofing continuity and transition control.',
      fa: 'اجرای سقف ZIP قوسی نیازمند کنترل پیوستگی آب\u200cبندی و دیتیل\u200cهای اتصال بود.',
      ar: 'تطلب تنفيذ سقف ZIP المنحني ضبط استمرارية العزل المائي وتفاصيل الانتقال.',
      ru: 'Криволинейная ZIP-кровля требовала контроля непрерывной гидроизоляции и переходных деталей.'
    },
    'andimeshk-stadium': {
      en: 'Large-span stadium roofing made leakage prevention and drainage logic critical.',
      fa: 'سقف دهانه\u200cبزرگ ورزشگاه، کنترل ریسک نشتی و منطق زهکشی را حیاتی می\u200cکرد.',
      ar: 'جعلت أسقف الاستاد واسعة البحر منع التسرب ومنطق التصريف أمرا حاسما.',
      ru: 'Большепролетная кровля стадиона сделала предотвращение протечек и логику водоотвода критичными.'
    }
  },
  sandwich_panel_selection_guide: {
    'tabas-railway-facility': {
      en: 'Industrial facility requirements shaped panel selection and procurement decisions.',
      fa: 'الزامات یک فضای صنعتی، انتخاب پانل و تصمیم\u200cهای خرید را مشخص کرد.',
      ar: 'حددت متطلبات المنشأة الصناعية اختيار الألواح وقرارات الشراء.',
      ru: 'Требования промышленного объекта определили выбор панелей и закупочные решения.'
    },
    'mahshahr-taxi-parking': {
      en: 'High-traffic roofing needs informed system selection and installation planning.',
      fa: 'نیازهای سقف یک فضای پرتردد، انتخاب سیستم و برنامه نصب را شکل داد.',
      ar: 'أثرت متطلبات سقف مساحة عالية الاستخدام على اختيار النظام وتخطيط التركيب.',
      ru: 'Требования кровли объекта с высокой эксплуатационной нагрузкой повлияли на выбор системы и монтаж.'
    },
    'tiran-gas-station': {
      en: 'Fast-track canopy roofing showed how panel choice affects execution control.',
      fa: 'اجرای سریع سقف جایگاه نشان داد انتخاب پانل چگونه بر کنترل اجرا اثر می\u200cگذارد.',
      ar: 'أظهر تنفيذ سقف المظلة السريع كيف يؤثر اختيار الألواح على ضبط التنفيذ.',
      ru: 'Быстрая кровля навеса показала, как выбор панели влияет на контроль выполнения.'
    }
  },
  shop_drawing_review_guide: {
    'sepehan-flower-market': {
      en: 'Shop drawing coordination reduced layout risk in a large commercial roof.',
      fa: 'هماهنگی نقشه شاپ، ریسک خطای چیدمان را در سقف تجاری بزرگ کاهش داد.',
      ar: 'قلل تنسيق رسومات الشوب دروينغ مخاطر التخطيط في سقف تجاري كبير.',
      ru: 'Координация рабочих чертежей снизила риск раскладки на большой коммерческой кровле.'
    },
    'absaar-water-park': {
      en: 'Complex envelope geometry required careful drawing review before execution.',
      fa: 'هندسه پیچیده پوسته نیازمند بازبینی دقیق نقشه پیش از اجرا بود.',
      ar: 'تطلبت هندسة الغلاف المعقدة مراجعة دقيقة للرسومات قبل التنفيذ.',
      ru: 'Сложная геометрия оболочки требовала тщательной проверки чертежей до выполнения.'
    }
  },
  standing_seam_roof_detail_notes: {
    'shahre-babak-hall': {
      en: 'Curved standing seam details informed roof transition and seam control notes.',
      fa: 'دیتیل\u200cهای سقف ایستادرز قوسی، نکات کنترل اتصال و درز را شکل داد.',
      ar: 'أثرت تفاصيل السقف القائم المنحني على ملاحظات الانتقال والتحكم بالفواصل.',
      ru: 'Детали криволинейной фальцевой кровли легли в основу контроля переходов и швов.'
    },
    'megaparsmall-atrium': {
      en: 'Atrium roof detailing highlighted drainage, seam, and architectural coordination.',
      fa: 'دیتیل سقف آتریوم، هماهنگی زهکشی، درزها و معماری را برجسته کرد.',
      ar: 'أبرزت تفاصيل سقف الأتريوم تنسيق التصريف والفواصل والعمارة.',
      ru: 'Деталировка кровли атриума подчеркнула координацию водоотвода, швов и архитектуры.'
    }
  },
  aluminium_cladding_layout_checklist: {
    'shahr-babak-stadium-entrance': {
      en: 'Curved facade execution required controlled cladding layout and alignment.',
      fa: 'اجرای نمای قوسی نیازمند کنترل چیدمان و هم\u200cراستایی کلادینگ بود.',
      ar: 'تطلب تنفيذ الواجهة المنحنية ضبط تخطيط الكلادينج والمحاذاة.',
      ru: 'Криволинейный фасад требовал контроля раскладки и выравнивания облицовки.'
    },
    'parand-city-entrance': {
      en: 'Gateway cladding made module planning and visual alignment central to execution.',
      fa: 'کلادینگ ورودی شهر، برنامه\u200cریزی مدول و هم\u200cراستایی بصری را محور اجرا کرد.',
      ar: 'جعل كلادينج بوابة المدينة تخطيط الوحدات والمحاذاة البصرية محور التنفيذ.',
      ru: 'Облицовка городских ворот сделала модульное планирование и визуальное выравнивание ключевыми.'
    }
  },
  mto_procurement_planning_sheet: {
    'andimeshk-stadium': {
      en: 'Large project scope required material planning before procurement and execution.',
      fa: 'مقیاس بزرگ پروژه نیازمند برنامه\u200cریزی متریال پیش از خرید و اجرا بود.',
      ar: 'تطلب نطاق المشروع الكبير تخطيط المواد قبل الشراء والتنفيذ.',
      ru: 'Большой масштаб проекта требовал планирования материалов до закупки и выполнения.'
    },
    'tabas-railway-facility': {
      en: 'Industrial scope and sequencing made MTO readiness important before ordering.',
      fa: 'ماهیت صنعتی و توالی اجرا، آماده\u200cسازی MTO را پیش از سفارش مهم کرد.',
      ar: 'جعل النطاق الصناعي وتسلسل التنفيذ جاهزية MTO مهمة قبل الطلب.',
      ru: 'Промышленный масштаб и очередность работ сделали готовность MTO важной до заказа.'
    }
  }
};

type StatLabels = {pages: string; readingTime: string; minutes: string; updated: string};

const resourceDetailContent: Record<string, Record<Locale, ResourceDetailContent>> = {
  roof_leakage_prevention_checklist: {
    en: {
      title: 'Industrial Roof Leakage Prevention Checklist',
      summary: 'A project-stage checklist for reviewing slope, drainage, flashings, penetrations, gutters, and installation risk before roofing starts.',
      seoDescription: 'Checklist for preventing industrial roof leakage by reviewing drainage, flashings, penetrations, gutters, installation sequence, and project risks before execution.',
      introduction: 'Roof leakage usually starts before installation: in the slope logic, drainage capacity, flashing interfaces, and uncoordinated penetrations. This checklist helps project teams review those risks before material ordering and site execution.',
      useWhen: ['Before approving shop drawings for industrial roofs.', 'When a roof has long spans, multiple penetrations, gutters, or mixed systems.', 'Before repair work on an existing roof leakage problem.'],
      keyPoints: [
        {title: 'Drainage path', description: 'Confirm slope, gutter capacity, overflow strategy, and low-point behavior before panels are installed.'},
        {title: 'Penetration control', description: 'Review every skylight, duct, pipe, and equipment base as a waterproofing detail, not only an opening.'},
        {title: 'Flashing sequence', description: 'Check that flashings, closures, sealants, and panel laps follow a buildable installation order.'}
      ],
      commonMistakes: [
        {title: 'Checking panels but not transitions', description: 'Most leakage risk appears at edges, penetrations, gutters, and roof-to-wall interfaces.'},
        {title: 'Leaving drainage review until site work', description: 'Once purlins and gutters are fixed, correcting drainage errors becomes expensive.'}
      ]
    },
    fa: {
      title: 'چک\u200cلیست پیشگیری از نشتی سقف صنعتی',
      summary: 'چک\u200cلیستی برای کنترل شیب، زهکشی، فلاشینگ، نفوذی\u200cها، آبروها و ریسک نصب پیش از شروع اجرای سقف.',
      seoDescription: 'چک\u200cلیست پیشگیری از نشتی سقف صنعتی برای بررسی زهکشی، فلاشینگ، نفوذی\u200cها، آبروها، توالی نصب و ریسک\u200cهای اجرایی پیش از اجرا.',
      introduction: 'نشتی سقف معمولا از مرحله طراحی و هماهنگی شروع می\u200cشود؛ از منطق شیب و ظرفیت زهکشی تا جزئیات فلاشینگ و نفوذی\u200cهای هماهنگ\u200cنشده. این چک\u200cلیست برای بازبینی ریسک\u200cها پیش از سفارش متریال و شروع نصب تدوین شده است.',
      useWhen: ['پیش از تایید نقشه شاپ سقف صنعتی.', 'وقتی سقف دهانه بزرگ، نفوذی متعدد، آبرو یا ترکیب چند سیستم دارد.', 'پیش از تعمیر یا بازطراحی سقفی که مشکل نشتی دارد.'],
      keyPoints: [
        {title: 'مسیر زهکشی', description: 'شیب، ظرفیت آبرو، مسیر سرریز و رفتار نقاط کم\u200cارتفاع باید پیش از نصب پنل کنترل شود.'},
        {title: 'کنترل نفوذی\u200cها', description: 'هر نورگیر، کانال، لوله یا پایه تجهیزات باید به عنوان دیتیل آب\u200cبندی بررسی شود.'},
        {title: 'توالی فلاشینگ', description: 'فلاشینگ، کلوزر، درزبند و همپوشانی پنل باید با ترتیب نصب واقعی سازگار باشد.'}
      ],
      commonMistakes: [
        {title: 'تمرکز فقط روی پنل', description: 'بخش اصلی ریسک نشتی در لبه\u200cها، نفوذی\u200cها، آبروها و اتصال سقف به دیوار ایجاد می\u200cشود.'},
        {title: 'تعویق بررسی زهکشی تا کارگاه', description: 'بعد از تثبیت پرلین و آبرو، اصلاح خطای زهکشی هزینه و تاخیر زیادی ایجاد می\u200cکند.'}
      ]
    },
    ar: {
      title: 'قائمة منع تسرب الأسقف الصناعية',
      summary: 'قائمة تحقق لمراجعة الميل والتصريف والفلاشينغ والاختراقات والمزاريب ومخاطر التركيب قبل بدء أعمال السقف.',
      seoDescription: 'قائمة تحقق لمنع تسرب الأسقف الصناعية عبر مراجعة التصريف والفلاشينغ والاختراقات وتسلسل التركيب قبل التنفيذ.',
      introduction: 'غالبا يبدأ تسرب السقف قبل التركيب، في منطق الميل وسعة التصريف وتفاصيل الفلاشينغ والاختراقات غير المنسقة. تساعد هذه القائمة فرق المشروع على مراجعة المخاطر قبل الطلب والتنفيذ.',
      useWhen: ['قبل اعتماد رسومات التنفيذ للأسقف الصناعية.', 'عند وجود بحور طويلة أو اختراقات متعددة أو مزاريب أو أنظمة مختلطة.', 'قبل إصلاح مشكلة تسرب في سقف قائم.'],
      keyPoints: [
        {title: 'مسار التصريف', description: 'راجع الميل وسعة المزراب ومسار الفائض وسلوك النقاط المنخفضة قبل تركيب الألواح.'},
        {title: 'ضبط الاختراقات', description: 'كل فتحة أو ماسورة أو قاعدة معدات يجب مراجعتها كتفصيل عزل مائي.'},
        {title: 'تسلسل الفلاشينغ', description: 'يجب أن تتوافق الفلاشينغات والمواد السادة وتراكبات الألواح مع ترتيب تركيب قابل للتنفيذ.'}
      ],
      commonMistakes: [
        {title: 'فحص الألواح فقط', description: 'أغلب مخاطر التسرب تظهر عند الحواف والاختراقات والمزاريب واتصال السقف بالجدار.'},
        {title: 'تأجيل التصريف للموقع', description: 'بعد تثبيت المدادات والمزاريب يصبح تصحيح أخطاء التصريف مكلفا.'}
      ]
    },
    ru: {
      title: 'Чек-лист предотвращения протечек промышленной кровли',
      summary: 'Чек-лист для проверки уклона, водоотвода, примыканий, проходок, желобов и монтажных рисков до начала кровельных работ.',
      seoDescription: 'Чек-лист предотвращения протечек промышленной кровли: водоотвод, примыкания, проходки, желоба, последовательность монтажа и риски выполнения.',
      introduction: 'Протечки часто закладываются до монтажа: в логике уклона, пропускной способности водоотвода, примыканиях и несогласованных проходках. Чек-лист помогает проверить эти риски до закупки и работ на площадке.',
      useWhen: ['Перед утверждением рабочих чертежей промышленной кровли.', 'При больших пролетах, множестве проходок, желобах или смешанных системах.', 'Перед ремонтом существующей протечки.'],
      keyPoints: [
        {title: 'Путь водоотвода', description: 'Проверьте уклон, емкость желобов, перелив и поведение низких точек до монтажа панелей.'},
        {title: 'Контроль проходок', description: 'Каждый фонарь, воздуховод, труба или основание оборудования должен рассматриваться как узел гидроизоляции.'},
        {title: 'Последовательность примыканий', description: 'Планки, уплотнители, герметики и нахлесты должны соответствовать реальной последовательности монтажа.'}
      ],
      commonMistakes: [
        {title: 'Проверка только панелей', description: 'Основной риск протечек находится на краях, проходках, желобах и стыках кровли со стеной.'},
        {title: 'Поздняя проверка водоотвода', description: 'После фиксации прогонов и желобов исправление ошибок становится дорогим.'}
      ]
    }
  },
  sandwich_panel_selection_guide: {
    en: {
      title: 'Sandwich Panel Selection Guide',
      summary: 'A decision guide for choosing panel type, core material, thickness, joint logic, insulation level, and procurement inputs before ordering.',
      seoDescription: 'Guide to selecting sandwich panels for industrial buildings, including core type, thickness, insulation, joints, climate conditions, and procurement readiness.',
      introduction: 'Choosing sandwich panels only by price or thickness can create thermal, fire, installation, and maintenance problems. This guide frames panel selection around building use, climate, spans, joint behavior, and procurement constraints.',
      useWhen: ['During early design or supplier comparison.', 'Before finalizing panel thickness, core type, and accessories.', 'When procurement teams need technical criteria for evaluating offers.'],
      keyPoints: [
        {title: 'Core selection', description: 'Match PIR, PUR, mineral wool, or other cores to insulation, fire, acoustic, and budget requirements.'},
        {title: 'Joint and accessory logic', description: 'Panel choice must include joint behavior, flashings, trims, fasteners, and installation tolerances.'},
        {title: 'Project condition review', description: 'Climate, building use, cleaning needs, humidity, and structural spans all affect the correct specification.'}
      ],
      commonMistakes: [
        {title: 'Comparing only thickness', description: 'Equal thickness does not mean equal thermal, fire, or joint performance.'},
        {title: 'Separating procurement from execution', description: 'Missing trims, flashings, or fasteners can delay installation even when panels arrive on time.'}
      ]
    },
    fa: {
      title: 'راهنمای انتخاب ساندویچ پانل',
      summary: 'راهنمای تصمیم\u200cگیری برای انتخاب نوع پانل، جنس هسته، ضخامت، منطق اتصال، سطح عایق\u200cکاری و ورودی\u200cهای خرید پیش از سفارش.',
      seoDescription: 'راهنمای انتخاب ساندویچ پانل صنعتی شامل نوع هسته، ضخامت، عایق\u200cکاری، اتصال، شرایط اقلیمی و آمادگی خرید پیش از سفارش.',
      introduction: 'انتخاب ساندویچ پانل فقط بر اساس قیمت یا ضخامت می\u200cتواند به خطای حرارتی، حریق، نصب و نگهداری منجر شود. این راهنما انتخاب پانل را بر اساس کاربری ساختمان، اقلیم، دهانه، رفتار اتصال و محدودیت\u200cهای خرید بررسی می\u200cکند.',
      useWhen: ['در مرحله طراحی اولیه یا مقایسه تامین\u200cکنندگان.', 'پیش از نهایی کردن ضخامت، نوع هسته و متعلقات.', 'وقتی تیم خرید به معیار فنی برای ارزیابی پیشنهادها نیاز دارد.'],
      keyPoints: [
        {title: 'انتخاب هسته', description: 'هسته PIR، PUR، پشم سنگ یا گزینه\u200cهای دیگر باید با عایق، حریق، آکوستیک و بودجه هماهنگ شود.'},
        {title: 'منطق اتصال و متعلقات', description: 'انتخاب پانل باید رفتار اتصال، فلاشینگ، تریم، پیچ و تلرانس نصب را هم پوشش دهد.'},
        {title: 'شرایط پروژه', description: 'اقلیم، کاربری، نیاز شست\u200cوشو، رطوبت و دهانه سازه روی مشخصات درست اثر می\u200cگذارند.'}
      ],
      commonMistakes: [
        {title: 'مقایسه فقط بر اساس ضخامت', description: 'ضخامت برابر به معنی عملکرد برابر حرارتی، حریق یا اتصال نیست.'},
        {title: 'جداسازی خرید از اجرا', description: 'کمبود تریم، فلاشینگ یا پیچ می\u200cتواند نصب را حتی با تحویل به\u200cموقع پانل متوقف کند.'}
      ]
    },
    ar: {
      title: 'دليل اختيار ألواح الساندويتش',
      summary: 'دليل قرار لاختيار نوع اللوح ومادة القلب والسماكة ومنطق الوصل والعزل ومدخلات الشراء قبل الطلب.',
      seoDescription: 'دليل اختيار ألواح الساندويتش للمباني الصناعية، يشمل نوع القلب والسماكة والعزل والوصلات والظروف المناخية وجاهزية الشراء.',
      introduction: 'اختيار ألواح الساندويتش بناء على السعر أو السماكة فقط قد يسبب مشكلات حرارية أو حريق أو تركيب. يربط هذا الدليل الاختيار باستخدام المبنى والمناخ والبحور وسلوك الوصلات والشراء.',
      useWhen: ['في التصميم الأولي أو مقارنة الموردين.', 'قبل تثبيت السماكة ونوع القلب والملحقات.', 'عندما يحتاج فريق الشراء إلى معايير فنية لتقييم العروض.'],
      keyPoints: [
        {title: 'اختيار القلب', description: 'طابق PIR أو PUR أو الصوف الصخري مع متطلبات العزل والحريق والصوت والميزانية.'},
        {title: 'منطق الوصل والملحقات', description: 'يجب أن يشمل الاختيار الوصلات والفلاشينغ والتشطيبات والمثبتات وتفاوتات التركيب.'},
        {title: 'ظروف المشروع', description: 'المناخ والاستخدام والرطوبة والبحور الإنشائية تؤثر على المواصفة الصحيحة.'}
      ],
      commonMistakes: [
        {title: 'مقارنة السماكة فقط', description: 'السماكة المتساوية لا تعني أداء حراريا أو ناريا أو وصلا متساويا.'},
        {title: 'فصل الشراء عن التنفيذ', description: 'نقص الملحقات قد يوقف التركيب حتى لو وصلت الألواح في موعدها.'}
      ]
    },
    ru: {
      title: 'Руководство по выбору сэндвич-панелей',
      summary: 'Руководство для выбора типа панели, сердечника, толщины, стыка, теплоизоляции и закупочных вводных до заказа.',
      seoDescription: 'Руководство по выбору сэндвич-панелей для промышленных зданий: сердечник, толщина, изоляция, стыки, климат и готовность закупки.',
      introduction: 'Выбор сэндвич-панелей только по цене или толщине приводит к теплотехническим, пожарным и монтажным рискам. Руководство связывает выбор с назначением здания, климатом, пролетами, стыками и закупкой.',
      useWhen: ['На раннем проектировании или при сравнении поставщиков.', 'До финального выбора толщины, сердечника и аксессуаров.', 'Когда закупке нужны технические критерии оценки предложений.'],
      keyPoints: [
        {title: 'Выбор сердечника', description: 'PIR, PUR, минеральная вата или другой сердечник должны соответствовать теплоизоляции, пожарным, акустическим и бюджетным требованиям.'},
        {title: 'Стыки и аксессуары', description: 'Выбор панели должен учитывать стыки, примыкания, доборные элементы, крепеж и монтажные допуски.'},
        {title: 'Условия проекта', description: 'Климат, назначение, влажность, очистка и пролеты влияют на правильную спецификацию.'}
      ],
      commonMistakes: [
        {title: 'Сравнение только толщины', description: 'Одинаковая толщина не означает одинаковую теплотехнику, пожарные свойства или стык.'},
        {title: 'Отрыв закупки от монтажа', description: 'Недостающие элементы могут остановить монтаж даже при своевременной поставке панелей.'}
      ]
    }
  },
  shop_drawing_review_guide: {
    en: {title: 'Shop Drawing Review Guide for Panel Projects', summary: 'A structured guide for checking panel layout, accessories, flashing logic, quantities, and execution coordination.', seoDescription: 'Shop drawing review guide for panel projects covering layout, accessories, flashing logic, quantities, tolerances, and execution coordination.', introduction: 'Shop drawings translate system selection into buildable instructions. This guide helps teams catch layout, quantity, accessory, and flashing issues before they become site delays.', useWhen: ['Before releasing drawings for fabrication or installation.', 'When multiple suppliers, installers, or facade/roof interfaces are involved.', 'Before approving MTO and accessory orders.'], keyPoints: [{title: 'Panel layout control', description: 'Check module direction, cut panels, openings, edge conditions, and installation access.'}, {title: 'Accessory completeness', description: 'Verify trims, flashings, closers, fasteners, sealants, and special details against the drawing set.'}, {title: 'Quantity consistency', description: 'Compare drawings, MTO, and procurement sheets so missing items are found before ordering.'}], commonMistakes: [{title: 'Approving drawings without accessories', description: 'A panel layout without trims and flashings is not ready for execution.'}, {title: 'Ignoring site tolerances', description: 'Small dimensional conflicts can create visible alignment and sealing problems.'}]},
    fa: {title: 'راهنمای بازبینی نقشه شاپ پروژه‌های پانلی', summary: 'راهنمایی ساختاری برای کنترل چیدمان پانل، متعلقات، منطق فلاشینگ، مقادیر و هماهنگی اجرا.', seoDescription: 'راهنمای بازبینی نقشه شاپ پروژه‌های پانلی برای کنترل چیدمان، متعلقات، فلاشینگ، مقادیر، تلرانس‌ها و هماهنگی اجرا.', introduction: 'نقشه شاپ انتخاب سیستم را به دستورالعمل قابل اجرا تبدیل می‌کند. این راهنما کمک می‌کند خطاهای چیدمان، مقدار، متعلقات و فلاشینگ پیش از تبدیل شدن به تاخیر کارگاهی شناسایی شوند.', useWhen: ['پیش از ارسال نقشه برای تولید یا نصب.', 'وقتی چند تامین‌کننده، نصاب یا اتصال سقف و نما درگیر است.', 'پیش از تایید MTO و سفارش متعلقات.'], keyPoints: [{title: 'کنترل چیدمان پانل', description: 'جهت مدول، پانل‌های برش‌خورده، بازشوها، لبه‌ها و دسترسی نصب باید بررسی شود.'}, {title: 'کامل بودن متعلقات', description: 'تریم، فلاشینگ، کلوزر، پیچ، درزبند و دیتیل‌های خاص باید با نقشه تطبیق داده شوند.'}, {title: 'تطابق مقادیر', description: 'نقشه، MTO و برگه خرید باید با هم مقایسه شوند تا کسری اقلام پیش از سفارش مشخص شود.'}], commonMistakes: [{title: 'تایید نقشه بدون متعلقات', description: 'چیدمان پانل بدون تریم و فلاشینگ برای اجرا آماده نیست.'}, {title: 'نادیده گرفتن تلرانس کارگاه', description: 'اختلاف ابعادی کوچک می‌تواند مشکل هم‌راستایی و آب‌بندی ایجاد کند.'}]},
    ar: {title: 'دليل مراجعة رسومات الشوب دروينغ لمشاريع الألواح', summary: 'دليل منظم لفحص تخطيط الألواح والملحقات ومنطق الفلاشينغ والكميات وتنسيق التنفيذ.', seoDescription: 'دليل مراجعة رسومات الشوب دروينغ لمشاريع الألواح، يشمل التخطيط والملحقات والفلاشينغ والكميات والتفاوتات وتنسيق التنفيذ.', introduction: 'تحول رسومات الشوب دروينغ اختيار النظام إلى تعليمات قابلة للتنفيذ. يساعد هذا الدليل على اكتشاف أخطاء التخطيط والكميات والملحقات قبل أن تتحول إلى تأخير في الموقع.', useWhen: ['قبل إصدار الرسومات للتصنيع أو التركيب.', 'عند وجود عدة موردين أو واجهات بين السقف والواجهة.', 'قبل اعتماد MTO وطلبات الملحقات.'], keyPoints: [{title: 'ضبط تخطيط الألواح', description: 'راجع اتجاه الموديول والألواح المقطوعة والفتحات والحواف وإمكانية الوصول للتركيب.'}, {title: 'اكتمال الملحقات', description: 'تحقق من التشطيبات والفلاشينغ والمثبتات والمواد السادة والتفاصيل الخاصة.'}, {title: 'تطابق الكميات', description: 'قارن الرسومات وMTO وأوراق الشراء لاكتشاف النواقص قبل الطلب.'}], commonMistakes: [{title: 'اعتماد رسومات بلا ملحقات', description: 'تخطيط الألواح بدون فلاشينغ وتشطيبات ليس جاهزا للتنفيذ.'}, {title: 'إهمال تفاوتات الموقع', description: 'اختلافات صغيرة في الأبعاد قد تسبب مشاكل محاذاة وعزل.'}]},
    ru: {title: 'Руководство по проверке рабочих чертежей панельных проектов', summary: 'Структурированная проверка раскладки панелей, аксессуаров, примыканий, количеств и координации выполнения.', seoDescription: 'Руководство по проверке рабочих чертежей панельных проектов: раскладка, аксессуары, примыкания, количества, допуски и координация.', introduction: 'Рабочие чертежи превращают выбранную систему в монтажные инструкции. Руководство помогает найти ошибки раскладки, количеств, аксессуаров и примыканий до задержек на площадке.', useWhen: ['До передачи чертежей в производство или монтаж.', 'При нескольких поставщиках, монтажниках или стыках кровли и фасада.', 'До утверждения MTO и заказа аксессуаров.'], keyPoints: [{title: 'Контроль раскладки', description: 'Проверьте направление модулей, резаные панели, проемы, края и доступ для монтажа.'}, {title: 'Полнота аксессуаров', description: 'Сверьте доборные элементы, примыкания, крепеж, герметики и специальные узлы.'}, {title: 'Согласование количеств', description: 'Сравните чертежи, MTO и закупочные листы, чтобы найти недостающие позиции до заказа.'}], commonMistakes: [{title: 'Утверждение без аксессуаров', description: 'Раскладка панелей без доборных элементов и примыканий не готова к выполнению.'}, {title: 'Игнорирование допусков', description: 'Небольшие размерные конфликты могут вызвать проблемы выравнивания и герметизации.'}]}
  },
  standing_seam_roof_detail_notes: {
    en: {title: 'Standing Seam Roof Detail Notes', summary: 'Technical notes for seams, concealed fastening, roof movement, flashing connections, and drainage coordination.', seoDescription: 'Standing seam roof detail notes covering seam behavior, concealed fastening, thermal movement, flashings, drainage, and execution risks.', introduction: 'Standing seam performance depends on detail discipline: seam geometry, concealed fastening, thermal movement, and coordinated flashings. These notes summarize the checks that protect long-term waterproofing.', useWhen: ['When designing or reviewing standing seam and ZIP roof details.', 'Before approving flashings, penetrations, and perimeter conditions.', 'When the roof has long sheets, curved geometry, or complex drainage.'], keyPoints: [{title: 'Movement allowance', description: 'Long metal sheets need details that accommodate thermal movement without opening seams.'}, {title: 'Concealed fixing', description: 'Clip layout and fixing strategy must preserve waterproofing while resisting wind and movement loads.'}, {title: 'Drainage coordination', description: 'Seam direction, gutters, valleys, and roof transitions must work as one water path.'}], commonMistakes: [{title: 'Treating seams as decoration', description: 'Seam geometry is a waterproofing and movement detail, not only a visual line.'}, {title: 'Uncoordinated penetrations', description: 'Late equipment openings can defeat the concealed-fastener logic.'}]},
    fa: {title: 'نکات دیتیل سقف ایستادرز', summary: 'نکات فنی برای درزها، اتصال مخفی، حرکت حرارتی سقف، فلاشینگ و هماهنگی زهکشی.', seoDescription: 'نکات دیتیل سقف ایستادرز شامل رفتار درز، اتصال مخفی، حرکت حرارتی، فلاشینگ، زهکشی و ریسک‌های اجرا.', introduction: 'عملکرد سقف ایستادرز به دقت دیتیل وابسته است: هندسه درز، اتصال مخفی، حرکت حرارتی و فلاشینگ هماهنگ. این یادداشت‌ها چک‌های اصلی برای آب‌بندی بلندمدت را خلاصه می‌کند.', useWhen: ['هنگام طراحی یا بازبینی دیتیل سقف ایستادرز و ZIP.', 'پیش از تایید فلاشینگ، نفوذی‌ها و لبه‌های پیرامونی.', 'وقتی سقف ورق‌های بلند، فرم قوسی یا زهکشی پیچیده دارد.'], keyPoints: [{title: 'آزادی حرکت', description: 'ورق‌های فلزی بلند به دیتیلی نیاز دارند که حرکت حرارتی را بدون باز شدن درز تحمل کند.'}, {title: 'اتصال مخفی', description: 'چیدمان کلیپس و روش مهار باید آب‌بندی را حفظ کند و در برابر باد و حرکت مقاوم باشد.'}, {title: 'هماهنگی زهکشی', description: 'جهت درز، آبرو، دره و انتقال سقف باید یک مسیر آب واحد بسازند.'}], commonMistakes: [{title: 'تزئینی دیدن درز', description: 'هندسه درز یک دیتیل آب‌بندی و حرکت است، نه فقط خط بصری.'}, {title: 'نفوذی‌های هماهنگ‌نشده', description: 'بازشوهای دیرهنگام تجهیزات می‌توانند منطق اتصال مخفی را از بین ببرند.'}]},
    ar: {title: 'ملاحظات تفاصيل سقف ستاندينغ سيم', summary: 'ملاحظات فنية للفواصل والتثبيت المخفي وحركة السقف والفلاشينغ وتنسيق التصريف.', seoDescription: 'ملاحظات تفاصيل سقف ستاندينغ سيم تشمل الفواصل والتثبيت المخفي والحركة الحرارية والفلاشينغ والتصريف ومخاطر التنفيذ.', introduction: 'يعتمد أداء السقف القائم على انضباط التفاصيل: هندسة الفواصل والتثبيت المخفي والحركة الحرارية والفلاشينغ المنسق. تلخص هذه الملاحظات فحوص حماية العزل المائي طويل الأمد.', useWhen: ['عند تصميم أو مراجعة تفاصيل ستاندينغ سيم وZIP.', 'قبل اعتماد الفلاشينغ والاختراقات والحواف.', 'عند وجود صفائح طويلة أو هندسة منحنية أو تصريف معقد.'], keyPoints: [{title: 'سماحية الحركة', description: 'الصفائح المعدنية الطويلة تحتاج تفاصيل تسمح بالحركة الحرارية دون فتح الفواصل.'}, {title: 'التثبيت المخفي', description: 'يجب أن يحافظ توزيع الكليبس على العزل ويقاوم الرياح والحركة.'}, {title: 'تنسيق التصريف', description: 'اتجاه الفواصل والمزاريب والوديان وانتقالات السقف يجب أن تعمل كمسار ماء واحد.'}], commonMistakes: [{title: 'اعتبار الفواصل زخرفية', description: 'هندسة الفاصل تفصيل عزل وحركة وليست خطا بصريا فقط.'}, {title: 'اختراقات غير منسقة', description: 'فتحات المعدات المتأخرة قد تلغي منطق التثبيت المخفي.'}]},
    ru: {title: 'Технические заметки по фальцевой кровле', summary: 'Заметки по швам, скрытому креплению, температурным движениям, примыканиям и водоотводу.', seoDescription: 'Технические заметки по фальцевой кровле: швы, скрытое крепление, температурные движения, примыкания, водоотвод и риски выполнения.', introduction: 'Работа фальцевой кровли зависит от дисциплины узлов: геометрии шва, скрытого крепления, температурных движений и согласованных примыканий. Заметки фиксируют проверки для долгосрочной герметичности.', useWhen: ['При проектировании или проверке фальцевой и ZIP-кровли.', 'До утверждения примыканий, проходок и периметра.', 'При длинных листах, криволинейной форме или сложном водоотводе.'], keyPoints: [{title: 'Компенсация движения', description: 'Длинные металлические листы требуют узлов, допускающих температурное движение без раскрытия швов.'}, {title: 'Скрытое крепление', description: 'Клипсы и крепеж должны сохранять гидроизоляцию и воспринимать ветер и движение.'}, {title: 'Координация водоотвода', description: 'Направление швов, желоба, ендовы и переходы должны работать как единый путь воды.'}], commonMistakes: [{title: 'Шов как декор', description: 'Геометрия шва является узлом гидроизоляции и движения, а не только линией.'}, {title: 'Несогласованные проходки', description: 'Поздние отверстия под оборудование нарушают логику скрытого крепления.'}]}
  },
  aluminium_cladding_layout_checklist: {
    en: {title: 'Aluminium Cladding Layout Checklist', summary: 'A facade checklist for reviewing grid, panel rhythm, joints, fixing logic, edges, openings, and material optimization before installation.', seoDescription: 'Aluminium cladding layout checklist for facade grid, panel rhythm, joints, fixing logic, openings, edges, waste control, and installation readiness.', introduction: 'Cladding quality is visible. Small layout errors in module rhythm, joint alignment, edge returns, or fixing strategy can affect both appearance and durability. This checklist supports facade review before installation starts.', useWhen: ['Before approving aluminium cladding shop drawings.', 'When facade modules meet openings, corners, signage, or curved geometry.', 'Before ordering sheets, substructure, and fixing accessories.'], keyPoints: [{title: 'Grid discipline', description: 'Module lines, joints, corners, and openings should follow one coordinated visual and structural logic.'}, {title: 'Fixing strategy', description: 'Substructure, anchors, thermal movement, and access for replacement must be reviewed together.'}, {title: 'Material optimization', description: 'Panel rhythm should reduce waste without forcing awkward cuts at visible edges.'}], commonMistakes: [{title: 'Starting from sheet size only', description: 'Material efficiency matters, but facade rhythm and joint control must lead the layout.'}, {title: 'Ignoring edge returns', description: 'Corners, reveals, and openings expose poor coordination quickly.'}]},
    fa: {title: 'چک‌لیست چیدمان کلادینگ آلومینیومی', summary: 'چک‌لیست نما برای کنترل گرید، ریتم پنل، درزها، منطق اتصال، لبه‌ها، بازشوها و بهینه‌سازی متریال پیش از نصب.', seoDescription: 'چک‌لیست چیدمان کلادینگ آلومینیومی برای کنترل گرید نما، ریتم پنل، درزها، اتصال، بازشوها، لبه‌ها، پرت متریال و آمادگی نصب.', introduction: 'کیفیت کلادینگ در ظاهر پروژه دیده می‌شود. خطاهای کوچک در ریتم مدول، هم‌راستایی درز، برگشت لبه یا روش اتصال می‌تواند هم ظاهر و هم دوام نما را تحت تاثیر قرار دهد. این چک‌لیست برای بازبینی نما پیش از نصب است.', useWhen: ['پیش از تایید نقشه شاپ کلادینگ آلومینیومی.', 'وقتی مدول‌های نما با بازشو، گوشه، تابلو یا فرم قوسی برخورد دارند.', 'پیش از سفارش ورق، زیرسازی و متعلقات اتصال.'], keyPoints: [{title: 'انضباط گرید', description: 'خطوط مدول، درزها، گوشه‌ها و بازشوها باید یک منطق بصری و سازه‌ای هماهنگ داشته باشند.'}, {title: 'استراتژی اتصال', description: 'زیرسازی، انکر، حرکت حرارتی و دسترسی برای تعویض باید با هم بررسی شوند.'}, {title: 'بهینه‌سازی متریال', description: 'ریتم پنل باید پرت را کم کند بدون اینکه برش‌های نامناسب در لبه‌های قابل دید ایجاد شود.'}], commonMistakes: [{title: 'شروع فقط از ابعاد ورق', description: 'بهینه‌سازی متریال مهم است، اما ریتم نما و کنترل درز باید محور چیدمان باشد.'}, {title: 'نادیده گرفتن برگشت لبه', description: 'گوشه، قاب بازشو و کنج‌ها ضعف هماهنگی را سریع آشکار می‌کنند.'}]},
    ar: {title: 'قائمة تخطيط الكلادينج الألومنيوم', summary: 'قائمة واجهات لمراجعة الشبكة وإيقاع الألواح والفواصل ومنطق التثبيت والحواف والفتحات وتحسين المواد قبل التركيب.', seoDescription: 'قائمة تخطيط الكلادينج الألومنيوم لمراجعة شبكة الواجهة وإيقاع الألواح والفواصل والتثبيت والفتحات والحواف وتقليل الهدر.', introduction: 'جودة الكلادينج تظهر مباشرة في الواجهة. أخطاء صغيرة في الإيقاع أو محاذاة الفواصل أو الحواف أو التثبيت تؤثر على الشكل والمتانة. تدعم هذه القائمة مراجعة الواجهة قبل التركيب.', useWhen: ['قبل اعتماد رسومات كلادينج الألومنيوم.', 'عندما تلتقي الموديولات مع الفتحات أو الزوايا أو اللافتات أو الأشكال المنحنية.', 'قبل طلب الألواح والهيكل الفرعي والملحقات.'], keyPoints: [{title: 'انضباط الشبكة', description: 'خطوط الموديول والفواصل والزوايا والفتحات يجب أن تتبع منطقا بصريا وإنشائيا واحدا.'}, {title: 'استراتيجية التثبيت', description: 'راجع الهيكل الفرعي والمراسي والحركة الحرارية وإمكانية الاستبدال معا.'}, {title: 'تحسين المواد', description: 'يجب أن يقلل إيقاع الألواح الهدر دون فرض قصات ضعيفة عند الحواف المرئية.'}], commonMistakes: [{title: 'البدء من مقاس اللوح فقط', description: 'كفاءة المواد مهمة، لكن إيقاع الواجهة وضبط الفواصل يقودان التخطيط.'}, {title: 'إهمال الحواف', description: 'الزوايا والفتحات تكشف ضعف التنسيق بسرعة.'}]},
    ru: {title: 'Чек-лист раскладки алюминиевой облицовки', summary: 'Фасадный чек-лист для проверки сетки, ритма панелей, швов, крепления, краев, проемов и оптимизации материала до монтажа.', seoDescription: 'Чек-лист раскладки алюминиевой облицовки: сетка фасада, ритм панелей, швы, крепление, проемы, края, отходы и готовность монтажа.', introduction: 'Качество облицовки видно сразу. Небольшие ошибки в ритме модулей, выравнивании швов, краях или креплении влияют на внешний вид и долговечность. Чек-лист поддерживает проверку фасада до монтажа.', useWhen: ['До утверждения рабочих чертежей алюминиевой облицовки.', 'Когда модули встречаются с проемами, углами, вывесками или криволинейной геометрией.', 'До заказа листов, подсистемы и крепежа.'], keyPoints: [{title: 'Дисциплина сетки', description: 'Модульные линии, швы, углы и проемы должны следовать единой визуальной и конструктивной логике.'}, {title: 'Стратегия крепления', description: 'Подсистема, анкеры, температурные движения и доступ для замены проверяются вместе.'}, {title: 'Оптимизация материала', description: 'Ритм панелей должен снижать отходы без неудачных резов на видимых краях.'}], commonMistakes: [{title: 'Старт только от размера листа', description: 'Эффективность материала важна, но ритм фасада и контроль швов важнее.'}, {title: 'Игнорирование краев', description: 'Углы, откосы и проемы быстро показывают слабую координацию.'}]}
  },
  mto_procurement_planning_sheet: {
    en: {title: 'MTO and Procurement Planning Sheet', summary: 'A structured worksheet for reviewing quantities, accessories, flashings, fasteners, trims, lead times, and procurement gaps.', seoDescription: 'MTO and procurement planning sheet for industrial envelope projects, covering quantities, accessories, flashings, fasteners, trims, lead times, and gaps.', introduction: 'Procurement risk often appears as missing accessories, mismatched quantities, or late technical decisions. This worksheet links MTO review with execution readiness so purchasing supports installation instead of interrupting it.', useWhen: ['Before issuing purchase orders for panels, roofing, or cladding.', 'When comparing supplier offers with different accessory scopes.', 'Before freezing project budget, lead time, and installation schedule.'], keyPoints: [{title: 'Scope completeness', description: 'Quantities must include panels, trims, flashings, fasteners, closures, sealants, and special details.'}, {title: 'Lead-time control', description: 'Separate long-lead and custom items from standard consumables before ordering.'}, {title: 'Execution readiness', description: 'Procurement should follow approved drawings, not assumptions from early estimates.'}], commonMistakes: [{title: 'Buying panels without accessories', description: 'Panels alone do not make an installable envelope system.'}, {title: 'Using one MTO for changing drawings', description: 'Every drawing revision should trigger a quantity and scope review.'}]},
    fa: {title: 'برگه برنامه‌ریزی MTO و خرید', summary: 'برگه‌ای ساختاری برای کنترل مقادیر، متعلقات، فلاشینگ، پیچ، تریم، زمان تامین و کسری‌های خرید.', seoDescription: 'برگه برنامه‌ریزی MTO و خرید برای پروژه‌های پوشش صنعتی شامل مقادیر، متعلقات، فلاشینگ، پیچ، تریم، زمان تامین و کسری‌ها.', introduction: 'ریسک خرید معمولا به شکل متعلقات ناقص، مقدارهای ناسازگار یا تصمیم فنی دیرهنگام ظاهر می‌شود. این برگه بازبینی MTO را به آمادگی اجرا وصل می‌کند تا خرید به نصب کمک کند، نه اینکه آن را متوقف کند.', useWhen: ['پیش از صدور سفارش خرید پانل، سقف یا کلادینگ.', 'هنگام مقایسه پیشنهاد تامین‌کنندگان با دامنه متعلقات متفاوت.', 'پیش از قطعی کردن بودجه، زمان تامین و برنامه نصب.'], keyPoints: [{title: 'کامل بودن دامنه', description: 'مقادیر باید پانل، تریم، فلاشینگ، پیچ، کلوزر، درزبند و دیتیل‌های خاص را پوشش دهد.'}, {title: 'کنترل زمان تامین', description: 'اقلام سفارشی و زمان‌بر باید از مصرفی‌های معمول جداگانه بررسی شوند.'}, {title: 'آمادگی اجرا', description: 'خرید باید بر اساس نقشه تاییدشده انجام شود، نه تخمین اولیه.'}], commonMistakes: [{title: 'خرید پانل بدون متعلقات', description: 'پانل به تنهایی یک سیستم پوشش قابل نصب ایجاد نمی‌کند.'}, {title: 'استفاده از یک MTO برای نقشه متغیر', description: 'هر ویرایش نقشه باید بازبینی مقدار و دامنه خرید را فعال کند.'}]},
    ar: {title: 'ورقة تخطيط MTO والمشتريات', summary: 'ورقة منظمة لمراجعة الكميات والملحقات والفلاشينغ والمثبتات والتشطيبات والمهل ونواقص الشراء.', seoDescription: 'ورقة تخطيط MTO والمشتريات لمشاريع الأغلفة الصناعية، تشمل الكميات والملحقات والفلاشينغ والمثبتات والمهل والنواقص.', introduction: 'تظهر مخاطر الشراء غالبا كملحقات ناقصة أو كميات غير متطابقة أو قرارات فنية متأخرة. تربط هذه الورقة مراجعة MTO بجاهزية التنفيذ حتى يدعم الشراء التركيب بدلا من تعطيله.', useWhen: ['قبل إصدار أوامر شراء الألواح أو الأسقف أو الكلادينج.', 'عند مقارنة عروض الموردين بنطاقات ملحقات مختلفة.', 'قبل تثبيت الميزانية والمهل وجدول التركيب.'], keyPoints: [{title: 'اكتمال النطاق', description: 'يجب أن تشمل الكميات الألواح والتشطيبات والفلاشينغ والمثبتات والمواد السادة والتفاصيل الخاصة.'}, {title: 'ضبط المهل', description: 'افصل العناصر المخصصة وطويلة التوريد عن المواد القياسية قبل الطلب.'}, {title: 'جاهزية التنفيذ', description: 'يجب أن يتبع الشراء الرسومات المعتمدة لا تقديرات مبكرة.'}], commonMistakes: [{title: 'شراء الألواح دون ملحقات', description: 'الألواح وحدها لا تصنع نظام غلاف قابل للتركيب.'}, {title: 'استخدام MTO واحد مع رسومات متغيرة', description: 'كل تعديل رسم يجب أن يطلق مراجعة كمية ونطاق.'}]},
    ru: {title: 'Лист планирования MTO и закупки', summary: 'Структурированный лист проверки количеств, аксессуаров, примыканий, крепежа, доборных элементов, сроков и пробелов закупки.', seoDescription: 'Лист планирования MTO и закупки для промышленных ограждающих систем: количества, аксессуары, примыкания, крепеж, сроки и пробелы.', introduction: 'Закупочный риск часто проявляется как недостающие аксессуары, несоответствие количеств или поздние технические решения. Лист связывает MTO с готовностью к монтажу, чтобы закупка поддерживала выполнение.', useWhen: ['До выпуска заказов на панели, кровлю или облицовку.', 'При сравнении предложений поставщиков с разным объемом аксессуаров.', 'До фиксации бюджета, сроков поставки и графика монтажа.'], keyPoints: [{title: 'Полнота объема', description: 'Количества должны включать панели, доборные элементы, примыкания, крепеж, уплотнители и специальные узлы.'}, {title: 'Контроль сроков', description: 'Длинные и заказные позиции отделяются от стандартных расходников до заказа.'}, {title: 'Готовность к выполнению', description: 'Закупка должна следовать утвержденным чертежам, а не ранним оценкам.'}], commonMistakes: [{title: 'Покупка панелей без аксессуаров', description: 'Панели без комплектующих не образуют монтируемую систему.'}, {title: 'Один MTO для меняющихся чертежей', description: 'Каждая ревизия чертежей требует проверки количеств и объема.'}]}
  }
};

const statLabels: Record<Locale, StatLabels> = {
  en: {pages: 'pages', readingTime: 'Reading time', minutes: 'min', updated: 'Updated'},
  fa: {pages: 'صفحه', readingTime: 'زمان مطالعه', minutes: 'دقیقه', updated: 'به\u200cروزرسانی'},
  ar: {pages: 'صفحة', readingTime: 'وقت القراءة', minutes: 'دقائق', updated: 'آخر تحديث'},
  ru: {pages: 'стр.', readingTime: 'Время чтения', minutes: 'мин', updated: 'Обновлено'}
};

const monthNames: Record<Locale, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fa: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  ru: ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.']
};

export function formatResourceDate(isoMonth: string, locale: Locale): string {
  const [yearStr, monthStr] = isoMonth.split('-');
  const monthIndex = Number.parseInt(monthStr, 10) - 1;
  const year = Number.parseInt(yearStr, 10);

  if (locale === 'fa') {
    const persianYear = year - 621;
    return `${monthNames.fa[monthIndex]} ${persianYear.toLocaleString('fa-IR', {useGrouping: false})}`;
  }

  return `${monthNames[locale][monthIndex]} ${year}`;
}

export function getStatLabels(locale: Locale): StatLabels {
  return statLabels[locale];
}

export type ResourceHubUiLabels = {
  eyebrow: string;
  requestConsultation: string;
  relatedSystem: string;
  viewDetails: string;
  pendingFile: string;
  pendingLead: string;
  comingSoon: string;
  summaryTitle: string;
  summaryType: string;
  summaryCategory: string;
  summaryDifficulty: string;
  summaryReadTime: string;
  summaryFileStatus: string;
  summaryFileStatusPending: string;
  preparedByLabel: string;
  reviewedByLabel: string;
  lastUpdatedLabel: string;
  authorityNote: string;
  contextTitle: string;
  introductionTitle: string;
  useWhenTitle: string;
  keyTechnicalPointsTitle: string;
  commonMistakesTitle: string;
  previewTitle: string;
  previewNote: string;
  downloadTitle: string;
  downloadNote: string;
  downloadPendingNote: string;
  downloadRequested: string;
  downloadSubmit: string;
  downloadSending: string;
  downloadSuccess: string;
  downloadSuccessPending: string;
  downloadError: string;
  sectionBrowse: string;
  sectionFeatured: string;
  sectionLibrary: string;
  sectionExplore: string;
  relatedSystemsTitle: string;
  relatedResourcesTitle: string;
  pendingBadge: string;
  verifiedBadge: string;
  fieldName: string;
  fieldCompany: string;
  fieldPhone: string;
  fieldProjectType: string;
  fieldMessage: string;
  privacyNote: string;
  indexLeadTitle: string;
  indexLeadNote: string;
  relatedProjectsTitle: string;
  relatedProjectsProofIntro: string;
  hasRelatedProjects: string;
  rfqConversionTitle: string;
  rfqConversionDescription: string;
  rfqConversionHelper: string;
  rfqConversionPrimary: string;
  rfqConversionSecondary: string;
  rfqConversionTrust: string[];
  detailConsultationTitle: string;
  detailConsultationDescription: string;
  detailConsultationButton: string;
  detailCatalogButton: string;
  exploreSystemLabel: string;
  viewProjectLabel: string;
  contextualSystemPrefix: string;
  contextualSystemSuffix: string;
  contextualProjectPrefix: string;
  contextualProjectSuffix: string;
  sortLabel: string;
  sortNewest: string;
  sortOldest: string;
  sortRecommended: string;
  sortShorterRead: string;
  heroVisualLabel1: string;
  heroVisualLabel2: string;
  breadcrumbAriaLabel: string;
  filterAriaLabel: string;
};

const uiLabels: Record<Locale, ResourceHubUiLabels> = {
  en: {
    eyebrow: 'SIPANEL Engineering Resource',
    requestConsultation: 'Request Technical Consultation',
    relatedSystem: 'Related system',
    viewDetails: 'View details',
    pendingFile: 'Direct download will be available soon. Submit your contact details to receive the current version.',
    pendingLead: 'Submit your contact details to receive this resource.',
    comingSoon: 'Coming Soon',
    summaryTitle: 'Resource Summary',
    summaryType: 'Resource type',
    summaryCategory: 'Category',
    summaryDifficulty: 'Difficulty',
    summaryReadTime: 'Read time',
    summaryFileStatus: 'Availability',
    summaryFileStatusPending: 'Available upon request',
    preparedByLabel: 'Prepared by',
    reviewedByLabel: 'Technical review',
    lastUpdatedLabel: 'Last updated',
    authorityNote: 'Content in this section is prepared from SIPANEL experience in designing, supplying, and executing industrial envelope systems on real projects.',
    contextTitle: 'Technical Context',
    introductionTitle: 'Introduction',
    useWhenTitle: 'When to Use This Guide',
    keyTechnicalPointsTitle: 'Key Technical Points',
    commonMistakesTitle: 'Common Mistakes',
    previewTitle: 'What\u2019s Inside',
    previewNote: 'A structured overview of the key sections covered in this resource.',
    downloadTitle: 'Get This Resource',
    downloadNote: 'To receive the file and enable technical follow-up, please enter your contact details.',
    downloadPendingNote: 'This resource is currently being prepared by our engineering team. Submit your contact details and we will reach out to you directly.',
    downloadRequested: 'Requested resource',
    downloadSubmit: 'Get Resource',
    downloadSending: 'Sending...',
    downloadSuccess: 'Your request has been received. Your download will begin shortly.',
    downloadSuccessPending: 'Your request has been received. This resource is currently being prepared. Our engineering team will contact you shortly.',
    downloadError: 'Could not send your request. Please check the fields and try again.',
    sectionBrowse: 'Browse by Engineering Topic',
    sectionFeatured: 'Featured Resources',
    sectionLibrary: 'Engineering Resource Library',
    sectionExplore: 'Explore Related Systems',
    relatedSystemsTitle: 'Related Systems',
    relatedResourcesTitle: 'Related Resources',
    pendingBadge: 'Available upon request',
    verifiedBadge: 'Ready for download',
    fieldName: 'Full name',
    fieldCompany: 'Company',
    fieldPhone: 'Mobile number',
    fieldProjectType: 'Project type',
    fieldMessage: 'Notes',
    privacyNote: 'Your information is used only for sending the resource and technical follow-up.',
    indexLeadTitle: 'Get Engineering Resources',
    indexLeadNote: 'Enter your contact details to receive technical resources directly.',
    relatedProjectsTitle: 'Related Projects',
    relatedProjectsProofIntro: 'This resource is based on SIPANEL execution experience and technical decisions from real projects.',
    hasRelatedProjects: 'Includes related project examples',
    rfqConversionTitle: 'Review the technical risks before selecting the right envelope for your project.',
    rfqConversionDescription:
      'Envelope type, execution details, climate conditions, and installation method can directly affect cost, durability, and project performance. SIPANEL engineering can review the right technical path before procurement.',
    rfqConversionHelper: 'If you are unsure which system fits your project, send the project information for review.',
    rfqConversionPrimary: 'Get Free Engineering Review',
    rfqConversionSecondary: 'Send Project Information',
    rfqConversionTrust: ['Executed industrial project experience', 'Engineering review before procurement', 'Detail and installation coordination'],
    detailConsultationTitle: 'Need Technical Guidance For Your Project?',
    detailConsultationDescription: 'Whether you are evaluating systems, comparing suppliers, reviewing quantities, or preparing execution drawings, our engineering team can help before procurement begins.',
    detailConsultationButton: 'Request Engineering Review',
    detailCatalogButton: 'Download Technical Catalog',
    exploreSystemLabel: 'Explore System',
    viewProjectLabel: 'View Project',
    contextualSystemPrefix: 'For more context on this solution, review',
    contextualSystemSuffix: 'as the related system.',
    contextualProjectPrefix: 'For an executed example of this approach, see',
    contextualProjectSuffix: 'in the project library.',
    sortLabel: 'Sort',
    sortNewest: 'Newest',
    sortOldest: 'Oldest',
    sortRecommended: 'Recommended',
    sortShorterRead: 'Shorter Reading Time',
    heroVisualLabel1: 'Panel layout',
    heroVisualLabel2: 'Waterproofing detail',
    breadcrumbAriaLabel: 'Breadcrumb',
    filterAriaLabel: 'Resource categories'
  },
  fa: {
    eyebrow: 'منابع مهندسی SIPANEL',
    requestConsultation: 'درخواست مشاوره فنی',
    relatedSystem: 'سیستم مرتبط',
    viewDetails: 'مشاهده جزئیات',
    pendingFile: 'دریافت مستقیم این فایل به\u200cزودی فعال می\u200cشود. برای دریافت نسخه فعلی، اطلاعات تماس خود را ارسال کنید.',
    pendingLead: 'برای دریافت این منبع، اطلاعات تماس خود را وارد کنید.',
    comingSoon: 'به\u200cزودی',
    summaryTitle: 'خلاصه منبع',
    summaryType: 'نوع منبع',
    summaryCategory: 'دسته\u200cبندی',
    summaryDifficulty: 'سطح',
    summaryReadTime: 'زمان مطالعه',
    summaryFileStatus: 'وضعیت دسترسی',
    summaryFileStatusPending: 'قابل دریافت با ارسال درخواست',
    preparedByLabel: 'تهیه‌شده توسط',
    reviewedByLabel: 'بازبینی فنی',
    lastUpdatedLabel: 'آخرین به‌روزرسانی',
    authorityNote: 'محتوای این بخش بر اساس تجربه طراحی، تأمین و اجرای پوشش‌های صنعتی در پروژه‌های واقعی تدوین شده است.',
    contextTitle: 'زمینه فنی',
    introductionTitle: 'معرفی',
    useWhenTitle: 'چه زمانی از این راهنما استفاده کنیم؟',
    keyTechnicalPointsTitle: 'نکات فنی کلیدی',
    commonMistakesTitle: 'اشتباهات رایج',
    previewTitle: 'محتوای این منبع',
    previewNote: 'مروری ساختاری بر بخش\u200cهای اصلی این منبع فنی.',
    downloadTitle: 'دریافت فایل فنی',
    downloadNote: 'برای ارسال فایل و امکان پیگیری فنی، لطفاً اطلاعات تماس خود را وارد کنید.',
    downloadPendingNote: 'این منبع در حال آماده‌سازی توسط تیم مهندسی ماست. اطلاعات تماس خود را ارسال کنید تا مستقیماً با شما تماس بگیریم.',
    downloadRequested: 'منبع درخواست\u200cشده',
    downloadSubmit: 'دریافت فایل',
    downloadSending: 'در حال ارسال...',
    downloadSuccess: 'درخواست شما ثبت شد. دانلود فایل به‌زودی آغاز می‌شود.',
    downloadSuccessPending: 'درخواست شما ثبت شد. این منبع در حال آماده‌سازی است. تیم مهندسی ما به‌زودی با شما تماس خواهد گرفت.',
    downloadError: 'ارسال درخواست ممکن نشد. لطفاً فیلدها را بررسی کنید و دوباره تلاش کنید.',
    sectionBrowse: 'مرور بر اساس موضوع مهندسی',
    sectionFeatured: 'منابع پیشنهادی',
    sectionLibrary: 'کتابخانه منابع مهندسی',
    sectionExplore: 'سیستم\u200cهای مرتبط را بررسی کنید',
    relatedSystemsTitle: 'پوشانه\u200cهای مرتبط',
    relatedResourcesTitle: 'منابع مرتبط',
    pendingBadge: 'قابل دریافت با ارسال درخواست',
    verifiedBadge: 'آماده دانلود',
    fieldName: 'نام و نام خانوادگی',
    fieldCompany: 'نام شرکت',
    fieldPhone: 'شماره موبایل',
    fieldProjectType: 'نوع پروژه',
    fieldMessage: 'توضیحات کوتاه',
    privacyNote: 'اطلاعات شما فقط برای ارسال منبع و پیگیری فنی استفاده می\u200cشود.',
    indexLeadTitle: 'دریافت منابع مهندسی',
    indexLeadNote: 'برای دریافت مستقیم منابع فنی، اطلاعات تماس خود را وارد کنید.',
    relatedProjectsTitle: 'پروژه\u200cهای مرتبط',
    relatedProjectsProofIntro: 'این منبع بر اساس تجربه\u200cهای اجرایی و تصمیم\u200cهای فنی پروژه\u200cهای واقعی SIPANEL تدوین شده است.',
    hasRelatedProjects: 'دارای نمونه پروژه مرتبط',
    rfqConversionTitle: 'برای انتخاب پوشش مناسب پروژه، ابتدا ریسک‌های فنی را بررسی کنید.',
    rfqConversionDescription:
      'انتخاب نوع پوشش، دیتیل‌های اجرایی، شرایط اقلیمی و روش نصب می‌تواند بر هزینه، دوام و عملکرد پروژه تأثیر مستقیم داشته باشد. تیم مهندسی SIPANEL می‌تواند پیش از خرید، مسیر فنی مناسب پروژه شما را بررسی کند.',
    rfqConversionHelper: 'اگر در انتخاب سیستم مناسب پروژه تردید دارید، اطلاعات پروژه را برای بررسی ارسال کنید.',
    rfqConversionPrimary: 'دریافت بررسی مهندسی رایگان',
    rfqConversionSecondary: 'ارسال اطلاعات پروژه',
    rfqConversionTrust: ['تجربه پروژه‌های صنعتی اجراشده', 'بررسی مهندسی پیش از خرید', 'هماهنگی دیتیل و نصب'],
    detailConsultationTitle: 'به راهنمایی فنی برای پروژه‌تان نیاز دارید؟',
    detailConsultationDescription: 'چه در حال ارزیابی سیستم‌ها باشید، چه مقایسه تأمین‌کنندگان، بررسی متراژ یا تهیه نقشه‌های اجرایی، تیم مهندسی ما می‌تواند پیش از شروع تدارکات کمک کند.',
    detailConsultationButton: 'درخواست بررسی مهندسی',
    detailCatalogButton: 'دانلود کاتالوگ فنی',
    exploreSystemLabel: 'مشاهده سیستم',
    viewProjectLabel: 'مشاهده پروژه',
    contextualSystemPrefix: 'برای آشنایی بیشتر با این راهکار، صفحه',
    contextualSystemSuffix: 'را ببینید.',
    contextualProjectPrefix: 'نمونه اجرای این راهکار را در پروژه',
    contextualProjectSuffix: 'بررسی کنید.',
    sortLabel: 'مرتب\u200cسازی',
    sortNewest: 'جدیدترین',
    sortOldest: 'قدیمی\u200cترین',
    sortRecommended: 'پیشنهادی',
    sortShorterRead: 'زمان مطالعه کوتاه\u200cتر',
    heroVisualLabel1: 'چیدمان پانل',
    heroVisualLabel2: 'دیتیل آب\u200cبندی',
    breadcrumbAriaLabel: 'مسیر صفحه',
    filterAriaLabel: 'دسته\u200cبندی منابع'
  },
  ar: {
    eyebrow: 'موارد SIPANEL الهندسية',
    requestConsultation: 'طلب استشارة فنية',
    relatedSystem: 'النظام المرتبط',
    viewDetails: 'عرض التفاصيل',
    pendingFile: 'سيكون التحميل المباشر متاحًا قريبًا. أرسل بيانات التواصل للحصول على النسخة الحالية.',
    pendingLead: 'أرسل بيانات التواصل للحصول على هذا المورد.',
    comingSoon: 'قريبًا',
    summaryTitle: 'ملخص المورد',
    summaryType: 'نوع المورد',
    summaryCategory: 'الفئة',
    summaryDifficulty: 'المستوى',
    summaryReadTime: 'وقت القراءة',
    summaryFileStatus: 'التوفر',
    summaryFileStatusPending: 'متاح عند الطلب',
    preparedByLabel: 'أعده',
    reviewedByLabel: 'المراجعة الفنية',
    lastUpdatedLabel: 'آخر تحديث',
    authorityNote: 'تم إعداد محتوى هذا القسم استنادا إلى خبرة SIPANEL في تصميم وتوريد وتنفيذ أغلفة المباني الصناعية في مشاريع حقيقية.',
    contextTitle: 'السياق الفني',
    introductionTitle: 'مقدمة',
    useWhenTitle: 'متى نستخدم هذا الدليل؟',
    keyTechnicalPointsTitle: 'النقاط الفنية الرئيسية',
    commonMistakesTitle: 'الأخطاء الشائعة',
    previewTitle: 'محتويات المورد',
    previewNote: 'نظرة عامة منظمة على الأقسام الرئيسية في هذا المورد.',
    downloadTitle: 'الحصول على هذا المورد',
    downloadNote: 'لإرسال الملف وتمكين المتابعة الفنية، يرجى إدخال بيانات التواصل.',
    downloadPendingNote: 'هذا المورد قيد الإعداد من قبل فريقنا الهندسي. أرسل بيانات التواصل وسنتصل بك مباشرة.',
    downloadRequested: 'المورد المطلوب',
    downloadSubmit: 'الحصول على المورد',
    downloadSending: 'جارٍ الإرسال...',
    downloadSuccess: 'تم استلام طلبك. سيبدأ التحميل قريبًا.',
    downloadSuccessPending: 'تم استلام طلبك. هذا المورد قيد الإعداد حاليًا. سيتواصل معك فريقنا الهندسي قريبًا.',
    downloadError: 'تعذر إرسال الطلب. يرجى مراجعة الحقول والمحاولة مرة أخرى.',
    sectionBrowse: 'تصفح حسب الموضوع الهندسي',
    sectionFeatured: 'الموارد المميزة',
    sectionLibrary: 'مكتبة الموارد الهندسية',
    sectionExplore: 'استكشف الأنظمة ذات الصلة',
    relatedSystemsTitle: 'أنظمة ذات صلة',
    relatedResourcesTitle: 'الموارد ذات الصلة',
    pendingBadge: 'متاح عند الطلب',
    verifiedBadge: 'جاهز للتحميل',
    fieldName: 'الاسم الكامل',
    fieldCompany: 'الشركة',
    fieldPhone: 'رقم الجوال',
    fieldProjectType: 'نوع المشروع',
    fieldMessage: 'ملاحظات',
    privacyNote: 'تُستخدم معلوماتك فقط لإرسال المورد والمتابعة الفنية.',
    indexLeadTitle: 'الحصول على الموارد الهندسية',
    indexLeadNote: 'أدخل بيانات التواصل لتلقي الموارد الفنية مباشرة.',
    relatedProjectsTitle: 'مشاريع ذات صلة',
    relatedProjectsProofIntro: 'تم إعداد هذا المورد اعتمادا على خبرات تنفيذية وقرارات فنية من مشاريع SIPANEL حقيقية.',
    hasRelatedProjects: 'يتضمن أمثلة مشاريع ذات صلة',
    rfqConversionTitle: 'راجع المخاطر الفنية قبل اختيار الغلاف المناسب لمشروعك.',
    rfqConversionDescription:
      'يمكن أن يؤثر نوع الغلاف وتفاصيل التنفيذ والظروف المناخية وطريقة التركيب مباشرة في التكلفة والمتانة وأداء المشروع. يمكن لفريق SIPANEL الهندسي مراجعة المسار الفني المناسب قبل الشراء.',
    rfqConversionHelper: 'إذا كنت غير متأكد من النظام المناسب لمشروعك، أرسل معلومات المشروع للمراجعة.',
    rfqConversionPrimary: 'احصل على مراجعة هندسية مجانية',
    rfqConversionSecondary: 'إرسال معلومات المشروع',
    rfqConversionTrust: ['خبرة في مشاريع صناعية منفذة', 'مراجعة هندسية قبل الشراء', 'تنسيق التفاصيل والتركيب'],
    detailConsultationTitle: 'هل تحتاج إلى إرشاد فني لمشروعك؟',
    detailConsultationDescription: 'سواء كنت تقيّم الأنظمة أو تقارن الموردين أو تراجع الكميات أو تعد رسومات التنفيذ، يمكن لفريقنا الهندسي المساعدة قبل بدء التوريد.',
    detailConsultationButton: 'طلب مراجعة هندسية',
    detailCatalogButton: 'تحميل الكتالوج الفني',
    exploreSystemLabel: 'استكشاف النظام',
    viewProjectLabel: 'عرض المشروع',
    contextualSystemPrefix: 'لمزيد من السياق حول هذا الحل، راجع',
    contextualSystemSuffix: 'كنظام ذي صلة.',
    contextualProjectPrefix: 'لرؤية مثال منفذ لهذا النهج، راجع',
    contextualProjectSuffix: 'في مكتبة المشاريع.',
    sortLabel: 'ترتيب',
    sortNewest: 'الأحدث',
    sortOldest: 'الأقدم',
    sortRecommended: 'الموصى به',
    sortShorterRead: 'وقت قراءة أقصر',
    heroVisualLabel1: 'تخطيط الألواح',
    heroVisualLabel2: 'تفاصيل العزل المائي',
    breadcrumbAriaLabel: 'مسار التنقل',
    filterAriaLabel: 'فئات الموارد'
  },
  ru: {
    eyebrow: 'Инженерный ресурс SIPANEL',
    requestConsultation: 'Запросить техническую консультацию',
    relatedSystem: 'Связанная система',
    viewDetails: 'Подробнее',
    pendingFile: 'Прямая загрузка скоро будет доступна. Оставьте контактные данные, чтобы получить текущую версию.',
    pendingLead: 'Оставьте контактные данные для получения этого ресурса.',
    comingSoon: 'Скоро',
    summaryTitle: 'Описание ресурса',
    summaryType: 'Тип ресурса',
    summaryCategory: 'Категория',
    summaryDifficulty: 'Уровень',
    summaryReadTime: 'Время чтения',
    summaryFileStatus: 'Доступность',
    summaryFileStatusPending: 'Доступен по запросу',
    preparedByLabel: 'Подготовлено',
    reviewedByLabel: 'Техническая проверка',
    lastUpdatedLabel: 'Последнее обновление',
    authorityNote: 'Материалы этого раздела подготовлены на основе опыта SIPANEL в проектировании, поставке и выполнении промышленных ограждающих систем на реальных проектах.',
    contextTitle: 'Технический контекст',
    introductionTitle: 'Введение',
    useWhenTitle: 'Когда использовать это руководство?',
    keyTechnicalPointsTitle: 'Ключевые технические пункты',
    commonMistakesTitle: 'Типичные ошибки',
    previewTitle: 'Содержание ресурса',
    previewNote: 'Структурированный обзор основных разделов данного ресурса.',
    downloadTitle: 'Получить ресурс',
    downloadNote: 'Для отправки файла и технической поддержки, пожалуйста, укажите контактные данные.',
    downloadPendingNote: 'Этот ресурс готовится нашей инженерной командой. Оставьте контактные данные, и мы свяжемся с вами напрямую.',
    downloadRequested: 'Запрашиваемый ресурс',
    downloadSubmit: 'Получить ресурс',
    downloadSending: 'Отправка...',
    downloadSuccess: 'Ваш запрос получен. Загрузка начнётся в ближайшее время.',
    downloadSuccessPending: 'Ваш запрос получен. Этот ресурс сейчас готовится. Наша инженерная команда свяжется с вами в ближайшее время.',
    downloadError: 'Не удалось отправить запрос. Проверьте поля и попробуйте снова.',
    sectionBrowse: 'Обзор по инженерной теме',
    sectionFeatured: 'Рекомендуемые материалы',
    sectionLibrary: 'Библиотека инженерных ресурсов',
    sectionExplore: 'Изучите связанные системы',
    relatedSystemsTitle: 'Связанные системы',
    relatedResourcesTitle: 'Связанные ресурсы',
    pendingBadge: 'Доступен по запросу',
    verifiedBadge: 'Готов к загрузке',
    fieldName: 'Полное имя',
    fieldCompany: 'Компания',
    fieldPhone: 'Мобильный номер',
    fieldProjectType: 'Тип проекта',
    fieldMessage: 'Примечания',
    privacyNote: 'Ваши данные используются только для отправки ресурса и технической поддержки.',
    indexLeadTitle: 'Получить инженерные ресурсы',
    indexLeadNote: 'Укажите контактные данные для получения технических ресурсов.',
    relatedProjectsTitle: 'Связанные проекты',
    relatedProjectsProofIntro: 'Этот ресурс основан на исполнительном опыте SIPANEL и технических решениях реальных проектов.',
    hasRelatedProjects: 'Включает примеры связанных проектов',
    rfqConversionTitle: 'Перед выбором ограждающей системы проверьте технические риски проекта.',
    rfqConversionDescription:
      'Тип ограждающей системы, узлы выполнения, климатические условия и метод монтажа напрямую влияют на стоимость, долговечность и эксплуатационные характеристики проекта. Инженеры SIPANEL могут проверить технический путь до закупки.',
    rfqConversionHelper: 'Если вы сомневаетесь в выборе подходящей системы, отправьте данные проекта на проверку.',
    rfqConversionPrimary: 'Получить бесплатную инженерную проверку',
    rfqConversionSecondary: 'Отправить данные проекта',
    rfqConversionTrust: ['Опыт реализованных промышленных проектов', 'Инженерная проверка до закупки', 'Координация узлов и монтажа'],
    detailConsultationTitle: 'Нужна техническая консультация для вашего проекта?',
    detailConsultationDescription: 'Оцениваете системы, сравниваете поставщиков, проверяете объёмы или готовите рабочие чертежи — наша инженерная команда поможет до начала закупок.',
    detailConsultationButton: 'Запросить инженерную проверку',
    detailCatalogButton: 'Скачать технический каталог',
    exploreSystemLabel: 'Изучить систему',
    viewProjectLabel: 'Смотреть проект',
    contextualSystemPrefix: 'Для дополнительного контекста по этому решению смотрите',
    contextualSystemSuffix: 'как связанную систему.',
    contextualProjectPrefix: 'Пример реализации этого подхода смотрите в проекте',
    contextualProjectSuffix: 'в библиотеке проектов.',
    sortLabel: 'Сортировка',
    sortNewest: 'Сначала новые',
    sortOldest: 'Сначала старые',
    sortRecommended: 'Рекомендуемые',
    sortShorterRead: 'Меньше времени чтения',
    heroVisualLabel1: 'Раскладка панелей',
    heroVisualLabel2: 'Узел гидроизоляции',
    breadcrumbAriaLabel: 'Навигация',
    filterAriaLabel: 'Категории ресурсов'
  }
};

type SystemKey = 'sandwich_panel' | 'standing_seam_zip' | 'aluminium_cladding' | 'daylighting';

const systemRoutes: Record<SystemKey, string> = {
  sandwich_panel: '/systems/sandwich-panel-systems',
  standing_seam_zip: '/systems/standing-seam-zip-tech-roofing',
  aluminium_cladding: '/systems/aluminium-cladding-covering',
  daylighting: '/systems/daylighting-transparent-roofing'
};

const systemImages: Record<SystemKey, StaticImageData> = {
  sandwich_panel: sandwichPanelCover,
  standing_seam_zip: standingSeamCover,
  aluminium_cladding: aluminiumCladdingCover,
  daylighting: daylightingCover
};

const systemLabels: Record<Locale, Record<SystemKey, {name: string; description: string}>> = {
  en: {
    sandwich_panel: {name: 'Sandwich Panel Systems', description: 'Insulated wall and roof panels with thermal insulation cores for industrial buildings.'},
    standing_seam_zip: {name: 'Standing Seam & ZIP Roofing', description: 'Concealed-fastener roofing with long-term waterproofing, flashing coordination, and gutter integration.'},
    aluminium_cladding: {name: 'Aluminium Cladding & Covering', description: 'Facade cladding systems with flashing details and weatherproofing for industrial envelopes.'},
    daylighting: {name: 'Glass & Polycarbonate Daylighting', description: 'Skylight and transparent roofing systems for natural light delivery in commercial and industrial buildings.'}
  },
  fa: {
    sandwich_panel: {name: 'سیستم\u200cهای ساندویچ پانل', description: 'پانل\u200cهای عایق دیوار و سقف با هسته عایق حرارتی برای ساختمان\u200cهای صنعتی.'},
    standing_seam_zip: {name: 'سقف ایستادرز و ZIP', description: 'سقف فلزی با اتصال مخفی، آب\u200cبندی بلندمدت، هماهنگی فلاشینگ و ادغام آبرو.'},
    aluminium_cladding: {name: 'کلادینگ و پوشش آلومینیومی', description: 'سیستم\u200cهای نمای آلومینیومی با دیتیل فلاشینگ و حفاظت آب\u200cوهوایی برای پوسته\u200cهای صنعتی.'},
    daylighting: {name: 'نورگیر شیشه‌ای و پلی‌کربنات', description: 'سیستم‌های نورگیر و سقف شفاف برای تأمین نور طبیعی در ساختمان‌های تجاری و صنعتی.'}
  },
  ar: {
    sandwich_panel: {name: 'أنظمة ألواح الساندويتش', description: 'ألواح معزولة بقلب عازل حراري للجدران والأسقف في المباني الصناعية.'},
    standing_seam_zip: {name: 'أسقف قائمة و ZIP', description: 'أسقف معدنية بتثبيت مخفي مع عزل مائي طويل الأمد وتنسيق فلاشينغ وتكامل مزاريب.'},
    aluminium_cladding: {name: 'كلادينج وتغطية ألومنيوم', description: 'أنظمة واجهات ألومنيوم مع تفاصيل فلاشينغ وحماية من العوامل الجوية للأغلفة الصناعية.'},
    daylighting: {name: 'إضاءة طبيعية زجاجية وبولي كربونات', description: 'أنظمة المناور والأسقف الشفافة لتوصيل الضوء الطبيعي في المباني التجارية والصناعية.'}
  },
  ru: {
    sandwich_panel: {name: 'Сэндвич-панельные системы', description: 'Утеплённые панели с теплоизоляционным сердечником для стен и кровли промышленных зданий.'},
    standing_seam_zip: {name: 'Фальцевая и ZIP-кровля', description: 'Металлическая кровля со скрытым креплением, долгосрочной гидроизоляцией, координацией примыканий и желобов.'},
    aluminium_cladding: {name: 'Алюминиевый фасадный клад', description: 'Фасадные системы с узлами примыканий и защитой от атмосферных воздействий для промышленных оболочек.'},
    daylighting: {name: 'Светопрозрачные системы', description: 'Системы световых фонарей и прозрачных кровель для естественного освещения коммерческих и промышленных зданий.'}
  }
};

const resourceRelatedSystems: Record<string, SystemKey[]> = {
  roof_leakage_prevention_checklist: ['standing_seam_zip', 'sandwich_panel'],
  sandwich_panel_selection_guide: ['sandwich_panel'],
  shop_drawing_review_guide: ['sandwich_panel', 'standing_seam_zip'],
  standing_seam_roof_detail_notes: ['standing_seam_zip'],
  aluminium_cladding_layout_checklist: ['aluminium_cladding'],
  mto_procurement_planning_sheet: ['sandwich_panel', 'standing_seam_zip', 'aluminium_cladding']
};

export type RelatedSystem = {
  key: SystemKey;
  name: string;
  description: string;
  href: string;
  image: StaticImageData;
};

const relatedServiceByCategory: Record<ResourceCategoryId, string> = {
  technical_guides: '/systems/sandwich-panel-systems',
  execution_details: '/systems/standing-seam-zip-tech-roofing',
  procurement_and_supply: '/systems/sandwich-panel-systems',
  case_studies: '/#case-studies-preview',
  datasheets: '/systems/aluminium-cladding-covering'
};

const technicalContextByCategory: Record<Locale, Record<ResourceCategoryId, {description: string; points: string[]}>> = {
  en: {
    technical_guides: {
      description: 'Technical guides cover sandwich panel selection, core types, thickness, thermal insulation values, joint logic, standing seam and ZIP roof drainage, and system comparison to support informed decisions before procurement.',
      points: ['Sandwich panel and roofing system selection criteria', 'Thermal insulation and joint coordination', 'Procurement review before ordering']
    },
    execution_details: {
      description: 'Execution detail resources cover shop drawings, flashing logic, waterproofing sequences, gutter and drainage coordination, facade layout, and site checkpoints for industrial envelope installation.',
      points: ['Shop drawing and layout verification', 'Flashing, waterproofing, and gutter control', 'Installation sequence review']
    },
    procurement_and_supply: {
      description: 'Procurement resources support quantity planning for panels, flashings, fasteners, trims, and accessories — helping reduce material gaps and waste before project cost becomes fixed.',
      points: ['MTO and accessory planning', 'Flashing and fastener scope review', 'Procurement readiness before execution']
    },
    case_studies: {
      description: 'Case studies document real SIPANEL project decisions on sandwich panels, standing seam roofing, ZIP systems, aluminium cladding, waterproofing, and industrial envelope coordination.',
      points: ['Real project documentation', 'Engineering decision rationale', 'Measured performance results']
    },
    datasheets: {
      description: 'Datasheets provide standardized specifications for sandwich panels, aluminium cladding, thermal insulation materials, roofing components, and industrial envelope accessories.',
      points: ['Panel and insulation specifications', 'Performance and testing data', 'Compliance and certification references']
    }
  },
  fa: {
    technical_guides: {
      description: 'راهنماهای فنی شامل انتخاب ساندویچ پانل، نوع هسته، ضخامت، مقادیر عایق\u200cکاری حرارتی، منطق اتصال، زهکشی سقف ایستادرز و ZIP و مقایسه سیستم\u200cها برای تصمیم\u200cگیری پیش از خرید.',
      points: ['معیارهای انتخاب ساندویچ پانل و سیستم سقف', 'هماهنگی عایق حرارتی و اتصالات', 'بررسی خرید پیش از سفارش']
    },
    execution_details: {
      description: 'منابع جزئیات اجرایی شامل نقشه شاپ، منطق فلاشینگ، توالی آب\u200cبندی، هماهنگی آبرو و زهکشی، چیدمان نما و نقاط کنترل نصب پوشش صنعتی.',
      points: ['بازبینی نقشه شاپ و چیدمان', 'کنترل فلاشینگ، آب\u200cبندی و آبرو', 'بررسی توالی نصب']
    },
    procurement_and_supply: {
      description: 'منابع خرید برای برنامه\u200cریزی مقادیر پانل، فلاشینگ، پیچ، تریم و متعلقات — کاهش کسری متریال و پرت پیش از قطعی شدن هزینه پروژه.',
      points: ['برنامه\u200cریزی MTO و متعلقات', 'بررسی دامنه فلاشینگ و پیچ', 'آمادگی خرید پیش از اجرا']
    },
    case_studies: {
      description: 'مطالعات موردی، تصمیمات واقعی پروژه\u200cهای SIPANEL را درباره ساندویچ پانل، سقف ایستادرز، سیستم ZIP، کلادینگ آلومینیومی، آب\u200cبندی و هماهنگی پوشش صنعتی مستند می\u200cکنند.',
      points: ['مستندات پروژه واقعی', 'دلایل تصمیم\u200cگیری مهندسی', 'نتایج عملکردی اندازه\u200cگیری\u200cشده']
    },
    datasheets: {
      description: 'دیتاشیت\u200cها شامل مشخصات استاندارد ساندویچ پانل، کلادینگ آلومینیومی، عایق\u200cهای حرارتی، اجزای سقف و متعلقات پوشش صنعتی.',
      points: ['مشخصات پانل و عایق', 'داده\u200cهای عملکرد و آزمایش', 'مراجع استاندارد و گواهینامه']
    }
  },
  ar: {
    technical_guides: {
      description: 'تغطي الأدلة الفنية اختيار ألواح الساندويتش وأنواع القلب والسماكة وقيم العزل الحراري ومنطق الوصل وتصريف أسقف ستاندينغ سيم وZIP ومقارنة الأنظمة لدعم القرارات قبل الشراء.',
      points: ['معايير اختيار الساندويتش وأنظمة الأسقف', 'تنسيق العزل الحراري والوصلات', 'مراجعة الشراء قبل الطلب']
    },
    execution_details: {
      description: 'تشمل موارد التفاصيل التنفيذية رسومات الشوب دروينغ ومنطق الفلاشينغ وتسلسل العزل المائي وتنسيق المزاريب والتصريف وتخطيط الواجهات ونقاط تفتيش تركيب الغلاف الصناعي.',
      points: ['التحقق من الرسومات والتخطيط', 'ضبط الفلاشينغ والعزل المائي والمزاريب', 'مراجعة تسلسل التركيب']
    },
    procurement_and_supply: {
      description: 'تدعم موارد المشتريات تخطيط كميات الألواح والفلاشينغ والمثبتات والتشطيبات والملحقات — لتقليل نقص المواد والهدر قبل تثبيت تكلفة المشروع.',
      points: ['تخطيط MTO والملحقات', 'مراجعة نطاق الفلاشينغ والمثبتات', 'جاهزية الشراء قبل التنفيذ']
    },
    case_studies: {
      description: 'توثق دراسات الحالة قرارات مشاريع SIPANEL الحقيقية حول ألواح الساندويتش وأسقف ستاندينغ سيم وأنظمة ZIP والكلادينج الألومنيوم والعزل المائي وتنسيق الغلاف الصناعي.',
      points: ['توثيق المشاريع الحقيقية', 'أسباب القرارات الهندسية', 'نتائج الأداء المقاسة']
    },
    datasheets: {
      description: 'توفر نشرات البيانات مواصفات موحدة لألواح الساندويتش والكلادينج الألومنيوم ومواد العزل الحراري ومكونات الأسقف وملحقات الغلاف الصناعي.',
      points: ['مواصفات الألواح والعزل', 'بيانات الأداء والاختبار', 'مراجع المعايير والشهادات']
    }
  },
  ru: {
    technical_guides: {
      description: 'Руководства охватывают выбор сэндвич-панелей, типы сердечника, толщину, теплоизоляцию, логику стыков, водоотвод фальцевой и ZIP-кровли и сравнение систем для обоснованных решений до закупки.',
      points: ['Критерии выбора панелей и кровельных систем', 'Координация теплоизоляции и стыков', 'Проверка закупки до заказа']
    },
    execution_details: {
      description: 'Ресурсы по исполнительным деталям охватывают рабочие чертежи, логику примыканий, последовательность гидроизоляции, координацию желобов и водоотвода, фасадную раскладку и контрольные точки монтажа.',
      points: ['Проверка чертежей и раскладки', 'Контроль примыканий, гидроизоляции и желобов', 'Проверка последовательности монтажа']
    },
    procurement_and_supply: {
      description: 'Закупочные ресурсы поддерживают планирование количеств панелей, примыканий, крепежа, доборных элементов — снижение дефицита и отходов до фиксации стоимости проекта.',
      points: ['Планирование MTO и комплектующих', 'Проверка объёма примыканий и крепежа', 'Готовность закупки до начала работ']
    },
    case_studies: {
      description: 'Кейсы документируют реальные решения SIPANEL по сэндвич-панелям, фальцевой кровле, ZIP-системам, алюминиевой облицовке, гидроизоляции и координации промышленной оболочки.',
      points: ['Документация реальных проектов', 'Обоснование инженерных решений', 'Измеренные результаты работы']
    },
    datasheets: {
      description: 'Паспорта содержат стандартные характеристики сэндвич-панелей, алюминиевой облицовки, теплоизоляционных материалов, кровельных компонентов и комплектующих промышленных систем.',
      points: ['Характеристики панелей и изоляции', 'Данные испытаний и производительности', 'Ссылки на стандарты и сертификаты']
    }
  }
};

const previewSectionsByCategory: Record<Locale, Record<ResourceCategoryId, Array<{title: string; description: string}>>> = {
  en: {
    technical_guides: [
      {title: 'System Selection Inputs', description: 'Building use, thermal insulation needs, panel thickness, core selection, and joint logic.'},
      {title: 'Coordination Checks', description: 'Accessories, flashing transitions, openings, and installation constraints.'},
      {title: 'Procurement Readiness', description: 'Structured review before material ordering and site execution.'}
    ],
    execution_details: [
      {title: 'Drawing Scope', description: 'Panel layout, dimensions, accessories, flashings, gutters, and quantities.'},
      {title: 'Detail Coordination', description: 'Seam behavior, flashing logic, facade grid, waterproofing, and drainage transitions.'},
      {title: 'Pre-Installation Review', description: 'Technical checkpoints before site execution starts.'}
    ],
    procurement_and_supply: [
      {title: 'Quantity Planning', description: 'Panels, flashings, trims, fasteners, accessories, and gaps.'},
      {title: 'Cost Control Inputs', description: 'Waste, lead time, missing items, and procurement sequencing.'},
      {title: 'Ordering Readiness', description: 'Structured review before committing project materials.'}
    ],
    case_studies: [
      {title: 'Project Context', description: 'Building type, location, system requirements, and engineering constraints.'},
      {title: 'Decision Rationale', description: 'Why specific systems, details, and approaches were selected.'},
      {title: 'Measured Results', description: 'Performance outcomes and risk prevention achieved.'}
    ],
    datasheets: [
      {title: 'Material Properties', description: 'Core type, density, thickness, weight, and fire classification.'},
      {title: 'Performance Data', description: 'Thermal insulation, acoustic, wind load, and weather resistance values.'},
      {title: 'Compliance References', description: 'Standards, certifications, and testing documentation.'}
    ]
  },
  fa: {
    technical_guides: [
      {title: 'ورودی\u200cهای انتخاب سیستم', description: 'کاربری ساختمان، نیاز عایق\u200cکاری حرارتی، ضخامت پانل، انتخاب هسته و منطق اتصال.'},
      {title: 'بررسی\u200cهای هماهنگی', description: 'متعلقات، انتقال فلاشینگ، بازشوها و محدودیت\u200cهای نصب.'},
      {title: 'آمادگی خرید', description: 'بازبینی ساختاری پیش از سفارش متریال و شروع اجرا.'}
    ],
    execution_details: [
      {title: 'دامنه نقشه', description: 'چیدمان پانل، ابعاد، متعلقات، فلاشینگ، آبرو و مقادیر.'},
      {title: 'هماهنگی دیتیل', description: 'رفتار درز، منطق فلاشینگ، گرید نما، آب\u200cبندی و انتقال زهکشی.'},
      {title: 'بازبینی پیش از نصب', description: 'نقاط کنترل فنی پیش از شروع اجرا در کارگاه.'}
    ],
    procurement_and_supply: [
      {title: 'برنامه\u200cریزی مقادیر', description: 'پانل، فلاشینگ، تریم، پیچ، متعلقات و کسری\u200cها.'},
      {title: 'ورودی\u200cهای کنترل هزینه', description: 'پرت، زمان تامین، اقلام ناقص و توالی خرید.'},
      {title: 'آمادگی سفارش', description: 'بازبینی ساختاری پیش از تعهد متریال پروژه.'}
    ],
    case_studies: [
      {title: 'زمینه پروژه', description: 'نوع ساختمان، محل، الزامات سیستم و محدودیت\u200cهای مهندسی.'},
      {title: 'دلایل تصمیم', description: 'چرا سیستم، دیتیل و رویکرد خاصی انتخاب شده است.'},
      {title: 'نتایج اندازه\u200cگیری\u200cشده', description: 'نتایج عملکردی و پیشگیری از ریسک.'}
    ],
    datasheets: [
      {title: 'خواص مصالح', description: 'نوع هسته، چگالی، ضخامت، وزن و کلاس حریق.'},
      {title: 'داده\u200cهای عملکرد', description: 'مقادیر عایق حرارتی، آکوستیک، بار باد و مقاومت آب\u200cوهوایی.'},
      {title: 'مراجع انطباق', description: 'استانداردها، گواهینامه\u200cها و مستندات آزمایش.'}
    ]
  },
  ar: {
    technical_guides: [
      {title: 'مدخلات اختيار النظام', description: 'استخدام المبنى واحتياجات العزل الحراري وسماكة اللوح واختيار القلب ومنطق الوصل.'},
      {title: 'فحوص التنسيق', description: 'الملحقات وانتقالات الفلاشينغ والفتحات وقيود التركيب.'},
      {title: 'جاهزية الشراء', description: 'مراجعة منظمة قبل طلب المواد وبدء التنفيذ.'}
    ],
    execution_details: [
      {title: 'نطاق الرسومات', description: 'تخطيط الألواح والأبعاد والملحقات والفلاشينغ والمزاريب والكميات.'},
      {title: 'تنسيق التفاصيل', description: 'سلوك الفواصل ومنطق الفلاشينغ وشبكة الواجهة والعزل المائي وانتقالات التصريف.'},
      {title: 'مراجعة ما قبل التركيب', description: 'نقاط تفتيش فنية قبل بدء التنفيذ في الموقع.'}
    ],
    procurement_and_supply: [
      {title: 'تخطيط الكميات', description: 'الألواح والفلاشينغ والتشطيبات والمثبتات والملحقات والنواقص.'},
      {title: 'مدخلات ضبط التكلفة', description: 'الهدر والمهل والعناصر الناقصة وتسلسل الشراء.'},
      {title: 'جاهزية الطلب', description: 'مراجعة منظمة قبل الالتزام بمواد المشروع.'}
    ],
    case_studies: [
      {title: 'سياق المشروع', description: 'نوع المبنى والموقع ومتطلبات النظام والقيود الهندسية.'},
      {title: 'أسباب القرار', description: 'لماذا تم اختيار أنظمة وتفاصيل ومناهج معينة.'},
      {title: 'النتائج المقاسة', description: 'نتائج الأداء والوقاية من المخاطر المحققة.'}
    ],
    datasheets: [
      {title: 'خصائص المواد', description: 'نوع القلب والكثافة والسماكة والوزن وتصنيف الحريق.'},
      {title: 'بيانات الأداء', description: 'قيم العزل الحراري والصوتي وحمل الرياح ومقاومة الطقس.'},
      {title: 'مراجع الامتثال', description: 'المعايير والشهادات ووثائق الاختبار.'}
    ]
  },
  ru: {
    technical_guides: [
      {title: 'Исходные данные выбора', description: 'Назначение здания, теплоизоляция, толщина панели, выбор сердечника и логика стыков.'},
      {title: 'Проверка координации', description: 'Аксессуары, переходы примыканий, проёмы и монтажные ограничения.'},
      {title: 'Готовность к закупке', description: 'Структурированная проверка до заказа материалов и начала работ.'}
    ],
    execution_details: [
      {title: 'Объём чертежей', description: 'Раскладка панелей, размеры, аксессуары, примыкания, желоба и количества.'},
      {title: 'Координация узлов', description: 'Поведение швов, логика примыканий, сетка фасада, гидроизоляция и переходы водоотвода.'},
      {title: 'Предмонтажная проверка', description: 'Технические контрольные точки до начала работ на площадке.'}
    ],
    procurement_and_supply: [
      {title: 'Планирование количеств', description: 'Панели, примыкания, доборные элементы, крепёж, аксессуары и пробелы.'},
      {title: 'Контроль стоимости', description: 'Отходы, сроки поставки, недостающие позиции и последовательность закупки.'},
      {title: 'Готовность к заказу', description: 'Структурированная проверка до фиксации материалов проекта.'}
    ],
    case_studies: [
      {title: 'Контекст проекта', description: 'Тип здания, расположение, требования к системе и инженерные ограничения.'},
      {title: 'Обоснование решений', description: 'Почему были выбраны конкретные системы, узлы и подходы.'},
      {title: 'Измеренные результаты', description: 'Достигнутые показатели и предотвращённые риски.'}
    ],
    datasheets: [
      {title: 'Свойства материалов', description: 'Тип сердечника, плотность, толщина, масса и класс огнестойкости.'},
      {title: 'Данные производительности', description: 'Теплоизоляция, акустика, ветровая нагрузка и погодоустойчивость.'},
      {title: 'Ссылки на стандарты', description: 'Стандарты, сертификаты и протоколы испытаний.'}
    ]
  }
};

const breadcrumbLabels: Record<Locale, {home: string; resources: string}> = {
  en: {home: 'Home', resources: 'Resources'},
  fa: {home: 'خانه', resources: 'منابع'},
  ar: {home: 'الرئيسية', resources: 'الموارد'},
  ru: {home: 'Главная', resources: 'Ресурсы'}
};

/**
 * Map resource IDs to their download file paths under /public/resources/.
 * When a PDF is ready, add its slug here. The file must exist at /public/resources/{filename}.
 * Resources not listed here will show as "pending" with an honest unavailable message.
 */
const resourceDownloadPaths: Record<string, string> = {
  // Example: sandwich_panel_selection_guide: '/resources/sandwich-panel-selection-guide.pdf',
};

function buildFeaturedResources(): ResourceHubCard[] {
  const resourcesSection = resourceHubSpec.page_sections.find(
    (section): section is Extract<ResourceHubSpec['page_sections'][number], {id: 'featured_resources'}> =>
      section.id === 'featured_resources'
  );

  if (!resourcesSection) {
    throw new Error('Missing featured_resources in engineering_resource_hub.json');
  }

  return resourcesSection.resources.map((resource, index) => {
    const preview = resourcePreviewData[resource.id] ?? {};
    const readTimeMatch = resource.read_time.match(/(\d+)/);

    return {
      id: resource.id,
      slug: resource.id.replaceAll('_', '-'),
      type: resource.type,
      category: resource.category,
      title: resource.title,
      description: resource.description,
      difficulty: resource.difficulty,
      readTime: resource.read_time,
      cta: resource.cta,
      leadCapture: resource.lead_capture,
      assetStatus: resourceDownloadPaths[resource.id] ? 'available' as const : 'pending_resource_file' as const,
      downloadPath: resourceDownloadPaths[resource.id],
      leadCaptureStatus: resource.lead_capture ? 'pending_lead_capture' as const : 'not_required' as const,
      relatedServiceHref: relatedServiceByCategory[resource.category],
      preview,
      relatedProjectSlugs: resourceRelatedProjects[resource.id] ?? [],
      recommendedOrder: index,
      sortDate: preview.updatedAt ?? '2026-01',
      sortReadTime: readTimeMatch ? Number.parseInt(readTimeMatch[1], 10) : 0
    };
  });
}

function getSection<T extends ResourceHubSpec['page_sections'][number]['id']>(
  id: T
): Extract<ResourceHubSpec['page_sections'][number], {id: T}> {
  const section = resourceHubSpec.page_sections.find((item): item is Extract<ResourceHubSpec['page_sections'][number], {id: T}> => item.id === id);

  if (!section) {
    throw new Error(`Missing ${id} in engineering_resource_hub.json`);
  }

  return section;
}

const categoryIds: ResourceCategoryId[] = [
  'technical_guides',
  'execution_details',
  'procurement_and_supply',
  'case_studies',
  'datasheets'
];

const categoryLabels: Record<Locale, {allResources: string; categories: Record<ResourceCategoryId, {label: string; description: string}>}> = {
  en: {
    allResources: 'All resources',
    categories: {
      technical_guides: {label: 'Technical Guides', description: 'Selection guides for sandwich panels, standing seam roofing, thermal insulation, and industrial envelope systems.'},
      execution_details: {label: 'Execution Details', description: 'Shop drawings, flashing details, waterproofing sequences, gutter coordination, and installation notes.'},
      procurement_and_supply: {label: 'Procurement & Supply', description: 'MTO planning, accessory checklists, and supplier evaluation for panels, flashings, and fasteners.'},
      case_studies: {label: 'Case Studies', description: 'Real project decisions on ZIP roofing, cladding layout, waterproofing, and envelope coordination.'},
      datasheets: {label: 'Datasheets', description: 'Specifications for sandwich panels, aluminium cladding, thermal insulation, and roofing components.'}
    }
  },
  fa: {
    allResources: 'همه منابع',
    categories: {
      technical_guides: {label: 'راهنماهای فنی', description: 'راهنمای انتخاب ساندویچ پانل، سقف ایستادرز، عایق\u200cکاری حرارتی و سیستم\u200cهای پوشش صنعتی.'},
      execution_details: {label: 'جزئیات اجرایی', description: 'نقشه شاپ، دیتیل فلاشینگ، آب\u200cبندی، هماهنگی آبرو و نکات نصب.'},
      procurement_and_supply: {label: 'خرید و تأمین', description: 'برنامه\u200cریزی MTO، چک\u200cلیست متعلقات و ارزیابی تامین\u200cکنندگان پانل، فلاشینگ و پیچ.'},
      case_studies: {label: 'مطالعات موردی', description: 'تصمیمات واقعی پروژه\u200cها درباره سقف ZIP، چیدمان کلادینگ، آب\u200cبندی و هماهنگی پوشش.'},
      datasheets: {label: 'دیتاشیت\u200cها', description: 'مشخصات فنی ساندویچ پانل، کلادینگ آلومینیومی، عایق حرارتی و اجزای سقف.'}
    }
  },
  ar: {
    allResources: 'جميع الموارد',
    categories: {
      technical_guides: {label: 'الأدلة الفنية', description: 'أدلة اختيار ألواح الساندويتش والأسقف القائمة والعزل الحراري وأنظمة الأغلفة الصناعية.'},
      execution_details: {label: 'التفاصيل التنفيذية', description: 'رسومات تنفيذية وتفاصيل فلاشينغ وتسلسل العزل المائي وتنسيق المزاريب وملاحظات التركيب.'},
      procurement_and_supply: {label: 'المشتريات والتوريد', description: 'تخطيط MTO وقوائم ملحقات وتقييم موردي الألواح والفلاشينغ والمثبتات.'},
      case_studies: {label: 'دراسات الحالة', description: 'قرارات مشاريع حقيقية حول أسقف ZIP وتخطيط الكلادينج والعزل المائي وتنسيق الأغلفة.'},
      datasheets: {label: 'نشرات البيانات', description: 'مواصفات ألواح الساندويتش والكلادينج الألومنيوم والعزل الحراري ومكونات الأسقف.'}
    }
  },
  ru: {
    allResources: 'Все ресурсы',
    categories: {
      technical_guides: {label: 'Технические руководства', description: 'Руководства по выбору сэндвич-панелей, фальцевой кровли, теплоизоляции и промышленных ограждающих систем.'},
      execution_details: {label: 'Исполнительные детали', description: 'Рабочие чертежи, узлы примыканий, гидроизоляция, координация желобов и монтажные заметки.'},
      procurement_and_supply: {label: 'Закупки и снабжение', description: 'Планирование MTO, чек-листы комплектующих и оценка поставщиков панелей, примыканий и крепежа.'},
      case_studies: {label: 'Кейсы', description: 'Реальные проектные решения по ZIP-кровле, раскладке облицовки, гидроизоляции и координации оболочки.'},
      datasheets: {label: 'Технические паспорта', description: 'Характеристики сэндвич-панелей, алюминиевой облицовки, теплоизоляции и кровельных компонентов.'}
    }
  }
};

type FaqSection = {title: string; items: Array<{question: string; answer: string}>};

const faqData: Record<Locale, FaqSection> = {
  fa: {
    title: 'سؤالات متداول',
    items: [
      {
        question: 'برای انتخاب ساندویچ پانل مناسب از کجا شروع کنیم؟',
        answer: 'ابتدا باید کاربری ساختمان، شرایط اقلیمی، دهانه\u200cها، نوع سازه، نیاز عایق\u200cکاری و جزئیات نصب بررسی شود. راهنماهای فنی SIPANEL برای همین مرحله طراحی شده\u200cاند.'
      },
      {
        question: 'سقف ایستادرز یا ZIP چه زمانی انتخاب بهتری است؟',
        answer: 'وقتی آب\u200cبندی بلندمدت، دهانه\u200cهای بزرگ، فرم\u200cهای خاص معماری یا کاهش ریسک نفوذ آب اهمیت بالایی دارد، سقف ایستادرز یا ZIP می\u200cتواند گزینه مناسب\u200cتری باشد.'
      },
      {
        question: 'آیا منابع این بخش جایگزین مشاوره مهندسی هستند؟',
        answer: 'خیر. این منابع برای تصمیم\u200cگیری اولیه و کاهش خطا طراحی شده\u200cاند. برای انتخاب نهایی سیستم، بررسی نقشه\u200cها و شرایط پروژه ضروری است.'
      },
      {
        question: 'آیا می\u200cتوانم قبل از خرید، نقشه یا دیتیل پروژه را برای بررسی ارسال کنم؟',
        answer: 'بله. می\u200cتوانید از طریق فرم تماس یا RFQ، اطلاعات اولیه پروژه را ارسال کنید تا تیم SIPANEL مسیر فنی مناسب را بررسی کند.'
      },
      {
        question: 'فلاشینگ و آبرو چه نقشی در آب\u200cبندی سقف صنعتی دارند؟',
        answer: 'فلاشینگ اتصال بین سقف و دیوار، نفوذی\u200cها و لبه\u200cها را آب\u200cبند می\u200cکند. آبرو مسیر جمع\u200cآوری و هدایت آب باران را فراهم می\u200cکند. اگر توالی نصب فلاشینگ با آبرو هماهنگ نباشد، ریسک نشتی بالا می\u200cرود.'
      },
      {
        question: 'عایق\u200cکاری حرارتی در انتخاب ساندویچ پانل چقدر اهمیت دارد؟',
        answer: 'عایق\u200cکاری حرارتی مستقیماً بر مصرف انرژی، شرایط داخلی و هزینه بهره\u200cبرداری ساختمان اثر می\u200cگذارد. نوع هسته پانل (PIR، PUR، پشم سنگ) و ضخامت آن باید با اقلیم و کاربری ساختمان تطبیق داده شود.'
      },
      {
        question: 'پوشش صنعتی ساختمان (Industrial Envelope) شامل چه اجزایی است؟',
        answer: 'پوشش صنعتی شامل سیستم سقف (ساندویچ پانل، ایستادرز یا ZIP)، سیستم دیوار (پانل یا کلادینگ آلومینیومی)، فلاشینگ، آبرو، عایق\u200cکاری و تمام متعلقات اتصال و آب\u200cبندی است.'
      }
    ]
  },
  en: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'Where should we start when selecting the right sandwich panel?',
        answer: 'Start by reviewing building use, climate conditions, spans, structure type, insulation requirements, and installation details. SIPANEL technical guides are designed for this exact decision stage.'
      },
      {
        question: 'When is standing seam or ZIP roofing a better choice?',
        answer: 'When long-term waterproofing, large spans, special architectural forms, or reducing water penetration risk are high priorities, standing seam or ZIP roofing can be the better option.'
      },
      {
        question: 'Do these resources replace engineering consultation?',
        answer: 'No. These resources are designed for initial decision-making and error reduction. Final system selection requires reviewing drawings and site-specific project conditions.'
      },
      {
        question: 'Can I send project drawings for review before purchasing?',
        answer: 'Yes. You can submit preliminary project information through the contact form or RFQ so the SIPANEL team can review the appropriate technical path.'
      },
      {
        question: 'What role do flashings and gutters play in industrial roof waterproofing?',
        answer: 'Flashings seal the transitions between roof and wall, penetrations, and edges. Gutters collect and direct rainwater. If flashing installation sequence is not coordinated with gutters, leakage risk increases significantly.'
      },
      {
        question: 'How important is thermal insulation in sandwich panel selection?',
        answer: 'Thermal insulation directly affects energy consumption, indoor conditions, and building operating costs. The panel core type (PIR, PUR, mineral wool) and thickness must match the climate and building use.'
      },
      {
        question: 'What does an industrial building envelope system include?',
        answer: 'An industrial envelope includes the roofing system (sandwich panel, standing seam, or ZIP), wall system (panel or aluminium cladding), flashings, gutters, thermal insulation, and all connection and waterproofing accessories.'
      }
    ]
  },
  ar: {
    title: 'الأسئلة الشائعة',
    items: [
      {
        question: 'من أين نبدأ عند اختيار لوح الساندويتش المناسب؟',
        answer: 'ابدأ بمراجعة استخدام المبنى والظروف المناخية والفتحات ونوع الهيكل ومتطلبات العزل وتفاصيل التركيب. أدلة SIPANEL الفنية مصممة لهذه المرحلة تحديدًا.'
      },
      {
        question: 'متى يكون السقف القائم أو ZIP خيارًا أفضل؟',
        answer: 'عندما تكون العزل المائي طويل الأمد والفتحات الكبيرة والأشكال المعمارية الخاصة أو تقليل مخاطر تسرب المياه ذات أولوية عالية، يمكن أن يكون السقف القائم أو ZIP الخيار الأفضل.'
      },
      {
        question: 'هل تحل هذه الموارد محل الاستشارة الهندسية؟',
        answer: 'لا. هذه الموارد مصممة لاتخاذ القرارات الأولية وتقليل الأخطاء. يتطلب الاختيار النهائي للنظام مراجعة الرسومات وظروف المشروع الفعلية.'
      },
      {
        question: 'هل يمكنني إرسال رسومات المشروع للمراجعة قبل الشراء؟',
        answer: 'نعم. يمكنك إرسال معلومات المشروع الأولية من خلال نموذج الاتصال أو طلب عرض الأسعار ليراجع فريق SIPANEL المسار الفني المناسب.'
      },
      {
        question: 'ما دور الفلاشينغ والمزاريب في العزل المائي للأسقف الصناعية؟',
        answer: 'يغلق الفلاشينغ الانتقالات بين السقف والجدار والاختراقات والحواف. تجمع المزاريب مياه الأمطار وتوجهها. إذا لم يتم تنسيق تسلسل تركيب الفلاشينغ مع المزاريب، يزداد خطر التسرب بشكل كبير.'
      },
      {
        question: 'ما أهمية العزل الحراري في اختيار ألواح الساندويتش؟',
        answer: 'يؤثر العزل الحراري مباشرة على استهلاك الطاقة والظروف الداخلية وتكاليف التشغيل. يجب مطابقة نوع القلب (PIR أو PUR أو الصوف الصخري) والسماكة مع المناخ واستخدام المبنى.'
      },
      {
        question: 'ماذا يشمل نظام غلاف المبنى الصناعي؟',
        answer: 'يشمل الغلاف الصناعي نظام السقف (ساندويتش أو قائم أو ZIP) ونظام الجدار (ألواح أو كلادينج ألومنيوم) والفلاشينغ والمزاريب والعزل الحراري وجميع ملحقات الوصل والعزل المائي.'
      }
    ]
  },
  ru: {
    title: 'Часто задаваемые вопросы',
    items: [
      {
        question: 'С чего начать выбор подходящей сэндвич-панели?',
        answer: 'Начните с анализа назначения здания, климатических условий, пролётов, типа конструкции, требований к теплоизоляции и деталей монтажа. Технические руководства SIPANEL разработаны именно для этого этапа.'
      },
      {
        question: 'Когда фальцевая или ZIP-кровля будет лучшим выбором?',
        answer: 'Когда приоритетами являются долгосрочная гидроизоляция, большие пролёты, сложные архитектурные формы или снижение риска проникновения воды, фальцевая или ZIP-кровля может быть более подходящим вариантом.'
      },
      {
        question: 'Заменяют ли эти ресурсы инженерную консультацию?',
        answer: 'Нет. Эти ресурсы предназначены для первичного принятия решений и снижения ошибок. Окончательный выбор системы требует анализа чертежей и условий конкретного проекта.'
      },
      {
        question: 'Могу ли я отправить чертежи проекта на проверку перед покупкой?',
        answer: 'Да. Вы можете отправить предварительную информацию о проекте через контактную форму или запрос коммерческого предложения, чтобы команда SIPANEL проверила подходящий технический путь.'
      },
      {
        question: 'Какова роль примыканий и желобов в гидроизоляции промышленной кровли?',
        answer: 'Примыкания герметизируют переходы между кровлей и стеной, проходки и края. Желоба собирают и отводят дождевую воду. Если последовательность монтажа примыканий не согласована с желобами, риск протечек значительно возрастает.'
      },
      {
        question: 'Насколько важна теплоизоляция при выборе сэндвич-панелей?',
        answer: 'Теплоизоляция напрямую влияет на энергопотребление, микроклимат и эксплуатационные расходы. Тип сердечника (PIR, PUR, минеральная вата) и толщина должны соответствовать климату и назначению здания.'
      },
      {
        question: 'Что включает в себя промышленная ограждающая система здания?',
        answer: 'Промышленная оболочка включает кровельную систему (сэндвич-панели, фальцевая или ZIP), стеновую систему (панели или алюминиевая облицовка), примыкания, желоба, теплоизоляцию и все соединительные и гидроизоляционные аксессуары.'
      }
    ]
  }
};

const localeSeoData: Record<Locale, ResourceHubLocaleSeo> = {
  en: {
    title: 'Industrial Envelope Resource Hub | SIPANEL Guides & Checklists',
    meta_description: 'Technical guides, checklists, and execution details for sandwich panels, standing seam roofing, ZIP roofing, aluminium cladding, waterproofing, flashing, gutters, and thermal insulation.',
    detailSuffix: 'SIPANEL Knowledge Center'
  },
  fa: {
    title: 'مرکز دانش پوشش صنعتی ساختمان | راهنماها و چک\u200cلیست\u200cهای SIPANEL',
    meta_description: 'راهنماهای فنی، چک\u200cلیست و جزئیات اجرایی ساندویچ پانل، سقف ایستادرز، ZIP، کلادینگ آلومینیومی، آب\u200cبندی، فلاشینگ، آبرو و عایق\u200cکاری حرارتی.',
    detailSuffix: 'مرکز دانش SIPANEL'
  },
  ar: {
    title: 'مركز موارد أغلفة المباني الصناعية | أدلة SIPANEL وقوائم التحقق',
    meta_description: 'أدلة فنية وقوائم تحقق وتفاصيل تنفيذية لألواح الساندويتش والأسقف القائمة وZIP والكلادينج الألومنيوم والعزل المائي والفلاشينغ والمزاريب والعزل الحراري.',
    detailSuffix: 'مركز معرفة SIPANEL'
  },
  ru: {
    title: 'Центр знаний по промышленным ограждающим системам | SIPANEL',
    meta_description: 'Руководства, чек-листы и исполнительные детали для сэндвич-панелей, фальцевой кровли, ZIP, алюминиевой облицовки, гидроизоляции, примыканий, желобов и теплоизоляции.',
    detailSuffix: 'Центр знаний SIPANEL'
  }
};

const heroOverrides: Partial<Record<Locale, Partial<ResourceHubLocaleContent['hero']>>> = {
  fa: {
    eyebrow: 'کتابخانه فنی SIPANEL',
    h1: 'مرکز دانش مهندسی پوشش\u200cهای صنعتی',
    subheadline:
      'راهنماهای فنی، چک\u200cلیست\u200cهای خرید، دیتاشیت\u200cها، جزئیات اجرایی و تجربه\u200cهای واقعی پروژه\u200cهای SIPANEL برای انتخاب دقیق\u200cتر، خرید مطمئن\u200cتر و اجرای کم\u200cریسک\u200cتر پوشش ساختمان\u200cهای صنعتی.',
    trustMicrocopy:
      'مناسب برای کارفرمایان، مشاوران، پیمانکاران و تیم\u200cهای خرید پروژه\u200cهای صنعتی.',
    primaryCta: 'دانلود راهنمای انتخاب پوشش صنعتی',
    primaryCtaHref: '/resources/sandwich-panel-selection-guide',
    secondaryCta: 'دریافت بررسی مهندسی رایگان',
    secondaryCtaHref: '/contact#rfq'
  },
  ar: {
    eyebrow: 'المكتبة الفنية SIPANEL',
    h1: 'مركز المعرفة الهندسية لأغلفة المباني الصناعية',
    subheadline:
      'أدلة فنية وقوائم تحقق ونشرات بيانات وتفاصيل تنفيذية لألواح الساندويتش والأسقف القائمة وZIP والكلادينج الألومنيوم والعزل المائي والعزل الحراري من مشاريع SIPANEL الحقيقية.',
    trustMicrocopy:
      'مصمم لأصحاب المشاريع والمستشارين والمقاولين وفرق المشتريات في المشاريع الصناعية.',
    primaryCta: 'تحميل دليل اختيار ألواح الساندويتش',
    primaryCtaHref: '/resources/sandwich-panel-selection-guide',
    secondaryCta: 'طلب مراجعة هندسية مجانية',
    secondaryCtaHref: '/contact#rfq'
  },
  ru: {
    eyebrow: 'Техническая библиотека SIPANEL',
    h1: 'Центр инженерных знаний по промышленным ограждающим системам',
    subheadline:
      'Руководства, чек-листы, паспорта и исполнительные детали для сэндвич-панелей, фальцевой кровли, ZIP, алюминиевой облицовки, гидроизоляции и теплоизоляции на основе реальных проектов SIPANEL.',
    trustMicrocopy:
      'Для заказчиков, проектировщиков, подрядчиков и закупочных команд промышленных проектов.',
    primaryCta: 'Скачать руководство по выбору панелей',
    primaryCtaHref: '/resources/sandwich-panel-selection-guide',
    secondaryCta: 'Запросить бесплатную инженерную проверку',
    secondaryCtaHref: '/contact#rfq'
  }
};

function buildBaseContent(): Omit<ResourceHubLocaleContent, 'allResourcesLabel' | 'ui' | 'categories' | 'localeSeo' | 'faq'> {
  const hero = getSection('resource_hub_hero');
  const leadCapture = getSection('resource_lead_capture');
  const relatedServices = getSection('related_services');
  const conversion = getSection('conversion_cta');

  return {
    seo: resourceHubSpec.seo,
    hero: {
      eyebrow: hero.content.eyebrow,
      h1: hero.content.h1,
      subheadline: hero.content.subheadline,
      primaryCta: hero.content.primary_cta,
      primaryCtaHref: '#lead-capture-download-flow',
      secondaryCta: hero.content.secondary_cta,
      secondaryCtaHref: '/contact#rfq-form',
      trustMicrocopy: hero.content.trust_microcopy,
      visualFallback: hero.visual.fallback
    },
    featuredResources: buildFeaturedResources(),
    leadCapture: {
      title: leadCapture.title,
      fields: leadCapture.form_fields,
      cta: leadCapture.cta
    },
    relatedServices: relatedServices.cards.map((card) => ({
      title: card.title,
      href: card.link
    })),
    conversionCta: conversion,
    relatedLinks: [
      {label: 'Sandwich Panel Systems', href: '/systems/sandwich-panel-systems'},
      {label: 'Standing Seam & ZIP Tech Roofing', href: '/systems/standing-seam-zip-tech-roofing'},
      {label: 'Aluminium Cladding & Covering', href: '/systems/aluminium-cladding-covering'},
      {label: 'Project Proof', href: '/#case-studies-preview'}
    ]
  };
}

function buildLocaleContentMap() {
  const base = buildBaseContent();

  return Object.fromEntries(
    locales.map((locale) => {
      const labels = categoryLabels[locale];
      const localeHero = heroOverrides[locale]
        ? {...base.hero, ...heroOverrides[locale]}
        : base.hero;

      const localeSystemKeys: SystemKey[] = ['sandwich_panel', 'standing_seam_zip', 'aluminium_cladding'];

      const content: ResourceHubLocaleContent = {
        ...base,
        localeSeo: localeSeoData[locale],
        hero: localeHero,
        allResourcesLabel: labels.allResources,
        ui: uiLabels[locale],
        relatedServices: localeSystemKeys.map((key) => ({
          title: systemLabels[locale][key].name,
          href: systemRoutes[key]
        })),
        categories: categoryIds.map((id) => ({
          id,
          label: labels.categories[id].label,
          description: labels.categories[id].description
        })),
        featuredResources: base.featuredResources.map((resource) => {
          const defaultAuthority = defaultResourceAuthority[locale];
          const resourceAuthority = resourceAuthorityData[resource.id]?.[locale] ?? {};

          return {
            ...resource,
            title: resourceDetailContent[resource.id]?.[locale]?.title ?? resource.title,
            description: resourceDetailContent[resource.id]?.[locale]?.summary ?? resource.description,
            difficulty: difficultyLabels[locale][resource.difficulty] ?? resource.difficulty,
            cta: ctaLabels[locale][resource.cta] ?? resource.cta,
            authorName: resourceAuthority.authorName ?? defaultAuthority.authorName,
            authorRole: resourceAuthority.authorRole ?? defaultAuthority.authorRole,
            reviewedBy: resourceAuthority.reviewedBy ?? defaultAuthority.reviewedBy,
            reviewedByRole: resourceAuthority.reviewedByRole ?? defaultAuthority.reviewedByRole,
            updatedAt: resource.updatedAt ?? resource.preview.updatedAt
          };
        }),
        faq: faqData[locale]
      };

      return [locale, content];
    })
  ) as Record<Locale, ResourceHubLocaleContent>;
}

export const engineeringResourceHubPage: ResourceHubPageData = {
  routes: resourceHubSpec.route,
  localeContent: buildLocaleContentMap()
};

export function getEngineeringResourceHubPage() {
  return engineeringResourceHubPage;
}

export function getEngineeringResourceHubMetadata(locale: Locale) {
  const content = engineeringResourceHubPage.localeContent[locale];

  return buildPageMetadata({
    locale,
    title: content.localeSeo.title,
    description: content.localeSeo.meta_description,
    routes: engineeringResourceHubPage.routes
  });
}

export function getResourceDetailPage(locale: Locale, slug: string): ResourceDetailPageData | null {
  const content = engineeringResourceHubPage.localeContent[locale];
  const resource = content.featuredResources.find((item) => item.slug === slug);

  if (!resource) {
    return null;
  }

  const categoryLabel = content.categories.find((category) => category.id === resource.category)?.label ?? resource.category;
  const route = Object.fromEntries(locales.map((item) => [item, `/${item}/resources/${resource.slug}`])) as Record<Locale, string>;
  const relatedResources = content.featuredResources
    .filter((item) => item.slug !== resource.slug)
    .filter((item) => item.category === resource.category || item.leadCapture === resource.leadCapture)
    .slice(0, 3);

  const relatedProjects: RelatedProject[] = resource.relatedProjectSlugs
    .map((projectSlug): RelatedProject | null => {
      const caseStudy = getCaseStudyPageData(projectSlug);
      if (!caseStudy) return null;
      const hero = caseStudy.localeContent[locale].hero;
      const cardMeta = getCaseStudyCardMeta(projectSlug);
      return {
        slug: projectSlug,
        name: hero.projectName,
        location: hero.location,
        systemType: hero.projectType,
        reason: resourceProjectReasons[resource.id]?.[projectSlug]?.[locale],
        href: `/projects/${projectSlug}`,
        image: cardMeta?.cardImage,
        area: cardMeta?.area
      };
    })
    .filter((item): item is RelatedProject => item !== null);

  return {
    resource,
    categoryLabel,
    route,
    breadcrumbs: [...getEngineeringResourceHubBreadcrumbs(locale), {label: resource.title, href: route[locale]}],
    relatedSystems: (resourceRelatedSystems[resource.id] ?? []).map((key) => ({
      key,
      name: systemLabels[locale][key].name,
      description: systemLabels[locale][key].description,
      href: systemRoutes[key],
      image: systemImages[key]
    })),
    relatedResources: relatedResources.length > 0 ? relatedResources : content.featuredResources.filter((item) => item.slug !== resource.slug).slice(0, 3),
    relatedProjects,
    context: {
      title: uiLabels[locale].contextTitle,
      ...technicalContextByCategory[locale][resource.category]
    },
    detailContent: resourceDetailContent[resource.id][locale],
    previewSections: previewSectionsByCategory[locale][resource.category],
    conversionCta: content.conversionCta,
    leadCapture: content.leadCapture,
    ui: content.ui
  };
}

export function getAllResourceDetailStaticParams() {
  const content = engineeringResourceHubPage.localeContent.en;

  return locales.flatMap((locale) => content.featuredResources.map((resource) => ({locale, slug: resource.slug})));
}

export function getResourceDetailMetadata(locale: Locale, slug: string) {
  const page = getResourceDetailPage(locale, slug);

  if (!page) {
    return null;
  }

  const content = engineeringResourceHubPage.localeContent[locale];

  return buildPageMetadata({
    locale,
    title: `${page.resource.title} | ${content.localeSeo.detailSuffix}`,
    description: page.detailContent.seoDescription,
    routes: page.route,
    type: 'article'
  });
}

export function getEngineeringResourceHubBreadcrumbs(locale: Locale) {
  const labels = breadcrumbLabels[locale];

  return [
    {label: labels.home, href: `/${locale}`},
    {label: labels.resources, href: engineeringResourceHubPage.routes[locale]}
  ];
}

export function getResourceTypeLabel(type: ResourceHubCard['type'], locale: Locale = 'en') {
  return resourceTypeLabels[locale][type];
}

export function getProductionContactInfo() {
  return productionContactInfo;
}
