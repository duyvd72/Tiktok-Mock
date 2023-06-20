/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      customedPink: "#fe2c55",
      customedGrey: "#e9ecef",
    },
  },
  plugins: [],
};
