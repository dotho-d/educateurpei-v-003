/**
 * page.tsx (home page)
 * Page d'accueil principale de l'application
 * Contient les sections: hero, domaines d'intervention, services, tarifs et CTA
 */
"use client";

import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';

import HeroSection from "@/components/home/hero-section";
import Header from "@/components/layout/header";

// Import dynamique pour les sections chargées paresseusement
const DomainesSection = dynamic(() => import("@/components/home/domaines-section/domaines-section"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-muted/30 rounded-lg"></div>,
  ssr: true
});

const ServicesSection = dynamic(() => import("@/components/home/services-section/services-section"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-muted/30 rounded-lg"></div>,
  ssr: true
});

const TarifsSection = dynamic(() => import("@/components/home/tarifs-section/tarifs-section"), {
  loading: () => <div className="min-h-[300px] animate-pulse bg-muted/30 rounded-lg"></div>,
  ssr: true
});

const CTASection = dynamic(() => import('@/components/home/cta-section/cta-section'), {
  loading: () => <div className="min-h-[200px] animate-pulse bg-muted/30 rounded-lg"></div>,
  ssr: true
});

// Import de l'outil de développement uniquement en mode développement
const DevTools = process.env.NODE_ENV === 'development' 
  ? dynamic(() => import('@/dev-tools/HeroAdjuster'), { ssr: false })
  : () => null;

/**
 * Page d'accueil
 * Affiche le site principal avec toutes les sections
 * Utilise des imports dynamiques pour optimiser le chargement initial
 */
export default function Home() {
  // Références pour chaque section
  const heroRef = useRef<HTMLElement>(null);
  const domainesRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const tarifsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  
  // Debug pour vérifier que les refs sont correctement attachées (mode dev)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Hero ref:', heroRef.current);
      console.log('Domaines ref:', domainesRef.current);
      console.log('Services ref:', servicesRef.current);
      console.log('Tarifs ref:', tarifsRef.current);
      console.log('CTA ref:', ctaRef.current);
    }
  }, []);

  /**
   * Fonction pour gérer le défilement fluide vers les sections
   * @param targetId ID de la section cible
   */
  const handleSmoothScroll = (targetId: string) => {
    // Sélectionner l'élément cible
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
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Header />

      <HeroSection 
        heroRef={heroRef} 
        handleSmoothScroll={handleSmoothScroll} 
      />

      {/* Sections chargées dynamiquement sans conditionnement sur la visibilité */}
      <DomainesSection ref={domainesRef} />
      <ServicesSection ref={servicesRef} />
      <TarifsSection ref={tarifsRef} />
      <CTASection ref={ctaRef} />

    </div>
  );
}