/**
 * components/ui/LazySection.tsx
 * Composant LazySection adaptatif sans scroll vertical supplémentaire
 * VERSION CORRIGÉE AVEC PROTECTION ANTI-DÉBORDEMENT HORIZONTAL
 */

'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
  minHeight?: string;
  className?: string;
  fallback?: ReactNode;
}

export default function LazySection({
  children,
  rootMargin = '100px',
  threshold = 0.1,
  minHeight = '200px',
  className,
  fallback
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Déconnecter l'observer une fois que le contenu est chargé pour optimiser les performances
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [rootMargin, threshold, hasLoaded]);

  const DefaultFallback = () => (
    <div 
      className="w-full py-16 lg:py-20 animate-pulse bg-muted/5 flex items-center justify-center no-horizontal-overflow"
      style={{ 
        minHeight,
        overflowX: 'hidden',
        maxWidth: '100%'
      }}
    >
      <div className="section-container">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-muted/20 animate-pulse" />
          <div className="w-48 h-4 bg-muted/20 rounded animate-pulse" />
          <div className="w-32 h-3 bg-muted/15 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn("w-full no-horizontal-overflow", className)}
      style={{ 
        minHeight: hasLoaded ? 'auto' : minHeight,
        overflowX: 'hidden',
        maxWidth: '100%'
      }}
    >
      {isVisible || hasLoaded ? (
        <div 
          className="w-full no-horizontal-overflow"
          style={{ 
            overflowX: 'hidden',
            maxWidth: '100%'
          }}
        >
          {children}
        </div>
      ) : (
        fallback || <DefaultFallback />
      )}
    </div>
  );
}