"use client";

import { Lightbulb } from "lucide-react";
import React, { forwardRef } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';

const MonHistoireSection = forwardRef<HTMLElement, {}>(
  function MonHistoireSection(props, ref) {
    const { trackEvent } = useAnalytics();

    const handleStoryClick = () => {
      trackEvent('story_section_click', { page: 'a-propos' });
    };

    return (
      <section
        ref={ref}
        id="mon-histoire"
        className="py-16 lg:py-20 section-bg-2"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Mon parcours vers l'indépendance
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              De l'institution publique à l'entrepreneuriat social : une évolution naturelle au service de l'humain
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6" onClick={handleStoryClick}>
              <div>
                <h3 className="heading-3 mb-4">Mes débuts dans le social</h3>
                <p className="body-text text-muted-foreground mb-4">
                  Diplômé en travail social, j'ai commencé ma carrière dans le secteur public, travaillant notamment 
                  dans les services de protection de l'enfance et d'accompagnement du handicap. Cette expérience m'a 
                  permis de comprendre les rouages du système social, mais aussi ses limites.
                </p>
                <p className="body-text text-muted-foreground">
                  Au fil des années, j'ai constaté que les contraintes institutionnelles ne permettaient pas toujours 
                  d'offrir l'accompagnement personnalisé et réactif que méritent les personnes en difficulté.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">12</div>
                    <div className="text-sm text-muted-foreground">Années d'expérience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Personnes accompagnées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">3</div>
                    <div className="text-sm text-muted-foreground">Diplômes spécialisés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">85%</div>
                    <div className="text-sm text-muted-foreground">Taux de réussite</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-secondary" />
                    Le déclic de l'indépendance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="body-text-small text-muted-foreground">
                    "Je me suis rendu compte que je passais plus de temps dans les réunions administratives 
                    qu'auprès des personnes qui avaient vraiment besoin d'aide."
                  </p>
                  <p className="body-text-small text-muted-foreground">
                    "L'idée de créer ma propre structure s'est imposée : offrir un service plus humain, 
                    plus réactif et plus personnalisé."
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <div>
                <h3 className="heading-3 mb-4">Pourquoi l'indépendance ?</h3>
                <p className="body-text text-muted-foreground mb-4">
                  Le choix de me mettre à mon compte n'a pas été pris à la légère. Il répondait à une conviction 
                  profonde : chaque personne mérite un accompagnement sur mesure, sans les contraintes bureaucratiques 
                  qui ralentissent souvent l'action sociale.
                </p>
                <p className="body-text text-muted-foreground">
                  En créant Éducateur péi, j'ai voulu réconcilier efficacité professionnelle et proximité humaine, 
                  en m'appuyant sur les nouvelles technologies pour améliorer le service, sans jamais perdre de vue 
                  l'essentiel : l'accompagnement de la personne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default MonHistoireSection;