/**
 * OptimizedImage.tsx
 * Composant d'image optimisé avec support WebP/AVIF et performance maximale
 */

'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useCallback, useMemo, memo } from 'react';

import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  showErrorMessage?: boolean;
  errorMessage?: string;
  loadingClassName?: string;
  errorClassName?: string;
  showSkeleton?: boolean;
  enableBlur?: boolean;
  retryAttempts?: number;
}

interface ImageState {
  isLoading: boolean;
  hasError: boolean;
  currentSrc: string;
  retryCount: number;
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc,
  showErrorMessage = false,
  errorMessage = 'Image temporairement indisponible',
  loadingClassName,
  errorClassName,
  showSkeleton = true,
  enableBlur = true,
  retryAttempts = 2,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  // État consolidé pour optimiser les re-renders
  const [state, setState] = useState<ImageState>({
    isLoading: true,
    hasError: false,
    currentSrc: src,
    retryCount: 0
  });

  // Memoized blur data URL par défaut
  const defaultBlurDataURL = useMemo(() => 
    enableBlur && !blurDataURL 
      ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      : blurDataURL,
    [enableBlur, blurDataURL]
  );

  // Optimized load handler
  const handleLoad = useCallback(() => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      hasError: false
    }));
  }, []);

  // Advanced error handler with retry logic
  const handleError = useCallback(() => {
    console.warn(`Image failed to load: ${state.currentSrc}`);
    
    setState(prev => {
      // Retry avec cache busting si pas trop de tentatives
      if (prev.retryCount < retryAttempts && prev.currentSrc === src) {
        const retryUrl = `${src}${src.includes('?') ? '&' : '?'}retry=${prev.retryCount + 1}&t=${Date.now()}`;
        return {
          ...prev,
          currentSrc: retryUrl,
          retryCount: prev.retryCount + 1,
          isLoading: true
        };
      }

      // Fallback si disponible et pas déjà utilisé
      if (prev.currentSrc !== fallbackSrc && fallbackSrc) {
        return {
          ...prev,
          currentSrc: fallbackSrc,
          retryCount: 0,
          hasError: false,
          isLoading: true
        };
      }

      // Échec final
      return {
        ...prev,
        hasError: true,
        isLoading: false
      };
    });
  }, [state.currentSrc, src, fallbackSrc, retryAttempts]);

  // Memoized container classes
  const containerClasses = useMemo(() => cn(
    "relative overflow-hidden w-full h-full"
  ), []);

  // Memoized skeleton classes
  const skeletonClasses = useMemo(() => cn(
    'absolute inset-0 bg-muted/10 animate-pulse',
    'flex items-center justify-center',
    loadingClassName
  ), [loadingClassName]);

  // Memoized image classes
  const imageClasses = useMemo(() => cn(
    'transition-opacity duration-300',
    state.isLoading ? 'opacity-0' : 'opacity-100',
    className
  ), [state.isLoading, className]);

  // Memoized error container classes
  const errorClasses = useMemo(() => cn(
    'flex items-center justify-center bg-muted/20 text-muted-foreground',
    'text-sm font-medium rounded-lg border border-dashed border-muted-foreground/20',
    errorClassName || className
  ), [errorClassName, className]);

  // Error state avec message optionnel
  if (state.hasError && showErrorMessage) {
    return (
      <div
        className={errorClasses}
        style={{ 
          width: typeof props.width === 'number' ? `${props.width}px` : props.width,
          height: typeof props.height === 'number' ? `${props.height}px` : props.height,
          minHeight: '200px'
        }}
        role="img"
        aria-label={`Erreur de chargement: ${alt}`}
      >
        <div className="text-center p-4">
          <div className="text-2xl mb-2" aria-hidden="true">🖼️</div>
          <div className="text-xs">{errorMessage}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Skeleton loader optimisé */}
      {state.isLoading && showSkeleton && (
        <div className={skeletonClasses} aria-hidden="true">
          <div className="w-6 h-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      )}
      
      {/* Image principale avec optimisations */}
      <Image
        src={state.currentSrc}
        alt={alt || "Image"}
        className={imageClasses}
        placeholder={defaultBlurDataURL ? 'blur' : 'empty'}
        blurDataURL={defaultBlurDataURL}
        priority={priority}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        {...props}
      />
    </div>
  );
});

export default OptimizedImage;