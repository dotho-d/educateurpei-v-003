/**
 * header.tsx
 * Composant d'en-tête principal de l'application
 * Gère la navigation, le changement de thème et le menu mobile
 * Optimisé pour l'accessibilité
 */
"use client";

import { Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useFontSizes } from "@/hooks/useFontSizes";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";

import styles from "./styles/Header.module.css";

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
 * Amélioré pour l'accessibilité avec attributs ARIA
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
  // État pour suivre le hash actuel
  const [currentHash, setCurrentHash] = useState('');
  // Référence pour la gestion du focus
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const lastMenuItemRef = useRef<HTMLAnchorElement>(null);

  // Effet séparé pour s'assurer que mounted est défini immédiatement
  useEffect(() => {
    setMounted(true);
    
    // Récupérer le hash initial de l'URL
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash.substring(1));
      
      // Ajouter un écouteur pour les changements de hash
      const handleHashChange = () => {
        setCurrentHash(window.location.hash.substring(1));
      };
      
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
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

  // Effet pour gérer le focus quand le menu est ouvert/fermé
  useEffect(() => {
    if (isMenuOpen && firstMenuItemRef.current) {
      // Définir un court délai pour s'assurer que le menu est rendu
      setTimeout(() => {
        firstMenuItemRef.current?.focus();
      }, 100);
    }
  }, [isMenuOpen]);

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
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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
      
      // Mettre à jour l'état du hash courant
      setCurrentHash(targetId);

      // Mettre le focus sur la section cible pour l'accessibilité
      targetElement.tabIndex = -1;
      targetElement.focus({ preventScroll: true });
      // Remettre tabIndex à sa valeur par défaut après le focus
      setTimeout(() => {
        targetElement.removeAttribute('tabIndex');
      }, 1000);
    }
  };

  /**
   * Gestion de l'appui sur les touches pour la navigation clavier
   */
  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // Échap ferme le menu
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }
    
    // Navigation par tabulation avec capture de la première/dernière focusable
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstMenuItemRef.current) {
        e.preventDefault();
        lastMenuItemRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === lastMenuItemRef.current) {
        e.preventDefault();
        firstMenuItemRef.current?.focus();
      }
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
    <header className={headerClasses} role="banner">
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <Link href="/" className={cn(styles.logo, "text-3xl sm:text-4xl logo-text")} aria-label="Accueil Éducateur péï">
            Éducateur péï
          </Link>
        </div>

        {/* 
          Navigation desktop 
          - Affichage géré par CSS: visible uniquement au-dessus de 1024px
        */}
        <nav className={styles.desktopNav} aria-label="Navigation principale">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn("typography-nav", styles.navLink, "nav-link")}
                  onClick={(e) => handleSmoothScroll(e, link.href.substring(1))}
                  aria-current={link.href.substring(1) === currentHash ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
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
            aria-label="Prendre rendez-vous"
          >
            <span className={styles.ctaLinkText}>Prendre RDV</span>
            <span className={styles.ctaLinkBackground} aria-hidden="true"></span>
          </a>
          
          {/* Bouton de changement de thème sur desktop */}
          {mounted && (
            <button 
              onClick={toggleTheme} 
              className={styles.iconButton}
              aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
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
              {theme === "dark" ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
            </button>
          )}
          
          {/* Bouton de menu hamburger */}
          <button 
            ref={menuButtonRef}
            onClick={toggleMenu} 
            className={styles.iconButton}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobile en mode fit-content sans défilement */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className={cn(
            styles.mobileMenu, 
            "animate-fadeIn", 
            theme === "dark" ? styles.darkMobileMenu : styles.lightMobileMenu
          )}
          style={{ top: headerHeight }}
          role="navigation" 
          aria-label="Menu principal mobile"
          aria-hidden={!isMenuOpen}
          onKeyDown={handleMenuKeyDown}
        >
          <div className={styles.menuContainer}>
            <ul className="w-full space-y-4">
              {navLinks.map((link, index) => (
                <li key={link.href} className="w-full">
                  <a
                    ref={index === 0 ? firstMenuItemRef : undefined}
                    href={link.href}
                    className={styles.menuLink}
                    style={{ fontSize: fontSizes.navLink }}
                    onClick={(e) => handleSmoothScroll(e, link.href.substring(1))}
                    aria-current={link.href.substring(1) === currentHash ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            
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
              <Button 
                variant="outline" 
                className="rounded-btn border-primary text-primary hover:bg-primary/10 w-fit py-3 px-5" 
                asChild
              >
                <Link 
                  href="/connexion" 
                  onClick={() => setIsMenuOpen(false)}
                  className={styles.buttonText}
                  style={{ fontSize: fontSizes.button }}
                  ref={lastMenuItemRef}
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