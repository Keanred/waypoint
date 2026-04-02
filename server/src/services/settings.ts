import { CreateSettingInput, SettingsResponse, Timezone } from '@waypoint/schemas';
import { dbGetSettings, dbInsertSetting, dbUpdateSetting } from '../db/queries/settings';
import { HttpError } from '../errors/http';

export const getSettings = async (): Promise<SettingsResponse> => {
  const settings = await dbGetSettings();
  if (!settings) {
    throw new HttpError(404, 'Settings not found');
  }
  const parsedTimezone = Timezone.safeParse(settings.timezone);
  if (!parsedTimezone.success) {
    throw new Error('Invalid timezone in settings');
  }
  const result: SettingsResponse = {
    id: settings.id,
    displayName: settings.displayName,
    reminderEmail: settings.reminderEmail,
    timezone: parsedTimezone.data,
    browserNotificationsEnabled: settings.browserNotificationsEnabled,
    desktopNotificationsEnabled: settings.desktopNotificationsEnabled,
    createdAt: settings.createdAt,
    updatedAt: settings.updatedAt,
  };
  return result;
};

export const createSettings = async (setting: CreateSettingInput): Promise<SettingsResponse> => {
  const parsedTimezone = Timezone.safeParse(setting.timezone);
  if (!parsedTimezone.success) {
    throw new Error('Invalid timezone provided');
  }
  const newSettings = {
    displayName: setting.displayName,
    reminderEmail: setting.reminderEmail,
    timezone: parsedTimezone.data,
    browserNotificationsEnabled: setting.browserNotificationsEnabled,
    desktopNotificationsEnabled: setting.desktopNotificationsEnabled,
  };
  const createdSettings = await dbInsertSetting(newSettings);
  if (!createdSettings) {
    throw new Error('Failed to create settings');
  }
  const parsedCreatedTimezone = Timezone.safeParse(createdSettings.timezone);
  if (!parsedCreatedTimezone.success) {
    throw new Error('Invalid timezone in created settings');
  }
  const parsedCreatedSettings: SettingsResponse = {
    ...createdSettings,
    timezone: parsedCreatedTimezone.data,
  };
  return parsedCreatedSettings;
};

export const updateSettings = async (
  id: string,
  setting: Partial<CreateSettingInput>,
): Promise<SettingsResponse> => {
  if (setting.timezone) {
    const parsedTimezone = Timezone.safeParse(setting.timezone);
    if (!parsedTimezone.success) {
      throw new Error('Invalid timezone provided');
    }
  }

  const updatedSettings = await dbUpdateSetting(id, setting);
  if (!updatedSettings) {
    throw new HttpError(404, 'Settings not found');
  }

  const parsedTimezone = Timezone.safeParse(updatedSettings.timezone);
  if (!parsedTimezone.success) {
    throw new Error('Invalid timezone in updated settings');
  }

  const result: SettingsResponse = {
    ...updatedSettings,
    timezone: parsedTimezone.data,
  };

  return result;
};

export const initializeSettings = async (): Promise<SettingsResponse | void> => {
  const existingSettings = await dbGetSettings();
  if (existingSettings) {
    return;
  }
  const settings = await dbInsertSetting({
    displayName: 'User',
    reminderEmail: '',
    timezone: 'utc',
    browserNotificationsEnabled: false,
    desktopNotificationsEnabled: false,
  });
  const parsedTimezone = Timezone.safeParse(settings.timezone);
  if (!parsedTimezone.success) {
    throw new Error('Invalid timezone in initialized settings');
  }
  const result: SettingsResponse = {
    id: settings.id,
    displayName: settings.displayName,
    reminderEmail: settings.reminderEmail,
    timezone: parsedTimezone.data,
    browserNotificationsEnabled: settings.browserNotificationsEnabled,
    desktopNotificationsEnabled: settings.desktopNotificationsEnabled,
    createdAt: settings.createdAt,
    updatedAt: settings.updatedAt,
  };
  return result;
};
