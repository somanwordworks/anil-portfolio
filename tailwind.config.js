/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        saffron: "#EE5A1C",
        saffronLight: "#FFD8C2",
            congressGreen: "#20773B",
            congressGreenDark: "1B6A33",
        pageWhite: "#FFFFFF",
        pageBlack: "#000000"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI"]
      }
    }
  },
  plugins: []
}



