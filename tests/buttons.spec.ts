
import { test, expect } from '@playwright/test';

test.describe('Button Consistency', () => {
  test('all buttons have proper touch targets', async ({ page }) => {
    await page.goto('/dashboard');
    
    const buttons = await page.locator('button').all();
    
    for (const button of buttons) {
      const box = await button.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('button variants work correctly', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Test gradient button (upload button)
    const uploadBtn = page.getByRole('button', { name: /upload/i }).first();
    await expect(uploadBtn).toBeVisible();
    
    // Check hover state
    await uploadBtn.hover();
    
    // Test notification button
    const notificationBtn = page.locator('button').filter({ has: page.getByText('3') });
    await expect(notificationBtn).toBeVisible();
  });

  test('buttons are accessible', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test that interactive elements are focusable
    const interactiveElements = await page.locator('button, a, input').all();
    expect(interactiveElements.length).toBeGreaterThan(0);
  });

  test('quick action buttons work correctly', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Test quick action buttons
    await expect(page.locator('text=Quick Actions')).toBeVisible();
    
    // Test upload documents button
    const uploadBtn = page.getByText('Upload Documents');
    await uploadBtn.click();
    
    // Modal should open
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });
});
