import Image, {type StaticImageData} from 'next/image';
import type {Metadata} from 'next';
import {Suspense} from 'react';
import '@/components/projects/projects-index.css';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {SchemaScript} from '@/components/seo/schema-script';
import {getDirection, getLocalizedPath, locales, type Locale, Link} from '@/i18n/routing';
import {buildPageMetadata, type LocalizedRouteMap} from '@/lib/seo/metadata';
import {buildBreadcrumbListSchema, buildCollectionPageSchema, buildOrganizationSchema} from '@/lib/seo/schema';
import {CatalogDownloadButton} from '@/components/home/catalog-download-button';
import {ProjectsFilterActivator} from '@/components/projects/projects-filter-activator';
import armyHospitalCard from '@/assets/projects/army-hospital/photos/army-hospital-card.webp';
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
import ahvazAirportPassengerTerminalCard from '@/assets/projects/ahvaz-airport-passenger-terminal/photos/ahvaz-airport-passenger-terminal-card.webp';
import atlasHotelShahinshahrAtriumCard from '@/assets/projects/atlas-hotel-shahinshahr-atrium/photos/atlas-hotel-shahinshahr-atrium-card.webp';
import baharestanPrayerHallCard from '@/assets/projects/baharestan-prayer-hall/photos/baharestan-prayer-hall-card.webp';
import bandarAbbasMallAtriumRoofCard from '@/assets/projects/bandar-abbas-mall-atrium-roof/photos/bandar-abbas-mall-atrium-roof-card.webp';
import bandarMahshahrBusTerminalCard from '@/assets/projects/bandar-mahshahr-bus-terminal/photos/bandar-mahshahr-bus-terminal-card.webp';
import eftekharCommercialOfficeComplexCard from '@/assets/projects/eftekhar-commercial-office-complex/photos/eftekhar-commercial-office-complex-card.webp';
import enghelabClubPadelCenterCard from '@/assets/projects/enghelab-club-padel-center/photos/enghelab-club-padel-center-card.webp';
import erbilEyeHospitalEntranceCanopyCard from '@/assets/projects/erbil-eye-hospital-entrance-canopy/photos/erbil-eye-hospital-entrance-canopy-card.webp';
import fadakMallGlassSkylightCard from '@/assets/projects/fadak-mall-glass-skylight/photos/fadak-mall-glass-skylight-card.webp';
import gonabadUniversitySportsHallCard from '@/assets/projects/gonabad-university-sports-hall/photos/gonabad-university-sports-hall-card.webp';
import imamKhomeiniAirportHajjTerminalCard from '@/assets/projects/imam-khomeini-airport-hajj-terminal/photos/imam-khomeini-airport-hajj-terminal-card.webp';
import kermanshahIndustrialUniversityPetroleumFacultyCard from '@/assets/projects/kermanshah-industrial-university-petroleum-faculty/photos/kermanshah-industrial-university-petroleum-faculty-card.webp';
import makuConventionHallCard from '@/assets/projects/maku-convention-hall/photos/maku-convention-hall-card.webp';
import marunPetrochemicalVisitorTerminalCard from '@/assets/projects/marun-petrochemical-visitor-terminal/photos/marun-petrochemical-visitor-terminal-card.webp';
import mehrabadAircraftHangarCard from '@/assets/projects/mehrabad-aircraft-hangar/photos/mehrabad-aircraft-hangar-card.webp';
import najafabadUniversityAmphitheaterCard from '@/assets/projects/najafabad-university-amphitheater/photos/najafabad-university-amphitheater-card.webp';
import payamIndustrialCityCeramicFactoryCard from '@/assets/projects/payam-industrial-city-ceramic-factory/photos/payam-industrial-city-ceramic-factory-card.webp';
import rouzbehCharityComplexZanjanCard from '@/assets/projects/rouzbeh-charity-complex-zanjan/photos/rouzbeh-charity-complex-zanjan-card.webp';
import shahroodAzadUniversitySkylightCard from '@/assets/projects/shahrood-azad-university-skylight/photos/shahrood-azad-university-skylight-card.webp';
import shalamchehBorderGateCard from '@/assets/projects/shalamcheh-border-gate/photos/shalamcheh-border-gate-card.webp';
import tarbiatModaresResearchGreenhouseCard from '@/assets/projects/tarbiat-modares-research-greenhouse/photos/tarbiat-modares-research-greenhouse-card.webp';
import tavanirShahrekordCentralAtriumCard from '@/assets/projects/tavanir-shahrekord-central-atrium/photos/tavanir-shahrekord-central-atrium-card.webp';
import tehranMallRoofGardenFoodcourtCard from '@/assets/projects/tehran-mall-roof-garden-foodcourt/photos/tehran-mall-roof-garden-foodcourt-card.webp';
import toranjKishRestaurantCard from '@/assets/projects/toranj-kish-restaurant/photos/toranj-kish-restaurant-card.webp';
import projectsHeroImg from '@/assets/projects/projects-index-hero.webp';
import projectsHeroMobileImg from '@/assets/projects/projects-index-hero-mobile.webp';

type Props = {
  params: Promise<{locale: string}>;
};

type ProjectCaseStudy = {
  projectName: string;
  slug: string;
  displayPriority: number;
  filters: string[];
  secondaryCategory: string;
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

type LocalizedProjectCaseStudy = Omit<ProjectCaseStudy, 'slug' | 'displayPriority' | 'filters' | 'secondaryCategory' | 'image'>;

const routes: LocalizedRouteMap = {
  en: getLocalizedPath('en', '/projects'),
  fa: getLocalizedPath('fa', '/projects'),
  ar: getLocalizedPath('ar', '/projects'),
  ru: getLocalizedPath('ru', '/projects')
};

const copy: Record<
  Locale,
  {
    title: string;
    h1: string;
    description: string;
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
      'transparent-roofing': string;
    };
    primaryCta: string;
    costReviewCta: string;
    conversionTitle: string;
    conversionText: string;
    scrollCue: string;
    home: string;
  }
> = {
  en: {
    title: 'SIPANEL Projects & Case Studies',
    h1: 'Selected SIPANEL Projects',
    description:
      'Dozens of completed projects across industrial facilities, airports, healthcare, commercial and sports buildings in Iran.\nFrom long-span structures to complex architectural envelopes, explore SIPANEL\u2019s engineered execution solutions.',
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
      'transparent-roofing': 'Glass & Polycarbonate'
    },
    primaryCta: 'Get Free Engineering Review',
    costReviewCta: 'Download Technical Catalog',
    conversionTitle: 'Need this level of control for your project?',
    conversionText: 'Send the project type, location, approximate area, drawings if available, and the main risk you want SIPANEL to review.',
    scrollCue: 'View projects',
    home: 'Home'
  },
  fa: {
    title: 'پروژه‌ها و مطالعات موردی SIPANEL',
    h1: 'پروژه‌های منتخب SIPANEL',
    description:
      'بیش از ده‌ها پروژه اجراشده در صنایع، فرودگاه‌ها، مراکز درمانی، تجاری و ورزشی ایران.\nاز دهانه‌های بلند تا پوشش‌های پیچیده معماری؛ نمونه‌هایی از راهکارهای مهندسی اجراشده SIPANEL.',
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
      'transparent-roofing': 'شیشه و پلی‌کربنات'
    },
    primaryCta: 'دریافت بررسی مهندسی رایگان',
    costReviewCta: 'دانلود کاتالوگ فنی',
    conversionTitle: 'برای انتخاب پوشش مناسب پروژه، ابتدا ریسک‌های فنی را بررسی کنید.',
    conversionText:
      'تیم SIPANEL می‌تواند بر اساس نقشه‌ها، موقعیت پروژه و نوع سازه، پیشنهاد اولیه فنی و مسیر اجرای مناسب را بررسی کند.',
    scrollCue: 'مشاهده پروژه‌ها',
    home: 'خانه'
  },
  ar: {
    title: 'مشاريع ودراسات حالة SIPANEL',
    h1: 'مشاريع مختارة من SIPANEL',
    description:
      'عشرات المشاريع المنفذة في المنشآت الصناعية والمطارات والمرافق الصحية والتجارية والرياضية في إيران.\nمن البحور الواسعة إلى الأغلفة المعمارية المعقدة، استعرض حلول SIPANEL الهندسية المنفذة.',
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
      'transparent-roofing': 'الزجاج والبولي كربونات'
    },
    primaryCta: 'Get Free Engineering Review',
    costReviewCta: 'تحميل الكتالوج الفني',
    conversionTitle: 'هل تحتاج هذا المستوى من التحكم لمشروعك؟',
    conversionText: 'أرسل نوع المشروع والموقع والمساحة التقريبية والرسومات إن وجدت والمخاطر الأساسية التي تريد من SIPANEL مراجعتها.',
    scrollCue: 'عرض المشاريع',
    home: 'الرئيسية'
  },
  ru: {
    title: 'Проекты и кейсы SIPANEL',
    h1: 'Избранные проекты SIPANEL',
    description:
      'Десятки реализованных проектов в промышленных, аэропортовых, медицинских, коммерческих и спортивных объектах Ирана.\nОт большепролетных конструкций до сложных архитектурных оболочек — примеры инженерных решений SIPANEL.',
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
      'transparent-roofing': 'Стекло и поликарбонат'
    },
    primaryCta: 'Get Free Engineering Review',
    costReviewCta: 'Скачать технический каталог',
    conversionTitle: 'Нужен такой уровень контроля для вашего проекта?',
    conversionText: 'Отправьте тип проекта, локацию, примерную площадь, чертежи при наличии и главный риск, который SIPANEL должен проверить.',
    scrollCue: 'Смотреть проекты',
    home: 'Главная'
  }
};

