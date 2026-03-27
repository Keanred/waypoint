import { db } from "../client";
import { tasks, NewTask } from "../schema";
import { eq } from "drizzle-orm";

export const getTasks = async () => {
  const taskResults = await db.select().from(tasks);
  return taskResults;
}

export const createTask = async (task: NewTask ) => {
  const [newTask] = await db.insert(tasks).values(task).returning();
  return newTask;
}

export const updateTask = async (id: string, updates: Partial<NewTask>) => {
  const [updatedTask] = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
  return updatedTask;
}

export const deleteTask = async (id: string) => {
  await db.delete(tasks).where(eq(tasks.id, id));
  return { message: `Task '${id}' deleted` };
}

