import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

interface NavLink {
  label: string;
  active?: boolean;
}

interface TopAppBarProps {
  brandName: string;
  navLinks: NavLink[];
  addButtonLabel: string;
  searchPlaceholder?: string;
}

export const TopAppBar = ({
  brandName,
  navLinks,
  addButtonLabel,
  searchPlaceholder = 'Search objectives...',
}: TopAppBarProps) => {
  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        width: { xs: '100%', lg: 'calc(100% - 16rem)' },
        zIndex: 50,
        background: 'linear-gradient(to bottom, #191b26, transparent)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 80,
          px: 4,
          maxWidth: 1440,
          mx: 'auto',
        }}
      >
        {/* Left: Brand + Nav */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 900,
              color: '#d7baff',
              fontStyle: 'italic',
              fontFamily: 'Manrope',
              letterSpacing: '-0.025em',
            }}
          >
            {brandName}
          </Typography>
          <Box
            component="nav"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 3,
              fontFamily: 'Manrope',
              fontWeight: 700,
              fontSize: '0.875rem',
            }}
          >
            {navLinks.map((link) => (
              <Box
                key={link.label}
                component="a"
                href="#"
                sx={{
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  ...(link.active
                    ? {
                        color: '#d7baff',
                        borderBottom: '2px solid #bd93f9',
                        pb: 0.5,
                      }
                    : {
                        color: '#94a3b8',
                        '&:hover': { color: '#e1e1f1' },
                      }),
                }}
              >
                {link.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right: Search + Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              bgcolor: 'rgba(50, 52, 64, 0.5)',
              px: 2,
              py: 1,
              borderRadius: 9999,
              border: '1px solid rgba(74, 68, 81, 0.2)',
              '&:focus-within': { borderColor: 'rgba(215, 186, 255, 0.6)' },
              transition: 'all 0.2s',
            }}
          >
            <SearchRoundedIcon sx={{ color: '#968e9c', fontSize: '1.25rem', mr: 1 }} />
            <InputBase
              placeholder={searchPlaceholder}
              sx={{
                color: '#e1e1f1',
                fontSize: '0.875rem',
                width: 192,
                '& input': { p: 0 },
              }}
            />
          </Box>
          <IconButton sx={{ '&:hover': { bgcolor: '#272935' }, borderRadius: '8px' }}>
            <NotificationsRoundedIcon sx={{ color: '#e1e1f1' }} />
          </IconButton>
          <Button
            sx={{
              bgcolor: '#bd93f9',
              color: '#11131e',
              px: 2,
              py: 1,
              borderRadius: '8px',
              fontWeight: 700,
              fontFamily: 'Manrope',
              fontSize: '0.875rem',
              textTransform: 'none',
              '&:hover': { opacity: 0.9, bgcolor: '#bd93f9' },
              '&:active': { transform: 'scale(0.95)' },
            }}
          >
            {addButtonLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
