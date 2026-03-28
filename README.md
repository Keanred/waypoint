# Waypoint - Task Reminder & Deadline Tracker

A personal reminder and task deadline tracker with automated email notifications, browser alerts, and recurring task support.

## Tech Stack

- **Backend:** Node.js + Express.js + TypeScript
- **Database:** PostgreSQL with Drizzle ORM
- **Frontend:** React 19 + TypeScript + Material-UI
- **Email:** Resend API
- **Jobs:** node-cron for background task scheduling

## Project Structure

```
waypoint/
├── server/           # Express backend
│   ├── src/
│   │   ├── db/       # Database client & schema
│   │   ├── routes/   # HTTP endpoints
│   │   ├── services/ # Business logic
│   │   ├── jobs/     # Background jobs
│   │   ├── app.ts    # Express app setup
│   │   └── main.ts   # Server entry point
│   └── drizzle/      # Migrations
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── api.ts    # API client
│   │   └── main.tsx  # React entry point
│   └── index.html
├── schemas/          # Shared Zod schemas
│   └── src/index.ts
└── docker-compose.yml
```

## Setup & Installation

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Resend API key (get from https://resend.com)

### Steps

1. **Clone and install dependencies:**

   ```bash
   cd /home/keanred/code/waypoint
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env and add your RESEND_API_KEY
   ```

3. **Start PostgreSQL:**

   ```bash
   docker-compose up -d
   ```

4. **Run database migrations:**

   ```bash
   npm run build --workspace=schemas
   cd server
   npx drizzle-kit migrate
   ```

5. **Start development servers:**

   ```bash
   npm run dev
   ```

   - Backend: http://localhost:3001
   - Frontend: http://localhost:5173

## Development Commands

### Backend

```bash
cd server
npm run dev        # Start dev server with hot reload
npm run build      # Build TypeScript
npm test           # Run tests
npm run typecheck  # Type check without emit
```

### Client

```bash
cd client
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm test           # Run tests
```

### Schemas

```bash
cd schemas
npm run build      # Compile TypeScript
npm run typecheck  # Type check
```

### Database

```bash
cd server
npx drizzle-kit generate   # Generate migrations
npx drizzle-kit migrate    # Run migrations
npx drizzle-kit studio     # Open Drizzle Studio browser UI
```

## Features (Planned)

- ✅ Create tasks with due dates and descriptions
- ✅ Configure multiple reminders per task (e.g., 1 day before, at deadline)
- ✅ Automated email notifications via Resend
- ✅ Browser notifications
- ✅ Simple recurrence (daily, weekly, monthly)
- ⏳ D-Bus desktop notifications (Linux)
- ⏳ Edit/delete tasks
- ⏳ Task completion tracking

## Testing

Run tests in both server and client:

```bash
npm test
```

For specific workspace:

```bash
npm test --workspace=server
npm test --workspace=client
```

## Environment Variables

| Variable                          | Description                    | Default                                                                |
| --------------------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| `DATABASE_URL`                    | PostgreSQL connection string   | `postgresql://waypoint_user:waypoint_password@localhost:5432/waypoint` |
| `RESEND_API_KEY`                  | Resend email API key           | (required)                                                             |
| `PORT`                            | Server port                    | `3001`                                                                 |
| `NODE_ENV`                        | Environment                    | `development`                                                          |
| `REMINDER_CHECK_INTERVAL_MINUTES` | Cron job frequency             | `1`                                                                    |
| `REMINDER_EMAIL_RECIPIENT`        | Email to send notifications to | `test@example.com`                                                     |

## License

MIT
