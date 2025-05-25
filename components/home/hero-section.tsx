// components/home/hero-section.tsx - CORRECTION DU CONFLIT DE POSITIONNEMENT
/**
 * hero-section.tsx
 * Composant de la section héro optimisé - CORRIGÉ : suppression du conflit de positionnement
 */
"use client";

import { ArrowDown } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Ticker from '@/components/ui/ticker';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  /**
   * Référence à transmettre à la section hero
   */
  heroRef: React.RefObject<HTMLElement>;
  /**
   * Fonction pour gérer le défilement fluide
   */
  handleSmoothScroll: (targetId: string) => void;
}

/**
 * Composant HeroSection optimisé
 * Affiche la section d'introduction principale du site avec optimisations performance
 */
export default function HeroSection({ heroRef, handleSmoothScroll }: HeroSectionProps) {
  return (
    <section
      ref={heroRef}
      id="hero"
      className={cn(
        "relative w-full overflow-hidden min-h-screen h-screen",
        "flex items-center section-bg-1",
        "py-20 sm:py-24 lg:py-32"
      )}
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Contenu à gauche - centré sur mobile, aligné à gauche sur desktop */}
          <div className="w-full z-10 text-center lg:text-left space-y-6 lg:space-y-8">
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

          {/* Image à droite avec cercle décoratif */}
          <div className="w-full relative mt-12 lg:mt-0 flex justify-center lg:justify-end">
            {/* Conteneur centré pour les cercles */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              {/* Cercle décoratif */}
              <div className={cn(
                "absolute rounded-full bg-gradient-to-r from-primary/20 to-primary/20",
                "w-[min(340px,36vw)] h-[min(340px,36vw)]",
                "animate-pulse-gentle"
              )} />

              {/* Cercle pointillé décoratif */}
              <div className={cn(
                "absolute rounded-full border-4 border-dashed border-primary/40",
                "w-[min(360px,40vw)] h-[min(360px,40vw)]",
                "animate-rotate-slow"
              )} />
            </div>

            {/* Image optimisée au premier plan */}
            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="relative rounded-3xl shadow-xl overflow-hidden w-[min(450px,60vw)] h-[min(300px,40vw)]">
                <OptimizedImage
                  src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Accompagnement par un éducateur spécialisé - personnes en discussion lors d'une séance de suivi"
                  fill
                  sizes="(max-width: 480px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 450px"
                  className="object-cover"
                  priority
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  // ✅ Props d'erreur supprimées ou désactivées
                  showErrorMessage={false}
                  fallbackSrc="/images/hero-fallback.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔧 CORRECTION: Suppression du div wrapper qui causait le conflit */}
      {/* Le ticker gère maintenant son propre positionnement via Ticker.module.css */}
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
      <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-primary/15 rounded-full" aria-hidden="true" />
    </section>
  );
}