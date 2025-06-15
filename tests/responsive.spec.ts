
import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'iPad Mini', width: 768, height: 1024 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Large Desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`layout works on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/dashboard');
      
      // Page should render without horizontal scroll
      const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const bodyClientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(bodyScrollWidth).toBeLessThanOrEqual(bodyClientWidth + 1); // Allow 1px tolerance
      
      // Content should be visible
      await expect(page.locator('main')).toBeVisible();
      
      // Header should be visible
      await expect(page.locator('header')).toBeVisible();
      
      // Navigation should be appropriate for screen size
      if (viewport.width < 768) {
        // Mobile: sidebar trigger should be visible
        await expect(page.locator('[data-sidebar="trigger"]')).toBeVisible();
      } else {
        // Desktop/tablet: sidebar should be visible
        await expect(page.locator('[data-sidebar="sidebar"]')).toBeVisible();
      }
    });
  }

  test('text remains readable on all screen sizes', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },  // iPhone SE
      { width: 1920, height: 1080 }, // Large desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/dashboard');
      
      // Check that text isn't too small or too large
      const headings = await page.locator('h1, h2, h3').all();
      for (const heading of headings) {
        const fontSize = await heading.evaluate(el => {
          const style = window.getComputedStyle(el);
          return parseFloat(style.fontSize);
        });
        
        // Font size should be reasonable (14px - 48px)
        expect(fontSize).toBeGreaterThanOrEqual(14);
        expect(fontSize).toBeLessThanOrEqual(48);
      }
    }
  });

  test('cards and components are responsive', async ({ page }) => {
    await page.goto('/dashboard');
    
    const mobileViewport = { width: 375, height: 667 };
    const desktopViewport = { width: 1280, height: 720 };
    
    // Test mobile layout
    await page.setViewportSize(mobileViewport);
    await page.reload();
    
    // Cards should stack on mobile
    const cards = await page.locator('[class*="grid"]').first();
    await expect(cards).toBeVisible();
    
    // Test desktop layout
    await page.setViewportSize(desktopViewport);
    await page.reload();
    
    // Layout should adapt to desktop
    await expect(cards).toBeVisible();
  });

  test('bottom navigation appears only on mobile', async ({ page }) => {
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    
    const bottomNav = page.locator('nav').filter({ hasText: 'Dashboard' });
    await expect(bottomNav).toBeVisible();
    
    // Test desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.reload();
    
    // Bottom nav should be hidden on desktop
    await expect(bottomNav).toBeHidden();
  });
});
