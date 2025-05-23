'use client';
import React from 'react';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const usePathName = usePathname();
  const { replace } = useRouter();
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${usePathName}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0 py-4 max-w-screen-sm">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          className={`peer block w-full rounded-lg border ${
            isFocused ? 'border-black' : 'border-gray-200'
          } py-2.5 pl-11 pr-4 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-black`}
          placeholder={placeholder}
          onChange={e => {
            handleSearch(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <svg
          className={`absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 transition-colors duration-200 ${
            isFocused ? 'text-black' : 'text-gray-400'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchParams.get('query') && (
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete('query');
              replace(`${usePathName}?${params.toString()}`);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Clear search"
          >
            <svg
              className="h-4 w-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
