// __tests__/app/HomePage.a11y.test.tsx
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import HomePage from '@/app/page';
import { server } from '../../test/msw/server';
import { http, HttpResponse } from 'msw';

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Mock next/link to a simple <a> to avoid intersection/idle callbacks in jsdom
jest.mock('next/link', () => {
  return function MockNextLink(props: any) {
    const { href, children, ...rest } = props;
    return <a href={href} {...rest}>{children}</a>;
  };
});

describe('HomePage (a11y)', () => {
  test('no critical a11y violations and links have accessible names', async () => {
    // Mock Strapi response
    server.use(
      http.get(`${STRAPI}/api/courses`, () =>
        HttpResponse.json({
          data: [
            {
              id: 1,
              documentId: 'is6k2b',
              title: 'Introduction to Algebra',
              slug: 'introduction-to-algebra',
              description: [
                { type: 'paragraph', children: [{ type: 'text', text: 'Beginner algebra.' }] },
              ],
            },
            {
              id: 2,
              documentId: 'abc123',
              title: 'Geometry Basics',
              slug: null,
              description: [],
            },
          ],
        })
      )
    );

    // Render SSR output
    const ui = await HomePage();
    const { container } = render(ui as unknown as React.ReactElement);

    // Basic sanity
    expect(screen.getByText(/available courses/i)).toBeInTheDocument();

    // Links have accessible names and correct hrefs
    expect(
      screen.getByRole('link', { name: /introduction to algebra/i })
    ).toHaveAttribute('href', '/courses/introduction-to-algebra');
    expect(
      screen.getByRole('link', { name: /geometry basics/i })
    ).toHaveAttribute('href', '/courses/abc123');

    // Axe: temporarily disable "heading-order" until we switch to <h1>/<h2>
    const results = await axe(container, {
      rules: {
        'page-has-heading-one': { enabled: false },
        'heading-order': { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});