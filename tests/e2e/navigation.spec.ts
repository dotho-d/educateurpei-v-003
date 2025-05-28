/**
 * tests/e2e/navigation.spec.ts
 * Tests E2E pour la navigation
 */
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display homepage correctly', async ({ page }) => {
    // Vérifier le titre
    await expect(page).toHaveTitle(/Services de Travail Social.*Éducateur péi/);
    
    // Vérifier les éléments critiques above-the-fold
    await expect(page.locator('h1')).toContainText('Résolvez vos difficultés sociales');
    await expect(page.locator('[aria-label="Découvrir nos services"]')).toBeVisible();
    
    // Vérifier le header
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=Éducateur péi')).toBeVisible();
  });

  test('should navigate between sections smoothly', async ({ page }) => {
    // Tester navigation vers Services
    await page.click('text=Services');
    await expect(page.locator('#services')).toBeInViewport();
    
    // Tester navigation vers Tarifs
    await page.click('text=Tarifs');
    await expect(page.locator('#tarifs')).toBeInViewport();
    
    // Tester navigation vers Contact
    await page.click('text=Contact');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should work on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    // Ouvrir menu mobile
    await page.click('[aria-label="Ouvrir le menu"]');
    await expect(page.locator('#mobile-menu')).toBeVisible();
    
    // Naviguer via menu mobile
    await page.click('#mobile-menu text=Services');
    await expect(page.locator('#mobile-menu')).not.toBeVisible();
    await expect(page.locator('#services')).toBeInViewport();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus initial sur skip link
    await page.keyboard.press('Tab');
    await expect(page.locator('text=Passer au contenu principal')).toBeFocused();
    
    // Navigation clavier dans le header
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // Premier lien nav
    
    // Activer avec Enter
    await page.keyboard.press('Enter');
    await expect(page.locator('#domaines-intervention')).toBeInViewport();
  });
});