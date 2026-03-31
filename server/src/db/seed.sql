-- Seed marker used for idempotent inserts and targeted cleanup.
-- Do not change unless you also update server/src/db/cleanup-seed.sql.
WITH seed_rows (
  title,
  description,
  priority,
  due_date,
  recurrence,
  reminder_offset_value,
  reminder_offset_unit
) AS (
  VALUES
    (
      'Submit expense report',
      'Finalize and submit last week''s travel reimbursements. [seed:waypoint-demo]',
      'high'::task_priority,
      date_trunc('hour', now()) + interval '-6 days' + interval '11 hours',
      'NONE'::recurrence,
      1,
      'DAYS'::offset_unit
    ),
    (
      'Follow up with vendor',
      'Confirm revised quote and expected delivery timeline. [seed:waypoint-demo]',
      'low'::task_priority,
      date_trunc('hour', now()) + interval '-2 days' + interval '14 hours',
      'NONE'::recurrence,
      3,
      'HOURS'::offset_unit
    ),
    (
      'Welcome to Waypoint',
      'This task was created automatically as startup seed data. [seed:waypoint-demo]',
      'medium'::task_priority,
      date_trunc('hour', now()) + interval '6 hours',
      'NONE'::recurrence,
      2,
      'HOURS'::offset_unit
    ),
    (
      'Plan this week',
      'Review priorities and block focused time for key deliverables. [seed:waypoint-demo]',
      'high'::task_priority,
      date_trunc('hour', now()) + interval '2 days' + interval '9 hours',
      'WEEKLY'::recurrence,
      1,
      'DAYS'::offset_unit
    ),
    (
      'Check recurring bills',
      'Confirm all monthly subscriptions and invoices are accounted for. [seed:waypoint-demo]',
      'medium'::task_priority,
      date_trunc('hour', now()) + interval '10 days' + interval '16 hours',
      'MONTHLY'::recurrence,
      6,
      'HOURS'::offset_unit
    ),
    (
      'Stretch break',
      'Quick posture reset and short walk. [seed:waypoint-demo]',
      'low'::task_priority,
      date_trunc('hour', now()) + interval '1 day' + interval '13 hours',
      'DAILY'::recurrence,
      30,
      'MINUTES'::offset_unit
    ),
    (
      'Backup project notes',
      'Export notes and sync to secure backup storage. [seed:waypoint-demo]',
      'high'::task_priority,
      date_trunc('hour', now()) + interval '5 weeks' + interval '12 hours',
      'NONE'::recurrence,
      3,
      'HOURS'::offset_unit
    ),
    (
      'Archive completed tasks',
      'Clean up completed entries and confirm reporting tags. [seed:waypoint-demo]',
      'medium'::task_priority,
      date_trunc('hour', now()) + interval '3 weeks' + interval '10 hours',
      'NONE'::recurrence,
      1,
      'DAYS'::offset_unit
    ),
    (
      'Refresh team docs',
      'Update onboarding docs and process references. [seed:waypoint-demo]',
      'low'::task_priority,
      date_trunc('hour', now()) + interval '7 weeks' + interval '15 hours',
      'MONTHLY'::recurrence,
      12,
      'HOURS'::offset_unit
    )
),
inserted_tasks AS (
  INSERT INTO tasks (title, description, priority, due_date, recurrence)
  SELECT title, description, priority, due_date, recurrence
  FROM seed_rows
  WHERE NOT EXISTS (
    SELECT 1
    FROM tasks
    WHERE description LIKE '%[seed:waypoint-demo]%'
  )
  RETURNING id, title
)
INSERT INTO reminders (task_id, offset_value, offset_unit)
SELECT inserted_tasks.id, seed_rows.reminder_offset_value, seed_rows.reminder_offset_unit
FROM inserted_tasks
JOIN seed_rows ON seed_rows.title = inserted_tasks.title;
