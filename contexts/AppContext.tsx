/**
 * contexts/AppContext.tsx
 * Context global pour l'état de l'application
 */
'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { AppState, AppAction } from '@/types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | null>(null);

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

const initialState: AppState = {
  theme: 'system',
  currentSection: '',
  isMenuOpen: false,
  isLoading: false
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Synchroniser avec le hash de l'URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && hash !== state.currentSection) {
        dispatch({ type: 'SET_CURRENT_SECTION', payload: hash });
      }
    };

    // Définir la section initiale
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [state.currentSection]);

  // Fermer le menu lors du changement de section
  useEffect(() => {
    if (state.currentSection && state.isMenuOpen) {
      dispatch({ type: 'TOGGLE_MENU' });
    }
  }, [state.currentSection, state.isMenuOpen]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Hooks spécialisés pour des cas d'usage spécifiques
export function useAppTheme() {
  const { state, dispatch } = useApp();
  
  const setTheme = (theme: AppState['theme']) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };
  
  return { theme: state.theme, setTheme };
}

export function useAppNavigation() {
  const { state, dispatch } = useApp();
  
  const setCurrentSection = (section: string) => {
    dispatch({ type: 'SET_CURRENT_SECTION', payload: section });
  };
  
  const toggleMenu = () => {
    dispatch({ type: 'TOGGLE_MENU' });
  };
  
  return {
    currentSection: state.currentSection,
    isMenuOpen: state.isMenuOpen,
    setCurrentSection,
    toggleMenu
  };
}

export function useAppLoading() {
  const { state, dispatch } = useApp();
  
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };
  
  return {
    isLoading: state.isLoading,
    setLoading
  };
}