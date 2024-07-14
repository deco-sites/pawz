import { ImageWidget } from "apps/admin/widgets.ts";

export interface UserCommentary {
  id: number;
  approved: number;
  post_id: number;
  parent_comment_id: number;
  author: string;
  author_email: string;
  date: string;
  body: string;
}
