import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        alegreya: ['var(--font-alegreya)', 'Georgia', 'Times New Roman', 'serif'],
        brawler: ['var(--font-brawler)', 'Georgia', 'Times New Roman', 'serif'],
        caveat: ['var(--font-caveat)', 'Comic Sans MS', 'cursive'],
        annie: ['var(--font-annie)', 'Comic Sans MS', 'cursive'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        // SYSTÈME DE TAILLES CORRIGÉ ET PROGRESSIF
        // Tailles principales pour les titres - progression logique
        'h1-2xl': '50px',     // 2xl+ screens - Très grandes tailles
        'h1-xl': '46px',      // xl screens
        'h1-lg': '42px',      // lg screens - Desktop (REQUIS)
        'h1-md': '38px',      // md screens - Tablet large
        'h1-sm': '34px',      // sm screens - Tablet (REQUIS)
        'h1-mobile': '30px',  // Mobile (REQUIS)
        
        'h2-2xl': '46px',     // 2xl+ screens
        'h2-xl': '42px',      // xl screens  
        'h2-lg': '38px',      // lg screens - Desktop
        'h2-md': '34px',      // md screens - Tablet large
        'h2-sm': '30px',      // sm screens - Tablet
        'h2-mobile': '26px',  // Mobile
        
        'h3-2xl': '42px',     // 2xl+ screens
        'h3-xl': '38px',      // xl screens
        'h3-lg': '34px',      // lg screens - Desktop
        'h3-md': '30px',      // md screens - Tablet large
        'h3-sm': '26px',      // sm screens - Tablet
        'h3-mobile': '22px',  // Mobile
        
        // Tailles standard pour compatibilité (ordre corrigé)
        'h1': '50px',         // Taille de référence h1
        'h2': '46px',         // Taille de référence h2
        'h3': '42px',         // Taille de référence h3
        'h4': '38px',         // Taille de référence h4
        'h5': '34px',         // Taille de référence h5
        'h6': '28px',         // Taille de référence h6
        
        // Tailles intermédiaires pour progression fluide
        'heading-xxl': '50px',
        'heading-xl': '46px',
        'heading-lg': '42px',
        'heading-md': '38px',
        'heading-sm': '34px',
        'heading-xs': '30px',
        
        // Tailles de corps de texte et navigation
        'nav': '20px',
        'body': '18px',
        'brawler-large': '18px',
        'brawler-medium': '16px',
        'brawler-small': '14px',
      },
      fontWeight: {
        'light': '300',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'btn': 'var(--button-radius)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sectionBg1: 'hsl(var(--section-bg-1))',
        sectionBg2: 'hsl(var(--section-bg-2))',
      },
      // Extensions pour les dimensions personnalisées
      width: {
        'hero-circle-sm': 'clamp(240px, 36vw, 340px)',
        'hero-circle-lg': 'clamp(260px, 40vw, 360px)',
        'hero-image': 'clamp(225px, 60vw, 450px)',
      },
      height: {
        'hero-circle-sm': 'clamp(240px, 36vw, 340px)',
        'hero-circle-lg': 'clamp(260px, 40vw, 360px)',
        'hero-image': 'clamp(150px, 40vw, 300px)',
      },
      borderWidth: {
        'dashed-4': '4px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'colors-transform': 'color, background-color, border-color, text-decoration-color, fill, stroke, transform',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      keyframes: {
        // Animations Accordion (nécessaires pour le composant)
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        // Animations de rotation
        'rotate': {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        'rotate-reverse': {
          from: {
            transform: 'rotate(360deg)',
          },
          to: {
            transform: 'rotate(0deg)',
          },
        },
        // Animations de pulsation
        'pulse': {
          '0%': {
            transform: 'scale(1)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '0.8',
          },
        },
        'pulse-subtle': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.85',
          },
        },
        // Animation ticker
        'tickerAnimation': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        // Animations d'apparition et de mouvement
        'shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        // Animations de zoom
        'zoom-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'zoom-out': {
          '0%': {
            opacity: '0',
            transform: 'scale(1.05)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        // Animations de rebond
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '50%': {
            transform: 'translateY(-5px)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
        // Animation de balancement
        'swing': {
          '0%, 100%': {
            transform: 'rotate(0deg)',
          },
          '20%': {
            transform: 'rotate(15deg)',
          },
          '40%': {
            transform: 'rotate(-10deg)',
          },
          '60%': {
            transform: 'rotate(5deg)',
          },
          '80%': {
            transform: 'rotate(-5deg)',
          },
        },
        // Animation de typing (pour le chatbot)
        'typing': {
          '0%': {
            width: '0',
          },
          '100%': {
            width: '100%',
          },
        },
        'blink': {
          '0%, 50%': {
            borderColor: 'transparent',
          },
          '51%, 100%': {
            borderColor: 'currentColor',
          },
        },
        // Animation de chargement
        'loading': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'skeleton': {
          '0%': {
            backgroundColor: 'hsl(var(--muted))',
          },
          '50%': {
            backgroundColor: 'hsl(var(--muted) / 0.5)',
          },
          '100%': {
            backgroundColor: 'hsl(var(--muted))',
          },
        },
      },
      animation: {
        // Animations Accordion
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Animations de rotation
        'rotate-slow': 'rotate 30s linear infinite',
        'rotate-fast': 'rotate 3s linear infinite',
        'rotate-reverse-slow': 'rotate-reverse 30s linear infinite',
        // Animations de pulsation
        'pulse-gentle': 'pulse 4s infinite ease-in-out',
        'pulse-subtle': 'pulse-subtle 3s infinite ease-in-out',
        // Animation ticker
        'ticker': 'tickerAnimation 30s linear infinite',
        'ticker-fast': 'tickerAnimation 15s linear infinite',
        'ticker-slow': 'tickerAnimation 60s linear infinite',
        // Animations d'apparition
        'shimmer': 'shimmer 1.5s infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'slide-down': 'slide-down 0.8s ease-out forwards',
        'slide-left': 'slide-left 0.8s ease-out forwards',
        'slide-right': 'slide-right 0.8s ease-out forwards',
        // Animations de zoom
        'zoom-in': 'zoom-in 0.5s ease-out forwards',
        'zoom-out': 'zoom-out 0.5s ease-out forwards',
        // Animations de mouvement
        'bounce-gentle': 'bounce-gentle 2s infinite',
        'swing': 'swing 2s ease-in-out infinite',
        // Animations pour interfaces
        'typing': 'typing 3s steps(20, end), blink 0.75s step-end infinite',
        'loading': 'loading 2s infinite ease-in-out',
        'skeleton': 'skeleton 2s infinite ease-in-out',
        // Animations avec délais
        'fade-in-delay-100': 'fade-in 0.6s ease-out 0.1s forwards',
        'fade-in-delay-200': 'fade-in 0.6s ease-out 0.2s forwards',
        'fade-in-delay-300': 'fade-in 0.6s ease-out 0.3s forwards',
        'fade-in-delay-500': 'fade-in 0.6s ease-out 0.5s forwards',
        'slide-up-delay-100': 'slide-up 0.8s ease-out 0.1s forwards',
        'slide-up-delay-200': 'slide-up 0.8s ease-out 0.2s forwards',
        'slide-up-delay-300': 'slide-up 0.8s ease-out 0.3s forwards',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      cursor: {
        'grab': 'grab',
        'grabbing': 'grabbing',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    animate,
  ],
};

export default config;