// tests/e2e/courses.spec.ts
import { test, expect } from '@playwright/test';

test('homepage shows courses and a course page opens', async ({ page }) => {
  await page.goto('/');

  // Adjust this selector/text to whatever renders on your homepage
  await expect(page.getByText('Introduction to Algebra')).toBeVisible();

  await page.getByText('Introduction to Algebra').click();

  await expect(
    page.getByRole('heading', { name: 'Introduction to Algebra' })
  ).toBeVisible();
});
