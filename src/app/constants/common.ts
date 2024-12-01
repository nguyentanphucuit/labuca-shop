import { listSource, sourcesPerPage } from "./index";

const formatPriceVND = (price: number) => {
  return (
    (Math.round(price / 1000) * 1000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
  );
};

const totalNumberSearchQuery = (query: string) => {
  return listSource.filter((source) =>
    source.title.toLowerCase().includes(query.toLowerCase())
  ).length;
};

const fetchSourcesPage = (query: string) => {
  return Math.round(totalNumberSearchQuery(query) / sourcesPerPage) + 1;
};

const fetchFilteredSource = (query: string, currentPage: number) => {
  const listSourceFilters = listSource.filter((source) =>
    source.title.toLowerCase().includes(query.toLowerCase())
  );
  const start = (currentPage - 1) * sourcesPerPage;
  const end = currentPage * sourcesPerPage;
  return [...listSourceFilters].slice(start, end);
};

export {
  formatPriceVND,
  fetchSourcesPage,
  fetchFilteredSource,
  totalNumberSearchQuery,
};
