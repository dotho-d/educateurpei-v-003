const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Liste de toutes les dépendances Radix UI dans package.json
const radixPackages = [
  '@radix-ui/react-accordion',
  '@radix-ui/react-alert-dialog',
  '@radix-ui/react-aspect-ratio',
  '@radix-ui/react-avatar',
  '@radix-ui/react-checkbox',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-context-menu',
  '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu',
  '@radix-ui/react-hover-card',
  '@radix-ui/react-label',
  '@radix-ui/react-menubar',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-popover',
  '@radix-ui/react-progress',
  '@radix-ui/react-radio-group',
  '@radix-ui/react-scroll-area',
  '@radix-ui/react-select',
  '@radix-ui/react-separator',
  '@radix-ui/react-slider',
  '@radix-ui/react-slot',
  '@radix-ui/react-switch',
  '@radix-ui/react-tabs',
  '@radix-ui/react-toast',
  '@radix-ui/react-toggle',
  '@radix-ui/react-toggle-group',
  '@radix-ui/react-tooltip'
];

// Répertoires à analyser
const directories = ['app', 'components', 'lib', 'hooks', 'utils'];

// Extensions de fichiers à analyser
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Récupération de tous les fichiers source
const sourceFiles = [];
directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    const pattern = `${dir}/**/*+(${extensions.join('|')})`;
    const files = glob.sync(pattern);
    sourceFiles.push(...files);
  }
});

console.log(`Analysing ${sourceFiles.length} files for Radix UI imports...`);

// Initialiser un compteur d'utilisation pour chaque package Radix
const radixUsage = {};
radixPackages.forEach(pkg => {
  radixUsage[pkg] = {
    imported: false,
    importedIn: [],
    components: new Set() // Pour suivre les composants spécifiques utilisés
  };
});

// Analyser chaque fichier source
sourceFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Rechercher les imports Radix
  radixPackages.forEach(pkg => {
    // Patterns d'import possibles
    const importPatterns = [
      new RegExp(`from\\s+['"]${pkg}['"]`), // import X from '@radix-ui/...'
      new RegExp(`import\\s+{[^}]*}\\s+from\\s+['"]${pkg}['"]`), // import { X } from '@radix-ui/...'
      new RegExp(`require\\(['"]${pkg}['"]\\)`), // require('@radix-ui/...')
    ];
    
    // Vérifier chaque pattern
    for (const pattern of importPatterns) {
      if (pattern.test(content)) {
        radixUsage[pkg].imported = true;
        radixUsage[pkg].importedIn.push(file);
        
        // Extraction des composants spécifiques importés
        const importMatch = content.match(new RegExp(`import\\s+{([^}]*)}\\s+from\\s+['"]${pkg}['"]`));
        if (importMatch && importMatch[1]) {
          const components = importMatch[1].split(',').map(comp => comp.trim());
          components.forEach(comp => radixUsage[pkg].components.add(comp));
        }
        
        break; // Un match trouvé, passer au package suivant
      }
    }
  });
});

// Organiser les résultats
const usedPackages = [];
const unusedPackages = [];

radixPackages.forEach(pkg => {
  const usage = radixUsage[pkg];
  if (usage.imported) {
    usedPackages.push({
      package: pkg,
      components: Array.from(usage.components),
      files: usage.importedIn
    });
  } else {
    unusedPackages.push(pkg);
  }
});

// Afficher les résultats
console.log('\n=============================================');
console.log('RAPPORT D\'ANALYSE DES COMPOSANTS RADIX UI');
console.log('=============================================\n');

console.log('PACKAGES RADIX UI NON UTILISÉS:');
console.log('---------------------------------------------');
if (unusedPackages.length > 0) {
  unusedPackages.forEach(pkg => {
    console.log(`- ${pkg}`);
  });
  
  console.log('\nSuppression recommandée (commande npm):');
  console.log(`npm uninstall ${unusedPackages.join(' ')}`);
} else {
  console.log('Tous les packages Radix UI sont utilisés dans le projet.');
}

console.log('\n\nPACKAGES RADIX UI UTILISÉS:');
console.log('---------------------------------------------');
usedPackages.forEach(({ package: pkg, components, files }) => {
  console.log(`\n${pkg}:`);
  console.log(`  Composants: ${components.length > 0 ? components.join(', ') : 'Utilisation générique'}`);
  console.log(`  Importé dans ${files.length} fichiers, exemple: ${files[0]}`);
});

// Sauvegarde du rapport dans un fichier
const reportContent = `
# Rapport d'analyse des composants Radix UI
Date: ${new Date().toLocaleString()}

## Packages Radix UI non utilisés (${unusedPackages.length})
${unusedPackages.map(pkg => `- ${pkg}`).join('\n')}

## Packages Radix UI utilisés (${usedPackages.length})
${usedPackages.map(({ package: pkg, components, files }) => 
  `### ${pkg}\n- Composants: ${components.length > 0 ? components.join(', ') : 'Utilisation générique'}\n- Importé dans ${files.length} fichiers`
).join('\n\n')}

## Commande pour supprimer les packages inutilisés
\`\`\`
npm uninstall ${unusedPackages.join(' ')}
\`\`\`
`;

fs.writeFileSync('radix-ui-analysis.md', reportContent);
console.log('\n\nRapport détaillé enregistré dans "radix-ui-analysis.md"');