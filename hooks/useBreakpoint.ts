/**
 * useBreakpoint.ts
 * Hook optimisé pour détecter et suivre le breakpoint avec debouncing et performance améliorée
 */
import { useState, useEffect, useCallback, useMemo } from 'react';

// Définition des breakpoints (alignés avec Tailwind CSS)
export const breakpoints = {
  xs: 0,      // Extra small devices
  sm: 640,    // Small devices
  md: 768,    // Medium devices
  lg: 1024,   // Large devices
  xl: 1280,   // Extra large devices
  '2xl': 1536 // 2X Extra large devices
} as const;

// Type pour le nom du breakpoint
export type BreakpointName = keyof typeof breakpoints;

interface BreakpointState {
  breakpoint: BreakpointName | null;
  width: number | null;
}

interface UseBreakpointReturn extends BreakpointState {
  // Breakpoints individuels
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
  // Groupes de breakpoints
  isMobile: boolean;  // xs, sm (< 768px)
  isTablet: boolean;  // md (768px - 1023px)
  isDesktop: boolean; // lg, xl, 2xl (>= 1024px)
  isSmallScreen: boolean; // xs, sm, md (< 1024px)
  isLargeScreen: boolean;  // lg, xl, 2xl (>= 1024px)
}

/**
 * Debounce utility optimisée pour resize events
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook qui détecte le breakpoint actuel et fournit des informations optimisées
 */
export function useBreakpoint(): UseBreakpointReturn {
  // État consolidé pour éviter les re-renders multiples
  const [state, setState] = useState<BreakpointState>({
    breakpoint: null,
    width: null
  });

  // Fonction pour calculer le breakpoint en fonction de la largeur
  const calcBreakpoint = useCallback((width: number): BreakpointName => {
    if (width < breakpoints.sm) return 'xs';
    if (width < breakpoints.md) return 'sm';
    if (width < breakpoints.lg) return 'md';
    if (width < breakpoints.xl) return 'lg';
    if (width < breakpoints['2xl']) return 'xl';
    return '2xl';
  }, []);

  // Handler optimisé pour le redimensionnement
  const handleResize = useCallback(() => {
    const windowWidth = window.innerWidth;
    const newBreakpoint = calcBreakpoint(windowWidth);
    
    setState(prev => {
      // Éviter re-render si breakpoint et width identiques
      if (prev.breakpoint === newBreakpoint && prev.width === windowWidth) {
        return prev;
      }
      return {
        breakpoint: newBreakpoint,
        width: windowWidth
      };
    });
  }, [calcBreakpoint]);

  // Debounced resize handler pour éviter trop de re-renders
  const debouncedWidth = useDebounce(state.width, 150);

  useEffect(() => {
    // Appel initial pour définir le breakpoint
    handleResize();

    // Event listener optimisé avec throttling intégré
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    // Options d'écoute optimisées
    window.addEventListener('resize', throttledResize, { 
      passive: true 
    });
    
    // Nettoyage lors du démontage
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleResize]);

  // Calculer des booléens utiles memoized pour chaque breakpoint
  const breakpointBooleans = useMemo(() => {
    const { breakpoint } = state;
    
    if (!breakpoint) {
      return {
        isXs: false,
        isSm: false,
        isMd: false,
        isLg: false,
        isXl: false,
        is2Xl: false,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isSmallScreen: false,
        isLargeScreen: false
      };
    }

    const isXs = breakpoint === 'xs';
    const isSm = breakpoint === 'sm';
    const isMd = breakpoint === 'md';
    const isLg = breakpoint === 'lg';
    const isXl = breakpoint === 'xl';
    const is2Xl = breakpoint === '2xl';
    
    return {
      isXs,
      isSm,
      isMd,
      isLg,
      isXl,
      is2Xl,
      // Groupes de breakpoints optimisés
      isMobile: isXs || isSm,
      isTablet: isMd,
      isDesktop: isLg || isXl || is2Xl,
      isSmallScreen: isXs || isSm || isMd,
      isLargeScreen: isLg || isXl || is2Xl
    };
  }, [state.breakpoint]);

  // Retourner l'état combiné memoized
  return useMemo(() => ({
    ...state,
    ...breakpointBooleans
  }), [state, breakpointBooleans]);
}

export default useBreakpoint;