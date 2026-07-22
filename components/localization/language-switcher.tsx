'use client';

import {useTranslations} from 'next-intl';
import {getLocalizedPath, locales, type Locale, usePathname} from '@/i18n/routing';
import {trackLanguageChange, trackEvent} from '@/lib/analytics/events';

const labels: Record<Locale, string> = {
  en: 'EN',
  fa: 'FA',
  ar: 'AR',
  ru: 'RU'
};

type Props = {
  activeLocale: Locale;
  compact?: boolean;
  onNavigate?: () => void;
};

export function LanguageSwitcher({activeLocale, compact = false, onNavigate}: Props) {
  const t = useTranslations('header');
  const pathname = usePathname();

  return (
    <nav
      aria-label={t('selectLanguage')}
      className={compact ? 'language-switcher language-switcher--compact' : 'language-switcher'}
    >
      <span className="language-switcher__label" aria-hidden="true">
        LANG
      </span>
      {locales.map((locale) => (
        <a
          key={locale}
          href={getLocalizedPath(locale, pathname)}
          aria-current={locale === activeLocale ? 'true' : undefined}
          className="language-switcher__item"
          onClick={() => {
            onNavigate?.();

            if (locale !== activeLocale) {
              trackLanguageChange(activeLocale, locale);
              return;
            }

            trackEvent('language_switcher_open', {component_id: 'language_switcher'});
          }}
        >
          {labels[locale]}
        </a>
      ))}
    </nav>
  );
}
