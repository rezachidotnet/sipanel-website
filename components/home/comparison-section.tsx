import {useTranslations} from 'next-intl';

const comparisonPoints = [
  'panelSelection',
  'waterproofingResponsibility',
  'materialWaste',
  'installationCoordination',
  'riskBeforeConstruction',
  'technicalDocumentation'
] as const;

const mobileComparisonPoints = [
  'coverSelection',
  'executionQuality',
  'waterproofingInsulation',
  'finalCost',
  'executionSchedule'
] as const;

export function ComparisonSection() {
  const t = useTranslations('comparison');

  return (
    <section className="comparison-section" aria-labelledby="comparison-title">
      <div className="container-shell comparison-section__inner">
        <header className="comparison-section__header">
          <h2 id="comparison-title">{t('title')}</h2>
          <p>{t('intro')}</p>
        </header>

        <div className="comparison-mobile" aria-label={t('mobile.ariaLabel')}>
          <div className="comparison-mobile__head" aria-hidden="true">
            <div className="comparison-mobile__side comparison-mobile__side--engineered">
              {t('mobile.engineered')}
            </div>
            <span className="comparison-mobile__vs">VS</span>
            <div className="comparison-mobile__side comparison-mobile__side--normal">
              {t('mobile.normal')}
            </div>
          </div>

          <div className="comparison-mobile__rows">
            {mobileComparisonPoints.map((point) => (
              <article className="comparison-mobile-row" key={point}>
                <h3>{t(`mobile.points.${point}.label`)}</h3>
                <div className="comparison-mobile-row__grid">
                  <div className="comparison-mobile-cell comparison-mobile-cell--engineered">
                    <span>{t('mobile.engineered')}</span>
                    <p>{t(`mobile.points.${point}.engineered`)}</p>
                  </div>
                  <div className="comparison-mobile-cell comparison-mobile-cell--normal">
                    <span>{t('mobile.normal')}</span>
                    <p>{t(`mobile.points.${point}.normal`)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="comparison-mobile__note">
            <strong>{t('mobile.note.title')}</strong>
            <p>{t('mobile.note.text')}</p>
          </div>
        </div>

        <div className="comparison-table" role="table" aria-label={t('title')}>
          <div className="comparison-table__head" role="row">
            <span role="columnheader">{t('columns.supplyOnly')}</span>
            <span role="columnheader">{t('columns.sipanel')}</span>
          </div>

          <div className="comparison-table__body">
            {comparisonPoints.map((point) => (
              <article className="comparison-row" key={point} role="row">
                <div className="comparison-cell comparison-cell--typical" role="cell">
                  <span className="comparison-cell__label">{t(`points.${point}.label`)}</span>
                  <p>{t(`points.${point}.typical`)}</p>
                </div>
                <div className="comparison-cell comparison-cell--sipanel" role="cell">
                  <span className="comparison-cell__label">{t(`points.${point}.label`)}</span>
                  <p>{t(`points.${point}.sipanel`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
