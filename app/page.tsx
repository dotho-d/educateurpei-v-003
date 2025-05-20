/**
 * page.tsx (home page)
 * Page d'accueil principale de l'application
 * Contient les sections: hero, domaines d'intervention, services, tarifs et CTA
 */
"use client";

import { useRef } from 'react';
import Header from "@/components/layout/header";
import HeroSection from "@/components/home/hero-section";
import DomainesSection from "@/components/home/domaines-section/domaines-section";
import ServicesSection from "@/components/home/services-section/services-section";
import TarifsSection from "@/components/home/tarifs-section/tarifs-section";
import CTASection from '@/components/home/cta-section/cta-section';

/**
 * Page d'accueil
 * Affiche le site principal avec toutes les sections
 */
export default function Home() {
  // Référence à la section hero pour pouvoir y accéder depuis d'autres composants
  const heroRef = useRef(null);

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

      <DomainesSection />

      <ServicesSection />

      <TarifsSection />

      <CTASection />

    </div>
  );
}