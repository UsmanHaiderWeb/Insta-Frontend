/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '800px',

      'md': '1000px',

      'lg': '1100px',

      'xl': '1280px',

      '2xl': '1536px',
    },
    extend: {
      screens: {
        "lgtab": {'max': '800px', 'min': '650px'},
        "tablet": {'max': '650px', 'min': '550px'},
        "mini": {'max': '550px', 'min': '450px'},
        "mobile": {'max': '450px', 'min': '360px'},
        "micro": {'max': '360px', 'min': '0px'},
      }
    },
  },
  plugins: [],
}

