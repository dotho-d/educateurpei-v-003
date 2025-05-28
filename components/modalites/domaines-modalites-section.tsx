"use client";

import { 
    Heart, 
    Home, 
    Brain, 
    FileText, 
    Briefcase,
    MessageSquare,
    ArrowRight
  } from "lucide-react";
import Link from "next/link";
import React, { forwardRef } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from "@/lib/utils";

const DomainesModalitesSection = forwardRef<HTMLElement, {}>(
  function DomainesModalitesSection(props, ref) {
    const { trackEvent } = useAnalytics();

    const handleDomaineClick = (domaine: string) => {
      trackEvent('domaine_click', { domaine, page: 'modalites' });
    };

    const handleHelpChoosingClick = () => {
      trackEvent('help_choosing_click', { page: 'modalites' });
    };

    return (
      <section
        ref={ref}
        id="domaines"
        className="py-16 lg:py-20 section-bg-2"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Nos domaines d'intervention
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Choisissez votre domaine d'intervention pour accéder au formulaire adapté à votre situation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DomaineCard
              icon={<Heart className="w-8 h-8" />}
              title="Handicap"
              description="Accompagnement des personnes en situation de handicap et leurs familles"
              formLink="/formulaire/handicap"
              color="primary"
              onAction={() => handleDomaineClick('handicap')}
            />

            <DomaineCard
              icon={<Home className="w-8 h-8" />}
              title="Difficultés familiales"
              description="Médiation familiale et accompagnement à la parentalité"
              formLink="/formulaire/familiales"
              color="secondary"
              onAction={() => handleDomaineClick('familiales')}
            />

            <DomaineCard
              icon={<Brain className="w-8 h-8" />}
              title="Addictions"
              description="Accompagnement et prévention des conduites addictives"
              formLink="/formulaire/addictions"
              color="accent"
              onAction={() => handleDomaineClick('addictions')}
            />

            <DomaineCard
              icon={<FileText className="w-8 h-8" />}
              title="Accompagnement administratif"
              description="Aide aux démarches et médiation avec les institutions"
              formLink="/formulaire/administratif"
              color="primary"
              onAction={() => handleDomaineClick('administratif')}
            />

            <DomaineCard
              icon={<Briefcase className="w-8 h-8" />}
              title="Insertion professionnelle"
              description="Accompagnement vers l'emploi et l'orientation professionnelle"
              formLink="/formulaire/insertion"
              color="secondary"
              onAction={() => handleDomaineClick('insertion')}
            />

            <div className="md:col-span-2 lg:col-span-1 flex items-center justify-center">
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-alegreya text-xl font-semibold">Besoin d'aide pour choisir ?</h3>
                  <p className="body-text-small text-muted-foreground">
                    Notre équipe vous aide à identifier le domaine d'intervention le plus adapté à votre situation.
                  </p>
                  <Button 
                    variant="outline" 
                    asChild 
                    className="rounded-full"
                    onClick={handleHelpChoosingClick}
                  >
                    <Link href="/contact">
                      Nous contacter
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

interface DomaineCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  formLink: string;
  color: 'primary' | 'secondary' | 'accent';
  onAction?: () => void;
}

function DomaineCard({ icon, title, description, formLink, color, onAction }: DomaineCardProps) {
  const colorClasses = {
    primary: "from-primary/10 to-primary/5",
    secondary: "from-secondary/10 to-secondary/5",
    accent: "from-accent/10 to-accent/5"
  };

  const iconColorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent"
  };

  const handleClick = () => {
    if (onAction) onAction();
  };

  return (
    <Card className="border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className={`bg-gradient-to-br ${colorClasses[color]} p-6`}>
        <CardHeader className="p-0 mb-4">
          <div className={`w-12 h-12 ${iconColorClasses[color]} rounded-full flex items-center justify-center mb-4`}>
            {icon}
          </div>
          <CardTitle className="font-alegreya">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <p className="body-text-small text-muted-foreground">{description}</p>
        </CardContent>
      </div>
      <div className="p-6 bg-background">
        <Button asChild className="w-full rounded-full" onClick={handleClick}>
          <Link href={formLink}>
            Accéder au formulaire <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

export default DomainesModalitesSection;