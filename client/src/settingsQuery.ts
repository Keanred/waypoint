import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateSettingInput } from '@waypoint/schemas';
import { createSettings, getSettings, updateSettings } from './api';

const SETTINGS_QUERY_KEY = 'settings';

export const useSettingsQuery = (enabled = true) => {
  const query = useQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: getSettings,
    enabled,
    retry: false,
  });
  return {
    data: query.data,
    error: query.error,
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};

export const useCreateSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await createSettings();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SETTINGS_QUERY_KEY] });
    },
  });
};

export const useUpdateSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedSettings: Partial<CreateSettingInput>) => {
      await updateSettings(updatedSettings);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SETTINGS_QUERY_KEY] });
    },
  });
};
