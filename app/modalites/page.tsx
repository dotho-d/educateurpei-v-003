"use client";

import { useRef, useEffect, useState } from 'react';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreload } from '@/components/LazyComponents';
import LazySection from '@/components/ui/LazySection';
import { useAnalytics } from '@/hooks/useAnalytics';

// Import des composants lazy-loaded pour modalités
import {
  LazyHeroModalites,
  LazyProcessusSection,
  LazyAvantagesSection,
  LazyDomainesModalitesSection,
  LazyCTASection
} from '@/components/LazyComponents';

export default function ModalitesPage() {
  const { trackEvent, measurePerformance } = useAnalytics();
  
  // Références pour chaque section
  const processusRef = useRef<HTMLElement>(null);
  const advantagesRef = useRef<HTMLElement>(null);
  const domainesRef = useRef<HTMLElement>(null);
  
  // Hook pour le preloading intelligent
  const { preloadModalites } = usePreload();
  
  // État pour le preloading progressif
  const [hasPreloadedCritical, setHasPreloadedCritical] = useState(false);

  // Preloading intelligent
  useEffect(() => {
    measurePerformance('modalites-page-load', () => {
      trackEvent('page_view', { page: 'modalites' });
      
      if (!hasPreloadedCritical) {
        preloadModalites();
        setHasPreloadedCritical(true);
      }
    });
  }, [preloadModalites, hasPreloadedCritical, measurePerformance, trackEvent]);

  const handleSmoothScroll = (targetId: string) => {
    trackEvent('section_navigation', { target: targetId, page: 'modalites' });
    
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
      <LazyHeroModalites onScrollToSection={handleSmoothScroll} />

      {/* Processus Section - Haute priorité avec lazy loading */}
      <LazySection
        rootMargin="200px"
        threshold={0.1}
        minHeight="800px"
        className="w-full"
      >
        <LazyProcessusSection ref={processusRef} />
      </LazySection>

      {/* Avantages Section - Priorité moyenne avec lazy loading */}
      <LazySection
        rootMargin="150px"
        threshold={0.15}
        minHeight="600px"
        className="w-full"
      >
        <LazyAvantagesSection ref={advantagesRef} />
      </LazySection>

      {/* Domaines Section - Priorité basse avec lazy loading agressif */}
      <LazySection
        rootMargin="100px"
        threshold={0.2}
        minHeight="700px"
        className="w-full"
      >
        <LazyDomainesModalitesSection ref={domainesRef} />
      </LazySection>

      {/* CTA Section - Priorité basse */}
      <LazySection
        rootMargin="50px"
        threshold={0.25}
        minHeight="300px"
        className="w-full"
      >
        <section className="py-16 lg:py-20 section-bg-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12 shadow-xl text-center">
              <h2 className="heading-2 mb-4">
                Prêt à commencer votre accompagnement ?
              </h2>
              <p className="body-text text-muted-foreground max-w-2xl mx-auto mb-8">
                Rejoignez les centaines de personnes qui ont déjà bénéficié de notre accompagnement personnalisé
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  asChild 
                  className="rounded-full shadow-md"
                  onClick={() => trackEvent('main_cta_click', { action: 'start_now', page: 'modalites' })}
                >
                  <Link href="/contact">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="rounded-full border-2"
                  onClick={() => trackEvent('secondary_cta_click', { action: 'view_pricing', page: 'modalites' })}
                >
                  <Link href="/tarifs">
                    Voir les tarifs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </LazySection>
    </div>
  );
}