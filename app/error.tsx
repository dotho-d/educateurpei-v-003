/**
 * error.tsx
 * Page d'erreur globale pour l'application Next.js
 * S'affiche automatiquement lorsqu'une erreur non gérée se produit
 */

'use client';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  /** L'erreur qui s'est produite */
  error: Error & { digest?: string };
  /** Fonction pour réessayer le rendu */
  reset: () => void;
}

/**
 * Composant ErrorPage
 * Affiche une page d'erreur conviviale avec options de récupération
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  // Enregistrer l'erreur lorsque le composant est monté
  useEffect(() => {
    // Enregistrer l'erreur dans les logs
    console.error('Erreur non gérée:', error);
    
    // Ici, vous pourriez envoyer l'erreur à un service de suivi comme Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full mx-auto p-6 rounded-lg bg-card border border-border shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
            <AlertTriangle className="w-8 h-8 text-destructive" aria-hidden="true" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Une erreur s'est produite</h1>
          
          <p className="text-muted-foreground mb-6">
            Nous nous excusons pour ce problème technique. Notre équipe a été informée et travaille à le résoudre au plus vite.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-3 bg-muted/50 rounded-md text-sm text-left w-full overflow-auto max-h-36">
              <p className="font-mono">{error.message}</p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer">Stack trace</summary>
                  <pre className="mt-2 whitespace-pre-wrap text-xs">
                    {error.stack}
                  </pre>
                </details>
              )}
              {error.digest && (
                <p className="mt-2 text-xs text-muted-foreground">
                  ID Erreur: {error.digest}
                </p>
              )}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => reset()}
              aria-label="Réessayer de charger la page"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </Button>
            
            <Button className="flex-1" asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}