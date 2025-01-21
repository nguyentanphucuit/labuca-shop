import { Editor } from "@tiptap/react";
import { StaticImageData } from "next/image";

export interface ProductDetailProps {
  id: string;
  image: string;
  title: string;
  href: string;
  subtitle: string;
  content: string;
  link: string;
  date: string;
  imageUrl: string;
  price: number;
  discount: number;
  type: string;
}

export interface ProductTypes {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  href: string;
  content: string;
  color: string;
  size: string;
  type: string;
  date: string;
  price: number;
  discount: number;
}

export interface ToolbarProps {
  editor: Editor | null;
  content: string;
}

export interface ListDropdownProps {
  id: string;
  name: string;
  href: string;
}

export interface DropdownProps {
  name: string;
  href: string;
  listDropdown: ListDropdownProps[];
  current: boolean;
  blank?: boolean;
  dropdown?: boolean;
}
