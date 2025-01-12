/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lightpink:'rgb(244,232,202)',
        lightpink2:'rgb(252, 249,227)',
        darkpink:'rgb(218, 192, 128)'
      }
    },
  },
  plugins: [],
}