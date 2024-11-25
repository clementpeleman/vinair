import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./sections/**/*.{js,ts,jsx,tsx, mdx}",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0 15px rgba(0, 0, 0, 0.02), 0 0 15px rgba(0, 0, 0, 0.02)',
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        mundo: ["var(--font-mundo)"],
        milo: ["var(--font-milo)"],
      },
      animation: {
        pulseSaturation: 'pulseSaturation 2s infinite',
      },
      keyframes: {
        pulseSaturation: {
          '0%': { filter: 'saturate(1)' },
          '25%': { filter: 'saturate(1.1)' },
          '50%': { filter: 'saturate(1.2)' },
          '75%': { filter: 'saturate(1.05)' },
          '100%': { filter: 'saturate(1)' },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: "#e54726",
          deepPink: "#fd4b8b",
          deepBlue: "rgba(137, 121, 236)"
        }
      }
    }
  })],
}
