'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {useForm, type FieldErrors, type Resolver} from 'react-hook-form';
import {z} from 'zod';
import {LtrText} from '@/components/bidi/ltr-text';
import {productionContactInfo} from '@/lib/contact/rfq-contact-page';
import {rfqAllowedFileExtensions, rfqApiEndpoint, rfqMaxFileSizeBytes} from '@/lib/rfq/constants';
import {trackContactClick, trackEvent, trackRfqEvent} from '@/lib/analytics/events';

const projectTypes = [
  'sandwichPanel',
  'standingSeam',
  'aluminiumCladding',
  'fullEnvelope',
  'technicalReview',
  'other'
] as const;

type RfqFormValues = {
  name: string;
  company: string;
  phone: string;
  whatsapp: string;
  email: string;
  project_type: string;
  project_location: string;
  estimated_area: string;
  message: string;
  optional_file_upload?: FileList;
  website: string;
};

type SubmitState = 'idle' | 'success' | 'error';

function createRfqSchema(t: ReturnType<typeof useTranslations<'rfq'>>) {
  const required = t('validation.required');
  const optionalText = z.string().trim();

  return z.object({
    name: z.string().trim().min(2, required),
    company: optionalText,
    phone: z.string().trim().min(5, required),
    whatsapp: optionalText,
    email: optionalText.refine((value) => !value || z.string().email().safeParse(value).success, t('validation.email')),
    project_type: optionalText,
    project_location: optionalText,
    estimated_area: optionalText,
    message: optionalText,
    optional_file_upload: z
      .custom<FileList>()
      .optional()
      .refine((files) => !files || files.length === 0 || files[0].size <= rfqMaxFileSizeBytes, t('validation.fileSize'))
      .refine((files) => {
        if (!files || files.length === 0) {
          return true;
        }

        const extension = files[0].name.split('.').pop()?.toLowerCase();
        return Boolean(extension && rfqAllowedFileExtensions.includes(extension as (typeof rfqAllowedFileExtensions)[number]));
      }, t('validation.fileType')),
    website: z.string().max(0, t('validation.spam'))
  });
}

function createRfqResolver(t: ReturnType<typeof useTranslations<'rfq'>>): Resolver<RfqFormValues> {
  return async (values) => {
    const parsed = createRfqSchema(t).safeParse(values);

    if (parsed.success) {
      return {
        values: parsed.data,
        errors: {}
      };
    }

    const errors = parsed.error.issues.reduce<FieldErrors<RfqFormValues>>((fieldErrors, issue) => {
      const name = issue.path[0] as keyof RfqFormValues | undefined;

      if (name) {
        fieldErrors[name] = {
          type: issue.code,
          message: issue.message
        };
      }

      return fieldErrors;
    }, {});

    return {
      values: {},
      errors
    };
  };
}

