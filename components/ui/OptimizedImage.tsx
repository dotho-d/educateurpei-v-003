'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  showErrorMessage?: boolean;
  errorMessage?: string;
  loadingClassName?: string;
  errorClassName?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc,
  showErrorMessage = false, // ✅ Désactivé par défaut
  errorMessage = 'Image temporairement indisponible',
  loadingClassName,
  errorClassName,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    console.warn(`Image failed to load: ${imgSrc}`);
    
    // ✅ Retry mechanism amélioré
    if (retryCount < 2 && imgSrc === src) {
      setRetryCount(prev => prev + 1);
      const retryUrl = `${src}${src.includes('?') ? '&' : '?'}retry=${retryCount + 1}`;
      setImgSrc(retryUrl);
      return;
    }

    // ✅ Fallback si disponible
    if (imgSrc !== fallbackSrc && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false);
      setRetryCount(0);
      return;
    }

    // ✅ Seulement en dernier recours
    setHasError(true);
    setIsLoading(false);
  }, [retryCount, imgSrc, src, fallbackSrc]);

  // ✅ Affichage d'erreur seulement si demandé ET en dernier recours
  if (hasError && showErrorMessage) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted/20 text-muted-foreground',
          'text-sm font-medium rounded-lg border border-dashed border-muted-foreground/20',
          errorClassName || className
        )}
        style={{ 
          width: typeof props.width === 'number' ? `${props.width}px` : props.width,
          height: typeof props.height === 'number' ? `${props.height}px` : props.height,
          minHeight: '200px'
        }}
        role="img"
        aria-label={`Erreur de chargement: ${alt}`}
      >
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-xs">{errorMessage}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* ✅ Placeholder de chargement */}
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 bg-muted/10 animate-pulse',
            'flex items-center justify-center',
            loadingClassName
          )}
        >
          <div className="w-6 h-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      )}
      
      {/* ✅ Image principale */}
      <Image
        src={imgSrc}
        alt={alt || "Image"}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
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
}