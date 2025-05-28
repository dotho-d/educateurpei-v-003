/**
 * hooks/useAnalytics.ts
 * Hook pour faciliter l'utilisation du monitoring
 */

'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { monitoring } from '@/lib/monitoring';

export function useAnalytics() {
  const pathname = usePathname();

  // Track page views automatiquement
  useEffect(() => {
    monitoring.trackPageView(pathname);
  }, [pathname]);

  const trackEvent = useCallback((name: string, properties?: Record<string, any>) => {
    monitoring.trackEvent({ name, properties });
  }, []);

  const trackError = useCallback((error: Error, context?: Record<string, any>) => {
    monitoring.trackError(error, context);
  }, []);

  const trackClick = useCallback((element: string, properties?: Record<string, any>) => {
    monitoring.trackUserInteraction(element, 'click', properties);
  }, []);

  const measurePerformance = useCallback(<T>(name: string, fn: () => T): T => {
    return monitoring.measurePerformance(name, fn);
  }, []);

  return {
    trackEvent,
    trackError,
    trackClick,
    measurePerformance
  };
}