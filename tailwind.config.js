/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)' },
          '50%': { opacity: 0.5, boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite',
      },
    },
  },
  plugins: [],
}

