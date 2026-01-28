/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
        primaryGreen: '#2ecc71',
        warningYellow: '#f1c40f',
        dangerRed: '#e74c3c',
        infoBlue: '#3498db',
      },},
  },
  plugins: [],
}

