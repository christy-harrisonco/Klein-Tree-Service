
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        klein: {
          orange: '#f37021',
          dark: '#0f0c0b',
          gold: '#c5a059',
        },
        timber: {
          dark: '#0f0c0b',
          muted: '#1a1715',
          light: '#a3a3a3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        rugged: ['Oswald', 'sans-serif'],
        marker: ['Permanent Marker', 'cursive'],
      }
    }
  },
  plugins: [],
}
