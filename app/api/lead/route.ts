import {NextResponse, type NextRequest} from 'next/server';
import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import {createOdooCrmLead} from '@/lib/rfq/odoo';
import {storeRfqSubmission, type RfqSubmissionPayload} from '@/lib/rfq/server';

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
  email: z.string().trim().email().optional().or(z.literal('')).default(''),
  resource_slug: z.string().trim().min(2).max(160),
  resource_title: z.string().trim().min(2).max(220),
  project_type: z.string().trim().max(120).optional().default('Engineering Resource Request'),
  project_stage: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
  website: z.string().max(0).optional().default('')
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

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return jsonError(429, 'Too many lead submissions. Please try again later.');
  }

  try {
    const json = await request.json();
    const parsed = leadPayloadSchema.safeParse(json);

    if (!parsed.success) {
      const errors = Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0] ?? 'form'), issue.message]));
      return jsonError(400, 'Please review the lead capture fields.', errors);
    }

    if (parsed.data.website) {
      return jsonError(400, 'Spam protection check failed.');
    }

    const submissionId = randomUUID();
    const payload: RfqSubmissionPayload = {
      name: parsed.data.name,
      company: parsed.data.company,
      phone: parsed.data.phone,
      email: parsed.data.email,
      whatsapp: '',
      project_type: `Resource download request: ${parsed.data.resource_title}`,
      project_location: '',
      estimated_area: '',
      project_stage: parsed.data.project_stage,
      main_concern: ['Engineering resource download'],
      message: [
        `Requested resource: ${parsed.data.resource_title}`,
        `Resource slug: ${parsed.data.resource_slug}`,
        '',
        parsed.data.message || 'No additional message provided.'
      ].join('\n'),
      website: ''
    };

    await storeRfqSubmission(payload, submissionId, null);
    const odooLead = await createOdooCrmLead(payload, submissionId, null);

    return NextResponse.json({
      ok: true,
      message: 'Resource request received.',
      submissionId,
      odooConfigured: odooLead.configured
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';

    if (message.startsWith('ODOO_')) {
      console.error('Resource lead Odoo creation failed', {message});
      return jsonError(502, 'Lead was stored but could not be sent to Odoo CRM.');
    }

    console.error('Resource lead submission failed', {message});
    return jsonError(500, 'Lead request could not be processed safely.');
  }
}
