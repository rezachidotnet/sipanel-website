import type {Metadata} from 'next';
import './systems-overview.css';
import Image, {type StaticImageData} from 'next/image';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {FaqExpandDetails} from '@/components/analytics/faq-expand-details';
import {SchemaScript} from '@/components/seo/schema-script';
import {getDirection, getLocalizedPath, locales, type Locale, Link} from '@/i18n/routing';
import {getRequiredFaqAnalyticsId} from '@/lib/analytics/faq';
import {buildPageMetadata, type LocalizedRouteMap} from '@/lib/seo/metadata';
import {buildBreadcrumbListSchema, buildCollectionPageSchema, buildFaqPageSchema, buildOrganizationSchema} from '@/lib/seo/schema';

/* ── Static image imports ── */
import heroDesktop from '@/assets/systems/hero/systems-hero-desktop.webp';
import heroMobile from '@/assets/systems/hero/systems-hero-mobile.webp';
import sandwichDesktop from '@/assets/systems/sandwich-panel/cover-desktop.webp';
import sandwichMobile from '@/assets/systems/sandwich-panel/cover-mobile.webp';
import standingSeamDesktop from '@/assets/systems/standing-seam/cover-desktop.webp';
import standingSeamMobile from '@/assets/systems/standing-seam/cover-mobile.webp';
import aluminiumDesktop from '@/assets/systems/aluminium-claddin/cover-desktop.webp';
import aluminiumMobile from '@/assets/systems/aluminium-claddin/cover-mobile.webp';
import daylightingDesktop from '@/assets/systems/transparent-roofing/cover-desktop.webp';
import daylightingMobile from '@/assets/systems/transparent-roofing/cover-mobile.webp';

type Props = {
  params: Promise<{locale: string}>;
};

type GuidanceItem = {
  title: string;
  description: string;
};

