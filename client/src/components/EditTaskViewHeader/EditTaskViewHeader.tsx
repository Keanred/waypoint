import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';

interface EditTaskViewHeaderProps {
  title: string;
  subtitle: string;
}

export const EditTaskViewHeader = ({ title, subtitle }: EditTaskViewHeaderProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      </Box>
      <IconButton
        sx={{
          color: dashboardColors.outline,
          '&:hover': { backgroundColor: dashboardColors.surfaceContainerHigh, color: 'text.primary' },
        }}
      >
        <CloseRoundedIcon />
      </IconButton>
    </Stack>
  );
}
