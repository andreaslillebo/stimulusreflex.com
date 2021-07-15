const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    enabled: ['production', 'staging'].includes(process.env.NODE_ENV),
    content: [
      './app/views/**/*.html.erb',
      './app/helpers/**/*.rb',
      './app/javascript/**/*.js'
    ]
  },
  theme: {
    extend: {
      colors: {
        'text-main': '#404040',
        'text-secondary': '#8C8C8C',
        'text-tertiary': '#E7E7E7',
        canvas: '#F4F4F4',
        'active-main': '#881E4E',
        'active-secondary': '#E387B0',
        'text-main': '#F5B9DD'
      }
    },
    fontFamily: {
      sans: [
        'Work Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
}
