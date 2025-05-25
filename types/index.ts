/**
 * types/index.ts
 * Types TypeScript centralisés pour l'application
 */

// Types de base
export interface NavigationLink {
    readonly href: `#${string}`;
    readonly label: string;
    readonly ariaLabel?: string;
    readonly id: string;
  }
  
  export interface SiteConfig {
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly author: string;
    readonly email: string;
    readonly phone: string;
    readonly address: {
      readonly street: string;
      readonly city: string;
      readonly postalCode: string;
      readonly region: string;
      readonly country: string;
      readonly latitude: number;
      readonly longitude: number;
    };
    readonly social: {
      readonly facebook: string;
      readonly instagram: string;
      readonly twitter: string;
    };
    readonly openingHours: readonly string[];
    readonly priceRange: string;
  }
  
  // Types pour les services
  export interface ServiceData {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly category: 'primary' | 'secondary' | 'accent';
  }
  
  // Types pour les domaines d'intervention
  export interface DomaineData {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly points: readonly string[];
    readonly linkUrl: string;
    readonly linkText: string;
  }
  
  // Types pour les tarifs
  export interface TariffItem {
    readonly name: string;
    readonly price: number | 'free';
  }
  
  export interface TariffData {
    readonly id: string;
    readonly name: string;
    readonly price?: number;
    readonly unit?: string;
    readonly originalPrice?: number;
    readonly sessions?: number;
    readonly pricePerSession?: number;
    readonly description?: string;
    readonly subtitle?: string;
    readonly items?: readonly TariffItem[];
    readonly category: 'evaluation' | 'hourly' | 'package';
    readonly highlighted?: boolean;
  }
  
  // Types pour le ticker
  export interface TickerItem {
    readonly text: string;
  }
  
  // Types pour les composants
  export interface SectionProps {
    readonly id?: string;
    readonly className?: string;
    readonly background?: 'primary' | 'secondary' | 'muted';
    readonly withPadding?: boolean;
    readonly containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    readonly children: React.ReactNode;
  }
  
  export interface HeaderProps {
    readonly className?: string;
  }
  
  export interface NavigationProps {
    readonly currentSection: string;
    readonly onNavigate: (sectionId: string) => void;
  }
  
  export interface MobileMenuProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly currentSection: string;
    readonly onNavigate: (sectionId: string) => void;
  }
  
  export interface ActionsProps {
    readonly onMenuToggle: () => void;
    readonly onNavigate: (sectionId: string) => void;
  }
  
  export interface NavLinkProps {
    readonly href: string;
    readonly label: string;
    readonly ariaLabel?: string;
    readonly isActive: boolean;
    readonly onClick: () => void;
    readonly className?: string;
  }
  
  // Types pour les hooks
  export interface UseScrollStateOptions {
    readonly threshold?: number;
    readonly throttle?: number;
  }
  
  export interface UseDisclosureReturn {
    readonly isOpen: boolean;
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  }
  
  export interface UseBreakpointReturn {
    readonly breakpoint: BreakpointName | null;
    readonly width: number | null;
    readonly isXs: boolean;
    readonly isSm: boolean;
    readonly isMd: boolean;
    readonly isLg: boolean;
    readonly isXl: boolean;
    readonly is2Xl: boolean;
    readonly isMobile: boolean;
    readonly isTablet: boolean;
    readonly isDesktop: boolean;
    readonly isSmallScreen: boolean;
    readonly isLargeScreen: boolean;
  }
  
  export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  // Types pour les erreurs
  export interface ErrorBoundaryProps {
    readonly children: React.ReactNode;
    readonly fallback?: React.ReactNode;
    readonly onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    readonly componentName?: string;
  }
  
  // Types pour l'état global
  export interface AppState {
    readonly theme: 'light' | 'dark' | 'system';
    readonly currentSection: string;
    readonly isMenuOpen: boolean;
    readonly isLoading: boolean;
  }
  
  export type AppAction = 
    | { type: 'SET_THEME'; payload: AppState['theme'] }
    | { type: 'SET_CURRENT_SECTION'; payload: string }
    | { type: 'TOGGLE_MENU' }
    | { type: 'SET_LOADING'; payload: boolean };
  
  // Types pour les formulaires
  export interface ContactFormData {
    readonly name: string;
    readonly email: string;
    readonly phone?: string;
    readonly subject: string;
    readonly message: string;
    readonly consent: boolean;
    readonly newsletter?: boolean;
  }
  
  export interface NewsletterFormData {
    readonly email: string;
    readonly consent: boolean;
  }
  
  export interface AppointmentFormData {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly service: 'handicap' | 'familiales' | 'addictions' | 'administratif-social' | 'insertion-professionnelle' | 'autre';
    readonly date: string;
    readonly time: string;
    readonly message?: string;
    readonly consent: boolean;
  }
  
  // Types pour l'API
  export interface ApiResponse<T = any> {
    readonly success: boolean;
    readonly data?: T;
    readonly error?: string;
    readonly message?: string;
  }
  
  export interface ValidationResult<T> {
    readonly success: boolean;
    readonly data?: T;
    readonly errors?: readonly string[];
  }
  
  // Types pour les métadonnées
  export interface SeoData {
    readonly title: string;
    readonly description: string;
    readonly keywords?: string;
    readonly canonical?: string;
    readonly openGraph?: {
      readonly title: string;
      readonly description: string;
      readonly image?: string;
      readonly url: string;
    };
  }
  
  // Types pour les composants d'image
  export interface OptimizedImageProps {
    readonly src: string;
    readonly alt: string;
    readonly width?: number;
    readonly height?: number;
    readonly className?: string;
    readonly priority?: boolean;
    readonly quality?: number;
    readonly sizes?: string;
    readonly fill?: boolean;
    readonly fallbackSrc?: string;
    readonly showErrorMessage?: boolean;
    readonly errorMessage?: string;
    readonly loadingClassName?: string;
    readonly errorClassName?: string;
    readonly placeholder?: 'blur' | 'empty';
    readonly blurDataURL?: string;
  }
  
  // Types pour les cartes
  export interface CardProps {
    readonly className?: string;
    readonly children: React.ReactNode;
    readonly priceCard?: boolean;
    readonly roundedCard?: boolean;
    readonly hoverScale?: boolean;
    readonly noBorder?: boolean;
    readonly secondary?: boolean;
    readonly accent?: boolean;
  }
  
  // Export de tous les types pour faciliter l'import
  export type {
    // Ajoutez ici d'autres types si nécessaire
  };