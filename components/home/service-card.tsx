/**
 * service-card.tsx
 * Composant réutilisable pour afficher une carte de service avec icône, titre et description
 * VERSION OPTIMISÉE : Tailwind pur, suppression des CSS Modules
 */

import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  /** Icône à afficher en haut de la carte */
  icon: ReactNode;
  /** Titre du service */
  title: string;
  /** Description détaillée du service */
  description: string;
  /** Identifiant unique pour l'accessibilité */
  id?: string;
  /** Classe CSS additionnelle */
  className?: string;
}

/**
 * Composant ServiceCard
 * Affiche une carte de service avec une icône, un titre et une description
 * Inclut des effets de survol pour améliorer l'interactivité
 */
export default function ServiceCard({ 
  icon, 
  title, 
  description, 
  id,
  className 
}: ServiceCardProps) {
  // Générer un ID unique si non fourni
  const cardId = id || `service-${title.toLowerCase().replace(/\s+/g, '-')}`;
  // ID dérivé pour le titre
  const titleId = `${cardId}-title`;

  return (
    <Card 
      className={cn(
        // Styles de base
        "rounded-3xl overflow-hidden transition-all duration-300 border-0",
        "bg-gradient-to-br from-background to-primary/5",
        // Effets de hover
        "hover:shadow-xl hover:-translate-y-2",
        // Focus et accessibilité
        "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        // Classe additionnelle
        className
      )}
      tabIndex={0}
      aria-labelledby={titleId}
    >
      <CardHeader className="px-3 sm:px-4 pt-4 sm:pt-6">
        <div className="flex justify-center mb-4" aria-hidden="true">
          {icon}
        </div>
        <h3 
          id={titleId} 
          className={cn(
            "font-alegreya text-xl font-semibold tracking-wide leading-tight",
            "text-center mb-2"
          )}
        >
          {title}
        </h3>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 pt-0">
        <p className={cn(
          "font-brawler text-sm leading-relaxed text-center",
          "text-muted-foreground"
        )}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}