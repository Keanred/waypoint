import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
  TasksView,
  tasksFooterItems,
  tasksHeaderLinks,
  tasksNavigationItems,
} from './pages/tasks-view'
import { dashboardColors, waypointTheme } from './theme'

function App() {
  return (
    <ThemeProvider theme={waypointTheme}>
      <CssBaseline />
      <TasksView
        workspaceName="Architect"
        workspaceTagline="Deep Work Mode"
        brandName="Nocturnal Architect"
        headerLinks={tasksHeaderLinks}
        navigationItems={tasksNavigationItems}
        footerItems={tasksFooterItems}
        title="Tasks"
        subtitle="Maintain your flow state. Focus on the architecture of your day."
        avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDpwVOlXQEyxh89G6_gLYSh63BbUB-Vj9rp6VrtDM-T73WDdxHT7O0GSrvL05qxX3cLKygsbANjXelhLLvX7dzRytS6DnxIL90JhvxLWT-2RyC1jxR1eyrHjCVmlHF_hRtJKssPGVG_ndn_3-A3k_DIyWSoRiOSGd-FJ3hUmi4XSwDLcCmearLcWlRmoiRYEU2SSdUOFY6O7flJu2LT9F6VCATjw-tZ6FR0lwGip8LTvkzwHRaqblOYSbzD2R9kqVzGKje0tAR7WeRk"
        tasks={[
          {
            title: 'Refactor Neural Engine Interface',
            description: 'Optimization of data pipelines',
            accent: dashboardColors.error,
            project: 'Project Phoenix',
            dueLabel: 'Today',
            dueSubtext: '22:00',
            dueAccent: dashboardColors.error,
            recurrence: 'Weekly',
            recurrenceType: 'sync',
            remindersCount: 4,
            reminderAccent: dashboardColors.secondary,
          },
          {
            title: 'UI Audit for V2.4 Launch',
            description: 'Reviewing visual consistency',
            accent: dashboardColors.secondary,
            project: 'Design System',
            dueLabel: 'Tomorrow',
            dueSubtext: '09:00',
            dueAccent: dashboardColors.secondary,
            recurrence: 'None',
            recurrenceType: 'none',
            remindersCount: 1,
          },
          {
            title: 'Quarterly Resource Planning',
            description: 'Fiscal year projection model',
            accent: dashboardColors.tertiary,
            project: 'Operations',
            dueLabel: 'Oct 24',
            dueSubtext: '15:00',
            dueAccent: dashboardColors.textPrimary,
            recurrence: 'Quarterly',
            recurrenceType: 'calendar',
            remindersCount: 0,
          },
          {
            title: 'Onboard New Lead Designer',
            description: 'Documentation and tooling access',
            accent: dashboardColors.secondary,
            project: 'HR / Team',
            dueLabel: 'Friday',
            dueSubtext: '11:00',
            dueAccent: dashboardColors.secondary,
            recurrence: 'None',
            recurrenceType: 'none',
            remindersCount: 2,
            reminderAccent: dashboardColors.secondary,
          },
          {
            title: 'Critical Security Patch Deployment',
            description: 'Vulnerability CVE-2023-4412',
            accent: dashboardColors.error,
            project: 'Project Phoenix',
            dueLabel: 'ASAP',
            dueSubtext: 'Urgent',
            dueAccent: dashboardColors.error,
            recurrence: 'None',
            recurrenceType: 'none',
            remindersCount: 8,
            reminderAccent: dashboardColors.secondary,
          },
        ]}
        metrics={[
          {
            label: 'Velocity',
            value: '84%',
            description: 'Task completion rate increased by 12% this week.',
            accent: dashboardColors.tertiary,
            icon: 'bolt',
          },
          {
            label: 'Urgent',
            value: '03',
            description: 'Critical items requiring immediate attention.',
            accent: dashboardColors.error,
            icon: 'warning',
          },
          {
            label: 'Projects',
            value: '06',
            description: 'Active project workstreams being monitored.',
            accent: dashboardColors.primary,
            icon: 'layers',
          },
        ]}
      />
    </ThemeProvider>
  )
}

export default App
