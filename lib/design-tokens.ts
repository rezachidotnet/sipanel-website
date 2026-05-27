export const designTokens = {
  colors: {
    orangePrimary: '#FF6A00',
    orangeHover: '#E85F00',
    orangeSoft: 'rgba(255,106,0,0.12)',
    blackPrimary: '#0F1113',
    blackDeep: '#050607',
    blackSecondary: '#1A1D21',
    grayDark: '#555555',
    grayMedium: '#68686B',
    grayLight: '#E5E7EB',
    grayBackground: '#F5F6F7',
    white: '#FFFFFF',
    textPrimary: '#111111',
    textSecondary: '#555555',
    textInverse: '#FFFFFF',
    textMuted: '#8A8A8A'
  },
  spacing: {
    mobilePagePadding: '20px',
    tabletPagePadding: '32px',
    desktopPagePadding: '40px',
    containerMax: '1200px'
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    card: '8px',
    button: '6px'
  },
  motion: {
    fast: '150ms',
    standard: '240ms',
    slow: '350ms',
    easing: 'ease-out'
  }
} as const;
