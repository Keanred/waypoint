import cron from 'node-cron';
import { config } from '../config';
import {
  dbCountUnsentRemindersByTaskId,
  dbGetRemindersByTaskId,
  dbInsertReinder as dbInsertReminder,
} from '../db/queries/reminders';
import { dbInsertTask } from '../db/queries/tasks';
import { EmailService } from './email';
import { getUnsentRemainders, markReminderAsSent } from './reminders';

let isRunning = false;

const emailService = new EmailService();

const addCalendarMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  const originalDay = result.getUTCDate();

  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);

  const lastDayOfTargetMonth = new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate();

  result.setUTCDate(Math.min(originalDay, lastDayOfTargetMonth));
  return result;
};

const taskRecurrenceMap = {
  DAILY: (date: Date) => new Date(date.getTime() + 24 * 60 * 60 * 1000),
  WEEKLY: (date: Date) => new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000),
  MONTHLY: (date: Date) => addCalendarMonths(date, 1),
  NONE: (date: Date) => date,
};

type RecurringTask = {
  id: string;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  recurrence: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'NONE';
  recurringEndDate: Date | null;
};

const getNextDueDate = (dueDate: Date, recurrence: RecurringTask['recurrence']) => {
  if (recurrence === 'NONE') return dueDate;
  return taskRecurrenceMap[recurrence](dueDate);
};

export const checkAndSendReminders = async () => {
  if (isRunning) {
    console.warn('Reminder check is already running, skipping this cycle.');
    return;
  }
  isRunning = true;
  let unsentReminders: Awaited<ReturnType<typeof getUnsentRemainders>> = [];
  try {
    unsentReminders = await getUnsentRemainders();
    const processedTasks = new Map<string, RecurringTask>();

    for (const { reminder, task } of unsentReminders) {
      processedTasks.set(task.id, task);
      try {
        const result = await emailService.sendReminderEmail(task, reminder);
        if (result.success) {
          await markReminderAsSent(reminder.id);
          console.log(`✅ Sent reminder ${reminder.id} for task '${task.title}'`);
        } else {
          console.error(`❌ Failed to send reminder ${reminder.id}: ${result.error}`);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`❌ Failed to process reminder ${reminder.id}: ${message}`);
      }
    }

    for (const task of processedTasks.values()) {
      if (task.recurrence === 'NONE') continue;

      const now = new Date();
      if (task.dueDate > now) continue;

      const unsentCount = await dbCountUnsentRemindersByTaskId(task.id);
      if (unsentCount > 0) continue;

      const reminderTemplates = await dbGetRemindersByTaskId(task.id);
      if (reminderTemplates.length === 0) {
        continue;
      }

      let nextDueDate = getNextDueDate(task.dueDate, task.recurrence);
      while (nextDueDate < now) {
        nextDueDate = getNextDueDate(nextDueDate, task.recurrence);
      }

      if (task.recurringEndDate && nextDueDate > task.recurringEndDate) {
        continue;
      }

      const newTask = {
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: nextDueDate,
        recurrence: task.recurrence,
        recurringEndDate: task.recurringEndDate,
      };

      const taskResult = await dbInsertTask(newTask);
      if (!taskResult) {
        console.error(`❌ Failed to create new task for recurrence of '${task.title}'`);
        continue;
      }

      for (const reminderTemplate of reminderTemplates) {
        const reminderResult = await dbInsertReminder({
          taskId: newTask.id,
          offsetValue: reminderTemplate.offsetValue,
          offsetUnit: reminderTemplate.offsetUnit,
          sentAt: null,
        });

        if (!reminderResult) {
          console.error(`❌ Failed to create reminder for new task '${newTask.title}'`);
        }
      }

      console.log(`✅ Created new recurring task '${newTask.title}' with ${reminderTemplates.length} reminders`);
    }
  } catch (error) {
    console.error(`Error processing reminders: ${error instanceof Error ? error.message : error}`);
  }
  console.log(`Reminder check complete. Processed ${unsentReminders.length} reminders.`);
  isRunning = false;
};

export const startReminderScheduler = () => {
  const parsedInterval = Number(config.reminderCheckIntervalMinutes);
  const intervalMinutes = Number.isFinite(parsedInterval) && parsedInterval > 0 ? Math.floor(parsedInterval) : 1;
  const cronExpression = `*/${intervalMinutes} * * * *`;

  cron.schedule(cronExpression, checkAndSendReminders);
  console.log(`📅 Reminder scheduler started - checking every ${intervalMinutes} minute(s)`);
};

export const sendTestEmail = async () => {
  const testTask: RecurringTask = {
    id: 'test-task-id',
    title: 'Test Task',
    description: 'This is a test task for email reminders.',
    priority: 'medium',
    dueDate: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
    recurrence: 'NONE',
    recurringEndDate: null,
  };

  const testReminder = {
    id: 'test-reminder-id',
    taskId: testTask.id,
    offsetValue: 5,
    offsetUnit: 'MINUTES' as 'MINUTES' | 'HOURS' | 'DAYS',
    sentAt: null,
  };

  const result = await emailService.sendReminderEmail(testTask, testReminder);
  if (result.success) {
    console.log('✅ Test email sent successfully');
  } else {
    console.error(`❌ Failed to send test email: ${result.error}`);
  }
};
