"use client";
import ImageUploader from "@/app/components/ImageUploader";
import Tiptap from "@/app/components/Tiptap/Tiptap";
import { notifySuccess } from "@/app/components/toast/common";
import { PRODUCT_COLORS, PRODUCT_SIZES, PRODUCT_TYPES } from "@/app/constants";
import { classNames, removeVietnameseTones, spaceToSlash } from "@/app/constants/common";
import { ProductTypes } from "@/app/types/common";
import db from "@/app/utils/firestore";
import { doc, setDoc } from "@firebase/firestore";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { listInput } from "./common";
import DropdownComp from "./DropdownComp";
import InputComp from "./InputComp";
import MultiColorDropdown from "./MultiColorDropdown";
import MultiSizeDropdown from "./MultiSizeDropdown";

export default function EditModal({
  showEditModal,
  productCurrent,
  setShowEditModal,
}: {
  showEditModal: boolean;
  productCurrent: ProductTypes;
  setShowEditModal: (showEditModal: boolean) => void;
}) {
  const [product, setProduct] = useState<ProductTypes>({
    ...productCurrent,
  });

  // Color, Size, and Type dropdown states
  const [selectedColors, setSelectedColors] = useState<{ name: string; value: string }[]>([
    PRODUCT_COLORS[0],
  ]);
  const [selectedSizes, setSelectedSizes] = useState<{ name: string; value: string }[]>([
    PRODUCT_SIZES[0],
  ]);
  const [selectedType, setSelectedType] = useState<{ name: string; value: string } | null>(
    PRODUCT_TYPES[1]
  );
  const [colorImages, setColorImages] = useState<{
    [colorName: string]: { url: string; publicId: string } | null;
  }>({});

  const router = useRouter();

  useEffect(() => {
    setProduct({
      ...productCurrent,
      // Clean up content by removing any extra quotes or JSON encoding
      content:
        typeof productCurrent.content === "string"
          ? productCurrent.content.replace(/^["']|["']$/g, "")
          : productCurrent.content,
    });

    console.log("🔍 EditModal Debug - Loading product:", {
      productId: productCurrent.id,
      hasImagesByColor: !!productCurrent.imagesByColor,
      imagesByColor: productCurrent.imagesByColor,
      mainImageUrl: productCurrent.imageUrl,
      colors: productCurrent.color,
    });

    // Parse existing colors
    if (productCurrent.color) {
      const existingColors = productCurrent.color.split(",").map((colorName) => {
        const foundColor = PRODUCT_COLORS.find(
          (c) => c.name.toLowerCase() === colorName.trim().toLowerCase()
        );
        return foundColor || { name: colorName.trim(), value: "#ccc" };
      });
      setSelectedColors(existingColors);

      // Set up color images - use existing imagesByColor if available, otherwise fallback to main imageUrl
      const colorImageMap: { [colorName: string]: { url: string; publicId: string } | null } = {};

      if (productCurrent.imagesByColor) {
        console.log("✅ Using existing imagesByColor");
        // Use existing color-specific images
        existingColors.forEach((color) => {
          const existingImage = productCurrent.imagesByColor?.[color.name];
          colorImageMap[color.name] = existingImage || null;
          console.log(`🎨 Color ${color.name}:`, existingImage);
        });
      } else {
        console.log("⚠️ No imagesByColor found, using main imageUrl for all colors");
        // Fallback: use main imageUrl for all colors (for legacy products)
        existingColors.forEach((color) => {
          colorImageMap[color.name] = { url: productCurrent.imageUrl, publicId: "" };
        });
      }

      console.log("🖼️ Final colorImageMap:", colorImageMap);
      setColorImages(colorImageMap);
    }

    // Parse existing sizes
    if (productCurrent.size) {
      const existingSizes = productCurrent.size.split(",").map((sizeName) => {
        const foundSize = PRODUCT_SIZES.find((s) => s.name === sizeName.trim());
        return foundSize || { name: sizeName.trim(), value: sizeName.trim() };
      });
      setSelectedSizes(existingSizes);
    }
    // Set product type
    setSelectedType({
      name: productCurrent.typeLabel,
      value: productCurrent.typeValue,
    });
  }, [productCurrent]);

  console.log(productCurrent);

  const date = new Date().toDateString();

  const close = () => {
    setShowEditModal(!showEditModal);
  };
  const handleContentChange = (newContent: string) => {
    setProduct({ ...product, content: newContent });
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product.title === "" || product.subtitle === "" || product.content === "") return;

    // Debug logging
    console.log("🔍 EditModal Submit Debug:", {
      selectedColors: selectedColors.map((c) => c.name),
      colorImages,
      firstColorImageUrl: colorImages[selectedColors[0]?.name]?.url,
    });

    console.log(product);
    try {
      const productRef = doc(db, "products", product.id);
      await setDoc(productRef, {
        ...product,
        content: product.content,
        href: "/products/" + spaceToSlash(removeVietnameseTones(product.title)),
        date: date,
        typeValue: selectedType?.value || "",
        typeLabel: selectedType?.name || "",
        size: selectedSizes.map((s) => s.name).join(", "),
        color: selectedColors.map((c) => c.name).join(", "),
        imageUrl: colorImages[selectedColors[0]?.name]?.url || "",
        imagesByColor: colorImages,
      });
      console.log("✅ Document successfully updated with ID: ", product.id);
      setProduct({ ...product });
    } catch (e) {
      console.error("❌ Error updating document: ", e);
    }
    notifySuccess();
    close();
    window.location.reload();
  };

  return (
    <div className="py-4">
      <Dialog
        open={showEditModal}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-5xl rounded-xl bg-white shadow-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Pencil className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <DialogTitle as="h3" className="text-xl font-semibold text-gray-900">
                      Chỉnh sửa sản phẩm
                    </DialogTitle>
                    <p className="text-sm text-gray-500">ID: {product.id}</p>
                  </div>
                </div>
                <button
                  onClick={close}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Đóng"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {listInput.map((input) => (
                      <div key={input.name} className="space-y-2">
                        <InputComp
                          name={input.name}
                          label={input.label}
                          value={(product[input.name as keyof typeof product] || "").toString()}
                          onChange={handleProductChange}
                        />
                      </div>
                    ))}

                    {/* Color Dropdown */}
                    <MultiColorDropdown
                      label="Màu sắc"
                      options={PRODUCT_COLORS}
                      selectedColors={selectedColors}
                      onColorsChange={setSelectedColors}
                    />

                    {/* Size Dropdown */}
                    <MultiSizeDropdown
                      label="Kích cỡ"
                      options={PRODUCT_SIZES}
                      selectedSizes={selectedSizes}
                      onSizesChange={setSelectedSizes}
                    />

                    {/* Type Selector */}
                    <div className="space-y-2">
                      <DropdownComp
                        label="Loại sản phẩm"
                        name="type"
                        options={PRODUCT_TYPES}
                        selected={selectedType}
                        onSelect={setSelectedType}
                      />
                    </div>
                  </div>

                  {/* Individual Image Upload for Each Color */}
                  {selectedColors.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Hình ảnh cho từng màu sắc
                      </h3>
                      <div className="grid gap-4 md:gap-6">
                        {selectedColors.map((color, index) => (
                          <div
                            key={color.name}
                            className="border border-gray-200 rounded-lg p-4 bg-gray-50/30"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                                  {index + 1}
                                </span>
                                <div
                                  className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                                  style={{ backgroundColor: color.value }}
                                />
                              </div>
                              <h4 className="text-md font-semibold text-gray-800">
                                Hình ảnh cho màu {color.name}
                              </h4>
                            </div>
                            <ImageUploader
                              uploadedImage={colorImages[color.name] || null}
                              setUploadedImage={(image) => {
                                setColorImages((prev) => ({
                                  ...prev,
                                  [color.name]: image,
                                }));
                              }}
                              newPublicId={`${product.code}-${color.name.toLowerCase().replace(/\s+/g, "-")}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Product Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Thông tin chi tiết sản phẩm
                    </label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      <Tiptap
                        content={product.content}
                        onChange={(newContent: string) => handleContentChange(newContent)}
                        name={"Thông tin sản phẩm"}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={close}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={
                        product.content === "" ||
                        selectedColors.length === 0 ||
                        selectedSizes.length === 0 ||
                        selectedColors.some((color) => !colorImages[color.name])
                      }
                      className={classNames(
                        "px-4 py-2 text-sm font-medium text-white rounded-lg transition-all",
                        product.content === "" ||
                          selectedColors.length === 0 ||
                          selectedSizes.length === 0 ||
                          selectedColors.some((color) => !colorImages[color.name])
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-orange-600 hover:bg-orange-700 hover:shadow-lg"
                      )}
                    >
                      Cập nhật sản phẩm
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
