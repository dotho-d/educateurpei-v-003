/**
 * lib/validation.ts
 * Schémas de validation avec Zod
 */
import { z } from 'zod';

// Regex patterns
const PHONE_REGEX = /^(\+33|0)[1-9](\d{8})$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s-']+$/;

// Validation du formulaire de contact
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut dépasser 50 caractères')
    .regex(NAME_REGEX, 'Le nom contient des caractères invalides'),
  
  email: z.string()
    .email('Email invalide')
    .max(100, 'Email trop long'),
    
  phone: z.string()
    .regex(PHONE_REGEX, 'Numéro de téléphone invalide')
    .optional(),
    
  subject: z.string()
    .min(5, 'Le sujet doit contenir au moins 5 caractères')
    .max(100, 'Le sujet ne peut dépasser 100 caractères'),
    
  message: z.string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message ne peut dépasser 1000 caractères')
    .refine(
      (val) => !/<script|javascript:|data:|vbscript:/i.test(val),
      'Contenu potentiellement dangereux détecté'
    ),
    
  consent: z.boolean()
    .refine(val => val === true, 'Vous devez accepter les conditions'),
    
  newsletter: z.boolean().optional(),
});

// Validation de l'inscription newsletter
export const newsletterSchema = z.object({
  email: z.string()
    .email('Email invalide')
    .max(100, 'Email trop long'),
    
  consent: z.boolean()
    .refine(val => val === true, 'Vous devez accepter les conditions'),
});

// Validation de prise de rendez-vous
export const appointmentSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut dépasser 50 caractères')
    .regex(NAME_REGEX, 'Le nom contient des caractères invalides'),
    
  email: z.string()
    .email('Email invalide')
    .max(100, 'Email trop long'),
    
  phone: z.string()
    .regex(PHONE_REGEX, 'Numéro de téléphone invalide'),
    
  service: z.enum([
    'handicap',
    'familiales', 
    'addictions',
    'administratif-social',
    'insertion-professionnelle',
    'autre'
  ], { errorMap: () => ({ message: 'Veuillez sélectionner un service' }) }),
  
  date: z.string()
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'La date doit être dans le futur'),
    
  time: z.string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide'),
    
  message: z.string()
    .max(500, 'Le message ne peut dépasser 500 caractères')
    .optional(),
    
  consent: z.boolean()
    .refine(val => val === true, 'Vous devez accepter les conditions'),
});

// Types TypeScript dérivés
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type AppointmentFormData = z.infer<typeof appointmentSchema>;

// Fonction de sanitisation
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Supprimer les balises HTML de base
    .slice(0, 1000); // Limiter la taille
}

// Fonction de validation générique
export function validateFormData<T>(
  schema: z.ZodSchema<T>, 
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => err.message);
      return { success: false, errors };
    }
    return { success: false, errors: ['Erreur de validation inconnue'] };
  }
}