export function RfqSection() {
  const t = useTranslations('rfq');
  const contactNote = t('contact.note');
  const localizedAddress = t.has('contact.address') ? t('contact.address') : '';
  const [activeStep, setActiveStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const resolver = useMemo(() => createRfqResolver(t), [t]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: {errors, isSubmitting}
  } = useForm<RfqFormValues>({
    resolver,
    mode: 'onBlur',
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      whatsapp: '',
      email: '',
      project_type: '',
      project_location: '',
      estimated_area: '',
      message: '',
      website: ''
    }
  });

  const stepFields: Array<Array<keyof RfqFormValues>> = [
    ['name', 'company', 'phone', 'whatsapp', 'email'],
    [],
    ['optional_file_upload']
  ];

  useEffect(() => {
    if (submitState === 'idle') {
      return;
    }

    feedbackRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
    feedbackRef.current?.focus({preventScroll: true});
  }, [submitState]);

  async function goToStep(nextStep: number) {
    const fieldsToValidate = stepFields[activeStep];
    const isCurrentStepValid = fieldsToValidate.length === 0 || (await trigger(fieldsToValidate));

    if (isCurrentStepValid) {
      trackRfqEvent('rfq_step_complete', {
        component_id: 'homepage_rfq_form',
        form_step: activeStep + 1
      });
      setActiveStep(nextStep);
    }
  }

  function trackRfqStartOnce() {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackRfqEvent('rfq_start', {component_id: 'homepage_rfq_form'});
  }

  async function onSubmit(values: RfqFormValues) {
    if (values.website) {
      trackRfqEvent('rfq_error', {
        component_id: 'homepage_rfq_form',
        interaction_type: 'honeypot'
      });
      setSubmitState('error');
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    appendIfPresent(formData, 'company', values.company);
    appendIfPresent(formData, 'whatsapp', values.whatsapp);
    appendIfPresent(formData, 'email', values.email);
    appendIfPresent(formData, 'project_type', values.project_type);
    appendIfPresent(formData, 'project_location', values.project_location);
    appendIfPresent(formData, 'estimated_area', values.estimated_area);
    appendIfPresent(formData, 'message', values.message);
    formData.append('website', values.website);

    if (values.optional_file_upload?.[0]) {
      formData.append('optional_file_upload', values.optional_file_upload[0]);
    }

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

  function onInvalidSubmit(fieldErrors: FieldErrors<RfqFormValues>) {
    const firstErrorField = Object.keys(fieldErrors)[0] as keyof RfqFormValues | undefined;
    const errorStep = firstErrorField ? stepFields.findIndex((fields) => fields.includes(firstErrorField)) : -1;

    if (errorStep >= 0) {
      setActiveStep(errorStep);
    }

    setSubmitState('error');
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
          <span className="rfq-contact__eyebrow">{t('eyebrow')}</span>
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
          className="rfq-form"
          noValidate
          onFocus={() => {
            /* track: rfq_start */
            trackRfqStartOnce();
          }}
          onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        >
          <div className="rfq-form__status" data-status="ready">
            {t('backendReady')}
          </div>
          <p className="rfq-form__microcopy">{t('quickMicrocopy')}</p>

          <div className="rfq-steps" aria-label={t('stepsLabel')}>
            {[0, 1, 2].map((step) => (
              <button
                aria-current={activeStep === step ? 'step' : undefined}
                className="rfq-step"
                key={step}
                onClick={() => setActiveStep(step)}
                type="button"
              >
                <span>{String(step + 1).padStart(2, '0')}</span>
                {t(`steps.${step}`)}
              </button>
            ))}
          </div>

          <input
            className="rfq-form__honeypot"
            tabIndex={-1}
            autoComplete="off"
            {...register('website')}
            aria-hidden="true"
          />

          <fieldset className={activeStep === 0 ? 'rfq-fieldset is-active' : 'rfq-fieldset'}>
            <legend>{t('steps.0')}</legend>
            <label className="rfq-field">
              <FieldLabel label={t('fields.name')} required />
              <input {...register('name')} aria-invalid={Boolean(errors.name)} aria-required="true" autoComplete="name" />
              {errors.name?.message ? <strong>{errors.name.message}</strong> : null}
            </label>
            <label className="rfq-field">
              <FieldLabel label={t('fields.company')} />
              <input {...register('company')} aria-invalid={Boolean(errors.company)} autoComplete="organization" />
              {errors.company?.message ? <strong>{errors.company.message}</strong> : null}
            </label>
            <label className="rfq-field">
              <FieldLabel label={t('fields.phone')} required />
              <input {...register('phone')} aria-invalid={Boolean(errors.phone)} aria-required="true" autoComplete="tel" dir="ltr" type="tel" />
              {errors.phone?.message ? <strong>{errors.phone.message}</strong> : null}
            </label>
            <label className="rfq-field">
              <FieldLabel label={t('fields.whatsapp')} />
              <input {...register('whatsapp')} aria-invalid={Boolean(errors.whatsapp)} dir="ltr" type="tel" />
              {errors.whatsapp?.message ? <strong>{errors.whatsapp.message}</strong> : null}
            </label>
            <label className="rfq-field">
              <FieldLabel label={t('fields.email')} />
              <input {...register('email')} aria-invalid={Boolean(errors.email)} autoComplete="email" dir="ltr" type="email" />
              {errors.email?.message ? <strong>{errors.email.message}</strong> : null}
            </label>
          </fieldset>

          <fieldset className={activeStep === 1 ? 'rfq-fieldset is-active' : 'rfq-fieldset'}>
            <legend>{t('steps.1')}</legend>
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
              {errors.project_type?.message ? <strong>{errors.project_type.message}</strong> : null}
            </label>
            <label className="rfq-field">
              <FieldLabel label={t('fields.project_location')} />
              <input {...register('project_location')} aria-invalid={Boolean(errors.project_location)} />
              {errors.project_location?.message ? <strong>{errors.project_location.message}</strong> : null}
            </label>
            <label className="rfq-field">
              <FieldLabel label={t('fields.estimated_area')} />
              <input {...register('estimated_area')} aria-invalid={Boolean(errors.estimated_area)} />
              {errors.estimated_area?.message ? <strong>{errors.estimated_area.message}</strong> : null}
            </label>
          </fieldset>

          <fieldset className={activeStep === 2 ? 'rfq-fieldset is-active' : 'rfq-fieldset'}>
            <legend>{t('steps.2')}</legend>
            <label className="rfq-field rfq-field--full">
              <FieldLabel label={t('fields.message')} />
              <textarea {...register('message')} aria-invalid={Boolean(errors.message)} rows={5} />
              {errors.message?.message ? <strong>{errors.message.message}</strong> : null}
            </label>
            <label className="rfq-file">
              <FieldLabel label={t('fields.optional_file_upload')} />
              <input
                {...register('optional_file_upload')}
                accept=".pdf,.jpg,.jpeg,.png,.dwg"
                aria-invalid={Boolean(errors.optional_file_upload)}
                onChange={(event) => {
                  trackEvent('file_upload_attempt', {
                    component_id: 'homepage_rfq_form',
                    interaction_type: 'file_select'
                  });
                  setSelectedFileName(event.target.files?.[0]?.name ?? '');
                }}
                type="file"
              />
              <em>{selectedFileName || t('fileHelp')}</em>
              {errors.optional_file_upload?.message ? <strong>{errors.optional_file_upload.message}</strong> : null}
            </label>
          </fieldset>

          <div className="rfq-form__mobile-actions">
            <button disabled={activeStep === 0} onClick={() => setActiveStep((step) => Math.max(step - 1, 0))} type="button">
              {t('back')}
            </button>
            {activeStep < 2 ? (
              <button onClick={() => goToStep(activeStep + 1)} type="button">
                {t('next')}
              </button>
            ) : null}
          </div>

          <div className="rfq-form__spam">{t('spamPlaceholder')}</div>

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

function appendIfPresent(formData: FormData, key: string, value: string) {
  const trimmed = value.trim();

  if (trimmed) {
    formData.append(key, trimmed);
  }
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
