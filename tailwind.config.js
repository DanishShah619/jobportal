/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "neon-green": "#39FF14",
      },
      animation: {
        'aura-glow': 'aura 3s ease-in-out infinite',
      },
      keyframes: {
        aura: {
          '0%, 100%': {
            boxShadow: '0 0 10px 2px rgba(57, 255, 20, 0.6)', // neon-green
          },
          '50%': {
            boxShadow: '0 0 20px 4px rgba(57, 255, 20, 0.9)',
          },
        },
      },
    },
  },
  plugins: [],
}
