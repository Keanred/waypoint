import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Fab from '@mui/material/Fab';

import { colors } from '../theme';

type FloatingActionButtonProps = {
  onClick?: () => void;
};

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <Fab
      onClick={onClick}
      sx={{
        position: 'fixed',
        bottom: 96,
        right: 24,
        display: { xs: 'flex', lg: 'none' },
        width: 64,
        height: 64,
        background: `linear-gradient(to top right, ${colors.primary}, ${colors.primaryContainer})`,
        color: colors.onPrimary,
        boxShadow: `0 25px 50px -12px ${colors.primaryContainer}66`,
        '&:hover': {
          background: `linear-gradient(to top right, ${colors.primary}, ${colors.primaryContainer})`,
        },
        '&:active': { transform: 'scale(0.95)' },
      }}
    >
      <AddRoundedIcon sx={{ fontSize: '1.875rem' }} />
    </Fab>
  );
};
