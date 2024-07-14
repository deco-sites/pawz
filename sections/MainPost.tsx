import Image from "apps/website/components/Image.tsx";
import { BlogPost } from "apps/blog/types.ts";
import MainPostComponent from "site/components/MainPostComponent.tsx";

const DEFAULT_IMAGE =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9";

export interface MainPostProps {
  post?: BlogPost | null;
}

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
}: MainPostProps) {
  return (
    <MainPostComponent post={post} />
  );
}
