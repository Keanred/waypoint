import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import app from '../app';
import { HttpError } from '../errors/http';
import * as tasksService from '../services/tasks';

// Mock the entire service layer so no DB connection is needed
vi.mock('../services/tasks');

const TASK_ID = '00000000-0000-0000-0000-000000000001';
const REMINDER_ID = '00000000-0000-0000-0000-000000000002';

const mockTask = {
  id: TASK_ID,
  title: 'Write tests',
  description: 'TDD all the things',
  priority: 'medium' as const,
  dueDate: new Date('2026-04-01T00:00:00.000Z'),
  recurrence: 'NONE' as const,
  recurringEndDate: null,
  createdAt: new Date('2026-03-27T00:00:00.000Z'),
  updatedAt: new Date('2026-03-27T00:00:00.000Z'),
};

const mockReminder = {
  id: REMINDER_ID,
  taskId: TASK_ID,
  offsetValue: 1,
  offsetUnit: 'DAYS' as const,
  sentAt: null,
  createdAt: new Date('2026-03-27T00:00:00.000Z'),
};

const mockCreateTaskResponse = {
  task: mockTask,
  reminders: [mockReminder],
};

const mockGetTasksResponse = {
  tasks: [mockTask],
  reminders: [mockReminder],
};

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// GET /api/tasks
// ---------------------------------------------------------------------------

