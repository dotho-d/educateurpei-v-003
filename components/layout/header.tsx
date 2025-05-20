/**
 * header.tsx
 * Composant d'en-tête principal de l'application
 * Gère la navigation, le changement de thème et le menu mobile
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import styles from "./styles/Header.module.css";
import { useFontSizes } from "@/hooks/useFontSizes";
import { useScrollLock } from "@/hooks/useScrollLock";

// Liens de navigation pour la page d'accueil
const navLinks = [
  { href: "#domaines-intervention", label: "Expertise" },
  { href: "#services", label: "Services" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#contact", label: "Contact" },
];

/**
 * Composant Header
 * Affiche l'en-tête de l'application avec le logo, la navigation et les contrôles de thème
 * Inclut une version responsive pour mobile avec menu hamburger
 */
export default function Header() {
  // États pour gérer le menu mobile et le défilement
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  // Obtenir les tailles de police correctes
  const fontSizes = useFontSizes();
  // Hauteur du header pour les calculs du menu
  const [headerHeight, setHeaderHeight] = useState('5rem');
  // Utiliser le hook de verrouillage du défilement
  const { lockScroll, unlockScroll } = useScrollLock();

  // Effet séparé pour s'assurer que mounted est défini immédiatement
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effet pour gérer le défilement et la taille de l'écran
  useEffect(() => {
    // Fonction pour détecter le défilement et mettre à jour l'apparence de l'en-tête
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Fonction pour détecter la taille de l'écran
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Mise à jour de la hauteur du header selon le breakpoint
      if (width < 640) {
        setHeaderHeight('4rem'); // 64px
      } else if (width >= 640 && width < 768) {
        setHeaderHeight('4.5rem'); // 72px
      } else {
        setHeaderHeight('5rem'); // 80px
      }

      // Mise à jour de la variable CSS pour le menu mobile
      document.documentElement.style.setProperty('--header-height', headerHeight);
    };
    
    // Initialisation de la hauteur du header
    handleResize();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    // Contrôle du défilement du body quand le menu est ouvert
    if (isMenuOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    
    // Nettoyage des écouteurs d'événements
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      unlockScroll();
    };
  }, [isMenuOpen, headerHeight, lockScroll, unlockScroll]);

  /**
   * Fonction pour basculer entre les thèmes clair et sombre
   */
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /**
   * Fonction pour ouvrir/fermer le menu mobile
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Fonction pour gérer le défilement fluide vers les sections
   * @param e Événement de clic
   * @param targetId ID de la section cible
   */
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    // Fermer le menu mobile si ouvert
    setIsMenuOpen(false);
    
    // Sélectionner l'élément cible
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Calculer la position de l'élément cible
      const targetPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = targetPosition + window.pageYOffset - 80; // 80px pour l'en-tête
      
      // Utiliser scrollTo avec behavior: 'smooth' pour un défilement fluide
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Mettre à jour l'URL sans recharger la page
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  // Classes CSS pour l'en-tête, qui changent en fonction du défilement
  const headerClasses = cn(
    styles.headerBase,
    'h-16 sm:h-18 md:h-20 lg:h-20',
    isScrolled ? styles.headerScrolled : styles.headerNotScrolled
  );

  // Élément à rendre
  return (
    <header className={headerClasses}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <Link href="/" className={cn(styles.logo, "text-3xl sm:text-4xl logo-text")}>
            Éducateur péï
          </Link>
        </div>

        {/* 
          Navigation desktop 
          - Affichage géré par CSS: visible uniquement au-dessus de 1024px
        */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn("typography-nav", styles.navLink, "nav-link")}
              onClick={(e) => handleSmoothScroll(e, link.href.substring(1))}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* 
          Boutons d'action desktop 
          - Affichage géré par CSS: visible uniquement au-dessus de 1024px
        */}
        <div className={styles.desktopActions}>
          <a 
            href="#contact"
            className={cn(styles.ctaLink, "typography-nav")}
            onClick={(e) => handleSmoothScroll(e, 'contact')}
          >
            <span className={styles.ctaLinkText}>Prendre RDV</span>
            <span className={styles.ctaLinkBackground}></span>
          </a>
          
          {/* Bouton de changement de thème sur desktop */}
          {mounted && (
            <button 
              onClick={toggleTheme} 
              className={styles.iconButton}
              aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* 
          Contrôles mobiles 
          - Affichage géré par CSS: visible jusqu'à 1024px
        */}
        <div className={styles.mobileControls}>
          {/* Bouton de changement de thème sur mobile et tablette */}
          {mounted && (
            <button 
              onClick={toggleTheme} 
              className={cn(styles.iconButton, "mr-2")}
              aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          
          {/* Bouton de menu hamburger */}
          <button 
            onClick={toggleMenu} 
            className={styles.iconButton}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile en mode fit-content sans défilement */}
      {isMenuOpen && (
        <div 
          className={cn(
            styles.mobileMenu, 
            "animate-fadeIn", 
            theme === "dark" ? styles.darkMobileMenu : styles.lightMobileMenu
          )}
          style={{ top: headerHeight }}
        >
          <div className={styles.menuContainer}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.menuLink}
                style={{ fontSize: fontSizes.navLink }}
                onClick={(e) => handleSmoothScroll(e, link.href.substring(1))}
              >
                {link.label}
              </a>
            ))}
            
            <div 
              className={cn(
                styles.buttonContainer,
                theme === "dark" ? styles.darkButtonContainer : styles.lightButtonContainer
              )}
            >
              <Button className="rounded-btn bg-primary hover:bg-primary/90 w-fit py-3 px-5" asChild>
                <a 
                  href="#contact" 
                  onClick={(e) => handleSmoothScroll(e, 'contact')}
                  className={styles.buttonText}
                  style={{ fontSize: fontSizes.button }}
                >
                  Prendre RDV
                </a>
              </Button>
              <Button variant="outline" className="rounded-btn border-primary text-primary hover:bg-primary/10 w-fit py-3 px-5" asChild>
                <Link 
                  href="/connexion" 
                  onClick={() => setIsMenuOpen(false)}
                  className={styles.buttonText}
                  style={{ fontSize: fontSizes.button }}
                >
                  Connexion
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}