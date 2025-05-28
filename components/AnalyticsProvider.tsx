/**
 * components/AnalyticsProvider.tsx
 * Provider pour injecter les analytics et RUM dans l'app
 */

'use client';

import { ReactNode, useEffect } from 'react';
import { monitoring } from '@/lib/monitoring';
import { rum } from '@/lib/rum';

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialisation du monitoring existant
    const handleError = (event: ErrorEvent) => {
      monitoring.trackError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      monitoring.trackError(new Error(String(event.reason)), {
        type: 'unhandled_promise_rejection'
      });
    };

    // Initialisation du RUM
    const handleBeforeUnload = () => {
      rum.forceFlush();
    };

    // Event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Performance monitoring custom
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Mesurer le temps de First Input
      let firstInputTime: number | null = null;
      const measureFirstInput = (event: Event) => {
        if (firstInputTime === null) {
          firstInputTime = performance.now();
          rum.trackCustomMetric('first_input_time', firstInputTime);
          
          // Cleanup - une seule mesure nécessaire
          ['click', 'keydown', 'touchstart'].forEach(eventType => {
            document.removeEventListener(eventType, measureFirstInput);
          });
        }
      };

      ['click', 'keydown', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, measureFirstInput, { 
          once: true, 
          passive: true 
        });
      });

      // Mesurer le temps jusqu'à l'interaction utilisateur
      const measureTimeToInteraction = () => {
        const navigationStart = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationStart) {
          const timeToInteraction = performance.now() - navigationStart.loadEventEnd;
          if (timeToInteraction > 0) {
            rum.trackCustomMetric('time_to_interaction', timeToInteraction);
          }
        }
      };

      // Mesurer après que la page soit complètement chargée
      if (document.readyState === 'complete') {
        setTimeout(measureTimeToInteraction, 1000);
      } else {
        window.addEventListener('load', () => {
          setTimeout(measureTimeToInteraction, 1000);
        });
      }
    }

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      monitoring.destroy();
    };
  }, []);

  return <>{children}</>;
}