import { Router, Request, Response } from "express";
import { getTasks, createTask, deleteTask, updateTask } from "../services/tasks";
import { UpdateTaskInput, CreateTaskInput  } from "@waypoint/schemas";

const tasksRouter = Router();

tasksRouter.get('/tasks', (_req: Request, res: Response) => {
  const tasks = getTasks();
  res.json(tasks);
});

tasksRouter.post('/tasks', (req: Request, res: Response) => {
  const task = CreateTaskInput.parse(req.body);
  if (!task) {
    return res.status(400).json({ error: 'Invalid task data' });
  }
  const newTask = createTask(task);
  res.json({ message: `Task '${title}' created` });
});

tasksRouter.patch('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  res.json({ message: `Task '${id}' updated to '${title}'` });
});

tasksRouter.delete('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Task '${id}' deleted` });
});

export default tasksRouter;

