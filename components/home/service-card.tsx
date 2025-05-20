/**
 * service-card.tsx
 * Composant réutilisable pour afficher une carte de service avec icône, titre et description
 * Utilisé principalement dans la section services de la page d'accueil
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
}

/**
 * Composant ServiceCard
 * Affiche une carte de service avec une icône, un titre et une description
 * Inclut des effets de survol pour améliorer l'interactivité
 */
export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className={styles.serviceCard}>
      <CardHeader className={styles.serviceCardHeader}>
        <div className={styles.iconContainer}>
          {icon}
        </div>
        <h3 className={styles.serviceCardTitle}>
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