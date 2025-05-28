/**
 * service-card.tsx
 * Composant ServiceCard optimisé avec memoization et performance améliorée
 */

import { ReactNode, memo, useMemo } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  /** Icône à afficher en haut de la carte */
  readonly icon: ReactNode;
  /** Titre du service */
  readonly title: string;
  /** Description détaillée du service */
  readonly description: string;
  /** Identifiant unique pour l'accessibilité */
  readonly id?: string;
  /** Classe CSS additionnelle */
  readonly className?: string;
  /** Catégorie pour le style de l'icône */
  readonly category?: 'primary' | 'secondary' | 'accent';
}

/**
 * Composant ServiceCard optimisé avec memoization
 * Évite les re-renders inutiles et améliore les performances
 */
export const ServiceCard = memo(function ServiceCard({ 
  icon, 
  title, 
  description, 
  id,
  className,
  category = 'primary'
}: ServiceCardProps) {
  // Memoized computed values pour éviter recalculs
  const cardId = useMemo(
    () => id || `service-${title.toLowerCase().replace(/\s+/g, '-')}`,
    [id, title]
  );

  const titleId = useMemo(
    () => `${cardId}-title`,
    [cardId]
  );

  // Memoized icon container classes
  const iconContainerClasses = useMemo(() => cn(
    "mx-auto w-12 h-12 rounded-full flex items-center justify-center",
    "transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
    {
      'bg-primary/10 text-primary': category === 'primary',
      'bg-secondary/10 text-secondary': category === 'secondary',
      'bg-accent/10 text-accent': category === 'accent'
    }
  ), [category]);

  // Memoized card classes
  const cardClasses = useMemo(() => cn(
    // Base styles optimisés
    "group relative overflow-hidden transition-all duration-300",
    "bg-gradient-to-br from-background to-primary/5",
    "border-0 rounded-3xl shadow-sm hover:shadow-xl",
    "hover:-translate-y-2 focus-within:ring-2 focus-within:ring-primary",
    "focus-within:ring-offset-2 cursor-default",
    className
  ), [className]);

  return (
    <Card 
      className={cardClasses}
      tabIndex={0}
      aria-labelledby={titleId}
      role="article"
    >
      <CardHeader className="space-y-4 p-6">
        <div className={iconContainerClasses} aria-hidden="true">
          {icon}
        </div>
        <h3 
          id={titleId}
          className="font-alegreya text-xl font-semibold text-center leading-tight"
        >
          {title}
        </h3>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <p className="text-sm text-center text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
});

export default ServiceCard;