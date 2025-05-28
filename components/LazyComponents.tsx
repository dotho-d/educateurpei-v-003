/**
 * components/LazyComponents.tsx
 * Système de lazy loading optimisé - VERSION CORRIGÉE SANS SCROLL VERTICAL SUPPLÉMENTAIRE
 */

'use client';

import dynamic from 'next/dynamic';
import { ComponentType, useCallback } from 'react';

import { cn } from '@/lib/utils';

// Types pour les props des sections
interface SectionProps {
  ref?: React.RefObject<HTMLElement>;
}

interface HeroProps {
  onScrollToSection: (targetId: string) => void;
}

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredCount: number;
}

interface FAQContentSectionProps {
  filteredFAQs: Array<{
    id: string;
    question: string;
    answer: string;
    category: string;
  }>;
}

// Skeletons adaptatifs sans hauteurs fixes
const SectionSkeleton = ({ className }: { className?: string }) => (
  <div 
    className={cn(
      'w-full py-16 lg:py-20 animate-pulse bg-muted/5 flex items-center justify-center no-horizontal-overflow',
      className
    )}
    aria-label="Chargement de la section..."
    role="status"
  >
    <div className="section-container">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-muted/20 animate-pulse" />
        <div className="w-48 h-4 bg-muted/20 rounded animate-pulse" />
        <div className="w-32 h-3 bg-muted/15 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

const HeroSkeleton = () => (
  <div className="min-h-screen py-20 animate-pulse bg-muted/5 flex items-center justify-center no-horizontal-overflow">
    <div className="section-container">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-96 h-12 bg-muted/20 rounded animate-pulse" />
        <div className="w-64 h-6 bg-muted/15 rounded animate-pulse" />
        <div className="w-48 h-12 bg-primary/10 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

// Factory pour créer des composants lazy avec preload
function createLazyComponent<T = any>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  options: {
    ssr?: boolean;
    loading?: () => React.ReactElement;
  } = {}
) {
  const LazyComponent = dynamic(importFn, {
    loading: options.loading || (() => <SectionSkeleton />),
    ssr: options.ssr ?? true,
  }) as ComponentType<T> & { preload?: () => Promise<any> };

  // Ajouter la méthode preload
  LazyComponent.preload = importFn;

  return LazyComponent;
}

// ====== COMPOSANTS HOME PAGE (EXISTANTS) ======
export const LazyHeroSection = createLazyComponent(
  () => import('@/components/home/hero-section'),
  { ssr: true, loading: () => <HeroSkeleton /> }
);

export const LazyDomainesSection = createLazyComponent<SectionProps>(
  () => import('@/components/home/domaines-section/domaines-section'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazyServicesSection = createLazyComponent<SectionProps>(
  () => import('@/components/home/services-section/services-section'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazyTarifsSection = createLazyComponent<SectionProps>(
  () => import('@/components/home/tarifs-section/tarifs-section'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazyCTASection = createLazyComponent<SectionProps>(
  () => import('@/components/home/cta-section/cta-section'),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

// ====== COMPOSANTS MODALITÉS (EXISTANTS) ======
export const LazyHeroModalites = createLazyComponent<HeroProps>(
  () => import('@/components/modalites/hero-modalites'),
  { ssr: true, loading: () => <HeroSkeleton /> }
);

export const LazyProcessusSection = createLazyComponent<SectionProps>(
  () => import('@/components/modalites/processus-section'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazyAvantagesSection = createLazyComponent<SectionProps>(
  () => import('@/components/modalites/avantages-section'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazyDomainesModalitesSection = createLazyComponent<SectionProps>(
  () => import('@/components/modalites/domaines-modalites-section'),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

// ====== COMPOSANTS TARIFS (EXISTANTS) ======
export const LazyHeroTarifs = createLazyComponent<HeroProps>(
  () => import('@/components/tarifs/hero-tarifs'),
  { ssr: true, loading: () => <HeroSkeleton /> }
);

export const LazyGrilleTarifs = createLazyComponent<SectionProps>(
  () => import('@/components/tarifs/grille-tarifs'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazySimulateurCout = createLazyComponent<SectionProps>(
  () => import('@/components/tarifs/simulateur-cout'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazyCalculateurDeplacement = createLazyComponent<SectionProps>(
  () => import('@/components/tarifs/calculateur-deplacement'),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

export const LazyPourquoiTarifsSection = createLazyComponent<SectionProps>(
  () => import('@/components/tarifs/pourquoi-tarifs-section'),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

// ====== COMPOSANTS À PROPOS (NOUVEAUX) ======
export const LazyHeroAPropos = createLazyComponent<HeroProps>(
  () => import('@/components/a-propos/hero-a-propos'),
  { ssr: true, loading: () => <HeroSkeleton /> }
);

export const LazyMonHistoireSection = createLazyComponent<SectionProps>(
  () => import('@/components/a-propos/mon-histoire-section'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazyMesValeursSection = createLazyComponent<SectionProps>(
  () => import('@/components/a-propos/mes-valeurs-section'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazyEspritTarifSection = createLazyComponent<SectionProps>(
  () => import('@/components/a-propos/esprit-tarif-section'),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

export const LazyMonEngagementSection = createLazyComponent<SectionProps>(
  () => import('@/components/a-propos/mon-engagement-section'),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

// ====== COMPOSANTS FAQ (NOUVEAUX) ======
export const LazyHeroFAQ = createLazyComponent<HeroProps>(
  () => import('@/components/faq/hero-faq'),
  { ssr: true, loading: () => <HeroSkeleton /> }
);

export const LazySearchSection = createLazyComponent<SearchSectionProps>(
  () => import('@/components/faq/search-section'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazyFAQContentSection = createLazyComponent<FAQContentSectionProps>(
  () => import('@/components/faq/faq-content-section'),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export const LazyChatbotSection = createLazyComponent<SectionProps>(
  () => import('@/components/faq/chatbot-section'),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

export const LazyPopularQuestionsSection = createLazyComponent<SectionProps>(
  () => import('@/components/faq/popular-questions-section'),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

// ====== COMPOSANTS COMMUNS (EXISTANTS) ======
export const LazyFooter = createLazyComponent(
  () => import('@/components/layout/footer'),
  { 
    ssr: false,
    loading: () => (
      <div className="py-16 animate-pulse bg-muted/10 flex items-center justify-center no-horizontal-overflow">
        <div className="section-container">
          <div className="text-muted-foreground">Chargement du footer...</div>
        </div>
      </div>
    )
  }
);

// Dev Tools - COMPOSANT SIMPLE POUR ÉVITER LES ERREURS
export const LazyDevTools = process.env.NODE_ENV === 'development' 
  ? () => (
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-xs z-50">
        Dev Mode Active
      </div>
    )
  : () => null;

// Hook de preloading optimisé avec gestion d'état
export function usePreload() {
  const preloadHomeCritical = useCallback(async () => {
    try {
      await Promise.all([
        LazyHeroSection.preload?.(),
        LazyDomainesSection.preload?.()
      ]);
    } catch (error) {
      console.warn('Erreur lors du preloading home critique:', error);
    }
  }, []);

  const preloadHomeMedium = useCallback(async () => {
    try {
      await Promise.all([
        LazyServicesSection.preload?.(),
        LazyTarifsSection.preload?.()
      ]);
    } catch (error) {
      console.warn('Erreur lors du preloading home medium:', error);
    }
  }, []);

  const preloadModalites = useCallback(async () => {
    try {
      await Promise.all([
        LazyProcessusSection.preload?.(),
        LazyAvantagesSection.preload?.(),
        LazyDomainesModalitesSection.preload?.()
      ]);
    } catch (error) {
      console.warn('Erreur lors du preloading modalités:', error);
    }
  }, []);

  const preloadTarifs = useCallback(async () => {
    try {
      await Promise.all([
        LazyGrilleTarifs.preload?.(),
        LazySimulateurCout.preload?.(),
        LazyCalculateurDeplacement.preload?.(),
        LazyPourquoiTarifsSection.preload?.()
      ]);
    } catch (error) {
      console.warn('Erreur lors du preloading tarifs:', error);
    }
  }, []);

  const preloadAPropos = useCallback(async () => {
    try {
      await Promise.all([
        LazyMonHistoireSection.preload?.(),
        LazyMesValeursSection.preload?.(),
        LazyEspritTarifSection.preload?.(),
        LazyMonEngagementSection.preload?.()
      ]);
    } catch (error) {
      console.warn('Erreur lors du preloading à propos:', error);
    }
  }, []);

  const preloadFAQ = useCallback(async () => {
    try {
      await Promise.all([
        LazySearchSection.preload?.(),
        LazyFAQContentSection.preload?.(),
        LazyChatbotSection.preload?.(),
        LazyPopularQuestionsSection.preload?.()
      ]);
    } catch (error) {
      console.warn('Erreur lors du preloading FAQ:', error);
    }
  }, []);

  return {
    // Home
    preloadHomeCritical,
    preloadHomeMedium,
    // Pages existantes
    preloadModalites,
    preloadTarifs,
    // Nouvelles pages
    preloadAPropos,
    preloadFAQ,
    // Legacy compatibility
    preloadCritical: preloadHomeCritical,
    preloadMedium: preloadHomeMedium,
    preloadAll: useCallback(async () => {
      await Promise.all([
        preloadHomeCritical(),
        preloadHomeMedium(),
        preloadModalites(),
        preloadTarifs(),
        preloadAPropos(),
        preloadFAQ()
      ]);
    }, [preloadHomeCritical, preloadHomeMedium, preloadModalites, preloadTarifs, preloadAPropos, preloadFAQ])
  };
}