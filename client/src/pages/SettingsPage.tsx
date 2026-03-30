import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { BottomNavBar } from '../components/BottomNavBar';
import { FormField } from '../components/FormField';
import { SelectField } from '../components/SelectField';
import { SettingsSection } from '../components/SettingsSection';
import { SideNavBar } from '../components/SideNavBar';
import { ToggleRow } from '../components/ToggleRow';
import { TopAppBar } from '../components/TopAppBar';

export const SettingsPage = () => {
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
          { label: 'Overview', icon: <DashboardRoundedIcon /> },
          { label: 'High Priority', icon: <PriorityHighRoundedIcon /> },
          { label: 'Upcoming', icon: <EventRoundedIcon /> },
          { label: 'Completed', icon: <CheckCircleRoundedIcon /> },
        ]}
        actionLabel="New Focus Session"
        footerItems={[
          { label: 'Archive', icon: <ArchiveRoundedIcon /> },
          { label: 'Support', icon: <HelpOutlineRoundedIcon /> },
        ]}
      />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <TopAppBar
          brandName="Nocturne Task"
          navLinks={[{ label: 'Dashboard', to: '/' }, { label: 'Deadlines' }, { label: 'Settings', to: '/settings' }]}
          addButtonLabel="Add Task"
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 4, md: 6, lg: 10 },
            pt: { xs: 14, md: 14, lg: 14 },
            overflowY: 'auto',
          }}
        >
          <Box sx={{ maxWidth: 896, mx: 'auto' }}>
            {/* Page Header */}
            <Box component="header" sx={{ mb: 6 }}>
              <Typography
                sx={{
                  fontSize: { xs: '2.25rem', md: '3rem' },
                  fontWeight: 800,
                  fontFamily: 'Manrope',
                  letterSpacing: '-0.05em',
                  color: '#e1e1f1',
                  mb: 1,
                }}
              >
                Settings
              </Typography>
              <Typography sx={{ color: '#968e9c', fontWeight: 500 }}>
                Manage your nocturnal workspace and synchronization preferences.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Profile Section */}
              <SettingsSection
                icon={<PersonRoundedIcon sx={{ fontSize: 'inherit' }} />}
                iconColor="#d7baff"
                title="Profile"
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 3,
                  }}
                >
                  <FormField label="Full Name" defaultValue="Julian Nocturne" />
                  <FormField label="Email for Reminders" type="email" defaultValue="julian@nocturne.studio" />
                </Box>
              </SettingsSection>

              {/* Notification Preferences */}
              <SettingsSection
                icon={<NotificationsActiveRoundedIcon sx={{ fontSize: 'inherit' }} />}
                iconColor="#75d4e8"
                title="Notification Preferences"
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <ToggleRow
                    title="Browser Notifications"
                    description="Receive real-time alerts for task deadlines."
                    defaultChecked
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pt: 3,
                      borderTop: '1px solid rgba(74, 68, 81, 0.1)',
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '1.125rem' }}>Test Email</Typography>
                      <Typography sx={{ fontSize: '0.875rem', color: '#968e9c' }}>
                        Send a sample reminder to your profile email.
                      </Typography>
                    </Box>
                    <Button
                      sx={{
                        bgcolor: '#374776',
                        color: '#a7b7ed',
                        px: 3,
                        py: 1,
                        borderRadius: 9999,
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        textTransform: 'none',
                        '&:hover': { filter: 'brightness(1.1)', bgcolor: '#374776' },
                        '&:active': { transform: 'scale(0.95)' },
                      }}
                    >
                      Send Test
                    </Button>
                  </Box>
                </Box>
              </SettingsSection>

              {/* System Section */}
              <SettingsSection
                icon={<SettingsEthernetRoundedIcon sx={{ fontSize: 'inherit' }} />}
                iconColor="#ffb4ab"
                title="System"
              >
                <SelectField
                  label="Timezone"
                  defaultValue="utc"
                  options={[
                    { label: 'UTC (Coordinated Universal Time)', value: 'utc' },
                    { label: 'EST (Eastern Standard Time)', value: 'est' },
                    { label: 'CET (Central European Time)', value: 'cet' },
                    { label: 'JST (Japan Standard Time)', value: 'jst' },
                  ]}
                  helperText="All task deadlines will be synchronized to this timezone."
                />
              </SettingsSection>

              {/* Actions */}
              <Box
                component="footer"
                sx={{
                  pt: 4,
                  pb: { xs: 12, lg: 4 },
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                <Button
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 700,
                    color: '#968e9c',
                    textTransform: 'none',
                    '&:hover': { color: '#e1e1f1' },
                  }}
                >
                  Discard Changes
                </Button>
                <Button
                  sx={{
                    background: 'linear-gradient(to right, #d7baff, #bd93f9)',
                    color: '#411478',
                    px: 5,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 0 20px rgba(189, 147, 249, 0.3)',
                    '&:hover': {
                      boxShadow: '0 0 20px rgba(189, 147, 249, 0.4)',
                      background: 'linear-gradient(to right, #d7baff, #bd93f9)',
                    },
                    '&:active': { transform: 'scale(0.95)' },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Mobile Bottom Nav */}
      <BottomNavBar
        items={[
          { label: 'Home', icon: <HomeRoundedIcon /> },
          { label: 'Tasks', icon: <FormatListBulletedRoundedIcon /> },
          { label: 'Alerts', icon: <AlarmRoundedIcon /> },
          { label: 'Settings', icon: <SettingsRoundedIcon />, active: true },
        ]}
      />
    </Box>
  );
};
