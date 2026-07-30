import type {Metadata} from 'next';
import type {StaticImageData} from 'next/image';
import {getLocalizedPath, locales, type Locale} from '@/i18n/routing';
import {buildPageMetadata} from '@/lib/seo/metadata';
import {
  buildArticleSchema,
  buildBreadcrumbListSchema,
  buildOrganizationSchema,
  buildServiceSchema,
  buildWebPageSchema
} from '@/lib/seo/schema';
import armyHospitalHero from '@/assets/projects/army-hospital/photos/army-hospital-hero-desktop.webp';
import shahrBabakHallCard from '@/assets/projects/shahre-babak-hall/photos/shahre-babak-hall-card.webp';
import shahrBabakHallHero from '@/assets/projects/shahre-babak-hall/photos/shahre-babak-hall-hero-desktop.webp';
import bazargolCard from '@/assets/projects/bazargol/photos/bazargol-card.webp';
import bazargolHero from '@/assets/projects/bazargol/photos/bazargol-hero-desktop.webp';
import babakSardarbCard from '@/assets/projects/babak_sardarb/photos/babak_sardarb-card.webp';
import babakSardarbHero from '@/assets/projects/babak_sardarb/photos/babak_sardarb-hero-desktop.webp';
import andimeshkCard from '@/assets/projects/andimeshk/photos/andimeshk-card.webp';
import andimeshkHero from '@/assets/projects/andimeshk/photos/andimeshk-hero-desktop.webp';
import absaarCard from '@/assets/projects/absaar/photos/absaar-card.webp';
import absaarHero from '@/assets/projects/absaar/photos/absaar-hero-desktop.webp';
import megaparsCard from '@/assets/projects/megaparsmall-atrium/photos/megaparsmall-atrium-card.webp';
import megaparsHero from '@/assets/projects/megaparsmall-atrium/photos/megaparsmall-atrium-hero-desktop.webp';
import mahshahrTaxiCard from '@/assets/projects/mahshahr_taxi/photos/mahshahr_taxi-card.webp';
import mahshahrTaxiHero from '@/assets/projects/mahshahr_taxi/photos/mahshahr_taxi-hero-desktop.webp';
import parandCard from '@/assets/projects/parand/photos/parand-card.webp';
import parandHero from '@/assets/projects/parand/photos/parand-hero-desktop.webp';
import tabasCard from '@/assets/projects/tabas/photos/tabas-card.webp';
import tabasHero from '@/assets/projects/tabas/photos/tabas-hero-desktop.webp';
import pompTiranCard from '@/assets/projects/pomp-tiran/photos/pomp-tiran-card.webp';
import pompTiranHero from '@/assets/projects/pomp-tiran/photos/pomp-tiran-hero-desktop.webp';
import ahvazAirportPassengerTerminalCard from '@/assets/projects/ahvaz-airport-passenger-terminal/photos/ahvaz-airport-passenger-terminal-card.webp';
import ahvazAirportPassengerTerminalHero from '@/assets/projects/ahvaz-airport-passenger-terminal/photos/ahvaz-airport-passenger-terminal-hero-desktop.webp';
import atlasHotelShahinshahrAtriumCard from '@/assets/projects/atlas-hotel-shahinshahr-atrium/photos/atlas-hotel-shahinshahr-atrium-card.webp';
import atlasHotelShahinshahrAtriumHero from '@/assets/projects/atlas-hotel-shahinshahr-atrium/photos/atlas-hotel-shahinshahr-atrium-hero-desktop.webp';
import baharestanPrayerHallCard from '@/assets/projects/baharestan-prayer-hall/photos/baharestan-prayer-hall-card.webp';
import baharestanPrayerHallHero from '@/assets/projects/baharestan-prayer-hall/photos/baharestan-prayer-hall-hero-desktop.webp';
import bandarAbbasMallAtriumRoofCard from '@/assets/projects/bandar-abbas-mall-atrium-roof/photos/bandar-abbas-mall-atrium-roof-card.webp';
import bandarAbbasMallAtriumRoofHero from '@/assets/projects/bandar-abbas-mall-atrium-roof/photos/bandar-abbas-mall-atrium-roof-hero-desktop.webp';
import bandarMahshahrBusTerminalCard from '@/assets/projects/bandar-mahshahr-bus-terminal/photos/bandar-mahshahr-bus-terminal-card.webp';
import bandarMahshahrBusTerminalHero from '@/assets/projects/bandar-mahshahr-bus-terminal/photos/bandar-mahshahr-bus-terminal-hero-desktop.webp';
import eftekharCommercialOfficeComplexCard from '@/assets/projects/eftekhar-commercial-office-complex/photos/eftekhar-commercial-office-complex-card.webp';
import eftekharCommercialOfficeComplexHero from '@/assets/projects/eftekhar-commercial-office-complex/photos/eftekhar-commercial-office-complex-hero-desktop.webp';
import enghelabClubPadelCenterCard from '@/assets/projects/enghelab-club-padel-center/photos/enghelab-club-padel-center-card.webp';
import enghelabClubPadelCenterHero from '@/assets/projects/enghelab-club-padel-center/photos/enghelab-club-padel-center-hero-desktop.webp';
import erbilEyeHospitalEntranceCanopyCard from '@/assets/projects/erbil-eye-hospital-entrance-canopy/photos/erbil-eye-hospital-entrance-canopy-card.webp';
import erbilEyeHospitalEntranceCanopyHero from '@/assets/projects/erbil-eye-hospital-entrance-canopy/photos/erbil-eye-hospital-entrance-canopy-hero-desktop.webp';
import fadakMallGlassSkylightCard from '@/assets/projects/fadak-mall-glass-skylight/photos/fadak-mall-glass-skylight-card.webp';
import fadakMallGlassSkylightHero from '@/assets/projects/fadak-mall-glass-skylight/photos/fadak-mall-glass-skylight-hero-desktop.webp';
import gonabadUniversitySportsHallCard from '@/assets/projects/gonabad-university-sports-hall/photos/gonabad-university-sports-hall-card.webp';
import gonabadUniversitySportsHallHero from '@/assets/projects/gonabad-university-sports-hall/photos/gonabad-university-sports-hall-hero-desktop.webp';
import imamKhomeiniAirportHajjTerminalCard from '@/assets/projects/imam-khomeini-airport-hajj-terminal/photos/imam-khomeini-airport-hajj-terminal-card.webp';
import imamKhomeiniAirportHajjTerminalHero from '@/assets/projects/imam-khomeini-airport-hajj-terminal/photos/imam-khomeini-airport-hajj-terminal-hero-desktop.webp';
import kermanshahIndustrialUniversityPetroleumFacultyCard from '@/assets/projects/kermanshah-industrial-university-petroleum-faculty/photos/kermanshah-industrial-university-petroleum-faculty-card.webp';
import kermanshahIndustrialUniversityPetroleumFacultyHero from '@/assets/projects/kermanshah-industrial-university-petroleum-faculty/photos/kermanshah-industrial-university-petroleum-faculty-hero-desktop.webp';
import makuConventionHallCard from '@/assets/projects/maku-convention-hall/photos/maku-convention-hall-card.webp';
import makuConventionHallHero from '@/assets/projects/maku-convention-hall/photos/maku-convention-hall-hero-desktop.webp';
import marunPetrochemicalVisitorTerminalCard from '@/assets/projects/marun-petrochemical-visitor-terminal/photos/marun-petrochemical-visitor-terminal-card.webp';
import marunPetrochemicalVisitorTerminalHero from '@/assets/projects/marun-petrochemical-visitor-terminal/photos/marun-petrochemical-visitor-terminal-hero-desktop.webp';
import mehrabadAircraftHangarCard from '@/assets/projects/mehrabad-aircraft-hangar/photos/mehrabad-aircraft-hangar-card.webp';
import mehrabadAircraftHangarHero from '@/assets/projects/mehrabad-aircraft-hangar/photos/mehrabad-aircraft-hangar-hero-desktop.webp';
import najafabadUniversityAmphitheaterCard from '@/assets/projects/najafabad-university-amphitheater/photos/najafabad-university-amphitheater-card.webp';
import najafabadUniversityAmphitheaterHero from '@/assets/projects/najafabad-university-amphitheater/photos/najafabad-university-amphitheater-hero-desktop.webp';
import payamIndustrialCityCeramicFactoryCard from '@/assets/projects/payam-industrial-city-ceramic-factory/photos/payam-industrial-city-ceramic-factory-card.webp';
import payamIndustrialCityCeramicFactoryHero from '@/assets/projects/payam-industrial-city-ceramic-factory/photos/payam-industrial-city-ceramic-factory-hero-desktop.webp';
import rouzbehCharityComplexZanjanCard from '@/assets/projects/rouzbeh-charity-complex-zanjan/photos/rouzbeh-charity-complex-zanjan-card.webp';
import rouzbehCharityComplexZanjanHero from '@/assets/projects/rouzbeh-charity-complex-zanjan/photos/rouzbeh-charity-complex-zanjan-hero-desktop.webp';
import shahroodAzadUniversitySkylightCard from '@/assets/projects/shahrood-azad-university-skylight/photos/shahrood-azad-university-skylight-card.webp';
import shahroodAzadUniversitySkylightHero from '@/assets/projects/shahrood-azad-university-skylight/photos/shahrood-azad-university-skylight-hero-desktop.webp';
import shalamchehBorderGateCard from '@/assets/projects/shalamcheh-border-gate/photos/shalamcheh-border-gate-card.webp';
import shalamchehBorderGateHero from '@/assets/projects/shalamcheh-border-gate/photos/shalamcheh-border-gate-hero-desktop.webp';
import tarbiatModaresResearchGreenhouseCard from '@/assets/projects/tarbiat-modares-research-greenhouse/photos/tarbiat-modares-research-greenhouse-card.webp';
import tarbiatModaresResearchGreenhouseHero from '@/assets/projects/tarbiat-modares-research-greenhouse/photos/tarbiat-modares-research-greenhouse-hero-desktop.webp';
import tavanirShahrekordCentralAtriumCard from '@/assets/projects/tavanir-shahrekord-central-atrium/photos/tavanir-shahrekord-central-atrium-card.webp';
import tavanirShahrekordCentralAtriumHero from '@/assets/projects/tavanir-shahrekord-central-atrium/photos/tavanir-shahrekord-central-atrium-hero-desktop.webp';
import tehranMallRoofGardenFoodcourtCard from '@/assets/projects/tehran-mall-roof-garden-foodcourt/photos/tehran-mall-roof-garden-foodcourt-card.webp';
import tehranMallRoofGardenFoodcourtHero from '@/assets/projects/tehran-mall-roof-garden-foodcourt/photos/tehran-mall-roof-garden-foodcourt-hero-desktop.webp';
import toranjKishRestaurantCard from '@/assets/projects/toranj-kish-restaurant/photos/toranj-kish-restaurant-card.webp';
import toranjKishRestaurantHero from '@/assets/projects/toranj-kish-restaurant/photos/toranj-kish-restaurant-hero-desktop.webp';

export type CaseStudyProofAsset = {
  title: string;
  description?: string;
  image?: StaticImageData;
  alt?: string;
  assetStatus?: 'available' | 'pending';
  assetType?: 'project_image' | 'shop_drawing' | 'drainage_detail' | 'installation_photo' | 'before_after' | 'BOM_MTO_preview' | 'inspection_photo';
};

export type CaseStudyRelatedService = {
  title: string;
  href: string;
  description?: string;
};

export type CaseStudyRelatedStudy = {
  projectName: string;
  location: string;
  areaM2?: string;
  projectType?: string;
  challenge: string;
  engineeringDecision: string;
  measuredResult: string;
  href?: string;
  image?: StaticImageData;
  assetStatus?: 'available' | 'pending';
};

