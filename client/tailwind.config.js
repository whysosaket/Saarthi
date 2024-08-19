/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        space: ['Space Mono'],
        inter: ['Inter']
      }
    },
  },
  daisyui: {
    base: false
  },
  plugins: [require("daisyui")],
}