/**
 * header-wrapper.tsx
 * Composant wrapper pour l'en-tête qui s'exécute côté client
 */
"use client";

import { usePathname } from 'next/navigation';
import Header from './header';

/**
 * Composant HeaderWrapper
 * Enveloppe le composant Header pour permettre l'utilisation de hooks React
 */
export default function HeaderWrapper() {
  // On pourrait utiliser pathname pour conditionner le rendu ou le comportement de l'en-tête
  const pathname = usePathname();
  
  // Retourne le Header
  return <Header />;
}