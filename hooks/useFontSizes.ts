// hooks/useFontSizes.ts
import { useState, useEffect } from 'react';

/**
 * Interface définissant la structure de l'objet retourné par le hook
 */
interface FontSizes {
  navLink: string;
  button: string;
}

/**
 * Hook personnalisé pour gérer les tailles de police responsives
 * Ajuste automatiquement les tailles en fonction de la largeur d'écran
 * 
 * @returns Un objet contenant les tailles de police pour différents éléments
 */
export function useFontSizes(): FontSizes {
  const [fontSizes, setFontSizes] = useState<FontSizes>({
    navLink: "24px",
    button: "24px"
  });
  
  useEffect(() => {
    /**
     * Met à jour les tailles de police en fonction de la largeur d'écran
     */
    function updateFontSizes(): void {
      const width = window.innerWidth;
      let navLinkSize: string, buttonSize: string;
      
      if (width < 480) {
        navLinkSize = "18px";
        buttonSize = "18px";
      } else if (width >= 480 && width < 640) {
        navLinkSize = "20px";
        buttonSize = "20px";
      } else if (width >= 640 && width < 768) {
        navLinkSize = "21px";
        buttonSize = "21px";
      } else if (width >= 768 && width < 1024) {
        navLinkSize = "22px";
        buttonSize = "22px";
      } else {
        navLinkSize = "24px";
        buttonSize = "24px";
      }
      
      setFontSizes({
        navLink: navLinkSize,
        button: buttonSize
      });
    }
    
    // Initialiser les tailles
    updateFontSizes();
    
    // Mettre à jour lors du redimensionnement
    window.addEventListener('resize', updateFontSizes);
    
    // Nettoyer l'event listener au démontage
    return () => {
      window.removeEventListener('resize', updateFontSizes);
    };
  }, []);
  
  return fontSizes;
}

export default useFontSizes;