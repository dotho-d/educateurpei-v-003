@echo off
echo Nettoyage et démarrage optimisé Windows...

REM Variables d'environnement pour éviter les erreurs
set NODE_ENV=development
set NEXT_SKIP_TYPECHECKING=true
set NEXT_PUBLIC_SENTRY_ENABLED=false
set OTEL_SDK_DISABLED=true
set WATCHPACK_POLLING=true
set NODE_OPTIONS=--max-old-space-size=4096

REM Nettoyage complet
echo Nettoyage du cache...
if exist .next rmdir /s /q .next 2>nul
if exist node_modules\.cache rmdir /s /q node_modules\.cache 2>nul
if exist .turbo rmdir /s /q .turbo 2>nul

REM Vérifier si node_modules existe
if not exist node_modules (
    echo Installation des dépendances...
    npm install
)

REM Démarrage
echo Démarrage du serveur...
next dev