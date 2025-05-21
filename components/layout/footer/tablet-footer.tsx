/**
 * tablet-footer.tsx
 * Version tablette du footer optimisée pour les écrans moyens
 */

import { MapPin, Fuel, Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import styles from "./styles.module.css";

interface TabletFooterProps {
  largeTablet?: boolean;
}

export default function TabletFooter({ largeTablet = false }: TabletFooterProps) {
  return (
    <div className="grid grid-cols-1 gap-10 py-4">
      {/* Colonne 1 : Logo et info */}
      <div className="text-center mb-0">
        <h3 className={cn(styles.brand, "text-3xl font-bold mb-4")}>Éducateur péï</h3>
        <p className={cn(styles.text, "mb-4 text-muted-foreground")}>
          Services d&apos;assistance sociale, administratifs, psychologiques, financiers et éducatifs.
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="#" className={styles.socialIconLink} aria-label="Facebook">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="#" className={styles.socialIconLink} aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className={styles.socialIconLink} aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      {/* Zone d'intervention - layout modifié pour tablettes avec éléments côte à côte */}
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
      
      {/* Conteneur pour les liens rapides et informations légales côte à côte */}
      <div className="flex flex-row justify-around w-full">
        {/* Colonne gauche : Liens rapides */}
        <div>
          <h3 className={cn(styles.title, "text-xl font-semibold mb-3")}>Liens rapides</h3>
          <FooterList>
            <FooterListItem href="/services" label="Domaines d'intervention" />
            <FooterListItem href="/secteur" label="Modalités d'intervention" />
            <FooterListItem href="/tarifs" label="Tarifs" />
            <FooterListItem href="/contact" label="Contacts" />
          </FooterList>
        </div>
        
        {/* Colonne droite : Informations légales */}
        <div>
          <h3 className={cn(styles.title, "text-xl font-semibold mb-3")}>Informations légales</h3>
          <FooterList>
            <FooterListItem href="/legal-mentions" label="Mentions légales" />
            <FooterListItem href="/privacy-policies" label={largeTablet ? "Politique de confidentialité" : "Confidentialité"} />
            <FooterListItem href="/cgu" label={largeTablet ? "Conditions d'utilisation" : "CGU"} />
            <FooterListItem href="/cookies-policies" label="Cookies" />
          </FooterList>
        </div>
      </div>
    </div>
  );
}

function FooterList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-2">
      {children}
    </ul>
  );
}

interface FooterListItemProps {
  href: string;
  label: string;
}

function FooterListItem({ href, label }: FooterListItemProps) {
  return (
    <li>
      <Link href={href} className={styles.footerLinkItem}>
        <span className={styles.linkDot}></span>
        {label}
      </Link>
    </li>
  );
}