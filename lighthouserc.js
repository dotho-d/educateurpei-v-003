/**
 * lighthouserc.js
 * Configuration Lighthouse CI
 */
module.exports = {
    ci: {
      collect: {
        url: ['http://localhost:3000'],
        startServerCommand: 'npm start',
        numberOfRuns: 3,
        settings: {
          preset: 'desktop',
          chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        },
      },
      assert: {
        assertions: {
          'categories:performance': ['error', { minScore: 0.9 }],
          'categories:accessibility': ['error', { minScore: 0.85 }],
          'categories:best-practices': ['error', { minScore: 0.9 }],
          'categories:seo': ['error', { minScore: 0.9 }],
          'categories:pwa': ['warn', { minScore: 0.8 }],
          
          // Core Web Vitals
          'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
          'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
          'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
          'total-blocking-time': ['error', { maxNumericValue: 200 }],
          
          // Performance budgets
          'resource-summary:document:size': ['error', { maxNumericValue: 50000 }],
          'resource-summary:script:size': ['error', { maxNumericValue: 200000 }],
          'resource-summary:stylesheet:size': ['error', { maxNumericValue: 30000 }],
          'resource-summary:image:size': ['warn', { maxNumericValue: 500000 }],
          
          // Best practices
          'uses-https': 'error',
          'uses-http2': 'warn',
          'uses-text-compression': 'error',
          'uses-optimized-images': 'warn',
        },
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };