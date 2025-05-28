import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos | Mon parcours et mes valeurs | Éducateur péi',
  description: 'Découvrez mon parcours de l\'institution publique à l\'entrepreneuriat social, mes valeurs d\'empathie et bienveillance, et ma philosophie d\'accompagnement personnalisé.',
  keywords: 'éducateur social, parcours professionnel, valeurs humaines, philosophie accompagnement, entrepreneuriat social, expérience 12 ans, La Réunion',
  authors: [{ name: 'Éducateur péi', url: 'https://educateur-pei.re' }],
  creator: 'Éducateur péi',
  
  openGraph: {
    title: 'À propos | Mon parcours et mes valeurs | Éducateur péi',
    description: 'De l\'institution publique à l\'entrepreneuriat social : découvrez mon parcours, mes valeurs et ma philosophie d\'accompagnement à La Réunion.',
    url: 'https://educateur-pei.re/a-propos',
    siteName: 'Éducateur péi',
    locale: 'fr_FR',
    type: 'profile',
    images: [
      {
        url: 'https://educateur-pei.re/images/og-a-propos.jpg',
        width: 1200,
        height: 630,
        alt: 'Portrait professionnel d\'un éducateur social engagé à La Réunion',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'À propos | Mon parcours et mes valeurs | Éducateur péi',
    description: 'Découvrez le parcours et les valeurs d\'un éducateur social indépendant à La Réunion',
    images: ['https://educateur-pei.re/images/og-a-propos.jpg'],
  },
  
  alternates: {
    canonical: 'https://educateur-pei.re/a-propos',
    languages: {
      'fr-FR': 'https://educateur-pei.re/a-propos',
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
  classification: 'Profil professionnel éducateur social',
  
  other: {
    'geo.region': 'RE',
    'geo.placename': 'La Réunion',
    'geo.position': '-21.2783;55.5187',
    'ICBM': '-21.2783, 55.5187',
  },
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Données structurées pour le profil professionnel */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Éducateur péi",
            "jobTitle": "Éducateur spécialisé indépendant",
            "description": "Éducateur social spécialisé avec 12 ans d'expérience, accompagnement personnalisé dans les domaines du handicap, des difficultés familiales, addictions et insertion professionnelle",
            "url": "https://educateur-pei.re/a-propos",
            "image": "https://educateur-pei.re/images/profil-educateur.jpg",
            "worksFor": {
              "@type": "Organization",
              "name": "Éducateur péi",
              "url": "https://educateur-pei.re"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Le Tampon",
              "addressRegion": "La Réunion",
              "addressCountry": "FR"
            },
            "alumniOf": [
              {
                "@type": "EducationalOrganization",
                "name": "Formation en travail social"
              }
            ],
            "knowsAbout": [
              "Accompagnement social",
              "Éducation spécialisée", 
              "Médiation familiale",
              "Accompagnement handicap",
              "Prévention addictions",
              "Insertion professionnelle"
            ],
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": "Diplôme en travail social"
              },
              {
                "@type": "EducationalOccupationalCredential", 
                "name": "Certification entretien motivationnel"
              },
              {
                "@type": "EducationalOccupationalCredential",
                "name": "Spécialisation médiation familiale"
              }
            ],
            "memberOf": {
              "@type": "ProfessionalService",
              "name": "Réseau professionnel éducateurs sociaux"
            }
          })
        }}
      />
      
      {/* Schema pour l'organisation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Éducateur péi",
            "description": "Service d'accompagnement social indépendant à La Réunion, alliant expertise humaine et innovation technologique",
            "url": "https://educateur-pei.re",
            "logo": "https://educateur-pei.re/logo.png",
            "foundingDate": "2024",
            "founder": {
              "@type": "Person",
              "name": "Éducateur péi"
            },
            "numberOfEmployees": 1,
            "legalName": "Éducateur péi",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 rue des Flamboyants",
              "addressLocality": "Le Tampon", 
              "postalCode": "97430",
              "addressRegion": "La Réunion",
              "addressCountry": "FR"
            },
            "areaServed": {
              "@type": "Place",
              "name": "La Réunion"
            },
            "serviceType": "Social Work Services",
            "slogan": "L'accompagnement social innovant et humain"
          })
        }}
      />
      {children}
    </>
  );
}