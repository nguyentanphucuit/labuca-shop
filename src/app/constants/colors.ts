// Centralized color constants for the application
export const PRODUCT_COLORS = [
  { name: "Xanh Ô-liu", value: "#556B2F" },
  { name: "Xanh Navy", value: "#000080" },
  { name: "Đen", value: "#000000" },
  { name: "Xám", value: "#808080" },
  { name: "Trắng", value: "#FFFFFF" },
];

// Centralized size constants for the application
export const PRODUCT_SIZES = [
  { name: "35", value: "35" },
  { name: "36", value: "36" },
  { name: "37", value: "37" },
  { name: "38", value: "38" },
  { name: "39", value: "39" },
  { name: "40", value: "40" },
  { name: "41", value: "41" },
  { name: "42", value: "42" },
];

// Additional color utilities
export const getColorByName = (colorName: string) => {
  return PRODUCT_COLORS.find((color) => color.name === colorName);
};

export const getColorValue = (colorName: string) => {
  const color = getColorByName(colorName);
  return color ? color.value : "#000000"; // Default to black if not found
};

export const isLightColor = (colorName: string) => {
  return colorName === "Trắng";
};

// Additional size utilities
export const getSizeByName = (sizeName: string) => {
  return PRODUCT_SIZES.find((size) => size.name === sizeName);
};

export const getSizeValue = (sizeName: string) => {
  const size = getSizeByName(sizeName);
  return size ? size.value : "37"; // Default to size 37 if not found
};

// Centralized product type constants for dropdown
export const PRODUCT_TYPES = [
  { name: "Tất cả sản phẩm", value: "0" },
  { name: "Giày Cao Gót", value: "1" },
  { name: "Giày Đế Xuồng", value: "2" },
  { name: "Giày Búp Bê", value: "3" },
  { name: "Giày Sandal", value: "4" },
  { name: "Dép", value: "5" },
];

// Additional product type utilities
export const getProductTypeByValue = (typeValue: string) => {
  return PRODUCT_TYPES.find((type) => type.value === typeValue);
};

export const getProductTypeName = (typeValue: string) => {
  const type = getProductTypeByValue(typeValue);
  return type ? type.name : "Tất cả sản phẩm"; // Default if not found
};
