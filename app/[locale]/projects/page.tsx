import Image, {type StaticImageData} from 'next/image';
import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {SchemaScript} from '@/components/seo/schema-script';
import {getDirection, locales, type Locale, Link} from '@/i18n/routing';
import {buildPageMetadata, type LocalizedRouteMap} from '@/lib/seo/metadata';
import {buildBreadcrumbListSchema, buildCollectionPageSchema, buildOrganizationSchema} from '@/lib/seo/schema';
import {listCaseStudySlugs} from '@/lib/case-studies/case-study-pages';
import shahrBabakHallCard from '@/assets/projects/shahre-babak-hall/photos/shahre-babak-hall-card.webp';
import bazargolCard from '@/assets/projects/bazargol/photos/bazargol-card.webp';
import babakSardarbCard from '@/assets/projects/babak_sardarb/photos/babak_sardarb-card.webp';
import andimeshkCard from '@/assets/projects/andimeshk/photos/andimeshk-card.webp';
import absaarCard from '@/assets/projects/absaar/photos/absaar-card.webp';
import megaparsCard from '@/assets/projects/megaparsmall-atrium/photos/megaparsmall-atrium-card.webp';
import mahshahrTaxiCard from '@/assets/projects/mahshahr_taxi/photos/mahshahr_taxi-card.webp';
import parandCard from '@/assets/projects/parand/photos/parand-card.webp';
import tabasCard from '@/assets/projects/tabas/photos/tabas-card.webp';
import pompTiranCard from '@/assets/projects/pomp-tiran/photos/pomp-tiran-card.webp';

type Props = {
  params: Promise<{locale: string}>;
};

type ProjectCaseStudy = {
  projectName: string;
  slug: string;
  filters: string[];
  location: string;
  category: string;
  projectType: string;
  systemType: string;
  area: string;
  challenge: string;
  engineeringDecision: string;
  measuredResult: string;
  riskPrevented: string[];
  image: StaticImageData;
};

type LocalizedProjectCaseStudy = Omit<ProjectCaseStudy, 'slug' | 'filters' | 'image'>;

const routes: LocalizedRouteMap = {
  en: '/en/projects',
  fa: '/fa/projects',
  ar: '/ar/projects',
  ru: '/ru/projects'
};

const copy: Record<
  Locale,
  {
    title: string;
    h1: string;
    description: string;
    eyebrow: string;
    introTitle: string;
    intro: string;
    allProjects: string;
    labels: {
      projectName: string;
      location: string;
      areaM2: string;
      systemType: string;
      mainChallenge: string;
      engineeringDecision: string;
      measuredResult: string;
      risks: string;
    };
    filters: {
      all: string;
      sandwich: string;
      standing: string;
      cladding: string;
      envelope: string;
    };
    proofPending: string;
    primaryCta: string;
    costReviewCta: string;
    openCaseStudy: string;
    detailComingSoon: string;
    conversionTitle: string;
    conversionText: string;
    home: string;
  }
