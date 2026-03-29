# Waypoint

A personal task and reminder tracker with recurring task support, built as an npm workspace monorepo.

## Tech Stack

- **Backend:** Express 5 + TypeScript (Node.js)
- **Database:** PostgreSQL 17 with Drizzle ORM
- **Frontend:** React 18 + TypeScript + Material UI 7
- **Validation:** Shared Zod schemas (`@waypoint/schemas`)
- **Tooling:** Vite, Vitest, ESLint, Prettier, Just

## Project Structure

```
waypoint/
├── server/             # Express backend
│   ├── src/
│   │   ├── db/         # Database client, schema & queries
│   │   ├── routes/     # HTTP endpoints (tasks, reminders)
│   │   ├── services/   # Business logic
│   │   ├── errors/     # Custom HTTP errors
│   │   ├── app.ts      # Express app setup
│   │   ├── config.ts   # Environment config
│   │   └── main.ts     # Server entry point
│   └── drizzle/        # Migrations
├── client/             # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page-level views & modals
│   │   ├── api.ts      # API client
│   │   └── main.tsx    # React entry point
│   └── index.html
├── schemas/            # Shared Zod schemas (npm workspace)
│   └── src/index.ts
├── Justfile            # Task runner recipes
└── docker-compose.yml  # PostgreSQL service
```

## Setup

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- [Just](https://github.com/casey/just) command runner (optional but recommended)

### Quick Start

```bash
just install        # npm install
just dev            # starts Postgres, runs both dev servers
```

Or manually:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local — at minimum set POSTGRES_PASSWORD
   ```

3. **Start PostgreSQL:**

   ```bash
   docker compose --env-file .env.local up -d postgres
   ```

4. **Run database migrations:**

   ```bash
   npm run build --workspace=schemas
   npm run db:migrate
   ```

5. **Start development servers:**

   ```bash
   npm run dev
   ```

   - Backend: http://localhost:3001
   - Frontend: http://localhost:5173

## Development Commands

### Just Recipes

```bash
just              # List available recipes
just dev          # Start Postgres + dev servers
just test         # Run all tests
just typecheck    # Type-check server
just db-up        # Start Postgres container
just db-down      # Stop Postgres container
just db-logs      # Tail Postgres logs
```

### npm Scripts (root)

```bash
npm run dev       # Start both dev servers
npm run build     # Build schemas → server → client
npm test          # Run all tests
npm run lint      # Lint all workspaces
npm run format    # Format with Prettier
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Run Drizzle migrations
npm run db:studio    # Open Drizzle Studio
```

### Per-Workspace

```bash
# Server
cd server
npm run dev           # Dev server with hot reload (tsx --watch)
npm run build         # Compile TypeScript
npm test              # Run Vitest
npm run typecheck     # Type-check without emit

# Client
cd client
npm run dev           # Vite dev server
npm run build         # Production build
npm test              # Run Vitest

# Schemas
cd schemas
npm run build         # Compile shared schemas
```

## Features

- ✅ Create and list tasks with due dates and descriptions
- ✅ Recurring tasks (daily, weekly, monthly) with optional end date
- ✅ Attach multiple reminders per task (offset by minutes, hours, or days)
- ✅ Dashboard with task groups and stat cards
- ✅ Create task/reminder modals
- ✅ Database seeding in development
- ✅ Graceful shutdown with optional DB cleanup
- ⏳ Email notifications via Resend
- ⏳ Edit/delete tasks
- ⏳ Task completion tracking

## Environment Variables

Configured via `.env.local` (see `.env.example`):

| Variable                          | Description                    | Default                 |
| --------------------------------- | ------------------------------ | ----------------------- |
| `POSTGRES_USER`                   | PostgreSQL user                | `waypoint_user`         |
| `POSTGRES_PASSWORD`               | PostgreSQL password            | `waypoint_password`     |
| `POSTGRES_DB`                     | PostgreSQL database name       | `waypoint`              |
| `POSTGRES_HOST`                   | PostgreSQL host                | `localhost`             |
| `POSTGRES_PORT`                   | PostgreSQL port                | `5432`                  |
| `DATABASE_URL_DEV`                | Override dev connection string | _(built from above)_    |
| `DATABASE_URL_PROD`               | Production connection string   | _(required in prod)_    |
| `PORT`                            | Server port                    | `3001`                  |
| `NODE_ENV`                        | Environment                    | `development`           |
| `SEED_ON_STARTUP`                 | Seed demo data on start        | `true` in dev           |
| `CLEAN_DB_ON_SHUTDOWN`            | Drop data on shutdown          | `true` in dev           |
| `RESEND_API_KEY`                  | Resend email API key           | _(empty)_               |
| `REMINDER_CHECK_INTERVAL_MINUTES` | Reminder check frequency       | `1`                     |
| `REMINDER_EMAIL_RECIPIENT`        | Notification recipient email   | `test@example.com`      |

## Testing

```bash
npm test                       # All workspaces
npm test --workspace=server    # Server only
npm test --workspace=client    # Client only
```
