import {NextResponse, type NextRequest} from 'next/server';
import {randomUUID} from 'node:crypto';
import {getRfqUpload, parseRfqFormData, sendRfqNotification, storeRfqSubmission, storeRfqUpload} from '@/lib/rfq/server';
import {createOdooCrmLead} from '@/lib/rfq/odoo';

export const runtime = 'nodejs';

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 5;
const rateLimitBuckets = new Map<string, RateLimitBucket>();

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
  return NextResponse.json(
    {
      ok: false,
      message,
      ...(errors ? {errors} : {})
    },
    {status}
  );
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return jsonError(429, 'Too many RFQ submissions. Please try again later.');
  }

  try {
    const formData = await request.formData();
    const parsed = parseRfqFormData(formData);

    if (!parsed.success) {
      const errors = Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0] ?? 'form'), issue.message]));
      return jsonError(400, 'Please review the RFQ form fields.', errors);
    }

    if (parsed.data.website) {
      return jsonError(400, 'Spam protection check failed.');
    }

    const submissionId = randomUUID();
    const upload = getRfqUpload(formData);
    const storedUpload = upload ? await storeRfqUpload(upload, submissionId) : null;
    await storeRfqSubmission(parsed.data, submissionId, storedUpload);
    const odooLead = await createOdooCrmLead(parsed.data, submissionId, storedUpload);
    const notification = await sendRfqNotification(parsed.data, submissionId, storedUpload);

    return NextResponse.json({
      ok: true,
      message: notification.configured
        ? 'RFQ submission received and notification queued.'
        : 'RFQ submission received. Notification endpoint is not configured.',
      submissionId,
      notificationConfigured: notification.configured,
      odooConfigured: odooLead.configured
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';

    if (message.startsWith('UPLOAD_')) {
      return jsonError(400, 'Uploaded file did not pass security checks.');
    }

    if (message.startsWith('ODOO_')) {
      console.error('RFQ Odoo lead creation failed', {message});
      return jsonError(502, 'RFQ submission was stored but could not be sent to Odoo CRM.');
    }

    console.error('RFQ submission failed', {message});
    return jsonError(500, 'RFQ submission could not be processed safely.');
  }
}
