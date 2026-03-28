import { eq } from 'drizzle-orm';
import { db } from '../client';
import { NewTask, Reminder, reminders, Task, tasks } from '../schema';

export const dbGetTasks = async (): Promise<{ tasks: Task; reminders: Reminder | null }[]> => {
  const taskResults = await db.select().from(tasks).leftJoin(reminders, eq(tasks.id, reminders.taskId));
  return taskResults;
};

export const dbGetTaskById = async (id: string): Promise<Task | null> => {
  const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
  return task;
};

export const dbInsertTask = async (task: NewTask) => {
  const [newTask] = await db.insert(tasks).values(task).returning();
  return newTask;
};

export const dbUpsertTask = async (id: string, updates: Partial<NewTask>) => {
  const [updatedTask] = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
  return updatedTask;
};

export const dbDeleteTask = async (id: string) => {
  await db.delete(tasks).where(eq(tasks.id, id));
  return { message: `Task '${id}' deleted` };
};
