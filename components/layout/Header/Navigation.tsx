/**
 * components/layout/Header/Navigation.tsx
 * Composant navigation desktop optimisé - VERSION CORRIGÉE
 */
import { memo } from "react";
import { cn } from "@/lib/utils";
import { NavigationProps } from "./types";
// CHANGEMENT : Import depuis lib/constants
import { NAVIGATION_LINKS } from "@/lib/constants";
import NavLink from "./NavLink";

const Navigation = memo(function Navigation({ 
  currentSection, 
  onNavigate 
}: NavigationProps) {
  return (
    <nav 
      className={cn(
        "hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-8"
      )}
      aria-label="Navigation principale"
    >
      <ul className="flex space-x-8">
        {/* CHANGEMENT : NAVIGATION_LINKS au lieu de NAV_LINKS */}
        {NAVIGATION_LINKS.map((link) => (
          <li key={link.href}>
            <NavLink
              href={link.href}
              label={link.label}
              ariaLabel={link.ariaLabel}
              isActive={link.id === currentSection}
              onClick={() => onNavigate(link.id)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Navigation;