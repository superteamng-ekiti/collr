import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
        center: true,
    },
    extend: {
      borderColor: {
        default: 'var(--border-color)',
      },
      color: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      }
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
        {
            'light': {
              ...require("daisyui/src/theming/themes")["light"],
                'primary': '#030269',
              'secondary': '#F8F8FF'
            }
        }
    ]
  }
}
export default config
