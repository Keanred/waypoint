import { db } from './client';
import { reminders, tasks } from './schema';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const seedDatabase = async (): Promise<void> => {
  const existingTasks = await db.select({ id: tasks.id }).from(tasks).limit(1);

  if (existingTasks.length > 0) {
    console.log('Seed skipped: tasks already exist.');
    return;
  }

  const [seedTask] = await db
    .insert(tasks)
    .values({
      title: 'Welcome to Waypoint',
      description: 'This task was created automatically as startup seed data.',
      priority: 'medium',
      dueDate: new Date(Date.now() + DAY_IN_MS),
      recurrence: 'NONE',
    })
    .returning();

  await db.insert(reminders).values({
    taskId: seedTask.id,
    offsetValue: 1,
    offsetUnit: 'HOURS',
  });

  console.log('Seed complete: inserted demo task and reminder.');
};

export const cleanDatabase = async (): Promise<void> => {
  await db.delete(reminders);
  await db.delete(tasks);

  console.log('Database cleanup complete.');
};
