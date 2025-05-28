"use client";

import { 
    Calculator, 
    ArrowRight
  } from "lucide-react";
import Link from "next/link";
import React, { forwardRef, useState, useEffect } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from "@/lib/utils";

const SimulateurCout = forwardRef<HTMLElement, {}>(
  function SimulateurCout(props, ref) {
    const { trackEvent } = useAnalytics();
    
    const [selectedFormula, setSelectedFormula] = useState('hourly');
    const [sessions, setSessions] = useState([6]);
    const [calculatedCost, setCalculatedCost] = useState(0);

    // Calcul automatique des coûts
    useEffect(() => {
      let baseCost = 0;
      const sessionCount = sessions[0];

      if (selectedFormula === 'hourly') {
        baseCost = sessionCount * 36;
      } else if (selectedFormula === 'package6') {
        baseCost = 192;
      } else if (selectedFormula === 'package12') {
        baseCost = 336;
      } else if (selectedFormula === 'package24') {
        baseCost = 576;
      }

      setCalculatedCost(baseCost);

      // Track calculator usage
      if (baseCost > 0) {
        trackEvent('cost_calculator_used', { 
          formula: selectedFormula,
          sessions: sessionCount,
          cost: baseCost
        });
      }
    }, [selectedFormula, sessions, trackEvent]);

    const handleCTAClick = () => {
      trackEvent('simulator_cta_click', { cost: calculatedCost, page: 'tarifs' });
    };

    return (
      <section
        ref={ref}
        id="simulateur"
        className="py-16 lg:py-20 section-bg-1"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Simulateur de coût
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Calculez le coût de votre accompagnement selon vos besoins
            </p>
          </div>

          <Card className="bg-gradient-to-br from-background to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-primary" />
                Calculateur personnalisé
              </CardTitle>
              <CardDescription>
                Sélectionnez vos préférences pour obtenir une estimation précise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="formula">Type d'accompagnement</Label>
                    <select 
                      value={selectedFormula} 
                      onChange={(e) => setSelectedFormula(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="hourly">Séances à l'unité (36€/h)</option>
                      <option value="package6">Forfait 6h (32€/h)</option>
                      <option value="package12">Forfait 12h (28€/h)</option>
                      <option value="package24">Forfait 24h (24€/h)</option>
                    </select>
                  </div>

                  {selectedFormula === 'hourly' && (
                    <div>
                      <Label>Nombre de séances prévues : {sessions[0]}</Label>
                      <input
                        type="range"
                        min="1"
                        max="24"
                        value={sessions[0]}
                        onChange={(e) => setSessions([parseInt(e.target.value)])}
                        className="w-full mt-2 accent-primary"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1 séance</span>
                        <span>24 séances</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6">
                  <h3 className="font-alegreya text-xl font-semibold mb-4">Estimation de coût</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Coût base :</span>
                      <span className="font-semibold">{calculatedCost}€</span>
                    </div>
                    {selectedFormula === 'hourly' && sessions[0] >= 6 && (
                      <div className="text-sm text-muted-foreground">
                        💡 Économisez {(sessions[0] * 36) - (sessions[0] >= 24 ? 576 : sessions[0] >= 12 ? 336 : 192)}€ avec un forfait !
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total estimé :</span>
                        <span className="text-2xl font-bold text-primary">{calculatedCost}€</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  asChild 
                  className="rounded-full"
                  onClick={handleCTAClick}
                >
                  <Link href="/contact">
                    Réserver ma consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }
);

export default SimulateurCout;