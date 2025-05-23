import { Editor } from '@tiptap/react';
import { StaticImageData } from 'next/image';
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
  typeValue: string;
  typeLabel: string;
  date: string;
  price: number;
  discount: number;
}

export interface ToolbarProps {
  editor: Editor | null;
  content: string;
}

export interface ListDropdownProps {
  value: string;
  label: string;
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
