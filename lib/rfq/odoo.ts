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
  delivered: boolean;
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
  const lines: string[] = [];

  lines.push(`SIPANEL website lead: ${submissionId}`);
  lines.push(`Submitted at: ${new Date().toISOString()}`);
  lines.push('');

  if (payload.source_page) {
    lines.push(`Source page: ${payload.source_page}`);
  }

  if (payload.form_type) {
    lines.push(`Form type: ${payload.form_type}`);
  }

  if (payload.language) {
    lines.push(`Language: ${payload.language}`);
  }

  if (payload.source_page || payload.form_type || payload.language) {
    lines.push('');
  }

  const projectLines = [
    payload.project_type ? `Project type: ${payload.project_type}` : null,
    payload.project_location ? `Project location: ${payload.project_location}` : null,
    payload.estimated_area ? `Estimated area: ${payload.estimated_area}` : null,
    payload.project_stage ? `Project stage: ${payload.project_stage}` : null,
    payload.main_concern?.length ? `Main concern: ${payload.main_concern.join(', ')}` : null
  ].filter((line): line is string => Boolean(line));

  if (projectLines.length) {
    lines.push('Project Details');
    lines.push(...projectLines);
    lines.push('');
  }

  lines.push('Contact');
  lines.push(`Name: ${payload.name}`);
  if (payload.company) {
    lines.push(`Company: ${payload.company}`);
  }

  lines.push(`Phone: ${payload.phone}`);
  if (payload.whatsapp) {
    lines.push(`WhatsApp: ${payload.whatsapp}`);
  }

  if (payload.email) {
    lines.push(`Email: ${payload.email}`);
  }

  lines.push('');

  if (payload.message) {
    lines.push('Message');
    lines.push(payload.message);
    lines.push('');
  }

  if (upload) {
    lines.push(`Uploaded file: ${upload.originalName} (${upload.mimeType}, ${upload.size} bytes)`);
    lines.push(`Server path: ${upload.relativePath}`);
  } else if (payload.uploaded_file_url) {
    lines.push(`Uploaded file URL: ${payload.uploaded_file_url}`);
  }

  return lines.join('\n');
}

export async function createOdooCrmLead(
  payload: RfqSubmissionPayload,
  submissionId: string,
  upload: StoredRfqUpload | null
): Promise<OdooLeadResult> {
  const config = getOdooConfig();

  if (!config) {
    return {configured: false, delivered: false};
  }

  const uid = await odooJsonRpc<number>(config, 'common', 'login', [config.db, config.username, config.password]);

  if (!uid) {
    throw new Error('ODOO_AUTH_FAILED');
  }

  const formType = payload.form_type || 'General Inquiry';
  const leadTitle = `[Website] ${formType} - ${payload.name}`;

  const leadValues: Record<string, unknown> = {
    name: leadTitle,
    type: 'lead',
    contact_name: payload.name,
    phone: payload.phone,
    description: formatLeadDescription(payload, submissionId, upload)
  };

  if (payload.email) {
    leadValues.email_from = payload.email;
  }

  if (payload.company) {
    leadValues.partner_name = payload.company;
  }

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

  if (!Number.isInteger(leadId) || leadId <= 0) {
    throw new Error('ODOO_LEAD_NOT_CREATED');
  }

  return {configured: true, delivered: true, leadId};
}
