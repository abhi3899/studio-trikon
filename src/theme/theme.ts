export const theme = {
  colors: {
    background: '#faf7f4',
    surface: '#f0ebe4',
    surfaceHover: '#e8e0d5',
    text: '#1a1714',
    textMuted: '#9a8f87',
    textSubtle: '#c4b8b0',
    accent: '#c1603a',
    accentHover: '#a84f2e',
    accentLight: '#f0e4de',
    border: '#e2d9d1',
    borderLight: '#ede6de',
    white: '#ffffff',
    overlay: 'rgba(26,23,20,0.6)',
  },
  fonts: {
    display: '"Cormorant Garamond", Georgia, serif',
    body: '"Inter", system-ui, sans-serif',
  },
  spacing: {
    navHeight: '72px',
  },
}

export type Theme = typeof theme
