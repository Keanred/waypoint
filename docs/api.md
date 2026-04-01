# Waypoint API

This document describes the currently implemented HTTP API in the server.

## Base URL

- Development: `http://localhost:3001/api`

## Response Envelope

All endpoints use a common envelope.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": "Human readable message"
}
```

For request validation failures, `error` is an array of Zod issues.

## Tasks

### GET /tasks

Returns all tasks and reminders.

- Status: `200 OK`

Response:

```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "00000000-0000-0000-0000-000000000001",
        "title": "Write tests",
        "description": "TDD all the things",
        "dueDate": "2026-04-01T00:00:00.000Z",
        "recurrence": "NONE",
        "recurringEndDate": null,
        "createdAt": "2026-03-27T00:00:00.000Z",
        "updatedAt": "2026-03-27T00:00:00.000Z"
      }
    ],
    "reminders": [
      {
        "id": "00000000-0000-0000-0000-000000000002",
        "taskId": "00000000-0000-0000-0000-000000000001",
        "offsetValue": 1,
        "offsetUnit": "DAYS",
        "sentAt": null,
        "createdAt": "2026-03-27T00:00:00.000Z"
      }
    ]
  }
}
```

### POST /tasks

Creates a new task, optionally with reminders in a single atomic operation.

- Status: `201 Created`
- Status: `400 Bad Request` for schema validation errors
- Status: `422 Unprocessable Entity` for business-rule validation

Request body:

```json
{
  "title": "New task",
  "description": "Optional",
  "dueDate": "2026-04-01T00:00:00.000Z",
  "recurrence": "NONE",
  "recurringEndDate": "2026-05-01T00:00:00.000Z",
  "reminders": [
    { "offsetValue": 1, "offsetUnit": "DAYS" },
    { "offsetValue": 30, "offsetUnit": "MINUTES" }
  ]
}
```

Notes:

- `title` is required and must be non-empty.
- `dueDate` is required.
- `recurrence` defaults to `NONE` when omitted.
- `recurringEndDate` is optional.
- `dueDate` cannot be in the past.
- `recurringEndDate` cannot be before `dueDate`.
- `reminders` is optional and defaults to `[]`. Each reminder requires a positive integer `offsetValue` and an `offsetUnit` (defaults to `DAYS`).
- The task and its reminders are created atomically in a single database transaction.

Success response (`201`):

```json
{
  "success": true,
  "data": {
    "task": {
      "id": "00000000-0000-0000-0000-000000000001",
      "title": "New task",
      "description": "Optional",
      "priority": "medium",
      "dueDate": "2026-04-01T00:00:00.000Z",
      "recurrence": "NONE",
      "recurringEndDate": null,
      "createdAt": "2026-03-28T10:00:00.000Z",
      "updatedAt": "2026-03-28T10:00:00.000Z"
    },
    "reminders": [
      {
        "id": "00000000-0000-0000-0000-000000000002",
        "taskId": "00000000-0000-0000-0000-000000000001",
        "offsetValue": 1,
        "offsetUnit": "DAYS",
        "sentAt": null,
        "createdAt": "2026-03-28T10:00:00.000Z"
      },
      {
        "id": "00000000-0000-0000-0000-000000000003",
        "taskId": "00000000-0000-0000-0000-000000000001",
        "offsetValue": 30,
        "offsetUnit": "MINUTES",
        "sentAt": null,
        "createdAt": "2026-03-28T10:00:00.000Z"
      }
    ]
  }
}
```

Validation error response (`400`):

```json
{
  "success": false,
  "error": [
    {
      "code": "invalid_type",
      "path": ["title"],
      "message": "Required"
    }
  ]
}
```

Business-rule error response (`422`):

```json
{
  "success": false,
  "error": "Due date cannot be in the past"
}
```

### PATCH /tasks/:id

Updates an existing task with partial fields.

- Status: `200 OK`
- Status: `400 Bad Request` for schema validation errors
- Status: `404 Not Found` when task does not exist
- Status: `422 Unprocessable Entity` for business-rule validation

Path params:

- `id` (UUID string)

Request body (all fields optional):

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2026-04-05T00:00:00.000Z",
  "recurrence": "WEEKLY",
  "recurringEndDate": "2026-06-01T00:00:00.000Z"
}
```

Success response (`200`):

```json
{
  "success": true,
  "data": {
    "id": "00000000-0000-0000-0000-000000000001",
    "title": "Updated title",
    "description": "Updated description",
    "dueDate": "2026-04-05T00:00:00.000Z",
    "recurrence": "WEEKLY",
    "recurringEndDate": null,
    "createdAt": "2026-03-27T00:00:00.000Z",
    "updatedAt": "2026-03-28T10:10:00.000Z"
  }
}
```

Not found response (`404`):

```json
{
  "success": false,
  "error": "Task <id> not found"
}
```

### DELETE /tasks/:id

Deletes an existing task.

- Status: `200 OK`
- Status: `404 Not Found` when task does not exist

Path params:

- `id` (UUID string)

Success response (`200`):

```json
{
  "success": true,
  "data": {
    "message": "Task '<id>' deleted"
  }
}
```

Not found response (`404`):

```json
{
  "success": false,
  "error": "Task <id> not found"
}
```

## Enums

### RecurrenceType

- `NONE`
- `DAILY`
- `WEEKLY`
- `MONTHLY`

### OffsetUnit

- `MINUTES`
- `HOURS`
- `DAYS`

## Current Scope

This document reflects the currently implemented server routes in `server/src/routes/tasks.ts`.
