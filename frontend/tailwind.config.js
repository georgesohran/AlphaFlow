/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/*.js",
    "./src/**/*.js",
    "./public/index.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dudles": "url('/src/images/BgDudles.svg')"
      }
    },
  },
  plugins: [],

}
