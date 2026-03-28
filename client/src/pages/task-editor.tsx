import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import { alpha, Box, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { AmbientBackground } from '../components/AmbientBackground';
import { EditTaskViewFieldShell } from '../components/EditTaskViewFieldShell';
import { EditTaskViewHeader } from '../components/EditTaskViewHeader';
import { EditTaskViewInspirationColumn } from '../components/EditTaskViewInspirationColumn';
import { EditTaskViewLeadingIconField } from '../components/EditTaskViewLeadingIconField';
import { EditTaskViewReminderRow } from '../components/EditTaskViewReminderRow';
import { editTaskFieldInputStyles } from '../components/EditTaskViewSharedStyles';
import type { ReminderRowData } from '../components/EditTaskViewTypes';
import { GradientActionButton } from '../components/GradientActionButton';
import { SurfacePanel } from '../components/SurfacePanel';
import { TonalActionButton } from '../components/TonalActionButton';
import { dashboardColors } from '../theme';

export type { ReminderRowData } from '../components/EditTaskViewTypes';

interface EditTaskViewProps {
  brandTitle: string;
  brandSubtitle: string;
  title: string;
  subtitle: string;
  taskTitle: string;
  description: string;
  project: string;
  dueDate: string;
  recurrence: string;
  recurringEndDate: string;
  focusTip: string;
  imageAlt: string;
  imageUrl: string;
  reminders: ReminderRowData[];
}

export const EditTaskView = ({
  brandTitle,
  brandSubtitle,
  title,
  subtitle,
  taskTitle,
  description,
  project,
  dueDate,
  recurrence,
  recurringEndDate,
  focusTip,
  imageAlt,
  imageUrl,
  reminders,
}: EditTaskViewProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 6 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: dashboardColors.background,
      }}
    >
      <AmbientBackground />

      <Box
        sx={{
          width: '100%',
          maxWidth: 1280,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, minmax(0, 1fr))' },
          gap: { xs: 3, lg: 4 },
          alignItems: 'start',
        }}
      >
        <Box sx={{ gridColumn: { lg: 'span 4' } }}>
          <EditTaskViewInspirationColumn
            brandTitle={brandTitle}
            brandSubtitle={brandSubtitle}
            focusTip={focusTip}
            imageAlt={imageAlt}
            imageUrl={imageUrl}
          />
        </Box>

        <Box sx={{ gridColumn: { lg: 'span 8' } }}>
          <SurfacePanel variant="glass" sx={{ p: { xs: 3, md: 5 }, borderRadius: 3.5 }}>
            <Stack spacing={5}>
              <EditTaskViewHeader title={title} subtitle={subtitle} />

              <Stack component="form" spacing={6}>
                <Stack spacing={3}>
                  <EditTaskViewFieldShell label="Task Title">
                    <TextField
                      value={taskTitle}
                      InputProps={{ readOnly: true }}
                      sx={{
                        ...editTaskFieldInputStyles(),
                        '& .MuiOutlinedInput-root': {
                          ...editTaskFieldInputStyles()['& .MuiOutlinedInput-root'],
                          borderBottom: `2px solid transparent`,
                        },
                        '& .MuiInputBase-input': {
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontSize: '1.25rem',
                          fontWeight: 500,
                        },
                      }}
                    />
                  </EditTaskViewFieldShell>

                  <EditTaskViewFieldShell label="Description">
                    <TextField
                      value={description}
                      multiline
                      rows={4}
                      InputProps={{ readOnly: true }}
                      sx={editTaskFieldInputStyles()}
                    />
                  </EditTaskViewFieldShell>
                </Stack>

                <Box
                  sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 3 }}
                >
                  <Box sx={{ gridColumn: { md: 'span 2' } }}>
                    <EditTaskViewFieldShell label="Project">
                      <EditTaskViewLeadingIconField icon={<FolderRoundedIcon fontSize="small" />}>
                        <Select
                          value={project}
                          IconComponent={ExpandMoreRoundedIcon}
                          inputProps={{ readOnly: true }}
                          sx={{
                            width: '100%',
                            pl: 4,
                            borderRadius: 2.5,
                            backgroundColor: dashboardColors.surfaceContainerLowest,
                            color: 'text.primary',
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 500,
                            '.MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: alpha(dashboardColors.outlineVariant, 0.25),
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: alpha(dashboardColors.primary, 0.35),
                            },
                          }}
                        >
                          <MenuItem value="Phoenix">Phoenix</MenuItem>
                          <MenuItem value="API Audit">API Audit</MenuItem>
                          <MenuItem value="Design Sync">Design Sync</MenuItem>
                        </Select>
                      </EditTaskViewLeadingIconField>
                    </EditTaskViewFieldShell>
                  </Box>

                  <EditTaskViewFieldShell label="Due Date">
                    <EditTaskViewLeadingIconField icon={<CalendarTodayRoundedIcon fontSize="small" />}>
                      <TextField
                        value={dueDate}
                        InputProps={{ readOnly: true }}
                        sx={{
                          ...editTaskFieldInputStyles(),
                          '& .MuiInputBase-input': {
                            pl: 4.5,
                          },
                        }}
                      />
                    </EditTaskViewLeadingIconField>
                  </EditTaskViewFieldShell>

                  <EditTaskViewFieldShell label="Recurrence">
                    <EditTaskViewLeadingIconField icon={<RepeatRoundedIcon fontSize="small" />}>
                      <Select
                        value={recurrence}
                        IconComponent={ExpandMoreRoundedIcon}
                        inputProps={{ readOnly: true }}
                        sx={{
                          width: '100%',
                          pl: 4,
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
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="Daily">Daily</MenuItem>
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                      </Select>
                    </EditTaskViewLeadingIconField>
                  </EditTaskViewFieldShell>

                  <Box sx={{ gridColumn: { md: 'span 2' } }}>
                    <EditTaskViewFieldShell label="Recurring End Date">
                      <EditTaskViewLeadingIconField
                        icon={<EventBusyRoundedIcon fontSize="small" sx={{ color: dashboardColors.outline }} />}
                      >
                        <TextField
                          value={recurringEndDate}
                          InputProps={{ readOnly: true }}
                          sx={{
                            ...editTaskFieldInputStyles(),
                            '& .MuiInputBase-input': {
                              pl: 4.5,
                            },
                          }}
                        />
                      </EditTaskViewLeadingIconField>
                    </EditTaskViewFieldShell>
                  </Box>
                </Box>

                <Stack spacing={3} sx={{ pt: 3, borderTop: `1px solid ${alpha(dashboardColors.outlineVariant, 0.1)}` }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={2}>
                    <Box>
                      <Typography variant="h6">Reminders</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 800,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Never miss a pulse
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ color: dashboardColors.tertiary }}>
                      <AddCircleRoundedIcon fontSize="small" />
                      <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.08em' }}>
                        Add Reminder
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack spacing={1.5}>
                    {reminders.map((reminder, index) => (
                      <EditTaskViewReminderRow
                        key={`${reminder.value}-${reminder.unit}-${index}`}
                        reminder={reminder}
                      />
                    ))}
                  </Stack>
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ pt: 2 }}>
                  <TonalActionButton type="button" fullWidth sx={{ flex: 1 }}>
                    Cancel
                  </TonalActionButton>
                  <GradientActionButton type="submit" fullWidth sx={{ flex: 2 }}>
                    Save Task
                  </GradientActionButton>
                </Stack>
              </Stack>
            </Stack>
          </SurfacePanel>
        </Box>
      </Box>
    </Box>
  );
};
