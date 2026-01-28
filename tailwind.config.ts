import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-primary': '#0D0D0D',
        'bg-secondary': '#1A1A1A',
        'bg-tertiary': '#242424',

        // Teal (Primary Accent)
        teal: {
          400: '#26C6AD',
          500: '#00BFA6',
          600: '#00A896',
        },

        // Orange (Secondary Accent) - Updated per user request
        orange: {
          500: '#ff751f',
          600: '#e5691c',
          700: '#cc5d18',
        },

        // Text
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B0B0',
        'text-muted': '#6B6B6B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
