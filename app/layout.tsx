/**
 * layout.tsx
 * Layout principal de l'application qui définit la structure de base et charge les polices
 */
import './globals.css';
import type { Metadata } from 'next';
import { 
  Annie_Use_Your_Telescope, 
  Caveat, 
  Alegreya, 
  Cormorant_Garamond, 
  Brawler 
} from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import HeaderWrapper from '@/components/layout/header-wrapper';
import Footer from '@/components/layout/footer';

// Configuration des polices avec next/font
const alegreya = Alegreya({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
});

const caveat = Caveat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
  weight: ['400', '700'], 
  preload: true,
});

const annieUseYourTelescope = Annie_Use_Your_Telescope({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-annie',
  weight: '400',
  preload: true,
});

const brawler = Brawler({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brawler',
  weight: ['400', '700'],
  preload: true,
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['400', '600', '700'],
  preload: true,
});

// Métadonnées de l'application optimisées pour le SEO
export const metadata: Metadata = {
  title: 'Services de Travail Social | Éducateur péi',
  description: 'Services professionnels de travail social - assistance administrative, sociale, psychologique, financière, et éducative à La Réunion',
  keywords: 'travail social, éducateur, accompagnement, handicap, insertion, addictions, problèmes familiaux, démarches administratives, La Réunion',
  authors: [{ name: 'Éducateur péi', url: 'https://educateur-pei.re' }],
  creator: 'Éducateur péi',
  metadataBase: new URL('https://educateur-pei.re'),
  openGraph: {
    title: 'Services de Travail Social | Éducateur péi',
    description: 'Services professionnels de travail social à La Réunion - accompagnement administratif, social, psychologique, et éducatif',
    url: 'https://educateur-pei.re',
    siteName: 'Éducateur péi',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Éducateur péi - Services de travail social à La Réunion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services de Travail Social | Éducateur péi',
    description: 'Services professionnels de travail social à La Réunion',
    images: ['/images/twitter-image.jpg'],
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
  manifest: '/site.webmanifest',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
  themeColor: '#f8765f',
  category: 'social services',
};

/**
 * RootLayout
 * Layout principal qui enveloppe toute l'application
 * Configure les polices, le thème et la structure de base
 */
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
        {/* Optimisation pour le rendu des polices */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        {/* Préconnexion aux origines externes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <HeaderWrapper />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}