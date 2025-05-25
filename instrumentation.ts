import * as Sentry from '@sentry/nextjs';

export async function register() {
  // SENTRY UNIQUEMENT EN PRODUCTION
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_ENABLED !== 'false') {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      await import('./sentry.server.config');
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
      await import('./sentry.edge.config');
    }
  }
}

// Export conditionnel pour éviter les erreurs
export const onRequestError = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_ENABLED !== 'false'
  ? Sentry.captureRequestError 
  : undefined;