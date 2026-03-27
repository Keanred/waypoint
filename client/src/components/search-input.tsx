import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { alpha, Box, InputBase } from '@mui/material'
import { dashboardColors } from '../theme'

export function SearchInput({
  placeholder,
  width = 256,
}: {
  placeholder: string
  width?: number | string
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width,
        borderRadius: 2,
        backgroundColor: dashboardColors.surfaceContainerLowest,
        border: `1px solid ${alpha(dashboardColors.outlineVariant, 0.2)}`,
      }}
    >
      <SearchRoundedIcon
        sx={{
          position: 'absolute',
          left: 12,
          color: 'text.secondary',
          fontSize: 18,
          pointerEvents: 'none',
        }}
      />
      <InputBase
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        sx={{
          width: '100%',
          color: 'text.primary',
          fontSize: 14,
          px: 1.5,
          py: 1,
          pl: 5,
        }}
      />
    </Box>
  )
}
