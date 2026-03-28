import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppLayout } from './components/AppLayout';
import { NocturnalDashboard } from './pages/dashboard';
import { dashboardColors, waypointTheme } from './theme';

const App = () => {
  const navigationItems = [
    { label: 'Dashboard', icon: <DashboardRoundedIcon />, active: true },
    { label: 'Tasks View', icon: <ChecklistRoundedIcon />, active: false },
    { label: 'Projects', icon: <FolderRoundedIcon />, active: false },
    { label: 'Reminders', icon: <NotificationsRoundedIcon />, active: false },
  ];

  const footerItems = [
    { label: 'Help & Support', icon: <HelpOutlineRoundedIcon />, active: false },
    { label: 'Logout', icon: <LogoutRoundedIcon />, active: false },
  ];

  return (
    <ThemeProvider theme={waypointTheme}>
      <CssBaseline />
      <AppLayout
        appName="Waypoint"
        workspaceName="Waypoint"
        workspaceTagline="Deep Work Mode"
        navigationItems={navigationItems}
        footerItems={footerItems}
        primaryActionLabel="New Task"
      >
        <NocturnalDashboard
          title="Dashboard"
          subtitle="Maintain your flow state. Focus on what matters."
          weeklyVelocity={84}
          topReminderLabel="Your Schedule"
          modalTitle="Task Details"
          featuredTask={{
            statusLabel: 'In Progress',
            accent: dashboardColors.error,
            dueLabel: 'Today',
            title: 'Refactor Neural Engine Interface',
            description: 'Optimization of data pipelines for Project Phoenix',
            reminderLabel: '4 reminders set',
            participants: [
              { name: 'You', initials: 'YO', accent: dashboardColors.primary },
              { name: 'Alex', initials: 'AX', accent: dashboardColors.secondary },
            ],
          }}
          summaryCards={[
            {
              statusLabel: '3 Due Today',
              accent: dashboardColors.error,
              dueLabel: 'Next 24h',
              title: 'Critical Tasks',
              description: 'Security patch, UI audit, resource planning',
              reminderLabel: '12 reminders total',
              category: 'urgent',
            },
            {
              statusLabel: '8 This Week',
              accent: dashboardColors.tertiary,
              dueLabel: 'By Friday',
              title: 'Weekly Goals',
              description: 'On track for 88% completion',
              reminderLabel: '22 upcoming reminders',
              category: 'weekly',
            },
            {
              statusLabel: '6 Active',
              accent: dashboardColors.primary,
              dueLabel: 'Ongoing',
              title: 'Projects',
              description: 'Project Phoenix, Design System, Operations',
              reminderLabel: '18 task reminders',
              category: 'projects',
            },
          ]}
          activeTasks={[
            {
              accent: dashboardColors.secondary,
              statusLabel: 'Review Pending',
              title: 'UI Audit for V2.4 Launch',
              description: 'Reviewing visual consistency across design system',
              dueLabel: 'Tomorrow 09:00',
            },
            {
              accent: dashboardColors.tertiary,
              statusLabel: 'Planning Phase',
              title: 'Quarterly Resource Planning',
              description: 'Fiscal year projection model and capacity analysis',
              dueLabel: 'Oct 24 15:00',
            },
            {
              accent: dashboardColors.secondary,
              statusLabel: 'In Progress',
              title: 'Onboard New Lead Designer',
              description: 'Documentation and tooling access setup',
              dueLabel: 'Friday 11:00',
            },
          ]}
        />
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
