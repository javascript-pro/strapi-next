// /Users/goldlabel/GitHub/strapi-next/frontend/test/msw/handlers.ts
import { http, HttpResponse } from 'msw';

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const handlers = [
  // Health check (harmless default)
  http.get(`${STRAPI}/health`, () => HttpResponse.json({ ok: true })),

  // Mock: GET /api/courses?populate=*
  http.get(`${STRAPI}/api/courses`, ({ request }) => {
    const url = new URL(request.url);
    const slugEq = url.searchParams.get('filters[slug][$eq]');

    const course1 = {
      id: 1,
      attributes: {
        title: 'Introduction to Algebra',
        slug: 'introduction-to-algebra',
        description: [{ type: 'paragraph', children: [{ type: 'text', text: 'Beginner algebra.' }] }],
      },
    };
    const course2 = {
      id: 2,
      attributes: {
        title: 'Geometry Basics',
        slug: 'geometry-basics',
        description: [],
      },
    };

    const data = slugEq ? [course1] : [course1, course2];
    return HttpResponse.json({ data });
  }),
];
