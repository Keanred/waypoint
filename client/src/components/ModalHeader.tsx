import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { colors } from '../theme';

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}

export const ModalHeader = ({ title, subtitle, onClose }: ModalHeaderProps) => {
  return (
    <Box sx={{ px: 4, pt: 4, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography
          sx={{
            fontSize: '1.875rem',
            fontFamily: 'Manrope',
            fontWeight: 900,
            color: '#ffffff',
            fontStyle: 'italic',
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              color: colors.secondary,
              fontWeight: 500,
              letterSpacing: '0.05em',
              fontSize: '10px',
              textTransform: 'uppercase',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      <IconButton
        onClick={onClose}
        sx={{
          color: colors.outlineVariant,
          '&:hover': { color: colors.onSurface, bgcolor: colors.surfaceContainerHigh },
          transition: 'color 0.2s',
        }}
      >
        <CloseRoundedIcon />
      </IconButton>
    </Box>
  );
};
