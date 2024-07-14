CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`approved` integer DEFAULT 0,
	`post_id` text NOT NULL,
	`parent_comment_id` integer DEFAULT 0 NOT NULL,
	`author` text DEFAULT 'Anonimo' NOT NULL,
	`author_email` text,
	`date` integer DEFAULT (unixepoch()) NOT NULL,
	`body` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `newsletter` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`confirmed_at` text,
	`confirmation_key` text
);
