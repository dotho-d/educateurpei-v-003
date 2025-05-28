/**
 * components/layout/Header/Navigation.tsx
 * Composant navigation desktop optimisé avec memoization
 */

import { memo, useMemo } from "react";

import { NAVIGATION_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import NavLink from "./NavLink";
import { NavigationProps } from "./types";

const Navigation = memo(function Navigation({ 
  currentSection, 
  onNavigate 
}: NavigationProps) {
  // Memoized navigation items pour éviter re-création
  const navigationItems = useMemo(() => 
    NAVIGATION_LINKS.map((link) => ({
      ...link,
      isActive: link.id === currentSection,
      onClick: () => onNavigate(link.id)
    })),
    [currentSection, onNavigate]
  );

  return (
    <nav 
      className={cn(
        "hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-8"
      )}
      aria-label="Navigation principale"
    >
      <ul className="flex space-x-8" role="menubar">
        {navigationItems.map((item) => (
          <li key={item.href} role="none">
            <NavLink
              href={item.href}
              label={item.label}
              ariaLabel={item.ariaLabel}
              isActive={item.isActive}
              onClick={item.onClick}
              role="menuitem"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Navigation;