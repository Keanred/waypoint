import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import { alpha, Chip, Stack, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';
import { StatusOrb } from '../StatusOrb';
import { SurfacePanel } from '../SurfacePanel';

export interface SummaryCard {
  statusLabel: string;
  accent: string;
  dueLabel: string;
  title: string;
  description: string;
  reminderLabel: string;
  category: string;
}

export function SummaryTaskCard({ card }: { card: SummaryCard }) {
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
          <Typography
            variant="caption"
            sx={{ color: card.accent, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
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
  );
}
