"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from 'react';

import { usePreload } from '@/components/LazyComponents';
// Import des composants lazy-loaded pour tarifs
import {
  LazyHeroTarifs,
  LazyGrilleTarifs,
  LazySimulateurCout,
  LazyCalculateurDeplacement,
  LazyPourquoiTarifsSection
} from '@/components/LazyComponents';
import { Button } from "@/components/ui/button";
import LazySection from '@/components/ui/LazySection';
import { useAnalytics } from '@/hooks/useAnalytics';


export default function TarifsPage() {
  const { trackEvent, measurePerformance } = useAnalytics();
  
  // Références pour chaque section
  const grilleRef = useRef<HTMLElement>(null);
  const simulateurRef = useRef<HTMLElement>(null);
  const calculateurRef = useRef<HTMLElement>(null);
  const pourquoiRef = useRef<HTMLElement>(null);
  
  // Hook pour le preloading intelligent
  const { preloadTarifs } = usePreload();
  
  // État pour le preloading progressif
  const [hasPreloadedCritical, setHasPreloadedCritical] = useState(false);

  // Preloading intelligent
  useEffect(() => {
    measurePerformance('tarifs-page-load', () => {
      trackEvent('page_view', { page: 'tarifs' });
      
      if (!hasPreloadedCritical) {
        preloadTarifs();
        setHasPreloadedCritical(true);
      }
    });
  }, [preloadTarifs, hasPreloadedCritical, measurePerformance, trackEvent]);

  const handleSmoothScroll = (targetId: string) => {
    trackEvent('section_navigation', { target: targetId, page: 'tarifs' });
    
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
        }
      });
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Critique, chargement immédiat */}
      <LazyHeroTarifs onScrollToSection={handleSmoothScroll} />

      {/* Grille Tarifaire - Haute priorité avec lazy loading */}
      <LazySection
        rootMargin="200px"
        threshold={0.1}
        minHeight="800px"
        className="w-full"
      >
        <LazyGrilleTarifs ref={grilleRef} />
      </LazySection>

      {/* Simulateur - Priorité moyenne avec lazy loading */}
      <LazySection
        rootMargin="150px"
        threshold={0.15}
        minHeight="600px"
        className="w-full"
      >
        <LazySimulateurCout ref={simulateurRef} />
      </LazySection>

      {/* Calculateur déplacement - Priorité basse avec lazy loading */}
      <LazySection
        rootMargin="100px"
        threshold={0.2}
        minHeight="500px"
        className="w-full"
      >
        <LazyCalculateurDeplacement ref={calculateurRef} />
      </LazySection>

      {/* Pourquoi ces tarifs - Priorité basse avec lazy loading */}
      <LazySection
        rootMargin="50px"
        threshold={0.25}
        minHeight="600px"
        className="w-full"
      >
        <LazyPourquoiTarifsSection ref={pourquoiRef} />
      </LazySection>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 section-bg-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12 shadow-xl text-center">
            <h2 className="heading-2 mb-4">
              Prêt à commencer votre accompagnement ?
            </h2>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto mb-8">
              Prenez rendez-vous pour votre premier entretien de rencontre à seulement 15€
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                asChild 
                className="rounded-full shadow-md"
                onClick={() => trackEvent('main_cta_click', { action: 'book_consultation', page: 'tarifs' })}
              >
                <Link href="/contact">
                  Réserver mon entretien
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="rounded-full border-2"
                onClick={() => trackEvent('secondary_cta_click', { action: 'view_process', page: 'tarifs' })}
              >
                <Link href="/modalites">
                  Comment ça marche ?
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}