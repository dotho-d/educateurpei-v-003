/**
 * contexts/AppContext.tsx
 * Context optimisé avec middleware et actions typées
 */
'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect, useMemo } from 'react';
import { AppState, AppAction } from '@/types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Actions typées pour une meilleure DX
  actions: {
    setTheme: (theme: AppState['theme']) => void;
    setCurrentSection: (section: string) => void;
    toggleMenu: () => void;
    setLoading: (loading: boolean) => void;
  };
}

const AppContext = createContext<AppContextType | null>(null);

// Middleware pour logger les actions en développement
const withLogging = (reducer: typeof appReducer) => {
  return (state: AppState, action: AppAction): AppState => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔄 Action: ${action.type}`);
      console.log('État précédent:', state);
      console.log('Action:', action);
    }
    
    const newState = reducer(state, action);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Nouvel état:', newState);
      console.groupEnd();
    }
    
    return newState;
  };
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_CURRENT_SECTION':
      return { ...state, currentSection: action.payload };
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const enhancedReducer = withLogging(appReducer);

const initialState: AppState = {
  theme: 'system',
  currentSection: '',
  isMenuOpen: false,
  isLoading: false
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(enhancedReducer, initialState);

  // Actions memoized pour éviter les re-renders
  const actions = useMemo(() => ({
    setTheme: (theme: AppState['theme']) => 
      dispatch({ type: 'SET_THEME', payload: theme }),
    setCurrentSection: (section: string) => 
      dispatch({ type: 'SET_CURRENT_SECTION', payload: section }),
    toggleMenu: () => 
      dispatch({ type: 'TOGGLE_MENU' }),
    setLoading: (loading: boolean) => 
      dispatch({ type: 'SET_LOADING', payload: loading }),
  }), []);

  // Synchronisation avec l'URL - optimisée
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && hash !== state.currentSection) {
        actions.setCurrentSection(hash);
      }
    };

    // Définir la section initiale
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange, { passive: true });
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []); // Dépendances optimisées

  // Fermeture automatique du menu
  useEffect(() => {
    if (state.currentSection && state.isMenuOpen) {
      // Délai pour permettre la navigation fluide
      const timer = setTimeout(() => {
        actions.toggleMenu();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [state.currentSection, state.isMenuOpen, actions]);

  // Gestion du scroll lock sur le menu mobile
  useEffect(() => {
    if (state.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isMenuOpen]);

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    actions
  }), [state, actions]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Hook principal optimisé
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Hooks spécialisés optimisés
export function useAppTheme() {
  const { state, actions } = useApp();
  return useMemo(() => ({
    theme: state.theme,
    setTheme: actions.setTheme
  }), [state.theme, actions.setTheme]);
}

export function useAppNavigation() {
  const { state, actions } = useApp();
  return useMemo(() => ({
    currentSection: state.currentSection,
    isMenuOpen: state.isMenuOpen,
    setCurrentSection: actions.setCurrentSection,
    toggleMenu: actions.toggleMenu
  }), [state.currentSection, state.isMenuOpen, actions.setCurrentSection, actions.toggleMenu]);
}

export function useAppLoading() {
  const { state, actions } = useApp();
  return useMemo(() => ({
    isLoading: state.isLoading,
    setLoading: actions.setLoading
  }), [state.isLoading, actions.setLoading]);
}