/** @type {import('tailwindcss').Config} */
export default {
  mode : 'jit',
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
        colors: {
            'custom-bg': '#1e1e1e',
          },
      keyframes: {
          'wiggle': {
              '0%, 100%': {
                  transform: 'rotate(-3deg)',
              },
              '50%': {
                  transform: 'rotate(3deg)',
              },
          },
          'wiggle-more': {
              '0%, 100%': {
                  transform: 'rotate(-12deg)',
              },
              '50%': {
                  transform: 'rotate(12deg)',
              },
          },
          'rotate-y': {
              '0%': {
                  transform: 'rotateY(360deg)',
              },
              '100%': {
                  transform: 'rotateY(0)',
              },
          },
          'rotate-x': {
              '0%': {
                  transform: 'rotateX(360deg)',
              },
              '100%': {
                  transform: 'rotateX(0)',
              },
          },
          'jump': {
              '0%, 100%': {
                  transform: 'scale(100%)',
              },
              '10%': {
                  transform: 'scale(80%)',
              },
              '50%': {
                  transform: 'scale(120%)',
              },
          },
          'jump-in': {
              '0%': {
                  transform: 'scale(0%)',
              },
              '80%': {
                  transform: 'scale(120%)',
              },
              '100%': {
                  transform: 'scale(100%)',
              },
          },
          'jump-out': {
              '0%': {
                  transform: 'scale(100%)',
              },
              '20%': {
                  transform: 'scale(120%)',
              },
              '100%': {
                  transform: 'scale(0%)',
              },
          },
          'shake': {
              '0%': {
                  transform: 'translateX(0rem)',
              },
              '25%': {
                  transform: 'translateX(-1rem)',
              },
              '75%': {
                  transform: 'translateX(1rem)',
              },
              '100%': {
                  transform: 'translateX(0rem)',
              },
          },
          'fade': {
              '0%': {
                  opacity: '0',
              },
              '100%': {
                  opacity: '1',
              },
          },
          'fade-down': {
              '0%': {
                  opacity: '0',
                  transform: 'translateY(-2rem)',
              },
              '100%': {
                  opacity: '1',
                  transform: 'translateY(0)',
              },
          },
          'fade-up': {
              '0%': {
                  opacity: '0',
                  transform: 'translateY(2rem)',
              },
              '100%': {
                  opacity: '1',
                  transform: 'translateY(0)',
              },
          },
          'fade-left': {
              '0%': {
                  opacity: '0',
                  transform: 'translateX(2rem)',
              },
              '100%': {
                  opacity: '1',
                  transform: 'translateX(0)',
              },
          },
          'fade-right': {
              '0%': {
                  opacity: '0',
                  transform: 'translateX(-2rem)',
              },
              '100%': {
                  opacity: '1',
                  transform: 'translateX(0)',
              },
          },
          'flip-up': {
              '0%': {
                  transform: 'rotateX(90deg)',
                  transformOrigin: 'bottom',
              },
              '100%': {
                  transform: 'rotateX(0)',
                  transformOrigin: 'bottom',
              },
          },
          'flip-down': {
              '0%': {
                  transform: 'rotateX(-90deg)',
                  transformOrigin: 'top',
              },
              '100%': {
                  transform: 'rotateX(0)',
                  transformOrigin: 'top',
              },
          },
          'spin': {
                '0%': {
                    transform: 'rotate(0deg)',
                },
                '100%': {
                    transform: 'rotate(360deg)',
                },
            },

            'bounce': { 
                '0%, 20%, 50%, 80%, 100%': { 
                    transform: 'translateY(0)',
                    offset: '0',
                },
                '40%': { 
                    transform: 'translateY(-15px)', // reducido de -30px a -15px
                    offset: '0.4',
                },
                '60%': { 
                    transform: 'translateY(-7.5px)', // reducido de -15px a -7.5px
                    offset: '0.6',
                },
            }

      },
      animation: {
          'wiggle': 'wiggle 1s both',
          'wiggle-more': 'wiggle-more 1s both',
          'rotate-y': 'rotate-y 1s both',
          'rotate-x': 'rotate-x 1s both',
          'jump': 'jump .5s both',
          'jump-in': 'jump-in .5s both',
          'jump-out': 'jump-out .5s both',
          'shake': 'shake .5s both',
          'fade': 'fade 1s both',
          'fade-down': 'fade-down 1s both',
          'fade-up': 'fade-up 1s both',
          'fade-left': 'fade-left 1s both',
          'fade-right': 'fade-right 1s both',
          'flip-up': 'flip-up 1s both',
          'flip-down': 'flip-down 1s both',
            'spin': 'spin 1s infinite',
            'bounce': 'bounce 1s infinite',
      },
      animationDelay: {
          none: '0ms',
          0: '0ms',
          75: '75ms',
          100: '100ms',
          150: '150ms',
          200: '200ms',
          300: '300ms',
          500: '500ms',
          700: '700ms',
          1000: '1000ms',
      },
      animationDuration: {
          75: '75ms',
          100: '100ms',
          150: '150ms',
          200: '200ms',
          300: '300ms',
          500: '500ms',
          700: '700ms',
          1000: '1000ms',
      },
  },
  animation: {
    wave: 'wave 1.2s infinite',
  },
  keyframes: {
    wave: {
      '0%': { transform: 'translate(0, 0)' },
      '50%': { transform: 'translate(-80px, 30px)' },
      '100%': { transform: 'translate(160px, -60px)' },
    },
  },

  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    
  ],
}