/**
 * error-boundary.tsx
 * Composant pour capturer et gérer les erreurs React au niveau des composants
 * Empêche que l'application entière ne plante en cas d'erreur dans un composant
 */

'use client';

import { AlertTriangle } from 'lucide-react';
import React, { Component, ErrorInfo, ReactNode } from 'react';

import { Button } from '@/components/ui/button';


interface ErrorBoundaryProps {
  /** Composants enfants à surveiller */
  children: ReactNode;
  /** Composant de secours à afficher en cas d'erreur (optionnel) */
  fallback?: ReactNode;
  /** Fonction de rappel à exécuter lors d'une erreur (optionnel) */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Nom de la section ou du composant protégé, pour les logs */
  componentName?: string;
}

interface ErrorBoundaryState {
  /** Indique si une erreur s'est produite */
  hasError: boolean;
  /** Message d'erreur à afficher */
  error: Error | null;
  /** Informations supplémentaires sur l'erreur */
  errorInfo: ErrorInfo | null;
}

/**
 * Composant ErrorBoundary
 * Capture les erreurs dans ses composants enfants et affiche un UI de secours
 * au lieu de faire planter toute l'application
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Mettre à jour l'état pour afficher l'UI de secours
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Mettre à jour l'état avec les détails de l'erreur
    this.setState({
      error,
      errorInfo
    });

    // Journaliser l'erreur et informations supplémentaires
    console.error(
      `Erreur dans ${this.props.componentName || 'un composant'}:`, 
      error, 
      errorInfo
    );

    // Appeler le callback onError si défini
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Ici, vous pourriez envoyer l'erreur à un service de suivi comme Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Rendu du fallback personnalisé si fourni
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Rendu par défaut en cas d'erreur
      return (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20 m-4 max-w-md mx-auto">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 mr-2" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Une erreur s'est produite</h2>
          </div>
          
          <p className="mb-4">
            Nous nous excusons pour ce problème. Vous pouvez essayer de recharger cette section ou contacter notre support si l'erreur persiste.
          </p>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mb-4 p-2 bg-destructive/5 rounded text-sm overflow-auto max-h-32">
              <p className="font-mono">{this.state.error.toString()}</p>
              {this.state.errorInfo && (
                <details className="mt-2">
                  <summary className="cursor-pointer">Détails techniques</summary>
                  <pre className="mt-2 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          )}
          
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              onClick={this.handleReset}
              aria-label="Réessayer de charger ce composant"
            >
              Réessayer
            </Button>
            <Button 
              variant="default" 
              onClick={() => window.location.reload()}
              aria-label="Recharger la page"
            >
              Recharger la page
            </Button>
          </div>
        </div>
      );
    }

    // Si pas d'erreur, afficher les enfants normalement
    return this.props.children;
  }
}

export default ErrorBoundary;