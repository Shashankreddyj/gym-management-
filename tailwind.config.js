/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E00026',
          ivory: '#F5F0EA',
        },
        surface: '#FFFFFF',
        text: {
          primary: '#231815',
          secondary: '#6E625D',
        },
        border: '#DDD3CB',
        highlight: '#F7E9D8',
        success: '#2E7D32',
        warning: '#F9A825',
        error: '#C62828',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
