"use client";

import { 
    Check, 
    Users, 
    Target, 
    Info,
    Clock,
    Zap,
    DollarSign
  } from "lucide-react";
import Link from "next/link";
import React, { forwardRef } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/section-title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from "@/lib/utils";

const GrilleTarifs = forwardRef<HTMLElement, {}>(
  function GrilleTarifs(props, ref) {
    const { trackEvent } = useAnalytics();

    const handleTabClick = (tab: string) => {
      trackEvent('tab_click', { tab, page: 'tarifs' });
    };

    const handlePriceCardClick = (service: string) => {
      trackEvent('price_card_click', { service, page: 'tarifs' });
    };

    const handlePackageClick = (packageType: string) => {
      trackEvent('package_click', { package: packageType, page: 'tarifs' });
    };

    return (
      <section
        ref={ref}
        id="grille-tarifs"
        className="py-16 lg:py-20 section-bg-2"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Notre grille tarifaire
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Des tarifs fixes et transparents pour tous nos services d'accompagnement social
            </p>
          </div>

          <Tabs defaultValue="individual" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger 
                  value="individual"
                  onClick={() => handleTabClick('individual')}
                >
                  Services individuels
                </TabsTrigger>
                <TabsTrigger 
                  value="packages"
                  onClick={() => handleTabClick('packages')}
                >
                  Forfaits
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="individual" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PriceCard
                  title="Entretien de rencontre"
                  price="15€"
                  description="Premier contact pour évaluer vos besoins"
                  features={[
                    "Durée : 45 minutes",
                    "Évaluation de la situation",
                    "Orientation personnalisée",
                    "Plan d'accompagnement"
                  ]}
                  icon={<Users className="w-6 h-6" />}
                  color="primary"
                  onAction={() => handlePriceCardClick('entretien-rencontre')}
                />

                <PriceCard
                  title="Analyse de situation"
                  price="15€"
                  description="Analyse approfondie de votre problématique"
                  features={[
                    "Durée : 1 heure",
                    "Diagnostic complet",
                    "Identification des solutions",
                    "Rapport détaillé"
                  ]}
                  icon={<Target className="w-6 h-6" />}
                  color="secondary"
                  onAction={() => handlePriceCardClick('analyse-situation')}
                />

                <PriceCard
                  title="Projet éducatif personnalisé"
                  price="15€"
                  description="Élaboration d'un plan d'action sur mesure"
                  features={[
                    "Durée : 1 heure",
                    "Objectifs personnalisés",
                    "Étapes définies",
                    "Indicateurs de suivi"
                  ]}
                  icon={<Info className="w-6 h-6" />}
                  color="accent"
                  onAction={() => handlePriceCardClick('projet-educatif')}
                />

                <PriceCard
                  title="Accompagnement éducatif"
                  price="36€"
                  description="Séance d'accompagnement individuel"
                  features={[
                    "Durée : 1 heure",
                    "Suivi personnalisé",
                    "Outils adaptés",
                    "Compte-rendu détaillé"
                  ]}
                  icon={<Clock className="w-6 h-6" />}
                  color="primary"
                  popular={true}
                  onAction={() => handlePriceCardClick('accompagnement-educatif')}
                />

                <PriceCard
                  title="Entretien motivationnel"
                  price="36€"
                  description="Séance de motivation et de soutien"
                  features={[
                    "Durée : 1 heure",
                    "Techniques motivationnelles",
                    "Renforcement positif",
                    "Suivi des objectifs"
                  ]}
                  icon={<Zap className="w-6 h-6" />}
                  color="secondary"
                  onAction={() => handlePriceCardClick('entretien-motivationnel')}
                />
              </div>
            </TabsContent>

            <TabsContent value="packages" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PackageCard
                  title="Forfait 6 heures"
                  price="192€"
                  originalPrice="216€"
                  pricePerHour="32€"
                  savings="24€"
                  description="Idéal pour un accompagnement court terme"
                  features={[
                    "6 séances d'1 heure",
                    "Économie de 4€ par séance",
                    "Suivi personnalisé",
                    "Rapport de fin d'accompagnement",
                    "Validité : 3 mois"
                  ]}
                  color="primary"
                  onAction={() => handlePackageClick('6h')}
                />

                <PackageCard
                  title="Forfait 12 heures"
                  price="336€"
                  originalPrice="432€"
                  pricePerHour="28€"
                  savings="96€"
                  description="Le choix le plus populaire"
                  features={[
                    "12 séances d'1 heure",
                    "Économie de 8€ par séance",
                    "Suivi approfondi",
                    "Bilans intermédiaires",
                    "Validité : 6 mois"
                  ]}
                  color="secondary"
                  popular={true}
                  onAction={() => handlePackageClick('12h')}
                />

                <PackageCard
                  title="Forfait 24 heures"
                  price="576€"
                  originalPrice="864€"
                  pricePerHour="24€"
                  savings="288€"
                  description="Pour un accompagnement complet"
                  features={[
                    "24 séances d'1 heure",
                    "Économie de 12€ par séance",
                    "Suivi intensif",
                    "Bilans mensuels",
                    "Validité : 12 mois"
                  ]}
                  color="accent"
                  onAction={() => handlePackageClick('24h')}
                />
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 text-center">
                <h3 className="heading-3 mb-4">Pourquoi choisir un forfait ?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-alegreya font-semibold mb-2">Économies importantes</h4>
                    <p className="body-text-small text-muted-foreground">Jusqu'à 33% d'économies sur le tarif horaire</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                      <Target className="w-6 h-6 text-secondary" />
                    </div>
                    <h4 className="font-alegreya font-semibold mb-2">Suivi régulier</h4>
                    <p className="body-text-small text-muted-foreground">Un accompagnement continu pour de meilleurs résultats</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="font-alegreya font-semibold mb-2">Flexibilité</h4>
                    <p className="body-text-small text-muted-foreground">Utilisez vos séances selon votre rythme</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    );
  }
);

