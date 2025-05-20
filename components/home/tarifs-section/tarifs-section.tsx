/**
 * tarifs-section.tsx
 * Composant représentant la section des tarifs proposés sur la page d'accueil
 */
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import styles from './styles/TarifsSection.module.css';

/**
 * Composant de la section des tarifs
 * Affiche les différents tarifs proposés sous forme de cartes
 */
const TarifsSection: React.FC = () => {
  return (
    <section id="tarifs" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className="typography-h2 mb-4">
            Nos tarifs
          </h2>
          <p className="typography-body text-muted-foreground max-w-2xl mx-auto">
            Des tarifs adaptés à vos besoins et à votre situation
          </p>
        </div>

        {/* Cartes de tarification */}
        <div className={styles.cardsGrid}>
          <Card priceCard roundedCard hoverScale noBorder>
            <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
              <CardTitle className="text-xl text-center font-alegreya">Évaluation initiale</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-primary/10">
                <span className="typography-body-small text-muted-foreground">1er entretien de rencontre</span>
                <span className="price-display text-xl">Gratuit</span>
              </div>
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-primary/10">
                <span className="typography-body-small text-muted-foreground">Entretiens de rencontre complémentaires</span>
                <span className="price-display text-2xl">15€</span>
              </div>
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-primary/10">
                <span className="typography-body-small text-muted-foreground">Analyse de la situation</span>
                <span className="price-display text-2xl">15€</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="typography-body-small text-muted-foreground">Rédaction d'un projet éducatif personnalisé</span>
                <span className="price-display text-2xl">15€</span>
              </div>
            </CardContent>
          </Card>

          <Card priceCard roundedCard hoverScale noBorder secondary>
            <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
              <CardTitle className="text-xl text-center font-alegreya">Accompagnement</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
              <div className="bg-secondary/10 rounded-xl p-3 mb-3">
                <div className="text-center mb-2">
                  <span className="text-4xl font-cormorant font-semibold">36€</span>
                  <span className="text-sm text-muted-foreground ml-1">/ heure</span>
                </div>
                <div className="text-center text-muted-foreground">
                  <p className="typography-body-medium">Accompagnement éducatif</p>
                  <p className="typography-body-medium">Entretiens motivationnels</p>
                </div>
              </div>
              <div className="text-center text-muted-foreground mb-3">
                <p className="typography-body-small">
                  Idéal pour des entretiens ponctuels, en fonction du besoin.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card priceCard roundedCard hoverScale noBorder accent className="md:col-span-1 col-span-full">
            <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
              <CardTitle className="text-xl text-center font-alegreya">Forfait</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
              <div className="bg-accent/10 rounded-xl p-3 mb-3">
                <div className="text-center mb-2">
                  <span className="text-4xl font-cormorant font-semibold">192€</span>
                </div>
                <div className="text-center text-muted-foreground">
                  <p className="typography-body-medium">soit, 6 séances à <span className="font-cormorant font-medium text-[24px]">32€</span> / la séance</p>
                </div>
              </div>
              <div className="text-center text-muted-foreground mb-3">
                <p className="typography-body-small">
                  Idéal pour un suivi régulier et un accompagnement sur la durée.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={styles.paymentInfo}>
          <p className="typography-body text-muted-foreground mb-6 sm:mb-8">
            Plusieurs modes de paiement acceptés : Espèces, Virement bancaire, CB, Apple Pay, Google Pay
          </p>
          <div className={styles.actionButtonWrapper}>
            <Button 
              variant="default" 
              asChild 
              className="typography-button rounded-btn py-2 px-4 sm:px-6 shadow-md inline-flex w-auto"
            >
              <Link href="/tarifs">
                Voir tous nos tarifs <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TarifsSection;