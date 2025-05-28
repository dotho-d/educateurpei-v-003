"use client";

import { useRef, useEffect, useState } from 'react';
import { usePreload } from '@/components/LazyComponents';
import LazySection from '@/components/ui/LazySection';
import { useAnalytics } from '@/hooks/useAnalytics';

// Import des composants lazy-loaded pour FAQ
import {
  LazyHeroFAQ,
  LazySearchSection,
  LazyFAQContentSection,
  LazyChatbotSection,
  LazyPopularQuestionsSection
} from '@/components/LazyComponents';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: "rdv-1",
    question: "Comment prendre rendez-vous ?",
    answer: "Vous pouvez prendre rendez-vous de plusieurs façons : directement en ligne via notre plateforme de réservation, par téléphone au 0262 XXX XXX, ou par SMS. Notre système de réservation en ligne est disponible 24h/24 et vous permet de choisir le créneau qui vous convient le mieux.",
    category: "rendez-vous"
  },
  {
    id: "rdv-2",
    question: "Puis-je annuler ou reporter un rendez-vous ?",
    answer: "Oui, vous pouvez annuler ou reporter un rendez-vous jusqu'à 24h avant la consultation sans frais. Passé ce délai, la consultation sera due. Vous pouvez gérer vos rendez-vous directement depuis votre espace personnel en ligne.",
    category: "rendez-vous"
  },
  {
    id: "rdv-3",
    question: "Les consultations peuvent-elles avoir lieu en visioconférence ?",
    answer: "Absolument ! Nous proposons des consultations en présentiel dans notre cabinet ou en visioconférence sécurisée. La qualité de l'accompagnement reste la même quel que soit le mode choisi. C'est vous qui décidez selon vos préférences et contraintes.",
    category: "rendez-vous"
  },
  {
    id: "tarifs-1",
    question: "Les consultations sont-elles remboursées par la Sécurité sociale ?",
    answer: "Nos consultations ne sont pas prises en charge par l'assurance maladie car nous sommes un service privé. Cependant, certaines mutuelles proposent une prise en charge partielle des consultations de bien-être et d'accompagnement social. N'hésitez pas à vous renseigner auprès de votre mutuelle.",
    category: "tarifs"
  },
  {
    id: "tarifs-2",
    question: "Proposez-vous des facilités de paiement ?",
    answer: "Oui, nous proposons plusieurs facilités : paiement échelonné pour les forfaits, tarifs préférentiels selon les situations, et plusieurs moyens de paiement (espèces, carte bancaire, virement, Apple Pay, Google Pay). Nous adaptons nos solutions à votre situation financière.",
    category: "tarifs"
  },
  {
    id: "tarifs-3",
    question: "Pourquoi choisir un forfait plutôt que des séances à l'unité ?",
    answer: "Les forfaits offrent plusieurs avantages : économies importantes (jusqu'à 33% d'économie), suivi plus régulier et structuré, flexibilité dans l'utilisation des heures, et meilleure continuité de l'accompagnement. Plus vous vous engagez dans la durée, plus le tarif horaire diminue.",
    category: "tarifs"
  },
  {
    id: "services-1",
    question: "Quels types de problématiques pouvez-vous traiter ?",
    answer: "Nous intervenons dans 5 domaines principaux : handicap et accompagnement des familles, difficultés familiales et éducatives, addictions, accompagnement administratif et social, et insertion professionnelle. Chaque accompagnement est personnalisé selon votre situation spécifique.",
    category: "services"
  },
  {
    id: "services-2",
    question: "Comment se déroule un premier entretien ?",
    answer: "Le premier entretien de rencontre dure 45 minutes et coûte 15€. Il nous permet de faire connaissance, d'évaluer votre situation, de définir vos besoins et d'élaborer ensemble un plan d'accompagnement personnalisé. C'est un moment d'échange libre et sans jugement.",
    category: "services"
  },
  {
    id: "services-3",
    question: "Quelle est la différence avec les services sociaux publics ?",
    answer: "Notre service privé offre une plus grande réactivité (pas de liste d'attente), une flexibilité horaire, un accompagnement personnalisé et innovant (outils numériques, gamification), et une disponibilité étendue. Nous complétons l'offre publique sans la remplacer.",
    category: "services"
  },
  {
    id: "tech-1",
    question: "Comment fonctionne votre application mobile ?",
    answer: "Notre application vous permet de gérer vos rendez-vous, accéder à vos documents, suivre vos objectifs avec gamification, communiquer avec nous de manière sécurisée, et utiliser notre assistant IA 24h/24. Elle est intuitive et sécurisée selon les standards RGPD.",
    category: "technologie"
  },
  {
    id: "tech-2",
    question: "Mes données personnelles sont-elles sécurisées ?",
    answer: "Absolument ! Nous respectons scrupuleusement le RGPD et le secret professionnel. Vos données sont chiffrées, stockées sur des serveurs sécurisés en France, et ne sont jamais partagées sans votre accord explicite. Vous avez un droit d'accès, de modification et de suppression de vos données.",
    category: "technologie"
  },
  {
    id: "tech-3",
    question: "Le chatbot peut-il remplacer un vrai entretien ?",
    answer: "Non, notre chatbot est un outil d'assistance complémentaire, pas un remplacement. Il vous aide pour les questions pratiques, l'orientation, et le soutien entre les séances. L'accompagnement humain reste au cœur de notre démarche. Le chatbot vous oriente vers un professionnel quand nécessaire.",
    category: "technologie"
  }
];

