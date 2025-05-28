"use client";

import { 
    Clock, 
    Users, 
    Heart, 
    CheckCircle
  } from "lucide-react";
import React, { forwardRef } from 'react';

import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';

const EspritTarifSection = forwardRef<HTMLElement, {}>(
  function EspritTarifSection(props, ref) {
    const { trackEvent } = useAnalytics();

    const handlePrincipleClick = (principle: string) => {
      trackEvent('tarif_principle_click', { principle, page: 'a-propos' });
    };

    return (
      <section
        ref={ref}
        id="esprit-tarif"
        className="py-16 lg:py-20 section-bg-2"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <SectionTitle>
              L'esprit derrière nos tarifs
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Une tarification juste et transparente qui reflète mes valeurs d'accessibilité et de qualité
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
              <div>
                <h3 className="heading-3 mb-4">Accessibilité avant tout</h3>
                <p className="body-text text-muted-foreground mb-4">
                  J'ai délibérément choisi de proposer des tarifs inférieurs à ceux du marché privé classique. 
                  Mon objectif est de rendre l'accompagnement social accessible au plus grand nombre, sans pour 
                  autant sacrifier la qualité du service.
                </p>
                <p className="body-text text-muted-foreground">
                  Les tarifs pratiqués couvrent mes frais de fonctionnement et me permettent de maintenir une 
                  activité pérenne, tout en restant cohérents avec ma mission sociale.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <PrincipleCard
                icon={<Clock className="w-6 h-6" />}
                title="Premier entretien à 15€"
                description="Un tarif symbolique pour permettre à chacun de tester notre accompagnement sans engagement financier lourd."
                onAction={() => handlePrincipleClick('premier_entretien')}
              />
              
              <PrincipleCard
                icon={<Users className="w-6 h-6" />}
                title="Forfaits avantageux"
                description="Plus vous vous engagez dans la durée, plus le tarif horaire diminue, pour récompenser votre investissement."
                onAction={() => handlePrincipleClick('forfaits')}
              />
              
              <PrincipleCard
                icon={<Heart className="w-6 h-6" />}
                title="Transparence totale"
                description="Aucun frais caché, aucune surprise. Le prix annoncé est le prix payé, avec la possibilité d'étalement."
                onAction={() => handlePrincipleClick('transparence')}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-background to-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="heading-3 mb-4">Une approche sociale de l'entrepreneuriat</h3>
                <p className="body-text text-muted-foreground mb-6">
                  En me lançant dans l'indépendance, je n'ai pas renoncé à mes valeurs sociales. Au contraire, 
                  j'ai choisi de créer une entreprise à mission sociale, où le profit n'est pas une fin en soi 
                  mais un moyen de pérenniser et d'améliorer constamment mon service d'accompagnement.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span className="body-text-small">Réinvestissement des bénéfices dans l'amélioration du service</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span className="body-text-small">Formation continue pour rester à la pointe des pratiques</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span className="body-text-small">Développement d'outils innovants au service des usagers</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6">
                <h4 className="font-alegreya text-xl font-semibold mb-4">Ma promesse tarifaire</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span className="body-text-small">Pas d'augmentation arbitraire</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span className="body-text-small">Tarifs préférentiels selon les situations</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span className="body-text-small">Facilités de paiement disponibles</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span className="body-text-small">Service premium à prix accessible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

interface PrincipleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onAction?: () => void;
}

function PrincipleCard({ icon, title, description, onAction }: PrincipleCardProps) {
  return (
    <Card 
      className="bg-gradient-to-br from-background to-secondary/5 border-secondary/20 hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={onAction}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
            {icon}
          </div>
          <div>
            <h4 className="font-alegreya font-semibold mb-1">{title}</h4>
            <p className="body-text-small text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EspritTarifSection;