"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { classNames } from "../constants/common";

const Admin = () => {
  const navigation = [
    { name: "Sản phẩm", href: "/admin/products", blank: false, current: true },
    { name: "Banner", href: "/admin/banner", blank: false, current: true },
  ];
  const pathname = usePathname();
  navigation.forEach((item) => {
    item.current = item.href === pathname;
  });
  return (
    <div className="flex flex-row justify-center items-center gap-4 p-24">
      {navigation.map((item) => (
        <Link
          key={item.name}
          target={item.blank ? "_blank" : "_self"}
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          className={classNames(
            item.current
              ? "bg-blue-400 text-white"
              : "bg-blue-500 text-blue-200 hover:bg-blue-700 hover:text-white",
            "rounded-sm px-6 py-2 text-md font-medium"
          )}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Admin;
