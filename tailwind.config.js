module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        rhr: ['"SF Sports Night"'],
        'rhr-ns': ['"SF Sports Night NS"'],
      },
      colors: {
        red: { rhr: '#ef3340' },
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
