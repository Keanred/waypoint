import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DoNotDisturbOnRoundedIcon from '@mui/icons-material/DoNotDisturbOnRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

import { BottomNavBar } from '../components/BottomNavBar';
import { colors } from '../theme';
import { FocusTimer } from '../components/FocusTimer';
import { SideNavBar } from '../components/SideNavBar';
import { TaskSelectionModal } from './TaskSelectionModal';

export const FocusStudioPage = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: colors.surface,
        color: colors.onSurface,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Desktop Sidebar */}
      <SideNavBar
        appName="Waypoint"
        tagline="Productivity Engine"
        navItems={[
          { label: 'Dashboard', icon: <DashboardRoundedIcon /> },
          { label: 'Focus Studio', icon: <TimerRoundedIcon />, active: true },
          { label: 'Analytics', icon: <LeaderboardRoundedIcon /> },
          { label: 'Settings', icon: <SettingsRoundedIcon /> },
        ]}
      />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <Box
          component="header"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 80,
            px: 4,
            bgcolor: 'rgba(17, 19, 30, 0.8)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Left: Session label + active indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              sx={{
                fontFamily: 'Manrope',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'rgba(225, 225, 241, 0.5)',
              }}
            >
              Focus Session
            </Typography>
            <Box sx={{ width: 2, height: 16, bgcolor: 'rgba(74, 68, 81, 0.3)' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: colors.tertiary,
                  boxShadow: '0 0 8px rgba(117, 212, 232, 0.6)',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  color: colors.tertiary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}
              >
                Active
              </Typography>
            </Box>
          </Box>

          {/* Right: Search + actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                bgcolor: colors.surfaceContainer,
                px: 2,
                py: 1,
                borderRadius: 9999,
                border: '1px solid rgba(74, 68, 81, 0.1)',
              }}
            >
              <SearchRoundedIcon sx={{ color: colors.onSurfaceVariant, fontSize: '0.875rem', mr: 1 }} />
              <InputBase
                placeholder="Search Commands..."
                sx={{
                  color: colors.onSurface,
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  width: 140,
                  '& input': { p: 0 },
                  '& input::placeholder': {
                    color: 'rgba(150, 142, 156, 0.4)',
                    opacity: 1,
                  },
                }}
              />
            </Box>
            <IconButton sx={{ color: 'rgba(225, 225, 241, 0.5)', '&:hover': { color: colors.tertiary } }}>
              <NotificationsRoundedIcon />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.75,
                borderRadius: '8px',
                bgcolor: colors.surfaceContainerHigh,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  color: colors.primary,
                  textTransform: 'uppercase',
                }}
              >
                Zen Mode
              </Typography>
              <Switch
                checked={true}
                size="small"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: colors.onPrimary },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: colors.primary },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Main Focus Canvas */}
        <Box
          component="main"
          sx={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 3, md: 6 },
            overflow: 'hidden',
            background: `radial-gradient(circle at 50% 50%, ${colors.surfaceContainerLow} 0%, ${colors.surfaceContainerLowest} 100%)`,
          }}
        >
          {/* Atmospheric Glows */}
          <Box
            sx={{
              position: 'absolute',
              top: '25%',
              left: -80,
              width: 384,
              height: 384,
              bgcolor: 'rgba(215, 186, 255, 0.05)',
              borderRadius: '50%',
              filter: 'blur(120px)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '25%',
              right: -80,
              width: 320,
              height: 320,
              bgcolor: 'rgba(117, 212, 232, 0.05)',
              borderRadius: '50%',
              filter: 'blur(100px)',
            }}
          />

          {/* Current Task Context */}
          <Box sx={{ zIndex: 1, mb: 8, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 0.75,
                borderRadius: 9999,
                bgcolor: colors.surfaceContainer,
                border: '1px solid rgba(74, 68, 81, 0.2)',
                mb: 3,
                filter: 'drop-shadow(0 0 25px rgba(189, 147, 249, 0.2))',
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.error }} />
              <Typography
                sx={{
                  fontFamily: 'Manrope',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: colors.error,
                }}
              >
                High Priority
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, position: 'relative' }}>
              <Typography
                sx={{
                  fontFamily: 'Manrope',
                  fontSize: { xs: '2.5rem', md: '3.75rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: colors.onSurface,
                  mb: 1,
                }}
              >
                Finalize Project Horizon
              </Typography>
              <IconButton
                sx={{
                  color: colors.onSurfaceVariant,
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  'div:hover > &': { opacity: 1 },
                  '&:hover': { color: colors.onSurface, bgcolor: colors.surfaceContainer },
                  position: 'absolute',
                  right: -48,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
                title="Change Task"
              >
                <EditNoteRoundedIcon />
              </IconButton>
            </Box>
            <Typography
              sx={{
                fontSize: '1.125rem',
                color: 'rgba(150, 142, 156, 0.6)',
                mb: 4,
              }}
            >
              Sub-task: Review architectural documentation for sprint v2.4
            </Typography>

            {/* Session Goals */}
            <Box
              sx={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
                py: 2,
                px: 4,
                borderRadius: '16px',
                bgcolor: 'rgba(25, 27, 38, 0.3)',
                border: '1px solid rgba(74, 68, 81, 0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleRoundedIcon sx={{ fontSize: '0.875rem', color: colors.primary }} />
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: colors.onSurfaceVariant,
                  }}
                >
                  Review Docs
                </Typography>
              </Box>
              <Box sx={{ width: 1, height: 12, bgcolor: 'rgba(74, 68, 81, 0.3)' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RadioButtonUncheckedRoundedIcon sx={{ fontSize: '0.875rem', color: 'rgba(150, 142, 156, 0.4)' }} />
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: colors.onSurfaceVariant,
                  }}
                >
                  Update Architecture
                </Typography>
              </Box>
              <Box sx={{ width: 1, height: 12, bgcolor: 'rgba(74, 68, 81, 0.3)' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RadioButtonUncheckedRoundedIcon sx={{ fontSize: '0.875rem', color: 'rgba(150, 142, 156, 0.4)' }} />
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: colors.onSurfaceVariant,
                  }}
                >
                  Sync with Lead
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Timer */}
          <Box sx={{ zIndex: 1, mb: 8 }}>
            <FocusTimer minutes={25} seconds={0} progress={0} />
          </Box>

          {/* Focus Controls */}
          <Box
            sx={{
              zIndex: 1,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            <Button
              startIcon={<PauseCircleRoundedIcon sx={{ fontSize: '1.125rem' }} />}
              sx={{
                px: 4,
                py: 2,
                borderRadius: '12px',
                fontFamily: 'Manrope',
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(225, 225, 241, 0.6)',
                '&:hover': { color: colors.onSurface, bgcolor: colors.surfaceContainerHigh },
              }}
            >
              Pause
            </Button>

            <Button
              sx={{
                px: 6,
                py: 2.5,
                borderRadius: 9999,
                background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryContainer})`,
                color: colors.onPrimary,
                fontFamily: 'Manrope',
                fontSize: '0.875rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                '&:hover': {
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryContainer})`,
                  opacity: 0.9,
                },
                '&:active': { transform: 'scale(0.95)' },
              }}
              startIcon={<CheckCircleRoundedIcon sx={{ fontVariationSettings: "'FILL' 1" }} />}
            >
              Complete Task
            </Button>

            <Button
              startIcon={<SkipNextRoundedIcon sx={{ fontSize: '1.125rem' }} />}
              sx={{
                px: 4,
                py: 2,
                borderRadius: '12px',
                fontFamily: 'Manrope',
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(225, 225, 241, 0.6)',
                '&:hover': { color: colors.onSurface, bgcolor: colors.surfaceContainerHigh },
              }}
            >
              Skip
            </Button>
          </Box>

          {/* Change Current Focus */}
          <Box sx={{ zIndex: 1, mt: 6 }}>
            <Button
              startIcon={<AddTaskRoundedIcon sx={{ fontSize: '0.875rem' }} />}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 9999,
                border: '1px solid rgba(215, 186, 255, 0.3)',
                bgcolor: 'rgba(215, 186, 255, 0.05)',
                color: colors.primary,
                fontFamily: 'Manrope',
                fontSize: '0.625rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                '&:hover': { bgcolor: 'rgba(215, 186, 255, 0.1)' },
              }}
            >
              Change Current Focus
            </Button>
          </Box>

          {/* Secondary Metadata Grid */}
          <Box
            sx={{
              zIndex: 1,
              mt: 10,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
              width: '100%',
              maxWidth: 896,
            }}
          >
            {/* Focus Score */}
            <Box
              sx={{
                p: 3,
                borderRadius: '16px',
                bgcolor: 'rgba(25, 27, 38, 0.4)',
                border: '1px solid rgba(74, 68, 81, 0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  color: colors.onSurfaceVariant,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  mb: 2,
                }}
              >
                Focus Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                <Typography
                  sx={{ fontSize: '1.875rem', fontFamily: 'Manrope', fontWeight: 800, color: colors.tertiary }}
                >
                  98%
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(117, 212, 232, 0.6)', mb: 0.5 }}>
                  +4% from avg
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 6,
                  bgcolor: colors.surfaceContainerHighest,
                  borderRadius: 9999,
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: '98%',
                    bgcolor: colors.tertiary,
                    borderRadius: 9999,
                    boxShadow: '0 0 8px rgba(117, 212, 232, 0.4)',
                  }}
                />
              </Box>
            </Box>

            {/* Today's Sessions */}
            <Box
              sx={{
                p: 3,
                borderRadius: '16px',
                bgcolor: 'rgba(25, 27, 38, 0.4)',
                border: '1px solid rgba(74, 68, 81, 0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  color: colors.onSurfaceVariant,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  mb: 2,
                }}
              >
                Today&apos;s Sessions
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'flex', '& > *:not(:first-of-type)': { ml: -1 } }}>
                  {[1, 2].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: colors.primary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #0b0e18',
                      }}
                    >
                      <TimerRoundedIcon sx={{ color: colors.onPrimary, fontSize: '0.75rem' }} />
                    </Box>
                  ))}
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: colors.surfaceContainerHighest,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #0b0e18',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      color: colors.onSurfaceVariant,
                    }}
                  >
                    +4
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, ml: 1 }}>
                  6 Deep Blocks
                </Typography>
              </Box>
            </Box>

            {/* Current Playlist */}
            <Box
              sx={{
                p: 3,
                borderRadius: '16px',
                bgcolor: 'rgba(25, 27, 38, 0.4)',
                border: '1px solid rgba(74, 68, 81, 0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  color: colors.onSurfaceVariant,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  mb: 2,
                }}
              >
                Current Playlist
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    bgcolor: colors.secondaryContainer,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EqualizerRoundedIcon sx={{ color: colors.onSecondaryContainer }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: colors.onSurface }}>
                    Midnight Lo-Fi
                  </Typography>
                  <Typography sx={{ fontSize: '0.625rem', color: colors.onSurfaceVariant }}>
                    Chillhop Beats
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Zen Mode Decorative Elements */}
          {
            <Box
              sx={{
                position: 'absolute',
                bottom: 32,
                right: 48,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 4,
                opacity: 0.4,
                transition: 'opacity 0.5s',
                '&:hover': { opacity: 1 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WaterDropRoundedIcon sx={{ fontSize: '0.875rem', color: colors.tertiary }} />
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}
                >
                  Ambient Rain
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DoNotDisturbOnRoundedIcon sx={{ fontSize: '0.875rem', color: colors.primary }} />
                <Typography
                  sx={{
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}
                >
                  Notifications Muted
                </Typography>
              </Box>
            </Box>
          }
        </Box>
      </Box>

      {/* Mobile Navigation */}
      <BottomNavBar
        items={[
          { label: 'Focus', icon: <TimerRoundedIcon />, active: true },
          { label: 'Home', icon: <HomeRoundedIcon /> },
          { label: 'Tasks', icon: <FormatListBulletedRoundedIcon /> },
          { label: 'Settings', icon: <SettingsRoundedIcon /> },
        ]}
      />

      {/* Task Selection Modal */}
      <TaskSelectionModal isOpen={false} onClose={() => {}} />
    </Box>
  );
};
