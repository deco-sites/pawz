import { AppContext } from "site/apps/site.ts";
import type { AppContext as RecordsApp } from "site/apps/deco/records.ts";
import { comments } from "site/db/schema.ts";
import { useSection } from "deco/hooks/useSection.ts";

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
  postId: string;
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

// A section that has an hx-get/post/put will automatically execute
// the action function when the form is submitted.
// If no action is present, it will fallback to the loader function.
// export function loader(props: Props) {
//   return props;
// }

export const CommentaryForm = (props: Props) => {
  const { postId, submissionResponse } = props;
  return (
    <section class="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div id="commentary-form-result">
        {submissionResponse && !submissionResponse.error && (
          <div class="flex flex-col">
            <p class="paragraph text-base-300 bg-green-400">
              Comentário enviado com sucesso e aguardando moderação.
            </p>
          </div>
        )}
        {submissionResponse?.error && (
          <div class="flex flex-col">
            <p class="paragraph text-white bg-red-400">
              Seu comentário não foi enviado. Por favor, tente novamente.
            </p>
          </div>
        )}
      </div>
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
        hx-target="#commentary-form-result"
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
  );
};
