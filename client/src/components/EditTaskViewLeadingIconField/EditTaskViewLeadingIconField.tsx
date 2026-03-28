import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { dashboardColors } from '../../theme';

interface EditTaskViewLeadingIconFieldProps {
  icon: ReactNode;
  children: ReactNode;
}

export const EditTaskViewLeadingIconField = ({ icon, children }: EditTaskViewLeadingIconFieldProps) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 16,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          transform: 'translateY(-50%)',
          color: dashboardColors.primary,
        }}
      >
        {icon}
      </Box>
      {children}
    </Box>
  );
}
