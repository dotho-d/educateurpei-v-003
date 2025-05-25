/**
 * hooks/useCurrentSection.ts
 * Hook pour détecter la section actuellement visible
 */
import { useState, useEffect } from 'react';

export function useCurrentSection() {
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    // Set initial section from URL hash
    const hash = window.location.hash.substring(1);
    setCurrentSection(hash);

    const handleHashChange = () => {
      setCurrentSection(window.location.hash.substring(1));
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return currentSection;
}