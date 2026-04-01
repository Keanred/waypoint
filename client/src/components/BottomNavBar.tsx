import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { colors } from '../theme';

export interface BottomNavItem {
  label: string;
  icon: ReactNode;
  active?: boolean;
  to?: string;
}

interface BottomNavBarProps {
  items: BottomNavItem[];
}

export const BottomNavBar = ({ items }: BottomNavBarProps) => {
  const navigate = useNavigate();

  return (
    <Box
      component="nav"
      sx={{
        display: { xs: 'flex', lg: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        px: 2,
        pb: 3,
        pt: 1.5,
        bgcolor: 'rgba(17, 19, 30, 0.8)',
        backdropFilter: 'blur(24px)',
        borderTopLeftRadius: '2rem',
        borderTopRightRadius: '2rem',
        borderTop: '1px solid rgba(74, 68, 81, 0.2)',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.5)',
      }}
    >
      {items.map((item) => (
        <Box
          key={item.label}
          onClick={item.to ? () => navigate({ to: item.to }) : undefined}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            cursor: item.to ? 'pointer' : 'default',
            transition: 'transform 0.15s, color 0.2s',
            '&:active': { transform: 'scale(0.9)' },
            ...(item.active
              ? {
                  bgcolor: colors.primaryContainer,
                  color: colors.surface,
                  borderRadius: '16px',
                  px: 3,
                  py: 1,
                  boxShadow: `0 0 15px ${colors.primaryContainer}66`,
                }
              : {
                  color: colors.navInactive,
                  px: 2,
                  py: 1,
                  '&:hover': { color: colors.navHoverText },
                }),
          }}
        >
          {item.icon}
          <Typography
            sx={{
              fontFamily: 'Manrope',
              fontSize: '10px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mt: 0.5,
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
