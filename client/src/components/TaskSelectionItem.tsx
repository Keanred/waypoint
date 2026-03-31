import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

import { colors } from '../theme';

interface TaskSelectionItemProps {
  icon: ReactNode;
  iconBgColor: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export const TaskSelectionItem = ({ icon, iconBgColor, title, subtitle, onClick }: TaskSelectionItemProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: '16px',
        bgcolor: 'rgba(39, 41, 53, 0.5)',
        border: '1px solid rgba(74, 68, 81, 0.05)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: 'rgba(215, 186, 255, 0.5)',
          bgcolor: colors.surfaceContainerHighest,
          '& .play-icon': { opacity: 1 },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            bgcolor: iconBgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, color: colors.onSurface, fontSize: '0.875rem' }}>{title}</Typography>
          <Typography sx={{ fontSize: '0.75rem', color: colors.onSurfaceVariant }}>{subtitle}</Typography>
        </Box>
      </Box>
      <PlayCircleRoundedIcon
        className="play-icon"
        sx={{ color: colors.primary, opacity: 0, transition: 'opacity 0.2s' }}
      />
    </Box>
  );
};
