// components/ui/ticker.tsx - VERIFICATION DE L'IMPORT CSS
/**
 * ticker.tsx
 * Composant de bande défilante pour afficher des informations en continu
 * CORRIGÉ : Vérification du chemin d'import CSS Module
 */
import React from 'react';
import { cn } from '@/lib/utils';
// 🔧 VÉRIFIER : Le chemin d'import doit correspondre à la structure de fichiers
import styles from './styles/Ticker.module.css';

interface TickerItem {
  /**
   * Texte à afficher dans l'élément du ticker
   */
  text: string;
}

interface TickerProps {
  /**
   * Liste des éléments à afficher dans le ticker
   */
  items: TickerItem[];
  /**
   * Classe CSS supplémentaire à appliquer au conteneur
   */
  className?: string;
}

/**
 * Composant Ticker
 * Affiche une bande défilante horizontale avec des éléments répétés
 * Le positionnement à 92% est géré par le CSS Module (.tickerContainer)
 */
export default function Ticker({ items, className = '' }: TickerProps) {
  return (
    <div className={cn(styles.tickerContainer, className)}>
      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          {/* Premier ensemble d'éléments */}
          <div className={styles.tickerContent}>
            {items.map((item, index) => (
              <span key={`ticker-item-1-${index}`} className={styles.tickerItem}>
                ✦ {item.text}
              </span>
            ))}
          </div>

          {/* Deuxième ensemble (identique) pour assurer la continuité */}
          <div className={styles.tickerContent}>
            {items.map((item, index) => (
              <span key={`ticker-item-2-${index}`} className={styles.tickerItem}>
                ✦ {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}