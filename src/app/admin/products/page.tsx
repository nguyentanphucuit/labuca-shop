"use client";
import ImageUploader from "@/app/components/ImageUploader";
import { emptyProduct } from "@/app/constants";
import CreateModal from "@/app/modal/product/CreateModal";
import DeleteModal from "@/app/modal/product/DeleteModal";
import EditModal from "@/app/modal/product/EditModal";
import { ProductTypes } from "@/app/types/common";
import db from "@/app/utils/firestore";
import { collection, getDocs } from "@firebase/firestore";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const ProductAdminPage = () => {
  const [productList, setProductList] = useState<ProductTypes[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productCurrent, setProductCurrent] = useState({
    ...emptyProduct,
  });

  const onEditProduct = (product: ProductTypes) => {
    setShowEditModal(!showEditModal);
    setProductCurrent(product);
    console.log("Edit Product");
  };

  const onDeleteProduct = (product: ProductTypes) => {
    setShowDeleteModal(!showDeleteModal);
    setProductCurrent(product);
    console.log("Delete Product");
  };

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProductList(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            code: data.code,
            date: data.date,
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            color: data.color,
            size: data.size,
            type: data.type,
            imageUrl: data.imageUrl,
            href: data.href,
            price: data.price,
            discount: data.discount,
          };
        })
      );
    };

    fetchItems();
  }, []);

  return (
    <div className="pt-32 px-10">
      <ToastContainer />
      <CreateModal />
      <EditModal
        showEditModal={showEditModal}
        productCurrent={productCurrent}
        setShowEditModal={setShowEditModal}
      />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        idCurrent={productCurrent.id}
        collection="products"
        setShowDeleteModal={setShowDeleteModal}
      />
      <table className="w-full p-10 table-fixed border border-gray-400">
        <thead className="">
          <tr>
            <th className="w-1/6 p-4">ID</th>
            <th className="w-2/6 p-4">Title</th>
            <th className="w-2/6 p-4">Subtitle</th>
            <th className="w-1/12 p-4">Edit</th>
            <th className="w-1/12 p-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr className="border border-gray-400" key={product.id}>
              <td className="p-4">
                <div className="flex justify-center items-center">
                  <p className="line-clamp-2">{product.id}</p>
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-center items-center ">
                  <p className="line-clamp-2">{product.title}</p>
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-center items-center ">
                  <p className="line-clamp-2">{product.subtitle}</p>
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-center items-center">
                  <button onClick={() => onEditProduct(product)}>
                    <Pencil className="p-1 rounded-sm bg-orange-300 text-orange-600 w-6 h-6" />
                  </button>
                </div>
              </td>
              <td className="p-4">
                <div className="flex justify-center items-center">
                  <button onClick={() => onDeleteProduct(product)}>
                    <Trash2 className="p-1 rounded-sm bg-red-300 text-red-600 w-6 h-6" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductAdminPage;
