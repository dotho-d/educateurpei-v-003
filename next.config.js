/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    // Cache des polices Google - Stratégie CacheFirst
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
        },
        cacheKeyWillBeUsed: async ({ request }) => {
          return `${request.url}?${Date.now()}`; // Cache busting
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
        },
        cacheKeyWillBeUsed: async ({ request }) => {
          return request.url;
        },
      },
    },
    
    // Cache des images Pexels - Stratégie StaleWhileRevalidate
    {
      urlPattern: /^https:\/\/images\.pexels\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'pexels-images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
        },
        cacheKeyWillBeUsed: async ({ request }) => {
          // Optimiser la clé de cache pour les images responsive
          const url = new URL(request.url);
          const baseUrl = `${url.origin}${url.pathname}`;
          return `${baseUrl}?w=800&auto=compress&cs=tinysrgb`;
        },
      },
    },
    
    // Cache des pages statiques - Stratégie NetworkFirst
    {
      urlPattern: /^https:\/\/educateur-pei\.re\/.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 jours
        },
        networkTimeoutSeconds: 3,
        cacheKeyWillBeUsed: async ({ request }) => {
          // Exclure les paramètres de query string pour le cache
          const url = new URL(request.url);
          return `${url.origin}${url.pathname}`;
        },
      },
    },
    
    // Cache des assets statiques - Stratégie CacheFirst
    {
      urlPattern: /\.(?:js|css|woff|woff2|ico|png|jpg|jpeg|webp|avif|svg)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
        },
      },
    },
    
    // Cache des API calls - Stratégie NetworkFirst avec fallback
    {
      urlPattern: /^https:\/\/educateur-pei\.re\/api\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1 heure
        },
        networkTimeoutSeconds: 5,
        plugins: [
          {
            cacheWillUpdate: async ({ response }) => {
              // Ne cache que les réponses réussies
              return response.status === 200;
            },
            cacheKeyWillBeUsed: async ({ request }) => {
              // Clé de cache normalisée pour les API
              return request.url;
            },
          },
        ],
      },
    },
    
    // Cache pour les analytics - Stratégie NetworkOnly avec retry
    {
      urlPattern: /^https:\/\/.*\.vercel-insights\.com\/.*/i,
      handler: 'NetworkOnly',
      options: {
        plugins: [
          {
            handlerDidError: async () => {
              // Retry automatique pour les analytics
              return new Response('Analytics failed', { status: 503 });
            },
          },
        ],
      },
    },
  ],
  
  // Configuration avancée du service worker
  workboxOptions: {
    swDest: 'public/sw.js',
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
    
    // Stratégies de mise à jour
    mode: 'production',
    
    // Exclure certains fichiers du cache
    exclude: [
      /\.map$/,
      /manifest$/,
      /\.htaccess$/,
      /_next\/static\/chunks\/pages\/.*\.js$/,
    ],
    
    // Pré-cache des ressources critiques
    additionalManifestEntries: [
      { url: '/critical/critical.css', revision: null },
      { url: '/manifest.json', revision: null },
    ],
  },
});

/**
 * Configuration Next.js optimisée avec performance maximale
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Images optimisées avec formats modernes
  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Formats modernes en priorité
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    loader: 'default',
    unoptimized: false,
  },
  
  // Optimisations expérimentales
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-tabs',
      '@radix-ui/react-scroll-area',
      'recharts',
      'date-fns',
      'framer-motion'
    ],
    webVitalsAttribution: ['CLS', 'LCP'],
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Headers de sécurité et performance
  poweredByHeader: false,
  
  // Optimisations de compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' 
      ? { exclude: ['error', 'warn'] } 
      : false,
  },
  
  // Configuration webpack optimisée
  webpack: (config, { dev, isServer, webpack }) => {
    // Optimisations de développement
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/.git/**',
          '**/coverage/**',
          '**/dist/**',
        ]
      };
      
      config.infrastructureLogging = {
        level: 'warn',
      };
      
      // Cache filesystem pour dev
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
    }

    // Optimisations de production
    if (!dev && !isServer) {
      // Split chunks optimisé
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            enforce: true,
          },
          common: {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            enforce: true,
          },
          // Chunks spécialisés pour les grosses librairies
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            enforce: true,
          },
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|framer-motion)[\\/]/,
            name: 'ui',
            chunks: 'all',
            enforce: true,
          }
        },
      };

      // Tree shaking optimisé
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Module concatenation
      config.optimization.concatenateModules = true;
    }

    // Alias pour simplifier les imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': `${__dirname}/components`,
      '@/hooks': `${__dirname}/hooks`,
      '@/lib': `${__dirname}/lib`,
      '@/types': `${__dirname}/types`,
    };

    return config;
  },
  
  // Headers optimisés pour performance et sécurité
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        // CSP renforcé
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel-insights.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: https://images.pexels.com https://vercel-insights.com",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://vercel-insights.com https://vitals.vercel-insights.com",
            "frame-src 'none'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "upgrade-insecure-requests"
          ].join('; ')
        },
        // Headers de sécurité
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
          value: 'camera=(), microphone=(), geolocation=(), payment=()',
        },
        // Headers de performance
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload'
        }
      ],
    },
    // Cache agressif pour les assets statiques
    {
      source: '/icons/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/images/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=2592000, stale-while-revalidate=86400',
        },
      ],
    },
    // Cache pour les polices
    {
      source: '/fonts/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
  
  // Optimisations diverses
  reactStrictMode: true,
  compress: true,
  generateEtags: true,
  
  // Optimisation du serveur de dev
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

// Configuration conditionnelle de Sentry
if (process.env.NODE_ENV === 'production' && process.env.SENTRY_AUTH_TOKEN) {
  const { withSentryConfig } = require("@sentry/nextjs");
  
  const sentryOptions = {
    org: "influx-social",
    project: "javascript-nextjs",
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    disableLogger: true,
    automaticVercelMonitors: true,
    release: process.env.VERCEL_GIT_COMMIT_SHA || undefined,
  };

  module.exports = withBundleAnalyzer(
    withPWA(
      withSentryConfig(nextConfig, sentryOptions)
    )
  );
} else {
  module.exports = withBundleAnalyzer(withPWA(nextConfig));
}