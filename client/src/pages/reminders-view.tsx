import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Box } from '@mui/material';
import { AmbientBackground } from '../components/AmbientBackground';
import { AppSidebar, type NavigationItem } from '../components/AppSidebar';
import type { ReminderHistoryItem } from '../components/HistoryItemRow';
import type { ReminderQueueItem } from '../components/QueueReminderCard';
import { RemindersFloatingAction } from '../components/RemindersFloatingAction';
import { RemindersHistorySection } from '../components/RemindersHistorySection';
import { RemindersQueuedSection } from '../components/RemindersQueuedSection';
import { RemindersTipCard } from '../components/RemindersTipCard';
import { RemindersViewHeader } from '../components/RemindersViewHeader';
import { UtilityHeader } from '../components/UtilityHeader';
import { dashboardColors } from '../theme';

export type { ReminderHistoryItem, ReminderQueueItem };

interface RemindersViewProps {
  workspaceName: string;
  workspaceTagline: string;
  navigationItems: NavigationItem[];
  footerItems: NavigationItem[];
  queuedReminders: ReminderQueueItem[];
  historyItems: ReminderHistoryItem[];
  title: string;
  subtitle: string;
  avatarUrl: string;
  tipTitle: string;
  tipDescription: string;
  tipActionLabel: string;
}

export const RemindersView = ({
  workspaceName,
  workspaceTagline,
  navigationItems,
  footerItems,
  queuedReminders,
  historyItems,
  title,
  subtitle,
  avatarUrl,
  tipTitle,
  tipDescription,
  tipActionLabel,
}: RemindersViewProps) => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: dashboardColors.background }}>
      <AmbientBackground />
      <AppSidebar
        workspaceName={workspaceName}
        workspaceTagline={workspaceTagline}
        navigationItems={navigationItems}
        footerItems={footerItems}
        primaryActionLabel="New Task"
      />
      <UtilityHeader searchPlaceholder="Search notifications..." links={['Docs', 'Status']} />

      <Box
        component="main"
        sx={{
          ml: { xs: 0, lg: '256px' },
          minHeight: '100vh',
          px: { xs: 3, md: 5, xl: 6 },
          pt: { xs: 4, md: 10, xl: 11 },
          pb: { xs: 10, md: 8 },
        }}
      >
        <RemindersViewHeader title={title} subtitle={subtitle} avatarUrl={avatarUrl} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', xl: 'repeat(12, minmax(0, 1fr))' },
            gap: 4,
          }}
        >
          <RemindersQueuedSection queuedReminders={queuedReminders} />

          <Box sx={{ gridColumn: { xl: 'span 5' } }}>
            <RemindersHistorySection historyItems={historyItems} />
            <RemindersTipCard tipTitle={tipTitle} tipDescription={tipDescription} tipActionLabel={tipActionLabel} />
          </Box>
        </Box>

        <RemindersFloatingAction />
      </Box>
    </Box>
  );
};

export const remindersNavigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: <DashboardRoundedIcon fontSize="small" />,
  },
  {
    label: 'Tasks View',
    icon: <ChecklistRoundedIcon fontSize="small" />,
  },
  {
    label: 'Tasks',
    icon: <ChecklistRoundedIcon fontSize="small" />,
  },
  {
    label: 'Reminders',
    icon: <AlarmRoundedIcon fontSize="small" />,
    active: true,
  },
  {
    label: 'Projects',
    icon: <FolderRoundedIcon fontSize="small" />,
  },
  {
    label: 'Archive',
    icon: <ArchiveRoundedIcon fontSize="small" />,
  },
];

export const remindersFooterItems: NavigationItem[] = [
  {
    label: 'Support',
    icon: <HelpOutlineRoundedIcon fontSize="small" />,
  },
  {
    label: 'Log Out',
    icon: <LogoutRoundedIcon fontSize="small" />,
  },
];
