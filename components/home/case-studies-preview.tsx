import Image, {type StaticImageData} from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import mahshahrCard from '@/assets/projects/mahshahr_taxi/photos/mahshahr_taxi-card.webp';
import megaparsCard from '@/assets/projects/megaparsmall-atrium/photos/megaparsmall-atrium-card.webp';
import tabasCard from '@/assets/projects/tabas/photos/tabas-card.webp';
import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/routing';

type CaseStudy = {
  projectName: Record<Locale, string>;
  location: Record<Locale, string>;
  projectType: Record<Locale, string>;
  areaM2: string;
  challenge: Record<Locale, string>;
  engineeringDecision: Record<Locale, string>;
  measuredResult: Record<Locale, string>;
  image: StaticImageData;
  alt: Record<Locale, string>;
};

const caseStudies: CaseStudy[] = [
  {
    projectName: {
      fa: 'سالن تعمیرات راه‌آهن طبس',
      en: 'Tabas Railway Facility',
      ar: 'منشأة سكة حديد طبس',
      ru: 'Железнодорожный объект Табас'
    },
    location: {
      fa: 'طبس، ایران',
      en: 'Tabas, Iran',
      ar: 'طبس، إيران',
      ru: 'Табас, Иран'
    },
    projectType: {
      fa: 'سقف ساندویچ پانل دهانه بزرگ',
      en: 'Large-span railway roofing system',
      ar: 'نظام تسقيف سكك حديدية واسعة النطاق',
      ru: 'Кровельная система большого пролёта'
    },
    areaM2: '10,000 m²',
    challenge: {
      fa: 'اجرای سازه دهانه بزرگ با هندسه دوانحنایی، نیازمند هماهنگی دقیق ساندویچ پانل، تراز سازه‌ای، تداوم آب‌بندی و عملکرد پایدار سقف.',
      en: 'Execution of a large-scale double-curved railway structure requiring advanced sandwich panel coordination, precise structural alignment, controlled waterproofing continuity, and reliable long-span roof performance.',
      ar: 'تنفيذ هيكل سكة حديدية مزدوج الانحناء يتطلب تنسيقاً متقدماً للألواح المزدوجة ومحاذاة هيكلية دقيقة.',
      ru: 'Монтаж крупногабаритной двухкривой конструкции, требующей точной координации сэндвич-панелей и надёжной гидроизоляции.'
    },
    engineeringDecision: {
      fa: 'طراحی جزئیات اختصاصی ساندویچ پانل، بررسی تراز سازه‌ای، بهینه‌سازی زهکشی و برنامه‌ریزی توالی نصب برای حفظ دقت هندسی.',
      en: 'Engineering teams applied custom sandwich panel detailing, structural alignment studies, drainage optimization strategies, and installation sequencing plans to maintain geometric precision and long-span performance reliability.',
      ar: 'طبّقت الفرق الهندسية تفاصيل مخصصة للألواح المزدوجة ودراسات المحاذاة الهيكلية واستراتيجيات تحسين الصرف.',
      ru: 'Применены индивидуальные решения по раскладке панелей, оптимизация дренажа и планирование последовательности монтажа.'
    },
    measuredResult: {
      fa: 'تحویل موفق سقف ساندویچ پانل دهانه بزرگ با عملکرد سازه‌ای پایدار، کیفیت نصب کنترل‌شده و اجرای بهینه.',
      en: 'Successful delivery of a durable large-span sandwich panel roofing system with reliable structural performance, controlled installation quality, and efficient project execution.',
      ar: 'تسليم ناجح لنظام تسقيف ألواح مزدوجة واسعة النطاق مع أداء هيكلي موثوق.',
      ru: 'Успешная сдача долговечной кровельной системы большого пролёта с контролируемым качеством монтажа.'
    },
    image: tabasCard,
    alt: {
      fa: 'پروژه سقف ساندویچ پانل سالن راه‌آهن طبس',
      en: 'Tabas Railway Facility sandwich panel roofing project',
      ar: 'مشروع تسقيف منشأة سكة حديد طبس',
      ru: 'Проект кровли железнодорожного объекта Табас'
    }
  },
  {
    projectName: {
      fa: 'پارکینگ تاکسیرانی ماهشهر',
      en: 'Mahshahr Taxi Parking Facility',
      ar: 'منشأة موقف سيارات الأجرة ماهشهر',
      ru: 'Паркинг такси Махшахр'
    },
    location: {
      fa: 'بندر ماهشهر، خوزستان',
      en: 'Bandar Mahshahr, Khuzestan, Iran',
      ar: 'بندر ماهشهر، خوزستان، إيران',
      ru: 'Бандар-Махшахр, Хузестан, Иран'
    },
    projectType: {
      fa: 'سقف ساندویچ پانل پارکینگ تجاری',
      en: 'Commercial parking roofing system',
      ar: 'نظام تسقيف موقف تجاري',
      ru: 'Кровельная система коммерческой парковки'
    },
    areaM2: '4,000 m²',
    challenge: {
      fa: 'اجرای سقف پارکینگ با هندسه پیچیده، نیازمند هماهنگی دقیق ساندویچ پانل، مدیریت زهکشی آب باران، تداوم آب‌بندی و مقاومت در برابر خوردگی در اقلیم مرطوب ساحلی.',
      en: 'Execution of a large parking facility with complex roof geometry requiring accurate sandwich panel coordination, controlled rainwater drainage management, waterproofing continuity, and long-term corrosion resistance in a humid coastal environment.',
      ar: 'تنفيذ منشأة موقف كبيرة ذات هندسة سقف معقدة تتطلب تنسيقاً دقيقاً ومقاومة للتآكل في بيئة ساحلية رطبة.',
      ru: 'Монтаж крупной парковки со сложной геометрией кровли, требующей точной координации панелей и устойчивости к коррозии.'
    },
    engineeringDecision: {
      fa: 'بهینه‌سازی شیب زهکشی، موقعیت ناودان‌ها، هماهنگی لوله‌های آبرو و تراز ساندویچ پانل برای افزایش کارایی تخلیه آب و کاهش ریسک نگهداری.',
      en: 'Engineering teams optimized drainage slopes, gutter positioning, downspout coordination, and sandwich panel alignment to improve water evacuation efficiency and reduce long-term maintenance risks.',
      ar: 'حسّنت الفرق الهندسية ميول الصرف وتموضع المزاريب وتنسيق أنابيب الصرف.',
      ru: 'Оптимизация уклонов дренажа, позиционирования желобов и координации водосточных труб.'
    },
    measuredResult: {
      fa: 'تحویل موفق سقف ساندویچ پانل با مدیریت پایدار آب باران، حفاظت بلندمدت در برابر شرایط جوی و عملکرد کنترل‌شده زهکشی.',
      en: 'Successful delivery of a durable sandwich panel roofing system with reliable rainwater management, long-term weather protection, and controlled drainage performance.',
      ar: 'تسليم ناجح لنظام تسقيف ألواح مزدوجة مع إدارة موثوقة لمياه الأمطار.',
      ru: 'Успешная сдача кровельной системы с надёжным управлением ливневыми водами и долгосрочной защитой.'
    },
    image: mahshahrCard,
    alt: {
      fa: 'پروژه سقف پارکینگ تاکسیرانی ماهشهر',
      en: 'Mahshahr Taxi Parking Facility roofing project',
      ar: 'مشروع تسقيف موقف سيارات ماهشهر',
      ru: 'Проект кровли паркинга такси Махшахр'
    }
  },
  {
    projectName: {
      fa: 'آتریوم مجتمع مگاپارس',
      en: 'Megapars Mall Atrium',
      ar: 'أتريوم مجمع ميغابارس',
      ru: 'Атриум ТЦ Мегапарс'
    },
    location: {
      fa: 'ایران',
      en: 'Iran',
      ar: 'إيران',
      ru: 'Иран'
    },
    projectType: {
      fa: 'سقف ایستادرز آتریوم تجاری',
      en: 'Atrium roofing structure',
      ar: 'هيكل تسقيف أتريوم',
      ru: 'Конструкция кровли атриума'
    },
    areaM2: '4,500 m²',
    challenge: {
      fa: 'اجرای سقف آتریوم دهانه بزرگ با پنل ZIP منحنی، نیازمند یکپارچگی آب‌بندی، کنترل حرکت حرارتی و ادغام معماری تمیز در هندسه سقف نمایان.',
      en: 'Execution of a large-span commercial atrium roofing system requiring precise curved ZIP panel coordination, waterproofing integrity, thermal movement control, and clean architectural integration across the exposed roof geometry.',
      ar: 'تنفيذ نظام تسقيف أتريوم تجاري واسع النطاق يتطلب تنسيقاً دقيقاً لألواح ZIP المنحنية.',
      ru: 'Монтаж крупнопролётной кровли атриума с изогнутыми ZIP-панелями, требующей контроля теплового расширения.'
    },
    engineeringDecision: {
      fa: 'طراحی جزئیات چیدمان پنل ZIP، بررسی حرکت انبساطی، هماهنگی زهکشی و برنامه‌ریزی توالی نصب برای دقت هندسی و تداوم آب‌بندی.',
      en: 'Engineering teams prepared detailed ZIP panel layouts, expansion movement studies, drainage coordination details, and installation sequencing plans to ensure geometric precision, waterproofing continuity, and long-term roof stability.',
      ar: 'أعدت الفرق الهندسية مخططات تفصيلية لألواح ZIP ودراسات حركة التمدد وتفاصيل تنسيق الصرف.',
      ru: 'Подготовлены детальные раскладки ZIP-панелей, исследования температурных деформаций и планы монтажа.'
    },
    measuredResult: {
      fa: 'تحویل موفق سقف آتریوم با عملکرد پایدار آب‌بندی، اجرای دقیق ایستادرز و کیفیت کنترل‌شده نصب دهانه بزرگ.',
      en: 'Successful delivery of a visually integrated atrium roofing system with reliable waterproofing performance, precise standing seam execution, and controlled long-span installation quality.',
      ar: 'تسليم ناجح لنظام تسقيف أتريوم متكامل بصرياً مع أداء موثوق للعزل المائي.',
      ru: 'Успешная сдача интегрированной кровли атриума с надёжной гидроизоляцией и точным монтажом фальца.'
    },
    image: megaparsCard,
    alt: {
      fa: 'پروژه سقف آتریوم مجتمع مگاپارس',
      en: 'Megapars Mall Atrium roofing project',
      ar: 'مشروع تسقيف أتريوم مجمع ميغابارس',
      ru: 'Проект кровли атриума ТЦ Мегапарс'
    }
  }
];

