import { CreateTaskInput, GetTasksResponse, TaskResponse, UpdateTaskInput } from '@waypoint/schemas';
import { dbDeleteTask, dbGetTaskById, dbGetTasks, dbInsertTask, dbUpsertTask } from '../db/queries/tasks';
import { HttpError } from '../errors/http';

export const getTasks = async (): Promise<GetTasksResponse> => {
  const taskResults = await dbGetTasks();
  const tasks: GetTasksResponse = {
    tasks: taskResults.map((result) => ({
      id: result.tasks.id,
      title: result.tasks.title,
      description: result.tasks.description,
      priority: result.tasks.priority,
      dueDate: result.tasks.dueDate,
      recurrence: result.tasks.recurrence,
      recurringEndDate: result.tasks.recurringEndDate,
      createdAt: result.tasks.createdAt,
      updatedAt: result.tasks.updatedAt,
    })),
    reminders: taskResults
      .filter((result) => result.reminders !== null && result.reminders.id !== null)
      .map((result) => ({
        id: result.reminders!.id!,
        taskId: result.reminders!.taskId,
        offsetValue: result.reminders!.offsetValue,
        offsetUnit: result.reminders!.offsetUnit,
        sentAt: result.reminders!.sentAt,
        createdAt: result.reminders!.createdAt,
      })),
  };
  return tasks;
};

export const createTask = async (task: CreateTaskInput): Promise<TaskResponse> => {
  if (task.dueDate && new Date(task.dueDate) < new Date()) {
    throw new HttpError(422, 'Due date cannot be in the past');
  }
  if (task.recurringEndDate && task.dueDate && new Date(task.recurringEndDate) < new Date(task.dueDate)) {
    throw new HttpError(422, 'Recurring end date cannot be before due date');
  }
  const result: TaskResponse = await dbInsertTask(task);
  return result;
};

export const updateTask = async (id: string, updates: UpdateTaskInput): Promise<TaskResponse> => {
  const existing = await dbGetTaskById(id);
  if (!existing) {
    throw new HttpError(404, `Task ${id} not found`);
  }
  if (updates.dueDate && new Date(updates.dueDate) < new Date()) {
    throw new HttpError(422, 'Due date cannot be in the past');
  }
  const result = await dbUpsertTask(id, updates);
  return result;
};

export const deleteTask = async (id: string) => {
  const existing = await dbGetTaskById(id);
  if (!existing) {
    throw new HttpError(404, `Task ${id} not found`);
  }
  const result = await dbDeleteTask(id);
  return result;
};
