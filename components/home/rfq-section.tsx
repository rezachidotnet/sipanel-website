'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {useForm, type FieldErrors, type Resolver} from 'react-hook-form';
import {z} from 'zod';
import {LtrText} from '@/components/bidi/ltr-text';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';
import {rfqApiEndpoint} from '@/lib/rfq/constants';
import {trackContactClick, trackRfqEvent} from '@/lib/analytics/events';

const projectTypes = [
  'sandwichPanel',
  'standingSeam',
  'aluminiumCladding',
  'fullEnvelope',
  'technicalReview',
  'other'
] as const;

type QuickFormValues = {
  name: string;
  phone: string;
  project_type: string;
  message: string;
  website: string;
};

type SubmitState = 'idle' | 'success' | 'error';

function createQuickSchema(t: ReturnType<typeof useTranslations<'rfq'>>) {
  const required = t('validation.required');

  return z.object({
    name: z.string().trim().min(2, required),
    phone: z.string().trim().min(5, required),
    project_type: z.string().trim(),
    message: z.string().trim(),
    website: z.string().max(0, t('validation.spam'))
  });
}

function createQuickResolver(t: ReturnType<typeof useTranslations<'rfq'>>): Resolver<QuickFormValues> {
  return async (values) => {
    const parsed = createQuickSchema(t).safeParse(values);

    if (parsed.success) {
      return {values: parsed.data, errors: {}};
    }

    const errors = parsed.error.issues.reduce<FieldErrors<QuickFormValues>>((fieldErrors, issue) => {
      const name = issue.path[0] as keyof QuickFormValues | undefined;

      if (name) {
        fieldErrors[name] = {type: issue.code, message: issue.message};
      }

      return fieldErrors;
    }, {});

    return {values: {}, errors};
  };
}

