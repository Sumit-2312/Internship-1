/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          700: "#390861",
          500: "#592f55",
          300: "#e34ba6",
        },
        gray: {
          500: "#1f2638",
        },
      },
      boxShadow: {
        'equal': '0px 0px 30px #390861',
      },
    },
  },
  plugins: [],
}
