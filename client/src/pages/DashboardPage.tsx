import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { TaskResponse } from '@waypoint/schemas';

import { FloatingActionButton } from '../components/FloatingActionButton';
import { PageLayout } from '../components/PageLayout';
import { createBottomNavItems, createSidebarConfig } from '../components/SidebarConfig';
import { StatCard } from '../components/StatCard';
import { TaskCard } from '../components/TaskCard';
import { TaskGroup } from '../components/TaskGroup';
import { colors } from '../theme';

import { isPast, isThisWeek, isToday } from 'date-fns';
import { useState } from 'react';
import { completeTaskMutation, createTaskMutation, useTasksQuery } from '../tasksQuery';
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

const getStatusMessage = (taskCount: number, reminderCount: number) => {
  const taskWord = taskCount === 1 ? 'task' : 'tasks';
  const alertWord = reminderCount === 1 ? 'alert' : 'alerts';

  return `You have ${taskCount} active ${taskWord} and ${reminderCount} ${alertWord}.`;
};

type TaskSectionProps = {
  label: string;
  color: string;
  tasks: TaskResponse[];
  reminders: { taskId: string }[];
  emptyMessage: string;
  getDueLabel: (task: TaskResponse) => string;
  getDueIcon: (task: TaskResponse) => JSX.Element;
  getReminderIcon: (task: TaskResponse) => JSX.Element;
  onComplete: (taskId: string) => void;
};

const TaskSection = ({
  label,
  color,
  tasks,
  reminders,
  emptyMessage,
  getDueLabel,
  getDueIcon,
  getReminderIcon,
  onComplete,
}: TaskSectionProps) => {
  if (tasks.length === 0) {
    return (
      <TaskGroup label={label} color={color}>
        <Typography sx={{ color: colors.onSurfaceVariant, fontStyle: 'italic', px: 2, py: 4 }}>
          {emptyMessage}
        </Typography>
      </TaskGroup>
    );
  }

  return (
    <TaskGroup label={label} color={color}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          taskId={task.id}
          title={task.title}
          description={task.description ?? ''}
          priorityLabel={task.priority}
          priorityColor={color}
          dueLabel={getDueLabel(task)}
          dueIcon={getDueIcon(task)}
          reminderCount={reminders.filter((reminder) => reminder.taskId === task.id).length}
          reminderIcon={getReminderIcon(task)}
          borderColor={color}
          onComplete={onComplete}
        />
      ))}
    </TaskGroup>
  );
};

export const DashboardPage = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const { data, isPending, isError } = useTasksQuery();

  const { mutate: completeTask } = completeTaskMutation();
  const { mutate: createNewTask } = createTaskMutation();

  if (isError) {
    return 'Something went wrong while fetching your tasks. Please try again later.';
  }

  if (isPending) {
    return 'Loading your tasks...';
  }

  if (!data) {
    return 'No task data is available right now.';
  }

  const tasks = data.tasks;
  const reminders = data.reminders;
  const statusMessage = getStatusMessage(tasks.length, reminders.length);

  const { overdue, dueToday, dueThisWeek, later } = groupTasksByUrgency(tasks);
  const immediateTasks = [...overdue, ...dueToday];

  return (
    <>
      <PageLayout
        sidebar={createSidebarConfig('dashboard')}
        topBar={{
          brandName: 'Waypoint',
          navLinks: [{ label: 'Dashboard', to: '/' }, { label: 'Deadlines' }, { label: 'Settings', to: '/settings' }],
          addButtonLabel: 'Add Task',
          onAddClick: () => setIsCreateTaskModalOpen(true),
        }}
        bottomNav={createBottomNavItems('dashboard')}
      >
        <CreateTaskModal
          isOpen={isCreateTaskModalOpen}
          onClose={() => setIsCreateTaskModalOpen(false)}
          onSubmit={createNewTask}
        />
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
        {/* Task Groups */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TaskSection
            label="Immediate Priority"
            color={COLORS.error}
            tasks={immediateTasks}
            reminders={reminders}
            emptyMessage="No urgent tasks at the moment. Great work staying on top of things!"
            getDueLabel={(task) => {
              const dueDate = new Date(task.dueDate);
              if (isPast(dueDate) && !isToday(dueDate)) {
                return `Overdue ${dueDate.toLocaleString()}`;
              }

              return `Due Today ${dueDate.toLocaleString()}`;
            }}
            getDueIcon={(task) => {
              const dueDate = new Date(task.dueDate);
              if (isPast(dueDate) && !isToday(dueDate)) {
                return <EventBusyRoundedIcon sx={{ fontSize: 14 }} />;
              }

              return <EventRoundedIcon sx={{ fontSize: 14 }} />;
            }}
            getReminderIcon={(task) => {
              const dueDate = new Date(task.dueDate);
              if (isPast(dueDate) && !isToday(dueDate)) {
                return <NotificationsActiveRoundedIcon sx={{ fontSize: 14 }} />;
              }

              return <NotificationsRoundedIcon sx={{ fontSize: 14 }} />;
            }}
            onComplete={completeTask}
          />
          <TaskSection
            label="Upcoming Week"
            color={COLORS.primary}
            tasks={dueThisWeek}
            reminders={reminders}
            emptyMessage="No tasks due this week. Keep up the great work planning ahead!"
            getDueLabel={(task) => `Due This Week ${new Date(task.dueDate).toLocaleString()}`}
            getDueIcon={() => <CalendarTodayRoundedIcon sx={{ fontSize: 14 }} />}
            getReminderIcon={() => <NotificationsRoundedIcon sx={{ fontSize: 14 }} />}
            onComplete={completeTask}
          />
          <TaskSection
            label="Horizon"
            color={COLORS.tertiary}
            tasks={later}
            reminders={reminders}
            emptyMessage="No tasks on the horizon. Time to relax or start planning new projects!"
            getDueLabel={(task) => `Due Later ${new Date(task.dueDate).toLocaleString()}`}
            getDueIcon={() => <CalendarMonthRoundedIcon sx={{ fontSize: 14 }} />}
            getReminderIcon={() => <NotificationsRoundedIcon sx={{ fontSize: 14 }} />}
            onComplete={completeTask}
          />
        </Box>
      </PageLayout>
      <FloatingActionButton onClick={() => setIsCreateTaskModalOpen(true)} />
    </>
  );
};
