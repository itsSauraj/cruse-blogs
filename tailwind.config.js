const { nextui } =  require('@nextui-org/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx, mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        'h-white-lg': '0px 0px 127px 0px rgba(255,255,255,1);',
        'h-white-sm': '0px 7px 29px 0px rgba(100, 100, 111, 0.2);',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}