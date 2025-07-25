/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Extend your existing luxury hotel theme colors
      colors: {
        // Your signature gold color
        gold: {
          50: '#fdf8f3',
          100: '#f9ede1',
          200: '#f2dbc2',
          300: '#e8c299',
          400: '#dca56d',
          500: '#d4bf8a', // Lighter shade from your theme
          600: '#c4ae7b', // Your main gold color
          700: '#b8a068', // Darker shade from your theme
          800: '#957e4f',
          900: '#766342',
        },
        // Your dark colors
        luxury: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e8e8e8',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#2c2c2c', // Your main text color
          900: '#1a1a1a', // Your primary dark color
        }
      },
      fontFamily: {
        // Your existing luxury fonts
        'serif': ['Cormorant Garamond', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        // Maintain your existing typography scale
        'hero': 'clamp(4rem, 8vw, 7rem)',
        'section': 'clamp(3rem, 6vw, 5rem)',
      },
      spacing: {
        // Add your specific spacing values if needed
        '18': '4.5rem',
        '88': '22rem',
        '96': '24rem',
      },
      borderRadius: {
        // Your design system border radius
        'luxury': '16px',
      },
      boxShadow: {
        // Your luxury shadows
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.1)',
        'luxury-lg': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'gold': '0 8px 25px rgba(196, 174, 123, 0.3)',
      },
      backdropBlur: {
        'luxury': '20px',
      },
      animation: {
        // Your existing animations
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'luxury-hover': 'luxuryHover 0.6s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        luxuryHover: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
  // Disable base styles to prevent conflicts with your existing styles
  corePlugins: {
    preflight: false,
  },
} 