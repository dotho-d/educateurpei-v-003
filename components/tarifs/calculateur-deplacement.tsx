"use client";

import { MapPin } from "lucide-react";
import React, { forwardRef, useState, useEffect } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from "@/lib/utils";

const CalculateurDeplacement = forwardRef<HTMLElement, {}>(
  function CalculateurDeplacement(props, ref) {
    const { trackEvent } = useAnalytics();
    
    const [distance, setDistance] = useState('');
    const [travelCost, setTravelCost] = useState(0);
    const [calculatedCost] = useState(192); // Exemple avec forfait 6h

    // Calcul frais de déplacement
    useEffect(() => {
      const dist = parseFloat(distance) || 0;
      const kmCost = dist > 15 ? (dist - 15) * 0.54 : 0;
      setTravelCost(kmCost);

      // Track travel calculator usage
      if (dist > 0) {
        trackEvent('travel_calculator_used', { 
          distance: dist,
          cost: kmCost,
          page: 'tarifs'
        });
      }
    }, [distance, trackEvent]);

    return (
      <section
        ref={ref}
        id="frais-deplacement"
        className="py-16 lg:py-20 section-bg-2"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Calculateur frais de déplacement
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Calculez les frais supplémentaires pour les interventions hors secteur de base
            </p>
          </div>

          <Card className="bg-gradient-to-br from-background to-secondary/5 border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-secondary" />
                Zone d'intervention et frais kilométriques
              </CardTitle>
              <CardDescription>
                Secteur de base gratuit : Le Tampon, Saint-Pierre, Petite-Île
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="distance">Distance depuis Le Tampon (km)</Label>
                    <input
                      id="distance"
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      placeholder="Ex: 25"
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Les 15 premiers kilomètres sont gratuits
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Communes du secteur de base :</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Le Tampon (0 km)</li>
                      <li>• Saint-Pierre (12 km)</li>
                      <li>• Petite-Île (8 km)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-6">
                  <h3 className="font-alegreya text-xl font-semibold mb-4">Calcul des frais</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Distance :</span>
                      <span>{distance || 0} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Km gratuits :</span>
                      <span>15 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Km facturés :</span>
                      <span>{Math.max(0, (parseFloat(distance) || 0) - 15)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tarif km :</span>
                      <span>0,54€</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Frais de déplacement :</span>
                        <span className="text-xl font-bold text-secondary">{travelCost.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>

                  {parseFloat(distance) > 0 && (
                    <div className="mt-4 p-3 bg-background rounded-lg">
                      <div className="text-center">
                        <span className="text-sm text-muted-foreground">Coût total avec déplacement :</span>
                        <div className="text-2xl font-bold text-primary">
                          {(calculatedCost + travelCost).toFixed(2)}€
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }
);

export default CalculateurDeplacement;