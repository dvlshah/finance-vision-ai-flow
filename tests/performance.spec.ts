
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('page load times are acceptable', async ({ page }) => {
    const pages = ['/dashboard', '/transactions', '/analytics'];
    
    for (const pagePath of pages) {
      const startTime = Date.now();
      await page.goto(pagePath, { waitUntil: 'networkidle' });
      const loadTime = Date.now() - startTime;
      
      // Page should load in under 3 seconds
      expect(loadTime).toBeLessThan(3000);
      
      // Page should be interactive quickly
      await expect(page.locator('button').first()).toBeVisible({ timeout: 1000 });
    }
  });

  test('animations perform well', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Measure frame rate during animations
    const animationButton = page.locator('button').first();
    
    // Start performance monitoring
    await page.evaluate(() => {
      (window as any).frameCount = 0;
      (window as any).lastFrameTime = performance.now();
      
      function countFrames() {
        (window as any).frameCount++;
        requestAnimationFrame(countFrames);
      }
      countFrames();
    });
    
    // Trigger hover animation
    await animationButton.hover();
    await page.waitForTimeout(1000); // Let animation run
    
    // Check frame rate
    const frameRate = await page.evaluate(() => {
      const elapsed = performance.now() - (window as any).lastFrameTime;
      return ((window as any).frameCount / elapsed) * 1000;
    });
    
    // Should maintain at least 30 FPS
    expect(frameRate).toBeGreaterThan(30);
  });

  test('bundle size is reasonable', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check network requests
    const responses = await page.evaluate(() => {
      return performance.getEntriesByType('navigation').map((entry: any) => ({
        name: entry.name,
        transferSize: entry.transferSize,
      }));
    });
    
    const totalSize = responses.reduce((sum, response) => sum + (response.transferSize || 0), 0);
    
    // Total initial bundle should be under 2MB
    expect(totalSize).toBeLessThan(2 * 1024 * 1024);
  });

  test('images are optimized', async ({ page }) => {
    await page.goto('/dashboard');
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        // Check image response
        const response = await page.request.head(src);
        expect(response.status()).toBe(200);
        
        // Check if modern formats are used
        const contentType = response.headers()['content-type'];
        expect(['image/webp', 'image/avif', 'image/jpeg', 'image/png']).toContain(contentType);
      }
    }
  });
});
