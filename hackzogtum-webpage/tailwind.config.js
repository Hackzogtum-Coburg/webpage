module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ff00',
          dark: '#00cc00',
          light: '#33ff33',
        },
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        dark: {
          bg: '#0d0d0d',
          surface: '#1a1a1a',
          border: '#2a2a2a',
        },
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
        glow: '0 0 20px rgba(0, 255, 0, 0.2)',
        'glow-lg': '0 0 40px rgba(0, 255, 0, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
}
