import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';
import Typography from '@mui/material/Typography';

import { colors } from '../theme';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  options: SelectOption[];
  defaultValue?: string;
  helperText?: string;
}

export const SelectField = ({ label, options, defaultValue, helperText }: SelectFieldProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: 448 }}>
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
      <Box sx={{ position: 'relative' }}>
        <NativeSelect
          defaultValue={defaultValue}
          IconComponent={ExpandMoreRoundedIcon}
          sx={{
            width: '100%',
            bgcolor: colors.surfaceContainerHighest,
            borderRadius: '12px',
            px: 2,
            py: 1.5,
            color: colors.onSurface,
            fontSize: '1rem',
            '&:before, &:after': { display: 'none' },
            '& select': {
              p: 0,
              pr: 4,
              bgcolor: 'transparent',
              '&:focus': { bgcolor: 'transparent' },
            },
            '& .MuiNativeSelect-icon': {
              color: colors.onSurfaceVariant,
              right: 16,
            },
          }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </NativeSelect>
      </Box>
      {helperText && (
        <Typography sx={{ fontSize: '0.75rem', color: colors.onSurfaceVariant, pt: 1, px: 0.5 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};
