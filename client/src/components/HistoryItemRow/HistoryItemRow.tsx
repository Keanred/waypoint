import { alpha, Box, Chip, Stack, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';
import { StatusOrb } from '../StatusOrb';

export interface ReminderHistoryItem {
  title: string;
  offsetLabel: string;
  deliveredAt: string;
  channel: string;
}

export function HistoryItemRow({ item, bordered }: { item: ReminderHistoryItem; bordered: boolean }) {
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
  );
}
