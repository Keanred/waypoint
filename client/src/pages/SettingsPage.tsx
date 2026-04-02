import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Timezone } from '@waypoint/schemas';
import { useEffect, useState } from 'react';
import { ApiClientError } from '../api';
import { PageLayout } from '../components/PageLayout';
import { SettingsSection } from '../components/SettingsSection';
import { createBottomNavItems, createSidebarConfig } from '../components/SidebarConfig';
import { useCreateSettingsMutation, useSettingsQuery, useUpdateSettingsMutation } from '../settingsQuery';
import { colors } from '../theme';

const timezoneOptions = [
  { label: 'UTC (Coordinated Universal Time)', value: 'utc' },
  { label: 'EST (Eastern Standard Time)', value: 'est' },
  { label: 'CET (Central European Time)', value: 'cet' },
  { label: 'JST (Japan Standard Time)', value: 'jst' },
];

const shouldInitializeSettings = (args: {
  isError: boolean;
  settingsError: unknown;
  isInitializingSettings: boolean;
  hasInitializedSettings: boolean;
}) => {
  const { isError, settingsError, isInitializingSettings, hasInitializedSettings } = args;

  if (!isError) {
    return false;
  }

  if (!(settingsError instanceof ApiClientError)) {
    return false;
  }

  if (settingsError.status !== 404) {
    return false;
  }

  if (isInitializingSettings) {
    return false;
  }

  return !hasInitializedSettings;
};

const shouldShowSettingsError = (args: {
  isError: boolean;
  settingsError: unknown;
  isPending: boolean;
  hasSettings: boolean;
  hasInitializationError: boolean;
  settings: unknown;
}) => {
  const { isError, settingsError, isPending, hasSettings, hasInitializationError, settings } = args;

  const hasUnexpectedFetchError = () => {
    if (!isError) {
      return false;
    }

    if (!(settingsError instanceof ApiClientError)) {
      return true;
    }

    return settingsError.status !== 404;
  };

  const failedAfterInitializationAttempt = () => {
    if (isPending) {
      return false;
    }

    if (hasSettings) {
      return false;
    }

    return hasInitializationError;
  };

  const missingSettingsAfterLoad = () => {
    if (isPending) {
      return false;
    }

    return !settings;
  };

  return hasUnexpectedFetchError() || failedAfterInitializationAttempt() || missingSettingsAfterLoad();
};

export const SettingsPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [timezone, setTimezone] = useState<Timezone>('utc');
  const [browserNotifications, setBrowserNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(false);

  const { mutate: updateSettingMutate } = useUpdateSettingsMutation();

  const {
    mutate: initializeSettings,
    isPending: isInitializingSettings,
    isSuccess: hasInitializedSettings,
    isError: hasInitializationError,
  } = useCreateSettingsMutation();

  const {
    data: settings,
    error: settingsError,
    isPending: isSettingsPending,
    isError,
    isSuccess: hasSettings,
  } = useSettingsQuery();

  useEffect(() => {
    if (shouldInitializeSettings({ isError, settingsError, isInitializingSettings, hasInitializedSettings })) {
      initializeSettings();
    }
  }, [hasInitializedSettings, initializeSettings, isError, isInitializingSettings, settingsError]);

  useEffect(() => {
    if (!settings) {
      return;
    }

    setFullName(settings.displayName);
    setEmail(settings.reminderEmail);
    setTimezone(settings.timezone);
    setBrowserNotifications(settings.browserNotificationsEnabled);
    setDesktopNotifications(settings.desktopNotificationsEnabled);
  }, [settings]);

  const isPending = isInitializingSettings || isSettingsPending;

  if (isPending) {
    return (
      <PageLayout
        sidebar={createSidebarConfig('settings')}
        topBar={{
          brandName: 'Waypoint',
          navLinks: [{ label: 'Dashboard', to: '/' }, { label: 'Deadlines' }, { label: 'Settings', to: '/settings' }],
          addButtonLabel: 'Add Task',
        }}
        bottomNav={createBottomNavItems('settings')}
        maxWidth={896}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Typography sx={{ color: colors.onSurfaceVariant, fontSize: '1.25rem' }}>Loading settings...</Typography>
        </Box>
      </PageLayout>
    );
  }

  if (shouldShowSettingsError({ isError, settingsError, isPending, hasSettings, hasInitializationError, settings })) {
    return (
      <PageLayout
        sidebar={createSidebarConfig('settings')}
        topBar={{
          brandName: 'Waypoint',
          navLinks: [{ label: 'Dashboard', to: '/' }, { label: 'Deadlines' }, { label: 'Settings', to: '/settings' }],
          addButtonLabel: 'Add Task',
        }}
        bottomNav={createBottomNavItems('settings')}
        maxWidth={896}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Typography sx={{ color: colors.error, fontSize: '1.25rem' }}>
            Failed to load settings. Please try again later.
          </Typography>
        </Box>
      </PageLayout>
    );
  }
  return (
    <PageLayout
      sidebar={createSidebarConfig('settings')}
      topBar={{
        brandName: 'Waypoint',
        navLinks: [{ label: 'Dashboard', to: '/' }, { label: 'Deadlines' }, { label: 'Settings', to: '/settings' }],
        addButtonLabel: 'Add Task',
      }}
      bottomNav={createBottomNavItems('settings')}
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
            <TextField
              id="settings-display-name"
              name="displayName"
              label="Full Name"
              value={fullName}
              autoComplete="name"
              fullWidth
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              id="settings-reminder-email"
              name="reminderEmail"
              label="Email for Reminders"
              type="email"
              value={email}
              autoComplete="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
        </SettingsSection>

        {/* Notification Preferences */}
        <SettingsSection
          icon={<NotificationsActiveRoundedIcon sx={{ fontSize: 'inherit' }} />}
          iconColor={colors.tertiary}
          title="Notification Preferences"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.125rem' }}>Browser Notifications</Typography>
                <Typography sx={{ fontSize: '0.875rem', color: colors.onSurfaceVariant }}>
                  Receive real-time alerts for task deadlines.
                </Typography>
              </Box>
              <Switch checked={browserNotifications} onChange={(_event, checked) => setBrowserNotifications(checked)} />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1.125rem' }}>Desktop Notifications</Typography>
                <Typography sx={{ fontSize: '0.875rem', color: colors.onSurfaceVariant }}>
                  Show desktop notification toasts in supported environments.
                </Typography>
              </Box>
              <Switch checked={desktopNotifications} onChange={(_event, checked) => setDesktopNotifications(checked)} />
            </Box>
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
          <TextField
            id="settings-timezone"
            name="timezone"
            select
            label="Timezone"
            value={timezone}
            autoComplete="off"
            helperText="All task deadlines will be synchronized to this timezone"
            fullWidth
            onChange={(e) => setTimezone(e.target.value as Timezone)}
          >
            {timezoneOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
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
            onClick={() => {
              updateSettingMutate({
                displayName: fullName,
                reminderEmail: email,
                timezone,
                browserNotificationsEnabled: browserNotifications,
                desktopNotificationsEnabled: desktopNotifications,
              });
            }}
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
