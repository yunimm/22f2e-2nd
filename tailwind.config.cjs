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
    colors: {
      blue: {
        light: '#EBF5FF',
        DEFAULT: '#3B86DD',
        dark: '#C0D2DD',
      },
      gray: {
        light: '#EEEEEE',
        DEFAULT: '#DEDEDE',
        dark: '#5C6B72',
      },
      red: {
        DEFAULT: '#FB5C5C',
      },
      yellow: {
        DEFAULT: '#FBDC5C',
      },
      white: {
        DEFAULT: '#FFFFFF',
      },
      black: {
        DEFAULT: '#000000',
      },
      extend: {},
    },
    plugins: [],
  },
};
