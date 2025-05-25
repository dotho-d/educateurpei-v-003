/**
 * app/viewport.ts
 * Configuration du viewport et du thème pour Next.js 15+
 */
import { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: '#f8765f',
  colorScheme: 'light dark',
  viewportFit: 'cover'
};