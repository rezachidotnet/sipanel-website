export const rfqApiEndpoint = '/api/rfq';

export const rfqAllowedFileExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'dwg'] as const;

export const rfqAllowedMimeTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/vnd.dwg',
  'application/acad',
  'application/x-acad',
  'application/autocad_dwg',
  'application/dwg',
  'application/x-dwg',
  'application/octet-stream'
] as const;

export const rfqMaxFileSizeBytes = 10 * 1024 * 1024;