const projectCaseStudies: ProjectCaseStudy[] = [
  {
    projectName: '32-Bed Military Hospital',
    slug: 'army-hospital',
    displayPriority: 1,
    filters: ['sandwich'],
    secondaryCategory: 'healthcare',
    location: 'Raz & Jargalan, North Khorasan, Iran',
    category: 'Healthcare & Emergency',
    projectType: 'Emergency hospital — Full EPC delivery',
    systemType: 'Sandwich Panel Systems',
    area: '1,000 m²',
    challenge: 'During the COVID-19 emergency, a fully operational 32-bed military hospital was needed from excavation to readiness in under 50 days, requiring full EPC coordination.',
    engineeringDecision: 'Engineering teams coordinated full EPC delivery — from excavation and structural construction to sandwich panel envelope, internal partitions, and final readiness — within an emergency timeline.',
    measuredResult: 'A fully operational 32-bed military hospital was delivered from excavation to readiness in less than 50 days during the COVID-19 emergency.',
    riskPrevented: ['Schedule overrun beyond 50-day target', 'Coordination failures across EPC disciplines', 'Envelope weather protection delays'],
    image: armyHospitalCard
  },
  {
    projectName: 'Mehrabad Airport Aircraft Hangar',
    slug: 'mehrabad-aircraft-hangar',
    displayPriority: 2,
    filters: ['sandwich'],
    secondaryCategory: 'transportation-infrastructure',
    location: 'Tehran, Iran',
    category: 'Aviation Infrastructure',
    projectType: 'Aircraft Hangar',
    systemType: 'Sandwich Panel System',
    area: '5,000 m²',
    challenge: 'The main challenge was the severe curvature of the structure and the need for accurate sandwich panel installation over a continuous curved geometry.',
    engineeringDecision: 'Precise coordination between the space frame, substructure, and panel installation sequence to preserve the curved form and avoid visual breaks.',
    measuredResult: 'Successful execution of 5,000 m² of sandwich panel covering while maintaining the geometric continuity of the curved surface.',
    riskPrevented: ['Visual breaks on curved roof surface', 'Installation errors on curved geometry', 'Mismatch between structure and covering system'],
    image: mehrabadAircraftHangarCard
  },
  {
    projectName: 'Erbil Eye Hospital Entrance Canopy',
    slug: 'erbil-eye-hospital-entrance-canopy',
    displayPriority: 3,
    filters: ['cladding', 'polycarbonate'],
    secondaryCategory: 'healthcare',
    location: 'Erbil, Kurdistan Region, Iraq',
    category: 'Healthcare Facility',
    projectType: 'Hospital Entrance Canopy',
    systemType: 'Polycarbonate Cladding & Space Frame',
    area: '1,500 m²',
    challenge: 'The project required translating a symbolic architectural concept into a buildable structure while preserving the visual expression of the eyelid, iris, and eye geometry.',
    engineeringDecision: 'Precise three-dimensional geometric control, custom cladding detailing, and phased installation to preserve the architectural intent throughout construction.',
    measuredResult: 'Successful completion of approximately 1,500 m² of polycarbonate enclosure while maintaining the intended eye-shaped architectural identity.',
    riskPrevented: ['Loss of architectural eye geometry', 'Distortion of eyelid and iris forms', 'Mismatch between structure and enclosure'],
    image: erbilEyeHospitalEntranceCanopyCard
  },
  {
    projectName: 'Tabas Railway Facility',
    slug: 'tabas-railway-facility',
    displayPriority: 4,
    filters: ['sandwich'],
    secondaryCategory: 'transportation-infrastructure',
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
    projectName: 'Mahshahr Taxi Parking Facility',
    slug: 'mahshahr-taxi-parking',
    displayPriority: 5,
    filters: ['sandwich'],
    secondaryCategory: 'transportation-infrastructure',
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
    projectName: 'Ahvaz Airport Passenger Terminal',
    slug: 'ahvaz-airport-passenger-terminal',
    displayPriority: 6,
    filters: ['standing', 'cladding'],
    secondaryCategory: 'transportation-infrastructure',
    location: 'Ahvaz, Iran',
    category: 'Airport Infrastructure',
    projectType: 'Airport Passenger Terminal',
    systemType: 'ZIP-TECH Roofing & Aluminium Cladding',
    area: '4,000 m²',
    challenge: 'The main challenge was the curved front architectural feature, where the covering had to be bent in a perpendicular direction, making the execution technically difficult.',
    engineeringDecision: 'Custom execution detailing, geometric control of the curved form, and precise coordination between substructure, aluminium panels, and ZIP-TECH system.',
    measuredResult: 'Successful execution of 4,000 m² of ZIP-TECH and aluminium cladding while preserving the curved architectural form and final visual quality.',
    riskPrevented: ['Visual breaks in curved facade', 'Incorrect perpendicular bending', 'Mismatch between cladding and substructure'],
    image: ahvazAirportPassengerTerminalCard
  },
  {
    projectName: 'Tehran Mall Roof Garden, Food Court & Cinema Roof',
    slug: 'tehran-mall-roof-garden-foodcourt',
    displayPriority: 7,
    filters: ['sandwich'],
    secondaryCategory: 'commercial-retail',
    location: 'Tehran, Iran',
    category: 'Commercial & Entertainment Complex',
    projectType: 'Large-Span Roof Structure',
    systemType: 'Space Frame + Sandwich Panel Roofing',
    area: 'Approx. 7,000 m²',
    challenge: 'Creating large column-free commercial and entertainment spaces while meeting architectural and structural requirements.',
    engineeringDecision: 'A long-span space frame system was selected to maximize open space, reduce structural weight and improve construction efficiency.',
    measuredResult: 'Successful completion of a large-scale roofing structure serving multiple public-use functions within Tehran Mall.',
    riskPrevented: ['Excessive structural loads', 'Operational interference from columns', 'Large-span construction challenges'],
    image: tehranMallRoofGardenFoodcourtCard
  },
  {
    projectName: 'Megapars Mall Atrium',
    slug: 'megaparsmall-atrium',
    displayPriority: 8,
    filters: ['standing'],
    secondaryCategory: 'commercial-retail',
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
    projectName: 'Absaar Water Park',
    slug: 'absaar-water-park',
    displayPriority: 9,
    filters: ['sandwich', 'standing'],
    secondaryCategory: 'sports-recreation',
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
    projectName: 'Andimeshk Stadium',
    slug: 'andimeshk-stadium',
    displayPriority: 10,
    filters: ['sandwich'],
    secondaryCategory: 'sports-recreation',
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
    projectName: 'Imam Khomeini Airport Hajj Passenger Terminal',
    slug: 'imam-khomeini-airport-hajj-terminal',
    displayPriority: 11,
    filters: ['sandwich'],
    secondaryCategory: 'transportation-infrastructure',
    location: 'Tehran, Iran',
    category: 'Airport Infrastructure',
    projectType: 'Passenger Waiting Hall',
    systemType: 'Sandwich Panel & Polycarbonate System',
    area: '5,000 m²',
    challenge: 'The primary challenge was the extremely compressed schedule between project award and the return of Hajj pilgrims, requiring immediate completion and operational readiness.',
    engineeringDecision: 'Fast-track procurement, parallel installation activities, and integration of polycarbonate wall systems to maximize natural daylight within the hall.',
    measuredResult: 'Successful completion and handover of a 5,000 m² airport facility in less than seven days.',
    riskPrevented: ['Operational delays before Hajj return flights', 'Airport capacity shortages', 'Insufficient daylight inside waiting areas'],
    image: imamKhomeiniAirportHajjTerminalCard
  },
  {
    projectName: 'Kermanshah Industrial University Petroleum Faculty',
    slug: 'kermanshah-industrial-university-petroleum-faculty',
    displayPriority: 12,
    filters: ['glass'],
    secondaryCategory: 'education-research',
    location: 'Kermanshah, Iran',
    category: 'Education & University',
    projectType: 'Structural Glass Facade',
    systemType: 'Seismic-Responsive Glass Facade Connections',
    area: '1,000 m²',
    challenge: 'The key challenge was designing facade connections so that structural movement during earthquakes would not damage or break the glass panels.',
    engineeringDecision: 'Connection details were engineered to accommodate relative structural displacement and reduce stress transfer to the glass facade.',
    measuredResult: 'Successful execution of approximately 1,000 m² of glass facade, which reportedly performed without glass damage during the Kermanshah earthquake in the 1390s Solar Hijri decade.',
    riskPrevented: ['Glass breakage under seismic movement', 'Facade connection failure', 'Mismatch between structure and glass facade'],
    image: kermanshahIndustrialUniversityPetroleumFacultyCard
  },
  {
    projectName: 'Shalamcheh Border Gate',
    slug: 'shalamcheh-border-gate',
    displayPriority: 13,
    filters: ['sandwich'],
    secondaryCategory: 'transportation-infrastructure',
    location: 'Khuzestan, Iran',
    category: 'Transportation Infrastructure',
    projectType: 'Border Terminal Entrance',
    systemType: 'Sandwich Panel System',
    area: '4,000 m²',
    challenge: 'The project required large unobstructed spans to accommodate heavy pedestrian and vehicle traffic while maintaining structural efficiency and climatic protection.',
    engineeringDecision: 'A lightweight space frame solution with sandwich panel roofing was selected to maximize span capability and accelerate construction.',
    measuredResult: 'Approximately 4,000 m² of covered border terminal infrastructure delivered.',
    riskPrevented: ['Traffic obstruction', 'Construction delays', 'Excessive structural weight'],
    image: shalamchehBorderGateCard
  },
  {
    projectName: 'Bandar Mahshahr Urban Bus Terminal',
    slug: 'bandar-mahshahr-bus-terminal',
    displayPriority: 14,
    filters: ['sandwich'],
    secondaryCategory: 'transportation-infrastructure',
    location: 'Bandar Mahshahr, Iran',
    category: 'Transportation Infrastructure',
    projectType: 'Urban Passenger Terminal',
    systemType: 'Space Frame with Insulated Composite Roofing',
    area: 'Approx. 4,000 m²',
    challenge: 'Providing shaded public space while ensuring durability against heat, humidity and corrosive environmental conditions.',
    engineeringDecision: 'A lightweight space frame combined with insulated sheet roofing and rock wool insulation was selected to improve thermal performance and durability.',
    measuredResult: 'Successful delivery of a large-scale terminal roof with efficient structural and thermal performance.',
    riskPrevented: ['Excessive solar heat gain', 'Environmental corrosion', 'Passenger circulation conflicts'],
    image: bandarMahshahrBusTerminalCard
  },
  {
    projectName: 'Najafabad University Amphitheater',
    slug: 'najafabad-university-amphitheater',
    displayPriority: 15,
    filters: ['sandwich'],
    secondaryCategory: 'public-cultural',
    location: 'Najafabad, Isfahan, Iran',
    category: 'Education & Cultural Facilities',
    projectType: 'Amphitheater and Convention Facility',
    systemType: 'Sandwich Panel System',
    area: '4,000 m²',
    challenge: 'The project featured a highly complex architectural geometry including cantilevers, curved edges and irregular surfaces that required precise enclosure detailing.',
    engineeringDecision: 'Custom support details and enclosure assemblies were developed to preserve the architectural intent while maintaining durability and weather protection.',
    measuredResult: 'Successful execution of approximately 4,000 m² of architectural enclosure on a complex university landmark building.',
    riskPrevented: ['Architectural form distortion', 'Water leakage at geometric transitions', 'Excessive dead loads'],
    image: najafabadUniversityAmphitheaterCard
  },
  {
    projectName: 'Fadak Mall Glass Skylight',
    slug: 'fadak-mall-glass-skylight',
    displayPriority: 16,
    filters: ['glass'],
    secondaryCategory: 'commercial-retail',
    location: 'Isfahan, Iran',
    category: 'Commercial Complex',
    projectType: 'Central Skylight',
    systemType: 'Glass Roofing System',
    area: '500 m²',
    challenge: 'The project required the installation of a glass enclosure over a three-dimensional elliptical form while maintaining geometric accuracy, waterproofing performance, and visual transparency.',
    engineeringDecision: 'Precise geometric control, custom glazing details, and installation management to achieve a seamless architectural skylight.',
    measuredResult: 'Successful completion of a 500 m² glass skylight delivering natural daylight to the mall atrium.',
    riskPrevented: ['Geometric distortion', 'Water leakage', 'Mismatch between structure and glazing'],
    image: fadakMallGlassSkylightCard
  },
  {
    projectName: 'Marun Petrochemical Multipurpose Hall',
    slug: 'marun-petrochemical-visitor-terminal',
    displayPriority: 17,
    filters: ['sandwich'],
    secondaryCategory: 'oil-gas-petrochemical',
    location: 'Mahshahr, Iran',
    category: 'Oil, Gas & Petrochemical',
    projectType: 'Industrial Gathering Facility',
    systemType: 'Sandwich Panel & Tensile Membrane',
    area: '5,000 m²',
    challenge: 'A critical engineering challenge was the development of a reliable structural interface between the tensile membrane system and the primary structure while maintaining load transfer integrity and long-term durability.',
    engineeringDecision: 'A dedicated connection assembly was engineered, analyzed and fabricated specifically for the interaction between the tensile membrane structure and the main supporting frame.',
    measuredResult: 'Successful completion of approximately 5,000 m² of hybrid enclosure within an active petrochemical environment.',
    riskPrevented: ['Stress concentration at membrane connections', 'Wind-induced membrane failures', 'Structural instability at force-transfer points'],
    image: marunPetrochemicalVisitorTerminalCard
  },
  {
    projectName: 'Toranj Kish Hotel Restaurant Roof',
    slug: 'toranj-kish-restaurant',
    displayPriority: 18,
    filters: ['sandwich'],
    secondaryCategory: 'hospitality-tourism',
    location: 'Kish Island, Iran',
    category: 'Hospitality & Tourism',
    projectType: 'Overwater Restaurant',
    systemType: 'Space Frame + Sandwich Panel Roofing',
    area: 'Approx. 500 m²',
    challenge: 'Construction in a highly corrosive marine environment with logistical and operational constraints.',
    engineeringDecision: 'A lightweight space frame system was selected to minimize dead loads and facilitate installation over water.',
    measuredResult: 'Successful completion of the restaurant roof structure in a demanding coastal environment.',
    riskPrevented: ['Marine corrosion', 'Excessive structural weight', 'Installation difficulties'],
    image: toranjKishRestaurantCard
  },
  {
    projectName: 'Baharestan Prayer Hall',
    slug: 'baharestan-prayer-hall',
    displayPriority: 19,
    filters: ['sandwich', 'cladding'],
    secondaryCategory: 'religious-community',
    location: 'Baharestan, Iran',
    category: 'Public Building',
    projectType: 'Prayer Hall',
    systemType: 'Sandwich Panel, Dry Ceramic Facade & Glass',
    area: '1,000 m²',
    challenge: 'The main challenge was installing dry ceramic cladding on steep roof surfaces where conventional dry-facade systems are typically not applicable.',
    engineeringDecision: 'Development and fabrication of custom connection systems capable of safely supporting ceramic panels on highly inclined roof geometries.',
    measuredResult: 'Successful execution of 1,000 m² of enclosure and facade works while maintaining architectural continuity between roof and wall surfaces.',
    riskPrevented: ['Ceramic panel slippage on inclined surfaces', 'Connection failure under roof loads', 'Discontinuity between roof and facade'],
    image: baharestanPrayerHallCard
  },
  {
    projectName: 'Enghelab Club Padel Center',
    slug: 'enghelab-club-padel-center',
    displayPriority: 20,
    filters: ['sandwich'],
    secondaryCategory: 'sports-recreation',
    location: 'Tehran, Iran',
    category: 'Sports Facilities',
    projectType: 'Padel Sports Hall',
    systemType: 'Sandwich Panel System',
    area: '2,000 m²',
    challenge: 'The project required large clear spans while maintaining structural efficiency and architectural quality within an active sports complex.',
    engineeringDecision: 'A lightweight space frame structure combined with sandwich panels was selected to optimize span capability, construction speed and durability.',
    measuredResult: 'Approximately 2,000 m² of sports facility enclosure delivered with large unobstructed interior space.',
    riskPrevented: ['Excessive structural weight', 'Obstruction of sports activities', 'Construction delays'],
    image: enghelabClubPadelCenterCard
  },
  {
    projectName: 'Maku Convention Hall',
    slug: 'maku-convention-hall',
    displayPriority: 21,
    filters: ['sandwich'],
    secondaryCategory: 'public-cultural',
    location: 'Maku, Iran',
    category: 'Public & Cultural Facilities',
    projectType: 'Convention Hall',
    systemType: 'Sandwich Panel System',
    area: '2,000 m²',
    challenge: 'The large-span curved geometry required precise installation to maintain weather-tightness, architectural consistency and structural performance.',
    engineeringDecision: 'A sandwich panel system was selected to combine lightweight construction, thermal efficiency and rapid installation.',
    measuredResult: 'Successful installation of approximately 2,000 m² of sandwich panel enclosure over the large-span structure.',
    riskPrevented: ['Water penetration', 'Excessive roof dead load', 'Construction delays'],
    image: makuConventionHallCard
  },
  {
    projectName: 'Gonabad University Sports Hall',
    slug: 'gonabad-university-sports-hall',
    displayPriority: 22,
    filters: ['sandwich'],
    secondaryCategory: 'sports-recreation',
    location: 'Gonabad, Iran',
    category: 'Education & Sports',
    projectType: 'University Sports Hall',
    systemType: 'Sandwich Panel System',
    area: '3,000 m²',
    challenge: 'The project required accurate installation of sandwich panels on a large curved roof while maintaining alignment, weather-tightness, and architectural consistency.',
    engineeringDecision: 'Careful installation sequencing and geometric control to ensure a uniform enclosure across the entire roof surface.',
    measuredResult: 'Successful completion of 3,000 m² of sandwich panel enclosure for a university sports facility.',
    riskPrevented: ['Curved roof alignment issues', 'Mismatch between enclosure and structure', 'Waterproofing deficiencies'],
    image: gonabadUniversitySportsHallCard
  },
  {
    projectName: 'Shahr Babak Wrestling Hall',
    slug: 'shahre-babak-hall',
    displayPriority: 23,
    filters: ['standing'],
    secondaryCategory: 'sports-recreation',
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
    projectName: 'Shahr Babak Stadium Entrance',
    slug: 'shahr-babak-stadium-entrance',
    displayPriority: 24,
    filters: ['cladding'],
    secondaryCategory: 'sports-recreation',
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
    projectName: 'Payam Industrial City Ceramic Manufacturing Facility',
    slug: 'payam-industrial-city-ceramic-factory',
    displayPriority: 25,
    filters: ['sandwich'],
    secondaryCategory: 'industrial',
    location: 'Karaj, Iran',
    category: 'Industrial Manufacturing',
    projectType: 'Long-span space frame industrial production hall',
    systemType: 'Space Frame + Sandwich Panel Roofing',
    area: '4,500 m²',
    challenge: 'Providing a large unobstructed production area while minimizing structural weight and construction time.',
    engineeringDecision: 'A lightweight space frame system was selected to achieve long spans and operational flexibility for ceramic manufacturing processes.',
    measuredResult: 'A 4,500 m² column-efficient production space optimized for manufacturing operations.',
    riskPrevented: ['Excessive structural weight', 'Column obstruction in production area', 'Construction delays'],
    image: payamIndustrialCityCeramicFactoryCard
  },
  {
    projectName: 'Tavanir Shahrekord Central Atrium',
    slug: 'tavanir-shahrekord-central-atrium',
    displayPriority: 26,
    filters: ['glass'],
    secondaryCategory: 'office-administrative',
    location: 'Shahrekord, Iran',
    category: 'Office Building',
    projectType: 'Atrium Skylight',
    systemType: 'Spider Glass System',
    area: 'Approx. 350 m²',
    challenge: 'Providing maximum daylight and architectural transparency while maintaining structural efficiency.',
    engineeringDecision: 'A lightweight space frame integrated with spider glass fittings was selected to minimize visual obstruction and maximize transparency.',
    measuredResult: 'Completed transparent atrium enclosure delivering natural daylight and weather protection.',
    riskPrevented: ['Excessive structural weight', 'Daylight reduction', 'Visual obstruction'],
    image: tavanirShahrekordCentralAtriumCard
  },
  {
    projectName: 'Bandar Abbas Mall',
    slug: 'bandar-abbas-mall-atrium-roof',
    displayPriority: 27,
    filters: ['sandwich'],
    secondaryCategory: 'commercial-retail',
    location: 'Bandar Abbas, Iran',
    category: 'Commercial Complex',
    projectType: 'Central Atrium Roof',
    systemType: 'Sandwich Panel System',
    area: '700 m²',
    challenge: 'The project involved installing enclosure systems over a prominent curved space-frame roof located at the center of a commercial development where architectural quality was critical.',
    engineeringDecision: 'Careful geometric control, alignment of panel layouts with the curved structure, and detailed finishing works to achieve a continuous architectural surface.',
    measuredResult: 'Successful completion of 700 m² of sandwich panel roofing for the central atrium enclosure.',
    riskPrevented: ['Visual discontinuity on curved surfaces', 'Geometry mismatch between roof and structure', 'Panel alignment defects'],
    image: bandarAbbasMallAtriumRoofCard
  },
  {
    projectName: 'Tiran Gas Station',
    slug: 'tiran-gas-station',
    displayPriority: 28,
    filters: ['sandwich'],
    secondaryCategory: 'commercial-retail',
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
  },
  {
    projectName: 'Eftekhar Commercial & Office Complex',
    slug: 'eftekhar-commercial-office-complex',
    displayPriority: 29,
    filters: ['polycarbonate'],
    secondaryCategory: 'commercial-retail',
    location: 'Isfahan, Iran',
    category: 'Commercial & Office',
    projectType: 'Central Atrium Roof',
    systemType: 'Polycarbonate Roofing System',
    area: '300 m²',
    challenge: 'The roof structure had to be integrated between existing building blocks while maintaining waterproof performance and structural efficiency.',
    engineeringDecision: 'A lightweight space frame combined with polycarbonate panels was selected to create a column-free span with excellent daylight transmission.',
    measuredResult: 'Approximately 300 m² of covered atrium space delivered without intermediate supports.',
    riskPrevented: ['Water infiltration', 'Excessive dead load', 'Insufficient daylight'],
    image: eftekharCommercialOfficeComplexCard
  },
  {
    projectName: 'Rouzbeh Charity Complex',
    slug: 'rouzbeh-charity-complex-zanjan',
    displayPriority: 30,
    filters: ['sandwich'],
    secondaryCategory: 'charity-institutional',
    location: 'Zanjan, Iran',
    category: 'Institutional & Charity',
    projectType: 'Central atrium roofing with space frame structure',
    systemType: 'Space Frame + Sandwich Panel Roofing',
    area: '1,000 m²',
    challenge: 'Installing a long-span roof over a multi-storey structure under construction while maintaining compatibility with the reinforced concrete building frame.',
    engineeringDecision: 'A lightweight space frame system combined with insulated sandwich panels was selected to optimize weight, speed, and thermal performance over the central atrium.',
    measuredResult: 'A fully covered central space providing approximately 1,000 m² of protected area integrated into the multi-storey building structure.',
    riskPrevented: ['Excessive dead load on building frame', 'Construction delays from weather exposure', 'Incompatibility with RC structure'],
    image: rouzbehCharityComplexZanjanCard
  },
  {
    projectName: 'Shahrood Azad University Central Skylight',
    slug: 'shahrood-azad-university-skylight',
    displayPriority: 31,
    filters: ['polycarbonate'],
    secondaryCategory: 'education-research',
    location: 'Shahrood, Iran',
    category: 'Education',
    projectType: 'Central Skylight Roof',
    systemType: 'Polycarbonate Roofing System',
    area: '400 m²',
    challenge: 'The skylight was installed on an existing roof structure, requiring careful control of dead loads, waterproofing details and structural integration.',
    engineeringDecision: 'A dome-shaped space frame with multiwall polycarbonate panels was selected to provide uniform daylight while minimizing structural weight.',
    measuredResult: 'Approximately 400 m² of naturally illuminated interior space created without intermediate supports.',
    riskPrevented: ['Water leakage', 'Excessive roof loading', 'Insufficient daylight'],
    image: shahroodAzadUniversitySkylightCard
  },
  {
    projectName: 'Atlas Hotel Atrium',
    slug: 'atlas-hotel-shahinshahr-atrium',
    displayPriority: 32,
    filters: ['polycarbonate'],
    secondaryCategory: 'hospitality-tourism',
    location: 'Shahin Shahr, Isfahan, Iran',
    category: 'Hospitality',
    projectType: 'Hotel Central Atrium',
    systemType: 'Polycarbonate Roofing System',
    area: '700 m²',
    challenge: 'The atrium served as the focal public space of the hotel and required a lightweight, translucent enclosure capable of delivering natural daylight while preserving architectural quality.',
    engineeringDecision: 'Implementation of a polycarbonate enclosure to maximize daylight penetration, reduce structural weight, and maintain architectural continuity.',
    measuredResult: 'Successful completion of a 700 m² polycarbonate atrium enclosure, creating a bright and welcoming hospitality environment.',
    riskPrevented: ['Insufficient daylight in the atrium', 'Excessive roof dead load', 'Architectural discontinuity'],
    image: atlasHotelShahinshahrAtriumCard
  },
  {
    projectName: 'Tarbiat Modares University Research Greenhouse',
    slug: 'tarbiat-modares-research-greenhouse',
    displayPriority: 33,
    filters: ['polycarbonate'],
    secondaryCategory: 'education-research',
    location: 'Iran',
    category: 'Education & Research',
    projectType: 'Research Greenhouse',
    systemType: 'Polycarbonate Enclosure',
    area: '400 m²',
    challenge: 'The project required the installation of a transparent enclosure over a complex dome-shaped geometry while maintaining durability, daylight performance, and structural efficiency.',
    engineeringDecision: 'Implementation of lightweight polycarbonate panels combined with accurate geometric control of the space-frame structure.',
    measuredResult: 'Successful completion of approximately 400 m² of polycarbonate enclosure for research and experimental greenhouse applications.',
    riskPrevented: ['Insufficient daylight penetration', 'Thermal performance issues', 'Geometry mismatch'],
    image: tarbiatModaresResearchGreenhouseCard
  },
  {
    projectName: 'Sepehan Flower Market',
    slug: 'sepehan-flower-market',
    displayPriority: 34,
    filters: ['sandwich'],
    secondaryCategory: 'commercial-retail',
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
    projectName: 'Parand City Entrance Gate',
    slug: 'parand-city-entrance',
    displayPriority: 35,
    filters: ['cladding'],
    secondaryCategory: 'public-cultural',
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
  }
];