type SystemSelectionItem = GuidanceItem & {
  systemId: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type SystemCard = {
  id: string;
  imageDesktop?: StaticImageData;
  imageMobile?: StaticImageData;
  alt: Record<Locale, string>;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  description: Record<Locale, string>;
  routes: Record<Locale, string>;
};

const systemsOverviewFaqIds = [
  'systems-selection-fit',
  'systems-panel-vs-standing-seam',
  'systems-leakage-risk',
  'systems-engineering-and-supply',
  'systems-technical-review-inputs',
  'systems-cost-speed-lifecycle'
];

const routes: LocalizedRouteMap = {
  en: getLocalizedPath('en', '/systems'),
  fa: getLocalizedPath('fa', '/systems'),
  ar: getLocalizedPath('ar', '/systems'),
  ru: getLocalizedPath('ru', '/systems')
};

const copy: Record<
  Locale,
  {
    title: string;
    description: string;
    primaryKeyword: string;
    eyebrow: string;
    headline: string;
    supporting: string;
    introTitle: string;
    introBody: string;
    introLinks: {
      systems: string;
      projects: string;
      contact: string;
    };
    primaryCta: string;
    secondaryCta: string;
    trustPoints: string[];
    sectionTitle: string;
    sectionDescription: string;
    cta: string;
    projectCta: string;
    home: string;
    guidanceTitle: string;
    guidanceIntro: string;
    guidanceItems: GuidanceItem[];
    selectionTitle: string;
    selectionIntro: string;
    systemSelection: SystemSelectionItem[];
    engineeringTitle: string;
    engineeringIntro: string;
    engineeringItems: GuidanceItem[];
    faqTitle: string;
    faqIntro: string;
    faqItems: FaqItem[];
    closingTitle: string;
    closingText: string;
    closingContactCta: string;
    closingProjectsCta: string;
    comparisonTitle: string;
    comparisonRows: Array<{label: string; typical: string; sipanel: string}>;
    comparisonColumns: {typical: string; sipanel: string};
  }
> = {
  fa: {
    title: 'سیستم‌های پوشش صنعتی سقف و نما | SIPANEL',
    description:
      'سیستم‌های پوشش صنعتی سقف و نما برای پروژه‌های صنعتی؛ انتخاب ساندویچ پانل، ایستادرز، نمای آلومینیومی، نورگیر، سازه پارچه‌ای، سقف متحرک و ETFE با طراحی شاپ، کنترل متریال و اجرای مهندسی.',
    primaryKeyword: 'سیستم‌های پوشش صنعتی سقف و نما',
    eyebrow: 'پوشانه\u200Cهای سازه\u200Cهای صنعتی',
    headline: 'سیستم\u200Cهای پوشش صنعتی\nبرای سقف و نما',
    supporting:
      'سی\u200Cپانل سیستم پوشش را بر اساس کاربری، دهانه، اقلیم، مسیر آب، جزئیات اتصال، برنامه تأمین و توان اجرای پروژه انتخاب و مهندسی می\u200Cکند.',
    introTitle: 'انتخاب سیستم پوشش صنعتی از یک تصمیم فنی شروع می\u200Cشود',
    introBody:
      'در پروژه صنعتی، انتخاب پوشش سقف و نما فقط مقایسه قیمت متریال نیست. سیستم باید با سازه، شیب و زهکشی، بازشوها، الزامات حرارتی و صوتی، سرعت اجرا، دسترسی نصب و نگهداری آینده هماهنگ باشد. سی\u200Cپانل این تصمیم را قبل از خرید متریال و شروع نصب، با بررسی نقشه\u200Cها، شاپ\u200Cدراوینگ و ریسک\u200Cهای اجرایی کنترل می\u200Cکند.',
    introLinks: {
      systems: 'مشاهده جزئیات سیستم\u200Cها',
      projects: 'بررسی پروژه\u200Cهای اجراشده',
      contact: 'درخواست بررسی فنی'
    },
    primaryCta: 'دریافت مشاوره فنی رایگان',
    secondaryCta: 'مشاهده پروژه\u200Cها',
    trustPoints: [
      'طراحی دقیق و مهندسی\u200Cشده',
      'تأمین هوشمند و کنترل کیفیت',
      'منطق آب\u200Cبندی و جزئیات اجرایی',
      'نصب مهندسی کنترل\u200Cشده'
    ],
    sectionTitle: 'هفت سیستم. یک منطق مهندسی.',
    sectionDescription:
      'طراحی، تأمین و اجرای سیستم\u200Cهای پوشش سقف و نما با کنترل کامل بر کیفیت، آب\u200Cبندی و زمان\u200Cبندی.',
    cta: 'مشاهده سیستم',
    projectCta: 'نمونه پروژه\u200Cهای مرتبط',
    home: 'خانه',
    guidanceTitle: 'راهنمای انتخاب سیستم در مرحله طراحی و خرید',
    guidanceIntro:
      'برای انتخاب سیستم مناسب، ابتدا باید عملکرد مورد انتظار پوشش مشخص شود. سی\u200Cپانل هر گزینه را بر اساس معیارهای اجرایی و بهره\u200Cبرداری بررسی می\u200Cکند تا تصمیم نهایی فقط متکی به قیمت اولیه نباشد.',
    guidanceItems: [
      {
        title: 'کاربری و عملکرد ساختمان',
        description:
          'برای سالن تولید، انبار، ترمینال، فضای تجاری یا بخش اداری، نیازهای عایق حرارتی، عایق صوتی، نور طبیعی، دوام و ظاهر نما متفاوت است.'
      },
      {
        title: 'شرایط سازه، دهانه و شیب',
        description:
          'وزن سیستم، طول پنل یا ورق، زیرسازی، فاصله پرلین\u200Cها، شیب سقف و مسیر انتقال بار باید قبل از سفارش متریال با نقشه\u200Cهای سازه هماهنگ شود.'
      },
      {
        title: 'اقلیم، آب\u200Cبندی و نگهداری',
        description:
          'بارندگی، باد، گردوغبار، رطوبت، تابش و دسترسی تعمیرات روی جزئیات فلاشینگ، همپوشانی، آبرو، درزها و نقاط نفوذ اثر مستقیم دارد.'
      }
    ],
    selectionTitle: 'سی\u200Cپانل چطور بین سیستم\u200Cها انتخاب می\u200Cکند؟',
    selectionIntro:
      'هر سیستم جای مناسب خود را دارد. تصمیم نهایی معمولاً ترکیبی از عملکرد فنی، سرعت اجرا، محدودیت سازه، ظاهر معماری و هزینه چرخه عمر است.',
    systemSelection: [
      {
        systemId: 'sandwich-panel',
        title: 'ساندویچ پانل برای پوشش سریع و عایق',
        description:
          'وقتی سرعت نصب، وزن کنترل\u200Cشده و عملکرد حرارتی اهمیت دارد، ساندویچ پانل گزینه اصلی است؛ اما چیدمان، جهت نصب، آب\u200Cبندی درزها و جزئیات اطراف بازشوها باید قبل از تأمین نهایی شود.'
      },
      {
        systemId: 'standing-seam',
        title: 'ایستادرز و ZIP برای سقف\u200Cهای حساس به آب\u200Cبندی',
        description:
          'برای سقف\u200Cهایی با طول زیاد، نیاز به اتصال مخفی یا کنترل بهتر مسیر آب، ایستادرز و ZIP Tech بررسی می\u200Cشود. تمرکز اصلی روی شیب، آبرو، فلاشینگ و نقاط نفوذ است.'
      },
      {
        systemId: 'aluminium-cladding',
        title: 'نمای آلومینیومی برای کنترل ظاهر و جزئیات اتصال',
        description:
          'در نماهایی که مدول، خط درز، دوام سطح و هماهنگی با بازشوها مهم است، کلادینگ آلومینیومی با زیرسازی و دیتیل اتصال کنترل\u200Cشده انتخاب می\u200Cشود.'
      },
      {
        systemId: 'daylighting-transparent',
        title: 'نورگیر و پوشش شفاف برای نور طبیعی کنترل\u200Cشده',
        description:
          'وقتی نور طبیعی بخشی از عملکرد پروژه است، پلی\u200Cکربنات، شیشه یا راهکار ترکیبی بر اساس ایمنی، کنترل حرارت، آب\u200Cبندی و جزئیات اتصال به پوشش اصلی بررسی می\u200Cشود.'
      },
      {
        systemId: 'tensile-fabric',
        title: 'سازه پارچه‌ای کششی برای فرم‌های سبک و آزاد',
        description:
          'وقتی فرم معماری، سایه‌اندازی و دهانه ویژه اهمیت دارد، غشای پارچه‌ای باید با فرم‌یابی، پیش‌تنیدگی، الگوی برش، کابل‌ها، اتصال‌ها و زهکشی کنترل شود.'
      },
      {
        systemId: 'retractable-roof',
        title: 'سقف متحرک برای بهره‌برداری متغیر فضا',
        description:
          'وقتی باز و بسته شدن سقف ارزش عملیاتی دارد، مکانیزم حرکت، ریل و درایو، منطق کنترل، آب‌بندی حالت بسته، ایمنی و برنامه نگهداری قبل از انتخاب متریال بررسی می‌شود.'
      },
      {
        systemId: 'etfe',
        title: 'ETFE برای پوسته‌های شفاف و فوق‌سبک',
        description:
          'وقتی وزن کم و شفافیت معماری اولویت دارد، سیستم ETFE در سطح فویل، پنل‌بندی، فریم، جوش، شبکه هوا، کنترل نور، زهکشی و نگهداری بررسی می‌شود.'
      }
    ],
    engineeringTitle: 'کنترل مهندسی از آب\u200Cبندی تا نصب',
    engineeringIntro:
      'کیفیت سیستم پوشش فقط به برند متریال وابسته نیست. بخش مهم ریسک در اتصال\u200Cها، ترتیب نصب، کنترل سفارش و هماهنگی جزئیات قبل از اجرا ایجاد یا حذف می\u200Cشود.',
    engineeringItems: [
      {
        title: 'منطق زهکشی و آب\u200Cبندی',
        description:
          'مسیر آب، آبروها، فلاشینگ\u200Cها، همپوشانی\u200Cها، پیچ\u200Cها، نفوذ تأسیسات و اتصال سقف به نما پیش از اجرا بررسی می\u200Cشود تا تصمیم\u200Cها در محل پروژه حداقلی باشد.'
      },
      {
        title: 'تأمین و کنترل متریال',
        description:
          'لیست متریال، ابعاد، رنگ، ضخامت، متعلقات، پیچ\u200Cها و فلاشینگ\u200Cها بر اساس شاپ و برنامه اجرا کنترل می\u200Cشود تا پرت، کمبود و سفارش دوباره کاهش یابد.'
      },
      {
        title: 'کنترل نصب و تحویل',
        description:
          'توالی نصب، نقاط کنترل کیفیت، هماهنگی اکیپ\u200Cها و اصلاحات اجرایی در طول کار مدیریت می\u200Cشود؛ هدف، اجرای قابل ردیابی و قابل نگهداری است.'
      }
    ],
    faqTitle: 'پرسش\u200Cهای متداول انتخاب سیستم پوشش صنعتی',
    faqIntro: 'این پرسش\u200Cها در شروع بررسی فنی به کارفرما و طراح کمک می\u200Cکند مسیر انتخاب سیستم را دقیق\u200Cتر مشخص کنند.',
    faqItems: [
      {
        question: 'کدام سیستم پوشش صنعتی برای پروژه من مناسب است؟',
        answer:
          'پاسخ به کاربری ساختمان، دهانه و شیب، اقلیم، نیاز عایق\u200Cکاری، ظاهر نما، نور طبیعی، حرکت‌پذیری، فرم معماری، نگهداری و بودجه چرخه عمر بستگی دارد. سی\u200Cپانل ابتدا نقشه\u200Cها و محدودیت\u200Cهای پروژه را بررسی می\u200Cکند و سپس بین ساندویچ پانل، ایستادرز، نمای آلومینیومی، نورگیر، سازه پارچه‌ای کششی، سقف متحرک، ETFE یا ترکیبی از آن‌ها پیشنهاد فنی می\u200Cدهد.'
      },
      {
        question: 'تفاوت ساندویچ پانل با سقف ایستادرز یا ZIP چیست؟',
        answer:
          'ساندویچ پانل برای پوشش سریع با عایق حرارتی یکپارچه مناسب است. ایستادرز و ZIP معمولاً برای سقف\u200Cهایی انتخاب می\u200Cشوند که طول ورق، اتصال مخفی، کنترل آب\u200Cبندی و جزئیات زهکشی اهمیت بیشتری دارد.'
      },
      {
        question: 'سی\u200Cپانل چطور ریسک نشتی را کاهش می\u200Cدهد؟',
        answer:
          'ریسک نشتی با طراحی مسیر آب، کنترل شیب، هماهنگی فلاشینگ، جزئیات اطراف بازشوها و نفوذها، انتخاب اتصال مناسب و کنترل نصب کاهش می\u200Cیابد. این تصمیم\u200Cها باید قبل از خرید متریال و شروع نصب مشخص شوند.'
      },
      {
        question: 'برای بررسی فنی چه اطلاعاتی لازم است؟',
        answer:
          'نقشه معماری و سازه، کاربری فضا، موقعیت و اقلیم پروژه، ابعاد و دهانه\u200Cها، شیب سقف، محل بازشوها و تجهیزات، انتظار عایق\u200Cکاری، محدودیت زمان اجرا و سطح مورد انتظار ظاهر نما اطلاعات اصلی هستند.'
      },
      {
        question: 'انتخاب سیستم چه اثری روی هزینه، سرعت و عملکرد بلندمدت دارد؟',
        answer:
          'سیستم ارزان\u200Cتر در خرید اولیه همیشه کم\u200Cهزینه\u200Cترین انتخاب در اجرا و نگهداری نیست. وزن، پرت متریال، سرعت نصب، ریسک نشتی، تعمیرپذیری و دوام سطح باید همزمان بررسی شود.'
      }
    ],
    closingTitle: 'برای انتخاب سیستم، نقشه\u200Cها را قبل از سفارش بررسی کنید',
    closingText:
      'اگر پروژه در مرحله طراحی، برآورد یا تأمین است، بررسی فنی زودهنگام می\u200Cتواند از تغییر سفارش، پرت متریال و ریسک اجرایی جلوگیری کند.',
    closingContactCta: 'ارسال درخواست بررسی فنی',
    closingProjectsCta: 'مشاهده نمونه پروژه\u200Cها',
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
    title: 'Industrial Building Envelope Systems | SIPANEL',
    description:
      'Industrial building envelope systems for roof and facade projects: sandwich panels, standing seam/ZIP roofing, aluminium cladding, daylighting, tensile fabric, retractable roofs, and ETFE with engineering review, material control, and installation QA.',
    primaryKeyword: 'industrial building envelope systems',
    eyebrow: 'Industrial Envelope Systems',
    headline: 'Industrial Building\nEnvelope Systems',
    supporting:
      'SIPANEL selects and engineers roof and facade systems around use case, span, climate, drainage path, fixing details, procurement control, and installation constraints.',
    introTitle: 'Industrial envelope selection starts as an engineering decision',
    introBody:
      'For an industrial building, the envelope system is not only a material purchase. It has to work with the structure, slope, drainage, openings, thermal and acoustic targets, installation access, schedule, and future maintenance. SIPANEL reviews these constraints before material procurement and installation so the selected system is technically coherent.',
    introLinks: {
      systems: 'Review system details',
      projects: 'See completed projects',
      contact: 'Request engineering review'
    },
    primaryCta: 'Get Free Technical Consultation',
    secondaryCta: 'View Projects',
    trustPoints: [
      'Precise engineering design',
      'Smart procurement & QC',
      'Waterproofing logic & details',
      'Controlled installation'
    ],
    sectionTitle: 'Seven Systems. One Engineering Logic.',
    sectionDescription:
      'Design, procurement and execution of roof and facade covering systems with full control over quality, waterproofing and scheduling.',
    cta: 'View System',
    projectCta: 'Related projects',
    home: 'Home',
    guidanceTitle: 'System selection guidance for design and procurement',
    guidanceIntro:
      'The right system depends on performance, execution, and lifecycle priorities. SIPANEL evaluates each option before procurement so the decision is not reduced to initial material price.',
    guidanceItems: [
      {
        title: 'Building use and performance',
        description:
          'Production halls, warehouses, terminals, commercial spaces, and office zones have different needs for insulation, acoustic control, daylight, durability, and facade appearance.'
      },
      {
        title: 'Structure, span, and slope',
        description:
          'System weight, sheet or panel length, substructure, purlin spacing, roof slope, and load path must be coordinated with structural drawings before ordering.'
      },
      {
        title: 'Climate, waterproofing, and maintenance',
        description:
          'Rain, wind, dust, humidity, solar exposure, and maintenance access directly affect flashing, gutters, overlaps, seams, fasteners, and penetrations.'
      }
    ],
    selectionTitle: 'How SIPANEL chooses between envelope systems',
    selectionIntro:
      'Each system has a proper use case. The final recommendation usually balances technical performance, installation speed, structural limits, architectural appearance, and lifecycle cost.',
    systemSelection: [
      {
        systemId: 'sandwich-panel',
        title: 'Sandwich panels for fast insulated covering',
        description:
          'When installation speed, controlled weight, and thermal performance matter, sandwich panels are usually the primary option. Layout, installation direction, seam sealing, and opening details still need engineering before procurement.'
      },
      {
        systemId: 'standing-seam',
        title: 'Standing seam and ZIP for waterproofing-sensitive roofs',
        description:
          'For long roof runs, concealed fixing, and better water-path control, standing seam or ZIP Tech systems are reviewed around slope, gutter position, flashing, and penetrations.'
      },
      {
        systemId: 'aluminium-cladding',
        title: 'Aluminium cladding for facade control',
        description:
          'When joint rhythm, surface durability, module control, and coordination with openings are important, aluminium cladding is engineered with controlled substructure and fixing details.'
      },
      {
        systemId: 'daylighting-transparent',
        title: 'Daylighting systems for controlled natural light',
        description:
          'When daylight is part of building performance, polycarbonate, glass, or hybrid systems are reviewed for safety, heat control, waterproofing, and connection to the main roof.'
      },
      {
        systemId: 'tensile-fabric',
        title: 'Tensile fabric for lightweight free-form coverings',
        description:
          'When shade, architectural form, and special spans matter, the membrane is reviewed through form-finding, prestress, patterning, cables, connections, and drainage.'
      },
      {
        systemId: 'retractable-roof',
        title: 'Retractable roofs for variable space operation',
        description:
          'When opening and closing creates operational value, movement mechanism, rails, drive, controls, closed-state sealing, safety, and maintenance are reviewed before skin selection.'
      },
      {
        systemId: 'etfe',
        title: 'ETFE for transparent ultra-lightweight skins',
        description:
          'When low weight and architectural transparency are priorities, ETFE is reviewed as a full foil, panel, frame, weld, air, daylight, drainage, and maintenance system.'
      }
    ],
    engineeringTitle: 'Engineering control from drainage to installation',
    engineeringIntro:
      'Envelope quality is not defined by material brand alone. Most execution risk is created or removed through connections, sequence, procurement control, and detail coordination before site work starts.',
    engineeringItems: [
      {
        title: 'Waterproofing and drainage logic',
        description:
          'Water path, gutters, flashing, overlaps, fasteners, equipment penetrations, and roof-to-facade transitions are reviewed before installation to reduce site interpretation.'
      },
      {
        title: 'Procurement and material control',
        description:
          'Material lists, dimensions, colors, thicknesses, accessories, screws, and flashing parts are checked against shop drawings and installation sequence to reduce waste and reordering.'
      },
      {
        title: 'Installation QA and handover',
        description:
          'Installation sequence, inspection points, crew coordination, and field adjustments are managed during execution so the final envelope is traceable and maintainable.'
      }
    ],
    faqTitle: 'Industrial envelope systems FAQ',
    faqIntro: 'These questions help owners and designers frame the first technical review before selecting a roof or facade system.',
    faqItems: [
      {
        question: 'Which industrial covering system is suitable for my project?',
        answer:
          'It depends on building use, span, slope, climate, insulation, facade appearance, daylight, movement needs, architectural form, maintenance access, and lifecycle budget. SIPANEL reviews the drawings and constraints before recommending sandwich panels, standing seam/ZIP, aluminium cladding, daylighting, tensile fabric, retractable roofing, ETFE, or a combination.'
      },
      {
        question: 'What is the difference between sandwich panels and standing seam or ZIP roofing?',
        answer:
          'Sandwich panels provide fast insulated covering in one assembly. Standing seam and ZIP roofing are usually selected when long roof runs, concealed fixing, drainage control, and waterproofing details are the stronger priorities.'
      },
      {
        question: 'How does SIPANEL reduce leakage risk?',
        answer:
          'Leakage risk is reduced by designing the water path, checking roof slope, coordinating flashing, detailing openings and penetrations, selecting the right fixing method, and controlling installation before decisions are left to site interpretation.'
      },
      {
        question: 'What information is needed for an engineering review?',
        answer:
          'Architectural and structural drawings, building use, project location and climate, spans and dimensions, roof slope, openings and equipment locations, insulation expectations, schedule limits, and facade appearance requirements are the key inputs.'
      },
      {
        question: 'How does system choice affect cost, speed, and long-term performance?',
        answer:
          'The lowest initial material price is not always the lowest project cost. Weight, waste, installation speed, leakage risk, repair access, and surface durability should be reviewed together.'
      }
    ],
    closingTitle: 'Review the drawings before ordering the envelope system',
    closingText:
      'If the project is in design, estimation, or procurement, early engineering review can reduce reordering, material waste, and execution risk.',
    closingContactCta: 'Request engineering review',
    closingProjectsCta: 'View project references',
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
    title: 'أنظمة أغلفة المباني الصناعية | SIPANEL',
    description:
      'أنظمة أغلفة المباني الصناعية للأسقف والواجهات: ألواح ساندويتش، درز قائم وZIP، كسوة ألمنيوم وأنظمة إضاءة طبيعية مع مراجعة هندسية وتحكم في المواد والتنفيذ.',
    primaryKeyword: 'أنظمة أغلفة المباني الصناعية',
    eyebrow: 'أنظمة الغلاف الصناعي',
    headline: 'أنظمة أغلفة المباني\nالصناعية',
    supporting:
      'تختار SIPANEL نظام السقف والواجهة وفق استخدام المبنى والبحور والمناخ ومسار تصريف المياه وتفاصيل التثبيت وضوابط التوريد والتنفيذ.',
    introTitle: 'اختيار غلاف المبنى الصناعي قرار هندسي قبل أن يكون شراء مواد',
    introBody:
      'في المباني الصناعية لا يكفي اختيار المادة الأرخص أو المتوفرة. يجب أن يعمل النظام مع الهيكل، الميل، التصريف، الفتحات، متطلبات العزل، الوصول للتركيب، الجدول الزمني والصيانة المستقبلية. تراجع SIPANEL هذه القيود قبل التوريد والتركيب حتى يكون النظام المختار منسقاً فنياً.',
    introLinks: {
      systems: 'مراجعة تفاصيل الأنظمة',
      projects: 'مشاهدة مشاريع منفذة',
      contact: 'طلب مراجعة هندسية'
    },
    primaryCta: 'احصل على استشارة فنية مجانية',
    secondaryCta: 'عرض المشاريع',
    trustPoints: ['تصميم دقيق وهندسي', 'توريد ذكي ومراقبة الجودة', 'منطق العزل المائي', 'تركيب هندسي متحكم'],
    sectionTitle: 'سبعة أنظمة. منطق هندسي واحد.',
    sectionDescription: 'تصميم وتوريد وتنفيذ أنظمة تغطية السقف والواجهة مع تحكم كامل.',
    cta: 'عرض النظام',
    projectCta: 'مشاريع مرتبطة',
    home: 'الرئيسية',
    guidanceTitle: 'إرشادات اختيار النظام في مرحلة التصميم والتوريد',
    guidanceIntro:
      'يعتمد النظام المناسب على الأداء والتنفيذ وتكلفة التشغيل على المدى الطويل. تراجع SIPANEL الخيارات قبل التوريد حتى لا يكون القرار مبنياً على سعر المادة فقط.',
    guidanceItems: [
      {
        title: 'استخدام المبنى والأداء المطلوب',
        description:
          'قاعات الإنتاج والمستودعات والمحطات والمساحات التجارية والمكاتب تختلف في احتياجات العزل الحراري والصوتي والضوء الطبيعي والمتانة ومظهر الواجهة.'
      },
      {
        title: 'الهيكل والبحور وميل السقف',
        description:
          'وزن النظام وطول اللوح أو الصاج والتثبيت السفلي وتباعد البرلينات وميل السقف ومسار الأحمال يجب تنسيقها مع الرسومات الإنشائية قبل الطلب.'
      },
      {
        title: 'المناخ والعزل المائي والصيانة',
        description:
          'الأمطار والرياح والغبار والرطوبة والشمس وإمكانية الصيانة تؤثر مباشرة في الفلاشينغ والمزاريب والتراكبات والفواصل والمثبتات ونقاط الاختراق.'
      }
    ],
    selectionTitle: 'كيف تختار SIPANEL بين الأنظمة؟',
    selectionIntro:
      'لكل نظام مجال استخدام مناسب. التوصية النهائية توازن عادة بين الأداء الفني وسرعة التركيب وحدود الهيكل والمظهر المعماري وتكلفة دورة الحياة.',
    systemSelection: [
      {
        systemId: 'sandwich-panel',
        title: 'ألواح الساندويتش للتغطية السريعة المعزولة',
        description:
          'عندما تكون سرعة التركيب والوزن المضبوط والعزل الحراري أولويات رئيسية، تكون ألواح الساندويتش خياراً أساسياً. لكن التخطيط واتجاه التركيب وإغلاق الفواصل وتفاصيل الفتحات تحتاج إلى هندسة مسبقة.'
      },
      {
        systemId: 'standing-seam',
        title: 'الدرز القائم وZIP للأسقف الحساسة للعزل المائي',
        description:
          'للأسقف الطويلة أو التي تحتاج إلى تثبيت مخفي وتحكم أفضل في مسار المياه، تتم مراجعة أنظمة الدرز القائم وZIP حول الميل والمزراب والفلاشينغ ونقاط الاختراق.'
      },
      {
        systemId: 'aluminium-cladding',
        title: 'الكسوة الألمنيوم للتحكم في الواجهة',
        description:
          'عندما يكون إيقاع الفواصل ومتانة السطح والتحكم في الموديول والتنسيق مع الفتحات مهماً، يتم تصميم الكسوة الألمنيوم مع تثبيت وتفاصيل اتصال مضبوطة.'
      },
      {
        systemId: 'daylighting-transparent',
        title: 'أنظمة الإضاءة الطبيعية لضوء مضبوط',
        description:
          'عندما يكون الضوء الطبيعي جزءاً من أداء المبنى، تتم مراجعة البولي كربونات أو الزجاج أو الحلول المختلطة من ناحية السلامة والحرارة والعزل المائي والاتصال بالسقف الرئيسي.'
      },
      {
        systemId: 'tensile-fabric',
        title: 'الأغشية النسيجية للأشكال الخفيفة والحرة',
        description:
          'عندما يكون الظل والشكل المعماري والبحور الخاصة مهمة، يراجع الغشاء عبر إيجاد الشكل والشد ونمط القص والكابلات والوصلات والتصريف.'
      },
      {
        systemId: 'retractable-roof',
        title: 'الأسقف المتحركة لتشغيل متغير للمساحة',
        description:
          'عندما يخلق الفتح والإغلاق قيمة تشغيلية، تتم مراجعة الآلية والريل والدفع والتحكم والعزل في الوضع المغلق والسلامة والصيانة قبل اختيار الغلاف.'
      },
      {
        systemId: 'etfe',
        title: 'ETFE للأغلفة الشفافة والخفيفة جداً',
        description:
          'عندما يكون الوزن المنخفض والشفافية المعمارية أولوية، يراجع ETFE كنظام كامل من الفويل والألواح والإطار واللحام والهواء والضوء والتصريف والصيانة.'
      }
    ],
    engineeringTitle: 'تحكم هندسي من التصريف إلى التركيب',
    engineeringIntro:
      'جودة الغلاف لا تحددها علامة المادة فقط. جزء كبير من المخاطر يظهر أو يختفي في الوصلات وتسلسل التركيب وضبط التوريد وتنسيق التفاصيل قبل بدء العمل في الموقع.',
    engineeringItems: [
      {
        title: 'منطق التصريف والعزل المائي',
        description:
          'يتم فحص مسار المياه والمزاريب والفلاشينغ والتراكبات والمثبتات واختراقات المعدات وانتقالات السقف إلى الواجهة قبل التركيب لتقليل القرارات الارتجالية في الموقع.'
      },
      {
        title: 'التوريد والتحكم في المواد',
        description:
          'تتم مطابقة قوائم المواد والأبعاد والألوان والسماكات والملحقات والبراغي وقطع الفلاشينغ مع رسومات الورشة وتسلسل التنفيذ لتقليل الهدر وإعادة الطلب.'
      },
      {
        title: 'جودة التركيب والتسليم',
        description:
          'تتم إدارة تسلسل التركيب ونقاط الفحص وتنسيق الفرق والتعديلات الميدانية أثناء التنفيذ حتى يكون الغلاف النهائي قابلاً للتتبع والصيانة.'
      }
    ],
    faqTitle: 'أسئلة شائعة حول أنظمة أغلفة المباني الصناعية',
    faqIntro: 'تساعد هذه الأسئلة المالك والمصمم على تحديد مسار المراجعة الفنية قبل اختيار نظام السقف أو الواجهة.',
    faqItems: [
      {
        question: 'أي نظام تغطية صناعي يناسب مشروعي؟',
        answer:
          'يعتمد ذلك على استخدام المبنى والبحور والميل والمناخ والعزل ومظهر الواجهة والضوء والحركة والشكل المعماري والصيانة وميزانية دورة الحياة. تراجع SIPANEL الرسومات والقيود قبل اقتراح ألواح ساندويتش أو درز قائم/ZIP أو كسوة ألمنيوم أو إضاءة طبيعية أو غشاء نسيجي أو سقف متحرك أو ETFE أو مزيج بينها.'
      },
      {
        question: 'ما الفرق بين ألواح الساندويتش وسقف الدرز القائم أو ZIP؟',
        answer:
          'ألواح الساندويتش توفر تغطية سريعة مع عزل مدمج. أما الدرز القائم وZIP فيتم اختيارهما غالباً عندما تكون أطوال السقف والتثبيت المخفي والتحكم في التصريف وتفاصيل العزل المائي أكثر أهمية.'
      },
      {
        question: 'كيف تقلل SIPANEL مخاطر التسرب؟',
        answer:
          'يتم تقليل مخاطر التسرب عبر تصميم مسار المياه وفحص ميل السقف وتنسيق الفلاشينغ وتفاصيل الفتحات والاختراقات واختيار طريقة التثبيت المناسبة وضبط التركيب قبل ترك القرارات لتفسير الموقع.'
      },
      {
        question: 'ما المعلومات المطلوبة للمراجعة الهندسية؟',
        answer:
          'الرسومات المعمارية والإنشائية، استخدام المبنى، موقع المشروع ومناخه، الأبعاد والبحور، ميل السقف، الفتحات ومواقع المعدات، متطلبات العزل، حدود الجدول الزمني ومتطلبات مظهر الواجهة هي المدخلات الأساسية.'
      },
      {
        question: 'كيف يؤثر اختيار النظام في التكلفة والسرعة والأداء طويل الأمد؟',
        answer:
          'أقل سعر أولي للمادة ليس دائماً أقل تكلفة للمشروع. يجب مراجعة الوزن والهدر وسرعة التركيب ومخاطر التسرب وإمكانية الصيانة ومتانة السطح معاً.'
      }
    ],
    closingTitle: 'راجع الرسومات قبل طلب نظام الغلاف',
    closingText:
      'إذا كان المشروع في مرحلة التصميم أو التقدير أو التوريد، فإن المراجعة الهندسية المبكرة يمكن أن تقلل إعادة الطلب وهدر المواد ومخاطر التنفيذ.',
    closingContactCta: 'طلب مراجعة هندسية',
    closingProjectsCta: 'عرض مراجع المشاريع',
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
    title: 'Промышленные ограждающие системы | SIPANEL',
    description:
      'Промышленные ограждающие системы для кровли и фасадов: сэндвич-панели, фальцевая/ZIP кровля, алюминиевая облицовка и системы естественного освещения с инженерной проверкой, контролем материалов и монтажом.',
    primaryKeyword: 'промышленные ограждающие системы',
    eyebrow: 'Промышленные ограждающие системы',
    headline: 'Промышленные\nограждающие системы',
    supporting:
      'SIPANEL подбирает и проектирует кровельные и фасадные системы с учетом назначения здания, пролетов, климата, водоотвода, узлов крепления, поставок и ограничений монтажа.',
    introTitle: 'Выбор промышленной оболочки начинается с инженерной оценки',
    introBody:
      'Для промышленного здания ограждающая система не является только закупкой материала. Она должна работать со структурой, уклоном, водоотводом, проемами, требованиями к тепло- и звукоизоляции, доступом для монтажа, графиком и будущим обслуживанием. SIPANEL проверяет эти ограничения до закупки и монтажа, чтобы выбранная система была технически согласованной.',
    introLinks: {
      systems: 'Изучить системы',
      projects: 'Посмотреть проекты',
      contact: 'Запросить инженерную проверку'
    },
    primaryCta: 'Получить бесплатную консультацию',
    secondaryCta: 'Посмотреть проекты',
    trustPoints: [
      'Точное инженерное проектирование',
      'Умные закупки и контроль качества',
      'Логика гидроизоляции',
      'Контролируемый монтаж'
    ],
    sectionTitle: 'Семь систем. Одна инженерная логика.',
    sectionDescription: 'Проектирование, поставка и монтаж систем покрытия с полным контролем качества.',
    cta: 'Открыть систему',
    projectCta: 'Связанные проекты',
    home: 'Главная',
    guidanceTitle: 'Как выбрать систему на этапе проектирования и закупки',
    guidanceIntro:
      'Подходящая система зависит от требуемых характеристик, условий монтажа и долгосрочной эксплуатации. SIPANEL оценивает варианты до закупки, чтобы решение не сводилось только к начальной цене материала.',
    guidanceItems: [
      {
        title: 'Назначение здания и эксплуатация',
        description:
          'Производственные залы, склады, терминалы, коммерческие зоны и офисные части имеют разные требования к теплоизоляции, акустике, естественному свету, долговечности и внешнему виду фасада.'
      },
      {
        title: 'Конструкция, пролеты и уклон',
        description:
          'Вес системы, длина листа или панели, подсистема, шаг прогонов, уклон кровли и передача нагрузок должны быть согласованы с конструктивными чертежами до заказа.'
      },
      {
        title: 'Климат, гидроизоляция и обслуживание',
        description:
          'Дождь, ветер, пыль, влажность, солнце и доступ для обслуживания напрямую влияют на примыкания, водостоки, нахлесты, швы, крепеж и проходки.'
      }
    ],
    selectionTitle: 'Как SIPANEL выбирает между системами',
    selectionIntro:
      'У каждой системы есть свое назначение. Итоговая рекомендация обычно балансирует технические характеристики, скорость монтажа, ограничения конструкции, архитектурный вид и стоимость жизненного цикла.',
    systemSelection: [
      {
        systemId: 'sandwich-panel',
        title: 'Сэндвич-панели для быстрой утепленной оболочки',
        description:
          'Когда важны скорость монтажа, контролируемый вес и теплотехнические свойства, сэндвич-панели часто становятся основным вариантом. При этом раскладка, направление монтажа, герметизация швов и узлы проемов должны быть проработаны заранее.'
      },
      {
        systemId: 'standing-seam',
        title: 'Фальцевая и ZIP кровля для водозащитных задач',
        description:
          'Для длинных скатов, скрытого крепления и лучшего контроля водоотвода рассматриваются фальцевые или ZIP Tech системы с проверкой уклона, водостока, примыканий и проходок.'
      },
      {
        systemId: 'aluminium-cladding',
        title: 'Алюминиевая облицовка для контроля фасада',
        description:
          'Когда важны ритм швов, стойкость поверхности, модульность и координация с проемами, алюминиевая облицовка проектируется вместе с подсистемой и узлами крепления.'
      },
      {
        systemId: 'daylighting-transparent',
        title: 'Системы естественного освещения для контролируемого света',
        description:
          'Если естественный свет является частью работы здания, поликарбонат, стекло или гибридные решения проверяются по безопасности, тепловому режиму, гидроизоляции и соединению с основной кровлей.'
      },
      {
        systemId: 'tensile-fabric',
        title: 'Тентовые мембраны для легких свободных форм',
        description:
          'Когда важны тень, архитектурная форма и специальные пролеты, мембрана проверяется через формообразование, натяжение, раскрой, тросы, узлы и водоотвод.'
      },
      {
        systemId: 'retractable-roof',
        title: 'Раздвижные кровли для переменной эксплуатации',
        description:
          'Когда открывание и закрывание дает эксплуатационную ценность, механизм, рельсы, привод, управление, герметизация, безопасность и обслуживание проверяются до выбора оболочки.'
      },
      {
        systemId: 'etfe',
        title: 'ETFE для прозрачных сверхлегких оболочек',
        description:
          'Когда важны малый вес и прозрачность, ETFE рассматривается как полная система фольги, панелей, рамы, сварки, воздуха, света, водоотвода и обслуживания.'
      }
    ],
    engineeringTitle: 'Инженерный контроль от водоотвода до монтажа',
    engineeringIntro:
      'Качество оболочки определяется не только маркой материала. Значительная часть риска создается или устраняется в узлах, последовательности монтажа, контроле поставки и координации деталей до выхода на площадку.',
    engineeringItems: [
      {
        title: 'Логика водоотвода и гидроизоляции',
        description:
          'Путь воды, водостоки, примыкания, нахлесты, крепеж, проходки оборудования и переходы кровли к фасаду проверяются до монтажа, чтобы снизить количество решений на площадке.'
      },
      {
        title: 'Поставка и контроль материалов',
        description:
          'Спецификации, размеры, цвета, толщины, комплектующие, крепеж и элементы примыканий сверяются с рабочими чертежами и последовательностью монтажа для снижения отходов и повторных заказов.'
      },
      {
        title: 'Контроль монтажа и сдача',
        description:
          'Последовательность монтажа, точки проверки, координация бригад и полевые корректировки контролируются во время работ, чтобы итоговая оболочка была прослеживаемой и обслуживаемой.'
      }
    ],
    faqTitle: 'Вопросы по промышленным ограждающим системам',
    faqIntro: 'Эти вопросы помогают заказчику и проектировщику сформировать первую техническую проверку перед выбором кровельной или фасадной системы.',
    faqItems: [
      {
        question: 'Какая промышленная система покрытия подходит моему проекту?',
        answer:
          'Это зависит от назначения, пролетов, уклона, климата, изоляции, фасада, естественного света, подвижности, формы, обслуживания и бюджета жизненного цикла. SIPANEL проверяет чертежи и ограничения перед рекомендацией сэндвич-панелей, фальцевой/ZIP кровли, алюминиевой облицовки, прозрачных покрытий, тентовых мембран, раздвижной кровли, ETFE или их комбинации.'
      },
      {
        question: 'Чем сэндвич-панели отличаются от фальцевой или ZIP кровли?',
        answer:
          'Сэндвич-панели дают быструю утепленную оболочку в одном элементе. Фальцевая и ZIP кровля чаще выбираются, когда важнее длинные скаты, скрытое крепление, контроль водоотвода и гидроизоляционные узлы.'
      },
      {
        question: 'Как SIPANEL снижает риск протечек?',
        answer:
          'Риск протечек снижается через проектирование пути воды, проверку уклона, координацию примыканий, деталировку проемов и проходок, выбор крепления и контроль монтажа до того, как решения останутся на усмотрение площадки.'
      },
      {
        question: 'Какая информация нужна для инженерной проверки?',
        answer:
          'Нужны архитектурные и конструктивные чертежи, назначение здания, локация и климат, пролеты и размеры, уклон кровли, проемы и оборудование, требования к изоляции, ограничения графика и требования к виду фасада.'
      },
      {
        question: 'Как выбор системы влияет на стоимость, скорость и долгосрочную работу?',
        answer:
          'Самая низкая начальная цена материала не всегда означает минимальную стоимость проекта. Вес, отходы, скорость монтажа, риск протечек, доступ для ремонта и стойкость поверхности нужно оценивать вместе.'
      }
    ],
    closingTitle: 'Проверьте чертежи до заказа ограждающей системы',
    closingText:
      'Если проект находится на стадии проектирования, оценки или закупки, ранняя инженерная проверка может снизить повторные заказы, отходы материалов и риск выполнения.',
    closingContactCta: 'Запросить инженерную проверку',
    closingProjectsCta: 'Посмотреть проекты',
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

const systems: SystemCard[] = [
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
      ar: 'سندويج بنل',
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
      ar: 'أنظمة ستاندينغ سيم',
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
      ar: 'كلادينج ألمنيوم',
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
  },
  {
    id: 'daylighting-transparent',
    imageDesktop: daylightingDesktop,
    imageMobile: daylightingMobile,
    alt: {
      fa: 'سیستم نورگیر و پوشش شفاف صنعتی',
      en: 'Industrial daylighting and transparent roofing system',
      ar: 'نظام الإضاءة الطبيعية والأسقف الشفافة الصناعية',
      ru: 'Промышленная система естественного освещения и прозрачных покрытий'
    },
    title: {
      fa: 'نورگیرها و پوشش\u200Cهای شفاف',
      en: 'Skylight & Daylighting Systems',
      ar: 'سكاي لايت والأسقف الشفافة',
      ru: 'Системы естественного освещения и прозрачных покрытий'
    },
    subtitle: {
      fa: 'مهندسی نور طبیعی صنعتی',
      en: 'Engineered for Performance.',
      ar: 'مهندسة للأداء',
      ru: 'Инженерия естественного света.'
    },
    description: {
      fa: 'سی\u200Cپانل سیستم\u200Cهای نورگیر و پوشش شفاف را با پلی\u200Cکربنات، شیشه و راهکارهای ترکیبی برای نور طبیعی ساختمان\u200Cهای صنعتی و تجاری مهندسی می\u200Cکند.',
      en: 'SIPANEL engineers daylighting and transparent roofing systems with polycarbonate, glass skylights, and hybrid solutions for industrial and commercial natural lighting.',
      ar: 'تقدم SIPANEL أنظمة الإضاءة الطبيعية والأسقف الشفافة مع البولي كربونات والمناور الزجاجية لتوفير الإضاءة الطبيعية في المنشآت الصناعية والتجارية.',
      ru: 'SIPANEL проектирует системы естественного освещения с поликарбонатом, стеклянными фонарями и гибридными решениями для промышленных и коммерческих объектов.'
    },
    routes: {
      en: '/systems/daylighting-transparent-roofing',
      fa: '/systems/daylighting-transparent-roofing',
      ar: '/systems/daylighting-transparent-roofing',
      ru: '/systems/daylighting-transparent-roofing'
    }
  },
  {
    id: 'tensile-fabric',
    alt: {
      fa: 'وضعیت در انتظار تصویر تخصصی سازه پارچه‌ای کششی',
      en: 'Pending specialist image for tensile fabric membrane structures',
      ar: 'صورة تخصصية قيد الانتظار للهياكل النسيجية المشدودة',
      ru: 'Ожидается профильное изображение тентовых мембранных конструкций'
    },
    title: {
      fa: 'سازه‌های پارچه‌ای کششی',
      en: 'Tensile Fabric Structures',
      ar: 'مظلات شد انشائي',
      ru: 'Тентовые мембранные конструкции'
    },
    subtitle: {
      fa: 'مهندسی فرم و پیش‌تنیدگی',
      en: 'Form and Prestress Engineering.',
      ar: 'هندسة الشكل والشد',
      ru: 'Инженерия формы и натяжения.'
    },
    description: {
      fa: 'سی‌پانل پوشش‌های غشایی را با کنترل فرم‌یابی، الگوی برش، کابل‌ها، اتصالات، زهکشی و نصب مرحله‌ای برای فضاهای معماری و دهانه‌های ویژه مهندسی می‌کند.',
      en: 'SIPANEL engineers membrane coverings through form-finding, cutting pattern, cables, connections, drainage, and staged installation for architectural spaces and special spans.',
      ar: 'تهندس SIPANEL الأغشية عبر إيجاد الشكل ونمط القص والكابلات والوصلات والتصريف والتركيب المرحلي للمساحات المعمارية والبحور الخاصة.',
      ru: 'SIPANEL проектирует мембранные покрытия с контролем формообразования, раскроя, тросов, узлов, водоотвода и этапного монтажа для специальных пролетов.'
    },
    routes: {
      en: '/systems/tensile-fabric-membrane-structures',
      fa: '/systems/tensile-fabric-membrane-structures',
      ar: '/systems/tensile-fabric-membrane-structures',
      ru: '/systems/tensile-fabric-membrane-structures'
    }
  },
  {
    id: 'retractable-roof',
    alt: {
      fa: 'وضعیت در انتظار تصویر تخصصی سقف متحرک',
      en: 'Pending specialist image for retractable roof systems',
      ar: 'صورة تخصصية قيد الانتظار للأسقف المتحركة',
      ru: 'Ожидается профильное изображение раздвижных кровель'
    },
    title: {
      fa: 'سقف‌ها و پوشش‌های متحرک',
      en: 'Retractable Roof Systems',
      ar: 'سقف متحرك',
      ru: 'Раздвижные кровельные системы'
    },
    subtitle: {
      fa: 'مهندسی حرکت و بهره‌برداری',
      en: 'Movement and Operation Engineering.',
      ar: 'هندسة الحركة والتشغيل',
      ru: 'Инженерия движения и эксплуатации.'
    },
    description: {
      fa: 'سی‌پانل سیستم‌های متحرک را با هماهنگی سازه، ریل و درایو، منطق کنترل، آب‌بندی حالت بسته، ایمنی و دسترسی نگهداری طراحی و اجرا می‌کند.',
      en: 'SIPANEL coordinates retractable systems around structure, rails and drives, control logic, closed-state sealing, safety, and maintenance access.',
      ar: 'تنسق SIPANEL الأنظمة المتحركة حول الهيكل والريل والدفع ومنطق التحكم والعزل في الوضع المغلق والسلامة والوصول للصيانة.',
      ru: 'SIPANEL координирует подвижные системы с конструкцией, рельсами и приводом, логикой управления, герметизацией, безопасностью и доступом к обслуживанию.'
    },
    routes: {
      en: '/systems/retractable-roof-covering-systems',
      fa: '/systems/retractable-roof-covering-systems',
      ar: '/systems/retractable-roof-covering-systems',
      ru: '/systems/retractable-roof-covering-systems'
    }
  },
  {
    id: 'etfe',
    alt: {
      fa: 'وضعیت در انتظار تصویر تخصصی پوشش ETFE',
      en: 'Pending specialist image for ETFE roof and facade systems',
      ar: 'صورة تخصصية قيد الانتظار لأنظمة ETFE',
      ru: 'Ожидается профильное изображение систем ETFE'
    },
    title: {
      fa: 'پوشش‌های ETFE',
      en: 'ETFE Roof & Facade Systems',
      ar: 'أنظمة ETFE',
      ru: 'Системы ETFE'
    },
    subtitle: {
      fa: 'مهندسی پوسته شفاف و فوق‌سبک',
      en: 'Transparent Ultra-Light Skin Engineering.',
      ar: 'هندسة غلاف شفاف وخفيف جداً',
      ru: 'Инженерия прозрачной сверхлегкой оболочки.'
    },
    description: {
      fa: 'سی‌پانل سیستم‌های ETFE تک‌لایه و بالشتکی را با کنترل پنل‌بندی، فریم، جوش فویل، شبکه هوا، نور، زهکشی و نگهداری مهندسی می‌کند.',
      en: 'SIPANEL engineers single-layer and cushion ETFE systems through panelization, frame, foil welding, air network, daylight, drainage, and maintenance control.',
      ar: 'تهندس SIPANEL أنظمة ETFE أحادية الطبقة والوسائد عبر الألواح والإطار ولحام الفويل وشبكة الهواء والضوء والتصريف والصيانة.',
      ru: 'SIPANEL проектирует однослойные и подушечные ETFE системы с контролем панелей, рамы, сварки фольги, воздуха, света, водоотвода и обслуживания.'
    },
    routes: {
      en: '/systems/etfe-roof-facade-systems',
      fa: '/systems/etfe-roof-facade-systems',
      ar: '/systems/etfe-roof-facade-systems',
      ru: '/systems/etfe-roof-facade-systems'
    }
  }
];

const heroAlt: Record<Locale, string> = {
  fa: 'نمای فنی سیستم\u200Cهای پوشش سقف و نما SIPANEL',
  en: 'SIPANEL roof and facade covering systems technical view',
  ar: 'نظرة فنية على أنظمة تغطية السقف والواجهة من SIPANEL',
  ru: 'Технический вид систем покрытия кровли и фасадов SIPANEL'
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const content = copy[validLocale];

  return buildPageMetadata({
    locale: validLocale,
    title: content.title,
    description: content.description,
    routes,
    section: 'systems'
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
    {name: copy[locale].home, item: getLocalizedPath(locale)},
    {name: copy[locale].title, item: routes[locale]}
  ]);
}

function buildFaqSchema(locale: Locale) {
  return buildFaqPageSchema(locale, `${routes[locale]}#faq`, copy[locale].faqItems);
}

export default async function SystemsOverviewPage({params}: Props) {
  const {locale: requestedLocale} = await params;

  if (!locales.includes(requestedLocale as Locale)) {
    notFound();
  }

  const locale = requestedLocale as Locale;

  setRequestLocale(locale);
  const content = copy[locale];
  const dir = getDirection(locale);

  return (
    <article className="systems-overview" dir={dir}>
      <SchemaScript schema={buildCollectionSchema(locale)} />
      <SchemaScript schema={buildBreadcrumbSchema(locale)} />
      <SchemaScript schema={buildFaqSchema(locale)} />
      <SchemaScript schema={buildOrganizationSchema(locale)} />

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
              quality={65}
              placeholder="blur"
              sizes="(max-width: 767px) 100vw, 55vw"
            />
            <Image
              className="systems-hero__mobile-img"
              src={heroMobile}
              /* Duplicate responsive crop of the desktop hero; decorative to avoid repeated image alt text. */
              alt=""
              aria-hidden="true"
              fill
              priority
              quality={65}
              placeholder="blur"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section className="systems-intro" aria-labelledby="systems-intro-title">
        <div className="container-shell systems-intro__inner">
          <div className="systems-intro__copy">
            <p className="service-eyebrow">{content.primaryKeyword}</p>
            <h2 id="systems-intro-title">{content.introTitle}</h2>
            <p>{content.introBody}</p>
          </div>
          <nav className="systems-intro__links" aria-label={content.introTitle}>
            <a href="#systems-cards-title">{content.introLinks.systems}</a>
            <Link href="/projects">{content.introLinks.projects}</Link>
            <Link href="/contact#rfq-form">{content.introLinks.contact}</Link>
          </nav>
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
                  {system.imageDesktop && system.imageMobile ? (
                    <>
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
                        /* Duplicate responsive crop of the desktop card image; decorative to avoid repeated image alt text. */
                        alt=""
                        aria-hidden="true"
                        fill
                        placeholder="blur"
                        sizes="100vw"
                        loading="lazy"
                      />
                    </>
                  ) : (
                    <div className="systems-card__pending-visual" aria-label={system.alt[locale]} role="img">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
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
                  <Link href="/projects" className="systems-card__project-link">
                    {content.projectCta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="systems-guidance" aria-labelledby="systems-guidance-title">
        <div className="container-shell systems-guidance__inner">
          <header className="systems-section-header">
            <h2 id="systems-guidance-title">{content.guidanceTitle}</h2>
            <p>{content.guidanceIntro}</p>
          </header>
          <div className="systems-guidance__grid">
            {content.guidanceItems.map((item) => (
              <article className="systems-guidance__item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="systems-selection" aria-labelledby="systems-selection-title">
        <div className="container-shell systems-selection__inner">
          <header className="systems-section-header">
            <h2 id="systems-selection-title">{content.selectionTitle}</h2>
            <p>{content.selectionIntro}</p>
          </header>
          <div className="systems-selection__list">
            {content.systemSelection.map((item) => {
              const system = systems.find((candidate) => candidate.id === item.systemId);

              if (!system) {
                return null;
              }

              return (
                <article className="systems-selection__item" key={item.systemId}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="systems-selection__actions">
                    <Link href={system.routes[locale]}>{system.title[locale]}</Link>
                    <Link href="/projects">{content.projectCta}</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="systems-engineering" aria-labelledby="systems-engineering-title">
        <div className="container-shell systems-engineering__inner">
          <header className="systems-section-header">
            <h2 id="systems-engineering-title">{content.engineeringTitle}</h2>
            <p>{content.engineeringIntro}</p>
          </header>
          <div className="systems-engineering__grid">
            {content.engineeringItems.map((item) => (
              <article className="systems-engineering__item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
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

      <section className="systems-faq" aria-labelledby="systems-faq-title">
        <div className="container-shell systems-faq__inner">
          <header className="systems-section-header">
            <h2 id="systems-faq-title">{content.faqTitle}</h2>
            <p>{content.faqIntro}</p>
          </header>
          <div className="systems-faq__list">
            {content.faqItems.map((item, index) => (
              <FaqExpandDetails
                analytics={{
                  faqId: getRequiredFaqAnalyticsId(systemsOverviewFaqIds, index, 'systems-overview'),
                  faqQuestion: item.question,
                  faqCategory: 'systems',
                  faqPosition: index + 1,
                  pageLanguage: locale
                }}
                className="systems-faq__item"
                key={item.question}
                summary={item.question}
              >
                <p>{item.answer}</p>
              </FaqExpandDetails>
            ))}
          </div>
        </div>
      </section>

      <section className="systems-closing" aria-labelledby="systems-closing-title">
        <div className="container-shell systems-closing__inner">
          <div>
            <h2 id="systems-closing-title">{content.closingTitle}</h2>
            <p>{content.closingText}</p>
          </div>
          <div className="systems-closing__actions">
            <Link href="/contact#rfq-form" className="button-primary">
              {content.closingContactCta}
            </Link>
            <Link href="/projects" className="button-secondary">
              {content.closingProjectsCta}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
