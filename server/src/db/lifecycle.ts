import { db } from './client';
import { reminders, tasks } from './schema';
import { seedDemoTasks } from './seeds';

export const seedDatabase = async (): Promise<void> => {
  const existingTasks = await db.select({ id: tasks.id }).from(tasks).limit(1);

  if (existingTasks.length > 0) {
    console.log('Seed skipped: tasks already exist.');
    return;
  }

  const insertedTaskCount = await seedDemoTasks();
  console.log(`Seed complete: inserted ${insertedTaskCount} demo tasks and reminders.`);
};

export const cleanDatabase = async (): Promise<void> => {
  await db.delete(reminders);
  await db.delete(tasks);

  console.log('Database cleanup complete.');
};
