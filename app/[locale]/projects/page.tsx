import Image, {type StaticImageData} from 'next/image';
import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {SchemaScript} from '@/components/seo/schema-script';
import {getDirection, locales, type Locale, Link} from '@/i18n/routing';
import {buildPageMetadata, type LocalizedRouteMap} from '@/lib/seo/metadata';
import {buildBreadcrumbListSchema, buildCollectionPageSchema, buildOrganizationSchema} from '@/lib/seo/schema';
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
  params: {locale: Locale};
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
    openCaseStudy: string;
    consultationCta: string;
    systemsCta: string;
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
    openCaseStudy: 'View Case Study',
    consultationCta: 'Request Similar Project Review',
    systemsCta: 'Explore Systems',
    conversionTitle: 'Need this level of control for your project?',
    conversionText: 'Send the project type, location, approximate area, drawings if available, and the main risk you want SIPANEL to review.',
    home: 'Home'
  },
  fa: {
    title: 'پروژه‌ها و مطالعات موردی SIPANEL',
    h1: 'Proven Industrial Envelope Projects.',
    description:
      'پروژه‌های سقف صنعتی، ساندویچ پنل، ZIP Panel و کلادینگ آلومینیومی SIPANEL را با چالش مهندسی، منطق اجرا، نتیجه و ریسک‌های کنترل‌شده بررسی کنید.',
    eyebrow: 'شواهد پروژه',
    introTitle: 'پروژه‌هایی که سیستم را اثبات می‌کنند',
    intro:
      'هر کارت بر اساس چالش پروژه، تصمیم مهندسی SIPANEL، نتیجه اجرا و ریسک‌های کنترل‌شده پیش یا حین نصب ساختاردهی شده است.',
    allProjects: 'مطالعات موردی پروژه',
    labels: {
      projectName: 'نام پروژه',
      location: 'موقعیت',
      areaM2: 'مساحت m2',
      systemType: 'نوع سیستم',
      mainChallenge: 'چالش اصلی',
      engineeringDecision: 'تصمیم مهندسی',
      measuredResult: 'نتیجه قابل اندازه‌گیری',
      risks: 'ریسک‌های کنترل‌شده'
    },
    filters: {
      all: 'همه',
      sandwich: 'سیستم‌های ساندویچ پانل',
      standing: 'سقف استندینگ سیم',
      cladding: 'کلادینگ آلومینیومی',
      envelope: 'پوسته صنعتی'
    },
    proofPending: 'فقط فیلدهای دارای منبع پروژه نمایش داده شده‌اند. شاخص‌های تاییدنشده داخل هر مطالعه موردی در حالت انتظار می‌مانند.',
    openCaseStudy: 'View Case Study',
    consultationCta: 'درخواست بررسی پروژه مشابه',
    systemsCta: 'مشاهده سیستم‌ها',
    conversionTitle: 'برای پروژه خود به همین سطح کنترل نیاز دارید؟',
    conversionText: 'نوع پروژه، موقعیت، متراژ تقریبی، نقشه‌ها در صورت وجود و ریسک اصلی مورد نظر برای بررسی را ارسال کنید.',
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
    openCaseStudy: 'View Case Study',
    consultationCta: 'اطلب مراجعة مشروع مشابه',
    systemsCta: 'استكشاف الأنظمة',
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
    openCaseStudy: 'View Case Study',
    consultationCta: 'Запросить проверку похожего проекта',
    systemsCta: 'Посмотреть системы',
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
    items: projectCaseStudies.map((project) => ({
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

export default function ProjectsOverviewPage({params}: Props) {
  setRequestLocale(params.locale);
  const content = copy[params.locale];

  return (
    <article className="projects-index-page" dir={getDirection(params.locale)}>
      {/* track: projects_page_view */}
      <SchemaScript schema={buildCollectionSchema(params.locale)} />
      <SchemaScript schema={buildBreadcrumbSchema(params.locale)} />
      <SchemaScript schema={buildOrganizationSchema(params.locale, `${routes[params.locale]}#organization`)} />

      <section className="projects-index-hero" data-section="projects_index_hero" aria-labelledby="projects-index-title">
        {/* track: case_study_view */}
        <div className="container-shell projects-index-hero__inner">
          <div className="projects-index-hero__copy">
            <p className="service-eyebrow">{content.eyebrow}</p>
            <h1 id="projects-index-title">{content.h1}</h1>
            <p>{content.description}</p>
            <div className="projects-index-hero__actions">
              <Link href="/contact#rfq-form" className="button-primary">
                {content.consultationCta}
              </Link>
              <Link href="/systems" className="button-secondary">
                {content.systemsCta}
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
            <input className="projects-index-filter__input" defaultChecked id="projects-filter-all" name="projects-filter" type="radio" />
            <label htmlFor="projects-filter-all">{content.filters.all}</label>
            <input className="projects-index-filter__input" id="projects-filter-sandwich" name="projects-filter" type="radio" />
            <label htmlFor="projects-filter-sandwich">{content.filters.sandwich}</label>
            <input className="projects-index-filter__input" id="projects-filter-standing" name="projects-filter" type="radio" />
            <label htmlFor="projects-filter-standing">{content.filters.standing}</label>
            <input className="projects-index-filter__input" id="projects-filter-cladding" name="projects-filter" type="radio" />
            <label htmlFor="projects-filter-cladding">{content.filters.cladding}</label>
            <input className="projects-index-filter__input" id="projects-filter-envelope" name="projects-filter" type="radio" />
            <label htmlFor="projects-filter-envelope">{content.filters.envelope}</label>
          </div>

          <div className="projects-index-grid">
            {projectCaseStudies.map((project) => (
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
                    {/* track: case_study_click */}
                    <Link href={`/projects/${project.slug}`} className="projects-index-card__cta">
                      {content.openCaseStudy}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-index-section projects-index-section--light" data-section="proof_governance" aria-labelledby="projects-proof-title">
        <div className="container-shell projects-index-proof">
          <div>
            <p className="service-eyebrow">{content.allProjects}</p>
            <h2 id="projects-proof-title">{content.proofPending}</h2>
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
            <Link href="/contact#rfq-form" className="button-primary">
              {content.consultationCta}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
