/**
 * tablet-view.tsx
 * Vue tablette du slideshow pour les écrans entre 640px et 1024px
 * VERSION CORRIGÉE - CSS limité aux tablettes uniquement
 */

import { Accessibility, Users, Cannabis, FileText, Briefcase } from 'lucide-react';
import React from 'react';

import SlideshowControls from './slideshow-controls';
import styles from './styles/TabletView.module.css';

interface TabletViewProps {
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
 * Vue tablette du slideshow optimisée pour les écrans moyens
 */
const TabletView: React.FC<TabletViewProps> = ({
  currentIndex,
  slides,
  slideTitles,
  handlePrevious,
  handleNext,
  handleTabChange
}) => {
  // Icons correspondant à chaque domaine
  const slideIcons = [
    <Accessibility key="accessibility-icon" className={styles.slideIcon} />,
    <Users key="users-icon" className={styles.slideIcon} />,
    <Cannabis key="cannabis-icon" className={styles.slideIcon} />,
    <FileText key="filetext-icon" className={styles.slideIcon} />,
    <Briefcase key="briefcase-icon" className={styles.slideIcon} />
  ];

  // CSS pour forcer les largeurs à 100% des éléments du slide - LIMITÉ AUX TABLETTES UNIQUEMENT
  const tabletOnlyCSS = `
    /* IMPORTANT : Appliquer UNIQUEMENT sur les tablettes (640px à 1023px) */
    @media (min-width: 640px) and (max-width: 1023px) {
      .${styles.slideContent} [class*="md:w-"] {
        width: 100% !important;
        max-width: 100% !important;
      }
      .${styles.slideContent} [class*="md:flex-row"] {
        flex-direction: column !important;
      }
      .${styles.slideContent} .w-full.md\\:w-\\[48\\%\\] {
        width: 100% !important;
      }
      .${styles.slideContent} .w-full.md\\:w-\\[42\\%\\] {
        display: none !important;
      }
    }
  `;

  return (
    <div className={styles.tabletContainer}>
      {/* Injecter le CSS pour correction des largeurs - LIMITÉ AUX TABLETTES */}
      <style dangerouslySetInnerHTML={{ __html: tabletOnlyCSS }} />
      
      {/* Conteneur du slide actif avec padding et spacing améliorés */}
      <div className={styles.contentWrapper}>
        <div className={styles.cardContainer}>
          {/* Icône centrée au-dessus du titre */}
          <div className={styles.iconContainer}>
            {slideIcons[currentIndex]}
          </div>
          
          {/* Titre avec espacement optimisé */}
          <div className={styles.titleContainer}>
            <h3 className={styles.slideTitle}>{slideTitles[currentIndex] || `Domaine ${currentIndex + 1}`}</h3>
          </div>
          
          {/* Contenu du slide actif avec style adapté pour tablette */}
          <div className={styles.slideContentWrapper}>
            {React.cloneElement(slides[currentIndex] as React.ReactElement, {
              className: styles.slideContent
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
        size="medium"
      />
    </div>
  );
};

export default TabletView;