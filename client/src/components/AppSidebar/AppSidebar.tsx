import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { alpha, Box, Button, Stack } from '@mui/material';
import type { ReactElement } from 'react';
import { dashboardColors } from '../../theme';
import { GradientActionButton } from '../GradientActionButton';
import { WorkspaceIdentity } from '../WorkspaceIdentity';

export interface NavigationItem {
  label: string;
  icon: ReactElement;
  active?: boolean;
}

function NavigationLink({ item }: { item: NavigationItem }) {
  return (
    <Button
      fullWidth
      startIcon={item.icon}
      sx={{
        justifyContent: 'flex-start',
        px: 2,
        py: 1.5,
        borderRadius: 2,
        color: item.active ? 'text.primary' : 'text.secondary',
        backgroundColor: item.active ? dashboardColors.surfaceContainerHigh : 'transparent',
        '&:hover': {
          backgroundColor: dashboardColors.surfaceContainerHigh,
          color: 'text.primary',
        },
      }}
    >
      {item.label}
    </Button>
  );
}

export function AppSidebar({
  workspaceName,
  workspaceTagline,
  navigationItems,
  footerItems,
  primaryActionLabel,
}: {
  workspaceName: string;
  workspaceTagline: string;
  navigationItems: NavigationItem[];
  footerItems: NavigationItem[];
  primaryActionLabel: string;
}) {
  return (
    <Box
      component="aside"
      sx={{
        display: { xs: 'none', md: 'flex' },
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 50,
        width: 256,
        height: '100vh',
        flexDirection: 'column',
        gap: 2,
        px: 2,
        py: 3,
        backgroundColor: dashboardColors.surfaceLow,
      }}
    >
      <Box sx={{ px: 1.5, mb: 3 }}>
        <WorkspaceIdentity title={workspaceName} subtitle={workspaceTagline} titleVariant="h4" />
      </Box>

      <Stack spacing={1} sx={{ flex: 1 }}>
        {navigationItems.map((item) => (
          <NavigationLink key={item.label} item={item} />
        ))}
      </Stack>

      <GradientActionButton fullWidth sx={{ justifyContent: 'center', mb: 2 }}>
        <AddRoundedIcon sx={{ mr: 1 }} />
        {primaryActionLabel}
      </GradientActionButton>

      <Stack spacing={1} sx={{ pt: 2, borderTop: `1px solid ${alpha(dashboardColors.outlineVariant, 0.12)}` }}>
        {footerItems.map((item) => (
          <NavigationLink key={item.label} item={item} />
        ))}
      </Stack>
    </Box>
  );
}
