import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { alpha, Box, IconButton, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';
import { SurfacePanel } from '../SurfacePanel';

export interface ActiveTask {
  accent: string;
  statusLabel: string;
  title: string;
  description: string;
  dueLabel: string;
}

export const ActiveTaskRow = ({ task }: { task: ActiveTask }) => {
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
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            color: task.accent,
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            mb: 0.5,
          }}
        >
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
  );
};