export type CaseStudyLocaleContent = {
  seo: {
    title: string;
    metaDescription: string;
    h1: string;
  };
  hero: {
    eyebrow: string;
    projectName: string;
    projectType: string;
    location: string;
    mainService: string;
    shortSummary: string;
    primaryCta: string;
    secondaryCta: string;
    trustMicrocopy: string;
    heroAlt: string;
    heroImage?: StaticImageData;
    heroVideo?: {
      src: string;
      poster: string;
      title: string;
    };
  };
  projectSnapshot: {
    title: string;
    pendingLabel: string;
    items: Array<{
      label: string;
      value: string;
      pending?: boolean;
    }>;
  };
  challenge: {
    title: string;
    summary: string;
    points: string[];
    risk: string;
  };
  engineeringDecision: {
    title: string;
    summary: string;
    technicalReasoning: string;
    selectedSystemLogic: string;
    coordinationNote: string;
  };
  executionDetail: {
    title: string;
    installationSequence: string;
    procurementControl: string;
    qualityCheckpoints: string[];
    coordinationWithSiteTeam: string;
  };
  technicalProofGallery: {
    title: string;
    pendingLabel: string;
    openLabel: string;
    zoomInLabel: string;
    zoomOutLabel: string;
    closeLabel: string;
    items: CaseStudyProofAsset[];
  };
  measuredResult: {
    title: string;
    pendingLabel: string;
    items: Array<{
      label: string;
      value: string;
      verificationStatus?: 'verified' | 'pending';
    }>;
  };
  riskPrevented: {
    title: string;
    items: Array<{
      risk: string;
      explanation: string;
    }>;
  };
  relatedServices: {
    title: string;
    links: CaseStudyRelatedService[];
  };
  relatedCaseStudies: {
    title: string;
    cta: string;
    items: CaseStudyRelatedStudy[];
    pendingLabel: string;
  };
  conversionCta: {
    headline: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export type CaseStudyPageData = {
  slug: string;
  routes: Record<Locale, string>;
  detailLayout?: 'full' | 'case-study-only';
  localeContent: Record<Locale, CaseStudyLocaleContent>;
};

export type CaseStudyPageMetadata = Metadata;

type LocalizedText = Record<Locale, string>;

type InitialCaseStudyConfig = {
  slug: string;
  detailLayout?: 'full' | 'case-study-only';
  projectName: LocalizedText;
  projectType: LocalizedText;
  mainService: LocalizedText;
  serviceHref: string;
  location?: string;
  area?: string;
  challenge?: string;
  sipanelSolution?: string;
  engineeringDecision?: string;
  executionDetail?: string;
  measuredResult?: string;
  riskPrevented?: string[];
  cardImage?: StaticImageData;
  heroImage?: StaticImageData;
  heroVideo?: {
    src: string;
    poster: string;
    title: LocalizedText;
  };
  secondaryService?: {
    title: LocalizedText;
    href: string;
    description: LocalizedText;
  };
  resourceTitle: LocalizedText;
  relatedSlugs?: string[];
  localeOverrides?: Partial<Record<Locale, CaseStudyLocaleOverrides>>;
};

type CaseStudyLocaleOverrides = {
  seoTitle?: string;
  metaDescription?: string;
  shortSummary?: string;
  trustMicrocopy?: string;
  primaryCta?: string;
  snapshotDuration?: string;
  challenge?: string;
  challengePoints?: string[];
  sipanelSolution?: string;
  engineeringDecision?: string;
  selectedSystemLogic?: string;
  coordinationNote?: string;
  executionDetail?: string;
  procurementControl?: string;
  coordinationWithSiteTeam?: string;
  qualityCheckpoints?: string[];
  measuredResult?: string;
  measuredResultItems?: Array<{label: string; value: string; verificationStatus?: 'verified' | 'pending'}>;
  riskItems?: Array<{risk: string; explanation: string}>;
  conversionHeadline?: string;
  conversionText?: string;
  conversionPrimaryCta?: string;
};

const pendingLabels: LocalizedText = {
  en: 'Pending verified project data',
  fa: 'در انتظار داده تاییدشده پروژه',
  ar: 'بانتظار بيانات مشروع موثقة',
  ru: 'Ожидаются подтвержденные данные проекта'
};

function localized(value: string): LocalizedText {
  return {en: value, fa: value, ar: value, ru: value};
}

const localizedLocations: Record<string, LocalizedText> = {
  'Raz & Jargalan, North Khorasan, Iran': {
    en: 'Raz & Jargalan, North Khorasan, Iran',
    fa: 'راز و جرگلان، خراسان شمالی، ایران',
    ar: 'راز وجرغلان، خراسان الشمالية، إيران',
    ru: 'Раз и Джаргалан, Северный Хорасан, Иран'
  },
  'Bandar Mahshahr, Khuzestan, Iran': {
    en: 'Bandar Mahshahr, Khuzestan, Iran',
    fa: 'بندر ماهشهر، خوزستان، ایران',
    ar: 'بندر ماهشهر، خوزستان، إيران',
    ru: 'Бендер-Махшехр, Хузестан, Иран'
  },
  'Tehran, Iran': {
    en: 'Tehran, Iran',
    fa: 'تهران، ایران',
    ar: 'طهران، إيران',
    ru: 'Тегеран, Иран'
  },
  'Ahvaz, Iran': {
    en: 'Ahvaz, Iran',
    fa: 'اهواز، ایران',
    ar: 'الأهواز، إيران',
    ru: 'Ахваз, Иран'
  },
  'Kermanshah, Iran': {
    en: 'Kermanshah, Iran',
    fa: 'کرمانشاه، ایران',
    ar: 'كرمانشاه، إيران',
    ru: 'Керманшах, Иран'
  },
  'Iran': {
    en: 'Iran',
    fa: 'ایران',
    ar: 'إيران',
    ru: 'Иран'
  },
  'Khuzestan, Iran': {
    en: 'Khuzestan, Iran',
    fa: 'خوزستان، ایران',
    ar: 'خوزستان، إيران',
    ru: 'Хузестан, Иран'
  },
  'Isfahan, Iran': {
    en: 'Isfahan, Iran',
    fa: 'اصفهان، ایران',
    ar: 'أصفهان، إيران',
    ru: 'Исфахан, Иран'
  }
};

const localizedProjectNames: Partial<Record<string, LocalizedText>> = {
  'army-hospital': {
    en: '32-Bed Military Hospital',
    fa: 'بیمارستان ۳۲ تختخوابی ارتش',
    ar: 'مستشفى عسكري بسعة 32 سريرا',
    ru: 'Военный госпиталь на 32 койки'
  },
  'shahre-babak-hall': {
    en: 'Shahr Babak Wrestling Hall',
    fa: 'سالن کشتی شهربابک',
    ar: 'قاعة المصارعة في شهر بابك',
    ru: 'Зал борьбы в Шахр-Бабеке'
  },
  'sepehan-flower-market': {
    en: 'Sepehan Flower Market',
    fa: 'بازار گل سپاهان',
    ar: 'سوق زهور سباهان',
    ru: 'Цветочный рынок Сепахан'
  },
  'shahr-babak-stadium-entrance': {
    en: 'Shahr Babak Stadium Entrance',
    fa: 'ورودی ورزشگاه شهربابک',
    ar: 'مدخل استاد شهر بابك',
    ru: 'Вход стадиона Шахр-Бабек'
  },
  'andimeshk-stadium': {
    en: 'Andimeshk Stadium',
    fa: 'ورزشگاه اندیمشک',
    ar: 'استاد أنديمشك',
    ru: 'Стадион Анди-мешк'
  },
  'absaar-water-park': {
    en: 'Absaar Water Park',
    fa: 'پارک آبی آبسار',
    ar: 'الحديقة المائية أبصار',
    ru: 'Аквапарк Абсар'
  },
  'megaparsmall-atrium': {
    en: 'Megapars Mall Atrium',
    fa: 'آتریوم مگاپارس مال',
    ar: 'أتريوم ميغابارس مول',
    ru: 'Атриум Megapars Mall'
  },
  'mahshahr-taxi-parking': {
    en: 'Mahshahr Taxi Parking Facility',
    fa: 'پارکینگ تاکسیرانی ماهشهر',
    ar: 'مرفق مواقف سيارات الأجرة في ماهشهر',
    ru: 'Парковка такси в Махшехре'
  },
  'parand-city-entrance': {
    en: 'Parand City Entrance Gate',
    fa: 'دروازه ورودی شهر پرند',
    ar: 'بوابة مدخل مدينة پرند',
    ru: 'Въездные ворота города Паранд'
  },
  'tabas-railway-facility': {
    en: 'Tabas Railway Facility',
    fa: 'تأسیسات راه‌آهن طبس',
    ar: 'منشأة سكة حديد طبس',
    ru: 'Железнодорожный объект в Табасе'
  },
  'tiran-gas-station': {
    en: 'Tiran Gas Station',
    fa: 'جایگاه سوخت تیران',
    ar: 'محطة وقود تيران',
    ru: 'АЗС Тиран'
  },
  'ahvaz-airport-passenger-terminal': {
    en: 'Ahvaz Airport Passenger Terminal',
    fa: 'ترمینال مسافری فرودگاه اهواز',
    ar: 'محطة الركاب في مطار الأهواز',
    ru: 'Пассажирский терминал аэропорта Ахваз'
  },
  'atlas-hotel-shahinshahr-atrium': {
    en: 'Atlas Hotel Shahinshahr Atrium',
    fa: 'آتریوم هتل اطلس شاهین‌شهر',
    ar: 'أتريوم فندق أطلس شاهين شهر',
    ru: 'Атриум отеля Atlas в Шахиншахре'
  },
  'baharestan-prayer-hall': {
    en: 'Baharestan Prayer Hall',
    fa: 'سالن نماز بهارستان',
    ar: 'قاعة صلاة بهارستان',
    ru: 'Молитвенный зал Бахарестан'
  },
  'bandar-abbas-mall-atrium-roof': {
    en: 'Bandar Abbas Mall Atrium Roof',
    fa: 'سقف آتریوم مرکز خرید بندرعباس',
    ar: 'سقف أتريوم مركز بندر عباس التجاري',
    ru: 'Кровля атриума торгового центра Бендер-Аббас'
  },
  'bandar-mahshahr-bus-terminal': {
    en: 'Bandar Mahshahr Bus Terminal',
    fa: 'پایانه اتوبوس بندر ماهشهر',
    ar: 'محطة حافلات بندر ماهشهر',
    ru: 'Автобусный терминал Бендер-Махшехр'
  },
  'eftekhar-commercial-office-complex': {
    en: 'Eftekhar Commercial Office Complex',
    fa: 'مجتمع تجاری اداری افتخار',
    ar: 'مجمع افتخار التجاري والإداري',
    ru: 'Торгово-офисный комплекс Эфтехар'
  },
  'enghelab-club-padel-center': {
    en: 'Enghelab Club Padel Center',
    fa: 'مرکز پدل باشگاه انقلاب',
    ar: 'مركز البادل في نادي انقلاب',
    ru: 'Падел-центр клуба Энгелаб'
  },
  'erbil-eye-hospital-entrance-canopy': {
    en: 'Erbil Eye Hospital Entrance Canopy',
    fa: 'سایبان ورودی بیمارستان چشم اربیل',
    ar: 'مظلة مدخل مستشفى العيون في أربيل',
    ru: 'Навес входа глазной больницы Эрбиля'
  },
  'fadak-mall-glass-skylight': {
    en: 'Fadak Mall Glass Skylight',
    fa: 'نورگیر شیشه‌ای مرکز خرید فدک',
    ar: 'سكاي لايت زجاجي في فدك مول',
    ru: 'Стеклянный фонарь Fadak Mall'
  },
  'gonabad-university-sports-hall': {
    en: 'Gonabad University Sports Hall',
    fa: 'سالن ورزشی دانشگاه گناباد',
    ar: 'الصالة الرياضية في جامعة گناباد',
    ru: 'Спортивный зал университета Гонабад'
  },
  'imam-khomeini-airport-hajj-terminal': {
    en: 'Imam Khomeini Airport Hajj Terminal',
    fa: 'ترمینال حج فرودگاه امام خمینی',
    ar: 'محطة الحج في مطار الإمام الخميني',
    ru: 'Терминал хаджа аэропорта Имам Хомейни'
  },
  'kermanshah-industrial-university-petroleum-faculty': {
    en: 'Kermanshah Industrial University Petroleum Faculty',
    fa: 'دانشکده نفت دانشگاه صنعتی کرمانشاه',
    ar: 'كلية النفط في جامعة كرمانشاه الصناعية',
    ru: 'Нефтяной факультет Керманшахского индустриального университета'
  },
  'maku-convention-hall': {
    en: 'Maku Convention Hall',
    fa: 'سالن همایش ماکو',
    ar: 'قاعة مؤتمرات ماكو',
    ru: 'Конференц-зал Маку'
  },
  'marun-petrochemical-visitor-terminal': {
    en: 'Marun Petrochemical Visitor Terminal',
    fa: 'ترمینال بازدیدکنندگان پتروشیمی مارون',
    ar: 'محطة زوار پتروشيمي مارون',
    ru: 'Терминал посетителей Marun Petrochemical'
  },
  'mehrabad-aircraft-hangar': {
    en: 'Mehrabad Aircraft Hangar',
    fa: 'آشیانه هواپیما مهرآباد',
    ar: 'حظيرة الطائرات في مهرآباد',
    ru: 'Авиационный ангар Мехрабад'
  },
  'najafabad-university-amphitheater': {
    en: 'Najafabad University Amphitheater',
    fa: 'آمفی‌تئاتر دانشگاه نجف‌آباد',
    ar: 'مدرج جامعة نجف آباد',
    ru: 'Амфитеатр университета Наджафабад'
  },
  'payam-industrial-city-ceramic-factory': {
    en: 'Payam Industrial City Ceramic Factory',
    fa: 'کارخانه سرامیک شهرک صنعتی پیام',
    ar: 'مصنع السيراميك في مدينة پيام الصناعية',
    ru: 'Керамический завод в промышленном городе Паям'
  },
  'rouzbeh-charity-complex-zanjan': {
    en: 'Rouzbeh Charity Complex Zanjan',
    fa: 'مجتمع خیریه روزبه زنجان',
    ar: 'مجمع روزبه الخيري في زنجان',
    ru: 'Благотворительный комплекс Рузбех в Зенджане'
  },
  'shahrood-azad-university-skylight': {
    en: 'Shahrood Azad University Skylight',
    fa: 'نورگیر دانشگاه آزاد شاهرود',
    ar: 'سكاي لايت جامعة آزاد شاهرود',
    ru: 'Световой фонарь университета Азад Шахруд'
  },
  'shalamcheh-border-gate': {
    en: 'Shalamcheh Border Gate',
    fa: 'دروازه مرزی شلمچه',
    ar: 'بوابة حدود شلمجة',
    ru: 'Пограничные ворота Шаламче'
  },
  'tarbiat-modares-research-greenhouse': {
    en: 'Tarbiat Modares Research Greenhouse',
    fa: 'گلخانه پژوهشی تربیت مدرس',
    ar: 'الدفيئة البحثية في جامعة تربيت مدرس',
    ru: 'Исследовательская теплица Tarbiat Modares'
  },
  'tavanir-shahrekord-central-atrium': {
    en: 'Tavanir Shahrekord Central Atrium',
    fa: 'آتریوم مرکزی توانیر شهرکرد',
    ar: 'الأتريوم المركزي لتوانير شهرکرد',
    ru: 'Центральный атриум Tavanir в Шахрекорде'
  },
  'tehran-mall-roof-garden-foodcourt': {
    en: 'Tehran Mall Roof Garden Foodcourt',
    fa: 'فودکورت روف‌گاردن تهران مال',
    ar: 'فودكورت حديقة السطح في تهران مول',
    ru: 'Фудкорт roof garden в Tehran Mall'
  },
  'toranj-kish-restaurant': {
    en: 'Toranj Kish Restaurant',
    fa: 'رستوران ترنج کیش',
    ar: 'مطعم ترنج كيش',
    ru: 'Ресторан Toranj Kish'
  }
};

function getProjectName(config: InitialCaseStudyConfig, locale: Locale) {
  return localizedProjectNames[config.slug]?.[locale] ?? config.projectName[locale];
}

function getLocaleOverrides(config: InitialCaseStudyConfig, locale: Locale): CaseStudyLocaleOverrides {
  return {
    ...caseStudyLocaleOverrides[config.slug]?.[locale],
    ...config.localeOverrides?.[locale]
  };
}

function localizeLocation(location: string | undefined, locale: Locale, pendingLabel: string) {
  if (!location) return pendingLabel;
  return localizedLocations[location]?.[locale] ?? (locale === 'en' ? location : location.replace(/, Iran$/i, locale === 'ru' ? ', Иран' : locale === 'ar' ? '، إيران' : '، ایران'));
}

function defaultShortSummary(config: InitialCaseStudyConfig, locale: Locale, projectName: string, serviceTitle: string) {
  if (locale === 'en') {
    return `${projectName} case study for ${serviceTitle}, focused on engineering coordination, controlled execution, and project risk reduction.`;
  }

  return {
    fa: `مطالعه موردی ${projectName} برای ${serviceTitle}؛ با تمرکز بر هماهنگی مهندسی، کنترل اجرا و کاهش ریسک‌های پروژه.`,
    ar: `دراسة حالة ${projectName} ضمن ${serviceTitle}، مع تركيز على التنسيق الهندسي وضبط التنفيذ وتقليل مخاطر المشروع.`,
    ru: `Кейс ${projectName} для направления ${serviceTitle}: инженерная координация, контролируемое выполнение и снижение проектных рисков.`
  }[locale];
}

function defaultChallenge(config: InitialCaseStudyConfig, locale: Locale, serviceTitle: string, projectType: string) {
  if (locale === 'en') return config.challenge ?? caseStudyCopy.en.challengeSummary(serviceTitle);

  return {
    fa: `این پروژه ${projectType} به هماهنگی دقیق ${serviceTitle}، کنترل جزئیات اتصال و برنامه‌ریزی اجرای کارگاهی نیاز داشت تا ریسک‌های پوسته، زهکشی و کیفیت نصب مدیریت شود.`,
    ar: `احتاج مشروع ${projectType} إلى تنسيق دقيق في ${serviceTitle} وضبط تفاصيل الوصلات وتخطيط التنفيذ في الموقع لإدارة مخاطر الغلاف والتصريف وجودة التركيب.`,
    ru: `Для проекта типа ${projectType} требовалась точная координация ${serviceTitle}, контроль узлов примыкания и планирование монтажа, чтобы управлять рисками ограждающей системы, водоотвода и качества работ.`
  }[locale];
}

function defaultChallengePoints(config: InitialCaseStudyConfig, locale: Locale) {
  if (locale === 'en') return config.riskPrevented ?? caseStudyCopy.en.challengePoints;

  return {
    fa: [
      'هماهنگی چیدمان و دیتیل‌های اتصال پیش از شروع اجرا',
      'کنترل مسیر زهکشی و پیوستگی آب‌بندی در نقاط حساس',
      'هماهنگی تأمین متریال با توالی نصب و محدودیت‌های کارگاه',
      'بازرسی مرحله‌ای کیفیت نصب برای کاهش ریسک اصلاحات بعدی'
    ],
    ar: [
      'تنسيق تخطيط النظام وتفاصيل الوصلات قبل بدء التنفيذ',
      'ضبط مسار التصريف واستمرارية العزل المائي في النقاط الحساسة',
      'مواءمة توريد المواد مع تسلسل التركيب وقيود الموقع',
      'فحص مرحلي لجودة التركيب للحد من مخاطر المعالجة اللاحقة'
    ],
    ru: [
      'Координация раскладки системы и узлов примыкания до начала работ',
      'Контроль водоотвода и непрерывности гидроизоляции в критичных местах',
      'Согласование поставки материалов с последовательностью монтажа и условиями площадки',
      'Поэтапная проверка качества монтажа для снижения риска переделок'
    ]
  }[locale];
}

function defaultSolution(config: InitialCaseStudyConfig, locale: Locale, serviceTitle: string) {
  if (locale === 'en') return config.sipanelSolution ?? caseStudyCopy.en.decisionSummary(serviceTitle);

  return {
    fa: `سی‌پانل راهکار ${serviceTitle} را بر اساس نقشه‌های اجرایی، هماهنگی زیرسازی، کنترل آب‌بندی و توالی نصب قابل اجرا تنظیم کرد.`,
    ar: `نظمت SIPANEL حل ${serviceTitle} بالاعتماد على رسومات التنفيذ وتنسيق البنية الحاملة وضبط العزل المائي وتسلسل تركيب قابل للتنفيذ.`,
    ru: `SIPANEL подготовила решение ${serviceTitle} на основе рабочих чертежей, координации подсистемы, контроля гидроизоляции и реализуемой последовательности монтажа.`
  }[locale];
}

function defaultEngineeringDecision(config: InitialCaseStudyConfig, locale: Locale, serviceTitle: string) {
  if (locale === 'en') return config.engineeringDecision ?? caseStudyCopy.en.technicalReasoning;

  return {
    fa: `تصمیم مهندسی بر کنترل هندسه، دیتیل اتصال، مسیر زهکشی و هماهنگی نصب ${serviceTitle} متمرکز شد تا عملکرد پوسته و کیفیت نهایی حفظ شود.`,
    ar: `ركز القرار الهندسي على ضبط الهندسة وتفاصيل الوصلات ومسار التصريف وتنسيق تركيب ${serviceTitle} للحفاظ على أداء الغلاف وجودة التشطيب.`,
    ru: `Инженерное решение было сосредоточено на геометрии, узлах примыкания, водоотводе и координации монтажа ${serviceTitle}, чтобы сохранить работу оболочки и итоговое качество.`
  }[locale];
}

function defaultExecution(config: InitialCaseStudyConfig, locale: Locale) {
  if (locale === 'en') return config.executionDetail ?? caseStudyCopy.en.installationSequence;

  return {
    fa: 'اجرا بر پایه نقشه‌های هماهنگ‌شده، کنترل تراز و اتصالات، تأیید متریال و بازرسی آب‌بندی در مراحل اصلی انجام شد.',
    ar: 'تم التنفيذ وفق رسومات منسقة مع ضبط المحاذاة والوصلات واعتماد المواد وفحص العزل المائي في المراحل الرئيسية.',
    ru: 'Работы выполнялись по согласованным чертежам с контролем выравнивания и креплений, подтверждением материалов и проверкой гидроизоляции на ключевых этапах.'
  }[locale];
}

function defaultMeasuredResult(config: InitialCaseStudyConfig, locale: Locale, serviceTitle: string, area: string | undefined, projectType: string) {
  if (locale === 'en') return config.measuredResult ?? pendingLabels.en;

  const areaPart = area ? {
    fa: ` با مساحت ${area}`,
    ar: ` بمساحة ${area}`,
    ru: ` площадью ${area}`
  }[locale] : '';

  return {
    fa: `اجرای ${projectType}${areaPart} با تمرکز بر عملکرد ${serviceTitle}، کنترل نصب و کاهش ریسک‌های اجرایی تکمیل شد.`,
    ar: `اكتمل تنفيذ ${projectType}${areaPart} مع التركيز على أداء ${serviceTitle} وضبط التركيب وتقليل مخاطر التنفيذ.`,
    ru: `Выполнение проекта ${projectType}${areaPart} завершено с акцентом на работу ${serviceTitle}, контроль монтажа и снижение исполнительных рисков.`
  }[locale];
}

function defaultSelectedSystemLogic(locale: Locale, serviceTitle: string) {
  return {
    en: caseStudyCopy.en.selectedSystemLogic(serviceTitle),
    fa: `این سیستم به دلیل سازگاری با محدوده پروژه، سرعت اجرا، کنترل دیتیل‌های پوسته و امکان هماهنگی با نقشه‌های کارگاهی انتخاب شد.`,
    ar: `اختير هذا النظام لملاءمته لنطاق المشروع وسرعة تنفيذه وإمكانية ضبط تفاصيل الغلاف وتنسيقه مع رسومات الورشة.`,
    ru: `Система выбрана из-за соответствия объему проекта, скорости выполнения, контроля деталей оболочки и возможности согласования с рабочими чертежами.`
  }[locale];
}

function defaultCoordinationNote(locale: Locale) {
  return {
    en: caseStudyCopy.en.coordinationNote,
    fa: 'هماهنگی میان نقشه، تأمین و نصب پیش از اجرای نقاط حساس انجام شد تا مرز مسئولیت‌ها و توالی کارگاه روشن بماند.',
    ar: 'تم التنسيق بين الرسومات والتوريد والتركيب قبل تنفيذ النقاط الحساسة حتى تبقى حدود المسؤولية وتسلسل الموقع واضحة.',
    ru: 'Координация чертежей, поставки и монтажа выполнялась до работ на критичных участках, чтобы зоны ответственности и последовательность площадки оставались ясными.'
  }[locale];
}

function defaultRiskItems(config: InitialCaseStudyConfig, locale: Locale) {
  if (locale === 'en' && config.riskPrevented) {
    return config.riskPrevented.slice(0, 4).map((risk) => ({
      risk,
      explanation: `${risk} was controlled through engineering review, coordinated detailing, and installation checkpoints.`
    }));
  }

  if (locale === 'en') {
    return [
      caseStudyCopy.en.riskItems.layout,
      caseStudyCopy.en.riskItems.waterproofing,
      caseStudyCopy.en.riskItems.procurement
    ];
  }

  return {
    fa: [
      {risk: 'ریسک خطای چیدمان و دیتیل', explanation: 'با بازبینی مهندسی نقشه‌ها و کنترل نقاط اتصال پیش از نصب کاهش یافت.'},
      {risk: 'ریسک نشت و ناپیوستگی آب‌بندی', explanation: 'با هماهنگی مسیر زهکشی، فلاشینگ‌ها و بازرسی مرحله‌ای کنترل شد.'},
      {risk: 'ریسک ناهماهنگی تأمین و نصب', explanation: 'با تطبیق متریال و اکسسوری‌ها با توالی اجرای کارگاه مدیریت شد.'}
    ],
    ar: [
      {risk: 'مخاطر أخطاء التخطيط والتفاصيل', explanation: 'تم تقليلها عبر مراجعة هندسية للرسومات وضبط نقاط الوصل قبل التركيب.'},
      {risk: 'مخاطر التسرب وانقطاع العزل المائي', explanation: 'تم ضبطها من خلال تنسيق مسار التصريف والفلاشينغ والفحص المرحلي.'},
      {risk: 'مخاطر عدم توافق التوريد والتركيب', explanation: 'أديرت عبر مطابقة المواد والملحقات مع تسلسل التنفيذ في الموقع.'}
    ],
    ru: [
      {risk: 'Риск ошибок раскладки и деталировки', explanation: 'Снижен за счет инженерной проверки чертежей и контроля узлов до монтажа.'},
      {risk: 'Риск протечек и разрывов гидроизоляции', explanation: 'Контролировался через согласование водоотвода, примыканий и поэтапные проверки.'},
      {risk: 'Риск несогласованности поставки и монтажа', explanation: 'Управлялся через увязку материалов и аксессуаров с последовательностью работ на площадке.'}
    ]
  }[locale];
}

const sandwichPanelService: LocalizedText = {
  en: 'Sandwich Panel Systems',
  fa: 'سیستم‌های ساندویچ پانل',
  ar: 'أنظمة ألواح الساندويتش',
  ru: 'Системы сэндвич-панелей'
};

const zipRoofingService: LocalizedText = {
  en: 'Standing Seam and ZIP Tech Roofing',
  fa: 'سقف زیپ تک و استندینگ سیم',
  ar: 'تسقيف ستاندينغ سيم و ZIP Tech',
  ru: 'Кровля Standing Seam и ZIP Tech'
};

const claddingService: LocalizedText = {
  en: 'Aluminium Cladding and Covering',
  fa: 'پوشش و نمای آلومینیومی',
  ar: 'الكسوة والتغطية بالألمنيوم',
  ru: 'Алюминиевая облицовка и покрытия'
};

const caseStudyLocaleOverrides: Partial<Record<string, Partial<Record<Locale, CaseStudyLocaleOverrides>>>> = {
  'army-hospital': {
    ar: {
      challenge: 'خلال حالة الطوارئ المرتبطة بكوفيد-19، كان المطلوب إنشاء مستشفى عسكري بسعة ٣٢ سريراً من مرحلة الحفر حتى الجاهزية التشغيلية خلال أقل من ٥٠ يوماً، مع تنسيق كامل بين الهندسة والتوريد والتنفيذ.',
      challengePoints: [
        'خطر تجاوز الجدول الزمني المحدد بأقل من ٥٠ يوماً',
        'الحاجة إلى تنسيق يومي بين الأعمال المدنية والغلاف والقواطع الداخلية',
        'تسريع حماية الغلاف من العوامل الجوية قبل اكتمال باقي البنود',
        'منع اختناقات تركيب القواطع الداخلية ضمن برنامج مضغوط'
      ],
      sipanelSolution: 'قدمت SIPANEL نطاق المشروع كاملاً، بما في ذلك الهندسة ورسومات الورشة والحفر والإنشاء وغلاف ألواح الساندويتش والقواطع الداخلية وتجهيز المشروع للجاهزية النهائية.',
      engineeringDecision: 'تم تنظيم تسليم EPC كامل بحيث تسير أعمال الحفر والإنشاء والغلاف والقواطع الداخلية ضمن تسلسل واحد قابل للتحكم، بدلاً من فصل المسؤوليات بين أطراف متعددة في ظرف زمني حرج.',
      selectedSystemLogic: 'اختيرت ألواح الساندويتش لأنها تدعم سرعة تركيب عالية، وغلافاً خفيفاً، وتنسيقاً واضحاً بين السقف والجدران والقواطع الداخلية في مشروع صحي عاجل.',
      coordinationNote: 'كان التنسيق اليومي بين التصميم والتوريد والموقع ضرورياً للحفاظ على الجاهزية التشغيلية دون نشر ادعاءات غير موثقة خارج نطاق المشروع المعروف.',
      executionDetail: 'اتبع التنفيذ برنامجاً مضغوطاً شمل الحفر والإنشاء وتركيب غلاف ألواح الساندويتش والقواطع الداخلية وصولاً إلى الجاهزية التشغيلية خلال أقل من ٥٠ يوماً.',
      procurementControl: 'تمت مواءمة توريد الألواح والملحقات والقواطع مع تسلسل التنفيذ حتى لا يتحول التوريد إلى عامل تأخير في المشروع.',
      coordinationWithSiteTeam: 'جرى تنسيق أعمال الغلاف والقواطع مع فرق الأعمال المدنية والموقع لضبط التسلسل وتقليل التعارضات.',
      qualityCheckpoints: ['اعتماد نطاق EPC قبل التنفيذ', 'متابعة جاهزية مواد الغلاف والقواطع', 'فحص مراحل التركيب قبل الجاهزية النهائية'],
      measuredResult: 'تم تسليم مستشفى عسكري جاهز بسعة ٣٢ سريراً من الحفر حتى الجاهزية في أقل من ٥٠ يوماً خلال حالة الطوارئ الصحية.',
      riskItems: [
        {risk: 'تجاوز مدة الخمسين يوماً', explanation: 'تم ضبطه من خلال برنامج مضغوط وتنسيق يومي بين الهندسة والتوريد والتنفيذ.'},
        {risk: 'فشل التنسيق بين تخصصات EPC', explanation: 'ساعدت إدارة النطاق المتكامل من الحفر حتى التسليم على تقليل فجوات المسؤولية.'},
        {risk: 'تأخر حماية الغلاف من الطقس', explanation: 'تم ترتيب تركيب السقف والجدران بألواح الساندويتش ضمن تسلسل زمني واضح.'},
        {risk: 'اختناق تركيب القواطع الداخلية', explanation: 'تمت مواءمة القواطع الداخلية مع الأعمال المدنية وبقية فرق الموقع.'}
      ]
    },
    ru: {
      challenge: 'Во время чрезвычайной ситуации COVID-19 требовалось подготовить военный госпиталь на 32 койки от земляных работ до эксплуатационной готовности менее чем за 50 дней, с полной координацией EPC.',
      challengePoints: [
        'Риск выхода за целевой срок менее 50 дней',
        'Необходимость ежедневной координации гражданских работ, ограждающей оболочки и внутренних перегородок',
        'Ускоренная защита здания от погоды до завершения смежных работ',
        'Предотвращение узких мест при монтаже внутренних перегородок'
      ],
      sipanelSolution: 'SIPANEL выполнила полный объем проекта: инженерная подготовка, рабочие чертежи, земляные работы, строительство, оболочка из сэндвич-панелей, внутренние перегородки и подготовка к итоговой готовности.',
      engineeringDecision: 'Команда организовала полный EPC-процесс так, чтобы земляные работы, строительство, оболочка и внутренние перегородки двигались в единой управляемой последовательности.',
      selectedSystemLogic: 'Сэндвич-панели были уместны из-за высокой скорости монтажа, малого веса оболочки и понятной координации кровли, стен и перегородок в срочном медицинском объекте.',
      coordinationNote: 'Ежедневная координация проектирования, поставки и площадки была критична для сохранения эксплуатационной готовности в подтвержденном объеме работ.',
      executionDetail: 'Работы велись по сжатому графику: земляные работы, строительство, монтаж сэндвич-панельной оболочки, внутренние перегородки и доведение объекта до готовности менее чем за 50 дней.',
      procurementControl: 'Поставка панелей, аксессуаров и перегородок была увязана с монтажной последовательностью, чтобы снабжение не стало причиной задержки.',
      coordinationWithSiteTeam: 'Работы по оболочке и перегородкам координировались с гражданскими и площадочными командами для снижения конфликтов.',
      qualityCheckpoints: ['Подтверждение EPC-объема до выполнения', 'Контроль готовности материалов оболочки и перегородок', 'Проверка этапов монтажа перед итоговой готовностью'],
      measuredResult: 'Военный госпиталь на 32 койки был доведен от земляных работ до готовности менее чем за 50 дней в условиях медицинской чрезвычайной ситуации.',
      riskItems: [
        {risk: 'Выход за срок 50 дней', explanation: 'Контролировался сжатым графиком и ежедневной координацией инженерии, поставки и выполнения.'},
        {risk: 'Сбой координации EPC-дисциплин', explanation: 'Интегрированное управление объемом от земляных работ до сдачи снизило разрывы ответственности.'},
        {risk: 'Задержка погодной защиты оболочки', explanation: 'Монтаж кровли и стен из сэндвич-панелей был встроен в четкую последовательность.'},
        {risk: 'Узкое место внутренних перегородок', explanation: 'Монтаж перегородок был согласован с гражданскими и другими площадочными работами.'}
      ]
    }
  },
  'mahshahr-taxi-parking': {
    en: {
      metaDescription: 'Mahshahr Taxi Parking Facility case study: 4,000 m² sandwich panel roofing with coordinated drainage, waterproofing continuity, and coastal exposure risk control.',
      shortSummary: 'A 4,000 m² transport parking roof in Bandar Mahshahr where sandwich panel layout, drainage paths, gutters, and sealing details had to work together under coastal exposure.',
      trustMicrocopy: 'Verified scope: sandwich panel roofing, drainage coordination, gutters, flashings, downspouts, and installation checkpoints.',
      challenge: 'The parking facility needed a durable sandwich panel roof for a high-use transport environment in Bandar Mahshahr. The useful engineering challenge was not only panel supply; it was keeping rainwater movement predictable through slopes, gutters, flashings, downspouts, and sealed transitions in a coastal climate.',
      challengePoints: ['Coastal exposure and corrosion-aware detailing', 'Continuous drainage path from roof surface to downspouts', 'Waterproofing continuity at flashings and panel laps', 'Controlled installation sequencing for a 4,000 m² roof'],
      sipanelSolution: 'SIPANEL coordinated the sandwich panel roof as a complete drainage and weather-protection assembly, aligning panel layout, gutter positions, downspouts, flashings, fastening, and sealing checkpoints.',
      engineeringDecision: 'The engineering decision was to treat drainage as part of the roof system instead of a later accessory. Slopes, water-flow paths, gutter locations, and panel alignment were coordinated before installation.',
      selectedSystemLogic: 'Sandwich panel roofing was selected because it combines fast enclosure, lightweight insulated covering, and controlled lap/seal detailing suitable for a transport parking facility.',
      coordinationNote: 'Roof panel layout, gutters, flashing lines, and downspout positions needed to be coordinated with the supporting structure before site installation.',
      executionDetail: 'Execution followed an ordered sequence: confirm roof references, install panels with alignment checks, set gutters and flashings, coordinate downspouts, then verify fastening and sealing at water-sensitive interfaces.',
      procurementControl: 'Panels, flashings, gutters, sealants, fasteners, and downspout accessories were controlled as one accessory package matched to the approved roof layout.',
      coordinationWithSiteTeam: 'The site sequence kept water-management components aligned with panel installation so drainage details were not left for late-stage correction.',
      qualityCheckpoints: ['Panel alignment and lap verification', 'Gutter slope and downspout continuity review', 'Flashing and sealant inspection at edges and transitions'],
      measuredResult: 'A 4,000 m² sandwich panel roofing system was delivered with coordinated rainwater management and controlled weather-protection detailing.',
      riskItems: [
        {risk: 'Water accumulation', explanation: 'Slope, gutter, and downspout coordination reduced the chance of standing water on the roof.'},
        {risk: 'Roof leakage', explanation: 'Panel laps, flashings, and sealant points were treated as inspection checkpoints.'},
        {risk: 'Coastal durability risk', explanation: 'Accessory coordination and sealing details were selected with Bandar Mahshahr exposure in mind.'},
        {risk: 'Improper drainage flow', explanation: 'Water paths were reviewed before installation instead of being adjusted only on site.'}
      ]
    },
    fa: {
      metaDescription: 'مطالعه موردی پارکینگ تاکسی ماهشهر: اجرای ۴٬۰۰۰ مترمربع سقف ساندویچ‌پانل با هماهنگی زهکشی، آب‌بندی و کنترل ریسک اقلیم ساحلی.',
      shortSummary: 'سقف ۴٬۰۰۰ مترمربعی پارکینگ حمل‌ونقل در بندر ماهشهر که در آن چیدمان ساندویچ‌پانل، مسیر زهکشی، گاتر، فلاشینگ و آب‌بندی باید یکپارچه عمل می‌کرد.',
      trustMicrocopy: 'محدوده تأییدشده: سقف ساندویچ‌پانل، هماهنگی زهکشی، گاتر، فلاشینگ، داون‌اسپات و کنترل نصب.',
      primaryCta: 'درخواست بررسی سقف پارکینگ صنعتی',
      challenge: 'پارکینگ تاکسی ماهشهر به سقف ساندویچ‌پانل بادوام برای فضای حمل‌ونقلی پرتردد نیاز داشت. چالش مهندسی فقط تأمین پانل نبود؛ بلکه باید حرکت آب باران از طریق شیب‌بندی، گاتر، فلاشینگ، داون‌اسپات و درزهای آب‌بندی‌شده در اقلیم ساحلی قابل پیش‌بینی می‌ماند.',
      challengePoints: ['دیتیل‌پردازی متناسب با رطوبت و خوردگی اقلیم ساحلی', 'پیوستگی مسیر زهکشی از سطح سقف تا داون‌اسپات', 'حفظ آب‌بندی در فلاشینگ‌ها و همپوشانی پانل‌ها', 'کنترل توالی نصب برای سقف ۴٬۰۰۰ مترمربعی'],
      sipanelSolution: 'سی‌پانل سقف ساندویچ‌پانل را به‌عنوان یک مجموعه کامل زهکشی و حفاظت جوی هماهنگ کرد؛ شامل چیدمان پانل، جای گاتر، داون‌اسپات، فلاشینگ، اتصال مکانیکی و نقاط کنترل آب‌بندی.',
      engineeringDecision: 'تصمیم مهندسی این بود که زهکشی بخشی از خود سیستم سقف دیده شود، نه اکسسوری دیرهنگام. شیب‌ها، مسیر حرکت آب، موقعیت گاتر و تراز پانل پیش از نصب هماهنگ شد.',
      selectedSystemLogic: 'سقف ساندویچ‌پانل به دلیل سرعت بستن پوسته، وزن کم، عایق بودن و امکان کنترل همپوشانی و آب‌بندی برای پارکینگ حمل‌ونقل انتخاب شد.',
      coordinationNote: 'چیدمان پانل، خط گاتر، فلاشینگ و موقعیت داون‌اسپات باید پیش از نصب با سازه نگهدارنده هماهنگ می‌شد.',
      executionDetail: 'اجرا با ترتیب مشخص پیش رفت: تأیید رفرنس‌های سقف، نصب پانل با کنترل تراز، اجرای گاتر و فلاشینگ، هماهنگی داون‌اسپات و سپس بازرسی اتصال و آب‌بندی در نقاط حساس به آب.',
      procurementControl: 'پانل، فلاشینگ، گاتر، درزگیر، پیچ و متعلقات داون‌اسپات به‌صورت یک بسته هماهنگ با چیدمان تأییدشده سقف کنترل شد.',
      coordinationWithSiteTeam: 'توالی کارگاه اجزای مدیریت آب را هم‌زمان با نصب پانل نگه داشت تا دیتیل‌های زهکشی به اصلاح دیرهنگام تبدیل نشوند.',
      qualityCheckpoints: ['کنترل تراز و همپوشانی پانل‌ها', 'بازبینی شیب گاتر و پیوستگی داون‌اسپات', 'بازرسی فلاشینگ و درزگیر در لبه‌ها و انتقال‌ها'],
      measuredResult: 'سقف ساندویچ‌پانل ۴٬۰۰۰ مترمربعی با مدیریت هماهنگ آب باران و دیتیل‌های کنترل‌شده حفاظت جوی تحویل شد.',
      riskItems: [
        {risk: 'تجمع آب', explanation: 'هماهنگی شیب، گاتر و داون‌اسپات احتمال ایستایی آب روی سقف را کاهش داد.'},
        {risk: 'نشتی سقف', explanation: 'همپوشانی پانل، فلاشینگ و نقاط درزگیر به‌عنوان نقاط کنترل بازرسی شدند.'},
        {risk: 'ریسک دوام در اقلیم ساحلی', explanation: 'هماهنگی اکسسوری‌ها و دیتیل‌های آب‌بندی با شرایط بندر ماهشهر انجام شد.'},
        {risk: 'جریان نادرست زهکشی', explanation: 'مسیر حرکت آب پیش از نصب بازبینی شد و به اصلاح صرفاً کارگاهی موکول نشد.'}
      ],
      conversionHeadline: 'سقف پارکینگ یا فضای حمل‌ونقل دارید؟',
      conversionText: 'نقشه سقف، سازه نگهدارنده و مسیر زهکشی را ارسال کنید تا تیم مهندسی سی‌پانل ریسک آب‌بندی و تأمین متریال را بررسی کند.',
      conversionPrimaryCta: 'درخواست بررسی سقف پارکینگ صنعتی'
    },
    ar: {
      metaDescription: 'دراسة حالة موقف سيارات الأجرة في ماهشهر: سقف ألواح ساندويتش بمساحة ٤٬٠٠٠ م² مع تنسيق التصريف واستمرارية العزل المائي وضبط مخاطر البيئة الساحلية.',
      shortSummary: 'سقف بمساحة ٤٬٠٠٠ م² لمرفق نقل في بندر ماهشهر، حيث كان يجب أن يعمل تخطيط الألواح ومسارات التصريف والمزاريب والفلاشينغ والعزل كمنظومة واحدة.',
      trustMicrocopy: 'النطاق المؤكد: سقف ألواح ساندويتش، تنسيق التصريف، المزاريب، الفلاشينغ، مصارف المياه ونقاط فحص التركيب.',
      primaryCta: 'اطلب مراجعة سقف موقف نقل',
      challenge: 'احتاج موقف سيارات الأجرة في ماهشهر إلى سقف متين من ألواح الساندويتش لبيئة نقل كثيرة الاستخدام. لم يكن التحدي مجرد توريد الألواح، بل إبقاء حركة مياه الأمطار واضحة عبر الميول والمزاريب والفلاشينغ ومصارف المياه والوصلات المعزولة ضمن مناخ ساحلي.',
      challengePoints: ['تفاصيل مناسبة للرطوبة والتعرض الساحلي', 'استمرارية مسار التصريف من سطح السقف إلى المصارف', 'استمرارية العزل عند الفلاشينغ وتراكبات الألواح', 'تسلسل تركيب مضبوط لسقف بمساحة ٤٬٠٠٠ م²'],
      sipanelSolution: 'نسقت SIPANEL سقف ألواح الساندويتش كمنظومة كاملة للتصريف والحماية الجوية، تشمل تخطيط الألواح ومواقع المزاريب ومصارف المياه والفلاشينغ والتثبيت ونقاط فحص العزل.',
      engineeringDecision: 'كان القرار الهندسي اعتبار التصريف جزءاً من نظام السقف نفسه، لا ملحقاً لاحقاً. لذلك نسقت الميول ومسارات المياه ومواقع المزاريب ومحاذاة الألواح قبل التركيب.',
      selectedSystemLogic: 'اختير سقف ألواح الساندويتش لأنه يجمع سرعة إغلاق الغلاف وخفة الوزن والعزل وإمكانية ضبط التراكب والختم في مرفق نقل.',
      coordinationNote: 'كان يجب تنسيق تخطيط الألواح وخطوط المزاريب والفلاشينغ ومواقع مصارف المياه مع الهيكل الحامل قبل التنفيذ.',
      executionDetail: 'اتبع التنفيذ تسلسلاً واضحاً: تأكيد مراجع السقف، تركيب الألواح مع فحص المحاذاة، تركيب المزاريب والفلاشينغ، تنسيق المصارف، ثم التحقق من التثبيت والختم في الواجهات الحساسة للماء.',
      procurementControl: 'تم ضبط الألواح والفلاشينغ والمزاريب ومواد الختم والمثبتات وملحقات المصارف كحزمة واحدة مطابقة لتخطيط السقف المعتمد.',
      coordinationWithSiteTeam: 'حافظ تسلسل الموقع على مواءمة عناصر إدارة المياه مع تركيب الألواح حتى لا تتحول تفاصيل التصريف إلى تصحيحات متأخرة.',
      qualityCheckpoints: ['فحص محاذاة الألواح وتراكباتها', 'مراجعة ميول المزاريب واستمرارية المصارف', 'فحص الفلاشينغ ومواد الختم عند الحواف والانتقالات'],
      measuredResult: 'تم تسليم سقف ألواح ساندويتش بمساحة ٤٬٠٠٠ م² مع إدارة منسقة لمياه الأمطار وتفاصيل حماية جوية مضبوطة.',
      riskItems: [
        {risk: 'تجمع المياه', explanation: 'قلل تنسيق الميول والمزاريب والمصارف احتمال ركود المياه على السقف.'},
        {risk: 'تسرب السقف', explanation: 'عوملت تراكبات الألواح والفلاشينغ ونقاط الختم كنقاط فحص أساسية.'},
        {risk: 'مخاطر المتانة في البيئة الساحلية', explanation: 'تم اختيار تنسيق الملحقات وتفاصيل الختم وفق تعرض بندر ماهشهر.'},
        {risk: 'تدفق تصريف غير صحيح', explanation: 'راجعت الفرق مسارات المياه قبل التركيب بدلاً من تركها لتعديلات الموقع المتأخرة.'}
      ],
      conversionHeadline: 'لديك سقف موقف أو مرفق نقل؟',
      conversionText: 'أرسل رسومات السقف والهيكل الحامل ومسار التصريف حتى يراجع فريق SIPANEL مخاطر العزل وتوريد المواد.',
      conversionPrimaryCta: 'اطلب مراجعة سقف موقف نقل'
    },
    ru: {
      metaDescription: 'Кейс стоянки такси в Махшехре: 4 000 м² кровли из сэндвич-панелей с координацией водоотвода, гидроизоляции и рисков прибрежной среды.',
      shortSummary: 'Кровля транспортной стоянки площадью 4 000 м² в Бендер-Махшехре, где раскладка панелей, водоотвод, желоба, примыкания и герметизация должны были работать как единая система.',
      trustMicrocopy: 'Подтвержденный объем: сэндвич-панельная кровля, координация водоотвода, желоба, примыкания, водостоки и контрольные точки монтажа.',
      primaryCta: 'Запросить проверку кровли парковки',
      challenge: 'Стоянке такси в Махшехре требовалась долговечная кровля из сэндвич-панелей для интенсивно используемого транспортного объекта. Инженерная задача заключалась не только в поставке панелей, а в предсказуемом движении дождевой воды через уклоны, желоба, примыкания, водостоки и герметизированные переходы в прибрежной среде.',
      challengePoints: ['Детали с учетом прибрежной влажности и коррозионной среды', 'Непрерывный путь водоотвода от кровли к водостокам', 'Непрерывность гидроизоляции на примыканиях и нахлестах панелей', 'Контролируемая последовательность монтажа кровли 4 000 м²'],
      sipanelSolution: 'SIPANEL скоординировала сэндвич-панельную кровлю как цельную систему водоотвода и погодной защиты: раскладку панелей, положения желобов и водостоков, примыкания, крепеж и точки контроля герметизации.',
      engineeringDecision: 'Инженерное решение состояло в том, чтобы рассматривать водоотвод как часть кровельной системы, а не как позднее дополнение. Уклоны, пути воды, желоба и выравнивание панелей были согласованы до монтажа.',
      selectedSystemLogic: 'Сэндвич-панельная кровля выбрана из-за скорости закрытия оболочки, малого веса, теплоизоляции и контролируемых нахлестов и герметизации для транспортной стоянки.',
      coordinationNote: 'Раскладка панелей, линии желобов, примыкания и положения водостоков должны были быть согласованы с несущей конструкцией до площадочного монтажа.',
      executionDetail: 'Монтаж шел по порядку: проверка кровельных референсов, установка панелей с контролем выравнивания, монтаж желобов и примыканий, координация водостоков, затем проверка крепежа и герметизации в водочувствительных узлах.',
      procurementControl: 'Панели, примыкания, желоба, герметики, крепеж и аксессуары водостоков контролировались как единый комплект под утвержденную раскладку кровли.',
      coordinationWithSiteTeam: 'Площадочная последовательность держала элементы водоотвода синхронно с монтажом панелей, чтобы детали не исправлялись поздно.',
      qualityCheckpoints: ['Проверка выравнивания панелей и нахлестов', 'Проверка уклона желобов и непрерывности водостоков', 'Инспекция примыканий и герметика на краях и переходах'],
      measuredResult: 'Сэндвич-панельная кровля площадью 4 000 м² была выполнена с согласованным управлением дождевой водой и контролируемыми деталями погодной защиты.',
      riskItems: [
        {risk: 'Скопление воды', explanation: 'Координация уклонов, желобов и водостоков снизила вероятность стоячей воды на кровле.'},
        {risk: 'Протечки кровли', explanation: 'Нахлесты панелей, примыкания и точки герметизации стали обязательными контрольными точками.'},
        {risk: 'Риск долговечности в прибрежной среде', explanation: 'Аксессуары и герметизирующие детали согласованы с условиями Бендер-Махшехра.'},
        {risk: 'Неверный водоотвод', explanation: 'Пути воды были проверены до монтажа, а не оставлены на позднюю корректировку.'}
      ],
      conversionHeadline: 'Есть кровля парковки или транспортного объекта?',
      conversionText: 'Отправьте схему кровли, несущую конструкцию и водоотвод, чтобы инженерная команда SIPANEL оценила риски герметизации и поставки.',
      conversionPrimaryCta: 'Запросить проверку кровли парковки'
    }
  },
  'ahvaz-airport-passenger-terminal': {
    en: {
      metaDescription: 'Ahvaz Airport Passenger Terminal case study: 4,000 m² ZIP-TECH and aluminium cladding with curved facade geometry, substructure coordination, and controlled airport-terminal finishing.',
      shortSummary: 'A 4,000 m² airport passenger-terminal envelope where curved architectural geometry, aluminium cladding, ZIP-TECH transitions, and substructure alignment had to be coordinated before installation.',
      trustMicrocopy: 'Verified scope: ZIP-TECH roofing, aluminium cladding, curved geometry coordination, and staged installation checks.',
      primaryCta: 'Request Airport Envelope Review',
      challenge: 'The passenger terminal included a curved front architectural feature where the covering had to bend in a perpendicular direction. That made geometry control, substructure alignment, aluminium panel layout, ZIP-TECH transitions, and final visual quality the main execution risks.',
      challengePoints: ['Maintaining the curved architectural line without visual breaks', 'Coordinating aluminium cladding with ZIP-TECH roof transitions', 'Aligning substructure references before panel installation', 'Controlling finish quality on a public terminal facade'],
      sipanelSolution: 'SIPANEL coordinated custom execution details for the curved form, aligning substructure references, aluminium panels, and ZIP-TECH components before installation.',
      engineeringDecision: 'The engineering decision was to control geometry first: define curved references, coordinate panel and roofing interfaces, then execute the covering without interrupting the architectural line.',
      selectedSystemLogic: 'ZIP-TECH roofing and aluminium cladding were used together because the terminal required both weather-protected roof transitions and a visually controlled architectural front.',
      coordinationNote: 'Substructure lines, panel bending direction, roof-to-cladding transitions, and edge details were coordinated before installation so airport-terminal interfaces did not become late site corrections.',
      executionDetail: 'Execution covered 4,000 m² of ZIP-TECH and aluminium cladding with staged checks for curved references, panel alignment, transition quality, and final visual continuity.',
      procurementControl: 'ZIP-TECH components, aluminium panels, fasteners, and transition accessories were controlled as one coordinated package matched to the approved geometry.',
      coordinationWithSiteTeam: 'The site team worked from agreed geometry references so cladding, roof edges, and terminal facade interfaces could be installed in a controlled order.',
      qualityCheckpoints: ['Curved reference and substructure alignment review', 'ZIP-TECH-to-cladding transition inspection', 'Final visual continuity check across the terminal frontage'],
      measuredResult: '4,000 m² of ZIP-TECH and aluminium cladding were executed while preserving the curved architectural form and final visual quality.',
      measuredResultItems: [
        {label: 'Execution result', value: 'Curved terminal envelope completed with controlled visual continuity', verificationStatus: 'verified'},
        {label: 'Executed area', value: '4,000 m²', verificationStatus: 'verified'},
        {label: 'System', value: 'ZIP-TECH roofing and aluminium cladding', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'Visual breaks in curved facade', explanation: 'Curved references and alignment checkpoints reduced the risk of visible discontinuity on the terminal frontage.'},
        {risk: 'Incorrect perpendicular bending', explanation: 'Panel bending direction was reviewed against the geometry before site installation.'},
        {risk: 'Mismatch between cladding and substructure', explanation: 'Substructure alignment was treated as a prerequisite for aluminium panel installation.'},
        {risk: 'Loss of architectural quality', explanation: 'ZIP-TECH transitions and cladding edges were checked as part of the final visual sequence.'}
      ],
      conversionHeadline: 'Need an airport or terminal envelope review?',
      conversionText: 'Send the terminal facade, roof, or canopy drawings so SIPANEL engineering can review geometry, transitions, and installation sequencing.',
      conversionPrimaryCta: 'Request Airport Envelope Review'
    },
    fa: {
      metaDescription: 'مطالعه موردی ترمینال مسافری فرودگاه اهواز: اجرای ۴٬۰۰۰ مترمربع زیپ‌تک و نمای آلومینیومی با کنترل هندسه منحنی، زیرسازی و کیفیت نهایی.',
      shortSummary: 'پوسته ۴٬۰۰۰ مترمربعی ترمینال مسافری که در آن هندسه منحنی، نمای آلومینیومی، انتقال‌های زیپ‌تک و تراز زیرسازی باید پیش از نصب هماهنگ می‌شد.',
      trustMicrocopy: 'محدوده تأییدشده: سقف زیپ‌تک، نمای آلومینیومی، هماهنگی هندسه منحنی و کنترل مرحله‌ای نصب.',
      primaryCta: 'درخواست بررسی پوسته ترمینال',
      challenge: 'در ترمینال مسافری فرودگاه اهواز یک فرم معماری منحنی در نمای اصلی وجود داشت که پوشش باید در جهت عمود خم می‌شد. بنابراین کنترل هندسه، تراز زیرسازی، چیدمان پانل آلومینیومی، انتقال‌های زیپ‌تک و کیفیت نهایی نما به ریسک‌های اصلی اجرا تبدیل شدند.',
      challengePoints: ['حفظ خط معماری منحنی بدون شکست بصری', 'هماهنگی نمای آلومینیومی با انتقال‌های سقف زیپ‌تک', 'تراز کردن رفرنس‌های زیرسازی پیش از نصب پانل', 'کنترل کیفیت نهایی روی نمای عمومی ترمینال'],
      sipanelSolution: 'سی‌پانل جزئیات اجرای اختصاصی فرم منحنی را هماهنگ کرد و رفرنس‌های زیرسازی، پانل‌های آلومینیومی و اجزای زیپ‌تک را پیش از نصب با هم تطبیق داد.',
      engineeringDecision: 'تصمیم مهندسی این بود که ابتدا هندسه کنترل شود: رفرنس‌های منحنی تعریف شود، اتصال نمای آلومینیومی و سقف هماهنگ گردد و سپس پوشش بدون شکست خط معماری اجرا شود.',
      selectedSystemLogic: 'ترکیب سقف زیپ‌تک و نمای آلومینیومی به این دلیل انتخاب شد که ترمینال هم به انتقال سقفی مقاوم در برابر آب‌وهوا و هم به نمای معماری کنترل‌شده نیاز داشت.',
      coordinationNote: 'خطوط زیرسازی، جهت خم پانل، انتقال سقف به نما و جزئیات لبه پیش از نصب هماهنگ شد تا رابط‌های ترمینال به اصلاح دیرهنگام کارگاهی تبدیل نشود.',
      executionDetail: 'اجرا شامل ۴٬۰۰۰ مترمربع زیپ‌تک و نمای آلومینیومی بود و با کنترل مرحله‌ای رفرنس‌های منحنی، تراز پانل، کیفیت انتقال‌ها و پیوستگی بصری نهایی انجام شد.',
      procurementControl: 'اجزای زیپ‌تک، پانل‌های آلومینیومی، پیچ‌ها و اکسسوری‌های انتقال به‌عنوان یک بسته هماهنگ با هندسه تأییدشده کنترل شد.',
      coordinationWithSiteTeam: 'تیم کارگاه بر اساس رفرنس‌های هندسی توافق‌شده کار کرد تا نما، لبه‌های سقف و رابط‌های ترمینال در توالی قابل کنترل نصب شوند.',
      qualityCheckpoints: ['بازبینی رفرنس منحنی و تراز زیرسازی', 'بازرسی انتقال زیپ‌تک به نمای آلومینیومی', 'کنترل پیوستگی بصری در طول نمای ترمینال'],
      measuredResult: '۴٬۰۰۰ مترمربع زیپ‌تک و نمای آلومینیومی اجرا شد و فرم معماری منحنی و کیفیت بصری نهایی حفظ گردید.',
      measuredResultItems: [
        {label: 'نتیجه اجرا', value: 'پوسته منحنی ترمینال با پیوستگی بصری کنترل‌شده تکمیل شد', verificationStatus: 'verified'},
        {label: 'مساحت اجراشده', value: '۴٬۰۰۰ مترمربع', verificationStatus: 'verified'},
        {label: 'سامانه', value: 'سقف زیپ‌تک و نمای آلومینیومی', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'شکست بصری در نمای منحنی', explanation: 'رفرنس‌های منحنی و کنترل‌های تراز ریسک ناپیوستگی قابل مشاهده در نمای ترمینال را کاهش داد.'},
        {risk: 'خم‌کاری نادرست در جهت عمود', explanation: 'جهت خم پانل پیش از نصب با هندسه پروژه بازبینی شد.'},
        {risk: 'ناهماهنگی نما و زیرسازی', explanation: 'تراز زیرسازی به‌عنوان پیش‌نیاز نصب پانل آلومینیومی کنترل شد.'},
        {risk: 'افت کیفیت معماری', explanation: 'انتقال‌های زیپ‌تک و لبه‌های نما در توالی کنترل نهایی بررسی شدند.'}
      ],
      conversionHeadline: 'نیاز به بررسی پوسته فرودگاهی یا ترمینال دارید؟',
      conversionText: 'نقشه‌های نما، سقف یا سایبان ترمینال را ارسال کنید تا تیم مهندسی سی‌پانل هندسه، انتقال‌ها و توالی نصب را بررسی کند.',
      conversionPrimaryCta: 'درخواست بررسی پوسته ترمینال'
    },
    ar: {
      metaDescription: 'دراسة حالة محطة الركاب في مطار الأهواز: تنفيذ ٤٬٠٠٠ م² من ZIP-TECH والكسوة الألمنيومية مع ضبط الهندسة المنحنية والبنية الحاملة وجودة التشطيب.',
      shortSummary: 'غلاف محطة ركاب بمساحة ٤٬٠٠٠ م² كان يتطلب تنسيق الهندسة المنحنية والكسوة الألمنيومية وانتقالات ZIP-TECH ومحاذاة البنية الحاملة قبل التركيب.',
      trustMicrocopy: 'النطاق المؤكد: تسقيف ZIP-TECH، كسوة ألمنيوم، تنسيق الهندسة المنحنية وفحوص تركيب مرحلية.',
      primaryCta: 'اطلب مراجعة غلاف محطة',
      challenge: 'تضمّنت محطة الركاب في مطار الأهواز عنصراً معمارياً أمامياً منحنياً كان يجب أن ينحني غطاؤه باتجاه عمودي. لذلك أصبحت هندسة الانحناء ومحاذاة البنية الحاملة وتخطيط ألواح الألمنيوم وانتقالات ZIP-TECH وجودة التشطيب النهائية هي مخاطر التنفيذ الرئيسية.',
      challengePoints: ['الحفاظ على الخط المعماري المنحني دون انقطاعات بصرية', 'تنسيق الكسوة الألمنيومية مع انتقالات سقف ZIP-TECH', 'محاذاة مراجع البنية الحاملة قبل تركيب الألواح', 'ضبط جودة التشطيب على واجهة محطة عامة'],
      sipanelSolution: 'نسّقت SIPANEL تفاصيل تنفيذ مخصصة للشكل المنحني، مع مواءمة مراجع البنية الحاملة وألواح الألمنيوم ومكونات ZIP-TECH قبل التركيب.',
      engineeringDecision: 'كان القرار الهندسي هو ضبط الهندسة أولاً: تحديد المراجع المنحنية، وتنسيق واجهات الألواح والسقف، ثم تنفيذ الغطاء دون كسر الخط المعماري.',
      selectedSystemLogic: 'استُخدم تسقيف ZIP-TECH مع الكسوة الألمنيومية لأن المحطة احتاجت إلى انتقالات سقفية محمية من الطقس وإلى واجهة معمارية مضبوطة بصرياً.',
      coordinationNote: 'نُسّقت خطوط البنية الحاملة واتجاه ثني الألواح وانتقالات السقف إلى الكسوة وتفاصيل الحواف قبل التركيب حتى لا تتحول واجهات المحطة إلى تصحيحات متأخرة في الموقع.',
      executionDetail: 'شمل التنفيذ ٤٬٠٠٠ م² من ZIP-TECH والكسوة الألمنيومية، مع فحوص مرحلية للمراجع المنحنية ومحاذاة الألواح وجودة الانتقالات والاستمرارية البصرية النهائية.',
      procurementControl: 'تم ضبط مكونات ZIP-TECH وألواح الألمنيوم والمثبتات وملحقات الانتقال كحزمة واحدة مطابقة للهندسة المعتمدة.',
      coordinationWithSiteTeam: 'عمل فريق الموقع وفق مراجع هندسية متفق عليها كي تُركّب الكسوة وحواف السقف وواجهات المحطة بتسلسل مضبوط.',
      qualityCheckpoints: ['مراجعة المراجع المنحنية ومحاذاة البنية الحاملة', 'فحص انتقال ZIP-TECH إلى الكسوة الألمنيومية', 'فحص الاستمرارية البصرية على طول واجهة المحطة'],
      measuredResult: 'تم تنفيذ ٤٬٠٠٠ م² من ZIP-TECH والكسوة الألمنيومية مع الحفاظ على الشكل المعماري المنحني وجودة التشطيب النهائية.',
      measuredResultItems: [
        {label: 'نتيجة التنفيذ', value: 'اكتمل غلاف المحطة المنحني باستمرارية بصرية مضبوطة', verificationStatus: 'verified'},
        {label: 'المساحة المنفذة', value: '٤٬٠٠٠ م²', verificationStatus: 'verified'},
        {label: 'النظام', value: 'تسقيف ZIP-TECH وكسوة ألمنيوم', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'انقطاعات بصرية في الواجهة المنحنية', explanation: 'قللت المراجع المنحنية وفحوص المحاذاة خطر ظهور انقطاع بصري في واجهة المحطة.'},
        {risk: 'ثني غير صحيح بالاتجاه العمودي', explanation: 'تمت مراجعة اتجاه ثني الألواح مقابل الهندسة قبل التركيب في الموقع.'},
        {risk: 'عدم تطابق الكسوة مع البنية الحاملة', explanation: 'اعتُبرت محاذاة البنية الحاملة شرطاً مسبقاً لتركيب ألواح الألمنيوم.'},
        {risk: 'فقدان الجودة المعمارية', explanation: 'تم فحص انتقالات ZIP-TECH وحواف الكسوة ضمن تسلسل التشطيب النهائي.'}
      ],
      conversionHeadline: 'تحتاج إلى مراجعة غلاف مطار أو محطة؟',
      conversionText: 'أرسل رسومات واجهة المحطة أو السقف أو المظلة ليراجع فريق SIPANEL الهندسي الهندسة والانتقالات وتسلسل التركيب.',
      conversionPrimaryCta: 'اطلب مراجعة غلاف محطة'
    },
    ru: {
      metaDescription: 'Кейс пассажирского терминала аэропорта Ахваз: 4 000 м² ZIP-TECH и алюминиевой облицовки с контролем кривой геометрии, подсистемы и качества отделки.',
      shortSummary: 'Контур пассажирского терминала площадью 4 000 м², где кривую архитектурную геометрию, алюминиевую облицовку, переходы ZIP-TECH и выравнивание подсистемы нужно было согласовать до монтажа.',
      trustMicrocopy: 'Подтвержденный объем: кровля ZIP-TECH, алюминиевая облицовка, координация кривой геометрии и поэтапные проверки монтажа.',
      primaryCta: 'Запросить проверку контура терминала',
      challenge: 'В пассажирском терминале был изогнутый передний архитектурный элемент, где покрытие должно было изгибаться в перпендикулярном направлении. Поэтому контроль геометрии, выравнивание подсистемы, раскладка алюминиевых панелей, переходы ZIP-TECH и итоговое качество вида стали основными рисками выполнения.',
      challengePoints: ['Сохранение кривой архитектурной линии без визуальных разрывов', 'Координация алюминиевой облицовки с переходами кровли ZIP-TECH', 'Выравнивание реперов подсистемы до монтажа панелей', 'Контроль качества отделки на публичном фасаде терминала'],
      sipanelSolution: 'SIPANEL скоординировала специальные исполнительные детали для кривой формы, согласовав реперы подсистемы, алюминиевые панели и компоненты ZIP-TECH до монтажа.',
      engineeringDecision: 'Инженерное решение состояло в первичном контроле геометрии: задать кривые реперы, согласовать интерфейсы панелей и кровли, затем выполнить покрытие без нарушения архитектурной линии.',
      selectedSystemLogic: 'Кровля ZIP-TECH и алюминиевая облицовка применены вместе, потому что терминалу требовались защищенные кровельные переходы и визуально контролируемый архитектурный фасад.',
      coordinationNote: 'Линии подсистемы, направление изгиба панелей, переходы кровли к облицовке и кромочные детали были согласованы до монтажа, чтобы интерфейсы терминала не стали поздними исправлениями на площадке.',
      executionDetail: 'Работы охватили 4 000 м² ZIP-TECH и алюминиевой облицовки с поэтапной проверкой кривых реперов, выравнивания панелей, качества переходов и итоговой визуальной непрерывности.',
      procurementControl: 'Компоненты ZIP-TECH, алюминиевые панели, крепеж и аксессуары переходов контролировались как единый комплект под утвержденную геометрию.',
      coordinationWithSiteTeam: 'Площадочная команда работала по согласованным геометрическим реперам, чтобы облицовка, кромки кровли и интерфейсы терминала монтировались в управляемом порядке.',
      qualityCheckpoints: ['Проверка кривых реперов и выравнивания подсистемы', 'Инспекция перехода ZIP-TECH к алюминиевой облицовке', 'Проверка визуальной непрерывности вдоль фасада терминала'],
      measuredResult: 'Выполнено 4 000 м² ZIP-TECH и алюминиевой облицовки с сохранением кривой архитектурной формы и итогового визуального качества.',
      measuredResultItems: [
        {label: 'Результат монтажа', value: 'Кривой контур терминала завершен с контролируемой визуальной непрерывностью', verificationStatus: 'verified'},
        {label: 'Выполненная площадь', value: '4 000 м²', verificationStatus: 'verified'},
        {label: 'Система', value: 'Кровля ZIP-TECH и алюминиевая облицовка', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'Визуальные разрывы на кривом фасаде', explanation: 'Кривые реперы и проверки выравнивания снизили риск видимых разрывов на фасаде терминала.'},
        {risk: 'Неверный перпендикулярный изгиб', explanation: 'Направление изгиба панелей проверялось по геометрии до монтажа на площадке.'},
        {risk: 'Несовпадение облицовки и подсистемы', explanation: 'Выравнивание подсистемы стало обязательным условием перед монтажом алюминиевых панелей.'},
        {risk: 'Потеря архитектурного качества', explanation: 'Переходы ZIP-TECH и кромки облицовки проверялись в финальной последовательности отделки.'}
      ],
      conversionHeadline: 'Нужна проверка контура аэропорта или терминала?',
      conversionText: 'Пришлите чертежи фасада, кровли или навеса терминала, и инженерная команда SIPANEL проверит геометрию, переходы и последовательность монтажа.',
      conversionPrimaryCta: 'Запросить проверку контура терминала'
    }
  },
  'kermanshah-industrial-university-petroleum-faculty': {
    en: {
      metaDescription: 'Kermanshah Industrial University Petroleum Faculty case study: 1,000 m² structural glass facade with movement-aware connection detailing and controlled installation.',
      shortSummary: 'A 1,000 m² educational-building facade where glass connection details had to tolerate relative movement between the primary structure and brittle facade panels.',
      trustMicrocopy: 'Verified scope: structural glass facade, connection-detail coordination, support tolerance control, and installation checks.',
      primaryCta: 'Request Facade Connection Review',
      challenge: 'The petroleum-faculty building required structural glass facade connections that could tolerate relative movement in the primary structure and reduce the risk of transferring displacement into brittle glass panels.',
      challengePoints: ['Separating facade behavior from uncontrolled structural movement', 'Coordinating glass support tolerances before installation', 'Maintaining facade alignment across a 1,000 m² surface', 'Reducing stress transfer into glass units'],
      sipanelSolution: 'SIPANEL engineered connection details to accommodate displacement between the building structure and glass facade while preserving facade alignment.',
      engineeringDecision: 'The engineering decision was to separate glass performance from uncontrolled structural movement by using connection details that reduce stress transfer into the panels.',
      selectedSystemLogic: 'A structural glass facade approach was used because the faculty building required a transparent architectural envelope with carefully controlled support interfaces.',
      coordinationNote: 'Support points, glass unit alignment, and connection tolerances were coordinated with the primary structure before installation.',
      executionDetail: 'Execution covered approximately 1,000 m² of glass facade with attention to connection alignment, support tolerances, and controlled installation of glass units.',
      procurementControl: 'Glass units, connection accessories, and support components were coordinated against the approved facade layout to reduce mismatch during installation.',
      coordinationWithSiteTeam: 'The site team checked support references before setting glass units so connection tolerances remained within the intended installation sequence.',
      qualityCheckpoints: ['Connection-detail review before installation', 'Support tolerance and glass alignment inspection', 'Facade continuity check across the installed surface'],
      measuredResult: 'Approximately 1,000 m² of structural glass facade was executed. The project record states that the facade reportedly remained without glass damage during the Kermanshah earthquake in the 1390s Solar Hijri decade.',
      measuredResultItems: [
        {label: 'Execution result', value: 'Structural glass facade installed with movement-aware connection details', verificationStatus: 'verified'},
        {label: 'Executed area', value: '1,000 m²', verificationStatus: 'verified'},
        {label: 'Recorded observation', value: 'Project record reports no glass damage during a Kermanshah earthquake in the 1390s Solar Hijri decade', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'Glass breakage under structural movement', explanation: 'Connection details were used to reduce direct stress transfer from the primary structure into glass panels.'},
        {risk: 'Facade connection failure', explanation: 'Support points and tolerances were reviewed before glass installation.'},
        {risk: 'Mismatch between structure and glass facade', explanation: 'Facade alignment was coordinated against the primary-structure references.'},
        {risk: 'Reduced building-user safety', explanation: 'Movement-aware detailing reduced the risk of brittle facade-panel damage from structural displacement.'}
      ],
      conversionHeadline: 'Need a facade connection review?',
      conversionText: 'Send facade drawings and support details so SIPANEL engineering can review connection logic, tolerances, and installation sequencing.',
      conversionPrimaryCta: 'Request Facade Connection Review'
    },
    fa: {
      metaDescription: 'مطالعه موردی دانشکده نفت دانشگاه صنعتی کرمانشاه: اجرای ۱٬۰۰۰ مترمربع نمای شیشه‌ای سازه‌ای با دیتیل اتصال سازگار با جابه‌جایی و کنترل نصب.',
      shortSummary: 'نمای ۱٬۰۰۰ مترمربعی ساختمان آموزشی که در آن دیتیل اتصال شیشه باید جابه‌جایی نسبی سازه اصلی را تحمل کند و تنش را به پانل‌های شکننده منتقل نکند.',
      trustMicrocopy: 'محدوده تأییدشده: نمای شیشه‌ای سازه‌ای، هماهنگی دیتیل اتصال، کنترل تلرانس تکیه‌گاه و بازرسی نصب.',
      primaryCta: 'درخواست بررسی اتصال نما',
      challenge: 'ساختمان دانشکده نفت دانشگاه صنعتی کرمانشاه به اتصالات نمای شیشه‌ای سازه‌ای نیاز داشت که بتواند جابه‌جایی نسبی در سازه اصلی را تحمل کند و ریسک انتقال تغییرمکان به پانل‌های شیشه‌ای شکننده را کاهش دهد.',
      challengePoints: ['جدا کردن رفتار نما از حرکت کنترل‌نشده سازه اصلی', 'هماهنگی تلرانس تکیه‌گاه شیشه پیش از نصب', 'حفظ تراز نما در سطح ۱٬۰۰۰ مترمربع', 'کاهش انتقال تنش به یونیت‌های شیشه‌ای'],
      sipanelSolution: 'سی‌پانل دیتیل‌های اتصال را طوری مهندسی کرد که جابه‌جایی بین سازه ساختمان و نمای شیشه‌ای جذب شود و هم‌زمان تراز نما حفظ گردد.',
      engineeringDecision: 'تصمیم مهندسی این بود که عملکرد شیشه از حرکت کنترل‌نشده سازه جدا شود و با دیتیل اتصال مناسب، انتقال تنش به پانل‌ها کاهش یابد.',
      selectedSystemLogic: 'رویکرد نمای شیشه‌ای سازه‌ای به این دلیل به کار رفت که ساختمان دانشکده به پوسته شفاف معماری با رابط‌های تکیه‌گاهی دقیق نیاز داشت.',
      coordinationNote: 'نقاط تکیه‌گاه، تراز یونیت‌های شیشه و تلرانس اتصال پیش از نصب با سازه اصلی هماهنگ شد.',
      executionDetail: 'اجرا حدود ۱٬۰۰۰ مترمربع نمای شیشه‌ای را پوشش داد و بر تراز اتصال، تلرانس تکیه‌گاه و نصب کنترل‌شده یونیت‌های شیشه‌ای تمرکز داشت.',
      procurementControl: 'یونیت‌های شیشه، متعلقات اتصال و قطعات تکیه‌گاهی با چیدمان تأییدشده نما هماهنگ شد تا عدم‌انطباق در نصب کاهش یابد.',
      coordinationWithSiteTeam: 'تیم کارگاه پیش از نصب شیشه رفرنس‌های تکیه‌گاهی را کنترل کرد تا تلرانس اتصال در توالی نصب حفظ شود.',
      qualityCheckpoints: ['بازبینی دیتیل اتصال پیش از نصب', 'کنترل تلرانس تکیه‌گاه و تراز شیشه', 'بررسی پیوستگی نما در سطح اجراشده'],
      measuredResult: 'حدود ۱٬۰۰۰ مترمربع نمای شیشه‌ای سازه‌ای اجرا شد. در سوابق پروژه آمده است که نما در جریان زلزله کرمانشاه در دهه ۱۳۹۰ شمسی بدون آسیب شیشه‌ای گزارش شده است.',
      measuredResultItems: [
        {label: 'نتیجه اجرا', value: 'نمای شیشه‌ای سازه‌ای با دیتیل اتصال سازگار با جابه‌جایی نصب شد', verificationStatus: 'verified'},
        {label: 'مساحت اجراشده', value: '۱٬۰۰۰ مترمربع', verificationStatus: 'verified'},
        {label: 'مشاهده ثبت‌شده', value: 'سوابق پروژه نبود آسیب شیشه‌ای در زلزله کرمانشاه دهه ۱۳۹۰ را گزارش می‌کند', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'شکست شیشه در اثر حرکت سازه', explanation: 'دیتیل اتصال برای کاهش انتقال مستقیم تنش از سازه اصلی به پانل‌های شیشه‌ای به کار رفت.'},
        {risk: 'خرابی اتصال نما', explanation: 'نقاط تکیه‌گاه و تلرانس‌ها پیش از نصب شیشه بازبینی شدند.'},
        {risk: 'ناهماهنگی سازه و نمای شیشه‌ای', explanation: 'تراز نما با رفرنس‌های سازه اصلی هماهنگ شد.'},
        {risk: 'کاهش ایمنی کاربران ساختمان', explanation: 'دیتیل سازگار با جابه‌جایی ریسک آسیب پانل شیشه‌ای ناشی از تغییرمکان سازه را کاهش داد.'}
      ],
      conversionHeadline: 'نیاز به بررسی اتصال نما دارید؟',
      conversionText: 'نقشه‌های نما و دیتیل‌های تکیه‌گاه را ارسال کنید تا تیم مهندسی سی‌پانل منطق اتصال، تلرانس‌ها و توالی نصب را بررسی کند.',
      conversionPrimaryCta: 'درخواست بررسی اتصال نما'
    },
    ar: {
      metaDescription: 'دراسة حالة كلية النفط في جامعة كرمانشاه الصناعية: واجهة زجاجية إنشائية بمساحة ١٬٠٠٠ م² مع تفاصيل اتصال تراعي الحركة وتركيب مضبوط.',
      shortSummary: 'واجهة مبنى تعليمي بمساحة ١٬٠٠٠ م² احتاجت فيها وصلات الزجاج إلى تحمّل الحركة النسبية بين الهيكل الرئيسي والألواح الزجاجية الهشة.',
      trustMicrocopy: 'النطاق المؤكد: واجهة زجاجية إنشائية، تنسيق تفاصيل الوصلات، ضبط سماحات التثبيت وفحوص التركيب.',
      primaryCta: 'اطلب مراجعة وصلات الواجهة',
      challenge: 'احتاج مبنى كلية النفط في جامعة كرمانشاه الصناعية إلى وصلات واجهة زجاجية إنشائية تتحمل الحركة النسبية في الهيكل الرئيسي وتقلل خطر نقل الإزاحة إلى الألواح الزجاجية الهشة.',
      challengePoints: ['فصل أداء الواجهة عن الحركة غير المضبوطة في الهيكل الرئيسي', 'تنسيق سماحات تكييف الزجاج قبل التركيب', 'الحفاظ على محاذاة الواجهة عبر سطح بمساحة ١٬٠٠٠ م²', 'تقليل انتقال الإجهاد إلى وحدات الزجاج'],
      sipanelSolution: 'صمّمت SIPANEL تفاصيل وصلات تستوعب الإزاحة بين هيكل المبنى والواجهة الزجاجية مع الحفاظ على محاذاة الواجهة.',
      engineeringDecision: 'كان القرار الهندسي فصل أداء الزجاج عن الحركة غير المضبوطة للهيكل باستخدام تفاصيل وصلات تقلل انتقال الإجهاد إلى الألواح.',
      selectedSystemLogic: 'استُخدم نهج الواجهة الزجاجية الإنشائية لأن مبنى الكلية احتاج إلى غلاف معماري شفاف بواجهات تثبيت مضبوطة بعناية.',
      coordinationNote: 'نُسّقت نقاط التثبيت ومحاذاة وحدات الزجاج وسماحات الوصلات مع الهيكل الرئيسي قبل التركيب.',
      executionDetail: 'غطى التنفيذ نحو ١٬٠٠٠ م² من الواجهة الزجاجية، مع التركيز على محاذاة الوصلات وسماحات التثبيت والتركيب المضبوط لوحدات الزجاج.',
      procurementControl: 'نُسّقت وحدات الزجاج وملحقات الوصل والدعامات مع تخطيط الواجهة المعتمد لتقليل عدم التطابق أثناء التركيب.',
      coordinationWithSiteTeam: 'تحقق فريق الموقع من مراجع التثبيت قبل تركيب وحدات الزجاج حتى تبقى سماحات الوصل ضمن التسلسل المقصود.',
      qualityCheckpoints: ['مراجعة تفاصيل الوصلات قبل التركيب', 'فحص سماحات التثبيت ومحاذاة الزجاج', 'فحص استمرارية الواجهة عبر السطح المنفذ'],
      measuredResult: 'تم تنفيذ نحو ١٬٠٠٠ م² من الواجهة الزجاجية الإنشائية. وتذكر سجلات المشروع أن الواجهة بقيت من دون أضرار زجاجية أثناء زلزال كرمانشاه في عقد ١٣٩٠ هجري شمسي.',
      measuredResultItems: [
        {label: 'نتيجة التنفيذ', value: 'تم تركيب واجهة زجاجية إنشائية بتفاصيل وصلات تراعي الحركة', verificationStatus: 'verified'},
        {label: 'المساحة المنفذة', value: '١٬٠٠٠ م²', verificationStatus: 'verified'},
        {label: 'ملاحظة مسجلة', value: 'تذكر سجلات المشروع عدم حدوث ضرر زجاجي خلال زلزال كرمانشاه في عقد ١٣٩٠ هجري شمسي', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'كسر الزجاج بسبب حركة الهيكل', explanation: 'استُخدمت تفاصيل وصلات تقلل نقل الإجهاد المباشر من الهيكل الرئيسي إلى الألواح الزجاجية.'},
        {risk: 'فشل وصلات الواجهة', explanation: 'راجعت الفرق نقاط التثبيت والسماحات قبل تركيب الزجاج.'},
        {risk: 'عدم تطابق الهيكل والواجهة الزجاجية', explanation: 'نُسّقت محاذاة الواجهة مع مراجع الهيكل الرئيسي.'},
        {risk: 'انخفاض سلامة مستخدمي المبنى', explanation: 'قللت التفاصيل المراعية للحركة خطر تلف ألواح الواجهة الهشة نتيجة إزاحة الهيكل.'}
      ],
      conversionHeadline: 'تحتاج إلى مراجعة وصلات واجهة؟',
      conversionText: 'أرسل رسومات الواجهة وتفاصيل التثبيت ليراجع فريق SIPANEL الهندسي منطق الوصلات والسماحات وتسلسل التركيب.',
      conversionPrimaryCta: 'اطلب مراجعة وصلات الواجهة'
    },
    ru: {
      metaDescription: 'Кейс нефтяного факультета Керманшахского индустриального университета: 1 000 м² структурного стеклянного фасада с узлами, учитывающими перемещения.',
      shortSummary: 'Фасад учебного корпуса площадью 1 000 м², где узлы крепления стекла должны были выдерживать относительные перемещения между основной конструкцией и хрупкими стеклянными панелями.',
      trustMicrocopy: 'Подтвержденный объем: структурный стеклянный фасад, координация узлов крепления, контроль допусков опор и проверки монтажа.',
      primaryCta: 'Запросить проверку фасадных узлов',
      challenge: 'Зданию нефтяного факультета Керманшахского индустриального университета требовались узлы структурного стеклянного фасада, способные воспринимать относительное движение основной конструкции и снижать риск передачи смещений в хрупкие стеклянные панели.',
      challengePoints: ['Отделение работы фасада от неконтролируемого движения основной конструкции', 'Координация допусков опор стекла до монтажа', 'Сохранение выравнивания фасада на поверхности 1 000 м²', 'Снижение передачи напряжений в стеклянные блоки'],
      sipanelSolution: 'SIPANEL разработала узлы крепления, допускающие смещения между конструкцией здания и стеклянным фасадом при сохранении выравнивания фасада.',
      engineeringDecision: 'Инженерное решение заключалось в отделении работы стекла от неконтролируемых перемещений конструкции с помощью узлов, снижающих передачу напряжений в панели.',
      selectedSystemLogic: 'Подход структурного стеклянного фасада применен, потому что учебному корпусу требовался прозрачный архитектурный контур с тщательно контролируемыми опорными интерфейсами.',
      coordinationNote: 'Опорные точки, выравнивание стеклянных блоков и допуски креплений были согласованы с основной конструкцией до монтажа.',
      executionDetail: 'Работы охватили примерно 1 000 м² стеклянного фасада с вниманием к выравниванию креплений, допускам опор и контролируемой установке стеклянных блоков.',
      procurementControl: 'Стеклянные блоки, аксессуары креплений и опорные компоненты были согласованы с утвержденной раскладкой фасада, чтобы снизить несовпадения при монтаже.',
      coordinationWithSiteTeam: 'Площадочная команда проверяла опорные реперы перед установкой стеклянных блоков, чтобы допуски креплений оставались в заданной последовательности монтажа.',
      qualityCheckpoints: ['Проверка узлов крепления до монтажа', 'Инспекция допусков опор и выравнивания стекла', 'Проверка непрерывности фасада по установленной поверхности'],
      measuredResult: 'Выполнено около 1 000 м² структурного стеклянного фасада. В проектной записи указано, что фасад, по сообщениям, остался без повреждения стекла во время землетрясения в Керманшахе в 1390-х годах солнечной хиджры.',
      measuredResultItems: [
        {label: 'Результат монтажа', value: 'Структурный стеклянный фасад установлен с узлами, учитывающими перемещения', verificationStatus: 'verified'},
        {label: 'Выполненная площадь', value: '1 000 м²', verificationStatus: 'verified'},
        {label: 'Зафиксированное наблюдение', value: 'Проектная запись сообщает об отсутствии повреждений стекла при землетрясении в Керманшахе в 1390-х годах солнечной хиджры', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'Разрушение стекла при движении конструкции', explanation: 'Узлы крепления снижали прямую передачу напряжений от основной конструкции в стеклянные панели.'},
        {risk: 'Отказ фасадных креплений', explanation: 'Опорные точки и допуски проверялись до установки стекла.'},
        {risk: 'Несовпадение конструкции и стеклянного фасада', explanation: 'Выравнивание фасада согласовывалось с реперами основной конструкции.'},
        {risk: 'Снижение безопасности пользователей здания', explanation: 'Узлы, учитывающие перемещения, снижали риск повреждения хрупких фасадных панелей при смещении конструкции.'}
      ],
      conversionHeadline: 'Нужна проверка фасадных соединений?',
      conversionText: 'Пришлите чертежи фасада и опорные детали, чтобы инженерная команда SIPANEL проверила логику креплений, допуски и последовательность монтажа.',
      conversionPrimaryCta: 'Запросить проверку фасадных узлов'
    }
  },
  'mehrabad-aircraft-hangar': {
    en: {
      metaDescription: 'Mehrabad Aircraft Hangar case study: 5,000 m² sandwich panel covering over a curved aircraft-hangar envelope with roof-wall interface and installation sequencing control.',
      shortSummary: 'A 5,000 m² aircraft-hangar envelope where curved geometry, access sequencing, substructure coordination, and roof-wall transitions controlled the final covering quality.',
      trustMicrocopy: 'Verified scope: sandwich panel covering, space-frame coordination, substructure alignment, roof-wall transitions, and installation checks.',
      primaryCta: 'Request Hangar Envelope Review',
      challenge: 'The hangar application required accurate sandwich panel covering over a continuous curved structure. Installation access, panel alignment, substructure coordination, and roof-wall transitions all affected weather protection and visual continuity.',
      challengePoints: ['Maintaining panel alignment on a curved hangar envelope', 'Coordinating covering details with the space frame and substructure', 'Managing access and installation sequence on a large enclosure', 'Controlling roof-wall transitions against water-ingress risk'],
      sipanelSolution: 'SIPANEL coordinated the space frame, substructure, panel layout, and installation sequence so the curved hangar form could be covered without losing geometric continuity.',
      engineeringDecision: 'Engineering teams defined installation references from the hangar geometry, coordinated support points, and reviewed transition details before site installation.',
      selectedSystemLogic: 'Sandwich panel covering was selected because it provides a lightweight, fast-installed industrial envelope that can be coordinated over curved roof and wall surfaces.',
      coordinationNote: 'Roof-wall interfaces, support references, panel laps, and access sequencing were coordinated before installation to reduce late correction on the hangar envelope.',
      executionDetail: 'Execution focused on controlled panel alignment over the curved surface, staged access, fastening checks, and transition detailing at roof and wall interfaces.',
      procurementControl: 'Panels, fasteners, flashings, and sealing accessories were coordinated with the approved layout so the field sequence could follow the curved geometry.',
      coordinationWithSiteTeam: 'The installation crew worked from geometry references and staged access points so alignment checks could be completed before closing each work zone.',
      qualityCheckpoints: ['Curved-surface panel alignment review', 'Roof-wall transition and flashing inspection', 'Fastening and sealing check before zone handover'],
      measuredResult: 'A 5,000 m² sandwich panel covering was executed while maintaining the continuous curved form of the aircraft hangar.',
      measuredResultItems: [
        {label: 'Execution result', value: 'Curved aircraft-hangar covering completed with controlled panel continuity', verificationStatus: 'verified'},
        {label: 'Executed area', value: '5,000 m²', verificationStatus: 'verified'},
        {label: 'System', value: 'Sandwich panel covering over curved hangar structure', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'Visual breaks on curved roof surface', explanation: 'Panel alignment was checked against hangar geometry references before each work zone was closed.'},
        {risk: 'Installation errors on curved geometry', explanation: 'Staged access and installation sequencing reduced uncontrolled field adjustment.'},
        {risk: 'Mismatch between structure and covering system', explanation: 'Substructure and support points were coordinated before panel installation.'},
        {risk: 'Water ingress at roof-wall transitions', explanation: 'Flashings, laps, and sealing points at transitions were treated as quality checkpoints.'}
      ],
      conversionHeadline: 'Need a hangar or large-envelope review?',
      conversionText: 'Send hangar geometry, roof-wall interface, or panel layout drawings so SIPANEL engineering can review sequencing and envelope-risk controls.',
      conversionPrimaryCta: 'Request Hangar Envelope Review'
    },
    fa: {
      metaDescription: 'مطالعه موردی آشیانه هواپیما مهرآباد: اجرای ۵٬۰۰۰ مترمربع پوشش ساندویچ‌پانل روی پوسته منحنی آشیانه با کنترل رابط سقف و دیوار و توالی نصب.',
      shortSummary: 'پوسته ۵٬۰۰۰ مترمربعی آشیانه هواپیما که در آن هندسه منحنی، توالی دسترسی، هماهنگی زیرسازی و انتقال سقف به دیوار کیفیت نهایی پوشش را تعیین می‌کرد.',
      trustMicrocopy: 'محدوده تأییدشده: پوشش ساندویچ‌پانل، هماهنگی سازه فضاکار، تراز زیرسازی، انتقال سقف به دیوار و کنترل نصب.',
      primaryCta: 'درخواست بررسی پوسته آشیانه',
      challenge: 'کاربری آشیانه هواپیما به اجرای دقیق پوشش ساندویچ‌پانل روی سازه منحنی پیوسته نیاز داشت. دسترسی نصب، تراز پانل، هماهنگی زیرسازی و انتقال سقف به دیوار همگی بر حفاظت در برابر آب‌وهوا و پیوستگی بصری اثر می‌گذاشتند.',
      challengePoints: ['حفظ تراز پانل روی پوسته منحنی آشیانه', 'هماهنگی جزئیات پوشش با سازه فضاکار و زیرسازی', 'مدیریت دسترسی و توالی نصب روی پوسته بزرگ', 'کنترل انتقال سقف به دیوار برای کاهش ریسک نفوذ آب'],
      sipanelSolution: 'سی‌پانل سازه فضاکار، زیرسازی، چیدمان پانل و توالی نصب را هماهنگ کرد تا فرم منحنی آشیانه بدون از دست رفتن پیوستگی هندسی پوشش داده شود.',
      engineeringDecision: 'تیم مهندسی رفرنس‌های نصب را از هندسه آشیانه تعریف کرد، نقاط تکیه‌گاه را هماهنگ نمود و جزئیات انتقال را پیش از اجرای کارگاهی بازبینی کرد.',
      selectedSystemLogic: 'پوشش ساندویچ‌پانل به دلیل وزن کم، سرعت نصب و امکان هماهنگی روی سطوح منحنی سقف و دیوار برای این پوسته صنعتی انتخاب شد.',
      coordinationNote: 'رابط‌های سقف و دیوار، رفرنس‌های تکیه‌گاه، همپوشانی پانل و توالی دسترسی پیش از نصب هماهنگ شد تا اصلاح دیرهنگام روی پوسته آشیانه کاهش یابد.',
      executionDetail: 'اجرا بر کنترل تراز پانل روی سطح منحنی، دسترسی مرحله‌ای، کنترل اتصال و جزئیات انتقال در رابط سقف و دیوار متمرکز بود.',
      procurementControl: 'پانل‌ها، پیچ‌ها، فلاشینگ‌ها و اکسسوری‌های آب‌بندی با چیدمان تأییدشده هماهنگ شد تا توالی کارگاه با هندسه منحنی پیش برود.',
      coordinationWithSiteTeam: 'تیم نصب بر اساس رفرنس‌های هندسی و نقاط دسترسی مرحله‌ای کار کرد تا پیش از بستن هر زون، کنترل تراز انجام شود.',
      qualityCheckpoints: ['بازبینی تراز پانل روی سطح منحنی', 'بازرسی انتقال سقف به دیوار و فلاشینگ', 'کنترل اتصال و آب‌بندی پیش از تحویل هر زون'],
      measuredResult: 'پوشش ساندویچ‌پانل ۵٬۰۰۰ مترمربعی اجرا شد و فرم منحنی پیوسته آشیانه هواپیما حفظ گردید.',
      measuredResultItems: [
        {label: 'نتیجه اجرا', value: 'پوشش منحنی آشیانه با پیوستگی کنترل‌شده پانل تکمیل شد', verificationStatus: 'verified'},
        {label: 'مساحت اجراشده', value: '۵٬۰۰۰ مترمربع', verificationStatus: 'verified'},
        {label: 'سامانه', value: 'پوشش ساندویچ‌پانل روی سازه منحنی آشیانه', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'شکست بصری روی سطح منحنی سقف', explanation: 'تراز پانل با رفرنس‌های هندسی آشیانه پیش از بسته شدن هر زون کنترل شد.'},
        {risk: 'خطای نصب روی هندسه منحنی', explanation: 'دسترسی مرحله‌ای و توالی نصب ریسک اصلاح کنترل‌نشده در کارگاه را کاهش داد.'},
        {risk: 'ناهماهنگی سازه و سیستم پوشش', explanation: 'زیرسازی و نقاط تکیه‌گاه پیش از نصب پانل هماهنگ شد.'},
        {risk: 'نفوذ آب در انتقال سقف به دیوار', explanation: 'فلاشینگ، همپوشانی و نقاط آب‌بندی در انتقال‌ها به‌عنوان کنترل کیفیت بررسی شدند.'}
      ],
      conversionHeadline: 'نیاز به بررسی آشیانه یا پوسته بزرگ دارید؟',
      conversionText: 'نقشه هندسه آشیانه، رابط سقف و دیوار یا چیدمان پانل را ارسال کنید تا تیم مهندسی سی‌پانل توالی اجرا و کنترل ریسک پوسته را بررسی کند.',
      conversionPrimaryCta: 'درخواست بررسی پوسته آشیانه'
    },
    ar: {
      metaDescription: 'دراسة حالة حظيرة الطائرات في مهرآباد: تغطية ٥٬٠٠٠ م² بألواح ساندويتش فوق غلاف منحني مع ضبط واجهة السقف والجدار وتسلسل التركيب.',
      shortSummary: 'غلاف حظيرة طائرات بمساحة ٥٬٠٠٠ م² حيث حدّدت الهندسة المنحنية وتسلسل الوصول وتنسيق البنية الحاملة وانتقالات السقف إلى الجدار جودة الغطاء النهائي.',
      trustMicrocopy: 'النطاق المؤكد: تغطية بألواح ساندويتش، تنسيق الهيكل الفراغي، محاذاة البنية الحاملة، انتقالات السقف والجدار وفحوص التركيب.',
      primaryCta: 'اطلب مراجعة غلاف حظيرة',
      challenge: 'تطلّب تطبيق حظيرة الطائرات تغطية دقيقة بألواح الساندويتش فوق بنية منحنية متصلة. وقد أثرت إمكانية الوصول للتركيب ومحاذاة الألواح وتنسيق البنية الحاملة وانتقالات السقف إلى الجدار في الحماية الجوية والاستمرارية البصرية.',
      challengePoints: ['الحفاظ على محاذاة الألواح على غلاف الحظيرة المنحني', 'تنسيق تفاصيل الغطاء مع الهيكل الفراغي والبنية الحاملة', 'إدارة الوصول وتسلسل التركيب على غلاف كبير', 'ضبط انتقالات السقف والجدار لتقليل مخاطر دخول المياه'],
      sipanelSolution: 'نسّقت SIPANEL الهيكل الفراغي والبنية الحاملة وتوزيع الألواح وتسلسل التركيب حتى يمكن تغطية شكل الحظيرة المنحني دون فقدان الاستمرارية الهندسية.',
      engineeringDecision: 'حدّد الفريق الهندسي مراجع التركيب من هندسة الحظيرة، ونسّق نقاط الدعم، وراجع تفاصيل الانتقال قبل التركيب في الموقع.',
      selectedSystemLogic: 'اختيرت تغطية ألواح الساندويتش لأنها توفر غلافاً صناعياً خفيفاً وسريع التركيب يمكن تنسيقه فوق أسطح السقف والجدار المنحنية.',
      coordinationNote: 'نُسّقت واجهات السقف والجدار ومراجع الدعم وتراكبات الألواح وتسلسل الوصول قبل التركيب لتقليل التصحيحات المتأخرة على غلاف الحظيرة.',
      executionDetail: 'ركز التنفيذ على ضبط محاذاة الألواح فوق السطح المنحني، والوصول المرحلي، وفحوص التثبيت، وتفاصيل الانتقال عند واجهات السقف والجدار.',
      procurementControl: 'نُسّقت الألواح والمثبتات والفلاشينغ وملحقات الختم مع التوزيع المعتمد حتى يتبع تسلسل الموقع الهندسة المنحنية.',
      coordinationWithSiteTeam: 'عمل طاقم التركيب من مراجع هندسية ونقاط وصول مرحلية كي تكتمل فحوص المحاذاة قبل إغلاق كل منطقة عمل.',
      qualityCheckpoints: ['مراجعة محاذاة الألواح على السطح المنحني', 'فحص انتقال السقف إلى الجدار والفلاشينغ', 'فحص التثبيت والختم قبل تسليم كل منطقة'],
      measuredResult: 'تم تنفيذ تغطية ألواح ساندويتش بمساحة ٥٬٠٠٠ م² مع الحفاظ على الشكل المنحني المتصل لحظيرة الطائرات.',
      measuredResultItems: [
        {label: 'نتيجة التنفيذ', value: 'اكتمل غطاء الحظيرة المنحني باستمرارية ألواح مضبوطة', verificationStatus: 'verified'},
        {label: 'المساحة المنفذة', value: '٥٬٠٠٠ م²', verificationStatus: 'verified'},
        {label: 'النظام', value: 'تغطية ألواح ساندويتش فوق هيكل حظيرة منحني', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'انقطاعات بصرية على سطح السقف المنحني', explanation: 'تم فحص محاذاة الألواح مقابل مراجع هندسة الحظيرة قبل إغلاق كل منطقة عمل.'},
        {risk: 'أخطاء تركيب على الهندسة المنحنية', explanation: 'قلل الوصول المرحلي وتسلسل التركيب من التعديلات غير المضبوطة في الموقع.'},
        {risk: 'عدم تطابق الهيكل ونظام الغطاء', explanation: 'نُسّقت البنية الحاملة ونقاط الدعم قبل تركيب الألواح.'},
        {risk: 'دخول المياه عند انتقال السقف إلى الجدار', explanation: 'عوملت الفلاشينغ والتراكبات ونقاط الختم في الانتقالات كنقاط ضبط جودة.'}
      ],
      conversionHeadline: 'تحتاج إلى مراجعة حظيرة أو غلاف كبير؟',
      conversionText: 'أرسل هندسة الحظيرة أو واجهة السقف والجدار أو رسومات توزيع الألواح ليراجع فريق SIPANEL الهندسي التسلسل وضوابط مخاطر الغلاف.',
      conversionPrimaryCta: 'اطلب مراجعة غلاف حظيرة'
    },
    ru: {
      metaDescription: 'Кейс авиационного ангара Мехрабад: 5 000 м² покрытия из сэндвич-панелей по кривому контуру ангара с контролем переходов кровли к стенам и последовательности монтажа.',
      shortSummary: 'Контур авиационного ангара площадью 5 000 м², где кривая геометрия, доступ, координация подсистемы и переходы кровли к стенам определяли итоговое качество покрытия.',
      trustMicrocopy: 'Подтвержденный объем: покрытие из сэндвич-панелей, координация пространственной конструкции, выравнивание подсистемы, переходы кровли к стенам и монтажные проверки.',
      primaryCta: 'Запросить проверку контура ангара',
      challenge: 'Ангар требовал точного покрытия из сэндвич-панелей по непрерывной кривой конструкции. Монтажный доступ, выравнивание панелей, координация подсистемы и переходы кровли к стенам влияли на погодную защиту и визуальную непрерывность.',
      challengePoints: ['Сохранение выравнивания панелей на кривом контуре ангара', 'Координация деталей покрытия с пространственной конструкцией и подсистемой', 'Управление доступом и последовательностью монтажа на крупном контуре', 'Контроль переходов кровли к стенам для снижения риска проникновения воды'],
      sipanelSolution: 'SIPANEL скоординировала пространственную конструкцию, подсистему, раскладку панелей и последовательность монтажа, чтобы кривую форму ангара можно было закрыть без потери геометрической непрерывности.',
      engineeringDecision: 'Инженерная команда задала монтажные реперы от геометрии ангара, согласовала опорные точки и проверила переходные детали до работ на площадке.',
      selectedSystemLogic: 'Покрытие из сэндвич-панелей выбрано, потому что оно дает легкий и быстро монтируемый промышленный контур, который можно согласовать по кривым поверхностям кровли и стен.',
      coordinationNote: 'Переходы кровли к стенам, опорные реперы, нахлесты панелей и последовательность доступа были согласованы до монтажа, чтобы снизить поздние исправления на контуре ангара.',
      executionDetail: 'Работы были сосредоточены на контролируемом выравнивании панелей по кривой поверхности, поэтапном доступе, проверке крепежа и деталях переходов кровли к стенам.',
      procurementControl: 'Панели, крепеж, примыкания и аксессуары герметизации согласованы с утвержденной раскладкой, чтобы площадочная последовательность следовала кривой геометрии.',
      coordinationWithSiteTeam: 'Монтажная бригада работала по геометрическим реперам и поэтапным точкам доступа, чтобы проверки выравнивания завершались до закрытия каждой зоны.',
      qualityCheckpoints: ['Проверка выравнивания панелей на кривой поверхности', 'Инспекция переходов кровли к стенам и примыканий', 'Проверка крепежа и герметизации перед сдачей зоны'],
      measuredResult: 'Покрытие из сэндвич-панелей площадью 5 000 м² выполнено с сохранением непрерывной кривой формы авиационного ангара.',
      measuredResultItems: [
        {label: 'Результат монтажа', value: 'Кривое покрытие ангара завершено с контролируемой непрерывностью панелей', verificationStatus: 'verified'},
        {label: 'Выполненная площадь', value: '5 000 м²', verificationStatus: 'verified'},
        {label: 'Система', value: 'Сэндвич-панельное покрытие по кривой конструкции ангара', verificationStatus: 'verified'}
      ],
      riskItems: [
        {risk: 'Визуальные разрывы на кривой кровле', explanation: 'Выравнивание панелей проверялось по геометрическим реперам ангара до закрытия каждой зоны.'},
        {risk: 'Ошибки монтажа на кривой геометрии', explanation: 'Поэтапный доступ и монтажная последовательность снизили неконтролируемые корректировки на площадке.'},
        {risk: 'Несовпадение конструкции и системы покрытия', explanation: 'Подсистема и опорные точки согласовывались до установки панелей.'},
        {risk: 'Проникновение воды на переходах кровли к стенам', explanation: 'Примыкания, нахлесты и точки герметизации на переходах стали контрольными точками качества.'}
      ],
      conversionHeadline: 'Нужна проверка ангара или крупного контура?',
      conversionText: 'Пришлите геометрию ангара, узлы перехода кровли к стенам или раскладку панелей, и инженерная команда SIPANEL проверит последовательность и контроль рисков контура.',
      conversionPrimaryCta: 'Запросить проверку контура ангара'
    }
  }
};

const initialCaseStudies: InitialCaseStudyConfig[] = [
  {
    slug: 'army-hospital',
    detailLayout: 'case-study-only',
    projectName: {
      en: '32-Bed Military Hospital',
      fa: 'بیمارستان ۳۲ تختخوابی ارتش',
      ar: 'مستشفى عسكري بسعة ٣٢ سريراً',
      ru: 'Военный госпиталь на 32 койки'
    },
    projectType: {
      en: 'Emergency hospital — Full EPC delivery',
      fa: 'بیمارستان اضطراری — تحویل کامل EPC',
      ar: 'مستشفى طوارئ — تسليم EPC كامل',
      ru: 'Экстренный госпиталь — полная поставка EPC'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Raz & Jargalan, North Khorasan, Iran',
    area: '1,000 m²',
    challenge: 'During the COVID-19 emergency, a fully operational 32-bed military hospital was needed from excavation to readiness in under 50 days, requiring full EPC coordination.',
    sipanelSolution: 'SIPANEL delivered the complete project scope including engineering, shop drawings, excavation, construction, sandwich panel envelope, internal partitions, and full installation readiness.',
    engineeringDecision: 'Engineering teams coordinated full EPC delivery — from excavation and structural construction to sandwich panel envelope, internal partitions, and final readiness — within an emergency timeline.',
    executionDetail: 'Execution followed a compressed 50-day schedule covering excavation, construction, sandwich panel cladding, internal partitioning, and installation to operational readiness.',
    measuredResult: 'A fully operational 32-bed military hospital was delivered from excavation to readiness in less than 50 days during the COVID-19 emergency.',
    riskPrevented: ['Schedule overrun beyond 50-day target', 'Coordination failures across EPC disciplines', 'Envelope weather protection delays', 'Internal partition installation bottlenecks'],
    cardImage: armyHospitalHero,
    heroVideo: {
      src: '/videos/projects/army-hospital/army-hospital-case-study.mp4',
      poster: '/videos/projects/army-hospital/army-hospital-case-study-poster.jpg',
      title: {
        en: 'Army Hospital Project Video',
        fa: 'ویدئوی پروژه بیمارستان ارتش',
        ar: 'فيديو مشروع مستشفى الجيش',
        ru: 'Видео проекта военного госпиталя'
      }
    },
    resourceTitle: {
      en: 'Panel Selection Guide',
      fa: 'راهنمای انتخاب پانل',
      ar: 'دليل اختيار الألواح',
      ru: 'Руководство по выбору панелей'
    },
    localeOverrides: {
      fa: {
        metaDescription: 'مطالعه موردی بیمارستان ۳۲ تختخوابی ارتش: تحویل کامل EPC از خاکبرداری تا آمادگی بهره‌برداری در کمتر از ۵۰ روز با پوشش ساندویچ‌پانل و پارتیشن داخلی.',
        shortSummary: 'تحویل بیمارستان عملیاتی از خاکبرداری تا آمادگی بهره‌برداری در کمتر از ۵۰ روز، در شرایط اضطراری کرونا.',
        trustMicrocopy: 'تحویل کامل مهندسی، تأمین و اجرا توسط سی‌پانل',
        primaryCta: 'برای پروژه‌های زمان‌بحرانی مشاوره بگیرید',
        snapshotDuration: 'کمتر از ۵۰ روز',
        challenge: 'در شرایط اضطراری کرونا، بیمارستان نظامی ۳۲ تختخوابی از خاکبرداری تا آمادگی بهره‌برداری در کمتر از ۵۰ روز نیاز بود و هماهنگی کامل EPC ضروری بود.',
        challengePoints: [
          'تأخیر زمانی فراتر از هدف ۵۰ روزه',
          'ناهماهنگی بین رشته‌های مهندسی، تأمین و اجرا',
          'تأخیر در نصب پوشانه و حفاظت آب‌وهوایی',
          'گلوگاه نصب پارتیشن‌های داخلی'
        ],
        sipanelSolution: 'سی‌پانل تمام محدوده پروژه شامل مهندسی، شاپ‌دراوینگ، خاکبرداری، ساخت، پوشانه ساندویچ پانل، پارتیشن‌های داخلی و آماده‌سازی نهایی نصب را تحویل داد.',
        engineeringDecision: 'تیم‌های مهندسی تحویل کامل EPC را هماهنگ کردند — از خاکبرداری و ساخت سازه تا پوشانه ساندویچ پانل، پارتیشن‌های داخلی و آماده‌سازی نهایی — در چارچوب زمان‌بندی اضطراری.',
        executionDetail: 'اجرا طبق برنامه فشرده ۵۰ روزه شامل خاکبرداری، ساخت، نصب ساندویچ پانل، پارتیشن‌بندی داخلی و آماده‌سازی تا بهره‌برداری انجام شد.',
        measuredResult: 'بیمارستان نظامی ۳۲ تختخوابی از خاکبرداری تا آمادگی بهره‌برداری در کمتر از ۵۰ روز در شرایط اضطراری کرونا تحویل داده شد.',
        riskItems: [
          {risk: 'تأخیر زمانی فراتر از هدف ۵۰ روزه', explanation: 'برنامه‌ریزی فشرده و هماهنگی روزانه تیم‌های مهندسی، تأمین و اجرا برای جلوگیری از تأخیر.'},
          {risk: 'ناهماهنگی بین رشته‌های EPC', explanation: 'مدیریت یکپارچه EPC از خاکبرداری تا تحویل نهایی برای حذف ریسک ناهماهنگی.'},
          {risk: 'تأخیر در حفاظت آب‌وهوایی پوشانه', explanation: 'نصب کنترل‌شده ساندویچ پانل سقف و دیوار طبق برنامه زمانی مهندسی‌شده.'},
          {risk: 'گلوگاه نصب پارتیشن‌های داخلی', explanation: 'هماهنگی نصب پارتیشن‌های داخلی با تیم سازه و تأسیسات برای جلوگیری از گلوگاه.'}
        ],
        conversionHeadline: 'پروژه زمان‌بحرانی دارید؟',
        conversionText: 'نقشه‌ها یا اطلاعات پروژه را ارسال کنید تا تیم مهندسی سی‌پانل محدوده، ریسک‌ها و زمان‌بندی را بررسی کند.',
        conversionPrimaryCta: 'برای پروژه‌های زمان‌بحرانی مشاوره بگیرید'
      },
      en: {
        metaDescription: '32-bed Military Hospital case study: full EPC delivery from excavation to operational readiness in less than 50 days with sandwich panel envelope and internal partitions.',
        shortSummary: 'Operational hospital delivered from excavation to readiness in less than 50 days during the COVID-19 emergency.',
        trustMicrocopy: 'Full EPC delivery by SIPANEL — engineering, procurement, and construction.',
        primaryCta: 'Discuss a Time-Critical Project',
        snapshotDuration: 'Less than 50 days',
        riskItems: [
          {risk: 'Schedule overrun beyond 50-day target', explanation: 'Compressed scheduling with daily coordination across engineering, procurement, and execution teams.'},
          {risk: 'Coordination failures across EPC disciplines', explanation: 'Integrated EPC management from excavation to final handover, eliminating coordination gaps.'},
          {risk: 'Envelope weather protection delays', explanation: 'Controlled sandwich panel installation for roof and walls following an engineered timeline.'},
          {risk: 'Internal partition installation bottlenecks', explanation: 'Coordinated interior partition sequencing with structural and MEP teams to prevent bottlenecks.'}
        ],
        conversionHeadline: 'Have a time-critical project?',
        conversionText: 'Send project drawings or context so SIPANEL engineering can review scope, risks, and timeline.',
        conversionPrimaryCta: 'Discuss a Time-Critical Project'
      },
      ar: {
        metaDescription: 'دراسة حالة مستشفى عسكري بسعة ٣٢ سريراً: تسليم EPC كامل من الحفر إلى الجاهزية التشغيلية في أقل من ٥٠ يوماً مع غلاف ألواح ساندويتش وقواطع داخلية.',
        shortSummary: 'تسليم مستشفى جاهز للتشغيل من الحفر حتى الجاهزية في أقل من ٥٠ يوماً خلال جائحة كورونا.',
        trustMicrocopy: 'تسليم EPC كامل بواسطة SIPANEL — الهندسة والتوريد والتنفيذ.',
        primaryCta: 'ناقش مشروعاً حرجاً زمنياً',
        snapshotDuration: 'أقل من ٥٠ يوماً',
        conversionHeadline: 'لديك مشروع حرج زمنياً؟',
        conversionText: 'أرسل رسومات المشروع أو سياقه ليراجع فريق SIPANEL الهندسي النطاق والمخاطر والجدول الزمني.',
        conversionPrimaryCta: 'ناقش مشروعاً حرجاً زمنياً'
      },
      ru: {
        metaDescription: 'Кейс военного госпиталя на 32 койки: полный EPC от земляных работ до эксплуатационной готовности менее чем за 50 дней с оболочкой из сэндвич-панелей.',
        shortSummary: 'Операционный госпиталь сдан от котлована до готовности менее чем за 50 дней в условиях пандемии COVID-19.',
        trustMicrocopy: 'Полная поставка EPC от SIPANEL — проектирование, снабжение и строительство.',
        primaryCta: 'Обсудить срочный проект',
        snapshotDuration: 'Менее 50 дней',
        conversionHeadline: 'Есть срочный проект?',
        conversionText: 'Отправьте чертежи или описание проекта для оценки объёма, рисков и сроков командой SIPANEL.',
        conversionPrimaryCta: 'Обсудить срочный проект'
      }
    }
  },
  {
    slug: 'shahre-babak-hall',
    projectName: localized('Shahr Babak Wrestling Hall'),
    projectType: localized('Multi-dome wrestling sports complex'),
    mainService: zipRoofingService,
    serviceHref: '/systems/standing-seam-zip-tech-roofing',
    location: 'Shahr Babak, Kerman, Iran',
    area: '900 m2',
    challenge: 'Multiple dome-shaped sports halls required curved ZIP panel coordination, structural alignment, waterproofing continuity, and visually consistent roof finishing.',
    sipanelSolution: 'SIPANEL developed an engineered ZIP panel roofing system optimized for curved dome geometry, waterproofing integration, and multi-structure installation coordination.',
    engineeringDecision: 'Engineering teams prepared coordinated shop drawings, curved ZIP panel layouts, waterproofing details, and installation sequencing strategies to maintain dome symmetry and drainage continuity.',
    executionDetail: 'Installation followed controlled curved-surface procedures, alignment checkpoints, fastening verification, and coordinated sealing workflows.',
    measuredResult: 'Three structurally coordinated dome-shaped wrestling halls were delivered with reliable ZIP panel roof performance and controlled installation quality.',
    riskPrevented: ['Curved roof alignment errors', 'Water penetration at dome transitions', 'ZIP panel deformation', 'Installation sequencing conflicts'],
    cardImage: shahrBabakHallCard,
    heroImage: shahrBabakHallHero,
    resourceTitle: localized('Roof Leakage Prevention Checklist')
  },
  {
    slug: 'sepehan-flower-market',
    projectName: localized('Sepehan Flower Market'),
    projectType: localized('Commercial sandwich panel roofing system'),
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Dorcheh, Isfahan, Iran',
    area: '3,500 m2',
    challenge: 'A large commercial flower market required durable sandwich panel roofing, fast installation speed, waterproofing performance, and clean architectural finishing.',
    sipanelSolution: 'SIPANEL prepared coordinated engineering drawings and optimized sandwich panel layouts to support fast-track execution and efficient material usage.',
    engineeringDecision: 'Engineering teams selected installation sequencing strategies, panel alignment coordination, and sealing checkpoints to reduce waste and maintain weather protection.',
    executionDetail: 'Installation was executed from approved shop drawings with panel coordination, fastening verification, and sealing inspection checkpoints.',
    measuredResult: 'A durable commercial sandwich panel roofing system was delivered with reliable weather protection, optimized installation efficiency, and clean finished appearance.',
    riskPrevented: ['Installation alignment errors', 'Material waste', 'Water penetration', 'Improper panel sealing'],
    cardImage: bazargolCard,
    heroImage: bazargolHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'shahr-babak-stadium-entrance',
    projectName: localized('Shahr Babak Stadium Entrance'),
    projectType: localized('Curved architectural stadium entrance facade'),
    mainService: claddingService,
    serviceHref: '/systems/aluminium-cladding-covering',
    location: 'Shahr Babak, Kerman, Iran',
    area: '700 m2',
    challenge: 'A complex curved stadium entrance required precise aluminium cladding detailing, adaptable surface coordination, waterproofing continuity, and seamless facade integration.',
    sipanelSolution: 'SIPANEL developed a customized aluminium cladding and flashing system optimized for curved architectural geometry and structural integration.',
    engineeringDecision: 'Engineering teams combined aluminium cladding methods, curved flashing details, and installation sequencing to maintain architectural continuity and drainage control.',
    executionDetail: 'Execution followed precision shop drawings, curvature alignment checkpoints, controlled sequencing, and coordinated sealing workflows.',
    measuredResult: 'A visually distinctive aluminium-clad stadium entrance was delivered with precise architectural finishing and weather-resistant performance.',
    riskPrevented: ['Facade alignment errors', 'Water penetration at curved transitions', 'Surface waviness', 'Flashing inconsistencies'],
    cardImage: babakSardarbCard,
    heroImage: babakSardarbHero,
    resourceTitle: localized('Shop Drawing Review Guide')
  },
  {
    slug: 'andimeshk-stadium',
    detailLayout: 'case-study-only',
    projectName: {
      en: 'Andimeshk Stadium',
      fa: 'استادیوم اندیمشک',
      ar: 'استاد أنديمشك',
      ru: 'Стадион Андимешк'
    },
    projectType: {
      en: 'Curved stadium roof — sandwich panel envelope',
      fa: 'سقف منحنی استادیوم — پوشش ساندویچ‌پانل',
      ar: 'سقف ملعب منحنٍ — غلاف بألواح ساندويتش',
      ru: 'Изогнутая кровля стадиона — сэндвич-панельный контур'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Andimeshk, Khuzestan, Iran',
    area: '6,000 m²',
    challenge: 'A large double-curved stadium roof required precise sandwich panel coordination, structural alignment accuracy, waterproofing continuity, and controlled installation.',
    sipanelSolution: 'SIPANEL engineered a coordinated sandwich panel roofing system optimized for the stadium double-arched structure.',
    engineeringDecision: 'Engineering teams prepared structural alignment studies, sandwich panel layout drawings, drainage coordination details, and installation sequencing strategies.',
    executionDetail: 'Installation teams followed engineered sequencing, fastening coordination, alignment checkpoints, and sealing verification workflows.',
    measuredResult: 'A durable stadium roof was delivered with reliable sandwich panel performance, accurate curved geometry, and controlled installation quality.',
    riskPrevented: ['Sandwich panel deformation', 'Drainage failures', 'Structural misalignment', 'Water penetration'],
    cardImage: andimeshkCard,
    heroImage: andimeshkHero,
    resourceTitle: localized('Panel Selection Guide'),
    relatedSlugs: ['shahre-babak-hall', 'tabas-railway-facility', 'gonabad-university-sports-hall'],
    localeOverrides: {
      fa: {
        shortSummary: 'اجرای سقف منحنی استادیوم اندیمشک با سامانه ساندویچ‌پانل در پوسته‌ای با دهانه بزرگ و مساحت ۶٬۰۰۰ مترمربع؛ با کنترل هندسه قوسی، مسیر زهکشی و پیوستگی آب‌بندی.',
        trustMicrocopy: 'مرجع اجرای پوشش صنعتی سقف‌های منحنی و دهانه‌بلند توسط سی‌پانل.',
        primaryCta: 'درخواست بررسی مهندسی سقف منحنی',
        challenge: 'استادیوم اندیمشک به یک سقف منحنی با دهانه بزرگ نیاز داشت که در آن هندسه قوسی، چیدمان دقیق پانل، مسیر زهکشی روی سطح منحنی و پیوستگی آب‌بندی باید هم‌زمان کنترل می‌شد. کوچک‌ترین انحراف در ترازِ پانل روی سطح منحنی می‌توانست به ناپیوستگی درز، ایستایی آب و نشت منجر شود.',
        challengePoints: [
          'کنترل هندسه قوسی و تراز پانل روی سطح منحنی',
          'طراحی مسیر زهکشی پیوسته روی سقف منحنی بدون نقطه ایستایی آب',
          'حفظ پیوستگی آب‌بندی در درزها و محل عبور تأسیسات از سقف',
          'مهار تغییرشکل و حرکت حرارتی پانل در دهانه بزرگ'
        ],
        sipanelSolution: 'سی‌پانل یک سامانه سقف ساندویچ‌پانل هماهنگ‌شده متناسب با ساختار منحنی استادیوم طراحی کرد؛ شامل بهینه‌سازی چیدمان پانل بر اساس انحنای سقف، یکپارچه‌سازی جزئیات آب‌بندی و هماهنگی پانل با سازه زیرین.',
        engineeringDecision: 'تیم مهندسی پیش از اجرا، مطالعات تراز سازه‌ای، نقشه‌های چیدمان پانل روی سطح منحنی، جزئیات هماهنگی زهکشی و توالی نصب را تهیه کرد تا دقت هندسی و عملکرد بلندمدت سقف تضمین شود.',
        selectedSystemLogic: 'سامانه ساندویچ‌پانل سقفی به‌دلیل نسبت بالای استحکام به وزن، پیوستگی پوسته عایق و سازگاری با سطوح منحنی برای این دهانه انتخاب شد.',
        coordinationNote: 'چیدمان پانل، مسیر زهکشی و محل عبور تأسیسات پیش از نصب با سازه و معماری هماهنگ شد تا درزها و نقاط نفوذ روی سطح منحنی به حداقل برسد.',
        executionDetail: 'نصب طبق توالی مهندسی‌شده انجام شد: استقرار از مرجع هندسی سقف، کنترل تراز در ایستگاه‌های بازرسی، هماهنگی اتصالات و پایش آب‌بندی درزها در هر مرحله، برای حفظ دقت قوس و پیوستگی پوشش.',
        procurementControl: 'پانل‌ها و متعلقات آب‌بندی متناسب با چیدمان منحنی و طول دهانه‌ها تأمین شد تا برش و پرت در کارگاه کاهش یابد و انطباق ابعادی حفظ شود.',
        coordinationWithSiteTeam: 'اجرا با هماهنگی پیوسته میان تیم مهندسی و تیم نصب کارگاه و بر پایه نقشه‌های تأییدشده پیش رفت.',
        qualityCheckpoints: [
          'کنترل تراز و انطباق هندسی پانل روی سطح منحنی',
          'بازرسی پیوستگی مسیر زهکشی پیش از تکمیل پوشش',
          'پایش آب‌بندی درزها و محل عبور تأسیسات'
        ],
        measuredResultItems: [
          {label: 'نتیجه اجرا', value: 'سقف منحنی با هندسه دقیق و پوشش پیوسته تکمیل شد', verificationStatus: 'verified'},
          {label: 'مساحت اجراشده', value: '۶٬۰۰۰ مترمربع', verificationStatus: 'verified'},
          {label: 'سامانه', value: 'ساندویچ‌پانل سقف منحنی', verificationStatus: 'verified'}
        ],
        riskItems: [
          {risk: 'هندسه سقف منحنی و تراز پانل', explanation: 'ریسک: انحراف تراز پانل روی سطح منحنی به ناپیوستگی درز و افت کیفیت ظاهری منجر می‌شود. کنترل سی‌پانل: استقرار از مرجع هندسی سقف و بازرسی تراز مرحله‌ای. اهمیت برای کارفرما: پوسته‌ای یکپارچه و دقیق با ظاهر معماری مطلوب.'},
          {risk: 'مسیر زهکشی روی سطح منحنی', explanation: 'ریسک: نقاط ایستایی آب روی سقف منحنی موجب بار اضافی و نشت می‌شود. کنترل سی‌پانل: طراحی مسیر زهکشی پیوسته و بازرسی آن پیش از تکمیل پوشش. اهمیت برای کارفرما: دفع مطمئن آب باران و کاهش ریسک نشت بلندمدت.'},
          {risk: 'مهار تغییرشکل در دهانه بزرگ', explanation: 'ریسک: تغییرشکل و حرکت حرارتی پانل در دهانه بلند به تنش و بازشدگی درز منجر می‌شود. کنترل سی‌پانل: چیدمان و جزئیات اتصال متناسب با طول دهانه و حرکت حرارتی. اهمیت برای کارفرما: پایداری سقف و کاهش نیاز به تعمیر.'},
          {risk: 'آب‌بندی درز و محل عبور تأسیسات', explanation: 'ریسک: درزها و نقاط عبور تأسیسات از سقف مستعدترین نقاط نشت هستند. کنترل سی‌پانل: جزئیات آب‌بندی یکپارچه و پایش درزها حین نصب. اهمیت برای کارفرما: پوسته آب‌بند و قابل‌اتکا در طول بهره‌برداری.'}
        ],
        conversionHeadline: 'سقف منحنی یا پروژه دهانه‌بلند دارید؟',
        conversionText: 'نقشه‌ها یا مشخصات سقف منحنی، استادیوم یا پوسته دهانه‌بزرگ خود را ارسال کنید تا تیم مهندسی سی‌پانل هندسه، زهکشی و جزئیات آب‌بندی را بررسی و راهکار اجرایی ارائه کند.',
        conversionPrimaryCta: 'درخواست بررسی مهندسی سقف منحنی'
      },
      en: {
        shortSummary: 'Execution of the Andimeshk Stadium curved roof with a sandwich panel system over a 6,000 m² large-span envelope — controlling curved geometry, drainage paths, and waterproofing continuity.',
        trustMicrocopy: 'A SIPANEL reference for curved, large-span industrial roof envelopes.',
        primaryCta: 'Request a Curved-Roof Engineering Review',
        challenge: 'Andimeshk Stadium required a large-span curved roof where curved geometry, panel alignment, drainage on the curved surface, and waterproofing continuity all had to be controlled together. Small alignment deviations on the curved surface could cause joint discontinuity, standing water, and leakage.',
        challengePoints: [
          'Controlling curved geometry and panel alignment on a curved surface',
          'Designing a continuous drainage path across the curved roof with no standing-water points',
          'Maintaining waterproofing continuity at joints and roof penetrations',
          'Controlling panel deformation and thermal movement across the large span'
        ],
        sipanelSolution: 'SIPANEL engineered a coordinated sandwich panel roofing system matched to the stadium\'s curved structure — including curvature-based panel layout optimisation, integrated waterproofing detailing, and panel-to-structure coordination.',
        engineeringDecision: 'Before installation, the engineering team prepared structural alignment studies, curved-surface panel layout drawings, drainage coordination details, and an installation sequence to secure geometric accuracy and long-term roof performance.',
        selectedSystemLogic: 'A sandwich panel roof system was selected for its high strength-to-weight ratio, continuous insulated envelope, and suitability for curved surfaces over this span.',
        coordinationNote: 'Panel layout, drainage paths, and penetration locations were coordinated with the structure and architecture before installation to minimise joints and leak points on the curved surface.',
        executionDetail: 'Installation followed an engineered sequence: setting out from the roof geometry reference, alignment control at inspection checkpoints, connection coordination, and stage-by-stage joint waterproofing checks to preserve curvature accuracy and envelope continuity.',
        procurementControl: 'Panels and waterproofing accessories were supplied to suit the curved layout and span lengths, reducing on-site cutting and waste while maintaining dimensional fit.',
        coordinationWithSiteTeam: 'Execution proceeded with continuous coordination between the engineering team and the site installation crew, based on approved drawings.',
        qualityCheckpoints: [
          'Panel alignment and geometric fit checks on the curved surface',
          'Drainage path continuity inspection before envelope completion',
          'Joint and penetration waterproofing monitoring'
        ],
        measuredResultItems: [
          {label: 'Execution result', value: 'Curved roof completed to accurate geometry with a continuous envelope', verificationStatus: 'verified'},
          {label: 'Executed area', value: '6,000 m²', verificationStatus: 'verified'},
          {label: 'System', value: 'Curved sandwich panel roofing', verificationStatus: 'verified'}
        ],
        riskItems: [
          {risk: 'Curved roof geometry and panel alignment', explanation: 'Risk: alignment deviation on the curved surface causes joint discontinuity and a poor finish. SIPANEL control: setting out from the roof geometry reference with staged alignment inspection. Why it matters: a continuous, accurate envelope with the intended architectural appearance.'},
          {risk: 'Drainage path on the curved surface', explanation: 'Risk: standing-water points on a curved roof add load and cause leaks. SIPANEL control: a continuous drainage path, inspected before the envelope is closed. Why it matters: reliable rainwater removal and reduced long-term leak risk.'},
          {risk: 'Deformation control across the large span', explanation: 'Risk: panel deformation and thermal movement across a long span create stress and joint opening. SIPANEL control: layout and connection detailing matched to span length and thermal movement. Why it matters: a stable roof with less need for repair.'},
          {risk: 'Joint and penetration waterproofing', explanation: 'Risk: joints and roof penetrations are the most leak-prone points. SIPANEL control: integrated waterproofing detailing and joint monitoring during installation. Why it matters: a watertight, dependable envelope throughout service life.'}
        ],
        conversionHeadline: 'Have a curved roof or a large-span project?',
        conversionText: 'Send the drawings or specifications for your curved roof, stadium, or large-span envelope, and the SIPANEL engineering team will review the geometry, drainage, and waterproofing details and propose an execution approach.',
        conversionPrimaryCta: 'Request a Curved-Roof Engineering Review'
      },
      ar: {
        shortSummary: 'تنفيذ سقف ملعب أنديمشك المنحني بنظام ألواح الساندويتش على غلاف كبير المدى بمساحة ٦٬٠٠٠ م² — مع ضبط الهندسة المنحنية ومسارات التصريف واستمرارية العزل المائي.',
        trustMicrocopy: 'مرجع من SIPANEL في تنفيذ أغلفة الأسقف الصناعية المنحنية وكبيرة المدى.',
        primaryCta: 'اطلب مراجعة هندسية للسقف المنحني',
        challenge: 'تطلّب ملعب أنديمشك سقفاً منحنياً كبير المدى يجب فيه ضبط الهندسة المنحنية ومحاذاة الألواح ومسار التصريف على السطح المنحني واستمرارية العزل المائي في آنٍ واحد. وأي انحراف بسيط في محاذاة الألواح على السطح المنحني قد يؤدي إلى انقطاع الوصلات وركود المياه والتسرب.',
        challengePoints: [
          'ضبط الهندسة المنحنية ومحاذاة الألواح على السطح المنحني',
          'تصميم مسار تصريف متصل على السقف المنحني دون نقاط ركود للمياه',
          'الحفاظ على استمرارية العزل المائي عند الوصلات ونقاط اختراق السقف',
          'ضبط تشوّه الألواح والحركة الحرارية على المدى الكبير'
        ],
        sipanelSolution: 'صمّمت SIPANEL نظام تسقيف بألواح ساندويتش منسّقاً يلائم البنية المنحنية للملعب — بما في ذلك تحسين توزيع الألواح وفق الانحناء، ودمج تفاصيل العزل المائي، وتنسيق الألواح مع الهيكل.',
        engineeringDecision: 'قبل التركيب، أعدّ الفريق الهندسي دراسات محاذاة إنشائية ورسومات توزيع الألواح على السطح المنحني وتفاصيل تنسيق التصريف وتسلسل تركيب لضمان الدقة الهندسية وأداء السقف على المدى الطويل.',
        selectedSystemLogic: 'اختير نظام السقف بألواح الساندويتش لارتفاع نسبة المتانة إلى الوزن، ولاستمرارية الغلاف العازل، ولملاءمته للأسطح المنحنية على هذا المدى.',
        coordinationNote: 'نُسّقت توزيعات الألواح ومسارات التصريف ومواضع الاختراقات مع الهيكل والعمارة قبل التركيب لتقليل الوصلات ونقاط التسرب على السطح المنحني.',
        executionDetail: 'سار التركيب وفق تسلسل مهندَس: الانطلاق من مرجع هندسة السقف، وضبط المحاذاة عند نقاط الفحص، وتنسيق الوصلات، ومراقبة عزل الوصلات مرحلةً مرحلة، للحفاظ على دقة الانحناء واستمرارية الغلاف.',
        procurementControl: 'وُرِّدت الألواح وملحقات العزل المائي بما يلائم التوزيع المنحني وأطوال المدى، ما قلّل القص والهدر في الموقع وحافظ على المطابقة البُعدية.',
        coordinationWithSiteTeam: 'جرى التنفيذ بتنسيق مستمر بين الفريق الهندسي وطاقم التركيب في الموقع، استناداً إلى الرسومات المعتمدة.',
        qualityCheckpoints: [
          'فحص محاذاة الألواح والمطابقة الهندسية على السطح المنحني',
          'فحص استمرارية مسار التصريف قبل إكمال الغلاف',
          'مراقبة عزل الوصلات ونقاط الاختراق'
        ],
        measuredResultItems: [
          {label: 'نتيجة التنفيذ', value: 'اكتمل السقف المنحني بهندسة دقيقة وغلاف متصل', verificationStatus: 'verified'},
          {label: 'المساحة المنفذة', value: '٦٬٠٠٠ م²', verificationStatus: 'verified'},
          {label: 'النظام', value: 'تسقيف بألواح ساندويتش منحنية', verificationStatus: 'verified'}
        ],
        riskItems: [
          {risk: 'هندسة السقف المنحني ومحاذاة الألواح', explanation: 'الخطر: يؤدي انحراف المحاذاة على السطح المنحني إلى انقطاع الوصلات وتدنّي المظهر. ضبط SIPANEL: الانطلاق من مرجع هندسة السقف مع فحص محاذاة متدرّج. الأهمية للمالك: غلاف متصل ودقيق بالمظهر المعماري المطلوب.'},
          {risk: 'مسار التصريف على السطح المنحني', explanation: 'الخطر: نقاط ركود المياه على السقف المنحني تضيف أحمالاً وتسبب التسرب. ضبط SIPANEL: مسار تصريف متصل يُفحص قبل إغلاق الغلاف. الأهمية للمالك: تصريف موثوق لمياه الأمطار وتقليل خطر التسرب على المدى الطويل.'},
          {risk: 'ضبط التشوّه على المدى الكبير', explanation: 'الخطر: يولّد تشوّه الألواح والحركة الحرارية على المدى الطويل إجهاداً وانفتاحاً في الوصلات. ضبط SIPANEL: توزيع وتفاصيل وصل تلائم طول المدى والحركة الحرارية. الأهمية للمالك: سقف مستقر وحاجة أقل للإصلاح.'},
          {risk: 'عزل الوصلات ونقاط الاختراق', explanation: 'الخطر: الوصلات ونقاط اختراق السقف هي الأكثر عرضة للتسرب. ضبط SIPANEL: تفاصيل عزل مائي متكاملة ومراقبة الوصلات أثناء التركيب. الأهمية للمالك: غلاف محكم وموثوق طوال عمر التشغيل.'}
        ],
        conversionHeadline: 'لديك سقف منحنٍ أو مشروع كبير المدى؟',
        conversionText: 'أرسل رسومات أو مواصفات سقفك المنحني أو ملعبك أو غلافك كبير المدى، ليراجع فريق SIPANEL الهندسي الهندسة والتصريف وتفاصيل العزل المائي ويقترح أسلوب التنفيذ.',
        conversionPrimaryCta: 'اطلب مراجعة هندسية للسقف المنحني'
      },
      ru: {
        shortSummary: 'Монтаж изогнутой кровли стадиона Андимешк сэндвич-панельной системой на большепролётном контуре площадью 6 000 м² — с контролем кривой геометрии, путей водоотвода и непрерывности гидроизоляции.',
        trustMicrocopy: 'Референс SIPANEL по изогнутым большепролётным промышленным кровельным контурам.',
        primaryCta: 'Запросить инженерную оценку изогнутой кровли',
        challenge: 'Стадиону Андимешк требовалась большепролётная изогнутая кровля, где одновременно нужно было контролировать кривую геометрию, выравнивание панелей, водоотвод по изогнутой поверхности и непрерывность гидроизоляции. Малейшее отклонение в выравнивании панелей на изогнутой поверхности могло привести к разрыву стыков, застою воды и протечкам.',
        challengePoints: [
          'Контроль кривой геометрии и выравнивания панелей на изогнутой поверхности',
          'Проектирование непрерывного пути водоотвода по изогнутой кровле без зон застоя воды',
          'Сохранение непрерывности гидроизоляции на стыках и в местах прохода через кровлю',
          'Контроль деформации и температурных перемещений панелей на большом пролёте'
        ],
        sipanelSolution: 'SIPANEL разработала согласованную сэндвич-панельную кровельную систему под изогнутую структуру стадиона — с оптимизацией раскладки панелей по кривизне, интеграцией узлов гидроизоляции и согласованием панелей с несущей конструкцией.',
        engineeringDecision: 'До монтажа инженерная команда подготовила исследования выравнивания конструкции, чертежи раскладки панелей по изогнутой поверхности, узлы водоотвода и последовательность монтажа для обеспечения геометрической точности и долговечности кровли.',
        selectedSystemLogic: 'Сэндвич-панельная кровля выбрана за высокое отношение прочности к весу, непрерывность утеплённого контура и пригодность для изогнутых поверхностей на этом пролёте.',
        coordinationNote: 'Раскладка панелей, пути водоотвода и места проходов согласованы с конструкцией и архитектурой до монтажа, чтобы минимизировать стыки и точки протечек на изогнутой поверхности.',
        executionDetail: 'Монтаж шёл по инженерной последовательности: разбивка от геометрического репера кровли, контроль выравнивания на контрольных точках, согласование соединений и поэтапная проверка гидроизоляции стыков для сохранения точности кривизны и непрерывности контура.',
        procurementControl: 'Панели и аксессуары гидроизоляции поставлялись под изогнутую раскладку и длины пролётов, что снизило подрезку и отходы на площадке и сохранило размерную точность.',
        coordinationWithSiteTeam: 'Работы велись при постоянной координации между инженерной командой и монтажной бригадой на площадке на основе утверждённых чертежей.',
        qualityCheckpoints: [
          'Проверка выравнивания панелей и геометрической точности на изогнутой поверхности',
          'Контроль непрерывности пути водоотвода до завершения контура',
          'Мониторинг гидроизоляции стыков и мест проходов'
        ],
        measuredResultItems: [
          {label: 'Результат монтажа', value: 'Изогнутая кровля выполнена с точной геометрией и непрерывным контуром', verificationStatus: 'verified'},
          {label: 'Выполненная площадь', value: '6 000 м²', verificationStatus: 'verified'},
          {label: 'Система', value: 'Изогнутая сэндвич-панельная кровля', verificationStatus: 'verified'}
        ],
        riskItems: [
          {risk: 'Кривая геометрия кровли и выравнивание панелей', explanation: 'Риск: отклонение выравнивания на изогнутой поверхности ведёт к разрыву стыков и ухудшению вида. Контроль SIPANEL: разбивка от геометрического репера с поэтапной проверкой выравнивания. Зачем заказчику: непрерывный и точный контур с нужным архитектурным видом.'},
          {risk: 'Путь водоотвода по изогнутой поверхности', explanation: 'Риск: зоны застоя воды на изогнутой кровле создают нагрузку и протечки. Контроль SIPANEL: непрерывный путь водоотвода с проверкой до закрытия контура. Зачем заказчику: надёжный отвод дождевой воды и снижение риска протечек.'},
          {risk: 'Контроль деформации на большом пролёте', explanation: 'Риск: деформация панелей и температурные перемещения на длинном пролёте создают напряжения и раскрытие стыков. Контроль SIPANEL: раскладка и узлы соединений под длину пролёта и температурные перемещения. Зачем заказчику: устойчивая кровля и меньше ремонтов.'},
          {risk: 'Гидроизоляция стыков и мест проходов', explanation: 'Риск: стыки и проходы через кровлю наиболее склонны к протечкам. Контроль SIPANEL: интегрированные узлы гидроизоляции и мониторинг стыков при монтаже. Зачем заказчику: герметичный и надёжный контур на весь срок службы.'}
        ],
        conversionHeadline: 'Есть изогнутая кровля или большепролётный проект?',
        conversionText: 'Пришлите чертежи или спецификации вашей изогнутой кровли, стадиона или большепролётного контура, и инженерная команда SIPANEL проверит геометрию, водоотвод и узлы гидроизоляции и предложит подход к выполнению.',
        conversionPrimaryCta: 'Запросить инженерную оценку изогнутой кровли'
      }
    }
  },
  {
    slug: 'absaar-water-park',
    projectName: localized('Absaar Water Park'),
    projectType: localized('Water park roofing and daylight integration system'),
    mainService: zipRoofingService,
    serviceHref: '/systems/standing-seam-zip-tech-roofing',
    location: 'Iran',
    area: '12,000 m2',
    challenge: 'A large recreational roof required daylight transmission, controlled ventilation, waterproof integration, and coordination between transparent roofing, operable openings, and insulated panels.',
    sipanelSolution: 'SIPANEL engineered a hybrid roofing solution combining daylight-transmitting roof sections, automated ventilation openings, and insulated sandwich panel systems.',
    engineeringDecision: 'Engineering teams developed roof zoning strategies, ventilation opening details, waterproofing transitions, and structural support layouts.',
    executionDetail: 'Installation used phased coordination for transparent panels, automated openings, drainage continuity, waterproof sealing, and sandwich panel integration.',
    measuredResult: 'An integrated recreational roofing system was delivered with controlled daylight, automated ventilation, thermal insulation efficiency, and waterproof performance.',
    riskPrevented: ['Ventilation system malfunction', 'Water penetration at opening sections', 'Thermal imbalance', 'Roof transition failures'],
    cardImage: absaarCard,
    heroImage: absaarHero,
    resourceTitle: localized('Roof Leakage Prevention Checklist')
  },
  {
    slug: 'megaparsmall-atrium',
    projectName: localized('Megapars Mall Atrium'),
    projectType: localized('Atrium roofing structure'),
    mainService: zipRoofingService,
    serviceHref: '/systems/standing-seam-zip-tech-roofing',
    location: 'Iran',
    area: '4,500 m2',
    challenge: 'A large-span commercial atrium roof required curved ZIP panel coordination, waterproofing integrity, thermal movement control, and clean architectural integration.',
    sipanelSolution: 'SIPANEL engineered a coordinated ZIP roofing solution with standing seam layout coordination, waterproofing detailing, and structural integration.',
    engineeringDecision: 'Engineering teams prepared ZIP panel layouts, expansion movement studies, drainage details, and installation sequencing plans.',
    executionDetail: 'Installation followed controlled ZIP system procedures, alignment verification, waterproofing inspections, and fastening coordination workflows.',
    measuredResult: 'A visually integrated atrium roof was delivered with reliable waterproofing, precise standing seam execution, and controlled long-span installation quality.',
    riskPrevented: ['Water penetration', 'Thermal expansion stress', 'Roof alignment deviations', 'Drainage coordination failures'],
    cardImage: megaparsCard,
    heroImage: megaparsHero,
    resourceTitle: localized('Roof Leakage Prevention Checklist')
  },
  {
    slug: 'mahshahr-taxi-parking',
    detailLayout: 'case-study-only',
    projectName: {
      en: 'Mahshahr Taxi Parking Facility',
      fa: 'پارکینگ تاکسی ماهشهر',
      ar: 'موقف سيارات الأجرة في ماهشهر',
      ru: 'Стоянка такси в Махшехре'
    },
    projectType: {
      en: 'Commercial parking roofing system',
      fa: 'سقف پارکینگ حمل‌ونقل',
      ar: 'نظام سقف لموقف نقل',
      ru: 'Кровельная система транспортной стоянки'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Bandar Mahshahr, Khuzestan, Iran',
    area: '4,000 m2',
    challenge: 'A coastal transport parking facility required sandwich panel roofing that kept rainwater movement predictable through slopes, gutters, flashings, downspouts, and sealed transitions.',
    sipanelSolution: 'SIPANEL coordinated the sandwich panel roof as a complete drainage and weather-protection assembly, aligning panel layout, gutter positions, downspouts, flashings, fastening, and sealing checkpoints.',
    engineeringDecision: 'Engineering teams treated drainage as part of the roof system, coordinating slopes, water-flow paths, gutter locations, and panel alignment before installation.',
    executionDetail: 'Roof panels, gutters, flashing systems, and downspouts were installed with alignment checks, fastening checkpoints, and sealing verification at water-sensitive interfaces.',
    measuredResult: 'A 4,000 m² sandwich panel roofing system was delivered with coordinated rainwater management and controlled weather-protection detailing.',
    riskPrevented: ['Water accumulation', 'Roof leakage', 'Corrosion-related failures', 'Improper drainage flow'],
    cardImage: mahshahrTaxiCard,
    heroImage: mahshahrTaxiHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'parand-city-entrance',
    projectName: localized('Parand City Entrance Gate'),
    projectType: localized('Architectural city entrance facade'),
    mainService: claddingService,
    serviceHref: '/systems/aluminium-cladding-covering',
    location: 'Parand, Tehran, Iran',
    area: '500 m2',
    challenge: 'A special architectural entrance required customized aluminium cladding, curved geometry control, waterproofing continuity, and accurate finishing.',
    sipanelSolution: 'SIPANEL developed a customized aluminium cladding and structural coordination system for the project geometry and facade integration requirements.',
    engineeringDecision: 'Engineering teams designed curved transition details, edge coordination systems, structural alignment strategies, and sealing workflows.',
    executionDetail: 'Installation followed controlled sequencing, detailed engineering drawings, alignment verification, and coordinated sealing execution.',
    measuredResult: 'A distinctive aluminium-clad city entrance was delivered with precise geometry execution and weather-resistant performance.',
    riskPrevented: ['Dimensional inconsistencies', 'Facade sealing failures', 'Curved alignment errors', 'Surface waviness'],
    cardImage: parandCard,
    heroImage: parandHero,
    resourceTitle: localized('Shop Drawing Review Guide')
  },
  {
    slug: 'tabas-railway-facility',
    projectName: localized('Tabas Railway Facility'),
    projectType: localized('Large-span railway roofing system'),
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Tabas, Iran',
    area: '10,000 m2',
    challenge: 'A double-curved railway structure required advanced sandwich panel coordination, precise structural alignment, waterproofing continuity, and long-span roof performance.',
    sipanelSolution: 'SIPANEL provided a fully engineered sandwich panel roofing system adapted for the double-arched railway structure.',
    engineeringDecision: 'Engineering teams applied custom panel detailing, structural alignment studies, drainage optimization, and installation sequencing.',
    executionDetail: 'Execution followed detailed shop drawings, installation planning, fastening verification, and structural alignment checkpoints.',
    measuredResult: 'A durable large-span sandwich panel roofing system was delivered with reliable structural performance, controlled installation quality, and efficient execution.',
    riskPrevented: ['Structural misalignment', 'Drainage failures', 'Installation inaccuracies', 'Water penetration'],
    cardImage: tabasCard,
    heroImage: tabasHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'tiran-gas-station',
    projectName: localized('Tiran Gas Station'),
    projectType: localized('Gas station roofing system'),
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Isfahan, Iran',
    area: '600 m2',
    challenge: 'A fast-track public gas station required durable sandwich panel roofing, efficient sequencing, waterproofing reliability, and clean finishing.',
    sipanelSolution: 'SIPANEL supplied and coordinated an engineered sandwich panel roofing system optimized for rapid installation and long-term weather resistance.',
    engineeringDecision: 'Engineering teams optimized panel layouts, structural coordination details, fastening strategies, and drainage integration.',
    executionDetail: 'Installation followed controlled sequencing, panel alignment checkpoints, fastening verification, and coordinated sealing execution.',
    measuredResult: 'A fast-track sandwich panel roofing system was completed with reliable weather protection, modern appearance, and controlled installation quality.',
    riskPrevented: ['Roof leakage', 'Installation alignment errors', 'Improper sealing execution', 'Drainage inconsistencies'],
    cardImage: pompTiranCard,
    heroImage: pompTiranHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'ahvaz-airport-passenger-terminal',
    detailLayout: 'case-study-only',
    projectName: {
      en: 'Ahvaz Airport Passenger Terminal',
      fa: 'سالن انتظار فرودگاه اهواز',
      ar: 'صالة المسافرين في مطار الأهواز',
      ru: 'Пассажирский терминал аэропорта Ахваз'
    },
    projectType: {
      en: 'Airport Passenger Terminal',
      fa: 'سالن انتظار فرودگاه',
      ar: 'صالة مسافرين',
      ru: 'Пассажирский терминал аэропорта'
    },
    mainService: zipRoofingService,
    serviceHref: '/systems/standing-seam-zip-tech-roofing',
    location: 'Ahvaz, Iran',
    area: '4,000 m²',
    challenge: 'The passenger terminal included a curved front architectural feature where the covering had to bend in a perpendicular direction, making substructure alignment, aluminium panel geometry, ZIP-TECH transitions, and final visual quality the key execution risks.',
    sipanelSolution: 'SIPANEL coordinated custom execution details for the curved form, aligning substructure, aluminium panels, and ZIP-TECH components before installation.',
    engineeringDecision: 'Engineering teams controlled geometry first: defining curved references, coordinating panel and roofing interfaces, then executing the covering without breaking the architectural line.',
    executionDetail: 'Execution covered 4,000 m² of ZIP-TECH and aluminium cladding with staged checks for geometry, alignment, and transition quality.',
    measuredResult: '4,000 m² of ZIP-TECH and aluminium cladding were executed while preserving the curved architectural form and final visual quality.',
    riskPrevented: ['Visual breaks in curved facade', 'Incorrect perpendicular bending', 'Mismatch between cladding and substructure', 'Loss of architectural quality in airport facade'],
    cardImage: ahvazAirportPassengerTerminalCard,
    heroImage: ahvazAirportPassengerTerminalHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'atlas-hotel-shahinshahr-atrium',
    projectName: {
      en: 'Atlas Hotel Atrium',
      fa: 'آتریوم هتل اطلس',
      ar: 'أتريوم فندق أطلس',
      ru: 'Атриум отеля Atlas'
    },
    projectType: {
      en: 'Hotel Central Atrium',
      fa: 'آتریوم مرکزی هتل',
      ar: 'أتريوم مركزي للفندق',
      ru: 'Центральный атриум отеля'
    },
    mainService: claddingService,
    serviceHref: '/systems/aluminium-cladding-covering',
    location: 'Shahin Shahr, Isfahan, Iran',
    area: '700 m²',
    challenge: 'The atrium served as the focal public space of the hotel and required a lightweight, translucent enclosure capable of delivering natural daylight while preserving architectural quality.',
    sipanelSolution: 'Implementation of a polycarbonate enclosure to maximize daylight penetration, reduce structural weight, and maintain architectural continuity.',
    engineeringDecision: 'Implementation of a polycarbonate enclosure to maximize daylight penetration, reduce structural weight, and maintain architectural continuity.',
    executionDetail: 'Successful completion of a 700 m² polycarbonate atrium enclosure, creating a bright and welcoming hospitality environment.',
    measuredResult: 'Successful completion of a 700 m² polycarbonate atrium enclosure, creating a bright and welcoming hospitality environment.',
    riskPrevented: ['Insufficient daylight in the atrium', 'Excessive roof dead load', 'Architectural discontinuity', 'Reduced guest experience quality'],
    cardImage: atlasHotelShahinshahrAtriumCard,
    heroImage: atlasHotelShahinshahrAtriumHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'baharestan-prayer-hall',
    projectName: {
      en: 'Baharestan Prayer Hall',
      fa: 'سالن نماز شهر بهارستان',
      ar: 'قاعة الصلاة في مدينة بهارستان',
      ru: 'Молитвенный зал Бахарестан'
    },
    projectType: {
      en: 'Prayer Hall',
      fa: 'سالن نماز',
      ar: 'قاعة صلاة',
      ru: 'Молитвенный зал'
    },
    mainService: claddingService,
    serviceHref: '/systems/aluminium-cladding-covering',
    location: 'Baharestan, Iran',
    area: '1,000 m²',
    challenge: 'The main challenge was installing dry ceramic cladding on steep roof surfaces where conventional dry-facade systems are typically not applicable.',
    sipanelSolution: 'Development and fabrication of custom connection systems capable of safely supporting ceramic panels on highly inclined roof geometries.',
    engineeringDecision: 'Development and fabrication of custom connection systems capable of safely supporting ceramic panels on highly inclined roof geometries.',
    executionDetail: 'Successful execution of 1,000 m² of enclosure and facade works while maintaining architectural continuity between roof and wall surfaces.',
    measuredResult: 'Successful execution of 1,000 m² of enclosure and facade works while maintaining architectural continuity between roof and wall surfaces.',
    riskPrevented: ['Ceramic panel slippage on inclined surfaces', 'Connection failure under roof loads', 'Discontinuity between roof and facade', 'Reduced durability of dry-facade system'],
    cardImage: baharestanPrayerHallCard,
    heroImage: baharestanPrayerHallHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'bandar-abbas-mall-atrium-roof',
    projectName: {
      en: 'Bandar Abbas Mall',
      fa: 'مال بندرعباس',
      ar: 'مول بندر عباس',
      ru: 'Bandar Abbas Mall'
    },
    projectType: {
      en: 'Central Atrium Roof',
      fa: 'آتریوم مرکزی مجتمع تجاری',
      ar: 'سقف الأتريوم المركزي',
      ru: 'Кровля центрального атриума'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Bandar Abbas, Iran',
    area: '700 m²',
    challenge: 'The project involved installing enclosure systems over a prominent curved space-frame roof located at the center of a commercial development where architectural quality was critical.',
    sipanelSolution: 'Careful geometric control, alignment of panel layouts with the curved structure, and detailed finishing works to achieve a continuous architectural surface.',
    engineeringDecision: 'Careful geometric control, alignment of panel layouts with the curved structure, and detailed finishing works to achieve a continuous architectural surface.',
    executionDetail: 'Successful completion of 700 m² of sandwich panel roofing for the central atrium enclosure.',
    measuredResult: 'Successful completion of 700 m² of sandwich panel roofing for the central atrium enclosure.',
    riskPrevented: ['Visual discontinuity on curved surfaces', 'Geometry mismatch between roof and structure', 'Panel alignment defects', 'Reduced architectural quality'],
    cardImage: bandarAbbasMallAtriumRoofCard,
    heroImage: bandarAbbasMallAtriumRoofHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'bandar-mahshahr-bus-terminal',
    projectName: {
      en: 'Bandar Mahshahr Urban Bus Terminal',
      fa: 'ترمینال اتوبوس شهری بندر ماهشهر',
      ar: 'محطة حافلات بندر ماهشهر',
      ru: 'Автобусный терминал Бендер-Махшехр'
    },
    projectType: {
      en: 'Urban Passenger Terminal',
      fa: 'پایانه مسافربری شهری',
      ar: 'محطة نقل حضرية',
      ru: 'Пассажирский терминал'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Bandar Mahshahr, Iran',
    area: 'Approx. 4,000 m²',
    challenge: 'Providing shaded public space while ensuring durability against heat, humidity and corrosive environmental conditions.',
    sipanelSolution: 'A lightweight space frame combined with insulated sheet roofing and rock wool insulation was selected to improve thermal performance and durability.',
    engineeringDecision: 'A lightweight space frame combined with insulated sheet roofing and rock wool insulation was selected to improve thermal performance and durability.',
    executionDetail: 'Successful delivery of a large-scale terminal roof with efficient structural and thermal performance.',
    measuredResult: 'Successful delivery of a large-scale terminal roof with efficient structural and thermal performance.',
    riskPrevented: ['Excessive solar heat gain', 'Environmental corrosion', 'Passenger circulation conflicts', 'High maintenance requirements'],
    cardImage: bandarMahshahrBusTerminalCard,
    heroImage: bandarMahshahrBusTerminalHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'eftekhar-commercial-office-complex',
    projectName: {
      en: 'Eftekhar Commercial & Office Complex',
      fa: 'مجتمع تجاری اداری افتخار',
      ar: 'مجمع افتخار التجاري والإداري',
      ru: 'Торгово-офисный комплекс Эфтехар'
    },
    projectType: {
      en: 'Central Atrium Roof',
      fa: 'پوشش آتریوم مرکزی',
      ar: 'تغطية الأتريوم المركزي',
      ru: 'Покрытие центрального атриума'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Isfahan, Iran',
    area: '300 m²',
    challenge: 'The roof structure had to be integrated between existing building blocks while maintaining waterproof performance and structural efficiency.',
    sipanelSolution: 'A lightweight space frame combined with polycarbonate panels was selected to create a column-free span with excellent daylight transmission.',
    engineeringDecision: 'A lightweight space frame combined with polycarbonate panels was selected to create a column-free span with excellent daylight transmission.',
    executionDetail: 'Approximately 300 m² of covered atrium space delivered without intermediate supports.',
    measuredResult: 'Approximately 300 m² of covered atrium space delivered without intermediate supports.',
    riskPrevented: ['Water infiltration', 'Excessive dead load', 'Insufficient daylight', 'Commercial space disruption'],
    cardImage: eftekharCommercialOfficeComplexCard,
    heroImage: eftekharCommercialOfficeComplexHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'enghelab-club-padel-center',
    projectName: {
      en: 'Enghelab Club Padel Center',
      fa: 'مجموعه پدل باشگاه انقلاب',
      ar: 'مركز البادل في نادي انقلاب',
      ru: 'Падел-центр спортивного комплекса Энгелаб'
    },
    projectType: {
      en: 'Padel Sports Hall',
      fa: 'سالن پدل و ورزش‌های راکتی',
      ar: 'قاعة بادل',
      ru: 'Падел-холл'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Tehran, Iran',
    area: '2,000 m²',
    challenge: 'The project required large clear spans while maintaining structural efficiency and architectural quality within an active sports complex.',
    sipanelSolution: 'A lightweight space frame structure combined with sandwich panels was selected to optimize span capability, construction speed and durability.',
    engineeringDecision: 'A lightweight space frame structure combined with sandwich panels was selected to optimize span capability, construction speed and durability.',
    executionDetail: 'Approximately 2,000 m² of sports facility enclosure delivered with large unobstructed interior space.',
    measuredResult: 'Approximately 2,000 m² of sports facility enclosure delivered with large unobstructed interior space.',
    riskPrevented: ['Excessive structural weight', 'Obstruction of sports activities', 'Construction delays', 'Long-term maintenance issues'],
    cardImage: enghelabClubPadelCenterCard,
    heroImage: enghelabClubPadelCenterHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'erbil-eye-hospital-entrance-canopy',
    projectName: {
      en: 'Erbil Eye Hospital Entrance Canopy',
      fa: 'سایبان ورودی بیمارستان چشم اربیل',
      ar: 'مظلة مدخل مستشفى العيون في أربيل',
      ru: 'Навес входной зоны глазной больницы Эрбиля'
    },
    projectType: {
      en: 'Hospital Entrance Canopy',
      fa: 'ورودی بیمارستان تخصصی',
      ar: 'مظلة مدخل مستشفى',
      ru: 'Входная группа больницы'
    },
    mainService: claddingService,
    serviceHref: '/systems/aluminium-cladding-covering',
    location: 'Erbil, Kurdistan Region, Iraq',
    area: '1,500 m²',
    challenge: 'The project required translating a symbolic architectural concept into a buildable structure while preserving the visual expression of the eyelid, iris, and eye geometry.',
    sipanelSolution: 'Precise three-dimensional geometric control, custom cladding detailing, and phased installation to preserve the architectural intent throughout construction.',
    engineeringDecision: 'Precise three-dimensional geometric control, custom cladding detailing, and phased installation to preserve the architectural intent throughout construction.',
    executionDetail: 'Successful completion of approximately 1,500 m² of polycarbonate enclosure while maintaining the intended eye-shaped architectural identity.',
    measuredResult: 'Successful completion of approximately 1,500 m² of polycarbonate enclosure while maintaining the intended eye-shaped architectural identity.',
    riskPrevented: ['Loss of architectural eye geometry', 'Distortion of eyelid and iris forms', 'Mismatch between structure and enclosure', 'Reduced visual impact of hospital entrance'],
    cardImage: erbilEyeHospitalEntranceCanopyCard,
    heroImage: erbilEyeHospitalEntranceCanopyHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'fadak-mall-glass-skylight',
    projectName: {
      en: 'Fadak Mall Glass Skylight',
      fa: 'اسکای‌لایت فدک مال',
      ar: 'السكاي لايت الزجاجي لفدك مول',
      ru: 'Стеклянный световой фонарь Fadak Mall'
    },
    projectType: {
      en: 'Central Skylight',
      fa: 'نورگیر مرکزی (Skylight)',
      ar: 'سكاي لايت مركزي',
      ru: 'Центральный световой фонарь'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Isfahan, Iran',
    area: '500 m²',
    challenge: 'The project required the installation of a glass enclosure over a three-dimensional elliptical form while maintaining geometric accuracy, waterproofing performance, and visual transparency.',
    sipanelSolution: 'Precise geometric control, custom glazing details, and installation management to achieve a seamless architectural skylight.',
    engineeringDecision: 'Precise geometric control, custom glazing details, and installation management to achieve a seamless architectural skylight.',
    executionDetail: 'Successful completion of a 500 m² glass skylight delivering natural daylight to the mall atrium.',
    measuredResult: 'Successful completion of a 500 m² glass skylight delivering natural daylight to the mall atrium.',
    riskPrevented: ['Geometric distortion', 'Water leakage', 'Mismatch between structure and glazing', 'Reduced daylight performance'],
    cardImage: fadakMallGlassSkylightCard,
    heroImage: fadakMallGlassSkylightHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'gonabad-university-sports-hall',
    projectName: {
      en: 'Gonabad University Sports Hall',
      fa: 'سالن ورزشی دانشگاه علوم پزشکی گناباد',
      ar: 'الصالة الرياضية لجامعة علوم الطب في كناباد',
      ru: 'Спортивный зал Университета медицинских наук Гонабада'
    },
    projectType: {
      en: 'University Sports Hall',
      fa: 'سالن ورزشی دانشگاهی',
      ar: 'صالة رياضية جامعية',
      ru: 'Университетский спортивный зал'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Gonabad, Iran',
    area: '3,000 m²',
    challenge: 'The project required accurate installation of sandwich panels on a large curved roof while maintaining alignment, weather-tightness, and architectural consistency.',
    sipanelSolution: 'Careful installation sequencing and geometric control to ensure a uniform enclosure across the entire roof surface.',
    engineeringDecision: 'Careful installation sequencing and geometric control to ensure a uniform enclosure across the entire roof surface.',
    executionDetail: 'Successful completion of 3,000 m² of sandwich panel enclosure for a university sports facility.',
    measuredResult: 'Successful completion of 3,000 m² of sandwich panel enclosure for a university sports facility.',
    riskPrevented: ['Curved roof alignment issues', 'Mismatch between enclosure and structure', 'Waterproofing deficiencies', 'Reduced architectural quality'],
    cardImage: gonabadUniversitySportsHallCard,
    heroImage: gonabadUniversitySportsHallHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'imam-khomeini-airport-hajj-terminal',
    projectName: {
      en: 'Imam Khomeini Airport Hajj Passenger Terminal',
      fa: 'سالن انتظار حجاج فرودگاه امام خمینی',
      ar: 'صالة انتظار الحجاج - مطار الإمام الخميني',
      ru: 'Зал ожидания паломников аэропорта Имама Хомейни'
    },
    projectType: {
      en: 'Passenger Waiting Hall',
      fa: 'سالن انتظار مسافران',
      ar: 'صالة انتظار المسافرين',
      ru: 'Пассажирский терминал ожидания'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Tehran, Iran',
    area: '5,000 m²',
    challenge: 'The primary challenge was the extremely compressed schedule between project award and the return of Hajj pilgrims, requiring immediate completion and operational readiness.',
    sipanelSolution: 'Fast-track procurement, parallel installation activities, and integration of polycarbonate wall systems to maximize natural daylight within the hall.',
    engineeringDecision: 'Fast-track procurement, parallel installation activities, and integration of polycarbonate wall systems to maximize natural daylight within the hall.',
    executionDetail: 'Successful completion and handover of a 5,000 m² airport facility in less than seven days.',
    measuredResult: 'Successful completion and handover of a 5,000 m² airport facility in less than seven days.',
    riskPrevented: ['Operational delays before Hajj return flights', 'Airport capacity shortages', 'Insufficient daylight inside waiting areas', 'Disruption of passenger handling operations'],
    cardImage: imamKhomeiniAirportHajjTerminalCard,
    heroImage: imamKhomeiniAirportHajjTerminalHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'kermanshah-industrial-university-petroleum-faculty',
    detailLayout: 'case-study-only',
    projectName: {
      en: 'Kermanshah Industrial University Petroleum Faculty',
      fa: 'دانشکده نفت دانشگاه صنعتی کرمانشاه',
      ar: 'كلية النفط في الجامعة الصناعية بكرمانشاه',
      ru: 'Нефтяной факультет Индустриального университета Керманшаха'
    },
    projectType: {
      en: 'Structural Glass Facade',
      fa: 'نمای شیشه‌ای سازه‌ای',
      ar: 'واجهة زجاجية إنشائية',
      ru: 'Стеклянный структурный фасад'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Kermanshah, Iran',
    area: '1,000 m²',
    challenge: 'The petroleum-faculty building required structural glass facade connections that could tolerate relative movement in the primary structure and reduce the risk of transferring displacement into brittle glass panels.',
    sipanelSolution: 'SIPANEL engineered connection details to accommodate displacement between the building structure and glass facade while preserving facade alignment.',
    engineeringDecision: 'Engineering teams separated glass performance from uncontrolled structural movement by using connection details that reduce stress transfer into the panels.',
    executionDetail: 'Execution covered approximately 1,000 m² of glass facade with attention to connection alignment, support tolerances, and controlled installation of glass units.',
    measuredResult: 'Approximately 1,000 m² of structural glass facade was executed. The project record states that the facade reportedly remained without glass damage during the Kermanshah earthquake in the 1390s Solar Hijri decade.',
    riskPrevented: ['Glass breakage under seismic movement', 'Facade connection failure', 'Mismatch between structure and glass facade', 'Reduced building-user safety'],
    cardImage: kermanshahIndustrialUniversityPetroleumFacultyCard,
    heroImage: kermanshahIndustrialUniversityPetroleumFacultyHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'maku-convention-hall',
    projectName: {
      en: 'Maku Convention Hall',
      fa: 'سالن اجتماعات ماکو',
      ar: 'قاعة ماكو للمؤتمرات',
      ru: 'Конференц-зал Маку'
    },
    projectType: {
      en: 'Convention Hall',
      fa: 'سالن اجتماعات',
      ar: 'قاعة اجتماعات',
      ru: 'Конференц-зал'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Maku, Iran',
    area: '2,000 m²',
    challenge: 'The large-span curved geometry required precise installation to maintain weather-tightness, architectural consistency and structural performance.',
    sipanelSolution: 'A sandwich panel system was selected to combine lightweight construction, thermal efficiency and rapid installation.',
    engineeringDecision: 'A sandwich panel system was selected to combine lightweight construction, thermal efficiency and rapid installation.',
    executionDetail: 'Successful installation of approximately 2,000 m² of sandwich panel enclosure over the large-span structure.',
    measuredResult: 'Successful installation of approximately 2,000 m² of sandwich panel enclosure over the large-span structure.',
    riskPrevented: ['Water penetration', 'Excessive roof dead load', 'Construction delays', 'Reduced thermal performance'],
    cardImage: makuConventionHallCard,
    heroImage: makuConventionHallHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'marun-petrochemical-visitor-terminal',
    projectName: {
      en: 'Marun Petrochemical Multipurpose Hall',
      fa: 'سالن چندمنظوره پتروشیمی مارون',
      ar: 'قاعة مجمع مارون للبتروكيماويات',
      ru: 'Многофункциональный зал нефтехимического комплекса Marun'
    },
    projectType: {
      en: 'Industrial Gathering Facility',
      fa: 'سالن خدماتی و تجمعات',
      ar: 'منشأة صناعية متعددة الاستخدامات',
      ru: 'Промышленный общественный объект'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Mahshahr, Iran',
    area: '5,000 m²',
    challenge: 'A critical engineering challenge was the development of a reliable structural interface between the tensile membrane system and the primary structure while maintaining load transfer integrity and long-term durability.',
    sipanelSolution: 'A dedicated connection assembly was engineered, analyzed and fabricated specifically for the interaction between the tensile membrane structure and the main supporting frame.',
    engineeringDecision: 'A dedicated connection assembly was engineered, analyzed and fabricated specifically for the interaction between the tensile membrane structure and the main supporting frame.',
    executionDetail: 'Successful completion of approximately 5,000 m² of hybrid enclosure within an active petrochemical environment.',
    measuredResult: 'Successful completion of approximately 5,000 m² of hybrid enclosure within an active petrochemical environment.',
    riskPrevented: ['Stress concentration at membrane connections', 'Wind-induced membrane failures', 'Structural instability at force-transfer points', 'High maintenance requirements'],
    cardImage: marunPetrochemicalVisitorTerminalCard,
    heroImage: marunPetrochemicalVisitorTerminalHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'mehrabad-aircraft-hangar',
    detailLayout: 'case-study-only',
    projectName: {
      en: 'Mehrabad Airport Aircraft Hangar',
      fa: 'آشیانه هواپیما فرودگاه مهرآباد',
      ar: 'حظيرة الطائرات في مطار مهرآباد',
      ru: 'Авиационный ангар аэропорта Мехрабад'
    },
    projectType: {
      en: 'Aircraft Hangar',
      fa: 'آشیانه هواپیما',
      ar: 'حظيرة طائرات',
      ru: 'Авиационный ангар'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Tehran, Iran',
    area: '5,000 m²',
    challenge: 'The hangar application required accurate sandwich panel covering over a continuous curved structure, where installation access, panel alignment, substructure coordination, and roof-wall transitions affected weather protection and visual continuity.',
    sipanelSolution: 'SIPANEL coordinated the space frame, substructure, panel layout, and installation sequence so the curved hangar form could be covered without losing geometric continuity.',
    engineeringDecision: 'Engineering teams defined installation references and panel sequencing from the hangar geometry, then coordinated support points and transition details before site installation.',
    executionDetail: 'Execution focused on controlled panel alignment over the curved surface, staged access, fastening checks, and transition detailing at roof and wall interfaces.',
    measuredResult: 'A 5,000 m² sandwich panel covering was executed while maintaining the continuous curved form of the aircraft hangar.',
    riskPrevented: ['Visual breaks on curved roof surface', 'Installation errors on curved geometry', 'Mismatch between structure and covering system', 'Poor final appearance on large-span enclosure'],
    cardImage: mehrabadAircraftHangarCard,
    heroImage: mehrabadAircraftHangarHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'najafabad-university-amphitheater',
    projectName: {
      en: 'Najafabad University Amphitheater',
      fa: 'سالن آمفی‌تئاتر دانشگاه آزاد اسلامی نجف‌آباد',
      ar: 'مدرج جامعة نجف آباد',
      ru: 'Амфитеатр университета Наджафабад'
    },
    projectType: {
      en: 'Amphitheater and Convention Facility',
      fa: 'آمفی‌تئاتر و مرکز همایش',
      ar: 'مسرح ومركز مؤتمرات',
      ru: 'Амфитеатр и конференц-центр'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Najafabad, Isfahan, Iran',
    area: '4,000 m²',
    challenge: 'The project featured a highly complex architectural geometry including cantilevers, curved edges and irregular surfaces that required precise enclosure detailing.',
    sipanelSolution: 'Custom support details and enclosure assemblies were developed to preserve the architectural intent while maintaining durability and weather protection.',
    engineeringDecision: 'Custom support details and enclosure assemblies were developed to preserve the architectural intent while maintaining durability and weather protection.',
    executionDetail: 'Successful execution of approximately 4,000 m² of architectural enclosure on a complex university landmark building.',
    measuredResult: 'Successful execution of approximately 4,000 m² of architectural enclosure on a complex university landmark building.',
    riskPrevented: ['Architectural form distortion', 'Water leakage at geometric transitions', 'Excessive dead loads', 'Future maintenance complications'],
    cardImage: najafabadUniversityAmphitheaterCard,
    heroImage: najafabadUniversityAmphitheaterHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'payam-industrial-city-ceramic-factory',
    projectName: {
      en: 'Payam Industrial City Ceramic Manufacturing Facility',
      fa: 'سالن تولید ظروف سرامیکی شهرک صنعتی پیام',
      ar: 'مصنع إنتاج الأدوات الخزفية في مدينة بيام الصناعية',
      ru: 'Завод керамической продукции в промышленной зоне Payam'
    },
    projectType: {
      en: 'Long-span space frame industrial production hall',
      fa: 'سازه فضاکار دهانه بلند برای فضای تولید صنعتی',
      ar: 'صالة إنتاج صناعية بهيكل فراغي واسع',
      ru: 'Большепролетный производственный цех'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Karaj, Iran',
    area: '4,500 m²',
    challenge: 'Providing a large unobstructed production area while minimizing structural weight and construction time.',
    sipanelSolution: 'A lightweight space frame system was selected to achieve long spans and operational flexibility for ceramic manufacturing processes.',
    engineeringDecision: 'A lightweight space frame system was selected to achieve long spans and operational flexibility for ceramic manufacturing processes.',
    executionDetail: 'A 4,500 m² column-efficient production space optimized for manufacturing operations.',
    measuredResult: 'A 4,500 m² column-efficient production space optimized for manufacturing operations.',
    riskPrevented: ['Excessive structural weight', 'Column obstruction in production area', 'Construction delays', 'Inadequate span capability'],
    cardImage: payamIndustrialCityCeramicFactoryCard,
    heroImage: payamIndustrialCityCeramicFactoryHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'rouzbeh-charity-complex-zanjan',
    projectName: {
      en: 'Rouzbeh Charity Complex',
      fa: 'مؤسسه خیریه روزبه زنجان',
      ar: 'مجمع روزبه الخيري',
      ru: 'Благотворительный комплекс Rouzbeh'
    },
    projectType: {
      en: 'Central atrium roofing with space frame structure',
      fa: 'پوشش دهانه مرکزی ساختمان با سازه فضاکار و ساندویچ پانل',
      ar: 'تغطية ساحة مركزية بهيكل فراغي',
      ru: 'Покрытие центрального атриума пространственной конструкцией'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Zanjan, Iran',
    area: '1,000 m²',
    challenge: 'Installing a long-span roof over a multi-storey structure under construction while maintaining compatibility with the reinforced concrete building frame.',
    sipanelSolution: 'A lightweight space frame system combined with insulated sandwich panels was selected to optimize weight, speed, and thermal performance over the central atrium.',
    engineeringDecision: 'A lightweight space frame system combined with insulated sandwich panels was selected to optimize weight, speed, and thermal performance over the central atrium.',
    executionDetail: 'A fully covered central space providing approximately 1,000 m² of protected area integrated into the multi-storey building structure.',
    measuredResult: 'A fully covered central space providing approximately 1,000 m² of protected area integrated into the multi-storey building structure.',
    riskPrevented: ['Excessive dead load on building frame', 'Construction delays from weather exposure', 'Incompatibility with RC structure', 'Long-term maintenance issues'],
    cardImage: rouzbehCharityComplexZanjanCard,
    heroImage: rouzbehCharityComplexZanjanHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'shahrood-azad-university-skylight',
    projectName: {
      en: 'Shahrood Azad University Central Skylight',
      fa: 'سقف نورگیر ساختمان مرکزی دانشگاه آزاد شاهرود',
      ar: 'السقف الزجاجي للمبنى المركزي بجامعة آزاد شاهرود',
      ru: 'Светопрозрачный купол центрального корпуса Университета Азад Шахруд'
    },
    projectType: {
      en: 'Central Skylight Roof',
      fa: 'سقف نورگیر مرکزی',
      ar: 'سقف إنارة طبيعية',
      ru: 'Центральный световой купол'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Shahrood, Iran',
    area: '400 m²',
    challenge: 'The skylight was installed on an existing roof structure, requiring careful control of dead loads, waterproofing details and structural integration.',
    sipanelSolution: 'A dome-shaped space frame with multiwall polycarbonate panels was selected to provide uniform daylight while minimizing structural weight.',
    engineeringDecision: 'A dome-shaped space frame with multiwall polycarbonate panels was selected to provide uniform daylight while minimizing structural weight.',
    executionDetail: 'Approximately 400 m² of naturally illuminated interior space created without intermediate supports.',
    measuredResult: 'Approximately 400 m² of naturally illuminated interior space created without intermediate supports.',
    riskPrevented: ['Water leakage', 'Excessive roof loading', 'Insufficient daylight', 'High daytime energy consumption'],
    cardImage: shahroodAzadUniversitySkylightCard,
    heroImage: shahroodAzadUniversitySkylightHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'shalamcheh-border-gate',
    projectName: {
      en: 'Shalamcheh Border Gate',
      fa: 'گیت ورودی مرز شلمچه',
      ar: 'بوابة منفذ شلمجة الحدودي',
      ru: 'Пограничный терминал Шаламче'
    },
    projectType: {
      en: 'Border Terminal Entrance',
      fa: 'پایانه و گیت مرزی',
      ar: 'محطة حدودية',
      ru: 'Пограничный терминал'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Khuzestan, Iran',
    area: '4,000 m²',
    challenge: 'The project required large unobstructed spans to accommodate heavy pedestrian and vehicle traffic while maintaining structural efficiency and climatic protection.',
    sipanelSolution: 'A lightweight space frame solution with sandwich panel roofing was selected to maximize span capability and accelerate construction.',
    engineeringDecision: 'A lightweight space frame solution with sandwich panel roofing was selected to maximize span capability and accelerate construction.',
    executionDetail: 'Approximately 4,000 m² of covered border terminal infrastructure delivered.',
    measuredResult: 'Approximately 4,000 m² of covered border terminal infrastructure delivered.',
    riskPrevented: ['Traffic obstruction', 'Construction delays', 'Excessive structural weight', 'Reduced operational capacity'],
    cardImage: shalamchehBorderGateCard,
    heroImage: shalamchehBorderGateHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'tarbiat-modares-research-greenhouse',
    projectName: {
      en: 'Tarbiat Modares University Research Greenhouse',
      fa: 'گلخانه تحقیقاتی دانشگاه تربیت مدرس',
      ar: 'البيت الزجاجي البحثي لجامعة تربيت مدرس',
      ru: 'Исследовательская теплица Университета Тарбиат Модаррес'
    },
    projectType: {
      en: 'Research Greenhouse',
      fa: 'گلخانه تحقیقاتی',
      ar: 'بيت زجاجي بحثي',
      ru: 'Исследовательская теплица'
    },
    mainService: claddingService,
    serviceHref: '/systems/aluminium-cladding-covering',
    location: 'Iran',
    area: '400 m²',
    challenge: 'The project required the installation of a transparent enclosure over a complex dome-shaped geometry while maintaining durability, daylight performance, and structural efficiency.',
    sipanelSolution: 'Implementation of lightweight polycarbonate panels combined with accurate geometric control of the space-frame structure.',
    engineeringDecision: 'Implementation of lightweight polycarbonate panels combined with accurate geometric control of the space-frame structure.',
    executionDetail: 'Successful completion of approximately 400 m² of polycarbonate enclosure for research and experimental greenhouse applications.',
    measuredResult: 'Successful completion of approximately 400 m² of polycarbonate enclosure for research and experimental greenhouse applications.',
    riskPrevented: ['Insufficient daylight penetration', 'Thermal performance issues', 'Geometry mismatch', 'Excessive structural loading'],
    cardImage: tarbiatModaresResearchGreenhouseCard,
    heroImage: tarbiatModaresResearchGreenhouseHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'tavanir-shahrekord-central-atrium',
    projectName: {
      en: 'Tavanir Shahrekord Central Atrium',
      fa: 'وید مرکزی شرکت توانیر شهرکرد',
      ar: 'الأتريوم المركزي لشركة توانير شهرکرد',
      ru: 'Центральный атриум компании Tavanir'
    },
    projectType: {
      en: 'Atrium Skylight',
      fa: 'پوشش وید مرکزی',
      ar: 'سقف أتريوم زجاجي',
      ru: 'Стеклянный атриум'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Shahrekord, Iran',
    area: 'Approx. 350 m²',
    challenge: 'Providing maximum daylight and architectural transparency while maintaining structural efficiency.',
    sipanelSolution: 'A lightweight space frame integrated with spider glass fittings was selected to minimize visual obstruction and maximize transparency.',
    engineeringDecision: 'A lightweight space frame integrated with spider glass fittings was selected to minimize visual obstruction and maximize transparency.',
    executionDetail: 'Completed transparent atrium enclosure delivering natural daylight and weather protection.',
    measuredResult: 'Completed transparent atrium enclosure delivering natural daylight and weather protection.',
    riskPrevented: ['Excessive structural weight', 'Daylight reduction', 'Visual obstruction', 'Complex glass support requirements'],
    cardImage: tavanirShahrekordCentralAtriumCard,
    heroImage: tavanirShahrekordCentralAtriumHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'tehran-mall-roof-garden-foodcourt',
    projectName: {
      en: 'Tehran Mall Roof Garden, Food Court & Cinema Roof',
      fa: 'سقف روف گاردن، فودکورت و سینمای تهران مال',
      ar: 'سقف حديقة السطح ومنطقة المطاعم والسينما في طهران مول',
      ru: 'Кровля Roof Garden, Food Court и кинотеатров Tehran Mall'
    },
    projectType: {
      en: 'Large-Span Roof Structure',
      fa: 'سقف فضاکار گسترده',
      ar: 'سقف واسع الامتداد',
      ru: 'Большепролетная кровля'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Tehran, Iran',
    area: 'Approx. 7,000 m²',
    challenge: 'Creating large column-free commercial and entertainment spaces while meeting architectural and structural requirements.',
    sipanelSolution: 'A long-span space frame system was selected to maximize open space, reduce structural weight and improve construction efficiency.',
    engineeringDecision: 'A long-span space frame system was selected to maximize open space, reduce structural weight and improve construction efficiency.',
    executionDetail: 'Successful completion of a large-scale roofing structure serving multiple public-use functions within Tehran Mall.',
    measuredResult: 'Successful completion of a large-scale roofing structure serving multiple public-use functions within Tehran Mall.',
    riskPrevented: ['Excessive structural loads', 'Operational interference from columns', 'Large-span construction challenges', 'Architectural restrictions'],
    cardImage: tehranMallRoofGardenFoodcourtCard,
    heroImage: tehranMallRoofGardenFoodcourtHero,
    resourceTitle: localized('Panel Selection Guide')
  },
  {
    slug: 'toranj-kish-restaurant',
    projectName: {
      en: 'Toranj Kish Hotel Restaurant Roof',
      fa: 'رستوران دریایی هتل ترنج کیش',
      ar: 'مطعم فندق ترنج كيش',
      ru: 'Ресторан отеля Toranj Kish'
    },
    projectType: {
      en: 'Overwater Restaurant',
      fa: 'رستوران روی آب',
      ar: 'مطعم فوق المياه',
      ru: 'Ресторан над водой'
    },
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Kish Island, Iran',
    area: 'Approx. 500 m²',
    challenge: 'Construction in a highly corrosive marine environment with logistical and operational constraints.',
    sipanelSolution: 'A lightweight space frame system was selected to minimize dead loads and facilitate installation over water.',
    engineeringDecision: 'A lightweight space frame system was selected to minimize dead loads and facilitate installation over water.',
    executionDetail: 'Successful completion of the restaurant roof structure in a demanding coastal environment.',
    measuredResult: 'Successful completion of the restaurant roof structure in a demanding coastal environment.',
    riskPrevented: ['Marine corrosion', 'Excessive structural weight', 'Installation difficulties', 'Operational disruptions'],
    cardImage: toranjKishRestaurantCard,
    heroImage: toranjKishRestaurantHero,
    resourceTitle: localized('Panel Selection Guide')
  }
];

// SIPANEL Project Prioritization (see CLAUDE.md): only these five approved project detail pages
// may be linked internally. Related-project sections must never point outside this set. Ordered
// by the strategic relevance hierarchy, not by array position.
const APPROVED_LINKED_PROJECT_SLUGS: readonly string[] = [
  'army-hospital',
  'ahvaz-airport-passenger-terminal',
  'mehrabad-aircraft-hangar',
  'mahshahr-taxi-parking',
  'kermanshah-industrial-university-petroleum-faculty'
];

function buildInitialCaseStudyPage(config: InitialCaseStudyConfig): CaseStudyPageData {
  return {
    slug: config.slug,
    routes: buildLocalizedCaseStudyRoutes(config.slug),
    detailLayout: config.detailLayout,
    localeContent: Object.fromEntries(
      locales.map((locale) => [locale, buildInitialLocaleContent(config, locale)])
    ) as Record<Locale, CaseStudyLocaleContent>
  };
}

function buildInitialLocaleContent(config: InitialCaseStudyConfig, locale: Locale): CaseStudyLocaleContent {
  const pendingLabel = pendingLabels[locale];
  const overrides = getLocaleOverrides(config, locale);
  const projectName = getProjectName(config, locale);
  const serviceTitle = config.mainService[locale];
  const projectType = config.projectType[locale];
  const location = localizeLocation(config.location, locale, pendingLabel);
  // Related projects may only point to the five approved slugs (SIPANEL Project Prioritization).
  // Honor an explicit relatedSlugs override but restrict it to approved slugs; otherwise fall back
  // to the approved set. Always exclude the current page. No array-order / slice(0, 3) selection.
  const overrideApproved = config.relatedSlugs?.filter((slug) => APPROVED_LINKED_PROJECT_SLUGS.includes(slug));
  const relatedSlugPool = (overrideApproved && overrideApproved.length > 0
    ? overrideApproved
    : APPROVED_LINKED_PROJECT_SLUGS
  ).filter((slug) => slug !== config.slug);
  const relatedSource = relatedSlugPool
    .map((slug) => initialCaseStudies.find((study) => study.slug === slug))
    .filter((study): study is InitialCaseStudyConfig => Boolean(study));
  const relatedStudies = relatedSource
    .map((study) => ({
      ...study,
      overrides: getLocaleOverrides(study, locale)
    }))
    .map(({overrides: relatedOverrides, ...study}) => ({
      projectName: getProjectName(study, locale),
      location: localizeLocation(study.location, locale, pendingLabel),
      areaM2: study.area,
      projectType: study.projectType[locale],
      challenge: relatedOverrides.challenge ?? defaultChallenge(study, locale, study.mainService[locale], study.projectType[locale]),
      engineeringDecision: relatedOverrides.engineeringDecision ?? defaultEngineeringDecision(study, locale, study.mainService[locale]),
      measuredResult: relatedOverrides.measuredResult ?? defaultMeasuredResult(study, locale, study.mainService[locale], study.area, study.projectType[locale]),
      href: `/projects/${study.slug}`,
      image: study.cardImage,
      assetStatus: study.cardImage ? ('available' as const) : ('pending' as const)
    }));
  const hasVerifiedProjectFields = Boolean(config.challenge && config.engineeringDecision && config.executionDetail && config.measuredResult);

  return {
    seo: {
      title: overrides?.seoTitle ?? caseStudyCopy[locale].seoTitle(projectName),
      metaDescription: overrides?.metaDescription ?? caseStudyCopy[locale].metaDescription(projectName, serviceTitle),
      h1: projectName
    },
    hero: {
      eyebrow: caseStudyCopy[locale].eyebrow,
      projectName,
      projectType,
      location,
      mainService: serviceTitle,
      shortSummary: overrides?.shortSummary ?? (hasVerifiedProjectFields ? defaultShortSummary(config, locale, projectName, serviceTitle) : caseStudyCopy[locale].shortSummary(serviceTitle)),
      primaryCta: overrides?.primaryCta ?? caseStudyCopy[locale].primaryCta,
      secondaryCta: caseStudyCopy[locale].secondaryCta,
      trustMicrocopy: overrides?.trustMicrocopy ?? caseStudyCopy[locale].trustMicrocopy,
      heroAlt: caseStudyCopy[locale].heroAlt(projectName),
      heroImage: config.heroImage,
      heroVideo: config.heroVideo ? {
        src: config.heroVideo.src,
        poster: config.heroVideo.poster,
        title: config.heroVideo.title[locale]
      } : undefined
    },
    projectSnapshot: {
      title: caseStudyCopy[locale].snapshotTitle,
      pendingLabel,
      items: [
        {label: caseStudyCopy[locale].snapshotLabels.projectType, value: projectType},
        {label: caseStudyCopy[locale].snapshotLabels.location, value: location, pending: !config.location},
        {label: caseStudyCopy[locale].snapshotLabels.area, value: config.area ?? pendingLabel, pending: !config.area},
        {label: caseStudyCopy[locale].snapshotLabels.duration, value: overrides?.snapshotDuration ?? pendingLabel, pending: !overrides?.snapshotDuration},
        {label: caseStudyCopy[locale].snapshotLabels.metrics, value: pendingLabel, pending: true}
      ]
    },
    challenge: {
      title: caseStudyCopy[locale].challengeTitle,
      summary: overrides?.challenge ?? (hasVerifiedProjectFields ? defaultChallenge(config, locale, serviceTitle, projectType) : caseStudyCopy[locale].challengeSummary(serviceTitle)),
      points: overrides?.challengePoints ?? (hasVerifiedProjectFields ? defaultChallengePoints(config, locale) : caseStudyCopy[locale].challengePoints),
      risk: overrides?.challenge ?? (hasVerifiedProjectFields ? defaultChallenge(config, locale, serviceTitle, projectType) : caseStudyCopy[locale].riskStatement)
    },
    engineeringDecision: {
      title: caseStudyCopy[locale].decisionTitle,
      summary: overrides?.sipanelSolution ?? (hasVerifiedProjectFields ? defaultSolution(config, locale, serviceTitle) : caseStudyCopy[locale].decisionSummary(serviceTitle)),
      technicalReasoning: overrides?.engineeringDecision ?? (hasVerifiedProjectFields ? defaultEngineeringDecision(config, locale, serviceTitle) : caseStudyCopy[locale].technicalReasoning),
      selectedSystemLogic: overrides?.selectedSystemLogic ?? defaultSelectedSystemLogic(locale, serviceTitle),
      coordinationNote: overrides?.coordinationNote ?? defaultCoordinationNote(locale)
    },
    executionDetail: {
      title: caseStudyCopy[locale].executionTitle,
      installationSequence: overrides?.executionDetail ?? (hasVerifiedProjectFields ? defaultExecution(config, locale) : caseStudyCopy[locale].installationSequence),
      procurementControl: overrides?.procurementControl ?? caseStudyCopy[locale].procurementControl,
      qualityCheckpoints: overrides?.qualityCheckpoints ?? caseStudyCopy[locale].qualityCheckpoints,
      coordinationWithSiteTeam: overrides?.coordinationWithSiteTeam ?? caseStudyCopy[locale].coordinationWithSiteTeam
    },
    technicalProofGallery: {
      title: caseStudyCopy[locale].galleryTitle,
      pendingLabel,
      openLabel: caseStudyCopy[locale].openGallery,
      zoomInLabel: caseStudyCopy[locale].zoomIn,
      zoomOutLabel: caseStudyCopy[locale].zoomOut,
      closeLabel: caseStudyCopy[locale].close,
      items: [
        {
          title: config.heroImage ? projectName : caseStudyCopy[locale].galleryItems.projectPhoto,
          description: config.heroImage ? overrides?.measuredResult ?? defaultMeasuredResult(config, locale, serviceTitle, config.area, projectType) : pendingLabel,
          image: config.heroImage,
          alt: config.heroImage ? caseStudyCopy[locale].projectImageAlt(projectName) : undefined,
          assetStatus: config.heroImage ? 'available' : 'pending',
          assetType: 'project_image'
        },
        {
          title: caseStudyCopy[locale].galleryItems.shopDrawing,
          description: pendingLabel,
          assetStatus: 'pending',
          assetType: 'shop_drawing'
        },
        {
          title: caseStudyCopy[locale].galleryItems.inspection,
          description: pendingLabel,
          assetStatus: 'pending',
          assetType: 'inspection_photo'
        }
      ]
    },
    measuredResult: {
      title: caseStudyCopy[locale].resultTitle,
      pendingLabel,
      items: overrides?.measuredResultItems ?? [
        {
          label: caseStudyCopy[locale].resultLabels.completion,
          value: overrides?.measuredResult ?? (hasVerifiedProjectFields ? defaultMeasuredResult(config, locale, serviceTitle, config.area, projectType) : pendingLabel),
          verificationStatus: (overrides?.measuredResult || hasVerifiedProjectFields) ? 'verified' : 'pending'
        },
        {label: caseStudyCopy[locale].resultLabels.waterproofing, value: pendingLabel, verificationStatus: 'pending'},
        {label: caseStudyCopy[locale].resultLabels.schedule, value: overrides?.snapshotDuration ?? pendingLabel, verificationStatus: overrides?.snapshotDuration ? 'verified' : 'pending'},
        {label: caseStudyCopy[locale].resultLabels.cost, value: pendingLabel, verificationStatus: 'pending'}
      ]
    },
    riskPrevented: {
      title: caseStudyCopy[locale].riskTitle,
      items: overrides?.riskItems
        ? overrides.riskItems
        : defaultRiskItems(config, locale)
    },
    relatedServices: {
      title: caseStudyCopy[locale].relatedServicesTitle,
      links: [
        {
          title: serviceTitle,
          href: config.serviceHref,
          description: caseStudyCopy[locale].primaryServiceDescription
        },
        ...(config.secondaryService
          ? [
              {
                title: config.secondaryService.title[locale],
                href: config.secondaryService.href,
                description: config.secondaryService.description[locale]
              }
            ]
          : []),
        {
          title: config.resourceTitle[locale],
          href: '/resources',
          description: caseStudyCopy[locale].resourceDescription
        }
      ]
    },
    relatedCaseStudies: {
      title: caseStudyCopy[locale].relatedCasesTitle,
      cta: caseStudyCopy[locale].relatedCasesCta,
      items: relatedStudies,
      pendingLabel
    },
    conversionCta: {
      headline: overrides?.conversionHeadline ?? caseStudyCopy[locale].conversionHeadline,
      text: overrides?.conversionText ?? caseStudyCopy[locale].conversionText,
      primaryCta: overrides?.conversionPrimaryCta ?? caseStudyCopy[locale].primaryCta,
      secondaryCta: caseStudyCopy[locale].whatsappCta
    }
  };
}

const caseStudyCopy = {
  en: {
    seoTitle: (projectName: string) => `${projectName} | SIPANEL Case Study`,
    metaDescription: (projectName: string, service: string) =>
      `${projectName} placeholder case study for ${service}, with pending verified proof states and active consultation paths.`,
    eyebrow: 'Case Study',
    shortSummary: (service: string) =>
      `A real-project case study structure for ${service}. Verified proof, metrics, location, and final results are pending internal confirmation.`,
    primaryCta: 'Request Technical Consultation',
    secondaryCta: 'View Related System',
    trustMicrocopy: 'Proof fields are intentionally pending until verified project records are available.',
    heroAlt: (projectName: string) => `${projectName} technical placeholder`,
    projectImageAlt: (projectName: string) => `${projectName} project photography`,
    snapshotTitle: 'Project snapshot',
    snapshotLabels: {
      projectType: 'Project type',
      location: 'Location',
      area: 'Area',
      duration: 'Duration',
      metrics: 'Metrics'
    },
    challengeTitle: 'Project challenge',
    challengeSummary: (service: string) =>
      `This page is structured for a ${service} project where the final project record has not yet been verified.`,
    challengePoints: [
      'Confirm architectural, structural, and envelope constraints before publishing final proof.',
      'Validate drawing status, procurement scope, and site responsibility boundaries.',
      'Keep unverified claims out of the page until source documents are available.'
    ],
    riskStatement: 'Risk statement pending verified project documentation.',
    decisionTitle: 'Engineering decision',
    decisionSummary: (service: string) =>
      `The selected system category is ${service}. Specific project decisions remain pending until engineering records are confirmed.`,
    technicalReasoning: 'Technical reasoning placeholder: confirm loads, drainage, joint logic, details, and installation constraints before publication.',
    selectedSystemLogic: (service: string) => `Selected system logic placeholder for ${service}.`,
    coordinationNote: 'Coordination note pending verified shop drawings, procurement files, and site notes.',
    executionTitle: 'Execution detail',
    installationSequence: 'Installation sequence pending verified method statement or site record.',
    procurementControl: 'Procurement control pending verified bill of materials and accessory scope.',
    coordinationWithSiteTeam: 'Site coordination pending verified project communication records.',
    qualityCheckpoints: [
      'Drawing approval status pending',
      'Material and accessory list pending',
      'Installation inspection records pending'
    ],
    galleryTitle: 'Technical proof gallery',
    openGallery: 'Open technical proof',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    close: 'Close',
    galleryItems: {
      projectPhoto: 'Real project photo pending',
      shopDrawing: 'Shop drawing proof pending',
      inspection: 'Inspection proof pending'
    },
    resultTitle: 'Measured result',
    resultLabels: {
      completion: 'Completion proof',
      waterproofing: 'Waterproofing result',
      schedule: 'Duration',
      cost: 'Cost impact'
    },
    riskTitle: 'Risks controlled before publication',
    riskItems: {
      layout: {
        risk: 'Unverified layout claims',
        explanation: 'Panel layout and detailing claims stay pending until source drawings are available.'
      },
      waterproofing: {
        risk: 'Unverified waterproofing performance',
        explanation: 'Leakage or waterproofing results are not published without project proof.'
      },
      procurement: {
        risk: 'Unverified procurement metrics',
        explanation: 'Waste, delivery, and cost claims remain pending until procurement records are confirmed.'
      }
    },
    relatedServicesTitle: 'Related services and resources',
    primaryServiceDescription: 'Primary service category connected to this case study structure.',
    resourceDescription: 'Related engineering resource for earlier technical review.',
    relatedCasesTitle: 'Related case studies',
    relatedCasesCta: 'View case study',
    relatedChallenge: 'Structured placeholder pending verified challenge data.',
    relatedDecision: 'Structured placeholder pending verified engineering decision.',
    conversionHeadline: 'Start with verified engineering review',
    conversionText: 'Send drawings or project context so SIPANEL can review scope before claims or metrics are published.',
    whatsappCta: 'Contact on WhatsApp'
  },
  fa: {
    seoTitle: (projectName: string) => `${projectName} | مطالعه موردی SIPANEL`,
    metaDescription: (projectName: string, service: string) =>
      `${projectName} ساختار اولیه مطالعه موردی برای ${service} با وضعیت‌های اثبات در انتظار تایید و مسیر فعال مشاوره.`,
    eyebrow: 'مطالعه موردی',
    shortSummary: (service: string) =>
      `ساختار مطالعه موردی پروژه واقعی برای ${service}. اثبات‌ها، اعداد، موقعیت و نتایج نهایی در انتظار تایید داخلی هستند.`,
    primaryCta: 'درخواست مشاوره فنی',
    secondaryCta: 'مشاهده سیستم مرتبط',
    trustMicrocopy: 'فیلدهای اثبات تا زمان دریافت سوابق تاییدشده عمدا در وضعیت انتظار می‌مانند.',
    heroAlt: (projectName: string) => `جایگزین فنی ${projectName}`,
    projectImageAlt: (projectName: string) => `عکس پروژه ${projectName}`,
    snapshotTitle: 'خلاصه پروژه',
    snapshotLabels: {
      projectType: 'نوع پروژه',
      location: 'موقعیت',
      area: 'مساحت',
      duration: 'مدت اجرا',
      metrics: 'شاخص‌ها'
    },
    challengeTitle: 'چالش پروژه',
    challengeSummary: (service: string) =>
      `این صفحه برای پروژه ${service} ساختاردهی شده و پرونده نهایی پروژه هنوز تایید نشده است.`,
    challengePoints: [
      'قیود معماری، سازه و پوسته پیش از انتشار اثبات نهایی تایید شود.',
      'وضعیت نقشه‌ها، محدوده تامین و مرز مسئولیت کارگاه بررسی شود.',
      'ادعاهای تاییدنشده تا زمان دسترسی به اسناد منبع منتشر نشود.'
    ],
    riskStatement: 'بیانیه ریسک در انتظار مستندات تاییدشده پروژه است.',
    decisionTitle: 'تصمیم مهندسی',
    decisionSummary: (service: string) =>
      `دسته سیستم انتخابی ${service} است. تصمیمات اختصاصی پروژه تا تایید سوابق مهندسی در انتظار می‌مانند.`,
    technicalReasoning: 'جایگزین منطق فنی: بارها، زهکشی، منطق اتصال، دیتیل‌ها و قیود نصب پیش از انتشار تایید شوند.',
    selectedSystemLogic: (service: string) => `جایگزین منطق انتخاب سیستم برای ${service}.`,
    coordinationNote: 'یادداشت هماهنگی در انتظار شاپ دراوینگ، پرونده تامین و گزارش‌های کارگاهی تاییدشده است.',
    executionTitle: 'جزئیات اجرا',
    installationSequence: 'ترتیب نصب در انتظار روش اجرا یا سابقه کارگاهی تاییدشده است.',
    procurementControl: 'کنترل تامین در انتظار لیست متریال و محدوده اکسسوری تاییدشده است.',
    coordinationWithSiteTeam: 'هماهنگی کارگاه در انتظار سوابق ارتباطی تاییدشده پروژه است.',
    qualityCheckpoints: [
      'وضعیت تایید نقشه در انتظار است',
      'لیست متریال و اکسسوری در انتظار است',
      'سوابق بازرسی نصب در انتظار است'
    ],
    galleryTitle: 'گالری اثبات فنی',
    openGallery: 'باز کردن اثبات فنی',
    zoomIn: 'بزرگ‌نمایی',
    zoomOut: 'کوچک‌نمایی',
    close: 'بستن',
    galleryItems: {
      projectPhoto: 'عکس واقعی پروژه در انتظار است',
      shopDrawing: 'اثبات شاپ دراوینگ در انتظار است',
      inspection: 'اثبات بازرسی در انتظار است'
    },
    resultTitle: 'نتیجه قابل اندازه‌گیری',
    resultLabels: {
      completion: 'اثبات تکمیل',
      waterproofing: 'نتیجه آب‌بندی',
      schedule: 'مدت اجرا',
      cost: 'اثر هزینه'
    },
    riskTitle: 'ریسک‌های کنترل‌شده پیش از انتشار',
    riskItems: {
      layout: {
        risk: 'ادعای تاییدنشده درباره چیدمان',
        explanation: 'ادعاهای چیدمان و دیتیل پانل تا زمان دسترسی به نقشه‌های منبع در انتظار می‌مانند.'
      },
      waterproofing: {
        risk: 'عملکرد تاییدنشده آب‌بندی',
        explanation: 'نتایج نشتی یا آب‌بندی بدون اثبات پروژه منتشر نمی‌شود.'
      },
      procurement: {
        risk: 'شاخص‌های تاییدنشده تامین',
        explanation: 'ادعاهای پرت، تحویل و هزینه تا تایید سوابق تامین در انتظار می‌مانند.'
      }
    },
    relatedServicesTitle: 'خدمات و منابع مرتبط',
    primaryServiceDescription: 'دسته خدمت اصلی مرتبط با این ساختار مطالعه موردی.',
    resourceDescription: 'منبع مهندسی مرتبط برای بررسی فنی اولیه.',
    relatedCasesTitle: 'مطالعات موردی مرتبط',
    relatedCasesCta: 'مشاهده مطالعه موردی',
    relatedChallenge: 'جایگزین ساختاریافته در انتظار داده تاییدشده چالش.',
    relatedDecision: 'جایگزین ساختاریافته در انتظار تصمیم مهندسی تاییدشده.',
    conversionHeadline: 'با بررسی مهندسی تاییدپذیر شروع کنید',
    conversionText: 'نقشه‌ها یا اطلاعات پروژه را ارسال کنید تا SIPANEL محدوده را پیش از انتشار ادعا یا شاخص بررسی کند.',
    whatsappCta: 'تماس در واتساپ'
  },
  ar: {
    seoTitle: (projectName: string) => `${projectName} | دراسة حالة SIPANEL`,
    metaDescription: (projectName: string, service: string) =>
      `${projectName} هيكل أولي لدراسة حالة ${service} مع حالات إثبات بانتظار التوثيق ومسارات استشارة فعالة.`,
    eyebrow: 'دراسة حالة',
    shortSummary: (service: string) =>
      `هيكل دراسة حالة لمشروع حقيقي في ${service}. الإثباتات والمقاييس والموقع والنتائج النهائية بانتظار تأكيد داخلي.`,
    primaryCta: 'اطلب استشارة فنية',
    secondaryCta: 'عرض النظام المرتبط',
    trustMicrocopy: 'تبقى حقول الإثبات معلقة عمدا حتى تتوفر سجلات المشروع الموثقة.',
    heroAlt: (projectName: string) => `عنصر تقني بديل لـ ${projectName}`,
    projectImageAlt: (projectName: string) => `صورة مشروع ${projectName}`,
    snapshotTitle: 'ملخص المشروع',
    snapshotLabels: {
      projectType: 'نوع المشروع',
      location: 'الموقع',
      area: 'المساحة',
      duration: 'المدة',
      metrics: 'المقاييس'
    },
    challengeTitle: 'تحدي المشروع',
    challengeSummary: (service: string) =>
      `تمت هيكلة هذه الصفحة لمشروع ${service} بينما سجل المشروع النهائي غير موثق بعد.`,
    challengePoints: [
      'تأكيد قيود العمارة والهيكل والغلاف قبل نشر الإثبات النهائي.',
      'التحقق من حالة الرسومات ونطاق التوريد وحدود مسؤولية الموقع.',
      'عدم نشر أي ادعاءات غير موثقة قبل توفر المستندات المصدرية.'
    ],
    riskStatement: 'بيان المخاطر بانتظار وثائق مشروع موثقة.',
    decisionTitle: 'القرار الهندسي',
    decisionSummary: (service: string) =>
      `فئة النظام المحددة هي ${service}. قرارات المشروع التفصيلية تبقى معلقة حتى تأكيد السجلات الهندسية.`,
    technicalReasoning: 'نص بديل للمنطق الفني: يجب تأكيد الأحمال والتصريف ومنطق الوصلات والتفاصيل وقيود التركيب قبل النشر.',
    selectedSystemLogic: (service: string) => `نص بديل لمنطق اختيار النظام لـ ${service}.`,
    coordinationNote: 'ملاحظة التنسيق بانتظار رسومات الورشة وملفات التوريد وملاحظات الموقع الموثقة.',
    executionTitle: 'تفاصيل التنفيذ',
    installationSequence: 'تسلسل التركيب بانتظار بيان طريقة أو سجل موقع موثق.',
    procurementControl: 'ضبط التوريد بانتظار قائمة مواد ونطاق ملحقات موثق.',
    coordinationWithSiteTeam: 'تنسيق الموقع بانتظار سجلات تواصل موثقة للمشروع.',
    qualityCheckpoints: [
      'حالة اعتماد الرسومات معلقة',
      'قائمة المواد والملحقات معلقة',
      'سجلات فحص التركيب معلقة'
    ],
    galleryTitle: 'معرض الإثبات الفني',
    openGallery: 'فتح الإثبات الفني',
    zoomIn: 'تكبير',
    zoomOut: 'تصغير',
    close: 'إغلاق',
    galleryItems: {
      projectPhoto: 'صورة المشروع الحقيقية معلقة',
      shopDrawing: 'إثبات رسومات الورشة معلق',
      inspection: 'إثبات الفحص معلق'
    },
    resultTitle: 'النتيجة القابلة للقياس',
    resultLabels: {
      completion: 'إثبات الإكمال',
      waterproofing: 'نتيجة العزل المائي',
      schedule: 'المدة',
      cost: 'أثر التكلفة'
    },
    riskTitle: 'مخاطر مضبوطة قبل النشر',
    riskItems: {
      layout: {
        risk: 'ادعاءات تخطيط غير موثقة',
        explanation: 'تبقى ادعاءات تخطيط الألواح والتفاصيل معلقة حتى تتوفر الرسومات المصدرية.'
      },
      waterproofing: {
        risk: 'أداء عزل مائي غير موثق',
        explanation: 'لا تنشر نتائج التسرب أو العزل المائي دون إثبات المشروع.'
      },
      procurement: {
        risk: 'مقاييس توريد غير موثقة',
        explanation: 'تبقى ادعاءات الهدر والتسليم والتكلفة معلقة حتى تأكيد سجلات التوريد.'
      }
    },
    relatedServicesTitle: 'الخدمات والموارد المرتبطة',
    primaryServiceDescription: 'فئة الخدمة الأساسية المرتبطة بهيكل دراسة الحالة هذا.',
    resourceDescription: 'مورد هندسي مرتبط للمراجعة الفنية المبكرة.',
    relatedCasesTitle: 'دراسات حالة مرتبطة',
    relatedCasesCta: 'عرض دراسة الحالة',
    relatedChallenge: 'نص منظم بانتظار بيانات تحدي موثقة.',
    relatedDecision: 'نص منظم بانتظار قرار هندسي موثق.',
    conversionHeadline: 'ابدأ بمراجعة هندسية قابلة للتوثيق',
    conversionText: 'أرسل الرسومات أو سياق المشروع حتى تراجع SIPANEL النطاق قبل نشر أي ادعاءات أو مقاييس.',
    whatsappCta: 'تواصل عبر واتساب'
  },
  ru: {
    seoTitle: (projectName: string) => `${projectName} | Кейс SIPANEL`,
    metaDescription: (projectName: string, service: string) =>
      `${projectName}: базовая структура кейса для ${service}, с ожидающими подтверждения доказательствами и активными путями консультации.`,
    eyebrow: 'Кейс',
    shortSummary: (service: string) =>
      `Структура кейса реального проекта для ${service}. Доказательства, метрики, локация и итоговые результаты ожидают внутреннего подтверждения.`,
    primaryCta: 'Запросить техническую консультацию',
    secondaryCta: 'Смотреть связанную систему',
    trustMicrocopy: 'Поля доказательств намеренно ожидают подтвержденные проектные записи.',
    heroAlt: (projectName: string) => `Технический placeholder для ${projectName}`,
    projectImageAlt: (projectName: string) => `Фотография проекта ${projectName}`,
    snapshotTitle: 'Сводка проекта',
    snapshotLabels: {
      projectType: 'Тип проекта',
      location: 'Локация',
      area: 'Площадь',
      duration: 'Срок',
      metrics: 'Метрики'
    },
    challengeTitle: 'Задача проекта',
    challengeSummary: (service: string) =>
      `Эта страница подготовлена для проекта ${service}, но окончательная проектная запись еще не подтверждена.`,
    challengePoints: [
      'Подтвердить архитектурные, конструктивные и фасадные ограничения до публикации доказательств.',
      'Проверить статус чертежей, объем поставки и зоны ответственности площадки.',
      'Не публиковать неподтвержденные заявления до появления исходных документов.'
    ],
    riskStatement: 'Формулировка риска ожидает подтвержденную проектную документацию.',
    decisionTitle: 'Инженерное решение',
    decisionSummary: (service: string) =>
      `Выбранная категория системы: ${service}. Конкретные проектные решения ожидают подтверждения инженерных записей.`,
    technicalReasoning: 'Placeholder технической логики: подтвердить нагрузки, водоотвод, логику стыков, детали и монтажные ограничения до публикации.',
    selectedSystemLogic: (service: string) => `Placeholder логики выбора системы для ${service}.`,
    coordinationNote: 'Координационная заметка ожидает подтвержденные рабочие чертежи, файлы поставки и записи площадки.',
    executionTitle: 'Детали выполнения',
    installationSequence: 'Последовательность монтажа ожидает подтвержденную методику или запись площадки.',
    procurementControl: 'Контроль поставок ожидает подтвержденную ведомость материалов и объем аксессуаров.',
    coordinationWithSiteTeam: 'Координация с площадкой ожидает подтвержденные коммуникационные записи проекта.',
    qualityCheckpoints: [
      'Статус утверждения чертежей ожидается',
      'Список материалов и аксессуаров ожидается',
      'Записи инспекции монтажа ожидаются'
    ],
    galleryTitle: 'Галерея технических доказательств',
    openGallery: 'Открыть техническое доказательство',
    zoomIn: 'Увеличить',
    zoomOut: 'Уменьшить',
    close: 'Закрыть',
    galleryItems: {
      projectPhoto: 'Реальное фото проекта ожидается',
      shopDrawing: 'Доказательство рабочих чертежей ожидается',
      inspection: 'Доказательство инспекции ожидается'
    },
    resultTitle: 'Измеримый результат',
    resultLabels: {
      completion: 'Доказательство завершения',
      waterproofing: 'Результат гидроизоляции',
      schedule: 'Срок',
      cost: 'Влияние на стоимость'
    },
    riskTitle: 'Риски, контролируемые до публикации',
    riskItems: {
      layout: {
        risk: 'Неподтвержденные заявления о раскладке',
        explanation: 'Заявления о раскладке панелей и деталях остаются ожидающими до получения исходных чертежей.'
      },
      waterproofing: {
        risk: 'Неподтвержденная водонепроницаемость',
        explanation: 'Результаты протечек или гидроизоляции не публикуются без проектных доказательств.'
      },
      procurement: {
        risk: 'Неподтвержденные метрики поставки',
        explanation: 'Заявления об отходах, доставке и стоимости ожидают подтверждения записей поставки.'
      }
    },
    relatedServicesTitle: 'Связанные услуги и ресурсы',
    primaryServiceDescription: 'Основная категория услуги, связанная с этой структурой кейса.',
    resourceDescription: 'Связанный инженерный ресурс для ранней технической проверки.',
    relatedCasesTitle: 'Связанные кейсы',
    relatedCasesCta: 'Смотреть кейс',
    relatedChallenge: 'Структурированный placeholder ожидает подтвержденные данные задачи.',
    relatedDecision: 'Структурированный placeholder ожидает подтвержденное инженерное решение.',
    conversionHeadline: 'Начните с проверяемой инженерной оценки',
    conversionText: 'Отправьте чертежи или контекст проекта, чтобы SIPANEL проверила объем до публикации заявлений или метрик.',
    whatsappCta: 'Связаться в WhatsApp'
  }
};

export const caseStudyPages: Record<string, CaseStudyPageData> = Object.fromEntries(
  initialCaseStudies.map((config) => [config.slug, buildInitialCaseStudyPage(config)])
);

export function getCaseStudyPageData(slug: string) {
  return caseStudyPages[slug] ?? null;
}

export function getCaseStudyCardMeta(slug: string): {cardImage?: StaticImageData; area?: string} | null {
  const config = initialCaseStudies.find((item) => item.slug === slug);
  if (!config) return null;
  return {cardImage: config.cardImage, area: config.area};
}

export function listCaseStudySlugs() {
  return Object.keys(caseStudyPages);
}

export function getCaseStudyPageMetadata(locale: Locale, page: CaseStudyPageData): Metadata {
  const content = page.localeContent[locale];

  return buildPageMetadata({
    locale,
    title: content.seo.title,
    description: content.seo.metaDescription,
    routes: page.routes,
    type: 'article'
  });
}

export function getCaseStudyBreadcrumbLabels(locale: Locale) {
  return {
    home: {
      en: 'Home',
      fa: 'خانه',
      ar: 'الرئيسية',
      ru: 'Главная'
    }[locale],
    projects: {
      en: 'Projects',
      fa: 'پروژه‌ها',
      ar: 'المشاريع',
      ru: 'Проекты'
    }[locale]
  };
}

export function buildCaseStudyArticleSchema(locale: Locale, page: CaseStudyPageData) {
  const content = page.localeContent[locale];

  return buildArticleSchema(locale, `${page.routes[locale]}#article`, {
    headline: content.seo.h1,
    description: content.seo.metaDescription,
    url: page.routes[locale]
  });
}

export function buildCaseStudyServiceSchema(locale: Locale, page: CaseStudyPageData) {
  const content = page.localeContent[locale];

  return buildServiceSchema(locale, `${page.routes[locale]}#service`, {
    name: content.hero.mainService,
    description: content.engineeringDecision.summary,
    serviceType: content.hero.mainService,
    url: page.routes[locale]
  });
}

export function buildCaseStudyWebPageSchema(locale: Locale, page: CaseStudyPageData) {
  const content = page.localeContent[locale];

  return buildWebPageSchema(locale, {
    name: content.seo.h1,
    description: content.seo.metaDescription,
    url: page.routes[locale]
  });
}

export function buildCaseStudyBreadcrumbSchema(locale: Locale, page: CaseStudyPageData) {
  const labels = getCaseStudyBreadcrumbLabels(locale);

  return buildBreadcrumbListSchema(locale, `${page.routes[locale]}#breadcrumb`, [
    {name: labels.home, item: getLocalizedPath(locale)},
    {name: labels.projects, item: getLocalizedPath(locale, '/projects')},
    {name: contentTitle(page, locale), item: page.routes[locale]}
  ]);
}

export function buildCaseStudyOrganizationSchema(locale: Locale, _page: CaseStudyPageData) {
  return buildOrganizationSchema(locale);
}

function contentTitle(page: CaseStudyPageData, locale: Locale) {
  return page.localeContent[locale].hero.projectName;
}

export function buildLocalizedCaseStudyRoutes(slug: string) {
  return {
    en: getLocalizedPath('en', `/projects/${slug}`),
    fa: getLocalizedPath('fa', `/projects/${slug}`),
    ar: getLocalizedPath('ar', `/projects/${slug}`),
    ru: getLocalizedPath('ru', `/projects/${slug}`)
  };
}

export function buildEmptyRelatedCaseStudies(locale: Locale, pendingLabel: string) {
  return [
    {
      projectName: pendingLabel,
      location: '',
      challenge: pendingLabel,
      engineeringDecision: pendingLabel,
      measuredResult: pendingLabel,
      assetStatus: 'pending' as const
    }
  ];
}

export function isSupportedCaseStudyRoute(locale: Locale, slug: string) {
  return locales.includes(locale) && Boolean(caseStudyPages[slug]);
}
