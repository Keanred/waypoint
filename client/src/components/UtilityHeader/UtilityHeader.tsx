import { Box, Stack, Typography } from '@mui/material';
import { SearchInput } from '../SearchInput';

export function UtilityHeader({ searchPlaceholder, links }: { searchPlaceholder: string; links: string[] }) {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        position: 'fixed',
        top: 0,
        left: { md: 256 },
        right: 0,
        height: 64,
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: { md: 4, lg: 8 },
        zIndex: 40,
      }}
    >
      <Stack direction="row" spacing={4} alignItems="center">
        <SearchInput placeholder={searchPlaceholder} />
        <Stack direction="row" spacing={3}>
          {links.map((link) => (
            <Typography
              key={link}
              variant="body2"
              sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              {link}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
