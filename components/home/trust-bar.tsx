import {useTranslations} from 'next-intl';

const trustMetrics = [
  {
    id: 'yearsExperience',
    verificationStatus: 'source_specified'
  },
  {
    id: 'industrialProjects',
    verificationStatus: 'source_specified'
  },
  {
    id: 'executedPanelArea',
    verificationStatus: 'source_specified'
  }
] as const;

export function TrustBar() {
  const t = useTranslations('trustBar');

  return (
    // track: trust_bar_view
    <section className="trust-bar" aria-label={t('ariaLabel')}>
      <div className="container-shell">
        <div className="trust-bar__strip">
          {trustMetrics.map((metric) => (
            <div
              className="trust-bar__item"
              key={metric.id}
              data-verification-status={metric.verificationStatus}
            >
              <strong>{t(`metrics.${metric.id}.value`)}</strong>
              <span>{t(`metrics.${metric.id}.label`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
