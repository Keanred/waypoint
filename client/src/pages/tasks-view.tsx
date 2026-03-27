import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded'
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded'
import BlockRoundedIcon from '@mui/icons-material/BlockRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import SyncRoundedIcon from '@mui/icons-material/SyncRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import LayersRoundedIcon from '@mui/icons-material/LayersRounded'
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded'
import {
  alpha,
  Box,
  Chip,
  Fab,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { NavigationItem } from '../components/app-sidebar'
import type { HeaderLinkItem } from '../components/fixed-top-nav'
import { AppSidebar } from '../components/app-sidebar'
import { FixedTopNav } from '../components/fixed-top-nav'
import { SearchInput } from '../components/search-input'
import { AmbientBackground } from '../components/ambient-background'
import { StatusOrb } from '../components/status-orb'
import { SurfacePanel } from '../components/surface-panel'
import { dashboardColors } from '../theme'

export interface TaskListItem {
  title: string
  description: string
  accent: string
  project: string
  dueLabel: string
  dueSubtext: string
  dueAccent: string
  recurrence: string
  recurrenceType: 'none' | 'sync' | 'calendar'
  remindersCount: number
  reminderAccent?: string
}

export interface TaskMetricCard {
  label: string
  value: string
  description: string
  accent: string
  icon: 'bolt' | 'warning' | 'layers'
}

interface TasksViewProps {
  workspaceName: string
  workspaceTagline: string
  brandName: string
  headerLinks: HeaderLinkItem[]
  navigationItems: NavigationItem[]
  footerItems: NavigationItem[]
  avatarUrl: string
  title: string
  subtitle: string
  tasks: TaskListItem[]
  metrics: TaskMetricCard[]
}

function SegmentedFilter() {
  return (
    <Stack direction="row" spacing={0.5} sx={{ p: 0.5, borderRadius: 3, backgroundColor: dashboardColors.surfaceLow }}>
      <Box
        sx={{
          px: 3,
          py: 1.25,
          borderRadius: 2,
          backgroundColor: dashboardColors.surfaceContainerHigh,
          color: dashboardColors.primary,
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        Active
      </Box>
      <Box
        sx={{
          px: 3,
          py: 1.25,
          borderRadius: 2,
          color: 'text.secondary',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Completed
      </Box>
    </Stack>
  )
}

function FilterTag({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderRadius: 2,
        backgroundColor: active ? dashboardColors.primary : dashboardColors.surfaceContainerHigh,
        color: active ? '#1a003b' : 'text.primary',
        fontSize: 12,
        fontWeight: active ? 800 : 500,
        letterSpacing: active ? '0.08em' : 0,
        textTransform: active ? 'uppercase' : 'none',
      }}
    >
      {label}
    </Box>
  )
}

function FilterBento() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' }, gap: 2, mb: 4 }}>
      <SurfacePanel variant="low" sx={{ p: 3, gridColumn: { md: 'span 2' } }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          View Context
        </Typography>
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 2.5 }}>
          <FilterTag label="All Tasks" active />
          <FilterTag label="By Project" />
          <FilterTag label="Urgent Only" />
          <FilterTag label="Recurring" />
        </Stack>
      </SurfacePanel>

      <SurfacePanel variant="low" sx={{ p: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.16em', textTransform: 'uppercase', display: 'block', mb: 2.5 }}>
          Search
        </Typography>
        <SearchInput placeholder="Find a task..." width="100%" />
      </SurfacePanel>

      <SurfacePanel variant="low" sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          Sort
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2.5 }}>
          <Typography sx={{ fontWeight: 500 }}>Due Date</Typography>
          <SwapVertRoundedIcon sx={{ color: 'text.primary' }} />
        </Stack>
      </SurfacePanel>
    </Box>
  )
}

function recurrenceIcon(type: TaskListItem['recurrenceType']) {
  if (type === 'sync') {
    return <SyncRoundedIcon sx={{ fontSize: 16 }} />
  }

  if (type === 'calendar') {
    return <CalendarMonthRoundedIcon sx={{ fontSize: 16 }} />
  }

  return <BlockRoundedIcon sx={{ fontSize: 16 }} />
}

function reminderBadge(item: TaskListItem) {
  const active = item.remindersCount > 0

  return (
    <Chip
      label={String(item.remindersCount)}
      sx={{
        minWidth: 34,
        height: 24,
        color: active ? item.reminderAccent ?? dashboardColors.secondary : 'text.secondary',
        fontSize: 12,
        fontWeight: 800,
        borderRadius: 1.5,
        backgroundColor: active
          ? alpha(item.reminderAccent ?? dashboardColors.secondary, 0.1)
          : dashboardColors.surfaceContainerHighest,
      }}
    />
  )
}

