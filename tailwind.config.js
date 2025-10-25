/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0E11',
        card: '#14181D',
        accent: '#4FD1C5'
      },
      fontFamily: {
        sans: [
          'system-ui', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', 'Noto Sans', 'Arial', 'sans-serif'
        ],
        mono: [
          'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'monospace'
        ]
      }
    }
  },
  plugins: []
}
