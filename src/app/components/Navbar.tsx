"use client";
import React, { EventHandler, Fragment } from "react";
import logo from "/public/assets/img/labuca-logo.png";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { classNames } from "../constants/common";
import { DropdownProps } from "../types/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { listType } from "../constants";

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
    <nav className="bg-white-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className=" inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              onClick={() => openMainMenu()}
              aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image className="h-8 w-40" alt="labuca logo" src={logo} />
            </div>
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
                          ? "bg-gray-400 text-white"
                          : "bg-gray-500 text-gray-200 hover:bg-gray-700 hover:text-white",
                        "font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
                      )}>
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={open ? "sm:hidden + block" : "hidden"} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              target={item.blank ? "_blank" : "_self"}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "text-white bg-gray-900"
                  : "text-gray-600 hover:bg-gray-700 hover:text-white",
                "block font-medium rounded-lg text-sm px-3 py-2.5"
              )}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Dropdown = (props: DropdownProps) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="block font-medium rounded-lg text-sm px-3 py-2.5 bg-gray-500 text-gray-200 hover:bg-gray-700 hover:text-white">
          {props.name}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-500">
          {props.listDropdown.map((item) => (
            <DropdownMenuItem
              key={item.value}
              className="text-gray-200 bg-gray-500">
              <Link
                href={item.href}
                className="block font-medium rounded-lg text-sm px-3 py-2.5">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
