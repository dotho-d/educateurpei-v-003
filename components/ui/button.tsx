/**
 * button.tsx
 * Composant de bouton personnalisé avec plusieurs variantes et tailles
 * Basé sur Radix UI et personnalisé pour le design du site
 */

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

import styles from "./styles/Button.module.css";

// Définition des variantes de bouton avec class-variance-authority
const buttonVariants = cva(
  styles.base,
  {
    variants: {
      variant: {
        default: styles.default,
        destructive: styles.destructive,
        outline: styles.outline,
        secondary: styles.secondary,
        ghost: styles.ghost,
        link: styles.link,
      },
      size: {
        default: "",
        sm: styles.sm,
        lg: styles.lg,
        icon: styles.icon,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Interface définissant les props du bouton
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Indique si le bouton doit agir comme un enfant */
  asChild?: boolean;
}

/**
 * Composant Button
 * Bouton personnalisé avec différentes variantes et tailles
 * Supporte l'option asChild pour envelopper d'autres éléments
 * Amélioré pour l'accessibilité avec focus visible
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Utilise Slot de Radix UI si asChild est true, sinon utilise un bouton standard
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        aria-disabled={props.disabled}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };