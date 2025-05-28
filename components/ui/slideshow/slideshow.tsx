/**
 * slideshow.tsx - VERSION AVEC HYDRATION SAFE
 */

import React, { useState, useEffect } from "react";

import useBreakpoint from "@/hooks/useBreakpoint";

import DesktopView from "./desktop-view";
import MobileView from "./mobile-view";
import styles from "./styles/Slideshow.module.css";
import TabletView from "./tablet-view";

export function Slideshow({ 
  children, 
  autoPlay = true, 
  interval = 24000,
  slideTitles: propSlideTitles,
  className
}: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false); // ← AJOUT
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  // ← AJOUT : Attendre l'hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const slides = Array.isArray(children) ? children : [children];
  
  const defaultTitles = [
    "Handicap", 
    "Conflits familiaux et difficultés éducatives", 
    "Addictions", 
    "Accompagnement administratif et social", 
    "Insertion professionnelle"
  ];
  
  const slideTitles = propSlideTitles || defaultTitles;

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleTabChange = (index: number) => {
    setCurrentIndex(index);
  };

  // ← AJOUT : Afficher un placeholder pendant l'hydration
  if (!mounted) {
    return (
      <div className={`${styles.slideshowContainer} ${className || ''}`}>
        <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.slideshowContainer} ${className || ''} ClientSlideshow`}>
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