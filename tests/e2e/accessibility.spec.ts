/**
 * tests/e2e/accessibility.spec.ts
 * Tests E2E pour l'accessibilité
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support screen reader navigation', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier les landmarks
    await expect(page.locator('main[id="main-content"]')).toBeVisible();
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Navigation principale"]')).toBeVisible();
    
    // Vérifier les headings
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toHaveAttribute('id');
  });

  test('should have proper focus management', async ({ page }) => {
    await page.goto('/');
    
    // Tester le skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('text=Passer au contenu principal');
    await expect(skipLink).toBeFocused();
    
    // Activer le skip link
    await page.keyboard.press('Enter');
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('should work with high contrast mode', async ({ page }) => {
    // Simuler le mode haut contraste
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    await page.goto('/');
    
    // Vérifier que le contenu reste visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
  });
});