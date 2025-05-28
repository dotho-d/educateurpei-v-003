/**
 * components/layout/Header/MobileMenu.tsx
 * Composant menu mobile optimisé avec memoization
 */

import Link from "next/link";
import { memo, useRef, useEffect, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { useFontSizes } from "@/hooks/useFontSizes";
import { NAVIGATION_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { MobileMenuProps } from "./types";


const MobileMenu = memo(function MobileMenu({ 
  isOpen, 
  onClose, 
  currentSection, 
  onNavigate 
}: MobileMenuProps) {
  const fontSizes = useFontSizes();
  const firstMenuItemRef = useRef<HTMLButtonElement>(null);
  const lastMenuItemRef = useRef<HTMLAnchorElement>(null);

  // Memoized navigation items
  const navigationItems = useMemo(() => 
    NAVIGATION_LINKS.map((link, index) => ({
      ...link,
      isActive: link.id === currentSection,
      isFirst: index === 0,
      ref: index === 0 ? firstMenuItemRef : undefined
    })),
    [currentSection]
  );

  // Focus management optimisé
  useEffect(() => {
    if (isOpen && firstMenuItemRef.current) {
      const timer = setTimeout(() => {
        firstMenuItemRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard navigation memoized
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstMenuItemRef.current) {
        e.preventDefault();
        lastMenuItemRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === lastMenuItemRef.current) {
        e.preventDefault();
        firstMenuItemRef.current?.focus();
      }
    }
  }, [onClose]);

  // Memoized navigate handler
  const handleNavigate = useCallback((sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  }, [onNavigate, onClose]);

  // Memoized container classes
  const containerClasses = useMemo(() => cn(
    "absolute top-16 sm:top-16 md:top-20 left-0 right-0 z-40",
    "w-full h-fit bg-background shadow-lg overflow-visible",
    "border-b border-border rounded-b-2xl animate-fadeIn"
  ), []);

  if (!isOpen) return null;

  return (
    <nav 
      id="mobile-menu"
      className={containerClasses}
      aria-label="Menu principal mobile"
      aria-hidden={!isOpen}
      tabIndex={-1}
      onKeyDown={handleMenuKeyDown}
      role="navigation"
    >
      <div className={cn(
        "w-[90%] max-w-[90%] mx-auto pt-8 pb-8",
        "flex flex-col items-center gap-6"
      )}>
        <ul className="w-full space-y-4" role="menu">
          {navigationItems.map((item) => (
            <li key={item.href} className="w-full" role="none">
              <button
                ref={item.ref}
                type="button"
                className={cn(
                  "font-caveat text-center transition-colors duration-200",
                  "py-2 w-full block hover:text-primary bg-transparent border-0 cursor-pointer",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  item.isActive && "text-primary font-semibold"
                )}
                style={{ fontSize: fontSizes.navLink }}
                onClick={() => handleNavigate(item.id)}
                tabIndex={isOpen ? 0 : -1}
                aria-current={item.isActive ? 'page' : undefined}
                aria-label={item.ariaLabel}
                role="menuitem"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        
        <div className={cn(
          "pt-6 mt-4 flex flex-col items-center gap-5 w-fit mx-auto",
          "border-t border-border/30"
        )}>
          <Button className="btn-primary w-fit" asChild>
            <button 
              type="button"
              onClick={() => handleNavigate('contact')}
              className="font-caveat"
              style={{ fontSize: fontSizes.button }}
              role="menuitem"
            >
              Prendre RDV
            </button>
          </Button>
          <Button 
            variant="outline" 
            className={cn(
              "rounded-[var(--button-radius)] border-primary text-primary",
              "hover:bg-primary/10 w-fit py-3 px-5"
            )}
            asChild
          >
            <Link 
              href="/connexion" 
              onClick={onClose}
              className="font-caveat"
              style={{ fontSize: fontSizes.button }}
              ref={lastMenuItemRef}
              role="menuitem"
            >
              Connexion
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
});

export default MobileMenu;