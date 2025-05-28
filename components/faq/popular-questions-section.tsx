"use client";

import { HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { forwardRef } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';

const PopularQuestionsSection = forwardRef<HTMLElement, {}>(
  function PopularQuestionsSection(props, ref) {
    const { trackEvent } = useAnalytics();

    const handlePopularQuestionClick = (question: string) => {
      trackEvent('popular_question_click', { question, page: 'faq' });
    };

    const handleMainCTA = () => {
      trackEvent('main_cta_click', { action: 'ask_question', page: 'faq' });
    };

    const handleSecondaryCTA = () => {
      trackEvent('secondary_cta_click', { action: 'call_direct', page: 'faq' });
    };

    return (
      <div className="flex flex-col w-full">
        {/* Questions populaires */}
        <section 
          ref={ref}
          id="questions-populaires"
          className="py-16 lg:py-20 section-bg-1"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <SectionTitle>
                Questions les plus populaires
              </SectionTitle>
              <p className="body-text text-muted-foreground max-w-2xl mx-auto">
                Les questions qui reviennent le plus souvent
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PopularQuestionCard
                question="Comment prendre rendez-vous ?"
                answer="Plusieurs options : en ligne 24h/24, par téléphone, ou par SMS"
                category="Rendez-vous"
                link="/contact"
                onAction={() => handlePopularQuestionClick('rdv')}
              />

              <PopularQuestionCard
                question="Quel est le prix du premier entretien ?"
                answer="15€ pour 45 minutes d'entretien de rencontre"
                category="Tarifs"
                link="/tarifs"
                onAction={() => handlePopularQuestionClick('prix')}
              />

              <PopularQuestionCard
                question="Intervenez-vous dans toute l'île ?"
                answer="Secteur de base gratuit + interventions payantes ailleurs"
                category="Zone"
                link="/modalites"
                onAction={() => handlePopularQuestionClick('zone')}
              />

              <PopularQuestionCard
                question="Proposez-vous des consultations en ligne ?"
                answer="Oui, visioconférences sécurisées disponibles"
                category="Services"
                link="/modalites"
                onAction={() => handlePopularQuestionClick('visio')}
              />

              <PopularQuestionCard
                question="Mes données sont-elles sécurisées ?"
                answer="Protection RGPD et secret professionnel garantis"
                category="Sécurité"
                link="/privacy-policies"
                onAction={() => handlePopularQuestionClick('securite')}
              />

              <PopularQuestionCard
                question="Peut-on payer en plusieurs fois ?"
                answer="Oui, facilités de paiement et forfaits disponibles"
                category="Paiement"
                link="/tarifs"
                onAction={() => handlePopularQuestionClick('paiement')}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 section-bg-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12 shadow-xl text-center">
              <h2 className="heading-2 mb-4">
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="body-text text-muted-foreground max-w-2xl mx-auto mb-8">
                Notre équipe est là pour répondre à toutes vos questions spécifiques. N'hésitez pas à nous contacter !
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  asChild 
                  className="rounded-full shadow-md"
                  onClick={handleMainCTA}
                >
                  <Link href="/contact">
                    Poser ma question
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="rounded-full border-2"
                  onClick={handleSecondaryCTA}
                >
                  <Link href="tel:0262XXXXXX">
                    Appeler directement
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

interface PopularQuestionCardProps {
  question: string;
  answer: string;
  category: string;
  link: string;
  onAction?: () => void;
}

function PopularQuestionCard({ question, answer, category, link, onAction }: PopularQuestionCardProps) {
  return (
    <Card 
      className="border-0 bg-gradient-to-br from-background to-primary/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={onAction}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {category}
          </span>
          <HelpCircle className="w-4 h-4 text-muted-foreground" />
        </div>
        <CardTitle className="font-alegreya text-lg leading-tight">{question}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <p className="body-text-small text-muted-foreground">{answer}</p>
        <Button variant="outline" size="sm" asChild className="w-full rounded-full">
          <Link href={link}>
            En savoir plus <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default PopularQuestionsSection;