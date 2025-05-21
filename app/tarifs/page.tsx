
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import CTASection from '@/components/home/cta-section/cta-section';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function TarifsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tarifs accessibles et transparents
            </h1>
            <p className="text-xl text-muted-foreground">
              Nous proposons des services de travail social à des tarifs abordables, avec une tarification claire et sans surprise.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choisissez la formule adaptée à vos besoins</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous proposons différentes formules pour répondre aux besoins spécifiques de chaque situation.
            </p>
          </div>

          <Tabs defaultValue="individuel" className="w-full max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="individuel">Accompagnement individuel</TabsTrigger>
                <TabsTrigger value="famille">Accompagnement familial</TabsTrigger>
                <TabsTrigger value="ponctuel">Services ponctuels</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="individuel" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PricingCard
                  title="Essentiel"
                  price="30€"
                  period="par séance"
                  description="Pour un accompagnement administratif et social de base."
                  features={[
                    "Rendez-vous en présentiel ou en ligne",
                    "Aide aux démarches administratives",
                    "Information sur les droits sociaux",
                    "Accès à l'espace personnel en ligne",
                  ]}
                  buttonText="Choisir cette formule"
                  buttonLink="/rendez-vous?formule=essentiel-individuel"
                  popular={false}
                />
                
                <PricingCard
                  title="Intégral"
                  price="45€"
                  period="par séance"
                  description="Pour un accompagnement social complet et personnalisé."
                  features={[
                    "Tous les avantages de la formule Essentiel",
                    "Suivi personnalisé continu",
                    "Objectifs individuels et suivi de progression",
                    "Échange de documents sécurisé",
                    "Assistance téléphonique prioritaire",
                  ]}
                  buttonText="Choisir cette formule"
                  buttonLink="/rendez-vous?formule=integral-individuel"
                  popular={true}
                />
                
                <PricingCard
                  title="Premium"
                  price="60€"
                  period="par séance"
                  description="Pour un accompagnement global et intensif."
                  features={[
                    "Tous les avantages de la formule Intégral",
                    "Réponse garantie sous 24h",
                    "Médiation avec les administrations",
                    "Accompagnement budgétaire personnalisé",
                    "Accès illimité au chatbot spécialisé",
                  ]}
                  buttonText="Choisir cette formule"
                  buttonLink="/rendez-vous?formule=premium-individuel"
                  popular={false}
                />
              </div>
            </TabsContent>

            <TabsContent value="famille" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PricingCard
                  title="Famille Essentiel"
                  price="45€"
                  period="par séance"
                  description="Pour un accompagnement administratif et social familial."
                  features={[
                    "Rendez-vous en présentiel ou en ligne",
                    "Aide aux démarches administratives familiales",
                    "Information sur les droits sociaux",
                    "Accès à l'espace familial en ligne",
                  ]}
                  buttonText="Choisir cette formule"
                  buttonLink="/rendez-vous?formule=essentiel-famille"
                  popular={false}
                />
                
                <PricingCard
                  title="Famille Intégral"
                  price="60€"
                  period="par séance"
                  description="Pour un accompagnement familial complet et personnalisé."
                  features={[
                    "Tous les avantages de la formule Famille Essentiel",
                    "Suivi familial continu",
                    "Objectifs familiaux et suivi de progression",
                    "Soutien à la parentalité",
                    "Assistance téléphonique prioritaire",
                  ]}
                  buttonText="Choisir cette formule"
                  buttonLink="/rendez-vous?formule=integral-famille"
                  popular={true}
                />
                
                <PricingCard
                  title="Famille Premium"
                  price="75€"
                  period="par séance"
                  description="Pour un accompagnement familial global et intensif."
                  features={[
                    "Tous les avantages de la formule Famille Intégral",
                    "Réponse garantie sous 24h",
                    "Médiation familiale",
                    "Accompagnement budgétaire familial",
                    "Accès illimité au chatbot spécialisé",
                  ]}
                  buttonText="Choisir cette formule"
                  buttonLink="/rendez-vous?formule=premium-famille"
                  popular={false}
                />
              </div>
            </TabsContent>

            <TabsContent value="ponctuel" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <PricingCard
                  title="Consultation unique"
                  price="40€"
                  period="séance unique"
                  description="Pour une aide ponctuelle sur une problématique précise."
                  features={[
                    "Rendez-vous en présentiel ou en ligne",
                    "Analyse de votre situation",
                    "Conseils personnalisés",
                    "Orientation vers les services adaptés",
                  ]}
                  buttonText="Réserver une consultation"
                  buttonLink="/rendez-vous?formule=consultation-unique"
                  popular={false}
                />
                
                <PricingCard
                  title="Dossier administratif"
                  price="50€"
                  period="par dossier"
                  description="Pour une aide complète sur un dossier administratif spécifique."
                  features={[
                    "Analyse de votre situation",
                    "Constitution du dossier complet",
                    "Rédaction des courriers nécessaires",
                    "Suivi du dossier jusqu'à sa résolution",
                  ]}
                  buttonText="Demander un devis"
                  buttonLink="/contact?sujet=devis-dossier"
                  popular={false}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comparaison des tarifs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment nos tarifs se comparent aux services traditionnels.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Service</th>
                  <th className="p-4 text-right">Tarif traditionnel</th>
                  <th className="p-4 text-right">Notre tarif</th>
                  <th className="p-4 text-right">Économie</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Consultation sociale</td>
                  <td className="p-4 text-right">Souvent gratuit mais délai d&apos;attente de plusieurs semaines/mois</td>
                  <td className="p-4 text-right font-medium">30€-45€</td>
                  <td className="p-4 text-right">Accès immédiat</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Consultation psychologique</td>
                  <td className="p-4 text-right">60€-120€</td>
                  <td className="p-4 text-right font-medium">45€-60€</td>
                  <td className="p-4 text-right">25-50%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Accompagnement éducatif</td>
                  <td className="p-4 text-right">70€-100€</td>
                  <td className="p-4 text-right font-medium">45€-75€</td>
                  <td className="p-4 text-right">25-35%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Médiation familiale</td>
                  <td className="p-4 text-right">80€-150€</td>
                  <td className="p-4 text-right font-medium">60€-75€</td>
                  <td className="p-4 text-right">25-50%</td>
                </tr>
                <tr>
                  <td className="p-4">Constitution de dossier administratif</td>
                  <td className="p-4 text-right">70€-120€</td>
                  <td className="p-4 text-right font-medium">50€</td>
                  <td className="p-4 text-right">30-60%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes sur nos tarifs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des réponses aux questions les plus courantes concernant notre tarification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Comment se déroule le paiement ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Vous pouvez payer par carte bancaire lors de la prise de rendez-vous en ligne, ou par espèces, chèque ou carte bancaire lors de la consultation.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Les consultations sont-elles remboursées ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Nos consultations ne sont pas prises en charge par l'assurance maladie. Cependant, certaines mutuelles peuvent proposer une prise en charge partielle.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Proposez-vous des tarifs adaptés aux revenus ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Oui, dans certaines situations, nous pouvons proposer des tarifs adaptés aux revenus. N'hésitez pas à nous contacter pour en discuter.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Puis-je annuler ou reporter un rendez-vous ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Oui, vous pouvez annuler ou reporter un rendez-vous jusqu'à 24h avant la consultation sans frais. Passé ce délai, la consultation sera due.</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/contact" className="flex items-center justify-center">
                Autres questions ? Contactez-nous <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  popular: boolean;
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonLink,
  popular
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col h-full relative border ${popular ? 'border-primary shadow-md' : ''}`}>
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
          Recommandé
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="mt-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-1">{period}</span>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={popular ? "default" : "outline"} 
          asChild
        >
          <Link href={buttonLink}>
            {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}