// hooks/useScrollLock.ts
import { useCallback } from 'react';

/**
 * Interface définissant la structure de l'objet retourné par le hook
 */
interface ScrollLockControls {
  lockScroll: () => void;
  unlockScroll: () => void;
}

/**
 * Hook personnalisé pour contrôler le verrouillage du défilement de la page
 * Utile pour les modales, popups, etc.
 * 
 * @returns Un objet contenant les méthodes pour verrouiller et déverrouiller le défilement
 */
export function useScrollLock(): ScrollLockControls {
  /**
   * Verrouille le défilement de la page
   */
  const lockScroll = useCallback((): void => {
    document.body.style.overflow = 'hidden';
  }, []);
  
  /**
   * Déverrouille le défilement de la page
   */
  const unlockScroll = useCallback((): void => {
    document.body.style.overflow = '';
  }, []);
  
  return { lockScroll, unlockScroll };
}

export default useScrollLock;