import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

const resources = [
  {
    id: 'sandwich_panel_selection_guide',
    titleKey: 'panelSelection',
    typeKey: 'guide',
    assetStatus: 'pending_resource_file' as const
  },
  {
    id: 'roof_leakage_prevention_checklist',
    titleKey: 'roofLeakage',
    typeKey: 'checklist',
    assetStatus: 'pending_resource_file' as const
  },
  {
    id: 'shop_drawing_review_guide',
    titleKey: 'shopDrawing',
    typeKey: 'guide',
    assetStatus: 'pending_resource_file' as const
  }
];

export function ResourcesPreview() {
  const t = useTranslations('resourcesPreview');

  return (
    <section className="resources-preview" id="resources-preview" aria-labelledby="resources-preview-title">
      <div className="container-shell resources-preview__inner">
        <header className="resources-preview__header">
          <h2 id="resources-preview-title">{t('title')}</h2>
        </header>

        <div className="resource-cards">
          {resources.map((resource) => {
            const isPending = resource.assetStatus === 'pending_resource_file';

            return (
              <article
                className="resource-card"
                key={resource.id}
                data-resource-id={resource.id}
                data-asset-status={resource.assetStatus}
              >
                <div className="resource-card__preview" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="resource-card__content">
                  <span className="resource-card__type">{t(`types.${resource.typeKey}`)}</span>
                  <h3>{t(`cards.${resource.titleKey}.title`)}</h3>
                  <p>{t(`cards.${resource.titleKey}.description`)}</p>

                  {isPending ? (
                    <span className="resource-card__pending">{t('comingSoon')}</span>
                  ) : (
                    <Link className="resource-card__cta" href="/resources">
                      {t('cta')}
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
