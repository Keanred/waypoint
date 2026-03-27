import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { alpha, Box, IconButton, Stack, Typography } from '@mui/material'
import { dashboardColors } from '../../theme'
import { StatusOrb } from '../StatusOrb'
import { SurfacePanel } from '../SurfacePanel'

export interface ReminderQueueItem {
  title: string
  offsetLabel: string
  scheduledAt: string
  accent: string
  highlighted?: boolean
}

export function QueueReminderCard({ item }: { item: ReminderQueueItem }) {
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