> = {
  en: {
    title: 'SIPANEL Projects & Case Studies',
    h1: 'Proven Industrial Envelope Projects.',
    description:
      'Explore SIPANEL industrial roofing, sandwich panel, ZIP panel, and aluminium cladding projects through engineering challenge, execution logic, measured result, and risk-prevention proof.',
    eyebrow: 'Project Proof',
    introTitle: 'Projects that prove the system',
    intro:
      'Each card is structured around the project challenge, SIPANEL engineering decision, execution result, and risks controlled before or during installation.',
    allProjects: 'Project case studies',
    labels: {
      projectName: 'Project name',
      location: 'Location',
      areaM2: 'Area m2',
      systemType: 'System type',
      mainChallenge: 'Main challenge',
      engineeringDecision: 'Engineering decision',
      measuredResult: 'Measured result',
      risks: 'Risks prevented'
    },
    filters: {
      all: 'All',
      sandwich: 'Sandwich panel systems',
      standing: 'Standing seam roofing',
      cladding: 'Aluminium cladding',
      envelope: 'Industrial envelope'
    },
    proofPending: 'Only source-backed project fields are shown. Unverified metrics remain marked as pending inside each case study.',
    primaryCta: 'Get Free Engineering Review',
    costReviewCta: 'Request Project Cost Review',
    openCaseStudy: 'View Case Study',
    detailComingSoon: 'Project details coming soon',
    conversionTitle: 'Need this level of control for your project?',
    conversionText: 'Send the project type, location, approximate area, drawings if available, and the main risk you want SIPANEL to review.',
    home: 'Home'
  },
  fa: {
    title: 'پروژه‌ها و مطالعات موردی SIPANEL',
    h1: 'پروژه‌های اجراشده در پوشش صنعتی ساختمان',
    description:
      'پروژه‌های سقف صنعتی، ساندویچ پانل، سقف ایستادرز / ZIP و کلادینگ آلومینیومی SIPANEL را با چالش مهندسی، منطق اجرا، نتیجه و ریسک‌های کنترل‌شده بررسی کنید.',
    eyebrow: 'شواهد پروژه',
    introTitle: 'پروژه‌هایی که سیستم را اثبات می‌کنند',
    intro:
      'هر کارت بر اساس چالش پروژه، تصمیم مهندسی SIPANEL، نتیجه اجرا و ریسک‌های کنترل‌شده پیش یا حین نصب ساختاردهی شده است.',
    allProjects: 'مطالعات موردی پروژه',
    labels: {
      projectName: 'نام پروژه',
      location: 'موقعیت',
      areaM2: 'مساحت',
      systemType: 'نوع سیستم',
      mainChallenge: 'چالش',
      engineeringDecision: 'تصمیم مهندسی',
      measuredResult: 'نتیجه',
      risks: 'ریسک‌های کنترل‌شده'
    },
    filters: {
      all: 'همه پروژه‌ها',
      sandwich: 'ساندویچ پانل',
      standing: 'سقف ایستادرز',
      cladding: 'کلادینگ آلومینیومی',
      envelope: 'پوشش صنعتی ساختمان'
    },
    proofPending: 'جزئیات پروژه‌ها پس از بررسی نهایی و آماده‌سازی مستندات تکمیلی منتشر می‌شود.',
    primaryCta: 'دریافت بررسی مهندسی رایگان',
    costReviewCta: 'درخواست بررسی هزینه پروژه',
    openCaseStudy: 'مشاهده جزئیات پروژه',
    detailComingSoon: 'جزئیات پروژه به‌زودی',
    conversionTitle: 'برای انتخاب پوشش مناسب پروژه، ابتدا ریسک‌های فنی را بررسی کنید.',
    conversionText:
      'تیم SIPANEL می‌تواند بر اساس نقشه‌ها، موقعیت پروژه و نوع سازه، پیشنهاد اولیه فنی و مسیر اجرای مناسب را بررسی کند.',
    home: 'خانه'
  },
  ar: {
    title: 'مشاريع ودراسات حالة SIPANEL',
    h1: 'Proven Industrial Envelope Projects.',
    description:
      'استكشف مشاريع SIPANEL في الأسقف الصناعية وألواح الساندويش وZIP Panel وكسوة الألمنيوم من خلال التحدي الهندسي ومنطق التنفيذ والنتيجة والمخاطر التي تمت السيطرة عليها.',
    eyebrow: 'إثبات المشروع',
    introTitle: 'مشاريع تثبت النظام',
    intro:
      'تُبنى كل بطاقة حول تحدي المشروع، والقرار الهندسي من SIPANEL، ونتيجة التنفيذ، والمخاطر التي تمت السيطرة عليها قبل أو أثناء التركيب.',
    allProjects: 'دراسات حالة المشاريع',
    labels: {
      projectName: 'اسم المشروع',
      location: 'الموقع',
      areaM2: 'المساحة m2',
      systemType: 'نوع النظام',
      mainChallenge: 'التحدي الرئيسي',
      engineeringDecision: 'القرار الهندسي',
      measuredResult: 'النتيجة المقاسة',
      risks: 'المخاطر التي تم منعها'
    },
    filters: {
      all: 'الكل',
      sandwich: 'أنظمة ألواح الساندويش',
      standing: 'أسقف ستاندينغ سيم',
      cladding: 'كسوة الألمنيوم',
      envelope: 'الغلاف الصناعي'
    },
    proofPending: 'تُعرض فقط حقول المشروع المدعومة بالمصدر. وتبقى المؤشرات غير الموثقة موسومة كقيد الانتظار داخل كل دراسة حالة.',
    primaryCta: 'Get Free Engineering Review',
    costReviewCta: 'Request Project Cost Review',
    openCaseStudy: 'View Case Study',
    detailComingSoon: 'Project details coming soon',
    conversionTitle: 'هل تحتاج هذا المستوى من التحكم لمشروعك؟',
    conversionText: 'أرسل نوع المشروع والموقع والمساحة التقريبية والرسومات إن وجدت والمخاطر الأساسية التي تريد من SIPANEL مراجعتها.',
    home: 'الرئيسية'
  },
  ru: {
    title: 'Проекты и кейсы SIPANEL',
    h1: 'Proven Industrial Envelope Projects.',
    description:
      'Изучите проекты SIPANEL по промышленной кровле, сэндвич-панелям, ZIP Panel и алюминиевой облицовке через инженерную задачу, логику выполнения, результат и предотвращенные риски.',
    eyebrow: 'Проектное подтверждение',
    introTitle: 'Проекты, которые подтверждают систему',
    intro:
      'Каждая карточка построена вокруг задачи проекта, инженерного решения SIPANEL, результата выполнения и рисков, контролируемых до или во время монтажа.',
    allProjects: 'Проектные кейсы',
    labels: {
      projectName: 'Название проекта',
      location: 'Локация',
      areaM2: 'Площадь m2',
      systemType: 'Тип системы',
      mainChallenge: 'Главная задача',
      engineeringDecision: 'Инженерное решение',
      measuredResult: 'Измеримый результат',
      risks: 'Предотвращенные риски'
    },
    filters: {
      all: 'Все',
      sandwich: 'Системы сэндвич-панелей',
      standing: 'Кровля standing seam',
      cladding: 'Алюминиевая облицовка',
      envelope: 'Промышленная оболочка'
    },
    proofPending: 'Показаны только поля проекта, подтвержденные источником. Неподтвержденные метрики остаются отмеченными как ожидающие внутри каждого кейса.',
    primaryCta: 'Get Free Engineering Review',
    costReviewCta: 'Request Project Cost Review',
    openCaseStudy: 'View Case Study',
    detailComingSoon: 'Project details coming soon',
    conversionTitle: 'Нужен такой уровень контроля для вашего проекта?',
    conversionText: 'Отправьте тип проекта, локацию, примерную площадь, чертежи при наличии и главный риск, который SIPANEL должен проверить.',
    home: 'Главная'
  }
};

