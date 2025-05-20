/**
 * footer.tsx
 * Pied de page de l'application avec informations de contact, liens rapides et zone d'intervention
 */
import Link from "next/link";
import { Mail, Phone, MapPin, Fuel, Facebook, Twitter, Instagram } from "lucide-react";
import styles from "./styles/Footer.module.css";
import { cn } from "@/lib/utils";

/**
 * Composant Footer
 * Affiche le pied de page de l'application avec sections pour les informations, les liens et la zone d'intervention
 * Responsive : s'adapte aux écrans mobile, tablette et desktop
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerBase}>
      <div className={styles.container}>
        {/* Contenu du footer adapté pour petits écrans (xs) - version visible et améliorée */}
        <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
          <div className="space-y-10 py-6">
            {/* Logo et réseaux sociaux */}
            <div className="text-center mb-2">
              <h3 className={cn(styles.brand, "text-3xl font-bold mb-4")}>Éducateur péï</h3>
              <p className={cn(styles.text, "mb-4 text-muted-foreground max-w-[90%] mx-auto")}>
                Services d&apos;assistance sociale, administratifs, psychologiques, financiers et éducatifs.
              </p>
              <div className="flex justify-center space-x-4 mb-4">
                <Link href="#" className={styles.socialIconLink}>
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className={styles.socialIconLink}>
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className={styles.socialIconLink}>
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            {/* Zone d'intervention - compact pour mobile */}
            <div className={styles.zoneCard}>
              <h3 className={cn(styles.title, "text-xl font-semibold mb-4 text-center")}>Zone d&apos;intervention</h3>
              <div className="space-y-4 flex flex-col items-start">
                <div className="flex items-start justify-start">
                  <div className={styles.iconContainer}>
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-[15px] font-alegreya">Secteur de base</p>
                    <p className={cn(styles.small, "text-muted-foreground")}>Le Tampon, Saint-Pierre, Petite-Île</p>
                  </div>
                </div>
                <div className="flex items-start justify-start">
                  <div className={styles.iconContainer}>
                    <Fuel className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-[15px] font-alegreya">Hors secteur</p>
                    <p className={cn(styles.small, "text-muted-foreground")}>Tarif de base + 0,54€/km</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section Liens rapides */}
            <div className="mb-10">
              <h3 className={cn(styles.title, "text-xl font-semibold mb-3 text-center")}>Liens rapides</h3>
              <div className={styles.gridLinkMobile}>
                <div className={styles.gridLinkItem}>
                  <Link href="/services" className={styles.smallLinkCard}>
                    <span>Domaines d&apos;interventions</span>
                  </Link>
                </div>
                <div className={styles.gridLinkItem}>
                  <Link href="/contact" className={styles.smallLinkCard}>
                    <span>Modalités d&apos;interventions</span>
                  </Link>
                </div>
                <div className={styles.gridLinkItem}>
                  <Link href="/tarifs" className={styles.smallLinkCard}>
                    <span>Tarifs</span>
                  </Link>
                </div>
                <div className={styles.gridLinkItem}>
                  <Link href="/contact" className={styles.smallLinkCard}>
                    <span>Contact</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Section Informations légales */}
            <div>
              <h3 className={cn(styles.title, "text-xl font-semibold mb-3 text-center")}>Informations légales</h3>
              <div className={styles.gridLinkMobile}>
                <div className={styles.gridLinkItem}>
                  <Link href="/legal-mentions" className={styles.smallLinkCard}>
                    <span>Mentions légales</span>
                  </Link>
                </div>
                <div className={styles.gridLinkItem}>
                  <Link href="/privacy-policies" className={styles.smallLinkCard}>
                    <span>Confidentialité</span>
                  </Link>
                </div>
                <div className={styles.gridLinkItem}>
                  <Link href="/cgu" className={styles.smallLinkCard}>
                    <span>CGU</span>
                  </Link>
                </div>
                <div className={styles.gridLinkItem}>
                 <Link href="/cookies-policies" className={styles.smallLinkCard}>
                   <span>Cookies</span>
                 </Link>
               </div>
             </div>
           </div>
         </div>
       </div>
       
       {/* Contenu du footer pour tablettes (640px-768px) - version optimisée avec agencement spécifique */}
       <div className="hidden xs:hidden sm:block md:hidden lg:hidden xl:hidden">
         <div className="grid grid-cols-1 gap-10 py-4">
           {/* Colonne 1 : Logo et info */}
           <div className="text-center mb-0">
             <h3 className={cn(styles.brand, "text-3xl font-bold mb-4")}>Éducateur péï</h3>
             <p className={cn(styles.text, "mb-4 text-muted-foreground")}>
               Services d&apos;assistance sociale, administratifs, psychologiques, financiers et éducatifs.
             </p>
             <div className="flex justify-center space-x-4 mb-4">
               <Link href="#" className={styles.socialIconLink}>
                 <Facebook className="h-5 w-5" />
               </Link>
               <Link href="#" className={styles.socialIconLink}>
                 <Twitter className="h-5 w-5" />
               </Link>
               <Link href="#" className={styles.socialIconLink}>
                 <Instagram className="h-5 w-5" />
               </Link>
             </div>
           </div>
           
           {/* Zone d'intervention - layout modifié pour 640px-768px avec éléments côte à côte */}
           <div className={styles.zoneCard}>
             <h3 className={cn(styles.title, "text-xl font-semibold mb-4 text-center")}>Zone d&apos;intervention</h3>
             <div className="flex flex-row justify-between gap-6">
               <div className="flex items-start">
                 <div className={styles.iconContainer}>
                   <MapPin className="h-4 w-4 text-primary" />
                 </div>
                 <div>
                   <p className="font-medium text-[16px] font-alegreya">Secteur de base</p>
                   <p className={cn(styles.small, "text-muted-foreground")}>Le Tampon, Saint-Pierre, Petite-Île</p>
                 </div>
               </div>
               <div className="flex items-start">
                 <div className={styles.iconContainer}>
                   <Fuel className="h-4 w-4 text-primary" />
                 </div>
                 <div>
                   <p className="font-medium text-[16px] font-alegreya">Interventions hors secteur</p>
                   <p className={cn(styles.small, "text-muted-foreground")}>Tarif de base + 0,54€/km</p>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Conteneur pour les liens rapides et informations légales côte à côte pour 640px-768px */}
           <div className="flex flex-row justify-around w-full">
             {/* Colonne gauche : Liens rapides */}
             <div>
               <h3 className={cn(styles.title, "text-xl font-semibold mb-3")}>Liens rapides</h3>
               <ul className="space-y-2">
                 <li>
                   <Link href="/services" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Domaines d&apos;intervention
                   </Link>
                 </li>
                 <li>
                   <Link href="/secteur" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Modalités d&apos;intervention
                   </Link>
                 </li>
                 <li>
                   <Link href="/tarifs" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Tarifs
                   </Link>
                 </li>
                 <li>
                   <Link href="/contact" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Contacts
                   </Link>
                 </li>
               </ul>
             </div>
             
             {/* Colonne droite : Informations légales */}
             <div>
               <h3 className={cn(styles.title, "text-xl font-semibold mb-3")}>Informations légales</h3>
               <ul className="space-y-2">
                 <li>
                   <Link href="/legal-mentions" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Mentions légales
                   </Link>
                 </li>
                 <li>
                   <Link href="/privacy-policies" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Politique de confidentialité
                   </Link>
                 </li>
                 <li>
                   <Link href="/cgu" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Conditions d&apos;utilisation
                   </Link>
                 </li>
                 <li>
                   <Link href="/cookies-policies" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Politique de cookies
                   </Link>
                 </li>
               </ul>
             </div>
           </div>
         </div>
       </div>
       
       {/* Contenu du footer pour tablettes larges (768px-1024px) - version optimisée avec agencement spécifique */}
       <div className="hidden xs:hidden sm:hidden md:block lg:hidden xl:hidden">
         <div className="grid grid-cols-1 gap-10 py-4">
           {/* Colonne 1 : Logo et info */}
           <div className="text-center mb-0">
             <h3 className={cn(styles.brand, "text-3xl font-bold mb-4")}>Éducateur péï</h3>
             <p className={cn(styles.text, "mb-4 text-muted-foreground")}>
               Services d&apos;assistance sociale, administratifs, psychologiques, financiers et éducatifs.
             </p>
             <div className="flex justify-center space-x-4 mb-4">
               <Link href="#" className={styles.socialIconLink}>
                 <Facebook className="h-5 w-5" />
               </Link>
               <Link href="#" className={styles.socialIconLink}>
                 <Twitter className="h-5 w-5" />
               </Link>
               <Link href="#" className={styles.socialIconLink}>
                 <Instagram className="h-5 w-5" />
               </Link>
             </div>
           </div>
           
           {/* Zone d'intervention - layout modifié pour 768px-1024px avec éléments côte à côte comme pour 640px-768px */}
           <div className={styles.zoneCard}>
             <h3 className={cn(styles.title, "text-xl font-semibold mb-4 text-center")}>Zone d&apos;intervention</h3>
             <div className="flex flex-row justify-between gap-6">
               <div className="flex items-start">
                 <div className={styles.iconContainer}>
                   <MapPin className="h-4 w-4 text-primary" />
                 </div>
                 <div>
                   <p className="font-medium text-[16px] font-alegreya">Secteur de base</p>
                   <p className={cn(styles.small, "text-muted-foreground")}>Le Tampon, Saint-Pierre, Petite-Île</p>
                 </div>
               </div>
               <div className="flex items-start">
                 <div className={styles.iconContainer}>
                   <Fuel className="h-4 w-4 text-primary" />
                 </div>
                 <div>
                   <p className="font-medium text-[16px] font-alegreya">Interventions hors secteur</p>
                   <p className={cn(styles.small, "text-muted-foreground")}>Tarif de base + 0,54€/km</p>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Conteneur pour les liens rapides et informations légales côte à côte avec space-around comme pour 640px-768px */}
           <div className="flex flex-row justify-around w-full">
             {/* Colonne gauche : Liens rapides */}
             <div>
               <h3 className={cn(styles.title, "text-xl font-semibold mb-3")}>Liens rapides</h3>
               <ul className="space-y-2">
                 <li>
                   <Link href="/services" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Domaines d&apos;intervention
                   </Link>
                 </li>
                 <li>
                   <Link href="/secteur" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Modalités d&apos;intervention
                   </Link>
                 </li>
                 <li>
                   <Link href="/tarifs" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Tarifs
                   </Link>
                 </li>
                 <li>
                   <Link href="/contact" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Contacts
                   </Link>
                 </li>
               </ul>
             </div>
             
             {/* Colonne droite : Informations légales */}
             <div>
               <h3 className={cn(styles.title, "text-xl font-semibold mb-3")}>Informations légales</h3>
               <ul className="space-y-2">
                 <li>
                   <Link href="/legal-mentions" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Mentions légales
                   </Link>
                 </li>
                 <li>
                   <Link href="/privacy-policies" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Politique de confidentialité
                   </Link>
                 </li>
                 <li>
                   <Link href="/cgu" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Conditions d&apos;utilisation
                   </Link>
                 </li>
                 <li>
                   <Link href="/cookies-policies" className={styles.footerLinkItem}>
                     <span className={styles.linkDot}></span>
                     Politique de cookies
                   </Link>
                 </li>
               </ul>
             </div>
           </div>
         </div>
       </div>
       
       {/* Contenu du footer pour desktop - version 4 colonnes originale */}
       <div className="hidden sm:hidden md:hidden lg:block xl:block py-8">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {/* Colonne d'information */}
           <div>
             <h3 className={cn(styles.brand, "text-3xl font-bold mb-6")}>Éducateur péï</h3>
             <p className={cn(styles.text, "mb-6 text-muted-foreground")}>
               Services d&apos;assistance sociale, administratifs, psychologiques, financiers et éducatifs.
             </p>
             <div className="flex space-x-4">
               <Link href="#" className={styles.socialIconLink}>
                 <Facebook className="h-5 w-5" />
               </Link>
               <Link href="#" className={styles.socialIconLink}>
                 <Twitter className="h-5 w-5" />
               </Link>
               <Link href="#" className={styles.socialIconLink}>
                 <Instagram className="h-5 w-5" />
               </Link>
             </div>
           </div>

           {/* Colonne de liens rapides */}
           <div>
             <h3 className={cn(styles.title, "text-xl font-semibold mb-6")}>Liens rapides</h3>
             <ul className="space-y-3">
               <li>
                 <Link href="/services" className={styles.footerLinkItem}>
                   <span className={styles.linkDot}></span>
                   Domaines d&apos;intervention
                 </Link>
               </li>
               <li>
                 <Link href="/secteur" className={styles.footerLinkItem}>
                   <span className={styles.linkDot}></span>
                   Modalités d&apos;intervention
                 </Link>
               </li>
               <li>
                 <Link href="/tarifs" className={styles.footerLinkItem}>
                   <span className={styles.linkDot}></span>
                   Tarifs
                 </Link>
               </li>
               <li>
                 <Link href="/contact" className={styles.footerLinkItem}>
                   <span className={styles.linkDot}></span>
                   Contacts
                 </Link>
               </li>
             </ul>
           </div>

           {/* Colonne des informations légales */}
           <div>
             <h3 className={cn(styles.title, "text-xl font-semibold mb-6")}>Informations légales</h3>
             <ul className="space-y-3">
               <li>
                 <Link href="/legal-mentions" className={styles.footerLinkItem}>
                   <span className={styles.linkDot}></span>
                   Mentions légales
                 </Link>
               </li>
               <li>
                 <Link href="/privacy-policies" className={styles.footerLinkItem}>
                   <span className={styles.linkDot}></span>
                   Politique de confidentialité
                 </Link>
               </li>
               <li>
                 <Link href="/cgu" className={styles.footerLinkItem}>
                   <span className={styles.linkDot}></span>
                   Conditions d&apos;utilisation (CGU)
                 </Link>
               </li>
               <li>
                 <Link href="/cookies-policies" className={styles.footerLinkItem}>
                   <span className={styles.linkDot}></span>
                   Politique de cookies
                 </Link>
               </li>
             </ul>
           </div>

           {/* Colonne de zone d'intervention */}
           <div>
             <h3 className={cn(styles.title, "text-xl font-semibold mb-6")}>Zone d&apos;intervention</h3>
             <ul className="space-y-5">
               <li className="flex items-start">
                 <div className={styles.iconContainer}>
                   <MapPin className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <p className="font-medium text-[17px] font-alegreya">Secteur de base</p>
                   <p className={cn(styles.small, "text-muted-foreground")}>Le Tampon, Saint-Pierre, Petite-Île</p>
                 </div>
               </li>
               <li className="flex items-start">
                 <div className={styles.iconContainer}>
                   <Fuel className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <p className="font-medium text-[17px] font-alegreya">Interventions hors secteur</p>
                   <p className={cn(styles.small, "text-muted-foreground")}>Tarif de base + 0,54€/km</p>
                 </div>
               </li>
             </ul>
           </div>
         </div>
       </div>

       {/* Barre de séparation et copyright - commune à toutes les versions */}
       <div className={styles.copyrightBar}>
         <p className={cn(styles.small, styles.copyrightText)}>
           © {currentYear} Éducateur Péï. Tous droits réservés.
         </p>
       </div>
     </div>
   </footer>
 );
}