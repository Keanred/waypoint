import { ReactNode } from 'react'
import { alpha, Box, Typography } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import {
  Avatar,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from '@mui/material'
import { dashboardColors } from '../../theme'

export interface NavigationItem {
  label: string
  icon: ReactNode
  active?: boolean
}

export interface AppLayoutProps {
  appName: string
  workspaceName: string
  workspaceTagline: string
  navigationItems: NavigationItem[]
  footerItems: NavigationItem[]
  primaryActionLabel: string
  children: ReactNode
}

function SearchField() {
  return (
    <Paper
      elevation={0}
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 0.75,
        width: 280,
        borderRadius: 2,
        backgroundColor: dashboardColors.surfaceContainerLowest,
        border: `1px solid ${alpha(dashboardColors.outlineVariant, 0.2)}`,
      }}
    >
      <SearchRoundedIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
      <InputBase
        placeholder="Search tasks..."
        fullWidth
        inputProps={{ 'aria-label': 'Search tasks' }}
        sx={{
          color: 'text.primary',
          fontSize: 14,
        }}
      />
    </Paper>
  )
}

function TopNavigation({ appName }: { appName: string }) {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        px: { xs: 2, md: 4 },
        height: 72,
        borderBottom: `1px solid ${alpha(dashboardColors.outlineVariant, 0.18)}`,
        backgroundColor: alpha(dashboardColors.background, 0.92),
        backdropFilter: 'blur(20px)',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.06em' }}>
        {appName}
      </Typography>
      <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
        <SearchField />
        <IconButton sx={{ color: 'text.secondary' }}>
          <NotificationsRoundedIcon />
        </IconButton>
        <IconButton sx={{ color: 'text.secondary' }}>
          <SettingsRoundedIcon />
        </IconButton>
        <Avatar sx={{ width: 36, height: 36, bgcolor: dashboardColors.surfaceBright, fontSize: 14 }}>
          KA
        </Avatar>
      </Stack>
    </Box>
  )
}

function Sidebar({
  workspaceName,
  workspaceTagline,
  navigationItems,
  footerItems,
  primaryActionLabel,
}: {
  workspaceName: string
  workspaceTagline: string
  navigationItems: NavigationItem[]
  footerItems: NavigationItem[]
  primaryActionLabel: string
}) {
  return (
    <Box
      component="aside"
      sx={{
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: 'calc(100vh - 72px)',
        borderRight: `1px solid ${alpha(dashboardColors.outlineVariant, 0.18)}`,
        backgroundColor: dashboardColors.background,
        px: 0.5,
        py: 2,
        overflowY: 'auto',
      }}
    >
      <Box sx={{ px: 1.5, mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 0.5 }}>
          {workspaceName}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '11px' }}>
          {workspaceTagline}
        </Typography>
      </Box>

      <Stack spacing={0.5} sx={{ flex: 1, mb: 3 }}>
        {navigationItems.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 1.5,
              py: 1,
              borderRadius: 2,
              backgroundColor: item.active ? alpha(dashboardColors.primary, 0.12) : 'transparent',
              color: item.active ? dashboardColors.primary : 'text.secondary',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: alpha(dashboardColors.primary, 0.08),
                color: dashboardColors.primary,
              },
            }}
          >
            <Box sx={{ fontSize: 20, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>
            <Typography sx={{ fontSize: 13, fontWeight: item.active ? 600 : 500 }}>{item.label}</Typography>
          </Box>
        ))}
      </Stack>

      <Box sx={{ pt: 3, borderTop: `1px solid ${alpha(dashboardColors.outlineVariant, 0.1)}` }}>
        <Box
          sx={{
            mb: 2,
            px: 1.5,
            py: 1,
            borderRadius: 2,
            backgroundColor: alpha(dashboardColors.primary, 0.12),
            color: dashboardColors.primary,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 13,
            textAlign: 'center',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: alpha(dashboardColors.primary, 0.2),
            },
          }}
        >
          + {primaryActionLabel}
        </Box>

        <Stack spacing={0.5}>
          {footerItems.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 1.5,
                py: 1,
                borderRadius: 2,
                color: 'text.secondary',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: 13,
                '&:hover': {
                  backgroundColor: alpha(dashboardColors.primary, 0.08),
                  color: dashboardColors.primary,
                },
              }}
            >
              <Box sx={{ fontSize: 18, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>
              <Typography sx={{ fontSize: 13 }}>{item.label}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

function MobileNavigation({ items }: { items: NavigationItem[] }) {
  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'none' },
        gap: 1,
        mb: 4,
        pb: 2,
        borderBottom: `1px solid ${alpha(dashboardColors.outlineVariant, 0.1)}`,
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          height: 4,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(dashboardColors.outlineVariant, 0.3),
          borderRadius: 2,
        },
      }}
    >
      {items.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: item.active ? alpha(dashboardColors.primary, 0.12) : dashboardColors.surfaceLow,
            color: item.active ? dashboardColors.primary : 'text.secondary',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontSize: 13,
            fontWeight: item.active ? 600 : 500,
            transition: 'all 0.2s',
          }}
        >
          {item.icon && <Box sx={{ fontSize: 16, display: 'flex' }}>{item.icon}</Box>}
          {item.label}
        </Box>
      ))}
    </Box>
  )
}

export function AppLayout({
  appName,
  workspaceName,
  workspaceTagline,
  navigationItems,
  footerItems,
  primaryActionLabel,
  children,
}: AppLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: dashboardColors.background }}>
      <TopNavigation appName={appName} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '256px minmax(0, 1fr)' },
          minHeight: 'calc(100vh - 72px)',
        }}
      >
        <Sidebar
          workspaceName={workspaceName}
          workspaceTagline={workspaceTagline}
          navigationItems={navigationItems}
          footerItems={footerItems}
          primaryActionLabel={primaryActionLabel}
        />

        <Box component="main" sx={{ px: { xs: 2, md: 4, xl: 6 }, py: { xs: 3, md: 5 } }}>
          <MobileNavigation items={navigationItems} />
          {children}
        </Box>
      </Box>
    </Box>
  )
}
