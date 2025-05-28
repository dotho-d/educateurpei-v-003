/**
 * components/layout/Header/index.tsx
 * Header optimisé avec memoization et performance améliorée
 */
import { memo, useMemo } from "react";
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

  // Memoization des classes CSS pour éviter les recalculs
  const headerClasses = useMemo(() => cn(
    // Base styles
    "fixed top-0 w-full z-50 transition-all duration-300",
    "h-16 sm:h-18 md:h-20 lg:h-20",
    // Conditional styles based on scroll state
    isScrolled 
      ? "bg-background/95 backdrop-blur-sm shadow-sm" 
      : "bg-background/50 backdrop-blur-sm",
    className
  ), [isScrolled, className]);

  const containerClasses = useMemo(() => cn(
    "w-[90%] max-w-[1400px] mx-auto h-full",
    "flex justify-between items-center pr-1 pl-4"
  ), []);

  // Memoization des props pour éviter les re-renders inutiles
  const navigationProps = useMemo(() => ({
    currentSection,
    onNavigate: scrollToSection
  }), [currentSection, scrollToSection]);

  const actionsProps = useMemo(() => ({
    onMenuToggle: toggleMenu,
    onNavigate: scrollToSection,
    isMenuOpen
  }), [toggleMenu, scrollToSection, isMenuOpen]);

  const mobileMenuProps = useMemo(() => ({
    isOpen: isMenuOpen,
    onClose: closeMenu,
    currentSection,
    onNavigate: scrollToSection
  }), [isMenuOpen, closeMenu, currentSection, scrollToSection]);

  return (
    <header className={headerClasses} role="banner">
      <div className={containerClasses}>
        <Logo />
        <Navigation {...navigationProps} />
        <Actions {...actionsProps} />
      </div>
      <MobileMenu {...mobileMenuProps} />
    </header>
  );
});

export default Header;