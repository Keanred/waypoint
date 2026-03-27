import { ReactNode } from 'react'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import LayersRoundedIcon from '@mui/icons-material/LayersRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { alpha, Box, Typography } from '@mui/material'
import { dashboardColors } from '../../theme'
import { SurfacePanel } from '../SurfacePanel'

export interface TaskMetricCard {
  label: string
  value: string
  description: string
  accent: string
  icon: 'bolt' | 'warning' | 'layers'
}

export function metricIcon(icon: TaskMetricCard['icon']): ReactNode {
  if (icon === 'warning') {
    return <WarningAmberRoundedIcon sx={{ fontSize: 76 }} />
  }

  if (icon === 'layers') {
    return <LayersRoundedIcon sx={{ fontSize: 76 }} />
  }

  return <BoltRoundedIcon sx={{ fontSize: 76 }} />
}

export function MetricCard({ metric }: { metric: TaskMetricCard }) {
  return (
    <SurfacePanel variant="low" sx={{ p: 4, borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2, color: alpha(dashboardColors.textPrimary, 0.06) }}>
        {metricIcon(metric.icon)}
      </Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        {metric.label}
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, color: metric.accent, fontSize: '2.5rem' }}>
        {metric.value}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', maxWidth: 260 }}>
        {metric.description}
      </Typography>
    </SurfacePanel>
  )
}
