/**
 * components/layout/Header/NavLink.tsx
 * Composant lien de navigation optimisé
 */
import { memo } from "react";
import { cn } from "@/lib/utils";
import { NavLinkProps } from "./types";

const NavLink = memo(function NavLink({ 
  href, 
  label, 
  ariaLabel, 
  isActive, 
  onClick, 
  className 
}: NavLinkProps) {
  return (
    <button
      type="button"
      className={cn(
        "nav-text text-foreground/80 transition-colors duration-150",
        "hover:text-primary bg-transparent border-0 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isActive && "text-primary font-semibold",
        className
      )}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      aria-label={ariaLabel || `Aller à la section ${label}`}
    >
      {label}
    </button>
  );
});

export default NavLink;