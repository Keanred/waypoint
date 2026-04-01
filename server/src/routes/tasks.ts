import { CreateTaskResponse, CreateTaskWithRemindersInput, GetTasksResponse, TaskResponse, UpdateTaskInput } from '@waypoint/schemas';
import { Request, Response, Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../services/tasks';

const tasksRouter = Router();

tasksRouter.get('/tasks', async (_req: Request, res: Response): Promise<void> => {
  const tasks: GetTasksResponse = await getTasks();
  res.status(200).json({ success: true, data: tasks });
});

tasksRouter.post('/tasks', async (req: Request, res: Response): Promise<void> => {
  const result = CreateTaskWithRemindersInput.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ success: false, error: result.error.errors });
    return;
  }
  const newTask: CreateTaskResponse = await createTask(result.data!);
  res.status(201).json({ success: true, data: newTask });
});

tasksRouter.patch('/tasks/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = UpdateTaskInput.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ success: false, error: result.error.errors });
    return;
  }

  const updatedTask: TaskResponse = await updateTask(id, result.data!);
  if (!updatedTask) {
    res.status(404).json({ success: false, error: `Task ${id} not found` });
    return;
  }

  res.status(200).json({ success: true, data: updatedTask });
});

tasksRouter.delete('/tasks/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await deleteTask(id);

  if (!result) {
    res.status(404).json({ success: false, error: `Task ${id} not found` });
    return;
  }

  res.status(200).json({ success: true, data: result });
});

export default tasksRouter;
