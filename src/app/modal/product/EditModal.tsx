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

const listInput = [
  {
    name: "code",
    label: "code",
  },
  {
    name: "title",
    label: "title",
  },
  {
    name: "subtitle",
    label: "subtitle",
  },
  {
    name: "type",
    label: "type",
  },
  {
    name: "image",
    label: "image",
  },
];

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

  useEffect(() => {
    setProduct({ ...productCurrent });
  }, [productCurrent]);

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
      });
      console.log("Document written with ID: ", product.id);
      setProduct({ ...product });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    close();
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
                className="text-base/7 font-medium text-black">
                Create Product
              </DialogTitle>
              <div className="w-full h-full">
                <form onSubmit={handleSubmit}>
                  <div className="px-4">ID : {product.id}</div>
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
                  <Tiptap
                    content={product.content}
                    onChange={(newContent: string) =>
                      handleContentChange(newContent)
                    }
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
