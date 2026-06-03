import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        // UNiDAYS brand
        'ud-navy': '#0D1B36',
        'ud-teal': '#00C5A8',
        // LaunchDarkly brand
        'ld-bg': '#191919',
        'ld-card': '#2C2C2C',
        'ld-blue': '#405BFF',
        'ld-lime': '#DDFF46',
        'ld-cyan': '#00C5A8',
        'ld-purple': '#8B5CF6',
        'ld-pink': '#FF4081',
        'ld-surface': '#333333',
        'ld-border': '#3F3F3F',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'fade-out': 'fadeOut 0.2s ease-in forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
