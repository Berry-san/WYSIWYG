/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBlue: 'rgb(21,28,38)',
        darkerBlue: 'rgb(28,34,46)',
      },
    },
  },
  plugins: [],
}
