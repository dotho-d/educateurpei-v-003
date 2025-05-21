/**
 * error-image.tsx
 * Composant Image de Next.js avec gestion d'erreur intégrée
 */

'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ErrorImageProps extends Omit<ImageProps, 'onError'> {
  /** Image de secours à afficher en cas d'erreur */
  fallbackSrc?: string;
  /** Texte alternatif pour l'image de secours */
  fallbackAlt?: string;
  /** Fonction de rappel personnalisée exécutée en cas d'erreur */
  onImageError?: (error: Error) => void;
}

/**
 * Composant ErrorImage
 * Étend le composant Image de Next.js avec une gestion d'erreur améliorée
 */
export default function ErrorImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg', // Chemin vers votre image de secours
  fallbackAlt,
  onImageError,
  ...props
}: ErrorImageProps) {
  const [error, setError] = useState<boolean>(false);
  const [errorCount, setErrorCount] = useState<number>(0);

  const handleError = (err: any) => {
    // Limiter les tentatives de chargement à 2 pour éviter les boucles infinies
    if (errorCount >= 2) {
      return;
    }

    // Incrémenter le compteur d'erreurs
    setErrorCount(prev => prev + 1);
    
    // Logger l'erreur en développement
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur de chargement d\'image:', err, src);
    }
    
    // Appeler le callback personnalisé si fourni
    if (onImageError) {
      onImageError(err);
    }
    
    // Définir l'état d'erreur pour utiliser l'image de secours
    setError(true);
  };

  // Si une erreur s'est produite et qu'une image de secours est fournie
  if (error && fallbackSrc) {
    return (
      <Image
        src={fallbackSrc}
        alt={fallbackAlt || `Image de secours pour: ${alt}`}
        {...props}
      />
    );
  }

  // Rendu normal de l'image avec gestionnaire d'erreur
  return (
    <Image
      src={src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}