import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

interface ToggleRowProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
}

export const ToggleRow = ({ title, description, defaultChecked = false }: ToggleRowProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '1.125rem' }}>{title}</Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#968e9c' }}>{description}</Typography>
      </Box>
      <Switch
        defaultChecked={defaultChecked}
        sx={{
          width: 56,
          height: 32,
          p: 0,
          '& .MuiSwitch-switchBase': {
            p: '4px',
            '&.Mui-checked': {
              transform: 'translateX(24px)',
              '& + .MuiSwitch-track': {
                bgcolor: '#d7baff',
                opacity: 1,
              },
            },
          },
          '& .MuiSwitch-thumb': {
            width: 24,
            height: 24,
            bgcolor: '#ccc3d3',
          },
          '& .MuiSwitch-track': {
            borderRadius: 9999,
            bgcolor: '#323440',
            opacity: 1,
          },
        }}
      />
    </Box>
  );
};
