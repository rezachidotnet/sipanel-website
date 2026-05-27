import Image, {type StaticImageData} from 'next/image';
import {useTranslations} from 'next-intl';
import mahshahrCard from '@/assets/projects/mahshahr_taxi/photos/mahshahr_taxi-card.webp';
import megaparsCard from '@/assets/projects/megaparsmall-atrium/photos/megaparsmall-atrium-card.webp';
import tabasCard from '@/assets/projects/tabas/photos/tabas-card.webp';
import {Link} from '@/i18n/routing';

type CaseStudy = {
  projectName: string;
  location: string;
  projectType: string;
  areaM2: string;
  challenge: string;
  engineeringDecision: string;
  measuredResult: string;
  image: StaticImageData;
};

const caseStudies: CaseStudy[] = [
  {
    projectName: 'Tabas Railway Facility',
    location: 'Tabas, Iran',
    projectType: 'Large-span railway roofing system',
    areaM2: '10,000 m²',
    challenge:
      'Execution of a large-scale double-curved railway structure requiring advanced sandwich panel coordination, precise structural alignment, controlled waterproofing continuity, and reliable long-span roof performance.',
    engineeringDecision:
      'Engineering teams applied custom sandwich panel detailing, structural alignment studies, drainage optimization strategies, and installation sequencing plans to maintain geometric precision and long-span performance reliability.',
    measuredResult:
      'Successful delivery of a durable large-span sandwich panel roofing system with reliable structural performance, controlled installation quality, and efficient project execution.',
    image: tabasCard
  },
  {
    projectName: 'Mahshahr Taxi Parking Facility',
    location: 'Bandar Mahshahr, Khuzestan, Iran',
    projectType: 'Commercial parking roofing system',
    areaM2: '4,000 m²',
    challenge:
      'Execution of a large parking facility with complex roof geometry requiring accurate sandwich panel coordination, controlled rainwater drainage management, waterproofing continuity, and long-term corrosion resistance in a humid coastal environment.',
    engineeringDecision:
      'Engineering teams optimized drainage slopes, gutter positioning, downspout coordination, and sandwich panel alignment to improve water evacuation efficiency and reduce long-term maintenance risks.',
    measuredResult:
      'Successful delivery of a durable sandwich panel roofing system with reliable rainwater management, long-term weather protection, and controlled drainage performance.',
    image: mahshahrCard
  },
  {
    projectName: 'Megapars Mall Atrium',
    location: 'Iran',
    projectType: 'Atrium roofing structure',
    areaM2: '4,500 m²',
    challenge:
      'Execution of a large-span commercial atrium roofing system requiring precise curved ZIP panel coordination, waterproofing integrity, thermal movement control, and clean architectural integration across the exposed roof geometry.',
    engineeringDecision:
      'Engineering teams prepared detailed ZIP panel layouts, expansion movement studies, drainage coordination details, and installation sequencing plans to ensure geometric precision, waterproofing continuity, and long-term roof stability.',
    measuredResult:
      'Successful delivery of a visually integrated atrium roofing system with reliable waterproofing performance, precise standing seam execution, and controlled long-span installation quality.',
    image: megaparsCard
  }
];

export function CaseStudiesPreview() {
  const t = useTranslations('caseStudies');

  return (
    <section className="case-studies-preview" id="case-studies-preview" aria-labelledby="case-studies-title">
      {/* track: case_study_view */}
      {/* track: case_study_swipe */}
      <div className="container-shell case-studies-preview__inner">
        <header className="case-studies-preview__header">
          <p>{t('eyebrow')}</p>
          <h2 id="case-studies-title">{t('title')}</h2>
          <Link href="/projects" className="case-studies-preview__cta">
            {t('cta')}
          </Link>
        </header>

        <div className="case-study-cards">
          {caseStudies.map((project) => (
            <article className="case-study-card" key={project.projectName}>
              <div className="case-study-card__image">
                <Image
                  src={project.image}
                  alt={`${project.projectName} real project photography`}
                  fill
                  sizes="(max-width: 767px) 82vw, (max-width: 1024px) 45vw, 31vw"
                />
              </div>

              <div className="case-study-card__content">
                <div className="case-study-card__meta">
                  <span>{project.location}</span>
                  <span>{project.areaM2}</span>
                </div>
                <h3>{project.projectName}</h3>
                <p className="case-study-card__type">{project.projectType}</p>

                <dl className="case-study-card__proof">
                  <div>
                    <dt>{t('challenge')}</dt>
                    <dd>{project.challenge}</dd>
                  </div>
                  <div>
                    <dt>{t('engineeringDecision')}</dt>
                    <dd>{project.engineeringDecision}</dd>
                  </div>
                  <div>
                    <dt>{t('measuredResult')}</dt>
                    <dd>{project.measuredResult}</dd>
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