interface PriceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'accent';
  popular?: boolean;
  onAction?: () => void;
}

function PriceCard({ title, price, description, features, icon, color, popular = false, onAction }: PriceCardProps) {
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
      className={`relative bg-gradient-to-br ${colorClasses[color]} border-0 hover:shadow-lg transition-all duration-300 cursor-pointer ${popular ? 'ring-2 ring-primary' : ''}`}
      onClick={onAction}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
            Le plus choisi
          </span>
        </div>
      )}
      <CardHeader>
        <div className={`w-12 h-12 ${iconColorClasses[color]} rounded-full flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <CardTitle className="font-alegreya">{title}</CardTitle>
        <div className="text-2xl font-bold text-primary">{price}</div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface PackageCardProps {
  title: string;
  price: string;
  originalPrice: string;
  pricePerHour: string;
  savings: string;
  description: string;
  features: string[];
  color: 'primary' | 'secondary' | 'accent';
  popular?: boolean;
  onAction?: () => void;
}

function PackageCard({ title, price, originalPrice, pricePerHour, savings, description, features, color, popular = false, onAction }: PackageCardProps) {
  const colorClasses = {
    primary: "from-primary/10 to-primary/5 border-primary/20",
    secondary: "from-secondary/10 to-secondary/5 border-secondary/20",
    accent: "from-accent/10 to-accent/5 border-accent/20"
  };

  return (
    <Card 
      className={`relative bg-gradient-to-br ${colorClasses[color]} border-0 hover:shadow-lg transition-all duration-300 cursor-pointer ${popular ? 'ring-2 ring-secondary scale-105' : ''}`}
      onClick={onAction}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-secondary text-secondary-foreground text-xs font-medium py-1 px-3 rounded-full">
            Recommandé
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-alegreya">{title}</CardTitle>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-primary">{price}</div>
          <div className="text-sm text-muted-foreground line-through">{originalPrice}</div>
          <div className="text-sm">Soit <span className="font-semibold">{pricePerHour}/heure</span></div>
          <div className="text-sm text-green-600 font-medium">Économie de {savings}</div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-6 rounded-full" variant={popular ? "default" : "outline"} asChild>
          <Link href="/contact">
            Choisir ce forfait
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default GrilleTarifs;