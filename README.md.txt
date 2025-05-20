Éducateur péi, un projet de site vitrine développé en Next.js
Ce projet est développé avec Next.js 15.3.2, React 18.3.1 et utilise une variété de bibliothèques modernes pour créer une application web performante et responsive.
Technologies utilisées

Framework : Next.js 15.3.2 (dernière version à ce jour)
Bibliothèque UI : React 18.3.1 (version compatible avec le framework AINSI QUE les bibliothèques d'icones)
Styles : Tailwind CSS 3.4.1
Composants : shadcn/ui
Icônes : Lucide Icons 0.511.0 et Phosphor Icons 2.1.8


Formulaires : React Hook Form 7.51.1
Validation : Zod 3.22.4
Graphiques : Recharts 2.12.3

Prérequis
Avant de commencer, assurez-vous d'avoir installé :

Node.js (version 18 ou supérieure)
npm (version 9 ou supérieure)


Exportation statique
Ce projet est configuré pour l'exportation statique. Pour générer les fichiers statiques :
bashnpm run build

Les fichiers seront générés dans le dossier out.
Structure du projet
/
├── app/              # Dossier principal de l'application Next.js
├── components/       # Composants React réutilisables
├── lib/              # Utilitaires et fonctions partagées
├── hooks/            # Hooks React personnalisés
├── public/           # Fichiers statiques (images, etc.)
└── ...
Fonctionnalités

Design System : Utilisation de Tailwind CSS et shadcn/ui pour un système de design cohérent
Thème sombre/clair : Support du mode sombre via next-themes
Formulaires : Gestion avancée des formulaires avec React Hook Form et validation Zod
Composants interactifs : Utilisation de Radix UI pour des composants accessibles

Configurations personnalisées
Ce projet inclut des configurations personnalisées pour :

Tailwind CSS : Voir tailwind.config.ts
Next.js : Voir next.config.js
TypeScript : Voir tsconfig.json

Notes de mise à jour (Mai 2025)

Mise à jour vers Next.js 15.3.2 depuis Next.js 13
Mise à jour vers React 18.3.1
Mise à jour des bibliothèques d'icônes (Lucide 0.511.0, Phosphor 2.1.8)
Mise à jour de toutes les dépendances vers leurs versions les plus stables

Résolution des problèmes courants
Erreurs de build
Si vous rencontrez des erreurs lors du build, essayez de supprimer les dossiers .next, node_modules, et le fichier package-lock.json, puis réinstallez les dépendances :
bashrm -rf .next node_modules package-lock.json
npm install
Problèmes avec les Server Actions
Si vous rencontrez des problèmes avec les Server Actions, vérifiez que la taille de vos requêtes ne dépasse pas 2MB (limite configurée).
Licence
MIT
Contact
Pour toute question ou suggestion concernant ce projet, n'hésitez pas à me contacter.