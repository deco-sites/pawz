import { UserCommentary } from "site/sdk/types.ts";
import { Commentary } from "site/components/ui/Commentary.tsx";

export interface CommentaryListProps {
  commentaries: UserCommentary[]
}

export const CommentaryList = ({ commentaries }: CommentaryListProps) => {
  return (
    <div class="flex flex-col gap-6 w-full max-w-3xl mx-auto divide-y divide-x-base-200">
      <h3 class="heading-2 py-3">Comentários <span>({commentaries.length})</span>:</h3>
      {commentaries.length === 0 
        ? <p class="paragraph text-base-400 py-4">Seja o primeiro a comentar!</p>
        : commentaries.map((commentary) => (
            <Commentary {...commentary} />
          ))
      }
    </div>
  );
}