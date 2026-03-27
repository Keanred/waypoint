import type { PropsWithChildren } from 'react'
import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material/Button'
import { dashboardColors } from '../../theme'

export function TonalActionButton({ children, sx, ...buttonProps }: PropsWithChildren<ButtonProps>) {
  return (
    <Button
      {...buttonProps}
      sx={[
        {
          py: 1.75,
          px: 3,
          borderRadius: 3,
          color: 'text.primary',
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          letterSpacing: '0.02em',
          backgroundColor: dashboardColors.surfaceContainerHighest,
          '&:hover': {
            backgroundColor: dashboardColors.surfaceBright,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Button>
  )
}
