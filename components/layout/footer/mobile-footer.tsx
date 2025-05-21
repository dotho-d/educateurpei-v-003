/**
 * mobile-footer.tsx
 * Version mobile du footer optimisée pour les petits écrans
 */

import { Mail, Phone, MapPin, Fuel, Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import styles from "./styles.module.css";

export default function MobileFooter() {
  return (
    <div className="space-y-10 py-6">
      {/* Logo et réseaux sociaux */}
      <div className="text-center mb-2">
        <h3 className={cn(styles.brand, "text-3xl font-bold mb-4")}>Éducateur péï</h3>
        <p className={cn(styles.text, "mb-4 text-muted-foreground max-w-[90%] mx-auto")}>
          Services d&apos;assistance sociale, administratifs, psychologiques, financiers et éducatifs.
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <SocialLinks />
        </div>
      </div>
      
      {/* Zone d'intervention - compact pour mobile */}
      <div className={styles.zoneCard}>
        <h3 className={cn(styles.title, "text-xl font-semibold mb-4 text-center")}>Zone d&apos;intervention</h3>
        <div className="space-y-4 flex flex-col items-start">
          <ZoneInfo 
            icon={<MapPin className="h-4 w-4 text-primary" />}
            title="Secteur de base"
            description="Le Tampon, Saint-Pierre, Petite-Île"
          />
          <ZoneInfo 
            icon={<Fuel className="h-4 w-4 text-primary" />}
            title="Hors secteur"
            description="Tarif de base + 0,54€/km"
          />
        </div>
      </div>
      
      {/* Section Liens rapides */}
      <div className="mb-10">
        <h3 className={cn(styles.title, "text-xl font-semibold mb-3 text-center")}>Liens rapides</h3>
        <div className={styles.gridLinkMobile}>
          <FooterGridLink href="/services" label="Domaines d'interventions" />
          <FooterGridLink href="/contact" label="Modalités d'interventions" />
          <FooterGridLink href="/tarifs" label="Tarifs" />
          <FooterGridLink href="/contact" label="Contact" />
        </div>
      </div>

      {/* Section Informations légales */}
      <div>
        <h3 className={cn(styles.title, "text-xl font-semibold mb-3 text-center")}>Informations légales</h3>
        <div className={styles.gridLinkMobile}>
          <FooterGridLink href="/legal-mentions" label="Mentions légales" />
          <FooterGridLink href="/privacy-policies" label="Confidentialité" />
          <FooterGridLink href="/cgu" label="CGU" />
          <FooterGridLink href="/cookies-policies" label="Cookies" />
        </div>
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <>
      <Link href="#" className={styles.socialIconLink} aria-label="Facebook">
        <Facebook className="h-5 w-5" />
      </Link>
      <Link href="#" className={styles.socialIconLink} aria-label="Twitter">
        <Twitter className="h-5 w-5" />
      </Link>
      <Link href="#" className={styles.socialIconLink} aria-label="Instagram">
        <Instagram className="h-5 w-5" />
      </Link>
    </>
  );
}

interface ZoneInfoProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ZoneInfo({ icon, title, description }: ZoneInfoProps) {
  return (
    <div className="flex items-start justify-start">
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <div>
        <p className="font-medium text-[15px] font-alegreya">{title}</p>
        <p className={cn(styles.small, "text-muted-foreground")}>{description}</p>
      </div>
    </div>
  );
}

interface FooterGridLinkProps {
  href: string;
  label: string;
}

function FooterGridLink({ href, label }: FooterGridLinkProps) {
  return (
    <div className={styles.gridLinkItem}>
      <Link href={href} className={styles.smallLinkCard}>
        <span>{label}</span>
      </Link>
    </div>
  );
}