/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#FFF4EE',
          100: '#FFE4D6',
          200: '#FFC5A8',
          300: '#FFA070',
          400: '#D97757',
          500: '#C4683F',
          600: '#A8532D',
          700: '#8C4224',
          800: '#70331C',
          900: '#5A2916',
        },
        sand: {
          50: '#FAF9F6',
          100: '#F5F3EE',
          200: '#EBE8E0',
          300: '#E0DCD2',
          400: '#C8C3B8',
          500: '#A39E93',
          600: '#878278',
          700: '#6B6760',
          800: '#4A4740',
          900: '#2A2820',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        prose: '72ch',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