const rfqHref = '/contact#rfq-form';

const localizedProjectCaseStudies: Partial<Record<Locale, Record<string, LocalizedProjectCaseStudy>>> = {
  fa: {
    'army-hospital': {
      projectName: 'بیمارستان ۳۲ تختخوابی ارتش',
      location: 'راز و جرگلان، خراسان شمالی، ایران',
      category: 'بهداشت و درمان',
      projectType: 'بیمارستان اضطراری — تحویل کامل EPC',
      systemType: 'سیستم‌های ساندویچ پانل',
      area: 'حدود ۱۰۰۰ مترمربع',
      challenge: 'در شرایط اضطراری کرونا، یک بیمارستان ۳۲ تختخوابی کاملاً عملیاتی از خاکبرداری تا آماده‌سازی در کمتر از ۵۰ روز مورد نیاز بود.',
      engineeringDecision: 'تیم‌های مهندسی تحویل کامل EPC را از خاکبرداری و ساخت سازه تا پوسته ساندویچ پانل، پارتیشن‌های داخلی و آماده‌سازی نهایی در بازه زمانی اضطراری هماهنگ کردند.',
      measuredResult: 'بیمارستان ۳۲ تختخوابی کاملاً عملیاتی در کمتر از ۵۰ روز از خاکبرداری تا آماده‌سازی تحویل داده شد.',
      riskPrevented: ['تجاوز از زمان‌بندی ۵۰ روزه', 'ناهماهنگی بین رشته‌های EPC', 'تأخیر در حفاظت جوی پوسته']
    },
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
    },
    'ahvaz-airport-passenger-terminal': {
      projectName: 'سالن انتظار فرودگاه اهواز',
      location: 'اهواز، ایران',
      category: 'زیرساخت فرودگاهی',
      projectType: 'سالن انتظار فرودگاه',
      systemType: 'زیپ تک و آلومینیوم کلادینگ',
      area: '۴۰۰۰ مترمربع',
      challenge: 'چالش اصلی پروژه، اجرای پوشش روی قوس جلوی سازه بود؛ بخشی که نیاز داشت پوشش در جهت عمود خم شود و اجرای آن را پیچیده می‌کرد.',
      engineeringDecision: 'طراحی جزئیات اجرایی اختصاصی، کنترل هندسه قوس و هماهنگی دقیق بین زیرسازی، پنل‌های آلومینیومی و سیستم زیپ تک برای رسیدن به فرم نهایی.',
      measuredResult: 'اجرای موفق ۴۰۰۰ مترمربع پوشش زیپ تک و آلومینیوم کلادینگ با حفظ فرم قوسی و کیفیت ظاهری نهایی.',
      riskPrevented: ['شکست بصری در قوس نما', 'خطای خمکاری در جهت عمود', 'ناهماهنگی بین پوشش و زیرسازی']
    },
    'atlas-hotel-shahinshahr-atrium': {
      projectName: 'آتریوم هتل اطلس',
      location: 'شاهین‌شهر، اصفهان، ایران',
      category: 'هتل و مهمان‌نوازی',
      projectType: 'آتریوم مرکزی هتل',
      systemType: 'پوشش پلی‌کربنات',
      area: '۷۰۰ مترمربع',
      challenge: 'آتریوم به‌عنوان مهم‌ترین فضای عمومی هتل، نیازمند پوششی سبک، شفاف و هماهنگ با معماری داخلی بود. کیفیت نور، زیبایی بصری و یکپارچگی فرم از الزامات اصلی پروژه محسوب می‌شد.',
      engineeringDecision: 'استفاده از سیستم پلی‌کربنات برای انتقال نور طبیعی، کاهش وزن مرده سازه و ایجاد پوششی یکپارچه بر روی هندسه فضاکار سقف آتریوم.',
      measuredResult: 'اجرای موفق ۷۰۰ مترمربع پوشش پلی‌کربنات و ایجاد یک فضای مرکزی روشن و شاخص برای مجموعه هتل.',
      riskPrevented: ['کاهش نور طبیعی در فضای آتریوم', 'افزایش وزن پوشش سقف', 'اختلال در یکپارچگی معماری داخلی']
    },
    'baharestan-prayer-hall': {
      projectName: 'سالن نماز شهر بهارستان',
      location: 'بهارستان، ایران',
      category: 'ساختمان عمومی',
      projectType: 'سالن نماز',
      systemType: 'ساندویچ پانل، نمای خشک سرامیک و شیشه',
      area: '۱۰۰۰ مترمربع',
      challenge: 'چالش اصلی پروژه اجرای نمای خشک سرامیکی بر روی سطوح سقف با شیب زیاد بود؛ موضوعی که در سیستم‌های متعارف نمای خشک پیش‌بینی نشده است.',
      engineeringDecision: 'طراحی، مهندسی و تولید اتصالات اختصاصی برای نصب ایمن و پایدار سرامیک خشک بر روی سطوح شیبدار و حفظ یکپارچگی هندسی نما و سقف.',
      measuredResult: 'اجرای موفق ۱۰۰۰ مترمربع پوشش و نما با حفظ خطوط معماری پروژه و دستیابی به یک پوسته یکپارچه بین سقف و دیوار.',
      riskPrevented: ['لغزش یا جابجایی سرامیک روی شیب', 'شکست اتصالات در سطوح مایل', 'عدم یکپارچگی بین نما و سقف']
    },
    'bandar-abbas-mall-atrium-roof': {
      projectName: 'مال بندرعباس',
      location: 'بندرعباس، ایران',
      category: 'مجتمع تجاری',
      projectType: 'آتریوم مرکزی مجتمع تجاری',
      systemType: 'سیستم ساندویچ پانل',
      area: '۷۰۰ مترمربع',
      challenge: 'پروژه شامل اجرای پوشش بر روی سازه فضاکار قوسی در قلب مجموعه تجاری بود؛ بخشی که علاوه بر الزامات فنی، در معرض دید مستقیم بازدیدکنندگان قرار دارد و کیفیت اجرای آن اهمیت ویژه‌ای داشت.',
      engineeringDecision: 'کنترل دقیق خطوط نصب، هماهنگی هندسه پوشش با فرم قوسی سازه و اجرای جزئیات پایانی برای دستیابی به سطحی یکپارچه و خوانا در فضای آتریوم.',
      measuredResult: 'اجرای موفق ۷۰۰ مترمربع پوشش ساندویچ پانل بر روی سقف قوسی آتریوم و تکمیل پوسته معماری فضای مرکزی مجتمع.',
      riskPrevented: ['شکست بصری در سطوح قوسی', 'عدم تطابق پوشش با هندسه سازه', 'موج‌دار شدن خطوط پوشش']
    },
    'bandar-mahshahr-bus-terminal': {
      projectName: 'ترمینال اتوبوس شهری بندر ماهشهر',
      location: 'بندر ماهشهر، ایران',
      category: 'زیرساخت حمل‌ونقل عمومی',
      projectType: 'پایانه مسافربری شهری',
      systemType: 'سازه فضاکار با پوشش ترکیبی عایق‌دار',
      area: 'حدود ۴۰۰۰ مترمربع',
      challenge: 'تأمین سایه گسترده، مقاومت در برابر رطوبت و خوردگی محیطی و ایجاد فضای بدون ستون‌های مزاحم برای حرکت مسافران و ناوگان حمل‌ونقل.',
      engineeringDecision: 'استفاده از سازه فضاکار سبک با پوشش ترکیبی ورق و عایق پشم سنگ برای افزایش دوام، بهبود عملکرد حرارتی و کاهش بارهای وارده به سازه اصلی.',
      measuredResult: 'اجرای حدود ۴۰۰۰ مترمربع سقف یکپارچه برای ترمینال شهری با قابلیت پوشش دهانه‌های وسیع و عملکرد مناسب در شرایط اقلیمی بندر ماهشهر.',
      riskPrevented: ['افزایش دمای فضای زیر سقف', 'خوردگی ناشی از رطوبت و شرایط ساحلی', 'تداخل ستون‌ها با مسیرهای تردد']
    },
    'eftekhar-commercial-office-complex': {
      projectName: 'مجتمع تجاری اداری افتخار',
      location: 'اصفهان، ایران',
      category: 'تجاری و اداری',
      projectType: 'پوشش آتریوم مرکزی',
      systemType: 'پوشش پلی کربنات',
      area: '۳۰۰ مترمربع',
      challenge: 'اجرای سازه میان دو بلوک ساختمانی موجود نیازمند طراحی دقیق سازه، کنترل تغییرشکل و اجرای جزئیات آب بندی بود.',
      engineeringDecision: 'استفاده از سازه فضاکار سبک همراه با پوشش پلی کربنات برای ایجاد دهانه بدون ستون، کاهش بار مرده و تأمین نور طبیعی.',
      measuredResult: 'ایجاد حدود ۳۰۰ مترمربع فضای سرپوشیده نورگیر بدون نیاز به ستون میانی.',
      riskPrevented: ['نفوذ آب باران', 'افزایش بار مرده ساختمان', 'کاهش نور طبیعی']
    },
    'enghelab-club-padel-center': {
      projectName: 'مجموعه پدل باشگاه انقلاب',
      location: 'تهران، ایران',
      category: 'ورزشی',
      projectType: 'سالن پدل و ورزش‌های راکتی',
      systemType: 'ساندویچ پانل',
      area: '۲۰۰۰ مترمربع',
      challenge: 'پروژه در یکی از شناخته‌شده‌ترین مجموعه‌های ورزشی کشور اجرا شد و نیازمند هماهنگی دقیق بین معماری، سازه و محدودیت‌های اجرایی سایت بود.',
      engineeringDecision: 'استفاده از سازه فضاکار سبک با پوشش ساندویچ پانل برای دستیابی به دهانه‌های بزرگ، سرعت اجرا و کاهش بار مرده سازه.',
      measuredResult: 'اجرای حدود ۲۰۰۰ مترمربع پوشش سالن ورزشی با حداقل تعداد ستون میانی و ایجاد فضای مناسب برای زمین‌های پدل.',
      riskPrevented: ['افزایش وزن سازه', 'اختلال در عملکرد زمین‌های ورزشی', 'افزایش زمان اجرا']
    },
    'erbil-eye-hospital-entrance-canopy': {
      projectName: 'سایبان ورودی بیمارستان چشم اربیل',
      location: 'اربیل، کردستان عراق',
      category: 'درمانی',
      projectType: 'ورودی بیمارستان تخصصی',
      systemType: 'پلی‌کربنات و سازه فضاکار',
      area: '۱۵۰۰ مترمربع',
      challenge: 'چالش اصلی پروژه تبدیل یک فرم معماری نمادین به یک سیستم اجرایی واقعی بود. هندسه پروژه به گونه‌ای طراحی شده بود که فرم نهایی باید تصویر یک چشم را تداعی کند و کوچک‌ترین خطای اجرایی می‌توانست این مفهوم معماری را از بین ببرد.',
      engineeringDecision: 'کنترل دقیق هندسه سه‌بعدی سازه، طراحی جزئیات اتصال پوشش پلی‌کربنات و اجرای مرحله‌ای پوشش برای حفظ انحناها و خطوط اصلی فرم چشم.',
      measuredResult: 'اجرای موفق حدود ۱۵۰۰ مترمربع پوشش پلی‌کربنات و دستیابی به فرم نهایی منطبق با کانسپت معماری بیمارستان چشم.',
      riskPrevented: ['از بین رفتن خوانایی فرم چشم', 'اعوجاج در هندسه پلک و مردمک', 'ناهماهنگی بین سازه و پوشش']
    },
    'fadak-mall-glass-skylight': {
      projectName: 'اسکای‌لایت فدک مال',
      location: 'اصفهان، ایران',
      category: 'مجتمع تجاری',
      projectType: 'نورگیر مرکزی (Skylight)',
      systemType: 'پوشش شیشه‌ای',
      area: '۵۰۰ مترمربع',
      challenge: 'پروژه شامل اجرای پوشش شیشه‌ای بر روی یک هندسه بیضوی سه‌بعدی بود؛ به‌گونه‌ای که یکنواختی خطوط شبکه، آب‌بندی و شفافیت بصری در کل سطح حفظ شود.',
      engineeringDecision: 'کنترل دقیق هندسه سازه فضاکار، طراحی جزئیات اتصال شیشه‌ها و مدیریت تلرانس‌های اجرایی برای دستیابی به سطحی یکپارچه و شفاف.',
      measuredResult: 'اجرای موفق ۵۰۰ مترمربع نورگیر شیشه‌ای با حفظ کیفیت بصری و تأمین نور طبیعی برای فضای مرکزی مجتمع.',
      riskPrevented: ['اعوجاج هندسی در فرم بیضوی', 'اختلال در آب‌بندی نورگیر', 'ناهماهنگی شبکه شیشه و سازه']
    },
    'gonabad-university-sports-hall': {
      projectName: 'سالن ورزشی دانشگاه علوم پزشکی گناباد',
      location: 'گناباد، ایران',
      category: 'آموزشی و ورزشی',
      projectType: 'سالن ورزشی دانشگاهی',
      systemType: 'ساندویچ پانل',
      area: '۳۰۰۰ مترمربع',
      challenge: 'پروژه شامل اجرای پوشش بر روی یک سقف قوسی با دهانه بلند بود که نیازمند حفظ یکنواختی خطوط پوشش، کنترل دقیق انحنا و هماهنگی کامل با هندسه سازه بود.',
      engineeringDecision: 'برنامه‌ریزی دقیق نصب، کنترل تلرانس‌های اجرایی و اجرای مرحله‌ای پوشش برای دستیابی به سطحی یکپارچه در طول کامل سالن.',
      measuredResult: 'اجرای موفق ۳۰۰۰ مترمربع پوشش ساندویچ پانل و تکمیل پوسته سالن ورزشی مطابق با الزامات بهره‌برداری دانشگاهی.',
      riskPrevented: ['اعوجاج در خطوط سقف قوسی', 'ناهماهنگی پوشش و سازه', 'کاهش عملکرد آب‌بندی سقف']
    },
    'imam-khomeini-airport-hajj-terminal': {
      projectName: 'سالن انتظار حجاج فرودگاه امام خمینی',
      location: 'تهران، ایران',
      category: 'زیرساخت فرودگاهی',
      projectType: 'سالن انتظار مسافران',
      systemType: 'ساندویچ پانل و پلی‌کربنات',
      area: '۵۰۰۰ مترمربع',
      challenge: 'بزرگ‌ترین چالش پروژه محدودیت شدید زمانی بود. فاصله زمانی بین سفارش پروژه و بازگشت حجاج بسیار کوتاه بود و سالن باید در زمانی فشرده آماده بهره‌برداری می‌شد.',
      engineeringDecision: 'برنامه‌ریزی فشرده تأمین مصالح، اجرای همزمان چند جبهه کاری و استفاده از پلی‌کربنات در جداره‌ها برای افزایش نور طبیعی و کاهش نیاز به روشنایی روز.',
      measuredResult: 'تکمیل و تحویل ۵۰۰۰ مترمربع پوشش فرودگاهی در کمتر از ۷ روز و آماده‌سازی سالن پیش از آغاز بهره‌برداری.',
      riskPrevented: ['عدم آمادگی سالن پیش از بازگشت حجاج', 'تاخیر در بهره‌برداری فرودگاهی', 'کمبود نور طبیعی در فضای انتظار']
    },
    'kermanshah-industrial-university-petroleum-faculty': {
      projectName: 'دانشکده نفت دانشگاه صنعتی کرمانشاه',
      location: 'کرمانشاه، ایران',
      category: 'آموزشی و دانشگاهی',
      projectType: 'نمای شیشه‌ای سازه‌ای',
      systemType: 'نمای شیشه‌ای با اتصالات کنترل‌شده',
      area: '۱۰۰۰ مترمربع',
      challenge: 'چالش اصلی پروژه طراحی اتصالات نمای شیشه‌ای بود؛ به‌گونه‌ای که در هنگام زلزله، تغییرشکل سازه باعث شکست یا آسیب به شیشه‌ها نشود.',
      engineeringDecision: 'طراحی اتصالات با قابلیت تحمل جابه‌جایی نسبی سازه و کنترل تنش وارد بر شیشه‌ها برای حفظ ایمنی و عملکرد نما.',
      measuredResult: 'اجرای موفق حدود ۱۰۰۰ مترمربع نمای شیشه‌ای که در زلزله کرمانشاه دهه ۱۳۹۰ خورشیدی عملکرد مناسبی داشت و آسیبی به شیشه‌ها وارد نشد.',
      riskPrevented: ['شکست شیشه در اثر جابه‌جایی لرزه‌ای', 'آسیب به اتصالات نما', 'ناهماهنگی بین سازه و نمای شیشه‌ای']
    },
    'maku-convention-hall': {
      projectName: 'سالن اجتماعات ماکو',
      location: 'ماکو، آذربایجان غربی، ایران',
      category: 'فرهنگی و اجتماعات',
      projectType: 'سالن اجتماعات',
      systemType: 'ساندویچ پانل',
      area: '۲۰۰۰ مترمربع',
      challenge: 'هندسه منحنی و دهانه وسیع سازه نیازمند اجرای دقیق پوشش برای حفظ یکنواختی ظاهری، آب‌بندی مناسب و عملکرد سازه‌ای در شرایط اقلیمی منطقه بود.',
      engineeringDecision: 'استفاده از سیستم ساندویچ پانل برای دستیابی به وزن مناسب، سرعت اجرا و عملکرد حرارتی مطلوب در کنار سازه فضاکار.',
      measuredResult: 'اجرای حدود ۲۰۰۰ مترمربع پوشش ساندویچ پانل بر روی سازه دهانه بلند سالن اجتماعات.',
      riskPrevented: ['نفوذ آب در سطوح منحنی', 'افزایش وزن مرده پوشش', 'کاهش سرعت اجرا']
    },
    'marun-petrochemical-visitor-terminal': {
      projectName: 'سالن چندمنظوره پتروشیمی مارون',
      location: 'ماهشهر، خوزستان، ایران',
      category: 'نفت، گاز و پتروشیمی',
      projectType: 'سالن خدماتی و تجمعات',
      systemType: 'ساندویچ پانل و سازه چادری',
      area: '۵۰۰۰ مترمربع',
      challenge: 'چالش اصلی پروژه اتصال ایمن و پایدار سازه چادری به سازه اصلی بود. این اتصال باید ضمن انتقال نیروها، امکان عملکرد صحیح پوشش پارچه‌ای را در شرایط باد، دما و بهره‌برداری صنعتی فراهم می‌کرد.',
      engineeringDecision: 'طراحی، تحلیل و ساخت جزئیات اتصال اختصاصی بین سازه فضاکار و سیستم کششی پارچه‌ای به‌منظور تضمین عملکرد بلندمدت و ایمنی سازه.',
      measuredResult: 'اجرای حدود ۵۰۰۰ مترمربع پوشش ترکیبی شامل ساندویچ پانل و پارچه معماری با موفقیت کامل و بهره‌برداری در محیط صنعتی پتروشیمی.',
      riskPrevented: ['تمرکز تنش در محل اتصال سازه چادری', 'خرابی پوشش پارچه‌ای در اثر بار باد', 'ناپایداری در نقاط انتقال نیرو']
    },
    'mehrabad-aircraft-hangar': {
      projectName: 'آشیانه هواپیما فرودگاه مهرآباد',
      location: 'تهران، ایران',
      category: 'زیرساخت هوانوردی',
      projectType: 'آشیانه هواپیما',
      systemType: 'سیستم ساندویچ پانل',
      area: '۵۰۰۰ مترمربع',
      challenge: 'چالش اصلی پروژه، قوس شدید سازه و نیاز به اجرای دقیق پوشش ساندویچ پانل بر روی هندسه منحنی بود.',
      engineeringDecision: 'هماهنگی دقیق بین سازه فضاکار، زیرسازی و مسیر نصب پانل‌ها برای حفظ فرم قوسی و جلوگیری از شکست بصری در سطح نهایی.',
      measuredResult: 'اجرای موفق ۵۰۰۰ مترمربع پوشش ساندویچ پانل با حفظ یکنواختی هندسی سطح قوسی.',
      riskPrevented: ['شکست بصری در پوشش قوسی', 'خطای نصب روی سازه منحنی', 'ناهماهنگی بین سازه و پوشش']
    },
    'najafabad-university-amphitheater': {
      projectName: 'سالن آمفی‌تئاتر دانشگاه آزاد اسلامی نجف‌آباد',
      location: 'نجف‌آباد، اصفهان، ایران',
      category: 'آموزشی و فرهنگی',
      projectType: 'آمفی‌تئاتر و مرکز همایش',
      systemType: 'ساندویچ پانل',
      area: '۴۰۰۰ مترمربع',
      challenge: 'معماری پروژه دارای خطوط شکسته، کنسول‌های بلند، سطوح منحنی و زوایای متغیر بود. پوشش باید به‌گونه‌ای اجرا می‌شد که هندسه معماری بدون تغییر حفظ شود و در عین حال جزئیات اجرایی و آب‌بندی نیز کنترل گردد.',
      engineeringDecision: 'طراحی جزئیات اختصاصی برای پوشش سطوح جانبی، زیرسازه و لبه‌های آزاد با استفاده از ساندویچ پانل و زیرسازی ویژه جهت حفظ خلوص فرم معماری.',
      measuredResult: 'اجرای حدود ۴۰۰۰ مترمربع پوشش ساندویچ پانل بر روی یکی از پیچیده‌ترین فرم‌های معماری دانشگاهی کشور.',
      riskPrevented: ['اعوجاج در فرم معماری پروژه', 'نشت آب در نقاط شکست هندسی', 'افزایش وزن پوشش']
    },
    'payam-industrial-city-ceramic-factory': {
      projectName: 'سالن تولید ظروف سرامیکی شهرک صنعتی پیام',
      location: 'شهرک صنعتی پیام، کرج',
      category: 'تولید صنعتی',
      projectType: 'سازه فضاکار دهانه بلند برای فضای تولید صنعتی',
      systemType: 'سازه فضاکار با پوشش ساندویچ پانل',
      area: '۴۵۰۰ مترمربع',
      challenge: 'تأمین دهانه‌های وسیع صنعتی، کاهش تعداد ستون‌ها، کنترل وزن سازه و اجرای سریع بدون اختلال در برنامه راه‌اندازی کارخانه.',
      engineeringDecision: 'استفاده از سیستم سازه فضاکار سبک با قابلیت پوشش دهانه‌های بزرگ و اجرای پوشش ساندویچ پانل جهت تأمین عایق‌بندی حرارتی.',
      measuredResult: 'ایجاد فضای تولیدی وسیع و یکپارچه به مساحت تقریبی ۴۵۰۰ مترمربع با حداقل موانع سازه‌ای و قابلیت بهره‌برداری صنعتی.',
      riskPrevented: ['افزایش وزن سازه', 'مزاحمت ستون‌ها در فضای تولید', 'تأخیر در اجرا']
    },
    'rouzbeh-charity-complex-zanjan': {
      projectName: 'مؤسسه خیریه روزبه زنجان',
      location: 'زنجان، ایران',
      category: 'نهادی و خیریه',
      projectType: 'پوشش دهانه مرکزی ساختمان با سازه فضاکار و ساندویچ پانل',
      systemType: 'سازه فضاکار و پوشش ساندویچ پانل',
      area: '۱۰۰۰ مترمربع',
      challenge: 'اجرای سازه بر روی ساختمان چندطبقه در حال احداث، محدودیت‌های اجرایی ناشی از ارتفاع پروژه و نیاز به هماهنگی کامل با سازه بتنی موجود.',
      engineeringDecision: 'استفاده از سیستم فضاکار سبک با قابلیت نصب سریع و حداقل بار مرده، همراه با پوشش ساندویچ پانل برای تأمین عایق‌بندی حرارتی.',
      measuredResult: 'ایجاد فضای سرپوشیده یکپارچه به مساحت تقریبی ۱۰۰۰ مترمربع با اجرای سریع و حداقل تأثیر بر روند ساخت مجموعه.',
      riskPrevented: ['بار مرده اضافی بر سازه بتنی', 'تأخیر اجرا ناشی از شرایط جوی', 'ناسازگاری با سازه بتن مسلح']
    },
    'shahrood-azad-university-skylight': {
      projectName: 'سقف نورگیر ساختمان مرکزی دانشگاه آزاد شاهرود',
      location: 'شاهرود، ایران',
      category: 'آموزشی',
      projectType: 'سقف نورگیر مرکزی',
      systemType: 'پوشش پلی کربنات',
      area: '۴۰۰ مترمربع',
      challenge: 'پروژه بر روی بام ساختمان موجود اجرا شد و نیازمند کنترل وزن سازه، محدودیت‌های اجرایی، آب‌بندی کامل و انتقال ایمن بارها به سازه اصلی ساختمان بود.',
      engineeringDecision: 'استفاده از سازه فضاکار سبک با هندسه گنبدی و پوشش پلی کربنات چندجداره برای دستیابی به نور یکنواخت، کاهش بار مرده و افزایش سرعت اجرا.',
      measuredResult: 'ایجاد حدود ۴۰۰ مترمربع فضای نورگیر با نور طبیعی گسترده و بدون نیاز به ستون‌های میانی.',
      riskPrevented: ['نفوذ آب به ساختمان', 'افزایش بار مرده سقف', 'کاهش نور طبیعی فضاهای داخلی']
    },
    'shalamcheh-border-gate': {
      projectName: 'گیت ورودی مرز شلمچه',
      location: 'شلمچه، خوزستان، ایران',
      category: 'زیرساخت حمل و نقل',
      projectType: 'پایانه و گیت مرزی',
      systemType: 'ساندویچ پانل',
      area: '۴۰۰۰ مترمربع',
      challenge: 'پروژه شامل چندین دهانه بزرگ با فرم معماری خاص بود که باید ضمن ایجاد سایه و حفاظت اقلیمی، امکان عبور حجم بالای خودروها و مسافران را فراهم می‌کرد.',
      engineeringDecision: 'استفاده از سازه فضاکار سبک با پوشش ساندویچ پانل، امکان اجرای دهانه‌های وسیع، سرعت بالای نصب و حداقل تعداد ستون‌های مزاحم را فراهم کرد.',
      measuredResult: 'اجرای حدود ۴۰۰۰ مترمربع پوشش برای مجموعه ورودی مرز شلمچه و ایجاد فضای عملکردی مناسب برای تردد و کنترل مرزی.',
      riskPrevented: ['تراکم ستون‌ها در مسیر عبور', 'افزایش زمان اجرا', 'افزایش وزن سازه']
    },
    'tarbiat-modares-research-greenhouse': {
      projectName: 'گلخانه تحقیقاتی دانشگاه تربیت مدرس',
      location: 'ایران',
      category: 'آموزشی و پژوهشی',
      projectType: 'گلخانه تحقیقاتی',
      systemType: 'پوشش پلی‌کربنات',
      area: '۴۰۰ مترمربع',
      challenge: 'پروژه نیازمند اجرای پوشش شفاف بر روی یک هندسه گنبدی پیچیده بود؛ به‌گونه‌ای که ضمن تأمین نور مناسب، عملکرد سازه و دوام پوشش نیز حفظ شود.',
      engineeringDecision: 'استفاده از پانل‌های پلی‌کربنات سبک و مقاوم در کنار کنترل دقیق هندسه سازه فضاکار برای دستیابی به پوسته‌ای شفاف و یکپارچه.',
      measuredResult: 'اجرای موفق حدود ۴۰۰ مترمربع پوشش پلی‌کربنات بر روی سازه گنبدی و ایجاد محیط مناسب برای تحقیقات و آزمایش‌های گیاهی.',
      riskPrevented: ['کاهش نور طبیعی در فضای تحقیقاتی', 'اختلال در عملکرد حرارتی گلخانه', 'ناهماهنگی هندسی بین پوشش و سازه']
    },
    'tavanir-shahrekord-central-atrium': {
      projectName: 'وید مرکزی شرکت توانیر شهرکرد',
      location: 'شهرکرد، ایران',
      category: 'ساختمان اداری',
      projectType: 'پوشش وید مرکزی',
      systemType: 'شیشه و اتصالات اسپایدر',
      area: 'حدود ۳۵۰ مترمربع',
      challenge: 'ایجاد یک سقف شفاف با حداقل المان‌های مزاحم بصری و در عین حال تأمین الزامات سازه‌ای و بارگذاری شیشه.',
      engineeringDecision: 'استفاده از سازه فضاکار سبک به همراه سیستم Spider Glazing برای انتقال بارها، حفظ شفافیت معماری و ایجاد یک سقف نورگیر یکپارچه.',
      measuredResult: 'اجرای پوشش شیشه‌ای آتریوم مرکزی ساختمان اداری با قابلیت تأمین نور طبیعی و عملکرد سازه‌ای مناسب.',
      riskPrevented: ['کاهش نور طبیعی', 'افزایش وزن سازه', 'اختلال در دید معماری']
    },
    'tehran-mall-roof-garden-foodcourt': {
      projectName: 'سقف روف گاردن، فودکورت و سینمای تهران مال',
      location: 'تهران، ایران',
      category: 'مجتمع تجاری و تفریحی',
      projectType: 'سقف فضاکار گسترده',
      systemType: 'سازه فضاکار و پوشش ساندویچ پانل',
      area: 'حدود ۷۰۰۰ مترمربع',
      challenge: 'پوشش یکپارچه فضاهای گسترده تجاری و تفریحی در طبقات فوقانی ساختمان با محدودیت‌های معماری، بارگذاری و الزامات اجرایی پیچیده.',
      engineeringDecision: 'استفاده از سیستم سازه فضاکار برای ایجاد دهانه‌های بلند، کاهش تعداد تکیه‌گاه‌ها، افزایش سرعت اجرا و تأمین انعطاف‌پذیری معماری در فضاهای عمومی.',
      measuredResult: 'اجرای موفق بیش از ۷۰۰۰ مترمربع سقف فضاکار برای روف گاردن، فودکورت و سینماهای مجموعه تهران مال.',
      riskPrevented: ['افزایش وزن سازه اصلی', 'تداخل ستون‌ها با کاربری تجاری', 'پیچیدگی اجرای دهانه‌های بزرگ']
    },
    'toranj-kish-restaurant': {
      projectName: 'رستوران دریایی هتل ترنج کیش',
      location: 'جزیره کیش، ایران',
      category: 'هتل و گردشگری',
      projectType: 'رستوران روی آب',
      systemType: 'سازه فضاکار و پوشش ساندویچ پانل',
      area: 'حدود ۵۰۰ مترمربع',
      challenge: 'اجرای سازه در محیط دریایی با رطوبت و خوردگی بالا، محدودیت‌های دسترسی و الزامات ویژه بهره‌برداری هتل.',
      engineeringDecision: 'استفاده از سیستم سازه فضاکار سبک برای کاهش وزن، تسهیل حمل و نصب و افزایش دوام در شرایط اقلیمی ساحلی.',
      measuredResult: 'اجرای موفق سقف رستوران مجموعه هتل ترنج با پوشش حدود ۵۰۰ مترمربع در محیط دریایی.',
      riskPrevented: ['خوردگی ناشی از شرایط دریایی', 'افزایش بار مرده سازه', 'پیچیدگی نصب در محیط آبی']
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
    routes,
    section: 'projects'
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
  {id: 'transparent-roofing'}
] as const;

function buildFilterString(filters: string[]) {
  const merged = filters.some((f) => f === 'glass' || f === 'polycarbonate')
    ? [...filters, 'transparent-roofing']
    : filters;
  return merged.join(' ');
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
  const visibleFilterOptions = filterOptions;

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
            <h1 id="projects-index-title">{content.h1}</h1>
            <p>{content.description}</p>
            <div className="projects-index-hero__actions">
              <Link href={rfqHref} className="button-primary">
                {content.primaryCta}
              </Link>
              <CatalogDownloadButton label={content.costReviewCta} componentId="projects_hero" />
            </div>
          </div>
          <div className="projects-index-hero__visual" aria-hidden="true">
            <picture>
              <source media="(max-width: 767px)" srcSet={projectsHeroMobileImg.src} width={projectsHeroMobileImg.width} height={projectsHeroMobileImg.height} />
              <Image src={projectsHeroImg} alt="" fill priority quality={65} sizes="(max-width: 767px) 100vw, 45vw" />
            </picture>
          </div>
        </div>
        <a href="#projects-list" className="projects-index-hero__scroll" aria-label={content.scrollCue}>
          <span className="projects-index-hero__scroll-text">{content.scrollCue}</span>
          <svg className="projects-index-hero__scroll-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </section>

      <section id="projects-list" className="projects-index-section" data-section="projects_case_studies" aria-label={content.allProjects}>
        <div className="container-shell projects-index-section__inner">
          <Suspense fallback={null}>
            <ProjectsFilterActivator />
          </Suspense>
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
                  <article className="projects-index-card" key={project.slug} data-filter={buildFilterString(project.filters)} data-project-slug={project.slug}>
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
                <article className="projects-index-card" key={project.slug} data-filter={buildFilterString(project.filters)} data-project-slug={project.slug}>
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

                  </div>
                </article>
              );
            })}
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
            <CatalogDownloadButton label={content.costReviewCta} componentId="projects_conversion" />
          </div>
        </div>
      </section>
    </article>
  );
}
