/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '390px',
      md: '768px',
      // lg: '1024px',
      // // => @media (min-width: 1024px) { ... }
      xl: '1920px',
      // '2xl': '1536px',
      // // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