const projectCaseStudies: ProjectCaseStudy[] = [
  {
    projectName: 'Shahr Babak Wrestling Hall',
    slug: 'shahre-babak-hall',
    filters: ['standing', 'envelope'],
    location: 'Shahr Babak, Kerman, Iran',
    category: 'Sports & ZIP Panel Structures',
    projectType: 'Multi-dome wrestling sports complex',
    systemType: 'ZIP Panel Roofing System',
    area: '900 m2',
    challenge:
      'Multiple dome-shaped sports halls required curved ZIP panel coordination, structural alignment, waterproofing continuity, and visually consistent roof finishing.',
    engineeringDecision:
      'SIPANEL prepared coordinated shop drawings, curved ZIP panel layouts, waterproofing details, and installation sequencing to maintain dome symmetry and drainage continuity.',
    measuredResult:
      'Three dome-shaped wrestling halls were delivered with coordinated roof geometry, reliable ZIP panel performance, and controlled installation quality.',
    riskPrevented: ['Curved roof alignment errors', 'Water penetration at dome transitions', 'Installation sequencing conflicts'],
    image: shahrBabakHallCard
  },
  {
    projectName: 'Sepehan Flower Market',
    slug: 'sepehan-flower-market',
    filters: ['sandwich', 'envelope'],
    location: 'Dorcheh, Isfahan, Iran',
    category: 'Commercial & Sandwich Panel Structures',
    projectType: 'Commercial sandwich panel roofing system',
    systemType: 'Sandwich Panel',
    area: '3,500 m2',
    challenge:
      'A high-traffic commercial flower market needed durable sandwich panel roofing, fast installation, waterproofing control, and clean architectural finishing.',
    engineeringDecision:
      'SIPANEL optimized panel layouts, installation sequencing, sealing checkpoints, and material coordination to support fast-track execution and reduce waste.',
    measuredResult:
      'A durable commercial sandwich panel roofing system was delivered with reliable weather protection, efficient installation, and controlled finishing quality.',
    riskPrevented: ['Installation alignment errors', 'Material waste', 'Water penetration'],
    image: bazargolCard
  },
  {
    projectName: 'Shahr Babak Stadium Entrance',
    slug: 'shahr-babak-stadium-entrance',
    filters: ['cladding', 'envelope'],
    location: 'Shahr Babak, Kerman, Iran',
    category: 'Sports & Aluminium Cladding Structures',
    projectType: 'Curved architectural stadium entrance facade',
    systemType: 'Aluminium Cladding System',
    area: '700 m2',
    challenge:
      'A complex curved stadium entrance required precise aluminium cladding detailing, adaptable surface coordination, waterproofing continuity, and seamless facade integration.',
    engineeringDecision:
      'SIPANEL combined aluminium cladding methods, curved flashing details, and installation sequencing to preserve architectural continuity and drainage control.',
    measuredResult:
      'The entrance was delivered with precise architectural finishing, controlled facade integration, and weather-resistant performance.',
    riskPrevented: ['Facade alignment errors', 'Surface waviness', 'Water penetration at curved transitions'],
    image: babakSardarbCard
  },
  {
    projectName: 'Andimeshk Stadium',
    slug: 'andimeshk-stadium',
    filters: ['sandwich', 'envelope'],
    location: 'Andimeshk, Khuzestan, Iran',
    category: 'Sports & Sandwich Panel Structures',
    projectType: 'Double-curved stadium roofing system',
    systemType: 'Sandwich Panel Roofing System',
    area: '6,000 m2',
    challenge:
      'A double-curved stadium roof required sandwich panel coordination, structural alignment accuracy, waterproofing continuity, and controlled installation across arched geometry.',
    engineeringDecision:
      'SIPANEL prepared structural alignment studies, panel layout drawings, drainage details, and installation sequencing for geometric precision and roof performance.',
    measuredResult:
      'The stadium roof was delivered with reliable sandwich panel performance, accurate curved geometry, and controlled installation quality.',
    riskPrevented: ['Sandwich panel deformation', 'Drainage failures', 'Structural misalignment'],
    image: andimeshkCard
  },
  {
    projectName: 'Absaar Water Park',
    slug: 'absaar-water-park',
    filters: ['sandwich', 'standing', 'envelope'],
    location: 'Iran',
    category: 'Recreational & Hybrid Roofing Systems',
    projectType: 'Water park roofing and daylight integration system',
    systemType: 'Hybrid ZIP, Polycarbonate & Sandwich Panel Roofing System',
    area: '12,000 m2',
    challenge:
      'A large recreational roof needed daylight transmission, indoor ventilation, waterproof integration, and coordination between transparent sections, operable openings, and insulated panels.',
    engineeringDecision:
      'SIPANEL engineered roof zoning, automated ventilation opening integration, waterproof transitions, and support layouts for reliable environmental control.',
    measuredResult:
      'The project delivered controlled daylight, automated roof ventilation, thermal insulation efficiency, and long-term waterproof performance.',
    riskPrevented: ['Ventilation system malfunction', 'Water penetration at opening sections', 'Thermal imbalance'],
    image: absaarCard
  },
  {
    projectName: 'Megapars Mall Atrium',
    slug: 'megaparsmall-atrium',
    filters: ['standing', 'envelope'],
    location: 'Iran',
    category: 'Commercial & Architectural Roofing Systems',
    projectType: 'Atrium roofing structure',
    systemType: 'ZIP Roofing System',
    area: '4,500 m2',
    challenge:
      'A large-span atrium roof required curved ZIP panel coordination, waterproofing integrity, thermal movement control, and clean architectural integration.',
    engineeringDecision:
      'SIPANEL prepared ZIP panel layouts, expansion movement studies, drainage coordination, and installation sequencing for long-span roof stability.',
    measuredResult:
      'The atrium roof was delivered with reliable waterproofing, precise standing seam execution, and controlled architectural integration.',
    riskPrevented: ['Water penetration', 'Thermal expansion stress', 'Roof alignment deviations'],
    image: megaparsCard
  },
  {
    projectName: 'Mahshahr Taxi Parking Facility',
    slug: 'mahshahr-taxi-parking',
    filters: ['sandwich', 'envelope'],
    location: 'Bandar Mahshahr, Khuzestan, Iran',
    category: 'Transportation & Sandwich Panel Structures',
    projectType: 'Commercial parking roofing system',
    systemType: 'Sandwich Panel Roofing System',
    area: '4,000 m2',
    challenge:
      'A humid coastal parking facility needed sandwich panel roof coordination, rainwater drainage management, waterproofing continuity, and corrosion-resistant detailing.',
    engineeringDecision:
      'SIPANEL optimized drainage slopes, gutter positioning, downspout coordination, and sandwich panel alignment to improve water evacuation and reduce maintenance risk.',
    measuredResult:
      'The roofing system was delivered with reliable rainwater management, durable weather protection, and controlled drainage performance.',
    riskPrevented: ['Water accumulation', 'Roof leakage', 'Corrosion-related failures'],
    image: mahshahrTaxiCard
  },
  {
    projectName: 'Parand City Entrance Gate',
    slug: 'parand-city-entrance',
    filters: ['cladding', 'envelope'],
    location: 'Parand, Tehran, Iran',
    category: 'Architectural & Aluminium Cladding Structures',
    projectType: 'Architectural city entrance facade',
    systemType: 'Aluminium Cladding System',
    area: '500 m2',
    challenge:
      'A special architectural city entrance needed custom aluminium cladding, curved geometry control, waterproofing continuity, and accurate finishing.',
    engineeringDecision:
      'SIPANEL designed curved transition details, edge coordination systems, structural alignment strategies, and sealing workflows for architectural consistency.',
    measuredResult:
      'The city entrance was delivered with precise geometry execution, durable aluminium cladding, and weather-resistant facade performance.',
    riskPrevented: ['Dimensional inconsistencies', 'Facade sealing failures', 'Curved alignment errors'],
    image: parandCard
  },
  {
    projectName: 'Tabas Railway Facility',
    slug: 'tabas-railway-facility',
    filters: ['sandwich', 'envelope'],
    location: 'Tabas, Iran',
    category: 'Transportation & Sandwich Panel Structures',
    projectType: 'Large-span railway roofing system',
    systemType: 'Sandwich Panel Roofing System',
    area: '10,000 m2',
    challenge:
      'A large double-curved railway structure required advanced sandwich panel coordination, precise structural alignment, waterproofing continuity, and long-span roof performance.',
    engineeringDecision:
      'SIPANEL applied custom panel detailing, structural alignment studies, drainage optimization, and installation sequencing for long-span performance reliability.',
    measuredResult:
      'The railway roof was delivered with durable sandwich panel performance, controlled installation quality, and efficient execution.',
    riskPrevented: ['Structural misalignment', 'Drainage failures', 'Panel deformation'],
    image: tabasCard
  },
  {
    projectName: 'Tiran Gas Station',
    slug: 'tiran-gas-station',
    filters: ['sandwich', 'envelope'],
    location: 'Isfahan, Iran',
    category: 'Commercial & Sandwich Panel Structures',
    projectType: 'Gas station roofing system',
    systemType: 'Sandwich Panel Roofing System',
    area: '600 m2',
    challenge:
      'A fast-track public gas station required durable sandwich panel roofing, efficient sequencing, waterproofing reliability, and clean finishing under accelerated timelines.',
    engineeringDecision:
      'SIPANEL optimized sandwich panel layouts, structural coordination details, fastening strategies, and drainage integration for speed and durability.',
    measuredResult:
      'The gas station roofing system was completed with reliable weather protection, modern appearance, and controlled installation quality.',
    riskPrevented: ['Roof leakage', 'Installation alignment errors', 'Improper sealing execution'],
    image: pompTiranCard
  }
];

