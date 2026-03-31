import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

import { colors } from '../theme';

interface ReminderPreviewProps {
  children: ReactNode;
}

export const ReminderPreview = ({ children }: ReminderPreviewProps) => {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(11, 14, 24, 0.5)',
        borderRadius: '12px',
        p: 2.5,
        border: '1px solid rgba(74, 68, 81, 0.1)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <Box sx={{ bgcolor: 'rgba(215, 186, 255, 0.1)', p: 1, borderRadius: '8px', display: 'flex' }}>
        <AutoAwesomeRoundedIcon sx={{ color: colors.primary }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontFamily: 'Inter',
            textTransform: 'uppercase',
            letterSpacing: '-0.05em',
            color: colors.onSurfaceVariant,
          }}
        >
          Smart Preview
        </Typography>
        <Typography sx={{ color: colors.onSurface, fontWeight: 500, lineHeight: 1.4 }}>{children}</Typography>
      </Box>
    </Box>
  );
};
