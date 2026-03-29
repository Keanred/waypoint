import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface StatCardProps {
  value: string;
  label: string;
  valueColor: string;
}

export const StatCard = ({ value, label, valueColor }: StatCardProps) => {
  return (
    <Box
      sx={{
        background: 'rgba(44, 46, 64, 0.4)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(74, 68, 81, 0.2)',
        px: 3,
        py: 2,
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ color: valueColor, fontWeight: 700, fontSize: '1.5rem' }}>{value}</Typography>
      <Typography
        sx={{
          fontSize: '10px',
          color: '#968e9c',
          textTransform: 'uppercase',
          letterSpacing: '-0.05em',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
