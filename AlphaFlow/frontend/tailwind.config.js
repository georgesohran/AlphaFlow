/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
    "./src/*.jsx"
  ],
  theme: {
    extend: {
      backgroundImage:{
        'pic-arrow-up':'url(/images/up-arrow)',
        'pic-arrow-down':'url(/images/down-arrow)'
      },
      keyframes: {
        movedown: {
          '0%':'',
          '100%':''
        }
      }
    },
  },
  
}

