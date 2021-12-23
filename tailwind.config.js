const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.js", "./styles/**/*.css", "./components/**/*.js"],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  darkMode: "class",
  plugins: [require("tailwind-scrollbar-hide")],
  theme: {
    screens: {
      xs: "630px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        "custom-yellow": "#FB7A16",
        "custom-yellow2": "#FF6663",
        "custom-maroon": "#410B3B",
        "custom-background": "#06202A",
        "custom-bg": "#AB61F7",
      },
    },
  },
};
