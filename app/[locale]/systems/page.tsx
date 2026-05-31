import type {Metadata} from 'next';
import Image from 'next/image';
import {setRequestLocale} from 'next-intl/server';
import {SchemaScript} from '@/components/seo/schema-script';
import {getDirection, locales, type Locale, Link} from '@/i18n/routing';
import {buildPageMetadata, type LocalizedRouteMap} from '@/lib/seo/metadata';
import {buildBreadcrumbListSchema, buildCollectionPageSchema, buildOrganizationSchema} from '@/lib/seo/schema';

/* ── Static image imports ── */
import heroDesktop from '@/assets/systems/hero/systems-hero-desktop.webp';
import heroMobile from '@/assets/systems/hero/systems-hero-mobile.webp';
import sandwichDesktop from '@/assets/systems/sandwich-panel/cover-desktop.webp';
import sandwichMobile from '@/assets/systems/sandwich-panel/cover-mobile.webp';
import standingSeamDesktop from '@/assets/systems/standing-seam/cover-desktop.webp';
import standingSeamMobile from '@/assets/systems/standing-seam/cover-mobile.webp';
import aluminiumDesktop from '@/assets/systems/aluminium-claddin/cover-desktop.webp';
import aluminiumMobile from '@/assets/systems/aluminium-claddin/cover-mobile.webp';

type Props = {
  params: {locale: Locale};
};

const routes: LocalizedRouteMap = {
  en: '/en/systems',
  fa: '/fa/systems',
  ar: '/ar/systems',
  ru: '/ru/systems'
};

const copy: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    headline: string;
    supporting: string;
    primaryCta: string;
    secondaryCta: string;
    trustPoints: string[];
    sectionTitle: string;
    sectionDescription: string;
    cta: string;
    home: string;
    proofTitle: string;
    comparisonTitle: string;
    proofItems: Array<{title: string; description: string}>;
    comparisonRows: Array<{label: string; typical: string; sipanel: string}>;
    comparisonColumns: {typical: string; sipanel: string};
  }
