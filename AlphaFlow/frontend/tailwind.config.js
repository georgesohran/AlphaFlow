/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
    "./src/*.jsx",
    "./tailwind.config.js"
  ],
  theme: {
    extend: {
      keyframes: {
        movedown: {
          '0%':{transform: 'translateY(-64px)', opacity:'0%'},
          '100%':{transform: 'translateY(0px)', opacity:'100%'}
        },
        appearnotice: {
          '0%':{},
          '50%':{borderColor:'white'},
          '100%':{}
        }
      },
      animation: {
        movedown: '0.5s movedown ease-in-out',
        appearnotice: '1s appearnotice ease-in'
      }
    },
  },
  
}

