import React, { useEffect, useState } from "react";
import ProductPage from "@/app/products/page";
import { ProductTypes } from "@/app/types/common";
import { listItem } from "@/app/constants/index";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import db from "@/app/utils/firestore";
import ProductDetailTemplate from "../ProductDetailTemplate";
2;
const ProductDetail = ({ title }: { title: string }) => {
  const [items, setItems] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setItems(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            code: data.code,
            typeValue: data.typeValue,
            typeLabel: data.typeLabel,
            date: data.date,
            title: data.title,
            imageUrl: data.imageUrl,
            size: data.size,
            color: data.color,
            subtitle: data.subtitle,
            href: data.href,
            content: data.content,
            price: data.price,
            discount: data.discount,
          };
        })
      );
    };
    setLoading(true);
    fetchItems();
    setLoading(false);
  }, []);
  const id = items.findIndex(
    (item) => item.href.toLowerCase() === title.toLowerCase()
  );
  console.log(title);
  return id === -1 ? (
    <ProductPage />
  ) : (
    <ProductDetailTemplate {...items[id]} />
  );
};



export default ProductDetail;
