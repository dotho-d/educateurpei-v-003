/**
 * mobile-view.tsx
 * Vue mobile du slideshow pour les écrans < 640px
 */
import React from 'react';
import { Accessibility, Users, Cannabis, FileText, Briefcase } from 'lucide-react';
import SlideshowControls from './slideshow-controls';
import styles from './styles/MobileView.module.css';

interface MobileViewProps {
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
 * Vue mobile du slideshow optimisée pour les petits écrans
 */
const MobileView: React.FC<MobileViewProps> = ({
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

  return (
    <div className={styles.mobileContainer}>
      {/* Conteneur principal du contenu */}
      <div className={styles.contentWrapper}>
        {/* Card avec gradient */}
        <div className={styles.cardContainer}>
          {/* Icône centrée au-dessus du titre */}
          <div className={styles.iconContainer}>
            {slideIcons[currentIndex]}
          </div>
          
          {/* Titre centré */}
          <div className={styles.titleContainer}>
            <h3 className={styles.slideTitle}>{slideTitles[currentIndex] || `Domaine ${currentIndex + 1}`}</h3>
          </div>
          
          {/* Contenu du slide actif avec style adapté pour mobile */}
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
        size="small"
      />
    </div>
  );
};

export default MobileView;