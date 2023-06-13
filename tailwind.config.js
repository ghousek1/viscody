/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      uno:["Aspekta", "sans-serif"],
      monospace: ['JetBrains Mono', 'monospace'],

    },
    screens: {
      'below-md': "860px",
    }
  },
  },
  plugins: [],
}
