const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        "dark-blue": "hsla(209, 23%, 22%, 1)",
        "very-dark-blue-dark": "hsla(207, 26%, 17%, 1)",
        "very-dark-blue-light": "hsla(200, 15%, 8%, 1)",
        "dark-gray": "hsla(0, 0%, 52%, 1)",
        "very-light-gray": "hsla(0, 0%, 98%, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
