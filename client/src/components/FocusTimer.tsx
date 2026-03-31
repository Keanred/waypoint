import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { colors } from '../theme';

interface FocusTimerProps {
  minutes: number;
  seconds: number;
  /** 0 to 1 representing progress around the circle */
  progress: number;
}

export const FocusTimer = ({ minutes, seconds, progress }: FocusTimerProps) => {
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: 320, md: 480 },
        height: { xs: 320, md: 480 },
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 100 100"
        sx={{
          width: '100%',
          height: '100%',
          transform: 'rotate(-90deg)',
        }}
      >
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="rgba(39, 41, 53, 0.4)"
          strokeWidth="0.8"
        />
        {/* Progress arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke={colors.tertiary}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            filter: 'drop-shadow(0 0 15px rgba(117, 212, 232, 0.3))',
            transition: 'stroke-dashoffset 1s linear',
          }}
        />
      </Box>
      {/* Time display */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Manrope',
            fontSize: { xs: '5rem', md: '8rem' },
            fontWeight: 900,
            letterSpacing: '-0.05em',
            color: colors.onSurface,
            lineHeight: 1,
          }}
        >
          {timeDisplay}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Manrope',
            fontSize: '0.625rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            color: 'rgba(117, 212, 232, 0.7)',
            mt: -0.5,
          }}
        >
          Minutes Remaining
        </Typography>
      </Box>
    </Box>
  );
};
