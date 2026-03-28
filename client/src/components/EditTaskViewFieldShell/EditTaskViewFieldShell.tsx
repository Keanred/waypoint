import { Stack } from '@mui/material';
import type { ReactNode } from 'react';
import { SectionLabel } from '../SectionLabel';

interface EditTaskViewFieldShellProps {
  label: string;
  children: ReactNode;
}

export const EditTaskViewFieldShell = ({ label, children }: EditTaskViewFieldShellProps) => {
  return (
    <Stack spacing={1.25}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </Stack>
  );
}
