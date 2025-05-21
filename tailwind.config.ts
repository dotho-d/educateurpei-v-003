import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        alegreya: ['var(--font-alegreya)', 'serif'],
        brawler: ['var(--font-brawler)', 'serif'],
        caveat: ['var(--font-caveat)', 'cursive'],
        annie: ['var(--font-annie)', 'cursive'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
      fontSize: {
        'h1': '60px',
        'h2': '52px',
        'h3': '44px',
        'h4': '36px',
        'h5': '30px',
        'h6': '24px',
        'nav': '24px',
        'body': '20px',
        'brawler-large': '20px',
        'brawler-medium': '17px',
        'brawler-small': '14px',
      },
      fontWeight: {
        'light': '300',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
      // Nouvelles extensions pour remplacer les styles inline
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
      keyframes: {
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
        'rotate': {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
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
        'tickerAnimation': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'rotate-slow': 'rotate 30s linear infinite',
        'pulse-gentle': 'pulse 4s infinite ease-in-out',
        'ticker': 'tickerAnimation 30s linear infinite',
      },
    },
  },
  plugins: [
    animate,
  ],
};

export default config;