> = {
  fa: {
    title: 'سیستم‌های پوشش صنعتی | SIPANEL',
    description:
      'طراحی شاپ، انتخاب متریال، تأمین کنترل‌شده و نصب مهندسی برای پروژه‌های صنعتی. سیستم‌های ساندویچ پانل، سقف ایستادرز و نمای آلومینیومی.',
    eyebrow: 'پوشانه\u200Cهای سازه\u200Cهای صنعتی',
    headline: 'راهکارهای مهندسی\u200Cشده\nبرای پوشش سقف و نما',
    supporting: 'طراحی شاپ، انتخاب متریال، تأمین کنترل\u200Cشده و نصب مهندسی برای پروژه\u200Cهای صنعتی.',
    primaryCta: 'دریافت مشاوره فنی رایگان',
    secondaryCta: 'مشاهده پروژه\u200Cها',
    trustPoints: [
      'طراحی دقیق و مهندسی\u200Cشده',
      'تأمین هوشمند و کنترل کیفیت',
      'منطق آب\u200Cبندی و جزئیات اجرایی',
      'نصب مهندسی کنترل\u200Cشده'
    ],
    sectionTitle: 'سه سیستم. یک منطق مهندسی.',
    sectionDescription:
      'طراحی، تأمین و اجرای سیستم\u200Cهای پوشش سقف و نما با کنترل کامل بر کیفیت، آب\u200Cبندی و زمان\u200Cبندی.',
    cta: 'مشاهده سیستم',
    home: 'خانه',
    proofTitle: 'زنجیره مهندسی SIPANEL',
    proofItems: [
      {title: 'طراحی شاپ', description: 'کنترل کامل جزئیات اجرایی و نقشه\u200Cهای شاپ'},
      {title: 'BOM و متریال', description: 'لیست کامل متریال با کنترل کیفیت و ردیابی'},
      {title: 'منطق آب\u200Cبندی', description: 'طراحی سیستم\u200Cهای آب\u200Cبندی بر اساس عملکرد و اقلیم'},
      {title: 'تأمین هوشمند', description: 'تأمین به\u200Cموقع، کنترل کیفیت و کاهش هزینه\u200Cهای پروژه'},
      {title: 'نصب مهندسی', description: 'اجرا توسط تیم\u200Cهای متخصص و کنترل\u200Cشده'}
    ],
    comparisonTitle: 'اجرای معمول را با نصب مهندسی\u200Cشده مقایسه کنید',
    comparisonColumns: {typical: 'رویکرد معمول', sipanel: 'رویکرد مهندسی SIPANEL'},
    comparisonRows: [
      {
        label: 'انتخاب پوشش',
        typical: 'بر اساس موجودی یا قیمت',
        sipanel: 'بر اساس نیاز پروژه و محاسبات دقیق'
      },
      {
        label: 'آب\u200Cبندی',
        typical: 'وابسته به برداشت اجرایی سایت',
        sipanel: 'طراحی و هماهنگی پیش از اجرا'
      },
      {
        label: 'پرت متریال',
        typical: 'سفارش پیش از نهایی شدن چیدمان',
        sipanel: 'تأمین بر پایه برنامه\u200Cریزی دقیق'
      },
      {
        label: 'هماهنگی نصب',
        typical: 'حل مسائل در محل پروژه',
        sipanel: 'توالی برنامه\u200Cریزی\u200Cشده و کنترل\u200Cشده'
      },
      {
        label: 'زمان\u200Cبندی',
        typical: 'وابسته به مشکلات پیش\u200Cبینی\u200Cنشده',
        sipanel: 'برنامه\u200Cریزی دقیق و مدیریت کنترل\u200Cشده'
      }
    ]
  },
  en: {
    title: 'Industrial Covering Systems | SIPANEL',
    description:
      'Shop drawing, material selection, controlled procurement and engineered installation for industrial projects.',
    eyebrow: 'Industrial Envelope Systems',
    headline: 'Engineered Solutions\nfor Roof & Facade Covering',
    supporting: 'Shop drawing, material selection, controlled procurement and engineered installation for industrial projects.',
    primaryCta: 'Get Free Technical Consultation',
    secondaryCta: 'View Projects',
    trustPoints: [
      'Precise engineering design',
      'Smart procurement & QC',
      'Waterproofing logic & details',
      'Controlled installation'
    ],
    sectionTitle: 'Three Systems. One Engineering Logic.',
    sectionDescription:
      'Design, procurement and execution of roof and facade covering systems with full control over quality, waterproofing and scheduling.',
    cta: 'View System',
    home: 'Home',
    proofTitle: 'SIPANEL Engineering Chain',
    proofItems: [
      {title: 'Shop Drawing', description: 'Full control over execution details and shop drawings'},
      {title: 'BOM & Materials', description: 'Complete material list with QC and tracking'},
      {title: 'Waterproofing Logic', description: 'Climate and performance-based waterproofing design'},
      {title: 'Smart Procurement', description: 'On-time procurement, QC and project cost reduction'},
      {title: 'Engineered Installation', description: 'Execution by specialized, controlled teams'}
    ],
    comparisonTitle: 'Compare typical vs. engineered installation',
    comparisonColumns: {typical: 'Typical Approach', sipanel: 'SIPANEL Engineering'},
    comparisonRows: [
      {label: 'Cover Selection', typical: 'Based on availability or price', sipanel: 'Based on project needs and calculations'},
      {label: 'Waterproofing', typical: 'Dependent on site interpretation', sipanel: 'Pre-designed and coordinated'},
      {label: 'Material Waste', typical: 'Ordered before layout finalization', sipanel: 'Procurement based on precise planning'},
      {label: 'Installation', typical: 'Issues resolved on site', sipanel: 'Planned sequence and controlled'},
      {label: 'Schedule', typical: 'Subject to unforeseen problems', sipanel: 'Precise planning and controlled management'}
    ]
  },
  ar: {
    title: 'أنظمة التغطية الصناعية | SIPANEL',
    description: 'رسومات الورشة، اختيار المواد، التوريد المتحكم والتركيب الهندسي للمشاريع الصناعية.',
    eyebrow: 'أنظمة الغلاف الصناعي',
    headline: 'حلول هندسية\nلتغطية السقف والواجهة',
    supporting: 'رسومات الورشة، اختيار المواد، التوريد المتحكم والتركيب الهندسي للمشاريع الصناعية.',
    primaryCta: 'احصل على استشارة فنية مجانية',
    secondaryCta: 'عرض المشاريع',
    trustPoints: ['تصميم دقيق وهندسي', 'توريد ذكي ومراقبة الجودة', 'منطق العزل المائي', 'تركيب هندسي متحكم'],
    sectionTitle: 'ثلاثة أنظمة. منطق هندسي واحد.',
    sectionDescription: 'تصميم وتوريد وتنفيذ أنظمة تغطية السقف والواجهة مع تحكم كامل.',
    cta: 'عرض النظام',
    home: 'الرئيسية',
    proofTitle: 'سلسلة SIPANEL الهندسية',
    proofItems: [
      {title: 'رسومات الورشة', description: 'تحكم كامل في تفاصيل التنفيذ'},
      {title: 'BOM والمواد', description: 'قائمة مواد كاملة مع مراقبة الجودة'},
      {title: 'منطق العزل المائي', description: 'تصميم العزل المائي حسب الأداء والمناخ'},
      {title: 'التوريد الذكي', description: 'توريد في الوقت المناسب وخفض التكاليف'},
      {title: 'التركيب الهندسي', description: 'تنفيذ بواسطة فرق متخصصة'}
    ],
    comparisonTitle: 'قارن التنفيذ العادي مع التركيب الهندسي',
    comparisonColumns: {typical: 'النهج العادي', sipanel: 'نهج SIPANEL الهندسي'},
    comparisonRows: [
      {label: 'اختيار التغطية', typical: 'حسب التوفر أو السعر', sipanel: 'حسب احتياجات المشروع'},
      {label: 'العزل المائي', typical: 'يعتمد على تفسير الموقع', sipanel: 'مصمم ومنسق مسبقاً'},
      {label: 'هدر المواد', typical: 'الطلب قبل إنهاء التخطيط', sipanel: 'توريد على أساس تخطيط دقيق'},
      {label: 'التركيب', typical: 'حل المشاكل في الموقع', sipanel: 'تسلسل مخطط ومتحكم'},
      {label: 'الجدول الزمني', typical: 'عرضة لمشاكل غير متوقعة', sipanel: 'تخطيط دقيق وإدارة متحكمة'}
    ]
  },
  ru: {
    title: 'Промышленные системы покрытий | SIPANEL',
    description: 'Цеховые чертежи, подбор материалов, контролируемые поставки и инженерный монтаж.',
    eyebrow: 'Промышленные ограждающие системы',
    headline: 'Инженерные решения\nдля кровли и фасадов',
    supporting: 'Цеховые чертежи, подбор материалов, контролируемые поставки и инженерный монтаж для промышленных объектов.',
    primaryCta: 'Получить бесплатную консультацию',
    secondaryCta: 'Посмотреть проекты',
    trustPoints: [
      'Точное инженерное проектирование',
      'Умные закупки и контроль качества',
      'Логика гидроизоляции',
      'Контролируемый монтаж'
    ],
    sectionTitle: 'Три системы. Одна инженерная логика.',
    sectionDescription: 'Проектирование, поставка и монтаж систем покрытия с полным контролем качества.',
    cta: 'Открыть систему',
    home: 'Главная',
    proofTitle: 'Инженерная цепочка SIPANEL',
    proofItems: [
      {title: 'Цеховые чертежи', description: 'Полный контроль деталей исполнения'},
      {title: 'BOM и материалы', description: 'Полный список материалов с контролем качества'},
      {title: 'Логика гидроизоляции', description: 'Проектирование на основе климата и эксплуатации'},
      {title: 'Умные закупки', description: 'Своевременные поставки и снижение затрат'},
      {title: 'Инженерный монтаж', description: 'Выполнение специализированными бригадами'}
    ],
    comparisonTitle: 'Сравните обычный и инженерный монтаж',
    comparisonColumns: {typical: 'Обычный подход', sipanel: 'Инженерия SIPANEL'},
    comparisonRows: [
      {label: 'Выбор покрытия', typical: 'По наличию или цене', sipanel: 'По потребностям проекта'},
      {label: 'Гидроизоляция', typical: 'Зависит от интерпретации на объекте', sipanel: 'Спроектирована заранее'},
      {label: 'Отходы материалов', typical: 'Заказ до финализации раскладки', sipanel: 'Закупки по точному плану'},
      {label: 'Монтаж', typical: 'Решение проблем на месте', sipanel: 'Плановая последовательность'},
      {label: 'График', typical: 'Зависит от непредвиденных проблем', sipanel: 'Точное планирование и контроль'}
    ]
  }
};