const rfqHref = '/contact#rfq-form';
const caseStudyDetailSlugs = new Set(listCaseStudySlugs());

const localizedProjectCaseStudies: Partial<Record<Locale, Record<string, LocalizedProjectCaseStudy>>> = {
  fa: {
    'shahre-babak-hall': {
      projectName: 'سالن کشتی شهربابک',
      location: 'شهربابک، کرمان، ایران',
      category: 'سازه ورزشی با سقف ایستادرز / ZIP',
      projectType: 'مجموعه ورزشی کشتی با چند گنبد',
      systemType: 'سقف ایستادرز / ZIP',
      area: '۹۰۰ مترمربع',
      challenge:
        'چند سالن ورزشی گنبدی به هماهنگی دقیق پانل‌های ZIP خمیده، هم‌راستایی سازه، تداوم آب‌بندی و اجرای یکنواخت نمای سقف نیاز داشتند.',
      engineeringDecision:
        'SIPANEL نقشه‌های اجرایی هماهنگ، چیدمان پانل‌های ZIP خمیده، دیتیل‌های آب‌بندی و توالی نصب را برای حفظ تقارن گنبد و پیوستگی زهکشی آماده کرد.',
      measuredResult:
        'سه سالن کشتی گنبدی با هندسه سقف هماهنگ، عملکرد قابل اتکای سقف ایستادرز / ZIP و کیفیت نصب کنترل‌شده تحویل شد.',
      riskPrevented: ['خطای هم‌راستایی سقف خمیده', 'نفوذ آب در اتصال‌های گنبدی', 'تداخل در توالی نصب']
    },
    'sepehan-flower-market': {
      projectName: 'بازار گل سپاهان',
      location: 'درچه، اصفهان، ایران',
      category: 'سازه تجاری با ساندویچ پانل',
      projectType: 'سیستم سقف تجاری با ساندویچ پانل',
      systemType: 'ساندویچ پانل',
      area: '۳٬۵۰۰ مترمربع',
      challenge:
        'بازار گل پرتردد به سقف ساندویچ پانل بادوام، نصب سریع، کنترل آب‌بندی و پرداخت معماری تمیز نیاز داشت.',
      engineeringDecision:
        'SIPANEL چیدمان پانل‌ها، توالی نصب، نقاط کنترل درزگیری و هماهنگی متریال را برای اجرای سریع و کاهش پرت بهینه کرد.',
      measuredResult:
        'سیستم سقف تجاری با ساندویچ پانل بادوام، حفاظت جوی قابل اتکا، نصب کارآمد و کیفیت پرداخت کنترل‌شده اجرا شد.',
      riskPrevented: ['خطای هم‌راستایی نصب', 'پرت متریال', 'نفوذ آب']
    },
    'shahr-babak-stadium-entrance': {
      projectName: 'ورودی ورزشگاه شهربابک',
      location: 'شهربابک، کرمان، ایران',
      category: 'سازه ورزشی با کلادینگ آلومینیومی',
      projectType: 'نمای معماری خمیده ورودی ورزشگاه',
      systemType: 'کلادینگ آلومینیومی',
      area: '۷۰۰ مترمربع',
      challenge:
        'ورودی خمیده و پیچیده ورزشگاه به دیتیل‌گذاری دقیق کلادینگ آلومینیومی، هماهنگی سطح، تداوم آب‌بندی و یکپارچگی نمای معماری نیاز داشت.',
      engineeringDecision:
        'SIPANEL روش‌های اجرای کلادینگ آلومینیومی، دیتیل‌های فلاشینگ خمیده و توالی نصب را برای حفظ پیوستگی معماری و کنترل زهکشی ترکیب کرد.',
      measuredResult:
        'ورودی با پرداخت معماری دقیق، یکپارچگی کنترل‌شده نما و عملکرد مقاوم در برابر شرایط جوی تحویل شد.',
      riskPrevented: ['خطای هم‌راستایی نما', 'موج‌افتادگی سطح', 'نفوذ آب در گذارهای خمیده']
    },
    'andimeshk-stadium': {
      projectName: 'ورزشگاه اندیمشک',
      location: 'اندیمشک، خوزستان، ایران',
      category: 'سازه ورزشی با ساندویچ پانل',
      projectType: 'سیستم سقف ورزشگاهی دوخم',
      systemType: 'سقف ساندویچ پانل',
      area: '۶٬۰۰۰ مترمربع',
      challenge:
        'سقف دوخم ورزشگاه به هماهنگی ساندویچ پانل، دقت هم‌راستایی سازه، تداوم آب‌بندی و نصب کنترل‌شده روی هندسه قوسی نیاز داشت.',
      engineeringDecision:
        'SIPANEL مطالعات هم‌راستایی سازه، نقشه‌های چیدمان پانل، دیتیل‌های زهکشی و توالی نصب را برای دقت هندسی و عملکرد سقف آماده کرد.',
      measuredResult:
        'سقف ورزشگاه با عملکرد قابل اتکای ساندویچ پانل، هندسه خمیده دقیق و کیفیت نصب کنترل‌شده تحویل شد.',
      riskPrevented: ['تغییر شکل ساندویچ پانل', 'اختلال در زهکشی', 'ناهم‌راستایی سازه']
    },
    'absaar-water-park': {
      projectName: 'پارک آبی آبسار',
      location: 'ایران',
      category: 'سازه تفریحی با سیستم سقف ترکیبی',
      projectType: 'سیستم سقف پارک آبی با کنترل نورگیری',
      systemType: 'سقف ترکیبی ایستادرز / ZIP، پلی‌کربنات و ساندویچ پانل',
      area: '۱۲٬۰۰۰ مترمربع',
      challenge:
        'سقف بزرگ مجموعه تفریحی به عبور نور، تهویه داخلی، یکپارچگی آب‌بندی و هماهنگی میان بخش‌های شفاف، بازشوهای متحرک و پانل‌های عایق نیاز داشت.',
      engineeringDecision:
        'SIPANEL زون‌بندی سقف، یکپارچه‌سازی بازشوهای تهویه خودکار، گذارهای آب‌بند و چیدمان تکیه‌گاه‌ها را برای کنترل پایدار محیط داخلی مهندسی کرد.',
      measuredResult:
        'پروژه با نورگیری کنترل‌شده، تهویه خودکار سقف، بازده عایق حرارتی و عملکرد آب‌بندی بلندمدت تحویل شد.',
      riskPrevented: ['اختلال در سیستم تهویه', 'نفوذ آب در بخش‌های بازشو', 'عدم تعادل حرارتی']
    },
    'megaparsmall-atrium': {
      projectName: 'آتریوم مگاپارس مال',
      location: 'ایران',
      category: 'سازه تجاری با سقف معماری',
      projectType: 'سازه سقف آتریوم',
      systemType: 'سقف ایستادرز / ZIP',
      area: '۴٬۵۰۰ مترمربع',
      challenge:
        'سقف آتریوم با دهانه بزرگ به هماهنگی پانل‌های ZIP خمیده، یکپارچگی آب‌بندی، کنترل حرکت حرارتی و ادغام معماری تمیز نیاز داشت.',
      engineeringDecision:
        'SIPANEL چیدمان پانل‌های ZIP، مطالعات حرکت انبساطی، هماهنگی زهکشی و توالی نصب را برای پایداری سقف دهانه‌بلند آماده کرد.',
      measuredResult:
        'سقف آتریوم با آب‌بندی قابل اتکا، اجرای دقیق سقف ایستادرز و یکپارچگی معماری کنترل‌شده تحویل شد.',
      riskPrevented: ['نفوذ آب', 'تنش ناشی از انبساط حرارتی', 'انحراف در هم‌راستایی سقف']
    },
    'mahshahr-taxi-parking': {
      projectName: 'پارکینگ تاکسی ماهشهر',
      location: 'بندر ماهشهر، خوزستان، ایران',
      category: 'سازه حمل‌ونقل با ساندویچ پانل',
      projectType: 'سیستم سقف پارکینگ تجاری',
      systemType: 'سقف ساندویچ پانل',
      area: '۴٬۰۰۰ مترمربع',
      challenge:
        'پارکینگ ساحلی در محیط مرطوب به هماهنگی سقف ساندویچ پانل، مدیریت آب باران، تداوم آب‌بندی و دیتیل‌های مقاوم در برابر خوردگی نیاز داشت.',
      engineeringDecision:
        'SIPANEL شیب‌های زهکشی، موقعیت آبروها، هماهنگی ناودان‌ها و هم‌راستایی ساندویچ پانل را برای تخلیه بهتر آب و کاهش ریسک نگهداری بهینه کرد.',
      measuredResult:
        'سیستم سقف با مدیریت قابل اتکای آب باران، حفاظت جوی بادوام و عملکرد زهکشی کنترل‌شده اجرا شد.',
      riskPrevented: ['تجمع آب', 'نشتی سقف', 'خرابی‌های ناشی از خوردگی']
    },
    'parand-city-entrance': {
      projectName: 'دروازه ورودی شهر پرند',
      location: 'پرند، تهران، ایران',
      category: 'سازه معماری با کلادینگ آلومینیومی',
      projectType: 'نمای معماری ورودی شهر',
      systemType: 'کلادینگ آلومینیومی',
      area: '۵۰۰ مترمربع',
      challenge:
        'ورودی ویژه شهر به کلادینگ آلومینیومی سفارشی، کنترل هندسه خمیده، تداوم آب‌بندی و پرداخت دقیق نیاز داشت.',
      engineeringDecision:
        'SIPANEL دیتیل‌های گذار خمیده، سیستم‌های هماهنگی لبه، راهبردهای هم‌راستایی سازه و فرایندهای درزگیری را برای یکپارچگی معماری طراحی کرد.',
      measuredResult:
        'ورودی شهر با اجرای دقیق هندسه، کلادینگ آلومینیومی بادوام و عملکرد نمای مقاوم در برابر شرایط جوی تحویل شد.',
      riskPrevented: ['ناهماهنگی ابعادی', 'خرابی درزگیری نما', 'خطای هم‌راستایی خمیده']
    },
    'tabas-railway-facility': {
      projectName: 'پروژه راه‌آهن طبس',
      location: 'طبس، ایران',
      category: 'سازه حمل‌ونقل با ساندویچ پانل',
      projectType: 'سیستم سقف دهانه‌بلند راه‌آهن',
      systemType: 'سقف ساندویچ پانل',
      area: '۱۰٬۰۰۰ مترمربع',
      challenge:
        'سازه بزرگ و دوخم راه‌آهن به هماهنگی پیشرفته ساندویچ پانل، هم‌راستایی دقیق سازه، تداوم آب‌بندی و عملکرد پایدار سقف دهانه‌بلند نیاز داشت.',
      engineeringDecision:
        'SIPANEL دیتیل‌گذاری اختصاصی پانل، مطالعات هم‌راستایی سازه، بهینه‌سازی زهکشی و توالی نصب را برای اطمینان از عملکرد دهانه‌بلند اجرا کرد.',
      measuredResult:
        'سقف راه‌آهن با عملکرد بادوام ساندویچ پانل، کیفیت نصب کنترل‌شده و اجرای کارآمد تحویل شد.',
      riskPrevented: ['ناهم‌راستایی سازه', 'اختلال در زهکشی', 'تغییر شکل پانل']
    },
    'tiran-gas-station': {
      projectName: 'جایگاه سوخت تیران',
      location: 'اصفهان، ایران',
      category: 'سازه تجاری با ساندویچ پانل',
      projectType: 'سیستم سقف جایگاه سوخت',
      systemType: 'سقف ساندویچ پانل',
      area: '۶۰۰ مترمربع',
      challenge:
        'جایگاه سوخت عمومی با زمان‌بندی فشرده به سقف ساندویچ پانل بادوام، توالی اجرای کارآمد، آب‌بندی قابل اتکا و پرداخت تمیز نیاز داشت.',
      engineeringDecision:
        'SIPANEL چیدمان ساندویچ پانل، دیتیل‌های هماهنگی سازه، راهبردهای اتصال و یکپارچه‌سازی زهکشی را برای سرعت و دوام بهینه کرد.',
      measuredResult:
        'سیستم سقف جایگاه سوخت با حفاظت جوی قابل اتکا، ظاهر مدرن و کیفیت نصب کنترل‌شده تکمیل شد.',
      riskPrevented: ['نشتی سقف', 'خطای هم‌راستایی نصب', 'اجرای نادرست درزگیری']
    }
  }
};

