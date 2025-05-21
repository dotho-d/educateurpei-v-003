/**
 * desktop-footer.tsx
 * Version desktop du footer optimisée pour les grands écrans
 */

import { Facebook, Twitter, Instagram, MapPin, Fuel } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import styles from "./styles.module.css";

export default function DesktopFooter() {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Colonne d'information */}
        <div>
          <h3 className={cn(styles.brand, "text-3xl font-bold mb-6")}>Éducateur péï</h3>
          <p className={cn(styles.text, "mb-6 text-muted-foreground")}>
            Services d&apos;assistance sociale, administratifs, psychologiques, financiers et éducatifs.
          </p>
          <div className="flex space-x-4">
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

        {/* Colonne de liens rapides */}
        <div>
          <h3 className={cn(styles.title, "text-xl font-semibold mb-6")}>Liens rapides</h3>
          <ul className="space-y-3">
            <FooterListItem href="/services" label="Domaines d'intervention" />
            <FooterListItem href="/secteur" label="Modalités d'intervention" />
            <FooterListItem href="/tarifs" label="Tarifs" />
            <FooterListItem href="/contact" label="Contacts" />
          </ul>
        </div>

        {/* Colonne des informations légales */}
        <div>
          <h3 className={cn(styles.title, "text-xl font-semibold mb-6")}>Informations légales</h3>
          <ul className="space-y-3">
            <FooterListItem href="/legal-mentions" label="Mentions légales" />
            <FooterListItem href="/privacy-policies" label="Politique de confidentialité" />
            <FooterListItem href="/cgu" label="Conditions d'utilisation (CGU)" />
            <FooterListItem href="/cookies-policies" label="Politique de cookies" />
          </ul>
        </div>

        {/* Colonne de zone d'intervention */}
        <div>
          <h3 className={cn(styles.title, "text-xl font-semibold mb-6")}>Zone d&apos;intervention</h3>
          <ul className="space-y-5">
            <ZoneInfoItem 
              icon={<MapPin className="h-5 w-5 text-primary" />}
              title="Secteur de base"
              description="Le Tampon, Saint-Pierre, Petite-Île"
            />
            <ZoneInfoItem 
              icon={<Fuel className="h-5 w-5 text-primary" />}
              title="Interventions hors secteur"
              description="Tarif de base + 0,54€/km"
            />
          </ul>
        </div>
      </div>
    </div>
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

interface ZoneInfoItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ZoneInfoItem({ icon, title, description }: ZoneInfoItemProps) {
  return (
    <li className="flex items-start">
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <div>
        <p className="font-medium text-[17px] font-alegreya">{title}</p>
        <p className={cn(styles.small, "text-muted-foreground")}>{description}</p>
      </div>
    </li>
  );
}