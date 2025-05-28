/**
 * hooks/index.ts
 * Barrel exports pour les hooks
 */

// Navigation et UI hooks
export { useHeader } from './useHeader';
export { useNavigation } from './useNavigation';
export { useCurrentSection } from './useCurrentSection';
export { useDisclosure } from './useDisclosure';

// Layout et responsive hooks
export { useBreakpoint } from './useBreakpoint';
export { useFontSizes } from './useFontSizes';
export { useScrollState } from './useScrollState';
export { useScrollLock } from './useScrollLock';

// Utility hooks
export { useIntersectionObserver } from './useIntersectionObserver';
export { useAccessibility } from './useAccessibility';
export { useAnalytics } from './useAnalytics';

// Toast hook
export { useToast } from './use-toast';

// Types
export type { 
  UseBreakpointReturn, 
  BreakpointName 
} from './useBreakpoint';

export type { 
  UseDisclosureReturn 
} from './useDisclosure';

export type { 
  UseScrollStateOptions 
} from './useScrollState';