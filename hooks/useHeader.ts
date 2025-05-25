/**
 * hooks/useHeader.ts
 * Hook principal pour la gestion de l'état du header
 */
import { useCallback, useEffect } from 'react'; // ✅ Ajout de useEffect
import { useRouter } from 'next/navigation';
import { useScrollState } from './useScrollState';
import { useDisclosure } from './useDisclosure';
import { useCurrentSection } from './useCurrentSection';
import { useScrollLock } from './useScrollLock';

export function useHeader() {
  const { isScrolled } = useScrollState({ threshold: 10, throttle: 100 });
  const { isOpen: isMenuOpen, open: openMenu, close: closeMenu, toggle: toggleMenu } = useDisclosure(false);
  const currentSection = useCurrentSection();
  const { lockScroll, unlockScroll } = useScrollLock();
  const router = useRouter();

  // Lock scroll when menu is open
  useEffect(() => { // ✅ Changé de React.useEffect à useEffect
    if (isMenuOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll();
  }, [isMenuOpen, lockScroll, unlockScroll]);

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
      
      // Close mobile menu if open
      closeMenu();

      // Accessibility: focus on the section
      element.tabIndex = -1;
      element.focus({ preventScroll: true });
      setTimeout(() => {
        element.removeAttribute('tabIndex');
      }, 1000);
    }
  }, [router, closeMenu]);

  return {
    isScrolled,
    isMenuOpen,
    currentSection,
    openMenu,
    closeMenu,
    toggleMenu,
    scrollToSection
  };
}