import { createTheme } from '@mui/material/styles';

export const colors = {
  // Primary
  primary: '#d7baff',
  primaryContainer: '#bd93f9',
  onPrimary: '#411478',
  onPrimaryContainer: '#4e2484',

  // Secondary
  secondary: '#b5c5fc',
  secondaryContainer: '#374776',
  onSecondaryContainer: '#a7b7ed',

  // Tertiary
  tertiary: '#75d4e8',

  // Error
  error: '#ffb4ab',
  errorContainer: '#93000a',

  // Surface
  surface: '#11131e',
  surfaceContainerLowest: '#0b0e18',
  surfaceContainerLow: '#191b26',
  surfaceContainer: '#1d1f2b',
  surfaceContainerHigh: '#272935',
  surfaceContainerHighest: '#323440',

  // On Surface
  onSurface: '#e1e1f1',
  onSurfaceVariant: '#968e9c',

  // Outline
  outlineVariant: '#4a4451',

  // Navigation
  navInactive: '#6272a4',
  navHoverText: '#f8f8f2',
} as const;

export const waypointTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      dark: colors.primaryContainer,
      contrastText: colors.onPrimary,
    },
    secondary: {
      main: colors.secondary,
      dark: colors.secondaryContainer,
      contrastText: colors.onSecondaryContainer,
    },
    error: {
      main: colors.error,
      dark: colors.errorContainer,
    },
    background: {
      default: colors.surface,
      paper: colors.surfaceContainer,
    },
    text: {
      primary: colors.onSurface,
      secondary: colors.onSurfaceVariant,
    },
    divider: colors.outlineVariant,
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Manrope", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.05em',
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.surface,
          color: colors.onSurface,
        },
      },
    },
  },
});
