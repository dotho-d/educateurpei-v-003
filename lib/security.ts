/**
 * lib/security.ts
 * Utilitaires de sécurité centralisés
 */

// Rate limiting amélioré
interface RateLimitState {
    requests: number;
    resetTime: number;
  }
  
  const rateLimitStore = new Map<string, RateLimitState>();
  
  export function isRateLimited(
    identifier: string, 
    limit: number = 10, 
    windowMs: number = 60000
  ): boolean {
    const now = Date.now();
    const state = rateLimitStore.get(identifier);
  
    if (!state || now > state.resetTime) {
      rateLimitStore.set(identifier, {
        requests: 1,
        resetTime: now + windowMs
      });
      return false;
    }
  
    if (state.requests >= limit) {
      return true;
    }
  
    state.requests++;
    return false;
  }
  
  // Validation d'input renforcée
  export function sanitizeHtml(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  
  // Validation d'URL sécurisée
  export function isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }
  
  // CSP Nonce generator
  export function generateNonce(): string {
    return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('base64');
  }