ALTER TABLE "tasks" ALTER COLUMN "priority" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "priority" SET DEFAULT 'Medium'::text;--> statement-breakpoint
UPDATE "tasks"
SET "priority" = CASE
	WHEN "priority" = 'low' THEN 'Low'
	WHEN "priority" = 'medium' THEN 'Medium'
	WHEN "priority" = 'high' THEN 'High'
	ELSE "priority"
END;--> statement-breakpoint
DROP TYPE "public"."task_priority";--> statement-breakpoint
CREATE TYPE "public"."task_priority" AS ENUM('Low', 'Medium', 'High');--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "priority" SET DEFAULT 'Medium'::"public"."task_priority";--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "priority" SET DATA TYPE "public"."task_priority" USING "priority"::"public"."task_priority";