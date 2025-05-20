/**
 * slide-content.tsx
 * Contenu d'un slide pour la section domaines d'intervention
 */
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import styles from './styles/SlideContent.module.css';

interface SlideContentProps {
  /**
   * Description du domaine d'intervention
   */
  description: string;
  /**
   * Liste des points clés du domaine
   */
  points: string[];
  /**
   * URL du lien "En savoir plus"
   */
  linkUrl: string;
  /**
   * Texte du lien "En savoir plus"
   */
  linkText: string;
  /**
   * Classe CSS supplémentaire
   */
  className?: string;
}

/**
 * Composant de contenu pour un slide de domaine d'intervention
 */
const SlideContent: React.FC<SlideContentProps> = ({
  description,
  points,
  linkUrl,
  linkText,
  className
}) => {
  return (
    <div className={`${styles.slideContent} ${className || ''}`}>
      <div className={styles.flexContainer}>
        {/* Contenu textuel */}
        <div className={styles.textContent}>
          <p className={styles.description} data-slideshow-text="description">
            {description}
          </p>
          
          <ul className={styles.pointsList}>
            {points.map((point, index) => (
              <li key={`point-${index}`} className={styles.pointItem}>
                {point}
              </li>
            ))}
          </ul>
          
          <div className="flex justify-center lg:justify-center">
            <Button variant="outline" asChild className={styles.actionButton}>
              <Link href={linkUrl}>
                {linkText}
              </Link>
            </Button>
          </div>
        </div>

        {/* Image placeholder - sera masquée en mobile/tablette */}
        <div className={styles.imageContainer}>
          <div className={styles.imagePlaceholder}>
            <div className={styles.placeholderContent}>
              <p className={styles.placeholderText}>Contenu illustratif</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;