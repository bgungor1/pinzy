/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './src/**/*.{js,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}', './screens/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        customGray: '#333542',
        primaryGreen: '#0bd38a',
      },
    },
  },
  plugins: [],
};
