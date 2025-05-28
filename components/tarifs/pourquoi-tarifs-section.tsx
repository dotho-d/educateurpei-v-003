"use client";

import { 
    Star, 
    Clock, 
    Target, 
    Zap, 
    Users, 
    Check
  } from "lucide-react";
import React, { forwardRef } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from "@/lib/utils";

const PourquoiTarifsSection = forwardRef<HTMLElement, {}>(
  function PourquoiTarifsSection(props, ref) {
    const { trackEvent } = useAnalytics();

    const handleReasonClick = (reason: string) => {
      trackEvent('reason_click', { reason, page: 'tarifs' });
    };

    return (
      <section
        ref={ref}
        id="pourquoi-tarifs"
        className="py-16 lg:py-20 section-bg-1"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Pourquoi ces tarifs ?
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Une tarification juste et transparente qui reflète la qualité de notre accompagnement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReasonCard
              icon={<Star className="w-8 h-8" />}
              title="Qualité professionnelle"
              description="Formation spécialisée, expérience reconnue et mise à jour continue des compétences pour vous offrir le meilleur accompagnement."
              onAction={() => handleReasonClick('quality')}
            />

            <ReasonCard
              icon={<Clock className="w-8 h-8" />}
              title="Disponibilité étendue"
              description="Service accessible avec des créneaux flexibles, assistance en ligne et réponse rapide à vos besoins urgents."
              onAction={() => handleReasonClick('availability')}
            />

            <ReasonCard
              icon={<Target className="w-8 h-8" />}
              title="Approche personnalisée"
              description="Chaque accompagnement est unique, adapté à votre situation spécifique avec des objectifs personnalisés."
              onAction={() => handleReasonClick('personalized')}
            />

            <ReasonCard
              icon={<Zap className="w-8 h-8" />}
              title="Outils innovants"
              description="Plateforme numérique, application mobile, gamification et suivi en temps réel pour optimiser votre accompagnement."
              onAction={() => handleReasonClick('innovative')}
            />

            <ReasonCard
              icon={<Users className="w-8 h-8" />}
              title="Accessibilité financière"
              description="Tarifs étudiés pour rester accessibles tout en maintenant un service de qualité. Possibilité d'étalement de paiement."
              onAction={() => handleReasonClick('affordable')}
            />

            <ReasonCard
              icon={<Check className="w-8 h-8" />}
              title="Résultats mesurables"
              description="Suivi des progrès, évaluation des objectifs et ajustement continu pour garantir l'efficacité de l'accompagnement."
              onAction={() => handleReasonClick('results')}
            />
          </div>
        </div>
      </section>
    );
  }
);

interface ReasonCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onAction?: () => void;
}

function ReasonCard({ icon, title, description, onAction }: ReasonCardProps) {
  return (
    <Card 
      className="border-0 bg-gradient-to-br from-background to-primary/5 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onAction}
    >
      <CardHeader>
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="font-alegreya">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="body-text-small text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default PourquoiTarifsSection;