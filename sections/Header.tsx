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
  <li class="flex items-center shrink-0 h-10 lg:px-0">
    <a
      href={url}
      class="flex items-center adjust-nav w-full h-full px-3 font-light text-xs lg:text-sm tracking-[0.16em] text-base-400 hover:text-secondary uppercase transition-all"
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
      class="lg:hidden flex flex-col items-center justify-center gap-1 w-7 h-7 rounded bg-primary drawer-button p-1.5 absolute top-8 right-6"
    >
      <span class="w-4 h-0.5 bg-secondary rounded-sm transition-all" />
      <span class="w-4 h-0.5 bg-secondary rounded-sm" />
      <span class="w-4 h-0.5 bg-secondary rounded-sm transition-all" />
    </label>
  </>
);

// const SearchInput = () => (
//   <form action="/s" class="hidden peer-checked/search:flex">
//     <input
//       id="search-blog"
//       type="text"
//       class="border border-gray-50 rounded text-gray-50 text-sm p-3"
//       placeholder="Busque aqui"
//     />
//   </form>
// );

export default function Header({ logo, alt, menu }: Props) {
  return (
    <header
      id="header"
      class="header fixed top-0 flex flex-col items-center gap-y-6 w-full p-6 lg:p-8 make-aside z-20 bg-base-100 bg-opacity-30 backdrop-blur-md lg:backdrop-blur-0 lg:bg-opacity-100 border-base-200 border-b lg:border-b-0"
    >
      <DrawerButton />
      {logo && (
        <a href="/" class="flex items-center justify-center w-16 lg:w-auto">
          <Image src={logo} alt={alt} width={110} height={66} />
        </a>
      )}

      {menu && (
        <nav class="h-0 flex peer-checked:h-52 flex-col items-center justify-evenly overflow-hidden transition-all">
          <hr class="lg:hidden w-full border-gray-300 pb-2" />
          <div class="flex flex-col adjust-links gap-4 ">
            <ul class="flex adjust-direction items-center justify-center flex-wrap">
              {menu.map((item, index) => <MenuItem key={index} {...item} />)}
            </ul>
            <form
              action="/s"
              class="flex items-center gap-2 w-full lg:max-w-40 h-12 border-b border-base-300 hover:border-secondary"
            >
              <label>
                <Icon
                  id="MagnifyingGlass"
                  size={14}
                  class="text-base-400 hover:text-secondary"
                />
              </label>
              <input
                id="search-blog"
                type="text"
                class="w-full h-full bg-transparent rounded text-base-400 text-sm px-3 paragraph"
                placeholder="Busque aqui"
              />
            </form>
          </div>
        </nav>
      )}
    </header>
  );
}
