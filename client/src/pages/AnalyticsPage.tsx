import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import LeakAddRoundedIcon from '@mui/icons-material/LeakAddRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { PageLayout } from '../components/PageLayout';
import { StatCard } from '../components/StatCard';
import { colors } from '../theme';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;
const BAR_HEIGHTS = ['40%', '60%', '55%', '85%', '45%', '30%', '25%'] as const;

export const AnalyticsPage = () => {
  return (
    <PageLayout
      sidebar={{
        appName: 'Waypoint',
        tagline: 'High-End Productivity',
        navItems: [
          { label: 'Overview', icon: <DashboardRoundedIcon />, to: '/' },
          { label: 'Focus Studio', icon: <TimerRoundedIcon />, to: '/focus' },
          { label: 'Analytics', icon: <InsightsRoundedIcon />, active: true, to: '/analytics' },
          { label: 'Completed', icon: <CheckCircleRoundedIcon /> },
        ],
        actionLabel: 'New Task',
        footerItems: [
          { label: 'Help', icon: <HelpOutlineRoundedIcon /> },
          { label: 'Logout', icon: <LogoutRoundedIcon /> },
        ],
      }}
      topBar={null}
      bottomNav={[
        { label: 'Home', icon: <HomeRoundedIcon />, to: '/' },
        { label: 'Tasks', icon: <FormatListBulletedRoundedIcon />, to: '/focus' },
        { label: 'Alerts', icon: <AlarmRoundedIcon />, to: '/analytics' },
        { label: 'Settings', icon: <SettingsRoundedIcon />, to: '/settings' },
      ]}
      maxWidth={1600}
      mainSx={{ p: { xs: 4, lg: 6 }, pb: { xs: 16, lg: 6 } }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          mb: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { md: 'flex-end' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        <Box sx={{ '& > *': { lineHeight: 1.2 } }}>
          <Typography
            sx={{
              fontSize: '2.25rem',
              fontWeight: 800,
              fontFamily: 'Manrope',
              letterSpacing: '-0.025em',
            }}
          >
            Productivity{' '}
            <Typography
              component="span"
              sx={{ color: colors.primary, fontSize: 'inherit', fontWeight: 'inherit', fontFamily: 'inherit' }}
            >
              Analytics
            </Typography>
          </Typography>
          <Typography sx={{ color: colors.onSurfaceVariant, fontSize: '0.875rem', fontWeight: 500 }}>
            Visualizing your cognitive momentum.
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 2,
            bgcolor: colors.surfaceContainerLow,
            p: 1,
            borderRadius: '1rem',
            border: `1px solid ${colors.outlineVariant}1A`,
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              borderRadius: '12px',
              bgcolor: `${colors.primary}1A`,
              border: `1px solid ${colors.primary}33`,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <LocalFireDepartmentRoundedIcon sx={{ fontSize: 16, color: colors.primary }} />
            <Typography
              sx={{
                fontFamily: 'Manrope',
                fontWeight: 700,
                color: colors.primary,
                letterSpacing: '-0.025em',
                fontSize: '0.875rem',
              }}
            >
              7-Day Streak
            </Typography>
          </Box>
          <Box sx={{ height: 32, width: 1, bgcolor: `${colors.outlineVariant}33` }} />
          <Box
            component="img"
            alt="Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcq5wpHQ-aKRjp5meSrRX-7FsKWCpSITzsw8bWFeuZX4zOH7n9yXPLfmMdu7Lvw39jmuPgHgbywGBXQSuDMryWEV_ygDde28Ii4gLxXxSp3m3YuEqdcl9XOgYILisDedz5_tfV-a_4QwZ8ZI99LO6fGwOPZFDTQn5o-7nrm_m68o3CNYxWIdCsiN1iCdf-1O2iXNCrgbcEa4JMaFzxKbTnwOMHAeOxuc8zWZWNpX56LfL65z_5fErZoIgMuEVUZBCq_D-uJh3pOUrN"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: `1px solid ${colors.outlineVariant}4D`,
            }}
          />
        </Box>
      </Box>

      {/* Bento Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
          gap: 4,
        }}
      >
        {/* AI Productivity Score */}
        <Box
          component="section"
          sx={{
            gridColumn: { md: 'span 7', lg: 'span 8' },
            bgcolor: colors.surfaceContainerLow,
            borderRadius: '2rem',
            p: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 5,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
            border: `1px solid ${colors.outlineVariant}0D`,
          }}
        >
          {/* Glow */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 256,
              height: 256,
              bgcolor: `${colors.primary}0D`,
              borderRadius: '50%',
              filter: 'blur(100px)',
              mr: -16,
              mt: -16,
            }}
          />
          {/* Radial Score */}
          <Box
            sx={{
              position: 'relative',
              width: 224,
              height: 224,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke={colors.surfaceContainerHighest} strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={colors.primary}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="282.7"
                strokeDashoffset="45"
                style={{ filter: `drop-shadow(0 0 12px ${colors.primary}4D)` }}
              />
            </svg>
            <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'Manrope', letterSpacing: '-0.05em' }}>
                84
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.625rem',
                  color: colors.onSurfaceVariant,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Score
              </Typography>
            </Box>
          </Box>
          {/* Insight Text */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  gap: 1,
                  px: 1.5,
                  py: 0.5,
                  bgcolor: `${colors.tertiary}1A`,
                  color: colors.tertiary,
                  borderRadius: '9999px',
                  border: `1px solid ${colors.tertiary}33`,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: colors.tertiary,
                    animation: 'pulse 2s infinite',
                  }}
                />
                <Typography
                  sx={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  Status: Peak Performance
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Manrope' }}>
                Intelligence Insight
              </Typography>
              <Typography sx={{ color: colors.onSurfaceVariant, lineHeight: 1.6 }}>
                You are{' '}
                <Typography component="span" sx={{ color: colors.tertiary, fontWeight: 700 }}>
                  12% more efficient
                </Typography>{' '}
                than last week. Your prime focus hours are{' '}
                <Typography component="span" sx={{ color: colors.primary, fontWeight: 700 }}>
                  9 AM - 11 AM
                </Typography>
                . Keep this window clear for deep work.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <StatCard value="+12.4%" label="Weekly Delta" valueColor={colors.tertiary} />
              <StatCard value="6.4h" label="Focus Yield" valueColor={colors.primary} />
            </Box>
          </Box>
        </Box>

        {/* Streak & Momentum Card */}
        <Box
          component="section"
          sx={{
            gridColumn: { md: 'span 5', lg: 'span 4' },
            bgcolor: colors.surfaceContainerLow,
            borderRadius: '2rem',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: `1px solid ${colors.outlineVariant}0D`,
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.3)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '1rem',
                bgcolor: colors.secondaryContainer,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BoltRoundedIcon sx={{ color: colors.secondary }} />
            </Box>
            <Typography
              sx={{ color: colors.onSurfaceVariant, fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Manrope' }}
            >
              MOMENTUM
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{
                fontSize: '3rem',
                fontWeight: 900,
                fontFamily: 'Manrope',
                letterSpacing: '-0.05em',
                display: 'flex',
                alignItems: 'baseline',
                gap: 1,
              }}
            >
              7
              <Typography
                component="span"
                sx={{ fontSize: '1.25rem', color: colors.onSurfaceVariant, letterSpacing: 'normal' }}
              >
                days
              </Typography>
            </Typography>
            <Typography sx={{ color: colors.onSurfaceVariant, mt: 1, fontWeight: 500 }}>
              Uninterrupted focus streak maintained.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, mt: 2 }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  height: 6,
                  flex: 1,
                  borderRadius: '9999px',
                  bgcolor: colors.primary,
                  filter: `drop-shadow(0 0 12px ${colors.primary}4D)`,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Focus Distribution */}
        <Box
          component="section"
          sx={{
            gridColumn: { md: 'span 6', lg: 'span 4' },
            bgcolor: colors.surfaceContainer,
            borderRadius: '2rem',
            p: 4,
            border: `1px solid ${colors.outlineVariant}0D`,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: colors.onSurfaceVariant,
              mb: 4,
            }}
          >
            Focus Distribution
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {/* Donut Chart */}
            <Box sx={{ position: 'relative', width: 160, height: 160 }}>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: `12px solid ${colors.surfaceContainerHighest}`,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  borderWidth: 12,
                  borderStyle: 'solid',
                  borderColor: `${colors.primary} transparent transparent ${colors.primary}`,
                  transform: 'rotate(-15deg)',
                  filter: `drop-shadow(0 0 12px ${colors.primary}4D)`,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  borderWidth: 12,
                  borderStyle: 'solid',
                  borderColor: `transparent ${colors.tertiary} ${colors.tertiary} transparent`,
                  transform: 'rotate(60deg)',
                  filter: `drop-shadow(0 0 8px ${colors.tertiary}66)`,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Manrope' }}>40h</Typography>
                <Typography
                  sx={{ fontSize: '9px', color: colors.onSurfaceVariant, fontWeight: 900, letterSpacing: '0.1em' }}
                >
                  TOTAL
                </Typography>
              </Box>
            </Box>
            {/* Legend */}
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { color: colors.primary, label: 'Urgent', value: '45%' },
                { color: colors.tertiary, label: 'High Priority', value: '30%' },
                { color: colors.onSurfaceVariant, label: 'Medium/Low', value: '25%', dimmed: true },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    opacity: item.dimmed ? 0.5 : 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.label}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700 }}>{item.value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Velocity Trends */}
        <Box
          component="section"
          sx={{
            gridColumn: { md: 'span 6', lg: 'span 8' },
            bgcolor: colors.surfaceContainer,
            borderRadius: '2rem',
            p: 4,
            border: `1px solid ${colors.outlineVariant}0D`,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: colors.onSurfaceVariant,
              }}
            >
              Velocity Trends
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: colors.tertiary,
                  bgcolor: `${colors.tertiary}1A`,
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                }}
              >
                7D
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: colors.onSurfaceVariant,
                  px: 1,
                  py: 0.5,
                  cursor: 'pointer',
                  '&:hover': { color: colors.onSurface },
                }}
              >
                30D
              </Typography>
            </Box>
          </Box>
          {/* Bar Chart */}
          <Box
            sx={{
              height: 192,
              width: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 0.5,
              position: 'relative',
            }}
          >
            {/* Grid Lines */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pointerEvents: 'none',
                opacity: 0.1,
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <Box key={i} sx={{ borderTop: `1px solid ${colors.onSurfaceVariant}` }} />
              ))}
            </Box>
            {/* Bars */}
            {DAYS.map((day, i) => {
              const isHighlight = i === 3;
              return (
                <Box key={day} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Box
                    sx={{
                      width: '100%',
                      bgcolor: isHighlight ? `${colors.primary}66` : `${colors.tertiary}33`,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      height: BAR_HEIGHTS[i],
                      transition: 'background-color 0.2s',
                      ...(!isHighlight && { '&:hover': { bgcolor: `${colors.tertiary}66` } }),
                      ...(isHighlight && { filter: `drop-shadow(0 0 12px ${colors.primary}4D)` }),
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '10px',
                      fontWeight: isHighlight ? 900 : 700,
                      color: isHighlight ? colors.onSurface : colors.onSurfaceVariant,
                    }}
                  >
                    {day}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* AI Bottleneck Detector */}
        <Box
          component="section"
          sx={{
            gridColumn: { md: 'span 12' },
            bgcolor: colors.surfaceContainerHigh,
            borderRadius: '2rem',
            p: 4,
            border: `1px solid ${colors.outlineVariant}1A`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: `${colors.primary}33`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ color: colors.primary }} />
            </Box>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Manrope' }}>
              AI Bottleneck Detector
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                p: 3,
                bgcolor: colors.surfaceContainer,
                borderRadius: '1rem',
                border: `1px solid ${colors.primary}1A`,
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: `${colors.primary}4D` },
              }}
            >
              <TimerRoundedIcon sx={{ color: colors.primary, mt: 0.5 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography sx={{ fontWeight: 700 }}>Communication Drag</Typography>
                <Typography sx={{ fontSize: '0.875rem', color: colors.onSurfaceVariant, lineHeight: 1.6 }}>
                  Drafting emails takes{' '}
                  <Typography component="span" sx={{ color: colors.primary, fontWeight: 700, fontSize: 'inherit' }}>
                    40% longer
                  </Typography>{' '}
                  than your historical average. Suggest using templates.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                p: 3,
                bgcolor: colors.surfaceContainer,
                borderRadius: '1rem',
                border: `1px solid ${colors.tertiary}1A`,
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: `${colors.tertiary}4D` },
              }}
            >
              <LeakAddRoundedIcon sx={{ color: colors.tertiary, mt: 0.5 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography sx={{ fontWeight: 700 }}>Context Switching</Typography>
                <Typography sx={{ fontSize: '0.875rem', color: colors.onSurfaceVariant, lineHeight: 1.6 }}>
                  Frequent context switching detected between{' '}
                  <Typography component="span" sx={{ color: colors.tertiary, fontWeight: 700, fontSize: 'inherit' }}>
                    2 PM and 3 PM
                  </Typography>
                  . Block this hour for unified tasks.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};
