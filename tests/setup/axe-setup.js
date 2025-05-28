/**
 * tests/setup/axe-setup.js
 * Configuration axe-core pour tests d'accessibilité
 */
import 'jest-axe/extend-expect';
import { configureAxe } from 'jest-axe';

// Configuration globale d'axe-core
const axe = configureAxe({
  rules: {
    // Règles WCAG 2.1 AA
    'color-contrast': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'aria-required-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'button-name': { enabled: true },
    'image-alt': { enabled: true },
    'label': { enabled: true },
    'link-name': { enabled: true },
    'heading-order': { enabled: true },
    
    // Désactiver certaines règles pour dev
    'landmark-one-main': { enabled: false }, // Peut être problématique en dev
    'region': { enabled: false }, // Peut être trop strict
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
});

global.axe = axe;