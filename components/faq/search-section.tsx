"use client";

import { 
    Search, 
    HelpCircle, 
    Clock, 
    CreditCard, 
    Users, 
    Phone
  } from "lucide-react";
import React, { forwardRef } from 'react';

import { Input } from "@/components/ui/input";
import SectionTitle from '@/components/ui/section-title';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnalytics } from '@/hooks/useAnalytics';

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredCount: number;
}

const categories = [
  { id: "all", label: "Toutes les questions", icon: <HelpCircle className="w-5 h-5" /> },
  { id: "rendez-vous", label: "Rendez-vous", icon: <Clock className="w-5 h-5" /> },
  { id: "tarifs", label: "Tarifs & Paiement", icon: <CreditCard className="w-5 h-5" /> },
  { id: "services", label: "Services", icon: <Users className="w-5 h-5" /> },
  { id: "technologie", label: "Technologie", icon: <Phone className="w-5 h-5" /> }
];

const SearchSection = forwardRef<HTMLElement, SearchSectionProps>(
  function SearchSection({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, filteredCount }, ref) {
    const { trackEvent } = useAnalytics();

    const handleSearch = (term: string) => {
      setSearchTerm(term);
      if (term.length > 2) {
        trackEvent('faq_search', { query: term, page: 'faq' });
      }
    };

    const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
      trackEvent('faq_category_change', { category, page: 'faq' });
    };

    return (
      <section
        ref={ref}
        id="faq-search"
        className="py-16 lg:py-20 section-bg-2"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Recherchez votre réponse
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Utilisez la recherche ou parcourez les catégories pour trouver l'information que vous cherchez
            </p>
          </div>

          <div className="space-y-8">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Tapez votre question ou mots-clés..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 py-6 text-lg rounded-full border-primary/20 focus:border-primary"
              />
            </div>

            {/* Filtres par catégorie */}
            <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Résultats de recherche */}
            <div className="text-center text-sm text-muted-foreground">
              {filteredCount} question(s) trouvée(s)
              {searchTerm && ` pour "${searchTerm}"`}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default SearchSection;