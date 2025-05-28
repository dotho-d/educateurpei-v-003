/**
 * components/layout/Header/Actions.tsx
 * CORRECTION - Visibilité stricte par breakpoint
 */
import { memo } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionsProps } from "./types";
import ThemeToggle from "./ThemeToggle";

interface ActionsComponentProps extends ActionsProps {
  isMenuOpen: boolean;
}

const Actions = memo(function Actions({ 
  onMenuToggle, 
  onNavigate, 
  isMenuOpen 
}: ActionsComponentProps) {
  return (
    <div className="flex items-center ml-auto">
      
      {/* ✅ Desktop Actions - UN SEUL ThemeToggle ici */}
      <div className="hidden lg:flex items-center gap-4">
        <button
          type="button"
          className={cn(
            "relative text-foreground transition-all duration-300",
            "px-4 py-2 rounded-[var(--button-radius)] bg-transparent border-0 cursor-pointer",
            "hover:text-primary-foreground group",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          )}
          onClick={() => onNavigate('contact')}
          aria-label="Prendre rendez-vous"
        >
          <span className="nav-text relative z-10">Prendre RDV</span>
          <span 
            className={cn(
              "absolute inset-0 bg-primary rounded-[var(--button-radius)] -z-10",
              "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            )}
            aria-hidden="true"
          />
        </button>
        
        {/* ThemeToggle UNIQUEMENT pour desktop */}
        <ThemeToggle />
      </div>

      {/* ✅ Mobile Controls - Forcer le masquage sur lg+ */}
      <div className="flex items-center lg:!hidden">
        {/* ThemeToggle UNIQUEMENT pour mobile */}
        <ThemeToggle className="mr-2" />
        
        <button 
          onClick={onMenuToggle} 
          className={cn(
            "bg-transparent text-foreground rounded-full inline-flex items-center justify-center p-2",
            "transition-all duration-200 hover:bg-primary/10 hover:text-primary border-0 cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          )}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? 
            <X className="w-6 h-6" aria-hidden="true" /> : 
            <Menu className="w-6 h-6" aria-hidden="true" />
          }
        </button>
      </div>
      
    </div>
  );
});

export default Actions;

// ========================================
// SOLUTION ALTERNATIVE : Conditional Rendering
// ========================================

/**
 * Version avec conditional rendering côté client
 * Plus robuste si Tailwind pose problème
 */
import { useBreakpoint } from "@/hooks/useBreakpoint";

const ActionsAlternative = memo(function Actions({ 
  onMenuToggle, 
  onNavigate, 
  isMenuOpen 
}: ActionsComponentProps) {
  const { isLargeScreen } = useBreakpoint(); // lg et plus

  return (
    <div className="flex items-center ml-auto">
      {isLargeScreen ? (
        // Desktop uniquement
        <div className="flex items-center gap-4">
          <button
            type="button"
            className={cn(
              "relative text-foreground transition-all duration-300",
              "px-4 py-2 rounded-[var(--button-radius)] bg-transparent border-0 cursor-pointer",
              "hover:text-primary-foreground group",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
            onClick={() => onNavigate('contact')}
            aria-label="Prendre rendez-vous"
          >
            <span className="nav-text relative z-10">Prendre RDV</span>
            <span 
              className={cn(
                "absolute inset-0 bg-primary rounded-[var(--button-radius)] -z-10",
                "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              )}
              aria-hidden="true"
            />
          </button>
          <ThemeToggle />
        </div>
      ) : (
        // Mobile/Tablet uniquement
        <div className="flex items-center">
          <ThemeToggle className="mr-2" />
          <button 
            onClick={onMenuToggle} 
            className={cn(
              "bg-transparent text-foreground rounded-full inline-flex items-center justify-center p-2",
              "transition-all duration-200 hover:bg-primary/10 hover:text-primary border-0 cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? 
              <X className="w-6 h-6" aria-hidden="true" /> : 
              <Menu className="w-6 h-6" aria-hidden="true" />
            }
          </button>
        </div>
      )}
    </div>
  );
});