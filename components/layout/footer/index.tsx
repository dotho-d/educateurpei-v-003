/**
 * index.tsx
 * Point d'entrée du composant Footer qui affiche différentes versions selon la taille d'écran
 */

import { cn } from "@/lib/utils";

import CopyrightBar from "./copyright-bar";
import DesktopFooter from "./desktop-footer";
import MobileFooter from "./mobile-footer";
import styles from "./styles.module.css";
import TabletFooter from "./tablet-footer";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerBase}>
      <div className={styles.container}>
        {/* Version mobile (visible uniquement sur les petits écrans) */}
        <div className="block sm:hidden">
          <MobileFooter />
        </div>
        
        {/* Version tablette (visible uniquement sur les écrans moyens) */}
        <div className="hidden sm:block md:hidden">
          <TabletFooter />
        </div>
        
        {/* Version tablette large (visible uniquement sur certains écrans) */}
        <div className="hidden md:block lg:hidden">
          <TabletFooter largeTablet />
        </div>
        
        {/* Version desktop (visible uniquement sur grands écrans) */}
        <div className="hidden lg:block">
          <DesktopFooter />
        </div>
        
        {/* Barre de copyright (commune à toutes les versions) */}
        <CopyrightBar year={currentYear} />
      </div>
    </footer>
  );
}