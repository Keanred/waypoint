import { CreateSettingInput } from '@waypoint/schemas';
import { Request, Response, Router } from 'express';
import { isHttpError } from '../errors/http';
import { createSettings, getSettings, initializeSettings, updateSettings } from '../services/settings';

const settingsRouter = Router();

settingsRouter.get('/settings', async (_req: Request, res: Response) => {
  try {
    const settings = await getSettings();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    if (isHttpError(error)) {
      res.status(error.statusCode).json({ success: false, error: error.message });
      return;
    }
    res.status(500).json({ success: false, error: 'Failed to fetch settings' });
  }
});

settingsRouter.post('/settings', async (req: Request, res: Response) => {
  try {
    const hasRequestBody = req.body && Object.keys(req.body).length > 0;

    if (!hasRequestBody) {
      const initializedSetting = await initializeSettings();
      const settings = initializedSetting ?? (await getSettings());
      res.status(initializedSetting ? 201 : 200).json({ success: true, data: settings });
      return;
    }

    const result = CreateSettingInput.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, error: result.error.errors });
      return;
    }

    const createdSettings = await createSettings(result.data);
    res.status(201).json({ success: true, data: createdSettings });
  } catch (error) {
    console.error('Error initializing settings:', error);
    res.status(500).json({ success: false, error: 'Failed to initialize settings' });
  }
});

settingsRouter.patch('/settings', async (req: Request, res: Response) => {
  try {
    const result = CreateSettingInput.partial().safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, error: result.error.errors });
      return;
    }
    const existingSettings = await getSettings();
    if (!existingSettings) {
      res.status(404).json({ error: 'Settings not found' });
      return;
    }
    const updatedSettings = await updateSettings(existingSettings.id, result.data);
    res.status(200).json({ success: true, data: updatedSettings });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ success: false, error: 'Failed to update settings' });
  }
});

export default settingsRouter;
