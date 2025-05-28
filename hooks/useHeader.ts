/**
 * hooks/useHeader.ts
 * Hook optimisé pour la gestion de l'état du header avec performance améliorée
 */

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState, useMemo } from 'react';

import { throttle } from '@/lib/utils';

interface HeaderState {
  isScrolled: boolean;
  isMenuOpen: boolean;
  currentSection: string;
}

interface UseHeaderReturn extends HeaderState {
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  scrollToSection: (sectionId: string) => void;
}

export function useHeader(): UseHeaderReturn {
  const router = useRouter();
  
  // État consolidé pour éviter les re-renders multiples
  const [state, setState] = useState<HeaderState>({
    isScrolled: false,
    isMenuOpen: false,
    currentSection: ''
  });

  // Throttled scroll handler optimisé avec cleanup
  const handleScroll = useMemo(
    () => throttle(() => {
      const scrolled = window.scrollY > 10;
      setState(prev => {
        // Éviter re-render si état identique
        if (prev.isScrolled === scrolled) return prev;
        return { ...prev, isScrolled: scrolled };
      });
    }, 100),
    []
  );

  // Gestion optimisée du hash change
  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.substring(1);
    setState(prev => {
      // Éviter re-render si section identique
      if (prev.currentSection === hash) return prev;
      return { ...prev, currentSection: hash };
    });
  }, []);

  // Effect optimisé pour scroll avec cleanup approprié
  useEffect(() => {
    // État initial
    handleScroll();
    handleHashChange();
    
    // Event listeners avec options de performance
    window.addEventListener('scroll', handleScroll, { 
      passive: true, 
      capture: false 
    });
    window.addEventListener('hashchange', handleHashChange, { 
      passive: true 
    });

    return () => {
      // Cleanup avec la même référence de fonction
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleScroll, handleHashChange]);

  // Gestion du scroll lock pour le menu mobile
  useEffect(() => {
    if (state.isMenuOpen) {
      // Sauvegarder la position de scroll actuelle
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restaurer la position de scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup au démontage
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [state.isMenuOpen]);

  // Actions memoized pour éviter re-renders des composants enfants
  const openMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: true }));
  }, []);

  const closeMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: false }));
  }, []);

  const toggleMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  }, []);

  // Fonction de scroll optimisée avec requestAnimationFrame
  const scrollToSection = useCallback((sectionId: string) => {
    // Fermer le menu immédiatement pour un feedback rapide
    setState(prev => ({ ...prev, isMenuOpen: false }));

    // Utiliser requestAnimationFrame pour optimiser les performances
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      // Calculer la position avec offset pour le header fixe
      const elementRect = element.getBoundingClientRect();
      const offsetPosition = elementRect.top + window.pageYOffset - 80;
      
      // Scroll smooth optimisé
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Mettre à jour l'URL sans rechargement
      router.push(`#${sectionId}`, { scroll: false });

      // Accessibility: focus sur la section pour screen readers
      element.tabIndex = -1;
      element.focus({ preventScroll: true });
      
      // Nettoyer le tabIndex après un délai
      setTimeout(() => {
        element.removeAttribute('tabindex');
      }, 1000);
    });
  }, [router]);

  // Retourner l'état et les actions memoized
  return useMemo(() => ({
    ...state,
    openMenu,
    closeMenu,
    toggleMenu,
    scrollToSection
  }), [state, openMenu, closeMenu, toggleMenu, scrollToSection]);
}