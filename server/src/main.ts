import app from './app';
import { config } from './config';
import { disconnectDb } from './db/client';
import { cleanDatabase, seedDatabase } from './db/lifecycle';

let isShuttingDown = false;

const gracefulShutdown = (server: ReturnType<typeof app.listen>) => async (): Promise<void> => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log('Shutdown signal received, shutting down gracefully...');

  try {
    if (config.cleanDbOnShutdown) {
      await cleanDatabase();
    } else {
      console.log('Database cleanup skipped (CLEAN_DB_ON_SHUTDOWN=false).');
    }
  } catch (error) {
    console.error('Database cleanup failed during shutdown:', error);
  }

  await disconnectDb();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

const start = async (): Promise<void> => {
  try {
    if (config.seedOnStartup) {
      await seedDatabase();
    } else {
      console.log('Database seed skipped (SEED_ON_STARTUP=false).');
    }
  } catch (error) {
    console.error('Database seed failed:', error);
    process.exit(1);
  }

  const server = app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });

  process.on('SIGTERM', gracefulShutdown(server));
  process.on('SIGINT', gracefulShutdown(server));
};

void start();
