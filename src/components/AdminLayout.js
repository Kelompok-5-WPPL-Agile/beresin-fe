import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MENU_LIST } from "./constants";
import styles from "../app/globals.css";
import { BellIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

const Layout = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [activePath, setActivePath] = useState(pathName);
  const [activeMenu, setActiveMenu] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      const aside = document.getElementById("beresin-sidebar");
      if (!aside.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    const activedMenu = MENU_LIST.find((menu) => menu.path === activePath);
    if (activedMenu) {
      setActiveMenu(activedMenu.name);
    } else {
      setActiveMenu("");
    }
  }, [activePath]);

  const handleChangePage = (path) => {
    router.push(path);
    setIsOpen(false); 
  };
  


  return (
    <div className="w-full h-screen relative flex-1 flex-row">
      <button
        data-drawer-target="beresin-sidebar"
        data-drawer-toggle="beresin-sidebar"
        aria-controls="beresin-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setIsOpen(!isOpen)} 
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3BottomLeftIcon className=" w-8 h-8" />
      </button>
      <aside
        id="beresin-sidebar"
        className={`fixed top-0 left-0 z-40 w-60 h-screen transition-transform ${
          isOpen ? "" : "-translate-x-full"
        } sm:translate-x-0 bg-primary text-white`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-center py-10">
          <h2 className="font-bold">BERESIN</h2>
        </div>
        <div className="h-full px-6 py-4 overflow-y-auto">
          <ul>
            {MENU_LIST.map((menu, index) => {
              return (
                <li
                  key={index}
                  className={
                    activePath === menu.path
                      ? "flex flex-row items-center px-3 py-1 rounded-md active mb-4"
                      : "flex flex-row items-center px-3 py-1 rounded-md mb-4"
                  }
                  onClick={() => handleChangePage(menu.path, menu.name)}
                >
                  {menu.icon && <menu.icon className="w-5 mr-2" />}
                  {menu.name}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div className="p-5 sm:ml-64 h-screen">
        <header className="px-12 flex flex-row items-center justify-between">
        
          <h1 className="font-bold text-3xl text-gray-600">
            {activeMenu ? activeMenu : ""}
          </h1>

          <div className="flex flex-row items-center">
            <BellIcon className=" w-8 h-8 mr-3" />
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <details className="dropdown">
              <summary className="m-1 btn">Yourname</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a className="text-red-500">Logout</a>
                </li>
              </ul>
            </details>
          </div>
        </header>
        <main className="mt-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
