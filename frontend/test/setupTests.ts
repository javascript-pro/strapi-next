// /Users/goldlabel/GitHub/strapi-next/frontend/test/setupTests.ts

/**
 * Global polyfills & environment setup for Jest + JSDOM
 * -----------------------------------------------------
 * MSW (Mock Service Worker) requires TextEncoder/TextDecoder,
 * which aren’t provided by default in Node test environments.
 */
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder / TextDecoder for MSW
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as any;

/**
 * Testing Library setup
 */
import '@testing-library/jest-dom';
import 'whatwg-fetch';

/**
 * Default environment variables
 */
process.env.NEXT_PUBLIC_STRAPI_URL ||= 'http://localhost:1337';

/**
 * Accessibility matcher (jest-axe)
 */
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

/**
 * Mock Service Worker (MSW) setup
 * Intercepts fetch/HTTP calls during tests
 */
import { server } from './msw/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
