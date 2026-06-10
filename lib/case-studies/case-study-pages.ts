import type {Metadata} from 'next';
import type {StaticImageData} from 'next/image';
import {locales, type Locale} from '@/i18n/routing';
import {buildPageMetadata} from '@/lib/seo/metadata';
import {
  buildArticleSchema,
  buildBreadcrumbListSchema,
  buildOrganizationSchema,
  buildServiceSchema
} from '@/lib/seo/schema';
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
  localeOverrides?: Partial<Record<Locale, CaseStudyLocaleOverrides>>;
};

type CaseStudyLocaleOverrides = {
  shortSummary?: string;
  trustMicrocopy?: string;
  primaryCta?: string;
  snapshotDuration?: string;
  challenge?: string;
  challengePoints?: string[];
  sipanelSolution?: string;
  engineeringDecision?: string;
  executionDetail?: string;
  measuredResult?: string;
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
        shortSummary: 'تسليم مستشفى جاهز للتشغيل من الحفر حتى الجاهزية في أقل من ٥٠ يوماً خلال جائحة كورونا.',
        trustMicrocopy: 'تسليم EPC كامل بواسطة SIPANEL — الهندسة والتوريد والتنفيذ.',
        primaryCta: 'ناقش مشروعاً حرجاً زمنياً',
        snapshotDuration: 'أقل من ٥٠ يوماً',
        conversionHeadline: 'لديك مشروع حرج زمنياً؟',
        conversionText: 'أرسل رسومات المشروع أو سياقه ليراجع فريق SIPANEL الهندسي النطاق والمخاطر والجدول الزمني.',
        conversionPrimaryCta: 'ناقش مشروعاً حرجاً زمنياً'
      },
      ru: {
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
    projectName: localized('Andimeshk Stadium'),
    projectType: localized('Double-curved stadium roofing system'),
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Andimeshk, Khuzestan, Iran',
    area: '6,000 m2',
    challenge: 'A large double-curved stadium roof required precise sandwich panel coordination, structural alignment accuracy, waterproofing continuity, and controlled installation.',
    sipanelSolution: 'SIPANEL engineered a coordinated sandwich panel roofing system optimized for the stadium double-arched structure.',
    engineeringDecision: 'Engineering teams prepared structural alignment studies, sandwich panel layout drawings, drainage coordination details, and installation sequencing strategies.',
    executionDetail: 'Installation teams followed engineered sequencing, fastening coordination, alignment checkpoints, and sealing verification workflows.',
    measuredResult: 'A durable stadium roof was delivered with reliable sandwich panel performance, accurate curved geometry, and controlled installation quality.',
    riskPrevented: ['Sandwich panel deformation', 'Drainage failures', 'Structural misalignment', 'Water penetration'],
    cardImage: andimeshkCard,
    heroImage: andimeshkHero,
    resourceTitle: localized('Panel Selection Guide')
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
    projectName: localized('Mahshahr Taxi Parking Facility'),
    projectType: localized('Commercial parking roofing system'),
    mainService: sandwichPanelService,
    serviceHref: '/systems/sandwich-panel-systems',
    location: 'Bandar Mahshahr, Khuzestan, Iran',
    area: '4,000 m2',
    challenge: 'A coastal parking facility required sandwich panel coordination, controlled rainwater drainage, waterproofing continuity, and corrosion-resistant detailing.',
    sipanelSolution: 'SIPANEL designed a coordinated sandwich panel roofing and drainage system with engineered gutters, optimized slopes, and controlled water flow paths.',
    engineeringDecision: 'Engineering teams optimized drainage slopes, gutter positioning, downspout coordination, and sandwich panel alignment.',
    executionDetail: 'Roof panels, gutters, flashing systems, and downspouts were installed using controlled alignment, fastening checkpoints, and sealing verification.',
    measuredResult: 'A durable sandwich panel roofing system was delivered with reliable rainwater management, long-term weather protection, and controlled drainage performance.',
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
    challenge: 'The main challenge was the curved front architectural feature, where the covering had to be bent in a perpendicular direction, making the execution technically difficult.',
    sipanelSolution: 'Custom execution detailing, geometric control of the curved form, and precise coordination between substructure, aluminium panels, and ZIP-TECH system.',
    engineeringDecision: 'Custom execution detailing, geometric control of the curved form, and precise coordination between substructure, aluminium panels, and ZIP-TECH system.',
    executionDetail: 'Successful execution of 4,000 m² of ZIP-TECH and aluminium cladding while preserving the curved architectural form and final visual quality.',
    measuredResult: 'Successful execution of 4,000 m² of ZIP-TECH and aluminium cladding while preserving the curved architectural form and final visual quality.',
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
    challenge: 'The key challenge was designing facade connections so that structural movement during earthquakes would not damage or break the glass panels.',
    sipanelSolution: 'Connection details were engineered to accommodate relative structural displacement and reduce stress transfer to the glass facade.',
    engineeringDecision: 'Connection details were engineered to accommodate relative structural displacement and reduce stress transfer to the glass facade.',
    executionDetail: 'Successful execution of approximately 1,000 m² of glass facade, which reportedly performed without glass damage during the Kermanshah earthquake in the 1390s Solar Hijri decade.',
    measuredResult: 'Successful execution of approximately 1,000 m² of glass facade, which reportedly performed without glass damage during the Kermanshah earthquake in the 1390s Solar Hijri decade.',
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
    challenge: 'The main challenge was the severe curvature of the structure and the need for accurate sandwich panel installation over a continuous curved geometry.',
    sipanelSolution: 'Precise coordination between the space frame, substructure, and panel installation sequence to preserve the curved form and avoid visual breaks.',
    engineeringDecision: 'Precise coordination between the space frame, substructure, and panel installation sequence to preserve the curved form and avoid visual breaks.',
    executionDetail: 'Successful execution of 5,000 m² of sandwich panel covering while maintaining the geometric continuity of the curved surface.',
    measuredResult: 'Successful execution of 5,000 m² of sandwich panel covering while maintaining the geometric continuity of the curved surface.',
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
  const overrides = config.localeOverrides?.[locale];
  const projectName = config.projectName[locale];
  const serviceTitle = config.mainService[locale];
  const relatedStudies = initialCaseStudies
    .filter((study) => study.slug !== config.slug)
    .slice(0, 3)
    .map((study) => ({
      projectName: study.projectName[locale],
      location: study.location ?? pendingLabel,
      areaM2: study.area,
      projectType: study.projectType[locale],
      challenge: study.challenge ?? caseStudyCopy[locale].relatedChallenge,
      engineeringDecision: study.engineeringDecision ?? caseStudyCopy[locale].relatedDecision,
      measuredResult: study.measuredResult ?? pendingLabel,
      href: `/projects/${study.slug}`,
      image: study.cardImage,
      assetStatus: study.cardImage ? ('available' as const) : ('pending' as const)
    }));
  const hasVerifiedProjectFields = Boolean(config.challenge && config.engineeringDecision && config.executionDetail && config.measuredResult);

  return {
    seo: {
      title: caseStudyCopy[locale].seoTitle(projectName),
      metaDescription: caseStudyCopy[locale].metaDescription(projectName, serviceTitle),
      h1: projectName
    },
    hero: {
      eyebrow: caseStudyCopy[locale].eyebrow,
      projectName,
      projectType: config.projectType[locale],
      location: config.location ?? pendingLabel,
      mainService: serviceTitle,
      shortSummary: overrides?.shortSummary
        ?? (hasVerifiedProjectFields
          ? `${projectName} case study for ${serviceTitle}, focused on engineering coordination, controlled execution, and project risk reduction.`
          : caseStudyCopy[locale].shortSummary(serviceTitle)),
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
        {label: caseStudyCopy[locale].snapshotLabels.projectType, value: config.projectType[locale]},
        {label: caseStudyCopy[locale].snapshotLabels.location, value: config.location ?? pendingLabel, pending: !config.location},
        {label: caseStudyCopy[locale].snapshotLabels.area, value: config.area ?? pendingLabel, pending: !config.area},
        {label: caseStudyCopy[locale].snapshotLabels.duration, value: overrides?.snapshotDuration ?? pendingLabel, pending: !overrides?.snapshotDuration},
        {label: caseStudyCopy[locale].snapshotLabels.metrics, value: pendingLabel, pending: true}
      ]
    },
    challenge: {
      title: caseStudyCopy[locale].challengeTitle,
      summary: overrides?.challenge ?? config.challenge ?? caseStudyCopy[locale].challengeSummary(serviceTitle),
      points: overrides?.challengePoints ?? config.riskPrevented ?? caseStudyCopy[locale].challengePoints,
      risk: overrides?.challenge ?? config.challenge ?? caseStudyCopy[locale].riskStatement
    },
    engineeringDecision: {
      title: caseStudyCopy[locale].decisionTitle,
      summary: overrides?.sipanelSolution ?? config.sipanelSolution ?? caseStudyCopy[locale].decisionSummary(serviceTitle),
      technicalReasoning: overrides?.engineeringDecision ?? config.engineeringDecision ?? caseStudyCopy[locale].technicalReasoning,
      selectedSystemLogic: caseStudyCopy[locale].selectedSystemLogic(serviceTitle),
      coordinationNote: caseStudyCopy[locale].coordinationNote
    },
    executionDetail: {
      title: caseStudyCopy[locale].executionTitle,
      installationSequence: overrides?.executionDetail ?? config.executionDetail ?? caseStudyCopy[locale].installationSequence,
      procurementControl: caseStudyCopy[locale].procurementControl,
      qualityCheckpoints: caseStudyCopy[locale].qualityCheckpoints,
      coordinationWithSiteTeam: caseStudyCopy[locale].coordinationWithSiteTeam
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
          description: config.heroImage ? config.measuredResult : pendingLabel,
          image: config.heroImage,
          alt: config.heroImage ? `${projectName} project photography` : undefined,
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
      items: [
        {
          label: caseStudyCopy[locale].resultLabels.completion,
          value: overrides?.measuredResult ?? config.measuredResult ?? pendingLabel,
          verificationStatus: (overrides?.measuredResult || config.measuredResult) ? 'verified' : 'pending'
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
        : config.riskPrevented
        ? config.riskPrevented.slice(0, 4).map((risk) => ({
            risk,
            explanation: `${risk} was controlled through engineering review, coordinated detailing, and installation checkpoints.`
          }))
        : [
            {
              risk: caseStudyCopy[locale].riskItems.layout.risk,
              explanation: caseStudyCopy[locale].riskItems.layout.explanation
            },
            {
              risk: caseStudyCopy[locale].riskItems.waterproofing.risk,
              explanation: caseStudyCopy[locale].riskItems.waterproofing.explanation
            },
            {
              risk: caseStudyCopy[locale].riskItems.procurement.risk,
              explanation: caseStudyCopy[locale].riskItems.procurement.explanation
            }
          ]
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

export function buildCaseStudyBreadcrumbSchema(locale: Locale, page: CaseStudyPageData) {
  const labels = getCaseStudyBreadcrumbLabels(locale);

  return buildBreadcrumbListSchema(locale, `${page.routes[locale]}#breadcrumb`, [
    {name: labels.home, item: `/${locale}`},
    {name: labels.projects, item: `/${locale}/projects`},
    {name: contentTitle(page, locale), item: page.routes[locale]}
  ]);
}

export function buildCaseStudyOrganizationSchema(locale: Locale, page: CaseStudyPageData) {
  return buildOrganizationSchema(locale, `${page.routes[locale]}#organization`);
}

function contentTitle(page: CaseStudyPageData, locale: Locale) {
  return page.localeContent[locale].hero.projectName;
}

export function buildLocalizedCaseStudyRoutes(slug: string) {
  return {
    en: `/en/projects/${slug}`,
    fa: `/fa/projects/${slug}`,
    ar: `/ar/projects/${slug}`,
    ru: `/ru/projects/${slug}`
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
