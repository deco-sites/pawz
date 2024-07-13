import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { BlogPost } from "apps/blog/types.ts";

export interface CTA {
  id?: string;
  href?: string;
  text?: string;
  outline?: boolean;
}

/** @title {{{title}}} */
export interface Post {
  url?: string;
  title?: string;
  author?: string;
  excerpt?: string;
  image?: ImageWidget;
  date?: string;
  readingTime?: string;
  tags?: string[];
}

export interface Props {
  post?: BlogPost | null;
}

const DEFAULT_IMAGE =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9";

export default function MainPost({
  post = {
    slug: "/",
    title: "Title of blogpost #1",
    authors: [{ name: "Name of the author", email: "author@deco.cx" }],
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    image: DEFAULT_IMAGE,
    date: "01 Apr 2024",
    categories: [{ name: "Tag#1", slug: "tag-1" }],
    content: "Blog Post Content",
  },
}: Props) {
  return (
    <div class="relative container lg:mx-auto mx-2 text-sm before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full hover:before:w-[calc(100%_+_32px)] hover:before:h-[calc(100%_+_32px)] before:border before:border-base-300 before:rounded-lg hover:before:-top-4 hover:before:-left-4 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 before:z-0">
      <div class="space-y-16">
        <a
          href={`/blog/${post?.slug}`}
          class="gap-8 grid grid-cols-1 items-center md:grid-cols-2 overflow-hidden"
        >
          {post?.image && (
            <Image
              width={656}
              height={500}
              class="object-fit w-full z-10 rounded-lg "
              sizes="(max-width: 656px) 100vw, 30vw"
              src={post?.image || ""}
              alt={post?.image}
              decoding="async"
              loading="lazy"
            />
          )}
          <div class="p-6 space-y-4">
            <div class="flex flex-col gap-4">
              <h3 class="heading-3">{post?.title}</h3>
              <p class="paragraph text-base-400">{post?.excerpt}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              {post?.categories?.map((category) => (
                <div class="flex items-center h-6 px-2 bg-base-200 text-xs tracking-widest rounded uppercase">
                  {category.name}
                </div>
              ))}
            </div>
            <div class="flex flex-wrap gap-2 items-center">
              <span class="text-[10px] tracking-[3px] text-base-400">
                {post?.date
                  ? new Date(post?.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                  : ""}
              </span>
              <span>•</span>
              <span class="text-xs font-semibold">{post?.authors[0]?.name}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
