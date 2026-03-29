import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Fab from '@mui/material/Fab';

export const FloatingActionButton = () => {
  return (
    <Fab
      sx={{
        position: 'fixed',
        bottom: 96,
        right: 24,
        display: { xs: 'flex', lg: 'none' },
        width: 64,
        height: 64,
        background: 'linear-gradient(to top right, #d7baff, #bd93f9)',
        color: '#411478',
        boxShadow: '0 25px 50px -12px rgba(189, 147, 249, 0.4)',
        '&:hover': {
          background: 'linear-gradient(to top right, #d7baff, #bd93f9)',
        },
        '&:active': { transform: 'scale(0.95)' },
      }}
    >
      <AddRoundedIcon sx={{ fontSize: '1.875rem' }} />
    </Fab>
  );
};
