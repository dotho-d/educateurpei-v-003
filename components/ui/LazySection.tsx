'use client';

import { ReactNode, memo } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  minHeight?: string | number;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Composant LazySection
 * Charge le contenu seulement quand il devient visible
 * Optimise les performances en réduisant le contenu initial
 */
const LazySection = memo(function LazySection({ 
  children, 
  fallback,
  rootMargin = '100px',
  threshold = 0.1,
  className,
  minHeight = '400px',
  triggerOnce = true,
  as: Component = 'div'
}: LazySectionProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    rootMargin,
    threshold,
    triggerOnce,
  });

  // Default fallback si aucun n'est fourni
  const defaultFallback = (
    <div 
      className={cn(
        'flex items-center justify-center bg-muted/10 rounded-lg',
        'animate-pulse',
        className
      )}
      style={{ 
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight 
      }}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <span className="text-sm text-muted-foreground">Chargement...</span>
      </div>
    </div>
  );

  return (
    <Component 
      ref={elementRef} 
      className={className}
      style={{ 
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight 
      }}
    >
      {isIntersecting ? children : (fallback || defaultFallback)}
    </Component>
  );
});

export default LazySection;