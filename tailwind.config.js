/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
        instrumental: ['Instrument Serif', 'serif'],
        helvetica: ['HelveticaNowDisplay', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#e8702a',
      },
    },
  },
  plugins: [],
}
