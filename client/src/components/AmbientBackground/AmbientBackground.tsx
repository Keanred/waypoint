import { alpha, Box } from '@mui/material';
import { dashboardColors } from '../../theme';

export const AmbientBackground = () => {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '-25%',
          right: '-25%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          backgroundColor: alpha(dashboardColors.primary, 0.1),
          filter: 'blur(120px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-25%',
          left: '-25%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          backgroundColor: alpha(dashboardColors.secondary, 0.05),
          filter: 'blur(100px)',
        }}
      />
    </Box>
  );
}
