/**
 * tests/e2e/performance.spec.ts
 * Tests E2E pour les performances
 */
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should meet Core Web Vitals thresholds', async ({ page }) => {
    // Commencer la mesure de performance
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Mesurer les métriques avec JavaScript
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const results: any = {};
        
        // Observer LCP
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lcpEntry = entries[entries.length - 1];
            results.lcp = lcpEntry.startTime;
          });
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
        }

        // Mesurer FCP via PerformanceObserver
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name === 'first-contentful-paint') {
                results.fcp = entry.startTime;
              }
            }
          });
          observer.observe({ type: 'paint', buffered: true });
        }

        // Attendre un peu puis retourner les résultats
        setTimeout(() => {
          resolve(results);
        }, 3000);
      });
    });

    // Vérifier les seuils Core Web Vitals
    if (metrics.lcp) {
      expect(metrics.lcp).toBeLessThan(2500); // LCP < 2.5s
    }
    if (metrics.fcp) {
      expect(metrics.fcp).toBeLessThan(1800); // FCP < 1.8s
    }
  });

  test('should load images efficiently', async ({ page }) => {
    const imageRequests: string[] = [];
    
    // Intercepter les requêtes d'images
    page.on('request', (request) => {
      if (request.resourceType() === 'image') {
        imageRequests.push(request.url());
      }
    });
    
    await page.goto('/');
    
    // Vérifier que les images critiques sont chargées en priorité
    const heroImage = imageRequests.find(url => url.includes('pexels'));
    expect(heroImage).toBeTruthy();
    
    // Vérifier qu'il n'y a pas trop de requêtes d'images simultanées
    expect(imageRequests.length).toBeLessThan(10);
  });

  test('should have fast Time to Interactive', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Attendre que la page soit interactive
    await page.waitForLoadState('networkidle');
    
    // Tester l'interactivité
    await page.click('text=Découvrir nos services');
    
    const endTime = Date.now();
    const timeToInteractive = endTime - startTime;
    
    expect(timeToInteractive).toBeLessThan(3000); // TTI < 3s
  });
});