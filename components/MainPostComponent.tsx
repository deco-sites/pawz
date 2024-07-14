import Image from "apps/website/components/Image.tsx";
import { BlogPost } from "apps/blog/types.ts";

export interface Props {
  post?: BlogPost | null;
  class?: string;
  inGrid?: boolean;
}

const DEFAULT_IMAGE =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9";

export default function MainPostComponent({
  post = {
    name: "ab123cd4",
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
  class: _class = "",
  inGrid,
}: Props) {
  return (
    <div
      class={`group relative container lg:mx-auto text-sm before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full hover:before:w-[calc(100%_+_32px)] hover:before:h-[calc(100%_+_32px)] before:border before:border-base-300 before:rounded-lg hover:before:-top-4 hover:before:-left-4 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 before:z-0 ${_class}`}
    >
      <a
        href={`/blog/${post?.slug}`}
        class="gap-8 grid grid-cols-1 items-center md:grid-cols-2 h-full overflow-hidden"
      >
        <div class="relative flex justify-center w-full h-full">
          {post?.image && (
            <Image
              width={inGrid ? 491 : 656}
              height={inGrid ? 514 : 500}
              class="object-cover w-full h-full z-10 rounded-lg "
              sizes="(max-width: 656px) 100vw, 30vw"
              src={post?.image || ""}
              alt={post?.image}
              decoding="async"
              loading="lazy"
            />
          )}
          <div class="absolute bottom-0 flex items-center justify-center h-10 px-3 text-xs tracking-widest text-primary bg-secondary bg-opacity-60 backdrop-blur-lg rounded-md drop-shadow-md opacity-0 invisible group-hover:bottom-6 group-hover:opacity-100 group-hover:visible transition-all duration-300 hover:bg-opacity-100 z-10">
            LEIA MAIS
          </div>
        </div>
        <div class={`${inGrid ? "" : "p-6"} space-y-4`}>
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
      <hr class="lg:hidden border-base-200 mt-2.5" />
    </div>
  );
}
