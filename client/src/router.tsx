import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { AnalyticsPage } from './pages/AnalyticsPage';
import { DashboardPage } from './pages/DashboardPage';
import { FocusStudioPage } from './pages/FocusStudioPage';
import { SettingsPage } from './pages/SettingsPage';
import { waypointTheme } from './theme';

const RootLayout = () => (
  <ThemeProvider theme={waypointTheme}>
    <CssBaseline />
    <Outlet />
  </ThemeProvider>
);

const rootRoute = createRootRoute({
  component: RootLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const focusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'focus',
  component: FocusStudioPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'settings',
  component: SettingsPage,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'analytics',
  component: AnalyticsPage,
});

const routeTree = rootRoute.addChildren([dashboardRoute, focusRoute, settingsRoute, analyticsRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
