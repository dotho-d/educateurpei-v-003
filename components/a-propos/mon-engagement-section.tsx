"use client";

import { 
    ArrowRight, 
    CheckCircle
  } from "lucide-react";
import Link from "next/link";
import React, { forwardRef } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';

const MonEngagementSection = forwardRef<HTMLElement, {}>(
  function MonEngagementSection(props, ref) {
    const { trackEvent } = useAnalytics();

    const handleCommitmentClick = (commitment: string) => {
      trackEvent('commitment_click', { commitment, page: 'a-propos' });
    };

    const handleCTAClick = (action: string) => {
      trackEvent('cta_click', { action, page: 'a-propos' });
    };

    return (
      <div className="flex flex-col w-full">
        {/* Mon engagement */}
        <section 
          ref={ref}
          id="mon-engagement"
          className="py-16 lg:py-20 section-bg-1"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <SectionTitle>
                Mon engagement au quotidien
              </SectionTitle>
              <p className="body-text text-muted-foreground max-w-2xl mx-auto">
                Au-delà des mots, voici comment je concrétise mes valeurs dans ma pratique professionnelle
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CommitmentCard
                title="Formation continue"
                description="Je consacre 40 heures par an à ma formation pour rester à jour sur les meilleures pratiques et les évolutions législatives."
                achievements={[
                  "Certification en entretien motivationnel",
                  "Formation aux nouvelles addictions",
                  "Spécialisation en médiation familiale",
                  "Veille juridique permanente"
                ]}
                color="primary"
                onAction={() => handleCommitmentClick('formation')}
              />

              <CommitmentCard
                title="Innovation responsable"
                description="Je développe et teste de nouveaux outils pour améliorer l'efficacité de l'accompagnement, toujours dans le respect de la personne."
                achievements={[
                  "Application mobile sécurisée",
                  "Système de gamification éthique",
                  "Chatbot d'assistance 24h/24",
                  "Plateforme de suivi personnalisé"
                ]}
                color="secondary"
                onAction={() => handleCommitmentClick('innovation')}
              />

              <CommitmentCard
                title="Déontologie renforcée"
                description="Je m'astreins à des règles déontologiques strictes, allant au-delà des obligations légales pour garantir votre confiance."
                achievements={[
                  "Secret professionnel absolu",
                  "Supervision professionnelle mensuelle",
                  "Charte éthique personnalisée",
                  "Évaluation annuelle par les pairs"
                ]}
                color="accent"
                onAction={() => handleCommitmentClick('deontologie')}
              />

              <CommitmentCard
                title="Partenariats solides"
                description="Je maintiens un réseau de partenaires de qualité pour vous orienter vers les meilleures solutions complémentaires."
                achievements={[
                  "Réseau de 15 partenaires experts",
                  "Conventions avec les institutions",
                  "Collaboration avec les centres de soins",
                  "Liens privilégiés avec les associations"
                ]}
                color="primary"
                onAction={() => handleCommitmentClick('partenariats')}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 section-bg-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12 shadow-xl text-center">
              <h2 className="heading-2 mb-4">
                Envie de faire connaissance ?
              </h2>
              <p className="body-text text-muted-foreground max-w-2xl mx-auto mb-8">
                N'hésitez pas à me contacter pour discuter de votre situation. Le premier échange est toujours gratuit et sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  asChild 
                  className="rounded-full shadow-md"
                  onClick={() => handleCTAClick('contact')}
                >
                  <Link href="/contact">
                    Prendre contact
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="rounded-full border-2"
                  onClick={() => handleCTAClick('modalites')}
                >
                  <Link href="/modalites">
                    Voir comment je travaille
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
);

interface CommitmentCardProps {
  title: string;
  description: string;
  achievements: string[];
  color: 'primary' | 'secondary' | 'accent';
  onAction?: () => void;
}

function CommitmentCard({ title, description, achievements, color, onAction }: CommitmentCardProps) {
  const colorClasses = {
    primary: "from-primary/10 to-primary/5 border-primary/20",
    secondary: "from-secondary/10 to-secondary/5 border-secondary/20",
    accent: "from-accent/10 to-accent/5 border-accent/20"
  };
  
  return (
    <Card 
      className={`bg-gradient-to-br ${colorClasses[color]} border-0 hover:shadow-lg transition-all duration-300 cursor-pointer`}
      onClick={onAction}
    >
      <CardHeader>
        <CardTitle className="font-alegreya">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="body-text-small text-muted-foreground">
          {description}
        </p>
        <ul className="space-y-2">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">{achievement}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default MonEngagementSection;