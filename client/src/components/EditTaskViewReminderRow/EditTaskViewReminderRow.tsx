import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { alpha, Box, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';
import { editTaskFieldInputStyles } from '../EditTaskViewSharedStyles';
import type { ReminderRowData } from '../EditTaskViewTypes';
import { SurfacePanel } from '../SurfacePanel';

interface EditTaskViewReminderRowProps {
  reminder: ReminderRowData;
}

export const EditTaskViewReminderRow = ({ reminder }: EditTaskViewReminderRowProps) => {
  return (
    <SurfacePanel
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 1.5,
        borderRadius: 3,
        transition: 'background-color 180ms ease',
        '&:hover': {
          backgroundColor: dashboardColors.surfaceContainerHigh,
        },
      }}
    >
      <Box
        sx={{ flex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}
      >
        <TextField
          value={reminder.value}
          type="number"
          InputProps={{ readOnly: true }}
          sx={{
            ...editTaskFieldInputStyles(),
            '& .MuiInputBase-input': {
              textAlign: 'center',
              fontWeight: 700,
            },
          }}
        />
        <Select
          value={reminder.unit}
          IconComponent={ExpandMoreRoundedIcon}
          inputProps={{ readOnly: true }}
          sx={{
            borderRadius: 2.5,
            backgroundColor: dashboardColors.surfaceContainerLowest,
            color: 'text.primary',
            '.MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(dashboardColors.outlineVariant, 0.25),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(dashboardColors.primary, 0.35),
            },
          }}
        >
          <MenuItem value="Minutes">Minutes</MenuItem>
          <MenuItem value="Hours">Hours</MenuItem>
          <MenuItem value="Days">Days</MenuItem>
        </Select>
      </Box>
      <Typography variant="body2" sx={{ px: 1, color: 'text.secondary' }}>
        before
      </Typography>
      <IconButton sx={{ color: 'text.secondary', '&:hover': { color: dashboardColors.error } }}>
        <DeleteRoundedIcon />
      </IconButton>
    </SurfacePanel>
  );
};
