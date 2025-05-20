/** @type {import('next').NextConfig} */

/**
 * Configuration Next.js pour le projet Éducateur péi
 * Inclut des optimisations de performance, de sécurité et de gestion d'images
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    // Configuration des domaines autorisés pour les images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
      // Ajoutez d'autres domaines si nécessaire
    ],
  },
  // Déplacer Turbopack de experimental.turbo à turbopack
  turbopack: {
    rules: {
      // Configuration optionnelle pour les règles Turbo
    },
  },
  experimental: {
    // Désactiver PPR car il nécessite une version canary
    ppr: false,
    // Déplacer serverActions ici puisqu'il est maintenant considéré comme expérimental
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Optimisations supplémentaires 
  // swcMinify est maintenant activé par défaut, donc pas besoin de le spécifier
  poweredByHeader: false,   // Supprime l'en-tête X-Powered-By pour plus de sécurité
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Supprime les console.log en production
  },
  // En-têtes HTTP de sécurité
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Content-Security-Policy',
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            img-src 'self' data: https://images.pexels.com;
            font-src 'self' https://fonts.gstatic.com;
            connect-src 'self';
            frame-src 'self';
            form-action 'self';
          `.replace(/\s+/g, ' ').trim(),
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
  ],
  // Optimisations de performance
  reactStrictMode: true,
  compress: true,
  generateEtags: true,
};

module.exports = nextConfig;