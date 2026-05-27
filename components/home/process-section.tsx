'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

const processSteps = ['engineeringReview', 'smartProcurement', 'controlledInstallation', 'finalVerification'] as const;

export function ProcessSection() {
  const t = useTranslations('process');
  const [expandedStep, setExpandedStep] = useState<string | null>(processSteps[0]);

  return (
    <section className="process-section" id="process" aria-labelledby="process-title">
      <div className="container-shell process-section__inner">
        <header className="process-section__header">
          <h2 id="process-title">{t('title')}</h2>
        </header>

        <div className="process-steps">
          {processSteps.map((step, index) => (
            <article className={expandedStep === step ? 'process-step is-expanded' : 'process-step'} key={step}>
              <button
                aria-expanded={expandedStep === step}
                className="process-step__button"
                onClick={() => {
                  /* track: process_step_expand */
                  setExpandedStep((current) => (current === step ? null : step));
                }}
                type="button"
              >
                <span className="process-step__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="process-step__title">{t(`steps.${step}.title`)}</span>
              </button>
              <div className="process-step__body">
                <p>{t(`steps.${step}.description`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
