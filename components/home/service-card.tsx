/**
 * service-card.tsx
 * Composant réutilisable pour afficher une carte de service avec icône, titre et description
 * Utilisé principalement dans la section services de la page d'accueil
 * Optimisé pour l'accessibilité
 */

import { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import styles from "./styles/ServiceCard.module.css";

interface ServiceCardProps {
  /** Icône à afficher en haut de la carte */
  icon: ReactNode;
  /** Titre du service */
  title: string;
  /** Description détaillée du service */
  description: string;
  /** Identifiant unique pour l'accessibilité */
  id?: string;
}

/**
 * Composant ServiceCard
 * Affiche une carte de service avec une icône, un titre et une description
 * Inclut des effets de survol pour améliorer l'interactivité
 */
export default function ServiceCard({ icon, title, description, id }: ServiceCardProps) {
  // Générer un ID unique si non fourni
  const cardId = id || `service-${title.toLowerCase().replace(/\s+/g, '-')}`;
  // ID dérivé pour le titre
  const titleId = `${cardId}-title`;

  return (
    <Card 
      className={styles.serviceCard} 
      tabIndex={0}
      aria-labelledby={titleId}
    >
      <CardHeader className={styles.serviceCardHeader}>
        <div className={styles.iconContainer} aria-hidden="true">
          {icon}
        </div>
        <h3 id={titleId} className={styles.serviceCardTitle}>
          {title}
        </h3>
      </CardHeader>
      <CardContent className={styles.serviceCardContent}>
        <p className={styles.serviceCardDescription}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}