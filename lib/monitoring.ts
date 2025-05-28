/**
 * lib/monitoring.ts
 * Système de monitoring et analytics centralisé
 */

// Interface pour les événements personnalisés
interface AnalyticsEvent {
    name: string;
    properties?: Record<string, any>;
    timestamp?: number;
  }
  
  // Interface pour les métriques de performance
  interface PerformanceMetric {
    name: string;
    value: number;
    unit: string;
    timestamp: number;
    metadata?: Record<string, any>;
  }
  
  class MonitoringService {
    private static instance: MonitoringService;
    private isEnabled: boolean;
    private queue: AnalyticsEvent[] = [];
    private performanceObserver?: PerformanceObserver;
  
    private constructor() {
      this.isEnabled = process.env.NODE_ENV === 'production';
      this.initPerformanceMonitoring();
    }
  
    static getInstance(): MonitoringService {
      if (!MonitoringService.instance) {
        MonitoringService.instance = new MonitoringService();
      }
      return MonitoringService.instance;
    }
  
    // Initialisation du monitoring de performance
    private initPerformanceMonitoring() {
      if (typeof window === 'undefined' || !window.PerformanceObserver) return;
  
      try {
        // Observer les Core Web Vitals
        this.performanceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordPerformanceMetric({
              name: entry.entryType,
              value: entry.duration || (entry as any).value,
              unit: 'ms',
              timestamp: Date.now(),
              metadata: {
                entryType: entry.entryType,
                name: entry.name
              }
            });
          }
        });
  
        // Observer différents types de métriques
        const entryTypes = ['navigation', 'paint', 'largest-contentful-paint', 'layout-shift'];
        entryTypes.forEach(type => {
          try {
            this.performanceObserver?.observe({ type, buffered: true });
          } catch (e) {
            console.warn(`Performance observation for ${type} not supported`);
          }
        });
      } catch (error) {
        console.warn('Performance monitoring initialization failed:', error);
      }
    }
  
    // Enregistrement d'événement analytics
    trackEvent(event: AnalyticsEvent) {
      if (!this.isEnabled) {
        console.log('📊 Analytics Event:', event);
        return;
      }
  
      const enrichedEvent = {
        ...event,
        timestamp: event.timestamp || Date.now(),
        sessionId: this.getSessionId(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
  
      this.queue.push(enrichedEvent);
      this.flushQueue();
    }
  
    // Enregistrement de métrique de performance
    private recordPerformanceMetric(metric: PerformanceMetric) {
      if (!this.isEnabled) {
        console.log('⚡ Performance Metric:', metric);
        return;
      }
  
      // Envoyer à votre service d'analytics
      this.sendToAnalytics('performance', metric);
    }
  
    // Mesure de performance personnalisée
    measurePerformance<T>(name: string, fn: () => T): T {
      const start = performance.now();
      const result = fn();
      const duration = performance.now() - start;
  
      this.recordPerformanceMetric({
        name: `custom.${name}`,
        value: duration,
        unit: 'ms',
        timestamp: Date.now()
      });
  
      return result;
    }
  
    // Mesure de performance async
    async measurePerformanceAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
      const start = performance.now();
      const result = await fn();
      const duration = performance.now() - start;
  
      this.recordPerformanceMetric({
        name: `custom.${name}`,
        value: duration,
        unit: 'ms',
        timestamp: Date.now()
      });
  
      return result;
    }
  
    // Tracking des erreurs
    trackError(error: Error, context?: Record<string, any>) {
      this.trackEvent({
        name: 'error',
        properties: {
          message: error.message,
          stack: error.stack,
          context,
          url: window.location.href,
          userAgent: navigator.userAgent
        }
      });
    }
  
    // Tracking de la navigation
    trackPageView(path: string) {
      this.trackEvent({
        name: 'page_view',
        properties: {
          path,
          referrer: document.referrer,
          timestamp: Date.now()
        }
      });
    }
  
    // Tracking des interactions utilisateur
    trackUserInteraction(element: string, action: string, properties?: Record<string, any>) {
      this.trackEvent({
        name: 'user_interaction',
        properties: {
          element,
          action,
          ...properties
        }
      });
    }
  
    // Gestion de la session
    private getSessionId(): string {
      let sessionId = sessionStorage.getItem('analytics_session_id');
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('analytics_session_id', sessionId);
      }
      return sessionId;
    }
  
    // Envoi vers le service d'analytics
    private async sendToAnalytics(type: string, data: any) {
      try {
        // Ici vous intégreriez votre service d'analytics
        // Exemple avec fetch vers votre API
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, data })
        });
      } catch (error) {
        console.warn('Failed to send analytics data:', error);
      }
    }
  
    // Vider la queue d'événements
    private flushQueue() {
      if (this.queue.length === 0) return;
  
      const events = [...this.queue];
      this.queue = [];
  
      this.sendToAnalytics('events', events);
    }
  
    // Nettoyage
    destroy() {
      this.performanceObserver?.disconnect();
      this.flushQueue();
    }
  }
  
  export const monitoring = MonitoringService.getInstance();