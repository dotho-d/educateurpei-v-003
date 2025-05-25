/**
 * components/layout/Header/MobileMenu.tsx
 * Composant menu mobile optimisé - VERSION CORRIGÉE
 */
import { memo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileMenuProps } from "./types";
// CHANGEMENT : Import depuis lib/constants au lieu de ./constants
import { NAVIGATION_LINKS } from "@/lib/constants";
import { useFontSizes } from "@/hooks/useFontSizes";

const MobileMenu = memo(function MobileMenu({ 
  isOpen, 
  onClose, 
  currentSection, 
  onNavigate 
}: MobileMenuProps) {
  const fontSizes = useFontSizes();
  const firstMenuItemRef = useRef<HTMLButtonElement>(null);
  const lastMenuItemRef = useRef<HTMLAnchorElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && firstMenuItemRef.current) {
      setTimeout(() => {
        firstMenuItemRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      onClose();
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

  const handleNavigate = useCallback((sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  }, [onNavigate, onClose]);

  if (!isOpen) return null;

  return (
    <nav 
      id="mobile-menu"
      className={cn(
        "absolute top-16 sm:top-16 md:top-20 left-0 right-0 z-40",
        "w-full h-fit bg-background shadow-lg overflow-visible",
        "border-b border-border rounded-b-2xl animate-fadeIn"
      )}
      aria-label="Menu principal mobile"
      aria-hidden={!isOpen}
      tabIndex={-1}
      onKeyDown={handleMenuKeyDown}
    >
      <div className={cn(
        "w-[90%] max-w-[90%] mx-auto pt-8 pb-8",
        "flex flex-col items-center gap-6"
      )}>
        <ul className="w-full space-y-4">
          {/* CHANGEMENT : NAVIGATION_LINKS au lieu de NAV_LINKS */}
          {NAVIGATION_LINKS.map((link, index) => (
            <li key={link.href} className="w-full">
              <button
                ref={index === 0 ? firstMenuItemRef : undefined}
                type="button"
                className={cn(
                  "font-caveat text-center transition-colors duration-200",
                  "py-2 w-full block hover:text-primary bg-transparent border-0 cursor-pointer",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  currentSection === link.id && "text-primary font-semibold"
                )}
                style={{ fontSize: fontSizes.navLink }}
                onClick={() => handleNavigate(link.id)}
                tabIndex={isOpen ? 0 : -1}
                aria-current={link.id === currentSection ? 'page' : undefined}
                aria-label={link.ariaLabel}
              >
                {link.label}
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