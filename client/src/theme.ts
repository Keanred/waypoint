import { createTheme } from '@mui/material/styles'

export const dashboardColors = {
  background: '#0b0e18',
  surface: '#0b0e18',
  surfaceLow: '#10131f',
  surfaceContainer: '#161926',
  surfaceContainerHigh: '#1c1f2e',
  surfaceContainerHighest: '#222535',
  surfaceContainerLowest: '#000000',
  surfaceBright: '#282b3d',
  outline: '#737483',
  outlineVariant: '#454754',
  textPrimary: '#ececfd',
  textSecondary: '#a9aab9',
  primary: '#c49aff',
  primaryContainer: '#b68df2',
  secondary: '#fd77c4',
  tertiary: '#b8ffbb',
  error: '#ff6e84',
  errorDim: '#d73357',
  successDim: '#42ef72',
} as const

export const waypointTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: dashboardColors.primary,
      dark: dashboardColors.primaryContainer,
      contrastText: '#1a003b',
    },
    secondary: {
      main: dashboardColors.secondary,
      contrastText: '#520039',
    },
    error: {
      main: dashboardColors.error,
      dark: dashboardColors.errorDim,
    },
    success: {
      main: dashboardColors.tertiary,
      dark: dashboardColors.successDim,
    },
    background: {
      default: dashboardColors.background,
      paper: dashboardColors.surfaceContainer,
    },
    text: {
      primary: dashboardColors.textPrimary,
      secondary: dashboardColors.textSecondary,
    },
    divider: dashboardColors.outlineVariant,
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
          backgroundColor: dashboardColors.background,
          color: dashboardColors.textPrimary,
        },
      },
    },
  },
})