export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#534AB7",
        "primary-light": "#EEEDFE",
        "primary-dark": "#3C3489",
        "primary-mid": "#7F77DD",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