function TaskTableSection({ tasks }: { tasks: TaskListItem[] }) {
  return (
    <SurfacePanel variant="low" sx={{ borderRadius: 4, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['Task Title', 'Project', 'Due Date', 'Recurrence', 'Reminders', 'Action'].map((label, index) => (
                <TableCell
                  key={label}
                  align={index >= 4 ? (index === 4 ? 'center' : 'right') : 'left'}
                  sx={{
                    py: 3,
                    px: index === 0 || index === 5 ? 4 : 2,
                    color: 'text.secondary',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    borderBottomColor: alpha(dashboardColors.outlineVariant, 0.05),
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.title}
                hover
                sx={{
                  '& .MuiTableCell-root': {
                    borderBottomColor: alpha(dashboardColors.outlineVariant, 0.05),
                  },
                  '&:hover': {
                    backgroundColor: dashboardColors.surfaceContainerHigh,
                  },
                }}
              >
                <TableCell sx={{ py: 3, px: 4 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <StatusOrb accent={task.accent} />
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{task.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {task.description}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ py: 3, px: 2 }}>
                  <Chip
                    label={task.project}
                    sx={{
                      color: 'text.primary',
                      fontSize: 12,
                      backgroundColor: dashboardColors.surfaceContainerHighest,
                      border: `1px solid ${alpha(dashboardColors.outlineVariant, 0.2)}`,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ py: 3, px: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ color: task.dueAccent, fontSize: 14, fontWeight: 700 }}>
                      {task.dueLabel}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {task.dueSubtext}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ py: 3, px: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                    {recurrenceIcon(task.recurrenceType)}
                    <Typography variant="caption">{task.recurrence}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ py: 3, px: 2 }}>
                  {reminderBadge(task)}
                </TableCell>
                <TableCell align="right" sx={{ py: 3, px: 4 }}>
                  <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                    <MoreHorizRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 3, py: 2.5, borderTop: `1px solid ${alpha(dashboardColors.outlineVariant, 0.05)}` }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Showing 5 of 28 active tasks
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton sx={{ borderRadius: 2, backgroundColor: dashboardColors.surfaceContainerHighest, color: 'text.primary' }}>
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ borderRadius: 2, backgroundColor: dashboardColors.surfaceContainerHighest, color: 'text.primary' }}>
            <ChevronRightRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </SurfacePanel>
  )
}

function metricIcon(icon: TaskMetricCard['icon']) {
  if (icon === 'warning') {
    return <WarningAmberRoundedIcon sx={{ fontSize: 76 }} />
  }

  if (icon === 'layers') {
    return <LayersRoundedIcon sx={{ fontSize: 76 }} />
  }

  return <BoltRoundedIcon sx={{ fontSize: 76 }} />
}

function MetricCard({ metric }: { metric: TaskMetricCard }) {
  return (
    <SurfacePanel variant="low" sx={{ p: 4, borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2, color: alpha(dashboardColors.textPrimary, 0.06) }}>
        {metricIcon(metric.icon)}
      </Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        {metric.label}
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, color: metric.accent, fontSize: '2.5rem' }}>
        {metric.value}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', maxWidth: 260 }}>
        {metric.description}
      </Typography>
    </SurfacePanel>
  )
}

export function TasksView({
  workspaceName,
  workspaceTagline,
  brandName,
  headerLinks,
  navigationItems,
  footerItems,
  avatarUrl,
  title,
  subtitle,
  tasks,
  metrics,
}: TasksViewProps) {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: dashboardColors.background }}>
      <AmbientBackground />
      <FixedTopNav brandName={brandName} links={headerLinks} avatarUrl={avatarUrl} />
      <AppSidebar
        workspaceName={workspaceName}
        workspaceTagline={workspaceTagline}
        navigationItems={navigationItems}
        footerItems={footerItems}
        primaryActionLabel="New Task"
      />

      <Box
        component="main"
        sx={{
          ml: { xs: 0, md: '256px' },
          pt: 12,
          pb: 8,
          px: { xs: 3, md: 4, lg: 5 },
          minHeight: '100vh',
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            spacing={3}
            sx={{ mb: 8, pl: { md: 3 } }}
          >
            <Box>
              <Typography variant="h1" sx={{ fontSize: { xs: '3.5rem', md: '4.75rem' }, lineHeight: 0.95 }}>
                {title}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2.5, color: 'text.secondary', fontWeight: 300, maxWidth: 420 }}>
                {subtitle}
              </Typography>
            </Box>
            <SegmentedFilter />
          </Stack>

          <FilterBento />
          <TaskTableSection tasks={tasks} />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 3, mt: 4 }}>
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </Box>
        </Box>

        <Fab
          sx={{
            position: 'fixed',
            right: 32,
            bottom: 32,
            width: 64,
            height: 64,
            color: '#1a003b',
            background: `linear-gradient(135deg, ${dashboardColors.primary} 0%, ${dashboardColors.primaryContainer} 100%)`,
            boxShadow: `0 24px 48px ${alpha(dashboardColors.primary, 0.28)}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${dashboardColors.primary} 0%, ${dashboardColors.primaryContainer} 100%)`,
              transform: 'scale(1.05)',
            },
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 30 }} />
        </Fab>
      </Box>
    </Box>
  )
}

export const tasksHeaderLinks: HeaderLinkItem[] = [
  { label: 'Dashboard' },
  { label: 'Tasks', active: true },
  { label: 'Projects' },
]

export const tasksNavigationItems: NavigationItem[] = [
  { label: 'Dashboard', icon: <DashboardRoundedIcon fontSize="small" /> },
  { label: 'Tasks', icon: <ChecklistRoundedIcon fontSize="small" />, active: true },
  { label: 'Reminders', icon: <AlarmRoundedIcon fontSize="small" /> },
  { label: 'Projects', icon: <FolderRoundedIcon fontSize="small" /> },
  { label: 'Archive', icon: <ArchiveRoundedIcon fontSize="small" /> },
]

export const tasksFooterItems: NavigationItem[] = [
  { label: 'Support', icon: <HelpOutlineRoundedIcon fontSize="small" /> },
  { label: 'Log Out', icon: <LogoutRoundedIcon fontSize="small" /> },
]