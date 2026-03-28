import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { alpha, Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';

interface RemindersViewHeaderProps {
  title: string;
  subtitle: string;
  avatarUrl: string;
}

export const RemindersViewHeader = ({ title, subtitle, avatarUrl }: RemindersViewHeaderProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
      spacing={3}
      sx={{ mb: { xs: 8, md: 10 } }}
    >
      <Box>
        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {subtitle}
        </Typography>
      </Box>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <IconButton
          sx={{
            p: 1.5,
            borderRadius: '50%',
            backgroundColor: alpha(dashboardColors.surfaceContainerHighest, 0.5),
            color: 'text.primary',
            '&:hover': { backgroundColor: dashboardColors.surfaceContainerHigh },
          }}
        >
          <NotificationsRoundedIcon />
        </IconButton>
        <Avatar
          src={avatarUrl}
          alt="User avatar"
          sx={{
            width: 48,
            height: 48,
            bgcolor: dashboardColors.surfaceContainerHigh,
            border: `1px solid ${alpha(dashboardColors.outlineVariant, 0.2)}`,
          }}
        />
      </Stack>
    </Stack>
  );
};
