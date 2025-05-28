/**
 * services-section.tsx
 * Composant représentant la section des services avec Tailwind pur
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
    <section
      ref={ref}
      id="services"
      className={cn(
        "py-16 lg:py-16 section-bg-1"
      )}
    >
      <div className={cn(
        "w-full px-4",
        "max-w-[80%] sm:max-w-[72%] md:max-w-[90%] lg:max-w-[76%]",
        "mx-auto"
      )}>
        <div className="text-center mb-8 sm:mb-12 lg:mb-12">
          <SectionTitle
            description="Découvrez comment nous pouvons vous accompagner dans vos défis quotidiens"
          >
            Les services proposés
          </SectionTitle>
        </div>

        {/* Grille de services responsive */}
        <div className={cn(
          "grid gap-4 sm:gap-6 lg:gap-8",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          "mx-auto"
        )}>
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              icon={
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
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
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;