export default function FAQPage() {
  const { trackEvent, measurePerformance } = useAnalytics();
  
  // États pour la recherche et filtrage
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Références pour chaque section
  const searchRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const chatbotRef = useRef<HTMLElement>(null);
  const popularRef = useRef<HTMLElement>(null);
  
  // Hook pour le preloading intelligent
  const { preloadFAQ } = usePreload();
  
  // État pour le preloading progressif
  const [hasPreloadedCritical, setHasPreloadedCritical] = useState(false);

  // Filtrage des FAQ
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Preloading intelligent
  useEffect(() => {
    measurePerformance('faq-page-load', () => {
      trackEvent('page_view', { page: 'faq' });
      
      if (!hasPreloadedCritical) {
        preloadFAQ();
        setHasPreloadedCritical(true);
      }
    });
  }, [preloadFAQ, hasPreloadedCritical, measurePerformance, trackEvent]);

  const handleSmoothScroll = (targetId: string) => {
    trackEvent('section_navigation', { target: targetId, page: 'faq' });
    
    requestAnimationFrame(() => {
      measurePerformance(`scroll-to-${targetId}`, () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = targetPosition + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          window.history.pushState(null, '', `#${targetId}`);
        }
      });
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Critique, chargement immédiat */}
      <LazyHeroFAQ onScrollToSection={handleSmoothScroll} />

      {/* Search Section - Haute priorité avec lazy loading */}
      <LazySection
        rootMargin="200px"
        threshold={0.1}
        minHeight="400px"
        className="w-full"
      >
        <LazySearchSection 
          ref={searchRef}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredCount={filteredFAQs.length}
        />
      </LazySection>

      {/* FAQ Content Section - Priorité moyenne avec lazy loading */}
      <LazySection
        rootMargin="150px"
        threshold={0.15}
        minHeight="600px"
        className="w-full"
      >
        <LazyFAQContentSection 
          ref={contentRef}
          filteredFAQs={filteredFAQs}
        />
      </LazySection>

      {/* Chatbot Section - Priorité basse avec lazy loading */}
      <LazySection
        rootMargin="100px"
        threshold={0.2}
        minHeight="600px"
        className="w-full"
      >
        <LazyChatbotSection ref={chatbotRef} />
      </LazySection>

      {/* Popular Questions Section - Priorité basse avec lazy loading agressif */}
      <LazySection
        rootMargin="50px"
        threshold={0.25}
        minHeight="500px"
        className="w-full"
      >
        <LazyPopularQuestionsSection ref={popularRef} />
      </LazySection>
    </div>
  );
}