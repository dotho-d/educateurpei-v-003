/**
 * card.tsx
 * Composants Card de base pour l'interface utilisateur
 * Inclut Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
 * Optimisé pour l'accessibilité avec attributs ARIA
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

interface CardProps extends CardBaseProps, React.HTMLAttributes<HTMLDivElement> {
  /** Identifiant pour l'accessibilité */
  ariaLabelledby?: string;
  /** Description pour l'accessibilité */
  ariaDescribedby?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ 
  className, 
  secondary, 
  accent, 
  roundedCard, 
  hoverScale, 
  hoverShadow, 
  noBorder, 
  priceCard,
  ariaLabelledby,
  ariaDescribedby,
  role = "region",
  tabIndex,
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
  
  return (
    <div 
      ref={ref} 
      className={cardClasses}
      role={role}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      tabIndex={tabIndex || 0}
      {...props} 
    />
  );
});
Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.header, className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Niveau de titre (h1-h6) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ 
  className, 
  as: Comp = 'h3',
  ...props 
}, ref) => (
  <Comp
    ref={ref}
    className={cn(styles.title, className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(styles.description, className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(styles.content, className)} 
    {...props} 
  />
));
CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
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