import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ModalHeader } from '../components/ModalHeader';
import { ModalOverlay } from '../components/ModalOverlay';
import { colors } from '../theme';

interface NorthStarTask {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  project: string;
  duration: string;
}

const priorityStyles: Record<NorthStarTask['priority'], { bgcolor: string; color: string }> = {
  High: {
    bgcolor: colors.secondaryContainer,
    color: colors.onSecondaryContainer,
  },
  Medium: {
    bgcolor: colors.surfaceContainerHighest,
    color: colors.onSurfaceVariant,
  },
  Low: {
    bgcolor: colors.surfaceContainerHighest,
    color: colors.onSurfaceVariant,
  },
};

const tasks: NorthStarTask[] = [
  {
    id: '1',
    title: 'Design System Audit & Component Refactor',
    priority: 'High',
    project: 'Waypoint v2',
    duration: '45m',
  },
  {
    id: '2',
    title: 'API Documentation: Authentication Flow',
    priority: 'High',
    project: 'Core Engine',
    duration: '30m',
  },
  {
    id: '3',
    title: 'Weekly Stakeholder Sync Preparation',
    priority: 'Medium',
    project: 'Management',
    duration: '15m',
  },
  {
    id: '4',
    title: 'Refactor Tailwind Config for Dark Mode',
    priority: 'High',
    project: 'Frontend',
    duration: '25m',
  },
];

const metaSx = (isSelected: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  color: isSelected ? colors.onSurfaceVariant : 'rgba(150, 142, 156, 0.6)',
});

const footerStatSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  color: 'rgba(150, 142, 156, 0.6)',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
};

const inheritTypoSx: SxProps<Theme> = {
  fontSize: 'inherit',
  fontWeight: 'inherit',
  letterSpacing: 'inherit',
};

interface TaskItemProps {
  task: NorthStarTask;
  isSelected: boolean;
}

const NorthStarTaskItem = ({ task, isSelected }: TaskItemProps) => {
  const pStyle = priorityStyles[task.priority];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        ...(isSelected
          ? {
              bgcolor: colors.surfaceContainerHigh,
              borderLeft: `4px solid ${colors.primary}`,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            }
          : {
              bgcolor: colors.surfaceContainer,
              borderLeft: '4px solid transparent',
              '&:hover': {
                bgcolor: colors.surfaceContainerHigh,
              },
            }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        {/* Radio indicator */}
        <Box
          sx={{
            mt: 0.25,
            width: 24,
            height: 24,
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...(isSelected
              ? { bgcolor: 'rgba(189, 147, 249, 0.2)' }
              : {
                  bgcolor: colors.surfaceContainerHighest,
                  border: '1px solid rgba(74, 68, 81, 0.3)',
                }),
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              ...(isSelected
                ? {
                    bgcolor: colors.primary,
                    boxShadow: '0 0 8px rgba(215, 186, 255, 0.8)',
                  }
                : { bgcolor: 'transparent' }),
            }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: isSelected ? 600 : 500,
              color: isSelected ? colors.onSurface : 'rgba(225, 225, 241, 0.8)',
              fontSize: '0.9375rem',
              transition: 'color 0.2s',
            }}
          >
            {task.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mt: 0.75,
            }}
          >
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: 700,
                px: 1,
                py: 0.25,
                borderRadius: '9999px',
                bgcolor: pStyle.bgcolor,
                color: pStyle.color,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {task.priority}
            </Typography>
            <Box sx={metaSx(isSelected)}>
              <FolderRoundedIcon sx={{ fontSize: '0.875rem' }} />
              <Typography sx={{ fontSize: '0.75rem' }}>{task.project}</Typography>
            </Box>
            <Box sx={metaSx(isSelected)}>
              <ScheduleRoundedIcon sx={{ fontSize: '0.875rem' }} />
              <Typography sx={{ fontSize: '0.75rem' }}>{task.duration}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {isSelected ? (
        <RadioButtonCheckedRoundedIcon sx={{ color: colors.primary }} />
      ) : (
        <RadioButtonUncheckedRoundedIcon
          sx={{
            color: 'rgba(74, 68, 81, 0.4)',
            '&:hover': { color: colors.outlineVariant },
          }}
        />
      )}
    </Box>
  );
};

interface NorthStarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NorthStarModal = ({ isOpen, onClose }: NorthStarModalProps) => {
  if (!isOpen) return null;

  const selectedId = '1';

  return (
    <ModalOverlay maxWidth={576}>
      {/* Header */}
      <Box sx={{ px: 4, pt: 4, pb: 2 }}>
        <ModalHeader
          title="Select Your North Star"
          subtitle="Which objective defines your focus today?"
          onClose={onClose}
        />

        {/* Search */}
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            bgcolor: colors.surfaceContainerHighest,
            borderRadius: '12px',
            px: 2,
            py: 0.5,
            '&:focus-within': {
              boxShadow: '0 0 0 1px rgba(215, 186, 255, 0.4)',
            },
            transition: 'box-shadow 0.2s',
          }}
        >
          <SearchRoundedIcon sx={{ color: colors.outlineVariant, mr: 1.5 }} />
          <InputBase
            placeholder="Search objectives or projects..."
            fullWidth
            sx={{
              color: colors.onSurface,
              fontSize: '0.875rem',
              py: 1.5,
              '& input': { p: 0 },
              '& input::placeholder': {
                color: colors.outlineVariant,
                opacity: 1,
              },
            }}
          />
        </Box>
      </Box>

      {/* Task List */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          maxHeight: 400,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            py: 2,
          }}
        >
          {tasks.map((task) => (
            <NorthStarTaskItem key={task.id} task={task} isSelected={task.id === selectedId} />
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          px: 4,
          pt: 3,
          pb: 4,
          bgcolor: 'rgba(11, 14, 24, 0.5)',
          borderTop: '1px solid rgba(74, 68, 81, 0.1)',
        }}
      >
        <Button
          fullWidth
          sx={{
            height: 56,
            background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryContainer})`,
            color: colors.onPrimaryContainer,
            fontFamily: 'Manrope',
            fontWeight: 800,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            borderRadius: '12px',
            boxShadow: '0 8px 24px -8px rgba(189, 147, 249, 0.5)',
            '&:hover': {
              boxShadow: '0 12px 32px -8px rgba(189, 147, 249, 0.7)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          Start Session
          <PlayArrowRoundedIcon />
        </Button>

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <Box sx={footerStatSx}>
            <TimerRoundedIcon sx={{ fontSize: '0.875rem' }} />
            <Typography sx={inheritTypoSx}>Total: 1h 55m</Typography>
          </Box>
          <Box
            sx={{
              width: 1,
              height: 12,
              bgcolor: 'rgba(74, 68, 81, 0.3)',
            }}
          />
          <Box sx={footerStatSx}>
            <AssignmentRoundedIcon sx={{ fontSize: '0.875rem' }} />
            <Typography sx={inheritTypoSx}>4 Tasks Loaded</Typography>
          </Box>
        </Box>
      </Box>
    </ModalOverlay>
  );
};
