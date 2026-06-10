'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {useForm, type FieldErrors, type Resolver} from 'react-hook-form';
import {z} from 'zod';
import {LtrText} from '@/components/bidi/ltr-text';
import type {Locale} from '@/i18n/routing';
import {getDirection} from '@/i18n/routing';
import type {ProductionContactInfo, RfqContactSection} from '@/lib/contact/rfq-contact-page';
import {rfqAllowedFileExtensions, rfqApiEndpoint, rfqMaxFileSizeBytes} from '@/lib/rfq/constants';
import {trackContactClick, trackEvent, trackRfqEvent} from '@/lib/analytics/events';

type ContactPageData = {
  contact: ProductionContactInfo;
  hero: Extract<RfqContactSection, {id: 'contact_hero'}>;
  options: Extract<RfqContactSection, {id: 'contact_options'}>;
  form: Extract<RfqContactSection, {id: 'rfq_form'}>;
  guidance: Extract<RfqContactSection, {id: 'project_type_guidance'}>;
  trust: Extract<RfqContactSection, {id: 'trust_before_submit'}>;
  location: Extract<RfqContactSection, {id: 'location_section'}>;
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

const faContactUxCopy = {
  hero: {
    eyebrow: 'درخواست مشاوره فنی',
    h1: 'مشاوره فنی برای انتخاب و اجرای پوشش صنعتی',
    subheadline:
      'جزئیات پروژه را ارسال کنید تا سی‌پانل نوع پوشش، ریسک خرید، منطق آب‌بندی و الزامات اجرای سقف یا نما را پیش از تصمیم‌گیری بررسی کند.',
    primaryCta: 'شروع مشاوره',
    secondaryCta: 'ارتباط در واتساپ',
    trustMicrocopy: 'برای شروع مشاوره فقط نام و شماره تماس کافی است.'
  },
  contactTitle: 'راه‌های ارتباط مستقیم با سی‌پانل',
  contactLabels: {
    phone: 'تلفن',
    whatsapp: 'واتساپ',
    email: 'ایمیل',
    address: 'آدرس'
  } as Record<string, string>,
  contactCtas: {
    phone: 'تماس با سی‌پانل',
    whatsapp: 'ارسال پیام در واتساپ',
    email: 'ارسال ایمیل',
    address: 'نمایش نقشه پس از تایید'
  } as Record<string, string>,
  formTitle: 'درخواست بررسی پروژه',
  formIntro: 'ابتدا فقط اطلاعات تماس را وارد کنید. جزئیات پروژه اختیاری است و می‌تواند بعد از تماس تکمیل شود.',
  quickMicrocopy: 'برای شروع مشاوره فقط نام و شماره تماس کافی است.',
  optionalGroupMicrocopy: 'اطلاعات این بخش اختیاری است؛ تکمیل آن به بررسی دقیق‌تر پروژه کمک می‌کند.',
  technicalGroupMicrocopy: 'اگر نقشه یا توضیح فنی دارید اضافه کنید. بدون فایل هم می‌توانید فرم را ارسال کنید.',
  steps: ['اطلاعات تماس', 'جزئیات پروژه', 'توضیحات فنی'],
  projectTypes: {
    'Sandwich Panel Systems': 'سیستم‌های ساندویچ پانل',
    'Standing Seam & ZIP Tech Roofing': 'سقف ایستادرز و ZIP Tech',
    'Aluminium Cladding & Covering': 'پوشش و کلادینگ آلومینیومی',
    'Full Industrial Envelope': 'پوشش کامل سازه صنعتی',
    'Technical Review / Consultation': 'بررسی فنی / مشاوره',
    Other: 'سایر'
  } as Record<string, string>,
  projectStages: {
    'Concept / Early Planning': 'ایده اولیه / برنامه‌ریزی',
    'Design Review': 'بازبینی طراحی',
    Procurement: 'خرید و تامین',
    'Before Installation': 'پیش از نصب',
    'During Installation': 'حین نصب',
    'Existing Problem / Leakage': 'مشکل موجود / نشتی'
  } as Record<string, string>,
  concerns: {
    'Leakage Risk': 'ریسک نشتی',
    'Material Waste': 'پرت متریال',
    'Cost Control': 'کنترل هزینه',
    'Execution Delay': 'تاخیر اجرا',
    'System Selection': 'انتخاب سیستم',
    'Shop Drawing Review': 'بازبینی نقشه شاپ',
    'Installation Quality': 'کیفیت نصب',
    'Procurement Planning': 'برنامه‌ریزی خرید'
  } as Record<string, string>,
  trustTitle: 'پس از ارسال درخواست چه چیزی بررسی می‌شود؟',
  trustBenefits: ['بررسی مهندسی اولیه', 'پیشنهاد مناسب‌ترین پوشش', 'کاهش ریسک اجرا و خرید'],
  address: 'اصفهان، خیابان هزارجریب، کوی ازادگان، پلاک ۶',
  locationTitle: 'دفتر سی‌پانل',
  mapPending: 'لینک نقشه پس از تایید موقعیت رسمی اضافه می‌شود.'
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
  const isFa = locale === 'fa';
  const localizedAddress = isFa ? faContactUxCopy.address : page.contact.address;
  const heroContent = isFa ? faContactUxCopy.hero : {
    eyebrow: page.hero.content.eyebrow,
    h1: page.hero.content.h1,
    subheadline: page.hero.content.subheadline,
    primaryCta: page.hero.content.primary_cta,
    secondaryCta: page.hero.content.secondary_cta,
    trustMicrocopy: page.hero.content.trust_microcopy
  };
  const contactTitle = isFa ? faContactUxCopy.contactTitle : page.options.title;
  const formTitle = isFa ? faContactUxCopy.formTitle : page.form.title;
  const guidanceIntro = isFa ? faContactUxCopy.formIntro : t('privacy');
  const quickMicrocopy = isFa ? faContactUxCopy.quickMicrocopy : t('quickMicrocopy');
  const trustTitle = isFa ? faContactUxCopy.trustTitle : page.trust.title;
  const trustBenefits = isFa ? faContactUxCopy.trustBenefits : page.trust.benefits;
  const locationTitle = isFa ? faContactUxCopy.locationTitle : page.location.title;
  const mapPending = isFa ? faContactUxCopy.mapPending : 'Verified map URL pending.';
  const heroPanelMessage = isFa ? t('success') : page.form.submit.success_message;
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
              <a className="button-secondary" href={`https://wa.me/${page.contact.whatsapp.replace(/\D/g, '')}`} onClick={() => trackContactClick('whatsapp', 'contact_hero')}>
                {heroContent.secondaryCta}
              </a>
            </div>
          </div>
          <aside className="contact-hero__panel" data-backend-integration="api-route">
            <strong>{t('backendReady')}</strong>
            <p>{heroPanelMessage}</p>
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
              const label = isFa ? faContactUxCopy.contactLabels[card.type] : card.label;
              const cta = isFa ? faContactUxCopy.contactCtas[card.type] : card.cta;

              return (
                <article className="contact-option-card" key={card.type}>
                  <div className="contact-option-card__head">
                    <ContactIcon type={card.type} />
                    <span className="contact-option-card__label">{label}</span>
                  </div>
                  {href ? (
                    <LtrText as="a" className="contact-option-card__value" href={href}>
                      {value}
                    </LtrText>
                  ) : card.type === 'address' && isFa ? (
                    <strong>{value}</strong>
                  ) : (
                    <LtrText as="strong">{value}</LtrText>
                  )}
                  {href ? (
                    <>
                      {/* track: phone_click */}
                      {/* track: whatsapp_click */}
                      {/* track: email_click */}
                      <a
                        href={href}
                        onClick={() => {
                          if (card.type === 'phone' || card.type === 'whatsapp' || card.type === 'email') {
                            trackContactClick(card.type, `contact_option_${card.type}`);
                          }
                        }}
                      >
                        {cta}
                      </a>
                    </>
                  ) : (
                    <>
                      {/* track: address_click */}
                      <em data-status="pending">{cta}</em>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="contact-rfq" data-section="rfq_form" id="rfq-form" aria-labelledby="rfq-contact-title">
        <div className="container-shell contact-rfq__inner">
          <aside className="contact-guidance">
            <h2 id="rfq-contact-title">{formTitle}</h2>
            <p>{guidanceIntro}</p>
            <div className="rfq-form__status" data-status="ready">
              {t('backendReady')}
            </div>
            <p className="rfq-form__microcopy">{quickMicrocopy}</p>
            <div className="contact-guidance__list">
              {page.guidance.cards.map((card) => (
                <article key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
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
              hasSubmittedRef.current = true;
              const form = formRef.current;
              if (form) {
                const textFields: Array<keyof ContactFormValues> = ['name', 'company', 'phone', 'whatsapp', 'email', 'project_type', 'project_location', 'estimated_area', 'project_stage', 'message', 'website'];
                for (const field of textFields) {
                  const el = form.elements.namedItem(field) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
                  if (el) {
                    setValue(field, el.value, {shouldValidate: false});
                  }
                }
              }
              handleSubmit(onSubmit, onInvalidSubmit)(event);
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
                  {isFa ? faContactUxCopy.steps[index] : step.title}
                </button>
              ))}
            </div>

            <input className="rfq-form__honeypot" tabIndex={-1} autoComplete="off" {...register('website')} aria-hidden="true" />

            <fieldset className={activeStep === 0 ? 'rfq-fieldset is-active' : 'rfq-fieldset'}>
              <legend>{isFa ? faContactUxCopy.steps[0] : page.form.steps[0].title}</legend>
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
              <legend>{isFa ? faContactUxCopy.steps[1] : page.form.steps[1].title}</legend>
              <p className="rfq-fieldset__helper">{isFa ? faContactUxCopy.optionalGroupMicrocopy : t('quickMicrocopy')}</p>
              <label className="rfq-field">
                <FieldLabel label={t('fields.project_type')} />
                <select {...register('project_type')} aria-invalid={Boolean(errors.project_type)}>
                  <option value="">{t('placeholders.select')}</option>
                  {projectTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {isFa ? faContactUxCopy.projectTypes[option] ?? option : option}
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
                      {isFa ? faContactUxCopy.projectStages[option] ?? option : option}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>

            <fieldset className={activeStep === 2 ? 'rfq-fieldset is-active' : 'rfq-fieldset'}>
              <legend>{isFa ? faContactUxCopy.steps[2] : page.form.steps[2].title}</legend>
              <p className="rfq-fieldset__helper">{isFa ? faContactUxCopy.technicalGroupMicrocopy : t('fileHelp')}</p>
              <div className="rfq-field rfq-field--full">
                <FieldLabel label={t('fields.main_concern')} />
                <div className="contact-check-grid">
                  {concernOptions.map((option) => (
                    <label key={option}>
                      <input type="checkbox" value={option} {...register('main_concern')} />
                      {isFa ? faContactUxCopy.concerns[option] ?? option : option}
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
              {trustBenefits.map((benefit) => (
                <span key={benefit}>{benefit}</span>
              ))}
            </div>

            <button className="rfq-form__submit" disabled={isSubmitting || submitState === 'success'} type="submit">
              {submitState === 'success' ? t('sent') : isSubmitting ? page.form.submit.loading_label : page.form.submit.label}
            </button>

            <p className="rfq-form__privacy">{t('privacy')}</p>

            <div className="rfq-form__feedback" aria-live="polite" ref={feedbackRef} tabIndex={-1}>
              <p className="rfq-form__success" hidden={submitState !== 'success'} role="status">
                {page.form.submit.success_title} {page.form.submit.success_message}
              </p>
              <p className="rfq-form__error" hidden={submitState !== 'error'} role="alert">
                {t('error')}
              </p>
            </div>
          </form>
        </div>
      </section>

      <section className="contact-section contact-section--light" data-section="trust_before_submit" aria-labelledby="trust-before-submit-title">
        <div className="container-shell contact-section__inner">
          <h2 id="trust-before-submit-title">{trustTitle}</h2>
          <div className="contact-benefit-grid">
            {trustBenefits.map((benefit) => (
              <article key={benefit}>{benefit}</article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" data-section="location_section" aria-labelledby="location-section-title">
        <div className="container-shell contact-location">
          <div>
            <h2 id="location-section-title">{locationTitle}</h2>
            {isFa ? <p>{localizedAddress}</p> : <LtrText as="p">{localizedAddress}</LtrText>}
            <em>{mapPending}</em>
          </div>
        </div>
      </section>

      <section className="contact-section contact-section--light" data-section="faq_section" aria-labelledby="contact-faq-title">
        <div className="container-shell contact-section__inner">
          <h2 id="contact-faq-title">{page.faq.title}</h2>
          <div className="service-faq-list">
            {page.faq.items.map((item) => (
              <details className="service-faq-item" key={item.question}>
                {/* track: faq_expand */}
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="contact-sticky-cta">
        {/* track: sticky_mobile_cta_click */}
        <a href="#rfq-form">{heroContent.primaryCta}</a>
        {/* track: whatsapp_click */}
        <a href={`https://wa.me/${page.contact.whatsapp.replace(/\D/g, '')}`}>{isFa ? 'واتساپ' : 'WhatsApp'}</a>
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
