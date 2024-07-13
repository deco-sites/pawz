import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const newsletter = sqliteTable("newsletter", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique(),
  confirmed_at: text("confirmed_at"),
  confirmation_key: text("confirmation_key"),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  post_id: integer("post_id"),
  parent_comment_id: integer("parent_comment_id"),
  author: text("author"),
  author_email: text("author_email"),
  date: text("date"),
  body: text("body"),
});