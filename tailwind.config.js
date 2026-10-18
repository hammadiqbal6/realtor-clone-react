/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(15 23 32 / <alpha-value>)',
        slateDeep: 'rgb(36 54 66 / <alpha-value>)',
        canvas: 'rgb(236 241 245 / <alpha-value>)',
        fog: 'rgb(220 229 236 / <alpha-value>)',
        accent: 'rgb(15 118 110 / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};
