import { Box, Stack, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';
import { HistoryItemRow, type ReminderHistoryItem } from '../HistoryItemRow';
import { SurfacePanel } from '../SurfacePanel';

interface RemindersHistorySectionProps {
  historyItems: ReminderHistoryItem[];
}

export const RemindersHistorySection = ({ historyItems }: RemindersHistorySectionProps) => {
  return (
    <>
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
          <HistoryItemRow key={item.title} item={item} bordered={index < historyItems.length - 1} />
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
    </>
  );
};
