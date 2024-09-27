/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryTxt: '#543729',
        secondaryTxt: '#333333',
        primaryLink: '#007acc',
        secondaryLink: '#00acee',
        primaryBg: '#f8cd06',
        primaryBorder: '#2188b6',
        secondaryBorder: '#ddd',
      },
    },
  },
  plugins: [],
};
