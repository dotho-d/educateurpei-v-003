/**
 * useBreakpoint.ts
 * Hook personnalisé pour détecter et suivre le breakpoint actuel du viewport
 */
import { useState, useEffect } from 'react';

// Définition des breakpoints (alignés avec Tailwind CSS)
export const breakpoints = {
  xs: 0,      // Extra small devices
  sm: 640,    // Small devices
  md: 768,    // Medium devices
  lg: 1024,   // Large devices
  xl: 1280,   // Extra large devices
  '2xl': 1536 // 2X Extra large devices
};

// Type pour le nom du breakpoint
export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Hook qui détecte le breakpoint actuel et fournit des informations utiles
 * @returns Un objet contenant le breakpoint actuel et des booléens pour chaque taille
 */
export function useBreakpoint() {
  // Initialiser à null pour éviter une incompatibilité avec le rendu côté serveur
  const [breakpoint, setBreakpoint] = useState<BreakpointName | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // Fonction pour mettre à jour le breakpoint en fonction de la largeur
    const calcBreakpoint = (width: number): BreakpointName => {
      if (width < breakpoints.sm) return 'xs';
      if (width < breakpoints.md) return 'sm';
      if (width < breakpoints.lg) return 'md';
      if (width < breakpoints.xl) return 'lg';
      if (width < breakpoints['2xl']) return 'xl';
      return '2xl';
    };

    // Fonction pour gérer le redimensionnement
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setWidth(windowWidth);
      setBreakpoint(calcBreakpoint(windowWidth));
    };

    // Appel initial pour définir le breakpoint
    handleResize();

    // Ajouter un écouteur pour le redimensionnement avec throttling
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledResize);
    
    // Nettoyage lors du démontage
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Calculer des booléens utiles pour chaque breakpoint
  const isXs = breakpoint === 'xs';
  const isSm = breakpoint === 'sm';
  const isMd = breakpoint === 'md';
  const isLg = breakpoint === 'lg';
  const isXl = breakpoint === 'xl';
  const is2Xl = breakpoint === '2xl';
  
  // Booléens supplémentaires pour des plages de tailles
  const isMobile = isXs || isSm;
  const isTablet = isMd;
  const isDesktop = isLg || isXl || is2Xl;
  const isSmallScreen = isXs || isSm || isMd;
  const isLargeScreen = isLg || isXl || is2Xl;

  return {
    breakpoint,
    width,
    // Breakpoints individuels
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    // Groupes de breakpoints
    isMobile,  // xs, sm (< 768px)
    isTablet,  // md (768px - 1023px)
    isDesktop, // lg, xl, 2xl (>= 1024px)
    isSmallScreen, // xs, sm, md (< 1024px)
    isLargeScreen  // lg, xl, 2xl (>= 1024px)
  };
}

export default useBreakpoint;