import type { PropsWithChildren } from 'react'
import { alpha, Paper } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import { dashboardColors } from '../../theme'

type PanelVariant = 'default' | 'low' | 'high' | 'glass'

const panelBackgrounds: Record<PanelVariant, string> = {
  default: dashboardColors.surfaceContainer,
  low: dashboardColors.surfaceLow,
  high: dashboardColors.surfaceContainerHigh,
  glass: alpha(dashboardColors.surfaceContainerHighest, 0.8),
}

export function SurfacePanel({
  children,
  variant = 'default',
  sx,
}: PropsWithChildren<{ variant?: PanelVariant; sx?: SxProps<Theme> }>) {
  return (
    <Paper
      elevation={0}
      sx={[
        {
          borderRadius: 4,
          backgroundColor: panelBackgrounds[variant],
          border: `1px solid ${alpha(dashboardColors.outlineVariant, variant === 'glass' ? 0.08 : 0.18)}`,
          ...(variant === 'glass'
            ? {
                backdropFilter: 'blur(20px)',
                boxShadow: '0 16px 32px rgba(182, 141, 242, 0.08)',
              }
            : null),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Paper>
  )
}
