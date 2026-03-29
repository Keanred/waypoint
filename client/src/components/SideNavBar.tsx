import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

export interface NavItem {
  label: string;
  icon: ReactNode;
  active?: boolean;
}

interface SideNavBarProps {
  appName: string;
  tagline: string;
  navItems: NavItem[];
  footerItems?: NavItem[];
  actionLabel?: string;
  actionIcon?: ReactNode;
}

export const SideNavBar = ({ appName, tagline, navItems, footerItems, actionLabel, actionIcon }: SideNavBarProps) => {
  return (
    <Box
      component="aside"
      sx={{
        height: '100vh',
        width: 256,
        bgcolor: '#191b26',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        py: 4,
        gap: 2,
        position: 'sticky',
        top: 0,
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(to top right, #d7baff, #bd93f9)',
          }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: '#bd93f9',
              fontFamily: 'Manrope',
            }}
          >
            {appName}
          </Typography>
          <Typography
            sx={{
              fontSize: '10px',
              color: '#968e9c',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 500,
            }}
          >
            {tagline}
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Manrope',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
      >
        {navItems.map((item) => (
          <Box
            key={item.label}
            component="a"
            href="#"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1.5,
              px: 3,
              textDecoration: 'none',
              transition: 'transform 0.15s, background 0.2s, color 0.2s',
              '&:active': { transform: 'translateX(4px)' },
              ...(item.active
                ? {
                    bgcolor: '#272935',
                    color: '#d7baff',
                    borderTopRightRadius: 9999,
                    borderBottomRightRadius: 9999,
                    borderLeft: '4px solid #bd93f9',
                  }
                : {
                    color: '#6272a4',
                    '&:hover': { color: '#f8f8f2', bgcolor: '#1d1f2b' },
                  }),
            }}
          >
            {item.icon}
            <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          px: 3,
          mt: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          fontFamily: 'Manrope',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
      >
        {actionLabel && (
          <Button
            fullWidth
            sx={{
              mb: 2,
              background: 'linear-gradient(to right, #d7baff, #bd93f9)',
              color: '#411478',
              py: 1.5,
              borderRadius: '12px',
              fontWeight: 700,
              fontFamily: 'Manrope',
              textTransform: 'none',
              '&:hover': {
                opacity: 0.9,
                background: 'linear-gradient(to right, #d7baff, #bd93f9)',
              },
              '&:active': { transform: 'scale(0.95)' },
            }}
            startIcon={actionIcon}
          >
            {actionLabel}
          </Button>
        )}

        {footerItems?.map((item) => (
          <Box
            key={item.label}
            component="a"
            href="#"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1,
              color: '#6272a4',
              textDecoration: 'none',
              '&:hover': { color: '#f8f8f2', bgcolor: '#1d1f2b' },
              transition: 'all 0.2s',
            }}
          >
            {item.icon}
            <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
