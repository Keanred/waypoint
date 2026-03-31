import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

import { colors } from '../theme';

interface ModalOverlayProps {
  children: ReactNode;
  maxWidth?: number;
}

export const ModalOverlay = ({ children, maxWidth = 672 }: ModalOverlayProps) => {
  return (
    <>
      {/* Background ambient glow */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.2, pointerEvents: 'none' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 80,
            left: 40,
            width: 256,
            height: 256,
            bgcolor: colors.primary,
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 80,
            right: 40,
            width: 384,
            height: 384,
            bgcolor: '#b5c5fc',
            borderRadius: '50%',
            filter: 'blur(120px)',
          }}
        />
      </Box>

      {/* Backdrop + Centering */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          bgcolor: 'rgba(11, 14, 24, 0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Modal Container */}
        <Box
          sx={{
            width: '100%',
            maxWidth,
            borderRadius: '2.5rem',
            border: '1px solid rgba(74, 68, 81, 0.2)',
            overflow: 'hidden',
            backdropFilter: 'blur(24px)',
            bgcolor: 'rgba(29, 31, 43, 0.9)',
            boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(189, 147, 249, 0.1)',
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};
