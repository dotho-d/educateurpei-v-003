/**
 * services-section.tsx
 * Composant représentant la section des services proposés sur la page d'accueil
 * VERSION OPTIMISÉE : Tailwind pur + constantes centralisées
 */

import { 
  MessageSquare, 
  Calendar, 
  BarChart, 
  CreditCard, 
  Phone, 
  Clock 
} from 'lucide-react';
import React, { forwardRef } from 'react';

import ServiceCard from '@/components/home/service-card';
import Section from '@/components/ui/section';
import SectionTitle from '@/components/ui/section-title';
import { SERVICES_DATA } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Composant de la section des services
 * Affiche les différents services proposés sous forme de grille de cartes
 */
const ServicesSection = forwardRef<HTMLElement, {}>(function ServicesSection(props, ref) {
  // Mapping des icônes pour chaque service
  const iconMap = {
    'soutien-psychologique': <MessageSquare className="w-6 h-6" />,
    'prise-rdv-en-ligne': <Calendar className="w-6 h-6" />,
    'gamification-suivi': <BarChart className="w-6 h-6" />,
    'visioconsultations': <CreditCard className="w-6 h-6" />,
    'astreinte-ai-sms': <Phone className="w-6 h-6" />,
    'astreinte-physique': <Clock className="w-6 h-6" />
  };

  return (
    <Section
      ref={ref}
      id="services"
      background="primary"
      withPadding={true}
    >
      <SectionTitle
        description="Découvrez comment nous pouvons vous accompagner dans vos défis quotidiens"
      >
        Les services proposés
      </SectionTitle>

      {/* Grille de services - VERSION TAILWIND PURE */}
      <div className={cn(
        // Grille responsive
        "grid grid-cols-1 gap-4",
        "sm:grid-cols-2 sm:gap-6",
        "lg:grid-cols-3 lg:gap-8",
        // Container
        "w-full max-w-7xl mx-auto",
        // Espacement
        "mt-8 sm:mt-12"
      )}>
        {SERVICES_DATA.map((service) => (
          <ServiceCard
            key={service.id}
            icon={
              <div className={cn(
                // Container de l'icône
                "w-12 h-12 rounded-full flex items-center justify-center",
                // Couleurs selon la catégorie
                service.category === 'primary' 
                  ? "bg-primary/10 text-primary" 
                  : "bg-accent/10 text-accent"
              )}>
                {iconMap[service.id as keyof typeof iconMap]}
              </div>
            }
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </Section>
  );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;