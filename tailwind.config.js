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
          DEFAULT: '#151515',
          dark: '#202020'
        },
        gray: {
          DEFAULT: '#999',
          dark: '#393939'
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
