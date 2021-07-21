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
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '2.5rem',
        '2xl': '2.5rem',
      },
      screens: {
        DEFAULT: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1024px',
        '2xl': '1024px'
      }
    },
    cursor: {
      copy: 'copy',
    },
    extend: {
      colors: {
        gray: {
          50: '#F4F4F4',
          100: '#EEEEEE',
          200: '#E7E7E7',
          300: '#D1D1D1',
          400: '#BABABA',
          500: '#8C8C8C',
          600: '#666666',
          700: '#535353',
          800: '#404040',
          900: '#3A3A3A',
        },
        purple: {
          50: '#FCEDF6',
          100: '#FBE0F0',
          200: '#F9D3EA',
          300: '#F5B9DD',
          400: '#E096C3',
          500: '#B6537F',
          600: '#881E4E',
          700: '#7B2157',
          800: '#56173D',
          900: '#300D22',
        },
        canvas: '#F4F4F4',
      },
      letterSpacing: {
        tightest: '-.06em',
        tighter: '-.04em',
      },
      lineHeight: {
        '20': '5rem',
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
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
}
