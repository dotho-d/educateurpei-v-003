/**
 * slide-content.tsx
 * Contenu d'un slide avec Tailwind pur
 * VERSION VÉRIFIÉE - Structure correcte pour l'affichage horizontal desktop
 */
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SlideContentProps {
  /**
   * Description du domaine d'intervention
   */
  description: string;
  /**
   * Liste des points clés du domaine
   */
  points: string[];
  /**
   * URL du lien "En savoir plus"
   */
  linkUrl: string;
  /**
   * Texte du lien "En savoir plus"
   */
  linkText: string;
  /**
   * Classe CSS supplémentaire
   */
  className?: string;
}

/**
 * Composant de contenu pour un slide de domaine d'intervention
 */
const SlideContent: React.FC<SlideContentProps> = ({
  description,
  points,
  linkUrl,
  linkText,
  className
}) => {
  return (
    <div className={cn("w-full", className)}>
      {/* STRUCTURE FLEX CORRECTE pour l'affichage horizontal desktop */}
      <div className={cn(
        "flex flex-col lg:flex-row lg:justify-between lg:items-start"
      )}>
        {/* Contenu textuel - 48% sur desktop, 100% sur mobile/tablette */}
        <div className={cn(
          "w-full lg:w-[48%] mb-6 lg:mb-0"
        )}>
          <p 
            className={cn(
              "font-brawler text-[17px] md:text-[18px] leading-6",
              "mb-5 lg:mb-6 text-muted-foreground"
            )}
            data-slideshow-text="description"
          >
            {description}
          </p>
          
          <ul className={cn(
            "list-disc pl-5 mb-5 lg:mb-6"
          )}>
            {points.map((point, index) => (
              <li 
                key={`point-${index}`} 
                className={cn(
                  "font-brawler text-sm md:text-[15px] leading-6 mb-1.5"
                )}
              >
                {point}
              </li>
            ))}
          </ul>
          
          <div className="flex justify-center mt-2">
            <Button variant="outline" asChild className={cn(
              "font-caveat py-2 px-6 rounded-[var(--button-radius)]"
            )}>
              <Link href={linkUrl}>
                {linkText}
              </Link>
            </Button>
          </div>
        </div>

        {/* Image placeholder - 42% sur desktop, masquée en mobile/tablette */}
        <div className={cn(
          "w-full lg:w-[42%] hidden lg:block"
        )}>
          <div className={cn(
            "h-44 rounded-xl overflow-hidden bg-muted/10",
            "flex items-center justify-center"
          )}>
            <div className="p-4 text-center">
              <p className={cn(
                "font-brawler text-sm text-muted-foreground"
              )}>
                Contenu illustratif
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideContent;