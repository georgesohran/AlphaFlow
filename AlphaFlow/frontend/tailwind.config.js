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
          '0%':{transform: 'translateY(-64px)', opacity:'0%'},
          '100%':{transform: 'translateY(0px)', opacity:'100%'}
        }
      },
      animation: {
        movedown: '0.5s movedown ease-in-out'
      }
    },
  },
  
}

