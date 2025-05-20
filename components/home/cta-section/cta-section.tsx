/**
 * cta-section.tsx
 * Composant de call-to-action en bas de la page d'accueil, invitant à prendre contact
 */
import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import styles from './styles/CTASection.module.css';

/**
 * Composant Call-to-Action
 * Affiche un appel à l'action pour contacter le service
 */
const CTASection: React.FC = () => {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
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
              className="typography-button py-4 sm:py-6 px-4 sm:px-8 border-2 shadow-md rounded-btn"
            >
              <Link href="/contact">
                Prendre rendez-vous
                <Calendar className="ml-2 sm:ml-4 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;