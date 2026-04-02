import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface IconLabelProps {
  icon: ReactNode;
  label: string;
}

export const IconLabel = ({ icon, label }: IconLabelProps) => {
  return (
    <Box
      component="label"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: '#ccc3d3',
        fontSize: '10px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}
    >
      <Box sx={{ display: 'flex', fontSize: '0.875rem' }}>{icon}</Box>
      <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}>
        {label}
      </Typography>
    </Box>
  );
};
