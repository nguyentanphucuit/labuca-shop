import React from "react";
import Link from "next/link";
import { formatPriceVND } from "@/app/constants/common";
import Image, { StaticImageData } from "next/image";

interface SourceDetailsProps {
  image: StaticImageData;
  title: string;
  subtitle: string;
  link: string;
  date: string;
  price: number;
  discount: number;
  type: string;
}

const SourceDetails = ({
  image,
  title,
  type,
  link,
  price,
  discount,
}: SourceDetailsProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative w-76 h-60">
        <Link href={link} target="_blank">
          <Image
            fill
            className="rounded-t-lg"
            alt="metagun button"
            src={image}
          />
        </Link>
      </div>
      <div className="p-5">
        <a
          href="#"
          className="flex-none rounded bg-gray-900 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
          {type}
        </a>
        <p className="my-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
          {title}
        </p>
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg line-through font-semibold text-gray-500 dark:text-white ">
            {formatPriceVND(price)}
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white ">
            {formatPriceVND((price * (100 - discount)) / 100)}
          </p>

          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg
              className="w-6 h-6 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SourceDetails;
