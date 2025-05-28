"use client";

import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { forwardRef } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useAnalytics } from '@/hooks/useAnalytics';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQContentSectionProps {
  filteredFAQs: FAQItem[];
}

const FAQContentSection = forwardRef<HTMLElement, FAQContentSectionProps>(
  function FAQContentSection({ filteredFAQs }, ref) {
    const { trackEvent } = useAnalytics();

    const handleFAQClick = (faqId: string) => {
      trackEvent('faq_item_click', { faq_id: faqId, page: 'faq' });
    };

    const handleNoResultsCTA = () => {
      trackEvent('no_results_cta_click', { page: 'faq' });
    };

    return (
      <section ref={ref} className="py-16 lg:py-20 section-bg-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border border-border rounded-xl overflow-hidden bg-background"
                  onClick={() => handleFAQClick(faq.id)}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                    <span className="text-left font-alegreya font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="body-text text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-alegreya text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className="body-text text-muted-foreground mb-6">
                Essayez avec d'autres mots-clés ou contactez-nous directement.
              </p>
              <Button asChild className="rounded-full" onClick={handleNoResultsCTA}>
                <Link href="/contact">
                  Nous contacter <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }
);

export default FAQContentSection;