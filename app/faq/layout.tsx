import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Questions fréquentes | Éducateur péi',
  description: 'Réponses aux questions sur nos services, tarifs, rendez-vous, technologies et modalités d\'intervention. Assistant virtuel 24h/24. Support client réactif.',
  keywords: 'questions fréquentes, FAQ, support client, aide, tarifs consultation, prise rendez-vous, services sociaux, assistance 24h, La Réunion',
  authors: [{ name: 'Éducateur péi', url: 'https://educateur-pei.re' }],
  creator: 'Éducateur péi',
  
  openGraph: {
    title: 'FAQ | Questions fréquentes | Éducateur péi',
    description: 'Trouvez rapidement les réponses à vos questions sur nos services d\'accompagnement social à La Réunion. Assistant virtuel disponible.',
    url: 'https://educateur-pei.re/faq',
    siteName: 'Éducateur péi',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://educateur-pei.re/images/og-faq.jpg',
        width: 1200,
        height: 630,
        alt: 'Support client moderne et assistant virtuel pour l\'accompagnement social',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | Questions fréquentes | Éducateur péi',
    description: 'Réponses à vos questions sur l\'accompagnement social à La Réunion',
    images: ['https://educateur-pei.re/images/og-faq.jpg'],
  },
  
  alternates: {
    canonical: 'https://educateur-pei.re/faq',
    languages: {
      'fr-FR': 'https://educateur-pei.re/faq',
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
  
  category: 'customer support',
  classification: 'Questions fréquentes et support client',
  
  other: {
    'geo.region': 'RE',
    'geo.placename': 'La Réunion',
    'geo.position': '-21.2783;55.5187',
    'ICBM': '-21.2783, 55.5187',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Données structurées pour la FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Questions fréquentes - Éducateur péi",
            "description": "Réponses aux questions courantes sur nos services d'accompagnement social",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Comment prendre rendez-vous ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Vous pouvez prendre rendez-vous en ligne 24h/24, par téléphone au 0262 XXX XXX, ou par SMS. Notre système de réservation est disponible en permanence."
                }
              },
              {
                "@type": "Question",
                "name": "Quel est le prix du premier entretien ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Le premier entretien de rencontre coûte 15€ pour 45 minutes. Il permet d'évaluer votre situation et définir un plan d'accompagnement personnalisé."
                }
              },
              {
                "@type": "Question",
                "name": "Proposez-vous des consultations en ligne ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, nous proposons des consultations en visioconférence sécurisée ou en présentiel selon vos préférences et contraintes."
                }
              },
              {
                "@type": "Question",
                "name": "Les consultations sont-elles remboursées ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nos consultations ne sont pas prises en charge par l'assurance maladie car nous sommes un service privé. Certaines mutuelles proposent une prise en charge partielle."
                }
              },
              {
                "@type": "Question",
                "name": "Mes données sont-elles sécurisées ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolument ! Nous respectons le RGPD et le secret professionnel. Vos données sont chiffrées et stockées sur des serveurs sécurisés en France."
                }
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
      
      {/* Schema pour le support client */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CustomerService",
            "name": "Support client Éducateur péi",
            "description": "Support client disponible avec assistant virtuel 24h/24 et équipe humaine",
            "serviceType": "Customer Support",
            "provider": {
              "@type": "Organization",
              "name": "Éducateur péi",
              "url": "https://educateur-pei.re"
            },
            "availableChannel": [
              {
                "@type": "ServiceChannel",
                "name": "Assistant virtuel",
                "description": "Chatbot IA disponible 24h/24",
                "availableLanguage": "fr"
              },
              {
                "@type": "ServiceChannel",
                "name": "Téléphone",
                "description": "Support téléphonique",
                "availableLanguage": "fr"
              },
              {
                "@type": "ServiceChannel",
                "name": "Email",
                "description": "Support par email",
                "availableLanguage": "fr"
              }
            ],
            "hoursAvailable": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday", 
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            ],
            "areaServed": {
              "@type": "Place",
              "name": "La Réunion"
            }
          })
        }}
      />
      {children}
    </>
  );
}