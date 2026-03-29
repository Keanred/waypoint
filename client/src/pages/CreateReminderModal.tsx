import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import NativeSelect from '@mui/material/NativeSelect';
import Typography from '@mui/material/Typography';

import { ModalOverlay } from '../components/ModalOverlay';
import { ReminderPreview } from '../components/ReminderPreview';
import { SoundPicker } from '../components/SoundPicker';

const fieldSx = {
  bgcolor: '#0b0e18',
  borderRadius: '12px',
  px: 2,
  py: 1.5,
  color: '#e1e1f1',
  '&:focus-within': {
    boxShadow: '0 0 0 2px rgba(215, 186, 255, 0.4)',
  },
  transition: 'all 0.2s',
} as const;

const labelSx = {
  fontSize: '0.75rem',
  fontFamily: 'Inter',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: '#968e9c',
} as const;

export const CreateReminderModal = () => {
  return (
    <ModalOverlay maxWidth={448}>
      {/* Header */}
      <Box sx={{ px: 4, pt: 4, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <NotificationsActiveRoundedIcon sx={{ color: '#d7baff' }} />
          <Typography sx={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 700, color: '#e1e1f1' }}>
            New Alert
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.875rem', color: '#ccc3d3' }}>
          Set a precise nudge before your task starts.
        </Typography>
      </Box>

      {/* Form Content */}
      <Box sx={{ px: 4, py: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {/* Offset Value */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography component="label" sx={labelSx}>
              Offset Value
            </Typography>
            <InputBase
              type="number"
              defaultValue="30"
              sx={{
                ...fieldSx,
                fontSize: '1.125rem',
                fontFamily: 'Manrope',
                fontWeight: 700,
                color: '#d7baff',
                '& input::placeholder': { color: 'rgba(150, 142, 156, 0.3)' },
              }}
            />
          </Box>

          {/* Offset Unit */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography component="label" sx={labelSx}>
              Offset Unit
            </Typography>
            <NativeSelect
              defaultValue="hours"
              IconComponent={UnfoldMoreRoundedIcon}
              sx={{
                ...fieldSx,
                width: '100%',
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:before, &:after': { display: 'none' },
                '& select': {
                  p: 0,
                  bgcolor: 'transparent',
                  '&:focus': { bgcolor: 'transparent' },
                },
                '& .MuiNativeSelect-icon': {
                  color: '#968e9c',
                  fontSize: '1.25rem',
                },
              }}
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
            </NativeSelect>
          </Box>
        </Box>

        {/* Smart Preview */}
        <ReminderPreview>
          Nocturne will{' '}
          <Typography component="span" sx={{ color: '#75d4e8' }}>
            Remind me 30 Minutes
          </Typography>{' '}
          before the scheduled start time.
        </ReminderPreview>

        {/* Sound */}
        <SoundPicker label="Sound:" value="Studio Pulse" />
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          bgcolor: 'rgba(11, 14, 24, 0.3)',
          px: 4,
          py: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 2,
        }}
      >
        <Button
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: '#968e9c',
            textTransform: 'none',
            '&:hover': { color: '#e1e1f1', bgcolor: '#272935' },
            transition: 'all 0.2s',
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 700,
            background: 'linear-gradient(to bottom right, #d7baff, #bd93f9)',
            color: '#4e2484',
            textTransform: 'none',
            boxShadow: '0 10px 30px rgba(189, 147, 249, 0.1)',
            '&:hover': {
              background: 'linear-gradient(to bottom right, #d7baff, #bd93f9)',
            },
            '&:active': { transform: 'scale(0.95)' },
          }}
        >
          Add Alert
        </Button>
      </Box>
    </ModalOverlay>
  );
};