const systems = [
  {
    id: 'sandwich-panel',
    imageDesktop: sandwichDesktop,
    imageMobile: sandwichMobile,
    alt: {
      fa: 'جزئیات سیستم ساندویچ پانل صنعتی',
      en: 'Industrial sandwich panel system detail',
      ar: 'تفاصيل نظام الألواح المزدوجة الصناعية',
      ru: 'Детали промышленной сэндвич-панельной системы'
    },
    title: {
      fa: 'سیستم ساندویچ پانل',
      en: 'Sandwich Panel Systems',
      ar: 'أنظمة الألواح المزدوجة',
      ru: 'Сэндвич-панельные системы'
    },
    subtitle: {
      fa: 'مهندسی پیش از نصب',
      en: 'Engineered Before Installation.',
      ar: 'هندسة قبل التركيب',
      ru: 'Спроектировано до монтажа.'
    },
    description: {
      fa: 'سی\u200Cپانل سیستم\u200Cهای ساندویچ پانل را با چیدمان دقیق، تأمین هوشمند، منطق آب\u200Cبندی و نصب کنترل\u200Cشده برای ساختمان\u200Cهای صنعتی طراحی و اجرا می\u200Cکند.',
      en: 'SIPANEL engineers sandwich panel systems through precise layout, smart procurement, waterproofing logic, and controlled installation for industrial buildings.',
      ar: 'تقوم SIPANEL بهندسة أنظمة الألواح المزدوجة من خلال التخطيط الدقيق والتوريد الذكي ومنطق العزل المائي والتركيب المتحكم للمباني الصناعية.',
      ru: 'SIPANEL проектирует сэндвич-панельные системы с точной раскладкой, умными закупками, логикой гидроизоляции и контролируемым монтажом.'
    },
    routes: {
      en: '/systems/sandwich-panel-systems',
      fa: '/systems/sandwich-panel-systems',
      ar: '/systems/sandwich-panel-systems',
      ru: '/systems/sandwich-panel-systems'
    }
  },
  {
    id: 'standing-seam',
    imageDesktop: standingSeamDesktop,
    imageMobile: standingSeamMobile,
    alt: {
      fa: 'جزئیات سیستم سقف ایستادرز',
      en: 'Standing seam roofing system detail',
      ar: 'تفاصيل نظام تسقيف الدرز القائم',
      ru: 'Детали фальцевой кровельной системы'
    },
    title: {
      fa: 'سقف ایستادرز و ZIP Tech',
      en: 'Standing Seam Roofing',
      ar: 'تسقيف الدرز القائم',
      ru: 'Фальцевая кровля'
    },
    subtitle: {
      fa: 'طراحی\u200Cشده بر پایه منطق آب\u200Cبندی',
      en: 'Built Around Waterproofing Logic.',
      ar: 'مبني على منطق العزل المائي',
      ru: 'На основе логики гидроизоляции.'
    },
    description: {
      fa: 'سی\u200Cپانل سیستم\u200Cهای سقف ایستادرز و ZIP Tech را با منطق زهکشی، هماهنگی فلاشینگ، اتصال مخفی و نصب کنترل\u200Cشده برای پروژه\u200Cهای صنعتی طراحی و اجرا می\u200Cکند.',
      en: 'SIPANEL designs and executes Standing Seam and ZIP Tech roofing systems with drainage logic, flashing coordination, concealed fastening, and controlled installation for industrial projects.',
      ar: 'تصمم SIPANEL وتنفذ أنظمة تسقيف الدرز القائم وZIP Tech مع منطق الصرف وتنسيق الوميض والتثبيت المخفي والتركيب المتحكم.',
      ru: 'SIPANEL проектирует и монтирует фальцевые и ZIP Tech системы с логикой водоотвода, координацией примыканий и контролируемым монтажом.'
    },
    routes: {
      en: '/systems/standing-seam-zip-tech-roofing',
      fa: '/systems/standing-seam-zip-tech-roofing',
      ar: '/systems/standing-seam-zip-tech-roofing',
      ru: '/systems/standing-seam-zip-tech-roofing'
    }
  },
  {
    id: 'aluminium-cladding',
    imageDesktop: aluminiumDesktop,
    imageMobile: aluminiumMobile,
    alt: {
      fa: 'جزئیات سیستم نمای آلومینیومی صنعتی',
      en: 'Industrial aluminium cladding system detail',
      ar: 'تفاصيل نظام الكسوة الألمنيوم الصناعية',
      ru: 'Детали промышленной алюминиевой облицовки'
    },
    title: {
      fa: 'سیستم نمای آلومینیومی',
      en: 'Aluminium Cladding Systems',
      ar: 'أنظمة الكسوة الألمنيوم',
      ru: 'Алюминиевая облицовка'
    },
    subtitle: {
      fa: 'اجرای کنترل\u200Cشده نما',
      en: 'With Controlled Execution.',
      ar: 'بتنفيذ متحكم',
      ru: 'С контролируемым монтажом.'
    },
    description: {
      fa: 'سی\u200Cپانل سیستم\u200Cهای پوشش و کلادینگ آلومینیومی را با کنترل چیدمان، منطق اتصال، بهینه\u200Cسازی متریال و نصب مهندسی\u200Cشده برای نماهای صنعتی ارائه می\u200Cدهد.',
      en: 'SIPANEL engineers aluminium cladding and covering systems for industrial facades with layout control, fixing logic, material optimization, and controlled installation.',
      ar: 'تقدم SIPANEL أنظمة كسوة وتغطية الألمنيوم للواجهات الصناعية مع التحكم في التخطيط ومنطق التثبيت وتحسين المواد.',
      ru: 'SIPANEL проектирует алюминиевые облицовочные системы с контролем раскладки, логикой крепления и оптимизацией материалов.'
    },
    routes: {
      en: '/systems/aluminium-cladding-covering',
      fa: '/systems/aluminium-cladding-covering',
      ar: '/systems/aluminium-cladding-covering',
      ru: '/systems/aluminium-cladding-covering'
    }
  }
];

