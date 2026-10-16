import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {groupCompanies} from '@/lib/about/group-companies';

export function GroupCompaniesSection() {
  const t = useTranslations('groupCompanies');

  return (
    <section className="about-section about-section--light" data-section="group_companies" aria-labelledby="about-group-title">
      <div className="container-shell about-section__inner">
        <header className="about-section__header">
          <p className="about-eyebrow">{t('eyebrow')}</p>
          <h2 id="about-group-title">{t('title')}</h2>
          <p>{t('description')}</p>
        </header>
        <div className="about-group-grid">
          {groupCompanies.map((company) => (
            <a
              key={company.id}
              className="about-group-card"
              href={company.href}
              target="_blank"
              rel="noopener"
              aria-label={`${t(`companies.${company.id}.name`)} — ${company.domain}`}
            >
              <span className="about-group-card__logo">
                <Image
                  src={company.logo}
                  alt={t(`companies.${company.id}.name`)}
                  className="about-group-card__image"
                  sizes="200px"
                  loading="lazy"
                />
              </span>
              <h3>{t(`companies.${company.id}.name`)}</h3>
              <p>{t(`companies.${company.id}.description`)}</p>
              <span className="about-group-card__domain" dir="ltr">{company.domain}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
