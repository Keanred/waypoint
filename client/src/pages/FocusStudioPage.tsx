import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import {
  default as CheckCircleRoundedIcon,
  default as RadioButtonCheckedRoundedIcon,
} from '@mui/icons-material/CheckCircleRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { useEffect, useRef, useState } from 'react';
import { BottomNavBar } from '../components/BottomNavBar';
import { FocusTimer } from '../components/FocusTimer';
import { SideNavBar } from '../components/SideNavBar';
import { createBottomNavItems, createSidebarConfig } from '../components/SidebarConfig';
import { completeTaskMutation, useTasksQuery } from '../tasksQuery';
import { colors } from '../theme';
import { NorthStarModal } from './NorthStarModal';

const focusDurationSeconds = 25 * 60;
const breakDurationSeconds = 5 * 60;
type TimerPhase = 'focus' | 'break';

export const FocusStudioPage = () => {
  const sidebarConfig = createSidebarConfig('focus', {
    actionLabel: undefined,
    actionIcon: undefined,
    footerItems: undefined,
  });
  const low = colors.surfaceContainerLow;
  const lowest = colors.surfaceContainerLowest;
  const focusCanvasBg = `radial-gradient(circle at 50% 50%, ${low} 0%, ${lowest} 100%)`;
  const [isZenMode, setZenMode] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(true);
  const toggleZenMode = () => setZenMode((prev) => !prev);
  const openTaskModal = () => setIsTaskModalOpen(true);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[] | null>(null);

  const [timerPhase, setTimerPhase] = useState<TimerPhase>('focus');
  const [remainingSeconds, setRemainingSeconds] = useState(focusDurationSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const clearTimerInterval = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isTaskModalOpen || !isTimerRunning) {
      clearTimerInterval();
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        }

        const nextPhase: TimerPhase = timerPhase === 'focus' ? 'break' : 'focus';
        setTimerPhase(nextPhase);
        return nextPhase === 'focus' ? focusDurationSeconds : breakDurationSeconds;
      });
    }, 1000);

    return () => clearTimerInterval();
  }, [isTaskModalOpen, isTimerRunning, timerPhase]);

  const handlePause = () => {
    setIsTimerRunning(false);
    clearTimerInterval();
  };

  const handleResume = () => {
    setIsTimerRunning(true);
  };

  const handleSkip = () => {
    const nextPhase: TimerPhase = timerPhase === 'focus' ? 'break' : 'focus';
    setTimerPhase(nextPhase);
    setRemainingSeconds(nextPhase === 'focus' ? focusDurationSeconds : breakDurationSeconds);
  };

  const currentDuration = timerPhase === 'focus' ? focusDurationSeconds : breakDurationSeconds;
  const timerMinutes = Math.floor(remainingSeconds / 60);
  const timerSeconds = remainingSeconds % 60;
  const timerProgress = 1 - remainingSeconds / currentDuration;

  const { data: tasks, isPending, isError } = useTasksQuery();
  const { mutate: completeTask } = completeTaskMutation();

  if (isPending) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          bgcolor: colors.surface,
          color: colors.onSurface,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Typography sx={{ fontSize: '1.25rem', color: colors.onSurfaceVariant }}>Loading tasks...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          bgcolor: colors.surface,
          color: colors.onSurface,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Typography sx={{ fontSize: '1.25rem', color: colors.error }}>Failed to load tasks.</Typography>
      </Box>
    );
  }

  const selectedTasks = selectedTaskIds ? (tasks?.tasks.filter((task) => selectedTaskIds.includes(task.id)) ?? []) : [];
  const selectedTask = selectedTasks[0] ?? null;

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
        appName={sidebarConfig.appName}
        tagline={sidebarConfig.tagline}
        navItems={sidebarConfig.navItems}
        actionLabel={sidebarConfig.actionLabel}
        actionIcon={sidebarConfig.actionIcon}
        footerItems={sidebarConfig.footerItems}
      />
      <NorthStarModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        tasks={tasks}
        selectedTaskIds={selectedTaskIds}
        onSelectTask={setSelectedTaskIds}
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
                checked={isZenMode}
                size="small"
                onClick={toggleZenMode}
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
            background: focusCanvasBg,
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
                {selectedTask?.priority ?? 'No Priority'}
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
                {selectedTask?.title ?? 'Select Your North Star'}
              </Typography>
              <IconButton
                onClick={openTaskModal}
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
              {selectedTask?.description
                ? `Sub-task: ${selectedTask.description}`
                : 'Choose a task to begin focus mode.'}
            </Typography>

            {/* Session Goals */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                py: 2,
                px: 4,
                borderRadius: '16px',
                bgcolor: 'rgba(25, 27, 38, 0.3)',
                border: '1px solid rgba(74, 68, 81, 0.1)',
                backdropFilter: 'blur(8px)',
                width: '100%',
                maxWidth: 360,
                mx: 'auto',
              }}
            >
              {selectedTasks.length > 0 ? (
                selectedTasks.map((task, i) => (
                  <Box
                    key={task.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      py: 1,
                      borderBottom: '1px solid rgba(74, 68, 81, 0.18)',
                      '&:last-of-type': {
                        borderBottom: 'none',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: colors.onSurfaceVariant,
                        textAlign: 'left',
                      }}
                    >
                      {task.title}
                    </Typography>
                    {i === 0 ? (
                      <RadioButtonCheckedRoundedIcon
                        sx={{ fontSize: '0.95rem', color: 'rgba(150, 142, 156, 0.7)', flexShrink: 0 }}
                      />
                    ) : (
                      <RadioButtonUncheckedRoundedIcon
                        sx={{ fontSize: '0.95rem', color: 'rgba(150, 142, 156, 0.7)', flexShrink: 0 }}
                      />
                    )}
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: colors.onSurfaceVariant,
                      textAlign: 'left',
                    }}
                  >
                    No specific goals for this session.
                  </Typography>
                  <RadioButtonUncheckedRoundedIcon
                    sx={{ fontSize: '0.95rem', color: 'rgba(150, 142, 156, 0.7)', flexShrink: 0 }}
                  />
                </Box>
              )}
            </Box>
          </Box>

          {/* Timer */}
          <Box sx={{ zIndex: 1, mb: 8 }}>
            <FocusTimer minutes={timerMinutes} seconds={timerSeconds} progress={timerProgress} />
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
              onClick={isTimerRunning ? handlePause : handleResume}
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
              {isTimerRunning ? 'Pause' : 'Resume'}
            </Button>

            <Button
              onClick={() => {
                if (selectedTaskIds) {
                  completeTask(selectedTaskIds[0]);
                }
              }}
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
              onClick={handleSkip}
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
              onClick={openTaskModal}
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

          {/* Zen Mode Decorative Elements */}
          {isZenMode && (
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
            ></Box>
          )}
        </Box>
      </Box>

      {/* Mobile Navigation */}
      <BottomNavBar items={createBottomNavItems('focus')} />
    </Box>
  );
};
