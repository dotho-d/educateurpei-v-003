/**
 * components/layout/Header/index.tsx
 * Composant Header principal optimisé et refactorisé
 */
import { memo } from "react";
import { cn } from "@/lib/utils";
import { useHeader } from "@/hooks/useHeader";
import { HeaderProps } from "./types";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import Actions from "./Actions";

const Header = memo(function Header({ className }: HeaderProps) {
  const {
    isScrolled,
    isMenuOpen,
    currentSection,
    toggleMenu,
    closeMenu,
    scrollToSection
  } = useHeader();

  const headerClasses = cn(
    // Base styles
    "fixed top-0 w-full z-50 transition-all duration-300",
    "h-16 sm:h-18 md:h-20 lg:h-20",
    // Conditional styles based on scroll state
    isScrolled 
      ? "bg-background/95 backdrop-blur-sm shadow-sm" 
      : "bg-background/50 backdrop-blur-sm",
    className
  );

  return (
    <header className={headerClasses} role="banner">
      <div className={cn(
        "w-[90%] max-w-[1400px] mx-auto h-full",
        "flex justify-between items-center pr-1 pl-4"
      )}>
        <Logo />
        
        <Navigation 
          currentSection={currentSection}
          onNavigate={scrollToSection}
        />
        
        <Actions 
          onMenuToggle={toggleMenu}
          onNavigate={scrollToSection}
          isMenuOpen={isMenuOpen}
        />
      </div>

      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={closeMenu}
        currentSection={currentSection}
        onNavigate={scrollToSection}
      />
    </header>
  );
});

export default Header;