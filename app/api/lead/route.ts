import {NextResponse, type NextRequest} from 'next/server';
import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import {createOdooCrmLead} from '@/lib/rfq/odoo';
import {
  getRfqUpload,
  storeRfqSubmission,
  storeRfqUpload,
  sendRfqNotification,
  type RfqSubmissionPayload
} from '@/lib/rfq/server';
import {sanitizeInput} from '@/lib/rfq/sanitize';

export const runtime = 'nodejs';

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 8;
const rateLimitBuckets = new Map<string, RateLimitBucket>();

const leadPayloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().default(''),
  phone: z.string().trim().min(5).max(60),
  whatsapp: z.string().trim().max(60).optional().default(''),
  email: z.string().trim().email().optional().or(z.literal('')).default(''),
  project_type: z.string().trim().max(120).optional().default(''),
  project_location: z.string().trim().max(160).optional().default(''),
  estimated_area: z.string().trim().max(80).optional().default(''),
  project_stage: z.string().trim().max(120).optional().default(''),
  main_concern: z.array(z.string().trim().max(120)).max(12).optional().default([]),
  message: z.string().trim().max(5000).optional().default(''),
  website: z.string().max(0).optional().default(''),
  source_page: z.string().trim().max(300).optional().default(''),
  form_type: z.string().trim().max(120).optional().default(''),
  language: z.string().trim().max(10).optional().default(''),
  resource_slug: z.string().trim().max(160).optional().default(''),
  resource_title: z.string().trim().max(220).optional().default('')
});

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwardedFor || request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, {count: 1, resetAt: now + rateLimitWindowMs});
    return false;
  }

  current.count += 1;
  return current.count > rateLimitMaxRequests;
}

function jsonError(status: number, message: string, errors?: Record<string, string>) {
  return NextResponse.json({ok: false, message, ...(errors ? {errors} : {})}, {status});
}

function extractFormDataFields(formData: FormData) {
  const concerns = formData
    .getAll('main_concern')
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);

  return {
    name: String(formData.get('name') ?? ''),
    company: String(formData.get('company') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    whatsapp: String(formData.get('whatsapp') ?? ''),
    email: String(formData.get('email') ?? ''),
    project_type: String(formData.get('project_type') ?? ''),
    project_location: String(formData.get('project_location') ?? ''),
    estimated_area: String(formData.get('estimated_area') ?? ''),
    project_stage: String(formData.get('project_stage') ?? ''),
    main_concern: concerns,
    message: String(formData.get('message') ?? ''),
    website: String(formData.get('website') ?? ''),
    source_page: String(formData.get('source_page') ?? ''),
    form_type: String(formData.get('form_type') ?? ''),
    language: String(formData.get('language') ?? ''),
    resource_slug: String(formData.get('resource_slug') ?? ''),
    resource_title: String(formData.get('resource_title') ?? '')
  };
}

function sanitizePayload(data: z.infer<typeof leadPayloadSchema>): RfqSubmissionPayload {
  return {
    name: sanitizeInput(data.name),
    company: sanitizeInput(data.company ?? ''),
    phone: sanitizeInput(data.phone),
    whatsapp: sanitizeInput(data.whatsapp ?? ''),
    email: sanitizeInput(data.email ?? ''),
    project_type: sanitizeInput(data.project_type ?? ''),
    project_location: sanitizeInput(data.project_location ?? ''),
    estimated_area: sanitizeInput(data.estimated_area ?? ''),
    project_stage: sanitizeInput(data.project_stage ?? ''),
    main_concern: (data.main_concern ?? []).map(sanitizeInput),
    message: sanitizeInput(data.message ?? ''),
    website: '',
    source_page: sanitizeInput(data.source_page ?? ''),
    form_type: sanitizeInput(data.form_type ?? ''),
    language: sanitizeInput(data.language ?? '')
  };
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return jsonError(429, 'Too many submissions. Please try again later.');
  }

  try {
    const contentType = request.headers.get('content-type') ?? '';
    const isFormData = contentType.includes('multipart/form-data');

    let rawFields: Record<string, unknown>;
    let formData: FormData | null = null;

    if (isFormData) {
      formData = await request.formData();
      rawFields = extractFormDataFields(formData);
    } else {
      rawFields = await request.json();
    }

    // Enrich resource download requests
    if (rawFields.resource_title && !rawFields.form_type) {
      rawFields.form_type = 'Resource Download';
    }

    if (rawFields.resource_title && !rawFields.project_type) {
      rawFields.project_type = `Resource download: ${rawFields.resource_title}`;
    }

    const parsed = leadPayloadSchema.safeParse(rawFields);

    if (!parsed.success) {
      const errors = Object.fromEntries(
        parsed.error.issues.map((issue) => [String(issue.path[0] ?? 'form'), issue.message])
      );
      return jsonError(400, 'Please review the form fields.', errors);
    }

    if (parsed.data.website) {
      return jsonError(400, 'Spam protection check failed.');
    }

    const submissionId = randomUUID();
    const payload = sanitizePayload(parsed.data);

    // Handle file upload if present in FormData
    let storedUpload = null;

    if (formData) {
      const upload = getRfqUpload(formData);

      if (upload) {
        try {
          storedUpload = await storeRfqUpload(upload, submissionId);
          payload.uploaded_file_url = storedUpload.relativePath;
        } catch (uploadError) {
          const msg = uploadError instanceof Error ? uploadError.message : '';
          if (msg.startsWith('UPLOAD_')) {
            throw uploadError;
          }
          console.error('File upload storage failed (non-critical)', {submissionId, error: msg});
        }
      }
    }

    // Store submission locally — best-effort, non-blocking on serverless (read-only fs)
    try {
      await storeRfqSubmission(payload, submissionId, storedUpload);
    } catch {
      console.error('Local submission storage failed (non-critical, likely read-only fs)', {submissionId});
    }

    // Send notification webhook if configured
    let notificationConfigured = false;

    try {
      const notification = await sendRfqNotification(payload, submissionId, storedUpload);
      notificationConfigured = notification.configured;
    } catch {
      console.error('Lead notification failed', {submissionId});
    }

    // Create Odoo CRM lead
    const odooLead = await createOdooCrmLead(payload, submissionId, storedUpload);

    return NextResponse.json({
      ok: true,
      message: 'Your request has been received.',
      submissionId,
      notificationConfigured,
      odooConfigured: odooLead.configured
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';

    if (message.startsWith('UPLOAD_')) {
      return jsonError(400, 'Uploaded file did not pass security checks.');
    }

    if (message.startsWith('ODOO_')) {
      console.error('Lead Odoo creation failed', {message});
      return jsonError(502, 'Your submission was stored but could not be sent to CRM. Our team will follow up.');
    }

    console.error('Lead submission failed', {message});
    return jsonError(500, 'Submission could not be processed. Please try again or contact us directly.');
  }
}
