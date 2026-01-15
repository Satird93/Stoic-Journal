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
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      boxShadow: {
        brutal: '6px 6px 0 var(--shadow)',
        'brutal-sm': '4px 4px 0 var(--shadow)',
        'brutal-lg': '8px 8px 0 var(--shadow)',
        'brutal-hover': '2px 2px 0 var(--shadow)',
      },
      borderWidth: {
        DEFAULT: '3px',
        '3': '3px',
      },
      transitionTimingFunction: {
        brutal: 'cubic-bezier(0.4, 0, 1, 1)',
      },
    },
  },
  plugins: [],
}

export default config
