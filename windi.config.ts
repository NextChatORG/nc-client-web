import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  shortcuts: {
    'text-title': 'text-[20px] font-medium',
  },
  theme: {
    colors: {
      black: '#000000',
      current: 'currentColor',
      dark: {
        200: '#6A6B70',
        300: '#5B5C62',
        400: '#4B4C52',
        500: '#393A41',
        600: '#2F3037',
        700: '#26262C',
        800: '#1C1C21',
        900: '#131316',
      },
      deepPurple: {
        300: '#9575cd',
        400: '#7e57c2',
        500: '#673ab7',
        600: '#5e35b1',
        700: '#512da8',
        800: '#4527a0',
        900: '#311b92',
      },
      green: {
        300: '#81c784',
        400: '#66bb6a',
        500: '#4caf50',
        600: '#43a047',
        700: '#388e3c',
        800: '#2e7d32',
        900: '#1b5e20',
      },
      indigo: {
        300: '#7986cb',
        400: '#5c6bc0',
        500: '#3f51b5',
        600: '#3949ab',
        700: '#303f9f',
        800: '#283593',
        900: '#1a237e',
      },
      orange: {
        300: '#ffb74d',
        400: '#ffa726',
        500: '#ff9800',
        600: '#fb8c00',
        700: '#f57c00',
        800: '#ef6c00',
        900: '#e65100',
      },
      primary: '#283593',
      red: {
        300: '#e57373',
        400: '#ef5350',
        500: '#f44336',
        600: '#e53935',
        700: '#d32f2f',
        800: '#c62828',
        900: '#b71c1c',
      },
      text: 'rgba(255, 255, 255, 0.8)',
      transparent: 'transparent',
      white: '#ffffff',
    },
    extend: {
      animation: {
        blinkCaret: 'blinkCaret 1.2s step-end infinite',
        pulseBorder: 'pulseBorder 1s ease-in-out 0s infinite',
        ripple: 'ripple 0.9s ease 1 forwards',
        shake: 'shake 0.15s ease-in-out 0s 2',
      },
      keyframes: {
        blinkCaret: {
          '50%': { 'background-color': 'transparent' },
        },
        pulseBorder: {
          '50%': {
            'border-color': 'currentColor',
            'box-shadow':
              'rgb(255, 255, 255) 0px 0px 0px 0px, currentColor 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
          },
        },
        ripple: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.375, transform: 'scale(10)' },
          '100%': { opacity: 0, transform: 'scale(35)' },
        },
        shake: {
          '25%': { transform: 'translateX(10px)' },
          '75%': { transform: 'translateX(-10px)' },
        },
      },
    },
    fontFamily: {
      sans: ['Roboto'],
    },
    spacing: {
      0: '0px',
      1: '12px',
      2: '24px',
      3: '36px',
      4: '48px',
      5: '60px',
      6: '72px',
      7: '84px',
      8: '96px',
      9: '108px',
      10: '120px',
      text: '1em',
    },
  },
});
