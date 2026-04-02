import { CreateSettingInput } from '@waypoint/schemas';
import { eq } from 'drizzle-orm';
import { db } from '../client';
import { Setting, settings } from '../schema';

export const dbGetSettings = async (): Promise<Setting | undefined> => {
  const [settingResults] = await db.select().from(settings);
  return settingResults;
};

export const dbInsertSetting = async (setting: CreateSettingInput): Promise<Setting> => {
  const [newSetting] = await db.insert(settings).values(setting).returning();
  return newSetting;
};

export const dbUpdateSetting = async (
  id: string,
  setting: Partial<CreateSettingInput>,
): Promise<Setting | undefined> => {
  const [updatedSetting] = await db
    .update(settings)
    .set({ ...setting, updatedAt: new Date() })
    .where(eq(settings.id, id))
    .returning();

  return updatedSetting;
};
