import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { sql } from "drizzle-orm";

export const newsletter = sqliteTable("newsletter", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  email: text("email").notNull(),
  confirmed_at: text("confirmed_at"),
  confirmation_key: text("confirmation_key"),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  approved: integer("approved").default(0),
  post_id: text("post_id").notNull(),
  parent_comment_id: integer("parent_comment_id").notNull().default(0),
  author: text("author").notNull().default("Anonimo"),
  author_email: text("author_email"),
  date: integer("date", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  body: text("body").notNull(),
});
