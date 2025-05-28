"use client";

import { 
    Smartphone, 
    Clock, 
    Brain,
    ArrowRight
  } from "lucide-react";
import Link from "next/link";
import React, { forwardRef } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from "@/lib/utils";

const AvantagesSection = forwardRef<HTMLElement, {}>(
  function AvantagesSection(props, ref) {
    const { trackEvent } = useAnalytics();

    const handleAdvantageClick = (advantage: string) => {
      trackEvent('advantage_click', { advantage, page: 'modalites' });
    };

    const handleInnovationCTAClick = () => {
      trackEvent('innovation_cta_click', { page: 'modalites' });
    };

    return (
      <section
        ref={ref}
        id="avantages"
        className="py-16 lg:py-20 section-bg-1"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Les avantages Éducateur péi
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Une approche innovante qui combine expertise humaine et outils technologiques avancés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AdvantageCard
              icon={<Smartphone className="w-8 h-8" />}
              title="Application mobile dédiée"
              description="Accédez à vos rendez-vous, documents et suivi depuis votre smartphone. Interface intuitive et notifications personnalisées."
              color="primary"
              onAction={() => handleAdvantageClick('mobile_app')}
            />

            <AdvantageCard
              icon={<Clock className="w-8 h-8" />}
              title="Assistance 24h/24"
              description="Notre chatbot intelligent et notre service d'astreinte vous accompagnent en dehors des heures d'ouverture."
              color="secondary"
              onAction={() => handleAdvantageClick('24h_support')}
            />

            <AdvantageCard
              icon={<Brain className="w-8 h-8" />}
              title="Gamification du suivi"
              description="Transformez vos objectifs en défis motivants. Suivez vos progrès et célébrez vos réussites avec notre système de récompenses."
              color="accent"
              onAction={() => handleAdvantageClick('gamification')}
            />
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="heading-3 mb-4">Innovation au service de l'humain</h3>
                <p className="body-text text-muted-foreground mb-6">
                  Nous croyons que la technologie doit servir l'accompagnement humain, pas le remplacer. 
                  C'est pourquoi nous avons développé des outils qui renforcent la qualité de notre relation 
                  et l'efficacité de notre travail ensemble.
                </p>
                <Button 
                  variant="outline" 
                  asChild 
                  className="rounded-full"
                  onClick={handleInnovationCTAClick}
                >
                  <Link href="/contact">
                    Découvrir nos outils <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction client</div>
                </div>
                <div className="bg-background p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-primary">24h</div>
                  <div className="text-sm text-muted-foreground">Délai de réponse</div>
                </div>
                <div className="bg-background p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-primary">5★</div>
                  <div className="text-sm text-muted-foreground">Note moyenne</div>
                </div>
                <div className="bg-background p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Sécurisé</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

interface AdvantageCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'primary' | 'secondary' | 'accent';
  onAction?: () => void;
}

function AdvantageCard({ icon, title, description, color, onAction }: AdvantageCardProps) {
  const colorClasses = {
    primary: "from-primary/10 to-primary/5 border-primary/20",
    secondary: "from-secondary/10 to-secondary/5 border-secondary/20",
    accent: "from-accent/10 to-accent/5 border-accent/20"
  };

  const iconColorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent"
  };

  return (
    <Card 
      className={`bg-gradient-to-br ${colorClasses[color]} border-0 hover:shadow-lg transition-all duration-300 cursor-pointer`}
      onClick={onAction}
    >
      <CardHeader>
        <div className={`w-12 h-12 ${iconColorClasses[color]} rounded-full flex items-center justify-center mb-4`}>
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

export default AvantagesSection;