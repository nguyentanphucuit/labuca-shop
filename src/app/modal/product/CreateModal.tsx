"use client";
import { addDoc, collection } from "@firebase/firestore";
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Plus } from "lucide-react";
import { useState } from "react";

import ImageUploader from "@/app/components/ImageUploader";
import Tiptap from "@/app/components/Tiptap/Tiptap";
import { notifySuccess } from "@/app/components/toast/common";
import { emptyProduct, PRODUCT_COLORS, PRODUCT_SIZES, PRODUCT_TYPES } from "@/app/constants";
import { classNames, removeVietnameseTones, spaceToSlash } from "@/app/constants/common";
import db from "@/app/utils/firestore";
import { listInput } from "./common";
import DropdownComp from "./DropdownComp";
import InputComp from "./InputComp";
import MultiColorDropdown from "./MultiColorDropdown";
import MultiSizeDropdown from "./MultiSizeDropdown";

export default function CreateModal({
  showCreateModal,
  setShowCreateModal,
}: {
  showCreateModal?: boolean;
  setShowCreateModal?: (show: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
  } | null>(null);
  const [product, setProduct] = useState({ ...emptyProduct });

  // Color, Size, and Type dropdown states
  const [selectedColors, setSelectedColors] = useState<{ name: string; value: string }[]>([
    PRODUCT_COLORS[0],
  ]);
  const [selectedSizes, setSelectedSizes] = useState<{ name: string; value: string }[]>([
    PRODUCT_SIZES[0],
  ]);
  const [selectedType, setSelectedType] = useState<{ name: string; value: string } | null>(
    PRODUCT_TYPES[1]
  ); // Default to "Giày Cao Gót"
  const [colorImages, setColorImages] = useState<{
    [colorName: string]: { url: string; publicId: string } | null;
  }>({});

  // Use parent control if provided, otherwise use internal state
  const modalIsOpen = showCreateModal !== undefined ? showCreateModal : isOpen;

  const open = () => {
    if (setShowCreateModal) {
      setShowCreateModal(true);
    } else {
      setIsOpen(true);
    }
  };

  const close = () => {
    if (setShowCreateModal) {
      setShowCreateModal(false);
    } else {
      setIsOpen(false);
    }
  };

  const date = new Date().toDateString();

  const handleContentChange = (newContent: string) => {
    setProduct({ ...product, content: newContent });
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUploadedImage = (uploadedImage: { url: string; publicId: string } | null) => {
    setUploadedImage(uploadedImage);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const productData = {
        code: product.code,
        title: product.title,
        subtitle: product.subtitle,
        content: product.content,
        typeValue: selectedType?.value || "",
        typeLabel: selectedType?.name || "",
        price: Number(product.price),
        discount: Number(product.discount),
        size: selectedSizes.map((s) => s.name).join(", "),
        color: selectedColors.map((c) => c.name).join(", "),
        date: date,
        href: `/products/${spaceToSlash(removeVietnameseTones(product.title))}`,
        imageUrl: colorImages[selectedColors[0]?.name]?.url || "",
        imagesByColor: colorImages,
      };

      const docRef = await addDoc(collection(db, "products"), productData);
      console.log("✅ Product created with ID: ", docRef.id);

      // Reset form
      setProduct({ ...emptyProduct });
      setSelectedColors([PRODUCT_COLORS[0]]);
      setSelectedSizes([PRODUCT_SIZES[0]]);
      setSelectedType(PRODUCT_TYPES[1]);
      setColorImages({});
    } catch (e) {
      console.error("❌ Error creating product: ", e);
    }

    notifySuccess();
    close();
    window.location.reload();
  };

  return (
    <div className="py-4">
      {showCreateModal === undefined && (
        <Button
          onClick={open}
          className="rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-blue-700/70 data-[focus]:outline-1 data-[focus]:outline-black"
        >
          Tạo mới
        </Button>
      )}
      <Dialog
        open={modalIsOpen}
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
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <DialogTitle as="h3" className="text-xl font-semibold text-gray-900">
                      Tạo mới sản phẩm
                    </DialogTitle>
                    <p className="text-sm text-gray-500">Thêm sản phẩm mới vào hệ thống</p>
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
                          value={product[input.name as keyof typeof product].toString()}
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
                          : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                      )}
                    >
                      Tạo sản phẩm
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
