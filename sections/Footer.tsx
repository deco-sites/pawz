import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface FooterProps {
  logo?: {
    src?: ImageWidget;
    alt?: string;
  };
}

export default function Footer({
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
    alt: "Logo",
  },
}: FooterProps) {
  return (
    <footer class="flex flex-col items-center justify-center gap-6 w-full py-8 border-t border-base-200">
      <a href="/" class="px-3 py-2 rounded border border-secondary bg-secondary bg-opacity-10 hover:bg-opacity-100 hover:text-primary transition-all text-xs tracking-widest">Voltar ao topo</a>
      <Image src={logo.src} alt={logo.alt} width={110} height={66} />
    </footer>
  );
}