const heroAlt: Record<Locale, string> = {
  fa: 'نمای فنی سیستم\u200Cهای پوشش سقف و نما SIPANEL',
  en: 'SIPANEL roof and facade covering systems technical view',
  ar: 'نظرة فنية على أنظمة تغطية السقف والواجهة من SIPANEL',
  ru: 'Технический вид систем покрытия кровли и фасадов SIPANEL'
};

const proofIcons = [
  /* Shop Drawing */
  <svg key="icon-0" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="4" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 10h12M8 14h8M8 18h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  /* BOM */
  <svg key="icon-1" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="6" y="3" width="16" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9h8M10 13h6M10 17h7M10 21h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  /* Waterproofing */
  <svg key="icon-2" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14 4s-7 8-7 13a7 7 0 0014 0c0-5-7-13-7-13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M11 18a3 3 0 003 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  /* Procurement */
  <svg key="icon-3" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 8h3l2 14h14l2-10H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="25" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="21" cy="25" r="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  /* Installation */
  <svg key="icon-4" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M16 3l-2 8h6l-8 14 2-8H8l8-14z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export function generateMetadata({params}: Props): Metadata {
  const content = copy[params.locale];

  return buildPageMetadata({
    locale: params.locale,
    title: content.title,
    description: content.description,
    routes
  });
}

function buildCollectionSchema(locale: Locale) {
  const content = copy[locale];

  return buildCollectionPageSchema(locale, `${routes[locale]}#collection`, {
    name: content.title,
    description: content.description,
    url: routes[locale],
    items: systems.map((system) => ({
      name: system.title[locale],
      url: system.routes[locale]
    }))
  });
}

function buildBreadcrumbSchema(locale: Locale) {
  return buildBreadcrumbListSchema(locale, `${routes[locale]}#breadcrumb`, [
    {name: copy[locale].home, item: `/${locale}`},
    {name: copy[locale].title, item: routes[locale]}
  ]);
}

export default function SystemsOverviewPage({params}: Props) {
  setRequestLocale(params.locale);
  const locale = params.locale;
  const content = copy[locale];
  const dir = getDirection(locale);

  return (
    <article className="systems-overview" dir={dir}>
      <SchemaScript schema={buildCollectionSchema(locale)} />
      <SchemaScript schema={buildBreadcrumbSchema(locale)} />
      <SchemaScript schema={buildOrganizationSchema(locale, `${routes[locale]}#organization`)} />

      {/* ── Hero ── */}
      <section className="systems-hero" aria-labelledby="systems-hero-title">
        <div className="container-shell systems-hero__inner">
          <div className="systems-hero__content">
            <p className="service-eyebrow">{content.eyebrow}</p>
            <h1 id="systems-hero-title">
              {content.headline.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
            <p className="systems-hero__supporting">{content.supporting}</p>
            <div className="systems-hero__actions">
              <Link href="/contact" className="button-primary">
                {content.primaryCta}
              </Link>
              <Link href="/projects" className="button-secondary systems-hero__secondary">
                {content.secondaryCta}
              </Link>
            </div>
            <ul className="systems-hero__trust" aria-label="trust points">
              {content.trustPoints.map((point) => (
                <li key={point}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.5l3 3 7-7" stroke="var(--color-orange-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="systems-hero__visual">
            <Image
              className="systems-hero__desktop-img"
              src={heroDesktop}
              alt={heroAlt[locale]}
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 767px) 100vw, 55vw"
            />
            <Image
              className="systems-hero__mobile-img"
              src={heroMobile}
              alt=""
              aria-hidden="true"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* ── System Cards ── */}
      <section className="systems-cards-section" aria-labelledby="systems-cards-title">
        <div className="container-shell systems-cards-section__inner">
          <header className="systems-cards-section__header">
            <h2 id="systems-cards-title">{content.sectionTitle}</h2>
            <p>{content.sectionDescription}</p>
          </header>
          <div className="systems-card-grid">
            {systems.map((system) => (
              <article className="systems-card" key={system.id}>
                <div className="systems-card__image">
                  <Image
                    className="systems-card__desktop-img"
                    src={system.imageDesktop}
                    alt={system.alt[locale]}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <Image
                    className="systems-card__mobile-img"
                    src={system.imageMobile}
                    alt=""
                    aria-hidden="true"
                    fill
                    placeholder="blur"
                    sizes="100vw"
                    loading="lazy"
                  />
                  <span className="systems-card__badge" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
                <div className="systems-card__body">
                  <h3>{system.title[locale]}</h3>
                  <p className="systems-card__subtitle">{system.subtitle[locale]}</p>
                  <p className="systems-card__description">{system.description[locale]}</p>
                  <Link href={system.routes[locale]} className="systems-card__cta">
                    {content.cta}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path
                        d={dir === 'rtl' ? 'M12 9H6M8 5l-4 4 4 4' : 'M6 9h6M10 5l4 4-4 4'}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Proof Strip ── */}
      <section className="systems-proof-strip" aria-labelledby="systems-proof-title">
        <div className="container-shell">
          <h2 id="systems-proof-title" className="visually-hidden">
            {content.proofTitle}
          </h2>
          <div className="systems-proof-grid">
            {content.proofItems.map((item, i) => (
              <div className="systems-proof-item" key={item.title}>
                <span className="systems-proof-item__icon">{proofIcons[i]}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="systems-comparison" aria-labelledby="systems-comparison-title">
        <div className="container-shell systems-comparison__inner">
          <h2 id="systems-comparison-title">{content.comparisonTitle}</h2>
          <div className="systems-comparison__table" role="table" aria-label={content.comparisonTitle}>
            <div className="systems-comparison__head" role="row">
              <span role="columnheader" />
              <span role="columnheader">{content.comparisonColumns.typical}</span>
              <span role="columnheader">{content.comparisonColumns.sipanel}</span>
            </div>
            {content.comparisonRows.map((row) => (
              <div className="systems-comparison__row" role="row" key={row.label}>
                <span className="systems-comparison__label" role="rowheader">
                  {row.label}
                </span>
                <span className="systems-comparison__typical" role="cell">
                  {row.typical}
                </span>
                <span className="systems-comparison__sipanel" role="cell">
                  {row.sipanel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
