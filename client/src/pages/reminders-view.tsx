import AddAlertRoundedIcon from '@mui/icons-material/AddAlertRounded'
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded'
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded'
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import {
  alpha,
  Avatar,
  Box,
  Chip,
  Fab,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { NavigationItem } from '../components/app-sidebar'
import { AppSidebar } from '../components/app-sidebar'
import { UtilityHeader } from '../components/utility-header'
import { AmbientBackground } from '../components/ambient-background'
import { StatusOrb } from '../components/status-orb'
import { SurfacePanel } from '../components/surface-panel'
import { dashboardColors } from '../theme'

export interface ReminderQueueItem {
  title: string
  offsetLabel: string
  scheduledAt: string
  accent: string
  highlighted?: boolean
}

export interface ReminderHistoryItem {
  title: string
  offsetLabel: string
  deliveredAt: string
  channel: string
}

interface RemindersViewProps {
  workspaceName: string
  workspaceTagline: string
  navigationItems: NavigationItem[]
  footerItems: NavigationItem[]
  queuedReminders: ReminderQueueItem[]
  historyItems: ReminderHistoryItem[]
  title: string
  subtitle: string
  avatarUrl: string
  tipTitle: string
  tipDescription: string
  tipActionLabel: string
}

function QueueReminderCard({ item }: { item: ReminderQueueItem }) {
  return (
    <SurfacePanel
      sx={{
        px: 3,
        py: 2.5,
        borderRadius: 3,
        borderLeft: item.highlighted ? `4px solid ${dashboardColors.primary}` : undefined,
        transition: 'background-color 180ms ease, transform 180ms ease',
        '&:hover': {
          backgroundColor: dashboardColors.surfaceContainerHigh,
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Stack direction="row" spacing={3} alignItems="center" sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              color: dashboardColors.primary,
              backgroundColor: dashboardColors.surfaceContainerHighest,
              flexShrink: 0,
            }}
          >
            <AlarmRoundedIcon />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ mb: 0.5, fontSize: '1.05rem' }}>
              {item.title}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center" useFlexGap flexWrap="wrap">
              <Stack direction="row" spacing={0.75} alignItems="center">
                <StatusOrb accent={item.accent} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.offsetLabel}
                </Typography>
              </Stack>
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: alpha(dashboardColors.outlineVariant, 0.4) }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Scheduled: {item.scheduledAt}
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <IconButton sx={{ color: 'text.secondary', '&:hover': { color: dashboardColors.error } }}>
          <DeleteRoundedIcon />
        </IconButton>
      </Stack>
    </SurfacePanel>
  )
}

