import {type NextRequest} from 'next/server';
import {POST as leadHandler} from '@/app/api/lead/route';

export const runtime = 'nodejs';

/**
 * Legacy RFQ endpoint — proxies to the unified /api/lead handler.
 * All new form submissions should use /api/lead directly.
 */
export async function POST(request: NextRequest) {
  return leadHandler(request);
}
