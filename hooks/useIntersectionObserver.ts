import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  skip?: boolean;
}

interface UseIntersectionObserverReturn {
  elementRef: React.RefObject<Element>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Hook useIntersectionObserver
 * Observe l'intersection d'un élément avec le viewport
 * Utile pour lazy loading et animations on scroll
 */
export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  skip = false,
}: UseIntersectionObserverProps = {}): UseIntersectionObserverReturn {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [currentEntry] = entries;
      setEntry(currentEntry);
      
      const isElementIntersecting = currentEntry.isIntersecting;
      
      // Si triggerOnce est activé et qu'on a déjà déclenché, on ne fait rien
      if (triggerOnce && hasTriggered && !isElementIntersecting) {
        return;
      }
      
      setIsIntersecting(isElementIntersecting);
      
      // Marquer comme déclenché si l'élément devient visible et triggerOnce est activé
      if (isElementIntersecting && triggerOnce && !hasTriggered) {
        setHasTriggered(true);
      }
    },
    [triggerOnce, hasTriggered]
  );

  useEffect(() => {
    const element = elementRef.current;
    
    // Skip if disabled or no element
    if (skip || !element) {
      return;
    }

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered) {
      return;
    }

    // Create observer if it doesn't exist
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin,
      });
    }

    // Start observing
    observerRef.current.observe(element);

    // Cleanup function
    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [threshold, rootMargin, skip, triggerOnce, hasTriggered, handleIntersection]);

  // Cleanup observer when component unmounts
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  // Reset function for manual control
  const reset = useCallback(() => {
    setHasTriggered(false);
    setIsIntersecting(false);
    setEntry(null);
  }, []);

  return { 
    elementRef, 
    isIntersecting, 
    entry,
    // Expose reset function for advanced use cases
    ...(triggerOnce ? { reset } : {})
  };
}

export default useIntersectionObserver;