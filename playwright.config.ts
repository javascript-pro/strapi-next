import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],
  timeout: 30 * 1000,
  use: {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  // Start BOTH servers; wait for each URL/port
  webServer: [
    {
      // Strapi (adjust filter if your package name isn't "cms")
      command: 'pnpm --filter cms dev',
      port: 1337,                 // Strapi dev default
      reuseExistingServer: true,
      timeout: 120_000            // first boot can be slow
    },
    {
      command: 'pnpm --filter frontend dev',
      url: 'http://localhost:3000', // Next dev default
      reuseExistingServer: true,
      timeout: 120_000
    }
  ]
});
