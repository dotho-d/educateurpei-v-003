/**
 * page.tsx (home page)
 * Page d'accueil avec optimisations performance avancées - VERSION OPTIMISÉE
 */
"use client";

import { useRef, useEffect, useState } from 'react';
import { usePreload } from '@/components/LazyComponents';
import LazySection from '@/components/ui/LazySection';
import { useAnalytics } from '@/hooks/useAnalytics';

// Import des composants lazy-loaded
import {
  LazyHeroSection,
  LazyDomainesSection, 
  LazyServicesSection,
  LazyTarifsSection,
  LazyCTASection,
  LazyDevTools
} from '@/components/LazyComponents';

/**
 * Page d'accueil optimisée pour les performances
 * Utilise le lazy loading intelligent et le preloading
 */
export default function Home() {
  // Analytics tracking
  const { trackEvent, measurePerformance } = useAnalytics();
  
  // Références pour chaque section
  const heroRef = useRef<HTMLElement>(null);
  const domainesRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const tarifsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  
  // Hook pour le preloading intelligent
  const { preloadCritical, preloadMedium } = usePreload();
  
  // État pour le preloading progressif
  const [hasPreloadedCritical, setHasPreloadedCritical] = useState(false);
  const [hasPreloadedMedium, setHasPreloadedMedium] = useState(false);

  // Preloading intelligent basé sur l'interaction utilisateur
  useEffect(() => {
    // Mesurer la performance du preloading
    measurePerformance('critical-preload', () => {
      if (!hasPreloadedCritical) {
        preloadCritical();
        setHasPreloadedCritical(true);
      }
    });

    // Preload medium priority après un délai
    const mediumTimer = setTimeout(() => {
      measurePerformance('medium-preload', () => {
        if (!hasPreloadedMedium) {
          preloadMedium();
          setHasPreloadedMedium(true);
        }
      });
    }, 2000);

    // Preload au hover/focus sur des éléments de navigation
    const handleUserInteraction = () => {
      if (!hasPreloadedMedium) {
        trackEvent('user_interaction_preload');
        measurePerformance('interaction-preload', () => {
          preloadMedium();
          setHasPreloadedMedium(true);
        });
      }
    };

    // Event listeners pour interactions utilisateur
    const navElements = document.querySelectorAll('nav a, button[aria-label*="section"]');
    navElements.forEach(el => {
      el.addEventListener('mouseenter', handleUserInteraction, { once: true });
      el.addEventListener('focus', handleUserInteraction, { once: true });
    });

    return () => {
      clearTimeout(mediumTimer);
      navElements.forEach(el => {
        el.removeEventListener('mouseenter', handleUserInteraction);
        el.removeEventListener('focus', handleUserInteraction);
      });
    };
  }, [preloadCritical, preloadMedium, hasPreloadedCritical, hasPreloadedMedium, measurePerformance, trackEvent]);

  // Debug pour vérifier que les refs sont correctement attachées (mode dev)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Page Home - Refs Status:', {
        hero: !!heroRef.current,
        domaines: !!domainesRef.current,
        services: !!servicesRef.current,
        tarifs: !!tarifsRef.current,
        cta: !!ctaRef.current,
        preloaded: { critical: hasPreloadedCritical, medium: hasPreloadedMedium }
      });
    }
  }, [hasPreloadedCritical, hasPreloadedMedium]);

  /**
   * Fonction pour gérer le défilement fluide vers les sections
   * Optimisée pour les performances avec analytics
   */
  const handleSmoothScroll = (targetId: string) => {
    // Track user interaction
    trackEvent('section_navigation', { target: targetId });
    
    // Utiliser requestAnimationFrame pour des performances optimales
    requestAnimationFrame(() => {
      measurePerformance(`scroll-to-${targetId}`, () => {
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Calculer la position de l'élément cible
          const targetPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = targetPosition + window.pageYOffset - 80; // 80px pour l'en-tête

          // Utiliser scrollTo avec behavior: 'smooth' pour un défilement fluide
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Mettre à jour l'URL sans recharger la page
          window.history.pushState(null, '', `#${targetId}`);
          
          // Précharger les composants si pas encore fait
          if (!hasPreloadedMedium) {
            preloadMedium();
            setHasPreloadedMedium(true);
          }
        }
      });
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Critique, chargement immédiat */}
      <LazyHeroSection 
        heroRef={heroRef} 
        handleSmoothScroll={handleSmoothScroll} 
      />

      {/* Domaines Section - Haute priorité avec lazy loading */}
      <LazySection
        rootMargin="200px"
        threshold={0.1}
        minHeight="500px"
        className="w-full"
      >
        <LazyDomainesSection ref={domainesRef} />
      </LazySection>

      {/* Services Section - Priorité moyenne avec lazy loading */}
      <LazySection
        rootMargin="150px"
        threshold={0.15}
        minHeight="600px"
        className="w-full"
      >
        <LazyServicesSection ref={servicesRef} />
      </LazySection>

      {/* Tarifs Section - Priorité moyenne avec lazy loading */}
      <LazySection
        rootMargin="100px"
        threshold={0.2}
        minHeight="500px"
        className="w-full"
      >
        <LazyTarifsSection ref={tarifsRef} />
      </LazySection>

      {/* CTA Section - Priorité basse avec lazy loading agressif */}
      <LazySection
        rootMargin="50px"
        threshold={0.25}
        minHeight="300px"
        className="w-full"
      >
        <LazyCTASection ref={ctaRef} />
      </LazySection>

      {/* Dev Tools uniquement en développement */}
      {process.env.NODE_ENV === 'development' && <LazyDevTools />}
    </div>
  );
}