function getProjectCaseStudy(project: ProjectCaseStudy, locale: Locale): ProjectCaseStudy {
  const localizedProject = localizedProjectCaseStudies[locale]?.[project.slug];

  return localizedProject ? {...project, ...localizedProject} : project;
}

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
    routes
  });
}

function buildCollectionSchema(locale: Locale) {
  const content = copy[locale];
  const projects = projectCaseStudies.map((project) => getProjectCaseStudy(project, locale));

  return buildCollectionPageSchema(locale, `${routes[locale]}#collection`, {
    name: content.title,
    description: content.description,
    url: routes[locale],
    items: projects.map((project) => ({
      name: project.projectName,
      url: `/${locale}/projects/${project.slug}`
    }))
  });
}

function buildBreadcrumbSchema(locale: Locale) {
  return buildBreadcrumbListSchema(locale, `${routes[locale]}#breadcrumb`, [
    {name: copy[locale].home, item: `/${locale}`},
    {name: copy[locale].title, item: routes[locale]}
  ]);
}

const filterOptions = [
  {id: 'all'},
  {id: 'sandwich'},
  {id: 'standing'},
  {id: 'cladding'},
  {id: 'envelope'}
] as const;

function getFilterOptions(locale: Locale) {
  return locale === 'fa' ? filterOptions.filter((filter) => filter.id !== 'envelope') : filterOptions;
}

