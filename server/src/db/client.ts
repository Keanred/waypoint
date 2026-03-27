import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL || 'postgresql://waypoint_user:waypoint_password@localhost:5432/waypoint');
export const db = drizzle(sql);
