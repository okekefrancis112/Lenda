/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "900px",
    },
    extend: {
      colors: {
        darkNavyBlue: "#181824",
        navyBlue: "#25273C",
        purple: "#be55ff",
        darkGrey: "#565656",
        // grey: "#D9E0EC",
        grey: "rgba(217, 224, 236, 0.2)",
        green: "rgba(0, 172, 79, 1)",
        lightGrey: "rgba(220, 220, 220, 0.2)",
      },
    },
  },
  plugins: [],
};
