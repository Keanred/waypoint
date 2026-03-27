import type { ReactNode } from 'react'
import { Typography } from '@mui/material'

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="caption"
      sx={{
        display: 'block',
        ml: 0.5,
        color: 'text.secondary',
        fontWeight: 800,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Typography>
  )
}
