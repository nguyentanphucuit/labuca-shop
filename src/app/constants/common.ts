import { ListItems, sourcesPerPage } from "./index";

const formatPriceVND = (price: number) => {
  return (
    (Math.round(price / 1000) * 1000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
  );
};

const totalNumberSearchQuery = (query: string) => {
  return ListItems.filter((source) =>
    source.title.toLowerCase().includes(query.toLowerCase())
  ).length;
};

const fetchSourcesPage = (query: string) => {
  return Math.round(totalNumberSearchQuery(query) / sourcesPerPage) + 1;
};

const fetchFilteredSource = (query: string, currentPage: number) => {
  const listSourceFilters = ListItems.filter((source) =>
    source.title.toLowerCase().includes(query.toLowerCase())
  );
  const start = (currentPage - 1) * sourcesPerPage;
  const end = currentPage * sourcesPerPage;
  return [...listSourceFilters].slice(start, end);
};
export function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export {
  formatPriceVND,
  fetchSourcesPage,
  fetchFilteredSource,
  totalNumberSearchQuery,
};
