/**
 * header-wrapper.tsx
 * Composant wrapper pour l'en-tête optimisé
 */
"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';

/**
 * Composant HeaderWrapper
 * Enveloppe le nouveau composant Header optimisé
 */
export default function HeaderWrapper() {
  const pathname = usePathname();
  
  // Future: On peut utiliser pathname pour conditionner le comportement
  // Par exemple, header différent pour certaines pages
  
  return <Header />;
}