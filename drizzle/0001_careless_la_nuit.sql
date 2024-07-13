CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`post_id` integer,
	`parent_comment_id` integer,
	`author` text,
	`author_email` text,
	`date` text,
	`body` text
);
