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
  poweredByHeader: false,   // Supprime l'en-tête X-Powered-By pour plus de sécurité
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' 
      ? { exclude: ['error', 'warn'] } 
      : false, // Conserve les console.error et console.warn
  },
  // En-têtes HTTP de sécurité renforcés
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
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
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
            base-uri 'self';
            object-src 'none';
            frame-ancestors 'none';
            upgrade-insecure-requests;
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

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "influx-social",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
