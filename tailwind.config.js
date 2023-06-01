/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      uno:["Source Sans Pro", "sans-serif"],
      monospace: ['JetBrains Mono', 'monospace'],

    },
    screens: {
      'below-md': "860px",
    }
  },
  },
  plugins: [],
}
