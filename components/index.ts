/**
 * components/index.ts
 * Barrel exports pour simplifier les imports - VERSION ÉTENDUE
 */

// Layout components
export { default as Header } from './layout/Header';
export { default as HeaderWrapper } from './layout/header-wrapper';
export { default as Footer } from './layout/footer';

// UI Components
export { default as OptimizedImage } from './ui/OptimizedImage';
export { default as ProgressiveImage } from './ui/ProgressiveImage';
export { default as SkipLink } from './ui/SkipLink';
export { default as LazySection } from './ui/LazySection';
export { default as FocusTrap } from './ui/FocusTrap';
export { default as Ticker } from './ui/ticker';

// UI Kit
export * from './ui/button';
export * from './ui/card';
export * from './ui/accordion';
export * from './ui/navigation-menu';
export * from './ui/input';
export * from './ui/textarea';
export * from './ui/tabs';
export * from './ui/label';

// Home components
export { default as ServiceCard } from './home/service-card';
export { default as HeroSection } from './home/hero-section';
export { default as DomainesSection } from './home/domaines-section/domaines-section';
export { default as ServicesSection } from './home/services-section/services-section';
export { default as TarifsSection } from './home/tarifs-section/tarifs-section';
export { default as CTASection } from './home/cta-section/cta-section';

// À propos components
export { default as HeroAPropos } from './a-propos/hero-a-propos';
export { default as MonHistoireSection } from './a-propos/mon-histoire-section';
export { default as MesValeursSection } from './a-propos/mes-valeurs-section';
export { default as EspritTarifSection } from './a-propos/esprit-tarif-section';
export { default as MonEngagementSection } from './a-propos/mon-engagement-section';

// FAQ components
export { default as HeroFAQ } from './faq/hero-faq';
export { default as SearchSection } from './faq/search-section';
export { default as FAQContentSection } from './faq/faq-content-section';
export { default as ChatbotSection } from './faq/chatbot-section';
export { default as PopularQuestionsSection } from './faq/popular-questions-section';

// Modalités components
export { default as HeroModalites } from './modalites/hero-modalites';
export { default as ProcessusSection } from './modalites/processus-section';
export { default as AvantagesSection } from './modalites/avantages-section';
export { default as DomainesModalitesSection } from './modalites/domaines-modalites-section';

// Tarifs components
export { default as HeroTarifs } from './tarifs/hero-tarifs';
export { default as GrilleTarifs } from './tarifs/grille-tarifs';
export { default as SimulateurCout } from './tarifs/simulateur-cout';
export { default as CalculateurDeplacement } from './tarifs/calculateur-deplacement';
export { default as PourquoiTarifsSection } from './tarifs/pourquoi-tarifs-section';

// Schema components
export { default as LocalBusinessSchema } from './schema/local-business-schema';

// Provider components
export { default as ThemeProvider } from './theme-provider';
export { default as AnalyticsProvider } from './AnalyticsProvider';
export { default as ErrorBoundary } from './error-boundary';

// Lazy components
export * from './LazyComponents';

// Types
export type { HeaderProps, NavigationProps, MobileMenuProps, ActionsProps, NavLinkProps } from './layout/Header/types';
export type { OptimizedImageProps } from './ui/OptimizedImage';