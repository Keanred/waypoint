import { z } from 'zod';

// Enums
const RecurrenceTypeSchema = z.enum(['NONE', 'DAILY', 'WEEKLY', 'MONTHLY']);
export type RecurrenceType = z.infer<typeof RecurrenceTypeSchema>;
export { RecurrenceTypeSchema as RecurrenceType };

const OffsetUnitSchema = z.enum(['MINUTES', 'HOURS', 'DAYS']);
export type OffsetUnit = z.infer<typeof OffsetUnitSchema>;
export { OffsetUnitSchema as OffsetUnit };

// Task schemas
const CreateTaskInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.coerce.date(),
  recurrence: RecurrenceTypeSchema.default('NONE'),
  recurringEndDate: z.coerce.date().optional(),
});
export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;
export { CreateTaskInputSchema as CreateTaskInput };

const UpdateTaskInputSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  recurrence: RecurrenceTypeSchema.optional(),
  recurringEndDate: z.coerce.date().optional(),
});
export type UpdateTaskInput = z.infer<typeof UpdateTaskInputSchema>;
export { UpdateTaskInputSchema as UpdateTaskInput };

const TaskResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  dueDate: z.coerce.date(),
  recurrence: RecurrenceTypeSchema,
  recurringEndDate: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type TaskResponse = z.infer<typeof TaskResponseSchema>;
export { TaskResponseSchema as TaskResponse };

const CreateReminderInputSchema = z.object({
  offsetValue: z.number().int().positive(),
  offsetUnit: OffsetUnitSchema.default('DAYS'),
  taskId: z.string().uuid(),
});
export type CreateReminderInput = z.infer<typeof CreateReminderInputSchema>;
export { CreateReminderInputSchema as CreateReminderInput };

const ReminderResponseSchema = z.object({
  id: z.string().uuid(),
  taskId: z.string().uuid(),
  offsetValue: z.number(),
  offsetUnit: OffsetUnitSchema,
  sentAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
});
export type ReminderResponse = z.infer<typeof ReminderResponseSchema>;
export { ReminderResponseSchema as ReminderResponse };

const GetTasksResponseSchema = z.object({
  tasks: z.array(TaskResponseSchema),
  reminders: z.array(ReminderResponseSchema),
});
export type GetTasksResponse = z.infer<typeof GetTasksResponseSchema>;
export { GetTasksResponseSchema as GetTasksResponse };
