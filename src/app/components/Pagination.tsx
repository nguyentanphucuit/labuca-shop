"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { sourcesPerPage } from "../constants";

const Pagination = ({ totalNumber, totalPages }: { totalNumber: number; totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const start = (currentPage - 1) * sourcesPerPage + 1;
  const end = Math.min(currentPage * sourcesPerPage, totalNumber);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <Link
        key="prev"
        href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
        className={`relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-l-md ${
          currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="sr-only">Previous</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    );

    // First page if not in range
    if (startPage > 1) {
      buttons.push(
        <Link
          key={1}
          href={createPageURL(1)}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          1
        </Link>
      );
      if (startPage > 2) {
        buttons.push(
          <span
            key="dots1"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700"
          >
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Link
          key={page}
          href={createPageURL(page)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
            currentPage === page ? "z-10 bg-black text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      );
    }

    // Last page if not in range
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span
            key="dots2"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700"
          >
            ...
          </span>
        );
      }
      buttons.push(
        <Link
          key={totalPages}
          href={createPageURL(totalPages)}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          {totalPages}
        </Link>
      );
    }

    // Next button
    buttons.push(
      <Link
        key="next"
        href={currentPage < totalPages ? createPageURL(currentPage + 1) : "#"}
        className={`relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-r-md ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="sr-only">Next</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    );

    return buttons;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-6 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Hiển thị <span className="font-medium">{start}</span> đến{" "}
            <span className="font-medium">{end}</span> của{" "}
            <span className="font-medium">{totalNumber}</span> sản phẩm
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {renderPaginationButtons()}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
