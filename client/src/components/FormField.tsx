import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

import { colors } from '../theme';

interface FormFieldProps {
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
}

export const FormField = ({ label, type = 'text', defaultValue, placeholder }: FormFieldProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography
        component="label"
        sx={{
          fontSize: '0.875rem',
          fontWeight: 700,
          color: colors.outlineVariant,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          px: 0.5,
        }}
      >
        {label}
      </Typography>
      <InputBase
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        sx={{
          bgcolor: colors.surfaceContainerHighest,
          borderRadius: '12px',
          px: 2,
          py: 1.5,
          color: colors.onSurface,
          fontSize: '1rem',
          '&:focus-within': {
            boxShadow: '0 0 0 2px rgba(215, 186, 255, 0.5)',
          },
          transition: 'all 0.2s',
          '& input::placeholder': { color: 'rgba(150, 142, 156, 0.4)' },
        }}
      />
    </Box>
  );
};
