import { Box } from '@mui/material';
import { dashboardColors } from '../../theme';

export const FilterTag = ({ label, active = false }: { label: string; active?: boolean }) => {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderRadius: 2,
        backgroundColor: active ? dashboardColors.primary : dashboardColors.surfaceContainerHigh,
        color: active ? '#1a003b' : 'text.primary',
        fontSize: 12,
        fontWeight: active ? 800 : 500,
        letterSpacing: active ? '0.08em' : 0,
        textTransform: active ? 'uppercase' : 'none',
      }}
    >
      {label}
    </Box>
  );
};
