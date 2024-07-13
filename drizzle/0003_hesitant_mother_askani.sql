CREATE TABLE `blogsComments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`approved` integer DEFAULT 0,
	`post_id` integer,
	`parent_comment_id` integer,
	`author` text,
	`author_email` text,
	`date` text,
	`body` text
);
