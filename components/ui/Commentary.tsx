export interface CommentaryProps {
  author: string;
  date: string;
  body: string;
}

export const Commentary = ({ author, date, body }: CommentaryProps) => {
  return (
    <div class="flex w-full py-6 gap-x-6">
      <div class="rounded-lg overflow-hidden w-11 h-11 bg-base-200"></div>
      <div class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <span class="paragraph font-semibold text-base-400">{author}</span>
          <span class="text-xs tracking-widest text-base-300">{date}</span>
        </div>
        <p
          class="paragraph text-base-400 max-w-80"
          dangerouslySetInnerHTML={{ __html: body }}
        >
        </p>
      </div>
    </div>
  );
};
