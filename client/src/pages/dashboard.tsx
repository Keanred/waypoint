import type { ReactElement } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import {
  alpha,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { dashboardColors } from '../theme'
import { GradientActionButton } from '../components/gradient-action-button'
import { SectionLabel } from '../components/section-label'
import { StatusOrb } from '../components/status-orb'
import { SurfacePanel } from '../components/surface-panel'
import { WorkspaceIdentity } from '../components/workspace-identity'

export interface NavigationItem {
  label: string
  icon: ReactElement
  active?: boolean
}

export interface Participant {
  name: string
  initials: string
  accent: string
}

export interface FeaturedTask {
  statusLabel: string
  accent: string
  dueLabel: string
  title: string
  description: string
  reminderLabel: string
  participants: Participant[]
}

export interface SummaryCard {
  statusLabel: string
  accent: string
  dueLabel: string
  title: string
  description: string
  reminderLabel: string
  category: string
}

export interface ActiveTask {
  accent: string
  statusLabel: string
  title: string
  description: string
  dueLabel: string
}

interface NocturnalDashboardProps {
  appName: string
  workspaceName: string
  workspaceTagline: string
  title: string
  subtitle: string
  weeklyVelocity: number
  featuredTask: FeaturedTask
  summaryCards: SummaryCard[]
  activeTasks: ActiveTask[]
  navigationItems: NavigationItem[]
  footerItems: NavigationItem[]
  primaryActionLabel: string
  topReminderLabel: string
  modalTitle: string
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
          backgroundColor: item.active
            ? dashboardColors.surfaceContainerHigh
            : dashboardColors.surfaceContainer,
        },
      }}
    >
      {item.label}
    </Button>
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
        position: 'sticky',
        top: 88,
        height: 'calc(100vh - 104px)',
        flexDirection: 'column',
        gap: 2,
        px: 2,
        py: 3,
        borderRight: `1px solid ${alpha(dashboardColors.outlineVariant, 0.16)}`,
        backgroundColor: dashboardColors.surfaceLow,
      }}
    >
      <Box sx={{ px: 1.5, mb: 2 }}>
        <WorkspaceIdentity title={workspaceName} subtitle={workspaceTagline} titleVariant="h4" />
      </Box>

      <Stack spacing={1} sx={{ flex: 1 }}>
        {navigationItems.map((item) => (
          <NavigationLink key={item.label} item={item} />
        ))}
      </Stack>

      <GradientActionButton
        fullWidth
        sx={{
          justifyContent: 'center',
        }}
      >
        <AddRoundedIcon sx={{ mr: 1 }} />
        {primaryActionLabel}
      </GradientActionButton>

      <Stack spacing={1} sx={{ pt: 2, borderTop: `1px solid ${alpha(dashboardColors.outlineVariant, 0.16)}` }}>
        {footerItems.map((item) => (
          <NavigationLink key={item.label} item={item} />
        ))}
      </Stack>
    </Box>
  )
}

function MobileNavigation({ items }: { items: NavigationItem[] }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        display: { xs: 'flex', lg: 'none' },
        overflowX: 'auto',
        pb: 1,
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {items.map((item) => (
        <Chip
          key={item.label}
          icon={item.icon}
          label={item.label}
          clickable={false}
          sx={{
            px: 1,
            height: 38,
            color: item.active ? 'text.primary' : 'text.secondary',
            backgroundColor: item.active ? dashboardColors.surfaceContainerHigh : dashboardColors.surfaceLow,
            border: `1px solid ${alpha(dashboardColors.outlineVariant, 0.22)}`,
            '& .MuiChip-icon': {
              color: 'inherit',
            },
          }}
        />
      ))}
    </Stack>
  )
}

