import {useTranslations} from 'next-intl';

const capabilities = [
  'shopDrawing',
  'procurement',
  'installation',
  'multiSystem',
  'complexProjects',
  'documentation'
] as const;

export function WhySipanel() {
  const t = useTranslations('whySipanel');

  return (
    <section className="why-sipanel" aria-labelledby="why-sipanel-title">
      <div className="container-shell why-sipanel__inner">
        <header className="why-sipanel__header">
          <h2 id="why-sipanel-title">{t('title')}</h2>
          <p>{t('description')}</p>
        </header>

        <div className="why-sipanel__grid">
          {capabilities.map((key) => (
            <div className="why-sipanel__card" key={key}>
              <div className="why-sipanel__icon" aria-hidden="true">
                <CapabilityIcon id={key} />
              </div>
              <h3>{t(`${key}.title`)}</h3>
              <p>{t(`${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityIcon({id}: {id: string}) {
  switch (id) {
    case 'shopDrawing':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="3" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 14h12M8 10h8M8 18h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 8l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'procurement':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M5 8h18v14a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 8V6a4 4 0 018 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 15l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'installation':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4v10M10 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 18l4-2h16l4 2v4H4v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 20h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'multiSystem':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="3" y="16" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="16" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7.5h4M7.5 12v4M20.5 12v4M12 20.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'complexProjects':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4 24l6-8 4 5 4-7 6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 6v4M18 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'documentation':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M7 4h10l6 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M17 4v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 15h10M9 19h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
