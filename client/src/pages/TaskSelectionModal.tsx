import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

import { ModalHeader } from '../components/ModalHeader';
import { ModalOverlay } from '../components/ModalOverlay';
import { TaskSelectionItem } from '../components/TaskSelectionItem';
import { colors } from '../theme';

interface TaskSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaskSelectionModal = ({ isOpen, onClose }: TaskSelectionModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay maxWidth={672}>
      <Box sx={{ p: 5 }}>
        <ModalHeader title="Select Focus Task" onClose={onClose} />

        {/* Search */}
        <Box
          sx={{
            mt: 4,
            mb: 5,
            display: 'flex',
            alignItems: 'center',
            bgcolor: colors.surfaceContainerHigh,
            borderRadius: '16px',
            border: 'none',
            px: 2,
            py: 1,
            '&:focus-within': {
              boxShadow: '0 0 0 2px rgba(215, 186, 255, 0.5)',
            },
          }}
        >
          <SearchRoundedIcon sx={{ color: colors.onSurfaceVariant, mr: 1.5 }} />
          <InputBase
            placeholder="Search your tasks or commands..."
            fullWidth
            sx={{
              color: colors.onSurface,
              fontSize: '0.875rem',
              py: 1,
              '& input': { p: 0 },
              '& input::placeholder': { color: 'rgba(150, 142, 156, 0.4)', opacity: 1 },
            }}
          />
        </Box>

        {/* Task list */}
        <Box>
          <Typography
            sx={{
              fontSize: '0.625rem',
              fontWeight: 700,
              color: colors.onSurfaceVariant,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              mb: 2,
            }}
          >
            Recommended for now
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TaskSelectionItem
              icon={<PriorityHighRoundedIcon sx={{ color: colors.error }} />}
              iconBgColor={`${colors.error}1A`}
              title="Finalize Project Horizon"
              subtitle="Productivity Engine • 25m session"
            />
            <TaskSelectionItem
              icon={<ArchitectureRoundedIcon sx={{ color: colors.tertiary }} />}
              iconBgColor={`${colors.tertiary}1A`}
              title="Review System Design"
              subtitle="Architecture • 50m session"
            />
            <TaskSelectionItem
              icon={<MailRoundedIcon sx={{ color: colors.primary }} />}
              iconBgColor={`${colors.primary}1A`}
              title="Inbox Zero Sprint"
              subtitle="Operations • 15m session"
            />
          </Box>
        </Box>
      </Box>
    </ModalOverlay>
  );
};
