/**
 * card.tsx
 * Composants Card de base pour l'interface utilisateur
 * Inclut Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
 */
import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './styles/Card.module.css';

// Interface pour les props communes aux composants Card
interface CardBaseProps {
  /** Style secondaire (dégradé secondaire) */
  secondary?: boolean;
  /** Style accent (dégradé accent) */
  accent?: boolean;
  /** Ajoute une bordure arrondie plus prononcée */
  roundedCard?: boolean;
  /** Ajoute un effet d'échelle au survol */
  hoverScale?: boolean;
  /** Ajoute une ombre au survol */
  hoverShadow?: boolean;
  /** Supprime les bordures */
  noBorder?: boolean;
  /** Ajoute le style des cartes de tarification */
  priceCard?: boolean;
}

interface CardProps extends CardBaseProps, React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ 
  className, 
  secondary, 
  accent, 
  roundedCard, 
  hoverScale, 
  hoverShadow, 
  noBorder, 
  priceCard, 
  ...props 
}, ref) => {
  const cardClasses = cn(
    styles.card,
    secondary && styles.secondaryCard,
    accent && styles.accentCard,
    roundedCard && styles.roundedCard,
    hoverScale && styles.hoverScale,
    hoverShadow && styles.hoverShadow,
    noBorder && styles.noBorder,
    priceCard && styles.priceCard,
    className
  );
  
  return <div ref={ref} className={cardClasses} {...props} />;
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.header, className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      styles.title,
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(styles.description, className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.content, className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.footer, className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};