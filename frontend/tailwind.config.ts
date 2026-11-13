import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB', // Royal Blue
          ai: '#4F46E5',      // AI Indigo
          canvas: '#F8FAFC',  // Page Background
          surface: '#FFFFFF', // Card Surface
          sidebar: '#0F172A', // Slate 900
          header: '#1E293B',  // Slate 800
        },
        status: {
          success: '#10B981',
          successBg: '#DCFCE7',
          pending: '#F59E0B',
          pendingBg: '#FEF3C7',
          error: '#EF4444',
          errorBg: '#FEE2E2',
          aiMatch: '#4F46E5',
          aiMatchBg: '#EEF2FF',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"IBM Plex Sans Arabic"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.05), 0 1px 1px rgba(15, 23, 42, 0.03)',
        card: '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
        elevated: '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'toast': 'toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translate(-50%, -12px)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
