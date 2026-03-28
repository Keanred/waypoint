import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { alpha, Box, Fab, Stack, Typography } from '@mui/material';
import { AmbientBackground } from '../components/AmbientBackground';
import { AppSidebar, type NavigationItem } from '../components/AppSidebar';
import { FilterBento } from '../components/FilterBento';
import { FixedTopNav, type HeaderLinkItem } from '../components/FixedTopNav';
import { MetricCard, type TaskMetricCard } from '../components/MetricCard';
import { SegmentedFilter } from '../components/SegmentedFilter';
import { TaskTableSection, type TaskListItem } from '../components/TaskTableSection';
import { dashboardColors } from '../theme';

export type { TaskListItem, TaskMetricCard };

interface TasksViewProps {
  workspaceName: string;
  workspaceTagline: string;
  brandName: string;
  headerLinks: HeaderLinkItem[];
  navigationItems: NavigationItem[];
  footerItems: NavigationItem[];
  avatarUrl: string;
  title: string;
  subtitle: string;
  tasks: TaskListItem[];
  metrics: TaskMetricCard[];
}

export const TasksView = ({
  workspaceName,
  workspaceTagline,
  brandName,
  headerLinks,
  navigationItems,
  footerItems,
  avatarUrl,
  title,
  subtitle,
  tasks,
  metrics,
}: TasksViewProps) => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: dashboardColors.background }}>
      <AmbientBackground />
      <FixedTopNav brandName={brandName} links={headerLinks} avatarUrl={avatarUrl} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '256px minmax(0, 1fr)' },
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <AppSidebar
          workspaceName={workspaceName}
          workspaceTagline={workspaceTagline}
          navigationItems={navigationItems}
          footerItems={footerItems}
          primaryActionLabel="New Task"
          topOffset={64}
        />

        <Box component="main" sx={{ pb: 8, px: { xs: 3, md: 4, lg: 5 }, pt: { xs: 4, md: 6 } }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', md: 'flex-end' }}
              spacing={3}
              sx={{ mb: 8, pl: { md: 3 } }}
            >
              <Box>
                <Typography variant="h1" sx={{ fontSize: { xs: '3.5rem', md: '4.75rem' }, lineHeight: 0.95 }}>
                  {title}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2.5, color: 'text.secondary', fontWeight: 300, maxWidth: 420 }}>
                  {subtitle}
                </Typography>
              </Box>
              <SegmentedFilter />
            </Stack>

            <FilterBento />
            <TaskTableSection tasks={tasks} />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                gap: 3,
                mt: 4,
              }}
            >
              {metrics.map((metric) => (
                <MetricCard key={metric.label} metric={metric} />
              ))}
            </Box>
          </Box>

          <Fab
            sx={{
              position: 'fixed',
              right: 32,
              bottom: 32,
              width: 64,
              height: 64,
              color: '#1a003b',
              background: `linear-gradient(
                135deg,
                ${dashboardColors.primary} 0%,
                ${dashboardColors.primaryContainer} 100%
              )`,
              boxShadow: `0 24px 48px ${alpha(dashboardColors.primary, 0.28)}`,
              '&:hover': {
                background: `linear-gradient(
                  135deg,
                  ${dashboardColors.primary} 0%,
                  ${dashboardColors.primaryContainer} 100%
                )`,
                transform: 'scale(1.05)',
              },
            }}
          >
            <AddRoundedIcon sx={{ fontSize: 30 }} />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
};

export const tasksHeaderLinks: HeaderLinkItem[] = [
  { label: 'Dashboard' },
  { label: 'Tasks', active: true },
  { label: 'Projects' },
];

export const tasksNavigationItems: NavigationItem[] = [
  { label: 'Dashboard', icon: <DashboardRoundedIcon fontSize="small" /> },
  { label: 'Tasks View', icon: <ChecklistRoundedIcon fontSize="small" />, active: true },
  { label: 'Tasks', icon: <ChecklistRoundedIcon fontSize="small" /> },
  { label: 'Reminders', icon: <AlarmRoundedIcon fontSize="small" /> },
  { label: 'Projects', icon: <FolderRoundedIcon fontSize="small" /> },
  { label: 'Archive', icon: <ArchiveRoundedIcon fontSize="small" /> },
];

export const tasksFooterItems: NavigationItem[] = [
  { label: 'Support', icon: <HelpOutlineRoundedIcon fontSize="small" /> },
  { label: 'Log Out', icon: <LogoutRoundedIcon fontSize="small" /> },
];
