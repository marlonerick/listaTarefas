/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      letterSpacing: {
        tighter: "-.035em",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
