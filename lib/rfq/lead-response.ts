export type LeadApiResponse = {
  ok?: boolean;
  message?: string;
  lead?: {
    delivered?: boolean;
    provider?: string;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isConfirmedRfqDelivery(response: unknown) {
  if (!isRecord(response) || response.ok !== true || !isRecord(response.lead)) {
    return false;
  }

  return response.lead.delivered === true;
}