function hasCaseStudyDetailPage(slug: string) {
  return caseStudyDetailSlugs.has(slug);
}

function formatProjectArea(area: string, locale: Locale) {
  if (locale !== 'fa') {
    return area;
  }

  return area.replace(/\s*m2\s*$/i, ' مترمربع');
}

export default async function ProjectsOverviewPage({params}: Props) {
  const {locale: requestedLocale} = await params;

  if (!locales.includes(requestedLocale as Locale)) {
    notFound();
  }

  const locale = requestedLocale as Locale;

  setRequestLocale(locale);
  const content = copy[locale];
  const isPersianProjectsPage = locale === 'fa';
  const projects = projectCaseStudies.map((project) => getProjectCaseStudy(project, locale));
  const visibleFilterOptions = getFilterOptions(locale);

  return (
    <article className="projects-index-page" data-locale={locale} dir={getDirection(locale)}>
      {/* track: projects_page_view */}
      <SchemaScript schema={buildCollectionSchema(locale)} />
      <SchemaScript schema={buildBreadcrumbSchema(locale)} />
      <SchemaScript schema={buildOrganizationSchema(locale, `${routes[locale]}#organization`)} />

      <section className="projects-index-hero" data-section="projects_index_hero" aria-labelledby="projects-index-title">
        {/* track: case_study_view */}
        <div className="container-shell projects-index-hero__inner">
          <div className="projects-index-hero__copy">
            <p className="service-eyebrow">{content.eyebrow}</p>
            <h1 id="projects-index-title">{content.h1}</h1>
            <p>{content.description}</p>
            <div className="projects-index-hero__actions">
              <Link href={rfqHref} className="button-primary">
                {content.primaryCta}
              </Link>
              <Link href={rfqHref} className="button-secondary">
                {content.costReviewCta}
              </Link>
            </div>
          </div>
          <div className="projects-index-hero__visual" aria-hidden="true">
            <Image src={tabasCard} alt="" fill priority sizes="(max-width: 767px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      <section className="projects-index-section" data-section="projects_case_studies" aria-labelledby="projects-case-studies-title">
        <div className="container-shell projects-index-section__inner">
          <header className="projects-index-section__header">
            <p className="service-eyebrow">{content.eyebrow}</p>
            <h2 id="projects-case-studies-title">{content.introTitle}</h2>
            <p>{content.intro}</p>
          </header>

          <div className="projects-index-filter" aria-label={content.allProjects}>
            {/* track: project_filter_use */}
            {visibleFilterOptions.map((filter, index) => (
              <div className="projects-index-filter__item" key={filter.id}>
                <input
                  className="projects-index-filter__input"
                  defaultChecked={index === 0}
                  id={`projects-filter-${filter.id}`}
                  name="projects-filter"
                  type="radio"
                />
                <label htmlFor={`projects-filter-${filter.id}`}>{content.filters[filter.id]}</label>
              </div>
            ))}
          </div>

          <div className="projects-index-grid">
            {projects.map((project) => {
              if (!isPersianProjectsPage) {
                return (
                  <article className="projects-index-card" key={project.slug} data-filter={project.filters.join(' ')} data-project-slug={project.slug}>
                    <div className="projects-index-card__image">
                      <Image
                        src={project.image}
                        alt={`${project.projectName} industrial project photography`}
                        fill
                        sizes="(max-width: 767px) 86vw, (max-width: 1024px) 44vw, 31vw"
                      />
                    </div>
                    <div className="projects-index-card__body">
                      <div className="projects-index-card__meta">
                        <span>{project.category}</span>
                        <span>{project.projectType}</span>
                      </div>
                      <h3>{project.projectName}</h3>
                      <dl className="projects-index-card__snapshot">
                        <div>
                          <dt>{content.labels.projectName}</dt>
                          <dd>{project.projectName}</dd>
                        </div>
                        <div>
                          <dt>{content.labels.location}</dt>
                          <dd>{project.location}</dd>
                        </div>
                        <div>
                          <dt>{content.labels.areaM2}</dt>
                          <dd>{project.area}</dd>
                        </div>
                        <div>
                          <dt>{content.labels.systemType}</dt>
                          <dd>{project.systemType}</dd>
                        </div>
                      </dl>

                      <div className="projects-index-card__proof">
                        <section>
                          <h4>{content.labels.mainChallenge}</h4>
                          <p>{project.challenge}</p>
                        </section>
                        <section>
                          <h4>{content.labels.engineeringDecision}</h4>
                          <p>{project.engineeringDecision}</p>
                        </section>
                        <section>
                          <h4>{content.labels.measuredResult}</h4>
                          <p>{project.measuredResult}</p>
                        </section>
                      </div>

                      <div className="projects-index-card__risks">
                        <h4>{content.labels.risks}</h4>
                        <ul>
                          {project.riskPrevented.map((risk) => (
                            <li key={risk}>{risk}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="projects-index-card__footer">
                        {hasCaseStudyDetailPage(project.slug) ? (
                          /* track: case_study_click */
                          <Link href={`/projects/${project.slug}`} className="projects-index-card__cta">
                            {content.openCaseStudy}
                          </Link>
                        ) : (
                          <span className="projects-index-card__cta projects-index-card__cta--disabled" aria-disabled="true">
                            {content.detailComingSoon}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              }

              const detailSections = [
                {label: content.labels.mainChallenge, text: project.challenge},
                {label: content.labels.engineeringDecision, text: project.engineeringDecision},
                {label: content.labels.measuredResult, text: project.measuredResult}
              ].filter((section) => section.text.trim().length > 0);
              const risks = project.riskPrevented.filter((risk) => risk.trim().length > 0);

              return (
                <article className="projects-index-card" key={project.slug} data-filter={project.filters.join(' ')} data-project-slug={project.slug}>
                  <div className="projects-index-card__image">
                    <Image
                      src={project.image}
                      alt={
                        locale === 'fa'
                          ? `تصویر پروژه صنعتی ${project.projectName}`
                          : `${project.projectName} industrial project photography`
                      }
                      fill
                      sizes="(max-width: 767px) 86vw, (max-width: 1024px) 44vw, 31vw"
                    />
                  </div>
                  <div className="projects-index-card__body">
                    <h3>{project.projectName}</h3>
                    <dl className="projects-index-card__snapshot">
                      <div>
                        <dt>{content.labels.location}</dt>
                        <dd>{project.location}</dd>
                      </div>
                      <div>
                        <dt>{content.labels.systemType}</dt>
                        <dd>{project.systemType}</dd>
                      </div>
                      <div className="projects-index-card__area">
                        <dt>{content.labels.areaM2}</dt>
                        <dd>
                          {content.labels.areaM2}: {formatProjectArea(project.area, locale)}
                        </dd>
                      </div>
                    </dl>

                    {detailSections.length > 0 ? (
                      <div className="projects-index-card__proof">
                        {detailSections.map((section) => (
                          <section key={section.label}>
                            <h4>{section.label}</h4>
                            <p>{section.text}</p>
                          </section>
                        ))}
                      </div>
                    ) : null}

                    {risks.length > 0 ? (
                      <div className="projects-index-card__risks">
                        <h4>{content.labels.risks}</h4>
                        <ul>
                          {risks.map((risk) => (
                            <li key={risk}>{risk}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="projects-index-card__footer">
                      {hasCaseStudyDetailPage(project.slug) ? (
                        /* track: case_study_click */
                        <Link href={`/projects/${project.slug}`} className="projects-index-card__cta">
                          {content.openCaseStudy}
                        </Link>
                      ) : (
                        <span className="projects-index-card__cta projects-index-card__cta--disabled" aria-disabled="true">
                          {content.detailComingSoon}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="projects-index-section projects-index-section--light" data-section="proof_governance" aria-labelledby="projects-proof-title">
        <div className="container-shell projects-index-proof">
          <div>
            <p className="service-eyebrow">{isPersianProjectsPage ? content.eyebrow : content.allProjects}</p>
            <h2 id="projects-proof-title">{isPersianProjectsPage ? content.allProjects : content.proofPending}</h2>
            {isPersianProjectsPage ? <p>{content.proofPending}</p> : null}
          </div>
          <div className="projects-index-proof__items">
            <span>{content.labels.mainChallenge}</span>
            <span>{content.labels.engineeringDecision}</span>
            <span>{content.labels.measuredResult}</span>
            <span>{content.labels.risks}</span>
          </div>
        </div>
      </section>

      <section className="projects-index-conversion" data-section="projects_conversion_cta" aria-labelledby="projects-conversion-title">
        <div className="container-shell projects-index-conversion__inner">
          <div>
            <h2 id="projects-conversion-title">{content.conversionTitle}</h2>
            <p>{content.conversionText}</p>
          </div>
          <div className="projects-index-conversion__actions">
            <Link href={rfqHref} className="button-primary">
              {content.primaryCta}
            </Link>
            <Link href={rfqHref} className="button-secondary">
              {content.costReviewCta}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
