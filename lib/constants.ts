/**
 * lib/constants.ts
 * Constantes centralisées pour l'application
 */

export const SITE_CONFIG = {
    name: "Éducateur péi",
    description: "Services professionnels de travail social à La Réunion - accompagnement administratif, social, psychologique, et éducatif",
    url: "https://educateur-pei.re",
    author: "Éducateur péi",
    email: "contact@educateur-pei.re",
    phone: "+262612345678",
    address: {
      street: "123 rue des Flamboyants",
      city: "Le Tampon",
      postalCode: "97430",
      region: "La Réunion",
      country: "FR",
      latitude: -21.2783,
      longitude: 55.5187,
    },
    social: {
      facebook: "https://facebook.com/educateur-pei",
      instagram: "https://instagram.com/educateur-pei",
      twitter: "https://twitter.com/educateur-pei"
    },
    openingHours: [
      "Mo-Fr 09:00-12:00",
      "Mo-Fr 14:00-18:00",
    ],
    priceRange: "€€",
  } as const;
  
  export const NAVIGATION_LINKS = [
    { 
      href: "#domaines-intervention" as const, 
      label: "Expertise", 
      ariaLabel: "Voir nos domaines d'expertise",
      id: "domaines-intervention"
    },
    { 
      href: "#services" as const, 
      label: "Services", 
      ariaLabel: "Découvrir nos services",
      id: "services"
    },
    { 
      href: "#tarifs" as const, 
      label: "Tarifs", 
      ariaLabel: "Consulter nos tarifs",
      id: "tarifs"
    },
    { 
      href: "#contact" as const, 
      label: "Contact", 
      ariaLabel: "Nous contacter",
      id: "contact"
    },
  ] as const;
  
  export const BREAKPOINTS = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
  } as const;
  
  export const SERVICES_DATA = [
    {
      id: "soutien-psychologique",
      title: "Soutien psychologique",
      description: "Écoute bienveillante pour vous aider à traverser les périodes difficiles",
      category: "primary" as const,
    },
    {
      id: "prise-rdv-en-ligne",
      title: "Prise de RDV en ligne",
      description: "Réservez facilement vos rendez-vous depuis notre plateforme en ligne",
      category: "accent" as const,
    },
    {
      id: "gamification-suivi",
      title: "Gamification et suivi objectif",
      description: "Solution en ligne et application mobile pour suivre vos progrès et atteindre vos objectifs",
      category: "accent" as const,
    },
    {
      id: "visioconsultations",
      title: "Visioconsultations",
      description: "Pour les accompagnements qui ne nécessitent pas d'interactions directes, les visioconsultations sont possibles",
      category: "primary" as const,
    },
    {
      id: "astreinte-ai-sms",
      title: "Astreinte AI + SMS / appel",
      description: "Assistance SMS et appel téléphonique pendant les heures d'interventions, assistance IA, 24h / 24, 7 jours / 7",
      category: "primary" as const,
    },
    {
      id: "astreinte-physique",
      title: "Astreinte physique",
      description: "Disponibilité 24h/24 et 7j/7 avec une intervention par mois (tarifée)",
      category: "primary" as const,
    }
  ] as const;
  
  export const DOMAINES_DATA = [
    {
      id: "handicap",
      title: "Handicap",
      description: "Pour les personnes en situation de handicap ainsi que leurs familles.",
      points: [
        "Accompagnement obtention prestations sociales spécifiques au handicap",
        "Adaptation du quotidien et développement de l'autonomie",
        "Soutien à l'inclusion scolaire et professionnelle",
        "Liens entre les institutions et les professionnels qui gravitent autour de la situation"
      ],
      linkUrl: "/services/handicap",
      linkText: "En savoir plus"
    },
    {
      id: "conflits-familiaux",
      title: "Conflits familiaux et difficultés éducatives",
      description: "Pour améliorer la communication au sein de la famille, résoudre les difficultés éducatives, et favoriser l'harmonie.",
      points: [
        "Accompagnement à la parentalité",
        "Médiations familiales et gestion des conflits",
        "Réécriture du cadre éducatif au sein de la famille",
        "Trouvez un style éducatif adapté qui vous correspond"
      ],
      linkUrl: "/services/familiales",
      linkText: "En savoir plus"
    },
    {
      id: "addictions",
      title: "Addictions",
      description: "Pour les personnes qui se questionnent au sujet d'addictions.",
      points: [
        "Évaluation de la situation et des consommations",
        "Définition d'objectifs pertinents et gamification du suivi",
        "Prévention théorique et solution logicielle",
        "Réécriture d'un cadre de vie favorisant la réduction des consommations ou l'abstinence",
        "Liens avec structures spécialisés si besoin"
      ],
      linkUrl: "/services/addictions",
      linkText: "En savoir plus"
    },
    {
      id: "administratif-social",
      title: "Accompagnement administratif et social",
      description: "Pour vous aider dans vos démarches administratives et sociales.",
      points: [
        "Assistance pour les démarches administratives",
        "Orientation vers les dispositifs sociaux adaptés",
        "Médiation avec les institutions",
        "Suivi personnalisé de votre dossier"
      ],
      linkUrl: "/services/administratif-social",
      linkText: "En savoir plus"
    },
    {
      id: "insertion-professionnelle",
      title: "Insertion professionnelle",
      description: "Pour vous accompagner dans votre parcours d'insertion professionnelle.",
      points: [
        "Tests de personnalité et identification des compétences",
        "Orientation professionnelle et conseils",
        "Accompagnement pour l'entrée en formation ou la création d'entreprise",
        "Suivi personnalisé tout au long du parcours"
      ],
      linkUrl: "/services/insertion-professionnelle",
      linkText: "En savoir plus"
    }
  ] as const;
  
  export const TARIFFS_DATA = [
    {
      id: "evaluation-initiale",
      name: "Évaluation initiale",
      items: [
        { name: "1er entretien de rencontre", price: "free" as const },
        { name: "Entretiens de rencontre complémentaires", price: 15 },
        { name: "Analyse de la situation", price: 15 },
        { name: "Rédaction d'un projet éducatif personnalisé", price: 15 }
      ],
      category: "evaluation" as const
    },
    {
      id: "accompagnement",
      name: "Accompagnement",
      price: 36,
      unit: "heure",
      description: "Accompagnement éducatif et entretiens motivationnels",
      subtitle: "Idéal pour des entretiens ponctuels, en fonction du besoin.",
      category: "hourly" as const,
      highlighted: false
    },
    {
      id: "forfait",
      name: "Forfait",
      price: 192,
      originalPrice: 216,
      sessions: 6,
      pricePerSession: 32,
      description: "soit, 6 séances à 32€ / la séance",
      subtitle: "Idéal pour un suivi régulier et un accompagnement sur la durée.",
      category: "package" as const,
      highlighted: true
    }
  ] as const;
  
  export const TICKER_ITEMS = [
    { text: 'Handicap' },
    { text: 'Difficultés éducatives' },
    { text: 'Difficultés administratives et sociales' },
    { text: 'Addictions' },
    { text: 'Insertion professionnelle' },
    { text: 'Santé mentale' }
  ] as const;
  
  export const PAYMENT_METHODS = [
    "Espèces",
    "Virement bancaire", 
    "CB",
    "Apple Pay",
    "Google Pay"
  ] as const;
  
  export const CACHE_DURATIONS = {
    STATIC_ASSETS: 31536000, // 1 year
    IMAGES: 2592000, // 30 days
    API_RESPONSES: 3600, // 1 hour
    PAGES: 86400, // 24 hours
  } as const;
  
  export const ERROR_MESSAGES = {
    GENERIC: "Une erreur inattendue s'est produite",
    NETWORK: "Problème de connexion réseau",
    VALIDATION: "Veuillez vérifier les informations saisies",
    NOT_FOUND: "Page introuvable",
    FORBIDDEN: "Accès non autorisé",
    SERVER_ERROR: "Erreur du serveur",
  } as const;