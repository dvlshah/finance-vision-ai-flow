
import { test, expect } from '@playwright/test';

test.describe('Quick Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display quick action buttons', async ({ page }) => {
    await expect(page.locator('text=Quick Actions')).toBeVisible();
    await expect(page.locator('text=Add Transaction')).toBeVisible();
    await expect(page.locator('text=Upload Documents')).toBeVisible();
    await expect(page.locator('text=Set Budget')).toBeVisible();
    await expect(page.locator('text=Scan Receipt')).toBeVisible();
  });

  test('should open upload modal when upload button is clicked', async ({ page }) => {
    await page.click('text=Upload Documents');
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('text=Quick Actions')).toBeVisible();
    
    // Quick actions should stack on mobile
    const quickActionsContainer = page.locator('text=Quick Actions').locator('..').locator('..');
    await expect(quickActionsContainer).toBeVisible();
  });
});
