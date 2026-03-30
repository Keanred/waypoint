import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface TaskCardProps {
  taskId: string;
  title: string;
  description: string;
  priorityLabel: string;
  priorityColor: string;
  dueLabel: string;
  dueIcon: ReactNode;
  reminderCount: number;
  reminderIcon: ReactNode;
  borderColor: string;
  onComplete?: (taskId: string) => void;
  isCompleting?: boolean;
}

export const TaskCard = ({
  taskId,
  title,
  description,
  priorityLabel,
  priorityColor,
  dueLabel,
  dueIcon,
  reminderCount,
  reminderIcon,
  borderColor,
  onComplete,
  isCompleting = false,
}: TaskCardProps) => {
  return (
    <Box
      sx={{
        bgcolor: '#191b26',
        '&:hover': { bgcolor: '#1d1f2b' },
        transition: 'all 0.3s',
        borderRadius: '16px',
        p: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'center' },
        justifyContent: 'space-between',
        gap: 3,
        borderLeft: `4px solid ${borderColor}`,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#e1e1f1' }}>{title}</Typography>
          <Box
            sx={{
              bgcolor: `${priorityColor}1A`,
              color: priorityColor,
              fontSize: '10px',
              fontWeight: 700,
              px: 1,
              py: 0.25,
              borderRadius: '4px',
              textTransform: 'uppercase',
            }}
          >
            {priorityLabel}
          </Box>
        </Box>
        <Typography
          sx={{
            color: '#968e9c',
            fontSize: '0.875rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 1.5,
          }}
        >
          {description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              color: borderColor,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            {dueIcon}
            <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
              {dueLabel}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              color: '#968e9c',
              fontSize: '0.75rem',
            }}
          >
            {reminderIcon}
            <Typography component="span" sx={{ fontSize: 'inherit' }}>
              {reminderCount} {reminderCount === 1 ? 'Reminder' : 'Reminders'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <IconButton
          sx={{
            width: 40,
            height: 40,
            bgcolor: '#323440',
            color: '#ccc3d3',
            '&:hover': { bgcolor: '#d7baff', color: '#411478' },
            transition: 'all 0.2s',
          }}
        >
          <EditRoundedIcon />
        </IconButton>
        <IconButton
          onClick={() => onComplete?.(taskId)}
          disabled={isCompleting}
          sx={{
            width: 48,
            height: 48,
            border: '2px solid rgba(74, 68, 81, 0.3)',
            color: '#4a4451',
            '&:hover': {
              borderColor: borderColor,
              bgcolor: `${borderColor}0D`,
              color: borderColor,
            },
            transition: 'all 0.2s',
          }}
        >
          <CheckRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
