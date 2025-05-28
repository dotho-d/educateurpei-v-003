/**
 * scripts/extract-critical-css.js
 * Script pour extraire le CSS critique above-the-fold
 */
const critical = require('critical');
const fs = require('fs');
const path = require('path');

async function extractCriticalCSS() {
  try {
    console.log('🎯 Extraction du CSS critique...');
    
    // Extraire CSS critique pour la page d'accueil
    const { css: homeCritical } = await critical.generate({
      base: '.next/',
      src: 'http://localhost:3000',
      dest: 'public/critical/home.css',
      inline: false,
      width: 1300,
      height: 900,
      penthouse: {
        blockJSRequests: false,
      },
      ignore: {
        atrule: ['@font-face'],
        rule: [/\.sr-only/],
        decl: (node, value) => {
          // Ignorer les propriétés CSS non critiques
          return /url\(/.test(value);
        }
      }
    });

    // Extraire CSS critique pour mobile
    const { css: mobileCritical } = await critical.generate({
      base: '.next/',
      src: 'http://localhost:3000',
      dest: 'public/critical/mobile.css',
      inline: false,
      width: 375,
      height: 667,
      penthouse: {
        blockJSRequests: false,
      },
      ignore: {
        atrule: ['@font-face'],
        rule: [/\.sr-only/],
      }
    });

    // Créer un CSS critique combiné optimisé
    const combinedCritical = `
/* Critical CSS - Above the fold */
${homeCritical}

@media (max-width: 768px) {
${mobileCritical}
}
`;

    // Écrire le fichier critique final
    if (!fs.existsSync('public/critical')) {
      fs.mkdirSync('public/critical', { recursive: true });
    }
    
    fs.writeFileSync('public/critical/critical.css', combinedCritical);
    
    console.log('✅ CSS critique extrait avec succès !');
    console.log(`📊 Taille du CSS critique : ${(combinedCritical.length / 1024).toFixed(2)}KB`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'extraction du CSS critique:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  extractCriticalCSS();
}

module.exports = { extractCriticalCSS };