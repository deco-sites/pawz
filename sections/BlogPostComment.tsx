import { AppContext } from "site/apps/site.ts";
import type { AppContext as RecordsApp } from "site/apps/deco/records.ts";

import { useSection } from "deco/hooks/useSection.ts";

import { type BlogPostPage } from "apps/blog/types.ts";

import { comments } from "site/db/schema.ts";
import type { UserCommentary } from "site/sdk/types.ts";

import { and, eq } from "drizzle-orm";

interface commentarySubmissionResponse {
  error: boolean;
  message?: string;
  formDataBkp?: {
    post_id: string;
    author: string;
    author_email: string;
    comment: string;
  };
}

interface Props {
  page?: BlogPostPage | null;
  commentaries?: UserCommentary[];
  submissionResponse?: commentarySubmissionResponse;
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext & RecordsApp,
): Promise<Props> {
  const form = await req.formData();

  const post_id = `${form.get("post_id")}`;
  const author = `${form.get("author")}`;
  const author_email = `${form.get("author_email")}`;
  const comment = `${form.get("comment")}`;
  console.log("action", { post_id, author, author_email, comment });

  const drizzle = await ctx.invoke("records/loaders/drizzle.ts");
  try {
    await drizzle.insert(comments).values({
      post_id,
      author,
      author_email,
      body: comment,
    });
    return {
      ...props,
      submissionResponse: {
        error: false,
        message: "success on comments insert",
      },
    };
  } catch (e) {
    console.log(e);
    ctx.monitoring?.logger?.error(e);
    return {
      ...props,
      submissionResponse: {
        error: true,
        message: "error on comments insert",
        formDataBkp: {
          post_id,
          author,
          author_email,
          comment,
        },
      },
    };
  }
}

export const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext & RecordsApp,
) => {
  const drizzle = await ctx.invoke("records/loaders/drizzle.ts");

  try {
    const recs = await drizzle
      .select()
      .from(comments)
      .where(
        and(
          eq(comments.post_id, props.page!.post.name),
          eq(comments.approved, 1),
        ),
      )
      .orderBy(comments.date);

    return { ...props, commentaries: recs };
  } catch (e) {
    console.log(e);
    ctx.monitoring?.logger?.error(e);
    return { ...props, commentaries: null };
  }
};

export default function BlogPostComment(props: Props) {
  const { name } = props.page?.post || { name: "" };
  const { commentaries, submissionResponse } = props;
  const postId = name;

  return (
    <>
      <div class="flex flex-col gap-6 w-full max-w-3xl mx-auto divide-y divide-x-base-200">
        <h3 class="heading-2 py-3">
          Comentários <span>({commentaries?.length || 0})</span>:
        </h3>
        {commentaries?.map((commentary) => {
          const { author, body } = commentary;
          const date = commentary.date.toLocaleString();

          return (
            <div class="flex w-full py-6 gap-x-6">
              <div class="rounded-lg overflow-hidden w-11 h-11 bg-base-200">
              </div>
              <div class="flex flex-col gap-y-6">
                <div class="flex flex-col gap-y-2">
                  <span class="paragraph font-semibold text-base-400">
                    {author}
                  </span>
                  <span class="text-xs tracking-widest text-base-300">
                    {date}
                  </span>
                </div>
                <p
                  class="paragraph text-base-400 max-w-80"
                  dangerouslySetInnerHTML={{ __html: body }}
                >
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <section
        id="commentary-form"
        class="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-12 lg:pb-28"
      >
        {submissionResponse && !submissionResponse.error && (
          <div class="flex flex-col">
            <p class="paragraph text-white p-4 rounded-lg bg-green-400">
              Comentário enviado com sucesso e aguardando moderação.
            </p>
          </div>
        )}
        {submissionResponse?.error && (
          <div class="flex flex-col">
            <p class="paragraph text-white p-4 rounded-lg bg-red-400">
              Seu comentário não foi enviado. Por favor, tente novamente.
            </p>
          </div>
        )}
        <div class="flex flex-col">
          <h3 class="heading-2 py-3">Deixe um comentário</h3>
          <p class="paragraph text-base-300">
            Seu email não será publicado. Campos obrigatórios estão marcados com
            *. Máximo 200 caracteres.
          </p>
          <p class="text-xs text-gray-400">
            Obs: Comentários são moderados antes de serem publicados.
          </p>
        </div>
        <form
          class="flex flex-col gap-6"
          hx-target="#commentary-form"
          hx-swap="outerHTML"
          hx-post={useSection()}
        >
          <textarea
            class="p-4 border border-base-200 rounded-lg paragraph"
            type="text"
            name="comment"
            maxlength={200}
            placeholder="Comentário *"
            value={submissionResponse?.formDataBkp?.comment}
            required
          >
          </textarea>
          <div class="flex flex-auto divide-x divide-x-base-200 rounded-lg border border-base-200 overflow-hidden">
            <input type="text" name="post_id" value={postId} class="hidden" />
            <input
              class="p-4 paragraph w-full rounded-l-lg"
              type="text"
              autocomplete="name"
              name="author"
              placeholder="Nome *"
              value={submissionResponse?.formDataBkp?.author}
              required
            />
            <input
              class="p-4 paragraph w-full"
              type="email"
              autocomplete="email"
              name="author_email"
              placeholder="Email"
              value={submissionResponse?.formDataBkp?.author_email}
            />
            <input
              class="p-4 paragraph w-full rounded-r-lg"
              type="url"
              placeholder="Website"
            />
          </div>
          <button type="submit" class="button-200 h-10 w-fit">
            ENVIAR COMENTÁRIO
          </button>
        </form>
      </section>
    </>
  );
}
