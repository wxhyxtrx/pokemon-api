/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "0px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1900px",
      },
      colors: {
        background: "#f6f8fc",
        font: {
          primary: "#1E1E1E",
          secondary: "#686868",
          tertiary: "#2A3350",
          disabled: "#B9B9B9",
        },
        disabled: "#d4d4d4",
        divider: "#E9E9E9",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
