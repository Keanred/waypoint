import { Box, Stack, Typography } from '@mui/material'
import { SearchInput } from '../SearchInput'
import { SurfacePanel } from '../SurfacePanel'
import { FilterTag } from '../FilterTag'
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded'

export function FilterBento() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' }, gap: 2, mb: 4 }}>
      <SurfacePanel variant="low" sx={{ p: 3, gridColumn: { md: 'span 2' } }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          View Context
        </Typography>
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 2.5 }}>
          <FilterTag label="All Tasks" active />
          <FilterTag label="By Project" />
          <FilterTag label="Urgent Only" />
          <FilterTag label="Recurring" />
        </Stack>
      </SurfacePanel>

      <SurfacePanel variant="low" sx={{ p: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.16em', textTransform: 'uppercase', display: 'block', mb: 2.5 }}>
          Search
        </Typography>
        <SearchInput placeholder="Find a task..." width="100%" />
      </SurfacePanel>

      <SurfacePanel variant="low" sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          Sort
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2.5 }}>
          <Typography sx={{ fontWeight: 500 }}>Due Date</Typography>
          <SwapVertRoundedIcon sx={{ color: 'text.primary' }} />
        </Stack>
      </SurfacePanel>
    </Box>
  )
}
