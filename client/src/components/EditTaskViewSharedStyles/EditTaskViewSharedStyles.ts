import { alpha } from '@mui/material';
import { dashboardColors } from '../../theme';

export const editTaskFieldInputStyles = () => {
  return {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      backgroundColor: dashboardColors.surfaceContainerLowest,
      color: 'text.primary',
      alignItems: 'flex-start',
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: alpha(dashboardColors.outlineVariant, 0.25),
      },
      '&.Mui-focused fieldset': {
        borderColor: alpha(dashboardColors.primary, 0.35),
      },
    },
    '& .MuiInputBase-input': {
      color: 'text.primary',
    },
  };
}