function HistoryItemRow({ item, bordered }: { item: ReminderHistoryItem; bordered: boolean }) {
  return (
    <Box
      sx={{
        px: 3,
        py: 3,
        borderBottom: bordered ? `1px solid ${alpha(dashboardColors.outlineVariant, 0.1)}` : undefined,
        transition: 'background-color 180ms ease',
        '&:hover': {
          backgroundColor: dashboardColors.surfaceContainerHigh,
        },
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between" spacing={2} alignItems="flex-start">
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {item.title}
          </Typography>
          <Chip
            label="Sent"
            icon={<StatusOrb accent={dashboardColors.tertiary} />}
            sx={{
              height: 28,
              color: dashboardColors.tertiary,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              backgroundColor: alpha(dashboardColors.tertiary, 0.1),
              '& .MuiChip-icon': {
                ml: 1,
              },
            }}
          />
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Offset: {item.offsetLabel}
        </Typography>
        <Typography variant="caption" sx={{ color: alpha(dashboardColors.textSecondary, 0.6) }}>
          Delivered: {item.deliveredAt} via {item.channel}
        </Typography>
      </Stack>
    </Box>
  )
}

export function RemindersView({
  workspaceName,
  workspaceTagline,
  navigationItems,
  footerItems,
  queuedReminders,
  historyItems,
  title,
  subtitle,
  avatarUrl,
  tipTitle,
  tipDescription,
  tipActionLabel,
}: RemindersViewProps) {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: dashboardColors.background }}>
      <AmbientBackground />
      <AppSidebar
        workspaceName={workspaceName}
        workspaceTagline={workspaceTagline}
        navigationItems={navigationItems}
        footerItems={footerItems}
        primaryActionLabel="New Task"
      />
      <UtilityHeader searchPlaceholder="Search notifications..." links={["Docs", "Status"]} />

      <Box
        component="main"
        sx={{
          ml: { xs: 0, lg: '256px' },
          minHeight: '100vh',
          px: { xs: 3, md: 5, xl: 6 },
          pt: { xs: 4, md: 10, xl: 11 },
          pb: { xs: 10, md: 8 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          spacing={3}
          sx={{ mb: { xs: 8, md: 10 } }}
        >
          <Box>
            <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {subtitle}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <IconButton
              sx={{
                p: 1.5,
                borderRadius: '50%',
                backgroundColor: alpha(dashboardColors.surfaceContainerHighest, 0.5),
                color: 'text.primary',
                '&:hover': { backgroundColor: dashboardColors.surfaceContainerHigh },
              }}
            >
              <NotificationsRoundedIcon />
            </IconButton>
            <Avatar
              src={avatarUrl}
              alt="User avatar"
              sx={{
                width: 48,
                height: 48,
                bgcolor: dashboardColors.surfaceContainerHigh,
                border: `1px solid ${alpha(dashboardColors.outlineVariant, 0.2)}`,
              }}
            />
          </Stack>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', xl: 'repeat(12, minmax(0, 1fr))' },
            gap: 4,
          }}
        >
          <Box sx={{ gridColumn: { xl: 'span 7' } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, px: 1 }}>
              <Typography variant="h3" sx={{ color: dashboardColors.primary, fontSize: '1.85rem' }}>
                Queued Reminders
              </Typography>
              <Chip
                label="Upcoming"
                sx={{
                  color: dashboardColors.primary,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  backgroundColor: dashboardColors.surfaceContainerHigh,
                }}
              />
            </Stack>
            <Stack spacing={2}>
              {queuedReminders.map((item) => (
                <QueueReminderCard key={item.title} item={item} />
              ))}
            </Stack>
          </Box>

          <Box sx={{ gridColumn: { xl: 'span 5' } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, px: 1 }}>
              <Typography variant="h3" sx={{ fontSize: '1.85rem' }}>
                Notification History
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Last 30 days
              </Typography>
            </Stack>

            <SurfacePanel variant="low" sx={{ borderRadius: 4, overflow: 'hidden', mb: 4 }}>
              {historyItems.map((item, index) => (
                <HistoryItemRow
                  key={item.title}
                  item={item}
                  bordered={index < historyItems.length - 1}
                />
              ))}
              <Box
                sx={{
                  py: 2.5,
                  textAlign: 'center',
                  color: dashboardColors.primary,
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  '&:hover': {
                    backgroundColor: dashboardColors.surfaceContainer,
                  },
                }}
              >
                View Full Log
              </Box>
            </SurfacePanel>

            <SurfacePanel variant="high" sx={{ p: 4, borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {tipTitle}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                  {tipDescription}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: dashboardColors.secondary }}>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {tipActionLabel}
                  </Typography>
                  <ArrowForwardRoundedIcon fontSize="small" />
                </Stack>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  right: -40,
                  bottom: -40,
                  width: 128,
                  height: 128,
                  borderRadius: '50%',
                  backgroundColor: alpha(dashboardColors.primary, 0.1),
                  filter: 'blur(48px)',
                }}
              />
            </SurfacePanel>
          </Box>
        </Box>

        <Fab
          sx={{
            position: 'fixed',
            right: { xs: 20, md: 48 },
            bottom: { xs: 20, md: 48 },
            width: 64,
            height: 64,
            backgroundColor: dashboardColors.primary,
            color: '#1a003b',
            boxShadow: `0 24px 48px ${alpha(dashboardColors.primary, 0.3)}`,
            '&:hover': {
              backgroundColor: dashboardColors.primary,
              transform: 'scale(1.05)',
            },
          }}
        >
          <AddAlertRoundedIcon sx={{ fontSize: 30 }} />
        </Fab>
      </Box>
    </Box>
  )
}

export const remindersNavigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: <DashboardRoundedIcon fontSize="small" />,
  },
  {
    label: 'Tasks',
    icon: <ChecklistRoundedIcon fontSize="small" />,
  },
  {
    label: 'Reminders',
    icon: <AlarmRoundedIcon fontSize="small" />,
    active: true,
  },
  {
    label: 'Projects',
    icon: <FolderRoundedIcon fontSize="small" />,
  },
  {
    label: 'Archive',
    icon: <ArchiveRoundedIcon fontSize="small" />,
  },
]

export const remindersFooterItems: NavigationItem[] = [
  {
    label: 'Support',
    icon: <HelpOutlineRoundedIcon fontSize="small" />,
  },
  {
    label: 'Log Out',
    icon: <LogoutRoundedIcon fontSize="small" />,
  },
]