describe('GET /api/tasks', () => {
  it('returns 200 with tasks and reminders matching GetTasksResponse shape', async () => {
    vi.mocked(tasksService.getTasks).mockResolvedValue(mockGetTasksResponse);

    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('tasks');
    expect(res.body.data).toHaveProperty('reminders');
  });

  it('returns a task with all expected TaskResponse fields', async () => {
    vi.mocked(tasksService.getTasks).mockResolvedValue(mockGetTasksResponse);

    const res = await request(app).get('/api/tasks');

    const task = res.body.data.tasks[0];
    expect(task.id).toBe(TASK_ID);
    expect(task.title).toBe('Write tests');
    expect(task.description).toBe('TDD all the things');
    expect(task.priority).toBe('medium');
    expect(task).toHaveProperty('dueDate');
    expect(task).toHaveProperty('recurrence');
    expect(task).toHaveProperty('createdAt');
    expect(task).toHaveProperty('updatedAt');
  });

  it('returns a reminder with all expected ReminderResponse fields', async () => {
    vi.mocked(tasksService.getTasks).mockResolvedValue(mockGetTasksResponse);

    const res = await request(app).get('/api/tasks');

    const reminder = res.body.data.reminders[0];
    expect(reminder.id).toBe(REMINDER_ID);
    expect(reminder.taskId).toBe(TASK_ID);
    expect(reminder.offsetValue).toBe(1);
    expect(reminder.offsetUnit).toBe('DAYS');
    expect(reminder).toHaveProperty('sentAt');
    expect(reminder).toHaveProperty('createdAt');
  });

  it('returns 200 with empty arrays when no tasks exist', async () => {
    vi.mocked(tasksService.getTasks).mockResolvedValue({ tasks: [], reminders: [] });

    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.tasks).toEqual([]);
    expect(res.body.data.reminders).toEqual([]);
  });

  it('returns 500 when the service throws', async () => {
    vi.mocked(tasksService.getTasks).mockRejectedValue(new Error('DB connection failed'));

    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// POST /api/tasks
// ---------------------------------------------------------------------------

describe('POST /api/tasks', () => {
  const validInput = {
    title: 'New Task',
    description: 'A task created via API',
    priority: 'high',
    dueDate: '2026-04-01T00:00:00.000Z',
    recurrence: 'NONE',
  };

  it('returns 201 with the created task and reminders when input is valid', async () => {
    vi.mocked(tasksService.createTask).mockResolvedValue(mockCreateTaskResponse);

    const res = await request(app).post('/api/tasks').send(validInput);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.task.id).toBe(TASK_ID);
    expect(res.body.data.task.title).toBe('Write tests');
    expect(res.body.data.reminders).toHaveLength(1);
  });

  it('calls createTask service with the Zod-parsed input including reminders', async () => {
    vi.mocked(tasksService.createTask).mockResolvedValue(mockCreateTaskResponse);

    await request(app).post('/api/tasks').send({ ...validInput, reminders: [{ offsetValue: 1, offsetUnit: 'DAYS' }] });

    expect(tasksService.createTask).toHaveBeenCalledOnce();
    expect(tasksService.createTask).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'New Task', reminders: [{ offsetValue: 1, offsetUnit: 'DAYS' }] }),
    );
  });

  it('returns 400 when title is missing', async () => {
    const res = await request(app).post('/api/tasks').send({ dueDate: '2026-04-01T00:00:00.000Z' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.createTask).not.toHaveBeenCalled();
  });

  it('returns 400 when title is an empty string', async () => {
    const res = await request(app).post('/api/tasks').send({ title: '', dueDate: '2026-04-01T00:00:00.000Z' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.createTask).not.toHaveBeenCalled();
  });

  it('returns 400 when dueDate is missing', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Missing due date' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.createTask).not.toHaveBeenCalled();
  });

  it('returns 400 when dueDate is not a valid date string', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'Bad date', dueDate: 'not-a-date' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.createTask).not.toHaveBeenCalled();
  });

  it('returns 400 when recurrence is an invalid enum value', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Task', dueDate: '2026-04-01T00:00:00.000Z', recurrence: 'YEARLY' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.createTask).not.toHaveBeenCalled();
  });

  it('returns 400 when priority is an invalid enum value', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Task', dueDate: '2026-04-01T00:00:00.000Z', priority: 'urgent' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.createTask).not.toHaveBeenCalled();
  });

  it('returns 400 when reminders contain an invalid offsetUnit', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ ...validInput, reminders: [{ offsetValue: 1, offsetUnit: 'WEEKS' }] });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.createTask).not.toHaveBeenCalled();
  });

  it('returns 400 when reminders contain a non-positive offsetValue', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ ...validInput, reminders: [{ offsetValue: 0, offsetUnit: 'DAYS' }] });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.createTask).not.toHaveBeenCalled();
  });

  it('creates the task when optional fields are omitted', async () => {
    vi.mocked(tasksService.createTask).mockResolvedValue({ task: mockTask, reminders: [] });

    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Minimal task', dueDate: '2026-04-01T00:00:00.000Z' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.reminders).toEqual([]);
  });

  it('returns 500 when the service throws', async () => {
    vi.mocked(tasksService.createTask).mockRejectedValue(new Error('DB insert failed'));

    const res = await request(app).post('/api/tasks').send(validInput);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// PATCH /api/tasks/:id
// ---------------------------------------------------------------------------

describe('PATCH /api/tasks/:id', () => {
  it('returns 200 with the updated task when the task exists', async () => {
    const updatedTask = { ...mockTask, title: 'Updated Title' };
    vi.mocked(tasksService.updateTask).mockResolvedValue(updatedTask);

    const res = await request(app).patch(`/api/tasks/${TASK_ID}`).send({ title: 'Updated Title' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Updated Title');
    expect(res.body.data.id).toBe(TASK_ID);
  });

  it('returns 404 when the task does not exist', async () => {
    vi.mocked(tasksService.updateTask).mockRejectedValue(new HttpError(404, 'Task not found'));

    const res = await request(app)
      .patch('/api/tasks/00000000-0000-0000-0000-000000000099')
      .send({ title: 'Ghost task' });

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('returns 400 when title is an empty string', async () => {
    const res = await request(app).patch(`/api/tasks/${TASK_ID}`).send({ title: '' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.updateTask).not.toHaveBeenCalled();
  });

  it('returns 400 when recurrence is an invalid enum value', async () => {
    const res = await request(app).patch(`/api/tasks/${TASK_ID}`).send({ recurrence: 'YEARLY' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.updateTask).not.toHaveBeenCalled();
  });

  it('returns 400 when priority is an invalid enum value', async () => {
    const res = await request(app).patch(`/api/tasks/${TASK_ID}`).send({ priority: 'urgent' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(tasksService.updateTask).not.toHaveBeenCalled();
  });

  it('accepts a partial update with only dueDate', async () => {
    const updatedTask = { ...mockTask, dueDate: new Date('2026-05-01T00:00:00.000Z') };
    vi.mocked(tasksService.updateTask).mockResolvedValue(updatedTask);

    const res = await request(app).patch(`/api/tasks/${TASK_ID}`).send({ dueDate: '2026-05-01T00:00:00.000Z' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(tasksService.updateTask).toHaveBeenCalledWith(
      TASK_ID,
      expect.objectContaining({ dueDate: expect.any(Date) }),
    );
  });

  it('does not pass reminder fields to the update service', async () => {
    const updatedTask = { ...mockTask, title: 'Updated' };
    vi.mocked(tasksService.updateTask).mockResolvedValue(updatedTask);

    await request(app)
      .patch(`/api/tasks/${TASK_ID}`)
      .send({ title: 'Updated', reminders: [{ offsetValue: 2, offsetUnit: 'HOURS' }] });

    expect(tasksService.updateTask).toHaveBeenCalledWith(
      TASK_ID,
      expect.not.objectContaining({ reminders: expect.anything() }),
    );
  });

  it('calls updateTask with the correct task id', async () => {
    vi.mocked(tasksService.updateTask).mockResolvedValue(mockTask);

    await request(app).patch(`/api/tasks/${TASK_ID}`).send({ title: 'Check ID' });

    expect(tasksService.updateTask).toHaveBeenCalledWith(TASK_ID, expect.any(Object));
  });

  it('returns 500 when the service throws', async () => {
    vi.mocked(tasksService.updateTask).mockRejectedValue(new Error('DB update failed'));

    const res = await request(app).patch(`/api/tasks/${TASK_ID}`).send({ title: 'Error case' });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// DELETE /api/tasks/:id
// ---------------------------------------------------------------------------

describe('DELETE /api/tasks/:id', () => {
  it('returns 200 with success wrapper when the task is deleted', async () => {
    vi.mocked(tasksService.deleteTask).mockResolvedValue({ message: `Task '${TASK_ID}' deleted` });

    const res = await request(app).delete(`/api/tasks/${TASK_ID}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.message).toContain(TASK_ID);
  });

  it('returns 404 when the task does not exist', async () => {
    vi.mocked(tasksService.deleteTask).mockRejectedValue(new HttpError(404, 'Task not found'));

    const res = await request(app).delete('/api/tasks/00000000-0000-0000-0000-000000000099');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('calls deleteTask service with the correct id', async () => {
    vi.mocked(tasksService.deleteTask).mockResolvedValue({ message: `Task '${TASK_ID}' deleted` });

    await request(app).delete(`/api/tasks/${TASK_ID}`);

    expect(tasksService.deleteTask).toHaveBeenCalledOnce();
    expect(tasksService.deleteTask).toHaveBeenCalledWith(TASK_ID);
  });

  it('returns 500 when the service throws', async () => {
    vi.mocked(tasksService.deleteTask).mockRejectedValue(new Error('DB delete failed'));

    const res = await request(app).delete(`/api/tasks/${TASK_ID}`);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
