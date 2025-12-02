/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fbf9f5',
          100: '#f5f0e6',
          200: '#e9dec3',
          300: '#dbc69a',
          400: '#c5a059', // Muted Gold
          500: '#b08942',
          600: '#966e33',
          700: '#78542b',
          800: '#634428',
          900: '#533925',
        },
        surface: {
          50: '#fafafa', // Warm White
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717', // Charcoal
          950: '#0a0a0a', // Deep Black
        }
      },
      fontFamily: {
        sans: ['Lato', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1' }],
        'display-lg': ['3rem', { lineHeight: '1.2' }],
        'display-md': ['2.25rem', { lineHeight: '1.3' }],
        'display-sm': ['1.875rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', // Softer
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)', // Softer
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)', // Softer
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} 