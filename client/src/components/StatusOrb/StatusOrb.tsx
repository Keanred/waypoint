import { Box } from '@mui/material'

export function StatusOrb({ accent, size = 8 }: { accent: string; size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: accent,
        boxShadow: `0 0 12px ${accent}`,
        flexShrink: 0,
      }}
    />
  )
}
