import { alpha, Box, Chip, Stack, Typography } from '@mui/material';
import { ActiveTaskRow, type ActiveTask } from '../components/ActiveTaskRow';
import { FeaturedTaskCard, type FeaturedTask } from '../components/FeaturedTaskCard';
import { ModalPreview } from '../components/ModalPreview';
import { SummaryTaskCard, type SummaryCard } from '../components/SummaryTaskCard';
import { VelocityCard } from '../components/VelocityCard';
import { dashboardColors } from '../theme';

interface NocturnalDashboardProps {
  title: string;
  subtitle: string;
  weeklyVelocity: number;
  featuredTask: FeaturedTask;
  summaryCards: SummaryCard[];
  activeTasks: ActiveTask[];
  topReminderLabel: string;
  modalTitle: string;
}

export const NocturnalDashboard = ({
  title,
  subtitle,
  weeklyVelocity,
  featuredTask,
  summaryCards,
  activeTasks,
  topReminderLabel,
  modalTitle,
}: NocturnalDashboardProps) => {
  return (
    <>
      <Box sx={{ mb: { xs: 8, md: 10 }, maxWidth: 920 }}>
        <Typography variant="h1" sx={{ fontSize: { xs: '2.75rem', md: '4rem' }, mb: 1.5 }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
          gap: 3,
          maxWidth: 1280,
          mb: 8,
        }}
      >
        <Box sx={{ gridColumn: { xs: 'auto', md: 'span 8' } }}>
          <FeaturedTaskCard task={featuredTask} />
        </Box>
        <Box sx={{ gridColumn: { xs: 'auto', md: 'span 4' } }}>
          <VelocityCard value={weeklyVelocity} />
        </Box>
        {summaryCards.map((card) => (
          <Box key={card.title} sx={{ gridColumn: { xs: 'auto', md: 'span 6' } }}>
            <SummaryTaskCard card={card} />
          </Box>
        ))}
      </Box>

      <Box sx={{ maxWidth: 1100 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.6rem', md: '2rem' } }}>
            All Active Tasks
          </Typography>
          <Chip
            label={topReminderLabel}
            sx={{
              color: dashboardColors.secondary,
              backgroundColor: alpha(dashboardColors.secondary, 0.12),
              border: `1px solid ${alpha(dashboardColors.secondary, 0.24)}`,
            }}
          />
        </Stack>
        <Stack spacing={2}>
          {activeTasks.map((task) => (
            <ActiveTaskRow key={task.title} task={task} />
          ))}
        </Stack>
      </Box>

      <ModalPreview modalTitle={modalTitle} primaryActionLabel="New Task" />
    </>
  );
};
