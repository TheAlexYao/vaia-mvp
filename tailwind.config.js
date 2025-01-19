/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vaiIndigo: '#1e3a8a',
      },
      backgroundImage: {
        'dusk': 'linear-gradient(to right, #9333ea, #2563eb)',
        'dawn': 'linear-gradient(to right, #60a5fa, #9333ea)',
      },
    },
  },
  plugins: [],
}

