import { ImageWidget } from "apps/admin/widgets.ts";

export interface UserCommentary {
  userName: string;
  createdAt: string;
  commentary: string;
  profileImage?: string;
}

export interface CTA {
  id?: string;
  href?: string;
  text?: string;
  outline?: boolean;
}