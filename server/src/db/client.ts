import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePg } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from '../config';

const isProduction = config.nodeEnv === 'production';

let pgClient: ReturnType<typeof postgres> | null = null;

export const db = isProduction
  ? drizzle(neon(config.databaseUrl))
  : (() => {
      pgClient = postgres(config.databaseUrl);
      return drizzlePg(pgClient);
    })();

export const disconnectDb = async (): Promise<void> => {
  if (pgClient) await pgClient.end();
};