export function RfqSection() {
  const locale = useLocale();
  const t = useTranslations('rfq');
  const contactNote = t('contact.note');
  const localizedAddress = t.has('contact.address') ? t('contact.address') : '';
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [hasStarted, setHasStarted] = useState(false);
  const hasSubmittedRef = useRef(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const resolver = useMemo(() => createQuickResolver(t), [t]);

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting}
  } = useForm<QuickFormValues>({
    resolver,
    mode: 'onBlur',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      phone: '',
      project_type: '',
      message: '',
      website: ''
    }
  });

  useEffect(() => {
    if (submitState === 'idle' || !hasSubmittedRef.current) {
      return;
    }

    feedbackRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
    feedbackRef.current?.focus({preventScroll: true});
  }, [submitState]);

  function trackRfqStartOnce() {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackRfqEvent('rfq_start', {component_id: 'homepage_rfq_form'});
  }

  async function onSubmit(values: QuickFormValues) {
    if (values.website) {
      setSubmitState('error');
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    if (values.project_type) formData.append('project_type', values.project_type);
    if (values.message) formData.append('message', values.message);
    formData.append('website', values.website);
    formData.append('source_page', '/');
    formData.append('form_type', 'Homepage Quick Contact');
    formData.append('language', locale);

    setSubmitState('idle');

    try {
      const response = await fetch(rfqApiEndpoint, {
        method: 'POST',
        body: formData
      });
      const result = (await response.json()) as {ok?: boolean};

      if (!response.ok || !result.ok) {
        throw new Error('RFQ_SUBMISSION_FAILED');
      }

      trackRfqEvent('rfq_submit', {
        component_id: 'homepage_rfq_form',
        project_type: values.project_type || 'quick_consultation',
        submission_method: 'api_route'
      });
      setSubmitState('success');
    } catch {
      trackRfqEvent('rfq_error', {
        component_id: 'homepage_rfq_form',
        project_type: values.project_type || 'quick_consultation',
        submission_method: 'api_route'
      });
      setSubmitState('error');
    }
  }

  return (
    <section
      className="rfq-section"
      id="rfq"
      aria-labelledby="rfq-title"
      data-backend-integration="api-route"
    >
      <div className="container-shell rfq-section__inner">
        <aside className="rfq-contact" aria-label={t('contact.title')}>
          <h2 id="rfq-title">{t('title')}</h2>
          <p>{t('intro')}</p>
          <div className="rfq-contact__details">
            <LtrText as="a" href={`tel:${productionContactInfo.phone.replace(/\s/g, '')}`} onClick={() => trackContactClick('phone', 'homepage_rfq_contact')}>{productionContactInfo.phone}</LtrText>
            <LtrText as="a" href={`https://wa.me/${productionContactInfo.whatsapp.replace(/\D/g, '')}`} onClick={() => trackContactClick('whatsapp', 'homepage_rfq_contact')}>
              {productionContactInfo.whatsapp}
            </LtrText>
            <LtrText as="a" href={`mailto:${productionContactInfo.email}`} onClick={() => trackContactClick('email', 'homepage_rfq_contact')}>{productionContactInfo.email}</LtrText>
            {localizedAddress ? <span>{localizedAddress}</span> : <LtrText>{productionContactInfo.address}</LtrText>}
          </div>
          {contactNote ? <p className="rfq-contact__note">{contactNote}</p> : null}
        </aside>

        <form
          ref={formRef}
          className="rfq-form rfq-form--quick"
          noValidate
          onFocus={() => trackRfqStartOnce()}
          onSubmit={(event) => {
            event.preventDefault();
            hasSubmittedRef.current = true;
            const form = formRef.current;
            if (form) {
              const fields: Array<keyof QuickFormValues> = ['name', 'phone', 'project_type', 'message', 'website'];
              for (const field of fields) {
                const el = form.elements.namedItem(field) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
                if (el) {
                  setValue(field, el.value, {shouldValidate: false, shouldDirty: true});
                }
              }
            }
            void handleSubmit(onSubmit)();
          }}
        >
          <p className="rfq-form__microcopy">{t('quickMicrocopy')}</p>

          <input
            className="rfq-form__honeypot"
            tabIndex={-1}
            autoComplete="off"
            {...register('website')}
            aria-hidden="true"
          />

          <div className="rfq-form__fields">
            <label className="rfq-field">
              <FieldLabel label={t('fields.name')} required />
              <input {...register('name')} aria-invalid={Boolean(errors.name)} aria-required="true" autoComplete="name" />
              {errors.name?.message ? <strong>{errors.name.message}</strong> : null}
            </label>
            <label className="rfq-field">
              <FieldLabel label={t('fields.phone')} required />
              <input {...register('phone')} aria-invalid={Boolean(errors.phone)} aria-required="true" autoComplete="tel" dir="ltr" type="tel" />
              {errors.phone?.message ? <strong>{errors.phone.message}</strong> : null}
            </label>
            <label className="rfq-field">
              <FieldLabel label={t('fields.project_type')} />
              <select {...register('project_type')} aria-invalid={Boolean(errors.project_type)}>
                <option value="">{t('placeholders.select')}</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {t(`projectTypes.${type}`)}
                  </option>
                ))}
              </select>
            </label>
            <label className="rfq-field rfq-field--full">
              <FieldLabel label={t('fields.message')} />
              <textarea {...register('message')} aria-invalid={Boolean(errors.message)} rows={3} />
            </label>
          </div>

          <button className="rfq-form__submit" disabled={isSubmitting || submitState === 'success'} type="submit">
            {submitState === 'success' ? t('sent') : isSubmitting ? t('submitting') : t('submit')}
          </button>

          <p className="rfq-form__privacy">{t('privacy')}</p>

          <div className="rfq-form__feedback" aria-live="polite" ref={feedbackRef} tabIndex={-1}>
            <p className="rfq-form__success" hidden={submitState !== 'success'} role="status">
              {t('success')}
            </p>
            <p className="rfq-form__error" hidden={submitState !== 'error'} role="alert">
              {t('error')}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function FieldLabel({label, required = false}: {label: string; required?: boolean}) {
  const t = useTranslations('rfq');

  return (
    <span>
      {label}
      <small className={required ? 'rfq-field__required' : 'rfq-field__optional'}>
        {required ? t('requiredIndicator') : t('optionalIndicator')}
      </small>
    </span>
  );
}
