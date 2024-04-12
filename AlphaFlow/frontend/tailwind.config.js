/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
    "./src/*.jsx"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'time-marks':"url('/src/images/time_marks.svg')"
      }
    },
  },
  plugins: [],
}

