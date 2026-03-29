import { CreateReminderInput, ReminderResponse } from '@waypoint/schemas';
import { Request, Response, Router } from 'express';
import { createRemindersForTask, deleteReminder } from '../services/reminders';

const remindersRouter = Router();

remindersRouter.post('/tasks/:taskId/reminders', async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.params;
  const result = CreateReminderInput.safeParse({ ...req.body, taskId });
  if (!result.success) {
    res.status(400).json({ success: false, error: result.error.errors });
    return;
  }

  const newReminder: ReminderResponse = await createRemindersForTask(taskId, result.data);
  res.status(201).json({ success: true, data: newReminder });
});

remindersRouter.delete('/tasks/:taskId/reminders/:reminderId', async (req: Request, res: Response): Promise<void> => {
  const { reminderId } = req.params;
  const result = await deleteReminder(reminderId);
  res.status(200).json({ success: true, data: result });
});

export default remindersRouter;
