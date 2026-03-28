import { Box, Stack } from '@mui/material';
import { dashboardColors } from '../../theme';

export const SegmentedFilter = () => {
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
  );
};
