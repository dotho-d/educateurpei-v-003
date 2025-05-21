/**
 * services-section.tsx
 * Composant représentant la section des services proposés sur la page d'accueil
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

import styles from './styles/ServicesSection.module.css';

/**
 * Composant de la section des services
 * Affiche les différents services proposés sous forme de grille de cartes
 */
const ServicesSection = forwardRef<HTMLElement, {}>(function ServicesSection(props, ref) {
  // Données des services
  const services = [
    {
      icon: <MessageSquare className={styles.icon} />,
      iconStyle: styles.iconPrimary,
      title: "Soutien psychologique",
      description: "Écoute bienveillante pour vous aider à traverser les périodes difficiles"
    },
    {
      icon: <Calendar className={styles.icon} />,
      iconStyle: styles.iconAccent,
      title: "Prise de RDV en ligne",
      description: "Réservez facilement vos rendez-vous depuis notre plateforme en ligne"
    },
    {
      icon: <BarChart className={styles.icon} />,
      iconStyle: styles.iconAccent,
      title: "Gamification et suivi objectif",
      description: "Solution en ligne et application mobile pour suivre vos progrès et atteindre vos objectifs"
    },
    {
      icon: <CreditCard className={styles.icon} />,
      iconStyle: styles.iconPrimary,
      title: "Visioconsultations",
      description: "Pour les accompagnements qui ne nécessitent pas d'interactions directes, les visioconsultations sont possibles"
    },
    {
      icon: <Phone className={styles.icon} />,
      iconStyle: styles.iconPrimary,
      title: "Astreinte AI + SMS / appel",
      description: "Assistance SMS et appel téléphonique pendant les heures d'interventions, assistance IA, 24h / 24, 7 jours / 7"
    },
    {
      icon: <Clock className={styles.icon} />,
      iconStyle: styles.iconPrimary,
      title: "Astreinte physique",
      description: "Disponibilité 24h/24 et 7j/7 avec une intervention par mois (tarifée)"
    }
  ];

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

      {/* Grille de services */}
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <ServiceCard
            key={`service-${index}`}
            icon={
              <div className={`${styles.iconContainer} ${service.iconStyle}`}>
                {service.icon}
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