import {
  dbDeleteRemainder,
  dbGetUnsentReminders,
  dbInsertReinder as dbInsertReminder,
  dbUpdateRemainder,
} from '@/db/queries/reminders';
import { NewReminder } from '../db/schema';
import { HttpError } from '../errors/http';

export type ReminderOffsetUnit = 'MINUTE' | 'MINUTES' | 'HOUR' | 'HOURS' | 'DAY' | 'DAYS';

const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;

export const calculateNextReminderTime = (dueDate: Date, offset: number, offsetUnit: ReminderOffsetUnit): Date => {
  switch (offsetUnit) {
    case 'MINUTE':
    case 'MINUTES':
      return new Date(dueDate.getTime() - offset * MINUTE_IN_MS);
    case 'HOUR':
    case 'HOURS':
      return new Date(dueDate.getTime() - offset * HOUR_IN_MS);
    case 'DAY':
    case 'DAYS':
      return new Date(dueDate.getTime() - offset * DAY_IN_MS);
    default:
      throw new Error(`Unsupported offset unit: ${offsetUnit}`);
  }
};

export const getUnsentRemainders = (_timeMs?: Date) => {
  const result = dbGetUnsentReminders();
  return result;
};

export const markReminderAsSent = async (reminderId: string): Promise<void> => {
  await dbUpdateRemainder(reminderId, { sentAt: new Date() });
};

export const createRemindersForTask = (taskId: string, reminderConfigs: NewReminder) => {
  const newReminder = { ...reminderConfigs, taskId };
  const result = dbInsertReminder(newReminder);
  return result;
};

export const deleteReminder = async (reminderId: string): Promise<{ message: string }> => {
  const result = await dbDeleteRemainder(reminderId);
  if (!result) {
    throw new HttpError(404, `Reminder ${reminderId} not found`);
  }
  return result;
};
