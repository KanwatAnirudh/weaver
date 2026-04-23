/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",
        secondary: "#10b981",
        accent: "#f59e0b",
        dark: "#1e293b",
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px -12px rgba(30, 41, 59, 0.2)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
