import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReminderResponse, TaskResponse } from '@waypoint/schemas';

import { createTask, deleteTask, getTasks } from '../api';
import { BottomNavBar } from '../components/BottomNavBar';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { SideNavBar } from '../components/SideNavBar';
import { StatCard } from '../components/StatCard';
import { TaskCard } from '../components/TaskCard';
import { TaskGroup } from '../components/TaskGroup';
import { TopAppBar } from '../components/TopAppBar';
import { colors } from '../theme';

import { CreateTaskWithRemindersInput } from '@waypoint/schemas';
import { isPast, isThisWeek, isToday } from 'date-fns';
import { useEffect, useState } from 'react';
import { CreateTaskModal } from './CreateTaskModal';

const COLORS = {
  error: colors.error,
  primary: colors.primary,
  tertiary: colors.tertiary,
} as const;

// Sort by ASCENDING order
const groupTasksByUrgency = (tasks: TaskResponse[]) => {
  const overdue = tasks
    .filter((task) => isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const dueToday = tasks
    .filter((task) => isToday(new Date(task.dueDate)))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const dueThisWeek = tasks
    .filter(
      (task) =>
        isThisWeek(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && !isPast(new Date(task.dueDate)),
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const later = tasks
    .filter((task) => !isPast(new Date(task.dueDate)) && !isThisWeek(new Date(task.dueDate)))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return {
    overdue,
    dueToday,
    dueThisWeek,
    later,
  };
};

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [reminders, setReminders] = useState<ReminderResponse[]>([]);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completingTaskIds, setCompletingTaskIds] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const { overdue, dueToday, dueThisWeek, later } = groupTasksByUrgency(tasks);

  const statusMessage =
    error ??
    (isLoading
      ? 'Syncing your latest tasks from the API.'
      : 'Maximize focus by crushing the immediate deadlines first.');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getTasks();
        setTasks(response.tasks);
        setReminders(response.reminders);
      } catch {
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  const completeTask = async (taskId: string) => {
    setCompletingTaskIds((prev) => ({ ...prev, [taskId]: true }));
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      setReminders((prev) => prev.filter((reminder) => reminder.taskId !== taskId));
    } catch {
      setError('Failed to mark task as done. Please try again later.');
    } finally {
      setCompletingTaskIds((prev) => {
        const next = { ...prev };
        delete next[taskId];
        return next;
      });
    }
  };

  const createNewTask = async (input: CreateTaskWithRemindersInput) => {
    try {
      const { task, reminders: createdReminders } = await createTask(input);
      setTasks((prev) => [...prev, task]);
      setReminders((prev) => [...prev, ...createdReminders]);
    } catch {
      setError('Failed to create task. Please try again later.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: colors.surface,
        color: colors.onSurface,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Desktop Sidebar */}
      <SideNavBar
        appName="Task Master"
        tagline="Precision focus"
        navItems={[
          { label: 'Overview', icon: <DashboardRoundedIcon />, active: true, to: '/' },
          { label: 'Focus Studio', icon: <TimerRoundedIcon />, to: '/focus' },
          { label: 'Analytics', icon: <LeaderboardRoundedIcon />, to: '/analytics' },
          { label: 'Completed', icon: <CheckCircleRoundedIcon /> },
        ]}
        actionLabel="New Focus Session"
        actionIcon={<BoltRoundedIcon sx={{ fontSize: '1rem' }} />}
        footerItems={[
          { label: 'Archive', icon: <ArchiveRoundedIcon /> },
          { label: 'Support', icon: <HelpOutlineRoundedIcon /> },
        ]}
      />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <TopAppBar
          brandName="Waypoint"
          navLinks={[{ label: 'Dashboard', to: '/' }, { label: 'Deadlines' }, { label: 'Settings', to: '/settings' }]}
          addButtonLabel="Add Task"
          onAddClick={() => setIsCreateTaskModalOpen(true)}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            pt: 12,
            pb: 16,
            px: { xs: 2, md: 6 },
            maxWidth: 1440,
            mx: 'auto',
            width: '100%',
          }}
        >
          {/* Header Section */}
          <Box
            component="section"
            sx={{
              mb: 6,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'flex-end' },
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '2.25rem', md: '3rem' },
                  fontWeight: 800,
                  fontFamily: 'Manrope',
                  color: colors.onSurface,
                  letterSpacing: '-0.025em',
                }}
              >
                Current Flow
              </Typography>
              <Typography sx={{ color: colors.onSurfaceVariant, fontSize: '1.125rem', maxWidth: 512 }}>
                {statusMessage}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <StatCard value={String(tasks.length)} label="Active Tasks" valueColor={COLORS.primary} />
              <StatCard value={String(reminders.length)} label="Alerts" valueColor={COLORS.tertiary} />
            </Box>
          </Box>
          <CreateTaskModal
            isOpen={isCreateTaskModalOpen}
            onClose={() => setIsCreateTaskModalOpen(false)}
            onSubmit={createNewTask}
          />
          {/* Task Groups */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Immediate Priority */}
            <TaskGroup label="Immediate Priority" color={COLORS.error}>
              {overdue.length === 0 && dueToday.length === 0 ? (
                <Typography sx={{ color: colors.onSurfaceVariant, fontStyle: 'italic', px: 2, py: 4 }}>
                  No urgent tasks at the moment. Great work staying on top of things!
                </Typography>
              ) : (
                <>
                  {overdue.map((task) => (
                    <TaskCard
                      key={task.id}
                      taskId={task.id}
                      title={task.title}
                      description={task.description ?? ''}
                      priorityLabel={task.priority}
                      priorityColor={COLORS.error}
                      dueLabel={`Overdue ${new Date(task.dueDate).toLocaleString()}`}
                      dueIcon={<EventBusyRoundedIcon sx={{ fontSize: 14 }} />}
                      reminderCount={reminders.filter((r) => r.taskId === task.id).length}
                      reminderIcon={<NotificationsActiveRoundedIcon sx={{ fontSize: 14 }} />}
                      borderColor={COLORS.error}
                      onComplete={completeTask}
                      isCompleting={Boolean(completingTaskIds[task.id])}
                    />
                  ))}
                  {dueToday.map((task) => (
                    <TaskCard
                      key={task.id}
                      taskId={task.id}
                      title={task.title}
                      description={task.description ?? ''}
                      priorityLabel={task.priority}
                      priorityColor={COLORS.error}
                      dueLabel={`Due ${new Date(task.dueDate).toLocaleString()}`}
                      dueIcon={<EventRoundedIcon sx={{ fontSize: 14 }} />}
                      reminderCount={reminders.filter((r) => r.taskId === task.id).length}
                      reminderIcon={<NotificationsRoundedIcon sx={{ fontSize: 14 }} />}
                      borderColor={COLORS.error}
                      onComplete={completeTask}
                      isCompleting={Boolean(completingTaskIds[task.id])}
                    />
                  ))}
                </>
              )}
            </TaskGroup>

            {/* Upcoming Week */}
            <TaskGroup label="Upcoming Week" color={COLORS.primary}>
              {dueThisWeek.length === 0 ? (
                <Typography sx={{ color: colors.onSurfaceVariant, fontStyle: 'italic', px: 2, py: 4 }}>
                  No tasks due this week. Keep up the great work planning ahead!
                </Typography>
              ) : (
                <>
                  {dueThisWeek.map((task) => (
                    <TaskCard
                      key={task.id}
                      taskId={task.id}
                      title={task.title}
                      description={task.description ?? ''}
                      priorityLabel={task.priority}
                      priorityColor={COLORS.primary}
                      dueLabel={`Due ${new Date(task.dueDate).toLocaleString()}`}
                      dueIcon={<CalendarTodayRoundedIcon sx={{ fontSize: 14 }} />}
                      reminderCount={reminders.filter((r) => r.taskId === task.id).length}
                      reminderIcon={<NotificationsRoundedIcon sx={{ fontSize: 14 }} />}
                      borderColor={COLORS.primary}
                      onComplete={completeTask}
                      isCompleting={Boolean(completingTaskIds[task.id])}
                    />
                  ))}
                </>
              )}
            </TaskGroup>

            {/* Horizon */}
            <TaskGroup label="Horizon" color={COLORS.tertiary}>
              {later.length === 0 ? (
                <Typography sx={{ color: colors.onSurfaceVariant, fontStyle: 'italic', px: 2, py: 4 }}>
                  No tasks on the horizon. Time to relax or start planning new projects!
                </Typography>
              ) : (
                <>
                  {later.map((task) => (
                    <TaskCard
                      key={task.id}
                      taskId={task.id}
                      title={task.title}
                      description={task.description ?? ''}
                      priorityLabel={task.priority}
                      priorityColor={COLORS.tertiary}
                      dueLabel={`Due ${new Date(task.dueDate).toLocaleString()}`}
                      dueIcon={<CalendarMonthRoundedIcon sx={{ fontSize: 14 }} />}
                      reminderCount={reminders.filter((r) => r.taskId === task.id).length}
                      reminderIcon={<NotificationsRoundedIcon sx={{ fontSize: 14 }} />}
                      borderColor={COLORS.tertiary}
                      onComplete={completeTask}
                      isCompleting={Boolean(completingTaskIds[task.id])}
                    />
                  ))}
                </>
              )}
            </TaskGroup>
          </Box>
        </Box>
      </Box>

      {/* Mobile Navigation */}
      <BottomNavBar
        items={[
          { label: 'Home', icon: <HomeRoundedIcon />, active: true, to: '/' },
          { label: 'Tasks', icon: <FormatListBulletedRoundedIcon />, to: '/focus' },
          { label: 'Alerts', icon: <AlarmRoundedIcon />, to: '/analytics' },
          { label: 'Settings', icon: <SettingsRoundedIcon />, to: '/settings' },
        ]}
      />

      {/* Mobile FAB */}
      <FloatingActionButton onClick={() => setIsCreateTaskModalOpen(true)} />
    </Box>
  );
};
