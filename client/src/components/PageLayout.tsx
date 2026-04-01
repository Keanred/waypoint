import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { colors } from '../theme';
import { BottomNavBar } from './BottomNavBar';
import { SideNavBar } from './SideNavBar';
import { TopAppBar } from './TopAppBar';

type SideNavBarProps = {
  appName: string;
  tagline: string;
  navItems: Array<{ label: string; icon: ReactNode; active?: boolean; to?: string }>;
  actionLabel?: string;
  actionIcon?: ReactNode;
  footerItems?: Array<{ label: string; icon: ReactNode; to?: string }>;
};

type BottomNavBarItem = {
  label: string;
  icon: ReactNode;
  active?: boolean;
  to?: string;
};

type TopAppBarProps = {
  brandName: string;
  navLinks?: Array<{ label: string; to?: string }>;
  addButtonLabel?: string;
  onAddClick?: () => void;
};

type PageLayoutProps = {
  children: ReactNode;
  sidebar: SideNavBarProps;
  topBar?: TopAppBarProps | null;
  bottomNav?: BottomNavBarItem[];
  maxWidth?: string | number;
  mainSx?: Record<string, unknown>;
  onAddClick?: () => void;
};

export const PageLayout = ({
  children,
  sidebar,
  topBar,
  bottomNav,
  maxWidth = 1440,
  mainSx = {},
}: PageLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: colors.surface,
        color: colors.onSurface,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Desktop Sidebar */}
      <SideNavBar
        appName={sidebar.appName}
        tagline={sidebar.tagline}
        navItems={sidebar.navItems}
        actionLabel={sidebar.actionLabel}
        actionIcon={sidebar.actionIcon}
        footerItems={sidebar.footerItems}
      />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Bar */}
        {topBar && (
          <TopAppBar
            brandName={topBar.brandName}
            navLinks={topBar.navLinks}
            addButtonLabel={topBar.addButtonLabel}
            onAddClick={topBar.onAddClick}
          />
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 4, md: 6, lg: 10 },
            pt: topBar ? { xs: 14, md: 14, lg: 14 } : { xs: 4, md: 6, lg: 10 },
            overflowY: 'auto',
            maxWidth,
            mx: 'auto',
            width: '100%',
            ...mainSx,
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Mobile Bottom Nav */}
      {bottomNav && <BottomNavBar items={bottomNav} />}
    </Box>
  );
};
