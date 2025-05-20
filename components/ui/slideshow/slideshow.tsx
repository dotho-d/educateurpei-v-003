/**
 * slideshow.tsx
 * Composant principal du slideshow qui gère l'état et détermine quelle vue afficher
 */
import React, { useState, useEffect } from "react";
import useBreakpoint from "@/hooks/useBreakpoint";
import MobileView from "./mobile-view";
import TabletView from "./tablet-view";
import DesktopView from "./desktop-view";
import styles from "./styles/Slideshow.module.css";

interface SlideshowProps {
  /**
   * Éléments enfants à afficher dans le slideshow (généralement des slides)
   */
  children: React.ReactNode[];
  /**
   * Indique si le défilement automatique est activé
   */
  autoPlay?: boolean;
  /**
   * Intervalle de temps entre chaque défilement (en ms)
   */
  interval?: number;
  /**
   * Titres des slides (optionnel)
   */
  slideTitles?: string[];
  /**
   * Classe CSS supplémentaire
   */
  className?: string;
}

/**
 * Composant Slideshow
 * Affiche un diaporama interactif avec différentes vues selon la taille d'écran
 */
export function Slideshow({ 
  children, 
  autoPlay = true, 
  interval = 24000,
  slideTitles: propSlideTitles,
  className
}: SlideshowProps) {
  // État pour suivre l'index de la slide active
  const [currentIndex, setCurrentIndex] = useState(0);
  // Utiliser le hook de breakpoint pour déterminer la taille d'écran
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  // Conversion des enfants en array
  const slides = Array.isArray(children) ? children : [children];
  
  // Titres par défaut si non fournis
  const defaultTitles = [
    "Handicap", 
    "Conflits familiaux et difficultés éducatives", 
    "Addictions", 
    "Accompagnement administratif et social", 
    "Insertion professionnelle"
  ];
  
  // Utiliser les titres fournis ou les titres par défaut
  const slideTitles = propSlideTitles || defaultTitles;

  // Effet pour gérer le défilement automatique
  useEffect(() => {
    if (!autoPlay) return;

    // Timer pour le défilement automatique
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    // Nettoyage du timer lors du démontage du composant
    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  /**
   * Navigue vers la slide précédente
   */
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  /**
   * Navigue vers la slide suivante
   */
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  /**
   * Gère le changement d'onglet en définissant l'index actuel
   * @param index Nouvel index à définir
   */
  const handleTabChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`${styles.slideshowContainer} ${className || ''} ClientSlideshow`}>
      {/* Afficher la vue correspondant à la taille d'écran */}
      {isMobile && (
        <MobileView
          currentIndex={currentIndex}
          slides={slides}
          slideTitles={slideTitles}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleTabChange={handleTabChange}
        />
      )}
      
      {isTablet && (
        <TabletView
          currentIndex={currentIndex}
          slides={slides}
          slideTitles={slideTitles}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleTabChange={handleTabChange}
        />
      )}
      
      {isDesktop && (
        <DesktopView
          currentIndex={currentIndex}
          slides={slides}
          slideTitles={slideTitles}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleTabChange={handleTabChange}
        />
      )}
    </div>
  );
}

export default Slideshow;