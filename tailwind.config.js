const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        white: '#FFFFFF',
        primary: {
          DEFAULT: '#E62429',
          dark: '#d02428'
        },
        secondary: {
          DEFAULT: '#202020',
          dark: '#151515'
        },
        gray: {
          DEFAULT: '#999',
          dark: '#393939'
        },
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-within'],
      opacity: ['disabled']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
