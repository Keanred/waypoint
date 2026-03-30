import { db } from './client';
import { reminders, tasks } from './schema';

type SeedTask = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueInDays: number;
  dueHourUtc: number;
  recurrence: 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  reminder: {
    offsetValue: number;
    offsetUnit: 'MINUTES' | 'HOURS' | 'DAYS';
  };
};

const createDueDateUtc = (daysFromNow: number, hourUtc: number): Date => {
  const due = new Date();
  due.setUTCDate(due.getUTCDate() + daysFromNow);
  due.setUTCHours(hourUtc, 0, 0, 0);
  return due;
};

// Keep a balanced demo mix: 2 overdue, 2 due today, 3 upcoming.
const seedTasks: SeedTask[] = [
  {
    title: 'Submit expense report',
    description: 'Finalize and submit last week\'s travel reimbursements.',
    priority: 'high',
    dueInDays: -2,
    dueHourUtc: 15,
    recurrence: 'NONE',
    reminder: { offsetValue: 1, offsetUnit: 'DAYS' },
  },
  {
    title: 'Follow up with vendor',
    description: 'Confirm revised quote and expected delivery timeline.',
    priority: 'medium',
    dueInDays: -1,
    dueHourUtc: 10,
    recurrence: 'NONE',
    reminder: { offsetValue: 3, offsetUnit: 'HOURS' },
  },
  {
    title: 'Welcome to Waypoint',
    description: 'This task was created automatically as startup seed data.',
    priority: 'medium',
    dueInDays: 0,
    dueHourUtc: 23,
    recurrence: 'NONE',
    reminder: { offsetValue: 2, offsetUnit: 'HOURS' },
  },
  {
    title: 'Plan this week',
    description: 'Review priorities and block focused time for key deliverables.',
    priority: 'high',
    dueInDays: 1,
    dueHourUtc: 9,
    recurrence: 'WEEKLY',
    reminder: { offsetValue: 1, offsetUnit: 'DAYS' },
  },
  {
    title: 'Check recurring bills',
    description: 'Confirm all monthly subscriptions and invoices are accounted for.',
    priority: 'medium',
    dueInDays: 4,
    dueHourUtc: 16,
    recurrence: 'MONTHLY',
    reminder: { offsetValue: 6, offsetUnit: 'HOURS' },
  },
  {
    title: 'Stretch break',
    description: 'Quick posture reset and short walk.',
    priority: 'low',
    dueInDays: 0,
    dueHourUtc: 18,
    recurrence: 'DAILY',
    reminder: { offsetValue: 30, offsetUnit: 'MINUTES' },
  },
  {
    title: 'Backup project notes',
    description: 'Export notes and sync to secure backup storage.',
    priority: 'medium',
    dueInDays: 2,
    dueHourUtc: 12,
    recurrence: 'NONE',
    reminder: { offsetValue: 3, offsetUnit: 'HOURS' },
  },
];

export const seedDemoTasks = async (): Promise<number> => {
  return db.transaction(async (tx) => {
    const insertedTaskRows = await tx
      .insert(tasks)
      .values(
        seedTasks.map((task) => ({
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: createDueDateUtc(task.dueInDays, task.dueHourUtc),
          recurrence: task.recurrence,
        })),
      )
      .returning();

    await tx.insert(reminders).values(
      insertedTaskRows.map((row, index) => {
        const reminder = seedTasks[index].reminder;
        return {
          taskId: row.id,
          offsetValue: reminder.offsetValue,
          offsetUnit: reminder.offsetUnit,
        };
      }),
    );

    return insertedTaskRows.length;
  });
};
