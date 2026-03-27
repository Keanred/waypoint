import { alpha, Box, Button, Stack, Typography } from '@mui/material'
import { dashboardColors } from '../../theme'
import { GradientActionButton } from '../GradientActionButton'
import { SectionLabel } from '../SectionLabel'
import { SurfacePanel } from '../SurfacePanel'

export function ModalPreview({ modalTitle, primaryActionLabel }: { modalTitle: string; primaryActionLabel: string }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        display: { xs: 'none', xl: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        visibility: 'hidden',
        pointerEvents: 'none',
        backgroundColor: alpha(dashboardColors.surfaceContainerHighest, 0.8),
        backdropFilter: 'blur(20px)',
      }}
    >
      <SurfacePanel
        variant="high"
        sx={{
          width: '100%',
          maxWidth: 640,
          p: 4,
          opacity: 0,
          transform: 'scale(0.95)',
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          {modalTitle}
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Box sx={{ mb: 1 }}>
              <SectionLabel>Title</SectionLabel>
            </Box>
            <SurfacePanel variant="low" sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Enter task name...
              </Typography>
            </SurfacePanel>
          </Box>
          <Box>
            <Box sx={{ mb: 1 }}>
              <SectionLabel>Priority</SectionLabel>
            </Box>
            <Stack direction="row" spacing={1.5}>
              {[
                { label: 'Critical', color: dashboardColors.error },
                { label: 'Standard', color: dashboardColors.secondary },
                { label: 'Low', color: dashboardColors.tertiary },
              ].map((option) => (
                <Button
                  key={option.label}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2.5,
                    color: option.color,
                    backgroundColor: alpha(option.color, 0.1),
                    border: `1px solid ${alpha(option.color, 0.3)}`,
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Stack>
          </Box>
          <Stack direction="row" spacing={2}>
            <GradientActionButton
              fullWidth
            >
              {primaryActionLabel}
            </GradientActionButton>
            <Button
              sx={{
                minWidth: 120,
                py: 1.75,
                borderRadius: 3,
                color: 'text.secondary',
                backgroundColor: dashboardColors.surfaceLow,
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </SurfacePanel>
    </Box>
  )
}
