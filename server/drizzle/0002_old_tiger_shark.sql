CREATE TABLE "settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"display_name" text NOT NULL,
	"reminder_email" text NOT NULL,
	"timezone" text DEFAULT 'utc' NOT NULL,
	"browser_notifications_enabled" boolean DEFAULT true NOT NULL,
	"desktop_notifications_enabled" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
