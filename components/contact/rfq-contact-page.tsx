'use client';

import './contact.css';
import {useEffect, useMemo, useRef, useState} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {useForm, type FieldErrors, type Resolver} from 'react-hook-form';
import {z} from 'zod';
import {LtrText} from '@/components/bidi/ltr-text';
import type {Locale} from '@/i18n/routing';
import {getDirection} from '@/i18n/routing';
import type {ProductionContactInfo, RfqContactSection} from '@/lib/contact/rfq-contact-page';
import {rfqAllowedFileExtensions, rfqApiEndpoint, rfqMaxFileSizeBytes} from '@/lib/rfq/constants';
import {trackContactClick, trackEvent, trackRfqEvent} from '@/lib/analytics/events';
import contactTrustImg from '@/assets/contact/contact-trust-image.webp';
import contactTrustMobileImg from '@/assets/contact/contact-trust-image-mobile.webp';

type ContactPageData = {
  contact: ProductionContactInfo;
  hero: Extract<RfqContactSection, {id: 'contact_hero'}>;
  options: Extract<RfqContactSection, {id: 'contact_options'}>;
  form: Extract<RfqContactSection, {id: 'rfq_form'}>;
  guidance: Extract<RfqContactSection, {id: 'project_type_guidance'}>;
  trust: Extract<RfqContactSection, {id: 'trust_before_submit'}>;
  faq: Extract<RfqContactSection, {id: 'faq_section'}>;
};

type ContactPageProps = {
  locale: Locale;
  page: ContactPageData;
};

type ContactFormValues = {
  name: string;
  company: string;
  phone: string;
  whatsapp: string;
  email: string;
  project_type: string;
  project_location: string;
  estimated_area: string;
  project_stage: string;
  main_concern: string[];
  message: string;
  file_upload?: FileList;
  website: string;
};

type SubmitState = 'idle' | 'success' | 'error';

const projectTypeKeyMap: Record<string, string> = {
  'Sandwich Panel Systems': 'sandwichPanel',
  'Standing Seam & ZIP Tech Roofing': 'standingSeam',
  'Aluminium Cladding & Covering': 'aluminiumCladding',
  'Full Industrial Envelope': 'fullEnvelope',
  'Technical Review / Consultation': 'technicalReview',
  'Other': 'other'
};

const projectStageKeyMap: Record<string, string> = {
  'Concept / Early Planning': 'concept',
  'Design Review': 'designReview',
  'Procurement': 'procurement',
  'Before Installation': 'beforeInstallation',
  'During Installation': 'duringInstallation',
  'Existing Problem / Leakage': 'existingProblem'
};

const concernKeyMap: Record<string, string> = {
  'Leakage Risk': 'leakageRisk',
  'Material Waste': 'materialWaste',
  'Cost Control': 'costControl',
  'Execution Delay': 'executionDelay',
  'System Selection': 'systemSelection',
  'Shop Drawing Review': 'shopDrawingReview',
  'Installation Quality': 'installationQuality',
  'Procurement Planning': 'procurementPlanning'
};


