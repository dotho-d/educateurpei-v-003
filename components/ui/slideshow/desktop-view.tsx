/**
 * desktop-view.tsx
 * Vue desktop du slideshow avec effet 3D pour les écrans > 1024px
 */
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SlideshowControls from './slideshow-controls';
import styles from './styles/DesktopView.module.css';

interface DesktopViewProps {
  /**
   * Index du slide actif
   */
  currentIndex: number;
  /**
   * Liste des slides à afficher
   */
  slides: React.ReactNode[];
  /**
   * Liste des titres des slides
   */
  slideTitles: string[];
  /**
   * Fonction pour aller au slide précédent
   */
  handlePrevious: () => void;
  /**
   * Fonction pour aller au slide suivant
   */
  handleNext: () => void;
  /**
   * Fonction pour aller à un slide spécifique
   */
  handleTabChange: (index: number) => void;
}

/**
 * Vue desktop du slideshow avec effet 3D pour les grands écrans
 */
const DesktopView: React.FC<DesktopViewProps> = ({
  currentIndex,
  slides,
  slideTitles,
  handlePrevious,
  handleNext,
  handleTabChange
}) => {
  // Référence au conteneur pour les calculs de perspective
  const containerRef = useRef<HTMLDivElement>(null);

  // CSS pour optimiser l'affichage 3D sur grands écrans
  const desktopCSS = `
    /* Agrandir le container parent pour contenir tout le contenu */
    .${styles.desktopContainer} {
      min-height: 580px !important;
    }
    
    /* Assurer que le slide actif est opaque et a le bon fond */
    .${styles.activeSlide} {
      background: linear-gradient(to bottom right, hsl(var(--background)), hsl(var(--primary) / 0.05));
      opacity: 1 !important;
    }
    
    /* Styles pour assurer que le contenu est bien formaté */
    .${styles.activeSlide} .${styles.slideContent} {
      padding: 10px;
      width: 100%;
    }
    
    /* Styles pour tous les slides */
    .${styles.slideContainer} {
      padding: 15px;
      border-radius: 1rem;
    }
  `;

  return (
    <div className={styles.desktopViewWrapper}>
      {/* Injecter le CSS pour les grands écrans */}
      <style dangerouslySetInnerHTML={{ __html: desktopCSS }} />
      
      {/* Conteneur de slides avec effet 3D */}
      <div
        ref={containerRef}
        className={styles.desktopContainer}
      >
        <div className={styles.perspectiveWrapper}>
          <div className={styles.carouselWrapper}>
            {slides.map((slide, index) => {
              // Calcul de la position relative à la slide actuelle
              const offset = ((index - currentIndex) % slides.length + slides.length) % slides.length;
              const adjustedOffset = offset > slides.length / 2 ? offset - slides.length : offset;
              
              // Calcul des propriétés de transformation
              const zIndex = 10 - Math.abs(adjustedOffset);
              const opacity = index === currentIndex ? 1 : Math.max(0.05, 0.25 - Math.abs(adjustedOffset) * 0.1);
              const scale = index === currentIndex ? 1 : 0.7;
              const rotateY = adjustedOffset * 12;
              const translateX = adjustedOffset * 80;
              const translateZ = index === currentIndex ? 50 : -150;

              // Déterminer si c'est le slide actif
              const isActive = index === currentIndex;

              return (
                <motion.div
                  key={`slide-${slideTitles[index] || `domain-${index}`}`}
                  className={styles.slideMotionContainer}
                  style={{
                    zIndex,
                    width: isActive ? "80%" : "45%", // Augmenté pour le slide actif
                    transformStyle: "preserve-3d",
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    transformOrigin: adjustedOffset < 0 ? "right center" : "left center",
                    transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  }}
                >
                  {/* Contenu de la slide avec arrière-plan */}
                  <div 
                    className={`${styles.slideContainer} ${isActive ? styles.activeSlide : styles.inactiveSlide}`}
                    style={{
                      padding: isActive ? "20px" : "15px", // Plus de padding pour le slide actif
                    }}
                  >
                    {/* Affichage des titres uniquement pour la slide active en desktop */}
                    {isActive && (
                      <div className={styles.slideTitleWrapper}>
                        <h3 className={styles.slideTitle}>{slideTitles[index] || `Domaine ${index + 1}`}</h3>
                      </div>
                    )}
                    
                    {/* Contenu de la slide */}
                    <div className={isActive ? styles.slideContent : ""}>
                      {isActive 
                        ? React.cloneElement(slide as React.ReactElement, {
                            style: { 
                              width: '100%', 
                              height: 'auto'
                            }
                          })
                        : slide
                      }
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contrôles de navigation */}
      <SlideshowControls
        totalSlides={slides.length}
        currentIndex={currentIndex}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleTabChange={handleTabChange}
        size="large"
      />
    </div>
  );
};

export default DesktopView;