import { AppContext } from "site/apps/site.ts";
import type { AppContext as RecordsApp } from "site/apps/deco/records.ts";
import { UserCommentary as Props } from "site/sdk/types.ts";
import { blogsComments } from "site/db/schema.ts";

export async function createCommentary(
  props: Props,
  req: Request,
  ctx: AppContext & RecordsApp,
): Promise<Props> {
  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;
  const name = `${form.get("name") ?? ""}`;
  const commentary = `${form.get("comment") ?? ""}`;
  const id = `${form.get("id") ?? ""}`;

  if (!email || !name || !commentary) {
    return { ...props };
  }

  const drizzle = await ctx.invoke("records/loaders/drizzle.ts");

  try {
    await drizzle.insert(blogsComments).values({
      // approved: 0,
      author: name,
      author_email: email,
      body: commentary,
      // date: new Date(),
      // id: crypto.randomUUID(),
      post_id: id,
    });

    return { ...props };
  } catch (e) {
    console.log(e);
    ctx.monitoring?.logger?.error(e);
    return {
      ...props,
    };
  }
}
