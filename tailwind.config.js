/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#007AFF',
      },
      fontFamily: {
        krona: ['"Krona One"', 'sans-serif'],
      },
      fontFamily: {
        sans: ['"Karyana Font"', 'sans-serif'], // Set default font
      },
    },
  },
  plugins: [],
}