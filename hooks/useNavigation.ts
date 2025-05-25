/**
 * hooks/useNavigation.ts
 * Hook personnalisé pour gérer la navigation et l'état du header
 * Suit les bonnes pratiques React et Next.js
 */
'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationState {
  isMenuOpen: boolean;
  isScrolled: boolean;
  currentSection: string;
}

export function useNavigation() {
  const router = useRouter();
  
  const [state, setState] = useState<NavigationState>({
    isMenuOpen: false,
    isScrolled: false,
    currentSection: '',
  });

  // Détection du scroll avec throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setState(prev => ({
          ...prev,
          isScrolled: window.scrollY > 10
        }));
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Détection du hash avec nettoyage
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    setState(prev => ({ ...prev, currentSection: hash }));
    
    const handleHashChange = () => {
      setState(prev => ({ 
        ...prev, 
        currentSection: window.location.hash.substring(1) 
      }));
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top;
      const offsetPosition = targetPosition + window.pageYOffset - 80;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      router.push(`#${sectionId}`, { scroll: false });
      setState(prev => ({ 
        ...prev, 
        currentSection: sectionId,
        isMenuOpen: false 
      }));

      // Accessibilité : focus sur la section
      element.tabIndex = -1;
      element.focus({ preventScroll: true });
      setTimeout(() => {
        element.removeAttribute('tabIndex');
      }, 1000);
    }
  }, [router]);

  const toggleMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  }, []);

  const closeMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: false }));
  }, []);

  return {
    ...state,
    scrollToSection,
    toggleMenu,
    closeMenu
  };
}