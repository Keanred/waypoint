import 'dotenv/config';

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config = {
  databaseUrl: getEnv('DATABASE_URL', 'postgresql://waypoint_user:waypoint_password@localhost:5432/waypoint'),
  resendApiKey: getEnv('RESEND_API_KEY', ''),
  nodeEnv: getEnv('NODE_ENV', 'development'),
  port: parseInt(getEnv('PORT', '3001')),
  reminderCheckIntervalMinutes: parseInt(getEnv('REMINDER_CHECK_INTERVAL_MINUTES', '1')),
  reminderEmailRecipient: getEnv('REMINDER_EMAIL_RECIPIENT', 'test@example.com'),
};
