export interface CommentaryProps {
  userName: string;
  createdAt: string;
  commentary: string;
}

export const Commentary = ({ userName, createdAt, commentary }: CommentaryProps) => {
  return (
    <div class="flex w-full py-6 gap-x-6">
      <div class="rounded-lg overflow-hidden w-11 h-11 bg-base-200"></div>
      <div class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <span class="paragraph font-semibold text-base-400">{userName}</span>
          <span class="text-xs tracking-widest text-base-300">{createdAt}</span>
        </div>
        <p class="paragraph text-base-400 max-w-80" dangerouslySetInnerHTML={{ __html: commentary }}>
        </p>
      </div>
    </div>
  )
}