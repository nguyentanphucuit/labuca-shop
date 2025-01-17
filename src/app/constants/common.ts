import { ListItems, sourcesPerPage } from "./index";

const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const formatPriceVND = (price: number) => {
  return (
    (Math.ceil(price / 1000) * 1000)
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
  return Math.ceil(totalNumberSearchQuery(query) / sourcesPerPage);
};

const fetchFilteredSource = (query: string, currentPage: number) => {
  const listSourceFilters = ListItems.filter((source) =>
    source.title.toLowerCase().includes(query.toLowerCase())
  );
  const start = (currentPage - 1) * sourcesPerPage;
  const end = currentPage * sourcesPerPage;
  return [...listSourceFilters].slice(start, end);
};

export {
  classNames,
  formatPriceVND,
  fetchSourcesPage,
  fetchFilteredSource,
  totalNumberSearchQuery,
};
