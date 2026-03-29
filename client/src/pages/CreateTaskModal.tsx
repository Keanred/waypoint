import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AlarmAddRoundedIcon from '@mui/icons-material/AlarmAddRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import NativeSelect from '@mui/material/NativeSelect';
import Typography from '@mui/material/Typography';

import { IconLabel } from '../components/IconLabel';
import { ModalHeader } from '../components/ModalHeader';
import { ModalOverlay } from '../components/ModalOverlay';
import { ReminderChip } from '../components/ReminderChip';

const fieldSx = {
  bgcolor: 'rgba(50, 52, 64, 0.3)',
  border: '1px solid rgba(74, 68, 81, 0.1)',
  borderRadius: '12px',
  p: 1.5,
  color: '#e1e1f1',
  fontSize: '0.875rem',
  '&:focus-within': {
    boxShadow: '0 0 0 2px rgba(215, 186, 255, 0.2)',
    borderColor: 'rgba(215, 186, 255, 0.3)',
  },
  transition: 'all 0.2s',
} as const;

const selectSx = {
  ...fieldSx,
  width: '100%',
  cursor: 'pointer',
  '&:before, &:after': { display: 'none' },
  '& select': {
    p: 0,
    bgcolor: 'transparent',
    '&:focus': { bgcolor: 'transparent' },
  },
} as const;

export const CreateTaskModal = () => {
  return (
    <ModalOverlay>
      <ModalHeader title="Create New Task" subtitle="Nocturne Protocol v2.4" />

      <Box component="form" sx={{ p: { xs: 4, md: 5 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Title Field */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            component="label"
            sx={{
              color: '#d7baff',
              fontFamily: 'Manrope',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '10px',
            }}
          >
            Directive Designation
          </Typography>
          <InputBase
            autoFocus
            placeholder="Task Title..."
            sx={{
              fontSize: { xs: '1.875rem', md: '2.25rem' },
              fontFamily: 'Manrope',
              fontWeight: 900,
              color: '#e1e1f1',
              '& input::placeholder': { color: 'rgba(74, 68, 81, 0.3)' },
            }}
          />
        </Box>

        {/* Main Configuration Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          {/* Description */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <IconLabel icon={<NotesRoundedIcon sx={{ fontSize: 'inherit' }} />} label="Scope Definition" />
            <InputBase
              multiline
              rows={4}
              placeholder="Describe the objective..."
              sx={{
                ...fieldSx,
                alignItems: 'flex-start',
                '& textarea::placeholder': { color: 'rgba(74, 68, 81, 0.5)' },
                '& textarea': { resize: 'none' },
              }}
            />
          </Box>

          {/* Right column */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Priority */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <IconLabel icon={<PriorityHighRoundedIcon sx={{ fontSize: 'inherit' }} />} label="Priority Level" />
              <NativeSelect defaultValue="high" sx={selectSx}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </NativeSelect>
            </Box>

            {/* Due Date & Time */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <IconLabel icon={<EventRoundedIcon sx={{ fontSize: 'inherit' }} />} label="Target Timeline" />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                <InputBase type="date" sx={fieldSx} />
                <InputBase type="time" sx={fieldSx} />
              </Box>
            </Box>

            {/* Recurrence */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <IconLabel icon={<RepeatRoundedIcon sx={{ fontSize: 'inherit' }} />} label="Recurrence Pattern" />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                <NativeSelect defaultValue="none" sx={selectSx}>
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </NativeSelect>
                <InputBase type="date" placeholder="End Date" sx={fieldSx} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Reminders Section */}
        <Box sx={{ pt: 3, borderTop: '1px solid rgba(74, 68, 81, 0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              sx={{
                fontFamily: 'Manrope',
                fontWeight: 700,
                fontSize: '1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <NotificationsActiveRoundedIcon sx={{ color: '#75d4e8' }} />
              Reminders
            </Typography>
            <Button
              sx={{
                color: '#75d4e8',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                '&:hover': { color: '#a3eeff', bgcolor: 'transparent' },
              }}
              startIcon={<AddCircleRoundedIcon sx={{ fontSize: '0.875rem !important' }} />}
            >
              Add Offset
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <ReminderChip label="Notification" value="1 Day before" />
            <Button
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1.5,
                border: '1px dashed rgba(74, 68, 81, 0.2)',
                borderRadius: '12px',
                color: 'rgba(74, 68, 81, 0.6)',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '-0.05em',
                '&:hover': {
                  borderColor: 'rgba(117, 212, 232, 0.4)',
                  color: '#75d4e8',
                },
                transition: 'all 0.2s',
              }}
              startIcon={<AlarmAddRoundedIcon sx={{ fontSize: '1rem !important' }} />}
            >
              New Alert
            </Button>
          </Box>
        </Box>

        {/* Form Actions */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            pt: 2,
          }}
        >
          <Button
            type="submit"
            sx={{
              flex: 2,
              background: 'linear-gradient(to right, #d7baff, #bd93f9)',
              color: '#411478',
              fontFamily: 'Manrope',
              fontWeight: 900,
              py: 2,
              borderRadius: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: '0.875rem',
              boxShadow: '0 0 20px rgba(189, 147, 249, 0.2)',
              '&:hover': {
                boxShadow: '0 0 30px rgba(189, 147, 249, 0.4)',
                background: 'linear-gradient(to right, #d7baff, #bd93f9)',
              },
              '&:active': { transform: 'scale(0.98)' },
            }}
          >
            Initialize Task
          </Button>
          <Button
            sx={{
              flex: 1,
              px: 4,
              py: 2,
              bgcolor: 'rgba(50, 52, 64, 0.5)',
              color: '#ccc3d3',
              fontFamily: 'Manrope',
              fontWeight: 700,
              borderRadius: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
              border: '1px solid rgba(74, 68, 81, 0.1)',
              '&:hover': { bgcolor: '#373845' },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </ModalOverlay>
  );
};
