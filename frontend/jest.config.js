const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jsdom',
  // 👇 This runs BEFORE the test framework & setupFilesAfterEnv
  setupFiles: ['<rootDir>/test/polyfills.ts'],
  // 👇 This runs AFTER the test framework is installed (keep your MSW + jest-axe here)
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!(msw)/)'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};

module.exports = createJestConfig(customJestConfig);
