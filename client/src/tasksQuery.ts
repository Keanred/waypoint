import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateTaskWithRemindersInput } from '@waypoint/schemas';
import { createTask, deleteTask, getTasks } from './api';

const TASKS_QUERY_KEY = 'tasks';

export const useTasksQuery = () => {
  const query = useQuery({
    queryKey: [TASKS_QUERY_KEY],
    queryFn: getTasks,
  });
  return { data: query.data, isPending: query.isPending, isError: query.isError };
};

export const createTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: CreateTaskWithRemindersInput) => {
      await createTask(task);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export const completeTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteTask(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};
