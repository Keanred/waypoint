import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from '../config';

const sql = neon(config.databaseUrl);
export const db = drizzle(sql);

export const disconnectDb = async (): Promise<void> => {
  // Neon HTTP is stateless, so there is no persistent connection to close.
  // Keep this hook for graceful shutdown and future DB client changes.
};
