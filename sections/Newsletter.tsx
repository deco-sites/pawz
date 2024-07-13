import { AppContext } from "../apps/site.ts";
import type { AppContext as RecordsApp } from "site/apps/deco/records.ts";
import type { AppContext as ResendApp } from "apps/resend/mod.ts";
import { useComponent } from "site/sections/Component.tsx";
import { newsletter } from "site/db/schema.ts";
import { eq } from "drizzle-orm";

interface Props {
  submissionResponse: { error?: string; email: string };
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext & RecordsApp & ResendApp,
): Promise<Props> {
  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;

  if (!email) {
    return { ...props, submissionResponse: { email: "" } };
  }

  const drizzle = await ctx.invoke("records/loaders/drizzle.ts");

  try {
    const recs = await drizzle
      .select({ email: newsletter.email })
      .from(newsletter)
      .where(eq(newsletter.email, email));

    if (recs.length) {
      return {
        ...props,
        submissionResponse: {
          error: "E-mail já cadastrado.",
          email,
        },
      };
    }

    const confirmationKey = crypto.randomUUID();

    await drizzle.insert(newsletter).values({
      email,
      confirmed_at: null,
      confirmation_key: confirmationKey,
    });

    await ctx.invoke("resend/actions/emails/send.ts", {
      subject: `Pawz Blog - confirme sua inscrição`,
      from: "no-reply@pawz.deco.site",
      html:
        `<h1>Obrigado!</h1><br/><br/>Clique <a href="https://pawz.deco.site/confirm-newsletter?key=${confirmationKey}">nesse link</a> para confirmar sua inscrição na minha newsletter.`,
      to: email,
    });

    return { ...props, submissionResponse: { email: "" } };
  } catch (e) {
    console.log(e);
    ctx.monitoring?.logger?.error(e);
    return {
      ...props,
      submissionResponse: { error: "Erro no sistema.", email },
    };
  }
}

export function loader(props: Props) {
  return props;
}

export default function Newsletter(props: Props) {
  const { submissionResponse } = props;

  return (
    <div class="container mx-auto flex items-center justify-center flex-col gap-4 px-4 lg:px-0">
      <h2 class="font-bold text-3xl text-primary uppercase -tracking-[0.03em] text-center">
        Se você curtiu esse post, inscreva-se e saiba muito mais.
      </h2>

      <p class="text-base text-primary text-center">
        Promoções, dicas de nutrição, lugares, comportamento e mais, direto na
        sua caixa de e-mail.
      </p>

      <form
        class="mx-auto lg:h-11 bg-white border border-black w-full lg:w-96 lg:pr-1.5 flex flex-col lg:flex-row"
        hx-target="closest section"
        hx-swap="outerHTML"
        hx-post={useComponent(import.meta.url, props)}
      >
        <input
          value={submissionResponse?.email}
          type="email"
          autocomplete="email"
          name="email"
          required
          placeholder="SEU E-MAIL"
          class="text-sm w-full lg:w-1/2 border-none pl-3 h-10 lg:h-full outline-none"
        />
        <button
          type="submit"
          class="w-full lg:w-1/2 p-1 bg-secondary lg:hover:bg-transparent lg:hover:text-gray-50 text-white transition-all"
        >
          <span class="[.htmx-request_&]:hidden inline">QUERO SABER MAIS!</span>
          <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
        </button>
      </form>

      <div class="max-w-3xl mx-auto text-center mt-5">
        {submissionResponse?.error && (
          <div role="alert" class="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{submissionResponse?.error}</span>
          </div>
        )}
        {submissionResponse && !submissionResponse.error && (
          <div role="alert" class="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Pronto! <br /> Você{" "}
              <b class="font-bold">receberá um e-mail para confirmação</b>.
              Clique no link para finalizar a inscrição.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
