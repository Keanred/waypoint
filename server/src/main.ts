import app from './app';
import { config } from './config';
import { disconnectDb } from './db/client';
import { startReminderScheduler } from './services/scheduler';

let isShuttingDown = false;

const gracefulShutdown = (server: ReturnType<typeof app.listen>) => async (): Promise<void> => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log('Shutdown signal received, shutting down gracefully...');

  await disconnectDb();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

const start = async (): Promise<void> => {
  const server = app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
    startReminderScheduler();
  });

  process.on('SIGTERM', gracefulShutdown(server));
  process.on('SIGINT', gracefulShutdown(server));
};

void start();
