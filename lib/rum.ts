/**
 * lib/rum.ts
 * Real User Monitoring pour Core Web Vitals
 */
'use client';

import { getCLS, getFID, getFCP, getLCP, getTTFB, onINP } from 'web-vitals';

interface MetricData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
  url: string;
  timestamp: number;
}

class RUMService {
  private static instance: RUMService;
  private metricsQueue: MetricData[] = [];
  private isEnabled: boolean;

  private constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
    this.initializeMetrics();
  }

  static getInstance(): RUMService {
    if (!RUMService.instance) {
      RUMService.instance = new RUMService();
    }
    return RUMService.instance;
  }

  private initializeMetrics() {
    if (typeof window === 'undefined' || !this.isEnabled) return;

    // Configuration des seuils Core Web Vitals
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 },
      INP: { good: 200, poor: 500 }
    };

    const handleMetric = (metric: any) => {
      const metricData: MetricData = {
        name: metric.name,
        value: metric.value,
        rating: this.getRating(metric.name, metric.value, thresholds),
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType || 'navigate',
        url: window.location.href,
        timestamp: Date.now()
      };

      this.queueMetric(metricData);
      
      // Log en développement
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 ${metric.name}:`, metricData);
      }
    };

    // Initialiser tous les Core Web Vitals
    getCLS(handleMetric);
    getFID(handleMetric);
    getFCP(handleMetric);
    getLCP(handleMetric);
    getTTFB(handleMetric);
    onINP(handleMetric);
  }

  private getRating(name: string, value: number, thresholds: any): 'good' | 'needs-improvement' | 'poor' {
    const threshold = thresholds[name];
    if (!threshold) return 'good';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  private queueMetric(metric: MetricData) {
    this.metricsQueue.push(metric);
    
    // Flush automatique après 10 métriques ou 30 secondes
    if (this.metricsQueue.length >= 10) {
      this.flushMetrics();
    } else {
      setTimeout(() => this.flushMetrics(), 30000);
    }
  }

  private async flushMetrics() {
    if (this.metricsQueue.length === 0) return;

    const metrics = [...this.metricsQueue];
    this.metricsQueue = [];

    try {
      // Envoyer à votre endpoint d'analytics
      await this.sendMetrics(metrics);
    } catch (error) {
      console.warn('Failed to send RUM metrics:', error);
      // Re-ajouter à la queue en cas d'échec
      this.metricsQueue.unshift(...metrics);
    }
  }

  private async sendMetrics(metrics: MetricData[]) {
    if (!this.isEnabled) return;

    // Option 1: Envoyer à Google Analytics 4
    if (typeof gtag !== 'undefined') {
      metrics.forEach(metric => {
        gtag('event', metric.name, {
          custom_metric_value: metric.value,
          custom_metric_rating: metric.rating,
          custom_metric_delta: metric.delta,
          page_url: metric.url
        });
      });
    }

    // Option 2: Envoyer à votre API d'analytics
    try {
      await fetch('/api/analytics/vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metrics,
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      });
    } catch (error) {
      // Utiliser navigator.sendBeacon comme fallback
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/vitals', JSON.stringify({ metrics }));
      }
    }
  }

  // Méthodes publiques pour tracking custom
  public trackCustomMetric(name: string, value: number, context?: Record<string, any>) {
    const metric: MetricData = {
      name: `custom.${name}`,
      value,
      rating: 'good', // Custom metrics n'ont pas de rating automatique
      delta: value,
      id: Math.random().toString(36).substr(2, 9),
      navigationType: 'custom',
      url: window.location.href,
      timestamp: Date.now()
    };

    this.queueMetric(metric);
  }

  public trackUserAction(action: string, duration?: number) {
    if (duration) {
      this.trackCustomMetric(`user_action.${action}`, duration);
    }
  }

  // Flush forcé pour beforeunload
  public forceFlush() {
    this.flushMetrics();
  }
}

// Export singleton
export const rum = RUMService.getInstance();

// Hook React pour faciliter l'utilisation
export function useRUM() {
  return {
    trackCustomMetric: rum.trackCustomMetric.bind(rum),
    trackUserAction: rum.trackUserAction.bind(rum)
  };
}