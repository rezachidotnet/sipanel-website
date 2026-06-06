import engineeringResourceHubSpec from '@/specs/pages/engineering_resource_hub.json';
import {locales, type Locale} from '@/i18n/routing';
import {getCaseStudyPageData} from '@/lib/case-studies/case-study-pages';
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
};

export type ResourcePreviewMeta = {
  pageCount?: number;
  fileSize?: string;
  readingTime?: string;
  format?: string;
  updatedAt?: string;
};

export type RelatedProject = {
  slug: string;
  name: string;
  location: string;
  systemType: string;
  href: string;
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
  assetStatus: 'pending_resource_file';
  leadCaptureStatus: 'pending_lead_capture' | 'not_required';
  relatedServiceHref: string;
  preview: ResourcePreviewMeta;
  relatedProjectSlugs: string[];
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

const resourcePreviewData: Record<string, ResourcePreviewMeta> = {
  roof_leakage_prevention_checklist: {pageCount: 8, fileSize: '1.2 MB', readingTime: '8 min', format: 'PDF', updatedAt: '2026-03'},
  sandwich_panel_selection_guide: {pageCount: 14, fileSize: '2.4 MB', readingTime: '10 min', format: 'PDF', updatedAt: '2026-03'},
  shop_drawing_review_guide: {pageCount: 12, fileSize: '1.8 MB', readingTime: '12 min', format: 'PDF', updatedAt: '2026-02'},
  standing_seam_roof_detail_notes: {pageCount: 6, readingTime: '9 min', format: 'PDF', updatedAt: '2026-03'},
  aluminium_cladding_layout_checklist: {pageCount: 7, fileSize: '1.1 MB', readingTime: '7 min', format: 'PDF', updatedAt: '2026-02'},
  mto_procurement_planning_sheet: {pageCount: 5, fileSize: '0.8 MB', readingTime: '6 min', format: 'PDF', updatedAt: '2026-03'}
};

const resourceRelatedProjects: Record<string, string[]> = {
  roof_leakage_prevention_checklist: ['shahre-babak-hall', 'andimeshk-stadium'],
  sandwich_panel_selection_guide: ['tabas-railway-facility', 'mahshahr-taxi-parking', 'tiran-gas-station'],
  shop_drawing_review_guide: ['sepehan-flower-market', 'absaar-water-park'],
  standing_seam_roof_detail_notes: ['shahre-babak-hall', 'megaparsmall-atrium'],
  aluminium_cladding_layout_checklist: ['shahr-babak-stadium-entrance', 'parand-city-entrance'],
  mto_procurement_planning_sheet: ['andimeshk-stadium', 'tabas-railway-facility']
};

type StatLabels = {pages: string; readingTime: string; minutes: string; updated: string};

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
  contextTitle: string;
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
  hasRelatedProjects: string;
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
    contextTitle: 'Technical Context',
    previewTitle: 'What\u2019s Inside',
    previewNote: 'A structured overview of the key sections covered in this resource.',
    downloadTitle: 'Get This Resource',
    downloadNote: 'To receive the file and enable technical follow-up, please enter your contact details.',
    downloadPendingNote: 'Direct download will be available soon. Submit your contact details to receive the current version.',
    downloadRequested: 'Requested resource',
    downloadSubmit: 'Get Resource',
    downloadSending: 'Sending...',
    downloadSuccess: 'Your request has been received. The resource link or follow-up details will be sent to you.',
    downloadSuccessPending: 'Your request has been received. The resource link or follow-up details will be sent to you.',
    downloadError: 'Could not send your request. Please check the fields and try again.',
    sectionBrowse: 'Browse by Engineering Topic',
    sectionFeatured: 'Featured Engineering Resources',
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
    hasRelatedProjects: 'Includes related project examples'
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
    contextTitle: 'زمینه فنی',
    previewTitle: 'محتوای این منبع',
    previewNote: 'مروری ساختاری بر بخش\u200cهای اصلی این منبع فنی.',
    downloadTitle: 'دریافت فایل فنی',
    downloadNote: 'برای ارسال فایل و امکان پیگیری فنی، لطفاً اطلاعات تماس خود را وارد کنید.',
    downloadPendingNote: 'دریافت مستقیم این فایل به\u200cزودی فعال می\u200cشود. برای دریافت نسخه فعلی، اطلاعات تماس خود را ارسال کنید.',
    downloadRequested: 'منبع درخواست\u200cشده',
    downloadSubmit: 'دریافت فایل',
    downloadSending: 'در حال ارسال...',
    downloadSuccess: 'درخواست شما ثبت شد. لینک فایل یا اطلاعات تکمیلی برای شما ارسال می\u200cشود.',
    downloadSuccessPending: 'درخواست شما ثبت شد. لینک فایل یا اطلاعات تکمیلی برای شما ارسال می\u200cشود.',
    downloadError: 'ارسال درخواست ممکن نشد. لطفاً فیلدها را بررسی کنید و دوباره تلاش کنید.',
    sectionBrowse: 'مرور بر اساس موضوع مهندسی',
    sectionFeatured: 'منابع مهندسی منتخب',
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
    hasRelatedProjects: 'دارای نمونه پروژه مرتبط'
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
    contextTitle: 'السياق الفني',
    previewTitle: 'محتويات المورد',
    previewNote: 'نظرة عامة منظمة على الأقسام الرئيسية في هذا المورد.',
    downloadTitle: 'الحصول على هذا المورد',
    downloadNote: 'لإرسال الملف وتمكين المتابعة الفنية، يرجى إدخال بيانات التواصل.',
    downloadPendingNote: 'سيكون التحميل المباشر متاحًا قريبًا. أرسل بيانات التواصل للحصول على النسخة الحالية.',
    downloadRequested: 'المورد المطلوب',
    downloadSubmit: 'الحصول على المورد',
    downloadSending: 'جارٍ الإرسال...',
    downloadSuccess: 'تم استلام طلبك. سيتم إرسال رابط الملف أو تفاصيل المتابعة إليك.',
    downloadSuccessPending: 'تم استلام طلبك. سيتم إرسال رابط الملف أو تفاصيل المتابعة إليك.',
    downloadError: 'تعذر إرسال الطلب. يرجى مراجعة الحقول والمحاولة مرة أخرى.',
    sectionBrowse: 'تصفح حسب الموضوع الهندسي',
    sectionFeatured: 'الموارد الهندسية المميزة',
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
    hasRelatedProjects: 'يتضمن أمثلة مشاريع ذات صلة'
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
    contextTitle: 'Технический контекст',
    previewTitle: 'Содержание ресурса',
    previewNote: 'Структурированный обзор основных разделов данного ресурса.',
    downloadTitle: 'Получить ресурс',
    downloadNote: 'Для отправки файла и технической поддержки, пожалуйста, укажите контактные данные.',
    downloadPendingNote: 'Прямая загрузка скоро будет доступна. Оставьте контактные данные, чтобы получить текущую версию.',
    downloadRequested: 'Запрашиваемый ресурс',
    downloadSubmit: 'Получить ресурс',
    downloadSending: 'Отправка...',
    downloadSuccess: 'Ваш запрос получен. Ссылка на файл или дополнительная информация будет отправлена вам.',
    downloadSuccessPending: 'Ваш запрос получен. Ссылка на файл или дополнительная информация будет отправлена вам.',
    downloadError: 'Не удалось отправить запрос. Проверьте поля и попробуйте снова.',
    sectionBrowse: 'Обзор по инженерной теме',
    sectionFeatured: 'Избранные инженерные ресурсы',
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
    hasRelatedProjects: 'Включает примеры связанных проектов'
  }
};

