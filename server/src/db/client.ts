import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres(process.env.DATABASE_URL || 'postgresql://waypoint_user:waypoint_password@localhost:5432/waypoint');
export const db = drizzle(queryClient);
