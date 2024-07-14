import { BlogPost } from "apps/blog/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface postCardProps {
  post: BlogPost;
}

function calculateReadingTime(words: number): string {
  const wordsPerMinute = 250;
  const estimatedTimeMinutes = words / wordsPerMinute;

  const roundedReadingTime = Math.round(estimatedTimeMinutes);
  return `${roundedReadingTime} min`;
}

export const PostCard = ({ post }: postCardProps) => {
  return (
    <a
      href={`/blog/${post.slug}`}
      class="group relative flex flex-col gap-y-4 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border before:border-base-300 before:rounded-lg hover:before:scale-105 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 before:z-0"
    >
      <div class="relative flex justify-center rounded-lg overflow-hidden z-10">
        <Image
          width={364}
          height={242}
          class="object-fit object-center w-full group-hover:scale-110 transition-all duration-300"
          sizes="(max-width: 640px) 100vw, 30vw"
          src={post.image || ""}
          alt={post.image}
          decoding="async"
          loading="lazy"
        />
        <div class="absolute bottom-0 flex items-center justify-center h-10 px-3 text-xs tracking-widest text-primary bg-secondary bg-opacity-60 backdrop-blur-lg rounded-md drop-shadow-md opacity-0 invisible group-hover:bottom-6 group-hover:opacity-100 group-hover:visible transition-all duration-300 hover:bg-opacity-100">
          LEIA MAIS
        </div>
      </div>
      <div class="flex items-center gap-x-3">
        <span class="text-[10px] tracking-[3px] text-base-400">
          {post.date
            ? new Date(post.date).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })
            : ""}
        </span>
        <span class="flex items-center h-6 px-2 rounded bg-base-300 text-xs font-semibold text-white tracking-widest">
          {calculateReadingTime(post.content.split(" ").length)}
        </span>
        <div class="flex gap-x-2">
          {post.categories?.map((category) => (
            <div class="flex items-center h-6 px-2 bg-base-200 text-xs tracking-widest rounded uppercase">
              {category.name}
            </div>
          ))}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="heading-3">{post.title}</h3>
        <p class="paragraph text-base-400">{post.excerpt}</p>
      </div>
    </a>
  );
};