function createContactSchema(t: ReturnType<typeof useTranslations<'rfq'>>) {
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
    project_stage: optionalText,
    main_concern: z.array(z.string()).default([]),
    message: optionalText,
    file_upload: z
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

function createContactResolver(t: ReturnType<typeof useTranslations<'rfq'>>): Resolver<ContactFormValues> {
  return async (values) => {
    const parsed = createContactSchema(t).safeParse(values);

    if (parsed.success) {
      return {
        values: parsed.data,
        errors: {}
      };
    }

    const errors = parsed.error.issues.reduce<FieldErrors<ContactFormValues>>((fieldErrors, issue) => {
      const name = issue.path[0] as keyof ContactFormValues | undefined;

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

function getContactHref(type: string, contact: ProductionContactInfo) {
  if (type === 'phone') {
    return `tel:${contact.phone.replace(/\s/g, '')}`;
  }

  if (type === 'whatsapp') {
    return `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`;
  }

  if (type === 'email') {
    return `mailto:${contact.email}`;
  }

  return null;
}

function getContactAnalyticsEvent(type: string) {
  if (type === 'phone') {
    return 'phone_click';
  }

  if (type === 'whatsapp') {
    return 'whatsapp_click';
  }

  if (type === 'email') {
    return 'email_click';
  }

  return undefined;
}

function getContactValue(type: string, contact: ProductionContactInfo) {
  if (type === 'phone') {
    return contact.phone;
  }

  if (type === 'whatsapp') {
    return contact.whatsapp;
  }

  if (type === 'email') {
    return contact.email;
  }

  return contact.address;
}

export function RfqContactPage({locale, page}: ContactPageProps) {
  const t = useTranslations('rfq');
  const dir = getDirection(locale);
  const localizedAddress = t.has('contact.address') ? t('contact.address') : page.contact.address;
  const heroContent = {
    eyebrow: t('heroEyebrow'),
    h1: t('heroH1'),
    subheadline: t('heroSubheadline'),
    primaryCta: t('heroPrimaryCta'),
    secondaryCta: t('heroSecondaryCta'),
    trustMicrocopy: t('heroTrustMicrocopy')
  };
  const contactTitle = t('contactTitle');
  const formTitle = t('formTitle');
  const guidanceIntro = t('formIntro');
  const quickMicrocopy = t('quickMicrocopy');
  const trustTitle = t('trustTitle');
  const trustItems = [0, 1, 2, 3].map((i) => ({title: t(`trustItems.${i}.title`), description: t(`trustItems.${i}.description`)}));
  const resolver = useMemo(() => createContactResolver(t), [t]);
  const [activeStep, setActiveStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const hasSubmittedRef = useRef(false);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: {errors, isSubmitting}
  } = useForm<ContactFormValues>({
    resolver,
    mode: 'onBlur',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      whatsapp: '',
      email: '',
      project_type: '',
      project_location: '',
      estimated_area: '',
      project_stage: '',
      main_concern: [],
      message: '',
      website: ''
    }
  });

  const projectTypeOptions = page.form.steps[1].fields.find((field) => field.name === 'project_type')?.options ?? [];
  const projectStageOptions = page.form.steps[1].fields.find((field) => field.name === 'project_stage')?.options ?? [];
  const concernOptions = page.form.steps[2].fields.find((field) => field.name === 'main_concern')?.options ?? [];
  const stepFields: Array<Array<keyof ContactFormValues>> = [
    ['name', 'company', 'phone', 'whatsapp', 'email'],
    ['project_type', 'project_location', 'estimated_area', 'project_stage'],
    ['main_concern', 'message', 'file_upload']
  ];

  useEffect(() => {
    if (submitState === 'idle' || !hasSubmittedRef.current) {
      return;
    }

    feedbackRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
    feedbackRef.current?.focus({preventScroll: true});
  }, [submitState]);

  async function goToStep(nextStep: number) {
    const fieldsToValidate = stepFields[activeStep];
    const isCurrentStepValid = fieldsToValidate.length === 0 || (await trigger(fieldsToValidate));

    if (isCurrentStepValid) {
      /* track: rfq_step_complete */
      trackRfqEvent('rfq_step_complete', {
        component_id: 'contact_rfq_form',
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
    trackRfqEvent('rfq_start', {component_id: 'contact_rfq_form'});
  }

  async function onSubmit(values: ContactFormValues) {
    if (values.website) {
      trackRfqEvent('rfq_error', {
        component_id: 'contact_rfq_form',
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
    appendIfPresent(formData, 'project_stage', values.project_stage);
    values.main_concern.forEach((concern) => formData.append('main_concern', concern));
    appendIfPresent(formData, 'message', values.message);
    formData.append('website', values.website);
    formData.append('source_page', `/contact`);
    formData.append('form_type', 'RFQ Consultation');
    formData.append('language', locale);

    if (values.file_upload?.[0]) {
      formData.append('optional_file_upload', values.file_upload[0]);
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
        component_id: 'contact_rfq_form',
        project_type: values.project_type || 'quick_consultation',
        submission_method: 'api_route'
      });
      setSubmitState('success');
    } catch {
      trackRfqEvent('rfq_error', {
        component_id: 'contact_rfq_form',
        project_type: values.project_type || 'quick_consultation',
        submission_method: 'api_route'
      });
      setSubmitState('error');
    }
  }

  function onInvalidSubmit(fieldErrors: FieldErrors<ContactFormValues>) {
    const firstErrorField = Object.keys(fieldErrors)[0] as keyof ContactFormValues | undefined;
    const errorStep = firstErrorField ? stepFields.findIndex((fields) => fields.includes(firstErrorField)) : -1;

    if (errorStep >= 0) {
      setActiveStep(errorStep);
    }

    setSubmitState('error');
  }

  return (
    <article className="contact-page" dir={dir}>
      <section className="contact-hero" data-section="contact_hero" aria-labelledby="contact-page-title">
        <div className="container-shell contact-hero__inner">
          <div>
            <p className="service-eyebrow">{heroContent.eyebrow}</p>
            <h1 id="contact-page-title">{heroContent.h1}</h1>
            <p>{heroContent.subheadline}</p>
            <span>{heroContent.trustMicrocopy}</span>
            <div className="contact-hero__actions">
              {/* track: rfq_start */}
              <a className="button-primary" href="#rfq-form" onClick={() => trackRfqEvent('rfq_start', {component_id: 'contact_hero'})}>
                {heroContent.primaryCta}
              </a>
              {/* track: whatsapp_click */}
              <a
                className="button-secondary"
                href={`https://wa.me/${page.contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="whatsapp_click"
                data-analytics-owner="application"
                data-analytics-component="contact_hero"
                data-analytics-location="contact_hero"
                data-analytics-label="whatsapp"
                onClick={() => trackContactClick('whatsapp', 'contact_hero')}
              >
                {heroContent.secondaryCta}
              </a>
            </div>
          </div>
          <aside className="contact-hero__panel">
            <strong>{t('heroPanelTitle')}</strong>
            <p>{t('heroPanelStep1')}</p>
            <p>{t('heroPanelStep2')}</p>
            <p>{t('heroPanelStep3')}</p>
          </aside>
        </div>
      </section>

      <section className="contact-section" data-section="contact_options" aria-labelledby="contact-options-title">
        <div className="container-shell contact-section__inner">
          <h2 id="contact-options-title">{contactTitle}</h2>
          <div className="contact-option-grid">
            {page.options.cards.map((card) => {
              const href = getContactHref(card.type, page.contact);
              const value = card.type === 'address' ? localizedAddress : getContactValue(card.type, page.contact);
              const label = t(`contactLabels.${card.type}`);
              const cta = t(`contactCtas.${card.type}`);
              const analyticsEvent = getContactAnalyticsEvent(card.type);

              const hint = t(`contactHints.${card.type}`);

              return (
                <article className="contact-option-card" key={card.type}>
                  <div className="contact-option-card__head">
                    <ContactIcon type={card.type} />
                    <div>
                      <span className="contact-option-card__label">{label}</span>
                      {hint ? <span className="contact-option-card__hint">{hint}</span> : null}
                    </div>
                  </div>
                  {href ? (
                    <LtrText
                      as="a"
                      className="contact-option-card__value"
                      href={href}
                      target={card.type === 'whatsapp' ? '_blank' : undefined}
                      rel={card.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                      data-analytics-event={analyticsEvent}
                      data-analytics-owner="application"
                      data-analytics-component={`contact_option_${card.type}`}
                      data-analytics-location="contact_options"
                      data-analytics-label="value"
                      onClick={() => {
                        if (card.type === 'phone' || card.type === 'whatsapp' || card.type === 'email') {
                          trackContactClick(card.type, `contact_option_${card.type}_value`);
                        }
                      }}
                    >
                      {value}
                    </LtrText>
                  ) : card.type === 'address' && (locale === 'fa' || locale === 'ar') ? (
                    <strong>{value}</strong>
                  ) : (
                    <LtrText as="strong">{value}</LtrText>
                  )}
                  {href && cta ? (
                    <>
                      {/* track: phone_click */}
                      {/* track: whatsapp_click */}
                      {/* track: email_click */}
                      <a
                        href={href}
                        target={card.type === 'whatsapp' ? '_blank' : undefined}
                        rel={card.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                        data-analytics-event={analyticsEvent}
                        data-analytics-owner="application"
                        data-analytics-component={`contact_option_${card.type}`}
                        data-analytics-location="contact_options"
                        data-analytics-label="cta"
                        onClick={() => {
                          if (card.type === 'phone' || card.type === 'whatsapp' || card.type === 'email') {
                            trackContactClick(card.type, `contact_option_${card.type}`);
                          }
                        }}
                      >
                        {cta}
                      </a>
                    </>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="contact-section contact-section--light" data-section="what_we_review" aria-labelledby="contact-review-title">
        <div className="container-shell contact-section__inner">
          <h2 id="contact-review-title">{trustTitle}</h2>
          <div className="contact-review-grid">
            {trustItems.map((item) => (
              <article className="contact-review-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-rfq" data-section="rfq_form" id="rfq-form" aria-labelledby="rfq-contact-title">
        <div className="container-shell contact-rfq__inner">
          <aside className="contact-guidance">
            <h2 id="rfq-contact-title">{formTitle}</h2>
            <p>{guidanceIntro}</p>
            <div className="contact-guidance__image">
              <picture>
                <source media="(max-width: 767px)" srcSet={contactTrustMobileImg.src} width={contactTrustMobileImg.width} height={contactTrustMobileImg.height} />
                <Image
                  src={contactTrustImg}
                  alt="SIPANEL project management"
                  fill
                  className="contact-guidance__image-media"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </picture>
            </div>
            <div className="rfq-form__status" data-status="ready">
              {t('backendReady')}
            </div>
            <p className="rfq-form__microcopy">{quickMicrocopy}</p>
            <div className="contact-guidance__list">
              {(['panel', 'roofing', 'cladding', 'transparent'] as const).map((key) => (
                <article key={key}>
                  <h3>{t(`guidanceCards.${key}.title`)}</h3>
                  <p>{t(`guidanceCards.${key}.description`)}</p>
                </article>
              ))}
            </div>
          </aside>

          <form
            ref={formRef}
            className="rfq-form contact-rfq-form"
            noValidate
            onFocus={() => {
              /* track: rfq_start */
              trackRfqStartOnce();
            }}
            onSubmit={(event) => {
              event.preventDefault();
              hasSubmittedRef.current = true;
              const form = formRef.current;
              if (form) {
                const textFields: Array<keyof ContactFormValues> = ['name', 'company', 'phone', 'whatsapp', 'email', 'project_type', 'project_location', 'estimated_area', 'project_stage', 'message', 'website'];
                for (const field of textFields) {
                  const el = form.elements.namedItem(field) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
                  if (el) {
                    setValue(field, el.value, {shouldValidate: false, shouldDirty: true});
                  }
                }
              }
              void handleSubmit(onSubmit, onInvalidSubmit)();
            }}
          >
            <div className="rfq-steps" aria-label={t('stepsLabel')}>
              {page.form.steps.map((step, index) => (
                <button
                  aria-current={activeStep === index ? 'step' : undefined}
                  className="rfq-step"
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  type="button"
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {t(`steps.${index}`)}
                </button>
              ))}
            </div>

            <input className="rfq-form__honeypot" tabIndex={-1} autoComplete="off" {...register('website')} aria-hidden="true" />

            <p className="rfq-form__start-prompt">{t('minimalStartPrompt')}</p>

            <fieldset className={activeStep === 0 ? 'rfq-fieldset is-active' : 'rfq-fieldset'}>
              <legend>{t('steps.0')}</legend>
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
              <div className="rfq-fieldset__secondary">
                <p className="rfq-fieldset__secondary-label">{t('secondaryFieldsLabel')}</p>
                <label className="rfq-field">
                  <FieldLabel label={t('fields.company')} />
                  <input {...register('company')} aria-invalid={Boolean(errors.company)} autoComplete="organization" />
                  {errors.company?.message ? <strong>{errors.company.message}</strong> : null}
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
              </div>
            </fieldset>

            <fieldset className={activeStep === 1 ? 'rfq-fieldset is-active' : 'rfq-fieldset'}>
              <legend>{t('steps.1')}</legend>
              <p className="rfq-fieldset__helper">{t('optionalGroupMicrocopy')}</p>
              <label className="rfq-field">
                <FieldLabel label={t('fields.project_type')} />
                <select {...register('project_type')} aria-invalid={Boolean(errors.project_type)}>
                  <option value="">{t('placeholders.select')}</option>
                  {projectTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {projectTypeKeyMap[option] ? t(`projectTypes.${projectTypeKeyMap[option]}`) : option}
                    </option>
                  ))}
                </select>
                {errors.project_type?.message ? <strong>{errors.project_type.message}</strong> : null}
              </label>
              <label className="rfq-field">
                <FieldLabel label={t('fields.project_location')} />
                <input {...register('project_location')} aria-invalid={Boolean(errors.project_location)} />
              </label>
              <label className="rfq-field">
                <FieldLabel label={t('fields.estimated_area')} />
                <input {...register('estimated_area')} aria-invalid={Boolean(errors.estimated_area)} placeholder="e.g. 5,000 m2" />
              </label>
              <label className="rfq-field">
                <FieldLabel label={t('fields.project_stage')} />
                <select {...register('project_stage')} aria-invalid={Boolean(errors.project_stage)}>
                  <option value="">{t('placeholders.select')}</option>
                  {projectStageOptions.map((option) => (
                    <option key={option} value={option}>
                      {projectStageKeyMap[option] ? t(`projectStages.${projectStageKeyMap[option]}`) : option}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>

            <fieldset className={activeStep === 2 ? 'rfq-fieldset is-active' : 'rfq-fieldset'}>
              <legend>{t('steps.2')}</legend>
              <p className="rfq-fieldset__helper">{t('technicalGroupMicrocopy')}</p>
              <div className="rfq-field rfq-field--full">
                <FieldLabel label={t('fields.main_concern')} />
                <div className="contact-check-grid">
                  {concernOptions.map((option) => (
                    <label key={option}>
                      <input type="checkbox" value={option} {...register('main_concern')} />
                      {concernKeyMap[option] ? t(`concerns.${concernKeyMap[option]}`) : option}
                    </label>
                  ))}
                </div>
              </div>
              <label className="rfq-field rfq-field--full">
                <FieldLabel label={t('fields.message')} />
                <textarea {...register('message')} aria-invalid={Boolean(errors.message)} rows={5} />
                {errors.message?.message ? <strong>{errors.message.message}</strong> : null}
              </label>
              <label className="rfq-file">
                <FieldLabel label={t('fields.optional_file_upload')} />
                <input
                  {...register('file_upload')}
                  accept=".pdf,.jpg,.jpeg,.png,.dwg"
                  aria-invalid={Boolean(errors.file_upload)}
                  onChange={(event) => {
                    trackEvent('file_upload_attempt', {
                      component_id: 'contact_rfq_form',
                      interaction_type: 'file_select'
                    });
                    setSelectedFileName(event.target.files?.[0]?.name ?? '');
                  }}
                  type="file"
                />
                <em>{selectedFileName || t('fileHelp')}</em>
                {errors.file_upload?.message ? <strong>{errors.file_upload.message}</strong> : null}
              </label>
            </fieldset>

            <div className="rfq-form__mobile-actions">
              <button disabled={activeStep === 0} onClick={() => setActiveStep((step) => Math.max(step - 1, 0))} type="button">
                {t('back')}
              </button>
              {activeStep < page.form.steps.length - 1 ? (
                <button onClick={() => goToStep(activeStep + 1)} type="button">
                  {t('next')}
                </button>
              ) : null}
            </div>

            <div className="rfq-form__spam">{t('spamPlaceholder')}</div>

            <div className="rfq-form__assurance" aria-label={trustTitle}>
              {trustItems.map((item) => (
                <span key={item.title}>{item.title}</span>
              ))}
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

      <section className="contact-section contact-section--light" data-section="faq_section" aria-labelledby="contact-faq-title">
        <div className="container-shell contact-section__inner">
          <h2 id="contact-faq-title">{t('faq.title')}</h2>
          <div className="service-faq-list">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <details className="service-faq-item" key={i}>
                {/* track: faq_expand */}
                <summary>{t(`faq.items.${i}.question`)}</summary>
                <p>{t(`faq.items.${i}.answer`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="contact-sticky-cta">
        {/* track: sticky_cta_click */}
        <a
          href="#rfq-form"
          data-analytics-event="sticky_cta_click"
          data-analytics-owner="unassigned"
          data-analytics-component="contact_sticky_cta"
          data-analytics-location="contact_page"
          data-analytics-label="primary"
        >
          {heroContent.primaryCta}
        </a>
        {/* track: whatsapp_click */}
        <a
          href={`https://wa.me/${page.contact.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="whatsapp_click"
          data-analytics-owner="application"
          data-analytics-component="contact_sticky_cta"
          data-analytics-location="contact_page"
          data-analytics-label="whatsapp"
          onClick={() => trackContactClick('whatsapp', 'contact_sticky_cta')}
        >
          {t('contactLabels.whatsapp')}
        </a>
      </div>
    </article>
  );
}

function ContactIcon({type}: {type: string}) {
  const icon =
    type === 'phone'
      ? 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.57 2.61a2 2 0 0 1-.45 2.11L8.09 9.59a16 16 0 0 0 6.32 6.32l1.15-1.15a2 2 0 0 1 2.11-.45c.84.25 1.71.45 2.61.57A2 2 0 0 1 22 16.92Z'
      : type === 'whatsapp'
        ? 'M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4Zm-4.4 2.5c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.2.1-.3.2-.6.1a6.9 6.9 0 0 1-2-1.2A7.4 7.4 0 0 1 9.1 12c-.1-.3 0-.4.1-.6l.4-.4c.1-.2.2-.3.3-.5.1-.2.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.4-.6 1.6-1.1.2-.6.2-1 .2-1.1-.1-.2-.2-.3-.5-.4Z'
        : type === 'email'
          ? 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 3 8 5 8-5'
          : 'M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z';

  return (
    <span className="contact-option-card__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d={icon} />
      </svg>
    </span>
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
