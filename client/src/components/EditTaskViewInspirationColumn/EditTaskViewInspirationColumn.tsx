import { Box, Stack, Typography } from '@mui/material';
import { dashboardColors } from '../../theme';
import { StatusOrb } from '../StatusOrb';
import { SurfacePanel } from '../SurfacePanel';
import { WorkspaceIdentity } from '../WorkspaceIdentity';

interface EditTaskViewInspirationColumnProps {
  brandTitle: string;
  brandSubtitle: string;
  focusTip: string;
  imageAlt: string;
  imageUrl: string;
}

export const EditTaskViewInspirationColumn = ({
  brandTitle,
  brandSubtitle,
  focusTip,
  imageAlt,
  imageUrl,
}: EditTaskViewInspirationColumnProps) => {
  return (
    <Stack spacing={4} sx={{ display: { xs: 'none', lg: 'flex' } }}>
      <WorkspaceIdentity title={brandTitle} subtitle={brandSubtitle} titleVariant="h3" />

      <SurfacePanel variant="low" sx={{ p: 3, borderRadius: 3.5 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <StatusOrb accent={dashboardColors.secondary} />
            <Typography
              variant="caption"
              sx={{
                color: dashboardColors.secondary,
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Focus Tip
            </Typography>
          </Stack>
          <Typography sx={{ fontStyle: 'italic', lineHeight: 1.8 }}>{focusTip}</Typography>
        </Stack>
      </SurfacePanel>

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3.5,
          aspectRatio: '4 / 5',
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={imageAlt}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0b0e18, transparent 55%)',
          }}
        />
      </Box>
    </Stack>
  );
};
