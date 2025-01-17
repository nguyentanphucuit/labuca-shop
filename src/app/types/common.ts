import { StaticImageData } from "next/image";

export interface ProductDetailProps {
  id: string | number;
  image: StaticImageData;
  title: string;
  href: string;
  subtitle: string;
  content: string;
  link: string;
  date: string;
  price: number;
  discount: number;
  type: string;
}

export interface ProductTypes {
  id: string | number;
  code: string;
  title: string;
  subtitle: string;
  href: string;
  content: string;
  color: string;
  size: string;
  type: string;
  date: string;
  image: string | StaticImageData;
  price: number;
  discount: number;
}
