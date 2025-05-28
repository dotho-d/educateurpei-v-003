/**
 * hero-section.tsx
 * VERSION CORRIGÉE - Centrage intelligent responsive + ticker fonctionnel
 */
"use client";

import { ArrowDown } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Ticker from '@/components/ui/ticker';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement>;
  handleSmoothScroll: (targetId: string) => void;
}

export default function HeroSection({ heroRef, handleSmoothScroll }: HeroSectionProps) {
  return (
    <section
      ref={heroRef}
      id="hero"
      className={cn(
        "hero-safe-container h-screen relative",
        "flex section-bg-1",
        // ALIGNEMENT RESPONSIVE INTELLIGENT
        "items-start",           // Mobile : contrôle avec padding
        "sm:items-start",        // Tablet : contrôle avec padding  
        "md:items-start",        // Medium : contrôle avec padding
        "lg:items-center",       // Desktop : centrage naturel
        "xl:items-center",       // Large : centrage naturel
        // ESPACEMENTS AJUSTÉS
        "pt-20 pb-20",          // Mobile : 80px haut, 80px bas
        "sm:pt-20 sm:pb-20",    // Tablet : 80px haut, 80px bas
        "md:pt-30 md:pb-30",    // Medium : 120px haut, 120px bas
        "lg:pt-0 lg:pb-0",      // Desktop : pas de padding (centrage naturel)
        "xl:pt-0 xl:pb-0"       // Large : pas de padding (centrage naturel)
      )}
      style={{ 
        overflowX: 'hidden', 
        maxWidth: '100vw' 
      }}
      aria-labelledby="hero-heading"
    >
      {/* Cercles décoratifs en arrière-plan */}
      <div className="hero-circles-background" aria-hidden="true">
        <div className="hero-circle-main" />
        <div className="hero-circle-dashed" />
      </div>

      {/* CONTAINER AVEC OFFSET POUR DESKTOP */}
      <div className={cn(
        "section-container w-full",
        // Offset vers le haut pour desktop (pour compenser le ticker)
        "lg:-mt-12 xl:-mt-16"  // Léger décalage vers le haut pour les grands écrans
      )}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Contenu à gauche */}
          <div className={cn(
            "w-full z-20 text-center lg:text-left space-y-6 lg:space-y-8",
            "mt-0 sm:mt-4 md:mt-6 lg:mt-0" // Marges conservées pour petits écrans
          )}>
            <h1 id="hero-heading" className="heading-1">
              Résolvez vos difficultés sociales et éducatives de façon innovante
            </h1>
            
            <div className="space-y-4">
              <p className="body-text text-muted-foreground">
                Vous habitez à l&apos;Île de La Réunion ?
              </p>
              <p className="body-text text-muted-foreground">
                Vous êtes à la recherche d&apos;un travailleur social indépendant ?
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-start pt-4">
              <Button
                size="lg"
                variant="default"
                className={cn(
                  "nav-text py-6 px-8 rounded-2xl shadow-lg",
                  "hover:shadow-xl transition-all duration-300",
                  "bg-primary hover:bg-primary/90 text-primary-foreground"
                )}
                onClick={() => handleSmoothScroll('domaines-intervention')}
                aria-label="Découvrir nos services"
              >
                Découvrir nos services 
                <ArrowDown className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Image à droite */}
          <div 
            className="w-full relative mt-8 lg:mt-0 flex justify-center lg:justify-end"
            style={{ maxWidth: '100%' }}
          >
            <div className="hero-image-container">
              <div className="hero-image-wrapper">
                <OptimizedImage
                  src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Accompagnement par un éducateur spécialisé - personnes en discussion lors d'une séance de suivi"
                  fill
                  sizes="(max-width: 480px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
                  className="object-cover"
                  priority
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  showErrorMessage={false}
                  fallbackSrc="/images/hero-fallback.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker - Position à 92% via CSS Module */}
      <Ticker 
        items={[
          { text: 'Handicap' },
          { text: 'Difficultés éducatives' },
          { text: 'Difficultés administratives et sociales' },
          { text: 'Addictions' },
          { text: 'Insertion professionnelle' },
          { text: 'Santé mentale' }
        ]}
      />

      {/* Formes décoratives */}
      <div 
        className="absolute bottom-16 w-8 h-8 bg-primary/15 rounded-full z-5" 
        aria-hidden="true"
        style={{
          right: 'min(33%, calc(100vw - 4rem))',
          maxWidth: 'calc(100vw - 2rem)'
        }}
      />
    </section>
  );
}