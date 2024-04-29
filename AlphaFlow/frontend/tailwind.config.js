/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
    "./src/*.jsx"
  ],
  theme: {
    extend: {
      keyframes: {
        movedown: {
          '0%':'',
          '100%':''
        }
      }
    },
  },
  
}

