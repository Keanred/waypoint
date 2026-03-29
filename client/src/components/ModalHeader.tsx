import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
}

export const ModalHeader = ({ title, subtitle }: ModalHeaderProps) => {
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
              color: '#b5c5fc',
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
        sx={{
          color: '#4a4451',
          '&:hover': { color: '#e1e1f1', bgcolor: '#272935' },
          transition: 'color 0.2s',
        }}
      >
        <CloseRoundedIcon />
      </IconButton>
    </Box>
  );
};
