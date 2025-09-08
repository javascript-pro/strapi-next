import { http, HttpResponse } from 'msw';

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Keep a harmless default handler to avoid “no handlers” errors.
// We’ll add real Strapi endpoints in a minute.
export const handlers = [
  http.get(`${STRAPI}/health`, () => HttpResponse.json({ ok: true })),
];
