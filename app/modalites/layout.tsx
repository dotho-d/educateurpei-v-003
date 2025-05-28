import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comment ça marche ? | Processus et modalités | Éducateur péi',
  description: 'Découvrez notre processus simplifié en 5 étapes : inscription, formulaire, rendez-vous, paiement et accompagnement personnalisé. Service innovant et sécurisé.',
  keywords: 'processus accompagnement, modalités intervention, étapes suivi, inscription en ligne, rendez-vous social, paiement sécurisé, La Réunion',
  authors: [{ name: 'Éducateur péi', url: 'https://educateur-pei.re' }],
  creator: 'Éducateur péi',
  
  openGraph: {
    title: 'Comment ça marche ? | Processus et modalités | Éducateur péi',
    description: 'Processus simplifié en 5 étapes pour votre accompagnement social à La Réunion. Service innovant et personnalisé.',
    url: 'https://educateur-pei.re/modalites',
    siteName: 'Éducateur péi',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://educateur-pei.re/images/og-modalites.jpg',
        width: 1200,
        height: 630,
        alt: 'Processus d\'accompagnement social moderne et personnalisé',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Comment ça marche ? | Processus et modalités | Éducateur péi',
    description: 'Processus simplifié en 5 étapes pour votre accompagnement social à La Réunion',
    images: ['https://educateur-pei.re/images/og-modalites.jpg'],
  },
  
  alternates: {
    canonical: 'https://educateur-pei.re/modalites',
    languages: {
      'fr-FR': 'https://educateur-pei.re/modalites',
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
  classification: 'Accompagnement social et éducatif',
  
  other: {
    'geo.region': 'RE',
    'geo.placename': 'La Réunion',
    'geo.position': '-21.2783;55.5187',
    'ICBM': '-21.2783, 55.5187',
  },
};

export default function ModalitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Données structurées spécifiques aux modalités */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Comment bénéficier d'un accompagnement social personnalisé",
            "description": "Processus en 5 étapes pour accéder à nos services d'accompagnement social et éducatif",
            "image": "https://educateur-pei.re/images/processus-accompagnement.jpg",
            "totalTime": "PT15M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "EUR",
              "value": "15"
            },
            "supply": [
              {
                "@type": "HowToSupply",
                "name": "Connexion internet"
              },
              {
                "@type": "HowToSupply", 
                "name": "Téléphone ou ordinateur"
              }
            ],
            "tool": [
              {
                "@type": "HowToTool",
                "name": "Plateforme de réservation en ligne"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Inscription sur le site",
                "text": "Créez votre compte en quelques minutes sur notre plateforme sécurisée",
                "url": "https://educateur-pei.re/modalites#processus",
                "image": "https://educateur-pei.re/images/etape-inscription.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Formulaire de contact",
                "text": "Décrivez votre situation grâce à notre formulaire intelligent",
                "url": "https://educateur-pei.re/modalites#processus",
                "image": "https://educateur-pei.re/images/etape-formulaire.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Prise de rendez-vous",
                "text": "Planifiez votre entretien en ligne, par SMS ou téléphone",
                "url": "https://educateur-pei.re/modalites#processus",
                "image": "https://educateur-pei.re/images/etape-rdv.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Paiement sécurisé",
                "text": "Réglez votre consultation en toute sécurité",
                "url": "https://educateur-pei.re/modalites#processus",
                "image": "https://educateur-pei.re/images/etape-paiement.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Intervention et suivi",
                "text": "Bénéficiez de votre accompagnement avec compte-rendu détaillé",
                "url": "https://educateur-pei.re/modalites#processus",
                "image": "https://educateur-pei.re/images/etape-suivi.jpg"
              }
            ],
            "author": {
              "@type": "Organization",
              "name": "Éducateur péi",
              "url": "https://educateur-pei.re"
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString()
          })
        }}
      />
      {children}
    </>
  );
}