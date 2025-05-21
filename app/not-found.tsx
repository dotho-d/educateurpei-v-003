/**
 * not-found.tsx
 * Page 404 personnalisée pour l'application Next.js
 * S'affiche automatiquement lorsqu'une route n'existe pas
 */

import { Home, Search } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';


/**
 * Composant NotFoundPage
 * Affiche une page 404 conviviale
 */
export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full mx-auto p-6 rounded-lg bg-card border border-border shadow-lg text-center">
        <h1 className="text-6xl font-bold mb-6 text-primary">404</h1>
        
        <h2 className="text-2xl font-semibold mb-3">Page introuvable</h2>
        
        <p className="text-muted-foreground mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1"
            variant="outline" 
            asChild
          >
            <Link href="/contact">
              <Search className="w-4 h-4 mr-2" />
              Besoin d'aide ?
            </Link>
          </Button>
          
          <Button 
            className="flex-1"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}