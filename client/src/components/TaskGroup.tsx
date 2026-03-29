import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface TaskGroupProps {
  label: string;
  color: string;
  children: ReactNode;
}

export const TaskGroup = ({ label, color, children }: TaskGroupProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: color,
            boxShadow: `0 0 10px ${color}99`,
          }}
        />
        <Typography
          sx={{
            fontFamily: 'Manrope',
            fontWeight: 700,
            color: color,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.75rem',
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{children}</Box>
    </Box>
  );
};
