import { alpha, Box, Stack, Typography } from '@mui/material'
import { dashboardColors } from '../../theme'
import { SurfacePanel } from '../SurfacePanel'

export function VelocityCard({ value }: { value: number }) {
  return (
    <SurfacePanel
      sx={{
        position: 'relative',
        p: { xs: 3, md: 4 },
        minHeight: 250,
        overflow: 'hidden',
      }}
    >
      <Stack justifyContent="space-between" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
        <Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
            Weekly Velocity
          </Typography>
          <Typography variant="h2">{value}%</Typography>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Box
            sx={{
              height: 8,
              borderRadius: 999,
              backgroundColor: dashboardColors.surfaceLow,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: `${value}%`,
                height: '100%',
                borderRadius: 999,
                backgroundColor: dashboardColors.tertiary,
                boxShadow: `0 0 12px ${dashboardColors.tertiary}`,
              }}
            />
          </Box>
        </Box>
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          right: -56,
          bottom: -56,
          width: 180,
          height: 180,
          borderRadius: '50%',
          backgroundColor: alpha(dashboardColors.primary, 0.2),
          filter: 'blur(60px)',
        }}
      />
    </SurfacePanel>
  )
}
