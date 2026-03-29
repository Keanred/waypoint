import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import { CreateReminderModal } from './pages/CreateReminderModal';
import { CreateTaskModal } from './pages/CreateTaskModal';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { waypointTheme } from './theme';

type Page = 'dashboard' | 'settings';

const App = () => {
  const [page] = useState<Page>('dashboard');
  const [showCreateTask] = useState(false);
  const [showCreateReminder] = useState(false);

  return (
    <ThemeProvider theme={waypointTheme}>
      <CssBaseline />
      {page === 'dashboard' && <DashboardPage />}
      {page === 'settings' && <SettingsPage />}
      {showCreateTask && <CreateTaskModal />}
      {showCreateReminder && <CreateReminderModal />}
    </ThemeProvider>
  );
};

export default App;
