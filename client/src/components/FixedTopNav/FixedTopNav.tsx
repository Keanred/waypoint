import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { alpha, Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';

export interface HeaderLinkItem {
  label: string;
  active?: boolean;
}

export function FixedTopNav({
  brandName,
  links,
  avatarUrl,
}: {
  brandName: string;
  links: HeaderLinkItem[];
  avatarUrl: string;
}) {
  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        px: { xs: 3, md: 4, lg: 8 },
        height: 64,
        backgroundColor: dashboardColors.background,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.06em' }}>
        {brandName}
      </Typography>

      <Stack direction="row" spacing={3} alignItems="center">
        <Stack direction="row" spacing={3} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
          {links.map((link) => (
            <Typography
              key={link.label}
              variant="body2"
              sx={{
                color: link.active ? dashboardColors.primary : 'text.secondary',
                fontWeight: link.active ? 700 : 500,
                '&:hover': { color: 'text.primary' },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton sx={{ color: 'text.secondary' }}>
            <NotificationsRoundedIcon />
          </IconButton>
          <IconButton sx={{ color: 'text.secondary' }}>
            <SettingsRoundedIcon />
          </IconButton>
          <Avatar
            src={avatarUrl}
            alt="User avatar"
            sx={{
              width: 32,
              height: 32,
              bgcolor: dashboardColors.surfaceContainerHigh,
              border: `1px solid ${alpha(dashboardColors.outlineVariant, 0.2)}`,
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
