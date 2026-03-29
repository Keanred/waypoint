const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
  const value = process.env[key];
  if (value === undefined) return defaultValue;

  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;

  throw new Error(`Invalid boolean environment variable: ${key}=${value}`);
};

const nodeEnv = getEnv('NODE_ENV', 'development');
const isProduction = nodeEnv === 'production';
const postgresUser = getEnv('POSTGRES_USER', 'waypoint_user');
const postgresPassword = getEnv('POSTGRES_PASSWORD', 'waypoint_password');
const postgresDb = getEnv('POSTGRES_DB', 'waypoint');
const postgresHost = getEnv('POSTGRES_HOST', 'localhost');
const postgresPort = getEnv('POSTGRES_PORT', '5432');
const localDatabaseUrl = [
  `postgresql://${postgresUser}:${postgresPassword}`,
  `@${postgresHost}:${postgresPort}/${postgresDb}`,
].join('');
const databaseUrlDev = process.env.DATABASE_URL_DEV;
const databaseUrlProd = process.env.DATABASE_URL_PROD;
const productionDatabaseUrl = databaseUrlProd || getEnv('DATABASE_URL_PROD');
const runtimeDatabaseUrl = databaseUrlDev || localDatabaseUrl;
const databaseUrl = isProduction ? productionDatabaseUrl : runtimeDatabaseUrl;
const reminderEmailRecipient = getEnv('REMINDER_EMAIL_RECIPIENT');
if (!reminderEmailRecipient && !isProduction) {
  throw new Error('REMINDER_EMAIL_RECIPIENT must be set in non-production environments');
}

if (isProduction && /(localhost|127\.0\.0\.1)/.test(databaseUrl)) {
  throw new Error('DATABASE_URL must not point to localhost in production');
}
if (!isProduction && !reminderEmailRecipient) {
  throw new Error('REMINDER_EMAIL_RECIPIENT must be set in non-production environments');
}

export const config = {
  databaseUrl,
  resendApiKey: getEnv('RESEND_API_KEY', ''),
  nodeEnv,
  port: parseInt(getEnv('PORT', '3001'), 10),
  seedOnStartup: getEnvBoolean('SEED_ON_STARTUP', !isProduction),
  cleanDbOnShutdown: getEnvBoolean('CLEAN_DB_ON_SHUTDOWN', !isProduction),
  reminderCheckIntervalMinutes: parseInt(getEnv('REMINDER_CHECK_INTERVAL_MINUTES', '1'), 10),
  reminderEmailRecipient: getEnv('REMINDER_EMAIL_RECIPIENT'),
};
