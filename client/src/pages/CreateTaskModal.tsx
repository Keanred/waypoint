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
import { useState } from 'react';

import { CreateTaskInput } from '@waypoint/schemas';
import { IconLabel } from '../components/IconLabel';
import { ModalHeader } from '../components/ModalHeader';
import { ModalOverlay } from '../components/ModalOverlay';
import { ReminderChip } from '../components/ReminderChip';
import { colors } from '../theme';

const fieldSx = {
  bgcolor: 'rgba(50, 52, 64, 0.3)',
  border: '1px solid rgba(74, 68, 81, 0.1)',
  borderRadius: '12px',
  p: 1.5,
  color: colors.onSurface,
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

type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateTaskInput) => Promise<void>;
};

export const CreateTaskModal = ({ isOpen, onClose, onSubmit }: CreateTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('high');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [recurrence, setRecurrence] = useState('NONE');
  const [recurrenceEnd, setRecurrenceEnd] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit({
        title,
        description,
        priority: priority as 'low' | 'medium' | 'high',
        dueDate: new Date(`${dueDate}T${dueTime}`),
        recurrence: recurrence as 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY',
        recurringEndDate: recurrenceEnd ? new Date(recurrenceEnd) : undefined,
      });
    }
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalHeader title="Create New Task" subtitle="Waypoint Protocol v2.4" onClose={onClose} />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: { xs: 4, md: 5 }, display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        {/* Title Field */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            component="label"
            sx={{
              color: colors.primary,
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
            value={title}
            placeholder="Task Title..."
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              fontSize: { xs: '1.875rem', md: '2.25rem' },
              fontFamily: 'Manrope',
              fontWeight: 900,
              color: colors.onSurface,
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
              value={description}
              placeholder="Describe the objective..."
              onChange={(e) => setDescription(e.target.value)}
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
              <NativeSelect value={priority} sx={selectSx} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </NativeSelect>
            </Box>

            {/* Due Date & Time */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <IconLabel icon={<EventRoundedIcon sx={{ fontSize: 'inherit' }} />} label="Target Timeline" />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                <InputBase type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} sx={fieldSx} />
                <InputBase type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} sx={fieldSx} />
              </Box>
            </Box>

            {/* Recurrence */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <IconLabel icon={<RepeatRoundedIcon sx={{ fontSize: 'inherit' }} />} label="Recurrence Pattern" />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                <NativeSelect value={recurrence} sx={selectSx} onChange={(e) => setRecurrence(e.target.value)}>
                  <option value="NONE">None</option>
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </NativeSelect>
                <InputBase
                  type="date"
                  placeholder="End Date"
                  value={recurrenceEnd}
                  onChange={(e) => setRecurrenceEnd(e.target.value)}
                  sx={fieldSx}
                />
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
              <NotificationsActiveRoundedIcon sx={{ color: colors.tertiary }} />
              Reminders
            </Typography>
            <Button
              sx={{
                color: colors.tertiary,
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
                  color: colors.tertiary,
                },
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
              background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryContainer})`,
              color: colors.onPrimary,
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
                background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryContainer})`,
              },
              '&:active': { transform: 'scale(0.98)' },
            }}
          >
            Initialize Task
          </Button>
          <Button
            onClick={onClose}
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
