import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface SoundPickerProps {
  label: string;
  value: string;
}

export const SoundPicker = ({ label, value }: SoundPickerProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography sx={{ fontSize: '0.75rem', color: '#ccc3d3' }}>{label}</Typography>
      <Button
        size="small"
        startIcon={<VolumeUpRoundedIcon sx={{ fontSize: '1rem !important' }} />}
        sx={{
          px: 1.5,
          py: 0.75,
          borderRadius: 9999,
          bgcolor: '#272935',
          color: '#e1e1f1',
          fontSize: '0.75rem',
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': { bgcolor: '#373845' },
          transition: 'background 0.2s',
        }}
      >
        {value}
      </Button>
    </Box>
  );
};
