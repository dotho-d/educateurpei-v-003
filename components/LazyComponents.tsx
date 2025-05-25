/**
 * components/LazyComponents.tsx
 * Composants lazy-loaded avec optimisations de performance - VERSION CORRIGÉE COMPLÈTE
 */
'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { cn } from '@/lib/utils';

// Types pour les props des sections
interface SectionProps {
  ref?: React.RefObject<HTMLElement>;
}

// Composants de skeleton optimisés
const SectionSkeleton = ({ className, height = "400px" }: { className?: string; height?: string }) => (
  <div 
    className={cn(
      'min-h-[400px] animate-pulse bg-muted/20 rounded-lg mx-auto max-w-4xl',
      'flex items-center justify-center',
      className
    )}
    style={{ minHeight: height }}
    aria-label="Chargement de la section..."
  >
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-muted/40 animate-pulse" />
      <div className="w-48 h-4 bg-muted/40 rounded animate-pulse" />
      <div className="w-32 h-3 bg-muted/30 rounded animate-pulse" />
    </div>
  </div>
);

const FooterSkeleton = () => (
  <div className="h-96 animate-pulse bg-muted/20 flex items-center justify-center">
    <div className="text-muted-foreground">Chargement du footer...</div>
  </div>
);

const HeroSkeleton = () => (
  <div className="min-h-screen animate-pulse bg-muted/10 flex items-center justify-center">
    <div className="flex flex-col items-center space-y-6">
      <div className="w-96 h-12 bg-muted/40 rounded animate-pulse" />
      <div className="w-64 h-6 bg-muted/30 rounded animate-pulse" />
      <div className="w-48 h-12 bg-primary/20 rounded-full animate-pulse" />
    </div>
  </div>
);

// ============================================
// COMPOSANTS LAZY LOADING - CLIENT COMPONENT
// ============================================

// Hero Section - Priorité critique (SSR)
export const LazyHeroSection = dynamic(
  () => import('@/components/home/hero-section'),
  {
    loading: () => <HeroSkeleton />,
    ssr: true,
  }
) as ComponentType<any>;

// Domaines Section - Priorité haute (SSR)
export const LazyDomainesSection = dynamic(
  () => import('@/components/home/domaines-section/domaines-section'),
  {
    loading: () => <SectionSkeleton height="300px" />,
    ssr: true,
  }
) as ComponentType<SectionProps>;

// Services Section - Priorité haute (SSR)
export const LazyServicesSection = dynamic(
  () => import('@/components/home/services-section/services-section'),
  {
    loading: () => <SectionSkeleton height="400px" />,
    ssr: true,
  }
) as ComponentType<SectionProps>;

// Tarifs Section - Priorité moyenne (SSR)
export const LazyTarifsSection = dynamic(
  () => import('@/components/home/tarifs-section/tarifs-section'),
  {
    loading: () => <SectionSkeleton height="400px" />,
    ssr: true,
  }
) as ComponentType<SectionProps>;

// CTA Section - Priorité basse (Client-side)
export const LazyCTASection = dynamic(
  () => import('@/components/home/cta-section/cta-section'),
  {
    loading: () => <SectionSkeleton height="500px" />,
    ssr: false,
  }
) as ComponentType<SectionProps>;

// Footer - Priorité basse (Client-side)
export const LazyFooter = dynamic(
  () => import('@/components/layout/footer'),
  {
    loading: () => <FooterSkeleton />,
    ssr: false,
  }
) as ComponentType<{}>;

// Dev Tools - COMPOSANT SIMPLE POUR ÉVITER LES ERREURS
export const LazyDevTools = process.env.NODE_ENV === 'development' 
  ? () => (
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-xs z-50">
        Dev Mode Active
      </div>
    )
  : () => null;

// ============================================
// SYSTÈME DE PRÉCHARGEMENT INTELLIGENT
// ============================================

export const preloadComponents = {
  /**
   * Précharge les composants critiques pour la navigation
   */
  critical: () => {
    LazyHeroSection.preload?.();
    LazyDomainesSection.preload?.();
  },
  
  /**
   * Précharge les composants de priorité moyenne
   */
  medium: () => {
    LazyServicesSection.preload?.();
    LazyTarifsSection.preload?.();
  },
  
  /**
   * Précharge tous les composants visibles
   */
  all: () => {
    LazyHeroSection.preload?.();
    LazyDomainesSection.preload?.();
    LazyServicesSection.preload?.();
    LazyTarifsSection.preload?.();
    LazyCTASection.preload?.();
    LazyFooter.preload?.();
  },
};

/**
 * Hook pour préchargement intelligent basé sur l'interaction utilisateur
 */
export const usePreload = () => {
  return {
    preloadCritical: preloadComponents.critical,
    preloadMedium: preloadComponents.medium,
    preloadAll: preloadComponents.all,
  };
};