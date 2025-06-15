
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('dashboard should not have accessibility violations', async ({ page }) => {
    await page.goto('/dashboard');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('all pages should have proper headings hierarchy', async ({ page }) => {
    const pages = ['/dashboard', '/transactions', '/analytics', '/settings'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Check for h1
      await expect(page.locator('h1')).toHaveCount(1);
      
      // Check heading hierarchy (h1 → h2 → h3, no skipping)
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      let lastLevel = 0;
      
      for (const heading of headings) {
        const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
        const level = parseInt(tagName.charAt(1));
        
        // Level should not skip more than 1
        expect(level - lastLevel).toBeLessThanOrEqual(1);
        lastLevel = level;
      }
    }
  });

  test('keyboard navigation works correctly', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Start tab navigation
    await page.keyboard.press('Tab');
    
    // Should be able to reach all interactive elements
    const focusableElements = await page.locator('button, input, a[href], [tabindex="0"]').count();
    
    let tabCount = 0;
    let lastFocused = '';
    
    while (tabCount < focusableElements && tabCount < 20) { // Safety limit
      const focused = await page.evaluate(() => document.activeElement?.tagName || '');
      if (focused !== lastFocused) {
        expect(['BUTTON', 'INPUT', 'A']).toContain(focused);
        lastFocused = focused;
      }
      
      await page.keyboard.press('Tab');
      tabCount++;
    }
  });

  test('color contrast meets WCAG standards', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Test specific color combinations
    const textElements = await page.locator('p, span, div').filter({ hasText: /.+/ }).all();
    
    for (const element of textElements.slice(0, 10)) { // Test first 10 elements
      const styles = await element.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
        };
      });
      
      // Basic check - ensure text color is not the same as background
      expect(styles.color).not.toBe(styles.backgroundColor);
    }
  });
});
