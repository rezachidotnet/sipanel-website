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
  localeContent: Record<Locale, CaseStudyLocaleContent>;
};

export type CaseStudyPageMetadata = Metadata;

type LocalizedText = Record<Locale, string>;

type InitialCaseStudyConfig = {
  slug: string;
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
  secondaryService?: {
    title: LocalizedText;
    href: string;
    description: LocalizedText;
  };
  resourceTitle: LocalizedText;
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
  }
];

function buildInitialCaseStudyPage(config: InitialCaseStudyConfig): CaseStudyPageData {
  return {
    slug: config.slug,
    routes: buildLocalizedCaseStudyRoutes(config.slug),
    localeContent: Object.fromEntries(
      locales.map((locale) => [locale, buildInitialLocaleContent(config, locale)])
    ) as Record<Locale, CaseStudyLocaleContent>
  };
}

function buildInitialLocaleContent(config: InitialCaseStudyConfig, locale: Locale): CaseStudyLocaleContent {
  const pendingLabel = pendingLabels[locale];
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
      shortSummary: hasVerifiedProjectFields
        ? `${projectName} case study for ${serviceTitle}, focused on engineering coordination, controlled execution, and project risk reduction.`
        : caseStudyCopy[locale].shortSummary(serviceTitle),
      primaryCta: caseStudyCopy[locale].primaryCta,
      secondaryCta: caseStudyCopy[locale].secondaryCta,
      trustMicrocopy: caseStudyCopy[locale].trustMicrocopy,
      heroAlt: caseStudyCopy[locale].heroAlt(projectName),
      heroImage: config.heroImage
    },
    projectSnapshot: {
      title: caseStudyCopy[locale].snapshotTitle,
      pendingLabel,
      items: [
        {label: caseStudyCopy[locale].snapshotLabels.projectType, value: config.projectType[locale]},
        {label: caseStudyCopy[locale].snapshotLabels.location, value: config.location ?? pendingLabel, pending: !config.location},
        {label: caseStudyCopy[locale].snapshotLabels.area, value: config.area ?? pendingLabel, pending: !config.area},
        {label: caseStudyCopy[locale].snapshotLabels.duration, value: pendingLabel, pending: true},
        {label: caseStudyCopy[locale].snapshotLabels.metrics, value: pendingLabel, pending: true}
      ]
    },
    challenge: {
      title: caseStudyCopy[locale].challengeTitle,
      summary: config.challenge ?? caseStudyCopy[locale].challengeSummary(serviceTitle),
      points: config.riskPrevented ?? caseStudyCopy[locale].challengePoints,
      risk: config.challenge ?? caseStudyCopy[locale].riskStatement
    },
    engineeringDecision: {
      title: caseStudyCopy[locale].decisionTitle,
      summary: config.sipanelSolution ?? caseStudyCopy[locale].decisionSummary(serviceTitle),
      technicalReasoning: config.engineeringDecision ?? caseStudyCopy[locale].technicalReasoning,
      selectedSystemLogic: caseStudyCopy[locale].selectedSystemLogic(serviceTitle),
      coordinationNote: caseStudyCopy[locale].coordinationNote
    },
    executionDetail: {
      title: caseStudyCopy[locale].executionTitle,
      installationSequence: config.executionDetail ?? caseStudyCopy[locale].installationSequence,
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
          value: config.measuredResult ?? pendingLabel,
          verificationStatus: config.measuredResult ? 'verified' : 'pending'
        },
        {label: caseStudyCopy[locale].resultLabels.waterproofing, value: pendingLabel, verificationStatus: 'pending'},
        {label: caseStudyCopy[locale].resultLabels.schedule, value: pendingLabel, verificationStatus: 'pending'},
        {label: caseStudyCopy[locale].resultLabels.cost, value: pendingLabel, verificationStatus: 'pending'}
      ]
    },
    riskPrevented: {
      title: caseStudyCopy[locale].riskTitle,
      items: config.riskPrevented
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
      headline: caseStudyCopy[locale].conversionHeadline,
      text: caseStudyCopy[locale].conversionText,
      primaryCta: caseStudyCopy[locale].primaryCta,
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