type SystemKey = 'sandwich_panel' | 'standing_seam_zip' | 'aluminium_cladding';

const systemRoutes: Record<SystemKey, string> = {
  sandwich_panel: '/systems/sandwich-panel-systems',
  standing_seam_zip: '/systems/standing-seam-zip-tech-roofing',
  aluminium_cladding: '/systems/aluminium-cladding-covering'
};

const systemLabels: Record<Locale, Record<SystemKey, {name: string; description: string}>> = {
  en: {
    sandwich_panel: {name: 'Sandwich Panel Systems', description: 'Insulated wall and roof panel systems for industrial buildings.'},
    standing_seam_zip: {name: 'Standing Seam & ZIP Roofing', description: 'Concealed-fastener metal roofing for long-term waterproofing.'},
    aluminium_cladding: {name: 'Aluminium Cladding & Covering', description: 'Facade cladding systems for architectural and industrial envelopes.'}
  },
  fa: {
    sandwich_panel: {name: 'سیستم\u200cهای ساندویچ پانل', description: 'پانل\u200cهای عایق دیوار و سقف برای ساختمان\u200cهای صنعتی.'},
    standing_seam_zip: {name: 'سقف ایستادرز و ZIP', description: 'سقف فلزی با اتصال مخفی برای آب\u200cبندی بلندمدت.'},
    aluminium_cladding: {name: 'کلادینگ و پوشش آلومینیومی', description: 'سیستم\u200cهای نمای آلومینیومی برای پوسته\u200cهای صنعتی و معماری.'}
  },
  ar: {
    sandwich_panel: {name: 'أنظمة ألواح الساندويتش', description: 'ألواح معزولة للجدران والأسقف في المباني الصناعية.'},
    standing_seam_zip: {name: 'أسقف قائمة و ZIP', description: 'أسقف معدنية بتثبيت مخفي للعزل المائي طويل الأمد.'},
    aluminium_cladding: {name: 'كلادينج وتغطية ألومنيوم', description: 'أنظمة واجهات ألومنيوم للأغلفة الصناعية والمعمارية.'}
  },
  ru: {
    sandwich_panel: {name: 'Сэндвич-панельные системы', description: 'Утеплённые стеновые и кровельные панели для промышленных зданий.'},
    standing_seam_zip: {name: 'Фальцевая и ZIP-кровля', description: 'Металлическая кровля со скрытым креплением для долгосрочной гидроизоляции.'},
    aluminium_cladding: {name: 'Алюминиевый фасадный клад', description: 'Фасадные системы для промышленных и архитектурных оболочек.'}
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
};

const relatedServiceByCategory: Record<ResourceCategoryId, string> = {
  technical_guides: '/systems/sandwich-panel-systems',
  execution_details: '/systems/standing-seam-zip-tech-roofing',
  procurement_and_supply: '/systems/sandwich-panel-systems',
  case_studies: '/#case-studies-preview',
  datasheets: '/systems/aluminium-cladding-covering'
};

const technicalContextByCategory: Record<ResourceCategoryId, {description: string; points: string[]}> = {
  technical_guides: {
    description:
      'Technical guides cover panel selection, core types, thickness, joint logic, roofing drainage, and system comparison to support informed decisions before procurement.',
    points: ['Panel and system selection criteria', 'Joint and accessory coordination', 'Procurement review before ordering']
  },
  execution_details: {
    description:
      'Execution detail resources cover shop drawings, flashing logic, installation sequence, facade layout, and site coordination checkpoints.',
    points: ['Shop drawing and layout verification', 'Flashing and penetration control', 'Installation sequence review']
  },
  procurement_and_supply: {
    description:
      'Procurement resources support quantity planning, accessory review, material gaps, waste control, and clearer ordering before project cost becomes fixed.',
    points: ['MTO and accessory planning', 'Waste and gap reduction', 'Procurement readiness review']
  },
  case_studies: {
    description:
      'Case studies document real SIPANEL project decisions, challenges, engineering solutions, and measured results from completed industrial envelope projects.',
    points: ['Real project documentation', 'Engineering decision rationale', 'Measured performance results']
  },
  datasheets: {
    description:
      'Datasheets provide standardized technical specifications, performance values, and material properties for SIPANEL systems and components.',
    points: ['Material and system specifications', 'Performance and testing data', 'Compliance and certification references']
  }
};

const previewSectionsByCategory: Record<ResourceCategoryId, Array<{title: string; description: string}>> = {
  technical_guides: [
    {title: 'System Selection Inputs', description: 'Building use, insulation needs, panel thickness, core selection, and joint logic.'},
    {title: 'Coordination Checks', description: 'Accessories, flashing transitions, openings, and installation constraints.'},
    {title: 'Procurement Readiness', description: 'Structured review before material ordering and site execution.'}
  ],
  execution_details: [
    {title: 'Drawing Scope', description: 'Panel layout, dimensions, accessories, flashings, and quantities.'},
    {title: 'Detail Coordination', description: 'Seam behavior, flashing logic, facade grid, and waterproofing transitions.'},
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
    {title: 'Performance Data', description: 'Thermal, acoustic, wind load, and weather resistance values.'},
    {title: 'Compliance References', description: 'Standards, certifications, and testing documentation.'}
  ]
};

const breadcrumbLabels: Record<Locale, {home: string; resources: string}> = {
  en: {home: 'Home', resources: 'Resources'},
  fa: {home: 'خانه', resources: 'منابع'},
  ar: {home: 'الرئيسية', resources: 'الموارد'},
  ru: {home: 'Главная', resources: 'Ресурсы'}
};

function buildFeaturedResources(): ResourceHubCard[] {
  const resourcesSection = resourceHubSpec.page_sections.find(
    (section): section is Extract<ResourceHubSpec['page_sections'][number], {id: 'featured_resources'}> =>
      section.id === 'featured_resources'
  );

  if (!resourcesSection) {
    throw new Error('Missing featured_resources in engineering_resource_hub.json');
  }

  return resourcesSection.resources.map((resource) => ({
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
    assetStatus: 'pending_resource_file',
    leadCaptureStatus: resource.lead_capture ? 'pending_lead_capture' : 'not_required',
    relatedServiceHref: relatedServiceByCategory[resource.category],
    preview: resourcePreviewData[resource.id] ?? {},
    relatedProjectSlugs: resourceRelatedProjects[resource.id] ?? []
  }));
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

const categoryLabels: Record<Locale, {allResources: string; categories: Record<ResourceCategoryId, string>}> = {
  en: {
    allResources: 'All resources',
    categories: {
      technical_guides: 'Technical Guides',
      execution_details: 'Execution Details',
      procurement_and_supply: 'Procurement & Supply',
      case_studies: 'Case Studies',
      datasheets: 'Datasheets'
    }
  },
  fa: {
    allResources: 'همه منابع',
    categories: {
      technical_guides: 'راهنماهای فنی',
      execution_details: 'جزئیات اجرایی',
      procurement_and_supply: 'خرید و تأمین',
      case_studies: 'مطالعات موردی',
      datasheets: 'دیتاشیت\u200cها'
    }
  },
  ar: {
    allResources: 'جميع الموارد',
    categories: {
      technical_guides: 'الأدلة الفنية',
      execution_details: 'التفاصيل التنفيذية',
      procurement_and_supply: 'المشتريات والتوريد',
      case_studies: 'دراسات الحالة',
      datasheets: 'نشرات البيانات'
    }
  },
  ru: {
    allResources: 'Все ресурсы',
    categories: {
      technical_guides: 'Технические руководства',
      execution_details: 'Исполнительные детали',
      procurement_and_supply: 'Закупки и снабжение',
      case_studies: 'Кейсы',
      datasheets: 'Технические паспорта'
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
      }
    ]
  }
};

const localeSeoData: Record<Locale, ResourceHubLocaleSeo> = {
  en: {
    title: 'Industrial Envelope Resource Hub | SIPANEL Guides & Checklists',
    meta_description: 'Technical guides, buying checklists, datasheets, and execution details for sandwich panels, standing seam roofing, ZIP roofing, and aluminium cladding.',
    detailSuffix: 'SIPANEL Resource Hub'
  },
  fa: {
    title: 'مرکز دانش پوشش صنعتی ساختمان | راهنماها و چک\u200cلیست\u200cهای SIPANEL',
    meta_description: 'راهنماهای فنی، چک\u200cلیست\u200cهای خرید، دیتاشیت\u200cها و جزئیات اجرایی برای انتخاب و اجرای ساندویچ پانل، سقف ایستادرز و کلادینگ آلومینیومی.',
    detailSuffix: 'مرکز منابع SIPANEL'
  },
  ar: {
    title: 'مركز موارد أغلفة المباني الصناعية | أدلة SIPANEL وقوائم التحقق',
    meta_description: 'أدلة فنية وقوائم تحقق للشراء ونشرات بيانات وتفاصيل تنفيذية لاختيار وتنفيذ ألواح الساندويتش والأسقف القائمة والكلادينج الألومنيوم.',
    detailSuffix: 'مركز موارد SIPANEL'
  },
  ru: {
    title: 'Центр знаний по промышленным ограждающим системам | SIPANEL',
    meta_description: 'Технические руководства, чек-листы закупки, паспорта и исполнительные детали для сэндвич-панелей, фальцевой кровли ZIP и алюминиевого фасадного клада.',
    detailSuffix: 'Ресурсный центр SIPANEL'
  }
};

const heroOverrides: Partial<Record<Locale, Partial<ResourceHubLocaleContent['hero']>>> = {
  fa: {
    eyebrow: 'کتابخانه فنی SIPANEL',
    h1: 'مرکز دانش مهندسی پوشش\u200cهای صنعتی',
    subheadline:
      'راهنماهای فنی، چک\u200cلیست\u200cهای خرید، جزئیات اجرایی، دیتاشیت\u200cها و تجربه\u200cهای واقعی پروژه\u200cهای SIPANEL برای انتخاب و اجرای دقیق\u200cتر پوشش ساختمان\u200cهای صنعتی.',
    trustMicrocopy:
      'مناسب برای کارفرمایان، مشاوران، پیمانکاران و تیم\u200cهای خرید پروژه\u200cهای صنعتی.',
    primaryCta: 'دانلود راهنمای انتخاب پوشش صنعتی',
    primaryCtaHref: '/resources/sandwich-panel-selection-guide',
    secondaryCta: 'دریافت بررسی مهندسی رایگان',
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

      const content: ResourceHubLocaleContent = {
        ...base,
        localeSeo: localeSeoData[locale],
        hero: localeHero,
        allResourcesLabel: labels.allResources,
        ui: uiLabels[locale],
        categories: categoryIds.map((id) => ({id, label: labels.categories[id]})),
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
    .map((projectSlug) => {
      const caseStudy = getCaseStudyPageData(projectSlug);
      if (!caseStudy) return null;
      const hero = caseStudy.localeContent[locale].hero;
      return {
        slug: projectSlug,
        name: hero.projectName,
        location: hero.location,
        systemType: hero.projectType,
        href: `/projects/${projectSlug}`
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
      href: systemRoutes[key]
    })),
    relatedResources: relatedResources.length > 0 ? relatedResources : content.featuredResources.filter((item) => item.slug !== resource.slug).slice(0, 3),
    relatedProjects,
    context: {
      title: 'Technical Context',
      ...technicalContextByCategory[resource.category]
    },
    previewSections: previewSectionsByCategory[resource.category],
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
  const typeLabel = getResourceTypeLabel(page.resource.type, locale);
  const categoryLabel = page.categoryLabel;

  return buildPageMetadata({
    locale,
    title: `${page.resource.title} | ${content.localeSeo.detailSuffix}`,
    description: `${typeLabel} — ${categoryLabel}. ${page.resource.description}`,
    routes: page.route
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
