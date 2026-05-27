import type {RfqSubmissionPayload, StoredRfqUpload} from './server';

type OdooConfig = {
  url: string;
  db: string;
  username: string;
  password: string;
  teamId?: number;
  sourceId?: number;
};

type OdooJsonRpcResponse<T> = {
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
};

export type OdooLeadResult = {
  configured: boolean;
  leadId?: number;
};

function numberFromEnv(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function getOdooConfig(): OdooConfig | null {
  const url = process.env.ODOO_URL;
  const db = process.env.ODOO_DB;
  const username = process.env.ODOO_USERNAME;
  const password = process.env.ODOO_PASSWORD;

  if (!url || !db || !username || !password) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ''),
    db,
    username,
    password,
    teamId: numberFromEnv(process.env.ODOO_CRM_TEAM_ID),
    sourceId: numberFromEnv(process.env.ODOO_CRM_SOURCE_ID)
  };
}

async function odooJsonRpc<T>(config: OdooConfig, service: string, method: string, args: unknown[]) {
  const response = await fetch(`${config.url}/jsonrpc`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service,
        method,
        args
      },
      id: Date.now()
    })
  });

  if (!response.ok) {
    throw new Error('ODOO_HTTP_FAILED');
  }

  const payload = (await response.json()) as OdooJsonRpcResponse<T>;

  if (payload.error) {
    throw new Error('ODOO_RPC_FAILED');
  }

  return payload.result as T;
}

function formatLeadDescription(payload: RfqSubmissionPayload, submissionId: string, upload: StoredRfqUpload | null) {
  const projectLines = [
    payload.project_type ? `Project type: ${payload.project_type}` : null,
    payload.project_location ? `Project location: ${payload.project_location}` : null,
    payload.estimated_area ? `Estimated area: ${payload.estimated_area}` : null,
    payload.project_stage ? `Project stage: ${payload.project_stage}` : null,
    payload.main_concern?.length ? `Main concern: ${payload.main_concern.join(', ')}` : null
  ].filter(Boolean);

  const contactLines = [
    `Name: ${payload.name}`,
    payload.company ? `Company: ${payload.company}` : null,
    `Phone: ${payload.phone}`,
    payload.whatsapp ? `WhatsApp: ${payload.whatsapp}` : null,
    payload.email ? `Email: ${payload.email}` : null
  ].filter(Boolean);

  return [
    `SIPANEL website RFQ submission: ${submissionId}`,
    '',
    ...(projectLines.length ? ['Project', ...projectLines, ''] : []),
    'Contact',
    ...contactLines,
    '',
    ...(payload.message ? ['Message', payload.message, ''] : []),
    upload
      ? `Uploaded file stored on website server: ${upload.relativePath} (${upload.originalName}, ${upload.mimeType}, ${upload.size} bytes)`
      : 'Uploaded file: none'
  ].join('\n');
}

export async function createOdooCrmLead(
  payload: RfqSubmissionPayload,
  submissionId: string,
  upload: StoredRfqUpload | null
): Promise<OdooLeadResult> {
  const config = getOdooConfig();

  if (!config) {
    return {configured: false};
  }

  const uid = await odooJsonRpc<number>(config, 'common', 'login', [config.db, config.username, config.password]);

  if (!uid) {
    throw new Error('ODOO_AUTH_FAILED');
  }

  const leadValues: Record<string, unknown> = {
    name: `[Website RFQ] ${payload.project_type || 'Technical Consultation'} - ${payload.company || payload.name}`,
    type: 'lead',
    contact_name: payload.name,
    partner_name: payload.company || undefined,
    email_from: payload.email || undefined,
    phone: payload.phone,
    description: formatLeadDescription(payload, submissionId, upload)
  };

  if (config.teamId) {
    leadValues.team_id = config.teamId;
  }

  if (config.sourceId) {
    leadValues.source_id = config.sourceId;
  }

  const leadId = await odooJsonRpc<number>(config, 'object', 'execute_kw', [
    config.db,
    uid,
    config.password,
    'crm.lead',
    'create',
    [leadValues]
  ]);

  return {configured: true, leadId};
}
