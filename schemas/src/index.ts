import { z } from 'zod'

// Enums
export const RecurrenceType = z.enum(['NONE', 'DAILY', 'WEEKLY', 'MONTHLY'])
export type RecurrenceType = z.infer<typeof RecurrenceType>

export const OffsetUnit = z.enum(['MINUTES', 'HOURS', 'DAYS'])
export type OffsetUnit = z.infer<typeof OffsetUnit>

// Task schemas
export const CreateTaskInput = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.coerce.date(),
  recurrence: RecurrenceType.default('NONE'),
  recurringEndDate: z.coerce.date().optional(),
})
export type CreateTaskInput = z.infer<typeof CreateTaskInput>

export const UpdateTaskInput = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  recurrence: RecurrenceType.optional(),
  recurringEndDate: z.coerce.date().optional(),
})
export type UpdateTaskInput = z.infer<typeof UpdateTaskInput>

export const TaskResponse = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  dueDate: z.coerce.date(),
  recurrence: RecurrenceType,
  recurringEndDate: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type TaskResponse = z.infer<typeof TaskResponse>

export const CreateReminderInput = z.object({
  offsetValue: z.number().int().positive(),
  offsetUnit: OffsetUnit.default('DAYS'),
  taskId: z.string().uuid(),
})
export type CreateReminderInput = z.infer<typeof CreateReminderInput>

export const ReminderResponse = z.object({
  id: z.string().uuid(),
  taskId: z.string().uuid(),
  offsetValue: z.number(),
  offsetUnit: OffsetUnit,
  sentAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
})
export type ReminderResponse = z.infer<typeof ReminderResponse>

export const GetTasksResponse = z.object({
  tasks: z.array(TaskResponse),
  reminders: z.array(ReminderResponse),
})
export type GetTasksResponse = z.infer<typeof GetTasksResponse>
