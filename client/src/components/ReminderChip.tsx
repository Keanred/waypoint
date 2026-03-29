import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface ReminderChipProps {
  label: string;
  value: string;
  accentColor?: string;
}

export const ReminderChip = ({ label, value, accentColor = '#75d4e8' }: ReminderChipProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.5,
        bgcolor: 'rgba(39, 41, 53, 0.5)',
        borderRadius: '12px',
        border: `1px solid ${accentColor}33`,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            fontSize: '9px',
            color: accentColor,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '-0.05em',
          }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 500 }}>{value}</Typography>
      </Box>
      <IconButton
        size="small"
        sx={{
          color: '#4a4451',
          p: 0.25,
          '&:hover': { color: '#ffb4ab' },
          transition: 'color 0.2s',
        }}
      >
        <CloseRoundedIcon sx={{ fontSize: '1rem' }} />
      </IconButton>
    </Box>
  );
};
