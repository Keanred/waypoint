import { index, integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Enums
export const recurrenceEnum = pgEnum('recurrence', ['NONE', 'DAILY', 'WEEKLY', 'MONTHLY']);
export const offsetUnitEnum = pgEnum('offset_unit', ['MINUTES', 'HOURS', 'DAYS']);

// Tasks table
export const tasks = pgTable(
  'tasks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description'),
    dueDate: timestamp('due_date', { withTimezone: true }).notNull(),
    recurrence: recurrenceEnum('recurrence').default('NONE').notNull(),
    recurringEndDate: timestamp('recurring_end_date', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    dueDateIdx: index('idx_tasks_due_date').on(table.dueDate),
  }),
);

// Reminders table
export const reminders = pgTable(
  'reminders',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    taskId: uuid('task_id')
      .notNull()
      .references(() => tasks.id, { onDelete: 'cascade' }),
    offsetValue: integer('offset_value').notNull(),
    offsetUnit: offsetUnitEnum('offset_unit').default('DAYS').notNull(),
    sentAt: timestamp('sent_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    taskIdIdx: index('idx_reminders_task_id').on(table.taskId),
    sentAtTaskIdIdx: index('idx_reminders_sent_at_task_id').on(table.sentAt, table.taskId),
  }),
);

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

export type Reminder = typeof reminders.$inferSelect;
export type NewReminder = typeof reminders.$inferInsert;
