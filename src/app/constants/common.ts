import { ProductTypes } from "../types/common";
import { sourcesPerPage } from "./index";

const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const formatPriceVND = (price: number) => {
  return (Math.ceil(price / 1000) * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

const totalNumberSearchQuery = (items: { title: string }[], query: string) => {
  if (items === null || undefined || items.length === 0) return 0;
  return items.filter((source) => source.title?.toLowerCase().includes(query.toLowerCase())).length;
};

const fetchSourcesPage = (items: ProductTypes[], query: string) => {
  if (items === null || undefined || items.length === 0) return 0;
  return Math.ceil(totalNumberSearchQuery(items, query) / sourcesPerPage);
};

const fetchFilteredSource = (items: ProductTypes[], query: string, currentPage: number) => {
  if (items === null || undefined || items.length === 0) return 0;
  const listSourceFilters = items.filter((source) =>
    source.title.toLowerCase().includes(query.toLowerCase())
  );
  const start = (currentPage - 1) * sourcesPerPage;
  const end = currentPage * sourcesPerPage;
  return [...listSourceFilters].slice(start, end);
};

const spaceToSlash = (str: string) => {
  return str.replace(/\s/g, "-");
};
const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
};

function removeFirstAndLastQuotes(str: string) {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1);
  }
  return str; // Return original if no quotes
}

export {
  classNames,
  fetchFilteredSource,
  fetchSourcesPage,
  formatPriceVND,
  removeFirstAndLastQuotes,
  removeVietnameseTones,
  spaceToSlash,
  totalNumberSearchQuery,
};
