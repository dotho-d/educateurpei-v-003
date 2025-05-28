"use client";

import { 
    Calendar, 
    MessageSquare, 
    CreditCard, 
    FileText, 
    Users,
    CheckCircle
  } from "lucide-react";
import React, { forwardRef } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from "@/lib/utils";

const ProcessusSection = forwardRef<HTMLElement, {}>(
  function ProcessusSection(props, ref) {
    const { trackEvent } = useAnalytics();

    const handleStepClick = (step: number) => {
      trackEvent('process_step_click', { step, page: 'modalites' });
    };

    return (
      <section
        ref={ref}
        id="processus"
        className="py-16 lg:py-20 section-bg-2"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Notre processus en 5 étapes
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Un accompagnement structuré et personnalisé pour répondre au mieux à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProcessStep
              number="1"
              icon={<Users className="w-8 h-8" />}
              title="Inscription sur le site"
              description="Créez votre compte en quelques minutes sur notre plateforme sécurisée. Renseignez vos informations de base pour un suivi personnalisé."
              features={[
                "Création de compte gratuite",
                "Interface intuitive et sécurisée",
                "Accès à votre espace personnel"
              ]}
              onAction={() => handleStepClick(1)}
            />

            <ProcessStep
              number="2"
              icon={<MessageSquare className="w-8 h-8" />}
              title="Formulaire de contact"
              description="Décrivez votre situation et vos besoins grâce à notre formulaire intelligent qui nous aide à mieux vous orienter."
              features={[
                "Questionnaire adaptatif",
                "Évaluation préliminaire",
                "Orientation personnalisée"
              ]}
              onAction={() => handleStepClick(2)}
            />

            <ProcessStep
              number="3"
              icon={<Calendar className="w-8 h-8" />}
              title="Prise de RDV"
              description="Planifiez votre entretien par SMS, téléphone ou directement en ligne selon vos préférences et disponibilités."
              features={[
                "Réservation en ligne 24h/24",
                "Rappel automatique",
                "Choix présentiel ou visioconférence"
              ]}
              onAction={() => handleStepClick(3)}
            />

            <ProcessStep
              number="4"
              icon={<CreditCard className="w-8 h-8" />}
              title="Paiement sécurisé"
              description="Réglez votre consultation en toute sécurité avec nos multiples options de paiement."
              features={[
                "Paiement en ligne sécurisé",
                "Plusieurs moyens acceptés",
                "Facturation automatique"
              ]}
              onAction={() => handleStepClick(4)}
            />

            <ProcessStep
              number="5"
              icon={<FileText className="w-8 h-8" />}
              title="Intervention & Suivi"
              description="Bénéficiez de votre accompagnement personnalisé avec un compte-rendu détaillé et un suivi adapté."
              features={[
                "Entretien personnalisé",
                "Compte-rendu détaillé",
                "Suivi et objectifs définis"
              ]}
              onAction={() => handleStepClick(5)}
            />

            <div className="md:col-span-2 lg:col-span-1 flex items-center justify-center">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-alegreya text-xl font-semibold">Accompagnement continu</h3>
                  <p className="body-text-small text-muted-foreground">
                    Votre accompagnement ne s'arrête pas à l'entretien. Nous assurons un suivi personnalisé pour atteindre vos objectifs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

interface ProcessStepProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  onAction?: () => void;
}

function ProcessStep({ number, icon, title, description, features, onAction }: ProcessStepProps) {
  return (
    <Card 
      className="relative overflow-hidden border-0 bg-gradient-to-br from-background to-primary/5 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onAction}
    >
      <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
        <span className="text-sm font-bold text-primary">{number}</span>
      </div>
      <CardHeader>
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="font-alegreya">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="body-text-small text-muted-foreground">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default ProcessusSection;