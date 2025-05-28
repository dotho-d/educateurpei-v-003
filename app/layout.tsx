/**
 * layout.tsx - VERSION CORRIGÉE SANS ERREUR D'HYDRATATION
 * Layout principal avec protections anti-débordement renforcées
 */
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { 
  Annie_Use_Your_Telescope, 
  Caveat, 
  Alegreya, 
  Cormorant_Garamond, 
  Brawler 
} from 'next/font/google';

import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import HeaderWrapper from '@/components/layout/header-wrapper';
import { LazyFooter } from '@/components/LazyComponents';
import LocalBusinessSchema from '@/components/schema/local-business-schema';
import { ThemeProvider } from '@/components/theme-provider';
import { SkipLink } from '@/components/ui/SkipLink';

// Configuration des polices optimisée avec stratégie de chargement intelligente
const alegreya = Alegreya({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: true,
});

const brawler = Brawler({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brawler',
  weight: ['400', '700'],
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: true,
});

const caveat = Caveat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
  weight: ['400', '700'], 
  preload: true,
  fallback: ['Comic Sans MS', 'cursive'],
  adjustFontFallback: true,
});

const annieUseYourTelescope = Annie_Use_Your_Telescope({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-annie',
  weight: '400',
  preload: false,
  fallback: ['Comic Sans MS', 'cursive'],
  adjustFontFallback: true,
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['400', '600', '700'],
  preload: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: true,
});

// Métadonnées optimisées
export const metadata: Metadata = {
  title: 'Services de Travail Social | Éducateur péi',
  description: 'Services professionnels de travail social - assistance administrative, sociale, psychologique, financière, et éducative à La Réunion',
  keywords: 'travail social, éducateur, accompagnement, handicap, insertion, addictions, problèmes familiaux, démarches administratives, La Réunion',
  authors: [{ name: 'Éducateur péi', url: 'https://educateur-pei.re' }],
  creator: 'Éducateur péi',
  metadataBase: new URL('https://educateur-pei.re'),
  
  applicationName: 'Éducateur Péi',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Éducateur Péi',
  },
  formatDetection: {
    telephone: false,
  },
  
  openGraph: {
    title: 'Services de Travail Social | Éducateur péi',
    description: 'Services professionnels de travail social à La Réunion - accompagnement administratif, social, psychologique, et éducatif',
    url: 'https://educateur-pei.re',
    siteName: 'Éducateur péi',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services de Travail Social | Éducateur péi',
    description: 'Services professionnels de travail social à La Réunion',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://educateur-pei.re',
    languages: {
      'fr-FR': 'https://educateur-pei.re',
    },
  },
  manifest: '/manifest.json',
  category: 'social services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="fr" 
      suppressHydrationWarning 
      className={`${alegreya.variable} ${caveat.variable} ${annieUseYourTelescope.variable} ${brawler.variable} ${cormorantGaramond.variable}`}
    >
      <head>
        {/* Resource Hints critiques pour performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//images.pexels.com" />
        <link rel="dns-prefetch" href="//vercel-insights.com" />
        
        {/* Preconnect pour connexions critiques */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" />
        
        {/* Preload des polices critiques dans l'ordre de priorité */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/alegreya/v35/11uPGpjgbE3NnASDq-HdB4hqg6SH7Yzp.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/brawler/v19/xn7gYHE41ni1AdIRggOxSuXd.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9eI2A.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="Éducateur Péi" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Éducateur Péi" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#f8765f" />
        
        {/* Preload critical above-the-fold image */}
        <link
          rel="preload"
          as="image"
          href="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=800"
          fetchPriority="high"
        />

        {/* ✅ SUPPRIMÉ : Plus de CSS critique en dangerouslySetInnerHTML */}
        {/* Le CSS critique est maintenant dans globals.css pour éviter l'erreur d'hydratation */}
      </head>
      <body className="no-horizontal-overflow">
        <SkipLink />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <div className="flex min-h-screen flex-col no-horizontal-overflow">
              <HeaderWrapper />
              <main 
                id="main-content" 
                className="flex-1 no-horizontal-overflow"
              >
                {children}
              </main>
              <LazyFooter />
            </div>
          </AnalyticsProvider>
        </ThemeProvider>
        
        <LocalBusinessSchema
          name="Éducateur péi"
          description="Services professionnels de travail social à La Réunion - accompagnement administratif, social, psychologique, et éducatif"
          telephone="+262612345678"
          email="contact@educateur-pei.re"
          url="https://educateur-pei.re"
          logo="https://educateur-pei.re/logo.png"
          address={{
            streetAddress: "123 rue des Flamboyants",
            addressLocality: "Le Tampon",
            postalCode: "97430",
            addressRegion: "La Réunion",
            addressCountry: "FR",
          }}
          geo={{
            latitude: -21.2783,
            longitude: 55.5187,
          }}
          openingHours={[
            "Mo-Fr 09:00-12:00",
            "Mo-Fr 14:00-18:00",
          ]}
          priceRange="€€"
        />
        <Analytics />
      </body>
    </html>
  );
}