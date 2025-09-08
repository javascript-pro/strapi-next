// __tests__/app/HomePage.server.test.tsx
import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import HomePage from '@/app/page';
import { server } from '../../test/msw/server';
import { http, HttpResponse } from 'msw';

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

describe('HomePage (server component)', () => {
  test('renders courses with correct links, titles, and flattened descriptions', async () => {
    // Arrange: mock Strapi payload the component expects (flat fields)
    server.use(
      http.get(`${STRAPI}/api/courses`, () =>
        HttpResponse.json({
          data: [
            {
              id: 1,
              documentId: 'is6k2b...',
              title: 'Introduction to Algebra',
              slug: 'introduction-to-algebra',
              description: [
                { type: 'paragraph', children: [{ type: 'text', text: 'Beginner-friendly algebra.' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'Start here.' }] },
              ],
            },
            {
              id: 2,
              documentId: 'abc123',
              title: 'No Slug Course',
              slug: null, // forces documentId fallback
              description: [],
            },
            {
              id: 3,
              documentId: 'untitled-999',
              // no title -> triggers "Untitled Course"
              description: [{ type: 'paragraph', children: [{ type: 'text', text: 'Mystery course.' }] }],
            },
          ],
        })
      )
    );

    // Act: render the server component output
    const ui = await HomePage();
    render(ui as unknown as React.ReactElement);

    // Assert: heading exists (basic a11y sanity)
    expect(screen.getByRole('heading', { name: /available courses/i })).toBeInTheDocument();

    // Card 1 — uses slug
    const algebraLink = screen.getByRole('link', { name: /introduction to algebra/i });
    expect(algebraLink).toHaveAttribute('href', '/courses/introduction-to-algebra');

    // The description should be flattened/joined
    const algebraCard = algebraLink.closest('a')!;
    const algebraWithin = within(algebraCard);
    expect(algebraWithin.getByText(/Beginner-friendly algebra\./i)).toBeInTheDocument();
    expect(algebraWithin.getByText(/Start here\./i)).toBeInTheDocument();

    // Card 2 — falls back to documentId when slug is null
    const noSlugLink = screen.getByRole('link', { name: /no slug course/i });
    expect(noSlugLink).toHaveAttribute('href', '/courses/abc123');

    // Card 3 — title fallback to "Untitled Course"
    const untitledLink = screen.getByRole('link', { name: /untitled course/i });
    expect(untitledLink).toHaveAttribute('href', '/courses/untitled-999');
  });

  test('throws a helpful error if Strapi returns a non-OK response', async () => {
    server.use(
      http.get(`${STRAPI}/api/courses`, () => HttpResponse.json({ error: 'boom' }, { status: 500 }))
    );

    await expect(HomePage()).rejects.toThrow('Failed to fetch courses from Strapi');
  });
});
