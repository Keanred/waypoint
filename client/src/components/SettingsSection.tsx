import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface SettingsSectionProps {
  icon: ReactNode;
  iconColor: string;
  title: string;
  children: ReactNode;
}

export const SettingsSection = ({ icon, iconColor, title, children }: SettingsSectionProps) => {
  return (
    <Box component="section">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <Box sx={{ color: iconColor, fontSize: '1.875rem', display: 'flex' }}>{icon}</Box>
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Manrope' }}>{title}</Typography>
      </Box>
      <Box
        sx={{
          bgcolor: '#191b26',
          borderRadius: '16px',
          p: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
