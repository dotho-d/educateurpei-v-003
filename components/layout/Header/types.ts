/**
 * components/layout/Header/types.ts
 * Types TypeScript pour les composants Header
 */

export interface NavigationLink {
    readonly href: `#${string}`;
    readonly label: string;
    readonly ariaLabel?: string;
    readonly id: string;
  }
  
  export interface HeaderProps {
    className?: string;
  }
  
  export interface NavigationProps {
    currentSection: string;
    onNavigate: (sectionId: string) => void;
  }
  
  export interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    currentSection: string;
    onNavigate: (sectionId: string) => void;
  }
  
  export interface ActionsProps {
    onMenuToggle: () => void;
    onNavigate: (sectionId: string) => void;
  }
  
  export interface NavLinkProps {
    href: string;
    label: string;
    ariaLabel?: string;
    isActive: boolean;
    onClick: () => void;
    className?: string;
  }