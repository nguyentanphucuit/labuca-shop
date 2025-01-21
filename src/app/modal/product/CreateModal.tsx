"use client";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Tiptap from "@/app/components/Tiptap/Tiptap";
import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import db from "@/app/utils/firestore";
import { emptyProduct } from "@/app/constants";
import {
  classNames,
  removeVietnameseTones,
  spaceToSlash,
} from "@/app/constants/common";
import InputComp from "./InputComp";
import ImageUploader from "@/app/components/ImageUploader";
import { listInput } from "./common";
import { notifySuccess } from "@/app/components/toast/common";
import { ToastContainer } from "react-toastify";

export default function CreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
  } | null>(null);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const [product, setProduct] = React.useState({ ...emptyProduct });
  const date = new Date().toDateString();

  const handleContentChange = (newContent: string) => {
    setProduct({ ...product, content: newContent });
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUploadedImage = (
    uploadedImage: { url: string; publicId: string } | null
  ) => {
    setUploadedImage(uploadedImage);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(product);
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...product,
        content: JSON.stringify(product.content).replaceAll("\\", ""),
        href: "/product/" + spaceToSlash(removeVietnameseTones(product.title)),
        date: date,
        imageUrl: uploadedImage?.url,
      });
      console.log("Document written with ID: ", docRef.id);
      setProduct({ ...emptyProduct });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    notifySuccess();
    close();
  };

  return (
    <div className="py-4">
      <Button
        onClick={open}
        className="rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-blue-700/70 data-[focus]:outline-1 data-[focus]:outline-black">
        Create Product
      </Button>
      <Dialog
        open={isOpen}
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
                  <ImageUploader
                    uploadedImage={uploadedImage}
                    setUploadedImage={handleUploadedImage}
                  />
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
