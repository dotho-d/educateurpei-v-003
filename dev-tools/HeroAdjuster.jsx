/**
 * HeroAdjuster.jsx - Outil de développement pour ajuster la position Hero
 * À utiliser uniquement pendant le développement
 */
"use client";

import { useState, useEffect } from 'react';

const HeroAdjuster = () => {
  // Vérifier côté client si nous sommes en développement
  const [isDev, setIsDev] = useState(false);
  
  useEffect(() => {
    // Initialiser l'état isDev une fois monté côté client
    setIsDev(process.env.NODE_ENV === 'development');
  }, []);
  
  const [settings, setSettings] = useState({
    imageY: 0,
    circlesY: 0
  });

  useEffect(() => {
    // Appliquer les valeurs aux variables CSS
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--hero-image-y', `${settings.imageY}%`);
      root.style.setProperty('--hero-circles-y', `${settings.circlesY}%`);
    }
  }, [settings]);

  // Ne rien rendre si nous ne sommes pas en développement
  if (!isDev) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 rounded-lg shadow-lg z-50 max-w-sm border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold mb-4 text-sm">Hero Position Adjuster</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="imageYOffset" className="block text-xs text-gray-600 dark:text-gray-300 mb-1">Image Y Offset</label>
          <input
            id="imageYOffset"
            type="range"
            min="-20"
            max="20"
            value={settings.imageY}
            onChange={(e) => setSettings(prev => ({ ...prev, imageY: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">{settings.imageY}%</span>
        </div>
        
        <div>
          <label htmlFor="circlesYOffset" className="block text-xs text-gray-600 dark:text-gray-300 mb-1">Circles Y Offset</label>
          <input
            type="range"
            min="-20"
            max="20"
            value={settings.circlesY}
            onChange={(e) => setSettings(prev => ({ ...prev, circlesY: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">{settings.circlesY}%</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            const css = `
@media (max-width: 1024px) {
  :root {
    --hero-image-y: ${settings.imageY}%;
    --hero-circles-y: ${settings.circlesY}%;
  }
}`;
            console.log(css);
            alert('CSS copied to console!');
          }}
          className="w-full bg-blue-500 text-white text-xs px-3 py-1.5 rounded mt-2 hover:bg-blue-600 transition-colors"
        >
          Copy CSS to Console
        </button>
      </div>
    </div>
  );
};

export default HeroAdjuster;