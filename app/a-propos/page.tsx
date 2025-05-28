"use client";

import { useRef, useEffect, useState } from 'react';

import { usePreload } from '@/components/LazyComponents';
import {
  LazyHeroAPropos,
  LazyMonHistoireSection,
  LazyMesValeursSection,
  LazyEspritTarifSection,
  LazyMonEngagementSection
} from '@/components/LazyComponents';
import LazySection from '@/components/ui/LazySection';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function AProposPage() {
  const { trackEvent, measurePerformance } = useAnalytics();
  
  // Références pour chaque section
  const histoireRef = useRef<HTMLElement>(null);
  const valeursRef = useRef<HTMLElement>(null);
  const espritRef = useRef<HTMLElement>(null);
  const engagementRef = useRef<HTMLElement>(null);
  
  // Hook pour le preloading intelligent
  const { preloadAPropos } = usePreload();
  
  // État pour le preloading progressif
  const [hasPreloadedCritical, setHasPreloadedCritical] = useState(false);

  // Preloading intelligent
  useEffect(() => {
    measurePerformance('a-propos-page-load', () => {
      trackEvent('page_view', { page: 'a-propos' });
      
      if (!hasPreloadedCritical) {
        preloadAPropos();
        setHasPreloadedCritical(true);
      }
    });
  }, [preloadAPropos, hasPreloadedCritical, measurePerformance, trackEvent]);

  const handleSmoothScroll = (targetId: string) => {
    trackEvent('section_navigation', { target: targetId, page: 'a-propos' });
    
    requestAnimationFrame(() => {
      measurePerformance(`scroll-to-${targetId}`, () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = targetPosition + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          window.history.pushState(null, '', `#${targetId}`);
        }
      });
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Critique, chargement immédiat */}
      <LazyHeroAPropos onScrollToSection={handleSmoothScroll} />

      {/* Mon Histoire Section - Haute priorité avec lazy loading */}
      <LazySection
        rootMargin="200px"
        threshold={0.1}
        minHeight="800px"
        className="w-full"
      >
        <LazyMonHistoireSection ref={histoireRef} />
      </LazySection>

      {/* Mes Valeurs Section - Priorité moyenne avec lazy loading */}
      <LazySection
        rootMargin="150px"
        threshold={0.15}
        minHeight="600px"
        className="w-full"
      >
        <LazyMesValeursSection ref={valeursRef} />
      </LazySection>

      {/* Esprit Tarif Section - Priorité basse avec lazy loading */}
      <LazySection
        rootMargin="100px"
        threshold={0.2}
        minHeight="500px"
        className="w-full"
      >
        <LazyEspritTarifSection ref={espritRef} />
      </LazySection>

      {/* Mon Engagement Section - Priorité basse avec lazy loading agressif */}
      <LazySection
        rootMargin="50px"
        threshold={0.25}
        minHeight="700px"
        className="w-full"
      >
        <LazyMonEngagementSection ref={engagementRef} />
      </LazySection>
    </div>
  );
}