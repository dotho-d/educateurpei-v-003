/**
 * slideshow-controls.tsx
 * Composant pour les contrôles de navigation du slideshow
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import styles from './styles/Controls.module.css';

interface SlideshowControlsProps {
  /**
   * Nombre total de slides
   */
  totalSlides: number;
  /**
   * Index du slide actuel (basé sur 0)
   */
  currentIndex: number;
  /**
   * Fonction pour naviguer au slide précédent
   */
  handlePrevious: () => void;
  /**
   * Fonction pour naviguer au slide suivant
   */
  handleNext: () => void;
  /**
   * Fonction pour naviguer à un slide spécifique
   */
  handleTabChange: (index: number) => void;
  /**
   * Taille des boutons de navigation (small, medium, large)
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Composant pour les contrôles du slideshow (navigation et pagination)
 */
const SlideshowControls: React.FC<SlideshowControlsProps> = ({
  totalSlides,
  currentIndex,
  handlePrevious,
  handleNext,
  handleTabChange,
  size = 'medium'
}) => {
  // Détermine les tailles des éléments d'UI en fonction du paramètre size
  const getButtonSize = () => {
    switch (size) {
      case 'small': return styles.buttonSmall;
      case 'large': return styles.buttonLarge;
      default: return styles.buttonMedium;
    }
  };

  const getIndicatorSize = (isActive: boolean) => {
    if (isActive) {
      switch (size) {
        case 'small': return styles.indicatorActiveSmall;
        case 'large': return styles.indicatorActiveLarge;
        default: return styles.indicatorActiveMedium;
      }
    } else {
      switch (size) {
        case 'small': return styles.indicatorSmall;
        case 'large': return styles.indicatorLarge;
        default: return styles.indicatorMedium;
      }
    }
  };

  return (
    <div className={styles.controlsContainer}>
      {/* Bouton précédent - SIMPLIFIÉ */}
      <button
        onClick={handlePrevious}
        className={`${styles.navigationButton} ${getButtonSize()}`}
        aria-label="Domaine d'intervention précédent"
      >
        <div className={styles.navigationIconWrapper}>
          <ChevronLeft className={styles.navigationIcon} />
        </div>
      </button>

      {/* Indicateurs de pagination */}
      <div className={styles.paginationContainer}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={`pagination-${index}`}
            onClick={() => handleTabChange(index)}
            className={styles.paginationButton}
            aria-label={`Voir le domaine ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          >
            <div
              className={`${styles.indicator} ${getIndicatorSize(index === currentIndex)}`}
            />
          </button>
        ))}
      </div>

      {/* Bouton suivant - SIMPLIFIÉ */}
      <button
        onClick={handleNext}
        className={`${styles.navigationButton} ${getButtonSize()}`}
        aria-label="Domaine d'intervention suivant"
      >
        <div className={styles.navigationIconWrapper}>
          <ChevronRight className={styles.navigationIcon} />
        </div>
      </button>
    </div>
  );
};

export default SlideshowControls;