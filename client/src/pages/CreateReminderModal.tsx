import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import NativeSelect from '@mui/material/NativeSelect';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { CreateReminderInput } from '@waypoint/schemas';
import { ModalOverlay } from '../components/ModalOverlay';
import { ReminderPreview } from '../components/ReminderPreview';
import { SoundPicker } from '../components/SoundPicker';
import { colors } from '../theme';

const fieldSx = {
  bgcolor: colors.surfaceContainerLowest,
  borderRadius: '12px',
  px: 2,
  py: 1.5,
  color: colors.onSurface,
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
  color: colors.onSurfaceVariant,
} as const;

type CreateReminderModalProps = {
  onClose: () => void;
  onAddReminder: (reminder: Omit<CreateReminderInput, 'taskId'>) => void;
};

export const CreateReminderModal = ({
  onClose,
  onAddReminder,
}: CreateReminderModalProps) => {
  const [offsetValue, setOffsetValue] = useState(1);
  const [offsetUnit, setOffsetUnit] = useState('DAYS');
  return (
    <ModalOverlay maxWidth={448}>
      {/* Header */}
      <Box sx={{ px: 4, pt: 4, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <NotificationsActiveRoundedIcon sx={{ color: colors.primary }} />
          <Typography sx={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 700, color: colors.onSurface }}>
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
              value={offsetValue}
              onChange={(e) => setOffsetValue(parseInt(e.target.value, 10))}
              sx={{
                ...fieldSx,
                fontSize: '1.125rem',
                fontFamily: 'Manrope',
                fontWeight: 700,
                color: colors.primary,
              }}
            />
          </Box>

          {/* Offset Unit */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography component="label" sx={labelSx}>
              Offset Unit
            </Typography>
            <NativeSelect
              value={offsetUnit}
              IconComponent={UnfoldMoreRoundedIcon}
              onChange={(e) => setOffsetUnit(e.target.value)}
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
                  color: colors.onSurfaceVariant,
                },
              }}
            >
              <option value="MINUTES">Minutes</option>
              <option value="HOURS">Hours</option>
              <option value="DAYS">Days</option>
            </NativeSelect>
          </Box>
        </Box>

        {/* Smart Preview */}
        <ReminderPreview>
          Nocturne will{' '}
          <Typography component="span" sx={{ color: colors.tertiary }}>
            Remind me {offsetValue} {offsetUnit.toLowerCase()}
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
            color: colors.onSurfaceVariant,
            textTransform: 'none',
            '&:hover': { color: colors.onSurface, bgcolor: colors.surfaceContainerHigh },
            transition: 'all 0.2s',
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onAddReminder({
              offsetValue,
              offsetUnit: offsetUnit as CreateReminderInput['offsetUnit'],
            });
            onClose();
          }}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 700,
            background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primaryContainer})`,
            color: colors.onPrimaryContainer,
            textTransform: 'none',
            boxShadow: '0 10px 30px rgba(189, 147, 249, 0.1)',
            '&:hover': {
              background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primaryContainer})`,
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