export function CaseStudiesPreview() {
  const t = useTranslations('caseStudies');
  const locale = useLocale() as Locale;

  return (
    <section className="case-studies-preview" id="case-studies-preview" aria-labelledby="case-studies-title">
      {/* track: case_study_view */}
      {/* track: case_study_swipe */}
      <div className="container-shell case-studies-preview__inner">
        <header className="case-studies-preview__header">
          <h2 id="case-studies-title">{t('title')}</h2>
          <Link href="/projects" className="case-studies-preview__cta">
            {t('cta')}
          </Link>
        </header>

        <div className="case-study-cards">
          {caseStudies.map((project) => (
            <article className="case-study-card" key={project.projectName.en}>
              <div className="case-study-card__image">
                <Image
                  src={project.image}
                  alt={project.alt[locale]}
                  fill
                  sizes="(max-width: 767px) 82vw, (max-width: 1024px) 45vw, 31vw"
                />
              </div>

              <div className="case-study-card__content">
                <div className="case-study-card__meta">
                  <span>{project.location[locale]}</span>
                  <span>{project.areaM2}</span>
                </div>
                <h3>{project.projectName[locale]}</h3>
                <p className="case-study-card__type">{project.projectType[locale]}</p>

                <dl className="case-study-card__proof">
                  <div>
                    <dt>{t('challenge')}</dt>
                    <dd>{project.challenge[locale]}</dd>
                  </div>
                  <div>
                    <dt>{t('engineeringDecision')}</dt>
                    <dd>{project.engineeringDecision[locale]}</dd>
                  </div>
                  <div>
                    <dt>{t('measuredResult')}</dt>
                    <dd>{project.measuredResult[locale]}</dd>
                  </div>
                </dl>

                {/* track: case_study_expand */}
                <Link href="/projects" className="case-study-card__cta">
                  {t('cta')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
