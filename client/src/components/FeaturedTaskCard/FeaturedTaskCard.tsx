import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { alpha, Avatar, Box, Stack, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';
import { StatusOrb } from '../StatusOrb';
import { SurfacePanel } from '../SurfacePanel';

export interface Participant {
  name: string;
  initials: string;
  accent: string;
}

export interface FeaturedTask {
  statusLabel: string;
  accent: string;
  dueLabel: string;
  title: string;
  description: string;
  reminderLabel: string;
  participants: Participant[];
}

export const FeaturedTaskCard = ({ task }: { task: FeaturedTask }) => {
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
            <Typography
              variant="caption"
              sx={{ color: task.accent, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
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
  );
};
