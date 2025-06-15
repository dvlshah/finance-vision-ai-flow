
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Personal Finance/);
});

test('dashboard loads', async ({ page }) => {
  await page.goto('/dashboard');
  
  // Check that the dashboard page loads
  await expect(page.locator('h1')).toContainText('Financial Dashboard');
});

test('navigation works', async ({ page }) => {
  await page.goto('/dashboard');
  
  // Test navigation to transactions page
  await page.click('text=Transactions');
  await expect(page).toHaveURL(/.*transactions/);
});
