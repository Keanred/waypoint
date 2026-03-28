import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import {
  alpha,
  Box,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { dashboardColors } from '../../theme';
import { StatusOrb } from '../StatusOrb';
import { SurfacePanel } from '../SurfacePanel';

export interface TaskListItem {
  title: string;
  description: string;
  accent: string;
  project: string;
  dueLabel: string;
  dueSubtext: string;
  dueAccent: string;
  recurrence: string;
  recurrenceType: 'none' | 'sync' | 'calendar';
  remindersCount: number;
  reminderAccent?: string;
}

export const recurrenceIcon = (type: TaskListItem['recurrenceType']) => {
  if (type === 'sync') {
    return <SyncRoundedIcon sx={{ fontSize: 16 }} />;
  }

  if (type === 'calendar') {
    return <CalendarMonthRoundedIcon sx={{ fontSize: 16 }} />;
  }

  return <BlockRoundedIcon sx={{ fontSize: 16 }} />;
};

export const reminderBadge = (item: TaskListItem) => {
  const active = item.remindersCount > 0;

  return (
    <Chip
      label={String(item.remindersCount)}
      sx={{
        minWidth: 34,
        height: 24,
        color: active ? (item.reminderAccent ?? dashboardColors.secondary) : 'text.secondary',
        fontSize: 12,
        fontWeight: 800,
        borderRadius: 1.5,
        backgroundColor: active
          ? alpha(item.reminderAccent ?? dashboardColors.secondary, 0.1)
          : dashboardColors.surfaceContainerHighest,
      }}
    />
  );
};

export const TaskTableSection = ({ tasks }: { tasks: TaskListItem[] }) => {
  const getHeaderAlign = (index: number): 'left' | 'center' | 'right' => {
    if (index === 4) {
      return 'center';
    }

    if (index > 4) {
      return 'right';
    }

    return 'left';
  };

  return (
    <SurfacePanel variant="low" sx={{ borderRadius: 4, overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['Task Title', 'Project', 'Due Date', 'Recurrence', 'Reminders', 'Action'].map((label, index) => (
                <TableCell
                  key={label}
                  align={getHeaderAlign(index)}
                  sx={{
                    py: 3,
                    px: index === 0 || index === 5 ? 4 : 2,
                    color: 'text.secondary',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    borderBottomColor: alpha(dashboardColors.outlineVariant, 0.05),
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.title}
                hover
                sx={{
                  '& .MuiTableCell-root': {
                    borderBottomColor: alpha(dashboardColors.outlineVariant, 0.05),
                  },
                  '&:hover': {
                    backgroundColor: dashboardColors.surfaceContainerHigh,
                  },
                }}
              >
                <TableCell sx={{ py: 3, px: 4 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <StatusOrb accent={task.accent} />
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{task.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {task.description}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ py: 3, px: 2 }}>
                  <Chip
                    label={task.project}
                    sx={{
                      color: 'text.primary',
                      fontSize: 12,
                      backgroundColor: dashboardColors.surfaceContainerHighest,
                      border: `1px solid ${alpha(dashboardColors.outlineVariant, 0.2)}`,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ py: 3, px: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ color: task.dueAccent, fontSize: 14, fontWeight: 700 }}>
                      {task.dueLabel}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {task.dueSubtext}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ py: 3, px: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
                    {recurrenceIcon(task.recurrenceType)}
                    <Typography variant="caption">{task.recurrence}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ py: 3, px: 2 }}>
                  {reminderBadge(task)}
                </TableCell>
                <TableCell align="right" sx={{ py: 3, px: 4 }}>
                  <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
                    <MoreHorizRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 3, py: 2.5, borderTop: `1px solid ${alpha(dashboardColors.outlineVariant, 0.05)}` }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Showing 5 of 28 active tasks
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton
            sx={{ borderRadius: 2, backgroundColor: dashboardColors.surfaceContainerHighest, color: 'text.primary' }}
          >
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{ borderRadius: 2, backgroundColor: dashboardColors.surfaceContainerHighest, color: 'text.primary' }}
          >
            <ChevronRightRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </SurfacePanel>
  );
};
