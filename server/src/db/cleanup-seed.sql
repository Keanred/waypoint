-- Remove only demo records created by seed.sql.
DELETE FROM reminders
WHERE task_id IN (
  SELECT id
  FROM tasks
  WHERE description LIKE '%[seed:waypoint-demo]%'
);

DELETE FROM tasks
WHERE description LIKE '%[seed:waypoint-demo]%';
