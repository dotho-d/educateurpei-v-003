/**
 * hooks/useScrollState.ts
 * Hook optimisé pour détecter l'état de scroll avec throttling
 */
import { useState, useEffect, useCallback } from 'react';

interface UseScrollStateOptions {
  threshold?: number;
  throttle?: number;
}

export function useScrollState({ 
  threshold = 10, 
  throttle = 100 
}: UseScrollStateOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > threshold;
    setIsScrolled(scrolled);
  }, [threshold]);

  // Throttling function
  const throttledHandleScroll = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, throttle);
    };
  }, [handleScroll, throttle]);

  useEffect(() => {
    const throttledHandler = throttledHandleScroll();
    
    // Set initial state
    handleScroll();
    
    window.addEventListener('scroll', throttledHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandler);
    };
  }, [handleScroll, throttledHandleScroll]);

  return { isScrolled };
}