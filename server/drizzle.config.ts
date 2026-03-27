import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://waypoint_user:waypoint_password@localhost:5432/waypoint',
  },
  verbose: true,
  strict: true,
});
