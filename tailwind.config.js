/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        primary_dark: "#325066",
        primary: "#6EB3E4",
        secondary: "#558BB1",
        background: "#92C3E7",
        success: "#28a745",
        error: "#360d11",
        error_85: "#dc3545",
      },
    },
  },
  plugins: [],
};
