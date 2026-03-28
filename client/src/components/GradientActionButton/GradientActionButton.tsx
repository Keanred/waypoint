import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import type { PropsWithChildren } from 'react';
import { dashboardColors } from '../../theme';

export function GradientActionButton({ children, sx, ...buttonProps }: PropsWithChildren<ButtonProps>) {
  return (
    <Button
      {...buttonProps}
      sx={[
        {
          py: 1.75,
          px: 3,
          borderRadius: 3,
          color: '#1a003b',
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          letterSpacing: '0.02em',
          background: `linear-gradient(
            135deg,
            ${dashboardColors.primary} 0%,
            ${dashboardColors.primaryContainer} 100%
          )`,
          '&:hover': {
            opacity: 0.92,
            background: `linear-gradient(
              135deg,
              ${dashboardColors.primary} 0%,
              ${dashboardColors.primaryContainer} 100%
            )`,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Button>
  );
}
