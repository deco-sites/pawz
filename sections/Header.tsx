import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";

/**
 * @title {{{title}}}
 */
interface MenuProps {
  title: string;
  url: string;
}

interface Props {
  logo?: ImageWidget;
  alt?: string;
  menu?: MenuProps[];
}

const MenuItem = ({ title, url }: MenuProps) => (
  <li>
    <a
      href={url}
      class="font-light text-gray-50 hover:text-primary uppercase transition-all tracking-[0.16em] p-3 text-xs lg:text-sm"
    >
      {title}
    </a>
  </li>
);

const DrawerButton = () => (
  <>
    <input
      aria-label="menu-drawer"
      id="my-drawer"
      type="checkbox"
      class="drawer-toggle peer"
    />
    <label
      for="my-drawer"
      class="lg:hidden flex flex-col gap-1 w-7 h-7 rounded bg-gray-100 drawer-button p-1.5 absolute right-4 top-0"
    >
      <span class="w-full h-0.5 bg-gray-600 rounded-sm" />
      <span class="w-full h-0.5 bg-gray-600 rounded-sm" />
      <span class="w-full h-0.5 bg-gray-600 rounded-sm" />
    </label>
  </>
);

const SearchIcon = () => (
  <>
    <input
      aria-label="search"
      id="search"
      type="checkbox"
      class="drawer-toggle peer/search"
    />

    <label for="search">
      <Icon
        id="MagnifyingGlass"
        size={14}
        class="text-gray-50 hover:text-primary"
      />
    </label>
  </>
);

const SearchInput = () => (
  <form action="/s" class="hidden peer-checked/search:flex">
    <input
      id="search-blog"
      type="text"
      class="border border-gray-50 rounded text-gray-50 text-sm p-3"
      placeholder="Busque aqui"
    />
  </form>
);

export default function Header({ logo, alt, menu }: Props) {
  return (
    <header class="container mx-auto mt-7 lg:mt-8 lg:mb-5 relative fade-in">
      {logo && (
        <a href="/" class="flex items-center justify-center">
          <Image src={logo} alt={alt} width={110} height={66} />
        </a>
      )}

      <DrawerButton />

      {menu && (
        <nav class="hidden lg:flex peer-checked:flex flex-col items-center justify-evenly lg:pt-7 lg:pb-8 pt-4">
          <hr class="lg:hidden w-full border-gray-300 pb-2" />
          <div class="flex flex-col lg:flex-row items-center gap-3">
            <ul class="flex flex-col lg:flex-row items-center">
              {menu.map((item, index) => <MenuItem key={index} {...item} />)}
            </ul>

            <div class="flex flex-col items-center justify-center gap-4">
              <SearchIcon />
              <SearchInput />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
