/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        blue: "#01499d",
      },
    },
  },
  plugins: [],
};
