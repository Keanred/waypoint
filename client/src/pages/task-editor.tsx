import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import { alpha, Box, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { AmbientBackground } from '../components/AmbientBackground';
import { GradientActionButton } from '../components/GradientActionButton';
import { SectionLabel } from '../components/SectionLabel';
import { StatusOrb } from '../components/StatusOrb';
import { SurfacePanel } from '../components/SurfacePanel';
import { TonalActionButton } from '../components/TonalActionButton';
import { WorkspaceIdentity } from '../components/WorkspaceIdentity';
import { dashboardColors } from '../theme';

export interface ReminderRowData {
  value: string;
  unit: string;
}

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

function fieldInputStyles() {
  return {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      backgroundColor: dashboardColors.surfaceContainerLowest,
      color: 'text.primary',
      alignItems: 'flex-start',
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: alpha(dashboardColors.outlineVariant, 0.25),
      },
      '&.Mui-focused fieldset': {
        borderColor: alpha(dashboardColors.primary, 0.35),
      },
    },
    '& .MuiInputBase-input': {
      color: 'text.primary',
    },
  };
}

function FieldShell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Stack spacing={1.25}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </Stack>
  );
}

function LeadingIconField({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 16,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          transform: 'translateY(-50%)',
          color: dashboardColors.primary,
        }}
      >
        {icon}
      </Box>
      {children}
    </Box>
  );
}

function ReminderRow({ reminder }: { reminder: ReminderRowData }) {
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
            ...fieldInputStyles(),
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
}

function InspirationColumn({
  brandTitle,
  brandSubtitle,
  focusTip,
  imageAlt,
  imageUrl,
}: Pick<EditTaskViewProps, 'brandTitle' | 'brandSubtitle' | 'focusTip' | 'imageAlt' | 'imageUrl'>) {
  return (
    <Stack spacing={4} sx={{ display: { xs: 'none', lg: 'flex' } }}>
      <WorkspaceIdentity title={brandTitle} subtitle={brandSubtitle} titleVariant="h3" />

      <SurfacePanel variant="low" sx={{ p: 3, borderRadius: 3.5 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <StatusOrb accent={dashboardColors.secondary} />
            <Typography
              variant="caption"
              sx={{
                color: dashboardColors.secondary,
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Focus Tip
            </Typography>
          </Stack>
          <Typography sx={{ fontStyle: 'italic', lineHeight: 1.8 }}>{focusTip}</Typography>
        </Stack>
      </SurfacePanel>

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3.5,
          aspectRatio: '4 / 5',
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={imageAlt}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0b0e18, transparent 55%)',
          }}
        />
      </Box>
    </Stack>
  );
}

function EditorHeader({ title, subtitle }: Pick<EditTaskViewProps, 'title' | 'subtitle'>) {
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

export function EditTaskView({
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
}: EditTaskViewProps) {
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
          <InspirationColumn
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
              <EditorHeader title={title} subtitle={subtitle} />

              <Stack component="form" spacing={6}>
                <Stack spacing={3}>
                  <FieldShell label="Task Title">
                    <TextField
                      value={taskTitle}
                      InputProps={{ readOnly: true }}
                      sx={{
                        ...fieldInputStyles(),
                        '& .MuiOutlinedInput-root': {
                          ...fieldInputStyles()['& .MuiOutlinedInput-root'],
                          borderBottom: `2px solid transparent`,
                        },
                        '& .MuiInputBase-input': {
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontSize: '1.25rem',
                          fontWeight: 500,
                        },
                      }}
                    />
                  </FieldShell>

                  <FieldShell label="Description">
                    <TextField
                      value={description}
                      multiline
                      rows={4}
                      InputProps={{ readOnly: true }}
                      sx={fieldInputStyles()}
                    />
                  </FieldShell>
                </Stack>

                <Box
                  sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 3 }}
                >
                  <Box sx={{ gridColumn: { md: 'span 2' } }}>
                    <FieldShell label="Project">
                      <LeadingIconField icon={<FolderRoundedIcon fontSize="small" />}>
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
                      </LeadingIconField>
                    </FieldShell>
                  </Box>

                  <FieldShell label="Due Date">
                    <LeadingIconField icon={<CalendarTodayRoundedIcon fontSize="small" />}>
                      <TextField
                        value={dueDate}
                        InputProps={{ readOnly: true }}
                        sx={{
                          ...fieldInputStyles(),
                          '& .MuiInputBase-input': {
                            pl: 4.5,
                          },
                        }}
                      />
                    </LeadingIconField>
                  </FieldShell>

                  <FieldShell label="Recurrence">
                    <LeadingIconField icon={<RepeatRoundedIcon fontSize="small" />}>
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
                    </LeadingIconField>
                  </FieldShell>

                  <Box sx={{ gridColumn: { md: 'span 2' } }}>
                    <FieldShell label="Recurring End Date">
                      <LeadingIconField
                        icon={<EventBusyRoundedIcon fontSize="small" sx={{ color: dashboardColors.outline }} />}
                      >
                        <TextField
                          value={recurringEndDate}
                          InputProps={{ readOnly: true }}
                          sx={{
                            ...fieldInputStyles(),
                            '& .MuiInputBase-input': {
                              pl: 4.5,
                            },
                          }}
                        />
                      </LeadingIconField>
                    </FieldShell>
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
                      <ReminderRow key={`${reminder.value}-${reminder.unit}-${index}`} reminder={reminder} />
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
}
