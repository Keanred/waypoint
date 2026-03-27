CREATE TYPE "public"."offset_unit" AS ENUM('MINUTES', 'HOURS', 'DAYS');--> statement-breakpoint
CREATE TYPE "public"."recurrence" AS ENUM('NONE', 'DAILY', 'WEEKLY', 'MONTHLY');--> statement-breakpoint
CREATE TABLE "reminders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_id" uuid NOT NULL,
	"offset_value" integer NOT NULL,
	"offset_unit" "offset_unit" DEFAULT 'DAYS' NOT NULL,
	"sent_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"due_date" timestamp with time zone NOT NULL,
	"recurrence" "recurrence" DEFAULT 'NONE' NOT NULL,
	"recurring_end_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_reminders_task_id" ON "reminders" USING btree ("task_id");--> statement-breakpoint
CREATE INDEX "idx_reminders_sent_at_task_id" ON "reminders" USING btree ("sent_at","task_id");--> statement-breakpoint
CREATE INDEX "idx_tasks_due_date" ON "tasks" USING btree ("due_date");