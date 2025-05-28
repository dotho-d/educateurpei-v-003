import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarifs transparents et accessibles | Grille tarifaire | Éducateur péi',
  description: 'Tarifs clairs pour l\'accompagnement social : premier entretien 15€, séances 36€/h, forfaits avantageux. Simulateur de coût et frais de déplacement inclus.',
  keywords: 'tarifs éducateur social, prix consultation, forfait accompagnement, premier entretien, coût intervention, paiement facilité, La Réunion',
  authors: [{ name: 'Éducateur péi', url: 'https://educateur-pei.re' }],
  creator: 'Éducateur péi',
  
  openGraph: {
    title: 'Tarifs transparents et accessibles | Grille tarifaire | Éducateur péi',
    description: 'Tarifs clairs et justes pour un accompagnement social de qualité. Premier entretien à 15€, forfaits avantageux disponibles.',
    url: 'https://educateur-pei.re/tarifs',
    siteName: 'Éducateur péi',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://educateur-pei.re/images/og-tarifs.jpg',
        width: 1200,
        height: 630,
        alt: 'Grille tarifaire transparente et accessible pour l\'accompagnement social',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs transparents et accessibles | Éducateur péi',
    description: 'Tarifs clairs pour l\'accompagnement social à La Réunion. Premier entretien 15€.',
    images: ['https://educateur-pei.re/images/og-tarifs.jpg'],
  },
  
  alternates: {
    canonical: 'https://educateur-pei.re/tarifs',
    languages: {
      'fr-FR': 'https://educateur-pei.re/tarifs',
    },
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
  
  category: 'social services',
  classification: 'Tarification services sociaux',
  
  other: {
    'geo.region': 'RE',
    'geo.placename': 'La Réunion',
    'geo.position': '-21.2783;55.5187',
    'ICBM': '-21.2783, 55.5187',
    'price-range': '15-576',
    'currency': 'EUR',
  },
};

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Données structurées pour les tarifs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PriceSpecification",
            "name": "Tarifs services d'accompagnement social",
            "description": "Grille tarifaire complète pour les services d'accompagnement social et éducatif",
            "priceCurrency": "EUR",
            "price": "15",
            "minPrice": "15",
            "maxPrice": "576",
            "priceRange": "15-576",
            "eligibleRegion": {
              "@type": "Place",
              "name": "La Réunion, France"
            },
            "validFrom": "2024-01-01",
            "validThrough": "2024-12-31",
            "category": [
              "Social Services",
              "Educational Support",
              "Family Counseling",
              "Addiction Support"
            ]
          })
        }}
      />
      
      {/* Schema pour les services spécifiques */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Accompagnement social personnalisé",
            "description": "Services d'accompagnement social, éducatif et psychologique à La Réunion",
            "provider": {
              "@type": "Organization",
              "name": "Éducateur péi",
              "url": "https://educateur-pei.re",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 rue des Flamboyants",
                "addressLocality": "Le Tampon",
                "postalCode": "97430",
                "addressRegion": "La Réunion",
                "addressCountry": "FR"
              }
            },
            "areaServed": {
              "@type": "Place",
              "name": "La Réunion"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services d'accompagnement",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Entretien de rencontre"
                  },
                  "price": "15",
                  "priceCurrency": "EUR",
                  "description": "Premier entretien d'évaluation de 45 minutes"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Accompagnement éducatif"
                  },
                  "price": "36",
                  "priceCurrency": "EUR",
                  "description": "Séance d'accompagnement individuel d'1 heure"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Forfait 6 heures"
                  },
                  "price": "192",
                  "priceCurrency": "EUR",
                  "description": "Forfait de 6 séances d'accompagnement"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Forfait 12 heures"
                  },
                  "price": "336",
                  "priceCurrency": "EUR",
                  "description": "Forfait de 12 séances d'accompagnement"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Forfait 24 heures"
                  },
                  "price": "576",
                  "priceCurrency": "EUR",
                  "description": "Forfait de 24 séances d'accompagnement"
                }
              ]
            },
            "paymentAccepted": [
              "Cash",
              "Credit Card", 
              "Bank Transfer",
              "Apple Pay",
              "Google Pay"
            ],
            "currenciesAccepted": "EUR"
          })
        }}
      />
      {children}
    </>
  );
}