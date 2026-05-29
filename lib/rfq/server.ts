import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {z} from 'zod';
import {rfqAllowedFileExtensions, rfqAllowedMimeTypes, rfqMaxFileSizeBytes} from './constants';
import {sanitizeInput} from './sanitize';

export type RfqSubmissionPayload = {
  name: string;
  company?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  project_type?: string;
  project_location?: string;
  estimated_area?: string;
  message?: string;
  project_stage?: string;
  main_concern?: string[];
  website?: string;
  source_page?: string;
  form_type?: string;
  language?: string;
  uploaded_file_url?: string;
};

export type StoredRfqUpload = {
  originalName: string;
  storedName: string;
  relativePath: string;
  size: number;
  mimeType: string;
};

const rfqSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().default(''),
  phone: z.string().trim().min(5).max(60),
  whatsapp: z.string().trim().max(60).optional().default(''),
  email: z.string().trim().email().optional().or(z.literal('')).default(''),
  project_type: z.string().trim().max(120).optional().default(''),
  project_location: z.string().trim().max(160).optional().default(''),
  estimated_area: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().max(5000).optional().default(''),
  project_stage: z.string().trim().max(120).optional().default(''),
  main_concern: z.array(z.string().trim().max(120)).max(12).optional().default([]),
  website: z.string().max(0).optional().default('')
});

const uploadRoot = process.env.RFQ_UPLOAD_DIR
  ? path.resolve(process.env.RFQ_UPLOAD_DIR)
  : path.join(process.cwd(), 'private', 'rfq-uploads', 'tmp');

const submissionRoot = process.env.RFQ_SUBMISSION_DIR
  ? path.resolve(process.env.RFQ_SUBMISSION_DIR)
  : path.join(process.cwd(), 'private', 'rfq-submissions');

function getExtension(filename: string) {
  return filename.split('.').pop()?.toLowerCase() ?? '';
}

function isAllowedExtension(extension: string) {
  return rfqAllowedFileExtensions.includes(extension as (typeof rfqAllowedFileExtensions)[number]);
}

function isAllowedMimeType(mimeType: string) {
  return rfqAllowedMimeTypes.includes(mimeType as (typeof rfqAllowedMimeTypes)[number]);
}

function hasValidMagicBytes(extension: string, bytes: Uint8Array) {
  if (extension === 'pdf') {
    return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
  }

  if (extension === 'jpg' || extension === 'jpeg') {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }

  if (extension === 'png') {
    return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  }

  if (extension === 'dwg') {
    const signature = new TextDecoder().decode(bytes.slice(0, 4));
    return signature === 'AC10';
  }

  return false;
}

function safeOriginalName(filename: string) {
  return path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 160);
}

export function parseRfqFormData(formData: FormData) {
  const concerns = formData
    .getAll('main_concern')
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);

  const rawPayload = {
    name: String(formData.get('name') ?? ''),
    company: String(formData.get('company') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    whatsapp: String(formData.get('whatsapp') ?? ''),
    email: String(formData.get('email') ?? ''),
    project_type: String(formData.get('project_type') ?? ''),
    project_location: String(formData.get('project_location') ?? ''),
    estimated_area: String(formData.get('estimated_area') ?? ''),
    message: String(formData.get('message') ?? ''),
    project_stage: String(formData.get('project_stage') ?? ''),
    main_concern: concerns,
    website: String(formData.get('website') ?? '')
  };

  const parsed = rfqSubmissionSchema.safeParse(rawPayload);

  if (!parsed.success) {
    return parsed;
  }

  return {
    success: true as const,
    data: {
      ...parsed.data,
      name: sanitizeInput(parsed.data.name),
      company: sanitizeInput(parsed.data.company),
      phone: sanitizeInput(parsed.data.phone),
      whatsapp: sanitizeInput(parsed.data.whatsapp),
      email: sanitizeInput(parsed.data.email),
      project_type: sanitizeInput(parsed.data.project_type),
      project_location: sanitizeInput(parsed.data.project_location),
      estimated_area: sanitizeInput(parsed.data.estimated_area),
      message: sanitizeInput(parsed.data.message),
      project_stage: sanitizeInput(parsed.data.project_stage),
      main_concern: parsed.data.main_concern.map(sanitizeInput)
    }
  };
}

export function getRfqUpload(formData: FormData) {
  const upload = formData.get('optional_file_upload') ?? formData.get('file_upload');

  if (upload instanceof File && upload.size > 0) {
    return upload;
  }

  return null;
}

export async function storeRfqUpload(file: File, submissionId: string): Promise<StoredRfqUpload> {
  if (file.size > rfqMaxFileSizeBytes) {
    throw new Error('UPLOAD_TOO_LARGE');
  }

  const extension = getExtension(file.name);

  if (!isAllowedExtension(extension)) {
    throw new Error('UPLOAD_EXTENSION_NOT_ALLOWED');
  }

  if (!isAllowedMimeType(file.type)) {
    throw new Error('UPLOAD_MIME_NOT_ALLOWED');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (!hasValidMagicBytes(extension, buffer)) {
    throw new Error('UPLOAD_SIGNATURE_INVALID');
  }

  const directory = path.join(uploadRoot, submissionId);
  await mkdir(directory, {recursive: true, mode: 0o700});

  const originalName = safeOriginalName(file.name);
  const storedName = `${randomUUID()}.${extension}`;
  const destination = path.join(directory, storedName);

  await writeFile(destination, buffer, {mode: 0o600});

  return {
    originalName,
    storedName,
    relativePath: path.relative(process.cwd(), destination),
    size: file.size,
    mimeType: file.type
  };
}

export async function storeRfqSubmission(
  payload: RfqSubmissionPayload,
  submissionId: string,
  upload: StoredRfqUpload | null
) {
  await mkdir(submissionRoot, {recursive: true, mode: 0o700});

  const destination = path.join(submissionRoot, `${submissionId}.json`);
  await writeFile(
    destination,
    JSON.stringify(
      {
        submissionId,
        receivedAt: new Date().toISOString(),
        payload,
        upload
      },
      null,
      2
    ),
    {mode: 0o600}
  );

  return path.relative(process.cwd(), destination);
}

export async function sendRfqNotification(
  payload: RfqSubmissionPayload,
  submissionId: string,
  upload: StoredRfqUpload | null
) {
  const endpoint = process.env.RFQ_NOTIFICATION_WEBHOOK_URL;

  if (!endpoint) {
    return {configured: false, delivered: false};
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(process.env.RFQ_NOTIFICATION_WEBHOOK_TOKEN
        ? {authorization: `Bearer ${process.env.RFQ_NOTIFICATION_WEBHOOK_TOKEN}`}
        : {})
    },
    body: JSON.stringify({
      submissionId,
      recipient: process.env.RFQ_NOTIFICATION_TO_EMAIL,
      from: process.env.RFQ_NOTIFICATION_FROM_EMAIL,
      subject: process.env.RFQ_NOTIFICATION_SUBJECT ?? `SIPANEL RFQ submission ${submissionId}`,
      payload,
      upload
    })
  });

  if (!response.ok) {
    throw new Error('NOTIFICATION_FAILED');
  }

  return {configured: true, delivered: true};
}
