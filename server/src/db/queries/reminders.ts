import { eq } from 'drizzle-orm';
import { db } from '../client';
import { NewReminder, Reminder, reminders } from '../schema';

export const getAllReminders = async (): Promise<Reminder[]> => {
  const remindersResult = await db.select().from(reminders);
  return remindersResult;
};

export const insertReminder = async (reminder: NewReminder): Promise<Reminder> => {
  const [newReminder] = await db.insert(reminders).values(reminder).returning();
  return newReminder;
};

export const deleteReminder = async (id: string): Promise<{ message: string }> => {
  await db.delete(reminders).where(eq(reminders.id, id));
  return { message: `Reminder '${id}' deleted` };
};

export const updateReminder = async (id: string, updates: Partial<NewReminder>): Promise<Reminder> => {
  const [updatedReminder] = await db.update(reminders).set(updates).where(eq(reminders.id, id)).returning();
  return updatedReminder;
};
