"use client";

import Image from 'next/image';
import React, { forwardRef } from 'react';
import { DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

interface HeroTarifsProps {
  onScrollToSection: (targetId: string) => void;
}

const HeroTarifs = forwardRef<HTMLElement, HeroTarifsProps>(
  function HeroTarifs({ onScrollToSection }, ref) {
    const { trackEvent } = useAnalytics();

    const handleCTAClick = () => {
      trackEvent('hero_cta_click', { page: 'tarifs' });
      onScrollToSection('grille-tarifs');
    };

    return (
      <section
        ref={ref}
        id="hero"
        className="hero-safe-container min-h-screen h-screen flex items-center section-bg-1 pt-20 pb-20 sm:pt-32 sm:pb-24 md:pt-42 md:pb-32 lg:pt-32 lg:pb-32"
        style={{ 
          overflowX: 'hidden', 
          maxWidth: '100vw' 
        }}
        aria-labelledby="hero-heading"
      >
        {/* NOUVEAU : Cercles décoratifs en arrière-plan - SÉPARÉS */}
        <div className="hero-circles-background" aria-hidden="true">
          {/* Cercle décoratif principal animé avec pulse */}
          <div className="hero-circle-main" />
          
          {/* Cercle pointillé décoratif animé avec rotation */}
          <div className="hero-circle-dashed" />
        </div>

        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="w-full z-20 text-center lg:text-left space-y-6 lg:space-y-8 mt-4 sm:mt-8 md:mt-16 lg:mt-0">
              <h1 id="hero-heading" className="heading-1">
                Tarifs transparents et accessibles
              </h1>
              
              <div className="space-y-4">
                <p className="body-text text-muted-foreground">
                  Des tarifs clairs et justes pour un accompagnement social de qualité.
                </p>
                <p className="body-text text-muted-foreground">
                  Découvrez nos formules adaptées à tous les budgets et calculez le coût de votre accompagnement.
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
                  onClick={handleCTAClick}
                  aria-label="Voir la grille tarifaire"
                >
                  Voir nos tarifs
                  <DollarSign className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* NOUVEAU : Image seule à droite - STRUCTURE SIMPLIFIÉE */}
            <div 
              className="w-full relative mt-12 lg:mt-0 flex justify-center lg:justify-end"
              style={{ 
                maxWidth: '100%'
              }}
            >
              <div className="hero-image-container">
                <div className="hero-image-wrapper">
                  <Image
                    src="https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg"
                    alt="Tarification transparente et équitable"
                    fill
                    sizes="(max-width: 480px) 200px, (max-width: 768px) 280px, (max-width: 1024px) 300px, 360px"
                    className="object-cover"
                    priority
                    quality={90}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formes décoratives */}
        <div 
          className="absolute bottom-1/4 w-8 h-8 bg-primary/15 rounded-full z-5" 
          aria-hidden="true"
          style={{
            right: 'min(33%, calc(100vw - 4rem))',
            maxWidth: 'calc(100vw - 2rem)'
          }}
        />
      </section>
    );
  }
);

export default HeroTarifs;