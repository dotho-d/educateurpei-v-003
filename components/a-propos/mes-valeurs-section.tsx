"use client";

import { 
    Heart, 
    Target, 
    Users, 
    Award, 
    BookOpen, 
    Shield
  } from "lucide-react";
import React, { forwardRef } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from "@/lib/utils";

const MesValeursSection = forwardRef<HTMLElement, {}>(
  function MesValeursSection(props, ref) {
    const { trackEvent } = useAnalytics();

    const handleValueClick = (value: string) => {
      trackEvent('value_click', { value, page: 'a-propos' });
    };

    return (
      <section
        ref={ref}
        id="mes-valeurs"
        className="py-16 lg:py-20 section-bg-1"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Mes valeurs fondamentales
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident ma pratique et donnent du sens à mon engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Heart className="w-8 h-8" />}
              title="Empathie"
              description="Comprendre et ressentir les difficultés de chaque personne pour mieux l'accompagner."
              color="primary"
              onAction={() => handleValueClick('empathie')}
            />

            <ValueCard
              icon={<Shield className="w-8 h-8" />}
              title="Bienveillance"
              description="Créer un environnement sécurisant où chacun peut s'exprimer sans jugement."
              color="secondary"
              onAction={() => handleValueClick('bienveillance')}
            />

            <ValueCard
              icon={<Target className="w-8 h-8" />}
              title="Efficacité"
              description="Proposer des solutions concrètes et mesurables pour des résultats durables."
              color="accent"
              onAction={() => handleValueClick('efficacite')}
            />

            <ValueCard
              icon={<Users className="w-8 h-8" />}
              title="Accessibilité"
              description="Rendre l'accompagnement social accessible à tous, sans discrimination."
              color="primary"
              onAction={() => handleValueClick('accessibilite')}
            />
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="heading-3 mb-4">Ma philosophie de l'accompagnement</h3>
              <p className="body-text text-muted-foreground max-w-3xl mx-auto">
                Je crois fermement que chaque personne porte en elle les ressources nécessaires pour surmonter ses difficultés. 
                Mon rôle n'est pas de résoudre les problèmes à la place de la personne, mais de l'accompagner pour qu'elle 
                trouve ses propres solutions et développe son autonomie.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-alegreya font-semibold mb-2">Écouter avant tout</h4>
                <p className="body-text-small text-muted-foreground">
                  Prendre le temps de comprendre la situation dans sa globalité
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-alegreya font-semibold mb-2">Accompagner sans juger</h4>
                <p className="body-text-small text-muted-foreground">
                  Créer un espace de confiance pour favoriser l'expression libre
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-alegreya font-semibold mb-2">Valoriser les réussites</h4>
                <p className="body-text-small text-muted-foreground">
                  Reconnaître et célébrer chaque progrès, même le plus petit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'primary' | 'secondary' | 'accent';
  onAction?: () => void;
}

function ValueCard({ icon, title, description, color, onAction }: ValueCardProps) {
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
      className={`bg-gradient-to-br ${colorClasses[color]} border-0 hover:shadow-lg transition-all duration-300 text-center cursor-pointer`}
      onClick={onAction}
    >
      <CardHeader>
        <div className={`w-12 h-12 ${iconColorClasses[color]} rounded-full flex items-center justify-center mx-auto mb-4`}>
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

export default MesValeursSection;