"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "/public/assets/img/labuca-logo.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { listType } from "../constants";
import { classNames } from "../constants/common";
import { DropdownProps } from "../types/common";
import CartButton from "./CartButton";

const navigation = [
  { name: "Trang chủ", href: "/", current: true },
  {
    name: "Giày",
    href: "/shoes",
    current: false,
    blank: false,
    dropdown: true,
    listDropdown: listType,
  },
  { name: "Chính sách", href: "/policy", current: false },
  { name: "Thông tin", href: "/aboutUs", current: false },
];
const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  navigation.forEach((item) => {
    item.current = item.href === pathname;
  });

  const openMainMenu = () => {
    console.log(open);
    setOpen(!open);
  };
  return (
    <nav className="bg-white border-b">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              aria-controls="mobile-menu"
              onClick={() => openMainMenu()}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${open ? "hidden" : "block"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`${open ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:justify-start sm:ml-16">
            <div className="flex shrink-0 items-center">
              <Link href="/" className="flex items-center">
                <Image className="h-8 w-40 object-contain" alt="labuca logo" src={logo} />
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) =>
                  item.dropdown ? (
                    <Dropdown key={item.name} {...item} />
                  ) : (
                    <Link
                      key={item.name}
                      target={item.blank ? "_blank" : "_self"}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "text-black font-semibold after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-[calc(100%-24px)] after:scale-x-100 after:bottom-0 after:left-[12px]"
                          : "text-gray-600 hover:text-black relative after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-[calc(100%-24px)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:bottom-0 after:left-[12px]",
                        "px-3 py-2 text-sm font-medium relative"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right section - can be used for cart, account, etc */}
          <div className="flex items-center gap-4 md:px-6 lg:px-12">
            <CartButton />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={open ? "sm:hidden pt-20" : "hidden"} id="mobile-menu">
        <div className="space-y-1 px-4 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              target={item.blank ? "_blank" : "_self"}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current ? "text-black font-semibold" : "text-gray-700 hover:text-black",
                "block px-3 py-2 text-base font-medium rounded-md"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Dropdown = (props: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={classNames(
          props.current
            ? "text-black font-semibold after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-[calc(100%-24px)] after:scale-x-100 after:bottom-0 after:left-[12px]"
            : "text-gray-600 hover:text-black relative after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-[calc(100%-24px)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:bottom-0 after:left-[12px]",
          "px-3 py-2 text-sm font-medium relative inline-flex items-center gap-1 outline-none"
        )}
      >
        {props.name}
        <svg
          className="w-4 h-4 ml-0.5 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white border border-gray-100 rounded-lg shadow-lg mt-1 min-w-[200px] p-1 animate-in fade-in-0 zoom-in-95"
        align="start"
        sideOffset={8}
      >
        {props.listDropdown.map((item) => (
          <DropdownMenuItem key={item.value} className="focus:outline-none">
            <Link
              href={item.href}
              className="block w-full px-4 py-2.5 text-sm text-gray-600 hover:text-black rounded-md hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
