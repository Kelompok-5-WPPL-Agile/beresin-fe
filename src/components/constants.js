import {
  HomeIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";

export const MENU_LIST = [
  {
    name: "Dashboard",
    path: "/protected",
    icon: HomeIcon,
  },
  {
    name: "Task Menu",
    path: "/",
    icon: PencilSquareIcon,
  },
  {
    name: "Daftar Kategori",
    path: "/",
    icon: Squares2X2Icon,
  },
  {
    name: "Daftar User",
    path: "/",
    icon: UserGroupIcon,
  },
];
