import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api', (_req: Request, res: Response) => {
  res.send('Hello, Waypoint!');
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Handle errors
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

export default app;
