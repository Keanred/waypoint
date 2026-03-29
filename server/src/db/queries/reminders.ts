import { and, eq, isNull, sql } from 'drizzle-orm';
import { calculateNextReminderTime } from '../../services/reminders';
import { db } from '../client';
import { NewReminder, Reminder, Task, reminders, tasks } from '../schema';

export const dbGetAllRemaineders = async (): Promise<Reminder[]> => {
  const remindersResult = await db.select().from(reminders);
  return remindersResult;
};

export const dbInsertReinder = async (reminder: NewReminder): Promise<Reminder> => {
  const [newReminder] = await db.insert(reminders).values(reminder).returning();
  return newReminder;
};

export const dbDeleteRemainder = async (id: string): Promise<{ message: string }> => {
  await db.delete(reminders).where(eq(reminders.id, id));
  return { message: `Reminder '${id}' deleted` };
};

export const dbUpdateRemainder = async (id: string, updates: Partial<NewReminder>): Promise<Reminder> => {
  const [updatedReminder] = await db.update(reminders).set(updates).where(eq(reminders.id, id)).returning();
  return updatedReminder;
};

export const dbGetUnsentReminders = async (
  timeMs: number = Date.now(),
): Promise<{ reminder: Reminder; task: Task }[]> => {
  const now = new Date(timeMs);

  const unsentReminderResults = await db
    .select()
    .from(reminders)
    .innerJoin(tasks, eq(reminders.taskId, tasks.id))
    .where(isNull(reminders.sentAt));

  return unsentReminderResults
    .filter(({ reminders: curReminder, tasks: curTask }) => {
      const nextReminderTime = calculateNextReminderTime(
        curTask.dueDate,
        curReminder.offsetValue,
        curReminder.offsetUnit,
      );
      return nextReminderTime <= now;
    })
    .map(({ reminders: reminder, tasks: task }) => ({ reminder, task }));
};

export const dbGetRemindersByTaskId = async (taskId: string): Promise<Reminder[]> => {
  const reminderResults = await db.select().from(reminders).where(eq(reminders.taskId, taskId));
  return reminderResults;
};

export const dbCountUnsentRemindersByTaskId = async (taskId: string): Promise<number> => {
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(reminders)
    .where(and(eq(reminders.taskId, taskId), isNull(reminders.sentAt)));

  return Number(result?.count ?? 0);
};
