/**
 * cta-section.tsx
 * Composant de call-to-action avec Tailwind pur
 */

import { Calendar } from 'lucide-react';
import Link from 'next/link';
import React, { forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import Section from '@/components/ui/section';
import { cn } from '@/lib/utils';

/**
 * Composant Call-to-Action
 * Affiche un appel à l'action pour contacter le service
 */
const CTASection = forwardRef<HTMLElement, {}>(function CTASection(props, ref) {
  return (
    <section
      ref={ref}
      id="contact"
      className={cn(
        "py-16 lg:py-24 flex items-center justify-center section-bg-1"
      )}
    >
      <div className={cn(
        "w-full px-4",
        "max-w-[80%] sm:max-w-[72%] md:max-w-[48rem] lg:max-w-[56rem] xl:max-w-[76%]",
        "mx-auto"
      )}>
        <div className={cn(
          "bg-gradient-to-r from-primary/20 to-accent/20",
          "rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12",
          "shadow-xl text-center"
        )}>
          <h2 className="heading-2 mb-4">
            Prêt à commencer ?
          </h2>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
            Contactez-nous dès aujourd&apos;hui pour un premier entretien gratuit
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="nav-text py-4 sm:py-6 px-4 sm:px-8 border-2 shadow-md rounded-btn w-fit self-center"
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
});

CTASection.displayName = 'CTASection';

export default CTASection;