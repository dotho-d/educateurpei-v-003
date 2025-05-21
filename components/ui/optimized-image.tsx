'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';


interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallbackColor?: string;
}

export default function OptimizedImage({
  fallbackColor = 'hsl(var(--muted) / 0.1)',
  className,
  alt,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="relative overflow-hidden" style={{ width: props.width, height: props.height }}>
      {/* Placeholder qui disparaît au chargement */}
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: fallbackColor }}
        />
      )}
      
      <Image
        className={cn(
          'transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        alt={alt || "Image"}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}