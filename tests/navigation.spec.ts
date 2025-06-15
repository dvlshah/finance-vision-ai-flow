
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('desktop navigation works correctly', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Test sidebar visibility
    await expect(page.locator('[data-sidebar="sidebar"]')).toBeVisible();
    
    // Test navigation items
    const navItems = ['Dashboard', 'Upload', 'Transactions', 'Categories', 'Analytics', 'Settings'];
    for (const item of navItems) {
      await expect(page.getByRole('link', { name: item })).toBeVisible();
    }
    
    // Test navigation functionality
    await page.click('text=Transactions');
    await expect(page).toHaveURL('/transactions');
    
    await page.click('text=Analytics');
    await expect(page).toHaveURL('/analytics');
  });

  test('mobile navigation works correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    
    // Sidebar should be collapsed on mobile
    const sidebar = page.locator('[data-sidebar="sidebar"]');
    
    // Sidebar trigger should be visible
    const trigger = page.locator('[data-sidebar="trigger"]');
    await expect(trigger).toBeVisible();
    
    // Click trigger to open sidebar
    await trigger.click();
    await expect(sidebar).toBeVisible();
    
    // Test navigation on mobile
    await page.click('text=Upload');
    await expect(page).toHaveURL('/upload');
  });

  test('responsive breakpoints work correctly', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(page.locator('[data-sidebar="sidebar"]')).toBeVisible();
    
    // Test large mobile viewport
    await page.setViewportSize({ width: 640, height: 800 });
    await page.reload();
    // Should still show sidebar trigger
    await expect(page.locator('[data-sidebar="trigger"]')).toBeVisible();
  });

  test('mobile bottom navigation works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    
    // Mobile bottom nav should be visible
    const bottomNav = page.locator('nav').filter({ hasText: 'Dashboard' });
    await expect(bottomNav).toBeVisible();
    
    // Test bottom nav functionality
    await page.click('text=Transactions');
    await expect(page).toHaveURL('/transactions');
  });
});
