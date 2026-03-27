import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Waypoint!');
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;