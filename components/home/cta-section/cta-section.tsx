/**
 * cta-section.tsx
 * Composant de call-to-action en bas de la page d'accueil, invitant à prendre contact
 */

import { Calendar } from 'lucide-react';
import Link from 'next/link';
import React, { forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';

import styles from './styles/CTASection.module.css';

/**
 * Composant Call-to-Action
 * Affiche un appel à l'action pour contacter le service
 */
const CTASection = forwardRef<HTMLElement, {}>(function CTASection(props, ref) {
  return (
    <Section
      ref={ref}
      id="contact"
      background="primary"
      withPadding={true}
      containerSize="sm"
    >
      <div className={styles.ctaCard}>
        <h2 className="typography-h2 mb-4">
          Prêt à commencer ?
        </h2>
        <p className="typography-body text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
          Contactez-nous dès aujourd&apos;hui pour un premier entretien gratuit
        </p>
        <div className={styles.buttonContainer}>
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="typography-button py-4 sm:py-6 px-4 sm:px-8 border-2 shadow-md rounded-btn w-fit self-center"
          >
            <Link href="/contact">
              Prendre rendez-vous
              <Calendar className="ml-2 sm:ml-4 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;