function FeaturedTaskCard({ task }: { task: FeaturedTask }) {
  return (
    <SurfacePanel
      sx={{
        p: { xs: 3, md: 4 },
        height: '100%',
        transition: 'border-color 180ms ease, transform 180ms ease, background-color 180ms ease',
        '&:hover': {
          backgroundColor: dashboardColors.surfaceContainerHigh,
          borderColor: alpha(dashboardColors.outlineVariant, 0.18),
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Stack spacing={4} sx={{ height: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <StatusOrb accent={task.accent} />
            <Typography variant="caption" sx={{ color: task.accent, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {task.statusLabel}
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {task.dueLabel}
          </Typography>
        </Stack>

        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {task.title}
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 720, color: 'text.secondary', lineHeight: 1.8 }}>
            {task.description}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          <SurfacePanel
            variant="low"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 1,
              borderRadius: 2.5,
            }}
          >
            <NotificationsRoundedIcon sx={{ color: dashboardColors.secondary, fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {task.reminderLabel}
            </Typography>
          </SurfacePanel>

          <Stack direction="row" spacing={-0.75}>
            {task.participants.map((participant) => (
              <Avatar
                key={participant.name}
                sx={{
                  width: 34,
                  height: 34,
                  border: `2px solid ${dashboardColors.surfaceContainer}`,
                  backgroundColor: participant.accent,
                  color: dashboardColors.background,
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {participant.initials}
              </Avatar>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </SurfacePanel>
  )
}

function VelocityCard({ value }: { value: number }) {
  return (
    <SurfacePanel
      sx={{
        position: 'relative',
        p: { xs: 3, md: 4 },
        minHeight: 250,
        overflow: 'hidden',
      }}
    >
      <Stack justifyContent="space-between" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
            Weekly Velocity
          </Typography>
          <Typography variant="h2">{value}%</Typography>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Box
            sx={{
              height: 8,
              borderRadius: 999,
              backgroundColor: dashboardColors.surfaceLow,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: `${value}%`,
                height: '100%',
                borderRadius: 999,
                backgroundColor: dashboardColors.tertiary,
                boxShadow: `0 0 12px ${dashboardColors.tertiary}`,
              }}
            />
          </Box>
        </Box>
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          right: -56,
          bottom: -56,
          width: 180,
          height: 180,
          borderRadius: '50%',
          backgroundColor: alpha(dashboardColors.primary, 0.2),
          filter: 'blur(60px)',
        }}
      />
    </SurfacePanel>
  )
}

function SummaryTaskCard({ card }: { card: SummaryCard }) {
  return (
    <SurfacePanel
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        height: '100%',
        transition: 'background-color 180ms ease, transform 180ms ease',
        '&:hover': {
          backgroundColor: dashboardColors.surfaceContainerHigh,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <StatusOrb accent={card.accent} />
          <Typography variant="caption" sx={{ color: card.accent, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            {card.statusLabel}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {card.dueLabel}
        </Typography>
      </Stack>

      <Typography variant="h5" sx={{ mb: 1.5 }}>
        {card.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 4,
          color: 'text.secondary',
          lineHeight: 1.7,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
        }}
      >
        {card.description}
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mt: 'auto' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <AlarmRoundedIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
            {card.reminderLabel}
          </Typography>
        </Stack>
        <Chip
          label={card.category}
          sx={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            borderRadius: 999,
            color: 'text.primary',
            backgroundColor: dashboardColors.surfaceLow,
            border: `1px solid ${alpha(dashboardColors.outlineVariant, 0.2)}`,
          }}
        />
      </Stack>
    </SurfacePanel>
  )
}

function ActiveTaskRow({ task }: { task: ActiveTask }) {
  return (
    <SurfacePanel
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 2, md: 3 },
        p: 2.5,
        transition: 'background-color 180ms ease, transform 180ms ease',
        '&:hover': {
          backgroundColor: dashboardColors.surfaceContainerHigh,
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Box sx={{ width: 6, alignSelf: 'stretch', borderRadius: 999, backgroundColor: task.accent }} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {task.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {task.description}
        </Typography>
      </Box>
      <Box
        sx={{
          minWidth: { xs: 'auto', md: 140 },
          pl: { md: 3 },
          borderLeft: { md: `1px solid ${alpha(dashboardColors.outlineVariant, 0.16)}` },
          textAlign: { xs: 'left', md: 'right' },
        }}
      >
        <Typography variant="caption" sx={{ display: 'block', color: task.accent, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', mb: 0.5 }}>
          {task.statusLabel}
        </Typography>
        <Typography variant="body2">{task.dueLabel}</Typography>
      </Box>
      <IconButton
        sx={{
          backgroundColor: dashboardColors.surfaceLow,
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: dashboardColors.surfaceContainerHighest,
          },
        }}
      >
        <MoreVertRoundedIcon />
      </IconButton>
    </SurfacePanel>
  )
}

function ModalPreview({ modalTitle, primaryActionLabel }: { modalTitle: string; primaryActionLabel: string }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        display: { xs: 'none', xl: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        visibility: 'hidden',
        pointerEvents: 'none',
        backgroundColor: alpha(dashboardColors.surfaceContainerHighest, 0.8),
        backdropFilter: 'blur(20px)',
      }}
    >
      <SurfacePanel
        variant="high"
        sx={{
          width: '100%',
          maxWidth: 640,
          p: 4,
          opacity: 0,
          transform: 'scale(0.95)',
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          {modalTitle}
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Box sx={{ mb: 1 }}>
              <SectionLabel>Title</SectionLabel>
            </Box>
            <SurfacePanel variant="low" sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Enter task name...
              </Typography>
            </SurfacePanel>
          </Box>
          <Box>
            <Box sx={{ mb: 1 }}>
              <SectionLabel>Priority</SectionLabel>
            </Box>
            <Stack direction="row" spacing={1.5}>
              {[
                { label: 'Critical', color: dashboardColors.error },
                { label: 'Standard', color: dashboardColors.secondary },
                { label: 'Low', color: dashboardColors.tertiary },
              ].map((option) => (
                <Button
                  key={option.label}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2.5,
                    color: option.color,
                    backgroundColor: alpha(option.color, 0.1),
                    border: `1px solid ${alpha(option.color, 0.3)}`,
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Stack>
          </Box>
          <Stack direction="row" spacing={2}>
            <GradientActionButton
              fullWidth
            >
              {primaryActionLabel}
            </GradientActionButton>
            <Button
              sx={{
                minWidth: 120,
                py: 1.75,
                borderRadius: 3,
                color: 'text.secondary',
                backgroundColor: dashboardColors.surfaceLow,
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </SurfacePanel>
    </Box>
  )
}

export function NocturnalDashboard({
  appName,
  workspaceName,
  workspaceTagline,
  title,
  subtitle,
  weeklyVelocity,
  featuredTask,
  summaryCards,
  activeTasks,
  navigationItems,
  footerItems,
  primaryActionLabel,
  topReminderLabel,
  modalTitle,
}: NocturnalDashboardProps) {
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

          <Box sx={{ mb: { xs: 8, md: 10 }, maxWidth: 920 }}>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.75rem', md: '4rem' }, mb: 1.5 }}>
              {title}
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
              gap: 3,
              maxWidth: 1280,
              mb: 8,
            }}
          >
            <Box sx={{ gridColumn: { xs: 'auto', md: 'span 8' } }}>
              <FeaturedTaskCard task={featuredTask} />
            </Box>
            <Box sx={{ gridColumn: { xs: 'auto', md: 'span 4' } }}>
              <VelocityCard value={weeklyVelocity} />
            </Box>
            {summaryCards.map((card) => (
              <Box key={card.title} sx={{ gridColumn: { xs: 'auto', md: 'span 6' } }}>
                <SummaryTaskCard card={card} />
              </Box>
            ))}
          </Box>

          <Box sx={{ maxWidth: 1100 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.6rem', md: '2rem' } }}>
                All Active Tasks
              </Typography>
              <Chip
                label={topReminderLabel}
                sx={{
                  color: dashboardColors.secondary,
                  backgroundColor: alpha(dashboardColors.secondary, 0.12),
                  border: `1px solid ${alpha(dashboardColors.secondary, 0.24)}`,
                }}
              />
            </Stack>
            <Stack spacing={2}>
              {activeTasks.map((task) => (
                <ActiveTaskRow key={task.title} task={task} />
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>

      <ModalPreview modalTitle={modalTitle} primaryActionLabel={primaryActionLabel} />
    </Box>
  )
}