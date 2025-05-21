/**
 * domaines-section.tsx
 * Section des domaines d'intervention affichant un slideshow avec les différents domaines
 */
import React, { forwardRef } from 'react';

import Section from '@/components/ui/section';
import SectionTitle from '@/components/ui/section-title';
import Slideshow from '@/components/ui/slideshow/slideshow';

import SlideContent from './slide-content';

/**
 * Section des domaines d'intervention
 * Affiche un slideshow avec les différents domaines d'intervention
 */
const DomainesSection = forwardRef<HTMLElement, {}>(function DomainesSection(props, ref) {
  // Données des slides
  const slides = [
    // Slide 1: Handicap
    {
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
    
    // Slide 2: Conflits familiaux et difficultés éducatives
    {
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
    
    // Slide 3: Addictions
    {
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
    
    // Slide 4: Accompagnement administratif et social
    {
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
    
    // Slide 5: Insertion professionnelle
    {
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
  ];

  // Titres des slides pour le slideshow
  const slideTitles = slides.map(slide => slide.title);

  return (
    <Section
      ref={ref}
      id="domaines-intervention"
      background="secondary"
      withPadding={true}
    >
      <SectionTitle>
        Nos domaines d&apos;intervention
      </SectionTitle>

      <Slideshow autoPlay={true} interval={24000} slideTitles={slideTitles}>
        {slides.map((slide, index) => (
          <SlideContent
            key={`slide-content-${index}`}
            description={slide.description}
            points={slide.points}
            linkUrl={slide.linkUrl}
            linkText={slide.linkText}
          />
        ))}
      </Slideshow>
    </Section>
  );
});

DomainesSection.displayName = 'DomainesSection';

export default DomainesSection;