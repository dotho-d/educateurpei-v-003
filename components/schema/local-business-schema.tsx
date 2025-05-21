/**
 * local-business-schema.tsx
 * Composant pour ajouter les données structurées Schema.org au site
 * Améliore le référencement et la présentation dans les résultats de recherche
 */
import Script from 'next/script';

interface LocalBusinessSchemaProps {
  /** Nom de l'entreprise */
  name: string;
  /** Description de l'entreprise */
  description: string;
  /** Numéro de téléphone (format international) */
  telephone: string;
  /** Adresse email de contact */
  email: string;
  /** URL du site web */
  url: string;
  /** URL du logo */
  logo: string;
  /** Adresse physique */
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressRegion: string;
    addressCountry: string;
  };
  /** Coordonnées géographiques */
  geo: {
    latitude: number;
    longitude: number;
  };
  /** Heures d'ouverture au format ISO 8601 */
  openingHours: string[];
  /** Fourchette de prix (€, €€, €€€, etc.) */
  priceRange: string;
}

/**
 * Composant pour ajouter les données structurées LocalBusiness Schema.org
 * @param props - Les propriétés du schema LocalBusiness 
 */
export default function LocalBusinessSchema({
  name,
  description,
  telephone,
  email,
  url,
  logo,
  address,
  geo,
  openingHours,
  priceRange,
}: LocalBusinessSchemaProps) {
  // Construction de l'objet schema pour Schema.org
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#localbusiness`,
    name,
    description,
    telephone,
    email,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      postalCode: address.postalCode,
      addressRegion: address.addressRegion,
      addressCountry: address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHours,
    priceRange,
    sameAs: [
      // Ajoutez ici vos profils de réseaux sociaux
      // "https://www.facebook.com/votrepage",
      // "https://www.instagram.com/votrecompte",
    ],
    image: logo,
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}