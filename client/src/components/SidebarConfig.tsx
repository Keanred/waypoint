import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import type { ReactNode } from 'react';

import type { NavItem } from './SideNavBar';

export type SidebarItemKey = 'dashboard' | 'focus' | 'analytics' | 'settings';

type SidebarConfig = {
  appName: string;
  tagline: string;
  navItems: NavItem[];
  actionLabel?: string;
  actionIcon?: ReactNode;
  footerItems?: NavItem[];
};

type BaseSidebarItem = {
  key: SidebarItemKey;
  label: string;
  to: string;
  icon: ReactNode;
};

export type BottomNavItem = {
  label: string;
  icon: ReactNode;
  to: string;
  active?: boolean;
};

const BASE_NAV_ITEMS: BaseSidebarItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardRoundedIcon />, to: '/' },
  { key: 'focus', label: 'Focus Studio', icon: <TimerRoundedIcon />, to: '/focus' },
  { key: 'analytics', label: 'Analytics', icon: <InsightsRoundedIcon />, to: '/analytics' },
  { key: 'settings', label: 'Settings', icon: <SettingsRoundedIcon />, to: '/settings' },
];

const BASE_BOTTOM_NAV_ITEMS: BaseSidebarItem[] = [
  { key: 'dashboard', label: 'Home', icon: <HomeRoundedIcon />, to: '/' },
  { key: 'focus', label: 'Focus', icon: <TimerRoundedIcon />, to: '/focus' },
  { key: 'analytics', label: 'Analytics', icon: <InsightsRoundedIcon />, to: '/analytics' },
  { key: 'settings', label: 'Settings', icon: <SettingsRoundedIcon />, to: '/settings' },
];

const DEFAULT_SIDEBAR_CONFIG: Omit<SidebarConfig, 'navItems'> = {
  appName: 'Waypoint',
  tagline: 'Precision focus',
  actionLabel: 'New Focus Session',
  actionIcon: <BoltRoundedIcon sx={{ fontSize: '1rem' }} />,
  footerItems: [
    { label: 'Archive', icon: <ArchiveRoundedIcon /> },
    { label: 'Support', icon: <HelpOutlineRoundedIcon /> },
  ],
};

export const createSidebarConfig = (
  activeItem: SidebarItemKey,
  overrides: Partial<Omit<SidebarConfig, 'navItems'>> = {},
): SidebarConfig => {
  return {
    ...DEFAULT_SIDEBAR_CONFIG,
    ...overrides,
    navItems: BASE_NAV_ITEMS.map((item) => ({
      label: item.label,
      icon: item.icon,
      to: item.to,
      active: item.key === activeItem,
    })),
  };
};

export const createBottomNavItems = (activeItem: SidebarItemKey): BottomNavItem[] => {
  return BASE_BOTTOM_NAV_ITEMS.map((item) => ({
    label: item.label,
    icon: item.icon,
    to: item.to,
    active: item.key === activeItem,
  }));
};
