import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { alpha, Box, Stack, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';
import { SurfacePanel } from '../SurfacePanel';

interface RemindersTipCardProps {
  tipTitle: string;
  tipDescription: string;
  tipActionLabel: string;
}

export const RemindersTipCard = ({ tipTitle, tipDescription, tipActionLabel }: RemindersTipCardProps) => {
  return (
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
  );
};
