'use client';

import {useState, useEffect, useRef, useCallback, type FormEvent} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {trackCatalogEvent} from '@/lib/analytics/events';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const catalogPaths: Record<string, string> = {
  fa: '/catalogs/fa/sipanel-catalog.pdf',
  en: '/catalogs/en/sipanel-catalog.pdf',
  // AR/RU catalogs are not yet produced; serve the verified English catalog instead
  // of leaving the download broken. See englishOnlyNotice below.
  ar: '/catalogs/en/sipanel-catalog.pdf',
  ru: '/catalogs/en/sipanel-catalog.pdf'
};

const englishOnlyCatalogLocales = new Set(['ar', 'ru']);

function triggerDownload(locale: string) {
  const path = catalogPaths[locale] ?? catalogPaths.en;
  const link = document.createElement('a');
  link.href = path;
  link.download = 'sipanel-catalog.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function CatalogDownloadModal({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const t = useTranslations('catalogDownload');
  const locale = useLocale();
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [feedback, setFeedback] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      nameRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const honeypot = formData.get('website');
    if (honeypot) return;

    setSubmitState('submitting');
    setFeedback('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          source_page: '/',
          form_type: 'Catalog Download',
          language: locale
        })
      });
      const payload = (await response.json()) as {ok?: boolean; message?: string};

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? 'CATALOG_LEAD_FAILED');
      }

      trackCatalogEvent('catalog_form_submitted', {
        component_id: 'catalog_modal',
        submission_method: 'api_route'
      });

      setSubmitState('success');
      setFeedback(t('success'));

      trackCatalogEvent('catalog_download_started', {
        component_id: 'catalog_modal',
        language: locale
      });
      triggerDownload(locale);

      setTimeout(() => {
        onClose();
        setSubmitState('idle');
        setFeedback('');
        form.reset();
      }, 2000);
    } catch {
      setSubmitState('error');
      setFeedback(t('error'));
    }
  }

  if (!isOpen) return null;

  return (
    <div className="catalog-modal" role="dialog" aria-modal="true" aria-labelledby="catalog-modal-title" onKeyDown={handleKeyDown}>
      <button className="catalog-modal__backdrop" type="button" onClick={onClose} aria-label={t('close')} />
      <div className="catalog-modal__panel" ref={panelRef}>
        <div className="catalog-modal__header">
          <h2 id="catalog-modal-title">{t('title')}</h2>
          <button className="catalog-modal__close" type="button" onClick={onClose} aria-label={t('close')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="catalog-modal__description">{t('description')}</p>

        {englishOnlyCatalogLocales.has(locale) && (
          <p className="catalog-modal__notice">{t('englishOnlyNotice')}</p>
        )}

        <form className="catalog-modal__form" onSubmit={handleSubmit}>
          <input className="catalog-modal__honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label className="catalog-modal__field">
            <span>{t('fieldName')}</span>
            <input
              ref={nameRef}
              name="name"
              required
              minLength={2}
              autoComplete="name"
              disabled={submitState === 'submitting' || submitState === 'success'}
            />
          </label>
          <label className="catalog-modal__field">
            <span>{t('fieldPhone')}</span>
            <input
              name="phone"
              required
              type="tel"
              autoComplete="tel"
              dir="ltr"
              disabled={submitState === 'submitting' || submitState === 'success'}
            />
          </label>

          {feedback && (
            <p className={submitState === 'error' ? 'catalog-modal__error' : 'catalog-modal__success'} aria-live="polite">
              {feedback}
            </p>
          )}

          <button
            className="catalog-modal__submit button-primary"
            type="submit"
            disabled={submitState === 'submitting' || submitState === 'success'}
          >
            {submitState === 'submitting' ? t('submitting') : t('submit')}
          </button>

          <p className="catalog-modal__privacy">{t('privacy')}</p>
        </form>
      </div>
    </div>
  );
}
