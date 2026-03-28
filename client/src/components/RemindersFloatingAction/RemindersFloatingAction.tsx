import AddAlertRoundedIcon from '@mui/icons-material/AddAlertRounded';
import { alpha, Fab } from '@mui/material';
import { dashboardColors } from '../../theme';

export const RemindersFloatingAction = () => {
  return (
    <Fab
      sx={{
        position: 'fixed',
        right: { xs: 20, md: 48 },
        bottom: { xs: 20, md: 48 },
        width: 64,
        height: 64,
        backgroundColor: dashboardColors.primary,
        color: '#1a003b',
        boxShadow: `0 24px 48px ${alpha(dashboardColors.primary, 0.3)}`,
        '&:hover': {
          backgroundColor: dashboardColors.primary,
          transform: 'scale(1.05)',
        },
      }}
    >
      <AddAlertRoundedIcon sx={{ fontSize: 30 }} />
    </Fab>
  );
}
