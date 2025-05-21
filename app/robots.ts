/**
 * robots.ts
 * Configuration des règles pour les robots d'indexation
 * Bloque les scrappeurs mais permet l'indexation par les moteurs de recherche légitimes
 */
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://educateur-pei.re';
  
  return {
    // Règles pour les moteurs de recherche légitimes
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/connexion',
          '/inscription'
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/'],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/connexion',
          '/inscription'
        ],
      },
      // Règles pour bloquer les scrappeurs connus
      {
        userAgent: 'AhrefsBot',
        disallow: ['/'],
      },
      {
        userAgent: 'SemrushBot',
        disallow: ['/'],
      },
      {
        userAgent: 'MJ12bot',
        disallow: ['/'],
      },
      {
        userAgent: 'DotBot',
        disallow: ['/'],
      },
      {
        userAgent: 'DataForSeoBot',
        disallow: ['/'],
      },
      {
        userAgent: 'Rogerbot',
        disallow: ['/'],
      },
      {
        userAgent: 'BLEXBot',
        disallow: ['/'],
      },
      {
        userAgent: 'PetalBot',
        disallow: ['/'],
      },
      {
        userAgent: 'SEOkicks',
        disallow: ['/'],
      },
      {
        userAgent: 'Bytespider',
        disallow: ['/'],
      },
      // Règle par défaut pour les autres bots non identifiés
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/connexion',
          '/inscription'
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}