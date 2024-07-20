/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "100": "500px"
      },
      colors: {
        "ash-gray": "#7E78D2",
        "davy-gray": "#000022",
        "snow": "#FFFCFF"
      },
    },
  },
  plugins: [],
}

