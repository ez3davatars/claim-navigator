/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#dae4ef',
          200: '#b5c9df',
          300: '#8ba8c9',
          400: '#5e84ae',
          500: '#3e6490',
          600: '#2e4d72',
          700: '#243c5a',
          800: '#182a44',
          900: '#0f1d33',
          950: '#081121',
        },
        gold: {
          50: '#fcf9ed',
          100: '#f8efc8',
          200: '#f0dd8e',
          300: '#e6c557',
          400: '#dcae35',
          500: '#c4912a',
          600: '#a07024',
          700: '#7f5420',
          800: '#684420',
          900: '#583920',
        },
      },
      fontFamily: {
        serif: ['"Libre Caslon Text"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
