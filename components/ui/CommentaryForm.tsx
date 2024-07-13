interface Props {
  id: string;
}

export const CommentaryForm = ({ id }: Props) => {
  return (
    <div class="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div class="flex flex-col">
        <h3 class="heading-2 py-3">Deixe um comentário</h3>
        <p class="paragraph text-base-400">
          Seu email não será publicado. Campos obrigatórios estão marcados com *
        </p>
      </div>
      <form class="flex flex-col gap-6">
        <textarea
          class="p-4 border border-base-200 rounded-lg paragraph"
          placeholder="Comentário *"
          required
        >
        </textarea>
        <div class="flex flex-auto divide-x divide-x-base-200 rounded-lg border border-base-200 overflow-hidden">
          <input type="text" name="id" value={id} class="hidden" />
          <input
            class="p-4 paragraph w-full rounded-l-lg"
            type="text"
            placeholder="Nome *"
            required
          />
          <input
            class="p-4 paragraph w-full"
            type="email"
            placeholder="Email *"
            required
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
    </div>
  );
};
