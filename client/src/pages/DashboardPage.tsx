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
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReminderResponse, TaskResponse } from '@waypoint/schemas';

import { getTasks } from '../api';
import { BottomNavBar } from '../components/BottomNavBar';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { SideNavBar } from '../components/SideNavBar';
import { StatCard } from '../components/StatCard';
import { TaskCard } from '../components/TaskCard';
import { TaskGroup } from '../components/TaskGroup';
import { TopAppBar } from '../components/TopAppBar';

import { isPast, isThisWeek, isToday } from 'date-fns';
import { useEffect, useState } from 'react';

const COLORS = {
  error: '#ffb4ab',
  primary: '#d7baff',
  tertiary: '#75d4e8',
} as const;

const groupTasksByUrgency = (tasks: TaskResponse[]) => {
  const overdue = tasks
    .filter((task) => isPast(new Date(task.dueDate)))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const dueToday = tasks
    .filter((task) => {
      isToday(new Date(task.dueDate));
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const dueThisWeek = tasks
    .filter((task) => isThisWeek(new Date(task.dueDate)))
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
  const [isLoading, setIsLoading] = useState(false);
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

  const refetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.tasks);
      setReminders(response.reminders);
    } catch {
      setError('Failed to load tasks. Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#11131e',
        color: '#e1e1f1',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Desktop Sidebar */}
      <SideNavBar
        appName="Task Master"
        tagline="Precision focus"
        navItems={[
          { label: 'Overview', icon: <DashboardRoundedIcon />, active: true },
          { label: 'High Priority', icon: <PriorityHighRoundedIcon /> },
          { label: 'Upcoming', icon: <EventRoundedIcon /> },
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
          navLinks={[{ label: 'Dashboard', active: true }, { label: 'Deadlines' }, { label: 'Settings' }]}
          addButtonLabel="Add Task"
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
                  color: '#e1e1f1',
                  mb: 1,
                  letterSpacing: '-0.025em',
                }}
              >
                Current Flow
              </Typography>
              <Typography sx={{ color: '#968e9c', fontSize: '1.125rem', maxWidth: 512 }}>{statusMessage}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <StatCard value={String(tasks.length)} label="Active Tasks" valueColor={COLORS.primary} />
              <StatCard value={String(reminders.length)} label="Alerts" valueColor={COLORS.tertiary} />
            </Box>
          </Box>

          {/* Task Groups */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Immediate Priority */}
            <TaskGroup label="Immediate Priority" color={COLORS.error}>
              { overdue.length === 0 && dueToday.length === 0 ? (
                <Typography sx={{ color: '#968e9c', fontStyle: 'italic', px: 2, py: 4 }}>
                  No urgent tasks at the moment. Great work staying on top of things!
                </Typography>
              ) : (
                <>
                  {overdue.map((task) => (
                    <TaskCard
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      priorityLabel={task.priority}
                      priorityColor={COLORS.error}
                      dueLabel={`Due ${new Date(task.dueDate).toLocaleString()}`}
                      dueIcon={<EventBusyRoundedIcon sx={{ fontSize: 14 }} />}
                      reminderCount={reminders.filter((r) => r.taskId === task.id).length}
                      reminderIcon={<NotificationsActiveRoundedIcon sx={{ fontSize: 14 }} />}
                      borderColor={COLORS.error}
                    />
                  ))}
                  {dueToday.map((task) => (
                    <TaskCard
                      key={task.id}
                      title={task.title}
                      description={task.description ?? ''}
                      priorityLabel={task.priority}
                      priorityColor={COLORS.error}
                      dueLabel={`Due ${new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      dueIcon={<ScheduleRoundedIcon sx={{ fontSize: 14 }} />}
                      reminderCount={reminders.filter((r) => r.taskId === task.id).length}
                      reminderIcon={<NotificationsActiveRoundedIcon sx={{ fontSize: 14 }} />}
                      borderColor={COLORS.error}
                    />
                  ))}
                </>
              )}
              <TaskCard
                title="Finalize Project Proposal"
                description={
                  "Review the financial projections and finalize the executive summary for Monday's board meeting."
                }
                priorityLabel="High"
                priorityColor={COLORS.error}
                dueLabel="Today, 5:00 PM"
                dueIcon={<ScheduleRoundedIcon sx={{ fontSize: 14 }} />}
                reminderCount={3}
                reminderIcon={<NotificationsActiveRoundedIcon sx={{ fontSize: 14 }} />}
                borderColor={COLORS.error}
              />
              <TaskCard
                title="Fix Server Latency Issue"
                description={
                  'Debug the database connection leaks in the production environment before peak traffic hours.'
                }
                priorityLabel="Urgent"
                priorityColor={COLORS.error}
                dueLabel="Overdue (2h)"
                dueIcon={<EventBusyRoundedIcon sx={{ fontSize: 14 }} />}
                reminderCount={1}
                reminderIcon={<NotificationsActiveRoundedIcon sx={{ fontSize: 14 }} />}
                borderColor={COLORS.error}
              />
            </TaskGroup>

            {/* Upcoming Week */}
            <TaskGroup label="Upcoming Week" color={COLORS.primary}>
              <TaskCard
                title="Weekly Team Sync"
                description="Prepare the sprint review slide deck and collect updates from the engineering leads."
                priorityLabel="Internal"
                priorityColor={COLORS.primary}
                dueLabel="Wed, Oct 25"
                dueIcon={<CalendarTodayRoundedIcon sx={{ fontSize: 14 }} />}
                reminderCount={0}
                reminderIcon={<NotificationsRoundedIcon sx={{ fontSize: 14 }} />}
                borderColor={COLORS.primary}
              />
            </TaskGroup>

            {/* Horizon */}
            <TaskGroup label="Horizon" color={COLORS.tertiary}>
              <TaskCard
                title="Update Portfolio Images"
                description={
                  'Collect high-resolution screenshots of the new dashboard UI and upload to the design portal.'
                }
                priorityLabel="Creative"
                priorityColor={COLORS.tertiary}
                dueLabel="In 2 Weeks"
                dueIcon={<CalendarMonthRoundedIcon sx={{ fontSize: 14 }} />}
                reminderCount={2}
                reminderIcon={<NotificationsRoundedIcon sx={{ fontSize: 14 }} />}
                borderColor={COLORS.tertiary}
              />
            </TaskGroup>
          </Box>
        </Box>
      </Box>

      {/* Mobile Navigation */}
      <BottomNavBar
        items={[
          { label: 'Home', icon: <HomeRoundedIcon />, active: true },
          { label: 'Tasks', icon: <FormatListBulletedRoundedIcon /> },
          { label: 'Alerts', icon: <AlarmRoundedIcon /> },
          { label: 'Settings', icon: <SettingsRoundedIcon /> },
        ]}
      />

      {/* Mobile FAB */}
      <FloatingActionButton />
    </Box>
  );
};
