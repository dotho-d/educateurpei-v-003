/**
 * hero-section.tsx
 * Composant de la section héro de la page d'accueil
 * Optimisé pour l'accessibilité
 */
"use client";

import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import Ticker from '@/components/ui/ticker';

import styles from './styles/HeroSection.module.css';

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
 * Composant HeroSection
 * Affiche la section d'introduction principale du site avec image, texte et bande défilante
 */
export default function HeroSection({ heroRef, handleSmoothScroll }: HeroSectionProps) {
  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative w-full overflow-hidden min-h-screen h-screen flex items-center section-bg-1 ${styles.heroSection}`}
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto max-w-[86%] xs:max-w-[86%] sm:max-w-[86%] md:max-w-[82%] lg:max-w-[82%] px-4 sm:px-6 flex flex-col lg:flex-row items-center sm:pt-4 md:pt-0">
        {/* Contenu à gauche - centré sur mobile, aligné à gauche sur desktop */}
        <div className="w-full lg:w-1/2 z-10 mb-12 lg:mb-0 text-center lg:text-left">
          <h1 id="hero-heading" className="typography-h1 mb-6 sm:mb-4 md:mb-6 mx-auto lg:mx-0">
            Résolvez vos difficultés sociales et éducatives de façon innovante
          </h1>
          <p className="typography-body text-muted-foreground mb-4 mx-auto lg:mx-0">
            Vous habitez à l&apos;Île de La Réunion ?
          </p>
          <p className="typography-body text-muted-foreground mb-6 mx-auto lg:mx-0">
            Vous êtes à la recherche d&apos;un travailleur social indépendant ?
          </p>
          <div className="flex justify-center lg:justify-center">
            <Button
              size="lg"
              variant="default"
              className="typography-button py-8 sm:py-6 px-4 sm:px-6 rounded-btn shadow-lg gap-2"
              onClick={() => handleSmoothScroll('domaines-intervention')}
              aria-label="Découvrir nos services"
            >
              Découvrir nos services <ArrowDown className="ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Image à droite avec cercle décoratif */}
        <div className="w-full lg:w-1/2 relative mt-12 sm:mt-8 lg:mt-0 hero-image-container">
          {/* Conteneur centré pour les cercles */}
          <div className="hero-circles-container" aria-hidden="true">
            {/* Cercle décoratif */}
            <div className="absolute rounded-full bg-gradient-to-r from-primary/20 to-primary/20 z-0" style={{
              width: 'clamp(240px, 36vw, 340px)',
              height: 'clamp(240px, 36vw, 340px)'
            }}></div>

            {/* Cercle pointillé décoratif */}
            <div
              className="absolute rounded-full z-0 animate-rotate"
              style={{
                width: 'clamp(260px, 40vw, 360px)',
                height: 'clamp(260px, 40vw, 360px)',
                border: "4px dashed",
                borderColor: "hsl(var(--primary) / 0.4)",
                borderRadius: "50%",
                borderSpacing: "15px"
              }}
            ></div>
          </div>

          {/* Image au premier plan */}
          <div className="flex h-full items-center justify-center">
            <div className="relative z-5 rounded-3xl shadow-xl mt-4 overflow-hidden" style={{
              width: 'clamp(225px, 60vw, 450px)',
              height: 'clamp(150px, 40vw, 300px)',
            }}>
              <Image
                src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg"
                alt="Accompagnement par un éducateur spécialisé - personnes en discussion lors d'une séance de suivi"
                fill
                sizes="(max-width: 480px) 30vw, (max-width: 768px) 35vw, (max-width: 1024px) 40vw, 450px"
                className="object-cover"
                priority
                onError={(e) => {
                  // Gestion d'erreur basique pour les images
                  console.error("Erreur de chargement de l'image hero");
                  // Remplacer par une image de secours si disponible
                  // e.currentTarget.src = "/images/fallback-hero.jpg";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ticker - Bande défilante */}
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
      <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-primary/15 rounded-full" aria-hidden="true"></div>
    </section>
  );
}