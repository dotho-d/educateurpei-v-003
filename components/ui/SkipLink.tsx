/**
 * components/ui/SkipLink.tsx
 * Lien de saut pour l'accessibilité
 */

'use client';

import { cn } from '@/lib/utils';

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md",
        "font-medium z-50 transition-all duration-200"
      )}
    >
      Passer au contenu principal
    </a>
  );
}