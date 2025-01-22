"use client";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import db from "@/app/utils/firestore";
import {
  classNames,
  removeVietnameseTones,
  spaceToSlash,
} from "@/app/constants/common";
import { ProductTypes } from "@/app/types/common";
import InputComp from "./InputComp";
import Tiptap from "@/app/components/Tiptap/Tiptap";
import ImageUploader from "@/app/components/ImageUploader";
import { listInput } from "./common";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { notifySuccess } from "@/app/components/toast/common";
import { listType } from "@/app/constants";
import ComboboxComp from "@/app/components/ComboboxComp";
import { useRouter } from "next/navigation";

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
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
  } | null>(null);
  const router = useRouter();

  const [selected, setSelected] = useState<{
    label: string;
    value: string;
  } | null>(listType[0]);

  useEffect(() => {
    setProduct({ ...productCurrent });
    setUploadedImage({ url: productCurrent.imageUrl, publicId: "" });
    setSelected({
      label: productCurrent.typeLabel,
      value: productCurrent.typeValue,
    });
  }, [productCurrent]);

  const date = new Date().toDateString();

  const close = () => {
    setShowEditModal(!showEditModal);
  };
  const handleContentChange = (newContent: string) => {
    setProduct({ ...product, content: newContent });
  };

  const handleUploadedImage = (
    uploadedImage: { url: string; publicId: string } | null
  ) => {
    setUploadedImage(uploadedImage);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      product.title === "" ||
      product.subtitle === "" ||
      product.content === ""
    )
      return;
    console.log(product);
    try {
      const productRef = doc(db, "products", product.id);
      await setDoc(productRef, {
        ...product,
        content: JSON.stringify(product.content).replaceAll("\\", ""),
        href: "/product/" + spaceToSlash(removeVietnameseTones(product.title)),
        date: date,
        typeValue: selected?.value,
        typeLabel: selected?.label,
        imageUrl: uploadedImage?.url,
      });
      console.log("Document written with ID: ", product.id);
      setProduct({ ...product });
    } catch (e) {
      console.error("Error adding document: ", e);
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
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex h-auto items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-screen-lg rounded-xl bg-blue-200 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <DialogTitle
                as="h3"
                className="flex flex-row justify-center rounded-md text-base/7 font-medium text-white w-48 p-2 my-2 bg-orange-500">
                Chỉnh sửa sản phẩm
              </DialogTitle>
              <div className="w-full h-full">
                <form onSubmit={handleSubmit}>
                  <div className="px-4">ID : {product.id}</div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-4">
                    {listInput.map((input) => (
                      <InputComp
                        key={input.name}
                        {...input}
                        value={product[
                          input.name as keyof typeof product
                        ].toString()}
                        onChange={handleProductChange}
                      />
                    ))}
                    <ComboboxComp
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <ImageUploader
                      uploadedImage={uploadedImage}
                      setUploadedImage={handleUploadedImage}
                    />
                  </div>
                  <Tiptap
                    content={product.content}
                    onChange={(newContent: string) =>
                      handleContentChange(newContent)
                    }
                    name={"Thông tin sản phẩm"}
                  />
                  <div className="flex justify-end gap-4 mt-4">
                    <Button
                      type="submit"
                      className={classNames(
                        product.content === "" &&
                          "opacity-50 cursor-not-allowed",
                        "inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-gray-500"
                      )}>
                      Save
                    </Button>
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-600 py-1.5 px-3 text-sm/6 font-semibold text-gray-100 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-500 data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-gray-500"
                      onClick={close}>
                      Close
                    </Button>
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
