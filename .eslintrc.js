/**
 * Configuration ESLint pour l'application Next.js
 * Inclut des règles pour React, TypeScript et l'accessibilité
 */
module.exports = {
    extends: [
      'next/core-web-vitals',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:jsx-a11y/recommended',
    ],
    plugins: ['react', '@typescript-eslint', 'jsx-a11y'],
    rules: {
      // Désactive la nécessité d'importer React dans chaque fichier (non nécessaire depuis React 17)
      'react/react-in-jsx-scope': 'off',
      
      // Désactive la vérification des PropTypes car nous utilisons TypeScript
      'react/prop-types': 'off',
      
      // Ne nécessite pas de types explicites pour les exports de modules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      
      // Signale les variables non utilisées, mais ignore celles commençant par '_'
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      
      // Avertissement pour les liens avec href="#" ou vides (accessibilité)
      'jsx-a11y/anchor-is-valid': 'warn',
      
      // Assure que les éléments interactifs ont des étiquettes accessibles
      'jsx-a11y/interactive-supports-focus': 'error',
      
      // Évite les imbrications trop profondes de composants
      'react/jsx-max-depth': ['warn', { max: 10 }],
      
      // Évite les espaces dans les JSX curly braces
      'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
      
      // Format cohérent pour les importations
      'import/order': ['warn', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  };