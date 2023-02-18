/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#0000FF',
        customMint: '#80FFCB',
        customPink: '#F400E9',
        funPurple: '#67399B',
        funRed: '#E33B40',
        funOrange: ' #F8712E',
        funYellow: '#F9DB0E',
        funBlue: '#48B7CD',
      },
      fontFamily: {
        customFont: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
