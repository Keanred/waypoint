import { Box, Chip, Stack, Typography } from '@mui/material';
import type { ReminderQueueItem } from '../QueueReminderCard';
import { QueueReminderCard } from '../QueueReminderCard';
import { dashboardColors } from '../../theme';

interface RemindersQueuedSectionProps {
  queuedReminders: ReminderQueueItem[];
}

export const RemindersQueuedSection = ({ queuedReminders }: RemindersQueuedSectionProps) => {
  return (
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
  );
}
