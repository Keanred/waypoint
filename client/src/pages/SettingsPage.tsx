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

import { FormField } from '../components/FormField';
import { PageLayout } from '../components/PageLayout';
import { SelectField } from '../components/SelectField';
import { SettingsSection } from '../components/SettingsSection';
import { ToggleRow } from '../components/ToggleRow';
import { colors } from '../theme';

export const SettingsPage = () => {
  return (
    <PageLayout
      sidebar={{
        appName: 'Task Master',
        tagline: 'Precision focus',
        navItems: [
          { label: 'Overview', icon: <DashboardRoundedIcon />, to: '/' },
          { label: 'High Priority', icon: <PriorityHighRoundedIcon />, to: '/focus' },
          { label: 'Upcoming', icon: <EventRoundedIcon />, to: '/analytics' },
          { label: 'Completed', icon: <CheckCircleRoundedIcon />, to: '/settings' },
        ],
        actionLabel: 'New Focus Session',
        footerItems: [
          { label: 'Archive', icon: <ArchiveRoundedIcon /> },
          { label: 'Support', icon: <HelpOutlineRoundedIcon /> },
        ],
      }}
      topBar={{
        brandName: 'Nocturne Task',
        navLinks: [{ label: 'Dashboard', to: '/' }, { label: 'Deadlines' }, { label: 'Settings', to: '/settings' }],
        addButtonLabel: 'Add Task',
      }}
      bottomNav={[
        { label: 'Home', icon: <HomeRoundedIcon />, to: '/' },
        { label: 'Tasks', icon: <FormatListBulletedRoundedIcon />, to: '/focus' },
        { label: 'Alerts', icon: <AlarmRoundedIcon />, to: '/analytics' },
        { label: 'Settings', icon: <SettingsRoundedIcon />, active: true, to: '/settings' },
      ]}
      maxWidth={896}
    >
      {/* Page Header */}
      <Box component="header" sx={{ mb: 6 }}>
        <Typography
          sx={{
            fontSize: { xs: '2.25rem', md: '3rem' },
            fontWeight: 800,
            fontFamily: 'Manrope',
            letterSpacing: '-0.05em',
            color: colors.onSurface,
          }}
        >
          Settings
        </Typography>
        <Typography sx={{ color: colors.onSurfaceVariant, fontWeight: 500 }}>
          Manage your nocturnal workspace and synchronization preferences.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* Profile Section */}
        <SettingsSection
          icon={<PersonRoundedIcon sx={{ fontSize: 'inherit' }} />}
          iconColor={colors.primary}
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
          iconColor={colors.tertiary}
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
                <Typography sx={{ fontSize: '0.875rem', color: colors.onSurfaceVariant }}>
                  Send a sample reminder to your profile email.
                </Typography>
              </Box>
              <Button
                sx={{
                  bgcolor: colors.secondaryContainer,
                  color: colors.onSecondaryContainer,
                  px: 3,
                  py: 1,
                  borderRadius: 9999,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  '&:hover': { filter: 'brightness(1.1)', bgcolor: colors.secondaryContainer },
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
          iconColor={colors.error}
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
              color: colors.onSurfaceVariant,
              textTransform: 'none',
              '&:hover': { color: colors.onSurface },
            }}
          >
            Discard Changes
          </Button>
          <Button
            sx={{
              background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryContainer})`,
              color: colors.onPrimary,
              px: 5,
              py: 1.5,
              borderRadius: '12px',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 0 20px rgba(189, 147, 249, 0.3)',
              '&:hover': {
                boxShadow: '0 0 20px rgba(189, 147, 249, 0.4)',
                background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryContainer})`,
              },
              '&:active': { transform: 'scale(0.95)' },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </PageLayout>
  );
};
