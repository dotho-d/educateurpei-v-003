/**
 * ticker.tsx
 * Composant de bande défilante pour afficher des informations en continu
 */
import React from 'react';
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
 */
export default function Ticker({ items, className = '' }: TickerProps) {
  return (
    <div className={`absolute w-full sm:pb-0 ${className}`} style={{ top: "92%" }}>
      <div className="ticker-wrap overflow-hidden bg-gradient-to-r from-primary/10 to-primary/10 py-3 sm:py-3 md:py-4">
        <div className="ticker flex">
          {/* Premier ensemble d'éléments */}
          <div className="ticker-content flex whitespace-nowrap">
            {items.map((item, index) => (
              <span key={`ticker-item-1-${index}`} className="ticker-item flex-shrink-0 px-4 sm:px-8 text-sm sm:text-base">
                ✦ {item.text}
              </span>
            ))}
          </div>

          {/* Deuxième ensemble (identique) pour assurer la continuité */}
          <div className="ticker-content flex whitespace-nowrap">
            {items.map((item, index) => (
              <span key={`ticker-item-2-${index}`} className="ticker-item flex-shrink-0 px-4 sm:px-8 text-sm sm:text-base">
                ✦ {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}