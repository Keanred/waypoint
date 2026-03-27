import { Box, Typography } from '@mui/material'
import { dashboardColors } from '../../theme'

export function WorkspaceIdentity({
  title,
  subtitle,
  titleVariant = 'h4',
}: {
  title: string
  subtitle: string
  titleVariant?: 'h4' | 'h3' | 'h2'
}) {
  return (
    <Box>
      <Typography
        variant={titleVariant}
        sx={{ color: titleVariant === 'h4' ? dashboardColors.primary : 'text.primary', letterSpacing: '-0.05em' }}
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {subtitle}
      </Typography>
    </Box>
  )
}
