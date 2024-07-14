import { AppContext } from "site/apps/site.ts";
import type { AppContext as RecordsApp } from "site/apps/deco/records.ts";
import { eq } from "drizzle-orm";

import { comments } from "site/db/schema.ts";
import type { UserCommentary } from "site/sdk/types.ts";
import { useSection } from "deco/hooks/useSection.ts";

interface Props {
  commentaries?: UserCommentary[];
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext & RecordsApp,
) {
  const form = await req.formData();

  const comment_id = `${form.get("id")}`;
  const action = `${form.get("action")}`;

  const drizzle = await ctx.invoke("records/loaders/drizzle.ts");

  try {
    if (action === "approve" && comment_id && action) {
      await drizzle.update(comments)
        .set({
          approved: 1,
        })
        .where(eq(comments.id, Number(comment_id)));
      return { ...props };
    } else if (action === "delete") {
      await drizzle.delete(comments)
        .where(eq(comments.id, Number(comment_id)));
      return { ...props };
    }
  } catch (e) {
    console.log(e);
    ctx.monitoring?.logger?.error(e);
    return { ...props };
  }
}

export async function loader(
  props: Props,
  _req: Request,
  ctx: AppContext & RecordsApp,
) {
  const drizzle = await ctx.invoke("records/loaders/drizzle.ts");

  try {
    const recs = await drizzle
      .select()
      .from(comments)
      .where(eq(comments.approved, 0))
      .orderBy(comments.date);

    return { ...props, commentaries: recs };
  } catch (e) {
    console.log(e);
    ctx.monitoring?.logger?.error(e);
    return { ...props, commentaries: null };
  }
}

export default function CommentModeration(props: Props) {
  const { commentaries } = props;
  console.log("moderations", commentaries);
  return (
    <div className="overflow-x-auto" id="commentary-table">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {/* <th></th> */}
            <th>ID</th>
            <th>POST_ID</th>
            <th>AUTHOR</th>
            <th>AUTHOR_EMAIL</th>
            <th>DATE</th>
            <th>BODY</th>
            <th>APPROVE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {commentaries?.map((comment, _index) => (
            <tr key={comment.id}>
              {/* <td>{index + 1}</td> */}
              <td>{comment.id}</td>
              <td>{comment.post_id}</td>
              <td>{comment.author}</td>
              <td>{comment.author_email}</td>
              <td>{comment.date}</td>
              <td>{comment.body}</td>
              <td>
                <form
                  hx-target="#commentary-table"
                  hx-swap="outerHTML"
                  hx-post={useSection()}
                >
                  <input
                    type="text"
                    name="id"
                    value={comment.id}
                    hidden
                    required
                  />
                  <input
                    type="text"
                    name="action"
                    value="approve"
                    hidden
                    required
                  />
                  <button>✅</button>
                </form>
              </td>
              <td>
                <form
                  hx-target="#commentary-table"
                  hx-swap="outerHTML"
                  hx-post={useSection()}
                >
                  <input
                    type="text"
                    name="id"
                    value={comment.id}
                    hidden
                    required
                  />
                  <input
                    type="text"
                    name="action"
                    value="delete"
                    hidden
                    required
                  />
                  <button>❌</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
