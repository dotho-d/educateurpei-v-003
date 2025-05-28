/**
 * desktop-view.tsx - VERSION AVEC CONTRAINTES DE DÉBORDEMENT
 */
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SlideshowControls from './slideshow-controls';
import styles from './styles/DesktopView.module.css';

interface DesktopViewProps {
  currentIndex: number;
  slides: React.ReactNode[];
  slideTitles: string[];
  handlePrevious: () => void;
  handleNext: () => void;
  handleTabChange: (index: number) => void;
}

const DesktopView: React.FC<DesktopViewProps> = ({
  currentIndex,
  slides,
  slideTitles,
  handlePrevious,
  handleNext,
  handleTabChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // CSS pour optimiser l'affichage 3D ET empêcher le débordement
  const desktopCSS = `
    /* Container avec contraintes de débordement */
    .${styles.desktopContainer} {
      min-height: 580px !important;
      overflow: hidden !important;
      max-width: 100vw !important;
    }
    
    /* CORRECTION : Empêcher le débordement horizontal global */
    .${styles.desktopViewWrapper} {
      overflow-x: hidden !important;
      max-width: 100% !important;
    }
    
    .${styles.activeSlide} {
      background: linear-gradient(to bottom right, hsl(var(--background)), hsl(var(--primary) / 0.05));
      opacity: 1 !important;
    }
    
    .${styles.activeSlide} .${styles.slideContent} {
      padding: 10px;
      width: 100%;
      max-width: 100% !important;
      overflow: hidden !important;
    }
    
    /* FORCER l'affichage horizontal sur desktop */
    .${styles.slideContent} [class*="flex-col"][class*="lg:flex-row"] {
      display: flex !important;
      flex-direction: row !important;
      justify-content: space-between !important;
      align-items: flex-start !important;
    }
    
    .${styles.slideContent} [class*="lg:w-"][class*="48%"] {
      width: 48% !important;
      flex-shrink: 0 !important;
      margin-bottom: 0 !important;
    }
    
    .${styles.slideContent} [class*="lg:w-"][class*="42%"] {
      width: 42% !important;
      flex-shrink: 0 !important;
      display: block !important;
    }
    
    .${styles.slideContent} [class*="hidden"][class*="lg:block"] {
      display: block !important;
    }
    
    .${styles.slideContent} [class*="md:w-"] {
      width: auto !important;
    }
    
    .${styles.slideContent} [class*="md:flex-row"] {
      flex-direction: row !important;
    }
    
    .${styles.slideContainer} {
      padding: 15px;
      border-radius: 1rem;
      max-width: 100% !important;
      overflow: hidden !important;
    }
  `;

  return (
    <div className={styles.desktopViewWrapper}>
      <style dangerouslySetInnerHTML={{ __html: desktopCSS }} />
      
      <div ref={containerRef} className={styles.desktopContainer}>
        <div className={styles.perspectiveWrapper}>
          <div className={styles.carouselWrapper}>
            {slides.map((slide, index) => {
              const offset = ((index - currentIndex) % slides.length + slides.length) % slides.length;
              const adjustedOffset = offset > slides.length / 2 ? offset - slides.length : offset;
              
              const zIndex = 10 - Math.abs(adjustedOffset);
              const opacity = index === currentIndex ? 1 : Math.max(0.05, 0.25 - Math.abs(adjustedOffset) * 0.1);
              const scale = index === currentIndex ? 1 : 0.7;
              const rotateY = adjustedOffset * 12;
              
              // CORRECTION : Limiter translateX pour éviter le débordement
              const translateX = Math.max(-150, Math.min(150, adjustedOffset * 60)); // Limité à ±150%
              const translateZ = index === currentIndex ? 50 : -150;

              const isActive = index === currentIndex;

              return (
                <motion.div
                  key={`slide-${slideTitles[index] || `domain-${index}`}`}
                  className={styles.slideMotionContainer}
                  style={{
                    zIndex,
                    width: isActive ? "80%" : "45%",
                    transformStyle: "preserve-3d",
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    transformOrigin: adjustedOffset < 0 ? "right center" : "left center",
                    transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    // CORRECTION : Contraindre dans le viewport
                    maxWidth: isActive ? "80%" : "45%",
                  }}
                >
                  <div 
                    className={`${styles.slideContainer} ${isActive ? styles.activeSlide : styles.inactiveSlide}`}
                    style={{
                      padding: isActive ? "20px" : "15px",
                    }}
                  >
                    {isActive && (
                      <div className={styles.slideTitleWrapper}>
                        <h3 className={styles.slideTitle}>{slideTitles[index] || `Domaine ${index + 1}`}</h3>
                      </div>
                    )}
                    
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